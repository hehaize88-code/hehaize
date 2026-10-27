import type { APIRoute } from 'astro';
import { listing, slugs } from '../lib/catalog';
import { languages, localized } from '../lib/i18n';

export const GET: APIRoute = async ({ site }) => {
  try {
    // The source exposes paginated HTML, not a complete product feed. This map
    // covers the current first catalogue page; it does not claim full inventory.
    const { products } = await listing('', '', 'new', 1);
    const paths = [...new Set(products.filter(p => slugs.includes(p.category) && p.image && p.price).map(p => p.path))];
    if (!paths.length) throw new Error('No source products available');
    const entries = languages.flatMap(([lang]) => paths.map(path =>
      `  <url><loc>${site!.origin}${localized(lang, '/products' + path)}</loc></url>`
    ));
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
    });
  } catch {
    // Never publish an empty success map when the source is unavailable.
    return new Response('Product sitemap temporarily unavailable', {
      status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'Retry-After': '300' }
    });
  }
};
