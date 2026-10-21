# Superbuy 独立推荐站：项目记忆与实施规划

更新日期：2026-10-19（Asia/Shanghai），正式域名部署与公网验收完成
当前阶段：正式站 https://superbuytab.com 已上线，www与HTTP保留路径/参数308跳转至HTTPS主域名。用户Chrome真实商品与图片正常；GitHub main的superbuytab-com/自动部署到独立正式Worker。预览 https://superbuytab-preview.hehaize88.workers.dev 保留且noindex。GA4已接入且收到实时page_view，资源559470846、衡量ID G-4DQX9MML4J；未修改cnbuycha。正式上线细节见第18节，统计接入见第19节。
本文件是后续开发的连续记录。已确认要求、事实、建议和未解决事项必须分别维护，不能把建议写成用户已批准的决定。

## 1. 用户已确定的要求

- 每次对话只处理一个平台和一个独立域名。本次 Superbuy；LoveGoBuy、Oopbuy 后续另开任务。
- 所有商品、搜索、搜图、QC 照片、分类、排序等都复用 https://www.cnbuycha.com/ 项目。
- 本次数据源明确是 cnbuycha.com，不沿用旧任务的其他主站域名。
- 使用实施时最新稳定版 Astro，允许 SSR 或 SSG；源码固定提交到 https://github.com/hehaize88-code/hehaize ，每个域名一个独立文件夹，不为首站新建 GitHub 仓库。
- 子站不另建数据库、商品 JSON 副本、商品图片库、搜索索引或管理后台；cnbuycha 主站作为只读来源，不修改其后台。
- 商品图、价格、分类、文字搜索、排序、可用 QC 和搜图能力全部来自 cnbuycha。没有演示商品、假图片、生成式商品替代图；主站未提供的能力不伪装为可用。
- 参考 https://kakobuypicklist.com/ 的页面与交互，商品和图片仍只读取 cnbuycha，不搬参考站商品。
- 多语言具体实现由助手规划；本轮据参考站提出 24 语言方案，详细规则见第 7 节。
- 正式域名：superbuytab.com，用户于2026-10-19 10:39确认已购买。
- 每个域名包含平台品牌；首页以 SEO 为主，首站核心词 superbuy spreadsheet；先研究其他词及竞品。
- Logo 和 favicon 与该平台官网一致，使用真实素材；页面清楚说明独立推荐站身份。
- 每个平台的注册和购买链接由用户提供。本次只采用下文 Superbuy 链接。
- 开发过程中持续更新项目记忆、接口约定、验证记录、提交与部署记录。

## 2. 调研结论及证据边界

本次研究使用公开搜索结果、竞品页面、Superbuy 官方页面、Astro/GitHub/Google 官方文档，以及用户 GitHub 仓库。
未取得 Keyword Planner、Ahrefs 或 Semrush 的搜索量/关键词难度数据；没有声称掌握竞品真实流量或排名。下面的优先级是基于搜索意图、实际页面主题和转化路径的判断。

### 竞品页面观察

| 页面 | 实际观察 | 对首站的启发 |
| --- | --- | --- |
| superbuyspreadsheet.org | 首页覆盖 spreadsheet、分类、QC、shipping；页面明确其搜索仅覆盖选定商品 | 搜索范围和商品总数必须真实，给用户完整可用的目录 |
| chinafinds.app/superbuy-spreadsheet | 分类入口、商品图和价格、Buy with Superbuy；连接商品发现与购买 | 商品详情到用户指定 Superbuy 购买链接，缩短转化路径 |
| superbuyfind.org/spreadsheet/ | spreadsheet 中心页、10 类入口、比较/QC/运输指南 | 首页承担主关键词，指南分别解决具体问题 |

竞品自己的数量、可靠性或质量评价只视为其页面文案，没有独立核验，不能照抄成本站保证。

### 域名候选（仅 Superbuy）

| 优先级 | 候选 | 选名理由 | 2026-10-19 核验状态 |
| --- | --- | --- | --- |
| 1 | superbuytab.com | 包含完整品牌，短、无连字符；tab 与表格/浏览入口有关，适合推荐目录 | 未确认可注册：搜索未返回明确站点；RDAP 请求 HTTP 404，但没有可解析的标准 RDAP 错误体，不能据此保证可购买 |
| 2 | superbuypick.com | 品牌 + 精选；与商品推荐定位直接相关 | 未确认可注册：RDAP HTTP 503 |
| 3 | superbuypicks.com | 复数 picks 自然表达多款精选 | 未确认可注册：RDAP HTTP 503 |
| 不列为普通新注册候选 | superbuyfinds.com | 意图清晰 | 注册局 RDAP 返回 HTTP 200，ldhName=SUPERBUYFINDS.COM，已有注册记录 |
| 不列为普通新注册候选 | superbuysheet.com | 词义直接 | 当前打开为域名出售页面，不是已确认可按普通注册价购买的空闲域名 |

以上是前期候选研究的历史结果。更新：用户于2026-10-19 10:39明确已购买 superbuytab.com，首站域名已定；不再继续推荐其他候选或要求重新查是否可买。
Google 官方说明会避免给精确匹配搜索词的域名过多权重，因此不需要为了包含完整 spreadsheet 而牺牲可读性或支付未经评估的溢价。
LoveGoBuy 与 Oopbuy 仅保留未来采用“品牌 + 短词”的命名思路，本轮不选择、购买或实施其域名。

## 3. 关键词与页面分工（建议）

| 优先级 | 页面 | 主词 | 辅助词/意图 |
| --- | --- | --- | --- |
| P0 | / 首页 | superbuy spreadsheet | superbuy spreadsheet 2026, superbuy finds, superbuy links |
| P0 | /spreadsheet/ | browse superbuy spreadsheet | 商品检索和排序工具；首页是主词的主要 SEO 落地页 |
| P1 | /categories/shoes/ | superbuy shoes spreadsheet | superbuy shoes, superbuy sneaker finds |
| P1 | /categories/hoodies/ | superbuy hoodies spreadsheet | superbuy hoodie finds |
| P1 | /categories/t-shirts/ | superbuy t shirt spreadsheet | superbuy clothing finds |
| P1 | /qc/ | superbuy qc photos | how to check superbuy qc；真实 QC 检索功能待数据确认 |
| P1 | /guide/ | how to use superbuy | superbuy buying guide, how to order on superbuy |
| P1 | /shipping/ | superbuy shipping cost | superbuy shipping calculator, volumetric weight；先做官方工具使用指南 |
| P1 | /articles/superbuy-fees/ | superbuy fees | superbuy service fee, total cost；事实发布前查官方 |
| P2 | /articles/superbuy-weidian-links/ | superbuy weidian links | how to buy from weidian with superbuy |
| P2 | /articles/superbuy-sizing/ | superbuy size guide | 具体商品测量与选码 |

首页建议标题：Superbuy Spreadsheet – Product Finds & Buying Guides
首页 H1：Superbuy Spreadsheet
当真正有可核实 QC 图片后，才将 QC Photos 加入商品能力宣传。年份必须随内容实质复核更新。

