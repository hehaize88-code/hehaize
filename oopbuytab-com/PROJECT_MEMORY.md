# CNBuyCha 子站项目记忆 — OOPBuy

更新日期：2026-10-21（Asia/Shanghai），第三轮。当前阶段：域名与架构规划；目标 GitHub 仓库已由用户确认，域名尚未选定，未开发或部署 OOPBuy 站。

## 用户已确认的规则

- 每次对话只处理一个平台、一个域名；本次仅 OOPBuy。
- 使用实施当时的 Astro 最新稳定版本。源码目标固定为 https://github.com/hehaize88-code/hehaize ，每个域名在根目录一个独立文件夹，沿用域名点号改连字符的现有命名方式。
- 所有商品数据、分类、搜索、搜图、QC 照片、排序与分页均沿用 https://www.cnbuycha.com/ 项目的真实能力。
- 不新建独立商品数据库、不编造商品、不只截取部分商品冒充完整目录；不建设或操作主站后台。商品与商品图片全部读取 CNBuyCha，参考站仅参考布局与功能结构，不采用其商品、图片或价格。
- LOGO 与浏览器图标使用 OOPBuy 官网原始品牌素材；素材来源待实施时核验。
- 首页为 SEO 入口页；主关键词为 oopbuy spreadsheet；先调研竞品及相关词，再开发。
- 注册入口：https://oopbuy.com/login 。按用户给定值保留，不擅自添加邀请码。
- 微店购买链接模板：https://oopbuy.com/product/weidian/{productId}?inviteCode=U68CWQBN5 。商品 ID 示例 7876894732。
- 边做边更新本记忆文件，区分已确认规则、建议、已验证事实与待办。

## 初步技术判断

- SEO 正文、指南、文章及 sitemap 优先预渲染；商品模块、搜索及详情按主站数据动态提供。首页 SEO 与动态商品区分开，商品失败不清空 SEO 内容。
- GitHub Pages 支持静态站；Astro SSR 需要另一个运行环境。源码托管 GitHub 不等于 SSR 在 GitHub Pages 运行。
- 搜索、搜图、全库排序及 QC 必须先核对 CNBuyCha 的实际接口及跨域能力，不能把前端按钮完成当成接入完成。
- Astro 官方于 2026-10-15 发布 7.4；实施时核对最新稳定补丁并锁定依赖。

## 当前调研记录

- 已查看 CNBuyCha 首页；www 跳转到 cnbuycha.com。
- 已查看 oopbuywithqc.com、oopbuyfind.com、oopbuydb.com 的首页和导航。
- 尚未证明域名可注册；域名推荐与注册可用性分开记录。
- 尚未获取关键词搜索量或难度数据，不虚构精确数值。

## 2026-10-21 调研结论与域名选择

本文件同时作为首站规划与持续项目记忆。以下建议尚未被用户选定，不得自动记作已购买或已部署。

首选建议：`oopbuytab.com`。理由：包含完整品牌 oopbuy、短、易输入，tab 可以承接电子表格/选品工具的含义，后续加入指南、QC 与文章也不会限制定位。域名中的词不等于排名保证。

| 域名 | 本次注册局查询结果 | 判断 |
| --- | --- | --- |
| oopbuytab.com | Verisign .com RDAP 返回 HTTP 404，没有返回域名登记对象 | 首选候选；仍需在注册商确认能否购买及实际价格 |
| oopbuysheet.com | 初轮 RDAP 503；第三轮成功查看该域名现有商品网站 | 已被使用，移出新注册候选 |
| oopbuyselect.com | RDAP 查询两次返回 HTTP 503 | 适合选品定位的备选；可用性未知 |
| oopbuypicks.com | RDAP 返回登记对象；注册日期 2026-05-15 | 已注册，排除普通新注册方案 |
| oopbuyspreadsheet.com | RDAP 返回登记对象；注册日期 2024-08-19 | 已注册，排除普通新注册方案 |

其他探索项 oopbuylist.com、oopbuycatalog.com 的 RDAP 返回 503，不作为已确认可用域名。没有搜索结果、网站打不开、DNS 没记录均不能代替域名注册检查。未查实价格与续费，不给出价格猜测。最终以购买时注册商结果为准。

注册局查询格式：https://rdap.verisign.com/com/v1/domain/{domain}

## 竞品与关键词研究

方法：搜索 oopbuy spreadsheet、oopbuy finds、oopbuy QC、shipping calculator，随后打开竞品页面检查标题、导航、产品入口和信息结构。属于搜索意图与页面结构研究，不是付费关键词工具的月搜索量报告，也不是本项目尚不存在的 GSC/GA4 数据。未获取精确搜索量、关键词难度、特定地区排名或点击预测。

