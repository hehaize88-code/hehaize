# Litbuy Grid

Public preview: https://litbuygrid-preview.hehaize88.chatgpt.site
Production domain: litbuygrid.com
Production repository: https://github.com/hehaize88-code/hehaize
Production folder: litbuygrid-com

## Source boundary
All product records, prices, gallery URLs, marketplace links and buying-agent links are read from https://cnbuycha.com. No independent product database, admin panel, D1 or R2. HTML catalog and product detail responses read the source at request time. Public response caching is 60 seconds. A failed source fetch produces a localized 503/retry screen rather than invented products.

The official logo and favicon are byte-identical copies of https://litbuy.com/static/logo.png and https://litbuy.com/favicon-new.ico, embedded for reliable rendering.

## Product detail and languages
24 locale routes: en/de/fr/es/it/nl/pt/pl/ro/sv/zh/da/fi/el/cs/hu/bg/sk/hr/ja/ko/vi/th/id. Navigation, controls, errors and product type/descriptive phrases are localized. Brand/model names remain unchanged. Titles that cannot be translated confidently use a localized product type with the recognized brand/model; the full unmodified source title remains available in a disclosure. These are localized display names, not a claim of full natural-language translation of every original title.

Full source gallery, selectable thumbnail panel with vertical scroll/drag, original Weidian link and source-provided product-specific agent links. Homepage-only agent URLs are excluded. No SKU/style IDs or separately labelled QC collections were found in the source pages checked. The UI says so; it does not relabel seller galleries as warehouse QC or pretend the product URL is a style-specific URL.

## Currency
Client preference switches original USD amounts into USD/EUR/GBP/CNY/JPY/KRW/CAD/AUD/CHF/PLN/BRL using Frankfurter reference rates. /api/rates returns dated reference rates with a one-hour cache. These are estimates, not the agent checkout rate. Failure preserves USD and shows an error. No silently fabricated exchange rate.

## Image search
All images from the source product galleries are scanned, not only card thumbnails. Browser-side matching uses compact RGB features and gradient hashes. Uploads stay in the visitor's browser; no uploaded image storage. Search results retain the matching source image and gallery position. No semantic AI service is used, so arbitrary crops or completely different angles may not match accurately.

worker/assets.js contains only branding, client code and a rebuildable image-search feature cache derived from source data. It is not a product inventory or price database. The index reports its build date, source product total, indexed image total and missing-image count. New source images require a refreshed index build; ordinary catalog data remains live.

Rebuild preparation scripts under scripts/ use scratch /tmp/litcrawl and /tmp/litprints. Source HTML and downloaded image bytes are not shipped. The image cache must be rebuilt from the source sitemap before refreshing the derived feature asset. Honor source 429/Retry-After responses; the image fetcher backs off for at least 60 seconds. The crawler only fetches the public source sitemap's product URLs.

## Build / QA
npm run build; npm run validate.
node scripts/check.mjs runs the route/locale/real-source gallery checks (live source fixtures by default). LITBUY_TEST_FIXTURES may point to temporary downloaded detail.html, all.html and cnbuy.html for deterministic checks. scripts/dev.mjs includes a development-only 390px iframe wrapper at /__qa/mobile; it is not part of the deployed Worker.

The preview and workers.dev stay noindex. The production host litbuygrid.com is indexable and has 24 language sitemaps under /sitemap.xml. www and HTTP redirect with 308 to HTTPS non-www.

Cloudflare Workers Builds: root litbuygrid-com; build npm run build; deploy npx wrangler deploy. wrangler.jsonc declares the Worker without any database/storage bindings.

Mobile catalog pagination uses 12 cards per page; all source pages remain reachable. Content and menus use compact spacing and disclosure panels. Custom upload button follows site language; the OS file picker still follows the device language. UI translations reuse the account’s existing localization dictionary; unreliable bulk product-title translations were excluded. Brand/model identities are retained; product types are localized, with original titles available.
