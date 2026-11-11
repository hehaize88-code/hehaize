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

Refresh the index after source catalogue changes with `python scripts/build-image-index.py` (Python + Pillow + curl). It fetches the current public catalogue and its main images. The dated index is a snapshot; text search, sorting and details remain live. No recurring automation is added.

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
