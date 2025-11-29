import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile, replaceTemplateVariables, getLinkConstants } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export function PostsEmpty() {
  const content = renderMarkdown(
    replaceTemplateVariables(readContentFile("posts/index.md"), getLinkConstants())
  );
  return <MarkdownRenderer content={content} />;
}
