import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export default function CraftsPage() {
  const content = renderMarkdown(readContentFile("crafts/index.md"));
  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <MarkdownRenderer content={content} />
    </main>
  );
}
