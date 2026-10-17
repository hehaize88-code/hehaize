# Kakobuy Pick — Astro SSR

Astro 7.4.0 SSR. User-confirmed domain: **https://kakobuypick.com** (purchased 2026-10-17). Repository: **hehaize88-code/hehaize**, directory: **kakobuypick-com/**. This release is still for visual acceptance: `noindex` and a disallow-all robots.txt remain until the user reviews the site.

## 已部署状态与 GitHub 配置

2026-10-17 已按用户授权创建独立 Cloudflare Worker，并连接下列 GitHub 目录。**https://kakobuypick.com/** 已在用户连接的 Chrome 中实际打开，`www` 自动跳转到主域名；商品图、德语切换、搜索、价格排序和详情购买 URL 已检查。页面仍处于用户视觉验收阶段。

在 Cloudflare 创建 **Worker**，选择连接 GitHub 仓库。此项目是 SSR，不使用静态 Pages 输出配置。

| 字段 | 填写值 |
| --- | --- |
| 仓库 | `hehaize88-code/hehaize` |
| 分支 | `main` |
| Worker 名称 | `kakobuypick-com` |
| 根目录 / Root directory | `kakobuypick-com` |
| 构建命令 / Build command | `npm run build` |
| 部署命令 / Deploy command | `npm run deploy` |
| Node 版本（如需设置 NODE_VERSION） | `24` |
| 构建路径筛选（可选，仅本目录触发） | `kakobuypick-com/**` |

两个域名已在该 Worker 的 Domains 页绑定到 Production。www 请求由本项目 308 跳转到非 www，并保留路径和查询参数。Include build watch paths 已保存为 `kakobuypick-com/**`。无需重复创建 Worker 或域名记录。

代码在自己的 Worker 中直接运行并读取 cnbuycha；运行时不依赖 chatgpt.site。无需数据库、存储桶或商品服务凭据。GitHub 源码推送本身不等于域名已经上线。

核验页面：首页、`/spreadsheet/?q=adidas&sort=price`、`/de/`、`/fr/category/shoes/`、实际商品详情及购买按钮。首页和分类应呈现主站真实数据；上游故障返回明确不可用状态。

用户验收后，再单独开放正式 SEO 收录并完善 sitemap；目前不要提交本版本 sitemap 给搜索引擎。

配置依据：https://developers.cloudflare.com/workers/ci-cd/builds/configuration/ （2026-10-17 核对）。

## Data contract

- Every product request reads **https://cnbuycha.com/** at runtime. No database, copied catalog, persisted product JSON, object storage, image index, administration UI or backend changes.
- Home: `/`. Search/sort/pagination: `/AllProducts/?q=&sort=new|click|price&page=`. Categories: `/<category>/` with the same parameters. Detail: `/<category>/<internalId>.html`.
- The current main site does not expose a general catalog JSON API. `src/lib/catalog.ts` is a stateless, read-only public HTML adapter. If the HTML contract changes, show an error rather than invent products. Requests time out after 15 seconds.
- Product photographs are direct URLs on cnbuycha.com. Missing photographs are text, never generated replacements. No local image copies.
- Main-site reference photos do not have verified warehouse-QC provenance. The UI does not falsely label them QC.
- No image search interface was found on the main site. The image-search route explicitly states it is unavailable; no uploaded files or fake search results.
- Prices are the main site's displayed USD estimates, not an independent currency calculation.

## Identity and outbound links

- Official logo observed on kakobuy.com: `https://nstatic.kakobuy.com/banner/202602/22/1080564df2b8f006455d32460b53b7d9.png`.
- Official favicon: `https://kakobuy.com/favicon.ico`.
- Registration: `https://kakobuy.com/register`.
- Product purchase: original seller URL, encoded once into `https://item2.kakobuy.com/item/details?url=...&affcode=rf8x8`. The internal CnBuyCha ID is never substituted for the seller's item ID. Supported source origins are explicitly allowlisted.
- Footer identifies the site as independent and discloses affiliate links.

## Languages

All 24 languages observed on kakobuypicklist.com: en, de, es, fr, it, pl, pt, ro, sv, nl, da, fi, el, cs, hu, bg, sk, hr, sl, lt, lv, et, ga, mt.

English at `/`; other languages at `/<locale>/`. Navigation, categories, search, states, pricing/QC explanations, editorial copy and affiliate disclosure have authored translations. Product titles retain the source text. Switching languages preserves the route and query. All page locales have hreflang and x-default. Final professional language review remains advisable before SEO indexing.

## Commands and preview

`npm ci`, `npm run dev`, `npm run build`.

The small Astro adapter in `scripts/` targets a standard fetch-worker interface. Build output is bundled to `dist/server/index.js`; `wrangler.jsonc` deploys the Worker and `dist/client` assets. `npm run validate:deploy` validates the deployment package without publishing. No database or application secrets are required.

The earlier temporary preview was hosted separately and was blocked for the user at the shared hosting edge. This standalone GitHub directory uses the purchased domain and has no temporary hosting identity or proxy dependency. The existing CnBuyCha project is read-only and must not be modified.

## Verification

The original preview passed build and live data checks: 12 home products, 60 filtered/sorted list products, detail photos and seller purchase URLs. All translation keys and 11 category labels exist for all 24 locales. Public-domain desktop verification is now complete in the user's connected Chrome: home images, German navigation, keyword search, price sorting, detail purchase URL, and www redirect passed. See PROJECT_MEMORY.md for deployment IDs and remaining acceptance scope.
