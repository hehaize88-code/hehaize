import {languages,localized} from '../lib/i18n';
import { targets } from '../../site-targets.mjs';
import {articles} from '../lib/articles';
import {categoryPaths} from '../lib/seo';
const paths=['/','/spreadsheet/','/guide/','/faq/','/articles/',...articles.map(a=>a.path),...categoryPaths];
export const GET=()=>{
  const localizedEntries=languages.flatMap(([lang])=>paths.map(path=>{
    const alternate=languages.map(([code])=>`<xhtml:link rel="alternate" hreflang="${code}" href="${targets.production}${localized(code,path)}"/>`).join('');
    const article=articles.find(a=>a.path===path);
    const changed=article?.checked||((path==='/'||path==='/articles/')?articles.map(a=>a.checked).sort().at(-1):null);
    const lastmod=changed?`<lastmod>${changed}</lastmod>`:'';
    return `<url><loc>${targets.production}${localized(lang,path)}</loc>${lastmod}${alternate}<xhtml:link rel="alternate" hreflang="x-default" href="${targets.production}${path}"/></url>`;
  })).join('');
  const entries=localizedEntries;
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
