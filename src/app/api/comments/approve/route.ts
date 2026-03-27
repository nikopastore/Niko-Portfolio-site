import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const COMMENTS_FILE = path.join(process.cwd(), "data", "comments.json");

interface Comment {
  postSlug: string;
  name: string;
  email: string;
  comment: string;
  timestamp: string;
  subscribed: boolean;
  approved: boolean;
}

export async function POST(request: NextRequest) {
  // Check API key
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { postSlug, timestamp } = body;

    if (!postSlug || !timestamp) {
      return NextResponse.json(
        { error: "Missing postSlug or timestamp" },
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
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
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
