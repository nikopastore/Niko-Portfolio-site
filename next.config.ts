import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep tracing and Turbopack scoped to this checkout when a parent folder
  // contains another lockfile (common in local multi-project workspaces).
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.elementarystateofmind.com" },
      { protocol: "https", hostname: "sdhomepros.app" },
    ],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.elementarystateofmind.com https://sdhomepros.app",
      "font-src 'self' data:",
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
