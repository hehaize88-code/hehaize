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
