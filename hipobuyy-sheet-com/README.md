# Hipobuyy Sheet — review build

This directory contains the source and generated static output for the independent Hipobuyy Sheet review site.

- Current public review URL: https://hipobuyy-sheet-review.hehaize88.chatgpt.site/en/
- Intended future domain: hipobuyy-sheet.com (not connected here)
- Five locales: English, German, Spanish, French, Italian
- Each locale has 20 FAQ entries and 10 independent articles.

## Build

The generated static website is included in `dist/`. To regenerate it from `content/` and `products.json`:

```sh
python3 build.py
```

For a static host such as Cloudflare Pages, use this repository's `hipobuyy-sheet-com` directory as the project root, no build command if serving the committed output, and `dist` as the output directory. If regeneration is needed, use `python3 build.py` as the build command. This folder's presence in GitHub does not connect the domain or configure a host by itself.

## Review status

All generated HTML currently contains `noindex,nofollow` and references the review URL for hreflang and article metadata. This is intentional while the site is under review. Before connecting the intended domain and enabling Google indexing, update the site URL, canonical and sitemap/robots plan, then explicitly remove review-only indexing restrictions and verify the deployed pages. Product links and search target the corresponding pages on `cnbuycha.com`.

The supplied HIPOBUY logo and static images are in `dist/assets/`. Dated catalog images are listing images, not warehouse QC photographs. Research and change notes are in `PROJECT_MEMORY.md`.
