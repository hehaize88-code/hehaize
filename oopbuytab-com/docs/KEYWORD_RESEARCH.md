# OOPBuy Tab 关键词与页面规划

调研日期：2026-10-21。适用域名 oopbuytab.com；目前交付为 GitHub Pages 预览。本文件属于项目研究工作底稿，整合后应随 `oopbuytab-com/` 源码保存。

## 证据范围

本次用搜索结果发现候选词，再实际打开竞品原站检查标题、导航、分类和文章覆盖。没有购买关键词工具、没有 GSC/GA4 数据，也没有可核实的月搜索量、KD、点击预估、排名、转化率。因此下面是基于可见搜索意图和内容覆盖的优先级，不是流量预测。

竞品只能证明它们如何组织内容和使用关键词；运费、仓储期限、支付、退换和检验服务的事实必须以 OOPBuy 官方资料为依据。不要复用竞品文章正文，也不要将竞品自己的宣传当作 OOPBuy 服务承诺。

## 已核实的竞品与可借鉴点

| 原站 | 观察到的主题覆盖 | 对 OOPBuy Tab 的启发 |
| --- | --- | --- |
| https://oopbuyshops.com/ | 首页主标题同时覆盖 spreadsheet 与 product finds；导航区分 Finds、Categories、Guides、FAQ、Shipping Calculator；目录中出现 QC、尺寸、费用、退换文章。 | 主目录要能直接浏览；政策问答与长文分开；文章入口应明确显示 Articles，不用含糊的 Journal。 |
| https://oopbuyqc.net/ | 围绕 spreadsheet + QC 组织信息；导航有 Spreadsheet、QC Guide、QC Checklist、Articles；鞋履与卫衣有独立 QC 阅读意图。 | QC 主页面给简短操作检查，长文解释照片的判断边界；不要把普通商品图都标为仓库 QC。 |
| https://oop-buy.ca/ | 围绕买家从找链接到筛选、尺寸与预算的连续步骤，覆盖 Taobao/Weidian/1688、category、shipping cost 等词。 | 商品目录与文章互相连接；每篇解决一个具体决策，不把同一段入门教程换标题重复十次。 |
| https://www.jadeship.com/shipping-calculator/classic/oopbuy | 独立 OopBuy Shipping Calculator，界面按目的地、重量、长宽高、路线筛选。 | Shipping 页面应承接 calculator/estimate 意图，指向官方估算工具；不能用固定数字假装实时报价。 |

进一步检索见到了专攻 category/weight estimation 的页面，但未能稳定打开，不作为已审阅正文的证据：`https://oopbuyspread.beauty/categories`、`https://oopbuyspread.cam/blog/oopbuy-spreadsheet-shipping-weight`。无需依赖它们即可完成当前页面规划。

官方方向：搜索可见 Beginner's Guide `https://m.oopbuy.com/notice/1739829963819945985` 与 Shipping Estimation `https://m.oopbuy.com/estimation`；页面检索器返回客户端壳，故本文不据此编造具体政策内容。官方政策由独立资料核验任务补齐。

## 站内关键词分工

首要词是 `oopbuy spreadsheet`。`oopbuy finds`、`oopbuy qc photos`、`oopbuy shipping cost`、`oopbuy shipping calculator`、`how to use oopbuy` 构成第二层。不要每个页面都用同一个标题，也不要将多个查询堆成可见关键词墙。

