# OOPBuy Tab production deployment

Repository: hehaize88-code/hehaize
Branch: main
Root directory: oopbuytab-com
Worker: oopbuytab-com
Build command: npm run build:production
Deploy command: npx wrangler deploy
Node.js: 22.22.0 (Astro requirement; .node-version and Cloudflare NODE_VERSION)

Production configuration is wrangler.jsonc. Deploying binds oopbuytab.com and www.oopbuytab.com; the Worker redirects www to the apex with the same path and query. Existing DNS/custom-domain ownership must be inspected before deployment. Do not overwrite unrelated DNS records.

The build embeds only client assets and editorial content. Product data continues to come from the CNBuyCha public site at request time. No product database is introduced.

Production robots and sitemaps are generated without source-site requests:
- https://oopbuytab.com/robots.txt
- https://oopbuytab.com/sitemap.xml
- https://oopbuytab.com/sitemap-pages.xml

The sitemap index contains 25 maps: one core map with 792 canonical URLs and 24 product maps with 3,456 URLs each (82,944 localized product URLs). Parameterized catalog/search pages and unavailable image search are excluded.

Current status: multilingual SEO production update verified on 2026-10-23.

Deployment commit: cdc43b36929d48b11e63e86cb7c987cc11ae9348
Cloudflare build: 15a3945e-39c1-4f44-b0a6-8b47033ccd77
Worker version: a72196e2-18c5-442d-9cb1-20769d90bdb1
Custom domains: oopbuytab.com and www.oopbuytab.com
Build watch paths: oopbuytab-com/**

The lockfile was regenerated with npm 10.9.2 to match Cloudflare Builds. Both clean dependency installation and production bundling pass. Do not replace it with the old extraneous esbuild lock entries.

Current live checks: all 96 new localized article pages, 24 article indexes, four updated English guides, 25 XML maps, homepage, robots and analytics script passed (153 checks). Six additional checks cover www redirect, missing routes, pagination, FAQ and product detail. Chrome verified 390px mobile layout, all-section expansion/collapse, EN-to-DE language switching and all 13 homepage images. See SEO_LIVE_VERIFICATION_2026-10-23.json. The earlier PRODUCTION_VERIFICATION.json remains the initial deployment record.

Browser Integrity Check rejects the stock Python urllib User-Agent with error 1010; a standard browser User-Agent and the user's actual Chrome both work. Security settings were preserved.
