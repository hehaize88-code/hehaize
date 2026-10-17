import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../dist/server/index.js';
const origin = 'https://lolobuy-sheet.com';
const locales = ['en','fr','de','es','it'];
const slugs = ['lolobuy-product-link-not-working','lolobuy-image-search-guide','lolobuy-order-status-guide','lolobuy-fees-explained','lolobuy-payment-guide','lolobuy-return-refund-guide','lolobuy-extra-qc-photos-measurements','lolobuy-restricted-items-shipping-routes','lolobuy-shipping-france-guide','lolobuy-shipping-calculator-guide','lolobuy-submit-package-guide'];
const get = path => worker.fetch(new Request(origin+path, {headers:{accept:'text/html'}}), {ASSETS:{fetch:async()=>new Response('not found',{status:404})}}, {waitUntil(){}});

test('all five archives expose 27 articles and preserve the archive when switching language', async()=>{
 for (const locale of locales) {
  const prefix=locale==='en'?'':'/'+locale;
  const r=await get(prefix+'/articles');const html=await r.text();
  assert.equal(r.status,200);
  assert.equal((html.match(/class="article-card"/g)||[]).length,27,locale);
  const header=html.match(/<header[\s\S]*?<\/header>/)?.[0]||'';
  for (const target of locales) assert.ok(header.includes(`href="${target==='en'?'':'/'+target}/articles"`),`${locale} -> ${target} archive`);
  assert.doesNotMatch(html,/180(?: days| jours| días| Tage| giorni)/);
 }
});

test('new and previously missing articles have translated bodies, same-page language links, self canonicals and sitemap entries', async()=>{
 const sitemap=await(await get('/sitemap.xml')).text();
 const english = new Map();
 for(const locale of locales) for(const slug of slugs) {
  const path=(locale==='en'?'':'/'+locale)+'/articles/'+slug;
  const r=await get(path);const html=await r.text();
  assert.equal(r.status,200,path);
  assert.ok(html.includes(`<html lang="${locale}"`),path);
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`),path);
  assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`),path);
  assert.match(html,/"@type":"Article"/);
  assert.match(html,/"dateModified":"2026-10-17"/);
  assert.match(html,/hrefLang="x-default"/i);
  const header=html.match(/<header[\s\S]*?<\/header>/)?.[0]||'';
  for(const target of locales) assert.ok(header.includes(`href="${target==='en'?'':'/'+target}/articles/${slug}"`),`${path} -> ${target}`);
  const intro=html.match(/<div class="article-intro">([\s\S]*?)<\/div>/)?.[1]||'';
  assert.ok(intro.length>300,path+' needs a substantive introduction');
  if(locale==='en') english.set(slug,intro);else assert.notEqual(intro,english.get(slug),path+' must not fall back to English');
  assert.doesNotMatch(html,/180(?: days| jours| días| Tage| giorni)/);
 }
});
