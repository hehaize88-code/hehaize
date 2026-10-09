import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const adapter=(await readFile(new URL('commerce/catalog.js',root),'utf8')).replace(/^export /gm,'');
const worker=await readFile(new URL('commerce/pages-worker.js',root),'utf8');
await writeFile(new URL('_worker.js',root),adapter+'\n'+worker);
