# PikoBuy multilingual release — 2026-11-09

This release completes the 32-topic library in English, German, French, Spanish, Italian, Polish and Portuguese. It adds three topics (delivery timeline, parcel submission and an evidence-based buying-risk review), translates the 20 previously English-only topics into six languages, improves search snippets and tracking guidance, and expands every FAQ page to 20 visible answers.

The Markdown files contain a title on line 1, meta description on line 2, a blank line, and the complete article body. Existing catalogue sources, purchase destinations and analytics event names are preserved. Historical catalogue examples remain explicitly dated. New policy-based guides link to primary PikoBuy documentation and do not assert a tested delivery average or a blanket reliability rating.

## Rebuild and validate

From `pikobuy-sheet-net/`:

```sh
python -m pip install -r maintenance/requirements.txt
python maintenance/release-20261109.py
node maintenance/build-worker.mjs
python maintenance/validate-20261109.py
node --test tests/catalog.test.mjs
```

`release-20261109.py` checks the full source inventory before writing output. Its output is deterministic and safe to rebuild. The manifest lists all 224 article routes and the pages changed by this release. Deploy the site root with its generated `_worker.js` using the existing Cloudflare Pages project; keep the live catalogue worker and static files together.
