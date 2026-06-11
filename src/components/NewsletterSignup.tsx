"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NewsletterSignup({ variant = "default" }: { variant?: "default" | "compact" | "inline" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const compact = variant === "compact";

  return (
    <div
      className={cn(
        "rounded-3xl border border-card-border bg-card/60 p-6",
        compact && "lg:ml-auto lg:max-w-md",
        variant === "inline" && "my-10"
      )}
    >
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Newsletter</p>
        <h4 className="mt-2 text-xl font-semibold">Get the practical AI systems memo.</h4>
        <p className="mt-2 text-sm text-muted">
          One focused note on AI agents, data engineering, and automation. No mass-produced slop, no generic prompt lists.
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500">
          You&apos;re in. I&apos;ll send the useful stuff. 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={cn("flex gap-2", !compact && "sm:flex-row", "flex-col sm:flex-row")}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="min-w-0 flex-1 rounded-full border border-card-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:opacity-50"
          >
            {status === "loading" ? "Joining..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && <div className="mt-2 text-sm text-red-400">{errorMsg}</div>}
      <p className="mt-3 text-xs text-muted">Built for builders. Easy unsubscribe.</p>
    </div>
  );
}
