import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export function PostsEmpty() {
  const content = renderMarkdown(readContentFile("posts/index.md"));
  return <MarkdownRenderer content={content} />;
}
