import assert from 'node:assert/strict';
import { DOMParser, parseHTML } from 'linkedom';
import worker from '../dist/server/index.js';

const origin='https://kakobuypick.com';
const request=path=>worker.fetch(new Request(origin+path),{},{});
const response=await request('/sitemap.xml');
assert.equal(response.status,200);
assert.match(response.headers.get('content-type'),/application\/xml/);
const xml=new DOMParser().parseFromString(await response.text(),'text/xml');
assert.equal(xml.querySelector('parsererror'),null);
assert.equal(xml.documentElement.getAttribute('xmlns'),'http://www.sitemaps.org/schemas/sitemap/0.9');
const urls=[...xml.querySelectorAll('url > loc')].map(el=>el.textContent);
assert.equal(urls.length,840);
assert.equal(new Set(urls).size,840);
assert.equal(xml.querySelectorAll('lastmod').length,528);
for(const value of urls){
  const url=new URL(value);
  assert.equal(url.origin,origin);
  assert.equal(url.search,'');
  assert.ok(!url.pathname.includes('/image-search/')&&!url.pathname.startsWith('/en/'));
}
for(const locale of 'en de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt'.split(' ')){
  const prefix=locale==='en'?'':`/${locale}`;
  for(const path of ['/','/spreadsheet/','/guide/','/faq/','/articles/','/category/shoes/','/articles/kakobuy-qc-photos/','/articles/choose-kakobuy-spreadsheet/','/articles/kakobuy-jacket-finds/','/articles/kakobuy-sneaker-finds/','/articles/kakobuy-hoodie-finds/','/articles/kakobuy-poland-guide/','/articles/kakobuy-football-jerseys/','/articles/is-kakobuy-legit/','/articles/kakobuy-qc-finder/','/articles/kakobuy-italy-guide/'])assert.ok(urls.includes(origin+prefix+path));
}
for(const node of xml.querySelectorAll('url')){
 const path=new URL(node.querySelector('loc').textContent).pathname;
 if(path.endsWith('/articles/kakobuy-returns-refunds/'))assert.equal(node.querySelector('lastmod').textContent,'2026-10-27');
 if(path.endsWith('/articles/kakobuy-qc-photos/'))assert.equal(node.querySelector('lastmod').textContent,'2026-10-17');
}
const robots=await (await request('/robots.txt')).text();
assert.match(robots,/Allow: \/\n/);
assert.ok(!robots.includes('Disallow: /'));
assert.ok(robots.includes('Sitemap: '+origin+'/sitemap.xml'));
assert.ok(robots.includes('Sitemap: '+origin+'/sitemap-products.xml'));
for(const [path,status] of [['/image-search/',200],['/faq/?q=test',200],['/de/articles/?page=2',200],['/spreadsheet/not-a-route/',404],['/category/shoes/not-a-route/',404],['/products/not-valid',404]]){
  const result=await request(path);
  assert.equal(result.status,status,path);
  assert.equal(result.headers.get('x-robots-tag'),'noindex,follow',path);
  const {document}=parseHTML(await result.text());
  assert.equal(document.querySelector('meta[name=robots]').content,'noindex,follow',path);
}
const redirect=await worker.fetch(new Request('https://www.kakobuypick.com/sitemap.xml'),{},{});
assert.equal(redirect.status,308);
assert.equal(redirect.headers.get('location'),origin+'/sitemap.xml');
console.log('PASS sitemap: 840 unique canonical URLs, 24 languages, accurate editorial dates');
console.log('PASS robots declaration, excluded search/utility/error pages, www sitemap redirect');
