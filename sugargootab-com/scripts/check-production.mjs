import assert from 'node:assert/strict';
import { parseHTML, DOMParser } from 'linkedom';
import worker from '../dist/server/index.js';
import { targets } from '../site-targets.mjs';

const request = (path, origin=targets.production, env={}) => worker.fetch(new Request(origin+path), env, {waitUntil(){}});
const www = await request('/fr/articles/?q=shoes','https://www.sugargootab.com');
assert.equal(www.status,308);
assert.equal(www.headers.get('Location'),targets.production+'/fr/articles/?q=shoes');
const http = await request('/faq/','http://sugargootab.com');
assert.equal(http.headers.get('Location'),targets.production+'/faq/');
const preview = await request('/faq/','https://sugargootab-com.example.workers.dev');
assert.match(preview.headers.get('X-Robots-Tag'),/noindex/);
const previewDoc = parseHTML(await preview.text()).document;
assert.equal(previewDoc.querySelector('link[rel=canonical]').getAttribute('href'),targets.production+'/faq/');
const robots = await request('/robots.txt');
assert.equal(robots.status,200);
assert.match(await robots.text(),new RegExp('Sitemap: '+targets.production+'/sitemap.xml'));
assert.match(await (await request('/robots.txt','https://sugargootab-com.example.workers.dev')).text(),/Disallow: \//);
const sitemap = await request('/sitemap.xml');
assert.equal(sitemap.status,200);
const xml = new DOMParser().parseFromString(await sitemap.text(),'text/xml');
const locations = [...xml.querySelectorAll('loc')].map(el=>el.textContent);
assert.equal(locations.length,672);
assert.equal(new Set(locations).size,locations.length);
assert(locations.every(url=>url.startsWith(targets.production+'/')&&!url.includes('?')));
assert(locations.includes(targets.production+'/mt/faq/'));
assert(locations.includes(targets.production+'/category/shoes/'));
const missing = await request('/unknown-page/');
assert.equal(missing.status,404);
assert.match(missing.headers.get('X-Robots-Tag'),/noindex/);
let assetPath;
const asset = await request('/brand/favicon.ico',targets.production,{ASSETS:{fetch(req){assetPath=new URL(req.url).pathname;return new Response('asset');}}});
assert.equal(assetPath,'/brand/favicon.ico');
assert.equal(await asset.text(),'asset');
console.log(JSON.stringify({production:'pass',wwwRedirect:308,sitemapUrls:locations.length,previewIndexing:'blocked',missingStatus:404,assetRouting:'pass'}));

// The temporary design review stays noindex and keeps navigation in its prefix.
for (const [locale,path] of [['en','/faq/'],['fr','/articles/'],['mt','/articles/']]) {
  const prefix=locale==='en'?'':'/'+locale;
  const response=await request('/design-preview'+prefix+path);
  assert.equal(response.status,200);
  assert.match(response.headers.get('X-Robots-Tag'),/noindex/);
  const doc=parseHTML(await response.text()).document;
  assert.equal(doc.documentElement.lang,locale);
  assert.equal(doc.querySelector('link[rel=canonical]').getAttribute('href'),targets.production+prefix+path);
  const links=[...doc.querySelectorAll('.site-header nav a,.article-card')].map(a=>a.getAttribute('href'));
  assert(links.every(h=>h.startsWith('/design-preview'+prefix+'/')));
  assert(doc.querySelector('.design-preview-bar'));
}
console.log(JSON.stringify({designPreview:'pass',indexing:'blocked',navigation:'prefixed',locales:3}));
