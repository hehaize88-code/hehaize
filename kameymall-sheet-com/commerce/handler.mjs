import { localizePage, splitLocale, localePath, installEdition, hasEdition } from '../kamey-language/index.mjs';
import { productRoute } from '../kamey-product/index.mjs';
import { searchPage } from '../kamey-search/page.mjs';
import { enhanceLegacy } from './legacy-ui.mjs';

const native = new Set(['en','de','fr','es','it','pl']);
const staticPaths = new Set(['/favicon.ico','/kameymall-icon.png','/favicon.svg','/km-ui.js','/km-product-ui.js','/kamey-language/restore.js','/kameymall-logo.png']);
function isAsset(path) {
  return staticPaths.has(path) || /^\/(?:assets|product-images)\//.test(path) ||
    /^\/kamey-search\/[\w.-]+\.(?:css|mjs|js|json)$/.test(path);
}


async function loadEdition(lang,origin,env) {
  if(native.has(lang)||hasEdition(lang)||!env.ASSETS) return;
  const edition = await env.ASSETS.fetch(new Request(origin+'/kamey-editions/'+lang+'.json.gz'));
  if(!edition.ok) return;
  const bytes=await edition.arrayBuffer();
  const magic=new Uint8Array(bytes,0,Math.min(2,bytes.byteLength));
  if(magic[0]===31 && magic[1]===139) {
    const json=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).json();
    installEdition(lang,json);
  } else if(magic[0]===123) {
    installEdition(lang,JSON.parse(new TextDecoder().decode(bytes)));
  }

}

export function commerceWorker(legacy) {
  return {
    async fetch(request,env,ctx) {
      const url = new URL(request.url);
      if(url.hostname === 'www.kameymall-sheet.com' || (url.hostname==='kameymall-sheet.com' && url.protocol==='http:')) {
        url.hostname='kameymall-sheet.com';url.protocol='https:';url.port='';
        return Response.redirect(url,308);
      }
      if(isAsset(url.pathname) && env.ASSETS) return env.ASSETS.fetch(request);
      if(!['GET','HEAD'].includes(request.method)) return legacy.fetch(request,env,ctx);
      const [lang,path] = splitLocale(url.pathname);
      const cache = globalThis.caches?.default;
      const key = request.method === 'GET' && !url.search && !request.headers.has('authorization') && !path.startsWith('/kamey-product/')
        ? new Request(url.origin+'/.km-rendered-local-v6'+url.pathname) : null;
      if(cache && key) {
        const hit = await cache.match(key);
        if(hit) return hit;
      }
      await loadEdition(lang,url.origin,env);
      let result = await productRoute(request,env);
      const isLegacy = !result && !/^\/image-search\/?$/.test(path);
      const useNative = isLegacy && native.has(lang);
      if(!result && !isLegacy) result = await searchPage(request,lang);
      if(!result){
        const dest = new URL(url);
        if(!useNative) dest.pathname = path;
        result = await legacy.fetch(dest.href===request.url?request:new Request(dest,request),env,ctx);
      }
      if(!result.headers.get('content-type')?.includes('text/html') || !result.ok || request.method === 'HEAD') return result;
      if(isLegacy){
        const html = enhanceLegacy(await result.text(),localePath('/image-search',lang),lang==='en'?'':'/'+lang);
        const headers = new Headers(result.headers);
        for(const key of ['etag','content-length','content-encoding']) headers.delete(key);
        result = new Response(html,{status:result.status,headers});
      }
      if(!isLegacy) {
        let html = await result.text();
        if(!html.includes('rel="canonical"')) html=html.replace('</head>','<link rel="canonical" href="https://kameymall-sheet.com'+localePath('/image-search',lang)+'"></head>');
        if(!html.includes('rel="icon"')) html=html.replace('</head>','<link rel="icon" href="/kameymall-icon.png"></head>');
        html=html.replace('</body>','<script async src="https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-QY8MM7VZV2");</script></body>');
        result=new Response(html,result);
      }
      const rendered = await localizePage(result,request,lang,{native:useNative && lang!=='en',sourceLocale:useNative?lang:'en'});
      if(cache && key && rendered.headers.get('x-km-translation')==='complete' && !rendered.headers.has('set-cookie')){
        rendered.headers.set('cache-control','public, max-age=300, s-maxage=86400');
        ctx.waitUntil(cache.put(key,rendered.clone()));
      }
      return rendered;
    }
  };
}
