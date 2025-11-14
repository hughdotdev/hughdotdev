import {
  FAVICON_BASE_URL,
  FAVICON_SIZE,
  MAGIC_LINK_PATTERN,
} from "./constants";
import type { MagicLinkData } from "./types";

function parseMagicLinkContent(content: string): MagicLinkData {
  const match = content.match(MAGIC_LINK_PATTERN);
  if (!match) return { text: content, iconUrl: null };

  const [, text, lightIconUrl, darkIconUrl] = match;
  return {
    text,
    iconUrl: lightIconUrl || null,
    darkIconUrl: darkIconUrl || null,
  };
}

function getDefaultIconUrl(href: string, domain: string): string {
  return `${FAVICON_BASE_URL}?domain=${domain}&sz=${FAVICON_SIZE}`;
}

function extractDomain(url: string): string {
  return url.replace(/^https?:\/\//, "").split("/")[0];
}

function createMagicLinkHtml(
  iconUrl: string,
  text: string,
  darkIconUrl?: string
): string {
  if (darkIconUrl) {
    return `<span class="magic-link-icon magic-link-icon-themed" style="background-image: url('${iconUrl}'); --dark-icon: url('${darkIconUrl}');"></span>${text}`;
  }
  return `<span class="magic-link-icon" style="background-image: url('${iconUrl}');"></span>${text}`;
}

export {
  createMagicLinkHtml,
  extractDomain,
  getDefaultIconUrl,
  parseMagicLinkContent,
};
