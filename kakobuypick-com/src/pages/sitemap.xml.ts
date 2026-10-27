import type { APIRoute } from 'astro';
import en from '../content/editorial/en.json';
import { languages, localized } from '../lib/i18n';
import { slugs } from '../lib/catalog';
import { reviewed, faqReviewed } from '../lib/editorial';

// Language alternates, including x-default, are declared in each HTML page.
// Only stable canonical pages belong here; search/filter URLs are noindex.
const pages = [
  '/', '/spreadsheet/',
  ...slugs.map(slug => `/category/${slug}/`),
  '/guide/', '/faq/', '/articles/',
  ...en.articles.map(article => `/articles/${article.slug}/`),
];
const escapeXML = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = ({ site }) => {
  const origin = site!.origin;
  const urls = languages.flatMap(([lang]) => pages.map(path => {
    const article=en.articles.find(item=>path===`/articles/${item.slug}/`);
    const lastmod=article?.updatedOn||(path==='/articles/'?en.articles.reduce((latest,a)=>a.updatedOn>latest?a.updatedOn:latest,reviewed):path==='/faq/'?faqReviewed:path==='/guide/'?reviewed:'');
    return `  <url><loc>${escapeXML(origin + localized(lang, path))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  }));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
};
