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
const notFoundHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,follow">
    <title>Page Not Found | Joyagoo China</title>
    <style>
      :root{font-family:Arial,sans-serif;color:#06101f;background:#f5efe5}
      *{box-sizing:border-box}body{min-height:100vh;margin:0;display:grid;place-items:center;padding:2rem}
      main{width:min(760px,100%);text-align:center}small{color:#d64a17;font-weight:800;letter-spacing:.13em}
      h1{margin:1rem 0;font-family:Georgia,serif;font-size:clamp(3rem,10vw,7rem);line-height:.92;letter-spacing:-.06em}
      p{color:#59616d;line-height:1.7}nav{display:flex;flex-wrap:wrap;justify-content:center;gap:.7rem;margin-top:2rem}
      a{padding:.85rem 1rem;border:1px solid #06101f;border-radius:7px;color:#06101f;font-size:.78rem;font-weight:800;text-decoration:none;text-transform:uppercase}
      a:first-child{background:#06101f;color:#fff}
    </style>
  </head>
  <body>
    <main>
      <small>404 · PAGE NOT FOUND</small>
      <h1>This page does not exist.</h1>
      <p>The address may be mistyped or the page may have moved. Continue with a real product, guide, article or answer.</p>
      <nav aria-label="Helpful destinations">
        <a href="/">Home</a><a href="/spreadsheet/">Products</a><a href="/articles/">Articles</a><a href="/faq/">FAQ</a>
      </nav>
    </main>
  </body>
</html>`;

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
      response = new Response(notFoundHtml, {
        status: 404,
        statusText: "Not Found",
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
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
