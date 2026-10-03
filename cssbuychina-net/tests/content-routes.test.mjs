import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import worker from '../_worker.js';
const inventory=JSON.parse(await readFile(new URL('./content-inventory.json',import.meta.url),'utf8'));
const env={ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
const ctx={waitUntil(){},passThroughOnException(){}};
const get=path=>worker.fetch(new Request(`https://cssbuychina.net${path}`),env,ctx);
test('all 25 articles and guides have complete localized routes and matching metadata',async()=>{
 for(const [kind,items] of Object.entries(inventory)) for(const [slug,counts] of Object.entries(items)) for(const [locale,language] of [['en','en'],['de','de-DE'],['es','es'],['pt-br','pt-BR']]){
  const path=`${locale==='en'?'':`/${locale}`}/${kind}/${slug}`;
  const response=await get(path);assert.equal(response.status,200,path);
  const html=await response.text();
  assert.ok(html.includes(`<html lang="${language}"`),path+' document language');
  assert.ok(html.includes(`<link rel="canonical" href="https://cssbuychina.net${path}"`),path+' canonical');
  assert.equal((html.match(/<section id="section-\d+"/g)||[]).length,counts.sections,path+' section count');
  const content=[...html.matchAll(/<section id="section-\d+"[\s\S]*?<\/section>/g)].map(m=>m[0]).join('');
  assert.equal((content.match(/<p>/g)||[]).length,counts.paragraphs,path+' paragraph count');
  for(const prefix of ['', '/de','/es','/pt-br'])assert.ok(html.includes(`href="${prefix}/${kind}/${slug}"`),path+' language link '+prefix);
  assert.equal((html.match(/<link rel="alternate" hrefLang=/g)||[]).length,5,path+' alternate links');
  assert.ok(html.includes('"@type":"BreadcrumbList"'));assert.ok(html.includes('"@type":"Article"'));
  assert.doesNotMatch(html,/"@type":"FAQPage"/);
  if(locale!=='en') assert.ok(!content.includes(counts.title),path+' translated body');
 }
});
test('language indexes include all 22 articles and missing content returns a real 404',async()=>{
 for(const locale of ['','/de','/es','/pt-br']){
  const html=await (await get(`${locale}/articles`)).text();
  assert.equal((html.match(/class="editorial-card /g)||[]).length,22,locale+' article count');
  for(const slug of Object.keys(inventory.articles))assert.ok(html.includes(`href="${locale}/articles/${slug}"`));
  for(const kind of ['articles','guides'])assert.equal((await get(`${locale}/${kind}/missing-article-check`)).status,404);
 }
});
test('warehouse and restrictions have decision tables; calculator has an accessible form',async()=>{
 for(const slug of ['cssbuy-warehouse-status-quality-inspection','cssbuy-restrictions-brands-batteries-liquids']){
  const html=await(await get('/articles/'+slug)).text();assert.match(html,/<table>/);assert.match(html,/<th[^>]*scope="row"/);
 }
 const html=await(await get('/articles/cssbuy-shipping-calculator-actual-vs-volumetric-weight')).text();
 assert.match(html,/name="divisor"/);assert.match(html,/name="step"/);assert.match(html,/aria-live="polite"/);
});