| 竞品 | 实际观察 | 本项目采用的方向 |
| --- | --- | --- |
| https://oopbuywithqc.com/ | 首页聚焦 spreadsheet 与 QC，提供商品搜索、分类、QC 入口及 OOPBuy 购买按钮 | 商品与 QC 的关联要清楚；无 QC 不冒充有 QC |
| https://oopbuyfind.com/ | 以 spreadsheet 为主标题，商品目录、分类、Tutorial、FAQ、QC 和 News 分开 | 首页承接主词，目录和指南各有独立页面 |
| https://oopbuydb.com/ | 标题结合 spreadsheet 和来源平台，并提供入门、QC、分类入口 | 分类覆盖与购买流程有价值，但不照抄其数据规模或文案 |

竞品展示的商品数、优惠券、更新频率均为对方声明，未进行独立审计，不能用于本项目宣传。

### 页面与目标词映射（规划）

| 优先级 | 页面 | 主关键词 / 支持词 | 主要用途 |
| --- | --- | --- | --- |
| P0 | `/` | oopbuy spreadsheet；oopbuy spreadsheet 2026 | SEO 首页，解释用途并提供真实商品入口 |
| P0 | `/spreadsheet/` | oopbuy product list；oopbuy spreadsheet products | 完整商品目录、分类、分页、排序 |
| P0 | `/finds/` | oopbuy finds；best oopbuy finds | 有编辑理由的选品集合，避免单纯复制目录 |
| P0 | `/qc/` | oopbuy qc；oopbuy qc photos；oopbuy qc finder | 已核验的 QC 查询与读图说明 |
| P0 | `/guide/` | how to use oopbuy；how to buy on oopbuy | 注册、选品、下单流程 |
| P1 | `/shipping/` | oopbuy shipping；oopbuy shipping cost；oopbuy shipping calculator | 运费构成与官方估算器使用说明 |
| P1 | `/spreadsheet/shoes/` | oopbuy shoes；oopbuy sneaker spreadsheet | 有真实商品的鞋类目录 |
| P1 | `/spreadsheet/hoodies/` | oopbuy hoodie；oopbuy hoodie spreadsheet | 对应主站真实分类的目录 |
| P1 | `/faq/` | oopbuy questions；oopbuy help | 经官方核对的常见问题 |
| P1 | `/articles/` | 各文章对应具体长尾意图 | 文章列表及独立文章页 |
| P2 | 相关独立文章 | oopbuy sizing；oopbuy warehouse；oopbuy shipping time | 后续按实际展现、点击与官方信息补充 |

上述主词在竞品可观察；部分组合长尾词是基于意图提出的候选，不等同于已验证搜索量。分类 slug 需要映射主站分类，不为了关键词编造空分类。

首页与 `/spreadsheet/` 保持不同标题与主要内容：首页回答用途、流程和导航；目录负责选品。不要两个页面都堆相同长文。搜索结果、排序参数、语言参数不能无限生成重复可索引页。

### 首批内容选题顺序（待实际写作）

1. How to Use an OOPBuy Spreadsheet：从主站真实商品到平台购买，主词 how to use oopbuy spreadsheet。
2. How to Read OOPBuy QC Photos：图片区分、尺码、标签与角度检查；主词 oopbuy qc photos。
3. How OOPBuy Shipping Costs Are Calculated：商品价、国内运费、国际运费、体积与实际重量；具体规则需官方核验。
4. How to Buy a Weidian Item on OOPBuy：用已验证商品 ID 演示链接转换，主词 oopbuy weidian。
5. OOPBuy Size Guide: Measurements Before Ordering：围绕主站提供的真实尺码图，避免无依据尺码承诺。
6. OOPBuy Shoes: How to Compare Finds：真实鞋类目录、价格、图片和有依据的选择标准。
7. OOPBuy Hoodies: Sizing and QC Checks：真实服饰商品与测量信息。
8. OOPBuy Warehouse and Parcel Consolidation：先确认官方仓储和合箱规则。
9. OOPBuy Shipping Time: What Each Stage Means：区分采购、入库、出库与运输阶段，不给固定到货保证。
10. OOPBuy Returns and Refunds: Checks Before Shipping：以官方现行政策为依据。

本次是选题计划，没有声称十篇文章已写完。首批至少先做好前四个明确意图，再按上线范围补齐，避免不同标题重复同一篇内容。FAQ 可按既有站点偏好计划 20+ 条；第二轮已将语言实施方案定为与参考站一致的 24 语。活动、运费、仓储天数、优惠和售后数字必须在写作当天查证官方，不从竞品复制。

## 主站接入实测记录

