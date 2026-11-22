const sbDescriptorCache=new Map();
// Source photos are public. Cache only a compact derived descriptor for subsequent searches.
async function sourceImageSignature(requestUrl, img) {
 const key=img.href;
 const cached=sbDescriptorCache.get(key);
 if(cached)return Response.json(cached,{headers:{'Cache-Control':'public,max-age=604800'}});
 const source = new URL(img.href);
 if (source.hostname.endsWith('.geilicdn.com')) {
  source.searchParams.set('w','96');source.searchParams.set('h','96');
 }
 const response=await fetch(source.href,{redirect:'manual',cf:{cacheEverything:true,cacheTtl:86400},signal:AbortSignal.timeout(10000)});
 if(!response.ok || !response.headers.get('content-type')?.includes('jpeg') || Number(response.headers.get('content-length')||0)>2000000) return new Response('',{status:415});
 const bytes=await response.arrayBuffer();
 if(bytes.byteLength>2000000)return new Response('',{status:415});
 try {
  const d=new JpegImage();
  d.opts={tolerantDecoding:true,maxResolutionInMP:5};
  JpegImage.resetMaxMemoryUsage(42*1024*1024);
  d.parse(new Uint8Array(bytes));
  if(d.components.length!==3)return new Response('',{status:415});
  const pixels=d.getData(72,64);
  function average(x,y,w,h,k){
   let sum=0;
   for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)sum+=pixels[(j*72+i)*3+k];
   return sum/(w*h);
  }
  let colors='',hash='';
  for(let y=0;y<4;y++)for(let x=0;x<4;x++)for(let k=0;k<3;k++)colors+=String.fromCharCode(Math.min(31,Math.round(average(x*18,y*16,18,16,k)/8)));
  for(let y=0;y<8;y++){
   let prev,b=0;
   for(let x=0;x<9;x++){
    const lum=.299*average(x*8,y*8,8,8,0)+.587*average(x*8,y*8,8,8,1)+.114*average(x*8,y*8,8,8,2);
    if(x>0){b=b*2+Number(lum>prev);if(x%4===0){hash+=b.toString(16);b=0}}prev=lum;
   }
  }
  const result=Response.json([hash,btoa(colors)],{headers:{'Cache-Control':'public,max-age=604800'}});
  if(sbDescriptorCache.size>=12000)sbDescriptorCache.delete(sbDescriptorCache.keys().next().value);
  sbDescriptorCache.set(key,[hash,btoa(colors)]);
  return result;
 }catch{return new Response('',{status:415})}
}
