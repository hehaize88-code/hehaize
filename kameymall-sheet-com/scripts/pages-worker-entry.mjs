import applicationWorker from "../dist/server/index.js";

const versionedAssetsPrefix = `/assets/${PAGES_ASSET_VERSION}/`;
const canonicalHostname = "kameymall-sheet.com";
const wwwHostname = `www.${canonicalHostname}`;

const staticFiles = new Set([
  "/favicon.svg",
  "/file.svg",
  "/globe.svg",
  "/kameymall-logo.png",
  "/window.svg",
]);

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/assets/") ||
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

    if (url.hostname === wwwHostname) {
      url.protocol = "https:";
      url.hostname = canonicalHostname;
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    if (isStaticAsset(url.pathname) && env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    const response = await applicationWorker.fetch(request, env, ctx);
    return versionAssetReferences(response);
  },
};
