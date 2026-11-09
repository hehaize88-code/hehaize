# KameyMall Sheet

Source and ready-to-serve Cloudflare Pages bundle for `kameymall-sheet.com`.

The site includes:

- a compact KameyMall spreadsheet and finds homepage;
- thirty checked product entries across ten categories;
- thirty independent product detail pages and ten internal category pages;
- eight featured finds on the compact homepage and the full catalog on Finds;
- independent How to Buy, Guides, SEO Articles, and FAQ pages;
- twenty-six researched long-form articles in all six languages;
- English, German, French, Spanish, Italian, and Polish routes;
- Product, Breadcrumb, and ItemList structured data;
- thirty self-hosted product lead images with explicit dimensions and lazy loading outside the first viewport;
- production canonical URLs, hreflang signals, robots directives, and a 456-URL XML sitemap;
- a compact mobile layout with no horizontal scrolling.

## Link policy

Clickable external links in the rendered site are restricted to `www.cnbuycha.com`. The destination brand name is not shown in visible site copy. Internal links remain on `kameymall-sheet.com`.

## Cloudflare Pages

The committed directory root contains a ready-to-serve Pages bundle:

- `_worker.js` handles application routes;
- `assets/` contains versioned JavaScript, CSS, and local fonts;
- `sitemap.xml`, `sitemap.txt`, and `robots.txt` are served as static crawler files;
- the remaining root images are public site assets.

The source images are listed in `scripts/product-image-sources.json`. `npm run build` verifies that all thirty local copies exist before packaging; use `npm run sync:product-images:refresh` only when intentionally refreshing the catalog images from their checked source URLs.

Use `kameymall-sheet-com` as the Cloudflare Pages root directory. The committed bundle does not require a build command or a separate output directory.

## Development

Requires Node.js 22.13 or later.

```sh
npm run install:ci
npm run dev
```

Validation and packaging:

```sh
npm test
npm run build:pages
```


## November 9, 2026 editorial update

The original routes remain available. Each locale now has 26 articles and 20 FAQ entries.

New routes (also under `/de`, `/fr`, `/es`, `/it`, `/pl`):

- `/articles/kameymall-shipping-to-uk`
- `/articles/kameymall-tshirt-finds`

The spreadsheet quick-start guide explains filtering and record comparison. The full
spreadsheet guide and link-recovery article include worked examples. Homepage and
category/guide/FAQ descriptions were revised in every locale. Article navigation now
includes QC, shipping, a collapsible contents list and contextual internal links.

The UK guide does not assert that current KameyMall routes or tariffs were verified.
The public calculator and tutorial could not be retrieved reliably on the review date.
Product amounts retain their September 1, 2026 catalog-check date; they are not new
live quotations. Publication dates of existing articles were preserved.

Reviewed writing inputs are in `content/november/`. Regenerate the article payload with
`python scripts/apply-november-content.py`; the operation is idempotent. The site retains
its existing catalog destination and GA4 measurement ID. No database is configured.

Validation uses `npm run build:pages` and `node --test tests/rendered-html.test.mjs`.
To run the broader TypeScript check, first generate local runtime types after building:

```sh
mkdir -p work
npx wrangler types work/runtime.d.ts --config dist/server/wrangler.json --include-env false
npx tsc --noEmit
```

The Pages bundle uses versioned assets under `assets/v20261109-1/` and canonical
HTTP/www redirects preserve path and query with status 308.
