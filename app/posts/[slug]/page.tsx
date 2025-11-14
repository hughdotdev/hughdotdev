import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { getAllPosts, getPostBySlug } from "@/lib/content/posts";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate } from "@/lib/time";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = renderMarkdown(post.content);

  return (
    <main className="max-w-2xl mx-auto px-4 pb-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-medium mb-2 mt-0">{post.title}</h1>
          <div className="text-sm text-foreground/40">
            {formatDate(post.date, { format: "long" })} · {post.readingTime} min
            read
          </div>
        </header>
        <MarkdownRenderer content={content} />
      </article>
    </main>
  );
}
