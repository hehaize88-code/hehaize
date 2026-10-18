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

// Shared preview links now redirect to the equivalent approved production page.
for (const path of ['/design-preview','/design-preview/','/design-preview/fr/articles/?q=hat&sort=price','/design-preview/mt/faq/']) {
  const response=await request(path);
  assert.equal(response.status,308);
  const expected=path.replace(/^\/design-preview/,'')||'/';
  assert.equal(response.headers.get('Location'),targets.production+expected);
}
const articleResponse=await request('/articles/sugargoo-spreadsheet-guide/');
const articleHtml=await articleResponse.text();
assert(articleHtml.indexOf('--paper:#fff')>articleHtml.indexOf('--paper:#fafaf7'),'Approved theme follows base styles');
const articleDoc=parseHTML(articleHtml).document;
assert(!articleDoc.querySelector('.design-preview-bar'),'Review banner removed from live pages');
assert.equal(articleDoc.querySelectorAll('[data-reading-section]').length,9);
assert.equal(articleDoc.querySelectorAll('[data-reading-section][open]').length,9,'Full article present without JS');
assert(articleDoc.querySelector('[data-expand-reading]'));

// Exercise rendered pagination, including boundary and filtered localized links.
const originalFetch=globalThis.fetch;
let sourceTotal=3427;
globalThis.fetch=async input=>{
 const url=new URL(input instanceof Request?input.url:String(input));
 assert.equal(url.origin,'https://cnbuycha.com');
 return new Response('<div class="results-summary">'+sourceTotal+' products</div>');
};
try {
 for(const [page,numbers] of [[1,[1,2,3]],[2,[1,2,3]],[29,[28,29,30]],[58,[56,57,58]]]){
  const response=await request('/fr/category/headwear/?q=hat&sort=price&page='+page);
  assert.equal(response.status,200);
  const doc=parseHTML(await response.text()).document;
  const nav=doc.querySelector('.numbered-pagination');
  assert.deepEqual([...nav.querySelectorAll('.page-number')].map(n=>Number(n.textContent)),numbers);
  assert.equal(nav.querySelector('[aria-current=page]').textContent,String(page));
  assert.equal(nav.querySelectorAll('[aria-disabled=true]').length,page===1||page===58?1:0);
  for(const link of nav.querySelectorAll('a')){
   const url=new URL(link.getAttribute('href'),targets.production);
   assert.equal(url.pathname,'/fr/category/headwear/');assert.equal(url.searchParams.get('q'),'hat');assert.equal(url.searchParams.get('sort'),'price');
   assert(Number(url.searchParams.get('page'))>=1&&Number(url.searchParams.get('page'))<=58);
  }
  if(page>1)assert.equal(new URL(nav.querySelector('[rel=prev]').getAttribute('href'),targets.production).searchParams.get('page'),String(page-1));
  if(page<58)assert.equal(new URL(nav.querySelector('[rel=next]').getAttribute('href'),targets.production).searchParams.get('page'),String(page+1));
 }
 for(const total of [0,1,60,61]){
  sourceTotal=total;const response=await request('/spreadsheet/');
  const doc=parseHTML(await response.text()).document;const nav=doc.querySelector('.numbered-pagination');
  assert.equal(nav.querySelectorAll('.page-number').length,total>60?2:1);
  assert.equal(nav.querySelectorAll('[aria-disabled=true]').length,total>60?1:2);
 }
}finally{globalThis.fetch=originalFetch;}
console.log(JSON.stringify({approvedDesign:'pass',legacyPreviewRedirect:308,paginationCases:8,articleSections:'9 complete disclosures'}));
