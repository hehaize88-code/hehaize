# SugargooTab editorial and SEO release — 2026-10-21

This release implements the user's requested content and website improvements across all 24 existing languages. The production source remains `hehaize88-code/hehaize`, directory `sugargootab-com`, deployed by the existing Cloudflare main-branch build.

## Content decisions

- Extend the spreadsheet, QC, shipping calculator, rehearsal and marketplace-link guides with directly usable verification steps. Preserve existing full article bodies.
- Add three distinct guides: US shipping decisions; item-order status from payment to warehouse; and parcel consolidation/packing choices. Each English article contains more than 1,200 prose/checklist words, with complete equivalent sections, comparison tables and source links in the other languages.
- Do not publish inferred keyword volumes, fabricated product tests, guaranteed savings, delivery promises, current freight prices, customs thresholds, or universal policy numbers. Numerical examples are explicitly hypothetical.
- Use original explanatory prose and practical decision examples. Refer readers to the official sources linked within each article and to the current terms for their actual order.
- Translate all new reader-facing content, including titles, descriptions, table cells, source labels and catalogue actions. Keep route identifiers and source URLs stable.
- Keep original article publication dates separate from modification dates. FAQ review dates are unchanged.

## Technical changes

- Localized homepage titles, newest-first article index, and featured new guides on the homepage.
- Two localized catalogue actions in every article, with relevant guide links connecting order review, packing and shipping.
- Production-only GA4 events: `article_catalog_click`, `product_click`, `catalog_search`, `catalog_search_results`, `outbound_purchase_click`, `outbound_register_click`.
- Custom search events contain length buckets/result counts, not the entered query. Page-view configuration omits URL query strings. Outbound event payloads omit destination URLs and their affiliate parameters. These are navigation events, not purchase conversions.
- Narrow 308 repair for malformed category share links beginning with observed `&source=`, `&ss=` or `&ct=` suffixes. Supported categories/locales only; unknown paths retain 404. Legitimate query parameters are preserved.
- Sitemap expands to 744 URLs with 25 language alternatives per route. Maintained article/index dates produce 336 `lastmod` entries.
- Catalogue source, product titles/images, affiliate purchase/registration destinations and 16-product pagination are retained.

## Validation

Run `npm run check:content && npm run build && npm run check:routes` before deploying. Gates cover full language structure, 360 editorial routes, metadata, dates, language switches, catalogue actions, sitemap, malformed links, nonproduction analytics exclusion, search event payloads and existing pagination/source-boundary cases. Inspect the new article layout in a browser and verify production after the deployment completes.

`translation-source.json` preserves the bounded English source used for the 24-language update. Private analytics exports and account report data are not included in this repository.
