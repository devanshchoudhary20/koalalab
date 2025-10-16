import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [25, 50, 75, 85, 100],
  }
};

export default nextConfig;

