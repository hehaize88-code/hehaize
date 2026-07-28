# LoloBuy Sheet

Source and Cloudflare Pages deployment bundle for `lolobuy-sheet.net`.

The site is an independent English-language product-discovery and research
website with:

- product and category pages connected to `www.cnbuycha.com`;
- LoloBuy spreadsheet, QC, shipping, and ordering guides;
- three long-form SEO articles;
- a fact-based FAQ;
- English, Spanish, German, French, and Italian interface translations;
- responsive desktop and compact mobile layouts;
- robots and XML sitemap routes.

## Link policy

Clickable external links in the rendered site are restricted to
`www.cnbuycha.com`. Internal links remain on `lolobuy-sheet.net`.

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
npm test
npm run build:pages
```
