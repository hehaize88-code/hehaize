/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

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

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const browserHtmlCacheControl = "public, max-age=0";
const edgeHtmlCacheControl =
  "public, max-age=21600, stale-while-revalidate=86400";
const outboundEndpoint = "/api/outbound-click";
const maxOutboundPayloadBytes = 4096;

const noStoreHeaders = {
  "cache-control": "no-store",
  "content-type": "application/json; charset=utf-8",
};

function jsonResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: noStoreHeaders,
  });
}

function cleanText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim().slice(0, maxLength);
  return cleaned || undefined;
}

async function handleOutboundClick(
  request: Request,
  requestUrl: URL,
): Promise<Response> {
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

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return jsonResponse("Invalid analytics payload.", 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return jsonResponse("Invalid analytics payload.", 400);
  }

  const rawDestination = cleanText(body.destination, 500);
  if (!rawDestination) return jsonResponse("Missing destination.", 400);

  let destination: URL;
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

function isCacheableHtmlRequest(request: Request, url: URL): boolean {
  return (
    request.method === "GET" &&
    url.hostname === primaryHost &&
    (url.pathname === "/" || url.pathname.endsWith("/")) &&
    !url.pathname.startsWith("/api/") &&
    !url.pathname.startsWith("/_vinext/") &&
    !request.headers.has("authorization") &&
    !request.headers.has("range")
  );
}

function htmlCacheKey(url: URL): Request {
  const normalized = new URL(url.origin);
  normalized.pathname = url.pathname;
  return new Request(normalized.toString(), {
    method: "GET",
    headers: { accept: "text/html" },
  });
}

function htmlCache(): Cache | undefined {
  const cacheStorage = (
    globalThis as typeof globalThis & {
      caches?: CacheStorage & { readonly default: Cache };
    }
  ).caches;
  return cacheStorage?.default;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
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

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
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

    const routeRequest =
      url.pathname !== "/" && url.pathname.endsWith("/")
        ? new Request(
            new URL(
              `${url.pathname.slice(0, -1)}${url.search}`,
              url.origin,
            ),
            request,
          )
        : request;
    const response = await handler.fetch(routeRequest, env, ctx);
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return response;

    const firstSegment = url.pathname.split("/").filter(Boolean)[0];
    const language =
      firstSegment && localeCodes.has(firstSegment) ? firstSegment : "en";
    const html = (await response.text()).replace(
      /<html\b([^>]*?)\blang=(["'])[^"']*\2([^>]*)>/i,
      `<html$1lang="${language}"$3>`,
    );
    const headers = new Headers(response.headers);
    headers.set("content-language", language);
    headers.set("x-content-type-options", "nosniff");
    headers.set("referrer-policy", "strict-origin-when-cross-origin");
    headers.delete("content-length");

    const shouldStore =
      Boolean(cacheKey && edgeCache) &&
      response.status === 200 &&
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

    const finalResponse = new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });

    if (shouldStore && cacheKey && edgeCache) {
      ctx.waitUntil(
        edgeCache.put(cacheKey, finalResponse.clone()).catch((error: unknown) => {
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
