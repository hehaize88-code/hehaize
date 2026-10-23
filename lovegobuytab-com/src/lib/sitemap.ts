import { languages, localized } from "./i18n";
import { cards, source, CatalogError } from "./catalog";

export const xmlEscape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export function xml(body: string) {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}

export function urlset(
  origin: string,
  routes: string[],
  modified: Record<string, string> = {},
) {
  return xml(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${[
      ...new Set(routes),
    ]
      .map((route) => {
        const alternates =
          languages
            .map(
              ([lang]) =>
                `<xhtml:link rel="alternate" hreflang="${lang}" href="${xmlEscape(origin + localized(lang, route))}"/>`,
            )
            .join("") +
          `<xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(origin + route)}"/>`;
        return languages
          .map(
            ([lang]) =>
              `<url><loc>${xmlEscape(origin + localized(lang, route))}</loc>${modified[route] ? `<lastmod>${xmlEscape(modified[route])}</lastmod>` : ""}${alternates}</url>`,
          )
          .join("");
      })
      .join("")}</urlset>`,
  );
}

// One existing CNBuyCha listing page per shard. No independent product index.
export async function sourceSitemapPage(page: number) {
  const doc = await source(`/AllProducts/?sort=new&page=${page}`);
  const summary = doc.querySelector(".results-summary")?.textContent?.trim();
  if (!summary) throw new CatalogError("Catalog markup changed");
  const total = Number(summary.replace(/\D/g, ""));
  const products = cards(doc);
  const pages = Math.max(1, Math.ceil(total / 60));
  if (
    !Number.isSafeInteger(total) ||
    total < 0 ||
    pages > 10000 ||
    (total > 0 && page <= pages && !products.length)
  ) {
    throw new CatalogError("Invalid catalog sitemap source");
  }
  return { products, pages };
}

export function unavailable() {
  return new Response(
    "Catalog sitemap temporarily unavailable. Please retry.",
    {
      status: 503,
      headers: {
        "Retry-After": "300",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex",
      },
    },
  );
}
