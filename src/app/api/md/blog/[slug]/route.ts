import { headers } from "next/headers";
import { createMarkdownResponse, renderBlogPostMarkdown } from "@/lib/agent-mirror/render";

export const runtime = "nodejs";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const markdown = await renderBlogPostMarkdown(slug);

  if (!markdown) {
    return new Response("Not found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const hdrs = await headers();
  return createMarkdownResponse(markdown, `/blog/${slug}`, {
    botName: hdrs.get("x-agent-bot-name"),
    botCategory: hdrs.get("x-agent-bot-category"),
  });
}
