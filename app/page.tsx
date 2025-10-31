import { readContentFile, replaceTemplateVariables } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import { getCurrentAge } from '@/lib/time/age';
import { MarkdownRenderer } from '@/components/markdown/markdown-renderer';

function getTokyoTime(): string {
  const now = new Date();
  
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);
}

export default function Home() {
  const variables = {
    age: getCurrentAge().toString(),
    time: `<span data-tokyo-time>${getTokyoTime()}</span>`,
  };
  
  const rawContent = readContentFile('index.md');
  const processedContent = replaceTemplateVariables(rawContent, variables);
  const htmlContent = renderMarkdown(processedContent);

  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <MarkdownRenderer content={htmlContent} />
    </main>
  );
}
