# CNBuyCha 子站项目记忆：LoveGoBuy

更新时间：2026-10-22（Asia/Shanghai）
阶段：用户已购买 lovegobuytab.com；Astro SSR 公开预览已成功发布，24 语言内容检查通过。公开浏览器验证遇到托管平台 Cloudflare 拦截，不能宣称公开页面已完成浏览器验收。正式域名尚未绑定。历史调研记录保留，当前状态以第 16 节及之后为准。
本文件是本项目的持续交接记录。后续每次执行先读当前版本，再追加真实进展，不把提案写成已完成事实。

## 1. 用户已确定的要求

| 项目 | 固定要求 |
| --- | --- |
| 本轮范围 | 只做 LoveGoBuy，一个平台一个独立域名 |
| 域名 | 必须完整包含 lovegobuy |
| 唯一商品数据来源 | https://www.cnbuycha.com/（当前公开访问会转到 https://cnbuycha.com/） |
| 复用功能 | 商品、分类、搜索、搜图、QC 照片、排序等均来自 CNBuyCha 项目 |
| 数据边界 | 子站不建立独立商品数据库、不复制一套可独立编辑的商品后台 |
| 技术 | 开工时最新版稳定 Astro，允许 SSR 或 SSG；代码存入 GitHub |
| GitHub 目标 | https://github.com/hehaize88-code/hehaize ，每个域名单独目录 |
| 参考站 | https://kakobuypicklist.com/ ，参考页面结构和交互；商品、图片不取自参考站 |
| 后台边界 | 不建设、不接管、不登录商品后台；不要求用户提供后台账号；不新增商品数据库 |
| 多语言方案 | 按参考站的 24 语言规划；各语言完整内容，共享同一套主站商品数据 |
| 品牌资源 | LOGO 和 favicon 与 LoveGoBuy 当前官方网站一致 |
| 首页 | SEO 内容为主；核心关键词 lovegobuy spreadsheet |
| 内容方法 | 先研究平台与竞品，再编写；本轮先把结构规划清楚 |
| 注册地址 | https://www.lovegobuy.com/login/signup |
| Weidian 购买模板 | https://www.lovegobuy.com/product?id={productId}&shop_type=weidian&invite_code=161CPG |
| 测试商品 | 原商品 ID 7876894732 |
| 工作记录 | 边做边更新项目记忆，记录证据、决定、改动、验证、发布与未解决项 |

当前注册链接没有 invite_code；按用户提供的地址原样保存，不自行添加或猜测注册归因参数。
购买链接中的 invite_code=161CPG 必须保留。
本轮要求优先于其他域名项目的旧约定；其他项目的主数据站、邀请码、路由、语言数量不能直接混入本项目。

## 2. 域名调研与建议

查询日期：2026-10-22。通过 Verisign .com RDAP 直接读取注册记录。

| 域名 | 本次查询结果 | 建议 |
| --- | --- | --- |
| lovegobuytab.com | HTTP 404，注册局未返回注册记录 | 首选；短、包含完整品牌，tab 对应表格/目录，适合长期命名 |
| lovegobuylist.com | HTTP 404，注册局未返回注册记录 | 备选；list 含义直观，适合商品推荐目录 |
| lovegobuypicks.com | HTTP 200，已有注册记录 | 不作为普通新注册首选 |
| lovegobuyspreadsheet.com | HTTP 200，已有注册记录 | 不作为普通新注册首选；名称也较长 |
| lovegobuycatalog.com | HTTP 200，已有注册记录 | 不作为普通新注册首选 |
| lovegobuysheet.com | 后续复查 HTTP 200，已有注册记录 | 不作为普通新注册首选 |
| lovegobuygrid.com | 后续复查 HTTP 404，注册局未返回记录 | 短名称备选；grid 表示网格，含义不如 tab/list 直接 |

404 只说明本次注册局查询未找到对象，不保证注册商允许注册、不保证普通价、不代表已购买。购买前以注册商即时结果及续费价为准。本轮没有购买任何域名。
推荐用完整品牌 + 简短用途词；不加年份、不重复品牌、不以连字符或长串关键词堆砌域名。这里的排序是命名与使用体验判断，不是搜索排名预测。

核验端点：
- https://rdap.verisign.com/com/v1/domain/lovegobuytab.com
- https://rdap.verisign.com/com/v1/domain/lovegobuylist.com
- https://rdap.verisign.com/com/v1/domain/lovegobuypicks.com
- https://rdap.verisign.com/com/v1/domain/lovegobuyspreadsheet.com
- https://rdap.verisign.com/com/v1/domain/lovegobuycatalog.com
- https://rdap.verisign.com/com/v1/domain/lovegobuysheet.com

## 3. 关键词与竞品调研

