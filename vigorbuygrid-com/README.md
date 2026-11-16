# VigorBuy Grid

Domain: https://vigorbuygrid.com
Cloudflare Worker: vigorbuygrid-com. Source folder: vigorbuygrid-com in hehaize88-code/hehaize.

Build command: npm run build
Deploy command: npx wrangler deploy
Root directory: vigorbuygrid-com

All catalogue products/prices/details load from cnbuycha.com. Real variant images are fetched from the matching public Weidian item. No product database or admin.
24 language routes. Official VigorBuy wordmark and favicon. No fabricated SKU or QC images.
Image fingerprints are a derived 2026-11-14 cnbuycha snapshot, not a live image index.
robots.txt allows indexing. sitemap.xml indexes 24 language sitemaps generated from the live cnbuycha sitemap. Source failures return 503 rather than empty or HTML sitemaps.
www and HTTP requests redirect with 308 to HTTPS non-www. Root redirects to /en/.
No GA4 tag added in this deployment.
