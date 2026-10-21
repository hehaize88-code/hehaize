# SuperbuyTab 部署参数

正式站已于2026-10-19上线：**https://superbuytab.com**。独立正式Worker为superbuytab-com；superbuytab.com和www.superbuytab.com均已绑定，HTTPS与308跳转已实际验收。正式部署记录见文末；下方保留预览阶段历史。

## 先发布独立预览

2026-10-19 用户截图显示 chatgpt.site 的 Cloudflare 拦截页。原 Site 访问模式为 public、状态 active；直接 HTTP 请求返回200，但用户浏览器可达性仍失败。没有通过重复发布相同代码将其标记为修复。

`wrangler.preview.jsonc` 用同一套 Astro SSR 源码发布独立 Worker，名称 `superbuytab-preview`，仅启用账户的 workers.dev 地址，`routes: []`，不绑定 superbuytab.com，也不代理原预览。数据仍实时读取 cnbuycha，预览主机保持 noindex。

在 Cloudflare Workers 的 GitHub 构建设置中填写：

| 字段 | 填写值 |
| --- | --- |
| 仓库 | `hehaize88-code/hehaize` |
| 分支 | `main` |
| Worker 名称 | `superbuytab-preview` |
| 根目录 | `superbuytab-com` |
| 构建命令 | `npm run build` |
| 部署命令 | `npm run deploy:preview` |
| Node 版本 | `24` |
| 构建关注路径 | `superbuytab-com/**` |

已经认证的 CLI 也可依次运行 `npm ci`、`npm run build`、`npm run deploy:preview`。最后一步会实际创建/更新该账户下同名 Worker；执行前确认账户和同名应用归属。新公开 URL 必须采用部署结果返回值，不猜测账户子域名。部署后检查真实商品、搜索、购买链接，并请用户验证浏览器能否打开。

已于2026-10-19 11:10（Asia/Shanghai）通过用户Chrome完成发布：**https://superbuytab-preview.hehaize88.workers.dev**。Build ID：f8b50f65-c0e6-459b-97b5-5da3749fa400，Version ID：800fec19-e02f-4c0a-a145-fcb3f1ebe4b7。用户Chrome首页与商品图片正常；公开HTTP搜索、详情、德语指南和品牌资源检查通过。

构建关注路径已保存为include `superbuytab-com/**`，exclude `superbuytab-com/*.md`。使用现有GitHub连接与构建凭据，无新令牌、数据库或正式域名绑定。

仪表盘可能按默认wrangler.jsonc提示名称不一致；预览部署命令明确选择wrangler.preview.jsonc，已成功。不要为消除此提示改动正式Worker名或域名路由。

参考：https://developers.cloudflare.com/workers/configuration/routing/workers-dev/

## GitHub → Cloudflare Workers Builds

沿用此仓库已有 Astro SSR + Worker 的运行方式。创建 Worker 时选择连接现有 GitHub 仓库。

| 字段 | 填写值 |
| --- | --- |
| 仓库 | `hehaize88-code/hehaize` |
| 生产分支 | `main` |
| Worker 名称 | `superbuytab-com` |
| 根目录 / Root directory | `superbuytab-com` |
| 构建命令 / Build command | `npm run build` |
| 部署命令 / Deploy command | `npm run deploy` |
| Node 版本 | `24`（项目已提供 `.node-version`） |
| 构建关注路径 | `superbuytab-com/**` |

依赖使用 package-lock.json。若配置界面要求安装命令，使用 `npm ci`。源码只改当前文件夹；不要将其他站的构建根目录改到这里。

`wrangler.jsonc` 已包含：入口 `dist/server/index.js`；静态资源 `dist/client`，绑定名 `ASSETS`；自定义域名 `superbuytab.com` 和 `www.superbuytab.com`；`nodejs_compat`，无 D1、R2、KV 或后台服务。

Cloudflare账户内superbuytab.com的zone已Active；正式部署前无DNS记录。Wrangler已自动绑定apex和www自定义域名；公开HTTPS访问有效。仅沿用既有GitHub连接与构建凭据，没有创建新令牌。

这是 SSR Worker，不能用 GitHub Pages 静态目录或传统 Pages 输出目录部署。也不需要反向代理此前的 ChatGPT 预览站。

## 规范地址和SEO

主地址固定 `https://superbuytab.com`；`https://www.superbuytab.com/de/guide/?x=1` 会308到 `https://superbuytab.com/de/guide/?x=1`。

