import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseWeidianOptions,normalizeRates,experienceRoute,CURRENCIES} from '../commerce/experience.mjs';
import {parseDetail,catalogueRoute,purchasingPlatforms} from '../commerce/catalog.js';
import {localeCodes} from '../public/assets/locale-core.mjs';
import {translateProductTitle} from '../public/assets/product-title.mjs';
import {productGlossaries} from '../commerce/product-glossaries.mjs';
import {localizeCatalogueHtml} from '../commerce/locale-support.mjs';
const id='7867456361';
const model={result:{default_model:{item_info:{item_id:id,imgs:['https://si.geilicdn.com/item.jpg','javascript:bad']},sku_properties:{attr_list:[{attr_title:'Style',attr_values:[{attr_id:10,attr_value:'Blue',img:'https://si.geilicdn.com/blue.jpg'}]}],sku:{a:{id:100,attr_ids:'10',price:'150',stock:'1'}}}}}};
const html=`<script id="__rocker-render-inject__" data-obj='${JSON.stringify(model)}'></script>`;
test('options stay bound to the requested product and retain real SKU and price',()=>{
 const p=parseWeidianOptions(html,id);assert.equal(p.sourceId,id);assert.equal(p.variants[0].price,150);assert.equal(p.variants[0].id,'100');assert.deepEqual(p.images,['https://si.geilicdn.com/item.jpg']);assert.throws(()=>parseWeidianOptions(html,'12345'),/identity/);
});
test('exchange rates validate base, date, required currencies and positive values',()=>{
 const good=[{base:'USD',quote:'EUR',rate:0.9,date:'2026-11-11'},{base:'USD',quote:'CNY',rate:7,date:'2026-11-11'}];
 const r=normalizeRates([...good,{base:'USD',quote:'GBP',rate:-1,date:'2026-11-11'}]);assert.equal(r.rates.USD,1);assert.equal(r.rates.GBP,undefined);assert.equal(70/r.rates.CNY*r.rates.EUR,9);assert.throws(()=>normalizeRates(good.slice(0,1)),/Incomplete/);assert.equal(CURRENCIES.length,30);
});
test('API refuses invalid IDs and methods without contacting upstream',async()=>{
 assert.equal((await experienceRoute(new Request('https://uufindssheet.com/api/product-options?id=https://bad'))).status,400);
 assert.equal((await experienceRoute(new Request('https://uufindssheet.com/api/exchange-rates',{method:'POST'}))).status,405);
});
test('all 25 locale routes localize product descriptors and preserve brands and URLs',async()=>{
 assert.equal(localeCodes.length,25);
 const source=`<section class="product-detail"><meta itemprop="sku" content="99999"><h1>Chrome Hearts Bag</h1><meta itemprop="price" content="25"><img itemprop="image" src="/uploads/test.jpg"><a href="https://weidian.com/item.html?itemID=${id}">Source</a></section>`;
 assert.equal(parseDetail(source).sourceId,id);
 const original=globalThis.fetch;globalThis.fetch=async()=>new Response(source);
 const env={ASSETS:{fetch:async req=>new Response(await readFile(new URL(req.url).pathname.replace(/^\//,'public/')),{headers:{'content-type':'application/json'}})}};
 try{for(const locale of localeCodes){
  const translated=translateProductTitle('Chrome Hearts Bag',locale,productGlossaries);assert.ok(translated.startsWith('Chrome Hearts '));
  if(!['en','en-gb'].includes(locale))assert.notEqual(translated,'Chrome Hearts Bag');
  const r=await catalogueRoute(new Request(`https://uufindssheet.com${locale==='en'?'':'/'+locale}/catalog/accessories/3458.html`),env);assert.equal(r.status,200,locale);const result=await r.text();assert.ok(result.includes(`<h1>${translated}</h1>`),locale);assert.ok(result.includes('itemID='+id));assert.doesNotMatch(result,/href="\/(?:fr|zh|ja)\/guides/);
 }}finally{globalThis.fetch=original;}
});
test('localization handles punctuation, protects language names and agent URLs',()=>{
 const result=localizeCatalogueHtml('<p>Product ID: </p><a data-agent="superbuy" href="https://example.com/?id=123">Superbuy</a>',{'Product ID':'商品编号',Superbuy:'bad'},'zh');assert.match(result,/商品编号:/);assert.match(result,/>Superbuy<\/a>/);
});
test('buying agent links each carry the same source item and have no competitor referral code',()=>{
 for(const [,href] of purchasingPlatforms(id)){assert.ok(decodeURIComponent(href).includes(id),href);assert.ok(href.startsWith('https://'));assert.doesNotMatch(href,/inviteCode|referral|aff=/i);}
});