| 页面 | 主意图与主词 | 内容应解决的具体问题 | 推荐标题方向 |
| --- | --- | --- | --- |
| `/` | oopbuy spreadsheet | 解释网站用途、提供直接目录入口、让新访客快速选择商品/指南。 | OOPBuy Spreadsheet: Product Finds, QC & Buying Guides |
| `/spreadsheet/` | oopbuy spreadsheet products / oopbuy product search | 分类别、按真实产品分页、价格与图片可扫读。不要用长入门正文挤占目录。 | OOPBuy Spreadsheet — Browse Product Finds |
| `/finds/` | oopbuy finds / oopbuy popular finds | 用数据源实际排序展示商品；说明 Popular 的来源，不冒充编辑测评或购买数量。 | OOPBuy Finds — Explore Popular Product Links |
| `/guide/` | how to use oopbuy / oopbuy beginner guide | 用短步骤说明发现商品、核对选项、官方下单、检查到仓证据、提交包裹。 | How to Use OOPBuy: A Beginner Buying Guide |
| `/qc/` | oopbuy qc / oopbuy qc photos | 区分商品图和自己订单的到仓图；列出核对顺序和照片无法证明的事项。 | OOPBuy QC Photos: What to Check Before Shipping |
| `/shipping/` | oopbuy shipping cost / oopbuy shipping calculator | 展示估价所需参数、总成本组成、路线差异，连接官方估算器与长文。 | OOPBuy Shipping: Costs, Estimates & Parcel Planning |
| `/faq/` | oopbuy faq / oopbuy help | 24–28个按下单、QC、仓库、物流、售后分组的简洁问答；具体政策标来源与核验日期。 | OOPBuy FAQ: Ordering, QC, Warehouse & Shipping |
| `/articles/` | oopbuy guides / oopbuy buying guides | 清楚列出10篇文章及每篇解决的问题；顶部导航命名 Articles（各语言完整翻译）。 | OOPBuy Guides: Spreadsheet, QC, Shipping & Returns |
| `/image-search/` | oopbuy image search / oopbuy reverse image search | 如果数据源接口未接入，要明确当前不可用；提供关键词与分类替代路径，不伪造上传成功或搜索结果。 | OOPBuy Image Search: Availability & Search Alternatives |
| `/products/<source-path>` | oopbuy + 当前商品真实标题 | 标题、图、原链接、真实价格和当前卖家选项；不自动声称正品、测评或质量保证。 | [真实商品名] — OOPBuy Product Link |

## 所有分类独立页的内容重点

每类只需一段针对性导语、三条检查提示和相关长文链接；目录仍是主内容。移动端将检查提示放入可展开区域，初始不展开长说明。

| 分类路径尾段 | 关键词 | 差异化提示 |
| --- | --- | --- |
| shoes | oopbuy shoes spreadsheet / oopbuy sneakers | 核对鞋款、卖家尺码表与双脚/双鞋差异；需要时询问可用的鞋垫测量，避免通用尺码换算。 |
| hoodies-sweaters | oopbuy hoodies spreadsheet / oopbuy sweaters | 胸宽、衣长、肩宽与自己合身衣物对照；不能从图片推断克重或材质。 |
| t-shirts | oopbuy t shirts spreadsheet | 领口、衣长、印花位置、颜色和同款不同版本。 |
| jackets | oopbuy jackets spreadsheet | 叠穿余量、拉链/纽扣、内衬与打包体积；照片不能证明保暖或防水性能。 |
| pants-shorts | oopbuy pants spreadsheet / oopbuy shorts | 腰围、前后裆、内长/外长及裤型；松紧腰与固定腰不要套用同一判断。 |
| headwear | oopbuy hats / oopbuy caps | 头围、帽深、可调节范围与形状保护需求。 |
| accessories | oopbuy bags / oopbuy accessories | 尺寸、带长、闭合件与配件清单；关注硬件形态，不从图片推断金属成分。 |
| short-sets | oopbuy matching sets / oopbuy summer sets | 上下装是否整套出售、数量、各件尺寸与颜色一致性。 |
| electronics | oopbuy electronics | 型号兼容性、电池/插头/电压与路线限制；照片不能替代功能或安全测试。 |
| other-stuff | oopbuy finds / oopbuy accessories finds | 识别具体用途、数量、尺寸、易碎性和目的地运输可行性。 |
| jersey | oopbuy jersey spreadsheet / oopbuy football shirts | 球迷/球员版、尺码、号码姓名与定制选项；定制商品售后资格须向官方确认。 |

## 10篇文章：保留6个已有URL，新增4个独立意图

建议英文每篇约1200–1800词；其他语言保持全部实质内容，不用短摘要替代。篇幅服务于具体例子、检查表与决策，而不是反复叠加关键词。每篇约6–8节，移动端用“要点→可展开目录→正文”结构；长正文可按节折叠，但默认可读内容与结构化数据应一致。

### 1. `/articles/oopbuy-spreadsheet-guide/`（保留）

