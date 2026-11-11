# CNBuyCha × USFans 项目记忆与首站规划
更新日期：2026-11-11（Asia/Shanghai）
状态：前期调研完成；域名待用户选择及注册商核验；未创建子站仓库，未部署，未购买域名。

## 已确认的用户要求
- 本次只做 USFans，一个平台对应一个独立域名，域名必须含 usfans。
- 使用开发时最新稳定版 Astro，支持 SSR/SSG，源码托管 GitHub。
- 商品数据、搜索、搜图、QC 照片和排序统一来自 cnbuycha.com 项目，不为子站另建商品数据库，不改用 cnfansge.com 等旧数据源。
- LOGO 和 favicon 使用 USFans 官网原始素材；素材地址尚待核验。不生成仿制图标；页面明确独立推荐站身份。
- 首页为 SEO 落地页，主要关键词 usfans spreadsheet；其他关键词先调研。
- 注册链接：https://www.usfans.com/register （不要擅自添加 ref）
- 用户给定购买样例：https://www.usfans.com/product/3/7819088649?ref=SWD92F
- 用户给定模板：https://www.usfans.com/product/3/{productId}?ref=SWD92F
- {productId} 必须为原始市场商品 ID，不是 cnbuycha 的内部数据库 ID。
- 路径 /3/ 的市场映射未获官方核验，不把所有 Taobao、1688、Weidian 商品一律套用 /3/。
- 边做边更新项目记忆与变更记录。

## 域名候选（全部尚未确认可注册）
| 优先级 | 域名 | 取舍 |
| --- | --- | --- |
| 1 | usfansfinds.com | 品牌加商品发现含义，适合目录、QC、指南长期扩展 |
| 2 | usfanssheet.com | 更靠近 spreadsheet 搜索意图，较短 |
| 3 | usfanspicks.com | 更偏精选推荐，关键词意图较弱 |
| 4 | usfans-spreadsheet.com | 含完整主题词但更长，带连字符，低优先级 |
避免把官网 usfans.com 当作可以部署的自有域名。域名含关键词并不保证排名。
2026-11-11：RDAP 网页访问失败；本地直连受限，代理请求 TLS 失败，不能据此判断未注册。
购买前在注册商确认可注册状态、首年价和续费价。当前没有价格或可用性结论。

## 实际调研证据
1. https://usfanswithqc.com/
   首页聚焦 spreadsheet，并布局 QC、链接转换、分类和购买流程。
2. https://usfanswithqc.com/spreadsheet
   商品目录强调分类、价格、QC 和购买入口。其库存数字和服务承诺仅为竞品陈述，不复制为本站事实。
3. https://ssfinds.com/usfans-spreadsheet
   聚合 links、budget links、tutorial、QC、shipping；采用专题目录与购买指南组合。
4. https://fanssheets.com/usfans/
   多平台代理目录，分类和商品发现内容；抓取结果商品区为空，不推断其实际库存。
5. https://www.usfans.com/
   官网可访问但抓取无可读正文；购买样例抓取失败。尚未核验仓储时长、QC 张数、费用、优惠或 LOGO 文件。
6. https://cnbuycha.com/
   www 入口重定向至非 www；可读取商品、分类和列表。
本次是搜索结果与竞品内容研究，没有关键词工具搜索量、KD 或 GSC 数据，因此不宣称具体搜索量或低竞争。

## 关键词与页面分工
| 页面 | 主关键词 | 补充意图 |
| --- | --- | --- |
| / | usfans spreadsheet | usfans finds, usfans spreadsheet links |
| /spreadsheet/ | usfans product links | browse, filter, sort |
| /qc/ | usfans qc, usfans qc photos | QC finder, 如何看照片；功能上线前不宣传已支持 |
| /guides/how-to-buy/ | how to use usfans | usfans tutorial, how to buy on usfans |
| /shipping/ | usfans shipping cost | shipping time, estimator；费用须官方核实 |
| /categories/shoes/ 等 | usfans shoes 等 | 分类真实有货才创建索引页 |
| /articles/ | USFans guides | 专题文章集合 |
| /faq/ | USFans questions | 用事实回答，不编写优惠或时效 |
budget finds、shipping calculator、image search 仅在数据及真实功能支持时作为目标。
首页掌握 spreadsheet 主意图；目录以工具和找货为主，不复制首页长文。新站与既有 usfansbuys.com 等站点避免照搬文章。

