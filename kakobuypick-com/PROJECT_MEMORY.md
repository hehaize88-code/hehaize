# Kakobuy Pick 项目记忆

更新：2026-10-17，Asia/Shanghai。

## 当前决定

- 用户已购买并确定 `kakobuypick.com`；2026-10-17 已部署独立 Worker，正式域名已在用户连接的 Chrome 中打开并验证。
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
- 用户本轮明确授权通过已连接 Chrome 创建 Worker、连接 GitHub 和绑定两个域名，覆盖此前不操作 Cloudflare 的偏好；本次已按该授权完成。
- 域名购买是用户本轮确认；页面仍待用户验收，因此当前保留 `noindex,nofollow` 和 robots 全站禁止抓取。不要把已购买域名、已推送源码或构建通过写成网站正式上线。
- Canonical、hreflang 和 Astro site 已固定为 `https://kakobuypick.com`；www 308 跳转保留路径和查询。
- 没有在本轮创建其他平台目录或修改主站。
- 公开桌面检查完成：首页、12 张商品图、24 语菜单、德语切换、搜索、价格排序、商品详情及购买链接、www 跳转均正常；用户视觉验收和移动端复核仍待后续，验收后才另行配置正式索引范围和 sitemap。

完整研究与决策历史另存 `CNBUYCHA_ASTRO_PROJECT_MEMORY.md`。

## 2026-10-17 本轮内容扩展（24 语校对完成）

- 用户截图圈出 How it works 与 FAQ，要求改成对应独立页，并增加顶部 SEO 文章入口、20+ FAQ、10 篇精品文章；必须先调研官方资料和竞品关键词，不编造。
- 已确定 `/guide/`、`/faq/`、`/articles/`、`/articles/{slug}/`，沿用全站 24 语目录与同页切换；顶部和底部不再用首页锚点替代独立页。
- 完成 10 篇英文原创稿、26 条有来源 FAQ、六步指南；研究、官方页差异和关键词分工见 SEO_RESEARCH.md。其余 23 语正文已逐项对照英文校对；缺句、否定、费用、物流和仓储等重大错译已重写修正。
- 公开官网实读发现费用页 63/74 标签不完全一致；文章要求核对订单实际报价，不擅自保证固定费用。QC 不等于鉴真；100 天/60 天仓储与五天有条件退换必须分开。
- 不改商品数据接入，不增加商品数据库、后台或图片存储；编辑文案是 GitHub 静态内容。继续 noindex 验收状态。

## 初始版本验证

- `npm run build` 通过；`npm run validate:deploy` 通过（dry-run 未发布）。Worker 768.38 KiB，gzip 216.30 KiB，无数据库绑定。
- 运行构建产物：首页 HTTP 200，12 个实时商品；德语 Adidas 搜索按价格排序 HTTP 200，60 个真实结果；商品详情 HTTP 200，保留真实微店来源购买 URL 和 affcode=rf8x8。
- 页面 canonical 均为 kakobuypick.com，24 个语言 alternates 加 x-default；页面不存在 chatgpt.site 引用。robots 为 Disallow: /。
- www 跳转 HTTP 308，保留 /de/spreadsheet/?q=adidas&sort=price。
- 2026-10-17 公开域名检查已完成： https://kakobuypick.com/ 可在已连接 Chrome 正常打开； https://www.kakobuypick.com/ 自动跳到主域名。页面 canonical 正确，25 个 alternates，robots meta 保持 noindex,nofollow。

## 独立部署记录

