import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {build} from 'esbuild';
import {productsForCategory, buyingGuides, LANGS} from '../commerce/catalog.js';
const en=JSON.parse(await readFile(new URL('../app/seoGrowth.en.json',import.meta.url)));
const localized=JSON.parse(await readFile(new URL('../app/seoGrowth.json',import.meta.url)));
const all={en,...localized};
const unchanged=new Set(['slug','relatedLinks','publishedAt','modifiedAt','readTime']);
function compare(source,target,path='',key='') {
 if(unchanged.has(key)){assert.deepEqual(target,source,path);return;}
 if(Array.isArray(source)){assert.ok(Array.isArray(target),path);assert.equal(target.length,source.length,path);source.forEach((v,i)=>compare(v,target[i],`${path}.${i}`,key));return;}
 if(source&&typeof source==='object'){assert.deepEqual(Object.keys(target).sort(),Object.keys(source).sort(),path);for(const k of Object.keys(source))compare(source[k],target[k],`${path}.${k}`,k);return;}
 assert.equal(typeof target,'string',path);assert.ok(target.trim(),path);assert.doesNotMatch(target,/\[\[\[|\]\]\]|TODO|undefined/,path);
 if(source.length>120)assert.notEqual(target,source,path+' must be translated');
}
const result=await build({stdin:{contents:"export {getSeoArticleEntries} from './app/seoArticleLibrary';",loader:'ts',resolveDir:process.cwd()},bundle:true,write:false,platform:'node',format:'esm'});
const {getSeoArticleEntries}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
test('three complete new articles and four updates exist in every supported language',()=>{
 assert.deepEqual(Object.keys(all).sort(),LANGS.toSorted());
 for(const [lang,copy] of Object.entries(all)){
  assert.equal(copy.articles.length,3);assert.equal(Object.keys(copy.refresh).length,4);
  if(lang!=='en')compare(en,copy,lang);
  const articles=getSeoArticleEntries(lang);const expected=['en','zh','de','es','fr'].includes(lang)?26:18;assert.equal(articles.length,expected,lang);assert.equal(new Set(articles.map(a=>a.slug)).size,expected,lang);
  for(const a of articles.filter(a=>a.modifiedAt==='2026-10-16'))for(const link of a.relatedLinks||[])assert.ok(articles.some(a=>a.slug===link)||['articles','how-to-buy','qc-guide','shipping-guide','returns'].includes(link),lang+' '+link);
  for(const a of copy.articles){assert.equal(a.article.sections.length,8);for(const s of a.article.sections)assert.equal(s.paragraphs.length,2);}
 }
 for(const a of en.articles){const words=a.article.sections.flatMap(s=>s.paragraphs).join(' ').match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g).length;assert.ok(words>=1200&&words<=1800,`${a.slug}: ${words}`);}
});
test('localized buying guides link from the catalogue to all three new articles',()=>{
 for(const lang of LANGS){const html=buyingGuides(lang),prefix=lang==='en'?'':'/'+lang;for(const a of all[lang].articles)assert.ok(html.includes(`href="${prefix}/${a.slug}/"`),lang+' '+a.slug);assert.equal((html.match(/data-track-event="article_open"/g)||[]).length,3);}
});
test('confirmed wedding arch taxonomy error is excluded only from the shoes listing',()=>{
 const products=[{path:'/shoes/3448.html',title:'Wedding flower arch'},{path:'/shoes/1.html',title:'Running shoes'}];
 assert.equal(productsForCategory(products,'shoes').length,1);assert.deepEqual(productsForCategory(products,'AllProducts'),products);
});
test('published new and revised pages have correct canonical, hreflang, headings and dates',async()=>{
 const xml=await readFile(new URL('../dist/static-pages/editorial-sitemap.xml',import.meta.url),'utf8');
 for(const lang of LANGS){
  const copy=all[lang],prefix=lang==='en'?'':`/${lang}`;
  const index=await readFile(new URL(`../dist/static-pages${prefix}/articles/index.html`,import.meta.url),'utf8');
  const revised=Object.entries(copy.refresh).map(([slug,u])=>({slug,seoTitle:u.seoTitle,article:{title:u.title,description:u.description}}));
  for(const a of [...copy.articles,...revised]){
   const path=`${prefix}/${a.slug}/`,html=await readFile(new URL(`../dist/static-pages${path}index.html`,import.meta.url),'utf8');
   assert.ok(html.includes(`<html lang="${lang}"`),path);assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,path);
   assert.ok(html.includes(`rel="canonical" href="https://joyagoochina.org${path}"`),path);
   for(const alt of [...LANGS,'x-default']){const ap=['en','x-default'].includes(alt)?'':`/${alt}`;assert.ok(html.includes(`hrefLang="${alt}" href="https://joyagoochina.org${ap}/${a.slug}/"`)||html.includes(`hreflang="${alt}" href="https://joyagoochina.org${ap}/${a.slug}/"`),path+' '+alt);}
   assert.match(html,/"dateModified":"2026-10-16"/,path);assert.match(html,/"@type":"BreadcrumbList"/,path);assert.doesNotMatch(html,/<meta name="robots"[^>]*noindex/i,path);
   assert.ok(xml.includes(`<loc>https://joyagoochina.org${path}</loc>`),path);assert.ok(index.includes(`href="${path}"`),path);
   assert.match(html,/data-track-event="article_catalog_click"/,path);
  }
 }
 assert.doesNotMatch(xml,/<loc>[^<]*\/(spreadsheet|categories|product\/[^/]+)\/<\/loc>/);
});
