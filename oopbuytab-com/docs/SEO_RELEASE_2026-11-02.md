# OOPBuy Tab editorial and navigation release — 2026-11-02

## Scope and rationale

This release updates only `oopbuytab-com/` and uses the existing GitHub main → Cloudflare Workers Builds deployment. It addresses weak article-to-catalog navigation and search intent gaps identified while reviewing first-party search/analytics reports and public competing pages. Private account reports and query exports are not included in this public repository. No traffic increase or indexing result is claimed by a successful deployment.

Four existing article URLs retain their identity and receive clearer search titles, descriptions, opening sections and comparison tables: sizing, QC photos, warehouse steps and shipping calculation. Their remaining full text and original publication dates are retained.

Three new complete articles are available in every one of the 24 existing languages:

| Stable article path | Intent | Practical addition |
| --- | --- | --- |
| `/articles/oopbuy-jackets-guide/` | OOPBuy jackets / jacket spreadsheet / jacket sizing | Measurement, layering, construction and packed-volume comparison worksheet; direct jacket-category links |
| `/articles/oopbuy-football-jersey-guide/` | OOPBuy football jersey spreadsheet / jersey sizing / printing and QC | Selected variant, cut, printing, measurements and order-photo checks; direct jersey-category links |
| `/articles/oopbuy-shipping-uk/` | OOPBuy shipping to UK / UK shipping cost / UK tracking | Dated official route examples with exact inputs, discount caveats, postcode limitations and parcel worksheet |

Keyword combinations describe page intent; they are not fabricated search-volume or difficulty estimates. Each language has 17 articles (408 article URLs). This release adds 72 and updates 96 article URLs.

## Official UK estimate evidence

Checked on 2026-11-02 using the official public estimator at https://oopbuy.com/estimation. The public frontend calls `POST https://webapi.oopbuy.com/logistics/estimate/international2` with `lang: en_US`, `currency: GBP` and:

```json
{"categoryList":["CLOTHING_ACCESSORIES_COMMON_GOODS"],"country":"GB","high":15,"length":30,"weight":2000,"width":20}
```

This represents ordinary unbranded clothing, 2000 g, 30 × 20 × 15 cm, United Kingdom, GBP.

| Route | Before displayed discount | After displayed discount | Estimated working days |
| --- | --- | --- | --- |
| SF-RoyalMail-GB-1 | £28.55 | £21.34 | 7–14 |
| ZD-Roymail-GB-1 | £28.86 | £21.62 | 8–16 |
| S-Remote-RoyalMail-GB-1 | £32.37 | £25.16 | 7–14 |

These examples returned `isCarriable: true` and `matchSizeLimit: true` at the check time. The first two exclude remote addresses. The third lists remote coverage including Scottish Highlands and islands, Isle of Man, Guernsey, Jersey, Northern Ireland and Isles of Scilly. The estimator has no postcode input, so it does not validate a particular address. Discount eligibility, final freight, availability and transit time remain subject to checkout and route conditions. These are international freight estimates, not total delivered purchase costs or guaranteed current prices. An unavailable cheaper route was excluded.

Other policy references were rechecked: inspection information (`1740664942636404738`), customized logistics services (`2062456211424555010`), beginner’s guide (`1739829963819945985`), parcel rehearsal (`1958798026895589377`) and order/parcel statuses (`1775409280679739393`), all under `https://oopbuy.com/notice/details?id=`. Existing storage text remains 90 free days, one 10 CNY extension for up to 30 additional days, maximum 120 total; custom QC prices are not invented. Photos and warehouse checks do not establish authenticity, specialist performance or guaranteed fit.

## Navigation and rendering

- Homepage exposes all 11 existing source categories, including jerseys.
- Jacket and jersey articles link to their localized categories near the summary and at the end. Category and product checklists link back to the relevant guide.
- Catalog titles, article introductions and source-link labels are localized across all 24 languages.
- Comparison tables are semantic, fully server rendered and contained in keyboard-focusable scroll regions on narrow screens.
- Mobile articles open the first section initially and preserve all paragraphs. Expand/collapse and section navigation remain available.
- Existing GA4 intent events cover the new category links. No duplicate analytics installation, purchase-event invention or sensitive query text is introduced.
- Temporary source failures retain the existing homepage fallback and add `Retry-After: 300` plus `Cache-Control: no-store` to 503 responses.

## Crawl and release contract

The core sitemap contains 864 canonical URLs (24 × 36), including all 408 article pages. Article `lastmod` follows actual editorial modification dates. The sitemap index retains 25 maps; the unchanged product path manifest contains 3,456 source paths per language (82,944 localized product URLs). Canonical, reciprocal language alternatives, structured data and existing parameter indexing rules remain in place.

`npm run build:production` is the release gate. It validates full content, numeric/source parity, comparison tables and related/category links, then renders all localized articles and article indexes, parses every sitemap, checks analytics, redirects, missing pages and source-outage behavior. Live deployment verification is recorded separately after publication.

Monitor settled GSC impressions/clicks/CTR by the revised page and query, Bing crawl/index progress, and GA4 organic landing sessions plus article-to-catalog/product intent events. Compare equal-length periods and allow for reporting lag. Publication does not resolve every possible cause of a sudden traffic decline and does not establish that search engines have indexed the new pages.

## Local validation result

The full production gate passed on 2026-11-02: 408 article renders, 24 indexes, all 25 sitemap maps, 864 core URLs and 82,944 product URLs. Worker size is 7,909,298 bytes (1,920,571 gzip). The source-preservation comparison passed all 24 locales. Browser QA covered desktop UK content and 390px English, German and Maltese layouts, complete article expansion/collapse and keyboard-scrolling comparison tables without body overflow. See `SEO_LOCAL_VERIFICATION_2026-11-02.json`.
