export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.pikobuy-sheet.net") {
      url.hostname = "pikobuy-sheet.net";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === "/sitemap-main.xml") {
      url.pathname = "/sitemap.xml";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