| 项目 | 观察 / 实测 | 状态 |
| --- | --- | --- |
| 首页 | `https://www.cnbuycha.com/` 转到 `https://cnbuycha.com/`，正常返回 HTML | 已验证 |
| 商品目录 | `/AllProducts/` 显示 3,446 件商品，11 个可见分类 | 页面声明已读；全量覆盖未验收 |
| 搜索入口 | HTML 表单为 GET `/AllProducts/?q=...` | 入口已确认；本次 q=Adidas+XLG 请求返回 500 |
| 排序入口 | 最新为默认；热门 `?sort=click`；价格 `?sort=price` | URL 已确认；价格排序请求本次超时，功能未验收 |
| 分页 | 首页导航显示 1、2、3 与下一页；链接为 `?page=2`、`?page=3` | 未证明只有三页，也未证明已覆盖全部 3,446 件 |
| 商品示例 | `/shoes/3470.html`，标题 Adidas XLG Runner Deluxe，原始商品 ID 7876894732 | 已核对 |
| 购买链接 | 示例页面已有 OOPBuy 链接，含 inviteCode=U68CWQBN5 | 与用户给定模板一致 |
| 图片 | 示例页面公开四张展示图片 | 图片可见；未证实其都是仓库 QC |
| 搜图 | 抽查首页、目录、详情与公共 app.js 未找到可调用搜图接口 | 待核验，不代表主项目一定没有此功能 |
| API 与跨域 | 尚未获得正式 JSON/API 契约、权限方式、跨域规则、额度或更新方式 | 待核验 |

网络错误是本次请求的观察，不应写成所有用户都会遇到的确定故障。上线前要通过实际接口或项目源码继续确认。不能因此擅自改用别的主站、竞品数据、第三方搜图或自建商品数据库。

特别固定两类 ID：

- `recordId = 3470`：CNBuyCha 站内记录 ID，出现在主站页面路径。
- `sourceProductId = 7876894732`：微店商品 ID，必须用于 OOPBuy 购买链接。

二者不可混用。来源平台、来源 ID 与来源 URL 应共同用于购买链接转换。当前用户只提供 Weidian 模板；若全量数据出现 Taobao/1688，应先核实相应的 OOPBuy 跳转格式，不能把全部商品都套进 `/weidian/`，也不能静默删掉非微店商品。

### 拟定数据契约（是内部规划，不是发现的 API）

统一适配层拟提供：`listProducts`、`getProduct`、`getCategories`、`searchProducts`、`searchByImage`、`getQcPhotos`。

规范化字段建议：`recordId`、`sourcePlatform`、`sourceProductId`、`sourceItemUrl`、`title`、`categoryId`、`priceAmount`、`priceCurrency`、`displayUsd`、`mainImage`、`galleryImages`、`qcPhotos`、`sourceUpdatedAt`、`fetchedAt`。

- 必须读取所有分页或完整导出，按稳定唯一标识去重，并用源站总量核对覆盖率。
- 搜索、筛选、排序必须作用于整个结果集，再分页，不能只排序当前屏幕的 16 件商品。
- 主图、附图顺序与源站一致；QC 与卖家图分别记录，没有 QC 时明确空状态。
- USD 展示优先使用主站现有美元字段或主站汇率逻辑，不能随意将原币数字标为美元。
- 本轮选择运行时只读主站的商品接入方案，不建立持久商品 JSON 库、构建商品快照或自建搜图索引。必要时可使用标明时效的短期响应缓存，不成为可编辑商品源。
- 源站超时或 429 时退避，保留上一版成功数据；不能发布空目录覆盖正常版本。
- 对外 API 若需密钥，只能在服务端或构建 Secrets 使用，不能出现在浏览器包、公开仓库或记忆文件。
- 搜图必须使用主项目的实际功能；静态站重建或本地文件预览不能冒充搜图。

## 技术与部署决定

2026-10-21 实时读取 npm 的 `astro/latest` 得到 **7.4.1**。Node 要求为 `>=22.22.0`。开发时重新核验最新稳定版本，选满足要求的 LTS Node 并提交 lockfile，不使用预览版本。Astro 官方 7.4 发布于 2026-10-15。

第二轮方案收敛为 **SEO 内容 SSG + 商品功能 SSR/动态读取**：现有仓库已经存在无数据库的 CNBuyCha 公共 HTML 适配实现，优先沿用该接入方式并独立验证。

| 层 | 方案 | 原因 |
| --- | --- | --- |
| 首页、指南、FAQ、文章、目录说明 | Astro 预渲染 HTML | 首屏和可抓取内容不依赖浏览器执行 JS |
| robots 与 sitemap | 构建时生成静态文件 | 源站暂时不可用时仍能正常抓取 |
| 商品目录、详情与分类 | SSR 只读 CNBuyCha 公开页面，必要时短期响应缓存 | 不新建商品数据库，保留真实数据与来源 |
| 搜索、搜图、QC、排序 | 调用主站现有功能；必要时服务端适配 | 依据实际权限、跨域与时效要求实现 |
| 源码与构建 | GitHub + CI，锁定依赖 | 记录修改、可回滚、可重复构建 |

初轮比较过的两种路线（第二轮已选择第 2 种，尚未指定最终运行环境）：

