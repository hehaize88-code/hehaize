import {languages,localized} from '../lib/i18n';
import { targets } from '../../site-targets.mjs';
const paths=['/','/spreadsheet/','/guide/','/faq/'];
export const GET=()=>{
  const entries=languages.flatMap(([lang])=>paths.map(path=>{
    const alternate=languages.map(([code])=>`<xhtml:link rel="alternate" hreflang="${code}" href="${targets.production}${localized(code,path)}"/>`).join('');
    return `<url><loc>${targets.production}${localized(lang,path)}</loc>${alternate}<xhtml:link rel="alternate" hreflang="x-default" href="${targets.production}${path}"/></url>`;
  })).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
