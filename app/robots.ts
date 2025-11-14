import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "ClaudeBot",
          "Google-Extended",
          "PerplexityBot",
          "Omgilibot",
          "Bytespider",
          "ia_archiver",
          "archive.org_bot",
          "Amazonbot",
          "FacebookBot",
          "Applebot-Extended",
        ],
        disallow: "/",
      },
    ],
  };
}
