# lovegobuytab.com

Independent LoveGoBuy product directory. Built with Astro 7.4.2 SSR and a standard Fetch Worker adapter. Source is intended for `hehaize88-code/hehaize/lovegobuytab-com/`. GitHub stores source; the SSR build needs a Worker-compatible runtime, not plain GitHub Pages.

## Development

Node >=22.23.4, `npm ci`, `npm run dev`. `npm run check:content` verifies 24 complete locale resources, 16 full articles per locale, 36 FAQs per locale and matching paragraphs, tables, bullets and related links. `npm run build` runs this required check, builds Astro, and bundles `dist/server/index.js`. Static assets are in `dist/client/`. After building, run `node scripts/check-editorial-routes.mjs` and `node scripts/check-interaction-events.mjs` for complete localized article rendering, sitemap and analytics checks.

## Data contract

- All catalog information comes from https://cnbuycha.com public HTML. No product database, secondary inventory or admin interface. The original Weidian listing supplies supplemental style images and CNY prices for the verified seller item ID; it does not replace catalog discovery.
- Search `q`, sorting `sort=new|click|price`, categories and pagination remain source operations. Source pages contain 60 records; the directory renders 20 per page.
- An in-memory two-minute source response cache (up to 100 URLs) reduces duplicate reads. A previously successful response may be reused for at most 15 minutes on a transient source error. No product-page snapshots are fabricated as fallbacks. Image search uses a separate, dated, static index of source photo fingerprints; product details still read the live source.
- Source images remain the exact CNBuyCha-returned URL from its own image paths or the observed Weidian image CDN. Prices from source HTML are already USD. Display conversion uses daily ExchangeRate-API rates; USD is the base, so there is no second CNY-to-USD conversion. Selected seller styles carry their actual CNY prices and use CNY as their base. Rates are cached in browser storage for 24 hours, with a maximum data age of 72 hours, a visible update date and original-currency fallback.
- Internal catalog IDs and seller item IDs are separate. `/shoes/3470.html` supplies original Weidian ID `7876894732`.
- Purchase format: `https://www.lovegobuy.com/product?id={productId}&shop_type=weidian&invite_code=161CPG`. Only verified Weidian URLs are converted; unsupported platforms do not receive invented purchase links.
- Registration: https://www.lovegobuy.com/login/signup
- CNBuyCha has no verified image-search endpoint or verified warehouse-QC type in the inspected public HTML. The independent image-search page compares a source catalogue image index locally in the browser; it does not call or invent a source image-search API. Product photos are not relabeled as order QC. The QC guide links to official platform information.

## Content and languages

`src/content/articles`, `faq`, and `copy` contain full versioned editorial resources. English at `/`; 23 other languages use their locale prefix. Article and product language switching preserves the same path and query. Product identity, images and price are shared across locales. Descriptive product title terms are localized server-side using the shared 23-language glossary across cards, detail headings, alt text and metadata. Brand/model identifiers remain unchanged; the original title is available in a disclosure. Unrecognized source words remain original rather than acquiring guessed attributes.

The November 2026 prioritization uses observed GSC queries and pages, Bing keyword research, GA4 landing-page engagement and public competitor coverage; small query samples are treated as directional evidence, not measured growth predictions. Platform facts link to official sources, with review dates shown per source. The 2026-10-23 update adds parcel tracking, shipping stages and official-platform image-search guides in all 24 languages, and improves six existing guides with practical tables and examples. Practical shopping checklists are independent editorial advice. See `docs/research.md` and `docs/brand-assets.md`.

## Routes

- `/`: SEO landing page for LoveGoBuy spreadsheet
- `/spreadsheet/` and `/spreadsheet/{source-category}/`: source-backed catalog
- `/products/{source-category}/{catalog-id}/`: product details and verified purchase link
- `/faq/`: searchable 36-question source-linked FAQ
- `/articles/`: 16-article index
- `/articles/{slug}/`: complete editorial page with contents and sources
- `/sitemap.xml`: live index of editorial, category and product sitemaps. Each product shard reads one real CNBuyCha listing page (60 products), then emits 24 locale URLs with hreflang. No product database is used for these live sitemaps. Upstream failures return 503 rather than an empty success response.

## Preview and production boundary

Public review URL: https://lovegobuytab-preview.hehaize88.workers.dev

The initial chatgpt.site preview host is blocked by its security layer for the user. The replacement Cloudflare Workers preview has been published from the existing `preview/lovegobuytab-com` branch, without custom-domain routes. Build with `SITE_URL=https://lovegobuytab-preview.hehaize88.workers.dev npm run build`, then deploy with `npx --yes wrangler@4.151.3 deploy --config wrangler.preview.jsonc`. The root directory in Workers Builds is `lovegobuytab-com`, with watch paths limited to `lovegobuytab-com/**`. Node is pinned in `.node-version`. All non-production origins remain noindex and blocked in robots.txt. This preview does not bind the purchased domain. See `docs/validation.md` for actual public-browser results.

## Production deployment

