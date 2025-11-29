import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "418 I'm a teapot",
  description: "I'm a teapot. I cannot brew coffee.",
};

export default function TeapotPage() {
  const content = renderMarkdown(readContentFile("418/index.md"));
  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <MarkdownRenderer content={content} />
    </main>
  );
}

