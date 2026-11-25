import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/data";
import { rateLimit } from "@/lib/rateLimit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;
const MAX_ROLE_LENGTH = 120;
const MAX_PROBLEM_LENGTH = 3_000;
const MAX_TIMELINE_LENGTH = 80;
const MAX_BUDGET_LENGTH = 80;
const MAX_LINKS_LENGTH = 500;

function cleanString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  const rl = rateLimit(request, "contact-post");
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } }
    );
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const { role, problem, timeline, budget, links, email, website } = body as Record<string, unknown>;

    // Honeypot check: pretend success without sending email.
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (typeof email !== "string") {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail || normalizedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const cleanRole = cleanString(role, MAX_ROLE_LENGTH);
    const cleanProblem = cleanString(problem, MAX_PROBLEM_LENGTH);
    const cleanTimeline = cleanString(timeline, MAX_TIMELINE_LENGTH);
    const cleanBudget = cleanString(budget, MAX_BUDGET_LENGTH);
    const cleanLinks = cleanString(links, MAX_LINKS_LENGTH);

    if (!cleanRole && !cleanProblem) {
      return NextResponse.json(
        { error: "Please describe either the role or the problem you need help with." },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json(
        { error: "Direct email delivery is not configured yet", fallback: "mailto" },
        { status: 503 }
      );
    }

    const subject = `Hire: ${cleanRole || "Project inquiry"}${cleanTimeline ? ` (${cleanTimeline})` : ""}`;
    const text = [
      `Role: ${cleanRole || "-"}`,
      `Timeline: ${cleanTimeline || "-"}`,
      `Budget: ${cleanBudget || "-"}`,
      `Email: ${normalizedEmail}`,
      "",
      "Problem:",
      cleanProblem || "-",
      "",
      "Relevant links:",
      cleanLinks || "-",
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio Inquiry <onboarding@resend.dev>",
        to: [siteConfig.email],
        reply_to: normalizedEmail,
        subject,
        text,
      }),
    });

    if (!resendResponse.ok) {
      return NextResponse.json(
        { error: "Email delivery failed", fallback: "mailto" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, delivery: "resend" });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
