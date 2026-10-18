# SugargooTab

Astro 7.4.0 SSR website for `https://sugargootab.com`, maintained as one independent folder in `hehaize88-code/hehaize`. Product catalogue, keyword search, sorting and product photos are read live from **https://cnbuycha.com**. There is no local product database, product snapshot, photo store or admin backend.

## Content

- 24 locales with localized navigation, 30 FAQ answers and 10 full articles per locale.
- FAQ and article links in the header and footer, with four article cards on the homepage.
- Official Sugargoo logo and favicon; see `ASSET_SOURCES.md` for provenance.
- Keyword research and official-source records in `research/`.
- Independent recommendation site; does not process orders or represent Sugargoo.
- Image search is not connected until the CNBUYCHA endpoint is verified. Catalogue reference photos are not a customer's personal Sugargoo warehouse QC.

## Development

Use Node 22.22.0 or newer. Keep the lockfile compatible with the Cloudflare build image (npm 10.9.2); regenerate it with that version and verify a clean `npm ci` when dependencies change.

```sh
npm ci
npm run dev
```

## Build and validate

```sh
npm run check:content
npm run build
npm run check:routes
npm run deploy:check
```

`dist/server/index.js` is the SSR Worker; `dist/client` contains only public assets. The custom fetch adapter preserves the validated Astro SSR runtime. Cloudflare serves public assets through the `ASSETS` binding. No database binding is configured.

## Cloudflare Git integration

Create or connect the **sugargootab-com** Worker under Workers & Pages using these settings:

| Setting | Value |
| --- | --- |
| Git repository | `hehaize88-code/hehaize` |
| Production branch | `main` |
| Root directory | `sugargootab-com` |
| Build command | `npm run check:content && npm run build && npm run check:routes` |
| Deploy command | `npm run deploy` |
| Build variable | `NODE_VERSION=22.22.0` |
| Build watch path | `sugargootab-com/**` |

The Worker name must match `wrangler.jsonc`. Keep deployments scoped to this directory. Disable automatic non-production branch deployments initially; the reviewed preview remains separate. The Cloudflare Git integration installs dependencies from the committed lockfile. If installing manually, run `npm ci` before building.

`wrangler.jsonc` declares both custom domains. Confirm the active Cloudflare zone and any existing apex/www records before the first deploy. A conflicting DNS record must be inspected, not blindly replaced. Cloudflare creates the custom-domain DNS records and manages certificates during successful binding. Account access is required; no token or account credential belongs in this repository.

Once connected, changes pushed to `main` in this directory trigger a Cloudflare build and deployment. GitHub stores the code; Cloudflare runs the SSR site. GitHub Pages alone cannot run this server build.

For a locally authenticated Cloudflare CLI deployment:

```sh
npm ci
npm run build
npm run check:routes
npm run deploy
```

## Domain and SEO behavior

- `https://sugargootab.com` is the canonical origin.
- `www.sugargootab.com` redirects permanently (308) to the apex, preserving path and query.
- Successful production content is indexable. Errors, internal search, alternate sort, pagination and the unconnected image-search page are `noindex`.
- Other hosts, including workers.dev, are `noindex` and use production canonical URLs.
- `/robots.txt` advertises `/sitemap.xml` on the production origin. The sitemap contains 672 localized content/category URLs; it does not invent product URLs or request a full catalogue crawl.
- User-specific parameters, failed upstream responses and personal data are never persisted.

## Referral links

- Registration: `https://www.sugargoo.com/register?redirect=/order/manual`
- Purchase: `https://www.sugargoo.com/products?productLink={encodedSourceUrl}&memberId=1771881989097259278`
- Keep the member ID as a string. A catalogue record ID is distinct from the original Weidian `itemID`.

The verified automatic converter currently handles Weidian source links. Other marketplace links must use the official platform workflow until the source format is verified.

## Deployment state

See `PROJECT_MEMORY.md` for the latest verified state. Committing a deployment configuration does not mean the Cloudflare Worker, Git integration or custom-domain binding is live.

Configuration references, checked 2026-10-18:

- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- https://developers.cloudflare.com/workers/wrangler/configuration/
