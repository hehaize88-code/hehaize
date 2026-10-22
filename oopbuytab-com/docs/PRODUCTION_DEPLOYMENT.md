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

The sitemap contains 696 canonical URLs across 24 languages; parameterized catalog/search pages and unavailable image search are excluded.

Current status: production deployment verified on 2026-10-22.

Deployment commit: 19eea951261e4de6ac98e6f4e06b6146dce96081
Cloudflare build: cfbc90da-c5ca-49e9-8272-226eba413e06
Worker version: 4b3ce8d3-53ae-4bed-82c0-a86b75d12180
Custom domains: oopbuytab.com and www.oopbuytab.com
Build watch paths: oopbuytab-com/**

The lockfile was regenerated with npm 10.9.2 to match Cloudflare Builds. Both clean dependency installation and production bundling pass. Do not replace it with the old extraneous esbuild lock entries.

Live checks: 11 primary routes plus product detail returned HTTP 200; XML contains 696 canonical URLs; www and HTTP redirect with 301; browser pagination works; 28 FAQs and 10 articles are present. The homepage loaded all 13 images. See PRODUCTION_VERIFICATION.json.

Browser Integrity Check rejects the stock Python urllib User-Agent with error 1010; a standard browser User-Agent and the user's actual Chrome both work. Security settings were preserved.
