import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import worker from '../dist/server/index.js';
import {parcelWeight} from '../app/parcel-weight.mjs';
const locales=['en','fr','de','es','it'];
const slugs=['lolobuy-shipping-time-guide','lolobuy-shipping-germany-guide','lolobuy-reduce-shipping-cost-guide'];
const origin='https://lolobuy-sheet.com';
const get=p=>worker.fetch(new Request(origin+p),{ASSETS:{fetch:async()=>new Response('missing',{status:404})}},{waitUntil(){}});

test('calculator handles volume, scale weight, route rounding and invalid data',()=>{
 const input={weight:3,length:40,width:30,height:25,divisor:6000,increment:0};
 assert.deepEqual(parcelWeight(input),{actual:3,dimensional:5,billable:5});
 assert.equal(parcelWeight({...input,weight:6}).billable,6);
 assert.equal(parcelWeight({...input,mode:'actual'}).billable,3);
 assert.equal(parcelWeight({...input,height:26,increment:.5}).billable,5.5);
 assert.equal(parcelWeight({...input,weight:5.2,mode:'actual',increment:.1}).billable,5.2);
 for(const divisor of [0,-1,Infinity,NaN])assert.equal(parcelWeight({...input,divisor}),null);
 assert.equal(parcelWeight({...input,weight:0}),null);
 assert.equal(parcelWeight({...input,increment:-1}),null);
});

test('three substantive articles exist in all five languages with matching section structure',()=>{
 const files=Object.fromEntries(locales.map(l=>[l,JSON.parse(fs.readFileSync(new URL(`../app/november-content/${l}.json`,import.meta.url)))]));
 for(const l of locales)for(const [i,a] of files[l].entries()){
  assert.equal(a.slug,slugs[i]);assert.equal(a.sections.length,9);
  assert.deepEqual(a.sections.map(s=>s.links?.map(v=>v.href)||[]),files.en[i].sections.map(s=>s.links?.map(v=>v.href)||[]));
  const words=[...a.intro,...a.sections.flatMap(s=>s.paragraphs)].join(' ').split(/\s+/).length;
  assert.ok(words>850,`${l} ${a.slug}: ${words} words`);
  if(l==='en')assert.ok(words>=1200&&words<=1800,`${a.slug}: ${words}`);
  else assert.notEqual(a.intro[0],files.en[i].intro[0]);
 }
});

test('150 article pages have self canonicals, reciprocal language links and sitemap entries',async()=>{
 const xml=await(await get('/sitemap.xml')).text();
 const paths=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname).filter(p=>p.includes('/articles/'));
 assert.equal(paths.length,150);
 for(const path of paths){
  const response=await get(path);const html=await response.text();assert.equal(response.status,200,path);
  const slug=path.split('/').at(-1);const lang=path.match(/^\/(fr|de|es|it)\//)?.[1]||'en';
  assert.ok(html.includes(`<html lang="${lang}"`),path);
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`),path);
  assert.match(html,/"@type":"Article"/);assert.match(html,/"@type":"BreadcrumbList"/);
  for(const target of locales){const href=origin+(target==='en'?'':'/'+target)+'/articles/'+slug;assert.ok(html.includes(`hrefLang="${target}" href="${href}"`),path+' '+target)}
  assert.ok(html.includes(`hrefLang="x-default" href="${origin}/articles/${slug}"`),path);
  if(slugs.includes(slug))assert.match(html,/"datePublished":"2026-11-09"/);
 }
});

test('all language calculator pages render labelled inputs and official source links',async()=>{
 for(const locale of locales){
  const prefix=locale==='en'?'':'/'+locale;
  for(const path of ['/articles/lolobuy-shipping-calculator-guide','/guides/shipping']){
   const html=await(await get(prefix+path)).text();assert.match(html,/id="parcel-calculator-title"/);
   for(const name of ['weight','length','width','height','divisor','increment'])assert.ok(html.includes(`name="${name}"`));
   assert.match(html,/https:\/\/www.lolobuy.com\/estimate/);
  }
 }
});

test('analytics config excludes preview hosts and initializes production once',()=>{
 const source=fs.readFileSync(new URL('../scripts/pages-worker-entry.mjs',import.meta.url),'utf8');
 const init=source.match(/"(window\.dataLayer=.*?;)"/)[1];
 for(const host of ['lolobuy-sheet.com','www.lolobuy-sheet.com','preview.lolobuy-sheet-com.pages.dev']){
  const window={};vm.runInNewContext(init,{window,location:{hostname:host},Date,get gtag(){return window.gtag;}});
  const configs=window.dataLayer.filter(args=>args[0]==='config');assert.equal(configs.length,host.endsWith('.pages.dev')?0:1);
 }
});
