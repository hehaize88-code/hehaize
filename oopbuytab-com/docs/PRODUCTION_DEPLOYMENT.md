# OOPBuy Tab production deployment

Repository: hehaize88-code/hehaize
Branch: main
Root directory: oopbuytab-com
Worker: oopbuytab-com
Build command: npm run build:production
Deploy command: npx wrangler deploy
Node.js: 22.22.0
Build watch paths: oopbuytab-com/**
Custom domains: oopbuytab.com and www.oopbuytab.com

## 2026-11-09 release

The updated source contains 20 articles in each of 24 locales (480 article pages), a core sitemap with 936 URLs and 24 product maps with 3,457 URLs each. The complete local production gate passed; see SEO_LOCAL_VERIFICATION_2026-11-09.json and SEO_RELEASE_2026-11-09.md. It uses the existing integration and configuration above. Check the release commit's `Workers Builds: oopbuytab-com` result and live content for publication status.

## Historical verified deployment — 2026-11-02

The following record describes the previous release.

Production source commit: c7e6d1c88a208475a5feaf5b5332399c4c7999f6
Cloudflare build: 03e6af04-14ac-44bb-ae9d-6f50e6e943bc
GitHub Workers Builds result: success, completed 2026-11-02T02:54:18Z.

Production configuration is wrangler.jsonc. The Worker redirects www to the apex with the same path and query. Existing DNS, domain ownership, source data and security configuration were preserved. This release used the existing GitHub integration; no new Cloudflare authorization was required.

The build embeds client assets and editorial content. Product data continues to come from the CNBuyCha public site at request time. No product database is introduced. Images retain the source-returned URLs.

Production robots and sitemaps are generated without source-site requests:
- https://oopbuytab.com/robots.txt
- https://oopbuytab.com/sitemap.xml
- https://oopbuytab.com/sitemap-pages.xml

The sitemap index contains 25 maps: one core map with 864 canonical URLs and 24 product maps with 3,456 URLs each (82,944 localized product URLs). Parameterized catalog/search pages and unavailable image search are excluded. There are 17 complete articles in each of 24 languages, 408 article pages total.

The full local production gate passed, including 408 article renders, 24 article indexes, all sitemap maps, numeric/source/table parity, canonical/hreflang/schema, analytics, redirects, missing routes and source-outage behavior. Worker size: 7,909,298 bytes; gzip: 1,920,571 bytes. See SEO_LOCAL_VERIFICATION_2026-11-02.json.

Live HTTP verification passed all 226 checks: all 168 new/revised article URLs, 24 article indexes, the sitemap index and all 25 maps, homepage, robots, analytics, www redirect, and jacket/jersey category and product samples. Chrome verified English-to-German article switching, localized category navigation, 20 jacket product cards and loaded sample images. Mobile preview QA covered 390px English, German and Maltese layouts, section expansion/collapse and keyboard-scrolling tables. See SEO_LIVE_VERIFICATION_2026-11-02.json.

Keep the existing npm 10-compatible lockfile. It was not changed in this release. Previous deployment records remain in SEO_RELEASE_2026-10-23.md and PROJECT_MEMORY.md. Successful publication is not a claim of increased clicks or search-engine indexing.
