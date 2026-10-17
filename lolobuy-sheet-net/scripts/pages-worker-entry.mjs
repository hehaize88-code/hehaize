import {catalogueRoute, upstream, CATEGORIES, LANGS, localPath} from "../commerce/catalog.mjs";
import {
  withSearchSafeNotFound,
  withSecurityHeaders,
} from "../worker/security-headers.ts";

let applicationWorkerPromise;

function loadApplicationWorker() {
  applicationWorkerPromise ??= import("../dist/server/index.js").then(
    (module) => module.default,
  );
  return applicationWorkerPromise;
}

const legacyProducts = {"3351": "/headwear/3307.html", "3353": "/t-shirts/3401.html", "3355": "/shoes/3321.html", "3356": "/jackets/3402.html", "3357": "/electronics/3286.html", "3359": "/shoes/3328.html", "3366": "/shoes/3354.html", "3367": "/shoes/3355.html", "3368": "/hoodies-sweaters/3412.html", "3369": "/hoodies-sweaters/3413.html", "3371": "/headwear/3353.html", "3372": "/accessories/3359.html"};
function productDestination(pathname){const match=pathname.match(/^\/(?:(es|de|fr|it)\/)?products\/(\d+)\/?$/);return match&&legacyProducts[match[2]]?localPath(legacyProducts[match[2]],match[1]||'en'):null;}

const HEAD_SNIPPET = '<script async src="/ga4-tag.js"></script><script src="/ga4-init.js"></script><script src="/commerce-events.js?v=20261017" defer></script>';

async function googleAnalyticsAsset(request) {
  const url = new URL(request.url);
  if (url.pathname === "/ga4-init.js") {
    return new Response(
      "window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config','G-QY8MM7VZV2');",
      {
        headers: {
          "content-type": "application/javascript; charset=utf-8",
          "cache-control": "public, max-age=3600",
        },
      },
    );
  }
  if (url.pathname === "/ga4-tag.js") {
    const upstream = await fetch(
      "https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2",
    );
    const headers = new Headers(upstream.headers);
    headers.set("cache-control", "public, max-age=3600");
    headers.delete("set-cookie");
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  }
  return null;
}

function withGoogleAnalytics(response, request) {
  const contentType = response.headers.get("content-type") || "";
  if (
    request.method !== "GET" ||
    !contentType.toLowerCase().includes("text/html") ||
    typeof HTMLRewriter === "undefined"
  ) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");
  const csp = headers.get("content-security-policy");
  if (csp) {
    headers.set(
      "content-security-policy",
      csp.replace(
        "connect-src 'self'",
        "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      ),
    );
  }

  const htmlResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
  return new HTMLRewriter()
    .on("head", {
      element(element) {
        element.append(HEAD_SNIPPET, { html: true });
      },
    })
    .transform(htmlResponse);
}

const versionedAssetsPrefix = `/assets/${PAGES_ASSET_VERSION}/`;

const staticFiles = new Set([
  "/favicon.svg",
  "/lolobuy-official.svg",
  "/lolobuy-icon.png",
  "/catalog.css",
  "/catalog.js",
  "/mobile-inner.css",
  "/mobile-catalog.js",
  "/site-shell.css",
  "/catalog-image-index.json",
  "/commerce-events.js",
  "/file.svg",
  "/globe.svg",
  "/lolobuy-logo.png",
  "/window.svg",
]);

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/articles/") ||
    pathname.startsWith("/product-finds/") ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/products-320/") ||
    pathname.startsWith("/products-480/") ||
    pathname.startsWith("/social/") ||
    staticFiles.has(pathname)
  );
}

function shouldVersionAssetReferences(response) {
  const contentType = response.headers.get("content-type") || "";
  return (
    contentType.includes("text/html") ||
    contentType.includes("text/x-component") ||
    contentType.includes("application/json")
  );
}

