const GA4_SNIPPET = "<script async src=\"/ga4-tag.js\"></script><script src=\"/ga4-init.js\"></script>";
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
  if (response.status === 200 && !headers.has("x-catalog-source")) headers.set("cache-control", "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
  const csp = headers.get("content-security-policy");
  if (csp) headers.set("content-security-policy", csp.replace("connect-src 'self'", "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com"));
  const htmlResponse = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  return new HTMLRewriter().on("head", { element(element) { element.append(GA4_SNIPPET, { html: true }); } }).transform(htmlResponse);
}

const CANONICAL_HOST = "uufindssheet.com";
const REDIRECT_HOSTS = new Set([
  "www.uufindssheet.com",
  "uufindssheet-com.pages.dev",
]);
const ROUTE_LANGUAGES = new Map([
  ["en-gb", "en-GB"],
  ["de", "de"],
  ["pl", "pl"],
  ["pt-br", "pt-BR"],
]);
const TRACK_PATH = "/__track";
const HTML_CACHE_VERSION = "2026-10-09-catalog-v3";

function htmlCacheKey(request) {
  const url = new URL(request.url);
  url.searchParams.set("__site_cache_version", HTML_CACHE_VERSION);
  return new Request(url.toString(), { method: "GET", headers: request.headers });
}

function languageForPath(pathname) {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return ROUTE_LANGUAGES.get(firstSegment) || "en";
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (REDIRECT_HOSTS.has(url.hostname)) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      url.port = "";

      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === TRACK_PATH) {
      if (request.method !== "POST") {
        return new Response(null, {
          status: 405,
          headers: { allow: "POST", "x-robots-tag": "noindex, nofollow" },
        });
      }

      const origin = request.headers.get("origin");
      if (origin && new URL(origin).hostname !== CANONICAL_HOST) {
        return new Response(null, { status: 403 });
      }

      const declaredLength = Number(request.headers.get("content-length") || 0);
      if (declaredLength > 2048) {
        return new Response(null, { status: 413 });
      }

      try {
        const payload = await request.json();
        const clean = (value, limit) =>
          typeof value === "string"
            ? value.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, limit)
            : "";
        const trackedEvent = {
          type: "uufindssheet_event",
          event: clean(payload.event, 40),
          page: clean(payload.page, 180),
          destination: clean(payload.destination, 180),
          label: clean(payload.label, 100),
          itemId: clean(payload.itemId, 40),
          category: clean(payload.category, 60),
          ctaPosition: clean(payload.ctaPosition, 60),
          language: clean(payload.language, 16),
          recordedAt: new Date().toISOString(),
        };
        console.log(JSON.stringify(trackedEvent));
      } catch {
        return new Response(null, { status: 400 });
      }

      return new Response(null, {
        status: 204,
        headers: {
          "cache-control": "no-store",
          "x-content-type-options": "nosniff",
          "x-robots-tag": "noindex, nofollow",
        },
      });
    }

    // Version the underlying document request as well as the Worker cache.
    // A previously cached document must not retain an older build's CSS links.
    const assetUrl = new URL(request.url);
    if ((request.method === "GET" || request.method === "HEAD") && !assetUrl.pathname.split('/').pop().includes('.')) {
      assetUrl.searchParams.set('__site_release', HTML_CACHE_VERSION);
    }
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    const contentType = response.headers.get("content-type") || "";

    if (request.method !== "GET" || !contentType.toLowerCase().includes("text/html")) {
      return response;
    }

    const language = languageForPath(url.pathname);
    const rawHtml = await response.text();
    const isNotFoundDocument = response.status === 200
      && rawHtml.includes("<title>404: This page could not be found.</title>")
      && rawHtml.includes('name="robots" content="noindex"');
    const html = rawHtml.replace(
      /<html\s+lang=(["'])[^"']*\1/i,
      `<html lang="${language}"`,
    );
    const headers = new Headers(response.headers);
    headers.set("content-language", language);
    headers.delete("content-length");
    headers.delete("etag");

    return new Response(html, {
      status: isNotFoundDocument ? 404 : response.status,
      statusText: isNotFoundDocument ? "Not Found" : response.statusText,
      headers,
    });
  },
};

