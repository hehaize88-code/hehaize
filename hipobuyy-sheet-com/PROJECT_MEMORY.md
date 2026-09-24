# Hipobuyy Sheet 项目记忆

更新日期：2026-09-24。本文随工作推进更新；记录已核实与待核实内容，避免下一次改动误改站点。

## 项目与发布状态

- Sites 项目 ID：`appgprj_6ab39ee4547081918d658f29cc6b9bb4`。现有公开检查链接：`https://hipobuyy-sheet-review.hehaize88.chatgpt.site/en/`，站点受 Git 源码管理。
- 正式目标域名：`hipobuyy-sheet.com`，尚未绑定。检查版的页面带 `noindex,nofollow`；不得把“公开可看”误认为正式参与 Google 索引。
- 目标主站：`https://www.cnbuycha.com/`。商品卡、分类与搜索只跳向主站对应位置。商品图来自主站目录；目录图不能说成真实仓库 QC 图。
- `build.py` 生成 EN/DE/ES/FR/IT 五种语言的静态页面；同一文章 slug 在五种语言均有对应路径。`content/<lang>/<slug>.md` 是文章正文的来源。修改后运行 `python build.py`。
- 用户提供的白色 HIPOBUY logo 已用于页眉和页脚。保持站点独立声明，不声称是 Hipobuy 官方或平台客户服务。

## 本轮目标与进度

- 目标：在事实调研和关键词调研后，把 FAQ 补到 20 条，把 SEO 独立文章补到 10 篇。
- 原始基线：FAQ 四个陈述式条目；独立文章三篇（spreadsheet、QC、shipping）。本轮已写完五语 FAQ 各 20 条，文件 `content/faq/<lang>.json`；每种语言独立文章均达到十篇。十篇英文稿每篇 1,201–1,538 词；新增四语对应页为有独立完整段落、表格和来源备注的内容，但目前约 525–828 词/篇，**尚未达到逐语种每篇 1,200–1,800 词**。若此长度要求适用于每一个翻译页，下轮应优先逐页扩写并经母语审校。
- 文章质量要求：英文每篇约 1,200–1,800 词；基于可核对的官方事实，真实案例必须有证据与许可；不能把与用户的问答或虚构顾客体验写到站上。翻译页保持同等核心信息和原意，切换语言停留在对应页面。
- 研究状态（2026-09-24）：已看公开搜索结果和 Hipobuy 官方动态页面。关键词是从检索结果标题、竞品信息架构和官方帮助主题推得的**候选词**，没有 GSC、Bing 或关键词工具的搜索量/排名数据；不要写成已测量流量。

## 本轮竞争页与关键词观察

- `https://hipobuy.net/` 当前检索页面标题包括 *Hipobuy Spreadsheet 2026, Reddit Reviews, Discord Community, Yupoo Albums & Coupon Updates*；首页 H1 为 “hipobuy Spreadsheet Finds”，导航重在商品分类，说明文案偏概括，并出现没有来源和条件的 QC、到货时效与售后描述。观察来源：公开网页检索与页面（2026-09-24）。不要照抄其段落或把它的宣传当官方事实。
- 其他结果可见 `hipobuy spreadsheet`、`hipobuy QC photos`、`hipobuy shipping cost`、`hipobuy return policy`、`hipobuy warehouse storage`、`hipobuy tracking`、`hipobuy payment methods` 等搜索意图。`spreadsheet-hipobuys.net` 与 `spreadsheet-hipobuy.net` 等已存在 Hipobuy 站点覆盖通用词；本站新增页面采用具体决策/条件/凭证角度，避免复制同题结构与标题。
- 新增七篇拟按用户决策过程排序：下单与状态、退货资格及申请、仓储与合箱、费用与钱包充值、申报与海关、包裹追踪与收货证据、怎样判断买家评价是否可信。最后一篇是评价阅读方法，不捏造用户亲测。每篇有单独主关键词，正文回答具体问题并指向相邻文章。实施中可微调标题。

### 候选关键词与文章匹配（非搜索量测量）

| 发布顺序 | URL slug | 主搜索意图 / 英文候选词 | 差异化证据 |
| --- | --- | --- | --- |
| 1 | `spreadsheet-first` | hipobuy spreadsheet, hipobuy finds | 核对目录商品快照与真实商品详情、价格变化 |
| 2 | `qc-photo-checklist` | hipobuy QC photos, QC check | 根据仓库照片检查具体变体，标明照片无法验证之处 |
| 3 | `shipping-cost-checklist` | hipobuy shipping cost, shipping estimate | 目的地、重量、种类、尺寸与打包后费用 |
| 4 | `order-status-workflow` | hipobuy order status, tracking order | 商品状态和国际包裹状态分开解释 |
| 5 | `return-policy-warehouse` | hipobuy return policy, refund | 五天申请、条件、费用与 90 天仓储区别 |
| 6 | `warehouse-storage-consolidation` | hipobuy warehouse storage, consolidation | 仓储、QC、合箱时机与最终重量 |
| 7 | `fees-wallet-payment` | hipobuy fees, wallet recharge, payment methods | 免费代理服务和商品/国内/国际费用分项 |
| 8 | `customs-declaration-insurance` | hipobuy customs declaration, insurance | 实际价值申报、目的地税务、保险条件 |
| 9 | `parcel-tracking-delivery` | hipobuy parcel tracking, delivery | 国际包裹轨迹与到货取证 |
| 10 | `reading-hipobuy-reviews` | hipobuy reviews, hipobuy review evidence | 评测证据检查法，无虚构用户案例 |

