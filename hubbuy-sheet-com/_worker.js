const GA_SNIPPET = "<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-QY8MM7VZV2\"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-QY8MM7VZV2');</script>";

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";
    if (request.method !== "GET" || !contentType.toLowerCase().includes("text/html")) return response;
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.delete("etag");
    const htmlResponse = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    return new HTMLRewriter().on("head", { element(element) { element.append(GA_SNIPPET, { html: true }); } }).transform(htmlResponse);
  },
};