## 技术架构建议（尚待选定域名后实施）
- GitHub 保存代码、PR 和自动构建记录；Cloudflare Workers 承载 Astro 服务端。
- GitHub Pages 仅支持静态托管，不能运行 Astro SSR。若用户要求仅 GitHub Pages，则采用 SSG，但动态查询仍需要 cnbuycha 的服务端能力。
- Astro 官方 npm latest 在本次查询返回 7.4.10，Node 要求 >=22.23.4；开发启动时重新核实并锁定依赖与 lockfile，不使用 beta。
- 首页、文章、指南、FAQ：预渲染；商品详情、目录、筛选：SSR 与适当缓存。
- 搜索、搜图、QC：子站服务端调用主站统一 API，凭据只放服务端；没有接口时先补主站，不伪造搜索结果。
- 每站独立仓库与部署配置。共享数据适配器与组件版本，不复制主站数据库。
- site config 集中管理域名、品牌、注册、购买映射、语言和数据地址。
- HTTPS 与 www 统一到一个正式域；本规划推荐非 www 为 canonical。

## 已检查主站项目
仓库：https://github.com/hehaize88-code/cnbuycha
已读 README.md、package.json、wrangler.jsonc、src/index.js。
- 当前主站是 Cloudflare Worker + D1，package.json 并非 Astro。
- 入口调用 db.js 的 listProducts/getProduct/getCategories 等函数。
- 列表参数 q 或 keywords、sort=new/click/price、page；入口列表每页 60。
- 详情以内部 ID 查找，并生成 /分类/数字.html 路径。
- 已读入口未发现公开商品 JSON API、搜图或 QC 查询路由。
- 这是代码检查结论，不表示已经核实所有分支、外部服务或生产部署版本。
- README 的迁移数量是历史记录，不作为当前站点实时商品数。
- 本轮主站未修改。git clone 受本地网络阻断，已用 GitHub 连接读取关键文件。

## 必须先解决的数据契约
下面是待设计字段/操作，不是已经存在的接口：
- listProducts(query, category, sort, page, pageSize)
- getProduct(source, sourceProductId)，区分 internalId 和 sourceProductId
- searchByImage(upload)：图片格式、大小、超时、保留期限和真实检索后端
- getQc(source, sourceProductId, skuId?)：严格来源与商品匹配；无结果明确显示
- 字段：source、sourceProductId、sourceUrl、title、images、price、currency、categories、updatedAt
- 普通商品图与真实 QC 图分开；QC 必须保留来源、日期及款式关联（若上游提供）
- 排序规则复用主站语义，不能前端仅对当前页重排假装全站排序
- API 只返回公开商品字段，不暴露主站后台写入权限
- 错误、空结果、429、超时分别处理；缓存需能随主站更新失效
- 不用抓取 HTML 作为长期核心接口；若主站确无搜图，统一在主站开发能力后供子站调用

## 首页与页面设计
Title 初稿：USFans Spreadsheet | Product Finds & Buying Guide
QC 确认可用后再加入 QC Photos。
H1：USFans Spreadsheet
首屏：一句话介绍、搜索/搜图入口（功能就绪才显示）、浏览目录和注册按钮。
依次为分类、真实精选商品、购买步骤、QC 使用说明、文章入口和 FAQ 摘要。
顶部：Spreadsheet / Categories / QC / Shipping / Guides / FAQ / Articles。
移动端紧凑布局；目录建议每页 20 件。主站 API 需支持 pageSize，不能只裁掉原 60 件导致漏货。
FAQ 规划至少 20 个实用问题；文章先按已核实需求写，避免批量空泛内容。
语言采用统一内容键和独立 URL；新站语言数量需确定，全站商品名、按钮、提示、SEO 标题与文章同步，不只翻导航。

## SEO 验收
- 首页和重要详情首屏 HTML 有真实文字、链接与商品内容。
- 自指 canonical；不把子站 canonical 全部指向主站。
- sitemap 返回 XML，仅收录有效 canonical URL，lastmod 代表真实变更。
- 404、空目录和缺失商品正确处理；无意义筛选/搜索组合不制造索引膨胀。
- Breadcrumb、Article、Product 按真实内容生成；不伪造评价、库存和价格。
- hreflang 仅链接实际存在的完整语言版本。
- 建立真实分类导航与内链；文章与各站有独立价值。
- 上线验证桌面/手机、CSS/图片加载、正式域名、购买 ID 和 ref、注册、搜索、排序、QC、搜图。

