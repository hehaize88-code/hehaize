import type { MetadataRoute } from "next";
import { guides } from "./guides/article-data";
import { products } from "./products/product-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-23");
  return [
    { url: "https://uufindssheet.com/", lastModified, changeFrequency: "weekly", priority: 1 },
    ...["finds", "products", "how-it-works", "articles", "faq"].map((path) => ({
      url: `https://uufindssheet.com/${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...["de", "pl", "pt-br"].map((locale) => ({
      url: `https://uufindssheet.com/${locale}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `https://uufindssheet.com/products/${product.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...guides.map((guide) => ({
      url: `https://uufindssheet.com/guides/${guide.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
