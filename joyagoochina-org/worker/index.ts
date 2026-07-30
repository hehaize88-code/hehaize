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
    headers.delete("content-length");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;
