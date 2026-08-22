const GA4_SNIPPET = "<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2\"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-QY8MM7VZV2');</script>";
function withGoogleAnalytics(response, request) {
  const contentType = response.headers.get("content-type") || "";
  if (request.method !== "GET" || !contentType.toLowerCase().includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length"); headers.delete("content-encoding"); headers.delete("etag");
  const csp = headers.get("content-security-policy");
  if (csp) headers.set("content-security-policy", csp.replace("connect-src 'self'", "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com").replace("script-src 'self'", "script-src 'self' https://www.googletagmanager.com"));
  const htmlResponse = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  return new HTMLRewriter().on("head", { element(element) { element.append(GA4_SNIPPET, { html: true }); } }).transform(htmlResponse);
}

import{a as c}from"./worker-chunks/chunk-MVRD3HRU.js";import"./worker-chunks/chunk-V3DKI4G4.js";var r="/assets/v20260728-1/",a=new Set(["/favicon.svg","/file.svg","/globe.svg","/lolobuy.png","/window.svg"]);function u(t){return t.startsWith("/assets/")||t.startsWith("/products/")||t.startsWith("/products-320/")||t.startsWith("/products-480/")||t.startsWith("/social/")||a.has(t)}function l(t){let s=t.headers.get("content-type")||"";return s.includes("text/html")||s.includes("text/x-component")||s.includes("application/json")}async function d(t){if(!l(t))return t;let s=await t.text();if(!s.includes("/assets/"))return new Response(s,t);let e=new Headers(t.headers);return e.delete("content-length"),e.delete("content-encoding"),e.delete("etag"),new Response(s.replaceAll("/assets/",r),{status:t.status,statusText:t.statusText,headers:e})}var S={async fetch(t,s,e){let i=new URL(t.url);if(u(i.pathname)&&s?.ASSETS?.fetch){let n=await s.ASSETS.fetch(t);if(n.status!==404)return n}let o=await c.fetch(t,s,e);return d(o)}};var googleAnalyticsBaseWorker=S;var googleAnalyticsWorker={async fetch(request,env,ctx){return withGoogleAnalytics(await googleAnalyticsBaseWorker.fetch(request,env,ctx),request)}};export{googleAnalyticsWorker as default};
