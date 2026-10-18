# SugargooTab project memory

Updated: 2026-10-18 (Asia/Shanghai)
Status: Production deployed successfully; GitHub integration and both custom domains verified.

## Live deployment
- Canonical website: https://sugargootab.com/
- Alias: https://www.sugargootab.com/ permanently redirects (308) to the apex, preserving path and query.
- Source: https://github.com/hehaize88-code/hehaize/tree/main/sugargootab-com
- Branch: main. One domain per top-level folder; do not edit other domain projects.
- Initial source commit: 3a0f3357f3b90f80d5474ecb74cde1712f4b7a4e.
- Deployed application commit: 454df18c067f29b39f5594f4cf6495faec76082c.
- Cloudflare Worker: sugargootab-com.
- Successful build: e18fb9fd-418e-405e-b9e7-d790aa7b5989.
- Worker version: e12b4eda-612e-464a-b270-1d6152f3593a; deployed 2026-10-18T08:54:54Z.
- Diagnostic workers.dev host: https://sugargootab-com.hehaize88.workers.dev/ (noindex).
- Public preview remains separate: https://sugargoo-spreadsheet-preview.hehaize88.chatgpt.site/ (noindex).

## Deployment configuration
- Astro 7.4.0 SSR with a custom fetch Worker adapter. Entrypoint dist/server/index.js; public assets dist/client via ASSETS.
- Wrangler 4.151.1. Cloudflare build uses Node 22.22.0 and npm 10.9.2.
- Repository hehaize88-code/hehaize; production branch main; root sugargootab-com.
- Build: npm run check:content && npm run build && npm run check:routes.
- Deploy: npm run deploy. Build variable NODE_VERSION=22.22.0.
- Include watch path sugargootab-com/**. Non-production preview builds disabled.
- Existing GitHub integration and existing Workers Builds token reused. No account token is stored in this repository.
- Cloudflare API connector required reauthentication. Deployment was completed through the user's connected Chrome session using the existing Cloudflare account and UI; no new credentials or wider permissions were created.

## Data and referral rules
- Sole product source: https://cnbuycha.com public catalogue. No database, product snapshot, image store, local search index, or admin backend.
- Keyword search and new/click/price sorting are passed through to the source catalogue. Product titles remain source originals when source translations are unavailable.
- Source product ID is distinct from the internal catalogue ID. Sample catalogue path /products/shoes/3470.html resolves to Weidian itemID 7876894732.
- Registration: https://www.sugargoo.com/register?redirect=/order/manual
- Buying: https://www.sugargoo.com/products?productLink={encodedSourceUrl}&memberId=1771881989097259278
- Keep memberId a string and encode the original source URL. Verified converter currently handles Weidian source links only.
- Official logo/favicon provenance in ASSET_SOURCES.md. No generated or placeholder product images.
- Image search remains unconnected until the CNBUYCHA endpoint is verified. Reference photos are not a user's personal Sugargoo warehouse QC.
- Independent recommendation site with affiliate disclosure; not an official Sugargoo service.

## Editorial and SEO
- 24 locales: en de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt.
- 30 FAQ answers in 6 groups, with filter and accordions. 28 cite official sources; 2 describe verified site behavior.
- 10 complete articles per locale, each with 7 sections, checklist, sources and related links. Header/footer links and 4 homepage article cards.
- No English body fallback. Product titles are not fabricated translations.
- Official-source ledger and qualitative keyword research in research/. No invented search volumes or rankings; changing policies remain qualified.
- Canonical and hreflang point to the production origin. Normal successful production pages are indexable; errors, search, alternate sorting, pagination, unavailable visual search and non-production hosts are noindex.
- /robots.txt advertises /sitemap.xml. Sitemap contains 672 unique localized content/category URLs. Product URLs are discovered through live catalogue navigation; no fabricated inventory sitemap.

## Validation
- Content checks: all 24 locales have 30 FAQ and 10 articles; structure and source checks pass.
- Built SSR checks: 288 editorial routes pass, including locale, canonical/hreflang, navigation, full article content and schemas. Unknown article is 404.
- Production configuration checks: www 308 retaining query, non-production noindex, 404 noindex, static binding and 672 unique sitemap URLs pass.
- Cloudflare build performed clean npm ci, content validation, Astro build and all route checks successfully. Worker startup 23 ms; gzip bundle 1029.39 KiB; only ASSETS binding.
- Anonymous HTTPS checks on the production domain: home, FAQ, article index, French guide, real product, keyword+price search, robots, sitemap, logo and favicon all returned 200.
- Homepage showed 6 real product cards and 4 article cards; FAQ had 30 entries; article index had 10 cards; product detail had 4 source photos and the exact expected affiliate link. Search returned 60 real product cards and noindex.
- https://www.sugargootab.com/fr/faq/?q=shipping returned 308 to the identical apex path/query. workers.dev FAQ returned 200 with noindex.
- User-browser inspection: production homepage rendered correctly, official logo and the CNBUYCHA hero image loaded successfully.

## History and implementation notes
- Preview source commit a91c7d3e06feff2700570f976754b72869899916 supplied the validated base. Production copy excludes preview Site identity and Git metadata.
- Astro 7 catch-all params strip .html; route via Astro.url.pathname to preserve source product paths.
- First cloud build 2d798c3e-fcfe-4cf2-ae32-fa751b92e5b3 failed during npm ci because npm 10 needed nested esbuild 0.28.2 entries missing from the npm 11-generated lockfile. Regenerated with npm 10.9.2 and verified clean install before successful deployment. Maintain npm 10 lockfile compatibility when changing dependencies.
- This container's local Wrangler emulator could not start because uv_interface_addresses returned a system error. This local limitation was superseded by successful actual Cloudflare deployment and HTTPS checks.
- Future updates belong in this directory and deploy through the connected GitHub production branch. Preserve the live source-only data architecture and user-provided referral links.

## 2026-10-18 image correction
- User screenshot exposed missing photos from Loro Piana Hat onward in the first catalogue page.
- Root cause: imageURL only admitted CNBUYCHA-hosted paths, while CNBUYCHA supplies verified HTTPS si.geilicdn.com URLs for many original photos. These were removed before rendering, not a domain/DNS outage.
- Added exact-host si.geilicdn.com support for source-supplied image URLs in both cards and galleries. Invalid, HTTP, credential-bearing and unverified-host URLs stay rejected. No image storage/proxy or product database added.
- Live source verification: first-page 60/60 product URLs retained; /headwear/3436.html gallery retains the source CDN image. Representative CDN request returns 200 image/webp.
- User requested stronger visual differentiation from kakobuypick.com. A separate directory-style redesign is being prepared on the existing preview; this production correction does not change the layout.
