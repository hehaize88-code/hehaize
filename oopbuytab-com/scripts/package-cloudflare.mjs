import {build} from 'esbuild';
import {readFile,readdir,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import {gzipSync} from 'node:zlib';

const output=path.resolve('dist/cloudflare');
await mkdir(output,{recursive:true});
const assets={};
const types={'.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.woff2':'font/woff2'};
async function collect(directory,prefix=''){
  for(const file of await readdir(directory,{withFileTypes:true})){
    const relative=prefix+'/'+file.name;
    const local=path.join(directory,file.name);
    if(file.isDirectory())await collect(local,relative);
    else if(types[path.extname(file.name)])assets[relative]={type:types[path.extname(file.name)],data:(await readFile(local)).toString('base64')};
  }
}
await collect(path.resolve('dist/client'));
const entry=path.join(output,'entry.mjs');
await writeFile(entry,`import application from '../server/index.js';
const assets=${JSON.stringify(assets)};
export default {async fetch(request,env,ctx){
  const url=new URL(request.url);
  if(url.hostname==='www.oopbuytab.com'||(url.hostname==='oopbuytab.com'&&url.protocol==='http:')){
    url.hostname='oopbuytab.com';url.protocol='https:';return Response.redirect(url.href,301);
  }
  if(url.pathname==='/en'||url.pathname.startsWith('/en/')){
    url.pathname=url.pathname.slice(3)||'/';return Response.redirect(url.href,301);
  }
  const production=url.hostname==='oopbuytab.com';
  if(!production&&url.pathname==='/robots.txt')return new Response('User-agent: *\\nDisallow: /\\n',{headers:{'Content-Type':'text/plain'}});
  const asset=assets[url.pathname];
  if(asset&&['GET','HEAD'].includes(request.method)){
    return new Response(request.method==='HEAD'?null:Uint8Array.from(atob(asset.data),c=>c.charCodeAt(0)),{headers:{'Content-Type':asset.type,'Cache-Control':'public, max-age=3600','X-Content-Type-Options':'nosniff'}});
  }
  const response=await application.fetch(request,env,ctx);
  const result=new Response(request.method==='HEAD'?null:response.body,response);
  result.headers.set('X-Content-Type-Options','nosniff');
  if(!production)result.headers.set('X-Robots-Tag','noindex, nofollow');
  return result;
}};`);
await build({entryPoints:[entry],outfile:path.join(output,'worker.js'),bundle:true,format:'esm',platform:'neutral',target:'es2022',minify:true});
await rm(entry);
const bytes=await readFile(path.join(output,'worker.js'));
console.log(JSON.stringify({worker:'dist/cloudflare/worker.js',bytes:bytes.length,gzipBytes:gzipSync(bytes).length,assets:Object.keys(assets).length}));
