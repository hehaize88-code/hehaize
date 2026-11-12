import test from 'node:test';
import assert from 'node:assert/strict';
import {parseWeidianOptions,normalizeRates,experienceRoute} from '../commerce/experience.js';
import {catalogueRoute,purchasingPlatforms,LANGS} from '../commerce/catalog.js';
import {translateProductTitle,translateOptionLabel} from '../public/commerce/product-title.js';
import {productGlossaries} from '../commerce/product-glossaries.js';
const id='7874413518';
const model={result:{default_model:{item_info:{item_id:id,imgs:['https://si.geilicdn.com/item.jpg','javascript:bad']},sku_properties:{attr_list:[{attr_title:'Style',attr_values:[{attr_id:10,attr_value:'Blue',img:'https://si.geilicdn.com/blue.jpg'}]}],sku:{a:{id:100,attr_ids:'10',price:'150',stock:'1'}}}}}};
test('style identity and real price validated, unsafe images excluded',()=>{
 const html=`<script id="__rocker-render-inject__" data-obj='${JSON.stringify(model)}'></script>`;
 const p=parseWeidianOptions(html,id);assert.equal(p.variants[0].price,150);assert.equal(p.variants[0].id,'100');assert.deepEqual(p.images,['https://si.geilicdn.com/item.jpg']);assert.throws(()=>parseWeidianOptions(html,'12345'),/identity/);
});
test('FX requires valid base, date and positive rates',()=>{
 const good=[{base:'USD',quote:'EUR',rate:0.9,date:'2026-11-12'},{base:'USD',quote:'CNY',rate:7,date:'2026-11-12'}];
 const r=normalizeRates([...good,{base:'USD',quote:'GBP',rate:-1,date:'2026-11-12'}]);assert.equal(r.rates.GBP,undefined);assert.equal(70/r.rates.CNY*r.rates.EUR,9);assert.throws(()=>normalizeRates([]));
});
test('API rejects invalid IDs and methods',async()=>{
 assert.equal((await experienceRoute(new Request('https://joyagoochina.org/api/product-options?id=https://bad'))).status,400);
 assert.equal((await experienceRoute(new Request('https://joyagoochina.org/api/exchange-rates',{method:'POST'}))).status,405);
});
test('ten languages translate titles, metadata and controls; brand and ID preserved',async()=>{
 const source=`<section class="product-detail"><h1>Chrome Hearts Bag</h1><div class="product-id">ID: ${id}</div><meta itemprop="price" content="25"><img itemprop="image" src="/media/test.jpg"></section>`;
 const original=globalThis.fetch;globalThis.fetch=async()=>new Response(source);
 try{for(const lang of LANGS){const name=translateProductTitle('Chrome Hearts Bag',lang,productGlossaries);assert.ok(name.startsWith('Chrome Hearts '));if(lang!=='en')assert.notEqual(name,'Chrome Hearts Bag');const r=await catalogueRoute(new Request(`https://joyagoochina.org${lang==='en'?'':'/'+lang}/catalog/accessories/3458.html`));const html=await r.text();assert.equal(r.status,200);assert.ok(html.includes(`<h1>${name}</h1>`));assert.ok(html.includes(`<title>${name}`));assert.ok(html.includes(`itemID=${id}`));if(lang!=='en')assert.doesNotMatch(html,/>Other buying agents|>Copy Weidian link|>Loading styles/);}}finally{globalThis.fetch=original;}
});
test('agent links retain source ID and exclude competitor referrals',()=>{for(const [,href] of purchasingPlatforms(id)){assert.ok(decodeURIComponent(href).includes(id));assert.doesNotMatch(href,/inviteCode|referral|aff=/i);}});
test('real numbered style colours translate without changing seller identifiers or brands',()=>{
 for(const lang of LANGS.filter(lang=>lang!=='en')){
  const label=translateOptionLabel('01 Black and White',lang,productGlossaries);
  assert.match(label,/^01 /);assert.doesNotMatch(label,/\bBlack\b|\bWhite\b|\band\b/);
  assert.equal(translateOptionLabel('Off-White · Black Diamond · AB-BLACK-123 · #9760607840',lang,productGlossaries),'Off-White · Black Diamond · AB-BLACK-123 · #9760607840');
 }
 assert.equal(translateOptionLabel('01 Black and White', 'zh',productGlossaries),'01 黑色 / 白色');
 assert.equal(translateOptionLabel('01 黑色白色','en',productGlossaries),'01 black white');
 assert.equal(translateOptionLabel('Light Blue','fr',productGlossaries),'Bleu clair');
});
