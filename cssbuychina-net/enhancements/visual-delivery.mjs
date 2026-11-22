// Serve the same immutable image records as ordinary HTTP JSON for browsers
// that cannot load the compressed assets or start a background worker.
export function withVisualDelivery(site) {
  return {async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const asset = url.pathname.match(/^\/api\/visual-data\/([a-f0-9]{16})\/(titles|\d{1,3})\.json$/);
    if (asset && ['GET', 'HEAD'].includes(request.method)) {
      const [, version, part] = asset;
      const path = '/assets/visual-index/' + version + '/' + (part === 'titles' ? 'titles.json' : part + '.bin');
      const upstream = await env.ASSETS.fetch(new Request(new URL(path, url.origin)));
      if (!upstream.ok || upstream.headers.get('content-type')?.includes('text/html')) {
        return new Response('Image index unavailable', {status:503, headers:{'Cache-Control':'no-store'}});
      }
      const headers = {'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'};
      if (request.method === 'HEAD') return new Response(null,{headers});
      if (part === 'titles') return new Response(upstream.body,{headers});
      const data = new Uint8Array(await upstream.arrayBuffer());
      const body = data[0] === 31 && data[1] === 139 ? new Response(data).body.pipeThrough(new DecompressionStream('gzip')) : data;
      return new Response(body,{headers});
    }
    const res=await site.fetch(request,env,ctx);
    if (!/\/catalog\/image-search\/?$/.test(url.pathname) || !res.headers.get('content-type')?.includes('text/html')) return res;
    const versioned = new HTMLRewriter().on('script[src]',{element(el){
      if(el.getAttribute('src').split('?')[0]==='/catalog.js')el.setAttribute('src','/commerce/search-page-20261122b.js');
    }}).transform(res);
    const headers = new Headers(versioned.headers);
    headers.set('Cache-Control','no-store');
    return new Response(versioned.body,{status:res.status,headers});
  }};
}
