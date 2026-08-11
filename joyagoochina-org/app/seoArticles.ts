import type { Locale } from "./i18n";

export type SeoArticleSection = {
  heading: string;
  paragraphs: string[];
  callout?: {
    title: string;
    text: string;
  };
};

export type SeoArticleCopy = {
  navLabel: string;
  indexEyebrow: string;
  indexTitle: string;
  indexIntro: string;
  latestLabel: string;
  readArticle: string;
  updatedLabel: string;
  readTime: string;
  contentsLabel: string;
  sourceTitle: string;
  sourceBody: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  article: {
    eyebrow: string;
    title: string;
    description: string;
    facts: Array<{ value: string; label: string }>;
    sections: SeoArticleSection[];
  };
};

const en: SeoArticleCopy = {
  navLabel: "Buying Research",
  indexEyebrow: "INDEPENDENT RESEARCH",
  indexTitle: "Joyagoo buying research for real shopping questions",
  indexIntro:
    "Long-form, fact-checked guides about fees, QC, returns, warehouse decisions and international parcels—not rewritten advertising copy.",
  latestLabel: "LATEST COST GUIDE",
  readArticle: "Read the full article →",
  updatedLabel: "Updated 30 July 2026",
  readTime: "9 minute read",
  contentsLabel: "In this article",
  sourceTitle: "How this article was checked",
  sourceBody:
    "Reviewed against JoyaGoo Help Center pages for shopping-agent charges, shopping guidance, value-added services, rehearsal packing, actual versus volumetric weight, estimated versus final billing weight, and returns on 30 July 2026. Platform prices and policies can change, so the live account screen remains the final reference.",
  ctaEyebrow: "PUT THE RESEARCH TO WORK",
  ctaTitle: "Browse products with the full cost in mind",
  ctaBody:
    "Use product price as the starting number, then leave room for Chinese domestic delivery, optional warehouse services and the international parcel.",
  ctaButton: "Explore products",
  article: {
    eyebrow: "JOYAGOO FEES GUIDE",
    title:
      "Joyagoo Fees Explained: Product Payment, Warehouse Extras and International Shipping",
    description:
      "A practical breakdown of what “free shopping agent service” means, why there are usually two payment stages, which warehouse services are optional, and why an international shipping quote can change after packing.",
    facts: [
      { value: "$0", label: "Published base shopping-agent service fee" },
      { value: "$0.15", label: "Published price for each extra detailed photo" },
      { value: "90 days", label: "Published free warehouse-storage period per item" },
    ],
    sections: [
      {
        heading: "Start with the two-payment model",
        paragraphs: [
          "The easiest way to misunderstand a shopping agent is to look at the product page and assume that number is the delivered price. It is not. A Joyagoo order normally has two major payment stages. The first pays for the item and any Chinese domestic delivery charged by the seller. The later parcel payment covers the international journey from the warehouse to your address. Optional warehouse services, return costs and possible customs charges sit between or around those two stages.",
          "Joyagoo’s published fee explanation says its shopping-agent service is free. That is useful, but “free agent service” does not mean the whole order has no service-related costs. It means the basic act of purchasing through the agent is not listed with a separate base commission. You still pay the seller for the product, may pay the seller’s domestic freight, choose whether to buy optional warehouse services, and pay international shipping. If you plan those layers before ordering, the final parcel bill is much less surprising.",
          "A sensible budget therefore has at least four lines: item cost, seller-to-warehouse delivery, warehouse extras you deliberately choose, and international delivery. Add a contingency for a return, a shipping adjustment or customs. Treating the product price as only the first line—not the total—is the single most useful habit for a first order.",
        ],
        callout: {
          title: "The short version",
          text: "Free purchasing assistance is not free delivery. Product payment and international parcel payment are separate decisions.",
        },
      },
      {
        heading: "What the first payment actually covers",
        paragraphs: [
          "At checkout, the first payment is tied to the seller transaction. Joyagoo’s shopping guidance describes it as payment for the item and Chinese local shipping. The fee explanation says those amounts are transferred to the seller through the platform. This is why colour, size, quantity, seller terms and the original listing matter before you pay: the money is funding a real purchase from a third-party seller, not buying inventory owned by the agent.",
          "After payment, the agent processes the purchase. The seller then dispatches the item to the Joyagoo warehouse. Seller speed is outside the warehouse’s direct control, so a slow “Purchased” status does not automatically mean the agent has lost the order. When the item arrives, it moves through stock arrival and QC. Published guidance says the warehouse takes several photos so the buyer can review the general condition before deciding whether to keep the item, request more detail or attempt a return.",
          "The important budgeting point is that the first payment does not reserve a fixed international shipping price. At that stage, the final parcel does not yet exist. The warehouse does not know which other items you will consolidate, what packaging you will remove, which shipping line will be available, or the final packed dimensions. Any international estimate before packing is therefore a planning number rather than a guaranteed delivered total.",
        ],
      },
      {
        heading: "Free services versus optional warehouse extras",
        paragraphs: [
          "Joyagoo describes the core shopping-agent service as free and separately promotes complimentary quality inspection and parcel consolidation. The standard QC photos are intended to give a general view of the item. They should not be confused with a made-to-order photography session. If a measurement, label, seam, surface or accessory is important to your decision, the platform’s value-added-services table lists detailed photos at $0.15 each, whether requested with the product order or after warehouse arrival.",
          "The same official table lists a parcel-photo service at $0.75 per parcel. It describes one photo before the parcel is sealed and one after sealing. That can be useful when packaging condition matters, but it is an optional record, not insurance and not proof that customs or a carrier will handle the box in a particular way. The table also lists rehearsal packing at $3 per parcel and says the result updates the parcel weight and shipping fee for the chosen line.",
          "There is an important inconsistency in Joyagoo’s own published material. The general shopping guide describes rehearsal as a 20 CNY service, while the dedicated rehearsal-packing page and the value-added-services table list $3 per parcel. Those numbers are close but not identical and may reflect currency display or an update made on one page before another. A factual guide should not silently choose one. Check the amount shown in your account immediately before ordering the service.",
          "Storage is another optional-cost boundary. The shopping guide states that each item receives 90 days of free warehouse storage. The value-added-services table lists storage extension at $1.50 per product ID per month, available for items stored from 60 to 90 days, with a maximum storage time of six months. If you are slowly building a parcel, record the warehouse-arrival date for every item instead of assuming the newest item resets the clock for the whole haul.",
        ],
        callout: {
          title: "Published optional-service prices",
          text: "Extra detailed photo: $0.15 each. Parcel photo: $0.75 per parcel. Rehearsal packing: listed as $3 per parcel on dedicated pages, while the general guide also shows 20 CNY. Storage extension: $1.50 per product ID per month under the stated eligibility window.",
        },
      },
      {
        heading: "Why international shipping is the variable part",
        paragraphs: [
          "International shipping cannot be reduced to one universal price per kilogram. Joyagoo’s fee explanation says parcel freight depends on package weight, package volume, the selected shipping method and destination. The logistics overview adds that estimates vary by country. Product restrictions can also remove certain lines from the list, so a route that appears for an ordinary garment may not appear for a battery, liquid, branded item or another restricted category.",
          "For routes that compare physical and volumetric weight, the greater number can become the billing weight. Joyagoo defines actual weight as the product plus packaging materials. Its published volumetric formula is length × width × height in centimetres, divided by 5,000—or by 6,000, 7,000 or 8,000 when a third-party logistics provider uses a different standard. A light but bulky box can therefore cost more than its scale weight suggests.",
          "Consider a 50 × 40 × 30 cm parcel. With a divisor of 5,000, the volumetric weight is 12 kg. If the packed box physically weighs 7 kg and the route bills by the greater value, the price may be based on 12 kg. The same goods packed into 45 × 32 × 25 cm would produce 7.2 kg with that divisor. This is why removing an unnecessary shoe box or reducing empty space can matter, but only when the item can be safely repacked and the chosen line applies volumetric charging.",
          "Do not remove packaging automatically. Original boxes, tags, accessories or seals may matter for protection, resale condition or return eligibility. Decide before the return window closes, and balance dimensional savings against the risk of damage or losing important packaging. Cheap shipping is not a saving if the product arrives damaged or becomes ineligible for a return you still need.",
        ],
      },
      {
        heading: "Estimated freight, final billing and coupons",
        paragraphs: [
          "The standard parcel route begins with an estimated shipping fee calculated by the system. After the warehouse packs the parcel, it weighs and measures the box. Joyagoo’s billing-weight page says the warehouse measurement generally becomes the actual billing weight unless the logistics provider later adjusts it; in that case the provider’s measurement controls. The parcel detail can show the adjusted billing weight after dispatch.",
          "That sequence explains why the first freight payment can move. The shopping guide says a buyer may need to pay the difference when the actual shipping fee exceeds the estimate. It also says a difference can be returned to the Joyagoo balance when the final charge is lower, with customer service involvement described on the page. Do not build a budget that uses every last dollar on the estimate; leave a margin until packing and measurement are finished.",
          "Rehearsal packing changes the timing rather than making shipping free. The dedicated page says the warehouse packs the selected orders using the requested method and line, updates the weight and shipping fee, and notifies the user within 24 hours after completion. It can be useful for a bulky or expensive parcel because it replaces more of the estimate with a packed measurement before the international payment.",
          "Published shopping guidance says coupons apply to the international shipping fee and cannot be stacked. A coupon therefore does not reduce the seller’s product price, Chinese domestic freight, extra QC photos or a return charge. Compare routes using their final payable amount and conditions, not the coupon headline alone.",
        ],
      },
      {
        heading: "Costs that are easy to forget",
        paragraphs: [
          "Returns are not automatically free. Joyagoo’s return policy describes a five-day or 120-hour request window after the status changes to QC completed, subject to seller eligibility, product condition and packaging requirements. The page lists about $0.75 in shipping and service charges for a qualifying warehouse return, while also explaining that other return shipping may be the buyer’s responsibility when there is no quality problem. A refund is based on the product amount actually paid, and seller agreement still matters.",
          "Customs is a separate uncertainty. Joyagoo’s fee explanation says customs charges may vary by shipping method. The logistics overview also makes clear that third-party logistics providers and customs control parts of the journey. No spreadsheet or article can promise that a route will be tax-free, delay-free or seizure-free for every destination and item. Check the current route description, declaration requirements and local import rules before submitting the parcel.",
          "Packaging reinforcement, package removal and insurance are further choices mentioned in the shopping guide. Their live prices and availability can depend on the parcel and account screen, so this article does not invent fixed numbers. Ask what risk each extra is solving. Reinforcement may be sensible for a fragile item; insurance may be relevant for a high-value parcel; package removal may lower volume. Paying for every checkbox without a reason can be as wasteful as refusing every useful protection.",
        ],
      },
      {
        heading: "A practical cost checklist before you order",
        paragraphs: [
          "First, open the live product listing and record the exact variation price, quantity and Chinese domestic shipping. Second, decide which details must be visible in QC. If the standard photos may not answer a sizing or construction question, plan the small extra-photo cost in advance. Third, note the QC completion time because the published return-request window is only five days. Review the images promptly; free storage does not extend the return window.",
          "Fourth, think in parcel combinations. Dense clothing may consolidate efficiently, while shoe boxes, hats and protective packaging can increase volume. Use the shipping estimator only as a range. Check whether the likely route uses actual or volumetric weight and test more than one package-size scenario. Fifth, decide whether rehearsal packing has enough value for the parcel to justify its displayed fee. For a simple, compact parcel it may add little; for a bulky mixed haul it may reduce uncertainty.",
          "Finally, keep a buffer. A careful estimate includes product payment, seller-to-warehouse freight, planned extras, international shipping, possible adjustment, and a small allowance for return or customs exposure. Save screenshots of the listing, selected options, QC photos, warehouse weight and parcel quote with dates. If a number changes, you will have a clear record of what you saw rather than relying on memory.",
          "The best way to use a Joyagoo spreadsheet is therefore not to chase the lowest product number. Use it to find candidates, then make the purchase decision with the entire cost path visible. A cheap item with bulky packaging, weak QC evidence or a poor shipping-line match can be more expensive than a slightly higher-priced product that consolidates cleanly and arrives as expected.",
        ],
        callout: {
          title: "Budget formula",
          text: "Product + Chinese domestic shipping + chosen warehouse extras + international parcel + contingency. Recheck every live amount before payment.",
        },
      },
    ],
  },
};

