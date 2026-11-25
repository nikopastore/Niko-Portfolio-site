// Lightweight in-memory rate limiter for portfolio endpoints.
// Production-grade multi-instance enforcement would use Upstash Redis / Vercel KV,
// while this zero-dependency map bounds memory by pruning expired entries.
const buckets = new Map<string, { resetAt: number; count: number }>();
const WINDOW_MS = 60_000;
const MAX = 5;
const PRUNE_THRESHOLD = 500;

function pruneExpired(now: number) {
  if (buckets.size <= PRUNE_THRESHOLD) return;
  for (const [key, entry] of buckets) {
    if (now > entry.resetAt) {
      buckets.delete(key);
    }
  }
}

export function rateLimit(request: Request, bucket: string): { ok: boolean; retryAfterSec?: number } {
  const realIp = request.headers.get("x-real-ip")?.trim();
  const xfwd = request.headers.get("x-forwarded-for");
  const ip = realIp || (xfwd ? xfwd.split(",")[0].trim() : "") || "unknown";
  const key = `${bucket}:${ip}`;
  const t = Date.now();
  pruneExpired(t);

  const item = buckets.get(key);
  if (!item || t > item.resetAt) {
    buckets.set(key, { resetAt: t + WINDOW_MS, count: 1 });
    return { ok: true };
  }
  if (item.count >= MAX) {
    return { ok: false, retryAfterSec: Math.ceil((item.resetAt - t) / 1000) };
  }
  item.count += 1;
  return { ok: true };
}
