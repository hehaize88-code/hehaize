import { articles, productFinds } from "../site-data";

const baseUrl = "https://lolobuy-sheet.com";

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
  const urls = [
    ...staticRoutes.map((path) => ({
      loc: `${baseUrl}${path}`,
      lastmod: "2026-07-26",
    })),
    ...articles.map((article) => ({
      loc: `${baseUrl}/articles/${article.slug}`,
      lastmod: article.updated,
    })),
    ...productFinds.map((product) => ({
      loc: `${baseUrl}/products/${product.slug}`,
      lastmod: "2026-07-26",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
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
