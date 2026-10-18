import { SITE_ORIGIN, isProductionOrigin } from '../lib/site';

export const GET=({url}: {url: URL})=>new Response(
  isProductionOrigin(url)
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
  {headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=300'}}
);

