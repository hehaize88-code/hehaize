# Hubbuy catalogue and search intent — 16 October 2026

## Keyword map

This is a qualitative search-intent review, not a keyword-volume report. No paid volume, difficulty or rank guarantees are claimed.

| Page | Main query | Supporting intent |
| --- | --- | --- |
| `/` | hubbuy spreadsheet | hubbuy finds, product spreadsheet, product search |
| `/catalog/` | hubbuy product finds | name / source ID / original link, latest, popular, price |
| `/catalog/shoes/` | hubbuy shoes spreadsheet | sneaker finds, shoe photos |
| `/catalog/t-shirts/`, `/catalog/hoodies-sweaters/` | hubbuy clothing spreadsheet | T-shirts, hoodies, clothing finds |
| `/guides/qc-checks/` and existing QC article | hubbuy QC photos | warehouse photos, labels, measurements |
| `/guides/how-to-buy/` | how to buy on Hubbuy | original product ID, registration, variants |
| `/guides/shipping/` and existing shipping article | Hubbuy shipping cost | parcel weight, packing, shipping estimate |
| `/pt-br/` | planilha Hubbuy | achados Hubbuy, tênis, roupas, fotos QC |
| `/de/` | Hubbuy Spreadsheet | Hubbuy Tabelle, Schuhe, QC-Fotos |

Observed query themes and competing page structures:
- https://hubbuy-spreadsheet.com/ — spreadsheet, shoes, clothing, QC and shipping.
- https://hubbuysheet.org/search-guide.html — spreadsheet, Weidian links, source products and buying workflow.
- https://hubbuypicklist.com/ — search by name, link and image.
- https://www.spreadfinds.com/hubbuy — categorized product finds and QC references.
- https://hubbuy-spreadsheet.com/pt/ — Portuguese planilha and product categories.

Homepage copy gives the core answer first, then four current product previews, buying/QC/shipping links, four articles and a native collapsed FAQ. Article URLs and their full text remain available. Dynamic searches, alternative sort orders and pagination are noindex/follow; stable catalogue/category/product routes have canonicals and language alternates.

## Official branding and destinations

- Registration: https://hubbuy.com/signUp
- Official wordmark: https://hubbuy.com/_nuxt/logo.D5K9TkgO.svg — exact SVG copied to `public/brand/hubbuy-official.svg`.
- Official favicon: https://cdn.hubbuy.app/favicon/favicon_64.ico — exact bytes stored as base64 and emitted during the build.
- Purchase: `https://www.hubbuy.com/product/2/{sourceId}?utm_source=website&utm_medium=share&utm_campaign=product_details&utm_content={sourceId}`.
- Confirmed example: source ID `7853208944` is catalog row `/accessories/3438.html`; purchase uses `7853208944`, never `3438`.

## Source and reuse

All live catalogue reads use https://cnbuycha.com. The adapter reuses the repository's existing commerce parser and on-device image matching, adapted for Hubbuy and EN/PT-BR/DE. The source project `hehaize88-code/cnbuycha` supplies title/source-ID search, categories, USD prices, new/popular/price sorting, 60-item pagination, and ordered product images. No source database, credentials or administrative APIs are copied.

Image search compares dHash and color descriptors of the same source product photos on the visitor's device; it is visual similarity, not a claim of an official Hubbuy image-search API. The 16 October refresh has 3,446 products and 3,446 usable image descriptors. The missing primary image for `/shoes/3460.html` is replaced by a verified working photo from the same source product gallery; duplicate gallery entries are removed. Failed card images can recover from their own product gallery, and galleries skip failed thumbnails. The image-search UI displays coverage and the index date.

The build reuses the existing shared source-photo index at `../hipobuyy-sheet-com/dist/assets/catalog-image-index.json` and applies the small source refresh delta here. A newer shared refresh takes precedence. No runtime request is made to another spreadsheet domain. Images in product galleries retain source ordering and are described as product/QC references, not automatically as order-specific warehouse inspection evidence.

## Validation

- `npm run build:pages` and `npm run validate:pages`.
- `node tests/commerce.mjs`: source HTML parsing; exact purchase ID; text/link query normalization; all 12 categories in three languages; sorting/pagination query forwarding; gallery ordering; error responses; 192 legacy redirects; image descriptor integrity; catalogue sitemap; exact favicon bytes.
- Browser DOM checks exercise gallery navigation, mobile incremental reveal, image selection/validation and on-device search results. Image ranking uses test canvas pixels; this verifies the UI pipeline, not ranking quality for every uploaded photo.
- Full screenshot QA could not run in this environment because the managed preview failed to mount `/proc` and the connected browser session was unavailable.

Publication uses GitHub and the existing automatic deployment. No Cloudflare account changes are required.