研究方法：公开搜索结果、竞品页面标题/导航/实际功能、LoveGoBuy 官方公开入口。没有取得 Keyword Planner、Ahrefs、Semrush 或本新域名的 GSC 数据，因此没有可靠搜索量、KD、流量份额或排名承诺。下面的优先级是基于用户目标和页面意图的实施建议。

| 竞品 | 观察到的定位 | 对本项目有用的方向 |
| --- | --- | --- |
| lovegobuy.cc | Spreadsheet、Finds、Weidian 链接、分类与购买指南 | 首页承担主题介绍，商品目录和指南分开 |
| lovegobuywithqc.com | Spreadsheet、QC finder、链接转换、运费指南 | 用户不仅找链接，也需要商品证据和下单前解释 |
| jadeship.com/search/spreadsheet/lovegobuy | 跨表搜索、价格、QC、平台商品链接 | 搜索与筛选完整性比首页展示很多卡片更重要 |
| lovegobuyfinds.com | 商品分类、关键词/链接/图片搜索相关文案 | 搜索入口应清楚，但功能必须实测后再宣传 |

竞品内容只用于研究意图与页面结构。其商品数量、优惠、收费、物流时效、所谓“verified”或“official partner”均不能照搬。
竞品显示的产品数量不是 CNBuyCha 的商品数量。

| 优先级 | 关键词组 | 建议承接位置 | 说明 |
| --- | --- | --- | --- |
| P0 | lovegobuy spreadsheet | 首页 / | 核心主题，明确能找到什么、如何使用 |
| P0 | lovegobuy finds / lovegobuy product links | /spreadsheet/、/finds/ | 商品浏览、搜索、完整分类与筛选 |
| P1 | lovegobuy qc / lovegobuy qc photos | /qc/ 与商品详情 | 只有真实 QC 来源核验后才能宣传照片功能 |
| P1 | how to use lovegobuy / lovegobuy guide | /guide/ | 从发现商品到平台注册、购买的步骤 |
| P1 | lovegobuy weidian links / lovegobuy weidian spreadsheet | 分类或专题页 | 当前购买模板已确认 Weidian |
| P2 | lovegobuy shipping cost / shipping calculator | /shipping/ 与指南 | 初期做官方信息核实后的指南；没有计算接口就不做假计算器 |
| P2 | lovegobuy image search / reverse image search | 搜图入口和使用说明 | 依赖 CNBuyCha 搜图服务核验 |
| P2 | lovegobuy shoes / hoodies / t shirts / accessories | 真实存在的分类页 | 必须与主站实际商品和分类对应 |

lovegobuy safe / review / fees / warehouse 等可作为后续内容研究题，不凭竞品介绍写平台保证或固定政策。

候选文章题目（本轮仅选题，不表示已编写或承诺首发十篇）：
1. How to Use a LoveGoBuy Spreadsheet
2. How to Order Weidian Finds with LoveGoBuy
3. How to Compare LoveGoBuy Finds Before Buying
4. How to Read QC Photos and Measurements
5. Product Photos vs Warehouse QC Photos
6. How to Estimate LoveGoBuy Shipping Costs
7. Why a Product Link May Stop Working
8. How to Compare Clothing and Shoe Measurements
9. How to Organize a Product Shortlist
10. How to Use Image Search（仅在主站能力确认后实施）

## 4. CNBuyCha 数据与源码核验

只读检查仓库：https://github.com/hehaize88-code/cnbuycha
检查的 main 快照：3c0bda0d8d28173190304798aa242e252b40f56b
该仓库与可读公开页面的结构、商品路径、购买链接一致；不能仅凭源码推断线上部署一定等于这个提交。
本轮没有修改源站仓库、数据库或部署配置。

公开页面观察：
- https://cnbuycha.com/AllProducts/ 本次读取显示 3,456 商品；这是观察时的页面数值，后续必须动态读取，不能写死。
- https://cnbuycha.com/shoes/3470.html 显示 Adidas XLG Runner Deluxe，原商品 ID 为 7876894732。
- 3470 是主站内部记录 ID；7876894732 是购买模板必须使用的原商品 ID，两者不同。
- 示例详情页有四张图片；公开页面不足以确认每张都是仓库 QC 照片。
- LoveGoBuy 的示例购买页面本次未能通过抓取工具完成商品内容验证，不能说购买目标已经实测下单成功。