顺序考虑用户从发现产品到收货和判断评论的决策过程。第一到第三篇为上一轮已有内容，本轮新增第四至第十篇。未来从 Google Search Console 导出真实查询词后再调整标题和页面主次；不得写“已超越对手”或推断检索量。

## 已核对的官方基础页面（2026-09-23 的上一版研究）

- 服务及费用 `https://hipobuy.com/notice/1740653781924810754`
- 退货及退款 `https://hipobuy.com/notice/1740656181012172801`
- 订单状态与仓储 `https://hipobuy.com/notice/1901884786310991873`
- 运费估算 `https://hipobuy.com/estimation`
- 海关及税务 `https://hipobuy.com/notice/1740663384020455425`
- 国际包裹协议 `https://hipobuy.com/notice/1772881180494462977`
- 保险及赔偿 `https://hipobuy.com/notice/1906603612122468353`

注意：这些页面会变化，新增文章时重新检查原文。不要把五天退货申请条件等同于 90 天免费仓储；不要保证免税、固定时效、真伪或必赔。

### 2026-09-24 官方页面复核摘要

- `Service & Fees` 明示购物代理服务免费；货品成本含卖家价及到仓国内运费，国际运费依重量/方法/目的地计算，报关费一般为 RMB 10，随运输方法变动。勿据此宣称最终结算无额外费用。
- `Returns and Refunds` 的五天申请时限从状态变为 Warehoused 后次一小时开始计算，共 120 小时；卖家是否支持、商品可再售状态、特殊商品等影响资格。客户原因无条件退货公式列往返运费及 RMB 5 服务费，具体情况看当时订单。
- `Order Status Display`：Arrived 等待检验；Stored 有 90 天免费仓储；Waiting for Confirmation 可因实际重量超估值需补运费；取消或退货退款写入 Hipobuy 钱包/账户，不能直接写成退回原信用卡。
- `Shipping Estimate` 表单含目的国、重量（g）、商品类型及可选长宽高（cm）；估价非打包后最终价。
- `International Parcel Delivery Agreement` 写实际价值申报、自行申报需封箱前联系客户服务；运价和时效可能调整。`Customs and Taxation` 表述目的地政策及检查风险；不得写绝对免税或确定税率。
- `International Credit Card` 给出 Wallet → Recharge → 选择可用支付方式的步骤，没有固定费率。`Insurance and compensation` 说明丢失/损坏、海关扣押需按条件审核，赔偿可能记入账户金币，列有证明、时限与品类等排除情形；不许写成保证现金赔付。
- `Receipt Information` 和到货售后说明要求检查外包装、保存箱体、单据和实物照片；不同问题的报告期限和条件不同，页面写作优先建议及时联系官方并核对具体规则。

## 发布检查

- 在正式域名未发布期间维持预览版 `noindex`；以后正式发布需复核 canonical、sitemap、hreflang、robots 与索引策略。
- 检查 5 种语言的 FAQ 数量、10 篇文章路径及内容、卡片、图片 alt、内部链接、商品外跳目标和移动端布局。
- 每次完成一组研究或代码改动后更新本文；实际最新提交与预览版本以 Sites 项目版本记录为准。

## 2026-09-24 实施记录

- FAQ 的 20 条以具体用户疑问为标题；官方事实分别对应 Service & Fees、Returns and Refunds、Order Status Display、Shipping Estimate、International Credit Card、International Parcel Delivery Agreement、Customs and Taxation、Insurance and compensation、Receipt Information。Article/FAQPage JSON-LD 仅对应可见正文；避免超出已核实内容的 FAQ 富结果承诺。
- 新增英文文章 slug：`order-status-workflow`、`return-policy-warehouse`、`warehouse-storage-consolidation`、`fees-wallet-payment`、`customs-declaration-insurance`、`parcel-tracking-delivery`、`reading-hipobuy-reviews`。在 `content/article_meta.json` 维护五语标题和摘要；`build.py` 保留前三篇及其链接。首页只展示前三篇卡以控制手机端长度，文章目录展示全部十篇。
- 阅读测评文章不引用未经核实的用户口碑，也不伪称本站实测；以后真实测评需原始订单、QC、物流与授权。
- 五语新稿和 FAQ 已完成；`python build.py` 生成 91 个静态页面。2026-09-24 的结构检查：EN/DE/ES/FR/IT 各 10 个文章路由、20 个可见 FAQ 标题及 20 个匹配的 FAQPage 条目；所有页面 `noindex,nofollow`，站内链接和图片路径存在，外站跳转仅到 `cnbuycha.com`。`node --check dist/assets/site.js` 通过。新增长文主要使用表格承载决策信息；原有三篇各语种文章含实物目录图，不把目录图称为 QC 图。

