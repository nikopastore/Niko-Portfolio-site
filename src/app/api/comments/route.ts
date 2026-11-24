import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rateLimit } from "@/lib/rateLimit";

// Data is intentionally written to a runtime folder that is gitignored.
// This keeps subscriber emails and pending comments out of the repo
// (and out of git history for the people who have already cloned it).
const COMMENTS_FILE = path.join(process.cwd(), "data", "runtime", "comments.json");
const NEWSLETTER_FILE = path.join(process.cwd(), "data", "runtime", "newsletter.json");
const RUNTIME_DIR = path.dirname(COMMENTS_FILE);

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 320;
const MAX_COMMENT_LENGTH = 5_000;
const MAX_SLUG_LENGTH = 120;

interface Comment {
  postSlug: string;
  name: string;
  email: string;
  comment: string;
  timestamp: string;
  subscribed: boolean;
  approved: boolean;
}

async function readComments(): Promise<Comment[]> {
  try {
    const data = await fs.readFile(COMMENTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeComments(comments: Comment[]): Promise<void> {
  await fs.mkdir(RUNTIME_DIR, { recursive: true });
  await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

async function addToNewsletter(email: string): Promise<void> {
  let subscribers: string[] = [];
  try {
    const data = await fs.readFile(NEWSLETTER_FILE, "utf-8");
    subscribers = JSON.parse(data);
  } catch {
    subscribers = [];
  }

  const normalizedEmail = email.toLowerCase().trim();
  if (!subscribers.includes(normalizedEmail)) {
    subscribers.push(normalizedEmail);
    await fs.mkdir(RUNTIME_DIR, { recursive: true });
    await fs.writeFile(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  const comments = await readComments();
  const approvedComments = comments
    .filter((c) => c.postSlug === slug && c.approved)
    .map(({ name, comment, timestamp }) => ({ name, comment, timestamp }));

  return NextResponse.json({ comments: approvedComments });
}

export async function POST(request: NextRequest) {
  const rl = rateLimit(request, "comments-post");
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } }
    );
  }
  try {
    const body = await request.json();
    const { postSlug, name, email, comment, subscribed } = body;

    if (
      typeof postSlug !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof comment !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedSlug = postSlug.trim();
    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedComment = comment.trim();

    if (!normalizedSlug || !normalizedName || !normalizedEmail || !normalizedComment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      normalizedSlug.length > MAX_SLUG_LENGTH ||
      normalizedName.length > MAX_NAME_LENGTH ||
      normalizedEmail.length > MAX_EMAIL_LENGTH ||
      normalizedComment.length > MAX_COMMENT_LENGTH ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return NextResponse.json(
        { error: "Please check the length and format of your submission" },
        { status: 400 }
      );
    }

    const newComment: Comment = {
      postSlug: normalizedSlug,
      name: normalizedName,
      email: normalizedEmail,
      comment: normalizedComment,
      timestamp: new Date().toISOString(),
      subscribed: Boolean(subscribed),
      approved: false,
    };

    const comments = await readComments();
    comments.push(newComment);
    await writeComments(comments);

    // Add to newsletter if subscribed
    if (subscribed) {
      await addToNewsletter(normalizedEmail);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save comment" },
      { status: 500 }
    );
  }
}
