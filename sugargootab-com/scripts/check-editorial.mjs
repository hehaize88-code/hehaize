import fs from 'node:fs';
const dir=new URL('../src/content/editorial/',import.meta.url);
const locales=process.argv.length>2?process.argv.slice(2):['en','de','es','fr','it','pl','pt','ro','sv','nl','da','fi','el','cs','hu','bg','sk','hr','sl','lt','lv','et','ga','mt'];
const base=JSON.parse(fs.readFileSync(new URL('en.json',dir),'utf8'));
const failures=[],reports=[];
function fail(locale,msg){failures.push(locale+': '+msg)}
function text(a){return [...a.intro,...a.sections.flatMap(s=>[s.title,...s.paragraphs,...(s.bullets||[]),...(s.table?[...s.table.headers,...s.table.rows.flat()]:[])]),...a.checklist].join(' ')}
for(const lang of locales){
 const file=new URL(lang+'.json',dir);if(!fs.existsSync(file)){fail(lang,'missing locale');continue;}
 let d;try{d=JSON.parse(fs.readFileSync(file,'utf8'))}catch{fail(lang,'invalid JSON');continue;}
 if(d.locale!==lang)fail(lang,'wrong locale');
 if(d.reviewed!==base.reviewed)fail(lang,'review date differs');
 for(const group of ['ui','groups'])if(JSON.stringify(Object.keys(d[group]||{}).sort())!==JSON.stringify(Object.keys(base[group]).sort()))fail(lang,group+' keys differ');
 if(d.faqs.length!==30||d.articles.length!==13)fail(lang,'expected 30 FAQ / 13 articles, got '+d.faqs.length+'/'+d.articles.length);
 for(const [i,f]of d.faqs.entries()){let b=base.faqs[i];if(!b||f.id!==b.id||f.group!==b.group)fail(lang,'FAQ ID/group mismatch '+i);if(!f.question||!f.answer)fail(lang,'empty FAQ '+i);if(b&&JSON.stringify(f.sources.map(x=>x.url))!==JSON.stringify(b.sources.map(x=>x.url)))fail(lang,'FAQ source mismatch '+i);if(lang!=='en'&&b&&f.answer===b.answer)fail(lang,'untranslated FAQ '+f.id);}
 const ratios=[];
 for(const [i,a]of d.articles.entries()){
  const b=base.articles[i];if(!b){fail(lang,'extra article');continue;}
  for(const k of ['id','slug','category','published','updated'])if(a[k]!==b[k])fail(lang,`${a.slug}: ${k} differs`);
  if(JSON.stringify(a.related)!==JSON.stringify(b.related))fail(lang,`${a.slug}: related differs`);
  if(a.intro.length!==b.intro.length||a.checklist.length!==b.checklist.length||a.sections.length!==b.sections.length)fail(lang,`${a.slug}: section/intro/checklist counts differ`);
  if(JSON.stringify(a.sources.map(s=>s.url))!==JSON.stringify(b.sources.map(s=>s.url)))fail(lang,`${a.slug}: sources differ`);
  if(lang!=='en'){
   for(const k of ['title','description'])if(!a[k]||a[k]===b[k])fail(lang,`${a.slug}: untranslated ${k}`);
   for(const k of ['intro','checklist'])if(a[k].some((p,j)=>!p||p===b[k][j]))fail(lang,`${a.slug}: untranslated ${k}`);
  }
  for(const [j,s]of a.sections.entries()){
   let bs=b.sections[j];if(!bs)continue;
   if(s.id!==bs.id||s.paragraphs.length!==bs.paragraphs.length||(s.bullets||[]).length!==(bs.bullets||[]).length)fail(lang,`${a.slug}: section ${j} structure differs`);
   if(!!s.table!==!!bs.table||(s.table&&JSON.stringify([s.table.headers.length,...s.table.rows.map(r=>r.length)])!==JSON.stringify([bs.table.headers.length,...bs.table.rows.map(r=>r.length)])))fail(lang,`${a.slug}: table shape differs`);
   if(lang!=='en'&&s.paragraphs.some((p,k)=>p===bs.paragraphs[k]))fail(lang,`${a.slug}: untranslated paragraph in ${s.id}`);
   if(lang!=='en'&&s.table&&bs.table){
    const values=[...s.table.headers,...s.table.rows.flat()],original=[...bs.table.headers,...bs.table.rows.flat()];
    if(values.some((v,k)=>!v||v===original[k]))fail(lang,`${a.slug}: untranslated table`);
   }
  }
  const ratio=text(a).length/text(b).length;ratios.push(ratio);if(ratio<0.65)fail(lang,`${a.slug}: unexpectedly short (${ratio.toFixed(2)})`);
  for(const s of a.sources)if(!new URL(s.url).hostname.endsWith('sugargoo.com'))fail(lang,'nonofficial source '+s.url);
  for(const slug of a.related)if(!base.articles.some(x=>x.slug===slug))fail(lang,'broken related article '+slug);
 }
 reports.push({locale:lang,faq:d.faqs.length,articles:d.articles.length,minLengthRatio:ratios.length?+Math.min(...ratios).toFixed(2):0});
}
console.log(JSON.stringify({locales:reports,failures},null,2));if(failures.length)process.exitCode=1;
