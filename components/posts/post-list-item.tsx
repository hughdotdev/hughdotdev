import type { PostMetadata } from "@/lib/content/posts";
import { formatDate } from "@/lib/time";
import Link from "next/link";

interface PostListItemProps {
  post: PostMetadata;
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-meta flex items-baseline gap-2 shrink-0">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime} min</span>
        </div>
      </div>
    </Link>
  );
}
