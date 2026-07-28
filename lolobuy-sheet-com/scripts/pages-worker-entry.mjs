import applicationWorker from "../dist/server/index.js";
import {
  withSearchSafeNotFound,
  withSecurityHeaders,
} from "../worker/security-headers.ts";

const versionedAssetsPrefix = `/assets/${PAGES_ASSET_VERSION}/`;

const staticFiles = new Set([
  "/favicon.svg",
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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.hostname === "www.lolobuy-sheet.com") {
      const destination = new URL(url);
      destination.protocol = "https:";
      destination.hostname = "lolobuy-sheet.com";
      return withSecurityHeaders(Response.redirect(destination, 301));
    }

    if (isStaticAsset(url.pathname) && env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return withSecurityHeaders(assetResponse);
      }
    }

    const response = await applicationWorker.fetch(request, env, ctx);
    const versionedResponse = await versionAssetReferences(response);
    return withSecurityHeaders(
      await withSearchSafeNotFound(versionedResponse),
    );
  },
};
