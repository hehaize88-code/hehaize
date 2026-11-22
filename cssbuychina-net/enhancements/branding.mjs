import {logoSvg,iconBase64} from './brand-bytes.mjs';

const logoPath = '/assets/cssbuy-official/logo.svg';
const iconPath = '/assets/cssbuy-official/icon-192.png';
const assetHeaders = { 'Cache-Control': 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff' };

export function brandAsset(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const path = new URL(request.url).pathname;
  const isLogo = path === logoPath;
  if (!isLogo && path !== iconPath && path !== '/favicon.ico') return null;
  const type = isLogo ? 'image/svg+xml' : 'image/png';
  const body = request.method === 'HEAD' ? null : isLogo ? logoSvg : Uint8Array.from(atob(iconBase64), ch => ch.charCodeAt(0));
  return new Response(body, {headers: {...assetHeaders, 'Content-Type': type}});
}

// Keep the existing localized anchor, text and href. Overlay the anchor inside the
// search box without inserting children into a React-hydrated form.
const cameraCss = `<style>
.seo-intro:has(form.seo-search) {display:grid;grid-template-columns:minmax(0,1fr) auto auto;align-content:start}
.seo-intro:has(form.seo-search)>* {grid-column:1/-1;min-width:0}
.seo-intro:has(form.seo-search)>.seo-search {grid-row:4;display:grid;grid-template-columns:subgrid;align-items:center}
.seo-search>input[type=search] {grid-column:1;grid-row:1;box-sizing:border-box}
.seo-search>button {grid-column:3;grid-row:1}
.seo-intro:has(form.seo-search)>.seo-actions {display:contents}
.seo-intro .seo-actions>a[href$="/catalog/image-search/"] {grid-column:2;grid-row:4;align-self:end;justify-self:center;position:relative;z-index:1;display:grid;place-items:center;width:40px;height:40px;margin:0 0 7px;font-size:0;overflow:hidden;color:#344963;text-decoration:none;border-radius:5px}
.seo-intro .seo-actions>a[href$="/catalog/image-search/"]::before {content:"";width:21px;height:21px;background:currentColor;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.7' stroke-linejoin='round'%3E%3Cpath d='M3 8h4l2-3h6l2 3h4v12H3z'/%3E%3Ccircle cx='12' cy='13' r='3.2'/%3E%3C/svg%3E") center/contain no-repeat}
.seo-intro .seo-actions>a:focus-visible {outline:2px solid currentColor;outline-offset:1px}
.seo-intro .seo-actions>a:not([href$="/catalog/image-search/"]) {grid-column:1/-1;justify-self:start;margin-top:10px}
@media(max-width:600px){.seo-intro .seo-actions>a[href$="/catalog/image-search/"] {height:32px;width:34px}}
</style>`;

export function brandPage(response, request) {
  if (request.method === 'HEAD' || !response.headers.get('content-type')?.includes('text/html')) return response;
  const rewriter = new HTMLRewriter()
    .on('.unified-brand img', {element(img) {
      img.setAttribute('src',logoPath); img.removeAttribute('srcset');
      img.setAttribute('width','120'); img.setAttribute('height','33');
      img.setAttribute('style','width:auto;height:auto;max-width:100%;max-height:100%;object-fit:contain');
    }})
    .on('link[rel~="icon"], link[rel="apple-touch-icon"]', {element(link) {
      link.setAttribute('href',iconPath); link.setAttribute('type','image/png'); link.setAttribute('sizes','192x192');
    }});
  if (/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/?)?$/.test(new URL(request.url).pathname)) {
    rewriter.on('head', {element(head) { head.append(cameraCss,{html:true}); }});
  }
  return rewriter.transform(response);
}
