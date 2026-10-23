import {languages} from '../lib/i18n';
const paths=['/sitemap-pages.xml',...languages.map(([lang])=>`/sitemap-products/${lang}.xml`)];
export const GET=()=>new Response('<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(path=>`<sitemap><loc>https://oopbuytab.com${path}</loc></sitemap>`).join('')+'</sitemapindex>',{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});
