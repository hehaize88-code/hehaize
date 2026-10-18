# Editorial validation

Validated: 2026-10-18

- Content: 24 locales, each with 30 FAQ, 10 complete articles and original source links.
- Two site-specific FAQ answers use site evidence; 28 platform/workflow answers cite official Sugargoo sources.
- Each article: 2 introduction paragraphs, 7 sections / 14 body paragraphs, 6 checklist items, sources and 2 related links. Tracking and payment articles include tables.
- JSON validation checks structural parity, source URLs, review date, untranslated body/intro/checklist/table cells and unexpectedly short content.
- Built SSR checks: 288 editorial routes return200, missing article returns404. Language, canonical, 25 hreflang tags, navigation, schema and same-article language switch targets verified.
- Browser: FAQ filtering and expansion; desktop article; mobile390px article and French FAQ; language switch retains article.
- Preview retains noindex; production domain is prepared only.

## English article word counts

Count includes introductions, headings, body paragraphs and checklist; tables and citations excluded.

- sugargoo-spreadsheet-guide: 1056
- how-to-buy-on-sugargoo: 1008
- sugargoo-qc-photos: 1041
- sugargoo-shipping-calculator: 1031
- sugargoo-rehearsal-shipping: 1058
- sugargoo-tracking: 960
- sugargoo-fees-payment: 974
- sugargoo-warehouse-storage: 1018
- sugargoo-returns-refunds: 1027
- weidian-taobao-links-sugargoo: 1032


## Production deployment — 2026-10-18

Cloudflare build e18fb9fd-418e-405e-b9e7-d790aa7b5989 succeeded for Git commit 454df18c067f29b39f5594f4cf6495faec76082c. Worker version e12b4eda-612e-464a-b270-1d6152f3593a serves both sugargootab.com and www.sugargootab.com.

Production anonymous HTTPS checks returned 200 for home, FAQ (30 entries), article index (10 cards), French guide, live product /products/shoes/3470.html (4 photos and correct buying link), keyword+price search (60 cards), robots, sitemap, logo and favicon. The www alias returned 308 preserving /fr/faq/?q=shipping. Diagnostic workers.dev returned noindex. User-browser homepage visual inspection and logo/hero image load checks passed.

The production sitemap has 672 unique content/category URLs. Existing 288 localized editorial route checks and all 24 content checks passed in Cloudflare's clean build. Native Worker startup was 23ms; gzip bundle 1029.39KiB.

Initial npm11 lockfile failed on Cloudflare npm10.9.2. Regeneration using npm10.9.2 plus clean npm ci fixed it. Local Wrangler emulation was unavailable because of the container interface-address system error; real Cloudflare deployment and HTTPS checks were used for runtime verification.
