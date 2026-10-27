export function GET() {
  return new Response('User-agent: *\nAllow: /\n\nSitemap: https://kakobuypick.com/sitemap.xml\nSitemap: https://kakobuypick.com/sitemap-products.xml\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}