源码已确认：
- src/index.js 提供首页、商品详情、分类列表、sitemap、robots 和管理后台。
- 列表使用 /AllProducts/?q=...；同样接受 keywords 参数。
- 不沿用其他旧项目的 /search.html?keywords=...&channelid=2 模板。
- 排序值：new（最新）、click（浏览量高到低）、price（价格低到高）。
- src/db.js 的 listProducts 使用标题或 source_id 搜索，分页默认 60 项。
- getProduct 返回主商品及 images；主图优先，其他图片按 sort_order、id 排序。
- src/html.js 已有与用户一致的 LoveGoBuy Weidian 购买链接模板。
- 原始价格字段是 CNY；展示 USD 按主站 settings.cny_per_usd 转换。子站应直接使用主站提供的 USD 展示值/同一换算规则，不能把 CNY 数字加上美元符号，也不能自行固定新汇率。
- 主站源码包含 LoveGoBuy 图片资源路径 /template/moban/pc/static/images/lovegobuy.webp；尚未与当前官方 LOGO 比对，不视为最终品牌资源。

当前未确认 / 未在这份源码找到：
- 向外部子站提供商品、分类、搜索的公开 JSON API；
- 为子站设置的 CORS 响应；
- 上传图片并返回匹配商品的搜图端点；
- 与普通商品图分开的 QC 类型、相册或仓库来源字段；
- 可复用的 QC 查询服务。

这表示“当前可读版本未找到”，不是证明所有历史版本或线上外部服务绝对不存在。后续应核对实际运行版本和已有服务；不能假装搜图、QC 已完成接入。
直接 HTTP 访问主站与官方站的部分路径返回 403，带参数页面也有抓取失败；本轮没有完成浏览器端跨域、图片防盗链和交互端到端验证。

## 5. 架构建议

更新后的默认建议：Astro 的 SEO 首页、指南、FAQ、文章采用 SSG；商品目录、分类、搜索和详情按需 SSR，并通过轻量数据适配层读取 CNBuyCha 公开页面或已验证的现成接口。
GitHub 目标已固定为 hehaize88-code/hehaize，每域名独立目录、独立构建与发布目标。代码存放与线上运行分开记录，不再默认把整个多域名仓库当成一个 GitHub Pages 生产站。
同仓库 OOPBuy 项目已存在直接解析 CNBuyCha HTML 的适配逻辑，因此不把新增源站 JSON API 或修改源站后台设为接入前置条件。
SSR 只承担前台页面渲染与源站读取，不包含独立商品数据库、后台管理、账号或订单系统。
若要使用纯 GitHub Pages 临时预览，可构建 SSG 快照，但实时搜索需真实接主站，且必须说明更新时点；不能声称静态预览具备完整 SSR 能力。实际发布环境在域名与发布步骤中记录。

版本核验：
- 2026-10-22 读取 npm 官方 registry 的 astro/latest，返回版本 7.4.2。
- 同一记录的 engines：Node >=22.23.4，npm >=9.6.5。
- 官方 Astro 博客已发布 7.4（2026-10-15）。
- 真正初始化时重新核验最新稳定版，用精确版本及 lockfile 固定；不使用 beta，也不让每次自动构建随意升级框架。

页面渲染策略：

| 区域 | 建议 |
| --- | --- |
| 首页、指南、文章、FAQ | SSG，完整正文直接在 HTML 中 |
| 分类、商品详情、普通分页 | 优先 SSR 读取主站并缓存响应，保留可爬取链接与有效内容；SSG 预览是另一个明确标注的构建目标 |
| 搜索、排序、翻页交互 | 通过统一适配层转发到主站真实查询与排序；不能只过滤当前加载的十几张卡片 |
| 搜图 | 使用已核实的主站搜图服务，不另建图片向量库 |
| QC 照片 | 读取主站真实 QC 字段或服务；不能把所有商品图统一标成 QC |
| 更新 | 主站变更触发重建，或经用户确定频率后设置构建同步；本轮未创建任何定时任务 |
| 异常 | 静态内容保留最近一次成功构建；动态区域明确失败状态，重试有上限 |
| sitemap/robots | 构建时静态产出，避免请求源站商品服务才生成站点地图 |

SSG 构建产物是主站数据的派生页面和可重建缓存，不是另一个商品后台。商品编辑始终只在 CNBuyCha 完成。
静态内容有更新延迟，动态价格和购买前信息以实时主站/平台信息为准。源站隐藏商品后需触发重建和缓存失效，不能永久保留旧上架状态。
请求失败或拉取不完整时中止发布，保留上一份成功版本，禁止把空数组误当成全站商品已删除。
所有动态查询由同一适配模块处理，页面组件不散落主站地址和购买链接拼接。

## 6. 数据适配与接口边界（2026-10-22 更新）

当前优先方案：只读复用同仓库 oopbuytab-com/src/lib/catalog.ts 已存在的 CNBuyCha HTML 读取方式，验证后为 LoveGoBuy 做平台与路由适配。无需源站后台账号，不建设或改动源站后台，不新增商品数据库。
上一轮提出的源站 JSON API 只是未来可选接口合同，尚不存在，也不是当前实施前提。以下表格保留作备选设计，不表示本轮会修改源站：

