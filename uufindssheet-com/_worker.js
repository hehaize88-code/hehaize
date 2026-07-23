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
const TRACK_PATH = "/__track";

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

    if (url.pathname === TRACK_PATH) {
      if (request.method !== "POST") {
        return new Response(null, {
          status: 405,
          headers: { allow: "POST", "x-robots-tag": "noindex, nofollow" },
        });
      }

      const origin = request.headers.get("origin");
      if (origin && new URL(origin).hostname !== CANONICAL_HOST) {
        return new Response(null, { status: 403 });
      }

      const declaredLength = Number(request.headers.get("content-length") || 0);
      if (declaredLength > 2048) {
        return new Response(null, { status: 413 });
      }

      try {
        const payload = await request.json();
        const clean = (value, limit) =>
          typeof value === "string"
            ? value.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, limit)
            : "";
        const trackedEvent = {
          type: "uufindssheet_event",
          event: clean(payload.event, 40),
          page: clean(payload.page, 180),
          destination: clean(payload.destination, 180),
          label: clean(payload.label, 100),
          recordedAt: new Date().toISOString(),
        };
        console.log(JSON.stringify(trackedEvent));
      } catch {
        return new Response(null, { status: 400 });
      }

      return new Response(null, {
        status: 204,
        headers: {
          "cache-control": "no-store",
          "x-content-type-options": "nosniff",
          "x-robots-tag": "noindex, nofollow",
        },
      });
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
