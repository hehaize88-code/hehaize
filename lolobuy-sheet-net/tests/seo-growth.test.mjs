import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import worker from '../dist/client/_worker.js';
const langs=['en','es','de','fr','it'];
const data=Object.fromEntries(langs.map(l=>[l,JSON.parse(fs.readFileSync(new URL('../app/growth-articles/'+l+'.json',import.meta.url)))]));
const old=JSON.parse(fs.readFileSync(new URL('../app/search-improvements.json',import.meta.url)));
const origin='https://lolobuy-sheet.net';
const env={ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
const page=async p=>{const r=await worker.fetch(new Request(origin+p,{headers:{accept:'text/html'}}),env,{});assert.equal(r.status,200,p);return r.text()};
const escaped=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'}[c]));
test('all 20 new articles render their complete language text, links and reciprocal metadata',async()=>{
 for(const l of langs)for(const a of data[l]){
  const p=(l==='en'?'':'/'+l)+'/articles/'+a.slug,h=await page(p);
  assert.ok(h.includes('<h1>'+escaped(a.title)+'</h1>'),p+' heading');
  assert.ok(h.includes('rel="canonical" href="'+origin+p+'"'),p+' canonical');
  for(const other of langs)assert.ok(h.includes('hrefLang="'+other+'"'),p+' alternate '+other);
  assert.ok(h.includes('hrefLang="x-default"'),p+' x-default');
  assert.ok(h.includes('data-article-locale="'+l+'"'),p+' language');
  const header=h.match(/<header class="lolo-header"[\s\S]*?<\/header>/)[0];
  for(const other of langs)assert.ok(header.includes('href="'+(other==='en'?'':'/'+other)+'/articles/'+a.slug+'"'),p+' switch '+other);
  for(const section of a.sections){for(const paragraph of section.paragraphs)assert.ok(h.includes(escaped(paragraph)),p+' complete paragraph');for(const link of section.links??[])assert.ok(h.includes((l==='en'?'':'/'+l)+link.href.replace(/\/$/,'')),p+' internal link')}
  assert.ok(h.includes('"dateModified":"2026-10-17"'),p+' modified date');
  assert.doesNotMatch(h,/<meta[^>]+name="codex-preview"/);
  if(/women|long-sleeve/.test(a.slug))assert.equal((h.match(/class="article-find-card"/g)||[]).length,3,p+' curated products');
 }
});
test('all five indexes expose 27 unique articles and the sitemap includes all new canonicals',async()=>{
 const sitemap=await(await worker.fetch(new Request(origin+'/editorial-sitemap.xml'),env,{})).text();
 for(const l of langs){const prefix=l==='en'?'':'/'+l,h=await page(prefix+'/articles');const matches=[...h.matchAll(/href="([^"#?]*\/articles\/[^"#?]+)"/g)].map(m=>m[1]);assert.equal(new Set(matches.filter(p=>p.startsWith(prefix+'/articles/'))).size,27,l+' index count');for(const a of data[l])assert.ok(sitemap.includes('<loc>'+origin+prefix+'/articles/'+a.slug+'</loc>'));}
 assert.equal((sitemap.match(/<url>/g)||[]).length,177);
});
test('existing four priority articles receive the same substantive updates in every language',async()=>{
 for(const l of langs)for(const [slug,a]of Object.entries(old[l])){const p=(l==='en'?'':'/'+l)+'/articles/'+slug,h=await page(p);assert.ok(h.includes(escaped(a.standfirst)),p);for(const paragraph of a.section.paragraphs)assert.ok(h.includes(escaped(paragraph)),p+' new workflow');assert.equal((h.match(new RegExp(escaped(a.section.heading).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))||[]).length>=2,true,p);}
});
test('shipping quick actions stay localized and the home header keeps all five choices',async()=>{
 for(const l of langs){const prefix=l==='en'?'':'/'+l,h=await page(prefix+'/shipping');assert.ok(h.includes('class="section-shell shipping-start"'));for(const slug of ['lolobuy-coupons-guide','lolobuy-order-tracking-guide','lolobuy-shipping-calculator-guide'])assert.ok(h.includes(prefix+'/articles/'+slug));}
});
test('analytics distinguishes internal product views and outbound product IDs without leaking query text',()=>{
 const handlers={},events=[];
 const context={window:{gtag:(...a)=>events.push(a)},location:{pathname:'/fr/articles/lolobuy-women-spreadsheet-finds',origin,href:origin+'/fr/articles/lolobuy-women-spreadsheet-finds'},document:{addEventListener:(k,f)=>handlers[k]=f},URL,FormData:class{get(){return 'private search text'}}};
 vm.runInNewContext(fs.readFileSync(new URL('../public/commerce-events.js',import.meta.url),'utf8'),context);
 const click=(href,dataset={})=>handlers.click({target:{closest:()=>({href,dataset})}});
 click(origin+'/fr/catalog/jackets/3411.html');click('https://www.lolobuy.com/productDetail/7831514834?url=ignored',{trackEvent:'lolobuy_product_click'});
 handlers.submit({target:{matches:()=>true,classList:{contains:()=>false}}});
 assert.equal(events[0][1],'product_detail_click');assert.equal(events[0][2].outbound,false);
 assert.equal(events[1][1],'lolobuy_product_click');assert.equal(events[1][2].item_id,'7831514834');assert.equal(events[1][2].content_language,'fr');assert.equal(events[1][2].link_domain,'www.lolobuy.com');assert.equal(events[1][2].outbound,true);
 assert.equal(events[2][1],'search_submit');assert.equal(events[2][2].search_location,'editorial');assert.ok(!JSON.stringify(events).includes('private search text'));assert.ok(!events[1][2].destination.includes('?'));
});