const googleAnalyticsWorker = {
  async fetch(request, env, ctx) {
    const analyticsAsset = await googleAnalyticsAsset(request);
    if (analyticsAsset) return analyticsAsset;

    const url = new URL(request.url);
    if (url.pathname === "/sitemap.xml") return new Response('<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://uufindssheet.com/editorial-sitemap.xml</loc></sitemap><sitemap><loc>https://uufindssheet.com/catalog-sitemap.xml</loc></sitemap></sitemapindex>', {headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public, max-age=300"}});
    if (url.pathname === "/editorial-sitemap.xml") return env.ASSETS.fetch(new Request(new URL('/sitemap.xml',url.origin),request));
    if (url.pathname === "/catalog-sitemap.xml") {
      try {
        const xml=await upstream('/sitemap.xml');
        const paths=[...xml.matchAll(/<loc>https:\/\/(?:www\.)?cnbuycha\.com([^<]+)<\/loc>/g)].map(m=>m[1]).filter(p=>/^\/[a-z0-9-]+\/\d+\.html$/i.test(p) || CATEGORIES.some(c=>p==='/'+c+'/'));
        const entries=LANGS.flatMap(l=>paths.map(p=>'<url><loc>https://uufindssheet.com'+localPath(p,l)+'</loc></url>')).join('');
        return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries+'</urlset>',{headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public, max-age=600"}});
      } catch {return new Response('Sitemap temporarily unavailable',{status:503});}
    }
    const legacyLocale = url.pathname.match(/^\/(en-gb|de|pl|pt-br)(?=\/)/)?.[0] || "";
    const barePath = url.pathname.slice(legacyLocale.length);
    const legacyProducts = {"/products/skyline-floatx-running-hiking-shoes/": "/shoes/3328.html", "/products/loose-printed-hooded-sweater/": "/hoodies-sweaters/3373.html", "/products/printed-short-sleeve-collection-2/": "/t-shirts/3332.html", "/products/autumn-winter-loose-fitting-coat/": "/jackets/3402.html", "/products/hello-kitty-plush-lounge-pants/": "/pants-shorts/3337.html", "/products/mlb-world-series-baseball-cap-collection/": "/headwear/3315.html", "/products/xjxpcs-fashion-backpack/": "/accessories/3295.html", "/products/galaxy-watch-ultra-8-smartwatch/": "/electronics/3286.html"};
    if (barePath === "/products/" || barePath === "/finds/" || barePath === "/search.html") {
      const destination = new URL(legacyLocale + "/catalog/", url.origin);
      destination.search = url.search;
      if (destination.searchParams.has("keywords")) { destination.searchParams.set("q", destination.searchParams.get("keywords")); destination.searchParams.delete("keywords"); }
      destination.searchParams.delete("channelid");
      return Response.redirect(destination.href, 302);
    }
    const legacyProduct = legacyProducts[barePath];
    if (legacyProduct) return Response.redirect(url.origin + legacyLocale + "/catalog" + legacyProduct, 302);
    const catalogue = await catalogueRoute(request, env);
    if (catalogue) return withGoogleAnalytics(catalogue, request);
    const cacheKey = request.method === "GET" ? htmlCacheKey(request) : null;
    if (request.method === "GET") {
      const cached = await caches.default.match(cacheKey);
      if (cached) return cached;
    }

    const response = withGoogleAnalytics(await worker.fetch(request, env, ctx), request);
    const contentType = response.headers.get("content-type") || "";
    if (request.method === "GET" && response.status === 200 && contentType.toLowerCase().includes("text/html")) {
      ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
    }
    return response;
  },
};

export default googleAnalyticsWorker;
