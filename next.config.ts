import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
