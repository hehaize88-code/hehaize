import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parseHTML} from 'linkedom/worker';
import worker from '../dist/server/index.js';
import {parseWeidianOptions,normalizeRates,experienceRoute,CURRENCIES} from './commerce-api.mjs';
import {rankProducts,selectResults,validProduct,acceptsImage} from '../public/assets/image-search-core.mjs';
const assets={fetch:async request=>{const path=new URL(request.url).pathname;return new Response(fs.readFileSync(new URL('../public'+path,import.meta.url)));}};
const originalFetch=globalThis.fetch;
const fixture='<h1 class="product-title">High-quality jacket</h1><meta itemprop="sku" content="7881713873"><section class="product-detail"><span class="product-price">137.22</span><a class="weidian-btn" href="https://weidian.com/item.html?itemID=7881713873"></a><div class="gallery-slide"><img src="/media/products/3492/test.jpg"></div></section>';
const locales=fs.readdirSync(new URL('../public/assets/locales/',import.meta.url)).map(s=>s.replace('.json',''));
globalThis.fetch=async()=>new Response(fixture);
try{
 for(const lang of locales){
  const path=(lang==='en'?'':'/'+lang)+'/products/jackets/3492.html';
  const r=await worker.fetch(new Request('https://sugargootab.com'+path),{ASSETS:assets},{});assert.equal(r.status,200,lang);
  const html=await r.text(),d=parseHTML(html).document;
  assert(d.querySelector('[data-product-detail]'),lang);
  assert.equal(d.querySelectorAll('[data-currency-select] option').length,30);
  assert.equal(d.querySelectorAll('[data-agent]').length,12);
  if(lang!=='en'){assert.notEqual(d.querySelector('h1').textContent,'High-quality jacket',lang);assert.notEqual(d.querySelector('#styles-title').textContent,'Styles',lang);assert.notEqual(d.querySelector('[data-copy-source]').textContent,'Copy Weidian link',lang);}
  const name=d.querySelector('h1').textContent;assert(d.querySelector('title').textContent.includes(name));
  const product=[...d.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)).find(v=>v['@type']==='Product');assert.equal(product.name,name);
  assert.equal(d.querySelector('link[rel="canonical"]').getAttribute('href'),'https://sugargootab.com'+path);
  const search=await worker.fetch(new Request('https://sugargootab.com'+(lang==='en'?'':'/'+lang)+'/search/visual/'),{ASSETS:assets},{});assert.equal(search.status,200);const searchDoc=parseHTML(await search.text()).document;assert(searchDoc.querySelector('#image-file'));if(lang!=='en')assert.notEqual(searchDoc.querySelector('#image-drop strong').textContent,'Choose a photo');
 }
}finally{globalThis.fetch=originalFetch;}
const model={result:{default_model:{item_info:{item_id:123456,img:[]},sku_properties:{attr_list:[{attr_title:'Style',attr_values:[{attr_id:11,attr_value:'Black',img:'https://si.geilicdn.com/style.jpg'},{attr_id:12,attr_value:'White',img:'javascript:bad'}]},{attr_title:'Size',attr_values:[{attr_id:21,attr_value:'M'}]}],sku:{one:{id:99,attr_ids:'11-21',price:'99.90',stock:3},two:{id:100,attr_ids:'12-21',price:102,stock:0}}}}}};
const html=`<script id="__rocker-render-inject__" data-obj='${JSON.stringify(model)}'></script>`;
const options=parseWeidianOptions(html,'123456');assert.equal(options.groups[0].values[1].image,'');assert.equal(options.variants[0].price,99.9);assert.equal(options.variants[1].available,false);assert.throws(()=>parseWeidianOptions(html,'999999'));
const rateData=normalizeRates([{base:'USD',quote:'EUR',rate:.9,date:'2026-11-10'},{base:'USD',quote:'CNY',rate:7,date:'2026-11-10'},{base:'USD',quote:'GBP',rate:-1,date:'2026-11-10'}]);assert.equal(rateData.rates.GBP,undefined);assert.equal(100/rateData.rates.CNY*rateData.rates.EUR,100/7*.9);assert.throws(()=>normalizeRates([]));assert.equal(CURRENCIES.length,30);
assert.equal((await experienceRoute(new Request('https://sugargootab.com/api/product-options?id=https://evil.test'))).status,400);assert.equal((await experienceRoute(new Request('https://sugargootab.com/api/exchange-rates',{method:'POST'}))).status,405);
const index=JSON.parse(fs.readFileSync(new URL('../public/assets/catalog-image-index.json',import.meta.url)));assert.equal(index.indexedCount,index.products.length);assert(index.products.every(validProduct));
for(const sample of [index.products[0],index.products[100],index.products.at(-1)]){const hits=selectResults(rankProducts(sample,index.products));assert(hits.items.some(x=>x.p.path===sample.path&&x.score===0));}
assert(!acceptsImage({name:'test.svg',type:'image/svg+xml',size:100}));assert(!acceptsImage({name:'big.jpg',type:'image/jpeg',size:21*1024*1024}));
console.log(JSON.stringify({locales:locales.length,detailAndSearchRoutes:48,realTitleAndMetadata:'pass',currencies:30,agents:12,optionsIdentityAndAvailability:'pass',ratesValidation:'pass',imageIndex:index.indexedCount,imageExactMatches:'pass'}));
// Regression: legacy sentence translations must not turn clothing into unrelated words.
const {translateProductTitle}=await import('../public/assets/product-title.mjs');
const glossaries=JSON.parse(fs.readFileSync(new URL('../src/content/product-glossary.json',import.meta.url)));
for(const [lang,g] of Object.entries(glossaries)){
 assert.equal(translateProductTitle('Lacoste Hoodie',lang,glossaries),'Lacoste '+g.hoodie,lang);
 assert.equal(translateProductTitle('Lacoste Polo',lang,glossaries),'Lacoste '+g['polo shirt'],lang);
 assert.equal(translateProductTitle('New Balance shoes',lang,glossaries),'New Balance '+g.shoes,lang);
 assert.equal(translateProductTitle('Adidas XLG Runner Deluxe',lang,glossaries),'Adidas XLG Runner Deluxe',lang);
 assert.equal(translateProductTitle('Goyard Shoulder Bag',lang,glossaries),'Goyard '+g['shoulder bag'],lang);
 assert(!translateProductTitle('Stone Island T-shirt #StoneIsland_W2C #Tshirt_W2C',lang,glossaries).includes('#'),lang);
}
globalThis.fetch=async()=>new Response(fixture.replace('High-quality jacket','Lacoste Hoodie'));
try{
 const response=await worker.fetch(new Request('https://sugargootab.com/de/products/jackets/3492.html'),{ASSETS:assets},{});
 const document=parseHTML(await response.text()).document;
 assert.equal(document.querySelector('h1').textContent,'Lacoste Kapuzenpullover');
 assert.equal(document.querySelector('#gallery-main').getAttribute('alt'),'Lacoste Kapuzenpullover');
}finally{globalThis.fetch=originalFetch;}
console.log('Product title regressions: 23 languages, preserved brand/model names and rendered German heading/alt passed');

