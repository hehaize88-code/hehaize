# SugargooTab project memory

Updated: 2026-10-18 (Asia/Shanghai)
Status: V2 and compact mobile articles are live; catalogue/search/category pages now show 16 products per page. Mobile and desktop pagination verified on sugargootab.com.

## Google Analytics 4 — 2026-10-18
- User requested adding sugargootab.com to their existing Google Analytics account.
- Created dedicated property sugargootab.com (559468530) under existing account 405518068; reporting timezone Asia/Shanghai (UTC+8), currency USD. Objectives: website traffic and engagement/retention.
- Web stream SugargooTab Web (16152247002), URL https://sugargootab.com, measurement ID G-SDSLG4QJR3. Enhanced measurement enabled; email redaction enabled by the stream's default settings.
- Shared GoogleAnalytics.astro component installs the async Google tag once on each production-origin HTML page, including all 24 languages, catalogue, searches, pagination, FAQ and articles. No SPA/router double page-view hooks. Preview/workers.dev/local origins do not load Analytics.
- Google Signals and advertising personalization signals disabled in tag configuration; no advertising-account links or fictitious purchase conversions. Source catalogue/referral behavior unchanged.
- Validation before release: 24 content bundles, Astro build, 288 editorial routes each with one matching loader/config, preview tag exclusion, search/pagination tag presence, 26 pagination scenarios and 672 sitemap URLs all pass.
- Deployment and live collection verification pending the GitHub/Cloudflare release of this change; append confirmed results after inspecting the actual site and GA UI.

## Live deployment
- Canonical website: https://sugargootab.com/
- Alias: https://www.sugargootab.com/ permanently redirects (308) to the apex, preserving path and query.
- Source: https://github.com/hehaize88-code/hehaize/tree/main/sugargootab-com
- Branch: main. One domain per top-level folder; do not edit other domain projects.
- Initial source commit: 3a0f3357f3b90f80d5474ecb74cde1712f4b7a4e.
- Deployed application commit: 2f2f46b3795b7ed6bd09a4bdf92359691da18628 (16-product catalogue pages).
- Cloudflare Worker: sugargootab-com.
- Verified application release build: 47767d3d-c1ff-46ce-9849-ff1164c6ebe2 (Cloudflare Workers check success).
- Application release Worker version: b738e6a5-1ba3-4ddb-9e49-0c4bb50f3ca7; completed 2026-10-18T09:50:01Z.
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


## 2026-10-18 — Same-domain design preview
- The new directory design was published to the existing Sites preview (source 86f44b208e428256fe9f81921c635d70fa2f2540, version 3). User Chrome received a Cloudflare security block for chatgpt.site. No protection was disabled or bypassed.
- Serve the same authored design at https://sugargootab.com/design-preview/ for review. Regular production URLs keep V1. The prefix works across all existing languages and routes; category/product/article/navigation links preserve it.
- Preview pages explicitly noindex and canonical to the equivalent normal production URL; preview URLs are absent from the sitemap. A localized preview bar links back to the corresponding normal page.
- src/styles/directory.css is injected only for designPreview. Shared Card/ArticleCard/Editorial components accept an optional basePath, defaulting to an empty string so regular production links remain unchanged.
- If the user approves V2, promote it while preserving production SEO and referral configuration, then remove or redirect this temporary preview prefix.


## 2026-10-18 — Approved V2 production release and mobile compression
- User approved the directory preview and explicitly requested deploying it after compressing mobile pages, particularly article indexes and individual articles, plus pagination matching the supplied Previous / 1 / 2 / 3 / Next screenshot.
- Promote V2 to normal production paths. Remove the review banner and V1 home/listing markup. /design-preview and its descendants permanently redirect (308) to corresponding canonical production paths, retaining locale and query.
- Mobile article cards use two columns, compact excerpts, smaller headings and margins. Full article bodies are unchanged and fully server-rendered; on small screens, chapter/checklist/source disclosures initially show the first chapter, with localized Expand all / Collapse all controls in all 24 locales. Desktop stays fully expanded. TOC/hash links open their target chapter; printing temporarily expands all sections.
- Mobile home, category menu, product spacing, FAQ, guide, detail and footer are tightened. Category links wrap into a three-column menu rather than requiring horizontal scrolling.
- Pagination now has Previous, a moving three-number window and Next. Current number is dark with aria-current; first/last controls are disabled. Locale, category, keyword and sort are preserved in every link.
- No article text, language, product source, image URL or referral configuration was removed or replaced. CDN image fix remains in place.
- Browser baseline at 390px: article index 3947px high; first complete article 6899px high. Compare the deployed compact version at the same viewport before reporting reductions.
- Added rendered pagination checks for first, middle, last, zero/single/two-page cases; all 24 locale article routes verify complete disclosures and localized controls. Production sitemap/canonical/indexing gates remain active.
- Pre-deployment checks passed: all 24 content bundles (30 FAQs and 10 full articles each), Astro production build, 288 editorial routes, 8 rendered pagination scenarios, 672 sitemap URLs, canonical/indexability, static assets, www and legacy preview redirects. Live mobile interaction and image verification follow the automatic Cloudflare deployment.

