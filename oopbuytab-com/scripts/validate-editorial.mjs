import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const directory='src/content/editorial';
const files=(await fs.readdir(directory)).filter(file=>file.endsWith('.json'));
const reference=JSON.parse(await fs.readFile(directory+'/en.json','utf8'));
const slugs=reference.articles.map(article=>article.slug);
assert.equal(slugs.length,14,'expected article count');
assert.equal(new Set(slugs).size,slugs.length,'unique article slugs');
const words=text=>text.trim().split(/\s+/).length;
const sources=value=>value.sources.map(source=>source.url).sort();
function localizedText(value,english,key=''){
 if(['slug','related','url','primaryKeyword','secondaryKeywords','format','published','modified'].includes(key))return;
 if(Array.isArray(value)&&Array.isArray(english)){value.forEach((item,i)=>localizedText(item,english[i],key));return;}
 if(value&&english&&typeof value==='object'&&typeof english==='object'){
  for(const name of Object.keys(english))if(name in value)localizedText(value[name],english[name],name);
  return;
 }
 if(typeof value==='string'&&typeof english==='string'&&(key==='label'||english.length>35))assert.notEqual(value,english,'untranslated '+key);
}
const digits=text=>[...new Set((text.replace(/(?<=\d)[., \u00a0\u202f](?=\d{3}(?:\D|$))/g,'').match(/\d+(?:[.,]\d+)*/g)||[]).map(n=>n.replace(',','.')))].sort();
const failures=[];
for(const file of files){
 try {
  const content=JSON.parse(await fs.readFile(directory+'/'+file,'utf8'));
  if(file!=='en.json')localizedText(content,reference);
  assert.deepEqual(Object.keys(content.ui).sort(),Object.keys(reference.ui).sort(),'UI keys');
  assert(content.ui.previewNotice.includes('{date}'),'preview date placeholder');
  assert.equal(content.faq.length,28,'FAQ count');
  assert.deepEqual(content.articles.map(a=>a.slug),slugs,'article slugs');
  for(let i=0;i<28;i++){
   const faq=content.faq[i],english=reference.faq[i];
   assert(faq.q&&faq.a,'empty FAQ');assert.deepEqual(sources(faq),sources(english),'FAQ sources');
   assert.deepEqual(digits(faq.a),digits(english.a),'FAQ policy numbers '+i);
   if(file!=='en.json')assert.notEqual(faq.a,english.a,'untranslated FAQ '+i);
  }
  content.articles.forEach((article,i)=>{
   const english=reference.articles[i];
   assert.equal(article.sections.length,article.format==='focused'?6:9,'sections '+article.slug);
   assert.equal(article.published,english.published,'published date parity');
   assert.equal(article.modified,english.modified,'modified date parity');
   assert(article.modified>=article.published,'date order');
   assert.equal(article.takeaways.length,3,'takeaways');
   assert.deepEqual(sources(article),sources(english),'article sources');
   assert.deepEqual(article.related,english.related,'related slugs');
   assert(article.related.every(slug=>slugs.includes(slug)&&slug!==article.slug),'valid related routes');
   article.sections.forEach((section,j)=>{
    assert.equal(section.text.split(/\n\s*\n/).length,3,'paragraphs '+article.slug+' #'+j);
    assert(!section.text.includes('\\n'),'literal escaped newline');
    assert(section.text.length>350,'unexpectedly short section');
    assert.deepEqual(digits(section.text),digits(english.sections[j].text),'section numbers '+article.slug+' #'+j);
    if(file!=='en.json')assert.notEqual(section.text,english.sections[j].text,'untranslated body');
   });
   const body=article.sections.map(s=>s.text).join(' '),englishBody=english.sections.map(s=>s.text).join(' ');
   if(file==='en.json')assert(words(body)>=(article.format==='focused'?850:1200),'English long-form length');
   else assert(body.length/englishBody.length>.65,'translation unexpectedly abbreviated '+article.slug);
  });
  assert.deepEqual(Object.keys(content.guides).sort(),['guide','qc','shipping']);
  for(const [key,guide]of Object.entries(content.guides)){
   assert.equal(guide.sections.length,4,'guide sections');assert.equal(guide.checks.length,3,'guide checks');
   assert.deepEqual(sources(guide),sources(reference.guides[key]),'guide sources');
  }
  assert.deepEqual(Object.keys(content.categoryIntros).sort(),Object.keys(reference.categoryIntros).sort(),'categories');
  for(const category of Object.values(content.categoryIntros))assert.equal(category.checks.length,3,'category checks');
  console.log(file+': 28 FAQ; '+content.articles.length+' complete articles; 3 guides; 11 categories');
 }catch(error){failures.push(file+': '+error.message.split('\n')[0]);}
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
assert.equal(files.length,24,'locale coverage');
console.log('24 locales passed content, source URL, paragraph and numeric parity checks.');
