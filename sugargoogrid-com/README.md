# Sugargoo Grid

Production: https://sugargoogrid.com
Worker: sugargoogrid-com
Source: cnbuycha.com. No database. Runtime fetches product pages and listings. Images reference source URLs. Image-search fingerprints cache 3467 source products / 13543 images from 2026-11-13. 24 languages, source USD prices and optional Frankfurter currency conversion.

Build command: npm run build
Deploy command: npx wrangler deploy
Root directory: sugargoogrid-com
Custom domains: sugargoogrid.com and www.sugargoogrid.com. Worker redirects www and HTTP to HTTPS non-www with 308.

Sitemap: /sitemap.xml and /sitemap-{language}.xml
