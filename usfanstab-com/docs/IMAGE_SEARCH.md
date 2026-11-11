# Full-catalog image search and real style photographs

## Data provenance

- Catalogue membership, product paths, current names, prices and gallery photographs come from `https://cnbuycha.com`.
- The user authorized reading their logged-in Weidian account on 2026-11-11. Read-only inspection of product 7876894732 confirmed 22 image-bearing style options and 308 style/size combinations. No seller data was changed.
- The same style attribute IDs and image URLs are present in the public Weidian item HTML (`#__rocker-render-inject__[data-obj]`, `result.default_model.sku_properties.attr_list`). The public item's ID is checked against the main catalogue's source ID before use. No login cookies, seller API credentials, stock or cost fields are copied into this website.
- Style photographs are not QC photographs. The QC empty state remains until verified QC data exists.

## Search architecture

`collect-images.mjs --styles` enumerates every page of the main catalogue, checks the total, visits each product, and collects all gallery images plus public image-bearing style attributes. `build-image-index.mjs` downloads those source images for fingerprint calculation, retaining only derived visual fingerprints, source image references and catalogue paths in the published index. There is no separate product database, checkout or admin.

At search time the visitor's file is decoded locally; no file is uploaded. Every indexed image is compared in the browser. The closest image per product is selected; the top 20 products are hydrated from the live main source. Removed/unavailable products are omitted rather than synthesized. Results display the actual matching image and link to it on the detail page.

This is visual fingerprint similarity, not semantic AI identification. Similarity does not verify authenticity, product identity, availability or sizing. Different crops or viewpoints can rank differently. Coverage and index date are exposed on the search page. A snapshot is not an automatic live subscription: rerun the refresh commands after catalogue changes.

## Refresh and verification

1. Run `node scripts/collect-images.mjs --styles`. `.image-cache` is ignored resumable build state, not a published product store. A normal run refreshes every product; use --resume only to continue an interrupted run. Descriptors for unchanged URLs are reused.
2. Run `node scripts/build-image-index.mjs`; review `docs/image-index-coverage.json`. Revisit failed products/images before claiming complete coverage.
3. Run the regression checks and test a secondary gallery image, a style image, and a product outside the first 60 records.
4. Build and publish the complete snapshot. Do not publish a partial warmup as complete.

Style panels refresh independently from the original public item and report unavailable sources separately from zero styles. Scrollable option grids preserve actual names/IDs; selection previews the original photo. Buying and copy-link actions retain the original item link because a size-specific SKU has not been selected.
