import {build} from 'rolldown';
import {readFile,writeFile,readdir} from 'node:fs/promises';
// Embed the small client bundle so the portable preview has no static asset binding.
const assets={};for(const file of await readdir('dist/client/_astro')){assets['/_astro/'+file]=await readFile('dist/client/_astro/'+file,'utf8');}
await writeFile('dist/server/assets.mjs','export default '+JSON.stringify(assets));
await writeFile('dist/server/portable.mjs',`import worker from './entry.mjs';import assets from './assets.mjs';export default {fetch(request,env,ctx){const pathname=new URL(request.url).pathname;if(assets[pathname])return new Response(assets[pathname],{headers:{'Content-Type':'application/javascript; charset=utf-8','Cache-Control':'public,max-age=86400'}});return worker.fetch(request,env,ctx);}};`);
await build({input:'dist/server/portable.mjs',platform:'browser',external:[/^node:/],output:{file:'dist/server/index.js',format:'esm',inlineDynamicImports:true,minify:true}});
