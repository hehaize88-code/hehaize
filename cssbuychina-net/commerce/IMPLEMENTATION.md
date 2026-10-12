# CSSBuy catalogue integration — 2026-10-12

Production repository: `hehaize88-code/hehaize`, `main/cssbuychina-net`. Publish through the existing GitHub integration. Do not register a new Site or change domain hosting.

- Product lists, keyword/source-ID queries, `new` / `click` / `price` sorting and pagination read the public `https://cnbuycha.com` catalogue on request. No second product database or admin credentials.
- Full product galleries preserve the source main-photo order. The supplied images may include product and QC reference photos; they are not represented as the visitor's own warehouse inspection.
- The buy URL is `https://www.cssbuy.com/shop/goodsDetail?type=micro&id={sourceId}`. `sourceId` comes from the source product SKU. Do not substitute this site's row ID or a fixed sample ID.
- The upper-left brand/register link uses the user's exact `https://www.cssbuy.com/index` destination. Inspection on 2026-10-12 showed the official landing page with login/join entry points, not a standalone registration form.
- Official image URLs observed on that page: `https://assets.cssbuy.com/static/icon/logo.svg` and `https://assets.cssbuy.com/icon/css_192.png`. Both are referenced directly so the exact original branding is used.
- Image search uses only source-catalogue pictures. The source application has no image-search API. An on-device difference-hash and color-cell matcher uses the dated source index (3,435 items); this is visual similarity, not an exact-match or identity guarantee. Source updates appear immediately in catalogue reads; rebuilding the image index is separate. `scripts/build-image-index.py` is the rebuild utility. It requires public source network access, Python and Pillow.
- Preserved all four existing locales: English, German, Spanish, Brazilian Portuguese. Existing 22 articles and 3 guides remain available in all four languages. Home preview shows four articles.
- New `/catalog/` URLs are separate from editorial routes. Legacy listing, category and product paths redirect to their exact catalogue destinations. `/sitemap.xml` is now an index of `/editorial-sitemap.xml` and the live `/catalog-sitemap.xml`.
- Search results, alternate sorting and pagination have `noindex,follow`; clean category and product routes have canonical and reciprocal language links. Language changes preserve search/sort/page state.
- Existing analytics measurement ID is preserved. New registration, search and CSSBuy product-click events are included.

## Search intent research

No search-volume or difficulty figures were available. These priorities are based on observed SERP themes and official capabilities, not fabricated metrics.

| Priority | Query family | Destination |
| --- | --- | --- |
| 1 | cssbuy spreadsheet, cssbuy spreadsheet 2026 | Home |
| 1 | cssbuy finds, cssbuy shoes spreadsheet, cssbuy hoodies, cssbuy jerseys | Live categories |
| 1 | cssbuy QC photos, cssbuy QC | Product galleries and existing QC guide |
| 2 | cssbuy shipping calculator, cssbuy shipping cost | Existing weight calculator and parcel articles |
| 2 | how to use cssbuy, cssbuy Weidian links | Existing buying guide and product links |

Research sources, reviewed 2026-10-12:
- https://www.cssbuy.com/index — official current product-search, warehouse-QC and parcel workflow.
- https://new.cssbuy.com/estimates — official estimator inputs: weight, dimensions, product attributes and destination; line-specific volumetric divisors.
- https://cssbuywithqc.com/ — competitor emphasizes spreadsheet finds and QC photos.
- https://css-buy.com/ — competitor combines spreadsheet search, categories, sizing and QC research.
- https://cssbuysspreadsheet.com/ — competitor groups finds, shipping, comparisons and guides.

## Verification

Run `npm ci --ignore-scripts`, `npm run build:pages`, then `npm run test:release`. Public source fixtures are generated using the cnbuycha HTML renderer with test records, not copied private data. Tests check source ID integrity, price/image parsing, forwarding, error states, legacy redirects, all editorial translations and sitemap coverage. No local browser preview is available in this environment; do not report an interactive upload test as performed.
