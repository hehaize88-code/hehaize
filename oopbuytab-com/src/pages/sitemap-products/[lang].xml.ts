import type {APIRoute} from 'astro';
import {languages,localized} from '../../lib/i18n';
import manifest from '../../content/seo/product-paths.json';
export const GET:APIRoute=({params})=>{
 const lang=params.lang||'';
 if(!languages.some(([code])=>code===lang))return new Response('Not found',{status:404,headers:{'X-Robots-Tag':'noindex'}});
 const urls=manifest.paths.map(path=>`<url><loc>https://oopbuytab.com${localized(lang,'/products'+path)}</loc></url>`).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});
};
