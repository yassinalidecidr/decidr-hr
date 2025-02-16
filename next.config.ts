import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensure it's using the app directory
  }
};

export default nextConfig;
