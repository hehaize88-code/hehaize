# SuperbuyTab 部署参数

本文件是具体部署配置，**不是已上线证明**。配置准备和 dry-run 不连接 Cloudflare，也不修改域名 DNS。

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
| 部署命令 / Deploy command | `npx wrangler deploy` |
| Node 版本 | `24`（项目已提供 `.node-version`） |
| 构建关注路径 | `superbuytab-com/**` |

依赖使用 package-lock.json。若配置界面要求安装命令，使用 `npm ci`。源码只改当前文件夹；不要将其他站的构建根目录改到这里。

`wrangler.jsonc` 已包含：入口 `dist/server/index.js`；静态资源 `dist/client`，绑定名 `ASSETS`；自定义域名 `superbuytab.com` 和 `www.superbuytab.com`；`nodejs_compat`，无 D1、R2、KV 或后台服务。

Cloudflare 需要有该域名的有效 zone 和部署权限，实际部署时才会应用这些域名。没有在本轮验证用户购买渠道、账户zone、DNS或证书状态。

这是 SSR Worker，不能用 GitHub Pages 静态目录或传统 Pages 输出目录部署。也不需要反向代理此前的 ChatGPT 预览站。

## 规范地址和SEO

主地址固定 `https://superbuytab.com`；`https://www.superbuytab.com/de/guide/?x=1` 会308到 `https://superbuytab.com/de/guide/?x=1`。

只有正式 HTTPS 主域名响应开启可收录页面。workers.dev或本地测试主机保持noindex。正式站点地图路径为 `/sitemap.xml`，robots声明该地址；正式上线验证后再提交到搜索平台。

## 上线验收

1. 实际打开首页，确认cnbuycha真实商品和源图可用。
2. 目录搜索、价格排序、第3/4页跨上游页边界均正常。
3. 不同详情购买 URL 解码后为各自原始商品 URL，含 ES7pVI。
4. `www`保留路径和查询跳转，官方logo/favicon与静态脚本返回200。
5. `sitemap.xml`含96个正式域名语言入口，首页`index, follow`，搜索和错误页`noindex`。
6. 记录成功部署标识和实际公网验证结果，之后再进行GSC/Bing/GA4接入。

本轮测试命令：`npm run build`、`npm run check`、`npx wrangler deploy --dry-run`。dry-run不会发布网站。

参考：https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