| 建议端点 | 用途 |
| --- | --- |
| GET /api/v1/categories | 分类、slug、有效商品数 |
| GET /api/v1/products?q=&category=&sort=&page=&pageSize= | 全目录分页、关键词搜索和统一排序 |
| GET /api/v1/products/{internalId} | 完整单品、原商品 ID、平台、主图、相册 |
| GET /api/v1/catalog-version | 可选：版本或更新标识，决定是否重建 |
| 主站现有搜图端点（待定位） | 上传图片，返回统一商品结果 |
| 主站现有 QC 端点/字段（待定位） | 按平台和原商品 ID 返回真实相册 |

搜图和 QC 继续只核对 CNBuyCha 已公开的实际能力，不因为参考站存在这些功能就借用参考站接口或相册。如果主站没有可调用入口，记录为待接入项，界面不得假装可用；不因此扩展本轮范围去建设源站后台。
公共 API 只返回公开商品字段，后台登录、数据库凭据、管理权限不进入浏览器。
浏览器直连主站接口时才需要核验 CORS；SSR 的服务器读取公开 HTML 不以浏览器 CORS 为前置条件。适配层仍需统一处理分页总数、限流、超时、缓存、错误和来源更新信息。

建议输出字段：
- internalId：主站记录 ID，字符串保存；
- sourcePlatform：weidian / taobao / ali_1688 等，经源链接验证；
- sourceProductId：原商品 ID，字符串保存；
- title、categoryId、categorySlug；
- mainImage、images[]（顺序和来源保持一致）；
- qcImages[]（只有确实能区分 QC 才使用）；
- sourcePriceCny、displayPriceUsd、currency、sourceUpdatedAt；
- status、sourceUrl；
- 分页响应含 items、total、page、pageSize、hasNext。

商品唯一标识应采用 sourcePlatform + sourceProductId，避免不同平台纯数字 ID 碰撞。
本轮只确认 Weidian 模板，不能把 Taobao 或 1688 商品强制写成 shop_type=weidian。
如源站内有其他平台商品，先确认官方参数映射，再输出正确购买按钮。

## 7. 页面与首页规划

| 路径 | 作用 |
| --- | --- |
| / | 主 SEO 落地页，核心 lovegobuy spreadsheet |
| /spreadsheet/ | 全商品工具页，完整搜索、分类、排序、分页 |
| /finds/ | 主题精选；仍引用主站真实数据 |
| /category/{slug}/ | 每个真实分类的稳定页面 |
| /item/{platform}/{sourceProductId}/ | 子站单品信息与购买入口（建议路由） |
| /guide/ | 使用指南 |
| /qc/ | QC 说明与已核实功能 |
| /shipping/ | 官方信息支持的运费指南 |
| /faq/ | 官方资料可核验的常见问题 |
| /articles/ | SEO 文章目录 |
| /articles/{slug}/ | 单篇文章 |
| /sitemap.xml、/robots.txt | 静态收录文件 |

以上是规划路由，不是已经上线的地址。功能未接通时不发布伪装完成的入口。

首页模块建议：
1. 紧凑首屏：LoveGoBuy 官方 LOGO、H1、简短说明、搜索、注册和全商品按钮。
2. 热门分类：只取主站真实分类。
3. 少量真实商品示例：控制占位，引导到完整 Spreadsheet。
4. 使用步骤：找商品、查看信息/QC、打开 LoveGoBuy 购买。
5. 核心指南与最新文章入口；有足够文章后首页仅放 4–6 张缩略卡。
6. 页脚说明网站为独立商品推荐站，购买在 LoveGoBuy 完成。

建议首页 title：LoveGoBuy Spreadsheet | Finds, Product Links & Buying Guide
H1：LoveGoBuy Spreadsheet
QC 照片功能核验完成前，不在标题写“全部 QC Verified”或保证“所有商品有 QC”。

移动端基线：无横向滚动；小首屏；两列商品卡；商品工具页建议每页 20 项；分类控件不占据大段竖向空间；文章保留完整正文，优化目录、间距和图片，不靠删内容压缩。
每页 20 项，不影响完整目录访问。同仓库已有适配层将主站每页 60 项映射为子站三页、每页 20 项，不依赖新增 pageSize API；实施时重新验证源站页大小和最后一页，避免写死假设导致商品遗漏。
多语言按参考站 24 语规划，具体完整规则见第 13 节；不只翻译菜单。

## 8. 品牌资源和跳转规则

