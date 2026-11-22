import { languageFetch } from './language-worker.mjs';
import { commerceHTML, commerceRoute } from './commerce-upgrade.mjs';

function addHomeCamera(html) {
  if (!html.includes('class="image-search-shortcut"')) return html;
  const icon = '<svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 7h4l1.6-2.5h6.8L17 7h4v12H3z"/><circle cx="12" cy="12.5" r="3.5"/></svg>';
  const withButtons = html.replace(/<form\b[^>]*class="product-search(?: [^"]*)?"[^>]*>[\s\S]*?<\/form>/g, form => {
    const action = form.match(/action="(\/(?:[a-z-]+\/)?catalog\/)"/)?.[1];
    if (!action || form.includes('class="image-camera"')) return form;
    const camera = '<a class="image-camera" href="'+action+'image-search/" aria-label="Search by image" title="Search by image">'+icon+'</a>';
    return form.replace('<button type="submit"',camera+'<button type="submit"');
  });
  return withButtons.replace('</head>','<script defer src="/visual-index/camera.js?v=2"></script></head>');
}

export function storefront(application) {
  async function page(request, env, ctx) {
    const response = await application.fetch(request, env, ctx);
    if (request.method !== 'GET' || !response.headers.get('content-type')?.includes('text/html')) return response;
    const headers = new Headers(response.headers);
    for (const key of ['content-length', 'content-encoding', 'etag']) headers.delete(key);
    headers.set('x-lolobuy-storefront', '20261122');
    const html = (await response.text()).replaceAll('/catalog.js?v=20261012', '/catalog.js?v=20261122');
    const branded = html.replaceAll('/lolobuy-official.svg', '/lolobuy-logo.png');
    const withCamera = addHomeCamera(branded);
    return new Response(commerceHTML(withCamera), {status: response.status, headers});
  }
  return {
    async fetch(request, env, ctx) {
      const path = new URL(request.url).pathname;
      if (path.startsWith('/lolo-commerce/')) return commerceRoute(request);
      if (path === '/catalog.js' || path === '/commerce-client.js' || path.startsWith('/visual-index/')) return env.ASSETS.fetch(request);
      return languageFetch(request, env, ctx, page);
    }
  };
}
