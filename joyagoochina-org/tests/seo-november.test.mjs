import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
const locales=['en','zh','de','pl','es','it','fr','pt','ro','sv'];
const topics=['insurance','rehearsal','payments'];
const payloads=await Promise.all(topics.map(t=>readFile(new URL(`../app/november-${t}.json`,import.meta.url),'utf8').then(JSON.parse)));
const refreshed=['joyagoo-shipping-time-stages','joyagoo-size-guide-clothing-shoes','joyagoo-volumetric-weight-shipping-cost'];
const gaps=['joyagoo-shipping-calculator-cost-estimate-guide','why-is-joyagoo-shipping-so-expensive','joyagoo-shipping-cost-per-kg-explained','joyagoo-shipping-coupon-promo-discount-guide','joyagoo-shipping-to-canada-cost-planner','joyagoo-shipping-to-usa-cost-planner','joyagoo-shipping-to-uk-cost-planner','joyagoo-small-parcel-shipping-cost-strategy'];
const result=await build({stdin:{contents:"export {getSeoArticleEntries} from './app/seoArticleLibrary';",loader:'ts',resolveDir:process.cwd()},bundle:true,write:false,platform:'node',format:'esm'});
const {getSeoArticleEntries}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const all=Object.fromEntries(locales.map(l=>[l,getSeoArticleEntries(l)]));
function wordCount(a){return (a.article.sections.flatMap(s=>s.paragraphs).join(' ').match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g)||[]).length;}
test('all ten languages have the same 29 topics and valid related links',()=>{
 const expected=all.en.map(a=>a.slug).sort();assert.equal(expected.length,29);
 for(const [locale,entries] of Object.entries(all)){
  assert.equal(new Set(entries.map(a=>a.slug)).size,29,locale);assert.deepEqual(entries.map(a=>a.slug).sort(),expected,locale);
  for(const entry of entries)for(const link of entry.relatedLinks||[])assert.ok(expected.includes(link)||['articles','how-to-buy','qc-guide','shipping-guide','returns'].includes(link),`${locale}: ${entry.slug} -> ${link}`);
  for(const slug of refreshed){const a=entries.find(a=>a.slug===slug);assert.equal(a.modifiedAt,'2026-11-07');assert.notEqual(a.publishedAt,a.modifiedAt);assert.ok(a.article.sections[0].table);}
 }
});
test('new articles are complete translations with matching sections, tables and primary sources',()=>{
 for(const payload of payloads){
  assert.deepEqual(Object.keys(payload).sort(),locales.toSorted());assert.ok(wordCount(payload.en)>=1200&&wordCount(payload.en)<=1800,`${payload.en.slug}: ${wordCount(payload.en)}`);
  for(const locale of locales){const a=payload[locale];assert.equal(a.article.sections.length,payload.en.article.sections.length,locale);assert.ok(a.article.sections.length>=8);assert.equal(a.publishedAt,'2026-11-07');assert.equal(a.modifiedAt,'2026-11-07');assert.ok(a.sources.length);
   for(const source of a.sources)assert.match(source.url,/^https:\/\/(mgt|mapi)\.joyagoo\.com\//);
   assert.equal(a.article.facts.length,payload.en.article.facts.length);
   a.article.sections.forEach((section,i)=>{const en=payload.en.article.sections[i];assert.equal(section.paragraphs.length,en.paragraphs.length,locale+' '+i);if(en.table){assert.equal(section.table.rows.length,en.table.rows.length);assert.equal(section.table.headers.length,en.table.headers.length);}
    if(locale!=='en'){assert.notEqual(section.heading,en.heading);section.paragraphs.forEach((p,j)=>{assert.notEqual(p,en.paragraphs[j]);assert.ok(p.length>Math.max(30,en.paragraphs[j].length*(locale==='zh'?0.15:0.40)),`${locale} ${a.slug} section ${i} paragraph ${j} too short`);});}
   });assert.doesNotMatch(JSON.stringify(a),/TODO|PLACEHOLDER|\[\[\[/);
  }
 }
 for(const locale of ['pl','it','pt','ro','sv'])for(const slug of gaps){const a=all[locale].find(a=>a.slug===slug),en=all.en.find(a=>a.slug===slug);assert.equal(a.article.sections.length,en.article.sections.length);a.article.sections.forEach((section,i)=>{assert.equal(section.paragraphs.length,en.article.sections[i].paragraphs.length);assert.notEqual(section.paragraphs[0],en.article.sections[i].paragraphs[0]);assert.ok(section.paragraphs.join(' ').length>en.article.sections[i].paragraphs.join(' ').length*0.4,`${locale} ${slug} section ${i}`)});}
});
test('volumetric-weight translations preserve every example section and callout',()=>{
 const en=all.en.find(a=>a.slug==='joyagoo-volumetric-weight-shipping-cost');
 for(const locale of locales){
  const a=all[locale].find(a=>a.slug===en.slug);assert.equal(a.article.sections.length,en.article.sections.length,locale);assert.equal(a.article.facts.length,en.article.facts.length,locale);
  a.article.sections.forEach((section,i)=>{
   const source=en.article.sections[i];assert.equal(section.paragraphs.length,source.paragraphs.length,locale+' '+i);assert.equal(Boolean(section.callout),Boolean(source.callout),locale+' '+i);
   if(locale!=='en')section.paragraphs.forEach((paragraph,j)=>{assert.notEqual(paragraph,source.paragraphs[j]);assert.ok(paragraph.length>source.paragraphs[j].length*(locale==='zh'?0.15:0.40),locale+' '+i+' '+j);});
  });
 }
});
test('exported article pages, indexes and sitemap agree across all ten locales',async()=>{
 const sitemap=await readFile('dist/static-pages/editorial-sitemap.xml','utf8');
 for(const locale of locales){
  const prefix=locale==='en'?'':`/${locale}`,index=await readFile(`dist/static-pages${prefix}/articles/index.html`,'utf8');
  for(const a of all[locale]){
   const path=`${prefix}/${a.slug}/`,url=`https://joyagoochina.org${path}`,html=await readFile(`dist/static-pages${path}index.html`,'utf8');
   assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,path);assert.ok(html.includes(`rel="canonical" href="${url}"`),path);assert.ok(html.includes(`<html lang="${locale}"`),path);assert.ok(index.includes(`href="${path}"`),path);assert.ok(sitemap.includes(`<loc>${url}</loc>`),path);
   assert.ok(html.includes(`"dateModified":"${a.modifiedAt}"`),path);assert.ok(html.includes(`"datePublished":"${a.publishedAt}"`),path);assert.doesNotMatch(html,/<meta name="robots"[^>]*noindex/i,path);
   for(const alt of [...locales,'x-default']){const altPrefix=['en','x-default'].includes(alt)?'':`/${alt}`;assert.ok(new RegExp(`href[Ll]ang="${alt}" href="https://joyagoochina.org${altPrefix}/${a.slug}/"`).test(html),path+' '+alt);}
   if(a.sources)for(const source of a.sources)assert.ok(html.includes(`href="${source.url}"`),path+' source');
  }
 }
});
