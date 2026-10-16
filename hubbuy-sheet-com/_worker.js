import { catalogueRoute } from './commerce/catalog.mjs';
const LEGACY_PRODUCTS = /*LEGACY_PRODUCTS*/ {};
const GA4_SNIPPET = "<script async src=\"/ga4-tag.js\"></script><script src=\"/ga4-init.js\"></script>";
const MOBILE_READING_SCRIPT = '<script defer src="/mobile-reading.js?v=20261016-compact-v2"></script>';
const MOBILE_INNER_STYLE = '<link rel="stylesheet" href="/mobile-inner.css?v=20261016-compact-v2">';
async function googleAnalyticsAsset(request) {
  const url = new URL(request.url);
  if (url.pathname === "/ga4-init.js") return new Response("window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-QY8MM7VZV2');", { headers: { "content-type": "application/javascript; charset=utf-8", "cache-control": "public, max-age=3600" } });
  if (url.pathname === "/ga4-tag.js") {
    const upstream = await fetch("https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2");
    const headers = new Headers(upstream.headers);
    headers.set("cache-control", "public, max-age=3600");
    headers.delete("set-cookie");
    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers });
  }
  return null;
}
function withGoogleAnalytics(response, request) {
  const contentType = response.headers.get("content-type") || "";
  if (request.method !== "GET" || !contentType.toLowerCase().includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length"); headers.delete("content-encoding"); headers.delete("etag");
  const csp = headers.get("content-security-policy");
  if (csp) headers.set("content-security-policy", csp.replace("connect-src 'self'", "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com"));
  const htmlResponse = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  return new HTMLRewriter().on("head", { element(element) { element.append(GA4_SNIPPET + MOBILE_INNER_STYLE + MOBILE_READING_SCRIPT + '<script defer src="/assets/catalog.js?v=20261016-images-v1"></script>', { html: true }); } }).transform(htmlResponse);
}


export default {
  async fetch(request, env) {
    const analyticsAsset = await googleAnalyticsAsset(request);
    if (analyticsAsset) return analyticsAsset;
    const url = new URL(request.url);
    const legacy = url.pathname.match(/^\/(?:(pt-br|de)\/)?products(?:\/(\d+))?\/?$/);
    if (legacy) {
      const prefix = legacy[1] ? '/' + legacy[1] : '';
      const destination = legacy[2] ? LEGACY_PRODUCTS[legacy[2]] : '/catalog/';
      if (destination) return Response.redirect(url.origin + prefix + destination + (destination.includes('?') ? '' : url.search), 301);
    }
    const catalog = await catalogueRoute(request, env);
    if (catalog) {
      const response = withGoogleAnalytics(catalog, request);
      return request.method === 'HEAD' ? new Response(null, { status: response.status, headers: response.headers }) : response;
    }
    const response = await env.ASSETS.fetch(request);
    return withGoogleAnalytics(response, request);
  },
};
