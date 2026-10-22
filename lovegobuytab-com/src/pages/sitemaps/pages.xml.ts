import type { APIRoute } from "astro";
import { content } from "../../lib/content";
import { urlset } from "../../lib/sitemap";
export const GET: APIRoute = ({ site }) =>
  urlset(site!.origin, [
    "/",
    "/spreadsheet/",
    "/faq/",
    "/articles/",
    ...content("en").articles.map(
      (article: any) => `/articles/${article.slug}/`,
    ),
  ]);
