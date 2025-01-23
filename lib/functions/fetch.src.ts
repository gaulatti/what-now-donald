import { Agent, CredentialSession } from '@atproto/api';
import { GoogleGenerativeAI } from '@google/generative-ai';
import chromium from '@sparticuz/chromium';
import axios from 'axios';
import puppeteer from 'puppeteer-core';
import { prepareBlueskyMessage } from '../utils/bsky';
import { ACCOUNTS, GEMINI_MODEL, GEMINI_SAFETY_SETTINGS, USER_AGENT } from '../utils/consts';
import { getLastProcessedById, writeRecord } from '../utils/persistence';
import { cutFatFromPost } from '../utils/truth.social';
import { Post, SlimPost } from '../utils/truth.social.types';

/**
 * Creates an instance of GoogleGenerativeAI using the provided API key.
 *
 * @param {string} GEMINI_CREDENTIALS - The API key used to authenticate requests to the Google Generative AI service.
 */
const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_CREDENTIALS!);

/**
 * Retrieves the generative model for the specified model.
 */
const generativeModel = generativeAI.getGenerativeModel({ model: GEMINI_MODEL, safetySettings: GEMINI_SAFETY_SETTINGS });

/**
 * The handler function for the fetch function.
 */
const session = new CredentialSession(new URL('https://bsky.social'));

/**
 * The handler function processes new posts from Truth Social accounts, generates content using a generative model,
 * posts the generated content to a Bluesky channel, and sends a message to a Slack channel.
 *
 * The function performs the following steps:
 * 1. Retrieves the last processed ID for each account.
 * 2. Sets up a headless browser using Puppeteer and navigates to the Truth Social API endpoint for the account.
 * 3. Extracts and parses the JSON content from the page.
 * 4. Filters out already processed statuses and sorts the new statuses in ascending order of ID.
 * 5. Logs in to the Bluesky session and creates an instance of the Agent class.
 * 6. Generates content for each new post using a generative model and posts it to the Bluesky channel.
 * 7. Sends a message to a Slack channel with the generated content and a link to the original post.
 * 8. Updates the last processed ID for the account.
 *
 * @async
 * @function handler
 * @returns {Promise<void>} A promise that resolves when the function completes.
 */
const handler = async (): Promise<void> => {
  for (const account of ACCOUNTS) {
    let lastProcessedId: string = await getLastProcessedById(account);

    /**
     * Setup the browser.
     */
    const executablePath = await chromium.executablePath();
    const browser = await puppeteer.launch({
      args: [...chromium.args, '--remote-debugging-port=9222'],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

    /**
     * Create a new page and set the user agent.
     */
    const page = await browser.newPage();
    await page.setUserAgent(USER_AGENT);
    const url = `https://truthsocial.com/api/v1/accounts/${account}/statuses?exclude_replies=true&only_replies=false&with_muted=true`;

    /**
     * Initialize an empty array to store the new statuses.
     */
    const newPosts: SlimPost[] = [];
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });

      /**
       * Extract the JSON content from the page.
       */
      const jsonContent = await page.$eval('pre', (pre) => pre.textContent);

      /**
       * Parse the JSON content.
       */
      const data: Post[] = JSON.parse(jsonContent || '[]');

      /**
       * Filter out the statuses that have already been processed.
       */
      newPosts.push(...data.filter((post) => BigInt(post.id) > BigInt(lastProcessedId)).map(cutFatFromPost));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      await browser.close();
    }

    /**
     * If there are no new statuses to process, log a message and return.
     */
    if (newPosts.length === 0) {
      console.info('No new statuses to process.');
      return;
    }

    /**
     * Sort the statuses in ascending order of ID for FIFO processing.
     */
    newPosts.sort((a, b) => Number(BigInt(a.id) - BigInt(b.id)));

    /**
     * Log in to the Bluesky session.
     */
    await session.login({
      identifier: process.env.BLUESKY_USERNAME!,
      password: process.env.BLUESKY_PASSWORD!,
    });

    /**
     * Create an instance of the Agent class using the session.
     */
    const agent = new Agent(session);

    try {
      for (const post of newPosts) {
        const prompt = `Tell me what this post is about and be concise with it. ${JSON.stringify(post)}`;
        const result = await generativeModel.generateContent(prompt);
        const output = result.response.text();

        /**
         * Post the generated content to the Bluesky channel.
         */
        await agent.post(prepareBlueskyMessage(output, post));

        /**
         * Sends a message to a Slack channel using Axios.
         */
        const message = {
          text: 'What now, Donald?',
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: 'What now, Donald?',
                emoji: true,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*What did he say?*\n\n> ${output}\n\n<${post.url}|*View the original post* on Truth Social>`,
              },
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `_Posted on: ${post.created_at} — ID: ${post.id}_`,
                },
              ],
            },
          ],
        };

        try {
          await axios.post(process.env.SLACK_URL!, message, {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          console.error('Error sending message to Slack:', JSON.stringify(error));
          throw error;
        }

        /**
         * Update the last processed ID.
         */
        lastProcessedId = post.id;
      }
    } catch (error) {
      console.error('Error processing data:', error);
    }

    /**
     * TODO: Update the last processed ID.
     * Not now, so we can reprocess the same statuses for testing.
     */
    await writeRecord(account, lastProcessedId);
    console.info(`Updated last processed ID to ${lastProcessedId}`);
  }
};

export { handler };
