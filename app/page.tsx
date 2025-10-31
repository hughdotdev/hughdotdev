import { readContentFile, replaceTemplateVariables } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import { getCurrentAge } from '@/lib/time/age';
import { getTokyoTime } from '@/lib/time/tokyo';
import { MarkdownRenderer } from '@/components/markdown/markdown-renderer';

export default function Home() {
  const variables = {
    age: getCurrentAge().toString(),
    time: getTokyoTime(),
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
