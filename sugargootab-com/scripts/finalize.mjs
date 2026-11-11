import {build} from 'esbuild';
import {mkdir,copyFile} from 'node:fs/promises';
await build({entryPoints:['dist/server/entry.mjs'],outfile:'dist/server/index.js',bundle:true,format:'esm',platform:'neutral',mainFields:['module','main'],conditions:['worker','browser'],target:'es2022',external:['node:*'],minify:true});
await mkdir('dist/client',{recursive:true});

await copyFile('src/content/product-glossary.json','dist/client/assets/product-glossary.json');
