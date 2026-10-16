import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { runInNewContext } from 'node:vm';
import worker from '../_worker.js';

const result = await build({stdin:{contents:'export { articles } from "./app/articles/article-data"; export { guides } from "./app/guides/guide-data";',resolveDir:new URL('..',import.meta.url).pathname},bundle:true,platform:'node',format:'cjs',write:false});
const module={exports:{}};
runInNewContext(result.outputFiles[0].text,{module,exports:module.exports});
const {articles,guides}=module.exports;
const newSlugs=['cssbuy-returns-refunds-after-qc','find-original-product-link-cssbuy','cssbuy-shipping-to-brazil'];
const env={ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
const ctx={waitUntil(){},passThroughOnException(){}};
const get=path=>worker.fetch(new Request(`https://cssbuychina.net${path}`),env,ctx);
function* strings(value,key='') {
 if(['published','checked'].includes(key))return;
 if(typeof value==='string'){if(!value.startsWith('/')&&!value.startsWith('https://'))yield value;return;}
 if(Array.isArray(value)){for(const entry of value)yield* strings(entry);return;}
 if(value&&typeof value==='object')for(const [name,entry] of Object.entries(value))yield* strings(entry,name);
}
test('all editorial text has complete Portuguese, German and Spanish translations',async()=>{
 assert.equal(Object.keys(articles).length,25);
 assert.equal(Object.keys(guides).length,3);
 for(const lang of ['pt-br','de','es']){
  const dictionary=JSON.parse(await readFile(new URL(`../app/articles/translations/${lang}.json`,import.meta.url),'utf8'));
  for(const text of new Set(strings({articles,guides}))){
   assert.ok(dictionary[text]?.trim(),`${lang}: missing ${text.slice(0,90)}`);
   if(text.split(/\s+/).length>2)assert.notEqual(dictionary[text],text,`${lang}: untranslated ${text.slice(0,90)}`);
  }
 }
});
test('new articles are discoverable in all languages and expose dated sources',async()=>{
 const sitemap=await readFile(new URL('../editorial-sitemap.xml',import.meta.url),'utf8');
 for(const locale of ['','/pt-br','/de','/es']){
  const home=await(await get(locale||'/')).text();
  for(const slug of newSlugs){
   const path=`${locale}/articles/${slug}`;
   assert.ok(home.includes(`href="${path}"`),`${path} homepage entry`);
   assert.ok(sitemap.includes(`<loc>https://cssbuychina.net${path}</loc>`),`${path} sitemap entry`);
   const response=await get(path),html=await response.text();
   assert.equal(response.status,200);
   assert.match(html,/class="article-sources"/);
   assert.match(html,/"datePublished":"2026-10-16"/);
   assert.match(html,/"dateModified":"2026-10-16"/);
   assert.match(html,/data-track-event="article_catalog_click"/);
   assert.ok(html.includes(`href="${locale}/catalog/"`));
   for(const href of [...html.matchAll(/href="([^"#]+)"/g)].map(m=>m[1]).filter(h=>/^\/(articles|guides)\//.test(h))){
    if(locale) assert.equal(href,`/articles/${slug}`,`${path} should keep readers in their language except the English-source link`);
   }
  }
 }
});
test('updated decision pages retain localized quick answers and sources',async()=>{
 for(const prefix of ['','/pt-br','/de','/es'])for(const path of ['/articles/cssbuy-restrictions-brands-batteries-liquids','/articles/cssbuy-warehouse-status-quality-inspection','/articles/cssbuy-shipping-calculator-actual-vs-volumetric-weight','/guides/read-warehouse-qc-photos']){
  const html=await(await get(prefix+path)).text();
  assert.match(html,/<section class="article-note" aria-label=/);
  assert.match(html,/"dateModified":"2026-10-16"/);
 }
});
