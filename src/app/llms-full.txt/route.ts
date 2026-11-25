import { renderLlmsFullTxt } from "@/lib/agent-mirror/render";

export const runtime = "nodejs";

export async function GET() {
  const body = await renderLlmsFullTxt();
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
      "x-content-source": "agent-markdown-mirror",
    },
  });
}
