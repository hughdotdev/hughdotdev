import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "451 Unavailable For Legal Reasons",
  description: "This content has been removed for legal reasons.",
};

export default function UnavailableForLegalReasonsPage() {
  const content = renderMarkdown(readContentFile("451/index.md"));
  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <MarkdownRenderer content={content} />
    </main>
  );
}

