import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  outputFileTracingRoot: ".",
};

export default nextConfig;
