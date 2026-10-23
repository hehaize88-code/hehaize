import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const events=[],handlers={};
class Form {querySelector(){return {value:' shoes '}}}
const context={URL,HTMLFormElement:Form,location:{href:'https://oopbuytab.com/de/articles/oopbuy-payment-methods/',origin:'https://oopbuytab.com'},window:{gtag:(...args)=>events.push(args)},document:{body:{dataset:{locale:'de',article:'oopbuy-payment-methods'}},documentElement:{lang:'de'},addEventListener:(name,fn)=>handlers[name]=fn}};
vm.runInNewContext(await fs.readFile('public/analytics-events.js','utf8'),context);
for(const href of ['https://oopbuy.com/product/weidian/123?inviteCode=U68CWQBN5','https://oopbuy.com/login','https://oopbuy.com/estimation','https://oopbuytab.com/de/products/shoes/3470.html','https://oopbuytab.com/de/spreadsheet/','https://oopbuytab.com/de/category/shoes/','https://oopbuytab.com/de/articles/oopbuy-shipping-germany/','https://oopbuytab.com/de/articles/oopbuy-payment-methods/#section-1','https://example.com/'])handlers.click({target:{closest:()=>({href})}});
handlers.submit({target:new Form()});
assert.deepEqual(events.map(e=>e[1]),['product_outbound_click','registration_click','shipping_estimator_click','product_detail_click','article_catalog_click','article_catalog_click','article_related_click','catalog_search']);
assert(events.every(e=>e[0]==='event'&&e[2].page_locale==='de'&&e[2].article_slug==='oopbuy-payment-methods'));
assert.equal(events.at(-1)[2].query_length,5);assert.equal(events.at(-2)[2].target_article,'oopbuy-shipping-germany');assert(events.every(e=>e[2].transport_type==='beacon'));handlers.click({target:null});assert(!JSON.stringify(events).includes('search_term'));
assert(!events.some(e=>e[1]==='purchase'));assert(!JSON.stringify(events).includes('inviteCode'));
console.log('Analytics intent events, locale context, search privacy and non-purchase semantics passed.');
