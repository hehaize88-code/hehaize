import { createApp } from "astro/app/entrypoint";
const app = createApp();
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (
      url.hostname === "www.lovegobuytab.com" ||
      (url.hostname === "lovegobuytab.com" && url.protocol !== "https:")
    ) {
      url.hostname = "lovegobuytab.com";
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.href, 301);
    }
    const response = await app.render(request, {
      locals: {},
      waitUntil: ctx?.waitUntil?.bind(ctx),
    });
    if (url.hostname !== "lovegobuytab.com") {
      response.headers.set("X-Robots-Tag", "noindex, follow");
    }
    return response;
  },
};
