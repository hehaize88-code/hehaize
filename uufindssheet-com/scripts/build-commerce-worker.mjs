import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const files=['public/assets/locale-core.mjs','public/assets/product-title.mjs','commerce/product-glossaries.mjs','commerce/locale-support.mjs','commerce/experience.mjs','commerce/chrome.mjs','commerce/catalog.js','commerce/pages-worker.js'];
const code=[];
for(const file of files){let s=await readFile(new URL(file,root),'utf8');s=s.replace(/^import .*?;\n/gm,'');if(file!=='commerce/pages-worker.js')s=s.replace(/^export /gm,'');code.push(s);}
const mobileInnerCSS=(await readFile(new URL('app/mobile-inner.css',root),'utf8'))+'\n'+(await readFile(new URL('public/assets/mobile-compact.css',root),'utf8'));
await writeFile(new URL('_worker.js',root),'const MOBILE_INNER_CSS = '+JSON.stringify(mobileInnerCSS)+';\n'+code.join('\n'));
