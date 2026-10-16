import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { growthArticles } from '../data/growth-articles.js';
import { growthUpdates } from '../data/growth-updates.js';
import { getArticle } from '../data/articles.js';
const sitemap = readFileSync('out/sitemap.xml', 'utf8');
const decode = s => s.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');
let pages = 0;
for (const slug of [...growthArticles.map(a => a.slug), ...Object.keys(growthUpdates)]) {
 for (const locale of ['en', 'pt-br', 'de']) {
  const prefix = locale === 'en' ? '' : '/' + locale;
  const path = `${prefix}/articles/${slug}/`;
  const html = readFileSync(`out${path}index.html`, 'utf8');
  const article = getArticle(slug, locale);
  assert.ok(sitemap.includes(`<loc>https://hubbuy-sheet.com${path}</loc>`));
  for (const other of ['en', 'pt-br', 'de']) {
   const target = `https://hubbuy-sheet.com${other === 'en' ? '' : '/' + other}/articles/${slug}/`;
   assert.ok(html.includes(`hreflang="${other === 'pt-br' ? 'pt-BR' : other}" href="${target}"`));
  }
  const body = html.match(/<article class="seo-article-body">([\s\S]*?)<\/article>/)?.[1];
  assert.ok(body);
  if (article.growthContent) {
   assert.equal(decode(html.match(/<h1[^>]*>(.*?)<\/h1>/)[1]), article.title);
   assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), article.seoTitle);
   assert.equal([...body.matchAll(/id="step-\d+"/g)].length, article.growthContent.sections.length);
   const decoded = decode(body);
   for (const section of article.growthContent.sections) for (const text of section) assert.ok(decoded.includes(text), `${path}: complete local paragraph`);
   assert.ok(!body.includes('Research note:'));
   for (const [, link] of article.growthContent.links) assert.ok(body.includes(`href="${prefix}${link}"`));
   if (locale !== 'en') assert.ok(!decoded.includes(getArticle(slug).growthContent.deck));
  } else assert.ok(decode(body).includes(growthUpdates[slug][locale][0]));
  assert.ok(html.includes('"dateModified":"2026-10-16"'));
  pages++;
 }
}
for (const locale of ['en', 'pt-br', 'de']) {
 const prefix = locale === 'en' ? '' : '/' + locale;
 for (const page of ['/', '/articles/']) {
  const html = decode(readFileSync(`out${prefix}${page}index.html`, 'utf8'));
  for (const article of growthArticles) {
   assert.ok(html.includes(article.variants[locale].title));
   assert.ok(html.includes(`href="${prefix}/articles/${article.slug}/"`));
  }
 }
}
console.log(`PASS growth: ${pages} article pages in 3 languages, full localized sections, unchanged Portuguese URLs, metadata, hreflang, dates, internal links and home/index discovery.`);