1. **仅 GitHub Pages 托管**：必须为 SSG，主站需要提供浏览器可访问且满足跨域要求的动态服务，或者用户明确接受跳往主站执行相关功能。尚未把跳转方案当成用户已接受。
2. **GitHub 存代码，独立运行环境托管**：静态 SEO 页仍预渲染；服务器处理必须同源、带密钥或需缓存的接口及 SSR。运行环境在接口核对后选择，不默认连接 Cloudflare。

已按用户指定收敛为：同一个 hehaize 仓库、每域名独立目录、每站独立构建与部署项目。GitHub Pages 每个仓库最多一个 Pages 站点，不能承诺靠一个 Pages 发布将所有目录分别绑定域名。正式托管沿用每目录独立项目的方式，具体运行环境在部署时处理。

用户已明确目标仓库 hehaize88-code/hehaize。GitHub 插件已成功读取 main 分支与目录结构，当前有读取及写入权限；本轮仅检查，没有新建分支、提交、推送或部署。域名尚未确定，不擅自创建 oopbuytab-com 正式目录。

### 项目文件职责（规划）

| 文件 / 目录 | 职责 |
| --- | --- |
| `PROJECT_MEMORY.md` | 已确认规则、重要决定、当前进度、未完成事项 |
| `docs/RESEARCH.md` | 关键词、竞品、官方来源和核验日期 |
| `docs/DATA_CONTRACT.md` | 主站接口、字段、分页、错误与限流处理 |
| `docs/CHANGELOG.md` | 每次改了什么、验证结果、提交与部署记录 |
| `src/config/site.ts` | 域名、平台名、注册入口、邀请码、语言与主站地址 |
| `src/lib/cnbuycha/` | 所有主站数据接入，不分散写进页面 |
| `src/lib/purchase-links.ts` | 按来源平台与真实商品 ID 生成购买链接 |
| `src/pages/` | 首页、目录、分类、指南、QC、FAQ、文章路由 |
| `src/content/` | 原创内容与完整语言版本 |
| `public/brand/` | 经官网核验的 LOGO 和 favicon 原始素材 |

本次先保存一份完整记忆文件；建仓后将本文件纳入项目，并按上表分出研究、数据契约和变更记录。不要同时维护两份互相矛盾的项目记忆；GitHub 成为项目事实来源后，以仓库文件持续更新。

## 视觉、首页与品牌规划

- 首页 Title 建议：`OOPBuy Spreadsheet — Product Finds & Buying Guide`。QC 功能核验后可加入 QC Photos，不提前宣传未实现功能。
- H1：`OOPBuy Spreadsheet`。SEO 文案须提供选择方法、分类用途和流程信息，商品入口保持在首屏。
- 首屏采用简洁标题、搜索入口、浏览完整目录按钮与注册按钮，不铺巨大宣传海报。
- 首页依次为简短说明、分类入口、少量真实商品预览、购买步骤、最新 4–6 篇文章卡片。
- 导航预留 Spreadsheet / Finds / Guide / QC / Shipping / FAQ / Articles，各入口为真实独立页面。
- 手机端减少大标题、留白与重复介绍；商品目录建议每页 16–20 件，完整库存通过分页访问。分类按钮换行，不要求横向拖动才能看完。
- LOGO 与 favicon 按用户要求使用官网原始资产，不重画相似图标；保留官方色彩、比例和透明背景。
- 官网公共脚本已找到 `../assets/images/version/oopbuy/favicon.png`、`home/logo.png`、`home/logo.svg` 等素材映射。部分素材内嵌为 data URI；实施时需按 oopbuy 品牌分支提取并视觉核对，不能误用同包内 gtbuy/wheebuy 素材。
- 素材来源脚本：`https://oopbuy.com/static/js/P6C1IrIl.index.1792481830138.js`。路径带版本号，未来可能改变。
- 页面标注独立选品站身份，交易、账号和支付都发生在 OOPBuy；使用官方品牌资产不表述为官方运营站点。
- 买按钮仅按已确认 OOPBuy 规则跳转，注册按钮固定为用户给定 `/login`，不擅自更换邀请参数。

## SEO 与多语言基础

- 每个可索引页面有独立 Title、Description、H1 和自引用 canonical。
- 商品目录为可抓取 HTML 入口，不能只放空壳后让 JS 填满所有关键内容。
- sitemap 只收录真实可访问、允许索引、canonical 正确的页面；不混入搜索、排序和未完成语言页面。
- 商品主站使用原始数据，但子站首页、指南、分类说明和平台购买流程提供 OOPBuy 专属价值。后续其他品牌站不能只替换名字复制同一套内容。
- 文章采用实际发布日期与真实修改时间；不自动每日更新所有页面日期来假装新鲜。
- 结构化数据必须与可见内容一致。文章和面包屑优先；商品价格、库存、评价等没有可靠数据时不伪造。FAQ 标记不作为获得富结果的保证。
- 用户委托决定多语言方式；本轮按参考站确定 24 语实施方案：en,de,es,fr,it,pl,pt,ro,sv,nl,da,fi,el,cs,hu,bg,sk,hr,sl,lt,lv,et,ga,mt。英文根目录，其他语言使用 /<locale>/。这是规划决定，尚未生成或发布译文。
- 已发布的语言保持页面及文章覆盖一致、HTML lang 正确、hreflang 相互对应并有 x-default。不能把德语按钮导回英文首页。
- GA4、GSC、Bing 在正式域名确定与上线后再绑定本项目自己的属性；不复制主站的 GA4 ID。

