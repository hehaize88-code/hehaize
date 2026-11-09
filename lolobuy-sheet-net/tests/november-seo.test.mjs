import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../dist/client/_worker.js';

const langs=['en','de','fr','es','it'];
const origin='https://lolobuy-sheet.net';
const env={ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
const records=Object.fromEntries(langs.map(l=>[l,JSON.parse(fs.readFileSync(new URL('../app/november-articles/'+l+'.json',import.meta.url)))]));
const revisions=JSON.parse(fs.readFileSync(new URL('../app/november-revisions.json',import.meta.url)));
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'}[c]));
async function page(p){const r=await worker.fetch(new Request(origin+p),env,{});assert.equal(r.status,200,p);return r.text();}

test('all 15 new pages render full translations with reciprocal canonicals and live source links',async()=>{
 const sitemap=await page('/editorial-sitemap.xml');
 for(const lang of langs)for(const a of records[lang]){
  const prefix=lang==='en'?'':'/'+lang,pathname=prefix+'/articles/'+a.slug,h=await page(pathname);
  assert.ok(h.includes('<h1>'+esc(a.title)+'</h1>'),pathname);
  assert.ok(h.includes('rel="canonical" href="'+origin+pathname+'"'));
  assert.ok(h.includes('data-article-locale="'+lang+'"'));
  assert.ok(h.includes('"datePublished":"2026-11-09"'));
  assert.ok(sitemap.includes('<loc>'+origin+pathname+'</loc>'));
  assert.doesNotMatch(h,/<meta[^>]*name="robots"[^>]*noindex/);
  for(const l of [...langs,'x-default'])assert.ok(h.includes('hrefLang="'+l+'"'),pathname+' alternate '+l);
  for(const section of a.sections){
   for(const p of section.paragraphs)assert.ok(h.includes(esc(p)),pathname+' complete paragraph');
   for(const link of section.links??[])assert.ok(h.includes('href="'+(link.href.startsWith('/')?prefix:'')+link.href+'"'),pathname+' link '+link.href);
  }
  const words=[a.title,a.standfirst,...a.takeaways,...a.sections.flatMap(s=>[s.heading,...s.paragraphs])].join(' ').split(/\s+/).length;
  assert.ok(words >= (lang==='en'?1200:850),pathname+' full-length content');
  if(lang==='en')assert.ok(words<=1800);
 }
});

test('all 25 existing article variants receive direct answers and relevant next-step links',async()=>{
 for(const lang of langs)for(const [slug,a] of Object.entries(revisions[lang])){
  const prefix=lang==='en'?'':'/'+lang,h=await page(prefix+'/articles/'+slug);
  assert.ok(h.includes('<h1>'+esc(a.title)+'</h1>'));
  assert.ok(h.includes(esc(a.standfirst)));
  for(const p of a.section.paragraphs)assert.ok(h.includes(esc(p)));
  assert.ok(h.includes('"dateModified":"2026-11-09"'));
  if(slug.includes('reviews'))assert.doesNotMatch(h,/eight reviews|huit avis|ocho comentarios|otto recensioni/);
 }
});

test('every language index has 30 articles and home/shipping expose the new guides',async()=>{
 for(const l of langs){
  const prefix=l==='en'?'':'/'+l,h=await page(prefix+'/articles');
  const urls=[...h.matchAll(/href="([^"#?]*\/articles\/[^"#?]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(urls.filter(p=>p.startsWith(prefix+'/articles/'))).size,30,l);
  const home=await page(prefix||'/'),shipping=await page(prefix+'/shipping');
  for(const a of records[l])assert.ok(home.includes(prefix+'/articles/'+a.slug),l+' home '+a.slug);
  for(const slug of ['lolobuy-reduce-shipping-costs','lolobuy-warehouse-storage-guide'])assert.ok(shipping.includes(prefix+'/articles/'+slug));
 }
});
