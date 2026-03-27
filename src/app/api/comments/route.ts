import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const COMMENTS_FILE = path.join(process.cwd(), "data", "comments.json");
const NEWSLETTER_FILE = path.join(process.cwd(), "data", "newsletter.json");

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
  try {
    const body = await request.json();
    const { postSlug, name, email, comment, subscribed } = body;

    if (!postSlug || !name || !email || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newComment: Comment = {
      postSlug,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      comment: comment.trim(),
      timestamp: new Date().toISOString(),
      subscribed: Boolean(subscribed),
      approved: false,
    };

    const comments = await readComments();
    comments.push(newComment);
    await writeComments(comments);

    // Add to newsletter if subscribed
    if (subscribed) {
      await addToNewsletter(email);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save comment" },
      { status: 500 }
    );
  }
}