首批内容建议：
1. How to Use a Superbuy Spreadsheet：选分类、筛选、确认原始链接、进入购买。
2. How to Buy from Weidian with Superbuy：原始商品链接与联盟跳转，保留商品上下文。
3. Superbuy QC Photos: A Practical Inspection Checklist：卖家图与仓库实拍的区别、尺寸与瑕疵检查。
4. Superbuy Shipping Calculator: Weight, Dimensions and Estimates：官方计算器使用方法，不编造报价。
5. Superbuy Fees Explained：商品款、国内运费、国际运费和可选服务，逐项核对官方。
6. Superbuy Shoe and Clothing Size Guide：基于实际尺码表和测量，不作质量或真伪保证。

文章不堆叠同一主词，不采用换品牌名批量复制的正文；首页、分类、工具和文章承担不同任务。文章正文使用讲解结构，FAQ 若需要则单独组织。

## 4. 已核实的 cnbuycha 技术现状

仓库：https://github.com/hehaize88-code/cnbuycha
分支：main
本次读取源码提交：3c0bda0d8d28173190304798aa242e252b40f56b
实现：Cloudflare Worker + D1 + 图片服务；不是 Astro。只复用数据/能力，不需要为了子站重写主站。

| 能力 | 已读代码的结论 | 首站接入要求 |
| --- | --- | --- |
| 商品与分类 | 主站有查询层；hehaize 已有只读 HTML 适配器 | 优先复用现成适配器，不修改主站或增加数据库 |
| 搜索 | 匹配 title 或 source_id，参数 q/keywords | 保持同一匹配逻辑；分类和翻页要组合验证 |
| 排序 | new=创建时间倒序；click=views 倒序；price=价格升序 | “热门”是浏览量，不应标成销量；价格降序须明确增加后再展示 |
| 列表 | /AllProducts/ 和分类路径；源站每页 60 项 | 子站可按 20 项展示，使用源站页号和偏移量映射，无须更改主站 |
| 商品详情 | /分类/内部ID.html；含 source_id、source_url 和图集 | 内部 ID 与来源市场商品 ID 分开保存 |
| 图片 | main_image + product_images；支持旧图片与新增图片 | 相对路径解析为 cnbuycha 绝对 URL，保留主图顺序 |
| JSON API | 当前公开路由没有商品/搜索 JSON API；/health 返回 JSON | 不以新增主站 API 为前置条件，使用已核实的只读 HTML 适配器 |
| 搜图 | 已读前台/路由没有上传识图或相似图检索实现；现有子站也记录未接通 | 后续只核实 cnbuycha 是否有可调用入口；本任务不自建识图服务，不上传到新第三方 |
| QC | product_images 没有 QC 类型、拍摄来源或订单证据字段；/qc-photos/ 是说明页 | 只展示主站提供的图片；只有来源已明确标为 QC 才用 QC 标签，本任务不改数据表 |
| 联盟链接 | src/html.js 现有 Superbuy 使用 partnercode=ES7pVI | 与用户本次提供的代码一致 |

上述结论针对已读源码，不等于证明所有外部服务或所有线上部署都不存在这些能力。后续实施前应核对主站的最新部署和可能的其他仓库。

## 5. 架构与读取约定（预览已实施）

### 技术选择

- 官方当前最新已发布版本系列：Astro 7.4，官方公告日期 2026-10-15。创建项目时再解析 astro@latest，记录确切补丁版和 Node engines，提交 lockfile；不要把浮动 latest 留给生产构建。
- 根据本轮“全部调用主站、不复制商品”的要求，优先采用 Astro SSR：含商品的首页、目录、分类、详情在服务端读取 cnbuycha，输出完整 HTML；纯指南和文章可 SSG。
- SSR 只读适配模块是子站展示代码，不是新商品后台，不含数据库或持久化商品存储。
- GitHub 保存源码、审查变更、运行构建并触发发布；正式网站需要选择适合商业导购的托管环境。
- GitHub Pages 只托管静态内容，不能执行 Astro SSR；GitHub 官方也对主要促进商业交易的网站用途有限制，因此本项目不建议把 Pages 作为正式托管。
- 可以评估现有 Cloudflare 环境运行 Astro（当前主站已经使用 Worker），或采用支持 Astro 的其他正式托管。此次未连接或修改 Cloudflare。
- 没有确认运行环境前，不创建只会在某一环境工作而无法交付的部署配置。

### 数据流

访客在 Superbuy 子站浏览 → 子站读取 cnbuycha 统一商品服务 → 商品图/价格/分类由同源数据返回 → 点击购买进入 Superbuy 官方商品页。
SEO 正文保存在子站代码库；商品事实由 cnbuycha 负责。源站更新商品后，所有子站共享同一数据，不维护相互漂移的商品后台。

### 现有读取方式（2026-10-19 补充核实）

已直接读取：
- hehaize/kakobuypick-com/src/lib/catalog.ts，blob SHA 48fd5f2de06762d206ff019daadfb2f6a6706339。
- hehaize/sugargootab-com/src/lib/catalog.ts，blob SHA fa89f3a9fed9693d4c594d081c27df797340aa95。

这两个模块从 cnbuycha 公共 HTML 读取数据，解析商品卡、结果数量、详情图集和原始购买链接。没有连接独立数据库。此发现替代上一版“必须先给主站增加 JSON API”的建议。

| 已有源路径 | 用途 | 子站处理 |
| --- | --- | --- |
| / | 首页商品与分类数量 | 解析真实商品卡，不写入静态商品清单 |
| /AllProducts/?q=&sort=new\|click\|price&page= | 文字搜索、排序与翻页 | 原参数传给主站，结果在子站显示 |
| /{category}/?q=&sort=&page= | 分类列表 | 使用主站有效分类映射 |
| /{category}/{internalId}.html | 商品详情、原始链接和图片 | 保持内部 ID 与原始市场 ID 分离 |

图片使用主站返回的精确地址。主站目前也可能返回 si.geilicdn.com 原始微店 CDN 地址：来源仍是 cnbuycha，不能强改成 cnbuycha 路径导致图片丢失，也不能因此主动抓取微店或参考站的其他图片。
图片缺失显示文字和重试，不用不相关图片填充；Logo/favicon 按先前用户明确要求使用平台官网素材。

采用服务端读取，访客浏览器不需要跨域请求主站 HTML。请求仅允许已核实源站路径，限制超时、响应大小和并发；读取失败显示错误状态，不回填假商品。
主站 60 项分页可映射为子站 20 项；第 n 页源页=floor((n-1)/3)+1，偏移=((n-1)%3)*20，保证不重不漏。不要只截取每个源页前 20 项。
不持续批量抓取整站；如果短时内存缓存确有必要，必须可过期，不能变成需要独立维护的商品库。

### 仓库组织（用户已指定）

固定仓库：hehaize88-code/hehaize，沿用现有“每域名一个文件夹”方式，截图与 GitHub 实际目录已核对。
用户已选择并购买 superbuytab.com，对应目录确定为 superbuytab-com/。
每个目录自行包含 package.json、lockfile、astro.config.mjs、src、品牌资产、部署配置和 PROJECT_MEMORY.md。平台名、域名、Logo、注册/购买规则、语言、数据源集中配置。
构建根目录指向当前域名文件夹，触发范围限制为该目录；不覆盖根 README 或其他站目录，不复用其他站的域名/联盟码。
GitHub 只保存代码、品牌资产和原创/翻译内容；不提交商品目录快照、商品图片或数据库。用户说“到时候需要部署的时候”，本轮仅核查与更新规划，没有推送新目录。

