# Hubbuy catalogue experience

The public catalogue remains sourced from `cnbuycha.com`. There is no new database or paid API. The existing image-search descriptors and browser-only comparison are preserved.

## Product options and links

`GET /api/product-options?id=...` reads the public Weidian listing for a validated numeric item ID. It verifies the returned item identity and projects only option groups, image URLs, variant IDs, prices and availability. It does not expose the rest of the seller payload. Upstream results are cached for six hours; failures are not cached.

A style selection changes the main image. A complete style/size selection resolves the matching SKU and its CNY source price. The site's `style` and `option` query parameters restore that selection on reload and language changes. These are **our parameters**, not invented Weidian deep-link parameters.

Copying a selected reference includes the canonical Weidian URL plus the option labels and SKU. Weidian's verified public URL opens the item and does not preselect a SKU. The page explains this. The 12 optional buying-agent links import the same original item ID; users confirm the option, availability and final price on the destination platform.

Catalogue photos are not labelled as warehouse QC. No verified QC feed is available from the catalogue source, so the QC section has an honest empty state. Competitor/QQFinds QC images are not copied.

## Prices

`GET /api/exchange-rates` uses the free Frankfurter reference-rate API with a fixed 30-currency allowlist. Conversion is `amount / sourceRate * destinationRate`. The selected currency persists in browser storage and applies to catalogue cards, image-search results and product detail prices. The reference-rate date is shown. A failed rate request leaves prices in their original currency. Shipping, taxes and platform fees are excluded from these estimates.

## Languages and static pages

The 24 supported locales are defined in `public/assets/locale-core.mjs`. The build emits the same 31 articles and 18 other editorial routes for every locale. It translates rendered HTML and structured data, rewrites internal links, and emits reciprocal hreflang links. Localized static documents do not hydrate an English React tree over translated text.

The JSON dictionaries are generated offline, with native UI overrides and existing German/Portuguese copy preserved. `data/locale-manifest.json` records completeness and model/review provenance. Runtime pages load their dictionary from the site's own assets. Product names can preserve brands, model codes and seller labels.

`npm run build:pages` produces the Cloudflare Pages output, including one editorial and one catalogue sitemap per locale. `npm run validate:pages` verifies all static routes, metadata, schema, language alternatives and internal links. Run the `tests/*.mjs` checks after the build.