## 首版验收与推进顺序

1. 目标仓库已确认，只待 OOPBuy 最终域名。若后续用户先要求预览，可先使用临时项目名开发，不将推荐域名当成已购买。
2. 参考仓库中现有只读 CNBuyCha 适配器，核验实际搜索、排序和完整分页；不要求用户提供后台，不修改主站管理系统。搜图与 QC 来源仍须验证，主站没有的能力不伪造。
3. 确定 SSG/SSR 组合与具体托管方式，写入记忆；开始 Astro 第一版。
4. 验证商品覆盖率、所有分类、首末分页、关键词搜索、搜图、QC 与全库排序，成功后再宣称“全部接入”。
5. 验证示例 7876894732 以及其他商品购买链接均保留正确来源与 inviteCode；核对注册入口。
6. 验证 LOGO/favicon、图片比例、手机布局、独立页面及语言切换。
7. 构建成功、链接与 sitemap 通过检查后，提供可打开的预览；正式域名发布时记录提交 SHA、部署 ID/URL 和实际验证结果。
8. 上线后再使用真实 GSC/Bing/GA4 数据调整关键词与文章，不能在新站上线前声称有自己的点击数据。

### 当前完成与未完成

已完成：竞品与意图调研、域名初查、Astro 最新稳定版本核验、源站公开结构及商品 ID 抽查、GitHub 指定仓库和现有适配器检查、参考站 24 语与同页切换检查、部署路线与目录规划、项目记忆创建和更新。

未完成：域名购买/选定、搜图/QC/全量分页和实时搜索排序验收、网站开发、文章正文、多语翻译、品牌视觉核验、预览与生产部署、搜索引擎提交。没有任何以上未完成项被标为已完成。

下一步最需要用户确定：**OOPBuy 最终域名**。目标仓库已经确认，不重复索要；不要求管理后台或创建后台系统。若用户先要求预览，不应因域名未购买而停止可完成的预览开发。

## 证据来源（2026-10-21 访问）

- 主数据站：https://cnbuycha.com/
- 商品目录：https://cnbuycha.com/AllProducts/
- 已核对示例：https://cnbuycha.com/shoes/3470.html
- OOPBuy 官网：https://oopbuy.com/
- OOPBuy 官方入门页搜索入口：https://m.oopbuy.com/pages/article-details/index?id=1739829963819945985 （本次直读被重定向为空壳，尚未据此撰写政策细节）
- 官方运费入口：https://m.oopbuy.com/estimation （本次仅发现入口，未引用金额）
- 官方售后入口：https://m.oopbuy.com/notice/1740656181012172801 （政策正文需写作时复核）
- 竞品：https://oopbuywithqc.com/ 、https://oopbuyfind.com/ 、https://oopbuydb.com/
- 当前稳定版：https://registry.npmjs.org/astro/latest
- Astro 7.4：https://astro.build/blog/astro-740/
- Astro Pages 部署：https://docs.astro.build/en/guides/deploy/github/
- Astro SSR：https://docs.astro.build/en/guides/on-demand-rendering/
- GitHub Pages 类型与一仓一站限制：https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Google 多语言说明：https://developers.google.com/search/docs/specialty/international/localized-versions
- Google 内容与门页政策：https://developers.google.com/search/docs/essentials/spam-policies

## 持续记忆维护规则

每次修改后记录日期、用户新要求、已完成改动、核验方法与结果、尚未解决的问题、下一步。域名/数据源/注册码/购买模板/托管方式更改必须留痕。研究假设、可用性未知、网络异常和已验证结果始终分开；不得用“GitHub 已提交”代替“线上已生效”。


## 2026-10-21 第二轮：仓库与参考站落实

### 用户新增要求

- 以后部署到 https://github.com/hehaize88-code/hehaize ，每个域名一个文件夹，匹配上传截图。
- 所有商品、图片和商品功能继续来自 cnbuycha.com，不建设独立商品数据库和管理后台。
- 参考 https://kakobuypicklist.com/ 的页面组织和多语言；理解“不要有任务图片,商品等等”为不要自行造图、造商品，所有商品相关内容使用主站真实数据。
- 本轮语义为补充实施约束与研究参考站，尚未要求立即发布生产站，也未选定推荐域名。