- Cloudflare Worker：`kakobuypick-com`；GitHub：`hehaize88-code/hehaize`，main，Root directory `kakobuypick-com`。
- Build：`npm run build`；Deploy：`npm run deploy`；`NODE_VERSION=24`。构建路径 Include 仅 `kakobuypick-com/**`，已在界面保存。
- 首次应用提交：`0e46fb237539aee4196495f2ae07d554c3c70646`；首次 Build ID：`fd047de0-63d9-4be1-b1b3-466a2a47c5d0`；Worker version：`2db69355-80a0-46e6-b808-12e02ef96a03`。构建、发布成功。
- Domains 界面已将 `kakobuypick.com` 和 `www.kakobuypick.com` 绑定 Production；无需用户再次添加 DNS。默认 Worker URL：`https://kakobuypick-com.hehaize88.workers.dev`，正式交付使用已验证的自定义域名。
- 复用已有 GitHub 安装及 Workers Builds token；没有新建凭据或数据库绑定，未修改其他站点设置。
- 德语搜索 adidas 显示 61 个匹配商品，切换价格升序后首项 $4.86；详情 `/products/shoes/3470.html` 显示 4 张主站图片，真实来源 ID 7876894732，购买 URL 正确保留 affcode=rf8x8。
- 此次仅部署现有预览版本，不代表用户已验收设计，不开放搜索引擎索引；搜图接口和 QC 来源限制仍按前述记录保留。

## 2026-10-17 续接校对与发布包验证

- 发布源码独立保存，避免原会话继续生成译文时覆盖校订稿。与原会话新增提交 `bf318c1fba58d9cf29b7b33a7636eca50e6e4d3a` 对比，页面组件、样式、路由及商品接入保持一致；本次补入经过逐项校对的 23 语正文与构建检查。
- 24 语全部保留 6 步指南、26 条 FAQ、10 篇文章、每篇五节正文和完整表格/清单/来源；总计 312 个内容路径。英语正文每篇 463–522 词，仅统计正文段落。
- 数值逐字段校验通过，包括本地小数/千位格式；正常 100 天、90 天提醒、异常 60 天、收货 72 小时和运费示例一致。QC 不等于鉴真，退换有条件，不把处理时效写成全程承诺。
- `npm run build`、`npm run check:content`、`node scripts/check-editorial.mjs` 全部通过；312 个 SSR 响应检查通过。检查 HTML lang、canonical、25 个语言替代链接、schema、文章语言切换、404 和 www 308。
- `npm run validate:deploy` 通过：Worker 2981.58 KiB，gzip 747.79 KiB，无数据库或其他绑定。
- 构建先执行完整性检查：缺语言、缺段落、数字与英文基准不一致、翻译正文残留整句英文均阻止构建。一次性翻译生成脚本不作为发布源码保留，避免覆盖校订稿。
- 商品数据、图片、注册链接、原始卖家 URL 与 affcode=rf8x8 未改。发布沿用现有 GitHub main → Cloudflare Worker；最终公开验收结果另记录于总项目记忆。继续保留 noindex/nofollow、X-Robots-Tag 和 robots Disallow: /，等待用户验收。


### 独立页面公开浏览器检查

- 首轮内容提交 `bf318c1fba58d9cf29b7b33a7636eca50e6e4d3a` 的 Worker Build `3f5195c4-8b59-487d-9ae4-b37f15331dc0` 已确认成功。下列交互与排版检查在该部署后完成；后续译文校订提交保留相同页面组件、样式和路由。
- 用户连接 Chrome 实际点击验证 `/guide/`、`/faq/`、`/articles/` 及文章详情；文章中心显示 10 篇，FAQ 显示 26 条。搜索 storage 筛选到 4 条答案并显示官网出处，清空恢复 26 条。
- 语言菜单显示 24 语，切换 Deutsch 保留 `kakobuy-spreadsheet-guide` 文章路径；德语 canonical 正确，robots meta 保留 noindex,nofollow。
- 手机窄屏导航可见，无横向溢出（clientWidth/scrollWidth 均 375px），首次加载目录折叠；临时视口已重置。
- 首页 12 张商品图均加载成功，图片 URL 仍直接来自 cnbuycha.com/media/products。
- 公开检查地址：https://kakobuypick.com/guide/ 、https://kakobuypick.com/faq/ 、https://kakobuypick.com/articles/ 。仍待用户视觉验收，暂不开放搜索引擎索引。
