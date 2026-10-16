# Hubbuy search growth release — 16 October 2026

## Evidence and limits

The owner supplied GSC, Bing Webmaster Tools and GA4 screenshots. GSC Wizard returned `payment_required`; the authorized connected-browser fallback failed with a closed session. This release uses those screenshots and public competitor research, not an invented live account export or keyword-volume estimate.

- GSC, 28 days shown through 13 October: 672 clicks, 2,505 impressions, 26.8% CTR, average position 5.4. `planilha hubbuy`, `hubbuy planilha` and `planilhas hubbuy` account for 378 clicks (56.25% of the total). Their established Portuguese URLs are preserved.
- GSC opportunities: `planilha hubbuy nike` 7 clicks / 49 impressions; `hubbuy spreadsheet` 3 / 58; `hubbuy` 2 / 138. Brand-only queries also have navigational intent, so this independent site is not presented as the official account portal.
- Bing, 30-day overview: 38 clicks, approximately 1.5K impressions and 2.57% CTR. The web-query table includes product-link search, warehouse photos, chains and box-strength questions. The table and overview use different search-type scopes; their totals must not be forced to match.
- GA4 hostname-filter screenshots show Brazil as the largest listed audience (633 active users) and 332 mobile users (44.7%). The exact filter value is truncated in the image. Other reports show unrelated site titles, so their 2,794 views and 1,309 active users are not attributed solely to this domain. Zero key events or revenue does not establish that there were no orders.

Public intent comparisons: https://hubbuypicklist.com/pt/ (name/link/image discovery), https://hubbuy-spreadsheet.com/guides/ (QC, sizes, links and weight) and https://qcradar.com/pt/hubbuy-spreadsheet (Portuguese planilha/category structure). These are qualitative topic observations; no competitor traffic or search-volume numbers are claimed.

## Content and language coverage

Every new or revised topic in this release has complete EN, PT-BR and DE coverage. Existing articles outside this release retain their prior language scope.

| Topic | Action | Query intent |
| --- | --- | --- |
| `hubbuy-image-search-find-product-links` | New, three full language versions | Hubbuy image search; pesquisar por imagem no Hubbuy; Hubbuy Bildersuche |
| `hubbuy-clothing-accessories-spreadsheet` | New, three full language versions | Clothing/accessories spreadsheet; planilha roupas; correntes; clothing measurements |
| `como-pesquisar-no-hubbuy-produtos-lojas-links` | Rewritten PT-BR; full EN and DE added at the same slug | Product name, link and original-ID search |
| `planilha-hubbuy-tenis-nike-golden-goose-qc` | Rewritten PT-BR; full EN and DE added at the same slug | Planilha Hubbuy Nike, shoe links, sizing and QC |
| `hubbuy-qc-photos-guide` | Added a direct answer in all three languages | Does Hubbuy send warehouse photos? |
| `hubbuy-warehouse-storage-consolidation` | Added an arrival checklist in all three languages | What to check at the Hubbuy warehouse |
| `hubbuy-shipping-cost-guide` | Added a packing answer in all three languages | Box strength, protection and comparable shipping quotes |

The homepage and article index expose localized titles and excerpts for the four primary guides. New bodies keep sections as direct children of the article so the existing mobile accordion can shorten the initial view without deleting crawlable text. Canonicals, reciprocal language alternates and sitemap dates cover all variants. The new content distinguishes catalogue reference images from order-specific QC and visual similarity from product identity. No invented stock, authenticity, shipping-time or price claims are used.

## Measurement change

One domain-checked initializer now serves static and dynamic pages. The duplicate layout/postprocessing initializers are removed. GA configuration runs once per document; an explicit second `page_view` is not emitted. Google documentation: https://developers.google.com/analytics/devguides/collection/ga4/views?technology=websites .

Custom events:

- `hubbuy_product_click`: original product ID and destination domain.
- `hubbuy_signup_click`: click to the official signup entry, not completed registration.
- `catalog_product_click`, `article_internal_click`: internal destination paths.
- `site_search_submit`: text, link or product-ID method, without the raw query in this custom event.
- `image_search_open`, `image_search_complete`, `image_search_error`: outcome/count or coarse error type, never image files or filenames.
- `catalog_sort`: an actual sorting-control click; pagination is excluded.

All custom events include content language and current path. Product clicks are not recorded as purchases. No account-level GA4 settings, key-event definitions, GSC settings or Bing submissions have been changed. If this GA4 property is intentionally shared, compare reports using an exact hostname filter for `hubbuy-sheet.com` (and `www.hubbuy-sheet.com` if used). This code prevents its own initializer on other hosts; it cannot stop independent code on other domains from using the same measurement ID. Report-filter documentation: https://support.google.com/analytics/answer/11377859 .

## Review after release

Use the same 28-day window, hostname and country/device scopes when comparing results. Track clicks and impressions for each query cluster, CTR with average position, article-to-catalogue clicks, product outbound clicks and search outcomes by language. GSC and Bing updates depend on recrawling; publication is not proof of ranking or click growth.

Validation: `npm run build:pages`, `npm run validate:pages`, `node tests/commerce.mjs`, `node tests/analytics.mjs`, `node tests/growth.mjs`. The growth test checks 21 article/locale pages, complete translated sections, titles, dates, alternates and links. Visual browser QA remains unavailable because the connected browser session is closed and managed browser mounting previously failed. Publication uses the existing GitHub deployment; no Cloudflare account access.