- 标题：How to Use an OOPBuy Spreadsheet: From Product Search to a Useful Shortlist
- 主词：oopbuy spreadsheet guide；次词：how to use oopbuy spreadsheet、oopbuy finds spreadsheet。
- 意图：开始浏览但不知道怎样筛选的人。
- 大纲：目录能够回答与不能回答的问题；产品类型+特征的搜索方法；20件一页的浏览节奏；同款不同选项去重比较；商品价格与最终成本的区别；保存原卖家链接、选项与待确认事项；从筛选转到官方下单。
- 独有价值：演示一个虚构的筛选流程，但不造假商品或价格；给一份可复制的比较字段清单。
- 内链：Spreadsheet、Finds、产品链接、尺寸、QC、总成本文章。

### 2. `/articles/oopbuy-qc-photos/`（保留）

- 标题：OOPBuy QC Photos: A Practical Review Before You Ship
- 主词：oopbuy qc photos；次词：oopbuy qc check、oopbuy quality check。
- 意图：已经有商品证据，需要决定继续、补充信息还是联系售后。
- 大纲：卖家照片/目录照片/订单QC区别；先对选项再看细节；鞋服包三类检查；提出可回答的补拍或测量请求；照片不能验证的真实性、内部功能、材质；有问题时保留证据并及时联系官方。
- 独有价值：按“问题→需要什么画面→不能由画面得出的结论”列检查表。
- 内链：QC、尺寸、退换、仓储；不要把站内普通产品图叫实拍QC库。

### 3. `/articles/oopbuy-shipping-guide/`（保留）

- 标题：OOPBuy Shipping Costs: How to Read an Estimate Before Choosing a Route
- 主词：oopbuy shipping cost；次词：oopbuy shipping calculator、oopbuy volumetric weight。
- 意图：需要估价与比较路线，而不是得到一个不适用的固定运费。
- 大纲：估价输入；实际重量与体积重的概念；箱子尺寸改变价格的示例（明确为计算示例而非平台报价）；卖家到仓和国际段的区别；路线条件、包裹内容与目的地；到仓后重新估算；时效是区间与条件，不作保证。
- 独有价值：一张填写路线比较参数的表，不复制第三方报价。
- 内链：Shipping、官方估算器、总成本、打包、追踪。

### 4. `/articles/oopbuy-sizing-guide/`（保留）

- 标题：OOPBuy Size Guide: Measure Shoes and Clothing Before You Order
- 主词：oopbuy size guide；次词：oopbuy shoe size、oopbuy hoodie size chart。
- 意图：担心尺码不合适的人。
- 大纲：尺码标签为何不足；选择合身参照物；服装胸宽/衣长/肩宽；裤腰/裆/内长；鞋类测量与卖家表；测量方式与误差；无法确认时应问什么。
- 独有价值：按品类给出测量字段；不能建立“平台通用尺码表”或保证尺码。
- 内链：鞋、卫衣、裤装分类；QC、退换。

### 5. `/articles/oopbuy-product-links/`（保留）

- 标题：OOPBuy Product Links: Check Weidian, Taobao and 1688 Listings Before Payment
- 主词：oopbuy product links；次词：oopbuy weidian link、oopbuy taobao、oopbuy 1688。
- 意图：拿到链接，需要确认打开的是哪个卖家、型号或选项。
- 大纲：目录ID与卖家商品ID区别；记录原链接；官方解析后核对标题图片选项；不同颜色尺寸价格；失效链接的可行排查；不要修改未知编号、不要凭图片找个相似品冒充原款；确认后再下单。
- 独有价值：本项目真实样本 CNBuyCha 3470 与 Weidian 7876894732 的ID区别，可用来说明但不代表所有平台URL模式。
- 内链：Spreadsheet、Guide、总成本、QC。

### 6. `/articles/oopbuy-price-check/`（保留）

- 标题：OOPBuy Fees and Total Cost: Build a Budget Beyond the Product Price
- 主词：oopbuy fees；次词：oopbuy total cost、oopbuy payment fees、oopbuy exchange rate。
- 意图：想比较是否划算，而不是只看商品标价。
- 大纲：商品/国内物流/国际物流/可选服务/支付货币/目的地费用的费用层；哪些金额现在知道，哪些需要到仓；付款页面核对；优惠券资格与有效期应逐次验证；取消或退款对预算的影响；预算情景表与缓冲余量。
- 独有价值：用空白预算模板和明确假设的示例，不写未经官方核实的统一费率或优惠。
- 内链：Shipping、退换、打包。

### 7. `/articles/oopbuy-warehouse-guide/`（新增）

