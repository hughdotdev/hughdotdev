import { cache } from "react";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const POSTS_DIR = "content/posts";
const WORDS_PER_MINUTE = 200;

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  readingTime: number;
}

export interface Post extends PostMetadata {
  content: string;
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}

const getAllPostsInternal = (): PostMetadata[] => {
  const postsDirectory = path.join(process.cwd(), POSTS_DIR);
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md") && fileName !== "index.md")
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        readingTime: calculateReadingTime(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getAllPosts = cache((): PostMetadata[] => {
  return getAllPostsInternal();
});

const getPostBySlugInternal = (slug: string): Post | null => {
  const postsDirectory = path.join(process.cwd(), POSTS_DIR);
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    readingTime: calculateReadingTime(content),
    content,
  };
};

export const getPostBySlug = cache((slug: string): Post | null => {
  return getPostBySlugInternal(slug);
});
