# SuperbuyTab — Superbuy Spreadsheet

正式域名：**https://superbuytab.com**。用户于 2026-10-19 确认已经购买。

源码目录：`hehaize88-code/hehaize/superbuytab-com/`。此目录独立构建、独立部署。

当前状态：独立公开预览已上线：https://superbuytab-preview.hehaize88.workers.dev 。已在用户Chrome确认真实商品与图片正常。正式superbuytab.com尚未绑定；原chatgpt.site地址已停止作为预览交付。

## 本地运行

Node 24；Astro 7.4.0；npm lockfile；Wrangler 4.151.1。

```sh
npm ci
npm run dev
npm run build
npm run check
```

`npm run deploy` 会实际部署到已认证的 Cloudflare 账户，只有完成托管配置后才执行。独立预览已通过Cloudflare GitHub构建发布；正式域名部署尚未执行。

## 数据和链接

- 只读 https://cnbuycha.com 的实时公共 HTML；无子站数据库、商品 JSON 副本、独立图片库、上传服务或管理后台。
- 分类、查询、排序沿用主站。热门排序表示浏览量，不是销量。
- 主站60项分页映射到子站20项，第4页对应主站第2页，避免漏项。
- 原始商品图地址、标题、价格、市场 ID 由主站提供；本站内部ID仅用于详情路由。
- 购买使用 Superbuy 官方 URL、原始商品 URL 和 partnercode=ES7pVI。
- 注册链接保持用户提供的嵌套 ref。
- 缺少主站搜图接口时显示不可用，不上传图片或制造结果。普通商品照片不标为仓库 QC。

## 页面和多语言

首页、目录、商品详情、使用指南、FAQ、QC图片说明及搜图状态页。英语根路径和23个语言前缀。切换保留商品路径、分类、查询、排序和页码。商品资料保留源站原文；界面翻译不是独立多语言搜索引擎。

当前指南及FAQ为简短预览内容，后续完整SEO文章尚未撰写。首页维持此前公开预览的设计，未顺带改其他站。

## 品牌与部署

Logo/favicon 使用 Superbuy 官网原始 SVG，见 [ASSET_SOURCES.md](ASSET_SOURCES.md)。其他产品图片不存入项目。

正式 canonical 使用非www地址。www和HTTP访问保留路径、查询参数308跳转。主页、无筛选目录、指南及FAQ可收录；筛选/搜索/翻页、商品镜像、尚无功能的说明页及错误页 noindex。站点地图包括24种语言共96个入口，未虚构商品 sitemap 或文章。

非正式来源域名保持 noindex。已发布的临时 Sites 预览独立保留，正式项目不包含它的 `.openai/hosting.json`。

见 [DEPLOYMENT.md](DEPLOYMENT.md) 进行部署，见 [PROJECT_MEMORY.md](PROJECT_MEMORY.md) 了解已确认需求和限制。
