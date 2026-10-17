# Kakobuy Pick 项目记忆

更新：2026-10-17，Asia/Shanghai。

## 当前决定

- 用户已购买并确定 `kakobuypick.com`；截图显示 Cloudflare 域名状态 Active，但这不证明网站已部署或绑定。
- 正式代码位置：`hehaize88-code/hehaize`，`main` 分支，独立目录 `kakobuypick-com/`。
- 首站只做 Kakobuy。首页主关键词仍为 **kakobuy spreadsheet**。参考站 `kakobuypicklist.com` 仅用于研究结构，不能用它的商品或图片。
- 框架固定 Astro 7.4.0 SSR，Wrangler 4.151.1，Node 24。使用无状态 fetch Worker，直接从 cnbuycha.com 读取公开 HTML；没有数据库、商品 JSON 快照、后台或搜图索引。
- 官方 Logo/favicon、用户注册页 `https://kakobuy.com/register`、购买入口 `https://item2.kakobuy.com/item/details?url={encodedOriginalSellerURL}&affcode=rf8x8`。来源商品 ID 不可替换成主站内部 ID。
- 全部商品、价格、商品图片、关键词搜索、排序和分页都来自 cnbuycha.com。主站不提供的内容不能伪造。
- 实现 24 语言：en,de,es,fr,it,pl,pt,ro,sv,nl,da,fi,el,cs,hu,bg,sk,hr,sl,lt,lv,et,ga,mt；切换保留同页与查询参数。商品标题保留主站原文。
- 主站未确认可用搜图接口，搜图页面目前是准确的未接通说明；主站图片没有可核验 QC 来源标签，不能把全部参考图标成仓库 QC。

## 部署与验收

- 旧公开预览被用户遇到的共享域名 Cloudflare 安全页拦截；检查端成功不代表用户可用。
- 当前包可由用户自己的 Cloudflare Worker 从 GitHub 构建，运行时不依赖 chatgpt.site，不反向代理临时站。
- 依用户既有偏好，不连接或修改用户 Cloudflare；用户自行连接 GitHub 项目及绑定域名。README 已提供精确设置。
- 域名购买是用户本轮确认；页面仍待用户验收，因此当前保留 `noindex,nofollow` 和 robots 全站禁止抓取。不要把已购买域名、已推送源码或构建通过写成网站正式上线。
- Canonical、hreflang 和 Astro site 已固定为 `https://kakobuypick.com`；www 308 跳转保留路径和查询。
- 没有在本轮创建其他平台目录或修改主站。
- 上线后待核验：用户访问是否正常、真实商品图片、搜索排序、24 语切换、购买链接、移动端；验收后才另行配置正式索引范围和 sitemap。

完整研究与决策历史另存 `CNBUYCHA_ASTRO_PROJECT_MEMORY.md`。

## 本次验证

- `npm run build` 通过；`npm run validate:deploy` 通过（dry-run 未发布）。Worker 768.38 KiB，gzip 216.30 KiB，无数据库绑定。
- 运行构建产物：首页 HTTP 200，12 个实时商品；德语 Adidas 搜索按价格排序 HTTP 200，60 个真实结果；商品详情 HTTP 200，保留真实微店来源购买 URL 和 affcode=rf8x8。
- 页面 canonical 均为 kakobuypick.com，24 个语言 alternates 加 x-default；页面不存在 chatgpt.site 引用。robots 为 Disallow: /。
- www 跳转 HTTP 308，保留 /de/spreadsheet/?q=adidas&sort=price。
- 尚未验证新域名的公开访问；等待用户建立 Cloudflare Worker 与自定义域名。
