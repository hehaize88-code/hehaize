import type { APIRoute } from "astro";
export const GET: APIRoute = ({ site }) => {
  const origin = site!.origin;
  return new Response(
    origin.includes("chatgpt.site")
      ? "User-agent: *\nDisallow: /\n"
      : `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
