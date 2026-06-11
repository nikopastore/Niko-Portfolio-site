import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx/components";

export interface BlogFrontmatter {
  title: string;
  date: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  description: string;
  tags: string[];
  readTime: string;
  image?: string;
  category?: string;
  tldr?: string;
  keyTakeaways: string[];
  faq: Array<{ question: string; answer: string }>;
  canonicalUrl?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
}

export interface BlogPostWithContent extends BlogPost {
  content: ReactElement;
}

const postsDirectory = path.join(process.cwd(), "src/content/blog");

function estimateReadTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
}

function normalizeFaq(value: unknown): Array<{ question: string; answer: string }> {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const question = asString(record.question) ?? asString(record.q);
      const answer = asString(record.answer) ?? asString(record.a);
      return question && answer ? { question, answer } : null;
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item));
}

function firstParagraph(content: string) {
  return (
    content
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0 && !line.startsWith("#") && !line.startsWith("!") && !line.startsWith("<")) ?? ""
  );
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  content: string,
  slug: string
): BlogFrontmatter {
  const title = asString(data.title) ?? slug;
  const publishedAt = asString(data.publishedAt) ?? asString(data.date) ?? new Date().toISOString();
  const description =
    asString(data.description) ?? asString(data.excerpt) ?? firstParagraph(content).replace(/^\*\*TL;DR\*\*:?\s*/i, "");
  const tags = asStringArray(data.tags);
  const keyTakeaways = asStringArray(data.keyTakeaways);
  const readTime = asString(data.readTime) ?? asString(data.reading_time) ?? estimateReadTime(content);

  return {
    title,
    date: publishedAt,
    publishedAt,
    updatedAt: asString(data.updatedAt) ?? asString(data.modifiedAt),
    excerpt: description,
    description,
    tags,
    readTime,
    image: asString(data.image) ?? asString(data.cover),
    category: asString(data.category) ?? tags[0],
    tldr: asString(data.tldr) ?? asString(data.summary),
    keyTakeaways,
    faq: normalizeFaq(data.faq),
    canonicalUrl: asString(data.canonicalUrl) ?? asString(data.canonical),
  };
}

export function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}

export async function getPosts(): Promise<BlogPost[]> {
  const entries = await fs.readdir(postsDirectory);
  const posts = await Promise.all(
    entries
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(postsDirectory, file);
        const source = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(source);
        const frontmatter = normalizeFrontmatter(data, content, slug);

        return { slug, frontmatter };
      })
  );

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getPost(slug: string): Promise<BlogPostWithContent | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const frontmatter = normalizeFrontmatter(data, content, slug);

    const compiled = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: {
                  light: "github-light",
                  dark: "github-dark",
                },
                keepBackground: false,
              },
            ],
          ],
        },
      },
    });

    return {
      slug,
      frontmatter,
      content: compiled.content,
    };
  } catch (error: unknown) {
    console.error(`[getPost] Failed to compile MDX for slug "${slug}":`, error instanceof Error ? error.message : error);
    return null;
  }
}

export function getRelatedPosts(current: BlogPost, posts: BlogPost[], limit = 3) {
  const currentTags = new Set(current.frontmatter.tags.map((tag) => tag.toLowerCase()));
  return posts
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      score: post.frontmatter.tags.filter((tag) => currentTags.has(tag.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score || new Date(b.post.frontmatter.date).getTime() - new Date(a.post.frontmatter.date).getTime())
    .slice(0, limit)
    .map(({ post }) => post);
}
