# LoloBuy Sheet

Source and Cloudflare Pages deployment bundle for `lolobuy-sheet.net`.

The site is an independent multilingual product-discovery and research
website with:

- internal product and category pages using catalog data from `cnbuycha.com`;
- LoloBuy spreadsheet, QC, shipping, and ordering guides;
- 27 long-form articles in each of English, Spanish, German, French and Italian;
- a fact-based FAQ;
- English, Spanish, German, French, and Italian content and interface translations;
- responsive desktop and compact mobile layouts;
- robots and XML sitemap routes.

## Link policy

Guides, search, categories and product details remain on `lolobuy-sheet.net`.
Registration and purchase buttons lead to `www.lolobuy.com`, preserving the
original Weidian item ID. Catalog data and product images come from `cnbuycha.com`.

## Cloudflare Pages

The committed root contains a ready-to-serve Pages bundle:

- `_worker.js` handles application routes;
- `assets/` contains versioned JavaScript, CSS, and local fonts;
- `products/` contains the matched product images;
- the remaining root images are public site assets.

Use `lolobuy-sheet-net` as the Pages root directory. The committed bundle does
not require a Cloudflare build command or a separate output directory.

## Development

Requires Node.js 22.13 or later.

```sh
npm run install:ci
npm run dev
```

Validation and packaging:

```sh
npm run build:pages
npm run test:catalog
npm run test:pages
node --test tests/seo-growth.test.mjs
```

The release checks above exercise the current internal catalog and multilingual
SEO routes. Some older assertions in `tests/rendered-html.test.mjs` still describe
the previous external catalog flow.