### 已核对的仓库事实

- main 根目录已有 cssbuychina-net、hipobuyy-sheet-com、hubbuy-sheet-com、joyagoochina-org、kakobuypick-com、kameymall-sheet-com、lolobuy-sheet-com、lolobuy-sheet-net、pikobuy-sheet-net、sugargootab-com、superbuytab-com、uufindssheet-com。
- 目录命名示例为 `kakobuypick-com/`，不是 `kakobuypick.com/`。若最终确定 oopbuytab.com，则新增同级 `oopbuytab-com/`；当前仅为条件示例。
- 仓库根 README 仍主要描述 Hubbuy，实际目录结构以 GitHub 当前 contents 为准，不依据根 README 覆盖已有站点。
- 已查看 kakobuypick-com 的 README、Astro 配置、package.json、项目记忆和 src/lib/catalog.ts。
- catalog.ts 的 ORIGIN 为 https://cnbuycha.com ，用无状态 fetch 读取公开 HTML，再解析商品、图片、源商品链接、分类和总数，未使用商品数据库。
- 现有 listing 实现传递 sort、page 和 q，并按 total/60 推算主站页数。新站不能盲目固定 60 或只搬前三页，需验证源站实际每页数量及末页结果。
- 图片适配器允许主站 /media、/uploads、/template 路径及由主站返回的 si.geilicdn.com 原图。CNBuyCha 提供的合法原始 CDN URL 仍属于主站数据，不应误删导致缺图。
- 已有实现说明主站无已确认搜图接口、图片也未能证实全部为 QC。此限制与本轮公开页面调查一致，不能把参考站的搜图能力假定成 CNBuyCha 已有能力。
- 原站配置为 Astro SSR，正文有 24 语内容文件；它证明仓库组织与无数据库接入可行，但不等于 OOPBuy 已建成或其动态功能已经验收。

### 参考站观察与新站取舍

- 实读首页、英文商品目录、德语首页、德语商品目录、搜图页。
- 24 语代码：en, de, es, fr, it, pl, pt, ro, sv, nl, da, fi, el, cs, hu, bg, sk, hr, sl, lt, lv, et, ga, mt。
- 从英文 `/spreadsheet/` 的 Deutsch 链接进入 `/de/spreadsheet/`，保留目录页面角色；新站还应保留当前文章、商品、关键词、分类、排序与页码。
- 参考其搜索入口、商品分类、独立目录、商品详情、语言菜单及明确末页的分页；保留本项目的 Guide/QC/Shipping/FAQ/Articles 完整导航。
- 不使用参考站的商品、库存数、照片、价格、汇率、购买参数或品牌素材，也不照搬其针对 Kakobuy 的政策文本。

### 24 语具体实现方案

1. Astro 路由统一管理语言；默认英文 `/`，德语 `/de/`，西语 `/es/` 等。页面类型与内容 ID 稳定对应，不为每种语言另建应用或数据库。
2. 界面字典与原创内容翻译作为 GitHub 源文件保存；首页 SEO、分类说明、按钮、错误状态、FAQ、指南和每篇文章都有完整对应版本。避免访问时依赖第三方翻译脚本。
3. 商品字段仍只读主站，所有语言引用相同商品 ID、主图、图集、价格、规格和购买链接。型号与品牌保留；主站已有译文可读取，无译文则保留源标题，不推测材料、尺码、质量等事实。
4. 语言切换由同一 pageKey/productId/articleId 生成目标路由，保留合法查询参数；文章不能切回首页，分类不能切回全商品。
5. 商品搜索向主站传递真实关键词和已有参数；翻译界面不等于主站已支持所有语言语义搜索，不另建搜索数据库或搜图索引。
6. 每语的 Title、Description、H1、HTML lang 和可见正文对应；自引用 canonical，完整互链 hreflang 和 x-default；只把真正完成且可访问的语言页面纳入地图。
7. 构建检查 24 语键、文章数、段落/列表/表格结构及重要数字一致；不以一两句摘要代替完整翻译。商品数据缺失与翻译缺失分别处理。
8. 语言菜单使用语言本名，桌面可搜索下拉，手机为紧凑弹层，避免横向长条；页面切换保留用户选择但不强制按 IP 跳转。
9. 同一源商品在各语言下显示相同 USD 金额，仅按语言改变数字格式，不能每种语言独立换汇而产生不一致。

### 本轮状态

仅完成只读调研与规划更新；未改动 GitHub 任何目录、未创建数据库、未访问主站后台、未操作 Cloudflare、未发布网站。项目记忆后续首次提交将放在选定域名目录内。

