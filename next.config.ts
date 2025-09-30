import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Ensure compatibility with Netlify
  experimental: {
    esmExternals: false
  }
};

export default nextConfig;