建议项目文件：
- PROJECT_MEMORY.md：事实、决定、进度、阻碍和下一步；由本文件迁入。
- docs/data-contract.md：真实接口、字段、分页、错误、缓存与图片语义。
- docs/seo-keyword-map.md：页面负责的关键词及来源。
- docs/deployment.md：运行环境、发布流程、回滚步骤。
- docs/brand-assets.md：官方 Logo/favicon 原始 URL、日期、校验值和使用位置。
- CHANGELOG.md：每次改动与提交/部署标识。

## 6. Superbuy 注册与购买规则

partnercode：ES7pVI
测试微店商品 ID：7831516792

用户提供的购买链接：
https://www.superbuy.com/en/page/buy/?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D7831516792&partnercode=ES7pVI

用户提供的注册链接：
https://www.superbuy.com/en/page/register/?ref=https%3A%2F%2Fwww.superbuy.com%2Fen%2Fpage%2Fbuy%2F%3Furl%3Dhttps%253A%252F%252Fweidian.com%252Fitem.html%253FitemID%253D7831516792%26partnercode%3DES7pVI

规则：
- sourceUrl → 购买 URL 的 url 参数；partnercode 固定 ES7pVI。
- 完整购买 URL → 注册 URL 的 ref 参数。
- 优先使用原始 sourceUrl；仅当来源确认是微店且 source_id 有效时，才按微店 ID 拼接。
- 不把 cnbuycha 内部数字 ID 当作微店 itemID；不把淘宝/1688 链接强行替换成微店。
- 全局注册按钮默认保留用户提供的原始注册链接；商品页注册按钮保留当前商品上下文。
- CTA 明确标为在 Superbuy 注册/购买，独立站不收集 Superbuy 密码。
- 联盟外链使用恰当的 sponsored/noopener 属性，并说明推荐关系。

验证：已用 Node URL/URLSearchParams 生成测试链接，与用户提供的购买和注册格式一致；注册 ref 解码后仍为微店 ID 7831516792，partnercode 保留。
验证边界：仅完成编码与参数校验，未注册账号、下单或实测佣金归因。

## 7. 页面、品牌和移动端约定

- 首页首屏：官方品牌素材、Superbuy Spreadsheet 标题、短说明、搜索框、浏览目录与注册按钮；正文包含分类、真实精选商品、使用步骤和最新文章卡片。
- 商品卡进入本站独立详情；详情购买按钮去对应 Superbuy 商品，保留 ES7pVI。
- 目录手机端建议双列、每页 20 项；搜索/分类/排序/分页状态一致。预览已采用 20 项，用户可在审阅时调整。
- 首页文章只显示最新 4 篇摘要卡片；完整内容进入独立文章页。
- 主图与 cnbuycha 保持一致；尺寸固定防止跳动，懒加载、失败时文字提示与重试，详情图滑动与缩略图切换。不使用其他商品图作为回退。
- Logo/favicon 已从 Superbuy 官网当前 HTML 中提取并下载原始 SVG。Node fetch 成功；前轮 Python 请求的 403 不代表网站不可访问。原始 URL 见第 12 节，不使用生成式图像仿造。
- 按参考站规划 24 语言：en、de、es、fr、it、pl、pt、ro、sv、nl、da、fi、el、cs、hu、bg、sk、hr、sl、lt、lv、et、ga、mt。这是助手基于用户要求做出的实现方案。
- 英语根路径 /，其余 /de/、/es/ 等；同一个产品使用同一个源站 ID，切换语言保留当前路径、搜索词、分类、排序、页码，不回首页。
- 导航、按钮、分类标签、空状态、错误、说明、首页 SEO 正文、指南、文章、标题与描述全部有完整翻译；同一文章所有语言段落/表格/事实对齐，不缩成摘要。
- 商品标题优先保留主站原文与品牌型号；主站有对应语言字段时使用。不能为所谓本地化改写价格、尺寸、款式、库存或制造不存在的卖点。纯英文商品资料不伪装成完整本地化商品详情。
- 翻译文件只是界面与原创文章文案，不是商品数据库。语言切换不应各自重复维护商品，也不在每次请求时调用第三方翻译。
- 查询词按原样传主站，界面多语言不等于主站搜索具备 24 语语义识别；主站无该能力时不做虚假承诺。
- 每个真实发布语言页面设置一致 html lang、独立 canonical、双向 hreflang 与 x-default；构建检查翻译 key、文章数量/段落与事实一致性，发布前抽检自然度。
- 手机语言选择器使用可搜索下拉或弹层，显示当前语言；24 个语言按钮不全部展开占据页面。
- 首期视觉采用简洁、明亮、紧凑布局；不复制竞品整站。

## 8. SEO 与测量

- 首页是 superbuy spreadsheet 的主要落地页，避免新建多篇主词相同的入口页互相争夺。
- 首页和文章的核心正文预渲染，可在初始 HTML 中读取。
- 分类页用具体选品说明；完全重复的商品镜像不作为独立 SEO 内容，索引前增加有依据的独特信息或保留 noindex。
- 文字搜索、筛选/排序参数组合、搜图结果通常 noindex，避免无限 URL；不要阻止爬虫读取需要识别的 noindex。
- 正式域名确定后再生成 self-canonical、站点地图、robots、OpenGraph、WebSite/BreadcrumbList/Article；Product 只使用真实可验证的字段，不生成评分或库存。
- 多语言发布时检查 html lang、互相对应的 hreflang 和 x-default；每种语言有自己的 canonical。
- 正式绑定后接入站点独立的 GSC/Bing 与 GA4。建议记录 search、image_search、view_item、outbound_buy、outbound_register；搜索词不记录个人敏感信息。
- 观察每个页面的曝光、点击、CTR、排名、搜索后查看商品比例及购买跳出点击，不能只看文章篇数。

## 9. 实施顺序和验收

1. 用户选定首站域名；购买前在注册商核实实时可用性和价格；明确正式托管。
2. 核对 cnbuycha 最新页面结构，复用已存在的只读适配器；搜图与 QC 只核实既有能力，不创建数据库或后台。
3. 在 hehaize88-code/hehaize 的当前域名独立目录内创建锁定版本的 Astro 项目，迁入本记忆文件。
4. 完成首页、目录、分类、商品详情和注册/购买链接；先用真实商品跑通全链路。
5. 完成独立指南、首批文章、品牌素材与选定语言，检查移动端。
6. 构建发布；核验正式域名，不以“GitHub 已提交”代替“网站已上线”。

首站通过后才扩展下一个平台。必须验证：
- 同一商品的标题、主图、价格、sourceId 与主站一致；主站隐藏或删除的商品不会由子站商品副本继续展示。
- 搜索、分类、最新/热门/价格排序和翻页使用同一规则；空结果与异常可恢复。
- 搜图用实际图片得出真实检索结果；没有服务就明确记录为未完成。
- QC 与普通图的来源和类型正确；未知的图片不冒充仓库实拍。
- 不同商品各自跳转正确 Superbuy 页面；注册 ref 保留商品上下文。
- 手机端无页面横向溢出；目录分页不会一次展开全部商品。
- 内链、404、canonical、sitemap 和实际发布语言一致；首页/文章正文已生成。
- 最终记录 commit SHA、部署 ID、正式 URL、验证日期及已知问题。

