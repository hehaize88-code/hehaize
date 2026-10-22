# OOPBuy Tab production deployment

Repository: hehaize88-code/hehaize
Branch: oopbuytab-production
Root directory: oopbuytab-com
Worker: oopbuytab-com
Build command: npm run build:production
Deploy command: npx wrangler deploy
Node.js: >=22.22.0 (Astro requirement)

Production configuration is wrangler.jsonc. Deploying binds oopbuytab.com and www.oopbuytab.com; the Worker redirects www to the apex with the same path and query. Existing DNS/custom-domain ownership must be inspected before deployment. Do not overwrite unrelated DNS records.

The build embeds only client assets and editorial content. Product data continues to come from the CNBuyCha public site at request time. No product database is introduced.

Production robots and sitemaps are generated without source-site requests:
- https://oopbuytab.com/robots.txt
- https://oopbuytab.com/sitemap.xml
- https://oopbuytab.com/sitemap-pages.xml

The sitemap contains 696 canonical URLs across 24 languages; parameterized catalog/search pages and unavailable image search are excluded.

Current status: production package verified locally; Cloudflare publication and domain verification pending.