Production was authorized and successfully deployed on 2026-10-22 at https://lovegobuytab.com/. Both apex and www custom domains are connected; the GitHub-to-Cloudflare automatic build was verified. Deploy the `main` branch of `hehaize88-code/hehaize` with root directory `lovegobuytab-com`. Build command: `SITE_URL=https://lovegobuytab.com npm run build`. Deploy command: `npx --yes wrangler@4.151.3 deploy --config wrangler.jsonc`. The production Worker is `lovegobuytab-com`; only changes to `lovegobuytab-com/**` should trigger builds. Preview branch builds are disabled for this production Worker.

Use Cloudflare Worker Custom Domains for `lovegobuytab.com` and `www.lovegobuytab.com`; preserve other zone records. The application permanently redirects www to the HTTPS apex, retaining the path and query. Canonical and hreflang use the production origin. Indexing is determined by the request hostname: workers.dev and other preview hosts stay noindex even when they serve a production build. Search and sort variants also stay noindex. See PROJECT_MEMORY.md for the actual deployment and domain verification status.

The `.openai/hosting.json` identity belongs to the isolated public preview. No database or storage bindings are required. Do not create another preview project when this ID exists.

## Operational notes

Production GA4 includes `article_open`, `product_open`, `catalog_open`, `catalog_search`, `language_change`, `purchase_link_click` and `signup_click`. These describe interactions, not completed purchases or registrations. Search events send query length only, not the entered search text. The script adds no page views and is excluded from preview hosts. Event delivery still depends on the visitor's analytics availability; a passed implementation check does not establish actual reporting volume.

The source HTML adapter intentionally fails visibly if selectors or upstream access change. Watch source availability and parsing after upstream updates. The development preview host may have different outbound-network access from the deployed Worker; direct bundled-Worker integration checks are also recorded in `docs/validation.md`.

Article text and FAQ translations are complete machine-assisted editorial translations; a native-language editorial review is a sensible later quality pass. No claims of official affiliation, item authenticity, tested sellers, fixed shipping rates or guaranteed refunds are made.

## Product experience — 2026-11-11

- Dual-column detail layout, image enlargement, scrollable style thumbnails with wheel/touch/mouse-drag support, source purchase links and clipboard fallback.
- `/api/styles/{sellerId}.json` reads the public original Weidian page, checks its embedded item ID and only accepts images on `si.geilicdn.com`. It does not execute source JavaScript. Upstream requests time out after 12 seconds and do not delay the initial product HTML. Memory cache is bounded to 100 items and 10 minutes; no product database is introduced.
- A style price range covers its sizes when they differ. Copying uses the verified item URL; it does not claim to preselect a style or size on another platform.
- Other-agent links come from the existing catalog, filtered to recognized HTTPS agent hosts and the same seller ID. Existing referral codes are preserved.
- The source catalog currently has no verified per-item QC feed; the separate QC section reports this honestly and links to the QC guide. Product/style photos are never relabeled as QC.
- Run `node scripts/check-commerce.mjs` after the normal build/content and editorial/interaction checks. Managed local preview could not start in this session; live browser validation follows publication.


## Image search — 2026-11-11

`/image-search/` and all 23 locale variants accept JPG/PNG/WebP/GIF files up to 20 MB via file selection, drag/drop or paste. The selected image stays in the browser. A dated, static image index covers 3,467 CNBuyCha products at release. The index is reused from the same source catalogue already verified by SugargooTab and contains no private user images. Result links use LoveGoBuy Tab detail routes and shared title/currency presentation. Home, catalogue, desktop/mobile navigation, footer and all image-search guides expose the tool.

The comparison uses a 64-bit perceptual difference hash and coarse spatial colour features, not semantic AI recognition. It works best with the same or similar catalogue photos; different angles/backgrounds can produce weak matches. No confidence percentage or identity guarantee is shown. Near-exact results are not padded with unrelated records; weak results explicitly invite a clearer image. Empty/invalid files, blank images, failed index requests, cancellation and stale asynchronous replies have separate handling.

The static index is not a live stock or price guarantee. Refresh it before catalogue-focused releases with `python scripts/refresh-image-index.py` (requires requests, beautifulsoup4 and Pillow), inspect reported coverage, and commit the updated JSON. Refreshing compares source image URLs and only downloads new/changed photos. No database, API key, paid inference or user-image storage is required.

After `npm run build`, run `node scripts/check-image-search.mjs` (Pillow required), `node scripts/check-commerce.mjs`, `node scripts/check-editorial-routes.mjs` and `node scripts/check-interaction-events.mjs`. The visual check covers original/recompressed real-photo retrieval, 24 routes and hreflang/canonical, every index record, safe image URLs, file validation, currency refresh, retry/cache, cancellation, reset, paste and drop.

## Search-box camera and compact independent pages

Home and catalogue search boxes open the existing local image matcher directly through a camera button, image paste or file drop. Text submission and query/sort values remain intact. The native dialog can be closed with its button, Escape or backdrop; closing cancels unfinished matching. No uploaded photo leaves the browser.

Independent pages share `src/styles/compact.css`. Articles use native chapter disclosures and retain their complete server-rendered text, tables, links and schema. Contents links reveal the matching chapter. FAQ answers remain fully present and expandable. Article indexes use small covers and complete summaries; catalogue pagination remains 20 items. Long photo/result grids scroll within their section.

Validation: `node scripts/check-compact-pages.mjs` checks all 24 languages; `node scripts/check-image-search.mjs` covers camera, pasted/dropped images, ordinary text paste and query preservation.
