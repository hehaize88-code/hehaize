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
