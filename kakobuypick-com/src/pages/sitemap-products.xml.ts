import type { APIRoute } from 'astro';
import { sourceListing } from '../lib/catalog';
import { xmlResponse, unavailableSitemap, escapeXML } from '../lib/sitemaps';
export const GET: APIRoute = async ({ site }) => {
  try {
    const { total, pages } = await sourceListing('', '', 'new', 1);
    if (!total || pages > 500) throw new Error('Source catalogue count unavailable');
    const entries = Array.from({length:pages}, (_,i) => `<sitemap><loc>${escapeXML(`${site!.origin}/sitemaps/products-${i+1}.xml`)}</loc></sitemap>`);
    return xmlResponse('sitemapindex', entries);
  } catch { return unavailableSitemap(); }
};