## 2026-09-24 手机端密度调整

- 用户要求手机首页在不减少内容或板块的情况下控制为约 3–5 屏，并避免横向滑动。改动主要位于 `dist/assets/site.css`，以及 `build.py` 中首页标识和表格单元格标签。
- 窄屏将八个导航入口排成 4×2 格，取消横向滚动；顶部标题、搜索、五个快捷分类、补充说明均保留。此前 `.hero-aside` 在宽度小于 900px 时被隐藏，本次恢复可见并压缩成紧凑说明卡。
- 首页仍是四个原有 section、八张带正方形图片的商品卡、七个分类、三步说明和三篇文章卡，以及原有快照提示、页眉页脚。减少留白、卡片内边距和不必要的最小高度；不删文案、商品或链接。手机版头部不再吸顶，以增加可见内容面积。
- 商品 Spreadsheet 的五列在窄屏改成逐商品纵向卡，每条仍包含图片、名称、分类、USD 价格和精确链接；文章中的比较表改成带列名的逐项卡。两种表格都不要求横向滚动；桌面仍显示标准表格。
- 构建检查：五语首页每页仍有 4 个 section、8 个商品 article、10 张图（含页眉和页脚 logo）；五语 Spreadsheet 每页 57×5=285 个带标签的单元格；新订单状态文章的本地化表格保留全部单元格。全站仍生成 91 页，JS 语法检查通过。屏数以常见约 390×844 手机视口为设计目标；长文章和 57 行完整表格自然超过五屏，不应该裁切内容。

## 2026-09-24 GitHub 同仓库交付

- 用户提供截图确认 `hehaize88-code/hehaize` 的 `main` 根目录已有 `hubbuy-sheet-com` 等同级站点；本站新增同级文件夹 `hipobuyy-sheet-com`。
- 此文件夹包含 `build.py`、`collect_products.py`、`products.json`、五语 `content/`、已生成的 `dist/`、README 和本记忆文件。GitHub 文件夹提交只表示源码和静态构建已入仓；域名、Cloudflare 发布配置与正式索引仍需另行核实。
- 本版继续 `noindex,nofollow`，绝对 hreflang 和 Article 元数据仍指公开检查站。正式上线上域名前必须以真实域名重建 SEO 地址并复核，再决定解除 noindex。
- 为使同仓库提交更轻量，在 GitHub 目标目录中将 46 张 JPEG 图等比例限制为最长边 1200px，并以 JPEG 质量 85 重新编码；图片内容和 URL 文件名不变。商品卡为 500×500 展示，原图内容仍来自同一目录快照。公开检查版 Sites 图片未修改。

## 2026-09-24 站点地图与正式域名索引准备

- 用户要求可提交的 sitemap 及优先收录链接。GitHub/Cloudflare 目录 `hipobuyy-sheet-com` 的原构建只有 `robots.txt`，五语 90 个内容页全部带 `noindex,nofollow`，没有 XML sitemap；预览版与 GitHub 构建分别管理。
- 本轮只更新 GitHub 目录及其 `dist/`，以目标正式域名 `https://hipobuyy-sheet.com` 生成 sitemap.xml：8 个栏目/功能页面 + 10 个独立文章页面，每组 EN/DE/ES/FR/IT，合计 90 条绝对 URL；每条带五语及 x-default 双向 hreflang。各本地化页加入自身 canonical，去除预览版 noindex；根路径跳转页仍 noindex 且不入 sitemap；robots.txt 增加 Sitemap 指令。独立的 Sites 公共检查站仍维持 noindex。
- 搜索服务无法直接访问目标域名或 pages.dev 地址；连接的 Cloudflare API 需要重新认证。**尚未证实**目标域名已绑定、页面在 Cloudflare 成功部署或已被 Google 抓取，不能把预期 URL 报成已上线链接。只有正式域名各 URL 和 sitemap 返回成功、查看源代码无 noindex 后，才能到对应 Google Search Console 资源提交 `https://hipobuyy-sheet.com/sitemap.xml`。
- 优先检查：`/en/`、`/en/spreadsheet/`、`/en/finds/`、`/en/articles/`、三篇基础长文（spreadsheet、QC、shipping）、`/en/articles/return-policy-warehouse/`、`/en/faq/`。其余文章和四语版本由 sitemap 提供发现，是否索引取决于 Google 和内容质量，不保证排名。