## 10. 本轮完成记录与下一步

已完成：关键词/竞品研究、域名候选比较、注册状态有限核查、cnbuycha 关键源码审查、Astro/托管资料核对、联盟链接编码验证、本项目记忆文件。
本次追加：查看用户截图与 hehaize 仓库实际结构；读取 kakobuypicklist 首页、目录、搜图页、商品详情和德语对应页；确认参考站有 24 语言入口；检查现有 kakobuypick/sugargootab 只读数据适配器。
修正上一版：取消“首站独立仓库”“先改主站增加 API”建议；固定为 hehaize 每域名一个目录、只读 cnbuycha、无独立数据库/商品副本/后台。
参考站英文与德语首页存在部分介绍段落不同，不能把其 24 个入口直接视为全语言内容完全一致的证明；本站必须主动检查内容等价。
仍未完成：正式域名选择/购买、正式运行环境确认、主站搜图可调用入口和 QC 来源确认、完整 SEO 文章集及正式部署。缺少的主站能力不由本任务自行开发。
下一步：用户先看公开预览，再确认设计和域名。正式部署时迁入 hehaize 对应域名目录，无需用户重复链接或 ES7pVI。

## 11. 来源（查阅日期 2026-10-19）

- https://www.superbuy.com/ — 官方流程、QC 和仓储说明及指南入口。
- https://www.superbuy.com/en/page/guide/feecomposition/ — 费用构成；将来写文章时需再核对实时规则。
- https://www.superbuy.com/en/page/query/freight/ — 官方运费估算工具。
- https://superbuyspreadsheet.org/ — 竞品页面结构与搜索范围说明。
- https://chinafinds.app/superbuy-spreadsheet — 竞品商品、分类和购买路径。
- https://superbuyfind.org/spreadsheet/ — 竞品内容中心与分类结构。
- https://superbuysheet.com/ — 域名出售页。
- https://rdap.verisign.com/com/v1/domain/superbuyfinds.com — 已注册记录；其他候选查询失败/不完整，未确认可购买。
- https://astro.build/blog/astro-740/ — Astro 7.4 官方发布说明。
- https://docs.astro.build/en/guides/on-demand-rendering/ — 预渲染与按需渲染。
- https://docs.astro.build/en/guides/deploy/github/ — Astro 静态站部署 GitHub Pages。
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits — Pages 用途与运行限制。
- https://developers.google.com/search/docs/appearance/ranking-systems-guide — 域名精确匹配并不保证排名。
- https://github.com/hehaize88-code/cnbuycha/tree/3c0bda0d8d28173190304798aa242e252b40f56b — 本轮源码审查基准。
### 本次追加来源

- https://github.com/hehaize88-code/hehaize — 用户指定仓库，目录与截图核对。
- https://github.com/hehaize88-code/hehaize/blob/main/kakobuypick-com/README.md — 现有子站约定。
- https://github.com/hehaize88-code/hehaize/blob/main/kakobuypick-com/src/lib/catalog.ts — cnbuycha 无数据库读取方式。
- https://github.com/hehaize88-code/hehaize/blob/main/sugargootab-com/src/lib/catalog.ts — 主站图片地址保留和子站分页映射。
- https://kakobuypicklist.com/ — 页面结构与 24 语言入口。
- https://kakobuypicklist.com/de/ — 对应德语首页，发现部分段落与英文不同。
- https://kakobuypicklist.com/products/weidian/7819667785/ — 详情图集、规格与 QC 独立分区；不是本站数据源。
- https://kakobuypicklist.com/de/products/weidian/7819667785/ — 同商品语言路径对应。
- https://docs.astro.build/en/guides/internationalization/ — Astro 多语言路由。
- https://developers.google.com/search/docs/specialty/international/localized-versions — hreflang 双向对应与 x-default。


## 12. 2026-10-19 公开预览实现记录

### 用户本轮授权

先制作预览版本并提供公开链接，满意后再准备域名和正式部署。仍未选择 superbuy 正式域名。
助手继续首推 superbuytab.com，并补充 superbuygrid.com（表格网格）与 superbuypick.com（精选）。2026-10-19 本轮注册局请求未能确认候选可注册，返回 404/503；不承诺可买、不虚报价格，未购买。

### 技术与页面

- 本地源码：/workspace/sites/superbuy-preview；临时 Sites 预览，不向用户 GitHub 推送，不新建用户 GitHub 仓库。
- Site ID：appgprj_6ad57d91ae208191b33632960468df34。
- 预期公开 URL：https://superbuy-spreadsheet-preview.hehaize88.chatgpt.site 。实际发布结果另外记录；预期 URL 不等于已发布。
- 显式公开访问，用户要求任何人可打开的链接；没有数据库、上传文件存储或管理后台。
- npm registry 确认最新稳定版本 Astro 7.4.0；锁定版本和 package-lock.json；Node >=22.22.0。
- 自定义 Fetch Worker 适配器，首页/目录/详情请求时读取 cnbuycha；数据未保存为产品 JSON 或静态产品快照。
- 页面：首页 SEO 介绍、分类入口、8 项真实新品、使用步骤、4 项简短 FAQ；/spreadsheet/ 搜索/分类/排序/20 项分页；/products/{category}/{internalId}/ 图集/原始链接/购买；/guide/、/qc/、/faq/、/search/visual/。
- 搜图页明确当前未连接，提供文字搜索；不接收访客图片后伪造结果。商品图明确是产品图，未冒充仓库 QC。
- 界面采用暖白/红色、官网原始蓝黑 Logo、真实商品拼图、手机双列目录。Logo 未改色或重绘。
- 24 语言界面、分类及短说明；保留源商品标题、USD 价格与图片；语言切换保留路径和查询参数。
- 本次是交互和视觉预览：长篇原创文章、分类 SEO 正文与完整指南暂未创建，不能称为内容 SEO 全部完成。
- 临时全站 noindex，robots 禁止抓取；正式域名确认后重新审查索引和 canonical，不能把预览域名直接保留到生产。

### 官方品牌资源

- 官网 HTML：https://www.superbuy.com/ ，2026-10-19 读取。
- Logo：https://cdn.superbuy.com/starit-superbuy/dist/img/homepage-v2/brand/logo-artwork.svg
- Favicon：https://cdn.superbuy.com/starit-superbuy/dist/img/favicon/favicon.svg
- 原始 SVG 保存在 public/brand/；产品图片不保存到项目，使用主站返回的精确 URL。

### 检查记录

