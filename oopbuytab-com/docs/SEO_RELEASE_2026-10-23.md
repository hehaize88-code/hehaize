# OOPBuy Tab SEO update — 2026-10-23

## Scope

Update only `oopbuytab-com/` in `hehaize88-code/hehaize`, keeping the existing GitHub-main-triggered production deployment. No new Cloudflare connection, project, database or dependency changes.

Four new complete guides across all 24 locales:

- `oopbuy-payment-methods`: payment methods, top-up, PayPal, fees, failed/pending payments.
- `oopbuy-shipping-germany`: Germany destination, dated route comparison, remote addresses, delivery stages.
- `oopbuy-shipping-usa`: USA estimate, ZIP-code restrictions, timing discrepancies, tracking.
- `oopbuy-shipping-restrictions`: batteries, liquids, perfume, accurate classification and pre-purchase checks.

Each focused guide has 6 sections, 18 paragraphs and 3 takeaways; English bodies contain 881–904 words. Existing long guides retain their 9-section / 1200-word minimum. Translations keep complete content, source URLs and policy numbers; there is no English fallback. All 14 article slugs are identical across locales. The homepage continues to show four latest articles.

Shipping, QC, fees and tracking articles receive intent-specific titles and descriptions. QC location/limits, payment-fee uncertainty and stalled-tracking diagnostics are rewritten. Shipping and fee guides link to the new country, restrictions and payment guides. Every article has a local catalog link and an official estimator link.

Prioritization uses competitor/search-intent research and the site's measured baseline; it does not claim measured keyword volume, confirmed national demand, future rankings or guaranteed click growth.

The earlier analytics sample was small and Search Console performance data was still processing. It did not establish Germany or the USA as leading markets. Bing data was not verified. Private analytics exports are not included in this release.

## Official source findings

- Payment notices `1740660085586235394` and `1775419828091813890` displayed inconsistent PayPal percentages. Articles direct readers to the current confirmation screen rather than asserting a universal fee.
- Visible shopping guidance `1772880724846247937` replaces the former hidden purchasing notice as the restriction reference in updated article source lists.
- Quotes were retrieved from the official public estimator on 2026-10-23: ordinary non-branded clothing, 2000 g, 30 × 20 × 15 cm. Germany in EUR; United States in USD. No account coupon or postcode supplied.
- Germany illustrative lines: BTF-DHL-DE-1, EUR 36.93 / displayed discounted EUR 28.33, 10–18 working days; BSF-DHL-DE-1, EUR 37.17 / EUR 28.56, 7–14 working days.
- USA illustrative line: DDF-GOFO-US-1, USD 60.27 / USD 44.80. Its timing fields conflicted (15–20 vs 8–16 working days), which is explicitly disclosed.
- ZD-UPS-US-HK's description excluded ZIP codes beginning 8 or 9 despite the generic country-level availability result. This is a route-specific snapshot, not a nationwide restriction.
- Estimator categories distinguish battery types and perfume volumes. Neither a selectable category nor a bottle below 100 ml proves universal acceptance.
- No customs tax threshold, fixed country delivery guarantee or universal battery limit is asserted.

Human source links are included with each localized article. Primary entry points: https://oopbuy.com/estimation and https://oopbuy.com/notice/details?id=1772880724846247937.

## Discovery and metadata

- Correct per-article publication/modification dates; Article and BreadcrumbList schemas.
- Local canonical and 24 locale alternates plus x-default remain consistent.
- Core sitemap: 792 URLs (24 × 33 pages), including 336 article URLs.
- Product sitemap: 24 language files, each 3456 paths, discovered from all 58 CNBuyCha catalog pages. Entries require a valid known category path, title, source image and numeric price. This is a URL-only discovery manifest, not a product database; catalog content and images remain live source reads.
- Root sitemap includes the core map and all product maps. Product maps omit invented modification dates. HTML pages supply their language alternates.
- `scripts/refresh-product-sitemap.mjs` refreshes the URL-only manifest deliberately, with low concurrency and completeness checks; production builds do not depend on crawling the source.
- Anonymous source HTML requests use short edge-cache TTLs (product details 300 seconds, other public catalog pages 60 seconds). Search requests and non-200 responses are excluded. This reduces repeated source fetches across locale variants; actual edge hit rates are not claimed from local tests. API semantics: https://developers.cloudflare.com/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties.
- A temporary source failure preserves the complete editorial homepage as indexable; unavailable catalog/detail responses remain 503/noindex. The release gate simulates this distinction.
- Sitemap inclusion does not guarantee crawl or indexing. Failed live-source pages remain noindex, and source availability still affects product pages.
- Eleven live product-detail samples, one per category, returned 200 with a self-canonical, main image and source-derived purchase link. This is sampling, not a claim that every product was individually revalidated.

## Measurement

Production keeps one GA4 installation and adds intent events: `product_outbound_click`, `registration_click`, `shipping_estimator_click`, `product_detail_click`, `article_catalog_click`, `article_related_click`, `catalog_search`. Locale and article context are attached. Custom search events include query length, not raw query text. Purchase completion is not claimed or emitted, and no new GA4 key-event configuration is assumed. Contextual links after article sections point to related localized guides, and click events use beacon transport.

## Release gates

`npm run build:production` runs content parity, analytics behavior, the production build, packaging and rendered release checks. The rendered check covers every article and language index, full paragraphs, canonical/hreflang, structured dates, analytics loading, internal calls to action, all sitemap counts, 404s and www redirects. Manual browser QA also checks compact mobile article/list rendering and disclosure expansion. Catalog smoke checks cover all 11 categories, source images, purchase links and 20-item pagination.
