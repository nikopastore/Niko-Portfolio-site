import { headers } from "next/headers";
import { createMarkdownResponse, renderBlogIndexMarkdown } from "@/lib/agent-mirror/render";

export const runtime = "nodejs";

export async function GET() {
  const hdrs = await headers();
  const markdown = await renderBlogIndexMarkdown();
  return createMarkdownResponse(markdown, "/blog", {
    botName: hdrs.get("x-agent-bot-name"),
    botCategory: hdrs.get("x-agent-bot-category"),
  });
}
