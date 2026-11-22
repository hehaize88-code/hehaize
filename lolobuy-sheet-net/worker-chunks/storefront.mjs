import { languageFetch } from './language-worker.mjs';
import { commerceHTML, commerceRoute } from './commerce-upgrade.mjs';

export function storefront(application) {
  async function page(request, env, ctx) {
    const response = await application.fetch(request, env, ctx);
    if (request.method !== 'GET' || !response.headers.get('content-type')?.includes('text/html')) return response;
    const headers = new Headers(response.headers);
    for (const key of ['content-length', 'content-encoding', 'etag']) headers.delete(key);
    headers.set('x-lolobuy-storefront', '20261122');
    const html = (await response.text()).replaceAll('/catalog.js?v=20261012', '/catalog.js?v=20261122');
    const withCamera = html.includes('id="product-query"')
      ? html.replace('</head>', '<script defer src="/visual-index/camera.js"></script></head>')
      : html;
    return new Response(commerceHTML(withCamera), {status: response.status, headers});
  }
  return {
    async fetch(request, env, ctx) {
      const path = new URL(request.url).pathname;
      if (path.startsWith('/lolo-commerce/')) return commerceRoute(request);
      if (path === '/commerce-client.js' || path.startsWith('/visual-index/')) return env.ASSETS.fetch(request);
      return languageFetch(request, env, ctx, page);
    }
  };
}
