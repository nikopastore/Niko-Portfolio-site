import { headers } from "next/headers";
import { createMarkdownResponse, renderHomeMarkdown } from "@/lib/agent-mirror/render";

export const runtime = "nodejs";

export async function GET() {
  const hdrs = await headers();
  const markdown = await renderHomeMarkdown();
  return createMarkdownResponse(markdown, "/", {
    botName: hdrs.get("x-agent-bot-name"),
    botCategory: hdrs.get("x-agent-bot-category"),
  });
}
