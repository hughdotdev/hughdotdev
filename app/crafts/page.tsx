import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile, replaceTemplateVariables } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export default function CraftsPage() {
  const content = renderMarkdown(
    replaceTemplateVariables(readContentFile("crafts/index.md"))
  );

  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <MarkdownRenderer content={content} />
    </main>
  );
}
