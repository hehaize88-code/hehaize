# Search-box photo search and compact standalone pages — 2026-11-11

Status: implemented and verified locally. The user subsequently explicitly authorized GitHub upload and production publication on 2026-11-11. The reviewed commits have been rebased onto current main without conflicts for the established Cloudflare build. Production completion must be confirmed by the successful build and live checks.

## Changes

- Home, spreadsheet and category search fields now have an accessible camera control. Selecting a local image opens results in the current page's dialog. Drag/drop on the search field and image paste into it are supported. Text searches still submit their original GET form. Without JavaScript the camera link opens the existing visual-search page.
- One reusable image-search component handles standalone and embedded use. Local-file validation, cancellation, crop choice and reset remain. Eight results appear initially; more can be requested. The selected image stays on the device and matches only the existing 3,467-entry derived catalogue index.
- Article index initially shows 8 of the 19 articles with 11 more in a native disclosure; every link stays in the server HTML. All article chapters, source citations and checklists remain in the HTML and open without JavaScript. Articles initially open the first chapter, except the calculator guide where the interactive calculator is already visible. Expand/collapse-all, hash navigation and print expansion remain.
- Reduced secondary spacing, bounded source-photo grids, tightened mobile navigation and added the same controls across all 24 languages. Short pages remain short rather than being padded to an arbitrary minimum.

## Validation

- `npm run check:content`: 24 locales, 19 articles and 30 FAQs each, no failures.
- `npm run check:routes`: 504 editorial routes, 888 sitemap URLs, 26 catalogue pagination cases, analytics privacy, weight calculator and commerce checks passed.
- Added meaningful regressions for the 72 home/list/category search-box routes, unique file inputs/dialogs/headings, localized controls and all 24 compact article archives retaining 19 links.
- `npm run build`, `npm run deploy:check`, JS syntax check and `git diff --check` passed.
- Browser: home camera selection and clipboard image paste each returned the correct jacket `/products/jackets/3492.html` as the single close match, comparing 3,467 records. Text search for Adidas returned 62 products, 16 on the first page. The listing camera also opened the local image dialog and returned the jacket. Closing the dialog preserves the text-search page.
- Browser: article archive expands to all 19 links and closes. French article Expand all opens all 9 disclosures; Collapse all closes all 9.
- Responsive measurements below are initial states with browser chrome excluded. Scrollbars reduce the CSS content widths from 390 to 375 and from 360 to 345. Short guide/category/QC pages are deliberately below three screens. Product measurements use the local preview; live option/FX responses can time out there, as recorded in prior QA. Production style/FX flows were already verified in the earlier session.

| Viewport | Page | Document height | Screens |
|---|---|---:|---:|
| 390 × 844 | English article index | 1569 | 1.9 |
| 390 × 844 | English FAQ | 2698 | 3.2 |
| 390 × 844 | English guide | 1154 | 1.4 |
| 390 × 844 | English QC | 914 | 1.1 |
| 390 × 844 | Categories | 1222 | 1.4 |
| 390 × 844 | Product 3470 | 2888 | 3.4 |
| 390 × 844 | Spreadsheet | 3359 | 4.0 |
| 360 × 800 | French shipping to Czechia | 3688 | 4.6 |
| 360 × 800 | Greek spreadsheet guide | 3785 | 4.7 |
| 360 × 800 | German clothing-size guide | 3611 | 4.5 |
| 360 × 800 | Greek shipping calculator | 3976 | 5.0 |
| 360 × 800 | German FAQ | 3094 | 3.9 |
| 360 × 800 | Irish spreadsheet | 3433 | 4.3 |

Screenshots: `home-camera.png`, `image-results.png`, `mobile-pages.png`. The mobile screenshot is a local iframe review harness, not a production page.
