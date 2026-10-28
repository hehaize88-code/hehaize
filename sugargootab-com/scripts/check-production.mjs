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
for (const [path, origin, expected] of [
 ['/nl/category/other-stuff/&source=alertsmail&hl=nl',targets.production,'/nl/category/other-stuff/'],
 ['/nl/category/other-stuff/&ss=fb&rt=private?q=hat&sort=price',targets.production,'/nl/category/other-stuff/?q=hat&sort=price'],
 ['/nl/category/other-stuff/&ct=ga&cd=private','https://www.sugargootab.com','/nl/category/other-stuff/']
]) {
 const fixed=await request(path,origin);assert.equal(fixed.status,308);assert.equal(fixed.headers.get('Location'),targets.production+expected);
}
const unrelated=await request('/nl/category/nonexistent/&source=alertsmail');assert.equal(unrelated.status,404,'Unknown routes must not redirect to a category');
const preview = await request('/faq/','https://sugargootab-com.example.workers.dev');
assert.match(preview.headers.get('X-Robots-Tag'),/noindex/);
const previewDoc = parseHTML(await preview.text()).document;
assert.equal(previewDoc.querySelectorAll('script[src*="googletagmanager.com"]').length,0,'Preview visits must not enter production Analytics');
assert(![...previewDoc.querySelectorAll('script')].some(s=>s.textContent.includes("gtag('config'")),'Preview Analytics configuration absent');
assert.equal(previewDoc.querySelector('link[rel=canonical]').getAttribute('href'),targets.production+'/faq/');
const robots = await request('/robots.txt');
assert.equal(robots.status,200);
assert.match(await robots.text(),new RegExp('Sitemap: '+targets.production+'/sitemap.xml'));
assert.match(await (await request('/robots.txt','https://sugargootab-com.example.workers.dev')).text(),/Disallow: \//);
const sitemap = await request('/sitemap.xml');
assert.equal(sitemap.status,200);
const xml = new DOMParser().parseFromString(await sitemap.text(),'text/xml');
const locations = [...xml.querySelectorAll('loc')].map(el=>el.textContent);
assert.equal(locations.length,816);
assert.equal(new Set(locations).size,locations.length);
assert.equal(xml.querySelectorAll('lastmod').length,720,'All article and article-index URLs carry maintained dates');
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
assert.equal(articleDoc.querySelectorAll('[data-reading-section]').length,10);
assert.equal(articleDoc.querySelectorAll('[data-reading-section][open]').length,10,'Full article present without JS');
assert(articleDoc.querySelector('[data-expand-reading]'));

// The public 16-item pages must preserve the source's 60-item sequence.
const originalFetch=globalThis.fetch;
let sourceTotal=3427, failSourcePage=0, paginationCases=0;
let sourceRequests=[];
globalThis.fetch=async input=>{
 const url=new URL(input instanceof Request?input.url:String(input));
 assert.equal(url.origin,'https://cnbuycha.com');
 sourceRequests.push(url);
 const sourcePage=Number(url.searchParams.get('page')||'1');
 if(sourcePage===failSourcePage)return new Response('Source unavailable',{status:503});
 const first=(sourcePage-1)*60+1,last=Math.min(sourcePage*60,sourceTotal);
 const cards=Array.from({length:Math.max(0,last-first+1)},(_,i)=>{
  const id=first+i;
  return `<article class="product-card"><a class="product-title" href="/headwear/${id}.html"><h3>Product ${id}</h3></a><img src="https://cnbuycha.com/media/${id}.jpg"><span class="product-price">${id}.00</span></article>`;
 }).join('');
 return new Response('<a class="category-item" href="/headwear/"><h3>Headwear</h3><span class="category-count">'+sourceTotal+'</span></a><div class="results-summary">'+sourceTotal+' products</div>'+cards);
};
const productIds=doc=>[...doc.querySelectorAll('.product-card h3')].map(n=>Number(n.textContent.replace('Product ','')));
try {
 const localizedData=await import('node:fs');
 for (const lang of ['en','de','es','fr','it','pl','pt','ro','sv','nl','da','fi','el','cs','hu','bg','sk','hr','sl','lt','lv','et','ga','mt']) {
  const content=JSON.parse(localizedData.readFileSync(new URL('../src/content/editorial/'+lang+'.json',import.meta.url),'utf8'));
  const response=await request(lang==='en'?'/':'/'+lang+'/');
  assert.equal(response.status,200,lang+' homepage');
  const doc=parseHTML(await response.text()).document;
  assert.equal(doc.querySelector('title').textContent,content.ui.seoHomeTitle);
  assert.equal(doc.querySelectorAll('.home-articles .article-card').length,4);
  assert(doc.querySelector('.home-articles a[href$="/articles/sugargoo-rehearsal-shipping/"]'));
 }
 for(const [page,numbers] of [[1,[1,2,3]],[2,[1,2,3]],[4,[3,4,5]],[8,[7,8,9]],[15,[14,15,16]],[16,[15,16,17]],[29,[28,29,30]],[215,[213,214,215]]]){
  sourceRequests=[];
  const response=await request('/fr/category/headwear/?q=hat&sort=price&page='+page);
  assert.equal(response.status,200);
  const doc=parseHTML(await response.text()).document;
  assert.equal(doc.querySelectorAll('script[src="https://www.googletagmanager.com/gtag/js?id=G-SDSLG4QJR3"]').length,1,'Search and pagination visits still measured');
  const nav=doc.querySelector('.numbered-pagination');
  assert.deepEqual([...nav.querySelectorAll('.page-number')].map(n=>Number(n.textContent)),numbers);
  assert.equal(nav.querySelector('[aria-current=page]').textContent,String(page));
  assert.equal(nav.querySelectorAll('[aria-disabled=true]').length,page===1||page===215?1:0);
  const start=(page-1)*16+1,end=Math.min(page*16,sourceTotal);
  assert.deepEqual(productIds(doc),Array.from({length:end-start+1},(_,i)=>start+i),'No missing or repeated products across source boundaries');
  assert(doc.querySelector('.results-line').textContent.startsWith(`${start}–${end} / ${sourceTotal}`));
  assert.equal(sourceRequests.length,Math.floor((end-1)/60)-Math.floor((start-1)/60)+1);
  for(const url of sourceRequests){assert.equal(url.pathname,'/headwear/');assert.equal(url.searchParams.get('q'),'hat');assert.equal(url.searchParams.get('sort'),'price');}
  for(const link of nav.querySelectorAll('a')){
   const url=new URL(link.getAttribute('href'),targets.production);
   assert.equal(url.pathname,'/fr/category/headwear/');assert.equal(url.searchParams.get('q'),'hat');assert.equal(url.searchParams.get('sort'),'price');
   assert(Number(url.searchParams.get('page'))>=1&&Number(url.searchParams.get('page'))<=215);
  }
  if(page>1)assert.equal(new URL(nav.querySelector('[rel=prev]').getAttribute('href'),targets.production).searchParams.get('page'),String(page-1));
  if(page<215)assert.equal(new URL(nav.querySelector('[rel=next]').getAttribute('href'),targets.production).searchParams.get('page'),String(page+1));
  paginationCases++;
 }
 for(const total of [0,1,16,17,60,61,71]){
  sourceTotal=total;const pageCount=Math.max(1,Math.ceil(total/16)),allIds=[];
  for(let page=1;page<=pageCount;page++){
   sourceRequests=[];
   const response=await request('/spreadsheet/?page='+page);
   assert.equal(response.status,200);
   const doc=parseHTML(await response.text()).document,nav=doc.querySelector('.numbered-pagination');
   const ids=productIds(doc);allIds.push(...ids);
   assert(ids.length<=16);assert(sourceRequests.length<=2);
   assert.equal(nav.querySelectorAll('.page-number').length,Math.min(3,pageCount));
   assert.equal(nav.querySelectorAll('[aria-disabled=true]').length,Number(page===1)+Number(page===pageCount));
   paginationCases++;
  }
  assert.deepEqual(allIds,Array.from({length:total},(_,i)=>i+1),'Every source product remains reachable');
 }
 const beyond=await request('/fr/category/headwear/?q=hat&sort=price&page=99');
 assert.equal(beyond.status,302);
 assert.equal(beyond.headers.get('Location'),'/fr/category/headwear/?sort=price&page=5&q=hat');
 sourceTotal=71;failSourcePage=2;
 const failed=await request('/spreadsheet/?page=4');
 assert.equal(failed.status,503,'A failed second source page must not produce a partial successful page');
 assert.match(failed.headers.get('X-Robots-Tag'),/noindex/);
}finally{globalThis.fetch=originalFetch;}
console.log(JSON.stringify({approvedDesign:'pass',legacyPreviewRedirect:308,pageSize:16,paginationCases,upstreamBoundaryChecks:'pass',completeCatalogueSequence:'pass',outOfRangeRedirect:302,upstreamFailure:503,articleSections:'10 complete disclosures'}));
