import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { readContentFile, replaceTemplateVariables } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { getCurrentAge } from "@/lib/time";

function getTokyoTime(): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function Home() {
  const variables = {
    age: getCurrentAge().toString(),
    time: `<span data-tokyo-time>${getTokyoTime()}</span>`,
  };

  const content = renderMarkdown(
    replaceTemplateVariables(readContentFile("index.md"), variables)
  );

  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <MarkdownRenderer content={content} />
    </main>
  );
}
