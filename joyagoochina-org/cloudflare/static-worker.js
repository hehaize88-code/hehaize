const primaryHost = "joyagoochina.org";
const localeCodes = new Set([
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

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === `www.${primaryHost}`) {
      url.hostname = primaryHost;
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/sitemap-main.xml") {
      return Response.redirect(`https://${primaryHost}/sitemap.xml`, 301);
    }

    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && request.method === "GET") {
      const notFound = await env.ASSETS.fetch(
        new Request(new URL("/404.html", request.url), request),
      );
      response = new Response(notFound.body, {
        status: 404,
        statusText: "Not Found",
        headers: notFound.headers,
      });
    }

    const firstSegment = url.pathname.split("/").filter(Boolean)[0];
    const language =
      firstSegment && localeCodes.has(firstSegment) ? firstSegment : "en";
    const headers = new Headers(response.headers);
    headers.set("x-content-type-options", "nosniff");
    headers.set("referrer-policy", "strict-origin-when-cross-origin");
    if ((headers.get("content-type") ?? "").includes("text/html")) {
      headers.set("content-language", language);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;
