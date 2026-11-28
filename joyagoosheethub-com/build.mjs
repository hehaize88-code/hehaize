import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const read=name=>readFileSync('src/'+name,'utf8');
const constants={
 css:read('style.css')+'\n'+read('detail-upgrade.css'),
 logo:read('brand/logo.svg'),
 icon:read('brand/favicon.svg'),
 seed:JSON.parse(read('rates.json'))
};
const modules=['i18n.js','public-title-phrases.js','glossary.js','currency.js','detail-upgrade.js','catalog-page.js','visual-data.js','visual.js','routes.js'];
const source=[
 ...Object.entries(constants).map(([name,value])=>'const '+name+'='+JSON.stringify(value)+';'),
 ...modules.map(read)
].join('\n');
mkdirSync('dist/server',{recursive:true});
writeFileSync('dist/server/index.js',source);
import {copyFileSync,readdirSync} from 'node:fs';
mkdirSync('public/shards',{recursive:true});
for(const name of readdirSync('index-data'))copyFileSync('index-data/'+name,'public/shards/'+name.replace(/\.gz$/,'.bin'));
