import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Public route URLs use trailing slashes; the Worker preserves them while
     routing internally to Vinext's slashless route matcher. */
};

export default nextConfig;
