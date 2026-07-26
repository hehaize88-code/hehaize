import type { MetadataRoute } from "next";
import { articles, productFinds } from "./site-data";

const baseUrl = "https://lolobuy-sheet.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/finds",
    "/categories",
    "/how-it-works",
    "/guides/qc",
    "/guides/shipping",
    "/articles",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date("2026-07-26"),
      changeFrequency: route === "" ? ("daily" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route.startsWith("/guides") ? 0.8 : 0.7,
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...productFinds.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date("2026-07-26"),
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
  ];
}
