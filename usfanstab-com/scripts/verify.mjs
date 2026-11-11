import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseHTML} from 'linkedom/worker';
const base=process.argv[2]||'http://127.0.0.1:4173';
const content=JSON.parse(await readFile('src/content/editorial.json','utf8'));
const titleStrings=JSON.parse(await readFile('src/content/title-translations.json','utf8'));
const coverage=JSON.parse(await readFile('docs/title-translation-coverage.json','utf8'));
for(const lang of coverage.languages){assert.equal(Object.keys(titleStrings[lang]).length,coverage.uniqueTitles);assert(Object.values(titleStrings[lang]).every(t=>t&&!/ZXQ|§/i.test(t)));}
let count=0;let englishTitles=new Map();
async function page(path){const r=await fetch(base+path);assert.equal(r.status,200,path);count++;return parseHTML(await r.text()).document;}
for(const [locale,data] of Object.entries(content)){
  assert.equal(data.faqs.length,25);assert.equal(data.articles.length,10);
  assert.equal(new Set(data.articles.map(a=>a.slug)).size,10);
  const prefix=locale==='en'?'':'/'+locale;
  const faq=await page(prefix+'/faq/');assert.equal(faq.querySelectorAll('.faq-full details').length,25);
  const hub=await page(prefix+'/articles/');assert.equal(hub.querySelectorAll('.article-card').length,10);
  for(const article of data.articles){
    const doc=await page(prefix+'/articles/'+article.slug+'/');
    assert.equal(doc.querySelector('h1').textContent,article.title);
    assert.equal(doc.querySelectorAll('.article-body>section').length,article.sections.length);
    assert.equal(doc.querySelectorAll('.article-body>section p').length,article.sections.reduce((n,s)=>n+s.paragraphs.length,0));
    assert(!doc.body.textContent.includes('undefined'));
  }
  const r=await fetch(base+'/api/catalog.json?lang='+locale);assert.equal(r.status,200);const catalog=await r.json();
  assert.equal(catalog.products.length,20);if(locale==='en')englishTitles=new Map(catalog.products.map(p=>[p.path,p.title]));else {assert(catalog.products.some(p=>englishTitles.has(p.path)&&englishTitles.get(p.path)!==p.title),'No translated catalogue titles: '+locale);const jacket=catalog.products.find(p=>/high-quality jacket/i.test(englishTitles.get(p.path)||''));if(jacket)assert(!/high-quality jacket/i.test(jacket.title),'Descriptive title not translated: '+locale);}assert(!catalog.products.some(p=>/ZXQ\d+ZXQ/.test(p.title)));
  console.log(locale,'25 FAQ, 10 articles, complete sections; first product:',catalog.products[0].title);
}
const home=await page('/');assert.equal(home.querySelectorAll('.faq details').length,3);assert.equal(home.querySelectorAll('.article-card').length,3);assert(home.querySelector('.searchbar .camera-icon'));
const catalog=await (await fetch(base+'/api/catalog.json')).json();const r=await fetch(base+'/api/image?url='+encodeURIComponent(catalog.products[0].image));assert.equal(r.status,200);assert(r.headers.get('content-type').startsWith('image/'));assert((await r.arrayBuffer()).byteLength>1000);
const invalid=await fetch(base+'/api/image?url='+encodeURIComponent('https://example.com/test.jpg'));assert.equal(invalid.status,400);
const missing=await fetch(base+'/articles/not-an-article/');assert.equal(missing.status,404);
console.log('PASS',count,'HTML routes; image fetch and origin restrictions; missing article 404');
