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
