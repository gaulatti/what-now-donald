/**
 * Represents a media attachment in the Truth Social platform.
 *
 * @interface MediaAttachment
 *
 * @property {string} id - The unique identifier for the media attachment.
 * @property {string} type - The type of media (e.g., image, video).
 * @property {string} url - The URL where the media is hosted.
 * @property {string} preview_url - The URL for the preview of the media.
 * @property {string | null} external_video_id - The ID of the external video if applicable, otherwise null.
 * @property {string | null} remote_url - The remote URL of the media if applicable, otherwise null.
 * @property {string | null} preview_remote_url - The remote URL for the preview of the media if applicable, otherwise null.
 * @property {string | null} text_url - The URL for the text associated with the media if applicable, otherwise null.
 * @property {MediaMeta} meta - Metadata associated with the media.
 * @property {string | null} description - A description of the media if applicable, otherwise null.
 * @property {string} blurhash - A compact representation of the media for placeholder purposes.
 * @property {string} processing - The processing status of the media.
 */
export interface MediaAttachment {
  id: string;
  type: string;
  url: string;
  preview_url: string;
  external_video_id: string | null;
  remote_url: string | null;
  preview_remote_url: string | null;
  text_url: string | null;
  meta: MediaMeta;
  description: string | null;
  blurhash: string;
  processing: string;
}

/**
 * Represents metadata for media, including dimensions for original and optionally for smaller versions.
 */
/**
 * Represents metadata for media items, including dimensions for original and optionally smaller versions.
 *
 * @property {MediaDimensions} original - The dimensions of the original media.
 * @property {MediaDimensions} [small] - The dimensions of the smaller version of the media, if available.
 */
export interface MediaMeta {
  original: MediaDimensions;
  small?: MediaDimensions;
}

/**
 * Represents the dimensions of a media item.
 *
 * @property {number} width - The width of the media in pixels.
 * @property {number} height - The height of the media in pixels.
 * @property {string} size - The size of the media file.
 * @property {number} aspect - The aspect ratio of the media.
 */
export interface MediaDimensions {
  width: number;
  height: number;
  size: string;
  aspect: number;
}

/**
 * Represents a user account on the platform.
 *
 * @property {string} id - The unique identifier for the account.
 * @property {string} username - The username of the account.
 * @property {string} acct - The account handle.
 * @property {string} display_name - The display name of the account.
 * @property {boolean} locked - Indicates if the account is locked.
 * @property {boolean} bot - Indicates if the account is a bot.
 * @property {boolean} discoverable - Indicates if the account is discoverable.
 * @property {boolean} group - Indicates if the account is a group.
 * @property {string} created_at - The creation date of the account.
 * @property {string} note - A note or bio for the account.
 * @property {string} url - The URL of the account's profile.
 * @property {string} avatar - The URL of the account's avatar image.
 * @property {string} avatar_static - The URL of the account's static avatar image.
 * @property {string} header - The URL of the account's header image.
 * @property {string} header_static - The URL of the account's static header image.
 * @property {number} followers_count - The number of followers the account has.
 * @property {number} following_count - The number of accounts the user is following.
 * @property {number} statuses_count - The number of statuses posted by the account.
 * @property {string} last_status_at - The date of the last status posted by the account.
 * @property {boolean} verified - Indicates if the account is verified.
 * @property {string} location - The location of the account.
 * @property {string} website - The website associated with the account.
 * @property {boolean} unauth_visibility - Indicates if the account is visible to unauthenticated users.
 * @property {boolean} chats_onboarded - Indicates if the account has onboarded chats.
 * @property {boolean} feeds_onboarded - Indicates if the account has onboarded feeds.
 * @property {boolean} accepting_messages - Indicates if the account is accepting messages.
 * @property {boolean | null} show_nonmember_group_statuses - Indicates if the account shows non-member group statuses.
 * @property {any[]} emojis - A list of emojis associated with the account.
 * @property {any[]} fields - A list of custom fields associated with the account.
 * @property {boolean} tv_onboarded - Indicates if the account has onboarded TV.
 * @property {boolean} tv_account - Indicates if the account is a TV account.
 */
export interface Account {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  discoverable: boolean;
  group: boolean;
  created_at: string;
  note: string;
  url: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  last_status_at: string;
  verified: boolean;
  location: string;
  website: string;
  unauth_visibility: boolean;
  chats_onboarded: boolean;
  feeds_onboarded: boolean;
  accepting_messages: boolean;
  show_nonmember_group_statuses: boolean | null;
  emojis: any[];
  fields: any[];
  tv_onboarded: boolean;
  tv_account: boolean;
}

