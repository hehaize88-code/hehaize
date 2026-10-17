# Hipobuy Spreadsheet — production site

Production: https://hipobuyy-sheet.com/en/
Repository: `hehaize88-code/hehaize`, directory `hipobuyy-sheet-com`.

Publish through the existing GitHub integration. Keep the existing root `hipobuyy-sheet-com` and output `dist`; no hosting/dashboard configuration change is required. The generated `dist/_worker.js` uses Pages advanced mode and the existing `ASSETS` binding. This release does not access the Cloudflare account.

## Build and validate

```sh
python3 build.py
node tests/release.mjs
```

Python 3.12 or later is required. The build has no external Python dependencies. It renders the original five-language editorial site and bundles the catalogue module using plain text composition, without a Node dependency install. The committed `dist/` is ready to serve. The catalogue has no private credentials or database bindings.

`content/editorial.json` and the five language directories retain all 25 articles per language. The shared header and footer are generated from the same template for editorial and catalogue pages. EN/DE/ES/FR/IT switching preserves the route and catalogue query.

## Catalogue and purchases

- `/en/catalog/` and the equivalent five-language routes load public product data from `https://cnbuycha.com` on request. Categories, search, price, popularity, newest order, pagination and detail photo order come from the same catalogue.
- `/en/catalog/<category>/<internal-id>.html` uses the original Weidian ID extracted from the source product page for `https://hipobuy.com/product/weidian/{productId}`. Internal catalogue row IDs are never substituted for Weidian IDs.
- Registration: `https://hipobuy.com/register`. The separate official logo goes to the localized homepage.
- `/en/catalog/image-search/` uses image descriptors made from the same cnbuycha photos. The cnbuycha project does not expose an image search API; similarity comparison is added here in the browser. The selected image stays on the device. The index identifies its date and coverage; it is a snapshot, not an exact-product guarantee.
- Refresh the image index with `python scripts/build-image-index.py` (Pillow is needed for this optional maintenance command). The current index covers 3,436 / 3,436 catalogue products on 2026-10-12. It is shared from the sibling catalogue implementation using the same cnbuycha origin and photo descriptors.
- The gallery preserves all available source product images. Listing pictures are not represented as authenticated warehouse inspection evidence.
- Catalogue errors return 503/noindex rather than empty indexable pages. Search, alternate sorts, pagination and image search are noindex/follow.

## SEO and assets

`/sitemap.xml` is now an index for `/editorial-sitemap.xml` and `/catalog-sitemap.xml`. The editorial sitemap retains five-language self canonicals and reciprocal hreflang; legacy `/spreadsheet/` and `/finds/` paths permanently redirect to the localized live catalogue. Article URLs remain unchanged. Root still redirects to `/en/`.

Homepage targets Hipobuy Spreadsheet with related finds, product-category, QC-photo and ordering intent. The homepage shows four latest article previews, four live product cards and a compact FAQ. Product and article pages share navigation and official Hipobuy artwork. GA4 retains `G-F6G27KWPPQ` and adds registration/purchase click events.

Official artwork was obtained from the public Hipobuy main-page bundle: `src/assets/images/home/logo1.png` (blue) and `logo2.png` (white). Favicon is the exact `https://hipobuy.com/static/favicon/64x64.png` asset. The independent-directory disclosure remains visible.

## Verification

`tests/release.mjs` checks the original-ID purchase mapping, all five locales, article preservation, home sections, image-index coverage, redirects and image-search routes. With `SOURCE_FIXTURES` set to the directory of captured live HTML responses, it also checks source price/search forwarding, full gallery order, the user-supplied ID 7867456361, sitemap mapping and 503 behavior. Release validation passed 563 assertions and an internal-link/asset scan with zero missing targets.

Mobile reading layout (2026-10-13): `mobile_layout.py` groups complete sections into native disclosures. The maintained `dist/assets/mobile-inner.css` and `mobile-inner.js` apply only to inner pages; they keep all content in HTML and support hash links, print, and desktop restoration. Mobile article lists show six compact rows at a time; catalogue lists show twelve products at a time. The homepage is excluded. Build source and committed output together using the commands above.
