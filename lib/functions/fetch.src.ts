import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { USER_AGENT } from '../utils/consts';
import { getLastProcessedById } from '../utils/persistence';

const handler = async () => {
  const accounts = ['107780257626128497'];

  for (const account of accounts) {
    let lastProcessedId: string | null = await getLastProcessedById(account);

    const executablePath = await chromium.executablePath();
    const browser = await puppeteer.launch({
      args: [...chromium.args, '--remote-debugging-port=9222'],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setUserAgent(USER_AGENT);

    const url = `https://truthsocial.com/api/v1/accounts/${account}/statuses`;

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
      const newPosts = data.filter((post) => BigInt(post.id) > BigInt(lastProcessedId));
      if (newPosts.length === 0) {
        console.log('No new statuses to process.');
        return;
      }

      /**
       * Sort the statuses in ascending order of ID for FIFO processing.
       */
      newPosts.sort((a, b) => Number(BigInt(a.id) - BigInt(b.id)));

      for (const post of newPosts) {
        console.log(`Processing status ID: ${post.id}`, JSON.stringify(post));
        /**
         * TODO: Add processing logic here (e.g., summarizing and posting to Bluesky, then slack)
         */
      }

      /**
       * TODO: Update the last processed ID.
       * Not now, so we can reprocess the same statuses for testing.
       */
      // const highestId = newPosts[newPosts.length - 1].id;
      // await writeRecord(account, highestId);
      // console.log(`Updated last processed ID to ${highestId}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      await browser.close();
    }
  }
};

export { handler };
