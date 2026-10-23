import {languages,localized} from '../lib/i18n';
import {contentFor} from '../lib/editorial';
import {slugs} from '../lib/catalog';

const origin='https://oopbuytab.com';
const paths=['/','/spreadsheet/','/finds/','/guide/','/qc/','/shipping/','/faq/','/articles/',
  ...slugs.map(slug=>`/category/${slug}/`),
  ...contentFor('en').articles.map(article=>`/articles/${article.slug}/`)];
const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+paths.map(path=>{
  const article=contentFor('en').articles.find(a=>path===`/articles/${a.slug}/`);
  const lastmod=article?`<lastmod>${article.modified}</lastmod>`:(['/','/articles/'].includes(path)?'<lastmod>2026-10-23</lastmod>':'');
  const alternates=languages.map(([lang])=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${origin}${localized(lang,path)}"/>`).join('')+`<xhtml:link rel="alternate" hreflang="x-default" href="${origin}${path}"/>`;
  return languages.map(([lang])=>`<url><loc>${origin}${localized(lang,path)}</loc>${lastmod}${alternates}</url>`).join('');
}).join('')+'</urlset>';
export const GET=()=>new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});
