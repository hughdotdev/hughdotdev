import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile, replaceTemplateVariables, getLinkConstants } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export default function NotFound() {
  const content = renderMarkdown(
    replaceTemplateVariables(readContentFile("404/index.md"), getLinkConstants())
  );
  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <MarkdownRenderer content={content} />
    </main>
  );
}
