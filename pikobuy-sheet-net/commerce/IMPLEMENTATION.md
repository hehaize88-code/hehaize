# Pikobuy catalogue integration — 2026-10-12

Existing deployment: `hehaize88-code/hehaize`, branch `main`, directory `pikobuy-sheet-net`. Publish through the existing GitHub integration. No new Site, domain change or direct Cloudflare operation is needed.

## Behavior

- The upper-left registration button uses the exact requested `https://www.pikobuy.com/?mode=register&redirect=/home`. The adjacent logo returns to the local language homepage.
- Logo and icon are downloaded unmodified from the official homepage assets: `/images/header/pikobuy-logo-figma.png` and `/images/common/pikobuy-icon-192.png` on `www.pikobuy.com`. Local files avoid a dependency on third-party hotlink behavior.
- Product lists, keyword/source-ID search, category filters, `new`/`click`/`price` sorting, pagination, USD prices and galleries are read from the public cnbuycha.com project. Catalogue content is fetched on request, with at most 60 seconds of edge caching. No private data, database copy or admin access is required.
- Purchase URLs encode the original Weidian source ID in `productUrl`. The catalogue row ID is never substituted. Actual source product `/other-stuff/3459.html` has source ID `7874413518`, a USD price of 22.22 and five ordered pictures as checked on this date.
- The source does not expose an image-search API. Image search compares source-catalogue picture fingerprints on the visitor's device. It is similarity search, not an exact-product guarantee. The refreshed index includes all 3,436 currently listed products and displays its update date. New source pictures require rebuilding this index; live lists and product pages update independently.
- Every existing page keeps its content and uses the shared header, registration button, footer and official icon. Seven locales are supported: EN/DE/FR/ES/IT/PL/PT. The catalogue and new homepage copy are fully localized. Existing article counts are preserved: 27 English and 6 in each of the other languages. This change does not claim to translate the older English-only articles. Their language menus open the corresponding localized article index rather than nonexistent translations.
- The homepage keeps FAQ and the four most recent article cards. Product cards point to local live detail pages. Legacy snapshot finds and category links redirect to their matching catalogue destination and preserve locale.
- Search, alternate sorts and pagination are `noindex,follow`. Clean categories and details have canonical and reciprocal language alternates, including `x-default`. Existing editorial URLs remain in `editorial-sitemap.xml`; `sitemap.xml` indexes it and `catalog-sitemap.xml`.
- Existing GA4 measurement ID is preserved. Registration and Pikobuy purchase clicks are recorded without duplicating search events.

## Keyword research

No verified search-volume or difficulty data was available; none is invented. Priorities reflect search-result intent and official functionality.

| Priority | Keyword group | Destination |
| --- | --- | --- |
| 1 | pikobuy spreadsheet, pikobuy spreadsheet 2026 | SEO homepage |
| 1 | pikobuy finds, pikobuy shoes spreadsheet, pikobuy hoodies | Live catalogue/categories |
| 1 | pikobuy QC photos, pikobuy QC | Product galleries and existing QC guide |
| 2 | pikobuy image search, pikobuy product links | Image search and product detail |
| 2 | pikobuy shipping cost, how to use pikobuy | Existing shipping and beginner guides |

Sources inspected 2026-10-12:
- https://www.pikobuy.com/home — official sourcing, inspection and shipping workflow, logo and icon.
- https://www.pikobuy.com/shipping-cost — official shipping estimator.
- https://pikobuy.to/spreadsheet — competitor category, product and price organization.
- https://pikobuys-spreadsheet.com/ — competitor spreadsheet, product-search and QC positioning.
- https://pikobuy.org/pikobuy-spreadsheet.html — competitor link-research and shortlist intent.

## Maintenance and verification

`node maintenance/build-worker.mjs` assembles the self-contained Pages worker from `commerce/`. `node --test tests/catalog.test.mjs` validates source parsing, original purchase IDs, all seven languages, query/sort/page forwarding, image order, legacy routes, errors, sitemap and editorial navigation. Tests are dependency-free. Public source pages were also fetched to verify the parser against the production HTML, including keyword search with ascending prices.

`node maintenance/refresh-home.mjs` refreshes static fallback cards and shared editorial chrome. `python maintenance/build-image-index.py` refreshes the visual index, reusing unchanged source-image fingerprints. It needs Python, Pillow, curl and public network access. Cache/checkpoint files are ignored.

No browser automation capability was available for visual or interactive browser QA in this environment; source, routing and runtime checks are reported separately from a browser test.
