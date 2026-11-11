import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { novemberArticles, newNovemberSlugs } from '../data/november-articles.js';
import { articles, getArticle } from '../data/articles.js';
const decode = s => s.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&#39;',"'").replaceAll('&quot;','"');
let checked = 0;
for (const item of novemberArticles) for (const locale of ['en','pt-br','de']) {
 const article=getArticle(item.slug,locale);
 const prefix=locale==='en'?'':'/'+locale;
 const path=prefix+'/articles/'+item.slug+'/';
 const html=decode(readFileSync('out'+path+'index.html','utf8'));
 const body=html.match(/<article class="seo-article-body">([\s\S]*?)<\/article>/)?.[1];
 assert.ok(body,path);
 assert.ok(html.includes(`<h1>${article.title}</h1>`),path+' local title');
 assert.ok(body.includes(article.growthContent.deck),path+' full translated introduction');
 for (const section of article.growthContent.sections) for (const paragraph of section) assert.ok(body.includes(paragraph),path+' complete translated section');
 for (const [label,href] of article.growthContent.links) assert.ok(body.includes(`href="${href.startsWith('https:')?href:prefix+href}"`),path+' link '+label);
 const schema=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(x=>JSON.parse(x[1])).find(x=>x['@type']==='Article');
 assert.equal(schema.datePublished,article.published);
 assert.equal(schema.dateModified,'2026-11-07');
 assert.equal(schema.headline,article.title);
 assert.ok(article.wordCount>800);
 if (newNovemberSlugs.includes(item.slug)) assert.equal(schema.datePublished,'2026-11-07');
 else assert.notEqual(schema.datePublished,'2026-11-07','Preserve original publication date');
 for (const other of ['en','pt-br','de']) assert.ok(html.includes(`hreflang="${other==='pt-br'?'pt-BR':other}" href="https://hubbuy-sheet.com${other==='en'?'':'/'+other}/articles/${item.slug}/"`),path+' reciprocal alternate');
 checked++;
}
for(const locale of ['en','pt-br','de']) {
 const prefix=locale==='en'?'':'/'+locale;
 const html=decode(readFileSync('out'+prefix+'/articles/index.html','utf8'));
 for(const slug of newNovemberSlugs) assert.ok(html.includes(getArticle(slug,locale).title));
 console.log(locale,articles.length,'articles');
}
console.log(`PASS November: ${checked} complete translated new/revised pages, original publication dates, updated schema, working official source links, index discovery and reciprocal alternates.`);
