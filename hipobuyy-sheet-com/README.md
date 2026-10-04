# Hipobuyy Sheet — production static site

Production: https://hipobuyy-sheet.com/en/

The source and generated output live in `hehaize88-code/hehaize`, in this `hipobuyy-sheet-com` directory. Publish through the existing GitHub → Cloudflare Pages integration. The separate Sites review copy is not the production deployment target.

## Build

```sh
python3 build.py
```

The committed `dist/` is ready to serve. Keep the existing project root `hipobuyy-sheet-com` and output directory `dist`. Hosts that regenerate the site require Python 3.12 or later. No external Python packages are needed for the build.

`content/editorial.json` is the article catalog and metadata source. Each of its 22 slugs must have an entry and a full Markdown file for EN, DE, ES, FR and IT. `editorial_components.py` supplies related links, dated product examples and the localized calculator. `dist/assets/site.css` and `site.js` are maintained assets and are preserved by the build.

## Search and measurement

- 150 localized URLs in `dist/sitemap.xml`: 8 route groups plus 22 article groups, each in five languages.
- Every localized page has a self canonical and reciprocal five-language plus x-default hreflang. The root redirects to `/en/` and is excluded from the sitemap.
- Language switching preserves the article slug; homepage cards feature the four new topics.
- Article dates and images come from the editorial catalog; the visible article content matches its JSON-LD.
- GA4 measurement ID remains `G-F6G27KWPPQ`, active only on the production domain and its www alias. New events: `outbound_product_click`, `outbound_category_click`, `article_open`, `catalog_search_submit`, `shipping_estimate_calculated`. Search text and calculator values are not transmitted by these events.
- The calculator uses user-entered dimensions, divisor, billing basis, rounding and optional linear USD pricing. It has no live tariff connection and does not replace the actual parcel quote.

Product data, catalog images and existing `cnbuycha.com` destinations are preserved. Product prices in editorial examples are explicitly dated 23 September 2026. The site does not represent listing images as warehouse QC or claim product tests that have not been performed.

Cloudflare Pages `_redirects` does not support hostname matching. The www alias uses the non-www canonical; a hostname-level 301 requires a separate edge configuration. Do not insert an unsupported absolute-source rule into `_redirects`.

Research, constraints and release notes are recorded in `PROJECT_MEMORY.md`.
