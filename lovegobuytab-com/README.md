# lovegobuytab.com

Independent LoveGoBuy product directory. Preview project, built with Astro 7.4.2 SSR and a standard Fetch Worker adapter. Source is intended for `hehaize88-code/hehaize/lovegobuytab-com/`. GitHub stores source; the SSR build needs a Worker-compatible runtime, not plain GitHub Pages.

## Development

Node >=22.23.4, `npm ci`, `npm run dev`. `npm run check:content` verifies 24 complete locale resources, 10 full articles per locale, 36 FAQs per locale and matching paragraph/bullet counts. `npm run build` runs this required check, builds Astro, and bundles `dist/server/index.js`. Static assets are in `dist/client/`.

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

The keyword research is qualitative search-intent research; no invented search-volume figures. Platform facts link to official sources, checked 2026-10-22. Practical shopping checklists are independent editorial advice. See `docs/research.md` and `docs/brand-assets.md`.

## Routes

- `/`: SEO landing page for LoveGoBuy spreadsheet
- `/spreadsheet/` and `/spreadsheet/{source-category}/`: source-backed catalog
- `/products/{source-category}/{catalog-id}/`: product details and verified purchase link
- `/faq/`: searchable 36-question source-linked FAQ
- `/articles/`: 10-article index
- `/articles/{slug}/`: complete editorial page with contents and sources
- `/sitemap.xml`: editorial routes and hreflang; a source-driven split product sitemap remains a production follow-up

## Preview and production boundary

Public review URL: https://lovegobuytab-preview.hehaize88.chatgpt.site

The initial preview host is blocked by its security layer for the user. A separate Cloudflare Workers preview is being prepared from the existing `preview/lovegobuytab-com` branch, without custom-domain routes. Build with `SITE_URL=https://lovegobuytab-preview.hehaize88.workers.dev npm run build`, then deploy with `npx --yes wrangler@4.151.3 deploy --config wrangler.preview.jsonc`. The root directory in Workers Builds is `lovegobuytab-com`. All non-production origins remain noindex and blocked in robots.txt. This preview does not bind the purchased domain.

The purchased domain has **not** been bound. Preview metadata uses the preview origin and all preview pages are noindex. Before production, set `SITE_URL=https://lovegobuytab.com` at build time, configure the chosen Worker runtime and custom-domain DNS, then validate live source fetches, source image access and indexing rules again. Do not point production DNS before the user approves this preview.

The `.openai/hosting.json` identity belongs to the isolated public preview. No database or storage bindings are required. Do not create another preview project when this ID exists.

## Operational notes

The source HTML adapter intentionally fails visibly if selectors or upstream access change. Watch source availability and parsing after upstream updates. The development preview host may have different outbound-network access from the deployed Worker; direct bundled-Worker integration checks are also recorded in `docs/validation.md`.

Article text and FAQ translations are complete machine-assisted editorial translations; a native-language editorial review is a sensible later quality pass. No claims of official affiliation, item authenticity, tested sellers, fixed shipping rates or guaranteed refunds are made.
