# SuperbuyTab 部署参数

本文件是具体部署配置，**不是已上线证明**。本轮不连接 Cloudflare，也不修改域名 DNS。

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
