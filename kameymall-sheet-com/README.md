# KameyMall Sheet

Source and ready-to-serve Cloudflare Pages bundle for `kameymall-sheet.com`.

The site includes:

- a compact KameyMall spreadsheet and finds homepage;
- five verified product links and ten matching category destinations;
- independent How to Buy, Guides, SEO Articles, and FAQ pages;
- three fact-checked long-form SEO articles;
- English, German, French, Spanish, Italian, and Polish routes;
- production canonical URLs, hreflang signals, robots directives, and a 78-URL XML sitemap;
- a compact mobile layout with no horizontal scrolling.

## Link policy

Clickable external links in the rendered site are restricted to `www.cnbuycha.com`. The destination brand name is not shown in visible site copy. Internal links remain on `kameymall-sheet.com`.

## Cloudflare Pages

The committed directory root contains a ready-to-serve Pages bundle:

- `_worker.js` handles application routes;
- `assets/` contains versioned JavaScript, CSS, and local fonts;
- `sitemap.xml`, `sitemap.txt`, and `robots.txt` are served as static crawler files;
- the remaining root images are public site assets.

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
