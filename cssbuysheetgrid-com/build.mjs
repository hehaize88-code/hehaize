import fs from 'node:fs';
import {build} from 'esbuild';
fs.mkdirSync('dist/server',{recursive:true});
await build({entryPoints:['app.mjs'],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:'dist/server/index.js',minifyWhitespace:true,minifyIdentifiers:false,minifySyntax:false,charset:'utf8',loader:{'.css':'text'}});
