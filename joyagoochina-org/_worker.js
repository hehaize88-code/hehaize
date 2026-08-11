const primaryHost = "joyagoochina.org";
const localeCodes = new Set([
  "en",
  "zh",
  "de",
  "pl",
  "es",
  "it",
  "fr",
  "pt",
  "ro",
  "sv",
]);
const browserHtmlCacheControl = "public, max-age=0";
const edgeHtmlCacheControl =
  "public, max-age=21600, stale-while-revalidate=86400";
const outboundEndpoint = "/api/outbound-click";
const maxOutboundPayloadBytes = 4096;

const jsonResponse = (message, status) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });

const cleanText = (value, maxLength) => {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim().slice(0, maxLength);
  return cleaned || undefined;
};

async function handleOutboundClick(request, requestUrl) {
  if (request.method !== "POST") {
    return new Response(null, {
      status: 405,
      headers: { allow: "POST", "cache-control": "no-store" },
    });
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== requestUrl.origin) {
        return jsonResponse("Cross-origin analytics requests are not accepted.", 403);
      }
    } catch {
      return jsonResponse("Invalid request origin.", 403);
    }
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > maxOutboundPayloadBytes) {
    return jsonResponse("Analytics payload is too large.", 413);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxOutboundPayloadBytes) {
    return jsonResponse("Analytics payload is too large.", 413);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse("Invalid analytics payload.", 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse("Invalid analytics payload.", 400);
  }

  const rawDestination = cleanText(body.destination, 500);
  if (!rawDestination) return jsonResponse("Missing destination.", 400);

  let destination;
  try {
    destination = new URL(rawDestination);
  } catch {
    return jsonResponse("Invalid destination.", 400);
  }
  if (!new Set(["cnbuycha.com", "www.cnbuycha.com"]).has(destination.hostname)) {
    return jsonResponse("Destination is not the linked product store.", 400);
  }

  const sourcePage = cleanText(body.source_page, 300);
  const language = cleanText(body.language, 12);
  const productId = cleanText(body.product_id, 32);
  const category = cleanText(body.category, 80);
  const linkKind = cleanText(body.link_kind, 40) ?? "link";

  console.log(
    JSON.stringify({
      type: "joyagoo_outbound_click",
      destination: `${destination.origin}${destination.pathname}`,
      source_page: sourcePage?.startsWith("/") ? sourcePage : "/",
      language: language && localeCodes.has(language) ? language : "en",
      link_kind: linkKind,
      ...(productId ? { product_id: productId } : {}),
      ...(category ? { category } : {}),
    }),
  );

  return new Response(null, {
    status: 204,
    headers: { "cache-control": "no-store" },
  });
}

const isCacheableHtmlRequest = (request, url) =>
  request.method === "GET" &&
  url.hostname === primaryHost &&
  (url.pathname === "/" || url.pathname.endsWith("/")) &&
  !url.pathname.startsWith("/api/") &&
  !request.headers.has("authorization") &&
  !request.headers.has("range");

const htmlCacheKey = (url) => {
  const normalized = new URL(url.origin);
  normalized.pathname = url.pathname;
  return new Request(normalized.toString(), {
    method: "GET",
    headers: { accept: "text/html" },
  });
};

const htmlCache = () => globalThis.caches?.default;
const notFoundHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,follow">
    <title>Page Not Found | Joyagoo China</title>
    <style>
      :root{font-family:Arial,sans-serif;color:#06101f;background:#f5efe5}
      *{box-sizing:border-box}body{min-height:100vh;margin:0;display:grid;place-items:center;padding:2rem}
      main{width:min(760px,100%);text-align:center}small{color:#d64a17;font-weight:800;letter-spacing:.13em}
      h1{margin:1rem 0;font-family:Georgia,serif;font-size:clamp(3rem,10vw,7rem);line-height:.92;letter-spacing:-.06em}
      p{color:#59616d;line-height:1.7}nav{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;margin-top:2rem}
      a{padding:.85rem 1rem;border:1px solid #06101f;border-radius:7px;color:#06101f;font-size:.78rem;font-weight:800;text-decoration:none;text-transform:uppercase}
      a:first-child{background:#06101f;color:#fff}
    </style>
  </head>
  <body>
    <main>
      <small>404 · PAGE NOT FOUND</small>
      <h1>This page does not exist.</h1>
      <p>The address may be mistyped or the page may have moved. Continue with a real product, guide, article or answer.</p>
      <nav aria-label="Helpful destinations">
        <a href="/">Home</a><a href="/spreadsheet/">Products</a><a href="/articles/">Articles</a><a href="/faq/">FAQ</a>
      </nav>
    </main>
  </body>
</html>`;

const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.hostname === `www.${primaryHost}`) {
      url.hostname = primaryHost;
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/sitemap-main.xml") {
      return Response.redirect(`https://${primaryHost}/sitemap.xml`, 301);
    }

    if (url.pathname === outboundEndpoint) {
      return handleOutboundClick(request, url);
    }

    const cacheableHtml = isCacheableHtmlRequest(request, url);
    const cacheKey = cacheableHtml ? htmlCacheKey(url) : undefined;
    const edgeCache = cacheKey ? htmlCache() : undefined;
    if (cacheKey && edgeCache) {
      try {
        const cached = await edgeCache.match(cacheKey);
        if (cached) return cached;
      } catch (error) {
        console.error(
          JSON.stringify({
            type: "joyagoo_html_cache_match_error",
            path: url.pathname,
            message: error instanceof Error ? error.message : String(error),
          }),
        );
      }
    }

    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && request.method === "GET") {
      response = new Response(notFoundHtml, {
        status: 404,
        statusText: "Not Found",
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    const firstSegment = url.pathname.split("/").filter(Boolean)[0];
    const language =
      firstSegment && localeCodes.has(firstSegment) ? firstSegment : "en";
    const headers = new Headers(response.headers);
    headers.set("x-content-type-options", "nosniff");
    headers.set("referrer-policy", "strict-origin-when-cross-origin");
    if ((headers.get("content-type") ?? "").includes("text/html")) {
      headers.set("content-language", language);
    }

    const shouldStore =
      Boolean(cacheKey && edgeCache) &&
      response.status === 200 &&
      (headers.get("content-type") ?? "").includes("text/html") &&
      !headers.has("set-cookie");
    if (shouldStore) {
      headers.set("cache-control", browserHtmlCacheControl);
      headers.set("cloudflare-cdn-cache-control", edgeHtmlCacheControl);
      headers.set("cache-tag", "joyagoo-html");
    } else if (response.status >= 400) {
      headers.set("cache-control", "no-store");
      headers.delete("cloudflare-cdn-cache-control");
      headers.delete("cache-tag");
    }

    const finalResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });

    if (shouldStore && cacheKey && edgeCache && ctx?.waitUntil) {
      ctx.waitUntil(
        edgeCache.put(cacheKey, finalResponse.clone()).catch((error) => {
          console.error(
            JSON.stringify({
              type: "joyagoo_html_cache_put_error",
              path: url.pathname,
              message: error instanceof Error ? error.message : String(error),
            }),
          );
        }),
      );
    }

    return finalResponse;
  },
};

export default worker;
