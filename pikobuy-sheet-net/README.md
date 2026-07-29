# PikoBuy Sheet

Source and Cloudflare Pages deployment bundle for `pikobuy-sheet.net`.

The site is an independent product-discovery and research website with:

- product and category paths connected to `www.cnbuycha.com`;
- keyword search that opens matching results on the main catalogue;
- PikoBuy spreadsheet, QC, shipping and six-step ordering guides;
- three fact-checked long-form SEO articles;
- a 12-question FAQ;
- English, German, French, Spanish, Italian, Polish and Portuguese pages;
- responsive desktop and compact mobile layouts;
- canonical URLs, language alternates, robots and XML sitemap routes.

## Link policy

Product, category and search destinations lead to `www.cnbuycha.com`. Internal
navigation remains on `pikobuy-sheet.net`.

## Cloudflare Pages

The committed project root contains a ready-to-serve Pages bundle after running
`npm run build:pages`:

- `_worker.js` handles application routes and locale-aware HTML;
- `assets/` contains versioned JavaScript, CSS and local font files;
- root image files contain the PikoBuy Sheet brand assets.

Use `pikobuy-sheet-net` as the Pages root directory. When the generated bundle
is committed, no Cloudflare build command or separate output directory is
required.

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
