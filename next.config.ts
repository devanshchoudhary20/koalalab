import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [25, 50, 75, 85, 100],
  }
};

export default nextConfig;

