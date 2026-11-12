# Mobile and image-search release — 2026-11-12

Mobile presentation retains all editorial content and adds accessible section toggles, full-content print support, and local paging for long lists. Native catalogue pages use the same mobile behavior as editorial routes. Desktop remains expanded.

Image search scans and SHA-256 verifies every immutable index shard in a worker, retaining only the best match per product. Matching secondary images link to the correct photo; style records link to the source style ID. An incomplete shard download is an error, never a successful partial search.

Validation: build:pages succeeds with 790 exported routes. Catalogue/detail tests (20), streaming integrity/coverage tests (4), and multilingual editorial integrity tests (4) pass. Temporary noindex /qa pages support mobile browser validation and will be removed before final delivery.
