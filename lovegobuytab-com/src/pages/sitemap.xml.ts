import type { APIRoute } from "astro";
import { sourceSitemapPage, unavailable, xml, xmlEscape } from "../lib/sitemap";
export const GET: APIRoute = async ({ site }) => {
  try {
    const { pages } = await sourceSitemapPage(1);
    const paths = [
      "/sitemaps/pages.xml",
      "/sitemaps/categories.xml",
      ...Array.from(
        { length: pages },
        (_, i) => `/sitemaps/products-${i + 1}.xml`,
      ),
    ];
    return xml(
      `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<sitemap><loc>${xmlEscape(site!.origin + path)}</loc></sitemap>`).join("")}</sitemapindex>`,
    );
  } catch {
    return unavailable();
  }
};
