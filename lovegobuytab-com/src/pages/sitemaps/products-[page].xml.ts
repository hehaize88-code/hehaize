import type { APIRoute } from "astro";
import { productRoute } from "../../lib/content";
import { sourceSitemapPage, unavailable, urlset } from "../../lib/sitemap";
export const GET: APIRoute = async ({ params, site }) => {
  const value = params.page || "";
  if (!/^[1-9]\d{0,3}$/.test(value))
    return new Response("Not found", { status: 404 });
  try {
    const page = Number(value);
    const result = await sourceSitemapPage(page);
    if (page > result.pages) return new Response("Not found", { status: 404 });
    return urlset(
      site!.origin,
      result.products.map((product) => productRoute(product.path)),
    );
  } catch {
    return unavailable();
  }
};
