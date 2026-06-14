import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rateLimit } from "@/lib/rateLimit";

// Newsletter persistence lives in a gitignored runtime folder so subscriber
// emails are never committed to source control.
const NEWSLETTER_FILE = path.join(process.cwd(), "data", "runtime", "newsletter.json");

export async function POST(request: NextRequest) {
  const rl = rateLimit(request, "subscribe-post");
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } }
    );
  }
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Read existing subscribers
    let subscribers: string[] = [];
    try {
      const data = await fs.readFile(NEWSLETTER_FILE, "utf-8");
      subscribers = JSON.parse(data);
    } catch {
      subscribers = [];
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already subscribed
    if (subscribers.includes(normalizedEmail)) {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    // Add new subscriber
    subscribers.push(normalizedEmail);
    await fs.writeFile(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

// GET to see subscriber count (public)
export async function GET() {
  try {
    const data = await fs.readFile(NEWSLETTER_FILE, "utf-8");
    const subscribers: string[] = JSON.parse(data);
    return NextResponse.json({ count: subscribers.length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
