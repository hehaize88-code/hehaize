# Product experience — 2026-11-11

Production target: sugargootab.com; existing GitHub → Cloudflare Worker deployment.

- Preserve 24 locale routes, 19 articles per locale, 30 FAQs per locale and the existing 888 sitemap URLs.
- Product cards, detail headings, metadata and product schema use localized descriptive names. Brand/model identifiers remain recognizable. A shared descriptive-name glossary replaces unreliable legacy full-title translations on cards, details and visual-search results. Brand/model names are preserved and source marketing hashtags are removed.
- Detail layout: source gallery and zoom, source Weidian ID, 30 display currencies, Sugargoo purchase link, 12 alternative agents, source link copying, real Weidian style/size/SKU selection, scrollable thumbnails with mouse dragging.
- Styles come from the publicly visible Weidian listing and are validated against the requested original item ID. Missing/blocked options have an explicit retry/original-listing state. A copied SKU is supplementary text; no unverified Weidian variant URL parameters are invented.
- QC remains empty because the current source does not identify any gallery images as warehouse QC. Source product photos are shown separately.
- Free visual search covers 3,467/3,467 source catalogue images, refreshed 2026-11-11. It uses browser-local dHash and coarse image colour matching, supports upload/drop/paste, file validation, center crop, cancellation and low-confidence messaging. This is a similar-photo search, not general semantic or whole-web search. Uploaded photos never leave the visitor's device.
- Prices convert using Frankfurter public reference rates, with date attribution and a six-hour cache. Failed retrieval preserves original-currency prices. These are reference prices, excluding delivery and platform fees.

Validation: content checks; 504 editorial routes; existing redirect, sitemap, pagination, analytics and parcel tests; 48 new localized detail/search route checks; SKU identity and stock parsing; invalid API requests; FX validation; exact-descriptor image retrieval; production Worker dry run.

Sources inspected: https://oopbuylists.com/product/weidian/7506441136 ; https://oopbuylists.com/image-search ; https://cnbuycha.com/ ; https://weidian.com/item.html?itemID=7881713873 ; https://frankfurter.dev/ .
