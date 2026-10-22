import type { APIRoute } from "astro";
import { home } from "../../lib/catalog";
import { unavailable, urlset } from "../../lib/sitemap";
export const GET: APIRoute = async ({ site }) => {
  try {
    const { categories } = await home();
    return urlset(
      site!.origin,
      categories.map((category) => `/spreadsheet/${category.slug}/`),
    );
  } catch {
    return unavailable();
  }
};
