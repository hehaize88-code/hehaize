import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {normalizeTrackingPath} from './tracking-path.mjs';
for (const suffix of ['&source=alertsmail&hl=nl&gl=BE&msgid=private','&ss=tw&rt=private&cd=private','&ct=ga&cd=private&usg=private','&ss=fb&rt=private']) {
 assert.equal(normalizeTrackingPath('/nl/category/other-stuff/'+suffix),'/nl/category/other-stuff/');
}
for (const path of ['/nl/category/unknown/&source=alertsmail','/xx/category/other-stuff/&source=alertsmail','/nl/category/other-stuff/&anything=1','/unknown/&ss=fb','/nl/category/other-stuff/','/nl/category/other-stuff/&ss=fb/extra']) assert.equal(normalizeTrackingPath(path),null,path);
const handlers = new Map(), events=[];
class Element {
 constructor(dataset={},matches={}){this.dataset=dataset;this.matches=matches;}
 closest(selector){return this.matches[selector]||null;}
}
class HTMLFormElement extends Element {querySelector(){return this.field;}}
const document={body:{dataset:{pageType:'article',article:'sugargoo-qc-photos',searchActive:'false'}},documentElement:{lang:'nl'},readyState:'complete',addEventListener:(event,handler)=>handlers.set(event,handler)};
const window={gtag:(...args)=>events.push(args)};
vm.runInNewContext(fs.readFileSync(new URL('../src/lib/analytics-client.js',import.meta.url),'utf8'),{document,window,Element,HTMLFormElement});
const link = new Element({track:'article_catalog_click',destination:'spreadsheet'});
const icon = new Element({}, {'a[href]':link});
handlers.get('click')({target:icon});
assert.equal(events[0][1],'article_catalog_click');assert.equal(events[0][2].language,'nl');assert.equal(events[0][2].article_slug,'sugargoo-qc-photos');
link.dataset={track:'outbound_purchase_click',destination:'sugargoo',productId:'123'};handlers.get('click')({target:icon});
assert.equal(events[1][1],'outbound_purchase_click');assert.equal(events[1][2].product_id,'123');
link.dataset={track:'outbound_register_click',destination:'sugargoo'};handlers.get('click')({target:icon});assert.equal(events[2][1],'outbound_register_click');
link.dataset={};link.matches['.product-card']=new Element({productId:'/shoes/456.html',productCategory:'shoes'});handlers.get('click')({target:icon});assert.equal(events[3][1],'product_click');assert.equal(events[3][2].product_category,'shoes');
const form = new HTMLFormElement();form.field={value:' private@example.com '};handlers.get('submit')({target:form});assert.equal(events[4][1],'catalog_search');assert.equal(events[4][2].query_length,'10-29');assert(!JSON.stringify(events).includes('private@example.com'));
form.field.value='  ';handlers.get('submit')({target:form});assert.equal(events.length,5,'Empty searches are not reported');
window.gtag=undefined;handlers.get('click')({target:icon});assert.equal(events.length,5,'Missing or blocked analytics does not break links');
window.gtag=(...args)=>events.push(args);link.dataset={track:'article_guide_click',destination:'/articles/sugargoo-shoe-size-guide/'};handlers.get('click')({target:icon});assert.equal(events.at(-1)[1],'article_guide_click');
console.log(JSON.stringify({trackingPathRepairs:4,unrelatedPaths:'unchanged',clickEvents:4,searchPrivacy:'pass',blockedAnalytics:'nonblocking'}));
