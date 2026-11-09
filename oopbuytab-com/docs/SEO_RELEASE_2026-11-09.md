# OOPBuy Tab editorial release — 2026-11-09

## Scope and publication

Only `oopbuytab-com/` is changed. Publish through the existing main-branch Cloudflare Workers Builds integration after the full production gate passes. This document describes the prepared release; a Git commit alone is not proof of a successful deployment.

The previous 17 articles remain. Three full guides are added in all 24 locales, giving 20 articles per locale and 480 article pages. Five existing guides receive substantive changes in every locale. These are 72 new localized pages and 120 improved localized pages.

## Content and search intent

| New article | Primary intent | Distinct evidence and useful next step |
| --- | --- | --- |
| `/articles/oopbuy-hoodie-spreadsheet/` | OOPBuy hoodie spreadsheet, hoodie sizing | Three dated real directory examples, flat-measurement comparison, fabric questions, own-order QC and product links |
| `/articles/oopbuy-shoe-spreadsheet/` | OOPBuy shoe spreadsheet, shoe size chart | Three dated real directory examples, foot/insole/outsole distinctions, specific measurement requests and packing choices |
| `/articles/oopbuy-shipping-netherlands/` | OOPBuy shipping Netherlands, OOPBuy verzendkosten | A dated official estimator example with precise inputs, eligible-route checks, dimensional-weight illustration and tracking stages |

The keyword priorities combine first-party query evidence and public competitor intent research. No paid-tool search-volume, difficulty score, click forecast or guaranteed ranking is claimed. Public competitor pages reviewed included `https://opbsheet.com/`, `https://oopbuywithqc.com/` and `https://oopbuysheet.com/`. Their inventory counts, coupons and quality claims were not adopted.

Existing article improvements:

- Sizing: a repeatable 60 cm versus 57 cm flat-width comparison and the 2.54 cm/inch conversion.
- QC: where to find order photos, what to check when they are missing, and how to request a specific view.
- Warehouse: what submitting a parcel means; separate seller dispatch, warehouse intake and international collection.
- Shipping: an explicitly hypothetical dimensional-weight calculation, including a repacking comparison. The divisor is not represented as a universal route rule.
- Product links: a clearer troubleshooting title and opening that distinguish the directory record ID, seller product ID, selected variant and affiliate parameter.

## Dated public-source evidence

Reviewed on 2026-11-09 in the live public OOPBuy interface:

- Inspection information: `https://oopbuy.com/notice/details?id=1740664942636404738`.
- Customized logistics services: `https://oopbuy.com/notice/2062456211424555010` (the linked `details?id=` route resolves to the same notice). The official page still describes standard QC and optional specific measurement requests; inspection is not brand authentication or a fit guarantee.
- Beginner guide: `https://oopbuy.com/notice/details?id=1739829963819945985`. Rechecked purchasing, intake, parcel submission and separate international freight payment.
- Order and parcel status guide: `https://oopbuy.com/notice/details?id=1775409280679739393`. Rechecked the distinction between seller dispatch, warehouse intake and carrier collection.
- Parcel rehearsal: `https://oopbuy.com/notice/details?id=1958798026895589377`. Quote reliability depends on keeping the route and packing configuration unchanged.
- Official estimator: `https://oopbuy.com/estimation`. Destination Netherlands, ordinary clothing, 2,000 g, 30 × 20 × 15 cm, displayed currency USD. This is an illustrative parcel, not a real customer shipment or universally applicable tariff.

| Route | Before displayed coupon, USD | After displayed coupon, USD | Card estimate, business days |
| --- | ---: | ---: | --- |
| STF-DHL-NL-1 | 52.31 | 43.02 | 8–16 |
| ZTF-DHL-NL-1 | 52.48 | 42.81 | 10–16 |
| DSF-DHL-NL-1 | 56.89 | 47.43 | 8–12 |

The article distinguishes displayed promotions from eligibility, freight from landed cost, and estimates from delivery guarantees. Route details can impose address restrictions; inconsistent labels need clarification rather than an invented universal rule.

The live catalog showed these item-price estimates in USD, excluding delivery and service fees:

| Local product URL | Listing title | Price |
| --- | --- | ---: |
| `/products/hoodies-sweaters/3483.html` | YOR SPORT OK Print Hoodie | 27.78 |
| `/products/hoodies-sweaters/3474.html` | Lacoste Hoodie | 30.69 |
| `/products/hoodies-sweaters/3274.html` | Knitwear Simple Loose Casual Sweater | 23.61 |
| `/products/shoes/3470.html` | Adidas XLG Runner Deluxe | 54.03 |
| `/products/shoes/3465.html` | Asics Gel-1130 × Hal Studios | 39.31 |
| `/products/shoes/3462.html` | NIKE AF1 | 60.83 |

The 3483 detail page was also opened and verified: title, USD 27.78 and seller item ID 7884573734. It was absent from the older URL-only sitemap snapshot, so that single verified path is added with separate provenance. The original full-catalog snapshot date/count remain unchanged. No product database, stock claim or QC provenance is invented.

## Navigation, measurement and indexing

All localized articles gain early links to the relevant catalog, QC and shipping. Hoodie and shoe examples link to their actual local product routes. Relevant category and guide pages link back to the appropriate articles. The article index explicitly displays its count. Compact mobile sections preserve all text; tables remain horizontally scrollable.

The existing GA4 measurement ID is retained. New `article_qc_click` and `article_shipping_click` intent events distinguish the help destinations directly in the event report; product examples use the existing product-detail event with article context. Events do not claim purchases and do not send search text or order details. GA4 property administration is unchanged.

Canonical paths, all 24 reciprocal locale alternates and x-default remain consistent. The core sitemap expands from 864 to 936 URLs; the 24 product maps each contain 3,457 paths after the single verified addition. Dates change only for articles with revised editorial content and other materially updated entry pages.

Successful publication, sitemap inclusion and a live HTTP response are not proof of search-engine indexing or increased traffic. Evaluate recovery after new crawl data is available.

## Release gate

Run `npm run build:production`. It validates all 24 locale assets, full paragraphs, policy/example numbers, table values, official sources, related routes, product destinations and analytics. It then builds the Worker and renders all 480 articles, 24 indexes and all 25 sitemap endpoints, checks canonical/hreflang/schema, redirects, missing routes and static-homepage behavior during a product-source outage.
