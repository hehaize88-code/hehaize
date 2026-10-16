import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseList, parseDetail, buyUrl, catalogueRoute, normalizeQuery, LANGS, CATEGORIES, localPath } from '../commerce/catalog.mjs';
import { getLocalizedPath } from '../data/i18n.js';
import { configureChrome } from '../commerce/chrome.mjs';
import { products } from '../data/site.js';

const listHtml = readFileSync('tests/fixtures/catalog.html', 'utf8');
const detailHtml = readFileSync('tests/fixtures/detail.html', 'utf8');
const list = parseList(listHtml), detail = parseDetail(detailHtml);
assert.equal(list.products.length, 3); assert.equal(list.total, 3446); assert.equal(list.pages, 58);
assert.equal(detail.sourceId, '7853208944'); assert.equal(detail.images.length, 2);
assert.ok(detail.images.every(image => image.startsWith('https://cnbuycha.com/')));
const exactBuy = 'https://www.hubbuy.com/product/2/7853208944?utm_source=website&utm_medium=share&utm_campaign=product_details&utm_content=7853208944';
assert.equal(buyUrl('7853208944'), exactBuy);
assert.equal(buyUrl('3438'), null); assert.equal(buyUrl('7853208944&bad=1'), null);
assert.equal(normalizeQuery(exactBuy), '7853208944');
assert.equal(normalizeQuery('https://weidian.com/item.html?itemID=7853208944'), '7853208944');
assert.equal(normalizeQuery('  green shirt  '), 'green shirt');
assert.equal(getLocalizedPath('/catalog/accessories/3438.html', 'de'), '/de/catalog/accessories/3438.html');
const requests = [];
globalThis.fetch = async url => {
  const parsed = new URL(url); requests.push(parsed);
  assert.equal(parsed.origin, 'https://cnbuycha.com');
  return new Response(parsed.pathname.endsWith('.html') ? detailHtml : listHtml, { headers: { 'content-type': 'text/html' } });
};
const chrome = {};
for (const locale of LANGS) {
  const html = readFileSync(`out/${locale === 'en' ? '' : locale + '/'}index.html`, 'utf8');
  chrome[locale] = { header: html.match(/<header\b[\s\S]*?<\/header>/)[0], footer: html.match(/<footer\b[\s\S]*?<\/footer>/)[0] };
}
configureChrome(chrome);
let checks = 13;
for (const locale of LANGS) {
  for (const category of CATEGORIES) {
    const path = localPath('/' + category + '/', locale);
    const response = await catalogueRoute(new Request('https://hubbuy-sheet.com' + path + '?q=bag&sort=price&page=2'));
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal(requests.at(-1).pathname, '/' + category + '/');
    assert.equal(requests.at(-1).searchParams.get('q'), 'bag');
    assert.equal(requests.at(-1).searchParams.get('sort'), 'price');
    assert.equal(requests.at(-1).searchParams.get('page'), '2');
    assert.ok(html.includes('noindex,follow')); assert.ok(html.includes('https://hubbuy.com/signUp'));
    assert.ok(html.includes(`href="${path}?q=bag&amp;sort=click&amp;page=1"`));
    checks += 8;
  }
  const path = localPath('/accessories/3438.html', locale);
  const detailResponse = await catalogueRoute(new Request('https://hubbuy-sheet.com' + path));
  const html = await detailResponse.text();
  assert.equal(detailResponse.status, 200); assert.ok(html.includes(exactBuy.replaceAll('&', '&amp;')));
  assert.equal([...html.matchAll(/data-gallery-index=/g)].length, 2);
  for (const [i, image] of detail.images.entries()) assert.ok(html.indexOf(`data-gallery-index="${i}"`) < html.indexOf(`src="${image}"`, html.indexOf(`data-gallery-index="${i}"`)));
  for (const code of LANGS) {
    const other = localPath('/accessories/3438.html', code);
    assert.match(html, new RegExp(`href="${other}"[^>]*data-locale-code="${code}"`));
  }
  assert.ok(html.includes(`rel="canonical" href="https://hubbuy-sheet.com${path}"`));
  const imageResponse = await catalogueRoute(new Request('https://hubbuy-sheet.com' + localPath('/image-search/', locale)));
  assert.equal(imageResponse.status, 200); assert.ok((await imageResponse.text()).includes('id="image-file"'));
  checks += 12;
}
const api = await catalogueRoute(new Request('https://hubbuy-sheet.com/api/catalog?q=' + encodeURIComponent(exactBuy)));
assert.deepEqual(await api.json(), list); assert.equal(requests.at(-1).searchParams.get('q'), '7853208944');
assert.equal(await catalogueRoute(new Request('https://hubbuy-sheet.com/articles/')), null);
assert.equal((await catalogueRoute(new Request('https://hubbuy-sheet.com/catalog/unknown/'))).status, 404);
assert.equal((await catalogueRoute(new Request('https://hubbuy-sheet.com/catalog/', { method: 'POST' }))).status, 405);
assert.equal((await catalogueRoute(new Request('https://hubbuy-sheet.com/en/catalog/'))).headers.get('location'), 'https://hubbuy-sheet.com/catalog/');
globalThis.fetch = async () => { throw Error('offline'); };
assert.equal((await catalogueRoute(new Request('https://hubbuy-sheet.com/catalog/'))).status, 503);
assert.equal((await catalogueRoute(new Request('https://hubbuy-sheet.com/api/catalog'))).status, 502);
const { default: worker } = await import('../out/_worker.js');
for (const product of products) {
  for (const locale of LANGS) {
    const path = getLocalizedPath(product.localHref, locale);
    const response = await worker.fetch(new Request('https://hubbuy-sheet.com' + path), {});
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), 'https://hubbuy-sheet.com' + (locale === 'en' ? '' : '/' + locale) + product.catalogHref);
    checks += 2;
  }
}
const index = JSON.parse(readFileSync('out/assets/catalog-image-index.json'));
assert.equal(index.source, 'https://cnbuycha.com'); assert.equal(index.products.length, index.indexedCount);
assert.equal(index.catalogCount, 3446); assert.equal(index.indexedCount, 3445);
assert.ok(index.products.every(product => /^\/[a-z-]+\/\d+\.html$/.test(product.path) && product.hash.length === 64 && product.cells.length === 48));
const sitemap = readFileSync('out/sitemap-catalog.xml', 'utf8');
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 3 * (index.catalogCount + CATEGORIES.length));
assert.ok(sitemap.includes('https://hubbuy-sheet.com/catalog/accessories/3438.html'));
assert.ok(readFileSync('out/robots.txt', 'utf8').includes('sitemap-catalog.xml'));
assert.ok(readFileSync('out/brand/hubbuy-favicon.ico').equals(Buffer.from(readFileSync('commerce/favicon.base64', 'utf8').trim(), 'base64')));
console.log(`PASS: commerce routes across 12 categories and 3 locales; live-source fixtures, exact purchase URL, all categories/locales, errors, 192 legacy redirects, image index, sitemap and official favicon.`);
