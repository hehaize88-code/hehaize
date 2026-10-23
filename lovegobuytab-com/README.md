# lovegobuytab.com

Independent LoveGoBuy product directory. Built with Astro 7.4.2 SSR and a standard Fetch Worker adapter. Source is intended for `hehaize88-code/hehaize/lovegobuytab-com/`. GitHub stores source; the SSR build needs a Worker-compatible runtime, not plain GitHub Pages.

## Development

Node >=22.23.4, `npm ci`, `npm run dev`. `npm run check:content` verifies 24 complete locale resources, 13 full articles per locale, 36 FAQs per locale and matching paragraphs, tables, bullets and related links. `npm run build` runs this required check, builds Astro, and bundles `dist/server/index.js`. Static assets are in `dist/client/`. After building, run `node scripts/check-editorial-routes.mjs` and `node scripts/check-interaction-events.mjs` for complete localized article rendering, sitemap and analytics checks.

## Data contract

- All catalog information comes from https://cnbuycha.com public HTML. No product database, secondary inventory, admin interface or external catalog.
- Search `q`, sorting `sort=new|click|price`, categories and pagination remain source operations. Source pages contain 60 records; the directory renders 20 per page.
- An in-memory two-minute source response cache (up to 100 URLs) reduces duplicate reads. A previously successful response may be reused for at most 15 minutes on a transient source error. No product snapshots are written to disk or fabricated as fallbacks.
- Source images remain the exact CNBuyCha-returned URL from its own image paths or the observed Weidian image CDN. Prices from source HTML are already USD and are only formatted, never converted again.
- Internal catalog IDs and seller item IDs are separate. `/shoes/3470.html` supplies original Weidian ID `7876894732`.
- Purchase format: `https://www.lovegobuy.com/product?id={productId}&shop_type=weidian&invite_code=161CPG`. Only verified Weidian URLs are converted; unsupported platforms do not receive invented purchase links.
- Registration: https://www.lovegobuy.com/login/signup
- CNBuyCha has no verified image-search endpoint or verified warehouse-QC type in the inspected public HTML. Image search is explicitly unavailable. Product photos are not relabeled as order QC. The QC guide links to official platform information.

## Content and languages

`src/content/articles`, `faq`, and `copy` contain full versioned editorial resources. English at `/`; 23 other languages use their locale prefix. Article and product language switching preserves the same path and query. Product identity, images and price are shared across locales. Original seller titles remain unchanged to preserve model names and avoid inventing translated attributes.

The keyword research is qualitative search-intent research; no invented search-volume figures. Platform facts link to official sources, with review dates shown per source. The 2026-10-23 update adds parcel tracking, shipping stages and official-platform image-search guides in all 24 languages, and improves six existing guides with practical tables and examples. Practical shopping checklists are independent editorial advice. See `docs/research.md` and `docs/brand-assets.md`.

## Routes

- `/`: SEO landing page for LoveGoBuy spreadsheet
- `/spreadsheet/` and `/spreadsheet/{source-category}/`: source-backed catalog
- `/products/{source-category}/{catalog-id}/`: product details and verified purchase link
- `/faq/`: searchable 36-question source-linked FAQ
- `/articles/`: 13-article index
- `/articles/{slug}/`: complete editorial page with contents and sources
- `/sitemap.xml`: live index of editorial, category and product sitemaps. Each product shard reads one real CNBuyCha listing page (60 products), then emits 24 locale URLs with hreflang. No product index/database is stored. Upstream failures return 503 rather than an empty success response.

## Preview and production boundary

Public review URL: https://lovegobuytab-preview.hehaize88.workers.dev

The initial chatgpt.site preview host is blocked by its security layer for the user. The replacement Cloudflare Workers preview has been published from the existing `preview/lovegobuytab-com` branch, without custom-domain routes. Build with `SITE_URL=https://lovegobuytab-preview.hehaize88.workers.dev npm run build`, then deploy with `npx --yes wrangler@4.151.3 deploy --config wrangler.preview.jsonc`. The root directory in Workers Builds is `lovegobuytab-com`, with watch paths limited to `lovegobuytab-com/**`. Node is pinned in `.node-version`. All non-production origins remain noindex and blocked in robots.txt. This preview does not bind the purchased domain. See `docs/validation.md` for actual public-browser results.

## Production deployment

Production was authorized and successfully deployed on 2026-10-22 at https://lovegobuytab.com/. Both apex and www custom domains are connected; the GitHub-to-Cloudflare automatic build was verified. Deploy the `main` branch of `hehaize88-code/hehaize` with root directory `lovegobuytab-com`. Build command: `SITE_URL=https://lovegobuytab.com npm run build`. Deploy command: `npx --yes wrangler@4.151.3 deploy --config wrangler.jsonc`. The production Worker is `lovegobuytab-com`; only changes to `lovegobuytab-com/**` should trigger builds. Preview branch builds are disabled for this production Worker.

Use Cloudflare Worker Custom Domains for `lovegobuytab.com` and `www.lovegobuytab.com`; preserve other zone records. The application permanently redirects www to the HTTPS apex, retaining the path and query. Canonical and hreflang use the production origin. Indexing is determined by the request hostname: workers.dev and other preview hosts stay noindex even when they serve a production build. Search and sort variants also stay noindex. See PROJECT_MEMORY.md for the actual deployment and domain verification status.

The `.openai/hosting.json` identity belongs to the isolated public preview. No database or storage bindings are required. Do not create another preview project when this ID exists.

## Operational notes

Production GA4 includes `article_open`, `product_open`, `catalog_search`, `language_change`, `purchase_link_click` and `signup_click`. These describe interactions, not completed purchases or registrations. Search events send query length only, not the entered search text. The script adds no page views and is excluded from preview hosts. Event delivery still depends on the visitor's analytics availability; a passed implementation check does not establish actual reporting volume.

The source HTML adapter intentionally fails visibly if selectors or upstream access change. Watch source availability and parsing after upstream updates. The development preview host may have different outbound-network access from the deployed Worker; direct bundled-Worker integration checks are also recorded in `docs/validation.md`.

Article text and FAQ translations are complete machine-assisted editorial translations; a native-language editorial review is a sensible later quality pass. No claims of official affiliation, item authenticity, tested sellers, fixed shipping rates or guaranteed refunds are made.