- 标题：OOPBuy Warehouse Guide: From Seller Dispatch to Parcel Submission
- 主词：oopbuy warehouse；次词：oopbuy storage、oopbuy order status。
- 意图：商品已购买，想理解接下来要检查什么。
- 大纲：卖家发货≠仓库完成入库；入库信息与SKU核对；可用QC与测量；记录显示的存储期限；多件到货不同步；合箱前检查；出库前保留材料。
- 独有价值：按“阶段、可见证据、下一步”说明，具体期限仅采用官方核实值并说明生效条件。
- 内链：Guide、QC、退换、Shipping、打包。

### 8. `/articles/oopbuy-returns-refunds/`（新增）

- 标题：OOPBuy Returns and Refunds: What to Check While an Item Is Still in the Warehouse
- 主词：oopbuy returns；次词：oopbuy refund、oopbuy exchange。
- 意图：发现错误或改变想法，需及时处理。
- 大纲：在官方订单查当前资格与期限；错误/损坏/尺寸偏好分别准备证据；定制和特殊商品；申请而非自行寄回；费用责任需按案例确认；卖家接受、退回、退款状态不是一件事；国际发货后路径变化。
- 独有价值：可复制的售后信息清单；官方政策条件单列，不保证退款获批。
- 内链：FAQ对应问题、QC、仓库、总成本。

### 9. `/articles/oopbuy-tracking-guide/`（新增）

- 标题：OOPBuy Tracking: Separate Order Updates, Parcel Dispatch and Final Delivery
- 主词：oopbuy tracking；次词：oopbuy parcel tracking、oopbuy shipping time。
- 意图：看不到更新，想知道如何查而不是听到虚构到达日期。
- 大纲：国内卖家物流与国际包裹号；提交≠承运商揽收；分段运输与最后一公里；记录时间、地区与事件而非只读状态词；需要联系支持时提交什么；异常、退回、签收争议都不能由单一标签武断解释。
- 独有价值：联系支持前的事件时间线模板；不能套用论坛个案来保证包裹正常。
- 内链：Shipping、仓库、FAQ、退换。

### 10. `/articles/oopbuy-haul-packing/`（新增）

- 标题：Plan an OOPBuy Haul: Consolidation, Packaging and the Last Check Before Shipping
- 主词：oopbuy haul；次词：oopbuy parcel packing、oopbuy consolidation。
- 意图：已选好数件商品，准备提交包裹。
- 大纲：先确认每件商品是否准备就绪；按易碎/易压/体积/电池等属性分组；保留或去除原包装的权衡；合箱不一定总便宜；避免为等待额外商品错过售后或仓储期限；核对地址与内容申报；最终照片/尺寸/费用/路线检查。
- 独有价值：按损伤风险与计费方式构建决策表，不承诺某种包装服务存在或免费。
- 内链：Shipping、仓库、QC、总成本、退换。

## 内链与移动端呈现

1. 首页只放最新4篇文章卡片 + 明确的“全部文章”入口。顶部 Article/Articles 名称必须清楚，各语言同步。
2. Guide、QC、Shipping 各保留一段针对性概述、紧凑步骤/检查表、2–3篇相关长文；避免把整篇文章复制进工具页。
3. 分类页链接尺寸、QC和运费文章，并围绕当前商品类型给具体锚文本；不要所有分类重复一长段模板。
4. 每篇正文给2–4个有上下文的内链，底部再给3篇相关内容。旧6个slug保持不变，避免无必要404。
5. FAQ用分组+搜索+折叠，移动端默认折叠答案；20+问答保留完整，不因压缩删除。
6. 长文默认展示摘要、目录入口与正文，减少大标题、巨大空白、重复图和侧栏；允许按节折叠时按钮要可访问、键盘可用。所有内容仍需在HTML中。
7. 24语言标题/描述/正文/FAQ完整同步；切换停留同一slug，正确lang和hreflang，x-default指英语。

## 不应做的关键词承诺

- 不声称“最高排名、最安全、最便宜、100%正品、保证到达、自动QC通过”。
- 不依据竞品示例给所有目的地固定运费或鞋/卫衣固定重量。
- 不写未经当前账户资格核验的优惠券金额或百分比。
- 没有搜图接口时不能写“上传即可搜索”；商品图不是已验证的用户订单QC图。
- 预览仍应noindex；正式域名绑定和发布策略由主任务后续处理。
