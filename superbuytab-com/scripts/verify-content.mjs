import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {parseHTML} from 'linkedom';
import worker from '../dist/server/index.js';
const origin='https://superbuytab.com';
const locales=['en','de','es','fr','it','pl','pt','ro','sv','nl','da','fi','el','cs','hu','bg','sk','hr','sl','lt','lv','et','ga','mt'];
const render=async(path)=>{const response=await worker.fetch(new Request(origin+path),{},{});return {response,doc:parseHTML(await response.text()).document};};
const files=(await readdir('src/content/articles')).filter(f=>f.endsWith('.md'));
assert.equal(files.length,14);
const minimums=[];
for(const file of files){
 const raw=await readFile('src/content/articles/'+file,'utf8');
 const slug=raw.match(/^slug: (.+)$/m)[1];
 const {response,doc}=await render(`/articles/${slug}/`);
 assert.equal(response.status,200,slug);
 assert.equal(doc.querySelectorAll('h1').length,1);
 assert(doc.querySelector('.article-prose').textContent.length>5500,slug+' incomplete article');
 assert(doc.querySelectorAll('.article-prose h2').length>=7);
 assert.equal(doc.querySelector('link[rel=canonical]').href,origin+`/articles/${slug}/`);
 const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
 assert.equal(schema['@type'],'BlogPosting');assert.equal(schema.inLanguage,'en');
 assert.equal(doc.querySelectorAll('.article-card').length,3);
 assert(doc.querySelector('a[href="/articles/"]'));
 const prose=raw.split('---').slice(2).join('---');
 const words=(prose.match(/\b[\w]+(?:['’-][\w]+)*\b/g)||[]).length;
 assert(words>=1200&&words<=1800,`${slug}: ${words} words`);minimums.push(words);
 for(const link of doc.querySelectorAll('.article-prose a')){
   const href=link.getAttribute('href');
   if(href.startsWith('/articles/'))assert(files.includes(href.split('/')[2]+'.md'),'Broken article link '+href);
   if(href.startsWith('http'))assert(['www.superbuy.com','www.gov.uk','www.cbp.gov'].includes(new URL(href).hostname),'Unexpected source '+href);
 }
}
for(const code of locales){
 const prefix=code==='en'?'':'/'+code;
 const {response,doc}=await render(prefix+'/faq/');
 assert.equal(response.status,200);
 assert.equal(doc.documentElement.lang,code);
 assert.equal(doc.querySelectorAll('.faq-item').length,26,code);
 assert.equal(doc.querySelectorAll('.faq-source').length,26,code);
 assert.equal(new Set([...doc.querySelectorAll('.faq-item')].map(el=>el.id)).size,26);
 const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
 assert.equal(schema.mainEntity.length,26);
 assert.equal(schema.inLanguage,code);
 assert.equal(doc.querySelectorAll('link[hreflang]').length,25);
 assert(doc.querySelector(`.site-header nav a[href="${prefix}/articles/"]`));
 assert(!doc.body.textContent.includes('undefined'));
 if(code!=='en')assert.notEqual(schema.mainEntity[0].name,'What does Superbuy do?',code+' English FAQ fallback');
 const hub=await render(prefix+'/articles/');assert.equal(hub.doc.querySelectorAll('.article-card').length,14);
 assert.equal(hub.doc.querySelector('link[rel=canonical]').href,origin+prefix+'/articles/');
 assert.equal(hub.doc.querySelectorAll('link[hreflang]').length,25);
 assert.equal(hub.response.headers.get('X-Robots-Tag'),'index, follow');
 if(code!=='en'){
  assert(!hub.doc.querySelector('.language-note'));
  assert(!hub.doc.body.textContent.includes('min · English'));
  assert.notEqual(hub.doc.querySelector('.article-card h3').textContent,(await render('/articles/')).doc.querySelector('.article-card h3').textContent);
 }
}
const localizedArticle=await render('/de/articles/superbuy-fees/');
assert.equal(localizedArticle.doc.querySelector('article').lang,'de');
assert.equal(localizedArticle.doc.querySelector('.language-menu a[lang="fr"]').getAttribute('href'),'/fr/articles/superbuy-fees/');
assert.equal(localizedArticle.response.headers.get('X-Robots-Tag'),'index, follow');

for(const code of locales.filter(c=>c!=='en')){
 for(const file of files){
  const slug=file.replace(/\.md$/,'');
  const enRaw=(await readFile('src/content/articles/'+file,'utf8')).split('---').slice(2).join('---').trim().split('\n');
  const localRaw=(await readFile(`src/content/articles/${code}/${file}`,'utf8')).split('---').slice(2).join('---').trim().split('\n');
  assert.equal(localRaw.length,enRaw.length,`${code}/${slug} source block count`);
  const numberTokens=text=>(text.replace(/\]\([^)]*\)/g,'').replace(/(?<=\d)[, .\u00a0](?=\d{3}\b)/g,'').match(/\d+/g)||[]).sort();
  enRaw.forEach((line,i)=>{
   let expected=numberTokens(line),actual=numberTokens(localRaw[i]);
   if(line.includes('twenty tabs'))actual=actual.filter(n=>n!=='20');
   assert.deepEqual(actual,expected,`${code}/${slug} numerical facts line ${i+1}`);
  });
  const en=(await render(`/articles/${slug}/`)).doc;
  const {response,doc}=await render(`/${code}/articles/${slug}/`);
  assert.equal(response.status,200,`${code}/${slug}`);
  assert.equal(doc.querySelector('article').lang,code);
  assert.equal(doc.querySelector('link[rel=canonical]').href,`${origin}/${code}/articles/${slug}/`);
  assert.equal(doc.querySelectorAll('link[hreflang]').length,25);
  for(const selector of ['.article-prose>p','.article-prose h2','.article-prose th','.article-prose td','.article-prose li','.article-prose a']){
   assert.equal(doc.querySelectorAll(selector).length,en.querySelectorAll(selector).length,`${code}/${slug} ${selector}`);
  }
  const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
  assert.equal(schema.inLanguage,code);assert.equal(schema.headline,doc.querySelector('h1').textContent);
  assert(!doc.body.textContent.includes('undefined'));
  assert(!/ZXQ\d|<unk>|>>[a-z]+<</.test(doc.querySelector('.article-prose').textContent));
  const englishParagraphs=[...en.querySelectorAll('.article-prose>p')].map(p=>p.textContent);
  for(const p of doc.querySelectorAll('.article-prose>p'))assert(!englishParagraphs.includes(p.textContent),`${code}/${slug} English paragraph`);
  for(const a of doc.querySelectorAll('.article-prose a')){
   const href=a.getAttribute('href');if(href.startsWith('/'))assert(href.startsWith('/'+code+'/'),`${code}/${slug} untranslated internal link`);
  }
  assert(!doc.querySelector('[data-article-contents]').hasAttribute('open'),'Mobile TOC must start collapsed');
 }
}

const unknown=await render('/articles/not-a-real-guide/');assert.equal(unknown.response.status,404);
const filtered=await render('/spreadsheet/?q=nike&category=jersey&sort=price');assert.equal(filtered.response.status,200);
for(const link of filtered.doc.querySelectorAll('.catalog-sidebar a')){
 const u=new URL(link.getAttribute('href'),origin);assert(!u.searchParams.has('q'));assert(!u.searchParams.has('page'));assert.equal(u.searchParams.get('sort'),'price');
}
assert.equal(filtered.doc.querySelectorAll('.catalog-sidebar a').length,12);
const jersey=await render('/spreadsheet/?category=jersey');assert.equal(jersey.response.status,200);
const total=Number(jersey.doc.querySelector('.result-count strong').textContent.replace(/\D/g,''));
assert(total>Number(filtered.doc.querySelector('.result-count strong').textContent.replace(/\D/g,'')));
assert.equal(jersey.doc.querySelector('.pagination [aria-current=page]').textContent,'1');
assert(jersey.doc.querySelector('.pagination .page-direction[aria-disabled=true]'));
const lastPage=Math.ceil(total/20);
const last=await render(`/spreadsheet/?category=jersey&page=${lastPage}`);
assert.equal(last.response.status,200);
assert.equal(last.doc.querySelectorAll('.product-card').length,total%20||20);
assert(!last.doc.querySelector('.pagination a[rel=next]'));
assert.equal(last.doc.querySelector('.pagination [aria-current=page]').textContent,String(lastPage));
assert(last.doc.querySelector('.pagination a[rel=prev]'));
const nextLink=jersey.doc.querySelector('.pagination a[rel=next]').getAttribute('href');
const second=await render(nextLink);assert.equal(second.response.status,200);
assert.equal(second.doc.querySelector('.pagination [aria-current=page]').textContent,'2');
const firstProducts=[...jersey.doc.querySelectorAll('.product-card')].map(a=>a.getAttribute('href'));
assert([...second.doc.querySelectorAll('.product-card')].every(a=>!firstProducts.includes(a.getAttribute('href'))));
console.log(JSON.stringify({passed:true,articles:336,wordRange:[Math.min(...minimums),Math.max(...minimums)],faqPerLanguage:26,languages:24,categoryReset:'passed',paginationFirstMiddleLast:'passed',sourceCategoryTotal:total,localizedEditorialCanonical:'passed'}));
