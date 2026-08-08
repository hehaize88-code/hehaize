import applicationWorker from "../dist/server/index.js";

const canonicalHostname = "cssbuychina.net";
const wwwHostname = `www.${canonicalHostname}`;
const staticFiles = new Set([
  "/cssbuy-logo.png",
  "/favicon.svg",
  "/file.svg",
  "/globe.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/window.svg",
]);

function isStaticAsset(pathname) {
  return pathname.startsWith("/assets/") || staticFiles.has(pathname);
}

const pagesWorker = {
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

    return applicationWorker.fetch(request, env, ctx);
  },
};

export default pagesWorker;
