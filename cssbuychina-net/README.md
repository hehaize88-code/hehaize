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
