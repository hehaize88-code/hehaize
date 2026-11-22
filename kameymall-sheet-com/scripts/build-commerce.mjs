import {build} from 'esbuild';
await build({
 entryPoints:['commerce/handler.mjs'], outfile:'commerce/bundle.mjs',
 bundle:true, minify:true, format:'esm', target:'es2022', platform:'browser'
});
