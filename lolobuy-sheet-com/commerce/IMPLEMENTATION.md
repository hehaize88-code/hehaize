# LoloBuy catalogue integration — 2026-10-12

Production remains `hehaize88-code/hehaize`, `main`, `lolobuy-sheet-com/`.
Use the existing GitHub deployment integration. No direct Cloudflare changes.

## Functionality

The top-left registration action opens exactly https://www.lolobuy.com/index.
The adjacent logo returns home. All editorial and catalogue pages share seven
navigation destinations, the official logo, official icon and five languages:
English, Spanish, German, French and Italian.

Catalogue lists, keyword/source-ID search, category filtering, latest/popularity/
ascending-price sorting, pagination, USD prices, original image order and related
products read the public cnbuycha.com project on request. Only public product
information is read. Upstream failures return a 503; missing products return 404.

The purchase URL is formed from the original Weidian link's itemID, not its local
catalogue number. Example: catalogue /other-stuff/3459.html contains Weidian
7874413518 and opens
https://www.lolobuy.com/productDetail/7874413518?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D7874413518

Public source code has no image-search API. The same source's 3,436 product
pictures are indexed using image fingerprints. Matching is performed on the
visitor's device and is explicitly labelled visual similarity. No uploaded image
leaves that device. The index is dated 2026-10-12; list/detail data remain live.
`python scripts/build-image-index.py` refreshes it; it reuses unchanged image
fingerprints and refuses incomplete refreshes below 95% coverage.

The homepage is an SEO landing page with four live product previews, local
keyword/image search, category links, four latest article previews and FAQ.
Existing articles/translations remain intact. This release adds no long-form
articles and does not claim to translate older English-only articles.

## SEO and research

No search-volume, difficulty, ranking or traffic figures were available; none
are claimed. Priorities follow observed search-result intent and the site's
actual tools:

| Priority | Query group | Destination |
| --- | --- | --- |
| 1 | lolobuy spreadsheet, lolobuy spreadsheet 2026 | Homepage |
| 1 | lolobuy finds, lolobuy shoes spreadsheet, lolobuy hoodies | Catalogue/categories |
| 1 | lolobuy QC photos, lolobuy QC | Product galleries and QC guide |
| 2 | lolobuy image search, lolobuy Weidian links | Image search and product details |
| 2 | how to use lolobuy, lolobuy shipping cost | Existing buying/shipping guides |

Sources inspected on 2026-10-12:
- https://www.lolobuy.com/index — public application and registration entry.
- Official frontend `/assets/index-e15fbb0a.js` — brand asset references.
- https://www.lolobuy.com/assets/iconLolobuyLogo-1b346e9f.svg — original logo.
- https://www.lolobuy.com/loloBuyIcon.png — original browser icon.
- https://lolobuyspreadsheets.com/en — competitor search, category and QC positioning.
- https://lolobuyspread.com/ — competitor spreadsheet/finds/Weidian/QC/shipping positioning.
- https://lolobuysheets.com/ — competitor spreadsheet, source-link and category intent.
- https://cnbuycha.com/AllProducts/ and /other-stuff/3459.html — live data contract.

Source data and prices are not represented as verified stock or a delivered-price
quote. Existing independent-site disclosure remains in all five languages.
Search, alternate sorts, pagination and image search are noindex,follow. Clean
catalogue and detail routes use canonical and reciprocal hreflang/x-default.
`sitemap.xml` remains the submission URL and now indexes editorial and catalogue
sitemaps. The existing GA4 measurement ID G-QY8MM7VZV2 is preserved.

## Build and verification

`npm run build:pages` builds the application, runs the editorial regression suite
and assembles the Pages Worker. Copy the `dist/client/` artifact into this project
root and commit both source and generated assets. `node --test tests/catalog.test.mjs`
checks original IDs, source gallery order, filters, sorting, locale, error responses
and the image index. The Pages Worker additionally needs runtime route smoke checks.

Browser automation is unavailable in this environment. No browser-interaction or
visual screenshot test is claimed; runtime HTML, routing and assets are verified.