/**
 * Represents a post on the platform.
 *
 * @interface Post
 *
 * @property {string} id - The unique identifier for the post.
 * @property {string} created_at - The timestamp when the post was created.
 * @property {string | null} in_reply_to_id - The ID of the post this post is replying to, if any.
 * @property {string | null} quote_id - The ID of the post this post is quoting, if any.
 * @property {string | null} in_reply_to_account_id - The ID of the account this post is replying to, if any.
 * @property {boolean} sensitive - Indicates if the post contains sensitive content.
 * @property {string} spoiler_text - Text to be shown before revealing the content, often used for spoilers.
 * @property {string} visibility - The visibility level of the post (e.g., public, unlisted, private).
 * @property {string | null} language - The language of the post content, if specified.
 * @property {string} uri - The URI of the post.
 * @property {string} url - The URL of the post.
 * @property {string} content - The content of the post.
 * @property {Account} account - The account that created the post.
 * @property {MediaAttachment[]} media_attachments - A list of media attachments included in the post.
 * @property {Mention[]} mentions - A list of mentions included in the post.
 * @property {any[]} tags - A list of tags associated with the post.
 * @property {Card | null} card - A card object associated with the post, if any.
 * @property {any | null} group - The group associated with the post, if any.
 * @property {Post | null} quote - The quoted post, if any.
 * @property {Post | null} in_reply_to - The post this post is replying to, if any.
 * @property {Post | null} reblog - The reblogged post, if any.
 * @property {boolean} sponsored - Indicates if the post is sponsored.
 * @property {number} replies_count - The number of replies to the post.
 * @property {number} reblogs_count - The number of reblogs of the post.
 * @property {number} favourites_count - The number of favourites of the post.
 * @property {boolean} favourited - Indicates if the post is favourited by the current user.
 * @property {boolean} reblogged - Indicates if the post is reblogged by the current user.
 * @property {boolean} muted - Indicates if the post is muted by the current user.
 * @property {boolean} pinned - Indicates if the post is pinned by the current user.
 * @property {boolean} bookmarked - Indicates if the post is bookmarked by the current user.
 * @property {any | null} poll - A poll object associated with the post, if any.
 * @property {any[]} emojis - A list of emojis included in the post.
 */
export interface Post {
  id: string;
  created_at: string;
  in_reply_to_id: string | null;
  quote_id: string | null;
  in_reply_to_account_id: string | null;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string | null;
  uri: string;
  url: string;
  content: string;
  account: Account;
  media_attachments: MediaAttachment[];
  mentions: Mention[];
  tags: any[];
  card: Card | null;
  group: any | null;
  quote: Post | null;
  in_reply_to: Post | null;
  reblog: Post | null;
  sponsored: boolean;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  favourited: boolean;
  reblogged: boolean;
  muted: boolean;
  pinned: boolean;
  bookmarked: boolean;
  poll: any | null;
  emojis: any[];
}

/**
 * Represents a mention in a social media post.
 *
 * @interface Mention
 * @property {string} id - The unique identifier of the mention.
 * @property {string} username - The username of the mentioned user.
 * @property {string} url - The URL to the mentioned user's profile.
 * @property {string} acct - The account identifier of the mentioned user.
 */
export interface Mention {
  id: string;
  username: string;
  url: string;
  acct: string;
}

/**
 * Represents a card object with various metadata properties.
 *
 * @interface Card
 *
 * @property {string | null} id - The unique identifier for the card, or null if not available.
 * @property {string} url - The URL associated with the card.
 * @property {string} title - The title of the card.
 * @property {string} description - A brief description of the card.
 * @property {string} type - The type of the card.
 * @property {string} author_name - The name of the author of the card.
 * @property {string} author_url - The URL of the author's profile or website.
 * @property {string} provider_name - The name of the provider of the card content.
 * @property {string} provider_url - The URL of the provider's website.
 * @property {string} html - The HTML content of the card.
 * @property {number} width - The width of the card in pixels.
 * @property {number} height - The height of the card in pixels.
 * @property {string} image - The URL of the image associated with the card.
 * @property {string} embed_url - The URL used to embed the card.
 * @property {string} blurhash - A compact representation of the card's image for placeholder purposes.
 * @property {any | null} links - Additional links related to the card, or null if not available.
 * @property {any | null} group - Group information related to the card, or null if not available.
 */
export interface Card {
  id: string | null;
  url: string;
  title: string;
  description: string;
  type: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
  html: string;
  width: number;
  height: number;
  image: string;
  embed_url: string;
  blurhash: string;
  links: any | null;
  group: any | null;
}

/**
 * Represents a slimmed-down version of media associated with a social media post.
 *
 * @interface SlimMedia
 * @property {string} type - The type of the media (e.g., image, video).
 * @property {string} url - The URL to the media.
 * @property {string} preview_url - The URL to the preview of the media.
 */
interface SlimMedia {
  type: string;
  url: string;
  preview_url: string;
}

/**
 * Represents a slimmed-down version of a reblog in a social media post.
 *
 * @interface SlimReblog
 * @property {string} id - The unique identifier of the reblog.
 * @property {string} created_at - The timestamp when the reblog was created.
 * @property {string} url - The URL to the reblog.
 * @property {string} content - The content of the reblog.
 * @property {string} [display_name] - The display name of the user who reblogged, if available.
 * @property {SlimMedia[]} [media] - An array of media objects associated with the post (optional).
 */
interface SlimReblog {
  id: string;
  created_at: string;
  url: string;
  content: string;
  display_name?: string;
  media?: SlimMedia[];
}

/**
 * Represents a simplified version of a post on Truth Social.
 *
 * @interface SlimPost
 *
 * @property {string} id - The unique identifier for the post.
 * @property {string} created_at - The timestamp when the post was created.
 * @property {string} url - The URL link to the post.
 * @property {string} content - The textual content of the post.
 * @property {string} [display_name] - The display name of the user who created the post (optional).
 * @property {SlimMedia[]} [media] - An array of media objects associated with the post (optional).
 * @property {SlimReblog} [reblog] - The reblog information if the post is a reblog (optional).
 */
export interface SlimPost {
  id: string;
  created_at: string;
  url: string;
  content: string;
  display_name?: string;
  media?: SlimMedia[];
  reblog?: SlimReblog;
}