- 从当前 LoveGoBuy 官方页面核对原始 LOGO 和 favicon，保存来源 URL、核验日期与资源文件。
- 保持图形、比例和色彩；不临时用生成图或第三方 favicon 聚合服务充当“与官方一致”。
- 独立推荐站的说明应自然清晰，不把站点说成官方登录、收款或订单后台。
- 注册按钮固定使用用户给定 URL。
- 购买按钮由统一函数生成已核验平台链接，保留邀请码。
- 商品标题/详情入口先进入子站详情；明确“Buy on LoveGoBuy”的按钮去对应官方商品。这是建议交互，制作前按用户后续要求调整。
- 子站不显示其他代购平台购买入口。
- 商品图片、价格、相册顺序保持与主站一致；图片失效时显示诚实占位，不换成另一个商品图。

## 9. GitHub 与项目文件组织

目标仓库已由用户指定：https://github.com/hehaize88-code/hehaize 。
已查看用户截图及仓库根目录，现有 cssbuychina-net、kakobuypick-com、oopbuytab-com 等均按域名将点号换成连字符的方式命名。
本项目遵循相同规则：若最终选 lovegobuytab.com，则目录是 lovegobuytab-com/；若选其他域名则使用对应目录。域名尚未确定，不提前把建议域名写成已确认。
所有源代码、依赖、配置、品牌文件、记忆与变更日志放在本站目录，发布命令以该目录为工作目录。保留其他站点文件与已有发布设置。
每域名独立构建、独立发布、独立域名绑定；修改一个目录不自动部署所有站点。无需为本项目新建独立 GitHub 仓库。

| 建议文件 | 用途 |
| --- | --- |
| PROJECT_MEMORY.md | 本文件的项目内持续版本 |
| CHANGELOG.md | 每轮修改、验证、提交与发布状态 |
| docs/data-contract.md | 已核验的真实接口和字段 |
| docs/seo-map.md | 关键词与页面对应、研究来源 |
| src/config/site.ts | 当前域名、品牌、注册链接、邀请码、语言 |
| src/lib/cnbuycha.ts | 单一数据适配层 |
| src/lib/purchase-links.ts | 已确认平台的购买链接构造 |
| src/pages/ | Astro 页面与固定路由 |
| public/brand/ | 官方品牌资源及来源说明 |
| .github/workflows/ | 检查、构建与明确目标的发布 |

当前只创建本记忆文件。上表中的其他文件尚未创建。
后续创建本站域名目录时，将本文件作为目录内 PROJECT_MEMORY.md 纳入现有仓库的版本控制，以该工程内最新记忆为准。
不要在源站和多个子站复制可独立变化的接口逻辑；公共规则可复用，域名配置与视觉页面仍独立。

## 10. 验收与实施顺序

实施顺序：
1. 用户确定最终域名；GitHub 目标仓库已经明确，无需再次询问。
2. 核对源站公开页面与同仓库现有适配层；验证列表、分页、搜索、排序和详情；记录搜图与 QC 的真实可用性。
3. 固定 Astro 最新稳定版和运行环境，完成可用预览。
4. 以真实商品贯通：分类 → 搜索 → 排序 → 分页 → 详情 → 官方购买。
5. 完成首页 SEO、独立页、品牌资源、移动端和首版内容。
6. 构建、上线并记录实际版本与网址；再给出实际存在的 sitemap 和收录地址。

必须验证的真实行为：
- 商品总数与主站有效数据一致，第一页、任意中间页和末页可达。
- 搜索不是仅搜当前页；排序结果与主站规则一致。
- 测试商品内部 ID 3470 的购买链接使用 7876894732，且保留 161CPG。
- 图片第一张与主站一致，相册没有丢页、重复错配或相对路径错误。
- USD 金额与主站换算一致，不重复换汇。
- 搜图有真实请求和匹配结果；不存在时不能以普通关键词搜索伪装。
- QC 与普通商品图区分明确。
- 首页和核心目录在 HTML 中有正文与真实链接，不依赖空壳加载完成才能被理解。
- sitemap/robots 返回 200、正确内容类型；站点地图没有预览域名、搜索参数组合或不存在的页面。
- 每个可索引分页有自己的稳定 URL/canonical；搜索和排序组合避免大量重复收录。
- 结构化数据只反映页面可见事实，不编造评分、库存或 QC 保证。
- 手机端无横向滚动；图片尺寸预留；首页和独立页空白占位受控。
- 发布失败不覆盖上一个正常版本；记录 GitHub 提交与实际部署是否一致。

## 11. 已做 / 未做与下一轮入口

已做：
- 官方与竞品公开研究、关键词方向整理；
- 6 个域名的注册局状态检查；
- Astro 当前稳定版和 SSG/SSR 部署边界核验；
- 主站列表和示例商品核对；
- 主站候选仓库的只读源码检查；
- 本项目记忆文件建立和补全。

