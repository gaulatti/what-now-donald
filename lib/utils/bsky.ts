import { SlimPost } from './truth.social.types';

/**
 * Prepares a message for Bluesky by truncating it to a maximum length and appending a link to the post.
 *
 * @param message - The message to be prepared.
 * @param post - An object containing the URL of the post.
 * @returns The prepared message, truncated to 300 characters if necessary, followed by the post link.
 */
const prepareBlueskyMessage = (message: string, post: SlimPost) => {
  /**
   * Truncate the message to 300 characters.
   */
  const maxLength = 300;
  const truncated = message.length > maxLength ? message.slice(0, maxLength - 3).trimEnd() + '...' : message;

  /**
   * Return the condensed post.
   */
  return `${truncated}\n\nLink: ${post.url}`;
};

export { prepareBlueskyMessage };
