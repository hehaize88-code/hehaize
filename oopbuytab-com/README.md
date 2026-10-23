# OOPBuy Tab

Source for https://oopbuytab.com, in `hehaize88-code/hehaize/main/oopbuytab-com/`.

## Production

The existing Cloudflare Workers Builds integration watches `oopbuytab-com/**` on `main`. Its root is `oopbuytab-com`, build command is `npm run build:production`, deploy command is `npx wrangler deploy`, and Node version is 22.22.0. The Worker is `oopbuytab-com` and serves the apex and `www`; the latter redirects to the apex while preserving path and query.

Keep the existing npm 10-compatible lockfile. No new database, runtime secrets or DNS changes are required for an editorial update. Do not confuse the separate `oopbuytab-preview` GitHub Pages branch with production.

## Data and localization

CNBuyCha is the only product-data source. The runtime adapter reads the public catalog and detail pages. Images retain the exact source-returned URLs; prices are displayed in USD. The URL-only product-sitemap manifest is crawl-discovery metadata, not a product database or content snapshot. Product titles, prices and photos are not copied into it.

Twenty-four locales share stable paths: English is at the root, and other locales use `/<locale>/`. Locale switching retains the route and valid listing parameters. Every locale contains 28 sourced FAQs, 14 complete articles, 3 guide overviews and 11 category introductions. The existing 10 long-form guides are preserved; four focused guides cover payment, Germany, the USA and restricted goods. All changes must pass locale, paragraph, numeric and reference parity checks before publication.

Article pages include summaries, contents, contextual reading links and catalog actions. The mobile view preserves all paragraphs with expandable sections. The homepage shows four recent article cards.

## Build and validation

```sh
npm ci
npm run build:production
npm run check:release
```

`build:production` validates content and analytics events, builds Astro, packages a single Worker at `dist/cloudflare/worker.js`, then runs `check:release`. That final check renders all localized articles and indexes, checks canonical/hreflang/schema and paragraph coverage, parses every sitemap, and verifies redirects and missing routes.

For local preview, `npm run dev` serves a noindex development build. Legacy static Pages export scripts remain available for the existing review workflow; they are not the production publishing path.

## Sitemaps and analytics

- https://oopbuytab.com/sitemap.xml — index
- https://oopbuytab.com/sitemap-pages.xml — core and article pages
- https://oopbuytab.com/sitemap-products/en.xml — English product URLs; other locales use their language code

The sitemap endpoints do not call the source site at request time. Refresh the URL manifest deliberately with `node scripts/refresh-product-sitemap.mjs`, review its diff, verify product samples and rebuild.

Production uses the existing GA4 measurement ID `G-CC6HPXJJN7`. Custom events measure product/registration/estimator clicks, article navigation and searches. They do not report purchases. `catalog_search` reports only query length in its custom parameters. Preview builds do not load the analytics scripts.

Research and release rationale: `docs/SEO_RELEASE_2026-10-23.md`. Deployment records: `docs/PRODUCTION_DEPLOYMENT.md` and `PROJECT_MEMORY.md`.
