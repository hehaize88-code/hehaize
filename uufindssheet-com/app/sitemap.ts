import type { MetadataRoute } from "next";
import { guides } from "./guides/article-data";
import { products } from "./products/product-data";
import { categoryLandings } from "./categories/category-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-23");
  const articleUpdate = new Date("2026-08-12");
  const categoryUpdate = new Date("2026-08-08");
  const trustPaths = ["about", "contact", "editorial-policy", "privacy", "terms"];
  const localizedPaths = [
    "finds", "products", "how-it-works", "articles", "faq",
    ...trustPaths,
    ...products.map((product) => `products/${product.slug}`),
    ...guides.filter((guide) => !guide.englishOnly).map((guide) => `guides/${guide.slug}`),
  ];
  return [
    { url: "https://uufindssheet.com/", lastModified: articleUpdate, changeFrequency: "weekly", priority: 1 },
    ...["finds", "products", "how-it-works", "articles", "faq"].map((path) => ({
      url: `https://uufindssheet.com/${path}/`,
      lastModified: path === "articles" ? articleUpdate : lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...trustPaths.map((path) => ({
      url: `https://uufindssheet.com/${path}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...["en-gb", "de", "pl", "pt-br"].map((locale) => ({
      url: `https://uufindssheet.com/${locale}/`,
      lastModified: articleUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...["en-gb", "de", "pl", "pt-br"].flatMap((locale) =>
      localizedPaths.map((path) => ({
        url: `https://uufindssheet.com/${locale}/${path}/`,
        lastModified: path === "articles" ? articleUpdate : lastModified,
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
    ...categoryLandings.map((category) => ({
      url: `https://uufindssheet.com/categories/${category.slug}/`,
      lastModified: categoryUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...guides.map((guide) => ({
      url: `https://uufindssheet.com/guides/${guide.slug}/`,
      lastModified: new Date(guide.modifiedISO ?? "2026-07-23"),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
