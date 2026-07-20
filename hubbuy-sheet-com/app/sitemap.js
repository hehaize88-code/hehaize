import { SITE_URL } from "@/data/site";
import { articles } from "@/data/articles";

export const dynamic = "force-static";

export default function sitemap() {
  const routes = ["", "/products", "/articles/", "/guides/how-to-buy", "/guides/qc-checks", "/guides/shipping", "/faq", "/about", "/legal/privacy", "/legal/terms"];
  const pages = routes.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-07-20T00:00:00Z"),
    changeFrequency: index < 3 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : index === 1 ? 0.9 : route === "/articles/" ? 0.85 : 0.7,
  }));
  const articlePages = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}/`,
    lastModified: new Date(`${article.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...pages, ...articlePages];
}
