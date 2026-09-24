# Hipobuyy Sheet — Cloudflare Pages build

This directory contains the source and generated static output for the independent Hipobuyy Sheet website.

- Current public review URL: https://hipobuyy-sheet-review.hehaize88.chatgpt.site/en/
- Intended canonical domain: https://hipobuyy-sheet.com/ (Cloudflare binding must be verified separately)
- Five locales: English, German, Spanish, French, Italian
- Each locale has 20 FAQ entries and 10 independent articles.

## Build

The generated static website is included in `dist/`. To regenerate it from `content/` and `products.json`:

```sh
python3 build.py
```

For a static host such as Cloudflare Pages, use this repository's `hipobuyy-sheet-com` directory as the project root, no build command if serving the committed output, and `dist` as the output directory. If regeneration is needed, use `python3 build.py` as the build command. This folder's presence in GitHub does not connect the domain or configure a host by itself.

## Search configuration

The committed `dist/` includes [sitemap.xml](./dist/sitemap.xml) with 90 localized pages, `robots.txt` with a sitemap directive, reciprocal hreflang, and canonical/Article URLs pointing to `https://hipobuyy-sheet.com/`. The localized pages no longer carry the review-only `noindex`; the root redirect page remains `noindex` and is excluded from the sitemap. Verify that the intended domain is attached and all URLs return successful HTML before submitting the sitemap in Google Search Console. The separate Sites review copy retains `noindex`.

Product links and search target the corresponding pages on `cnbuycha.com`.

The supplied HIPOBUY logo and static images are in `dist/assets/`. Dated catalog images are listing images, not warehouse QC photographs. Research and change notes are in `PROJECT_MEMORY.md`.
