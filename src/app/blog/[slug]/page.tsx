import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Prose } from "@/components/mdx/Prose";
import { formatDate, getPost, getPosts } from "@/lib/blog";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-muted hover:text-foreground">
            ← Back to blog
          </Link>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted uppercase tracking-wider">
              <span>{formatDate(post.frontmatter.date)}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{post.frontmatter.readTime}</span>
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight">
              {post.frontmatter.title}
            </h1>
            <p className="mt-4 text-foreground/70">
              {post.frontmatter.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-card-border text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Prose>{post.content}</Prose>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