## 建仓后文件职责
- PROJECT_MEMORY.md：确认规则、决策、现状、待办；每轮结束更新
- docs/RESEARCH.md：关键词、竞品、官方来源及日期
- docs/DATA_CONTRACT.md：接口、字段、来源类型与 ID 映射
- docs/CHANGELOG.md：修改、验证、commit 和部署结果
- src/config/site.ts：站点配置
- src/lib/cnbuycha/：数据适配器
- src/lib/purchase-links.ts：购买链接
- public/brand/：官网 LOGO 与 favicon 原始文件及来源记录
创建 GitHub 项目后把本文件迁入仓库，以仓库记忆为后续权威版本。

## 下一步
1. 用户选域名；注册商核实所有权/可注册与续费价格。
2. 核查主站数据模型与购买链接市场映射，完成统一只读 API 设计。
3. 确定搜图与 QC 实际来源，缺失能力先在主站补齐。
4. 提取官网 LOGO/favicon；核实 USFans 费用/运输等官方资料。
5. 创建 USFans Astro 仓库与首站，边做边记录；验收后部署正式域名。



## 2026-11-11 预览实施更新（覆盖先前独立仓库建议）
- 正式仓库为 https://github.com/hehaize88-code/hehaize ，每个域名一个独立文件夹。当前目录 usfans-preview，正式域名未定。
- 本轮先公开预览，用户审核后再准备正式域名和部署；未改动该主仓或现有域名。
- Astro 7.4.10 SSR，8 种语言 EN/DE/FR/ES/IT/PT/PL/ZH。商品描述词词典翻译，品牌型号保留，未知描述词保留源文，尚不是任意标题完整语义翻译。
- 商品、价格、商品图、搜索、排序仅读取 cnbuycha.com 公开 HTML；无自建数据库、账号、后台。正式版宜换成主站稳定只读 API。
- 货币来自 Frankfurter 汇率并显示日期；失败显示原始 USD，不伪造汇率。
- 官网 DOM 核验 LOGO：https://media.usfans.com/webresource/v1/brand/6ebaf586041d4ff8ad34d66a35d3dc88.webp；favicon：https://www.usfans.com/favicon.png。
- USFans 主购买按钮保留用户的 ref=SWD92F。下面提供 Oopbuy/Superbuy/CSSBuy/Kakobuy/Lovegobuy/Sugargoo 链接和原微店链接复制。
- 主站没有独立款式及确认 QC 数据，显示真实空状态，不拿普通图冒充。主站提供数据后再接入。
- 搜图为浏览器本地 16x16 RGB 外观相似比较，每次扫描主站 60 件商品，可继续扫描；图片不上传。不是 AI 语义全库检索。
- 预览 noindex/nofollow，robots 禁止抓取；正式发布再配置 canonical、hreflang、sitemap。
- 本地已检查首页、搜索排序、商品详情、购买商品 ID、微店复制、欧元换算、中文商品描述、图片代理；搜图和手机继续检查。
- Cloudflare 连接要求重新认证，本轮使用临时 Sites 公开预览。
- Sites project_id: appgprj_6af41c697fa48191942dc11d4ff3180b。预期地址 https://usfans-catalog-preview.hehaize88.chatgpt.site ，发布状态以最终结果为准。


## 2026-11-11 feedback revision
- User requested camera icon, researched 20+ FAQ/10 articles, top navigation entries, limited homepage excerpts, complete product translation, and repaired uploaded-image search.
- Root cause of production image 502: Cloudflare Workers rejects redirect:error before making request. Replaced with manual redirects restricted to verified upstream image origins; added timeout/error feedback and automatic search on image selection.
- Product translations now use whole-title batches through public Google translation endpoint, with brand/model tokens protected and volatile memory cache only; no product database. Shared path covers homepage, all spreadsheet pages, category-filtered lists, detail, and image-result API. Dependency failure retains original source text, never fabricates a translation.
- 25 FAQ and 10 original source-linked guides; 8 languages, build-time editorial translations. Preview remains noindex until domain approval.
- Visual search still compares photos locally in batches of 60; not a semantic full-catalog search. Uploaded file stays in browser. Main source still lacks verified QC/style fields.
- Production QA and final revision commit are recorded after publication.

