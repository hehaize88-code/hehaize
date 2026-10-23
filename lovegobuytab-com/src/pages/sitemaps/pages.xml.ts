import type { APIRoute } from "astro";
import { content } from "../../lib/content";
import { urlset } from "../../lib/sitemap";
export const GET: APIRoute = ({ site }) =>
  urlset(
    site!.origin,
    [
      "/",
      "/spreadsheet/",
      "/faq/",
      "/articles/",
      ...content("en").articles.map(
        (article: any) => `/articles/${article.slug}/`,
      ),
    ],
    {
      "/": "2026-10-23",
      "/spreadsheet/": "2026-10-23",
      "/articles/": "2026-10-23",
      ...Object.fromEntries(
        content("en").articles.map((article: any) => [
          `/articles/${article.slug}/`,
          article.dateModified || "2026-10-22",
        ]),
      ),
    },
  );
