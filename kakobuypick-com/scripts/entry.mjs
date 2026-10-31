import { createApp } from 'astro/app/entrypoint';
const app = createApp();
export default { async fetch(request, env, ctx) {
  const url = new URL(request.url);
  if (url.hostname === 'www.kakobuypick.com' || (url.hostname === 'kakobuypick.com' && url.protocol === 'http:')) {
    url.hostname = 'kakobuypick.com';
    url.protocol = 'https:';
    return Response.redirect(url.href, 308);
  }
  return app.render(request, { locals: {}, waitUntil: ctx?.waitUntil?.bind(ctx) });
}};