async function versionAssetReferences(response) {
  if (!shouldVersionAssetReferences(response)) {
    return response;
  }

  const body = await response.text();
  if (!body.includes("/assets/")) {
    return new Response(body, response);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");

  return new Response(body.replaceAll("/assets/", versionedAssetsPrefix), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function cacheableHtmlRequest(request, url) {
  return (
    request.method === "GET" &&
    url.search === "" &&
    (request.headers.get("accept") || "").includes("text/html") &&
    !url.pathname.startsWith("/signin-with-chatgpt") &&
    !url.pathname.startsWith("/callback")
  );
}

function pageCacheKey(request) {
  const url = new URL(request.url);
  url.searchParams.set("__lolobuy_build", PAGES_ASSET_VERSION);
  return new Request(url, { headers: { accept: "text/html" } });
}

function withPageCacheHeaders(response, status) {
  const headers = new Headers(response.headers);
  headers.set(
    "cache-control",
    "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
  );
  headers.set("x-lolobuy-edge-cache", status);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (!['GET','HEAD'].includes(request.method)) return new Response(null,{status:405,headers:{allow:'GET, HEAD'}});
    if(url.hostname==="www.lolobuy-sheet.net"){url.hostname="lolobuy-sheet.net";return Response.redirect(url,301)}
    const analyticsAsset = await googleAnalyticsAsset(request);
    if (analyticsAsset) {
      return analyticsAsset;
    }

    if (url.hostname === "www.lolobuy-sheet.net") {
      const destination = new URL(url);
      destination.protocol = "https:";
      destination.hostname = "lolobuy-sheet.net";
      return withSecurityHeaders(Response.redirect(destination, 301));
    }

    const lang=url.pathname.match(/^\/(es|de|fr|it)(?=\/|$)/)?.[1]||'en';
    const prefix=lang==='en'?'':'/'+lang;
    const bare=url.pathname.slice(prefix.length).replace(/\/$/,'')||'/';
    const category=bare.match(/^\/categories\/(shoes|hoodies|jackets|accessories)$/)?.[1];
    if(category)return Response.redirect(url.origin+prefix+'/catalog/'+(category==='hoodies'?'hoodies-sweaters':category)+'/'+url.search,301);
    if(['/products','/finds','/spreadsheet','/AllProducts','/search.html'].includes(bare)){
      const target=new URL(prefix+'/catalog/',url.origin);target.search=url.search;
      if(target.searchParams.has('keywords')) {target.searchParams.set('q',target.searchParams.get('keywords'));target.searchParams.delete('keywords');target.searchParams.delete('channelid')}
      return Response.redirect(target.href,301);
    }
    if(url.pathname==='/sitemap.xml')return new Response('<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://lolobuy-sheet.net/editorial-sitemap.xml</loc></sitemap><sitemap><loc>https://lolobuy-sheet.net/catalog-sitemap.xml</loc></sitemap></sitemapindex>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=300'}});
    if(url.pathname==='/editorial-sitemap.xml'){
      const app=await loadApplicationWorker();
      return app.fetch(new Request(new URL('/sitemap.xml',url),request),env,ctx);
    }
    if(url.pathname==='/catalog-sitemap.xml'){
      try {
        const xml=await upstream('/sitemap.xml');
        const paths=[...new Set([...xml.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p)||CATEGORIES.some(c=>p==='/'+c+'/')))];
        if(!paths.length)throw Error('Empty source sitemap');
        const entries=LANGS.flatMap(l=>paths.map(p=>'<url><loc>https://lolobuy-sheet.net'+localPath(p,l)+'</loc></url>')).join('');
        return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries+'</urlset>',{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=300'}});
      }catch{return new Response('Catalogue temporarily unavailable',{status:503,headers:{'retry-after':'60'}})}
    }
    const catalog=await catalogueRoute(request,env);
    if(catalog){const secured=withSecurityHeaders(catalog);return request.method==='HEAD'?new Response(null,{status:secured.status,headers:secured.headers}):secured;}

    const destination = productDestination(url.pathname);
    if (
      destination &&
      (request.method === "GET" || request.method === "HEAD")
    ) {
      return withSecurityHeaders(Response.redirect(new URL(destination,url.origin).href, 301));
    }

    if (isStaticAsset(url.pathname) && env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return withSecurityHeaders(assetResponse);
      }
    }

    const canCache = cacheableHtmlRequest(request, url);
    const cache = canCache && typeof caches !== "undefined" ? caches.default : null;
    const cacheKey = cache ? pageCacheKey(request) : null;
    if (cache && cacheKey) {
      const cached = await cache.match(cacheKey);
      if (cached) return withPageCacheHeaders(cached, "HIT");
    }

    const applicationWorker = await loadApplicationWorker();
    const response = await applicationWorker.fetch(request, env, ctx);
    const versionedResponse = await versionAssetReferences(response);
    let finalResponse = withGoogleAnalytics(
      withSecurityHeaders(await withSearchSafeNotFound(versionedResponse)),
      request,
    );

    if (cache && cacheKey && finalResponse.status === 200) {
      finalResponse = withPageCacheHeaders(finalResponse, "MISS");
      ctx?.waitUntil?.(cache.put(cacheKey, finalResponse.clone()));
    }

    finalResponse.headers.set("x-lolobuy-release","20261017-net-seo-v2");
    return request.method==="HEAD" ? new Response(null,{status:finalResponse.status,headers:finalResponse.headers}) : finalResponse;
  },
};
