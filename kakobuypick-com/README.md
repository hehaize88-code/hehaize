# Kakobuy Pick — Astro SSR

Astro 7.4.0 SSR. User-confirmed domain: **https://kakobuypick.com** (purchased 2026-10-17). Repository: **hehaize88-code/hehaize**, directory: **kakobuypick-com/**. The user requested indexing links on 2026-10-17. Canonical content pages now permit indexing; search/filter results, unavailable image search and errors remain noindex.

## 已部署状态与 GitHub 配置

2026-10-17 已按用户授权创建独立 Cloudflare Worker，并连接下列 GitHub 目录。**https://kakobuypick.com/** 已在用户连接的 Chrome 中实际打开，`www` 自动跳转到主域名；商品图、德语切换、搜索、价格排序和详情购买 URL 已检查。页面已按用户索取收录链接的要求开放搜索引擎抓取。

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

站点地图：https://kakobuypick.com/sitemap.xml 。包含24语言共912个稳定页面地址：主页、商品目录、11个分类、指南、FAQ、文章中心及22篇文章。`/sitemap-products.xml` 是按真实源站目录页拆分的商品地图索引；每个 `/sitemaps/products-{page}.xml` 读取一页源站商品并输出24种语言URL，不虚构商品ID或修改日期。

配置依据：https://developers.cloudflare.com/workers/ci-cd/builds/configuration/ （2026-10-17 核对）。

## Editorial pages

- `/guide/`: a six-step independent guide from product research to receipt.
- `/faq/`: 26 sourced answers in five groups, with client-side filtering and ordinary HTML disclosures.
- `/articles/`: 22 original editorial articles; `/articles/{slug}/` renders each full article with a contents list, worked table, checklist and source links.
- The same routes and content structure are available in all 24 languages; switching languages preserves the current article and query. Source dates, scope limitations and illustrative calculations remain explicit.
- Top and footer navigation link to standalone pages. Mobile navigation wraps visibly; the article contents list starts collapsed on narrow screens. Home shows four article cards and a short FAQ introduction.
- `SEO_RESEARCH.md` records keyword intent and official evidence. `src/content/editorial/en.json` is the factual baseline; the other locale JSON files contain complete, committed text. These are editorial documents, not a product database.
- Reviewed translations are committed source content. No translation service runs during builds or page requests. Edit them against the English factual baseline and review the diff before replacing existing text.
- `npm run check:content` runs before every build. It requires all 24 locale files, exact content structure, stable identifiers, all numeric facts (allowing local separators) and no unchanged English sentences in translated content.
- `node scripts/check-editorial.mjs` checks 600 editorial responses across all locales, article/FAQ counts, section parity, critical numbers, schemas, canonical/hreflang, navigation and redirects after building.

## Product data contract

- Product data comes only from **https://cnbuycha.com/** at runtime. Exact source responses use a 2-minute edge cache, with a last-good response allowed for up to 15 minutes only during a transient upstream failure. Confirmed 404 removals are not served from stale cache. No database, copied catalog, persisted product JSON, object storage, image index, administration UI or backend changes.
- Home: `/`. Search/sort/pagination: `/AllProducts/?q=&sort=new|click|price&page=`. Categories: `/<category>/` with the same parameters. Detail: `/<category>/<internalId>.html`.
- The current main site does not expose a general catalog JSON API. `src/lib/catalog.ts` is a read-only public HTML adapter. Each source list page contains 60 products; the visible catalogue splits it into three 20-product pages without inventing or reordering inventory. If the HTML contract changes, show an error rather than invent products. Requests time out after 15 seconds.
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

The small Astro adapter in `scripts/` targets a standard fetch-worker interface. Build output is bundled to `dist/server/index.js`; `wrangler.jsonc` deploys the SSR Worker without an unused static-assets upload. `npm run validate:deploy` validates the deployment package without publishing. No database or application secrets are required.

The earlier temporary preview was hosted separately and was blocked for the user at the shared hosting edge. This standalone GitHub directory uses the purchased domain and has no temporary hosting identity or proxy dependency. The existing CnBuyCha project is read-only and must not be modified.

## Verification

The original preview passed build and live data checks: 12 home products, 60 filtered/sorted list products, detail photos and seller purchase URLs. All translation keys and 11 category labels exist for all 24 locales. Public-domain desktop verification is now complete in the user's connected Chrome: home images, German navigation, keyword search, price sorting, detail purchase URL, and www redirect passed. See PROJECT_MEMORY.md for deployment IDs and remaining acceptance scope.

The 2026-10-17 editorial release passed all 312 response checks and the Worker deployment dry-run (747.79 KiB gzip, no bindings). Translations were compared with the English baseline and materially corrupted passages were rewritten. Build-time checks prevent incomplete locale sets or changed numeric facts from being deployed.

## Indexing

`robots.txt` permits crawling and declares both sitemap endpoints. Successful canonical pages emit `index,follow,max-image-preview:large` in both HTML and X-Robots-Tag. Unfiltered catalogue pagination has a self-referencing canonical and matching language alternates. Empty/default filter parameters redirect to the clean route, and invalid/out-of-range pages return 404. Actual search/sort variants, non-catalogue parameter variants, unavailable image search, unknown routes and upstream errors remain noindex,follow. Sitemap dates are emitted only for editorial pages with a known revision date; live catalogue dates are not invented. `node scripts/check-indexing.mjs` verifies the map and exclusions after building.


## 2026-10-26 content release

Refreshed refund, storage, sizing, shipping-estimate and tracking articles in all 24 languages. Added full hoodie, Poland-ordering and football-jersey guides, each with a comparison table, checklist and official source links. The English bodies contain 1,238, 1,260 and 1,221 words respectively. All 23 translations retain the complete content structure; targeted terminology, introductions and search titles were reviewed after translation.

Article search titles no longer append a redundant site suffix. Refreshed titles have a 70-character source gate. The shipping article includes a localized, client-side actual/volumetric-weight comparison with input validation and an official-estimator link. It does not calculate prices or assert universal carrier billing rules. Homepage and category links expose the new guides; desktop category links wrap.

Local validation: all 24 content bundles, 456 editorial responses, 768 canonical sitemap URLs, search/utility exclusions, existing intent analytics, weight calculations, production build and Worker dry run. The deployment package is about 1.33 MiB gzip, with no bindings. The production domains and GitHub-to-Worker release workflow remain the existing ones documented above.


## 2026-10-31 recovery release

Three complete guides cover coupon eligibility, W2C/QC/GL/RL vocabulary and USA parcel planning. Six existing guides have clearer search titles and direct answers; hoodie guidance also explains how to verify a Scuffers search result without certifying a seller or product. All editorial changes, eleven category buying notes and source labels are authored in all 24 languages. The new articles are linked from the homepage, article index and related reading.

Catalogue pages now show 20 products, preserve canonical pagination, and publish CollectionPage/ItemList/BreadcrumbList data based on visible items. A short shared source cache reduces repeated requests across languages. Product sitemap shards cover real source listing pages; malformed/empty upstream responses fail with 503/no-store rather than publishing an empty successful map.

Validation commands: `npm run build`, `node scripts/check-editorial.mjs`, `node scripts/check-indexing.mjs`, `node scripts/check-product-sitemap.mjs`, `node scripts/check-catalog.mjs`, `node scripts/check-engagement.mjs`, `node scripts/check-weight-calculator.mjs`, `npm run validate:deploy`.
