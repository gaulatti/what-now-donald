import { SlimPost } from './truth.social.types';

/**
 * Removes all HTML tags from a given string.
 *
 * @param html - The string containing HTML tags to be stripped.
 * @returns A new string with all HTML tags removed and trimmed of whitespace.
 */
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};

/**
 * Create a slimmed-down version of the post object.
 *
 * @param {Post} post - The original post object to be slimmed down.
 * @returns {SlimPost} A new object containing only the essential properties of the original post.
 */
const cutFatFromPost = (post: any): SlimPost => {
  if (!post) {
    return {
      id: '',
      created_at: '',
      url: '',
      content: '',
    };
  }

  /**
   * Strip HTML tags from post content.
   */
  const rawContent = post.content || '';
  const textOnly = stripHtmlTags(rawContent);

  /**
   * If the post content is empty, provide a placeholder message.
   */
  let finalContent: string;
  if (textOnly.length === 0) {
    /**
     * If the post contains media, provide a placeholder message.
     */
    if (post.media_attachments && post.media_attachments.length > 0) {
      finalContent = 'A post with image(s) or media but no text.';
    } else {
      finalContent = 'Empty post content.';
    }
  } else {
    finalContent = textOnly;
  }

  /**
   * Collect media attachments.
   */
  const slimMedia = (post.media_attachments || []).map((m: any) => ({
    type: m.type,
    url: m.url,
    preview_url: m.preview_url,
  }));

  /**
   * Create a slimmed-down post object.
   */
  const slimPost: SlimPost = {
    id: post.id,
    created_at: post.created_at,
    url: post.url,
    content: finalContent,
    display_name: post.account?.display_name,
  };

  if (slimMedia.length > 0) {
    slimPost.media = slimMedia;
  }

  /**
   * If the post is a reblog, slim down the reblog content.
   */
  if (post.reblog) {
    /**
     * Strip HTML tags from reblog content.
     */
    const reblogRawContent = post.reblog.content || '';
    const reblogTextOnly = stripHtmlTags(reblogRawContent);

    let finalReblogContent: string;
    if (reblogTextOnly.length === 0) {
      if (post.reblog.media_attachments && post.reblog.media_attachments.length > 0) {
        finalReblogContent = 'A reblog with image(s) or media but no text.';
      } else {
        finalReblogContent = 'Reblog has empty content.';
      }
    } else {
      finalReblogContent = reblogRawContent;
    }

    /**
     * Collect media attachments from the reblog.
     */
    const reblogMedia = (post.reblog.media_attachments || []).map((m: any) => ({
      type: m.type,
      url: m.url,
      preview_url: m.preview_url,
    }));

    slimPost.reblog = {
      id: post.reblog.id,
      created_at: post.reblog.created_at,
      url: post.reblog.url,
      content: finalReblogContent,
      display_name: post.reblog.account?.display_name,
    };

    if (reblogMedia.length > 0) {
      slimPost.reblog.media = reblogMedia;
    }
  }

  return slimPost;
};

export { cutFatFromPost };
