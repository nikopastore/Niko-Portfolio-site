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
};

export default nextConfig;