- Local verification passed: 97 HTML routes across 8 languages; every locale has 25 FAQ and all 10 complete 8-section articles. Valid image proxy returns image bytes; foreign origins rejected; unknown article returns 404. Browser auto-search compared 60/60 and ranked the source test jacket first. Mobile 390px camera/header checked.
- English guides have 900–910 words each; 8-language content parity verified. Final publication and hosted image search are checked separately.

- Hosted v2 QA found Sites disallows caches.default; removed that optimization so remote title translation cannot be skipped by the restricted cache getter. Added an exact descriptive-title assertion. Rechecking live after v3.
- Publication transport on this Windows host: repository-local http.sslBackend=openssl and http.proxy=socks5h://127.0.0.1:7897 work; environment-only proxy configuration was not reliable through the helper child process. No TLS verification disabled and no remote URL rewriting.

- Final localization architecture: synchronize all source products and store only whole-title language strings (no IDs, prices, images or product DB). Current catalogue count checked: 3,467 products, 2,994 unique titles. Seven translated languages plus English. src/content/title-translations.json covers the snapshot; scripts/sync-title-translations.mjs refreshes it and validates exact source product count. New titles have browser-side translation fallback, since hosted outbound translation proved unavailable.
- The hosted image proxy and auto-search passed: 60/60 source photos compared, test jacket first.

- Full title strings completed: all 2,994 unique titles in 7 translated languages (20,958 strings), no unexpanded translation markers. 147 formatting/unchanged-long-title cases were individually retranslated. Local 97-route, image and exact descriptive-title checks passed again. Source HTML uses a bounded 30-second volatile cache and one retry for a transient network failure; it is not a database.

## 2026-11-11 全站搜图与款式修复（进行中）
- 用户明确要求搜图覆盖所有商品的所有图片，不再限定首图或每批60件。
- 用户已授权访问登录中的微店；只读核对店铺3-spreadsheet的商品7876894732（主站/shoes/3470.html）。确认22个带图款式、308个款式/尺码组合，未修改微店商品。
- 公开微店商品HTML也提供相同款式图与属性ID，按主站sourceId核对后读取，不使用卖家登录Cookie或私有API凭据。
- 实施全量派生图片指纹索引（主站图库+公开款式图），搜索仍在浏览器执行，用户图片不上传；命中图保留到商品详情，不再强制显示首图。商品标题与价格仍实时从主站读取，无独立商品数据库。
- 正在收集全站图片、生成覆盖统计，并验证用户截图中的非首图和款式图。尚未发布本轮改动。

### 本轮验收（2026-11-11）
- 全部3,467件主站商品、13,544张图库图已覆盖；零商品/图片读取失败。含款式后16,498条匹配记录、16,393张不同URL图片。
- 款式批量来源仅完成163件商品（3,287个带图选项；去重后增加2,954条检索记录），公开微店连接随后被断开。已停止批量读取；另3,304件款式尚未核验，不能宣称全站款式完整覆盖。
- 对原始微店商品ID实时校验，已核对款式在来源异常时回退到带日期的公开款式缓存；不复制卖家Cookie、私有库存或成本。
- 本地真实浏览器上传用户红底黑鞋对应第四张图库图，全索引比较16,498/16,498，第一名为/shoes/3470.html；点开保留实际命中图片。22个真实款式图可滚动、选择并更新主图。
- 自动检查同商品副图、款式图、目录末尾/t-shirts/51.html均首位匹配，ID不匹配拒绝、API无效路径拒绝；原97条多语言页面检查通过。
- 本轮索引为带日期快照，新增/修改图库需要运行collect-images.mjs --styles并build-image-index.mjs刷新；--resume仅续传中断任务。没有配置自动定时刷新。


## 2026-11-11 production domain
User purchased usfanstab.com and authorized GitHub + Cloudflare deployment. Folder usfanstab-com in hehaize88-code/hehaize. Production SEO and Worker domain settings prepared; Cloudflare connector unauthorized and dashboard logged out. Do not claim live until verified.
