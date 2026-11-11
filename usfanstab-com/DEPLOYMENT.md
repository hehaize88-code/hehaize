# USFans Tab production deployment

Domain: https://usfanstab.com (www redirects with 308, preserving path/query).
GitHub: hehaize88-code/hehaize, main, root directory usfanstab-com.
Cloudflare target: Worker usfanstab-com. No database, KV, R2, or secrets required by runtime.

## Cloudflare Workers Builds
Connect the existing GitHub repository; select main and root directory usfanstab-com.
Install command: npm ci. Build command: npm run build. Deploy command: npx wrangler deploy.
Use Node 24. wrangler.jsonc contains the build and both custom domains.
The Cloudflare zone must be active in the deployment account; verify registrar nameservers.
Do not overwrite existing unrelated DNS records or enable a paid plan.

## Verification
- Home, product, all 8 locales and image search must load on production.
- https://www.usfanstab.com/path?query redirects to the apex preserving path/query.
- /robots.txt allows production indexing and references /sitemap.xml.
- /sitemap.xml links 8 language maps, containing 3467 product URLs per language plus editorial/category routes.
- Error pages, APIs and workers.dev remain noindex. Search/sort variants use noindex,follow.
- Product data remains live from cnbuycha.com. Image features are a dated derivative index, not a product database.

## Known image coverage
All 3467 product galleries (13544 images) indexed. Additional verified styles from 163 products add 2954 image matches. Total 16498 image matches. Styles for 3304 products are not verified; source failures display honest status. See docs/IMAGE_SEARCH.md.

## Status
Source prepared. Astro build and 16 language sitemap/SEO checks passed, including robots, www redirect, preview noindex and invalid sitemap handling. Cloudflare login is required before deployment/domain activation can be verified.

Local Wrangler dry-run could not complete because Windows sandbox denied esbuild parent-directory access. Astro build and direct Worker request checks passed. Cloudflare runtime validation remains pending authentication.

GitHub main publication confirmed: 730586b48cff73dfeda56550c124e377d9586e5f. Cloudflare connector, dashboard and local CLI are unauthenticated/expired; Worker publication and DNS/HTTPS verification are still pending.
