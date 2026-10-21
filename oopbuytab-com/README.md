# OOPBuy Tab

Astro 7.4.1 source for **oopbuytab.com**. Current public review site:
https://hehaize88-code.github.io/hehaize/oopbuytab-com/

## Repository and hosting

The dedicated source folder is `oopbuytab-com/` in `hehaize88-code/hehaize`, branch `oopbuytab-preview`. GitHub Pages publishes `/docs`; generated pages live in `docs/oopbuytab-com/`. Other platform folders and `main` remain unchanged. The purchased domain is not bound. Preview pages remain noindex/nofollow, with robots Disallow.

## CNBuyCha is the only product source

The SSR adapter reads https://cnbuycha.com at request time. For the GitHub Pages review, the build reads the same source and renders static HTML: full catalog pagination, categories, new/popular/price ordering, and shared 20-item HTML fragments. There is no product database, product JSON index, or admin interface. Images use exact source-returned CNBuyCha/Weidian CDN URLs. No invented product images or records are used.

Static preview search opens the live CNBuyCha search, and unexported product details open the source. The sample detail `/products/shoes/3470.html` is included in every locale. Source catalog ID 3470 and seller item ID 7876894732 are distinct.

Product photos are not verified order QC. Image search has no verified source endpoint and is explicitly unavailable.

## Branding and links

- Official OOPBuy logo and favicon are used unmodified.
- Registration: https://oopbuy.com/login
- Weidian purchase pattern: `https://oopbuy.com/product/weidian/{sellerItemId}?inviteCode=U68CWQBN5`
- The seller item ID is read from the original seller URL, never inferred from the catalog ID.

## Editorial and localization

24 locales share stable paths; English is at root. Language switching preserves the current route and valid page/sort parameters. Each locale has 28 sourced FAQs, 10 complete long-form articles, 3 focused guide overviews and 11 category introductions. Policy facts derive from official OOPBuy help; keyword intent and competing pages are documented in `docs/KEYWORD_RESEARCH.md` and `docs/OFFICIAL_SOURCES.md`. No unverified search volume or service guarantee is claimed.

Mobile layouts preserve the full content using expandable article sections, a compact contents list and FAQ search.

## Build

Use Node 24 (catalog builder imports TypeScript using Node type stripping).

```sh
npm ci
npm run dev
npm run check:content
npm run preview:pages
```

`preview:pages` validates all language content, fetches the catalog, builds Astro, exports the Pages output and checks all rendered routes and catalog pages. The catalog must be regenerated when updating source listings. The visible review notice shows its actual build date. No automatic refresh job is enabled.

For a layout-only rebuild after a successful, current catalog fetch:

```sh
npm run build
node scripts/export-pages-preview.mjs
npm run check:preview
```

`PREVIEW_LOCALES=en` limits a local QA export; omit it for publication. All 24 locales are required before publishing.

The custom Astro adapter still emits a Worker default fetch export at `dist/server/index.js`, with assets in `dist/client`. No runtime secrets or database bindings are needed. Production host and domain activation will follow the user's review; Cloudflare is not part of this preview workflow.

See `PROJECT_MEMORY.md` for decisions, constraints, and deployment evidence.
