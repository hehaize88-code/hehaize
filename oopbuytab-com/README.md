# OOPBuy Tab

Public design preview for **oopbuytab.com**, built with Astro 7.4.1 SSR.

## Source of truth

All product records, prices, images, category results, text searches and sorting are fetched from https://cnbuycha.com/ at request time. There is no product database, stored catalogue export, or admin interface. Source-returned images use CNBuyCha or its Weidian CDN URLs.

CNBuyCha currently serves 60 records per source page. The adapter maps these into 20 records per display page and computes the full pagination from the returned total. If the source markup changes, update `src/lib/catalog.ts`. Failed requests render an unavailable state.

Product photos have not been verified as warehouse QC. The QC page is educational guidance. Image search has no verified source endpoint and is explicitly unavailable.

## Links and branding

- Register: https://oopbuy.com/login
- Purchase: https://oopbuy.com/product/weidian/{sellerItemId}?inviteCode=U68CWQBN5
- The item ID comes from the original seller URL, never the CNBuyCha page number.
- Official OOPBuy logo and favicon are extracted unmodified from its publicly served frontend assets. `public/oopbuy-logo.svg` and `public/favicon.png` are active assets.

## Development

Use Node >=22.22.0 and npm >=9.6.5.

```sh
npm ci
npm run dev
npm run build
```

The custom Astro adapter emits a Worker default fetch export in `dist/server/index.js`; static assets are under `dist/client`. There are no runtime secrets or database bindings.

24 locale routes share stable product and article paths. English is the root, others have language prefixes. Locale switching preserves route and valid search/sort/page parameters. Editorial JSON files contain equal-length complete translated content; product names and USD prices stay identical to the source.

## Preview and production

The user requested a temporary public preview. The purchased domain has not been connected. The preview sends noindex/nofollow and robots Disallow. Canonical/hreflang origins are configured for the purchased domain; remove preview indexing restrictions only when launching the reviewed production site.

Final GitHub target is https://github.com/hehaize88-code/hehaize in its own root folder **oopbuytab-com/**. Copy application files without Sites project identity or Git metadata when preparing that independently deployed project. No existing platform folder should be changed. See PROJECT_MEMORY.md for requirements and current verification limits.

## Standalone preview package

The chatgpt.site preview is blocked by its edge security for the user's browser. A separate temporary Worker package can be prepared without changing application behavior:

```sh
npm run build
node scripts/package-cloudflare-preview.mjs
```

Upload `dist/cloudflare-preview/worker.js` as an ES module Worker, or use `wrangler.preview.jsonc` with an authenticated Cloudflare deployment. The output includes only official logo/favicon assets and the SSR app; all catalogue data remains live. Create the temporary `oopbuytab-preview` Worker in the confirmed user account, use its returned workers.dev URL, and do not bind the purchased domain until the user approves the design.

Cloudflare API currently requires reauthentication. Browser fallback has not been authorized in this task yet.


## GitHub Pages 视觉预览（2026-10-21）

用户无法访问 chatgpt.site，且明确表示无法连接 Cloudflare；本轮停止 CF 路径。
独立分支 `oopbuytab-preview` 保留本目录 Astro SSR 源码；`docs/oopbuytab-com/` 为只用于审阅的静态 HTML。主分支和正式域名未改动。

- 使用 Node 24，在本目录运行 `npm ci && npm run preview:pages` 可重新生成。
- 构建时读取 CNBuyCha，图片直接使用源站返回的 URL；不建立数据库或商品 JSON。
- 首页、目录首屏、分类、指南、FAQ、文章及样本商品有 24 种语言。
- 静态预览的搜索、排序、更多商品及未导出的商品详情明确进入 CNBuyCha；完整 SSR 源码保留原功能。
- 样本详情 `/products/shoes/3470.html` 保留正确 OOPBuy 购买链接（卖家商品 ID 7876894732）。
- 预览 noindex，不绑定 CNAME，不启动定时任务。

启用预览：仓库 Settings → Pages → Deploy from a branch → `oopbuytab-preview` → `/docs` → Save。
发布成功后预期路径是 `https://hehaize88-code.github.io/hehaize/oopbuytab-com/`；在 Pages 发布完成前，这只是预期地址，不是已可访问的交付。

GitHub 连接支持读写源码，但当前没有 Pages 设置接口；需在 GitHub 设置中完成这一步。
