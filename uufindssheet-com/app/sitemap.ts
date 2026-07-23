import type { MetadataRoute } from "next";
import { guides } from "./guides/article-data";
import { products } from "./products/product-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-23");
  const localizedPaths = [
    "finds", "products", "how-it-works", "articles", "faq",
    ...products.map((product) => `products/${product.slug}`),
    ...guides.map((guide) => `guides/${guide.slug}`),
  ];
  return [
    { url: "https://uufindssheet.com/", lastModified, changeFrequency: "weekly", priority: 1 },
    ...["finds", "products", "how-it-works", "articles", "faq"].map((path) => ({
      url: `https://uufindssheet.com/${path}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...["en-gb", "de", "pl", "pt-br"].map((locale) => ({
      url: `https://uufindssheet.com/${locale}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...["en-gb", "de", "pl", "pt-br"].flatMap((locale) =>
      localizedPaths.map((path) => ({
        url: `https://uufindssheet.com/${locale}/${path}/`,
        lastModified,
        changeFrequency: path.startsWith("guides/") ? "monthly" as const : "weekly" as const,
        priority: path.startsWith("products/") ? 0.8 : 0.75,
      }))
    ),
    ...products.map((product) => ({
      url: `https://uufindssheet.com/products/${product.slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...guides.map((guide) => ({
      url: `https://uufindssheet.com/guides/${guide.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
