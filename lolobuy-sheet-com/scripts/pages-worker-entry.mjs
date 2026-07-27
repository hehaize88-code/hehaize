import applicationWorker from "../dist/server/index.js";

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
    pathname.startsWith("/products/") ||
    staticFiles.has(pathname)
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (isStaticAsset(url.pathname) && env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    return applicationWorker.fetch(request, env, ctx);
  },
};
