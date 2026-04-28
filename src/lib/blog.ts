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
  excerpt: string;
  tags: string[];
  readTime: string;
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

function normalizeFrontmatter(
  data: Record<string, unknown>,
  content: string,
  slug: string
): BlogFrontmatter {
  const title = typeof data.title === "string" ? data.title : slug;
  const date = typeof data.date === "string" ? data.date : new Date().toISOString();
  const excerpt =
    typeof data.excerpt === "string"
      ? data.excerpt
      : content.split("\n").find((line) => line.trim().length > 0) ?? "";
  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag))
    : [];
  const readTime =
    typeof data.readTime === "string" ? data.readTime : estimateReadTime(content);

  return {
    title,
    date,
    excerpt,
    tags,
    readTime,
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
