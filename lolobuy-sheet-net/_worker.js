import{a as i}from"./worker-chunks/chunk-KVLU3MKT.js";import"./worker-chunks/chunk-V3DKI4G4.js";var l=new Map([["3351","3307"],["3353","3401"],["3355","3321"],["3356","3402"],["3357","3286"],["3359","3328"],["3366","3354"],["3367","3355"],["3368","3412"],["3369","3413"],["3371","3353"],["3372","3359"]]);function u(t){let e=t.match(/^\/products\/(\d+)\/?$/),n=e&&l.get(e[1]);return n?`https://www.cnbuycha.com/AllProducts/${n}.html`:null}var d={element(t){let e=t.getAttribute("href");if(e)try{let n=new URL(e,"https://lolobuy-sheet.net");if(n.hostname!=="lolobuy-sheet.net"&&n.hostname!=="www.lolobuy-sheet.net")return;let o=u(n.pathname);if(o){let a=n.pathname.match(/^\/products\/(\d+)\/?$/)?.[1],r=new URL(o).pathname.match(/^\/AllProducts\/(\d+)\.html$/)?.[1];t.setAttribute("href",o),t.setAttribute("target","_blank"),t.setAttribute("rel","sponsored noopener noreferrer"),t.setAttribute("data-product-link","true"),a&&t.setAttribute("data-product-source-id",a),r&&t.setAttribute("data-product-destination-id",r)}}catch{}}},h='<script async src="/ga4-tag.js?v=20260901"></script><script src="/ga4-init.js?v=20260915-seo"></script>',w=String.raw`
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', 'G-QY8MM7VZV2', {
  site_domain: window.location.hostname,
  content_group: 'lolobuy-sheet.net'
});

document.addEventListener('click', function (event) {
  var target = event.target;
  var link = target && target.closest ? target.closest('a[href]') : null;
  if (!link) return;

  try {
    var url = new URL(link.href, window.location.href);
    if (url.hostname !== 'cnbuycha.com' && url.hostname !== 'www.cnbuycha.com') return;

    var productMatch = url.pathname.match(/^\/AllProducts\/(\d+)\.html$/);
    var eventName = productMatch ? 'product_click' : 'catalog_click';
    var parameters = {
      link_url: url.href,
      link_domain: url.hostname,
      link_text: (link.getAttribute('aria-label') || link.textContent || '').trim().slice(0, 120),
      link_location: window.location.pathname,
      site_domain: window.location.hostname,
      content_group: 'lolobuy-sheet.net',
      outbound: true,
      transport_type: 'beacon'
    };

    if (productMatch) {
      parameters.product_id = productMatch[1];
      parameters.source_product_id = link.dataset.productSourceId ||
        (window.location.pathname.match(/^\/products\/(\d+)\/?$/) || [])[1] || '';
    }

    window.gtag('event', eventName, parameters);
  } catch (error) {}
}, true);

document.addEventListener('submit', function (event) {
  var form = event.target;
  if (!form || !form.action) return;

  try {
    var url = new URL(form.action, window.location.href);
    if (url.hostname !== 'cnbuycha.com' && url.hostname !== 'www.cnbuycha.com') return;
    var data = new FormData(form);
    var searchTerm = String(data.get('q') || data.get('keywords') || '').trim();
    window.gtag('event', 'search', {
      search_term: searchTerm,
      link_url: url.href,
      link_location: window.location.pathname,
      site_domain: window.location.hostname,
      content_group: 'lolobuy-sheet.net',
      transport_type: 'beacon'
    });

    if (form.matches && form.matches('form.product-search') && searchTerm) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(
        'https://cnbuycha.com/AllProducts/?q=' + encodeURIComponent(searchTerm)
      );
    }
  } catch (error) {}
}, true);
`.trim();async function m(t){let e=new URL(t.url);if(e.pathname==="/ga4-init.js")return new Response(w,{headers:{"content-type":"application/javascript; charset=utf-8","cache-control":"public, max-age=3600"}});if(e.pathname==="/ga4-tag.js"){let n=await fetch("https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2"),o=new Headers(n.headers);return o.set("cache-control","public, max-age=3600"),o.delete("set-cookie"),new Response(n.body,{status:n.status,statusText:n.statusText,headers:o})}return null}function p(t,e){let n=t.headers.get("content-type")||"";if(e.method!=="GET"||!n.toLowerCase().includes("text/html")||typeof HTMLRewriter>"u")return t;let o=new Headers(t.headers);o.delete("content-length"),o.delete("content-encoding"),o.delete("etag");let a=o.get("content-security-policy");a&&o.set("content-security-policy",a.replace("connect-src 'self'","connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com"));let r=new Response(t.body,{status:t.status,statusText:t.statusText,headers:o});return new HTMLRewriter().on("head",{element(s){s.append(h,{html:!0})}}).on("a[href]",d).transform(r)}var g="/assets/v20260728-1/",f=new Set(["/favicon.svg","/file.svg","/globe.svg","/lolobuy.png","/window.svg"]);function y(t){return t.startsWith("/assets/")||t.startsWith("/products/")||t.startsWith("/products-320/")||t.startsWith("/products-480/")||t.startsWith("/social/")||f.has(t)}function b(t){let e=t.headers.get("content-type")||"";return e.includes("text/html")||e.includes("text/x-component")||e.includes("application/json")}async function v(t){if(!b(t))return t;let e=await t.text();if(!e.includes("/assets/"))return new Response(e,t);let n=new Headers(t.headers);return n.delete("content-length"),n.delete("content-encoding"),n.delete("etag"),new Response(e.replaceAll("/assets/",g),{status:t.status,statusText:t.statusText,headers:n})}var T={async fetch(t,e,n){let o=new URL(t.url),a=await m(t);if(a)return a;let r=u(o.pathname);if(r&&(t.method==="GET"||t.method==="HEAD"))return Response.redirect(r,302);if(y(o.pathname)&&e?.ASSETS?.fetch){let c=await e.ASSETS.fetch(t);if(c.status!==404)return c}let s=await i.fetch(t,e,n);return p(await v(s),t)}};export{T as default};
