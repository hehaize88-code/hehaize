import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {catalogueRoute,LANGS,purchasingPlatforms} from '../commerce/catalog.js';
import {parseWeidianOptions,normalizeRates,experienceRoute} from '../commerce/experience.js';
const env={ASSETS:{fetch:async request=>{try{return new Response(await fs.readFile(new URL('../public'+new URL(request.url).pathname,import.meta.url)))}catch{return new Response('',{status:404})}}}};
const detail=await fs.readFile(new URL('./fixtures/source-detail.html',import.meta.url),'utf8');
test('all 24 catalogue languages translate names and key product controls, preserving selection and identity',async()=>{
 assert.equal(LANGS.length,24);const original=globalThis.fetch;
 try{globalThis.fetch=async()=>new Response(detail);
 for(const lang of LANGS){const prefix=lang==='en'?'':'/'+lang;const r=await catalogueRoute(new Request('https://cssbuychina.net'+prefix+'/catalog/accessories/3458.html?style=123&option=456'),env);const html=await r.text();assert.equal(r.status,200,lang);const dict=JSON.parse(await fs.readFile(new URL('../public/assets/locales/'+lang+'.json',import.meta.url),'utf8'));
 for(const key of ['Other buying agents','Copy Weidian link','Styles','Size','Estimated conversion. Shipping, taxes and platform fees are not included.']){assert.ok(dict[key]||lang==='en',lang+': '+key);}
 assert.ok(html.includes(dict['Copy Weidian link']||'Copy Weidian link'),lang);assert.ok(html.includes(dict['Diesel Bag']||'Diesel Bag'),lang);assert.ok(html.includes('href="/fr/catalog/accessories/3458.html?style=123&amp;option=456"'));assert.match(html,/id=7874413518/);assert.doesNotMatch(html,/id=3458(?:["&<])/);assert.equal((html.match(/data-locale-code=/g)||[]).length,24);assert.match(html,/"@type":"Product"/);
 }
 }finally{globalThis.fetch=original}
});
test('variant parsing rejects wrong products and unsafe images and preserves price/stock',()=>{
 const model={item_info:{item_id:'7506441136',imgs:['https://si.geilicdn.com/a.jpg','javascript:alert(1)']},sku_properties:{attr_list:[{attr_title:'Model',attr_values:[{attr_id:'10',attr_value:'Black',img:'https://si.geilicdn.com/b.jpg'}]},{attr_title:'Size',attr_values:[{attr_id:'20',attr_value:'42'}]}],sku:{a:{id:'100',attr_ids:'10-20',price:'109',stock:'3'}}}};
 const html='<script id="__rocker-render-inject__" data-obj="'+JSON.stringify({result:{default_model:model}}).replaceAll('"','&quot;')+'"></script>';
 const data=parseWeidianOptions(html,'7506441136');assert.equal(data.groups.length,2);assert.deepEqual(data.images,['https://si.geilicdn.com/a.jpg']);assert.equal(data.variants[0].price,109);assert.equal(data.variants[0].available,true);assert.throws(()=>parseWeidianOptions(html,'7506441137'),/identity/);
});
test('exchange rates stay references and reject invalid data; unavailable sources return 503',async()=>{
 const data=normalizeRates([{base:'USD',quote:'EUR',rate:.87,date:'2026-11-11'},{base:'USD',quote:'CNY',rate:7.1,date:'2026-11-11'},{base:'USD',quote:'GBP',rate:-2,date:'2026-11-11'}]);assert.equal(data.rates.USD,1);assert.equal(data.rates.GBP,undefined);assert.equal(10/data.rates.USD*data.rates.CNY,71);assert.throws(()=>normalizeRates([]));
 const original=globalThis.fetch;try{globalThis.fetch=async()=>{throw Error('offline')};assert.equal((await experienceRoute(new Request('https://cssbuychina.net/api/exchange-rates'))).status,503);assert.equal((await experienceRoute(new Request('https://cssbuychina.net/api/product-options?id=bad'))).status,400);}finally{globalThis.fetch=original}
});
test('buying platforms all preserve the original Weidian ID without inherited affiliate codes',()=>{
 const links=purchasingPlatforms('7506441136');assert.equal(links.length,10);for(const [name,link] of links){assert.ok(decodeURIComponent(link).includes('7506441136'),name);assert.doesNotMatch(link,/ref=|invite|affcode|partnercode/);assert.equal(new URL(link).protocol,'https:');}assert.ok(links.some(([n,l])=>n==='Litbuy'&&l.includes('/product/2/')));assert.deepEqual(purchasingPlatforms('bad'),[]);
});