### Production verification complete
- Application commit bf093766164c5fa025b46397d656f7ebd5be1844 was pushed to GitHub main and automatically deployed by the existing Cloudflare build connection. User Chrome confirms the new theme and interactions on normal production URLs. Reloading the old design-preview article redirects to its equivalent normal production URL.
- At 390x844: article index is now 1631px high (previously 3947), 10 cards in two columns. First article is 2411px initially (previously 6899), or 5173px with every section expanded; heading height is 90px. The initial reduction includes collapsed chapters, not removal of content.
- Expand all opens all 9 sections; Collapse all closes them. Clicking a TOC link opens the correct chapter, closes the mobile TOC and scrolls to the heading. French controls display Tout déplier / Tout replier.
- At 320px: article cards retain two columns, catalogue and article index have no horizontal page overflow. At 390px: numbered Previous / 1 / 2 / 3 / Next matches the supplied reference, with current background rgb(35,38,36).
- Clicking page 2 changes the catalogue correctly (60 cards). French hat + price search retains /fr/, q=hat and sort=price after Next; page 2 has 11 cards and disabled Suivant, with valid Previous back to page 1.
- Restoring the desktop viewport (1920px) expands all 9 article sections and hides the compact reading controls. Production homepage shows the approved directory theme, no review banner, 12/12 loaded source product images and no horizontal overflow. Temporary viewport override was reset; the formal homepage was left open for the user.
- Product source, official assets, referral configuration, editorial text, all 24 locales and the source CDN image fix remain intact. No database, image proxy or backend was added.

## 2026-10-18 — 16 products per catalogue page
- User asked to reduce long mobile Spreadsheet product lists to roughly 16–20 items. Choose 16: two columns and eight rows on phones; four columns and four rows on large desktop layouts. The same URL identifies the same 16 products across devices and language switches.
- Replace direct 60-item upstream pagination with server-rendered 16-item windows. Map each window to CNBUYCHA's original 60-item page, reading the next original page only when the window crosses a boundary. Example: public page 4 reads items 49–60 from source page 1 plus 61–64 from source page 2. Never merely slice each source page to 16 and skip its remaining 44 products.
- Total pages are ceil(source total / 16), while the result count shows the current item range and true source total. Existing numbered pagination, locale, category, search and sort are preserved. Out-of-range requests redirect to the last available public page; a failed required upstream page returns 503/noindex instead of a partial successful result.
- Home remains a curated 12-item preview; product details and full galleries remain intact. No new products, images, storage, source mutation or database. This applies to all 24 language catalogue, category and search routes.
- Validation passed: production build, 24 language content bundles, 288 editorial routes, 672 sitemap URLs, 26 catalogue scenarios, source-boundary ordering, every item reachable across small catalogues (0/1/16/17/60/61/71 items), end-page controls, range text, out-of-range redirect and upstream-error handling.
- Browser baseline before release at 390x844: 60 product cards, grid height 8111px, total document height 8977px. Live production verification follows the automatic GitHub/Cloudflare build.
- Release confirmed: application commit 2f2f46b3795b7ed6bd09a4bdf92359691da18628, Workers Build 47767d3d-c1ff-46ce-9849-ff1164c6ebe2 succeeded; version b738e6a5-1ba3-4ddb-9e49-0c4bb50f3ca7.
- Live Chrome at 390x844: 16 cards, two columns/eight rows, product grid 2149px, full page 3015px (about 3.6 viewports versus 10.6 before). No horizontal overflow; range shows 1–16 / 3446 products at the time of inspection.
- Browser Next clicks: page 2 shows 17–32, page 3 shows 33–48, page 4 shows 49–64; the first four pages contain 64 unique product paths. The cross-source page 4 contains the expected 16 cards.
- French hat + price search: page 4 shows 49–64 / 71, Next retains /fr/, q=hat and sort=price; page 5 shows 65–71, 7 cards and disabled Suivant.
- Desktop viewport restored: 16 cards in four columns, no overflow. Production Spreadsheet page kept open. Screenshot sugargootab-16-products-mobile.jpg is verification only, not a product asset.
