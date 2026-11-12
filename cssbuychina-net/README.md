# CSSBuy China Spreadsheet

Production source and Cloudflare Pages artifact for `cssbuychina.net`.

The site includes category and product discovery pages, long-form research
articles, guides, FAQ content, independent trust pages, and localized routes
for English, Brazilian Portuguese, German, and Spanish. Public metadata,
canonical URLs, language alternates, `robots.txt`, and `sitemap.xml` use the
production domain.

## Build

- `npm run build` creates and validates the Vinext Worker artifact.
- `npm run build:pages` creates the Cloudflare Pages `_worker.js` bundle and
  copies its static assets into this directory.
- `npm test` validates production indexing metadata.
- `npm run test:pages` validates the Pages Worker, canonical-host redirect,
  crawler files, and real 404 handling after `build:pages`.

Product data, search, sorting and galleries use the owner's cnbuycha catalogue.
Visitors browse locally, and the purchase button opens the matching marketplace
item on CSSBuy. Official registration and branding use CSSBuy's own URLs.
See `commerce/IMPLEMENTATION.md` for architecture, keyword research and validation.

## October 16, 2026 editorial release

The library contains 25 articles and three practical guides in English, Portuguese (Brazil), German and Spanish. Three new articles address QC returns and refunds, original marketplace links, and shipping to Brazil. Existing restrictions, warehouse status, storage, shipping-weight, shipping-budget and product-link articles plus the QC guide have clearer answers and connected next steps. All existing article titles have reviewed localized wording.

Dictionaries live in `app/articles/translations/`. Keep every heading, paragraph, quick answer, table cell, source label and related-link label synchronized. New content is in `app/articles/october-article-data.json`; focused amendments are in the article and guide `october-updates.json` files. `tests/editorial-release.test.mjs` rejects missing or untranslated long strings and verifies discovery and source sections across languages.

The homepage highlights the new articles and restrictions guide in all four languages. Article sources link to the public service or authority. Source provenance and the query-intent mapping are recorded in `editorial/2026-10-16-release.json`. Live route prices, delivery promises and fixed Brazil tax rates are deliberately not asserted.

The existing GA4 measurement ID is retained. Article-entry, related-reading, source, catalogue and search events carry page context; application and catalogue events include hostname and site language. Marking key events and filtering GA4 reports are separate account-admin tasks. No GA4 property settings are changed by this release.

Refresh content inventory and sitemap, then build the checked-in Pages artifact:

```sh
node scripts/export-content.mjs > /tmp/cssbuy-content.json
python scripts/update-content-sitemap.py /tmp/cssbuy-content.json
npm run build:pages
npm run test:release
```

`tests/content-inventory.json` is generated from source and validates all 112 article/guide language routes. The public Pages worker, sitemap and hashed assets must be committed with the source. Historical research remains in `editorial/2026-10-03-release.json`.

## November 9, 2026 editorial update

The article library now has 28 articles in each of EN, PT-BR, DE and ES. Three complete guides cover UK shipping, rehearsal packing and parcel insurance claims. The returns and product-link pages have revised search titles, summaries and quick answers; the link-check page also has a compatibility table. Homepage reading links and all language indexes expose the new guides.

New content is in `app/articles/november-article-data.json`; targeted revisions are in `november-updates.json`. The existing dictionaries contain every new paragraph and interface label. Mobile articles retain full text with an optional contents list and shorter spacing. Responsive table labels now use the actual translated column headings instead of fixed English category labels.

Research uses current CSSBuy public buying/packing guidance, the shipping estimator, return/refund help and GOV.UK import guidance. Hypothetical weight and cost examples are labeled; no live tariff, universal insurance premium, guaranteed delivery time or compensation promise is asserted. The existing hostname-aware GA4 ID and event instrumentation are retained.

## November 12, 2026 product experience

Catalogue pages now have 24 language choices (including the existing Brazilian
Portuguese paths), localized product names, a 30-currency selector with dated
Frankfurter reference rates, and ten other buying platforms tied to the original
Weidian ID. Actual Weidian option data supplies the style grid, size controls,
source CNY price and SKU; the clipboard includes the original URL and selected
option rather than inventing unsupported SKU URL parameters. Seller photos and
catalogue reference photos remain separate. Unclassified photos are not claimed
to be verified warehouse QC.

The long-form editorial library remains in its four existing complete editions
(EN, PT-BR, DE, ES). Catalogue navigation marks English editorial destinations
for the additional languages. No absent translated article is indexed. The main
sitemap links directly to 24 catalogue shards and the existing editorial sitemap,
without nested sitemap indexes. Existing analytical measurement is preserved.

The preview server runs the actual packaged Pages worker (`npm run dev`); the
original Vinext development server remains available as `npm run dev:app`.
Run `npm run test:release` and `node --test tests/product-experience.test.mjs`
after packaging. Catalogue dictionaries are static assets; no new database,
translation subscription or private API credential is required.

## Full product-image search

Image search compares catalogue/detail photos, seller galleries and available
style photos, retaining the best matching photo for each product. Results carry
the catalogue/seller photo number or actual style ID to the product page. Seller
data arriving later does not replace a specifically requested catalogue photo.

The dated `public/catalog-image-index.json` manifest reports actual product,
photo and source-failure counts. Immutable, SHA-256-verified shards are scanned
in a browser worker; incomplete downloads fail visibly instead of silently
searching a smaller catalogue. Uploaded photos stay on the visitor's device.

To refresh the snapshot, install `requests` and `Pillow` in a Python environment
and run `python scripts/build-image-index.py --workers 4 --image-workers 16`.
The builder caches downloaded images and descriptors under `.cache`, respects
source Retry-After responses, and writes the manifest atomically after indexing.
Use `--seed-index public/catalog-image-index.json` to reuse previously verified
descriptors. The optional `--reuse-gallery-snapshot` requires a same-day seed
and an unchanged listing photo; a normal refresh fetches each product gallery.
Run the Python index tests, `npm run build:pages` and `npm run test:release` before
publishing. Copy the generated shards and manifest together; preserve older
immutable shards for visitors holding a previous manifest.
