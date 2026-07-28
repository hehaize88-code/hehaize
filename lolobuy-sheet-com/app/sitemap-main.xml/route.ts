import { localeOptions, localizedPath } from "../i18n";
import { languageAlternates } from "../seo";
import { articles, productFinds } from "../site-data";

const baseUrl = "https://lolobuy-sheet.com";
const staticLastModified = "2026-07-28";

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

export async function GET() {
  const pages = [
    ...staticRoutes.map((path) => ({
      path: path || "/",
      lastmod: staticLastModified,
    })),
    ...articles.map((article) => ({
      path: `/articles/${article.slug}`,
      lastmod: article.updated,
    })),
    ...productFinds.map((product) => ({
      path: `/products/${product.slug}`,
      lastmod: staticLastModified,
    })),
  ];

  const urls = pages.flatMap((page) =>
    localeOptions.map((option) => ({
      loc: `${baseUrl}${localizedPath(page.path, option.code)}`,
      lastmod: page.lastmod,
      alternates: languageAlternates(page.path),
    })),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
${Object.entries(item.alternates)
  .map(
    ([locale, path]) =>
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}${path}" />`,
  )
  .join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
