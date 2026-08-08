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
