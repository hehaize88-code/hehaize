/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

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

const localizedRoutes = new Set([
  "/",
  "/products",
  "/categories",
  "/qc-guide",
  "/shipping",
  "/articles",
  "/faq",
  "/how-it-works",
]);

async function withDocumentLocale(
  response: Response,
  locale: string | undefined,
): Promise<Response> {
  const contentType = response.headers.get("content-type") || "";
  if (!locale || !contentType.includes("text/html")) {
    return response;
  }

  const body = await response.text();
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");

  return new Response(
    body.replace('<html lang="en"', `<html lang="${locale}"`),
    {
      status: response.status,
      statusText: response.statusText,
      headers,
    },
  );
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === "www.lolobuy-sheet.net") {
      url.hostname = "lolobuy-sheet.net";
      return Response.redirect(url, 301);
    }

    const legacyLocale = url.searchParams.get("lang");
    if (legacyLocale && /^(en|es|de|fr|it)$/.test(legacyLocale)) {
      url.searchParams.delete("lang");
      if (legacyLocale !== "en" && localizedRoutes.has(url.pathname)) {
        url.pathname =
          url.pathname === "/"
            ? `/${legacyLocale}/`
            : `/${legacyLocale}${url.pathname}`;
      }
      return Response.redirect(url, 301);
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

    const locale = url.pathname.match(/^\/(es|de|fr|it)(?:\/|$)/)?.[1];
    const response = await handler.fetch(request, env, ctx);
    return withDocumentLocale(response, locale);
  },
};

export default worker;
