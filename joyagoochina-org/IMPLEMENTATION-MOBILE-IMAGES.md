# Mobile and image-search release — 2026-11-12

Mobile presentation retains all editorial content and adds accessible section toggles, full-content print support, and local paging for long lists. Native catalogue pages use the same mobile behavior as editorial routes. Desktop remains expanded.

Image search scans and SHA-256 verifies every immutable index shard in a worker, retaining only the best match per product. Matching secondary images link to the correct photo; style records link to the source style ID. An incomplete shard download is an error, never a successful partial search.

Validation: build:pages succeeds with 790 exported routes. Catalogue/detail tests (20), streaming integrity/coverage tests (4), and multilingual editorial integrity tests (4) pass. Temporary noindex /qa pages support mobile browser validation and will be removed before final delivery.

Browser verification: 480 route variants at a 320 × 740 CSS-pixel frame; 474 loaded on the first pass and six transient blank loads passed individual retry. Every default view was ≤ 5 screens with no horizontal document overflow. A 390 × 844 pass covered 342 loaded routes (maximum 4.1 screens). The article archive retains all 29 cards while paging six at a time. Expand all revealed all eight sections of the insurance article. A real jacket secondary-photo search opened ?photo=2; seller deep links show the exact seller photo.
