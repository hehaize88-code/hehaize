const patterns = new Map();
const originFiles='https://raw.githubusercontent.com/hehaize88-code/hehaize/main/uufindsgrid-com/public';
const base=lang=>'/'+lang;
const htmlLocale=lang=>lang==='zh'?'zh-CN':lang;
const titleCache=new Map();
async function titles(lang){
 const old=titleCache.get(lang);
 if(old?.until>Date.now())return old.data;
 try{
  const code=lang==='pt-br'?'pt':lang;
  const bytes=Uint8Array.from(atob(packedTitles[code]),c=>c.charCodeAt(0));
  const body=bytes[0]===31?new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')):bytes;
  const data=await new Response(body).json();
  if(titleCache.size>3)titleCache.delete(titleCache.keys().next().value);
  titleCache.set(lang,{data,until:Date.now()+3600000});return data;
 }catch{return old?.data||{}}
}
async function asset(req,path,env){
 if(Object.hasOwn(uiAssets,path)){
  const binary=/\.png$|\.ico$/.test(path);
  const type=path.endsWith('.png')?'image/png':path.endsWith('.ico')?'image/x-icon':path.endsWith('.css')?'text/css':'application/javascript';
  const content=binary?Uint8Array.from(atob(uiAssets[path]),x=>x.charCodeAt(0)):uiAssets[path];
  return new Response(content,{headers:{'content-type':type,'cache-control':'public,max-age=3600'}});
 }
 if(/^\/assets\/locales\/[a-z-]+\.json$/.test(path))return Response.json(dictionaries[path.split('/').pop().replace('.json','')]||{});
 if(/^\/visual-index\/(manifest\.json|[a-f0-9]{16}\.gz)$/.test(path)){
  if(env?.ASSETS){
   const local=await env.ASSETS.fetch(req);
   if(local.ok && !local.headers.get('content-type')?.includes('text/html'))return local;
  }
  const res=await fetch(originFiles+path,{cf:{cacheEverything:true,cacheTtl:path.endsWith('.gz')?86400:300}});
  return new Response(res.body,{status:res.status,headers:{'content-type':path.endsWith('.gz')?'application/octet-stream':'application/json','cache-control':res.ok?'public,max-age='+ (path.endsWith('.gz')?86400:300):'no-store'}});
 }
 return null;
}
