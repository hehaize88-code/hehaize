import {build} from 'esbuild';
await build({
  entryPoints:['production.mjs'],
  outfile:'dist/server/index.js',
  bundle:true,
  format:'esm',
  platform:'browser',
  target:'es2022',
  minify:true,
  legalComments:'none'
});
