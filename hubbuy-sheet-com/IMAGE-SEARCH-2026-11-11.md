# Free image search — 11 November 2026

Upgrade the existing EN / PT-BR / DE image-search experience without a paid API, new database or external inference service. The existing shared catalogue snapshot is reused unchanged (3,446 image descriptors, 16 October 2026).

- Camera actions inside localized homepage and catalogue search forms.
- File selection, drag-and-drop and clipboard image paste; JPEG, PNG, WebP and GIF up to 20 MB.
- Local preview, optional center crop, clear, cancel and retry; stale asynchronous results cannot replace a newer selection.
- Preserve dHash + color descriptor compatibility. Filter distant results instead of always filling 24 slots, warn about weak similarity, and reject blank/low-detail images.
- Display at most 12 results initially with a show-more control when needed. Product paths, data origin and purchase destinations are unchanged.
- Query photos stay on the visitor's device. Existing analytics receive status/count events only. There is no model API key, subscription or new cloud resource.

This is visual similarity within the existing indexed catalogue, not whole-web or semantic product recognition. A result does not establish identical goods, and products added after the snapshot are outside its coverage.

Validation: production Pages build; static validation (107 sitemap URLs, no broken internal links); commerce, analytics, growth and November regressions; image-search tests covering all index records, original and recompressed real-photo retrieval, file limits, unsafe data, result filtering, index retries/cache, cancellation, clear, paste and drop. Browser QA confirmed the known Lego source photo retrieves the correct /other-stuff/3459.html entry, crop and clear work, and 390px PT-BR image-search and DE homepage layouts preserve the localized search flow without horizontal overflow.

Deployment target: existing Cloudflare Pages project hubbuy-sheet-com, GitHub main, directory hubbuy-sheet-com, build npm run build:pages, output out.
