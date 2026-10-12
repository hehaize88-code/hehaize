# Joyagoo catalogue integration — 2026-10-12

This existing site is published from `hehaize88-code/hehaize`, `joyagoochina-org/`, branch `main`. Only this project is changed. The existing GitHub deployment integration is retained. No Cloudflare account, DNS, database, or scheduled publishing changes are made.

## Keyword and page intent

The homepage targets **joyagoo spreadsheet**. Supporting clusters are **joyagoo finds**, **joyagoo QC photos**, **joyagoo image search**, **joyagoo shoes spreadsheet**, **joyagoo hoodie finds**, **joyagoo jersey finds**, and **joyagoo Weidian spreadsheet**. These are qualitative intent choices, not search-volume or ranking claims. Observed competition on 2026-10-12:

- https://www.joyagoosheets.com/ — product finds organised by shoes, hoodies, apparel and accessories, with QC terminology.
- https://www.jadeship.com/search/spreadsheet/joyagoo — spreadsheet search and source marketplace discovery.
- https://repsheet.net/qc-finder/joyagoo — QC finder intent.

Competitor text, quantities, shipping promises, and affiliate links are not copied. Existing shipping, purchasing and QC articles retain their URLs and content. Ten existing languages remain supported. The homepage links to the latest four articles for each language; the complete archive remains under `/articles/` and its language equivalents.

## Official branding and handoff

Official login/registration entry: https://joyagoo.com/login. The top-left logo and register button link there. The actual header SVG was captured from the rendered official page; `public/joyagoo-official-logo.svg` preserves its geometry and colours. `public/joyagoo-official-icon.png` contains the exact PNG bytes downloaded from the official `https://joyagoo.com/site.ico` icon link. Independent-site identification remains visible.

Purchase URL: `https://joyagoo.com/product?id={sourceId}&platform=WEIDIAN`. Source IDs come from the cnbuycha product record, not local URL numbers. Verified example: `/shoes/3459.html` is source ID `7874413518`, USD 22.22, with five gallery images in source order. No account or purchase is created by this integration.

## Shared catalogue

`commerce/catalog.js` reuses the established public-page adapter from the UUFinds project against the same `hehaize88-code/cnbuycha` source schema. Product lists, keyword/source-ID search, category filters, latest/popularity/price sorting, pagination, detail prices and image order are read from `https://cnbuycha.com`. Public catalogue routes only are allowed; administration is never proxied. The catalogue is rendered on the server and cached briefly. Source failures return 503; missing source items return 404.

`commerce/home.js` renders the SEO homepage in all ten languages. Homepage products are read live; if the source is temporarily unavailable, a visibly dated catalogue snapshot is shown. `commerce/content.js` is generated from the existing article library, guide titles and image index. The editorial source of truth remains in `app/`.

Source gallery images can include seller and warehouse photos. The UI does not label all images as independently verified warehouse QC. Products retain source titles in every locale; surrounding navigation and guidance are translated.

## Image search

The cnbuycha project has no existing image-search endpoint. This feature reuses the previously implemented browser-side visual similarity matcher and the cnbuycha-only image index. Images selected by the visitor stay in their browser. The index has 3,436 unique item descriptors: the full 2026-10-09 scan plus the newly observed item on 2026-10-12. The current source total of 3,436 was verified in the rendered public catalogue; the latest page's titles, prices and image URLs were refreshed. Existing image fingerprints were retained. Image search displays the index date and coverage, and makes no exact-match guarantee. Opening a result reads live product details.

Refresh the full index with `python scripts/build-image-index.py` where public catalogue/image network access is available; it needs Pillow and curl. No automatic task was added.

## URLs and SEO

Old spreadsheet/category/search routes redirect into `/catalog/` while preserving keywords. All 36 legacy product paths map to their verified current product path in all ten languages. Language switching preserves the page and search/sort parameters. Search and sort variants are noindex,follow. Catalogue and editorial pages use same-language canonical URLs, reciprocal hreflang and x-default.

`/sitemap.xml` becomes an index retaining the familiar submission URL. It points to `/editorial-sitemap.xml` and `/catalog-sitemap.xml`; redirected old catalogue entries are excluded. The catalogue sitemap reads live source product routes in all ten languages. Existing GA4 measurement ID is retained.

## Build and validation

1. `node scripts/build-commerce-content.mjs`
2. `vinext build`
3. `node scripts/prepare-cloudflare-pages.mjs`
4. `node --test tests/catalog.test.mjs`
5. `node scripts/sync-published-commerce.mjs`

The static export step composes the Pages worker and writes the same native homepage renderer into all ten static homepage files. The original Vinext worker also serves the shared catalogue routes, so both existing hosting outputs are covered. The public static files are synced to the current project publish directory without deleting old assets that cached article HTML could reference.
