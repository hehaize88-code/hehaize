const CANONICAL_HOST = "uufindssheet.com";
const REDIRECT_HOSTS = new Set([
  "www.uufindssheet.com",
  "uufindssheet-com.pages.dev",
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (REDIRECT_HOSTS.has(url.hostname)) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      url.port = "";

      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
