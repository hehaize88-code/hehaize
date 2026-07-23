import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.CF_PAGES_STATIC_EXPORT === "1"
    ? { output: "export" as const }
    : {}),
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
