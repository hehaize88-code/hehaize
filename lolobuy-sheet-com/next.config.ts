import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cnbuycha.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
