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

const localizedPathSegments = new Set(["de", "fr", "es", "it", "pl"]);

function documentLanguage(pathname: string): string {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return firstSegment && localizedPathSegments.has(firstSegment)
    ? firstSegment
    : "en";
}

async function localizeDocumentLanguage(
  response: Response,
  pathname: string,
): Promise<Response> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/html")) {
    return response;
  }

  const locale = documentLanguage(pathname);
  const html = await response.text();
  const htmlTag = /<html\b([^>]*?)\blang=(["'])[^"']*\2([^>]*)>/i;
  const localizedHtml = htmlTag.test(html)
    ? html.replace(htmlTag, `<html$1lang="${locale}"$3>`)
    : html.replace(/<html\b([^>]*)>/i, `<html lang="${locale}"$1>`);
  const headers = new Headers(response.headers);

  headers.set("content-language", locale);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");

  return new Response(localizedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

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

    const response = await handler.fetch(request, env, ctx);
    return localizeDocumentLanguage(response, url.pathname);
  },
};

export default worker;
