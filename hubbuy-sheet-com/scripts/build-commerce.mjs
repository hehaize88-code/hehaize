import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { CATEGORIES, LANGS, prefix } from '../commerce/catalog.mjs';
import { products } from '../data/site.js';

export async function buildCommerce(outputRoot) {
  const read = path => readFileSync(resolve(outputRoot, path), 'utf8');
  const chrome = {};
  for (const locale of LANGS) {
    const html = read((locale === 'en' ? '' : locale + '/') + 'index.html');
    chrome[locale] = {
      header: html.match(/<header\b[\s\S]*?<\/header>/)?.[0],
      footer: html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0],
    };
    if (!chrome[locale].header || !chrome[locale].footer) throw Error('Missing site shell: ' + locale);
    if (locale === 'en') chrome.styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map(m => m[0]).join('');
  }
  let shell = readFileSync('commerce/chrome.mjs', 'utf8').replaceAll('export ', '');
  shell += `\nconfigureChrome(${JSON.stringify(chrome)});\n`;
  const adapter = readFileSync('commerce/catalog.mjs', 'utf8').replace(/^import .*?;\n/, '').replaceAll('export ', '');
  const legacy = Object.fromEntries(products.map(product => [product.id, product.catalogHref]));
  const worker = readFileSync('_worker.js', 'utf8').replace(/^import .*?;\n/, '').replace('/*LEGACY_PRODUCTS*/ {}', JSON.stringify(legacy));
  writeFileSync(resolve(outputRoot, '_worker.js'), shell + adapter + worker);
  mkdirSync(resolve(outputRoot, 'brand'), { recursive: true });
  writeFileSync(resolve(outputRoot, 'brand/hubbuy-favicon.ico'), Buffer.from(readFileSync('commerce/favicon.base64', 'utf8').trim(), 'base64'));

  // Reuse the shared cnbuycha image descriptors and apply the latest source refresh.
  const base = JSON.parse(readFileSync('../hipobuyy-sheet-com/dist/assets/catalog-image-index.json', 'utf8'));
  let delta = JSON.parse(readFileSync('commerce/image-index-delta.json', 'utf8'));
  if (base.updatedAt > delta.updatedAt) delta = { ...base, removed: [], products: [] };
  const indexed = new Map(base.products.map(product => [product.path, product]));
  for (const path of delta.removed) indexed.delete(path);
  for (const product of delta.products) indexed.set(product.path, product);
  const index = { source: base.source, updatedAt: delta.updatedAt, catalogCount: delta.catalogCount, indexedCount: indexed.size, products: [...indexed.values()] };
  if (index.indexedCount !== delta.indexedCount) throw Error('Image index count mismatch');
  mkdirSync(resolve(outputRoot, 'assets'), { recursive: true });
  writeFileSync(resolve(outputRoot, 'assets/catalog-image-index.json'), JSON.stringify(index));
  const paths = ['/', ...CATEGORIES.filter(category => category !== 'AllProducts').map(category => '/' + category + '/'), ...index.products.map(product => product.path), ...(delta.unindexedPaths || [])];
  const records = LANGS.flatMap(locale => paths.map(path => `<url><loc>https://hubbuy-sheet.com${prefix(locale)}/catalog${path}</loc></url>`));
  writeFileSync(resolve(outputRoot, 'sitemap-catalog.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${records.join('')}</urlset>`);
  for (const filename of ['sitemap.xml', 'sitemap-en.xml', 'sitemap-pt-br.xml', 'sitemap-de.xml']) {
    writeFileSync(resolve(outputRoot, filename), read(filename).replace(/\s*<url>\s*<loc>https:\/\/hubbuy-sheet\.com\/(?:pt-br\/|de\/)?products\/[^<]*<\/loc>[\s\S]*?<\/url>/g, ''));
  }
  writeFileSync(resolve(outputRoot, 'robots.txt'), read('robots.txt') + 'Sitemap: https://hubbuy-sheet.com/sitemap-catalog.xml\n');
  console.log(`Commerce: ${LANGS.length} locales, ${products.length} legacy redirects, ${index.indexedCount}/${index.catalogCount} image descriptors.`);
}
