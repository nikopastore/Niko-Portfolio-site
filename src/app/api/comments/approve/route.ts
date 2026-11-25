import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rateLimit } from "@/lib/rateLimit";
import { isValidSlug } from "@/lib/blog";

const COMMENTS_FILE = path.join(process.cwd(), "data", "runtime", "comments.json");

interface Comment {
  postSlug: string;
  name: string;
  email: string;
  comment: string;
  timestamp: string;
  subscribed: boolean;
  approved: boolean;
}

function isAuthorized(apiKey: string | null, expectedKey: string | undefined): boolean {
  if (!apiKey || !expectedKey) return false;
  const providedDigest = createHash("sha256").update(apiKey).digest();
  const expectedDigest = createHash("sha256").update(expectedKey).digest();
  return timingSafeEqual(providedDigest, expectedDigest);
}

export async function POST(request: NextRequest) {
  const rl = rateLimit(request, "comments-approve");
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } }
    );
  }

  const apiKey = request.headers.get("x-api-key");
  if (!isAuthorized(apiKey, process.env.ADMIN_API_KEY)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { postSlug, timestamp } = body;

    if (
      typeof postSlug !== "string" ||
      !isValidSlug(postSlug) ||
      typeof timestamp !== "string" ||
      timestamp.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid postSlug or timestamp" },
        { status: 400 }
      );
    }

    // Read comments
    let comments: Comment[] = [];
    try {
      const data = await fs.readFile(COMMENTS_FILE, "utf-8");
      comments = JSON.parse(data);
    } catch {
      return NextResponse.json({ error: "No comments found" }, { status: 404 });
    }

    // Find and approve the comment
    let found = false;
    comments = comments.map((c) => {
      if (c.postSlug === postSlug && c.timestamp === timestamp) {
        found = true;
        return { ...c, approved: true };
      }
      return c;
    });

    if (!found) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to approve comment" },
      { status: 500 }
    );
  }
}

// GET to list all pending comments (for admin)
export async function GET(request: NextRequest) {
  const rl = rateLimit(request, "comments-approve");
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } }
    );
  }

  const apiKey = request.headers.get("x-api-key");
  if (!isAuthorized(apiKey, process.env.ADMIN_API_KEY)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await fs.readFile(COMMENTS_FILE, "utf-8");
    const comments: Comment[] = JSON.parse(data);
    const pending = comments.filter((c) => !c.approved);
    return NextResponse.json({ comments: pending });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}