未做：
- 未购买域名、未新建或修改远程仓库；
- 未新增主站 API、搜图或 QC 服务；
- 未创建子站页面、未复制商品数据库；
- 未部署 GitHub Pages 或其他运行环境；
- 未完成官方 LOGO/favicon 原始资产核验；
- 未提交 GSC/Bing、未配置 GA4、未创建定时任务。

下一轮先读取本文件，沿用已确定的 hehaize88-code/hehaize 仓库和一域名一目录规则。仅最终域名尚未确定；无需再次索取仓库、注册链接、邀请码或主站后台账号。继续完成不依赖域名的工作，保持本轮仅 LoveGoBuy 的范围。

## 12. 研究来源

技术：
- https://registry.npmjs.org/astro/latest
- https://astro.build/blog/astro-740/
- https://docs.astro.build/en/guides/deploy/github/
- https://docs.astro.build/en/guides/on-demand-rendering/

主站与源码：
- https://cnbuycha.com/
- https://cnbuycha.com/AllProducts/
- https://cnbuycha.com/shoes/3470.html
- https://github.com/hehaize88-code/cnbuycha
- https://github.com/hehaize88-code/cnbuycha/blob/3c0bda0d8d28173190304798aa242e252b40f56b/src/index.js
- https://github.com/hehaize88-code/cnbuycha/blob/3c0bda0d8d28173190304798aa242e252b40f56b/src/db.js
- https://github.com/hehaize88-code/cnbuycha/blob/3c0bda0d8d28173190304798aa242e252b40f56b/src/html.js

平台官方：
- https://www.lovegobuy.com/
- https://www.lovegobuy.com/login/signup
- https://www.lovegobuy.com/help-center/index
- https://www.lovegobuy.com/article/index?article_id=10003
- https://m.lovegobuy.com/article/detail?articleId=10003
- https://www.lovegobuy.com/product?id=7876894732&shop_type=weidian&invite_code=161CPG

竞品：
- https://lovegobuy.cc/
- https://lovegobuy.cc/guide/
- https://lovegobuywithqc.com/
- https://lovegobuywithqc.com/about
- https://www.jadeship.com/search/spreadsheet/lovegobuy
- https://www.lovegobuyfinds.com/

证据限制：搜索引擎可能返回缓存；官方部分动态页面只返回 iframe 或拒绝抓取。本轮未以不完整信息编写具体运费、优惠、仓储期限或售后政策。

## 13. 参考站与 24 语言实施决定（2026-10-22 第二轮）

用户新增要求：
- 未来部署到 hehaize88-code/hehaize，每域名独立文件夹，沿用截图结构。
- 全部商品与图片等内容都调用 CNBuyCha，不另建数据库。
- 参考 kakobuypicklist.com，研究多语言怎么做。
- 不需要管后台。

实际观察：
- 已成功查看用户上传的仓库截图，并与 GitHub 实际根目录一致核对。
- 已读取参考站英文、德文、法文首页、英文/德文 Spreadsheet，以及英文/德文同一商品详情。
- 参考站导航列出 24 个语言：en、de、es、fr、it、pl、pt、ro、sv、nl、da、fi、el、cs、hu、bg、sk、hr、sl、lt、lv、et、ga、mt。
- 参考站采用默认英语根路径和其他语言前缀，商品语言切换保留平台与商品 ID。
- 参考站抽查的商品图片来自 img.qqsheet.com；不把该域名或其商品/QC 数据加入本项目来源。
- 抽查英文与德法页面的部分介绍并不完全一致，商品价格也出现微小差别。本项目必须从同一数据快照/缓存取得相同 USD 金额；语言切换不减少正文或商品集。
- 这里只完成抽查，没有宣称 24 个语言的全部页面已验收。

采用的语言清单：

| 代码 | 语言 | 代码 | 语言 |
| --- | --- | --- | --- |
| en | 英语 | el | 希腊语 |
| de | 德语 | cs | 捷克语 |
| es | 西班牙语 | hu | 匈牙利语 |
| fr | 法语 | bg | 保加利亚语 |
| it | 意大利语 | sk | 斯洛伐克语 |
| pl | 波兰语 | hr | 克罗地亚语 |
| pt | 葡萄牙语 | sl | 斯洛文尼亚语 |
| ro | 罗马尼亚语 | lt | 立陶宛语 |
| sv | 瑞典语 | lv | 拉脱维亚语 |
| nl | 荷兰语 | et | 爱沙尼亚语 |
| da | 丹麦语 | ga | 爱尔兰语 |
| fi | 芬兰语 | mt | 马耳他语 |

