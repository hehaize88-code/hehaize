import type { APIRoute } from "astro";
export const GET: APIRoute = ({ site, url }) => {
  const origin = site!.origin;
  return new Response(
    !["lovegobuytab.com", "www.lovegobuytab.com"].includes(url.hostname)
      ? "User-agent: *\nDisallow: /\n"
      : `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
