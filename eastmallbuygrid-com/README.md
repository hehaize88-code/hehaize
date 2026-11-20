# EastMallBuy Grid

Production: https://eastmallbuygrid.com
Source catalog: https://cnbuycha.com. No database.

Build: `npm run build`. Deploy: `npx wrangler deploy`. Cloudflare Git build root: `eastmallbuygrid-com`.

24 locales; XML sitemap index `/sitemap.xml` and locale sitemaps. Official EastMallBuy logo and favicon preserved. Image index covers 3477 products and 18278 images as of 2026-11-16; seller images remain partially covered. Upload matching stays in the browser. Bundled image fingerprints are derived cache, not raw product photography.

Bind apex and www custom domains. www and HTTP redirect to HTTPS apex. Preserve existing Google/Bing verification DNS records.