补充来源：
- https://github.com/hehaize88-code/hehaize
- https://github.com/hehaize88-code/hehaize/blob/main/kakobuypick-com/src/lib/catalog.ts
- https://github.com/hehaize88-code/hehaize/blob/main/kakobuypick-com/README.md
- https://kakobuypicklist.com/
- https://kakobuypicklist.com/spreadsheet/
- https://kakobuypicklist.com/de/spreadsheet/
- https://docs.astro.build/en/guides/internationalization/


## 2026-10-21 第三轮：更短域名候选

- 用户再次明确 OOPBuy 首站域名尚未选定，询问类似 spreadsheet 或更短的命名。
- 命名优先级建议：oopbuytab.com（短，表格标签页联想）、oopbuylist.com（商品清单）、oopbuygrid.com（表格/网格展示）、oopbuypick.com（精选商品）。均保留完整 oopbuy 品牌。
- 本轮对 oopbuytab.com、oopbuysheet.com、oopbuylist.com、oopbuygrid.com、oopbuypick.com、oopbuysheets.com 的 Verisign RDAP 请求均返回 503；不能据此声称可注册。oopbuytab.com 的初轮 404 仅保留为历史观察，当前购买状态需以注册商实时结果为准。
- 本轮成功打开 https://oopbuysheet.com/ ，页面已在提供 Oopbuy Spreadsheet 商品目录，所以移出新注册候选。oopbuysheets.com 虽接近 spreadsheet 含义，但与已有单数域名非常接近，不列为优先方案。
- 当前首选命名仍为 oopbuytab.com；尚未得到用户选定或购买确认，未创建正式域名文件夹。


## 2026-10-21 第四轮：正式域名已购，公开预览实施

- 用户已购买 oopbuytab.com，本轮明确请求公开预览链接；评审通过后再操作正式域名及 GitHub 部署。
- 正式仓库目录固定为 hehaize88-code/hehaize 的 oopbuytab-com/。本轮未推送该仓库、未绑定域名、未改 DNS。
- 预览项目本地 /workspace/sites/oopbuytab-preview，Astro 7.4.1 SSR，无数据库。
- Sites project_id: appgprj_6ad86f3de22c8191869b4805607b630b。预期域名 https://oopbuytab-preview.hehaize88.chatgpt.site （发布前不代表已上线）。
- 官方 Logo/favicon 提取自 oopbuy.com 已公开前端资源，不重绘标识。
- 复用已有仓库 Astro Worker 适配器及界面字典，OOPBuy 指南独立撰写，不挪用 Kakobuy 政策。
- CNBuyCha HTML 目录适配器：源站每页60条，前端每页20条；数据不写入文件或数据库。
- 明确区分商品照片与未经确认的仓库 QC；搜图尚无已确认接口，预览明确显示未可用。
- 预览全站 noindex 与 robots Disallow，防止临时域名与正式域名竞争索引；正式上线时必须移除该预览限制并生成站点地图。

### 预览实施与验证记录

- 24 语界面与原创正文均已完成：每语 119 个非空字符串、3 个购买步骤、6 个 FAQ、6 篇文章 × 3 节；翻译结构与 slug 一致。
- 首页采用官方粉色 Logo/favicon、紧凑真实商品卡片、分类入口与4篇文章入口；独立目录、Finds、Guide、QC、Shipping、FAQ、Journal与商品详情已实现。
- 本轮6篇文章为第一版预览内容；更长内容及原规划的完整10篇文章在正式上线前按关键词研究继续完善，不伪造平台政策。
- 实时请求核对：CNBuyCha 目录3,446件；源第58页26条，本站第173页6条；adidas搜索61条，本站第4页1条；第二页20条；热门与价格排序均得到正确不同结果。
- 样本 /shoes/3470.html 返回 Adidas XLG Runner Deluxe、USD54.03、4张来源照片、卖家ID7876894732；购买链接准确包含 inviteCode=U68CWQBN5。
- 浏览器已检查桌面首页、390px内嵌视口下的英文首页、德语指南及德语→西语切换；无横向溢出，语言切换保留 /guide/。
- 内部浏览器预览进程访问 CNBuyCha 时 DNS 报 EAI_AGAIN，商品区域显示真实错误状态；同一源适配器在工作执行环境实时请求成功。没有使用商品快照或假数据补足浏览器环境限制，公开部署后的商品响应需再核验。
- 预览构建成功（Astro7.4.1，Worker ESM），无数据库、管理后台、分析追踪代码或产品素材缓存文件。
- 项目记忆已移入本项目源码并随 Sites Git 持久化，原独立记忆后续仅作历史规划参考。

### 首次公开发布回执（已验证）

