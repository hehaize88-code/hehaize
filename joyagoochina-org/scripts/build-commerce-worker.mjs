import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {renderHome} from '../commerce/home.js';
import {LANGS} from '../commerce/catalog.js';
import {SNAPSHOT} from '../commerce/content.js';
import {SITEMAP_INDEX} from '../commerce/routes.js';
const files=['translations','content','catalog','home','routes'];
let bundle='// Generated from commerce modules. Do not edit this bundle directly.\n';
for(const name of files)bundle+=(await readFile(`commerce/${name}.js`,'utf8')).replace(/^import .*?;\n/gm,'').replace(/^export /gm,'')+'\n';
let worker=await readFile('cloudflare/static-worker.js','utf8');
worker=worker.replace('const localeCodes =', 'const staticLocaleCodes =').replaceAll('localeCodes.has(', 'staticLocaleCodes.has(');
await writeFile('_worker.js',bundle+worker);
const destination=process.argv[2];
if(destination){
 await cp('_worker.js',`${destination}/_worker.js`);
 await cp(`${destination}/sitemap.xml`,`${destination}/editorial-sitemap.xml`);
 let xml=await readFile(`${destination}/editorial-sitemap.xml`,'utf8');
 xml=xml.replace(/<url>[\s\S]*?<\/url>/g,entry=>/<loc>[^<]*\/(?:product\/[^/]+|spreadsheet|categories)\/<\/loc>/.test(entry)?'':entry);
 await writeFile(`${destination}/editorial-sitemap.xml`,xml);
 await writeFile(`${destination}/sitemap.xml`,SITEMAP_INDEX);
 for(const lang of LANGS){const dir=destination+(lang==='en'?'':'/'+lang);await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,await renderHome(lang,SNAPSHOT.products,{snapshot:true}).text());}
 console.log('Catalogue worker, sitemaps and all 10 homepages prepared.');
}
