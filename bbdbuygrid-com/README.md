# BBDBuy Grid

Production domain: https://bbdbuygrid.com

Catalog and gallery photos load from cnbuycha.com. Weidian supplies SKU styles by matching item ID. No database or admin backend.

Build: npm run build
Deploy: npx wrangler deploy

Cloudflare build root: bbdbuygrid-com
Production redirects HTTP and www to HTTPS non-www. 24 language paths. XML sitemap: /sitemap.xml
