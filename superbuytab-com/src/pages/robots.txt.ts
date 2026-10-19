import { targets,isProductionRequest } from '../../site-targets.mjs';
export const GET=({url})=>new Response(isProductionRequest(url)?`User-agent: *\nAllow: /\nSitemap: ${targets.production}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
