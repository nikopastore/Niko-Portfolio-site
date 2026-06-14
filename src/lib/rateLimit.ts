// Lightweight in-memory rate limiter for portfolio POST endpoints.
// Production-grade scale would use a Vercel KV / Upstash Redis backed
// counter, but for a portfolio site the in-memory map is sufficient and
// keeps the dependency surface zero. Limits are conservative: 5 requests
// per minute per IP per endpoint, which blocks drive-by spam without
// inconveniencing real users.
const buckets = new Map<string, { resetAt: number; count: number }>();
const WINDOW_MS = 60_000;
const MAX = 5;

export function rateLimit(request: Request, bucket: string): { ok: boolean; retryAfterSec?: number } {
  const xfwd = request.headers.get("x-forwarded-for");
  const ip = (xfwd ? xfwd.split(",")[0].trim() : "unknown") || "unknown";
  const key = `${bucket}:${ip}`;
  const t = Date.now();
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
