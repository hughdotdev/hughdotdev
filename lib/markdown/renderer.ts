import MarkdownIt from "markdown-it";
import {
  MAGIC_LINK_CLASS,
  MAGIC_LINK_PATTERN,
  MARKDOWN_CONFIG,
} from "./constants";
import {
  createMagicLinkHtml,
  extractDomain,
  getDefaultIconUrl,
  parseMagicLinkContent,
} from "./parser";

const md = new MarkdownIt(MARKDOWN_CONFIG);

const escapeHtml = md.utils.escapeHtml;

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const hrefIndex = token.attrIndex("href");

  if (hrefIndex >= 0) {
    const href = token.attrs![hrefIndex][1];
    const nextToken = tokens[idx + 1];
    const isMagicLink = nextToken?.content?.match(MAGIC_LINK_PATTERN);

    if (isMagicLink) {
      token.attrSet("class", MAGIC_LINK_CLASS);
      token.attrSet("data-processed", "true");
    }

    if (href.startsWith("http")) {
      token.attrSet("target", "_blank");
      token.attrSet("rel", "noopener noreferrer");
    }
  }

  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.text = (tokens, idx) => {
  const token = tokens[idx];
  const content = token.content;

  const match = content.match(MAGIC_LINK_PATTERN);

  if (match) {
    let linkDepth = 0;
    let linkOpenToken = null;

    for (let i = idx - 1; i >= 0; i--) {
      if (tokens[i].type === "link_close") {
        linkDepth++;
      } else if (tokens[i].type === "link_open") {
        if (linkDepth === 0) {
          linkOpenToken = tokens[i];
          break;
        }
        linkDepth--;
      }
    }

    if (linkOpenToken?.attrGet("class") === MAGIC_LINK_CLASS) {
      const { text, iconUrl, darkIconUrl } = parseMagicLinkContent(content);
      const href = linkOpenToken.attrGet("href") || "";
      const domain = extractDomain(href);
      const imageUrl = iconUrl || getDefaultIconUrl(href, domain);

      return createMagicLinkHtml(imageUrl, text, darkIconUrl || undefined);
    }
  }

  return escapeHtml(content);
};

export function renderMarkdown(content: string): string {
  return md.render(content);
}
