# USFans Tab

Production domain: https://usfanstab.com (activation pending Cloudflare login).

Astro SSR catalogue using cnbuycha.com, with eight languages, 25 FAQ entries, 10 guides per language, currency conversion and local image matching.

```sh
npm ci
npm run build
node scripts/verify-production.mjs
npm run deploy
```

Cloudflare deployment root: `usfanstab-com` in `hehaize88-code/hehaize`.
See [deployment instructions](DEPLOYMENT.md), [project memory](PROJECT_MEMORY.md), and [image-search coverage](docs/IMAGE_SEARCH.md).

No separate product database or administration backend. All 3467 main-source product galleries are indexed; only 163 products have verified additional style snapshots. Runtime attempts live style retrieval. Missing data is not invented.
