import type { APIRoute } from "astro";
import { languages, localized } from "../lib/i18n";
import { content } from "../lib/content";
export const GET: APIRoute = ({ site }) => {
  const origin = site!.origin;
  const routes = [
    "/",
    "/spreadsheet/",
    "/faq/",
    "/articles/",
    ...content("en").articles.map((a: any) => `/articles/${a.slug}/`),
  ];
  const esc = (v: string) =>
    v
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${languages.flatMap(([lang]) => routes.map((route) => `<url><loc>${esc(origin + localized(lang, route))}</loc>${languages.map(([code]) => `<xhtml:link rel="alternate" hreflang="${code}" href="${esc(origin + localized(code, route))}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${esc(origin + route)}"/></url>`)).join("")}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    },
  );
};
