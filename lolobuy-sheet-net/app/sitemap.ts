import type { MetadataRoute } from "next";
import { articles } from "./article-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/categories", priority: 0.85 },
    { path: "/qc-guide", priority: 0.85 },
    { path: "/shipping", priority: 0.85 },
    { path: "/articles", priority: 0.85 },
    { path: "/faq", priority: 0.85 },
    { path: "/how-it-works", priority: 0.8 },
  ];

  return [
    ...pages.map((page) => ({
      url: `https://lolobuy-sheet.net${page.path}`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "weekly" as const,
      priority: page.priority,
    })),
    ...articles.map((article) => ({
      url: `https://lolobuy-sheet.net/articles/${article.slug}`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
  ];
}