- Astro 构建成功。
- 构建 Worker 使用实时 cnbuycha 请求：主页8项，连续4页共80项且无重叠，第4页首项匹配主站第2页首项；空搜索无虚构商品。
- 真实详情样本：CnBuyCha 内部3470，原始 Weidian ID7876894732；Superbuy 使用后者和 ES7pVI。
- 原注册链接 ref 解码后为用户原始购买地址，源商品7831516792和 partnercode 正确。
- 24语言指南路由200、html lang、自引用 canonical、25个 hreflang(含x-default)、同路由语言切换、noindex检查通过；无效页404。
- 浏览器完成桌面/390px手机基础布局及语言菜单/德语切换检查。内部预览服务的对外 fetch 报 fetch failed，无法用该浏览器核验真实图集；本地实际构建 Worker 能访问数据。正式公开发布后必须检查真实URL的数据状态。
- tests/scripts 不创建商品固定数据；scripts/verify.mjs 只请求真实主站并检查关键规则。


### 公开发布结果（2026-10-19 10:29–10:31 Asia/Shanghai）

- 公开地址：https://superbuy-spreadsheet-preview.hehaize88.chatgpt.site
- 访问模式：public，无登录要求。
- 已发布版本：1。
- Version ID：appgprj_6ad57d91ae208191b33632960468df34~appgver_7f7824da8b6481918b1f513d9dcebbb5。
- Deployment ID：appgdep_6ad5809688e481919156046d50f39e30，返回 succeeded。
- 已推送源码提交：60cd5ee2207228bda044ca82624a97901caf8aef（临时 Sites 源码，非用户 GitHub 仓库）。
- 公网直接请求复核：/ 返回200且8个真实商品；/spreadsheet/?q=Adidas&sort=price 返回200且20项；/products/shoes/3470/ 返回200和正确 Superbuy 原始链接；/de/guide/ 返回200且德文。
- 官方 logo/favicon 两个公开文件返回200；抽查首页前两张源站图片分别200 image/jpeg、200 image/webp。
- 公开页面 X-Robots-Tag 为 noindex, nofollow。
- 内部浏览器基础排版检查通过；完整商品图浏览器视觉检查受内部预览网络限制，公网页面与图片已用 HTTP 检查通过。没有声称完整真机或所有语言人工审校已完成。
- 正式域名、正式 GitHub 文件夹、正式托管部署均未操作，等待用户看预览后的反馈。
- 本文件保留发布后的最终记录；预览源码仓库中的 PROJECT_MEMORY.md 保留发布前的实施检查记录。正式迁入 GitHub 时，以本文件最新版本同步覆盖项目记忆。


## 13. 域名已购买及 GitHub 正式目录（2026-10-19）

### 已确认

用户原话：“superbuytab.com 已经购买了”。正式主域名确定为 https://superbuytab.com 。不推断域名购买渠道、Cloudflare zone状态或DNS已经生效。

- 目标：hehaize88-code/hehaize，main，superbuytab-com/。
- 本地正式工作目录：/workspace/repos/hehaize-superbuy/superbuytab-com。
- 预览仍独立保留在原URL和原Site，不改为正式域名代理。
- 所有代码、lockfile、官方品牌资产、只读cnbuycha适配器及项目记忆放在当前域名文件夹；没有新数据库或主站后台变更。
- 复用原预览并完成正式部署差异：production canonical、www/HTTP到HTTPS非www的308、ASSETS资源绑定、去掉预览身份文件、正式robots和sitemap。
- 正式域名主页、无筛选目录、指南、FAQ允许索引；搜索/筛选/分页、商品镜像、缺少功能的页面及错误页noindex。尚未以完整独特内容支持大规模商品收录。
- 24语言×4路径=96个sitemap入口，带自引用/交叉hreflang和x-default，无伪造最后更新日期。
- Worker配置名superbuytab-com，入口dist/server/index.js，静态资源dist/client，域名superbuytab.com及www；无任何D1/R2/KV绑定。
- `.node-version`24，Astro7.4.0和Wrangler4.151.1锁定；正式构建不依赖Sites身份或预览托管。
- DEPLOYMENT.md已提供仓库、分支、根目录、构建命令和部署命令的逐项填写值。

### 边界

用户仍只需看原预览。此次准备并提交GitHub，尚未连接Cloudflare、修改DNS、绑定正式域名、创建GA4或提交搜索引擎收录。正式域名是否上线必须以托管部署及公网验收为准，不能把GitHub提交当作上线。

完整SEO文章集、扩充FAQ及主站搜图/QC能力仍为后续工作，没有顺带生成虚构内容。

### 正式目录发布前验证

2026-10-19：npm run build成功；npm run check验证实时80项无重叠、24语言metadata、www保留路径查询308、robots与96条sitemap、临时主机noindex及资源绑定；Wrangler4.151.1 dry-run成功，只包含ASSETS绑定，未发布到Cloudflare。共27个源码/配置/文档/官方品牌文件，不含node_modules、dist、Sites身份、产品数据或产品图片。

### GitHub 提交完成

- 仓库目录：https://github.com/hehaize88-code/hehaize/tree/main/superbuytab-com
- main已更新提交：11b55e573ce781436d22dbebda0fe0395f52059c。
- 提交基于最新读取的efcea6671dc37ff5794af102bd763a56d15ba4c2，带expected_sha保护更新，未强推。
- 27个新增文件全部位于superbuytab-com/，未改动其他平台目录或仓库根文件。
- 正式域名仍未进行托管绑定；本轮未连接Cloudflare或操作DNS。当时直接 HTTP 检查通过；后续用户浏览器访问失败，见第14节。
- GitHub项目记忆记录发布前状态；本文件追加准确提交标识，后续修改时同步。


## 14. 用户公开预览被拦截及独立预览准备（2026-10-19 10:48–10:54）

### 事实与诊断

- 用户反馈“公开预览看不了”。已查看其截图：地址为 superbuy-spreadsheet-preview.hehaize88.chatgpt.site，页面写明“Sorry, you have been blocked / You are unable to access chatgpt.site”。
- 本轮原 Site 查询返回 active、access_mode=public、disabled_by=null，当前版本仍为1；没有把访问模式反复切换。
- 最近180分钟的 Worker 错误日志返回空数组。此结果不能排除边缘网络故障，也不能证明用户请求已到达 Worker。
- 本轮直接 HTTP 请求原预览返回200、正常首页标题和真实商品HTML。与用户截图合并判断，故障表现为 chatgpt.site 访问层拦截；无法从现有证据确认具体触发规则、IP或浏览器因素。
- 不能再用“发布成功”或本环境200宣称用户可用。现有 Sites 管理能力没有提供该平台的 WAF 放行设置；未尝试绕过拦截、修改安全规则或重复发布相同代码。

### 已准备的替代部署

- 当前 GitHub 域名目录新增 wrangler.preview.jsonc；Worker名 superbuytab-preview，workers_dev=true，routes=[]，只绑定ASSETS。
- package.json新增 deploy:preview：wrangler deploy --config wrangler.preview.jsonc。
- DEPLOYMENT.md提供独立预览的完整GitHub构建参数；README修正可达性状态。
- 同一份Astro SSR实时读取cnbuycha，无商品快照或新数据库；不代理chatgpt.site。预览主机保持noindex。
- Wrangler4.151.1 dry-run成功，输出787.80 KiB、仅ASSETS绑定。没有再次重跑与本次配置无关的完整目录测试。
- 本轮只准备并提交代码，没有连接Cloudflare、创建账户Worker、修改DNS、绑定正式域名。独立预览尚未发布，没有新的公开URL。实际部署后才能记录账户返回的workers.dev链接并验收用户浏览器可达性。
- 正式域名上线仍需用户看过预览后的决定；独立预览配置不会自动占用superbuytab.com。

