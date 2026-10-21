import { SITE_ORIGIN } from '../lib/site';
import { languages, localized } from '../lib/i18n';
import { content } from '../lib/editorial';
import { slugs } from '../lib/catalog';

const xmlEscape = (s: string) => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export const GET = () => {
  const paths = ['/', '/spreadsheet/', '/categories/', '/guide/', '/qc/', '/faq/', '/articles/',
    ...slugs.map(slug=>`/category/${slug}/`),
    ...content('en').articles.map(article=>`/articles/${article.slug}/`)];
  const urls = paths.flatMap(path=>{
    const alternatives = [...languages.map(([lang])=>[lang, new URL(localized(lang,path),SITE_ORIGIN).href]), ['x-default', new URL(path,SITE_ORIGIN).href]];
    const links = alternatives.map(([lang,href])=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${xmlEscape(href)}"/>`).join('');
    const article = content('en').articles.find(a=>path===`/articles/${a.slug}/`);
    const modified = article?.updated || (path==='/articles/' ? '2026-10-21' : undefined);
    const lastmod = modified ? `<lastmod>${modified}</lastmod>` : '';
    return languages.map(([lang])=>`<url><loc>${xmlEscape(new URL(localized(lang,path),SITE_ORIGIN).href)}</loc>${lastmod}${links}</url>`);
  });
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`,{
    headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}
  });
};
