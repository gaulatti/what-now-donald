import { AppBskyRichtextFacet } from '@atproto/api';
import { SlimPost } from './truth.social.types';

/**
 * Prepares a message to be posted to Bluesky by truncating it if necessary and appending a clickable link.
 *
 * @param message - The original message to be posted.
 * @param post - An object containing the URL to be appended to the message.
 * @returns An object containing the final text to be posted and the facets for rich text formatting.
 */
const prepareBlueskyMessage = (message: string, post: SlimPost): { text: string; facets: AppBskyRichtextFacet.Main[] } => {
  const maxLength = 300;

  /**
   * The text to be appended to the message as a clickable link.
   */
  const linkText = `\nLink: ${post.url}`;

  /**
   * The available length for the message.
   */
  const availableLength = maxLength - linkText.length;

  /**
   * Truncate the message if it exceeds the available length.
   */
  const truncated = message.length > availableLength ? message.slice(0, availableLength - 3).trimEnd() + '...' : message;

  /**
   * The final message to be posted to Bluesky.
   */
  const text = `${truncated}${linkText}`;

  /**
   * The facets to be added to the message.
   */
  const facets: AppBskyRichtextFacet.Main[] = [
    {
      index: {
        byteStart: text.indexOf(post.url),
        byteEnd: text.indexOf(post.url) + post.url.length,
      },
      features: [
        {
          $type: 'app.bsky.richtext.facet#link',
          uri: post.url,
        },
      ],
    },
  ];

  return { text, facets };
};

export { prepareBlueskyMessage };
