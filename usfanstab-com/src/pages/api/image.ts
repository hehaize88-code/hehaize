import {imageURL} from '../../lib/catalog';
export async function GET({url}) {
  let target=imageURL(url.searchParams.get('url')||'');
  if(!target)return new Response('Invalid image',{status:400});
  try {
    // Workers support manual/follow redirects, not the browser-only error mode.
    for(let n=0;n<4;n++) {
      const r=await fetch(target,{redirect:'manual',signal:AbortSignal.timeout(12000)});
      if(r.status>=300&&r.status<400){target=imageURL(new URL(r.headers.get('location')||'',target).href);if(!target)break;continue;}
      if(!r.ok||!r.headers.get('content-type')?.startsWith('image/')){console.error('image upstream status',r.status,r.headers.get('content-type'));break;}
      const b=await r.arrayBuffer();if(b.byteLength>10000000)return new Response('Too large',{status:413});
      return new Response(b,{headers:{'Content-Type':r.headers.get('content-type')!,'Cache-Control':'public,max-age=86400','X-Content-Type-Options':'nosniff'}});
    }
  }catch(e){console.error('image fetch failed',e instanceof Error?e.message:'unknown');}
  return new Response('Image source temporarily unavailable',{status:502});
}
