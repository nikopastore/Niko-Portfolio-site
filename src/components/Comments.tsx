"use client";

import { useState, useEffect } from "react";

interface Comment {
  name: string;
  comment: string;
  timestamp: string;
}

interface CommentsProps {
  postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`/api/comments?slug=${postSlug}`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []))
      .catch(() => setComments([]));
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug,
          name,
          email,
          comment,
          subscribed: subscribe,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit comment");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setComment("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="border-t border-card-border pt-10">
      <h3 className="text-xl font-semibold mb-6">Comments</h3>

      {/* Approved comments */}
      {comments.length > 0 && (
        <div className="space-y-4 mb-8">
          {comments.map((c, i) => (
            <div key={i} className="bg-card/50 rounded-lg p-4 border border-card-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{c.name}</span>
                <span className="text-xs text-muted">
                  {new Date(c.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-foreground/80">{c.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <div className="bg-card/30 rounded-lg p-6 border border-card-border">
        <h4 className="text-lg font-medium mb-4">Leave a comment</h4>
        
        {status === "success" ? (
          <div className="text-green-400 py-4">
            Thanks for your comment! It will appear after approval.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-muted mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-foreground/50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-1">
                Email * (required to comment, used for newsletter)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-foreground/50"
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm text-muted mb-1">
                Comment *
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-foreground/50 resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="subscribe"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
                className="rounded border-card-border"
              />
              <label htmlFor="subscribe" className="text-sm text-muted">
                Subscribe to newsletter for new posts and AI insights
              </label>
            </div>

            {status === "error" && (
              <div className="text-red-400 text-sm">{errorMsg}</div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors"
            >
              {status === "loading" ? "Submitting..." : "Submit Comment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
