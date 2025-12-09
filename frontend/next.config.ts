import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true, // 👈 FIX PARA NEXT 14+
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
