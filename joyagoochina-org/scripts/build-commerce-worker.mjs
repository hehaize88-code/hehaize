import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {renderHome} from '../commerce/home.js';
import {LANGS} from '../commerce/catalog.js';
import {SNAPSHOT} from '../commerce/content.js';
import {SITEMAP_INDEX,sitemapLanguages} from '../commerce/routes.js';
const files=['translations','content','product-ui','product-glossaries','titles','experience','catalog','home','routes'];
let bundle='// Generated from commerce modules. Do not edit this bundle directly.\n'+(await readFile('public/commerce/product-title.js','utf8')).replace(/^export /gm,'')+'\n';
for(const name of files){if(name==='titles'){const titleTranslations={};for(const l of LANGS.filter(l=>l!=='en'))titleTranslations[l]=JSON.parse(await readFile(`public/commerce/titles/${l}.json`,'utf8'));bundle+='const titleTranslations = '+JSON.stringify(titleTranslations)+';\n';continue;}bundle+=(await readFile(`commerce/${name}.js`,'utf8')).replace(/^import .*?;\n/gm,'').replace(/^export /gm,'')+'\n';}
let worker=await readFile('cloudflare/static-worker.js','utf8');
worker=worker.replace('const localeCodes =', 'const staticLocaleCodes =').replaceAll('localeCodes.has(', 'staticLocaleCodes.has(');
// Isolate the page translator's module scope from the native catalogue bundle.
const localization=(await readFile('commerce/localization.js','utf8')).replace(/^import .*?;\n/gm,'').replace(/^export /gm,'');
const wrapper='const localizeWorker = (()=>{\n'+localization+'\nreturn withLocalization;\n})();\n';
await writeFile('_worker.js',bundle+wrapper+worker.replace('export default worker;', 'export default localizeWorker(worker);'));
const destination=process.argv[2];
if(destination){
 await cp('_worker.js',`${destination}/_worker.js`);
 await cp(`${destination}/sitemap.xml`,`${destination}/editorial-sitemap.xml`);
 let xml=await readFile(`${destination}/editorial-sitemap.xml`,'utf8');
 xml=xml.replace(/<url>[\s\S]*?<\/url>/g,entry=>/<loc>[^<]*\/(?:product\/[^/]+|spreadsheet|categories)\/<\/loc>/.test(entry)?'':entry);
 const origin='https://joyagoochina.org';
 const englishPaths=[...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname).filter(p=>!sitemapLanguages.includes(p.split('/')[1])))];
 const localizedPaths=englishPaths.flatMap(p=>sitemapLanguages.map(l=>origin+(l==='en'?'':'/'+l)+p));
 xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+localizedPaths.map(h=>'<url><loc>'+h+'</loc></url>').join('')+'</urlset>';
 await writeFile(`${destination}/editorial-sitemap.xml`,xml);
 await writeFile(`${destination}/sitemap.xml`,SITEMAP_INDEX);
 for(const lang of LANGS){const dir=destination+(lang==='en'?'':'/'+lang);await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,await renderHome(lang,SNAPSHOT.products,{snapshot:true}).text());}
 console.log('Catalogue worker, sitemaps and all 10 homepages prepared.');
}
