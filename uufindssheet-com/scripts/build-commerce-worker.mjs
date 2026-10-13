import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const adapter=(await readFile(new URL('commerce/catalog.js',root),'utf8')).replace(/^export /gm,'');
const worker=await readFile(new URL('commerce/pages-worker.js',root),'utf8');
const mobileInnerCSS=await readFile(new URL('app/mobile-inner.css',root),'utf8');
await writeFile(new URL('_worker.js',root),'const MOBILE_INNER_CSS = '+JSON.stringify(mobileInnerCSS)+';\n'+adapter+'\n'+worker);
