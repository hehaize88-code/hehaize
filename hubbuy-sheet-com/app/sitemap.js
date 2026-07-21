import { SITE_URL } from "@/data/site";
import { articles } from "@/data/articles";

export const dynamic = "force-static";

export default function sitemap() {
  const homeAlternates = {
    languages: {
      en: `${SITE_URL}/`,
      "pt-BR": `${SITE_URL}/pt-br/`,
      de: `${SITE_URL}/de/`,
      "x-default": `${SITE_URL}/`,
    },
  };
  const routes = ["/", "/pt-br/", "/de/", "/products/", "/articles/", "/guides/how-to-buy/", "/guides/qc-checks/", "/guides/shipping/", "/faq/", "/about/", "/contact/", "/legal/privacy/", "/legal/terms/"];
  const pages = routes.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(["/", "/pt-br/", "/de/"].includes(route) ? "2026-07-21T00:00:00Z" : "2026-07-20T00:00:00Z"),
    changeFrequency: index < 5 ? "weekly" : "monthly",
    priority: route === "/" ? 1 : ["/pt-br/", "/de/"].includes(route) ? 0.9 : route === "/products/" ? 0.9 : route === "/articles/" ? 0.85 : 0.7,
    ...(["/", "/pt-br/", "/de/"].includes(route) ? { alternates: homeAlternates } : {}),
  }));
  const articlePages = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}/`,
    lastModified: new Date(`${article.updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...pages, ...articlePages];
}
