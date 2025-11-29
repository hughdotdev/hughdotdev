export const MAGIC_LINK_PATTERN = /^\[\[(.+?)(?:::(.+?))?(?:::(.+?))?\]\]$/;
export const MAGIC_LINK_CLASS = "magic-link";
export const FAVICON_BASE_URL = "https://www.google.com/s2/favicons";
export const FAVICON_SIZE = 64;
export const TOOLTIP_CLASS = "link-with-tooltip";
export const TOOLTIP_ELEMENT_CLASS = "link-tooltip";

export const MARKDOWN_CONFIG = {
  html: true,
  linkify: true,
  typographer: true,
} as const;

export const LINK_CONSTANTS = {
  github: "https://github.com/hughdotdev/",
  githubRepo: "https://github.com/hughdotdev/hughdotdev",
  discord: "https://discord.com/users/924311449973686282/",
  instagram: "https://instagram.com/humgruffin39/",
  email: "me@hugh.dev",
  emailLink: "mailto:me@hugh.dev",
} as const;
