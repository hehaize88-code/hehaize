import {readFileSync,writeFileSync,mkdirSync,readdirSync,copyFileSync} from 'node:fs';
const read=name=>readFileSync('src/'+name,'utf8');
const editorialIndex={};
for (const name of readdirSync('editorial').filter(n=>n.endsWith('.json'))) {
 const lang=name.slice(0,-5);
 const articles=JSON.parse(readFileSync('editorial/'+name,'utf8'));
 const dir='public/editorial/'+lang;
 mkdirSync(dir,{recursive:true});
 const groups=articles.map(({slug,title,faqs})=>({slug,title,faqs}));
 editorialIndex[lang]={articles:articles.map(({slug,title,summary})=>({slug,title,summary})),questions:groups.slice(0,5).map(group=>group.faqs[0])};
 for(const article of articles)writeFileSync(dir+'/'+article.slug+'.json',JSON.stringify(article));
 writeFileSync(dir+'/faq.json',JSON.stringify(groups));
}
const constants={
 editorialIndex,
 css:read('style.css')+'\n'+read('detail-upgrade.css'),
 logo:read('brand/logo.svg'),
 icon:read('brand/favicon.svg'),
 seed:JSON.parse(read('rates.json'))
};
const modules=['i18n.js','public-title-phrases.js','glossary.js','currency.js','detail-upgrade.js','catalog-page.js','visual-data.js','visual.js','editorial.js','routes.js'];
const source=[
 ...Object.entries(constants).map(([name,value])=>'const '+name+'='+JSON.stringify(value)+';'),
 ...modules.map(read)
].join('\n');
mkdirSync('dist/server',{recursive:true});
writeFileSync('dist/server/index.js',source);
mkdirSync('public/shards',{recursive:true});
for(const name of readdirSync('index-data'))copyFileSync('index-data/'+name,'public/shards/'+name.replace(/\.gz$/,'.bin'));
