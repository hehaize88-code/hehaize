import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lolobuy-sheet.com/sitemap.xml",
    host: "https://lolobuy-sheet.com",
  };
}
