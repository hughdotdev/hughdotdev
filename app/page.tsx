import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile, replaceTemplateVariables, getLinkConstants } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { getCurrentAge } from "@/lib/time";
import { Suspense } from "react";

const getTokyoTime = (): string =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

export const dynamic = "force-static";
export const revalidate = 3600;

export default function Home() {
  const variables = {
    age: getCurrentAge().toString(),
    time: `<span data-tokyo-time>${getTokyoTime()}</span>`,
    ...getLinkConstants(),
  };

  const content = renderMarkdown(
    replaceTemplateVariables(readContentFile("index.md"), variables)
  );

  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <Suspense fallback={<div className="animate-pulse h-64" />}>
        <MarkdownRenderer content={content} />
      </Suspense>
    </main>
  );
}
