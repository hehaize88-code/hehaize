const CANONICAL_HOST = "uufindssheet.com";
const REDIRECT_HOSTS = new Set([
  "www.uufindssheet.com",
  "uufindssheet-com.pages.dev",
]);
const ROUTE_LANGUAGES = new Map([
  ["en-gb", "en-GB"],
  ["de", "de"],
  ["pl", "pl"],
  ["pt-br", "pt-BR"],
]);

function languageForPath(pathname) {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return ROUTE_LANGUAGES.get(firstSegment) || "en";
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (REDIRECT_HOSTS.has(url.hostname)) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      url.port = "";

      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (request.method !== "GET" || !contentType.toLowerCase().includes("text/html")) {
      return response;
    }

    const language = languageForPath(url.pathname);
    const html = (await response.text()).replace(
      /<html\s+lang=(["'])[^"']*\1/i,
      `<html lang="${language}"`,
    );
    const headers = new Headers(response.headers);
    headers.set("content-language", language);
    headers.delete("content-length");
    headers.delete("etag");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;