官方配置参考：https://developers.cloudflare.com/workers/configuration/routing/workers-dev/ （本轮核实workers.dev可不接入自定义域名而发布Worker；不保证所有地区网络可达）。

GitHub提交完成：c3d2fb75635131a921456adad4349a9a7b922851，基于11b55e573ce781436d22dbebda0fe0395f52059c，expected_sha保护、未强推；仅改superbuytab-com/内5个文件。新预览未发布，旧URL用户访问故障尚未解除。

## 15. 浏览器接手与独立预览成功（2026-10-19 11:06–11:15 Asia/Shanghai）

用户明确要求“你直接自己操作不行吗”，随后反馈“连不了”。本次直接完成操作，不再要求用户填写部署参数。

- Cloudflare API工具返回UNAUTHORIZED，提示需要重新认证；不再重复尝试该接口。
- Browser成功连接用户Chrome，领取用户已打开的superbuytab.com注册管理页。确认域名Active，属于当前账户；不操作续费或其他域名。
- 当前Cloudflare账户ID为9010cea800ac2a140509889d88fe612e，workers.dev子域为hehaize88.workers.dev。与失效API默认账户不同，操作均在浏览器可见的当前账户内。
- 搜索superbuytab时没有现有应用，创建superbuytab-preview Worker；沿用已授权的hehaize88-code GitHub连接和已存在的Workers Builds凭据。没有创建或提取新令牌，没有扩大GitHub应用权限。
- 仓库hehaize88-code/hehaize、main、根目录superbuytab-com，build=npm run build，deploy=npm run deploy:preview，NODE_VERSION=24。未开启额外分支预览；未新增Access登录要求。
- Build ID：f8b50f65-c0e6-459b-97b5-5da3749fa400。日志显示Node24.22.0，Astro构建成功，Wrangler4.151.1上传成功，仅ASSETS绑定。
- 2026-10-19T03:10:42.960Z正式返回公开URL：https://superbuytab-preview.hehaize88.workers.dev 。Version ID：800fec19-e02f-4c0a-a145-fcb3f1ebe4b7。03:10:48.234Z构建最终Success。
- 运行源码为c3d2fb75635131a921456adad4349a9a7b922851；随后仅同步文档与项目记忆，不改变已验收运行代码。
- 保存构建关注路径：include=superbuytab-com/**，exclude=superbuytab-com/*.md，避免其他域名和本目录记录文件变更触发此预览。
- 仪表盘按默认wrangler.jsonc显示名称不一致提示，因为实际部署显式使用wrangler.preview.jsonc；真实构建成功。未按提示修改正式Worker名；本轮检查GitHub没有打开的自动PR。后续不要把正式域名配置误改为预览名。

### 实际访问验收

- 用户Chrome新标签实际打开公开URL成功，标题和完整首页正常；截图可见官方Logo、3张首屏商品图、实时价格及3446项计数。当前document.images均complete且naturalWidth>0。该结果补足此前只有服务端HTTP200的局限。
- 公开HTTP：首页200且8张商品卡；Adidas搜索+价格排序200且20项；样本详情200，Superbuy链接使用原始Weidian ID7876894732与ES7pVI；德语指南200且lang=de；Logo与favicon200image/svg+xml。
- 预览HTML保持noindex, follow。没有通过购买或注册实际提交订单；商品质量/QC来源及搜图能力的此前限制不变。
- 已将新预览标签保留给用户直接查看。正式superbuytab.com和www仍未绑定，等用户看设计后继续。

部署记录已同步GitHub：ae30fd0980bef12a50c97f01213be2ff24154710，仅更新当前目录README.md、DEPLOYMENT.md和PROJECT_MEMORY.md。使用expected_sha防并发覆盖。


## 16. 分类、分页、FAQ 与文章区改版（2026-10-19，进行中）

- 本轮查看四张截图。分类问题复现：q=nike点击Jersey保留查询，源站返回5项；同分类无搜索为41项。修复目标是分类导航清除q并回第1页，显式分类内搜索仍保留；所有11类完整显示，手机不横向截断。
- 分页按截图使用居中Previous、3个相邻数字按钮、Next；20项分页和主站60项页边界不变，最后一页正确禁用，保留排序/分类/查询。
- 顶部与页脚新增Articles，首页4篇摘要；10篇完整英文原创文章，独立路由、来源、核对日期和相关内链。搜索意图覆盖spreadsheet、Weidian、fees、shipping calculator、QC、storage、packing、returns、sizing、tracking。没有购买搜索量数据，不编造量级或排名。
- 26条FAQ来自Superbuy官网购物指南、费用构成、运费计算器、帮助中心及1688指南；政策精确数字以官方页面为准。官网费用示例存在不一致（113元例子的详细照片价格与服务价目不同；428元运费例子分项加总408），不复制这些示例或不一致的服务名称。
- 编辑语言调整：本批长文章先发布完整英文正文，24语言导航与目录保留；非英文文章界面明确English，canonical指向英文，未翻译长文不宣称24语言等价，也不添加虚假hreflang。后续完整翻译通过段落/事实对齐检查后再启用语言SEO。本条取代第7节对首批文章立即全部翻译的计划；不缩写假装已完成。
- 正式域名仍未绑定；更新既有workers.dev公开预览，不新建数据库、不复制商品/图片、不改其他域名目录。


### 本轮实现与发布前验收

- 已完成10篇独立英文原创文章，每篇1207–1312词；/articles/集合页、顶部/页脚入口、首页4张摘要卡、文章目录、表格、3篇相关内链、官方来源和实际核对日期。未使用文章配图或商品快照。
- FAQ完成26条×24语言完整问答，稳定ID与来源对应；结构化FAQ数据与可见文本一致。翻译做了完整性和数字检查，未声称母语人工审校。
- 分类链接清除q并回第1页，仍保留排序。分类内主动搜索照常。移动端11分类加全部入口使用两列完整显示。
- 分页改为居中上一页、3个连续页码、下一页，当前页深色；首尾禁用、总页数保留；不削减源站内容。
- npm run build成功；npm run check两组验证全部通过：80实时商品跨源站页边界无重复、联盟原ID和24语言metadata；10篇正文/来源/内链/SEO；624条FAQ、分类清除搜索后Jersey41项、首中末页与末页条数。
- sitemap为107项（24语言×4基础路由+11英文编辑路由）；英文正文的非英文界面包装不收录、不伪造hreflang，English说明可见。
- 公网更新及浏览器手机布局验收尚未完成；以下追加最终结果。


### 本轮公开发布与浏览器验收完成

- GitHub运行源码提交：336f1fbfc2f5df8078caf7f1ae830a79a5d6bd0b，基于ae30fd0980bef12a50c97f01213be2ff24154710；expected_sha保护，无强推，24个文件均在superbuytab-com/内。
- Cloudflare自动构建ec340223-c0f3-4b27-a5e6-a1d5b135463a，36秒；部署列表显示该提交Ready、100%流量，活动版本前缀c7d7cdd3。没有从旧剪贴板日志推断新版本完整ID。
- 公开预览继续为 https://superbuytab-preview.hehaize88.workers.dev/ 。/articles/返回200，显示10张文章卡；/faq/和/de/faq/返回26条问答；文章正文SSR可见。预览保持noindex。
- 用户Chrome直接验证：首页新Articles导航→文章列表→费用正文正常。1920px桌面与390px手机文章、FAQ、分类页没有横向溢出；文章表格宽度339px，手机内容区域375px。
- 手机搜索nike后实际点击Jerseys，搜索框清空，结果41，全部12个入口（全部+11类）两列可见。分页视觉为Previous、1、2、3、Next，当前页深色；点2返回20项，点3返回1项并禁用Next。
- FAQ实际展开90天仓储问题，显示答案和官方来源链接。桌面文章集合截图与手机分页截图已保存用于本轮验收展示，不包含账户/付款信息。
- 临时视口设置已重置；用户原预览标签停在新版Articles页面并保留。正式superbuytab.com仍未绑定。
- 后续内容边界：10篇长文当前为英文，未完成23种其他语言的全文翻译；FAQ已有24语言但未独立母语审校。真实QC检索与搜图仍取决于主站能力，不用普通商品图冒充个人订单QC。
- 研究记录在CONTENT_RESEARCH.md。项目记忆同步到同一持久文件与GitHub；本轮仅文档收尾提交不会触发预览构建。


## 17. 完整翻译与手机布局（2026-10-19，进行中）

- 用户指出翻译不完整，要求首页和全部独立页面进一步压缩手机布局。此要求取代第16节暂缓文章全文翻译的安排。
- 本轮目标：10篇文章×24语言的正文、表格、目录、摘要和元数据完整对齐；语言切换保持同篇文章；来源与联盟链接原样保留。
- 手机布局调整覆盖首页、商品目录、详情、文章列表/正文、FAQ、指南及搜图说明页；减小留白、缩短首屏、收起可展开目录，保持内容可访问和点击区域可用。
- 继续更新既有workers.dev预览，正式域名不绑定；所有商品数据仍实时来自cnbuycha。

### 实现与发布前检查

- 完成10篇×24语言完整文章源文件，共240篇；语言独立SSR、标题/摘要/目录/表格/内链/阅读信息/日期已本地化，移除英文正文提示与非英文canonical归英文的临时方案。
- Sitemap更新为360个URL；文章全语言真实hreflang+自引用canonical；预览仍noindex，正式域名未绑定。
- 正文为本地机器辅助翻译，加术语处理、全部数字/段落/表格/链接对齐和重点修订；各语言文章标题及界面文案单独编写。不宣称230篇译文全部经过母语人工审校，后续可继续润色。
- npm run check通过240文章、624FAQ、80实时商品、来源/联盟链接、24语言和分类分页校验；230译文按行核对数字零差异（允许语言书写与千分位格式差异）。
- Wrangler预览dry-run成功：8265.27 KiB，gzip1996.42 KiB，仅ASSETS绑定；没有新增数据库、模型运行时或翻译API。
- 手机布局统一压缩：较矮三列首屏商品图、两列文章卡、完整分类、收起文章目录、缩减独立页及页脚间距。内容和商品数量保留。改版前390px首页实测5444px高；待公网验收补充新高度。

- GitHub主分支源码提交75be5122930b25ec1093e89ae30411077bd42d09，父提交b1dc83700a81a7825049a7e3bebeaea5b23bddba；tree32166189429c545a926d1b83c779fe0d95277717。266个文件全部位于superbuytab-com/；expected_sha保护，无强推。等待既有Cloudflare自动构建并验收。

### 公网发布与浏览器实测

- 第一轮完整翻译发布构建598829c8-11b2-43f5-a3b7-14200f63c760成功，43秒；活动版本前缀9d7a3abb。预览地址不变：https://superbuytab-preview.hehaize88.workers.dev/ 。
- 手机390px：首页高3946px（旧版5444px），减少1498px、约27.5%；hero494px（原749px）。8张商品卡、4张文章卡和分类完整保留。
- 390px：10篇文章列表2336px；26条FAQ1896px；指南1200px；QC说明934px；搜图说明884px；20商品目录3759px；商品详情样本1995px、主图302px高。上述页面document宽375px，没有横向溢出。
- 实际打开语言菜单，英文文章列表切换德语：十篇标题和摘要本地化；打开德语费用正文，article lang=de、目录默认收起、表格347px。点击目录可以展开；再切法语保留同一费用文章路径，法语正文可见。
- 320px窄屏文章表格277px，无正文溢出；发现语言菜单左偏，追加CSS将菜单锚定完整header宽度。待最终发布复验后记录结果。
- 1920px桌面保留四列首页文章卡与8张商品卡。商品详情照片均成功加载，原始商品数据与联盟购买链接不变。
- 术语后续修订提交4cace9f351523010d0665cee8cc7be02a0eccb21；菜单定位提交5555a3eca18a0c2a540d2273554518c125872b91。前者通过240文章及数字完整性复验，后者构建通过；均仅当前域名目录。

- 最终公开版本实测：320px语言菜单left14/right291，完整落在视口内；德语费用正文已明确区分“已承诺支出”与“已付款”。浏览器临时视口已重置，用户原预览标签保留在新版首页。
- 公开补充验收：爱尔兰语费用页和马耳他语spreadsheet指南均200，完整正文分别9584/9321字符、对应语言canonical、25个hreflang，预览noindex。
- 正式域名仍未绑定；当前预览无需新链接。译文内容完整，但没有声明每种语言逐句母语审校。商品名称继续保留主站提供的原文。

- 最终运行源码5555a3eca18a0c2a540d2273554518c125872b91已自动部署；Cloudflare构建53f36350-8cef-42f6-86c8-a470da84b1bb显示Ready，59秒，活动版本前缀233b625a。本轮仅文档收尾不再触发构建。

## 18. 正式上线与域名绑定（2026-10-19，已完成）

- 用户认可完整翻译与手机布局预览，明确同意接下来部署并绑定域名。此授权取代此前等待预览确认的限制。
- 核对GitHub main为be0bd722e14b545b9b6b44de1bb8693696cec162，运行源码仍5555a3eca18a0c2a540d2273554518c125872b91。
- Cloudflare浏览器当前账户中superbuytab.com为Active；沿用已授权的GitHub连接与构建凭据，创建独立正式Worker superbuytab-com，保留superbuytab-preview。
- 正式主地址https://superbuytab.com；www与HTTP归一到HTTPS主域名，并保留路径和参数。源码继续只位于superbuytab-com/，商品数据实时来自cnbuycha，无新数据库。
- 绑定与公网验收尚在进行；以下追加实际结果。

### 正式部署与验收结果（约14:30–14:36 Asia/Shanghai）

- 正式Worker superbuytab-com已创建，GitHub main、根目录superbuytab-com、build=npm run build、deploy=npm run deploy、NODE_VERSION=24。沿用现有构建凭据，没有创建新令牌或扩大GitHub权限。
- 构建4364bca6-48df-446d-a189-11491b2de1af成功，40秒，部署表Ready、100%流量，活动版本前缀f9ea8a79。部署时main为be0bd722e14b545b9b6b44de1bb8693696cec162（运行源码5555a3eca18a0c2a540d2273554518c125872b91）。没有从旧日志推断完整Version ID。
- 部署前DNS为0条记录；部署配置已自动建立superbuytab.com与www.superbuytab.com两个Production自定义域名。公开HTTPS均可用；无需域名转移、购买或续费。
- 已保存生产构建关注路径include superbuytab-com/**、exclude superbuytab-com/*.md；保持main生产分支、关闭额外分支预览。根目录文档提交不触发本项目，嵌套的文章Markdown变更仍正常触发。
- 浏览器实际访问https://superbuytab.com成功，主页所有13个img元素加载成功，商品图片来自cnbuycha；正式站标签已保留给用户。截图仅为公开首页验收，无账户信息。
- HTTP与HTTPS的www样本、HTTP的apex样本均308至https://superbuytab.com/de/guide/?x=1，路径和参数保留；用户Chrome验证最终URL和德语指南标题正常。
- 公开HTTP验收：首页、Articles集合、德语费用文章、FAQ、搜索、商品详情、logo/favicon均200。首页与编辑页面index, follow；搜索和商品详情noindex, follow；完整文章自引用canonical、25个hreflang。
- /robots.txt允许抓取并声明https://superbuytab.com/sitemap.xml；sitemap返回200、360个URL，全部指向正式域名。
- 搜索adidas返回20项；实际有效价格排序参数sort=price返回200、20项。示例详情3470购买链接解码为Weidian原ID7876894732，含partnercode=ES7pVI。
- 独立预览仍200、noindex。正式Worker自带workers.dev入口也保留，非正式域名由代码保持noindex。
- Python urllib默认客户端曾返回1010；curl与用户Chrome均正常，没有关闭Cloudflare安全保护或伪造浏览器凭据。验收结果采用后两者实际成功响应。
- 数据、24语言240篇文章、26条FAQ和移动布局沿用已验收源码，本轮无运行代码修改、无新数据库。GSC/Bing提交与GA4接入留待后续任务，本轮没有宣称已收录。

## 19. Google Analytics 接入（2026-10-19，已完成）

- 用户要求把当前域名superbuytab.com添加到analytics.google.com；授权包含创建独立GA4资源、网站统计代码部署和接收验证。
- 在现有Analytics账户405518068内搜索superbuytab.com无结果后创建资源；名称superbuytab.com、报告时区中国GMT+8、币种USD；行业购物、业务规模暂选小型（可修改）；目标流量与互动。
- 仅接入当前正式域名所有语言页面，不混入独立预览流量，不改其他网站的统计配置。

### 配置、部署与验证

- 独立GA4资源ID：559470846；数据流superbuytab.com Web，网址https://superbuytab.com，数据流ID 16156808279，衡量ID G-4DQX9MML4J。
- 管理入口：https://analytics.google.com/analytics/web/#/a405518068p559470846/reports/intelligenthome 。原先打开的559298131属于其他网站，不是本项目资源。
- 增强型衡量保持开启，包含网页浏览、滚动、出站点击等默认事件；未创建Measurement Protocol密钥、未修改其他网站资源。
- src/pages/[...path].astro的公共head内使用Google官方gtag.js标准异步代码，并用现有production判定仅在https://superbuytab.com输出；所有语言和独立HTML页面覆盖，预览与workers.dev入口不输出。
- npm ci及npm run build成功；本地构建Worker验证正式域名德语文章200、外部tag和config各一次；预览域名同路径200、tag/config均为零。
- 运行代码提交dcd9530248bf3da0bfba7b11a08493fe9d34b321，基于2adbf4fb2ca1f210d4d26b30642e2e00087ee966，仅修改superbuytab-com/src/pages/[...path].astro。
- 正式Cloudflare构建72112fe4-254b-4bb5-90b1-d2a5663c6f35成功，51秒，Ready、100%流量；活动版本前缀a4143e81。
- 公开curl验证正式首页及/de/articles/superbuy-fees/均恰好一个gtag加载与一次config；独立预览首页均为零。Google代码安装界面显示已添加到https://superbuytab.com。
- 使用实际Chrome访问正式首页，GA4首页过去30分钟活跃用户显示2，证明数据已经开始接收；此时首页历史统计和数据流状态仍可能显示未收到数据，为不同面板更新延迟，不能据此宣称安装失败。
- 最终实时概览验证：过去30分钟和5分钟活跃用户均2；首页标题对应浏览次数2；first_visit、page_view、session_start各2。证据来自GA4资源559470846的真实实时报告，不是手工伪造事件。报告链接：https://analytics.google.com/analytics/web/#/a405518068p559470846/realtime/overview 。

## 2026-10-21：全语言 SEO 内容与点击路径改进

用户明确授权依据 GSC / Bing / GA4 调研改进并部署，要求所有语言同步。保留现有 Astro / GitHub / Cloudflare Worker 架构、CnBuyCha 实时商品来源和 ES7pVI 联盟参数。

- 四篇新文章：superbuy-sneakers-spreadsheet、superbuy-hoodies-spreadsheet、superbuy-shipping-to-usa、superbuy-shipping-to-uk。每篇完整覆盖现有 24 种语言；总文章数由 240 变为 336（14 个主题）。
- 更新已有运费计算、打包 / Shipping Expert、费用三篇，增加可操作清单、费用拆分和相关链接；全部语言同步。
- 新增 /categories/shoes/ 与 /categories/hoodies-sweaters/ 的 24 语言独立专题入口，共 48 页，沿用真实商品。筛选 / 搜索参数页仍 noindex。
- 首页与目录使用不同标题和描述；首页展示四篇最新文章；文章计数动态显示；保留同路径语言切换、自引用 canonical、24 语言加 x-default 的 hreflang。站点地图由 360 变为 504 个 URL。
- 新文章 published / checked 日期为 2026-10-21；已有文章 datePublished 保留 2026-10-19，更新日期才变更。
- 新增 GA4 自定义事件 article_to_catalog、product_click、outbound_superbuy、catalogue_search。自定义搜索事件仅记录查询长度，不传原始搜索词。代码安装不等于已将事件设为 key event，也不等于注册了 GA4 自定义维度。
- 本地 npm run build、npm run check 通过：80 个真实商品分页、24 语言、336 篇文章结构 / 数字 / 内链、48 个专题页、4 类点击事件测试。英文文章词数范围 1219–1459。Wrangler dry-run 通过，只有 ASSETS 绑定，gzip 约 2.8 MiB。
- 多语言稿采用机器辅助翻译并做标题、术语、数字、链接、结构校对，不应宣称经过全部语言的母语审稿。
- 研究依据和统计窗口记录在 CONTENT_RESEARCH.md。低样本基线不能用于承诺点击增幅。发布后的实际公开页面验收另行记录。

正式发布确认：提交 fdf35410e8d38325b56587f71d1af6db6a5d62b6，Cloudflare 构建 d28a062b-df7e-461a-bfdb-7fae2fd40b5a / 版本 eb3f523d-f5db-4d3b-947d-8b8b34634133 成功。Chrome 正式站显示新内容，390px 手机布局、真实商品图片、canonical / hreflang 与新文章目录折叠正常。仅在专题推荐区排除上游误放入鞋类的 Wedding flower arch，不修改源商品库。