只有正式 HTTPS 主域名响应开启可收录页面。workers.dev或本地测试主机保持noindex。正式站点地图路径为 `/sitemap.xml`，robots声明该地址；正式上线验证后再提交到搜索平台。

## 上线验收

1. 实际打开首页，确认cnbuycha真实商品和源图可用。
2. 目录搜索、价格排序、第3/4页跨上游页边界均正常。
3. 不同详情购买 URL 解码后为各自原始商品 URL，含 ES7pVI。
4. `www`保留路径和查询跳转，官方logo/favicon与静态脚本返回200。
5. `sitemap.xml`含504个正式域名语言入口，首页`index, follow`，搜索和错误页`noindex`。
6. 记录成功部署标识和实际公网验证结果，之后再进行GSC/Bing/GA4接入。

本轮测试命令：`npm run build`、`npm run check`、`npx wrangler deploy --dry-run`。dry-run不会发布网站。

参考：https://developers.cloudflare.com/workers/ci-cd/builds/configuration/


## 2026-10-19 完整翻译与手机布局更新

运行源码：5555a3eca18a0c2a540d2273554518c125872b91。自动构建53f36350-8cef-42f6-86c8-a470da84b1bb成功，59秒，活动版本前缀233b625a。公开地址继续为https://superbuytab-preview.hehaize88.workers.dev/；240篇文章与24语言结构/数字验证通过，390px全类页面与320px语言菜单在用户Chrome实测。正式域名未绑定，预览noindex，部署绑定仍只有ASSETS。


## 2026-10-19 正式域名上线完成

- 用户认可预览后授权部署和域名绑定。正式地址：https://superbuytab.com/；www.superbuytab.com为308跳转入口。
- 正式Worker：superbuytab-com。GitHub main，根目录superbuytab-com，build npm run build，deploy npm run deploy，NODE_VERSION=24。
- Build：4364bca6-48df-446d-a189-11491b2de1af，Ready，40秒，100%流量，活动版本前缀f9ea8a79。部署时GitHub main为be0bd722e14b545b9b6b44de1bb8693696cec162；运行源码仍5555a3eca18a0c2a540d2273554518c125872b91。
- 正式构建关注路径include superbuytab-com/**，exclude superbuytab-com/*.md，额外分支预览关闭；预览Worker继续独立运行。
- Cloudflare Domains表已列出apex和www两个Production域名。公开HTTPS正常；HTTP/www保留路径与参数308到主站。
- 用户Chrome首页所有商品图片正常。首页、文章、FAQ、搜索、详情、品牌资源200；首页/文章index，搜索/详情noindex，预览noindex。
- robots允许抓取，sitemap含360个正式URL；24语言自引用canonical与25个hreflang。搜索结果20项，原始商品ID与ES7pVI购买参数正常。
- 本轮仅部署和同步文档；不修改运行代码。GSC/Bing提交、GA4接入尚未执行。

## GA4接入 — 2026-10-19

运行提交`dcd9530248bf3da0bfba7b11a08493fe9d34b321`已通过构建`72112fe4-254b-4bb5-90b1-d2a5663c6f35`上线，51秒、Ready、100%流量，活动版本前缀`a4143e81`。正式首页和德语文章各输出一次GA标签与config，预览均不输出。GA4资源559470846、数据流16156808279、衡量ID G-4DQX9MML4J，实时报告已收到page_view等事件。本节更新此前GA4尚未执行的历史记录。

## 2026-10-21 SEO 内容发布候选

本次更新包含 336 篇语言文章、48 个专题页和 504 个 sitemap URL。构建、全套检查与 Wrangler dry-run 均已通过；部署仍沿用 GitHub main 的 superbuytab-com/** 自动构建，无新增凭据、绑定或数据库。最终公开验收以本节后续记录为准。

### 首次发布与公开验收

发布提交：fdf35410e8d38325b56587f71d1af6db6a5d62b6。Cloudflare 正式构建 d28a062b-df7e-461a-bfdb-7fae2fd40b5a 成功，版本 eb3f523d-f5db-4d3b-947d-8b8b34634133。预览构建也成功。用户 Chrome 已确认正式文章目录显示 14 个主题；鞋类专题加载 8 张真实商品图；英国运输新文章的 canonical、25 个 hreflang 和移动端折叠目录正确。390px 页面无横向溢出。

验收发现 CnBuyCha 鞋类目录含一条 Wedding flower arch。仅从专题推荐区排除此明确无关条目，再取足 8 项；原始商品目录、详情和搜索保持源数据行为。该修正已通过构建与全部 48 个专题页面检查。
