# UUFinds spreadsheet catalogue integration — 2026-10-09

The homepage targets **uufinds spreadsheet**. Secondary intent groups are **uufinds QC photos**, **uufinds image search**, **uufinds Weidian spreadsheet**, and category terms for shoes, hoodies, jerseys and accessories. No search-volume or ranking claims are made. Research references:

- https://www.uufinds.com/qcfinds — official QC finder and product exploration.
- https://apps.apple.com/us/app/uufinds/id6742487584 — developer description of spreadsheet/link conversion, images and QC features.
- https://uufinds.net/ and https://www.uufinds.info/ — competing spreadsheet/category pages. Their product-count and quality claims are not reused.

## Data and routes

`commerce/catalog.js` reads public cnbuycha.com catalogue pages. It preserves the source's search, category, newest/popularity/price sorting, page size, displayed USD prices and image order. `/catalog/` is server rendered. It does not copy or expose the administration area or bind a second database. Source failures return 503, not a fabricated empty list. Search/filter/pagination pages are noindex,follow.

Existing eight static product routes redirect to their corresponding live product paths. Existing product-list routes and old search endpoints redirect into the catalogue. All five existing locales are supported. The original editorial archive remains available.

## UUFinds handoff

Registration: `https://www.uufinds.com/register`.

Product link: `https://www.uufinds.com/goodItemDetail/qc/{sourceId}?spuNo={sourceId}&channel=weidian`.

The official public detail resolver was checked with product ID **7861175344**. It returned source ID 7861175344, Weidian source link, and resolved record d2d97149c6d54550803b9d49f95cee7d. The example provided with spuNo=7788829484 is another item. Never reuse that example's QC UUID, seller_id or price for unrelated products.

Official wordmark asset: `https://www.uufinds.com/assets/logo_light-DT50k8lw.png`. Its bytes match the old source wordmark. Favicon: `https://www.uufinds.com/favicon.ico`. Both are served locally. Independent-site relationship copy remains visible.

## Image search

The cnbuycha repository has no image-search endpoint. This integration adds local visual similarity search using only its catalogue images. `public/catalog-image-index.json` includes its update date and indexed/total counts. The user's image is decoded and compared in the browser; it is not uploaded to a third party. Difference hash and color cells rank similar candidates; results are not an identity/authenticity guarantee. Product prices/details are re-read live when opened.

Refresh the index after source catalogue changes with `python scripts/build-image-index.py --gallery-only` (Python + Pillow + requests). It fetches every current public product detail page and every image in its gallery. Omit `--gallery-only` to add readable Weidian style images; upstream failures are recorded, never counted as indexed images. The version 2 manifest points to content-hashed shards and reports product/image coverage. Download caching, bounded concurrency and Retry-After handling allow safe resumption. The dated index is a snapshot; text search, sorting and details remain live. No recurring automation is added.

## Build and checks

- `npm run build:pages` builds Next static editorial pages and composes the Pages worker.
- `npm run test:catalog` checks source pagination, gallery order, individual item handoff, upstream routing and errors.
- `node scripts/sync-static-export.mjs` copies the export to the existing GitHub publish directory.
- Publish by committing to the existing GitHub repository. No Cloudflare dashboard, DNS or account changes are required.

## Product experience update — 2026-11-11

- Product catalogue, detail and visual-search routes support 25 locale choices (24 languages/regions plus UK English). Existing editorial pages retain their five published editions. New-locale editorial navigation deliberately opens the available English edition rather than a missing page.
- Product descriptors are translated on the server and in dynamically loaded cards, keeping brand/model identities. The title, metadata and image descriptions use the same formatter.
- The two-column detail view uses only real catalogue photographs. It does not label unclassified catalogue images as verified warehouse QC.
- Public Weidian listing data supplies style images, size attributes, SKU IDs, stock status and CNY prices. The parser verifies the returned product ID. A failed fetch shows a retry and the original listing rather than fabricated options.
- Eleven other-agent links use the same Weidian item ID. Styles are restored through this site's `style` and `option` query parameters. Copying includes the original Weidian URL and selected labels/SKU; no unsupported Weidian SKU parameter is invented.
- Thirty currencies use dated Frankfurter reference rates, cached for six hours. If rates fail, the original currency remains visible. Reference prices exclude shipping, taxes and agent fees.
- Catalogue sitemaps are split into one XML file per locale under `/catalog-sitemap.xml`, keeping each file below the 50,000-URL limit.
- Verification: production build and static release validation; 13 route/parser/translation/price/identity tests; browser checks for French and Chinese, EUR conversion, style/size price changes, copy confirmation and agent filtering.

## Page language navigation and all-photo search — 2026-11-11

- Editorial language menus link only to published editions of the same document. Query parameters and section anchors survive a switch. Unpublished editions are labelled unavailable; English-only articles do not offer false translated routes. Catalogue language choices remain unchanged.
- Common Chinese option colors are displayed in the selected catalogue language while retaining the original option IDs and source labels for reference.
- Image records preserve gallery position or source style ID. Search deduplicates products using each product’s closest image, shows that matched image and opens its gallery position (`photo`) or style (`style`).
- The browser and indexer share deterministic area-v2 RGB cell means and difference hashes; native cell averages avoid browser/Pillow resize differences. This remains visual similarity, not semantic AI recognition.
- The browser loads all hashed shards with bounded concurrency and validates every record/count before searching. Interrupted or missing shards cause a retryable error rather than silently searching only part of the index.
- Geist fonts are served locally with their OFL license to make production builds independent of font-host availability.

## Compact mobile pages — 2026-11-12

- Shared mobile styles cover home, catalogue, product, image search, article archive, guides, FAQ, workflow and policy templates. Desktop layouts retain expanded reading content.
- Guides, FAQ topics and policies retain complete server-rendered copy in native disclosures. Phone views open one chapter at a time; shorter screens start with chapter headings. Direct section anchors expand their matching chapter. JavaScript-free pages retain their open content.
- Catalogue source pages retain all 60 items and source pagination. Mobile presentation pages show 12 items at a time, preserve the selected group in `view`, and restore it after returning from a product. Replaces the old cumulative Show more control.
- Gallery thumbnails and reference photos scroll horizontally; style grids retain bounded scrolling. No product images or source identities are removed.
- Validation: 162-page production build; 18 existing commerce/navigation tests; browser height audits of all 104 non-redirect editorial routes at 390px, 360px and 320px. Final 320×740 overview maximum: 4.70 screens, zero horizontal overflow. Shorter pages are not padded to reach three screens. Expanded reading naturally increases page length.
- Browser interactions verified: catalogue items 13–24 (12 visible), article direct anchor `section-7`, switching to `section-2`, and all 12 QC-guide chapters open at desktop width. Example product detail measured 2,742px at 360px width.