// Search-box entry points share one local-file dialog and keep text search intact.
const catalogueFixture='<a class="category-item" href="/jackets/"><h3>Jackets</h3><span class="category-count">1</span></a><div class="results-summary">1 products</div><article class="product-card"><a class="product-title" href="/jackets/3492.html"><h3>High-quality jacket</h3></a><img src="/media/products/3492/test.jpg"><span class="product-price">137.22</span></article>';
globalThis.fetch=async()=>new Response(catalogueFixture);
try{for(const lang of locales){
 const prefix=lang==='en'?'':'/'+lang;
 for(const path of ['/','/spreadsheet/','/category/jackets/']){
  const r=await worker.fetch(new Request('https://sugargootab.com'+prefix+path),{ASSETS:assets},{});
  const doc=parseHTML(await r.text()).document;
  assert.equal(doc.querySelectorAll('[data-image-search-trigger]').length,1,lang+path);
  assert.equal(doc.querySelectorAll('#image-file').length,1);
  assert.equal(doc.querySelectorAll('h1').length,1);
  assert.equal(doc.querySelector('#image-search-dialog').hasAttribute('open'),false);
  assert.equal(doc.querySelector('[data-image-search-trigger]').getAttribute('href'),prefix+'/search/visual/');
  assert.equal(doc.querySelector('input[name="q"]').closest('form').getAttribute('method'),'get');
  if(lang!=='en')assert.notEqual(doc.querySelector('.image-dialog-close').getAttribute('aria-label'),'Close',lang);
 }
 const r=await worker.fetch(new Request('https://sugargootab.com'+prefix+'/articles/'),{ASSETS:assets},{});
 const doc=parseHTML(await r.text()).document;
 assert.equal(doc.querySelectorAll('.editorial-index>.article-grid .article-card').length,8);
 assert.equal(doc.querySelectorAll('.article-archive .article-card').length,11);
 assert.equal(doc.querySelectorAll('.article-card').length,19,'All article links remain in HTML');
 if(lang!=='en')assert(!doc.querySelector('.archive-closed').textContent.includes('Show more'),lang);
}}finally{globalThis.fetch=originalFetch;}
console.log('Search-box and compact archive regressions: 72 entry routes, 24 archives passed');
