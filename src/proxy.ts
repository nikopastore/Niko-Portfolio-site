import { NextResponse, type NextRequest } from "next/server";
import { logAgentMirrorRequest, wantsMarkdown } from "@/lib/agent-mirror/bots";

function mapToMirrorApiPath(pathname: string): string | null {
  if (pathname === "/" || pathname === "/index.md") {
    return "/api/md";
  }
  if (pathname === "/blog" || pathname === "/blog.md") {
    return "/api/md/blog";
  }
  const postMatch = pathname.match(/^\/blog\/([a-z0-9-]+?)(?:\.md)?$/i);
  if (postMatch) {
    return `/api/md/blog/${postMatch[1]}`;
  }
  return null;
}

function mirrorUrlForPath(pathname: string): string {
  if (pathname === "/") return "/index.md";
  return pathname.endsWith(".md") ? pathname : `${pathname}.md`;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (
    request.headers.get("rsc") === "1" ||
    request.headers.has("next-router-prefetch") ||
    searchParams.has("_rsc") ||
    pathname === "/blog/feed.xml"
  ) {
    return NextResponse.next();
  }

  const mirrorApiPath = mapToMirrorApiPath(pathname);
  if (!mirrorApiPath) {
    return NextResponse.next();
  }

  const isExplicitMd = pathname.endsWith(".md");
  const decision = wantsMarkdown(request.headers);

  if (isExplicitMd || decision.serveMarkdown) {
    const trigger = isExplicitMd ? "dot_md" : decision.trigger;
    logAgentMirrorRequest({
      path: pathname,
      servedFormat: "markdown",
      trigger,
      classification: decision.classification,
      headers: request.headers,
    });

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = mirrorApiPath;

    const requestHeaders = new Headers(request.headers);
    if (decision.classification.botName) {
      requestHeaders.set("x-agent-bot-name", decision.classification.botName);
    }
    requestHeaders.set("x-agent-bot-category", decision.classification.category);

    return NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept, User-Agent");
  response.headers.append(
    "Link",
    `<${mirrorUrlForPath(pathname)}>; rel="alternate"; type="text/markdown"`
  );
  return response;
}

export const config = {
  matcher: ["/", "/index.md", "/blog", "/blog.md", "/blog/:path*"],
};