多语言实现规则：
1. 使用 Astro 独立语言路由。英语为 /，其他语言使用 /de/、/fr/ 等；同一文章和商品保持相同内容标识。
2. 界面、分类文案、SEO 标题/描述、首页正文、Guide、Shipping、FAQ、文章正文全部有对应翻译。不用整页即时翻译浮层代替可抓取页面。
3. 各语言商品身份、图片顺序、价格、原商品 ID 和购买目标共享。品牌、型号与原商品 ID 不翻译；可翻译描述性标题和商品文案，但不能新增原文不存在的材料、尺寸、认证等属性。
4. 商品翻译属于展示层派生文本，可放版本化语言资源中；不创建第二份商品库存或独立商品后台。源文变化时标记翻译需更新。
5. 切换语言保留当前商品/文章、分类、页码、排序和有效搜索参数；不一律回首页。语言选择菜单支持搜索和母语名称，在手机端使用可滚动弹层，避免横向溢出。
6. 不根据 IP 强制跳语言；尊重用户明确选择，保留可直接访问的语言链接。
7. 每页 HTML lang 与正文一致；各语言页面使用自己的 canonical；对应页面互相列出 hreflang，并加 x-default 指向英语对应页。
8. sitemap 按语言/内容类型拆分，索引文件汇总。24 语乘以约 3,456 商品约为 82,944 商品 URL（仅容量估算，实际用源站计数），不塞入一个超限文件。
9. 构建时校验各语言页面集合、文章/FAQ 条目数和关键结构是否一致；缺失翻译阻止该发布版本通过，不悄悄丢页或用英语正文冒充已完成语言页。
10. 主站搜索目前已确认按标题/source_id 查找；不因此宣称能理解任意语言的同义词。搜索词按实际主站接口规则传递，商品品牌/型号/ID 搜索优先保持准确。

参考布局采用：
- 紧凑顶部导航、清晰搜索框、语言选择；
- 分类入口、商品网格、排序与页码；
- 单品主图/相册、来源事实、清晰的 LoveGoBuy 购买按钮；
- 首页 SEO 内容与指南入口，保持移动端紧凑。

素材边界：
- 全部商品、主图、详情图、真实 QC、价格和商品事实来自 CNBuyCha 的返回内容。
- 图片 URL 可以是 CNBuyCha 返回的原始 CDN 地址；按来源核验保留，不根据商品 ID 猜图，不抓参考站图。
- 不使用任务提示图、演示商品或生成的商品图填充页面；无图时使用明确文字状态。
- LoveGoBuy LOGO/favicon 按用户第一轮要求取官方真实资源，这属于品牌素材，不属于外部商品数据源。
- 首版不加入其他代购平台切换器。

## 14. 已有无数据库接入方案的核验与修正

检查对象：
- https://github.com/hehaize88-code/hehaize/blob/main/oopbuytab-com/README.md
- https://github.com/hehaize88-code/hehaize/blob/main/oopbuytab-com/src/lib/catalog.ts
- https://github.com/hehaize88-code/hehaize/blob/main/oopbuytab-com/astro.config.mjs
- https://github.com/hehaize88-code/hehaize/blob/main/oopbuytab-com/wrangler.jsonc

已从代码确认：
- catalog.ts 使用 fetch 读取 cnbuycha.com 的公开 HTML，并使用 linkedom 解析商品卡、详情图、价格、分类和来源链接。
- listing 把主站 60 项一页映射成子站 20 项一页。
- 查询仍交给主站：q、sort、page；不自己建商品搜索索引。
- 详情从原始卖家 URL 取原商品 ID，再构造对应代购购买链接。
- 图片仅接受经主站返回的 URL，代码已识别 CNBuyCha 自有图片路径和 si.geilicdn.com。
- 现有 Astro 配置使用 output:server，发布配置没有商品数据库绑定。
- README 已明确搜图未找到核实端点、商品照片不是已验证订单 QC；LoveGoBuy 仍需如实保留这个能力边界。

对上一轮规划的修正：
- “未找到公开 JSON API”不等于必须新增主站 API 才能做子站；已有 HTML 读取路径可优先适配。
- 不把读取商品转换成要求后台登录或建设后台。
- 不直接复制 OOPBuy 品牌、链接、文章、邀请码或过期状态。只复用经核验的数据读取方法。
- 原适配层写死了分类集合，LoveGoBuy 应以主站真实分类完整性为准，防止以后新增分类被静默丢弃。
- HTML 解析依赖源站结构，需加入结构检测、有限重试、缓存与最后成功数据保护；本轮尚未做实时部署端验证。
- README 与生产配置的发布描述存在时间差，实际部署状态以对应发布证据核验；本轮不改 OOPBuy。

第二轮完成状态：
- 仓库位置与目录命名已确认；
- 参考站页面结构、24 语言路由已抽查；
- CNBuyCha 无独立数据库读取方式已从现有代码找到；
- 本记忆已更新；尚未新建 LoveGoBuy 远程目录或部署。