const localized: Record<Exclude<Locale, "en">, SeoArticleCopy> = {
  zh: {
    ...en,
    navLabel: "购买研究",
    indexEyebrow: "独立事实调研",
    indexTitle: "围绕真实购买问题整理的 Joyagoo 购买研究",
    indexIntro: "长篇内容聚焦费用、质检、退货、仓储和国际包裹，不写空泛广告。",
    latestLabel: "最新费用指南",
    readArticle: "阅读完整文章 →",
    updatedLabel: "更新于2026年7月30日",
    readTime: "约9分钟阅读",
    contentsLabel: "文章目录",
    sourceTitle: "本文如何核查",
    sourceBody: "2026年7月30日核对了 JoyaGoo 帮助中心的代购收费、购物流程、增值服务、预打包、实际重与体积重、预估与最终计费重量及退货规则。政策和价格可能变化，最终以账户实时页面为准。",
    ctaEyebrow: "把调研用于选品",
    ctaTitle: "了解完整成本后再浏览商品",
    ctaBody: "商品价格只是起点，还要为中国境内运费、可选仓库服务和国际包裹预留预算。",
    ctaButton: "浏览商品",
    article: {
      eyebrow: "JOYAGOO费用指南",
      title: "Joyagoo费用详解：商品付款、仓库增值服务与国际运费",
      description: "解释“免费代购服务”到底包含什么、为什么通常分两次付款、哪些仓库服务需要另付费，以及打包后国际运费为什么可能变化。",
      facts: [
        { value: "$0", label: "官方公布的基础代购服务费" },
        { value: "$0.15", label: "每张额外细节照片的公布价格" },
        { value: "90天", label: "每件商品的公布免费仓储期" },
      ],
      sections: [
        {
          heading: "先理解两段付款",
          paragraphs: [
            "最容易出现的误解，是把商品页面价格当成送到家门口的总价。Joyagoo订单通常有两个主要付款阶段：第一阶段支付商品以及卖家收取的中国境内运费；商品到仓并组成包裹后，再支付从仓库到收货地址的国际运费。中间还可能出现你主动选择的仓库增值服务、退货费用以及目的地海关费用。",
            "官方说明将基础代购服务标为免费，这表示代为购买本身没有单独列出的基础佣金，并不代表整个订单免费。预算至少应分为商品、卖家到仓库的运费、主动选择的仓库服务和国际运输四项，并为运费补差、退货或海关保留小额余量。",
          ],
          callout: { title: "一句话理解", text: "免费代购不等于免费配送；商品付款与国际包裹付款是两个不同决定。" },
        },
        {
          heading: "第一笔付款真正包含什么",
          paragraphs: [
            "第一笔款项对应第三方卖家的交易，包括所选颜色、尺码、数量、商品价格和中国境内运费。官方购物指南说明，这些款项通过平台支付给卖家。代理随后采购，卖家将商品发往仓库，因此卖家发货速度并非仓库可以完全控制。",
            "商品到仓后进入收货与QC流程。官方指南称仓库会拍摄若干照片，让买家判断大致状态。此时最终国际包裹尚未形成，仓库还不知道你会合并哪些商品、是否拆除包装、可选哪条线路及最终尺寸，所以早期国际运费只能用于规划，不能视为保证总价。",
          ],
        },
        {
          heading: "免费服务与可选仓库增值服务",
          paragraphs: [
            "官方把基础代购、常规质检和包裹合并描述为免费服务。标准QC照片用于查看商品大致情况，不等于按要求拍摄每个细节。增值服务表列出额外细节照片每张0.15美元；包裹照片每个包裹0.75美元，包含封箱前和封箱后的照片；预打包专页与增值服务表列为每包裹3美元。",
            "官方页面之间有一处需要如实说明：综合购物指南写预打包20元人民币，而专门页面及增值服务表写3美元/包裹。下单前应查看账户实时显示，不应把任何一个数字写成永久承诺。每件商品有90天免费仓储；增值服务表还列出每个商品ID每月1.50美元的延期费，并说明适用于存放60至90天的商品，最长可延至六个月。",
          ],
          callout: { title: "官方公布的可选价格", text: "补拍0.15美元/张；包裹照片0.75美元/包裹；预打包专页为3美元/包裹，但综合指南另写20元；仓储延期1.50美元/商品ID/月。" },
        },
        {
          heading: "为什么国际运费是变量",
          paragraphs: [
            "Joyagoo官方说明，国际运费取决于包裹重量、体积、所选线路和目的国家。某些商品还会限制可用线路，因此普通服装可选的线路不一定适用于电池、液体或其他受限商品。不能用一个固定的“每公斤价格”概括所有订单。",
            "部分线路比较实际重与体积重，并按较大者计费。实际重包括商品和包装；官方体积重公式为长×宽×高（厘米）÷5000，也可能按第三方物流标准使用6000、7000或8000。50×40×30厘米的箱子按5000计算为12公斤，即使秤重只有7公斤，也可能按12公斤收费。缩小无用体积可能省钱，但拆盒前还要考虑保护、退货条件和配件完整性。",
          ],
        },
        {
          heading: "预估运费、最终计费与优惠券",
          paragraphs: [
            "提交普通包裹时，系统先按仓库商品重量估算包装重量并收取预估运费。仓库打包后会重新称重和测量；如果物流商之后调整计费重量，物流商的数据可能成为最终依据。因此最终金额高于预估时可能需要补差，低于预估时差额可能退到平台余额。",
            "预打包的作用是先按指定包装和线路完成打包，再更新重量和运费，减少正式付款前的不确定性，而不是免除运费。专门页面写明服务完成后24小时内通知。官方购物指南还说明优惠券仅适用于国际运费且不能叠加，不会降低商品价、中国境内运费、补拍或退货费用。",
          ],
        },
        {
          heading: "最容易被忘记的费用",
          paragraphs: [
            "退货并非必然免费。官方政策规定，通常须在QC完成后5天或120小时内提交，并受卖家支持、商品状态和包装要求限制；页面列出的仓库退货运输及服务费约为0.75美元，无质量问题时其他退货运费也可能由买家承担。退款以实际支付商品金额为基础，仍需卖家同意。",
            "海关费用会随线路和目的地变化，第三方物流与海关也会影响时效和最终结果。加固、拆包装与保险同样需要按包裹实际页面判断。不要无理由勾选所有服务，也不要为了省一点体积拒绝必要保护；每项费用都应对应一个明确风险。",
          ],
        },
        {
          heading: "下单前的实用成本清单",
          paragraphs: [
            "记录准确规格价格、数量及中国境内运费；提前决定QC必须看清的细节；标准照片不够时预留补拍费用。QC完成后立即检查，因为90天免费仓储不会延长5天退货窗口。组合包裹时分别考虑重量与体积，鞋盒、帽子和保护材料会改变计费重量。",
            "运费估算只当范围，多比较线路和包装尺寸，判断预打包是否值得。最后保留一笔缓冲，并保存商品页、所选规格、QC照片、仓库重量和包裹报价的带日期截图。真正实用的选品表不是只寻找最低商品价，而是帮助你在购买前看清商品、仓库和国际运输的完整成本路径。",
          ],
          callout: { title: "预算公式", text: "商品 + 中国境内运费 + 自选仓库服务 + 国际包裹 + 风险余量。每次付款前重新核对实时金额。" },
        },
      ],
    },
  },
  de: {
    ...en,
    navLabel: "Kaufrecherche",
    indexEyebrow: "UNABHÄNGIGE RECHERCHE",
    indexTitle: "Joyagoo-Kaufrecherche zu echten Fragen vor dem Kauf",
    indexIntro: "Ausführliche, geprüfte Leitfäden zu Gebühren, QC, Rückgabe, Lager und internationalen Paketen.",
    latestLabel: "NEUER KOSTENLEITFADEN",
    readArticle: "Vollständigen Artikel lesen →",
    updatedLabel: "Aktualisiert am 30. Juli 2026",
    readTime: "9 Minuten Lesezeit",
    contentsLabel: "In diesem Artikel",
    sourceTitle: "So wurde der Artikel geprüft",
    sourceBody: "Am 30. Juli 2026 mit den JoyaGoo-Hilfeseiten zu Einkaufsgebühren, Bestellablauf, Zusatzleistungen, Probeverpackung, Ist- und Volumengewicht, endgültigem Abrechnungsgewicht und Rückgabe abgeglichen. Maßgeblich bleibt die aktuelle Anzeige im Konto.",
    ctaEyebrow: "RECHERCHE PRAKTISCH NUTZEN",
    ctaTitle: "Produkte mit Blick auf die Gesamtkosten auswählen",
    ctaBody: "Der Produktpreis ist nur der Anfang. Plane Inlandsversand, optionale Lagerleistungen und das internationale Paket mit ein.",
    ctaButton: "Produkte ansehen",
    article: {
      eyebrow: "JOYAGOO-GEBÜHRENLEITFADEN",
      title: "Joyagoo-Gebühren erklärt: Produktzahlung, Lagerextras und internationaler Versand",
      description: "Was der kostenlose Einkaufsservice umfasst, warum meist zwei Zahlungsstufen entstehen, welche Lagerleistungen optional sind und weshalb sich der Versandpreis nach dem Verpacken ändern kann.",
      facts: [
        { value: "$0", label: "Veröffentlichte Grundgebühr für den Einkaufsservice" },
        { value: "$0.15", label: "Veröffentlichter Preis je zusätzlichem Detailfoto" },
        { value: "90 Tage", label: "Veröffentlichte kostenlose Lagerzeit je Artikel" },
      ],
      sections: [
        { heading: "Mit dem Zwei-Zahlungen-Modell beginnen", paragraphs: [
          "Der Preis auf der Produktseite ist nicht der Preis bis zur Haustür. Zuerst werden Ware und gegebenenfalls der chinesische Inlandsversand des Verkäufers bezahlt. Später folgt die internationale Paketgebühr vom Lager zur Zieladresse. Dazwischen können bewusst gewählte Lagerleistungen, Rücksendekosten und mögliche Zollabgaben liegen.",
          "Der veröffentlichte Einkaufsservice ist kostenlos; das bedeutet keine separat ausgewiesene Basisprovision für den Einkauf. Es bedeutet nicht kostenlosen Versand. Ein realistisches Budget trennt Produkt, Verkäufer-zu-Lager-Versand, gewählte Zusatzleistungen und internationale Beförderung und enthält eine Reserve für Korrekturen, Rückgabe oder Zoll.",
        ], callout: { title: "Kurz gesagt", text: "Kostenlose Einkaufshilfe ist keine kostenlose Lieferung. Produkt- und Paketzahlung sind getrennte Entscheidungen." } },
        { heading: "Was die erste Zahlung abdeckt", paragraphs: [
          "Die erste Zahlung finanziert die Transaktion mit dem Drittanbieter: Variante, Größe, Menge, Produktpreis und chinesischer Inlandsversand. JoyaGoo leitet diese Beträge laut Gebührenhinweis an den Verkäufer weiter. Danach kauft der Agent, und der Verkäufer sendet zum Lager; dessen Versandtempo liegt nicht vollständig in der Hand des Lagers.",
          "Nach der Ankunft folgen Wareneingang und QC-Fotos. Zu diesem Zeitpunkt existiert das endgültige internationale Paket noch nicht. Kombination, Verpackungsentfernung, verfügbare Route und Endmaße sind offen. Eine frühe Versandangabe ist daher eine Planungsschätzung, kein garantierter Gesamtpreis.",
        ] },
        { heading: "Kostenlose Leistungen und optionale Lagerextras", paragraphs: [
          "JoyaGoo bezeichnet den Grundeinkauf, die reguläre Qualitätskontrolle und die Zusammenfassung als kostenlos. Für gezielte Detailfotos nennt die Zusatzleistungstabelle 0,15 US-Dollar pro Bild. Paketfotos kosten laut Tabelle 0,75 US-Dollar je Paket; die Probeverpackung wird auf der Spezialseite und in der Tabelle mit 3 US-Dollar je Paket angegeben.",
          "Der allgemeine Einkaufsleitfaden nennt für die Probeverpackung dagegen 20 CNY. Vor der Buchung zählt deshalb der Preis im Konto. Die kostenlose Lagerzeit beträgt 90 Tage je Artikel. Für Verlängerungen nennt die Tabelle 1,50 US-Dollar je Produkt-ID und Monat innerhalb des angegebenen Zeitfensters, maximal bis zu sechs Monaten.",
        ], callout: { title: "Veröffentlichte Optionspreise", text: "Detailfoto 0,15 USD; Paketfoto 0,75 USD; Probeverpackung 3 USD, während der allgemeine Leitfaden auch 20 CNY nennt; Lagerverlängerung 1,50 USD je Produkt-ID und Monat." } },
        { heading: "Warum internationaler Versand variabel ist", paragraphs: [
          "Die Gebühr hängt laut JoyaGoo von Gewicht, Volumen, Versandart und Zielland ab. Produktbeschränkungen können Routen ausschließen. Deshalb lässt sich keine allgemeingültige Kilopauschale versprechen.",
          "Bei manchen Linien zählt der höhere Wert aus Ist- und Volumengewicht. Die veröffentlichte Formel lautet Länge × Breite × Höhe in Zentimetern geteilt durch 5.000; Logistikpartner können auch 6.000, 7.000 oder 8.000 verwenden. Ein Karton mit 50 × 40 × 30 cm ergibt bei 5.000 bereits 12 kg, auch wenn die Waage nur 7 kg zeigt.",
        ] },
        { heading: "Schätzung, Endabrechnung und Gutscheine", paragraphs: [
          "Das System berechnet zunächst eine geschätzte Paketgebühr. Nach dem Verpacken misst und wiegt das Lager; ein später korrigiertes Gewicht des Logistikpartners kann maßgeblich werden. Übersteigt die Endgebühr die Schätzung, kann eine Nachzahlung nötig sein; ist sie niedriger, kann die Differenz dem Guthaben gutgeschrieben werden.",
          "Probeverpackung reduziert Unsicherheit, macht den Versand aber nicht kostenlos. Die Spezialseite nennt eine Benachrichtigung innerhalb von 24 Stunden nach Abschluss. Gutscheine gelten laut Einkaufsleitfaden nur für internationale Versandkosten und sind nicht stapelbar.",
        ] },
        { heading: "Leicht vergessene Kosten", paragraphs: [
          "Rückgaben sind nicht automatisch kostenlos. Der veröffentlichte Zeitraum beträgt gewöhnlich fünf Tage beziehungsweise 120 Stunden nach QC-Abschluss und hängt von Verkäufer, Zustand und Verpackung ab. Die Seite nennt ungefähr 0,75 US-Dollar Versand- und Servicekosten für eine passende Lagerrückgabe; weitere Rücksendekosten können beim Käufer liegen.",
          "Zoll, Verstärkung, Verpackungsentfernung und Versicherung sind separate Risiken oder Optionen. Prüfe den aktuellen Routentext und lokale Einfuhrregeln. Jede Zusatzleistung sollte ein konkretes Problem lösen, statt wahllos aktiviert oder grundsätzlich abgelehnt zu werden.",
        ] },
        { heading: "Praktische Kostenliste vor der Bestellung", paragraphs: [
          "Notiere Variante, Menge, Produktpreis und Inlandsversand. Lege fest, welche Details QC zeigen muss, und plane bei Bedarf Zusatzfotos. Prüfe die Bilder sofort: 90 Tage kostenlose Lagerung verlängern nicht das fünftägige Rückgabefenster.",
          "Betrachte Versandrechner als Spanne, vergleiche Routen sowie Paketgrößen und entscheide bewusst über Probeverpackung. Bewahre datierte Screenshots von Angebot, Auswahl, QC, Lagergewicht und Paketpreis auf und halte eine Reserve bereit. Eine gute Produkttabelle zeigt den gesamten Kostenweg, nicht nur den niedrigsten Artikelpreis.",
        ], callout: { title: "Budgetformel", text: "Produkt + chinesischer Inlandsversand + gewählte Lagerextras + internationales Paket + Reserve. Jeden Live-Preis vor der Zahlung erneut prüfen." } },
      ],
    },
  },
  pl: {
    ...en,
    navLabel: "Poradniki zakupowe",
    indexEyebrow: "NIEZALEŻNY RESEARCH",
    indexTitle: "Badania zakupowe Joyagoo odpowiadające na realne pytania",
    indexIntro: "Długie, sprawdzone poradniki o opłatach, QC, zwrotach, magazynie i przesyłkach międzynarodowych.",
    latestLabel: "NAJNOWSZY PORADNIK KOSZTOWY",
    readArticle: "Przeczytaj cały artykuł →",
    updatedLabel: "Aktualizacja: 30 lipca 2026",
    readTime: "9 minut czytania",
    contentsLabel: "W tym artykule",
    sourceTitle: "Jak sprawdzono artykuł",
    sourceBody: "Treść porównano 30 lipca 2026 z materiałami centrum pomocy JoyaGoo o opłatach, zakupach, usługach dodatkowych, pakowaniu próbnym, wadze rzeczywistej i objętościowej, wadze rozliczeniowej oraz zwrotach. Ostateczne są bieżące dane w koncie.",
    ctaEyebrow: "WYKORZYSTAJ RESEARCH",
    ctaTitle: "Przeglądaj produkty, znając pełny koszt",
    ctaBody: "Cena produktu to początek; uwzględnij dostawę krajową, opcje magazynowe i paczkę międzynarodową.",
    ctaButton: "Przeglądaj produkty",
    article: {
      eyebrow: "PORADNIK OPŁAT JOYAGOO",
      title: "Opłaty Joyagoo: płatność za produkt, usługi magazynowe i wysyłka międzynarodowa",
      description: "Praktyczne wyjaśnienie bezpłatnej usługi zakupowej, dwóch etapów płatności, płatnych opcji magazynowych i zmian kosztu po spakowaniu.",
      facts: [
        { value: "$0", label: "Opublikowana podstawowa opłata za usługę zakupową" },
        { value: "$0.15", label: "Opublikowana cena dodatkowego zdjęcia szczegółowego" },
        { value: "90 dni", label: "Opublikowany bezpłatny okres magazynowania produktu" },
      ],
      sections: [
        { heading: "Najpierw zrozum dwa etapy płatności", paragraphs: [
          "Cena produktu nie jest ceną dostawy do domu. Pierwsza płatność obejmuje towar i ewentualną przesyłkę sprzedawcy do magazynu w Chinach. Druga dotyczy paczki międzynarodowej. Pomiędzy nimi mogą pojawić się wybrane usługi magazynowe, koszty zwrotu i opłaty celne.",
          "JoyaGoo publikuje podstawową usługę zakupową jako bezpłatną, czyli bez oddzielnej prowizji bazowej. Nie oznacza to darmowej wysyłki. Budżet powinien osobno uwzględniać produkt, transport do magazynu, wybrane dodatki, wysyłkę międzynarodową i niewielki zapas.",
        ], callout: { title: "W skrócie", text: "Bezpłatna pomoc zakupowa nie oznacza bezpłatnej dostawy." } },
        { heading: "Co obejmuje pierwsza płatność", paragraphs: [
          "Pierwsza płatność finansuje zakup u zewnętrznego sprzedawcy: wariant, rozmiar, ilość, cenę i transport krajowy. Następnie agent kupuje towar, a sprzedawca wysyła go do magazynu. Szybkość wysyłki sprzedawcy nie jest w pełni kontrolowana przez magazyn.",
          "Po przyjęciu wykonywane są zdjęcia QC. Finalna paczka jeszcze wtedy nie istnieje: nie wiadomo, jakie produkty zostaną połączone, jakie opakowania usunięte, jaka linia będzie dostępna i jakie będą wymiary. Wczesna wycena międzynarodowa jest więc szacunkiem.",
        ] },
        { heading: "Usługi bezpłatne i płatne dodatki magazynowe", paragraphs: [
          "Podstawowe zakupy, standardowe QC i konsolidacja są opisywane jako bezpłatne. Dodatkowe zdjęcie szczegółowe kosztuje według tabeli 0,15 USD, zdjęcia paczki 0,75 USD za paczkę, a pakowanie próbne 3 USD za paczkę.",
          "Ogólny poradnik podaje jednak 20 CNY za pakowanie próbne, dlatego przed zamówieniem sprawdź ekran konta. Bezpłatne magazynowanie wynosi 90 dni na produkt. Tabela podaje przedłużenie za 1,50 USD za ID produktu miesięcznie w opisanym oknie, maksymalnie do sześciu miesięcy.",
        ], callout: { title: "Opublikowane ceny opcji", text: "0,15 USD za zdjęcie; 0,75 USD za zdjęcia paczki; 3 USD za pakowanie próbne, choć poradnik podaje też 20 CNY; 1,50 USD za ID produktu/miesiąc przedłużenia." } },
        { heading: "Dlaczego wysyłka międzynarodowa jest zmienna", paragraphs: [
          "Koszt zależy od wagi, objętości, metody i kraju docelowego. Ograniczenia produktu mogą usuwać niektóre linie, więc jedna stała cena za kilogram nie opisuje każdego zamówienia.",
          "Niektóre trasy rozliczają większą z wagi rzeczywistej i objętościowej. Wzór JoyaGoo to długość × szerokość × wysokość w cm ÷ 5000, czasem ÷6000, 7000 lub 8000. Karton 50 × 40 × 30 cm daje 12 kg przy dzielniku 5000, nawet jeśli waży 7 kg.",
        ] },
        { heading: "Szacunek, rozliczenie końcowe i kupony", paragraphs: [
          "System pobiera najpierw szacowaną opłatę. Po spakowaniu magazyn waży i mierzy paczkę, a korekta operatora logistycznego może stać się podstawą końcową. Możliwa jest dopłata lub zwrot różnicy do salda.",
          "Pakowanie próbne zmniejsza niepewność, ale nie usuwa kosztu wysyłki. Strona usługi mówi o powiadomieniu w ciągu 24 godzin. Kupony dotyczą tylko wysyłki międzynarodowej i nie można ich łączyć.",
        ] },
        { heading: "Koszty, o których łatwo zapomnieć", paragraphs: [
          "Zwrot zwykle trzeba zgłosić w ciągu pięciu dni lub 120 godzin od zakończenia QC i zależy on od sprzedawcy, stanu oraz opakowania. Oficjalna strona podaje około 0,75 USD opłaty transportowej i usługowej; inne koszty zwrotu mogą obciążać kupującego.",
          "Cło, wzmocnienie paczki, usunięcie opakowań i ubezpieczenie są osobnymi elementami. Sprawdź aktualne warunki trasy i lokalne przepisy. Każda płatna opcja powinna odpowiadać konkretnemu ryzyku.",
        ] },
        { heading: "Lista kosztów przed zamówieniem", paragraphs: [
          "Zapisz cenę wariantu, ilość i transport krajowy. Ustal, co musi pokazać QC, i zaplanuj dodatkowe zdjęcia. Obejrzyj je szybko, ponieważ 90 dni magazynu nie wydłuża pięciodniowego okna zwrotu.",
          "Kalkulator traktuj jako zakres, porównaj trasy oraz rozmiary paczki i zdecyduj, czy pakowanie próbne ma sens. Zachowaj datowane zrzuty oferty, QC, wagi i wyceny oraz bufor finansowy. Dobra tabela produktowa pokazuje całą ścieżkę kosztów.",
        ], callout: { title: "Wzór budżetu", text: "Produkt + transport krajowy + wybrane dodatki + paczka międzynarodowa + rezerwa." } },
      ],
    },
  },
  es: {
    ...en,
    navLabel: "Investigación de compra",
    indexEyebrow: "INVESTIGACIÓN INDEPENDIENTE",
    indexTitle: "Investigación sobre Joyagoo para dudas reales de compra",
    indexIntro: "Guías largas y verificadas sobre tarifas, QC, devoluciones, almacén y paquetes internacionales.",
    latestLabel: "NUEVA GUÍA DE COSTES",
    readArticle: "Leer el artículo completo →",
    updatedLabel: "Actualizado el 30 de julio de 2026",
    readTime: "9 minutos de lectura",
    contentsLabel: "En este artículo",
    sourceTitle: "Cómo se verificó",
    sourceBody: "Revisado el 30 de julio de 2026 con el centro de ayuda de JoyaGoo sobre tarifas, proceso de compra, servicios de valor añadido, embalaje de ensayo, peso real y volumétrico, facturación final y devoluciones. La pantalla actual de la cuenta es la referencia definitiva.",
    ctaEyebrow: "USA LA INVESTIGACIÓN",
    ctaTitle: "Explora productos pensando en el coste completo",
    ctaBody: "El precio del artículo es el inicio: añade transporte nacional, extras de almacén y paquete internacional.",
    ctaButton: "Explorar productos",
    article: {
      eyebrow: "GUÍA DE TARIFAS JOYAGOO",
      title: "Tarifas de Joyagoo: pago del producto, extras de almacén y envío internacional",
      description: "Qué significa el servicio de compra gratuito, por qué suele haber dos pagos, qué opciones de almacén cuestan aparte y por qué cambia la cotización tras embalar.",
      facts: [
        { value: "$0", label: "Tarifa base publicada del servicio de compra" },
        { value: "$0.15", label: "Precio publicado de cada foto detallada extra" },
        { value: "90 días", label: "Almacenamiento gratuito publicado por artículo" },
      ],
      sections: [
        { heading: "Empieza por el modelo de dos pagos", paragraphs: [
          "El precio del producto no es el precio entregado. El primer pago cubre el artículo y el transporte nacional chino cobrado por el vendedor; el segundo cubre el paquete internacional. Entre ambos pueden aparecer servicios opcionales, devolución y aduanas.",
          "Joyagoo publica el servicio básico de compra como gratuito, es decir, sin una comisión base separada. No significa envío gratis. Separa en el presupuesto producto, envío al almacén, extras elegidos, transporte internacional y un margen.",
        ], callout: { title: "Resumen", text: "Asistencia de compra gratuita no significa entrega gratuita." } },
        { heading: "Qué cubre el primer pago", paragraphs: [
          "La primera transacción paga variante, talla, cantidad, producto y transporte nacional al vendedor externo. Después el agente compra y el vendedor envía al almacén; la velocidad de ese vendedor no está totalmente bajo control del almacén.",
          "Al llegar se realizan fotos QC. Todavía no existe el paquete final: faltan consolidación, retirada de embalaje, ruta y medidas. Por eso una cifra internacional temprana es una estimación de planificación.",
        ] },
        { heading: "Servicios gratuitos y extras opcionales", paragraphs: [
          "La compra básica, el QC estándar y la consolidación se describen como gratuitos. La tabla oficial marca fotos detalladas a 0,15 USD cada una, fotos del paquete a 0,75 USD por paquete y ensayo de embalaje a 3 USD por paquete.",
          "La guía general también muestra 20 CNY para el ensayo, así que manda el precio de la cuenta. Cada artículo tiene 90 días gratuitos. La extensión publicada cuesta 1,50 USD por ID de producto y mes en la ventana indicada, hasta un máximo de seis meses.",
        ], callout: { title: "Precios publicados", text: "0,15 USD por foto; 0,75 USD por foto de paquete; ensayo 3 USD aunque otra guía muestra 20 CNY; extensión 1,50 USD por ID/mes." } },
        { heading: "Por qué el envío internacional varía", paragraphs: [
          "El coste depende de peso, volumen, método y destino, y las restricciones pueden eliminar rutas. No existe una tarifa universal por kilo.",
          "Algunas líneas cobran el mayor entre peso real y volumétrico. La fórmula publicada es largo × ancho × alto en cm ÷ 5000, o divisores 6000, 7000 u 8000. Una caja de 50 × 40 × 30 cm equivale a 12 kg con divisor 5000 aunque pese 7 kg.",
        ] },
        { heading: "Estimación, cobro final y cupones", paragraphs: [
          "El sistema cobra primero una estimación. Tras embalar, el almacén pesa y mide; una corrección del transportista puede controlar el cobro final. Puede haber diferencia a pagar o devolución al saldo.",
          "El ensayo reduce incertidumbre y su página habla de aviso dentro de 24 horas, pero no hace gratis el envío. Los cupones solo se aplican al envío internacional y no se acumulan.",
        ] },
        { heading: "Costes fáciles de olvidar", paragraphs: [
          "La devolución suele solicitarse en cinco días o 120 horas desde el QC y depende del vendedor, estado y embalaje. La política menciona unos 0,75 USD de transporte y servicio; otros costes pueden corresponder al comprador.",
          "Aduanas, refuerzo, retirada de embalaje y seguro son decisiones separadas. Revisa la ruta y las reglas locales y paga cada extra solo cuando resuelva un riesgo real.",
        ] },
        { heading: "Lista práctica antes de comprar", paragraphs: [
          "Anota variante, cantidad, precio y envío nacional; decide qué debe mostrar el QC y reserva fotos extra. Revisa rápido: los 90 días de almacén no alargan los cinco días de devolución.",
          "Usa el estimador como rango, compara rutas y tamaños, decide si conviene el ensayo y guarda capturas fechadas de listado, QC, peso y tarifa. Una buena hoja muestra la ruta completa de costes.",
        ], callout: { title: "Fórmula de presupuesto", text: "Producto + envío nacional + extras elegidos + paquete internacional + margen." } },
      ],
    },
  },
  it: {
    ...en,
    navLabel: "Ricerca d’acquisto",
    indexEyebrow: "RICERCA INDIPENDENTE",
    indexTitle: "Ricerca su Joyagoo per vere domande d’acquisto",
    indexIntro: "Guide lunghe e verificate su costi, QC, resi, magazzino e pacchi internazionali.",
    latestLabel: "NUOVA GUIDA AI COSTI",
    readArticle: "Leggi l’articolo completo →",
    updatedLabel: "Aggiornato il 30 luglio 2026",
    readTime: "9 minuti di lettura",
    contentsLabel: "In questo articolo",
    sourceTitle: "Come è stato verificato",
    sourceBody: "Confrontato il 30 luglio 2026 con le pagine JoyaGoo su costi, acquisto, servizi aggiuntivi, pre-imballaggio di prova, peso reale e volumetrico, peso finale e resi. Fa fede la schermata aggiornata dell’account.",
    ctaEyebrow: "USA LA RICERCA",
    ctaTitle: "Sfoglia i prodotti pensando al costo totale",
    ctaBody: "Il prezzo è solo l’inizio: considera spedizione interna, servizi di magazzino e pacco internazionale.",
    ctaButton: "Esplora prodotti",
    article: {
      eyebrow: "GUIDA AI COSTI JOYAGOO",
      title: "Costi Joyagoo: pagamento del prodotto, extra di magazzino e spedizione internazionale",
      description: "Che cosa significa servizio d’acquisto gratuito, perché ci sono spesso due pagamenti, quali servizi sono opzionali e perché il preventivo cambia dopo l’imballaggio.",
      facts: [
        { value: "$0", label: "Costo base pubblicato del servizio d’acquisto" },
        { value: "$0.15", label: "Prezzo pubblicato per ogni foto dettagliata extra" },
        { value: "90 giorni", label: "Periodo gratuito pubblicato per ogni articolo" },
      ],
      sections: [
        { heading: "Parti dal modello a due pagamenti", paragraphs: [
          "Il prezzo del prodotto non è il totale consegnato. Il primo pagamento copre articolo e spedizione interna cinese del venditore; il secondo copre il pacco internazionale. Nel mezzo possono esserci extra scelti, reso e dogana.",
          "Joyagoo indica gratuito il servizio base di acquisto, cioè senza commissione base separata. Non significa spedizione gratuita. Separa prodotto, trasporto al magazzino, extra, spedizione internazionale e margine.",
        ], callout: { title: "In breve", text: "Assistenza d’acquisto gratuita non equivale a consegna gratuita." } },
        { heading: "Che cosa copre il primo pagamento", paragraphs: [
          "La prima transazione paga variante, taglia, quantità, prodotto e trasporto nazionale al venditore. L’agente acquista e il venditore spedisce al magazzino; i suoi tempi non sono completamente controllabili.",
          "All’arrivo vengono scattate foto QC. Il pacco finale non esiste ancora: consolidamento, rimozione imballi, linea e dimensioni sono aperti. Una cifra internazionale iniziale è quindi una stima.",
        ] },
        { heading: "Servizi gratuiti ed extra opzionali", paragraphs: [
          "Acquisto base, QC standard e consolidamento sono descritti come gratuiti. La tabella indica 0,15 USD per foto dettagliata, 0,75 USD per foto pacco e 3 USD per il pre-imballaggio di prova.",
          "La guida generale riporta anche 20 CNY per il pre-imballaggio, quindi va controllato il conto. Lo stoccaggio gratuito è di 90 giorni; l’estensione pubblicata costa 1,50 USD per ID prodotto al mese nella finestra prevista, fino a sei mesi.",
        ], callout: { title: "Prezzi pubblicati", text: "0,15 USD/foto; 0,75 USD/pacco; pre-imballaggio 3 USD, ma una guida mostra 20 CNY; estensione 1,50 USD per ID/mese." } },
        { heading: "Perché la spedizione internazionale varia", paragraphs: [
          "Il costo dipende da peso, volume, metodo e destinazione; le restrizioni possono escludere linee. Non esiste un prezzo universale al chilo.",
          "Alcune linee addebitano il maggiore tra peso reale e volumetrico. Formula: lunghezza × larghezza × altezza in cm ÷5000, oppure 6000, 7000 o 8000. Una scatola 50×40×30 cm vale 12 kg con 5000 anche se pesa 7 kg.",
        ] },
        { heading: "Stima, addebito finale e coupon", paragraphs: [
          "Il sistema riscuote una stima; dopo l’imballaggio il magazzino pesa e misura, e un’eventuale correzione del corriere può diventare definitiva. Può servire un conguaglio o arrivare un rimborso sul saldo.",
          "Il pre-imballaggio riduce l’incertezza e la pagina indica notifica entro 24 ore, ma non elimina la spedizione. I coupon valgono solo sul trasporto internazionale e non sono cumulabili.",
        ] },
        { heading: "Costi facili da dimenticare", paragraphs: [
          "Il reso va normalmente chiesto entro cinque giorni o 120 ore dal QC e dipende da venditore, condizioni e imballo. La politica cita circa 0,75 USD di trasporto e servizio; altre spese possono spettare al cliente.",
          "Dogana, rinforzo, rimozione imballi e assicurazione sono voci separate. Controlla la linea e le regole locali; scegli un extra solo se risolve un rischio concreto.",
        ] },
        { heading: "Checklist pratica prima dell’ordine", paragraphs: [
          "Registra variante, quantità, prezzo e spedizione interna; decidi che cosa deve mostrare il QC e prevedi foto extra. Controlla subito: 90 giorni di deposito non estendono i cinque giorni di reso.",
          "Usa il calcolatore come intervallo, confronta linee e dimensioni, valuta il pre-imballaggio e conserva screenshot datati di inserzione, QC, peso e preventivo. Un buon foglio mostra tutto il percorso dei costi.",
        ], callout: { title: "Formula di budget", text: "Prodotto + spedizione interna + extra scelti + pacco internazionale + margine." } },
      ],
    },
  },
  fr: {
    ...en,
    navLabel: "Recherche d’achat",
    indexEyebrow: "RECHERCHE INDÉPENDANTE",
    indexTitle: "Recherche Joyagoo pour de vraies questions d’achat",
    indexIntro: "Des guides longs et vérifiés sur les frais, le QC, les retours, l’entrepôt et les colis internationaux.",
    latestLabel: "NOUVEAU GUIDE DES COÛTS",
    readArticle: "Lire l’article complet →",
    updatedLabel: "Mis à jour le 30 juillet 2026",
    readTime: "9 minutes de lecture",
    contentsLabel: "Dans cet article",
    sourceTitle: "Comment l’article a été vérifié",
    sourceBody: "Vérifié le 30 juillet 2026 avec les pages d’aide JoyaGoo sur les frais, le processus d’achat, les services additionnels, le pré-emballage, le poids réel et volumétrique, la facturation finale et les retours. L’écran actuel du compte reste la référence.",
    ctaEyebrow: "UTILISER LA RECHERCHE",
    ctaTitle: "Parcourir les produits en pensant au coût total",
    ctaBody: "Le prix produit n’est que le départ : ajoutez livraison intérieure, options d’entrepôt et colis international.",
    ctaButton: "Explorer les produits",
    article: {
      eyebrow: "GUIDE DES FRAIS JOYAGOO",
      title: "Frais Joyagoo : paiement du produit, options d’entrepôt et livraison internationale",
      description: "Ce que couvre le service d’achat gratuit, pourquoi il existe souvent deux paiements, quelles options sont payantes et pourquoi le devis évolue après emballage.",
      facts: [
        { value: "$0", label: "Frais de base publiés pour le service d’achat" },
        { value: "$0.15", label: "Prix publié de chaque photo détaillée supplémentaire" },
        { value: "90 jours", label: "Stockage gratuit publié par article" },
      ],
      sections: [
        { heading: "Commencer par le modèle à deux paiements", paragraphs: [
          "Le prix de la fiche produit n’est pas le prix livré. Le premier paiement couvre l’article et le transport intérieur chinois du vendeur ; le second couvre le colis international. Des options d’entrepôt, un retour ou la douane peuvent s’ajouter.",
          "Joyagoo publie le service d’achat de base comme gratuit, sans commission de base distincte. Cela ne signifie pas livraison gratuite. Séparez produit, trajet vers l’entrepôt, options choisies, livraison internationale et marge.",
        ], callout: { title: "En bref", text: "Une assistance d’achat gratuite n’est pas une livraison gratuite." } },
        { heading: "Ce que couvre le premier paiement", paragraphs: [
          "La première transaction paie variante, taille, quantité, produit et livraison nationale au vendeur tiers. L’agent achète ensuite et le vendeur expédie à l’entrepôt ; sa vitesse n’est pas entièrement contrôlée par l’entrepôt.",
          "À l’arrivée, des photos QC sont prises. Le colis final n’existe pas encore : consolidation, retrait d’emballage, ligne disponible et dimensions restent inconnus. Un chiffre international précoce est donc une estimation.",
        ] },
        { heading: "Services gratuits et options payantes", paragraphs: [
          "Achat de base, QC standard et consolidation sont présentés comme gratuits. Le tableau officiel indique 0,15 USD par photo détaillée, 0,75 USD par colis pour les photos de colis et 3 USD par colis pour le pré-emballage.",
          "Le guide général affiche aussi 20 CNY pour le pré-emballage : vérifiez le compte. Le stockage gratuit dure 90 jours. L’extension publiée coûte 1,50 USD par ID produit et par mois dans la fenêtre indiquée, jusqu’à six mois.",
        ], callout: { title: "Prix publiés", text: "0,15 USD/photo ; 0,75 USD/colis ; pré-emballage 3 USD mais un guide indique aussi 20 CNY ; extension 1,50 USD par ID/mois." } },
        { heading: "Pourquoi la livraison internationale varie", paragraphs: [
          "Le coût dépend du poids, du volume, de la méthode et de la destination, et les restrictions peuvent supprimer des lignes. Il n’existe pas de tarif universel au kilo.",
          "Certaines routes facturent le plus élevé entre poids réel et volumétrique. Formule publiée : longueur × largeur × hauteur en cm ÷5000, parfois 6000, 7000 ou 8000. Un carton de 50×40×30 cm donne 12 kg avec 5000, même s’il pèse 7 kg.",
        ] },
        { heading: "Estimation, facturation finale et coupons", paragraphs: [
          "Le système encaisse d’abord une estimation. Après emballage, l’entrepôt pèse et mesure ; une correction du transporteur peut devenir définitive. Un complément ou un remboursement sur le solde peut suivre.",
          "Le pré-emballage réduit l’incertitude et sa page annonce une notification sous 24 heures, mais ne rend pas le transport gratuit. Les coupons ne valent que pour l’international et ne se cumulent pas.",
        ] },
        { heading: "Coûts faciles à oublier", paragraphs: [
          "Le retour doit généralement être demandé sous cinq jours ou 120 heures après QC et dépend du vendeur, de l’état et de l’emballage. La politique cite environ 0,75 USD de transport et service ; d’autres frais peuvent rester à la charge de l’acheteur.",
          "Douane, renforcement, retrait d’emballage et assurance sont séparés. Vérifiez la ligne et les règles locales ; chaque option payante doit résoudre un risque concret.",
        ] },
        { heading: "Checklist avant achat", paragraphs: [
          "Notez variante, quantité, prix et livraison intérieure ; définissez ce que le QC doit montrer et prévoyez des photos supplémentaires. Contrôlez vite : les 90 jours d’entrepôt ne prolongent pas les cinq jours de retour.",
          "Traitez l’estimateur comme une fourchette, comparez lignes et tailles, évaluez le pré-emballage et gardez des captures datées de la fiche, du QC, du poids et du devis. Une bonne feuille montre tout le parcours des coûts.",
        ], callout: { title: "Formule de budget", text: "Produit + livraison intérieure + options choisies + colis international + marge." } },
      ],
    },
  },
  pt: {
    ...en,
    navLabel: "Pesquisa de compra",
    indexEyebrow: "PESQUISA INDEPENDENTE",
    indexTitle: "Pesquisa sobre Joyagoo para dúvidas reais de compra",
    indexIntro: "Guias longos e verificados sobre taxas, QC, devoluções, armazém e encomendas internacionais.",
    latestLabel: "NOVO GUIA DE CUSTOS",
    readArticle: "Ler artigo completo →",
    updatedLabel: "Atualizado em 30 de julho de 2026",
    readTime: "9 minutos de leitura",
    contentsLabel: "Neste artigo",
    sourceTitle: "Como o artigo foi verificado",
    sourceBody: "Conferido em 30 de julho de 2026 com as páginas JoyaGoo sobre taxas, compras, serviços adicionais, pré-embalagem, peso real e volumétrico, peso final e devoluções. A tela atual da conta é a referência final.",
    ctaEyebrow: "USE A PESQUISA",
    ctaTitle: "Explore produtos pensando no custo completo",
    ctaBody: "O preço do item é o começo: inclua frete doméstico, extras do armazém e pacote internacional.",
    ctaButton: "Explorar produtos",
    article: {
      eyebrow: "GUIA DE TAXAS JOYAGOO",
      title: "Taxas Joyagoo: pagamento do produto, extras do armazém e envio internacional",
      description: "O que significa serviço de compra gratuito, por que normalmente há dois pagamentos, quais opções custam à parte e por que a cotação muda após embalar.",
      facts: [
        { value: "$0", label: "Taxa básica publicada do serviço de compra" },
        { value: "$0.15", label: "Preço publicado por foto detalhada extra" },
        { value: "90 dias", label: "Armazenamento gratuito publicado por item" },
      ],
      sections: [
        { heading: "Comece pelo modelo de dois pagamentos", paragraphs: [
          "O preço do produto não é o total entregue. O primeiro pagamento cobre item e frete doméstico chinês do vendedor; o segundo cobre o pacote internacional. Extras escolhidos, devolução e alfândega podem aparecer entre eles.",
          "A Joyagoo publica o serviço básico como gratuito, sem comissão base separada. Isso não significa frete grátis. Separe produto, envio ao armazém, extras, transporte internacional e margem.",
        ], callout: { title: "Resumo", text: "Assistência de compra gratuita não é entrega gratuita." } },
        { heading: "O que o primeiro pagamento cobre", paragraphs: [
          "A primeira transação paga variação, tamanho, quantidade, produto e frete doméstico ao vendedor externo. Depois o agente compra e o vendedor envia ao armazém; a velocidade dele não é totalmente controlável.",
          "Na chegada, são feitas fotos QC. O pacote final ainda não existe: consolidação, remoção de embalagens, rota e dimensões estão abertas. Por isso um valor internacional inicial é estimativa.",
        ] },
        { heading: "Serviços gratuitos e extras opcionais", paragraphs: [
          "Compra básica, QC padrão e consolidação são descritos como gratuitos. A tabela oficial indica US$0,15 por foto detalhada, US$0,75 por pacote para fotos e US$3 por pacote para pré-embalagem.",
          "O guia geral também mostra 20 CNY para pré-embalagem, então confira a conta. O armazenamento gratuito é de 90 dias; a extensão publicada custa US$1,50 por ID de produto por mês na janela indicada, até seis meses.",
        ], callout: { title: "Preços publicados", text: "US$0,15/foto; US$0,75/pacote; pré-embalagem US$3, embora um guia mostre 20 CNY; extensão US$1,50 por ID/mês." } },
        { heading: "Por que o envio internacional varia", paragraphs: [
          "O custo depende de peso, volume, método e destino, e restrições removem rotas. Não existe preço universal por quilo.",
          "Algumas linhas cobram o maior entre peso real e volumétrico. Fórmula: comprimento × largura × altura em cm ÷5000, ou divisores 6000, 7000 e 8000. Uma caixa 50×40×30 cm equivale a 12 kg com 5000 mesmo pesando 7 kg.",
        ] },
        { heading: "Estimativa, cobrança final e cupons", paragraphs: [
          "O sistema cobra primeiro uma estimativa. Após embalar, o armazém pesa e mede; correção da transportadora pode valer como final. Pode haver complemento ou reembolso ao saldo.",
          "A pré-embalagem reduz a incerteza e sua página fala em aviso em 24 horas, mas não elimina o frete. Cupons valem apenas no transporte internacional e não acumulam.",
        ] },
        { heading: "Custos fáceis de esquecer", paragraphs: [
          "A devolução normalmente deve ser pedida em cinco dias ou 120 horas após o QC e depende do vendedor, estado e embalagem. A política cita cerca de US$0,75 em transporte e serviço; outros custos podem ser do comprador.",
          "Alfândega, reforço, remoção de embalagem e seguro são separados. Confira a rota e regras locais; cada extra deve resolver um risco real.",
        ] },
        { heading: "Checklist antes de comprar", paragraphs: [
          "Registre variação, quantidade, preço e frete doméstico; decida o que o QC precisa mostrar e reserve fotos extras. Veja rápido: 90 dias de armazém não ampliam os cinco dias de devolução.",
          "Use o estimador como faixa, compare rotas e tamanhos, avalie a pré-embalagem e guarde capturas datadas de anúncio, QC, peso e cotação. Uma boa planilha mostra todo o caminho de custos.",
        ], callout: { title: "Fórmula de orçamento", text: "Produto + frete doméstico + extras escolhidos + pacote internacional + margem." } },
      ],
    },
  },
  ro: {
    ...en,
    navLabel: "Cercetare de cumpărare",
    indexEyebrow: "CERCETARE INDEPENDENTĂ",
    indexTitle: "Cercetare Joyagoo pentru întrebări reale de cumpărare",
    indexIntro: "Ghiduri lungi și verificate despre taxe, QC, retururi, depozit și colete internaționale.",
    latestLabel: "GHID NOU DE COSTURI",
    readArticle: "Citește articolul complet →",
    updatedLabel: "Actualizat la 30 iulie 2026",
    readTime: "9 minute de citit",
    contentsLabel: "În acest articol",
    sourceTitle: "Cum a fost verificat",
    sourceBody: "Verificat la 30 iulie 2026 cu paginile JoyaGoo despre taxe, cumpărare, servicii suplimentare, preambalare, greutate reală și volumetrică, facturare finală și retururi. Ecranul actual al contului rămâne referința finală.",
    ctaEyebrow: "FOLOSEȘTE CERCETAREA",
    ctaTitle: "Explorează produsele cu costul complet în minte",
    ctaBody: "Prețul produsului este începutul: adaugă transportul intern, opțiunile depozitului și coletul internațional.",
    ctaButton: "Explorează produse",
    article: {
      eyebrow: "GHID TAXE JOYAGOO",
      title: "Taxele Joyagoo: plata produsului, opțiuni de depozit și transport internațional",
      description: "Ce înseamnă serviciul gratuit, de ce apar de obicei două plăți, ce opțiuni costă separat și de ce oferta se schimbă după ambalare.",
      facts: [
        { value: "$0", label: "Taxa de bază publicată pentru serviciul de cumpărare" },
        { value: "$0.15", label: "Prețul publicat pentru o fotografie detaliată suplimentară" },
        { value: "90 zile", label: "Perioada gratuită publicată pentru fiecare produs" },
      ],
      sections: [
        { heading: "Începe cu modelul celor două plăți", paragraphs: [
          "Prețul produsului nu este totalul livrat. Prima plată acoperă produsul și transportul intern chinezesc; a doua acoperă coletul internațional. Între ele pot apărea servicii opționale, retur și vamă.",
          "Joyagoo publică serviciul de cumpărare de bază drept gratuit, fără comision separat. Nu înseamnă livrare gratuită. Separă produsul, transportul la depozit, opțiunile, expedierea internațională și o rezervă.",
        ], callout: { title: "Pe scurt", text: "Asistența gratuită la cumpărare nu înseamnă livrare gratuită." } },
        { heading: "Ce acoperă prima plată", paragraphs: [
          "Prima tranzacție plătește varianta, mărimea, cantitatea, produsul și transportul intern către vânzător. Agentul cumpără, iar vânzătorul trimite la depozit; viteza acestuia nu este complet controlabilă.",
          "La sosire se fac fotografii QC. Coletul final nu există încă: consolidarea, eliminarea ambalajului, ruta și dimensiunile sunt necunoscute. De aceea suma internațională timpurie este doar estimare.",
        ] },
        { heading: "Servicii gratuite și opțiuni plătite", paragraphs: [
          "Cumpărarea de bază, QC standard și consolidarea sunt descrise ca gratuite. Tabelul oficial indică 0,15 USD/fotografie detaliată, 0,75 USD/colet pentru fotografii și 3 USD/colet pentru preambalare.",
          "Ghidul general arată și 20 CNY, deci verifică contul. Depozitarea gratuită este 90 de zile; extinderea publicată este 1,50 USD per ID de produs pe lună în fereastra indicată, până la șase luni.",
        ], callout: { title: "Prețuri publicate", text: "0,15 USD/foto; 0,75 USD/colet; preambalare 3 USD, deși un ghid arată 20 CNY; extindere 1,50 USD per ID/lună." } },
        { heading: "De ce transportul internațional variază", paragraphs: [
          "Costul depinde de greutate, volum, metodă și destinație, iar restricțiile elimină rute. Nu există tarif universal pe kilogram.",
          "Unele linii taxează valoarea mai mare dintre greutatea reală și volumetrică. Formula: lungime × lățime × înălțime în cm ÷5000, ori 6000, 7000 sau 8000. O cutie 50×40×30 cm înseamnă 12 kg la 5000 chiar dacă are 7 kg.",
        ] },
        { heading: "Estimare, facturare finală și cupoane", paragraphs: [
          "Sistemul încasează întâi o estimare. După ambalare depozitul cântărește și măsoară; corecția transportatorului poate deveni finală. Poate exista diferență de plată sau rambursare în sold.",
          "Rehearsal packing reduce incertitudinea și pagina spune notificare în 24 de ore, dar nu face transportul gratuit. Cupoanele se aplică doar transportului internațional și nu se cumulează.",
        ] },
        { heading: "Costuri ușor de uitat", paragraphs: [
          "Returul se cere de regulă în cinci zile sau 120 de ore după QC și depinde de vânzător, stare și ambalaj. Politica menționează circa 0,75 USD transport și serviciu; alte costuri pot reveni cumpărătorului.",
          "Vama, întărirea, eliminarea ambalajului și asigurarea sunt separate. Verifică ruta și regulile locale; fiecare opțiune trebuie să rezolve un risc concret.",
        ] },
        { heading: "Checklist înainte de comandă", paragraphs: [
          "Notează varianta, cantitatea, prețul și transportul intern; decide ce trebuie să arate QC și bugetează fotografii suplimentare. Verifică rapid: cele 90 de zile nu prelungesc fereastra de retur.",
          "Folosește estimatorul ca interval, compară rute și dimensiuni, evaluează preambalarea și păstrează capturi datate cu listarea, QC, greutatea și oferta. Un tabel bun arată întregul traseu al costurilor.",
        ], callout: { title: "Formula bugetului", text: "Produs + transport intern + opțiuni alese + colet internațional + rezervă." } },
      ],
    },
  },
  sv: {
    ...en,
    navLabel: "Köpresearch",
    indexEyebrow: "OBEROENDE RESEARCH",
    indexTitle: "Joyagoo-köpresearch för verkliga köpfrågor",
    indexIntro: "Långa, faktakontrollerade guider om avgifter, QC, returer, lager och internationella paket.",
    latestLabel: "NY KOSTNADSGUIDE",
    readArticle: "Läs hela artikeln →",
    updatedLabel: "Uppdaterad 30 juli 2026",
    readTime: "9 minuters läsning",
    contentsLabel: "I den här artikeln",
    sourceTitle: "Så kontrollerades artikeln",
    sourceBody: "Kontrollerad 30 juli 2026 mot JoyaGoos hjälpsidor om avgifter, köpflöde, tilläggstjänster, provpackning, faktisk och volymvikt, slutlig debitering och returer. Den aktuella kontosidan är slutlig referens.",
    ctaEyebrow: "ANVÄND RESEARCHEN",
    ctaTitle: "Bläddra med hela kostnaden i åtanke",
    ctaBody: "Produktpriset är början: räkna med inrikes frakt, lagertillägg och internationellt paket.",
    ctaButton: "Utforska produkter",
    article: {
      eyebrow: "JOYAGOO AVGIFTSGUIDE",
      title: "Joyagoo-avgifter: produktbetalning, lagertillägg och internationell frakt",
      description: "Vad gratis köptjänst betyder, varför två betalningar brukar uppstå, vilka lagertjänster som kostar och varför priset kan ändras efter packning.",
      facts: [
        { value: "$0", label: "Publicerad grundavgift för köptjänsten" },
        { value: "$0.15", label: "Publicerat pris per extra detaljfoto" },
        { value: "90 dagar", label: "Publicerad gratis lagring per vara" },
      ],
      sections: [
        { heading: "Börja med två betalningssteg", paragraphs: [
          "Produktpriset är inte levererat totalpris. Första betalningen täcker varan och säljarens kinesiska inrikesfrakt; senare betalas det internationella paketet. Valda lagertjänster, retur och tull kan tillkomma.",
          "Joyagoo publicerar grundläggande köphjälp som gratis utan separat basprovision. Det betyder inte fri frakt. Dela budgeten i produkt, frakt till lager, valda tillägg, internationell transport och marginal.",
        ], callout: { title: "Kort sagt", text: "Gratis köphjälp är inte gratis leverans." } },
        { heading: "Vad den första betalningen täcker", paragraphs: [
          "Första transaktionen betalar variant, storlek, antal, produkt och inrikesfrakt till tredjepartssäljaren. Agenten köper och säljaren skickar till lagret; säljarens hastighet kan inte helt kontrolleras.",
          "Vid ankomst tas QC-bilder. Slutpaketet finns ännu inte: sammanslagning, emballage, rutt och mått återstår. Ett tidigt internationellt pris är därför en uppskattning.",
        ] },
        { heading: "Gratis tjänster och valbara tillägg", paragraphs: [
          "Grundköp, standard-QC och konsolidering beskrivs som gratis. Officiell tabell anger 0,15 USD per detaljfoto, 0,75 USD per paket för paketbilder och 3 USD per paket för provpackning.",
          "Allmänna guiden visar även 20 CNY för provpackning, så kontrollera kontot. Gratis lagring är 90 dagar; publicerad förlängning kostar 1,50 USD per produkt-ID och månad i angivet fönster, upp till sex månader.",
        ], callout: { title: "Publicerade priser", text: "0,15 USD/foto; 0,75 USD/paket; provpackning 3 USD men en guide visar 20 CNY; förlängning 1,50 USD per ID/månad." } },
        { heading: "Varför internationell frakt varierar", paragraphs: [
          "Kostnaden beror på vikt, volym, metod och destination, och begränsningar kan ta bort rutter. Det finns inget universellt kilopris.",
          "Vissa linjer debiterar den högre av faktisk och volymvikt. Formeln är längd × bredd × höjd i cm ÷5000, ibland 6000, 7000 eller 8000. En låda 50×40×30 cm blir 12 kg med 5000 även om vågen visar 7 kg.",
        ] },
        { heading: "Uppskattning, slutdebitering och kuponger", paragraphs: [
          "Systemet tar först en uppskattning. Efter packning väger och mäter lagret; transportörens korrigering kan bli slutlig. En extra betalning eller återbetalning till saldot kan följa.",
          "Rehearsal minskar osäkerheten och sidan anger besked inom 24 timmar, men gör inte frakten gratis. Kuponger gäller bara internationell frakt och kan inte kombineras.",
        ] },
        { heading: "Kostnader som lätt glöms", paragraphs: [
          "Retur begärs normalt inom fem dagar eller 120 timmar efter QC och beror på säljare, skick och emballage. Policyn nämner cirka 0,75 USD för transport och service; andra returkostnader kan ligga på köparen.",
          "Tull, förstärkning, borttagning av emballage och försäkring är separata. Kontrollera rutten och lokala regler; varje tillägg bör lösa en verklig risk.",
        ] },
        { heading: "Praktisk checklista före köp", paragraphs: [
          "Skriv ned variant, antal, pris och inrikesfrakt; bestäm vad QC måste visa och budgetera extrafoton. Kontrollera snabbt: 90 dagars lager förlänger inte femdagars retur.",
          "Använd kalkylatorn som intervall, jämför rutter och storlekar, bedöm provpackning och spara daterade skärmbilder av annons, QC, vikt och pris. Ett bra kalkylblad visar hela kostnadsvägen.",
        ], callout: { title: "Budgetformel", text: "Produkt + inrikesfrakt + valda tillägg + internationellt paket + marginal." } },
      ],
    },
  },
};

export const seoArticleCopy: Record<Locale, SeoArticleCopy> = {
  en,
  ...localized,
};
