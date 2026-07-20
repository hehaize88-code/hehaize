/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.CF_PAGES_STATIC_EXPORT === "1" ? { output: "export" } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
