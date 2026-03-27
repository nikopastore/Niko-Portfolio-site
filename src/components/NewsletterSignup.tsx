"use client";

import { useState } from "react";

export default function NewsletterSignup() {
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

  return (
    <div className="bg-card/30 rounded-lg p-6 border border-card-border">
      <h4 className="text-lg font-semibold mb-2">Subscribe to the Newsletter</h4>
      <p className="text-sm text-muted mb-4">
        Get new posts, AI insights, and automation tips delivered to your inbox.
      </p>

      {status === "success" ? (
        <div className="text-green-400 py-2">
          Thanks for subscribing! 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 bg-background border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-foreground/50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <div className="text-red-400 text-sm mt-2">{errorMsg}</div>
      )}
    </div>
  );
}
