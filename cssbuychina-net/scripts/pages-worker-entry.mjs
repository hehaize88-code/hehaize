import applicationWorker from "../dist/server/index.js";

const canonicalHostname = "cssbuychina.net";
const wwwHostname = `www.${canonicalHostname}`;
const staticFiles = new Set([
  "/cssbuy-logo.png",
  "/cssbuy-category-checks-article.webp",
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

function languageForPath(pathname) {
  if (pathname === "/pt-br" || pathname.startsWith("/pt-br/")) return "pt-BR";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de-DE";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  return "en";
}

async function localizeDocumentLanguage(response, pathname) {
  const language = languageForPath(pathname);
  const contentType = response.headers.get("content-type") ?? "";
  if (language === "en" || !contentType.includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  const body = (await response.text()).replace(
    /<html lang=["']en["']/i,
    `<html lang="${language}"`,
  );
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
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

    const response = await applicationWorker.fetch(request, env, ctx);
    return localizeDocumentLanguage(response, url.pathname);
  },
};

export default pagesWorker;
