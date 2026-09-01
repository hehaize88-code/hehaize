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

    const response = await env.ASSETS.fetch(request);
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

const googleAnalyticsWorker = { async fetch(request, env, ctx) { const analyticsAsset = await googleAnalyticsAsset(request); if (analyticsAsset) return analyticsAsset; return withGoogleAnalytics(await worker.fetch(request, env, ctx), request); } };

export default googleAnalyticsWorker;