补充来源：
- https://kakobuypicklist.com/
- https://kakobuypicklist.com/de/
- https://kakobuypicklist.com/fr/
- https://kakobuypicklist.com/spreadsheet/
- https://kakobuypicklist.com/de/spreadsheet/
- https://kakobuypicklist.com/products/weidian/7861977678/
- https://kakobuypicklist.com/de/products/weidian/7861977678/
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://docs.astro.build/en/guides/internationalization/


## 15. 域名候选复查（2026-10-22）

用户再次询问短名称与 spreadsheet 类似名称，尚未选定域名。重新读取 Verisign .com RDAP：lovegobuytab.com、lovegobuylist.com、lovegobuygrid.com 返回 404；lovegobuysheet.com 返回 200 并给出注册对象。首选仍为 lovegobuytab.com，list 为第二选择，grid 为第三选择。404 不保证能注册或普通价格，购买前以注册商即时结果为准。尚未购买或创建远程目录。


## 16. 首站域名与公开预览（2026-10-22）

用户已购买 lovegobuytab.com；此前未购买状态已失效。当前授权制作公开预览，正式域名暂不绑定。使用 Astro 7.4.2 SSR，无独立商品数据库。目录 lovegobuytab-com。首页主关键词 LoveGoBuy spreadsheet；顶部有 FAQ 与 Articles 独立入口。研究产物 docs/research.md；计划 10 篇完整文章、36 条 FAQ、24 种语言。预览项目 ID appgprj_6ad98a5b641081919c7c4968d2ad7309，预期地址 https://lovegobuytab-preview.hehaize88.chatgpt.site（尚未发布）。


## 17. 预览实现与验证进度（2026-10-22）

- 已新建独立预览 Site，ID 见第 16 节；访问范围已按用户公开链接请求设为 public，尚未把 purchased domain 指向此站。
- SSR 首页、商品目录、详情、FAQ、Articles 目录与文章正文已实现；顶部入口包含 FAQ 和 Articles。
- 官方 LOGO 原始资源为 https://www.lovegobuy.com/img/logo8.png，favicon 为 https://www.lovegobuy.com/favicon/96.png；原始字节保存在 public，来源记录于 docs/brand-assets.md。
- 英文文章最终 10 篇共 8,825 词，每篇 857–929 词；FAQ 36 条。详见 docs/research.md。24 语言正文逐段翻译完成，共 240 篇文章页面和 864 条 FAQ；结构校验通过，禁止缺少文章、问题、段落或英文占位。
- 直接运行打包后的 Worker：首页、FAQ、文章目录、独立文章、搜索与商品详情均返回 200；源站读取成功，3,456 商品，目录每页 20 个。
- 购买示例内部 catalog ID 3470 正确转换为 Weidian ID 7876894732，invite_code=161CPG；详情 4 张原始照片。
- 开发预览的出站 fetch 失败；相同打包 Worker 在当前执行环境的真实源站集成检查成功。后续必须在公开部署环境再次验证源站和图片。
- 预览 noindex；正式域名上线前用 SITE_URL 设置生产 canonical 并复查 robots/sitemap。

## 18. 公开预览发布记录（2026-10-22）

- 公开地址：https://lovegobuytab-preview.hehaize88.chatgpt.site
- Sites 返回部署成功，站点 active，访问范围 public；版本 1。
- Site source commit：5591ed3f65e1f2f30d4b62334b3d3a8cdd023b5a。
- version ID：appgprj_6ad98a5b641081919c7c4968d2ad7309~appgver_cc8e7c973e3c8191ab885ada77d92e11。
- deployment ID：appgdep_6ad993c0f0088191b1a0e1b73b81977e。
- build 完整通过：24 种语言、240 个完整文章页、864 条 FAQ；页面使用真实源站商品数据，未建立商品数据库。
- 公开站自动浏览器遇到 Cloudflare “Sorry, you have been blocked”，Ray ID a4e5d4291e937eb7。未绕过拦截；公开环境商品加载和移动端交互仍需用户打开链接或平台解除拦截后复核。不能将本地真实数据检查写成公开站点加载验收。
- GitHub 已保存于 preview/lovegobuytab-com 分支下 lovegobuytab-com/，独立草稿 PR：https://github.com/hehaize88-code/hehaize/pull/25。实现提交 c352ce83af0972be9066dde8e8ef8d6c7cc1e488；共新增 100 个文件。不合并主分支，不绑定正式域名，不修改其他站点。
- 已知范围：搜图与订单 QC 的公开接口尚未核实；照片只标为商品照片。暂不提供虚构功能。生产上线前补齐源站接口或保持明确可用范围，并实现源站驱动的商品 sitemap 分片。
