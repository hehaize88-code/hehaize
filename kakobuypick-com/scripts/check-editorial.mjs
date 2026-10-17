import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {parseHTML} from 'linkedom';
import worker from '../dist/server/index.js';
const locales=process.argv.slice(2).length?process.argv.slice(2):'en de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt'.split(' ');
const source=JSON.parse(await fs.readFile(new URL('../src/content/editorial/en.json',import.meta.url),'utf8'));
const route=(lang,path)=>lang==='en'?path:`/${lang}${path}`;
function checkTranslatedSentences(actual, original, locale, path='') {
 if (typeof original === 'string' && typeof actual === 'string') {
  for (const sentence of original.split(/(?<=[.!?])\s+/)) {
   if (sentence.split(/\s+/).length >= 7)
    assert.ok(!actual.includes(sentence), `${locale} English sentence at ${path}: ${sentence}`);
  }
 } else if (original && typeof original === 'object') {
  for (const key of Object.keys(original)) checkTranslatedSentences(actual?.[key],original[key],locale,`${path}.${key}`);
 }
}
let checks=0;
for(const lang of locales){
 const data=JSON.parse(await fs.readFile(new URL(`../src/content/editorial/${lang}.json`,import.meta.url),'utf8'));
 if(lang!=='en')checkTranslatedSentences(data,source,lang);
 if(lang!=='en')assert.notEqual(data.ui.sources,source.ui.sources,`${lang} untranslated source heading`);
 if(lang==='ga')assert.ok(/(cigireacht|iniúch)/i.test(data.ui.sourceLabels.inspection), 'Irish inspection label must describe inspection, not an invented regulation');
 assert.equal(data.articles.length,10,`${lang} articles`);assert.equal(data.faq.length,26,`${lang} FAQ`);
 assert.equal(data.guide.sections.length,6);
 assert.deepEqual(data.articles.map(a=>a.slug),source.articles.map(a=>a.slug));
 for(let i=0;i<10;i++){
  assert.deepEqual(data.articles[i].sources,source.articles[i].sources);
  assert.equal(data.articles[i].sections.length,5);
  assert.equal(data.articles[i].checklist.length,4);
  assert.equal(data.articles[i].table.rows.length,source.articles[i].table.rows.length);
  for(let j=0;j<5;j++){
   const actual=data.articles[i].sections[j],original=source.articles[i].sections[j];
   assert.equal(actual.paragraphs.length,original.paragraphs.length);
   if(lang!=='en')assert.notEqual(actual.paragraphs.join(''),original.paragraphs.join(''),`${lang} untranslated article ${i} section ${j}`);
  }
 }
 for(let i=0;i<26;i++){
  assert.equal(data.faq[i].id,source.faq[i].id);assert.deepEqual(data.faq[i].sources,source.faq[i].sources);
  if(lang!=='en')assert.notEqual(data.faq[i].a,source.faq[i].a,`${lang} untranslated FAQ ${i}`);
 }
 for(const [id,numbers] of Object.entries({'storage-normal':['100','90','2026'],'storage-unmatched':['60'],'damaged-delivery':['72']})){
  const answer=data.faq.find(f=>f.id===id).a;
  for(const n of numbers)assert.ok(answer.includes(n),`${lang} lost critical number ${n}: ${id}`);
 }
 for(const path of ['/guide/','/faq/','/articles/',...data.articles.map(a=>`/articles/${a.slug}/`)]){
  const url='https://kakobuypick.com'+route(lang,path);
  const response=await worker.fetch(new Request(url),{},{});assert.equal(response.status,200,url);
  const html=await response.text();const {document}=parseHTML(html);
  assert.equal(document.documentElement.lang,lang,url);
  assert.equal(document.querySelector('link[rel=canonical]').href,url,url);
  assert.equal(document.querySelectorAll('link[hreflang]').length,25,url);
  assert.equal(document.querySelectorAll('main h1').length,1,url);
  assert.equal(document.querySelector('meta[name=robots]').content,'noindex,nofollow',url);
  for(const p of ['/guide/','/faq/','/articles/']) assert.ok(document.querySelector(`header nav a[href="${route(lang,p)}"]`),`${url} missing navigation ${p}`);
  assert.ok(!html.includes('/#guide')&&!html.includes('/#faq'),`${url} old anchors`);
  const schema=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  assert.ok(schema['@graph'].find(x=>x['@type']==='BreadcrumbList'));
  if(path==='/faq/'){assert.equal(document.querySelectorAll('.faq-answer').length,26);assert.equal(schema['@graph'].find(x=>x['@type']==='FAQPage').mainEntity.length,26);}
  if(path==='/articles/')assert.equal(document.querySelectorAll('main .article-card').length,10);
  if(path.startsWith('/articles/')&&path!=='/articles/'){
   const article=data.articles.find(a=>path.includes(a.slug));assert.equal(document.querySelector('.knowledge-heading h1').textContent,article.title);
   assert.equal(schema['@graph'].find(x=>x['@type']==='Article').inLanguage,lang);
   assert.equal(document.querySelectorAll('.reading-body section').length,6);
  }
  for(const code of locales){assert.ok(document.querySelector(`.language-grid a[href="${route(code,path)}"]`),`${url} wrong language destination ${code}`);}
  assert.ok(document.querySelector('a[href="https://kakobuy.com/register"]'));
  checks++;
 }
 console.log(`PASS ${lang}: 10 articles, 26 FAQs, 6 guide steps, localized routes/schema/links`);
}
const missing=await worker.fetch(new Request('https://kakobuypick.com/articles/not-an-article/'),{},{});assert.equal(missing.status,404);
const redirect=await worker.fetch(new Request('https://www.kakobuypick.com/de/articles/kakobuy-qc-photos/?ref=check'),{},{});assert.equal(redirect.status,308);assert.equal(redirect.headers.get('location'),'https://kakobuypick.com/de/articles/kakobuy-qc-photos/?ref=check');
console.log(`PASS ${checks} editorial responses; unknown article 404; www 308 preserves path/query`);
