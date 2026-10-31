import type { APIRoute } from 'astro';
import { sourceListing, slugs } from '../../lib/catalog';
import { languages, localized } from '../../lib/i18n';
import { xmlResponse, unavailableSitemap, escapeXML } from '../../lib/sitemaps';
export const GET: APIRoute = async ({ site, params }) => {
  if (!/^[1-9]\d{0,2}$/.test(params.page || '') || Number(params.page)>500) return new Response('Not found',{status:404});
  const page=Number(params.page);
  try {
    const data=await sourceListing('', '', 'new', page);
    if (page>data.pages) return new Response('Not found',{status:404});
    const paths=[...new Set(data.products.filter(p=>slugs.includes(p.category)&&p.title).map(p=>p.path))];
    if (!paths.length) throw new Error('Source catalogue page unavailable');
    // Every shard reads one source page; no synthetic IDs or invented lastmod.
    return xmlResponse('urlset', languages.flatMap(([lang])=>paths.map(path=>`<url><loc>${escapeXML(site!.origin+localized(lang,'/products'+path))}</loc></url>`)));
  } catch { return unavailableSitemap(); }
};