- 公开预览地址：https://oopbuytab-preview.hehaize88.chatgpt.site
- audience: public，访问者无需登录。正式域名 oopbuytab.com 仍未绑定。
- 首次发布源提交：3f94d4e67fc7df4b9555577732e15cb9d062ea61。
- 保存版本：appgprj_6ad86f3de22c8191869b4805607b630b~appgver_006e64a3aafc819192c1624de453968d（版本1）。
- 发布ID：appgdep_6ad8738510b08191bf44c9c9b5fbfb46；Sites 返回 succeeded。
- 公开 HTTP 核验：首页200（8张目录卡片与3张主视觉商品）、样本商品页200（正确商品标题、4张相关卡片、准确邀请参数购买链接）、adidas搜索第4页200（1条真实结果）、favicon200（image/png，3217字节）。
- 构建后 Worker 请求检查：英文首页/商品/搜索、德语指南、马耳他语文章均200；未知路由404；每页25条语言alternate（24语+x-default）；预览noindex响应头正确。
- 图片来源为实时源站URL，未制作假商品图。内部浏览器商品图视觉验收受环境DNS限制；公开环境商品数据响应已成功，不等同于每件商品图片逐一可用保证。
- 本记录补充在首版部署完成后；后续仅更新记忆并重新保存源码，不改变该版网站视觉或功能。
- 等用户评审视觉后，再按一个域名一个目录的约定准备 GitHub 与自有域名部署。下一轮应打开本 Sites 项目继续修改，勿新建重复预览。

## 2026-10-21 第五轮：用户无法打开临时预览

- 用户截图 image(20261021-081904).png 明确显示 chatgpt.site 的安全防护页：Sorry, you have been blocked / You are unable to access chatgpt.site。并非商品目录读取错误。
- Sites get_site 确认当前项目 active、public、版本2、未被停用；工作环境对公开首页与favicon均HTTP200，但该结果不能代表用户访问正常。不可继续将同一个受拦截地址当作已解决方案。
- Cloudflare API 首次 search 即返回 UNAUTHORIZED / This app connection requires reauthentication；未进行任何Cloudflare账户、DNS、Worker修改。
- 已准备独立临时Worker名 oopbuytab-preview 的可部署产物：`npm run build` 后 `node scripts/package-cloudflare-preview.mjs` 生成 dist/cloudflare-preview/worker.js。配置为 wrangler.preview.jsonc；只内嵌官方品牌静态素材，商品继续实时读取 CNBuyCha，无数据库。
- 该独立包的favicon、官方SVG、德语指南均通过200响应测试。未宣称已上传或已取得 workers.dev 地址。
- 依浏览器工具的回退规则，Cloudflare接口失效后改用用户Chrome操作前需得到用户同意；当前尚未使用浏览器访问Cloudflare。
- 下一步：经用户允许，通过已连接Chrome在用户正确的Cloudflare账号创建临时Worker并上传上述单文件；核对实际返回的workers.dev地址；先不绑定oopbuytab.com，不改变正式域名DNS。若浏览器无连接，按连接技能处理，不伪造发布结果。


## 2026-10-21 第六轮：停止 Cloudflare，准备 GitHub Pages 预览

- 用户明确说“连不了cf”。停止要求重连 Cloudflare，也不通过浏览器尝试 CF。
- 已核验 `hehaize88-code/hehaize` 可读写；`has_pages:false`，没有现有 Actions workflow；GitHub Pages 预期地址当前404。
- 从 main 的 f077069a1caa329940ec6c67869381498d2f5f5f 创建独立 `oopbuytab-preview` 分支。仅此分支准备本次预览，保留其他域名目录，主分支不变。
- Astro SSR 源码放在 `oopbuytab-com/`；GitHub Pages 只用于视觉评审，静态产物放 `docs/oopbuytab-com/`。不新增数据库，构建过程中 CNBuyCha 响应仅作内存去重，不持久化商品 JSON。
- 预览 HTML 的真实商品内容来自构建时 CNBuyCha 页面；远程商品图片 URL 保持不变。搜索、排序、后续目录页和未导出的详情跳转 CNBuyCha，并在页面可见提示说明。完整 SSR 的实时目录功能仍保留源码。
- 导出首页、11分类、Spreadsheet、Finds、指南、QC、运费、FAQ、6篇文章、文章索引、搜图未接通说明、样本详情，共27路由×24语言；需以实际构建验收结果为准。
- 当前 GitHub 连接未提供 Pages 设置接口；源码上传后，用户只需 Settings → Pages → Deploy from a branch → oopbuytab-preview → /docs → Save。不得在真实发布前声称已经有可用公开地址。
- 正式域名 oopbuytab.com 未绑定，DNS 不变。

### 静态导出验收

- 2026-10-21 实际生成 648 个本地化页面（27路由×24语言），构建中去重后读取 CNBuyCha 15 个源URL。
- 另有根入口跳转页；649个HTML共41257个站内链接/静态资源引用完成存在性核验。
- 样本详情的购买链接仍为 https://oopbuy.com/product/weidian/7876894732?inviteCode=U68CWQBN5。
- 本轮没有改变正式域名，也没有把预期 GitHub Pages URL 当作已发布成功。后续开启 Pages 后，必须核验真实公开HTTP和用户访问。
