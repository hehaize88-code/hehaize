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

The website's outbound product, category, and search actions are intentionally
limited to the owner's store destination. The store domain is not shown as
visible promotional copy on the website.

## October 3, 2026 content release

The article library contains 22 articles, including new USA shipping, Germany shipping, CSSBuy vs Superbuy, and payment/fee guides. Five warehouse/shipping articles and the three practical guides have decision tables, contextual reading links or the parcel-weight worksheet. The worksheet models chargeable weight only; it does not fetch live freight quotes.

All 22 articles and three guides have complete static German, Spanish and Portuguese translations. Dictionaries live in `app/articles/translations/`; the pages identify automatic translations and link to the English source. Keep every heading, paragraph, table cell and related-link label synchronized when editing English content. New localized articles need a complete dictionary before adding reciprocal language links. `tests/content-inventory.json` records section and paragraph counts for route validation.

Research provenance, the GSC baseline and keyword-to-article mapping are in `editorial/2026-10-03-release.json`. GA4/Bing account data were unavailable for the research; the existing GA4 tag remains, with added article and calculator events.

To refresh the sitemap after a content change:

```sh
node scripts/export-content.mjs > /tmp/cssbuy-content.json
python scripts/update-content-sitemap.py /tmp/cssbuy-content.json
npm run build:pages
node --test tests/rendered-html.test.mjs tests/pages-worker.test.mjs tests/content-routes.test.mjs
```

Commit both source and regenerated root Pages artifacts. Production continues to use the existing GitHub/Cloudflare Pages integration.
