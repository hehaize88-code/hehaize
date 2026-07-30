import type { Locale } from "./i18n";
import { longEnglishGuides } from "./longEnglishGuides";

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  callout?: { title: string; text: string };
};

export type GuideDetail = {
  facts: Array<{ value: string; label: string }>;
  sections: ContentSection[];
  sourceLabel: string;
};

type LocaleDetails = {
  catalogue: {
    names: string[];
    labels: string[];
    finds: string;
  };
  homeStats: Array<{ value: string; label: string }>;
  homeStatsNote: string;
  article: {
    home: string;
    guides: string;
    researched: string;
    updated: string;
    independent: string;
    keyFacts: string;
    inGuide: string;
    sourceCheck: string;
    sourceBody: string;
    ready: string;
    ctaTitle: string;
    ctaBody: string;
    explore: string;
  };
  guidesIndex: {
    intro: string;
    returnEyebrow: string;
    returnTitle: string;
    returnText: string;
  };
  guides: Record<string, GuideDetail>;
  policies: Record<string, ContentSection[]>;
};

const english: LocaleDetails = {
  catalogue: {
    names: [
      "Snow Ski Goggles",
      "Designer Hat",
      "Off-White Hoodies — 39 Styles",
      "Corteiz C Star Sweater — 15 Styles",
      "NUMERIS High-Top Shoes",
      "HOKA Speedgoat 5 Trail Shoes",
      "Samsung Galaxy Watch8",
    ],
    labels: [
      "Accessories",
      "Headwear",
      "Clothing",
      "Clothing",
      "Shoes",
      "Shoes",
      "Electronics",
    ],
    finds: "finds",
  },
  homeStats: [
    { value: "5 days", label: "Typical request window after QC completion" },
    { value: "90 days", label: "Free warehouse storage stated in the buying guide" },
    { value: "$0.15", label: "Published price per extra detailed photo" },
  ],
  homeStatsNote:
    "These figures summarize published platform information checked in July 2026. Seller conditions, product eligibility and current policies still apply.",
  article: {
    home: "Home",
    guides: "Guides",
    researched: "Researched editorial guide",
    updated: "Updated July 30, 2026",
    independent: "Independent of Joyagoo",
    keyFacts: "Key facts",
    inGuide: "In this guide",
    sourceCheck: "Source check",
    sourceBody:
      "This guide was reviewed against published platform information. Rules and prices can change, so verify the current account information before making a time-sensitive decision.",
    ready: "READY TO BROWSE?",
    ctaTitle: "Use the product spreadsheet",
    ctaBody:
      "Open the product catalogue, compare the live listing, and save the original product link before ordering.",
    explore: "Explore products ↗",
  },
  guidesIndex: {
    intro:
      "Start with the workflow, then go deeper on QC evidence, parcel planning and time-sensitive returns. Each guide separates published rules from practical editorial advice.",
    returnEyebrow: "RETURN WINDOW",
    returnTitle: "Joyagoo returns explained",
    returnText:
      "How the five-day QC window, seller eligibility and packaging condition work together.",
  },
  guides: {
    "how-to-buy": {
      facts: [
        { value: "2", label: "Main payment stages" },
        { value: "QC", label: "Review before parcel submission" },
        { value: "90 days", label: "Published free storage period" },
      ],
      sourceLabel: "Joyagoo Shopping Guidance",
      sections: [
        {
          heading: "Start with the original product listing",
          paragraphs: [
            "A spreadsheet is a discovery layer, not the seller’s live listing. Open the matching product page, confirm the item and keep the original marketplace link before ordering.",
            "Recheck colour, size, quantity, seller notes and domestic shipping because screenshots can become outdated faster than the linked listing.",
          ],
          callout: {
            title: "Before you pay",
            text: "Make sure the selected variant in the live listing matches the product you intended to buy.",
          },
        },
        {
          heading: "Understand the first payment",
          paragraphs: [
            "The first payment covers the product and Chinese domestic shipping shown for the order. The agent then purchases from the seller.",
            "Seller dispatch speed is separate from the agent’s purchasing work, so a purchased order may still wait while the seller prepares it.",
          ],
        },
        {
          heading: "Review the warehouse QC photos",
          paragraphs: [
            "After warehouse arrival, compare colour, shape, construction, logo placement, material, stitching and size evidence with the live listing.",
            "If an important detail is not visible, a precise paid detailed photo is safer than guessing.",
          ],
        },
        {
          heading: "Decide before the return window closes",
          paragraphs: [
            "The published return policy describes a five-day or 120-hour request window after QC completion, subject to seller and product eligibility.",
            "Customised, opened or incomplete items may be excluded, so a spreadsheet entry never guarantees a return.",
          ],
        },
        {
          heading: "Build and pay for the international parcel",
          paragraphs: [
            "Select stored items, add the destination, choose an available route and review optional services. International shipping is a separate payment.",
            "Ordinary submission begins with an estimate; rehearsal packing can establish the packed measurement before final parcel payment.",
          ],
        },
      ],
    },
    "qc-guide": {
      facts: [
        { value: "120 hours", label: "Published return-request window" },
        { value: "$0.15", label: "Published extra-photo price" },
        { value: "5 checks", label: "Repeatable review routine" },
      ],
      sourceLabel: "Joyagoo Shopping Guidance and Value Added Services",
      sections: [
        {
          heading: "Compare the overall product first",
          paragraphs: [
            "Begin with silhouette, colour and major proportions. Compare the warehouse photos with the exact variant shown in the order.",
            "Keep the original product listing open because a shortened spreadsheet title may omit important variant details.",
          ],
        },
        {
          heading: "Check construction and symmetry",
          paragraphs: [
            "Inspect pairs, seams, sole bonding, hems, zippers, prints, hardware and closures from every provided angle.",
            "A front photo can hide heel damage, label errors or a flawed closure, so use the full warehouse set.",
          ],
          callout: {
            title: "Do not rely on one angle",
            text: "Compare all available images before accepting the item.",
          },
        },
        {
          heading: "Confirm size evidence",
          paragraphs: [
            "A size tag confirms the label, not the real measurement. Request a ruler photo when fit depends on length or width.",
            "Give one precise instruction per photo, such as measuring the insole from heel to toe.",
          ],
        },
        {
          heading: "Record issues before contacting support",
          paragraphs: [
            "Identify the exact image and defect, then compare it with the seller image or specification.",
            "Separate visible defects from personal preference because seller responsibility can differ.",
          ],
        },
        {
          heading: "Act within the five-day window",
          paragraphs: [
            "Eligible requests should be submitted within five days after the status changes to QC completed.",
            "Review the order when the QC notice arrives; waiting until parcel submission can make the return unavailable.",
          ],
        },
      ],
    },
    "shipping-guide": {
      facts: [
        { value: "$3", label: "Published rehearsal-packing price" },
        { value: "$0.75", label: "Published parcel-photo price" },
        { value: "90 days", label: "Published free storage period" },
      ],
      sourceLabel: "Joyagoo Shopping Guidance and Value Added Services",
      sections: [
        {
          heading: "Separate product cost from parcel cost",
          paragraphs: [
            "The order payment covers the product and domestic shipping. International shipping is chosen and paid after warehouse storage.",
            "A low product price does not predict delivered cost because light but bulky goods may be charged by volume.",
          ],
        },
        {
          heading: "Understand estimated and final measurements",
          paragraphs: [
            "Ordinary parcel submission starts with an estimated charge, followed by packing and the actual measurement.",
            "Available lines depend on destination and product restrictions, so the routes can differ between parcels.",
          ],
        },
        {
          heading: "Use rehearsal packing when dimensions matter",
          paragraphs: [
            "Rehearsal packing establishes packed weight and dimensions before final shipment. The published table lists it at $3 per parcel.",
            "It can help with bulky shoes, boxes, coats or mixed parcels where packaging changes volumetric weight.",
          ],
          callout: {
            title: "When it can help",
            text: "Use rehearsal when removing or keeping packaging could materially change the billed volume.",
          },
        },
        {
          heading: "Choose optional services deliberately",
          paragraphs: [
            "Options may include package removal, reinforcement, insurance and parcel photos. Published parcel photography is $0.75 per parcel.",
            "Choose a service for a specific risk; reducing volume can also reduce protection.",
          ],
        },
        {
          heading: "Use storage time as a planning window",
          paragraphs: [
            "Published guidance states 90 days of free storage per product, which can help combine purchases.",
            "Do not confuse storage time with the much shorter return window after QC; check both live statuses.",
          ],
        },
      ],
    },
    returns: {
      facts: [
        { value: "5 days", label: "Request window after QC completion" },
        { value: "120 hours", label: "Same window stated in hours" },
        { value: "Seller rules", label: "Still determine eligibility" },
      ],
      sourceLabel: "Joyagoo Return Policy",
      sections: [
        {
          heading: "Start the clock at QC completion",
          paragraphs: [
            "The published policy says the request window begins when an order changes to QC completed and lasts five days or 120 hours.",
            "Warehouse storage is not the return clock, so review QC photos as soon as they appear.",
          ],
        },
        {
          heading: "Check whether the item is eligible",
          paragraphs: [
            "Customised goods, some opened products, underwear, food, second-hand items and products missing tags or packaging can be excluded.",
            "If the return control is no longer available in the order area, the eligible window may have passed.",
          ],
        },
        {
          heading: "Preserve packaging and resale condition",
          paragraphs: [
            "A return may require the item to remain new and resalable under seller standards.",
            "Do not discard tags, boxes or accessories until the QC review is complete and you decide to keep the item.",
          ],
          callout: {
            title: "Practical rule",
            text: "Keep all packaging until you are certain the product is acceptable.",
          },
        },
        {
          heading: "Know who pays the return cost",
          paragraphs: [
            "The published policy distinguishes verified quality problems from no-fault returns.",
            "Buyers generally cover shipping for no-fault returns; always confirm the current fee shown in the request flow.",
          ],
        },
        {
          heading: "Submit evidence that an agent can use",
          paragraphs: [
            "Name the exact problem, cite the relevant QC image and compare it with the selected seller variant.",
            "A concise request, preserved packaging and action within the window give the agent the clearest basis to communicate with the seller.",
          ],
        },
      ],
    },
  },
  policies: {
    about: [
      {
        heading: "What we publish",
        paragraphs: [
          "Product pages connect readers to matching listings, while editorial pages explain product search, QC review, storage, parcel submission and return timing.",
        ],
      },
      {
        heading: "What we do not do",
        paragraphs: [
          "We do not guarantee seller quality, authenticity, shipping, customs or return approval, and we do not process payments or orders.",
        ],
      },
      {
        heading: "Our relationship with Joyagoo",
        paragraphs: [
          "This is an independent information site and is not owned, operated or endorsed by Joyagoo.",
        ],
      },
    ],
    "editorial-policy": [
      {
        heading: "Source hierarchy",
        paragraphs: [
          "Time-sensitive platform facts are checked against published guidance; community experiences may inspire topics but are not presented as policy.",
        ],
      },
      {
        heading: "Dates and qualifications",
        paragraphs: [
          "Update dates and important conditions are included so a request window is never misrepresented as an unconditional guarantee.",
        ],
      },
      {
        heading: "Corrections",
        paragraphs: [
          "When published information changes, the relevant guide and its update date should be revised.",
        ],
      },
    ],
    privacy: [
      {
        heading: "Information handled by the site",
        paragraphs: [
          "The website has no accounts, checkout, comments or file uploads. Product searches are sent to the designated catalogue.",
        ],
      },
      {
        heading: "Technical information",
        paragraphs: [
          "The hosting service may process standard request data needed to deliver and protect the website.",
        ],
      },
      {
        heading: "External websites",
        paragraphs: [
          "The designated catalogue has its own privacy practices; this site does not receive passwords, payment data or order details entered there.",
        ],
      },
    ],
    terms: [
      {
        heading: "Informational purpose",
        paragraphs: [
          "Content supports product discovery and education and is not a purchase contract, guarantee or customs opinion.",
        ],
      },
      {
        heading: "External products and services",
        paragraphs: [
          "Availability, price, quality, payments, warehouse services and shipping are controlled by external services.",
        ],
      },
      {
        heading: "Names and content",
        paragraphs: [
          "Product and platform names are used descriptively; third-party trademarks remain the property of their owners.",
        ],
      },
    ],
  },
};

export const localizedContent: Record<Locale, LocaleDetails> = {
  en: {
    ...english,
    guides: longEnglishGuides,
  },
  zh: {
    catalogue: {
      names: ["滑雪护目镜", "设计师风格帽子", "Off-White 连帽衫 — 39款", "Corteiz C Star 毛衣 — 15款", "NUMERIS 高帮鞋", "HOKA Speedgoat 5 越野鞋", "Samsung Galaxy Watch8"],
      labels: ["配饰", "帽子", "服装", "服装", "鞋类", "鞋类", "电子产品"],
      finds: "次发现",
    },
    homeStats: [
      { value: "5天", label: "质检完成后的常见退货申请窗口" },
      { value: "90天", label: "购买指南公布的免费仓储期" },
      { value: "$0.15", label: "每张额外细节照片的公开价格" },
    ],
    homeStatsNote: "以上数据来自2026年7月核对的平台公开信息；卖家条件、商品资格和最新政策仍然适用。",
    article: {
      home: "首页", guides: "指南", researched: "已调研编辑指南", updated: "更新于2026年7月29日", independent: "独立于 Joyagoo", keyFacts: "关键数据", inGuide: "本指南目录", sourceCheck: "来源核对",
      sourceBody: "本指南依据平台公开信息核对。规则和价格可能变化，涉及期限或付款时请以账户中的最新信息为准。",
      ready: "准备浏览？", ctaTitle: "使用商品选品表", ctaBody: "打开商品目录，对照实时商品页，并在下单前保存原始商品链接。", explore: "浏览商品 ↗",
    },
    guidesIndex: {
      intro: "先了解完整流程，再深入查看质检证据、包裹规划和有时限的退货规则。每篇指南都把公开政策与实用建议分开说明。",
      returnEyebrow: "退货窗口", returnTitle: "Joyagoo 退货规则详解", returnText: "五天质检窗口、卖家资格与包装状态如何共同影响退货。",
    },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2次", label: "主要付款阶段" }, { value: "QC", label: "提交包裹前检查" }, { value: "90天", label: "公开免费仓储期" }],
        sourceLabel: "Joyagoo 购买指南",
        sections: [
          { heading: "从原始商品页开始", paragraphs: ["选品表只负责发现商品，不是卖家的实时页面。打开对应商品详情，确认款式并保留原始平台链接。", "下单前重新核对颜色、尺码、数量、卖家说明和中国境内运费，避免旧截图带来误差。"], callout: { title: "付款前", text: "确认实时商品页中选择的规格与计划购买的商品一致。" } },
          { heading: "理解第一次付款", paragraphs: ["第一次付款通常覆盖商品与中国境内运费，随后由代购向卖家采购。", "卖家发货速度与代购采购流程不同，已采购状态也可能仍在等待卖家备货。"] },
          { heading: "检查仓库质检照片", paragraphs: ["商品到仓后，把颜色、外形、做工、标识、材质、走线和尺码证据与实时商品页逐项对比。", "关键细节看不清时，提交明确的付费细节照片要求比猜测更可靠。"] },
          { heading: "在退货窗口关闭前决定", paragraphs: ["公开政策说明，质检完成后通常有5天或120小时申请窗口，仍受卖家和商品资格限制。", "定制、拆封或包装不完整的商品可能被排除，选品表收录不等于保证可退。"] },
          { heading: "组合并支付国际包裹", paragraphs: ["选择已入库商品、填写目的地、选择可用线路并检查增值服务；国际运费是另一笔付款。", "普通提交先按预估收费，预包装可在最终支付前确认打包后的重量和尺寸。"] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120小时", label: "公开退货申请窗口" }, { value: "$0.15", label: "公开补拍价格" }, { value: "5项", label: "可重复质检流程" }],
        sourceLabel: "Joyagoo 购买指南与增值服务",
        sections: [
          { heading: "先比较商品整体", paragraphs: ["先看轮廓、颜色和主要比例，并与订单中的准确规格对照。", "检查时保持原商品页打开，因为缩短的选品表标题可能省略重要规格。"] },
          { heading: "检查做工与对称性", paragraphs: ["从所有角度检查成对商品、缝线、粘合、下摆、拉链、印花、五金和开合。", "正面照片可能遮住后跟损伤、标签错误或开合问题。"], callout: { title: "不要只看一个角度", text: "接受商品前请把全部仓库照片一起比较。" } },
          { heading: "确认尺码证据", paragraphs: ["尺码标签只说明标注尺码，不代表真实测量；涉及合身时应要求带尺子的照片。", "每张补拍只写一个明确指令，例如测量鞋垫从后跟到脚尖的长度。"] },
          { heading: "联系支持前记录问题", paragraphs: ["标出具体照片和可见缺陷，再与卖家图片或规格对比。", "把客观缺陷和个人偏好分开，因为卖家责任可能不同。"] },
          { heading: "在五天窗口内处理", paragraphs: ["符合条件的申请应在订单变为质检完成后的5天内提交。", "收到质检通知就检查；等到准备合包时再看，可能已经失去退货机会。"] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "公开预包装价格" }, { value: "$0.75", label: "公开包裹拍照价格" }, { value: "90天", label: "公开免费仓储期" }],
        sourceLabel: "Joyagoo 购买指南与增值服务",
        sections: [
          { heading: "区分商品费用与包裹费用", paragraphs: ["下单付款覆盖商品与中国境内运费；商品入库后再选择并支付国际运输。", "商品便宜不代表到手成本低，轻但体积大的商品可能按体积计费。"] },
          { heading: "理解预估与最终尺寸", paragraphs: ["普通包裹先产生预估费用，仓库打包后再按实际重量和尺寸核算。", "可用线路取决于目的地和商品限制，因此不同包裹的线路可能不同。"] },
          { heading: "尺寸重要时使用预包装", paragraphs: ["预包装会在正式发货前确认打包重量和尺寸，公开价格为每个包裹3美元。", "鞋盒、厚外套或混装包裹如果会明显影响体积重，使用预包装更有价值。"], callout: { title: "适用情况", text: "保留或移除包装会明显改变计费体积时，可以考虑预包装。" } },
          { heading: "有目的地选择增值服务", paragraphs: ["可选服务可能包括拆包装、加固、保险和包裹照片；公开包裹拍照价格为0.75美元。", "每项服务都应解决明确风险，减少体积也可能降低保护。"] },
          { heading: "把仓储期当作规划窗口", paragraphs: ["公开指南说明每件商品有90天免费仓储，可用于等待并合并购买。", "仓储期和质检后的短退货窗口不同，必须分别查看实时状态。"] },
        ],
      },
      returns: {
        facts: [{ value: "5天", label: "质检完成后的申请窗口" }, { value: "120小时", label: "同一窗口的小时表述" }, { value: "卖家规则", label: "仍决定退货资格" }],
        sourceLabel: "Joyagoo 退货政策",
        sections: [
          { heading: "从质检完成开始计时", paragraphs: ["公开政策说明，订单变为质检完成时开始计时，申请窗口为5天或120小时。", "仓储期不是退货时钟，质检照片出现后应尽快查看。"] },
          { heading: "确认商品是否符合资格", paragraphs: ["定制、部分拆封商品、内衣、食品、二手商品以及缺少标签或包装的商品可能被排除。", "订单页不再显示退货入口时，符合资格的窗口可能已经结束。"] },
          { heading: "保留包装和可转售状态", paragraphs: ["卖家可能要求商品保持全新并可再次销售。", "质检完成并决定保留前，不要丢弃标签、盒子或配件。"], callout: { title: "实用规则", text: "确认商品没有问题之前，保留全部包装。" } },
          { heading: "了解由谁承担退货费用", paragraphs: ["公开政策区分质量问题与无理由退货。", "无质量问题时通常由买家承担运费，具体费用以实时申请流程为准。"] },
          { heading: "提交代购可使用的证据", paragraphs: ["明确问题、引用对应质检照片，并与卖家所选规格对比。", "简洁说明、完整包装和及时申请，更有利于代购与卖家沟通。"] },
        ],
      },
    },
    policies: {
      about: [
        { heading: "我们发布什么", paragraphs: ["商品页连接对应商品，编辑页解释选品、质检、仓储、包裹提交和退货时限。"] },
        { heading: "我们不做什么", paragraphs: ["本站不保证卖家质量、真伪、运输、清关或退货结果，也不处理付款和订单。"] },
        { heading: "与 Joyagoo 的关系", paragraphs: ["本站为独立信息网站，不由 Joyagoo 所有、运营或背书。"] },
      ],
      "editorial-policy": [
        { heading: "来源层级", paragraphs: ["时效性平台信息以公开指南为准；社区经验可提供选题，但不会写成平台政策。"] },
        { heading: "日期与限制条件", paragraphs: ["页面标注更新时间和关键条件，避免把申请窗口描述成无条件保证。"] },
        { heading: "更正", paragraphs: ["公开信息变化后，应同步修订相关指南和更新时间。"] },
      ],
      privacy: [
        { heading: "本站处理的信息", paragraphs: ["本站没有账户、结账、评论或文件上传；商品搜索会提交到指定目录。"] },
        { heading: "技术信息", paragraphs: ["托管服务可能处理提供和保护网站所需的标准请求信息。"] },
        { heading: "外部网站", paragraphs: ["指定商品目录有自己的隐私规则，本站不会收到在该处输入的密码、支付或订单信息。"] },
      ],
      terms: [
        { heading: "信息用途", paragraphs: ["内容仅用于商品发现和教育，不构成购买合同、保证或清关意见。"] },
        { heading: "外部商品与服务", paragraphs: ["库存、价格、质量、付款、仓库服务和运输由外部服务控制。"] },
        { heading: "名称与内容", paragraphs: ["商品和平台名称仅作描述性使用，第三方商标仍归各自权利人所有。"] },
      ],
    },
  },
  de: {
    catalogue: {
      names: ["Skibrille", "Designer-Cap", "Off-White Hoodies — 39 Modelle", "Corteiz C Star Pullover — 15 Modelle", "NUMERIS High-Top-Schuhe", "HOKA Speedgoat 5 Trailschuhe", "Samsung Galaxy Watch8"],
      labels: ["Accessoires", "Kopfbedeckung", "Kleidung", "Kleidung", "Schuhe", "Schuhe", "Elektronik"],
      finds: "Funde",
    },
    homeStats: [{ value: "5 Tage", label: "Typisches Antragsfenster nach Abschluss der QC" }, { value: "90 Tage", label: "Veröffentlichte kostenlose Lagerzeit" }, { value: "$0.15", label: "Veröffentlichter Preis je zusätzlichem Detailfoto" }],
    homeStatsNote: "Die Angaben fassen im Juli 2026 geprüfte Plattforminformationen zusammen. Verkäuferbedingungen, Produkteignung und aktuelle Regeln gelten weiterhin.",
    article: { home: "Startseite", guides: "Ratgeber", researched: "Recherchierter Ratgeber", updated: "Aktualisiert am 29. Juli 2026", independent: "Unabhängig von Joyagoo", keyFacts: "Wichtige Fakten", inGuide: "In diesem Ratgeber", sourceCheck: "Quellenprüfung", sourceBody: "Dieser Ratgeber wurde mit veröffentlichten Plattforminformationen abgeglichen. Regeln und Preise können sich ändern; prüfe zeitkritische Angaben im Konto.", ready: "BEREIT ZUM STÖBERN?", ctaTitle: "Produktauswahl öffnen", ctaBody: "Öffne den Katalog, vergleiche das Live-Angebot und speichere vor der Bestellung den Originallink.", explore: "Produkte ansehen ↗" },
    guidesIndex: { intro: "Beginne mit dem Ablauf und vertiefe dann QC-Nachweise, Paketplanung und fristgebundene Rückgaben. Veröffentlichte Regeln und Praxistipps bleiben klar getrennt.", returnEyebrow: "RÜCKGABEFENSTER", returnTitle: "Joyagoo-Rückgaben erklärt", returnText: "Wie Fünf-Tage-Fenster, Verkäuferberechtigung und Verpackungszustand zusammenwirken." },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2", label: "Wesentliche Zahlungsphasen" }, { value: "QC", label: "Prüfung vor Paketabgabe" }, { value: "90 Tage", label: "Veröffentlichte Gratislagerung" }],
        sourceLabel: "Joyagoo Einkaufsleitfaden",
        sections: [
          { heading: "Mit dem Originalangebot beginnen", paragraphs: ["Eine Tabelle dient der Entdeckung, nicht als Live-Angebot. Öffne die passende Produktseite, bestätige die Variante und speichere den Originallink.", "Prüfe Farbe, Größe, Menge, Verkäuferhinweise und Inlandsversand erneut."], callout: { title: "Vor der Zahlung", text: "Die gewählte Live-Variante muss dem gewünschten Produkt entsprechen." } },
          { heading: "Die erste Zahlung verstehen", paragraphs: ["Die erste Zahlung deckt Produkt und chinesischen Inlandsversand; danach kauft der Agent beim Verkäufer.", "Verkäuferversand und Agentenbearbeitung sind getrennte Schritte."] },
          { heading: "QC-Fotos im Lager prüfen", paragraphs: ["Vergleiche Farbe, Form, Verarbeitung, Logos, Material, Nähte und Größenbelege mit dem Live-Angebot.", "Fordere bei fehlenden Details ein präzises Zusatzfoto an, statt zu raten."] },
          { heading: "Vor Ende des Rückgabefensters entscheiden", paragraphs: ["Die veröffentlichte Regel nennt fünf Tage beziehungsweise 120 Stunden nach QC, abhängig von Verkäufer und Produkt.", "Personalisierte, geöffnete oder unvollständige Artikel können ausgeschlossen sein."] },
          { heading: "Internationales Paket erstellen und bezahlen", paragraphs: ["Wähle gelagerte Artikel, Ziel, verfügbare Route und Zusatzdienste; der internationale Versand wird separat bezahlt.", "Normale Abgabe beginnt mit einer Schätzung, Probepacken liefert vorher die Packmaße."] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120 Std.", label: "Veröffentlichtes Rückgabefenster" }, { value: "$0.15", label: "Preis für Zusatzfoto" }, { value: "5 Schritte", label: "Wiederholbare Prüfroutine" }],
        sourceLabel: "Joyagoo Einkaufsleitfaden und Zusatzleistungen",
        sections: [
          { heading: "Zuerst das Gesamtprodukt vergleichen", paragraphs: ["Vergleiche Silhouette, Farbe und Proportionen mit der bestellten Variante.", "Halte das Originalangebot offen, weil kurze Tabellentitel Details auslassen können."] },
          { heading: "Verarbeitung und Symmetrie prüfen", paragraphs: ["Kontrolliere Paare, Nähte, Verklebung, Säume, Reißverschlüsse, Drucke, Beschläge und Verschlüsse aus allen Winkeln.", "Eine Frontaufnahme kann Schäden oder Etikettenfehler verbergen."], callout: { title: "Nicht nur einen Winkel nutzen", text: "Vergleiche alle Lagerbilder vor der Annahme." } },
          { heading: "Größenbelege bestätigen", paragraphs: ["Ein Größenetikett ist keine reale Messung. Fordere bei Passformfragen ein Foto mit Maßband an.", "Gib pro Bild eine eindeutige Messanweisung."] },
          { heading: "Probleme vor dem Supportkontakt festhalten", paragraphs: ["Benenne Bild und sichtbaren Fehler und vergleiche ihn mit Verkäuferfoto oder Spezifikation.", "Trenne objektive Mängel von persönlicher Präferenz."] },
          { heading: "Innerhalb von fünf Tagen handeln", paragraphs: ["Berechtigte Anträge müssen innerhalb von fünf Tagen nach QC-Abschluss gestellt werden.", "Prüfe die Bilder sofort nach der Mitteilung, nicht erst beim Paketbau."] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "Veröffentlichter Preis fürs Probepacken" }, { value: "$0.75", label: "Veröffentlichter Preis für Paketfotos" }, { value: "90 Tage", label: "Veröffentlichte Gratislagerung" }],
        sourceLabel: "Joyagoo Einkaufsleitfaden und Zusatzleistungen",
        sections: [
          { heading: "Produkt- und Paketkosten trennen", paragraphs: ["Die Bestellung deckt Produkt und Inlandsversand; internationaler Versand folgt nach Einlagerung.", "Leichte, sperrige Ware kann nach Volumen teuer werden."] },
          { heading: "Geschätzte und endgültige Maße verstehen", paragraphs: ["Normale Paketabgabe startet mit einer Schätzung; nach dem Packen zählt das tatsächliche Maß.", "Routen hängen von Ziel und Produktbeschränkungen ab."] },
          { heading: "Probepacken bei wichtigen Maßen nutzen", paragraphs: ["Probepacken ermittelt Packgewicht und -maße vor dem Versand; veröffentlicht sind $3 pro Paket.", "Es hilft bei Schuhkartons, Mänteln oder gemischten Paketen mit Volumengewicht."], callout: { title: "Wann es hilft", text: "Nutze es, wenn Verpackung das berechnete Volumen deutlich verändert." } },
          { heading: "Zusatzdienste gezielt wählen", paragraphs: ["Möglich sind Verpackungsentfernung, Verstärkung, Versicherung und Paketfotos; veröffentlicht sind $0.75.", "Jeder Dienst sollte ein konkretes Risiko lösen."] },
          { heading: "Lagerzeit als Planungsfenster nutzen", paragraphs: ["Veröffentlicht sind 90 Tage kostenlose Lagerung je Produkt.", "Verwechsle Lagerzeit nicht mit dem kürzeren Rückgabefenster nach QC."] },
        ],
      },
      returns: {
        facts: [{ value: "5 Tage", label: "Antragsfenster nach QC" }, { value: "120 Std.", label: "Dasselbe Fenster in Stunden" }, { value: "Verkäuferregeln", label: "Bestimmen weiter die Eignung" }],
        sourceLabel: "Joyagoo Rückgaberichtlinie",
        sections: [
          { heading: "Die Uhr startet bei QC-Abschluss", paragraphs: ["Das veröffentlichte Fenster beginnt mit dem Status QC abgeschlossen und dauert fünf Tage oder 120 Stunden.", "Lagerzeit ist nicht die Rückgabefrist."] },
          { heading: "Eignung des Artikels prüfen", paragraphs: ["Personalisierte, geöffnete, gebrauchte oder unvollständig verpackte Produkte können ausgeschlossen sein.", "Fehlt die Rückgabeoption im Auftrag, kann die Frist abgelaufen sein."] },
          { heading: "Verpackung und Wiederverkaufszustand erhalten", paragraphs: ["Verkäufer können einen neuen, wiederverkaufsfähigen Zustand verlangen.", "Entferne Etiketten, Kartons oder Zubehör erst nach der QC-Entscheidung."], callout: { title: "Praxisregel", text: "Bewahre alle Verpackungen bis zur endgültigen Annahme auf." } },
          { heading: "Rückgabekosten verstehen", paragraphs: ["Die Regel unterscheidet Qualitätsfehler von Rückgaben ohne Mangel.", "Ohne Qualitätsproblem trägt meist der Käufer den Versand; prüfe den aktuellen Betrag im Antrag."] },
          { heading: "Verwertbare Nachweise einreichen", paragraphs: ["Benenne den genauen Fehler, das QC-Bild und die gewählte Verkäufervariante.", "Klare Angaben, erhaltene Verpackung und rechtzeitiges Handeln erleichtern die Kommunikation."] },
        ],
      },
    },
    policies: {
      about: [{ heading: "Was wir veröffentlichen", paragraphs: ["Produktseiten führen zu passenden Angeboten; redaktionelle Seiten erklären Suche, QC, Lagerung, Paketabgabe und Fristen."] }, { heading: "Was wir nicht tun", paragraphs: ["Wir garantieren weder Qualität, Echtheit, Versand, Zoll noch Rückgabe und bearbeiten keine Zahlungen oder Aufträge."] }, { heading: "Beziehung zu Joyagoo", paragraphs: ["Diese unabhängige Informationsseite gehört nicht Joyagoo und wird nicht von Joyagoo betrieben oder empfohlen."] }],
      "editorial-policy": [{ heading: "Quellenhierarchie", paragraphs: ["Zeitkritische Fakten werden mit veröffentlichten Hinweisen geprüft; Community-Berichte gelten nicht als Plattformregeln."] }, { heading: "Daten und Bedingungen", paragraphs: ["Aktualisierungsdaten und wichtige Einschränkungen verhindern falsche Garantien."] }, { heading: "Korrekturen", paragraphs: ["Ändert sich eine veröffentlichte Regel, werden Leitfaden und Datum angepasst."] }],
      privacy: [{ heading: "Verarbeitete Informationen", paragraphs: ["Keine Konten, Kasse, Kommentare oder Uploads; Suchanfragen gehen an den vorgesehenen Katalog."] }, { heading: "Technische Informationen", paragraphs: ["Der Hostingdienst kann übliche Anfragedaten für Auslieferung und Schutz verarbeiten."] }, { heading: "Externe Websites", paragraphs: ["Der Katalog hat eigene Datenschutzregeln; diese Seite erhält dort eingegebene Passwörter, Zahlungs- oder Bestelldaten nicht."] }],
      terms: [{ heading: "Informationszweck", paragraphs: ["Inhalte dienen Produktsuche und Bildung und sind kein Vertrag, keine Garantie und keine Zollberatung."] }, { heading: "Externe Produkte und Dienste", paragraphs: ["Bestand, Preis, Qualität, Zahlung, Lager und Versand werden extern kontrolliert."] }, { heading: "Namen und Inhalte", paragraphs: ["Produkt- und Plattformnamen werden beschreibend genutzt; Marken bleiben Eigentum ihrer Inhaber."] }],
    },
  },
  pl: {
    catalogue: {
      names: ["Gogle narciarskie", "Czapka designerska", "Bluzy Off-White — 39 wariantów", "Sweter Corteiz C Star — 15 wariantów", "Buty wysokie NUMERIS", "Buty trailowe HOKA Speedgoat 5", "Samsung Galaxy Watch8"],
      labels: ["Akcesoria", "Nakrycia głowy", "Odzież", "Odzież", "Buty", "Buty", "Elektronika"],
      finds: "znalezisk",
    },
    homeStats: [{ value: "5 dni", label: "Typowe okno zgłoszenia po zakończeniu QC" }, { value: "90 dni", label: "Opublikowany bezpłatny okres magazynowania" }, { value: "$0.15", label: "Opublikowana cena dodatkowego zdjęcia" }],
    homeStatsNote: "Dane podsumowują informacje platformy sprawdzone w lipcu 2026. Nadal obowiązują warunki sprzedawcy, kwalifikacja produktu i aktualne zasady.",
    article: { home: "Strona główna", guides: "Poradniki", researched: "Opracowany poradnik", updated: "Aktualizacja 29 lipca 2026", independent: "Niezależnie od Joyagoo", keyFacts: "Najważniejsze fakty", inGuide: "W tym poradniku", sourceCheck: "Weryfikacja źródeł", sourceBody: "Poradnik sprawdzono z opublikowanymi informacjami platformy. Zasady i ceny mogą się zmieniać, dlatego decyzje czasowe potwierdź na koncie.", ready: "GOTOWY DO PRZEGLĄDANIA?", ctaTitle: "Użyj arkusza produktów", ctaBody: "Otwórz katalog, porównaj aktualną ofertę i zapisz oryginalny link przed zamówieniem.", explore: "Zobacz produkty ↗" },
    guidesIndex: { intro: "Zacznij od procesu, następnie sprawdź dowody QC, planowanie paczki i terminy zwrotów. Zasady platformy są oddzielone od praktycznych porad.", returnEyebrow: "OKNO ZWROTU", returnTitle: "Zwroty Joyagoo wyjaśnione", returnText: "Jak pięć dni, zasady sprzedawcy i stan opakowania wpływają na zwrot." },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2", label: "Główne etapy płatności" }, { value: "QC", label: "Kontrola przed paczką" }, { value: "90 dni", label: "Opublikowane darmowe przechowywanie" }],
        sourceLabel: "Poradnik zakupowy Joyagoo",
        sections: [
          { heading: "Zacznij od oryginalnej oferty", paragraphs: ["Arkusz pomaga odkrywać produkty, lecz nie zastępuje aktualnej oferty. Otwórz właściwą stronę, potwierdź wariant i zapisz link.", "Ponownie sprawdź kolor, rozmiar, ilość, uwagi sprzedawcy i wysyłkę krajową."], callout: { title: "Przed płatnością", text: "Wybrany wariant musi odpowiadać produktowi, który chcesz kupić." } },
          { heading: "Zrozum pierwszą płatność", paragraphs: ["Pierwsza płatność obejmuje produkt i wysyłkę w Chinach, a agent kupuje od sprzedawcy.", "Czas wysyłki sprzedawcy jest oddzielny od pracy agenta."] },
          { heading: "Sprawdź zdjęcia QC w magazynie", paragraphs: ["Porównaj kolor, kształt, wykonanie, logo, materiał, szwy i rozmiar z aktualną ofertą.", "Jeśli brakuje szczegółu, poproś o precyzyjne dodatkowe zdjęcie."] },
          { heading: "Zdecyduj przed końcem okna zwrotu", paragraphs: ["Opublikowane okno wynosi pięć dni lub 120 godzin po QC, z uwzględnieniem zasad sprzedawcy i produktu.", "Produkty personalizowane, otwarte lub niekompletne mogą być wykluczone."] },
          { heading: "Zbuduj i opłać paczkę międzynarodową", paragraphs: ["Wybierz produkty, cel, dostępną linię i usługi; wysyłka międzynarodowa jest osobną płatnością.", "Zwykłe zgłoszenie zaczyna się od szacunku, a próbne pakowanie ustala wymiary wcześniej."] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120 godz.", label: "Opublikowane okno zwrotu" }, { value: "$0.15", label: "Cena dodatkowego zdjęcia" }, { value: "5 kroków", label: "Powtarzalna kontrola" }],
        sourceLabel: "Poradnik zakupowy i usługi dodatkowe Joyagoo",
        sections: [
          { heading: "Najpierw porównaj cały produkt", paragraphs: ["Porównaj sylwetkę, kolor i proporcje z zamówionym wariantem.", "Trzymaj otwartą oryginalną ofertę, ponieważ skrócony tytuł arkusza może pomijać szczegóły."] },
          { heading: "Sprawdź wykonanie i symetrię", paragraphs: ["Obejrzyj pary, szwy, klejenie, zamki, nadruki, okucia i zapięcia ze wszystkich stron.", "Widok z przodu może ukrywać uszkodzenia lub błędną metkę."], callout: { title: "Nie polegaj na jednym ujęciu", text: "Porównaj wszystkie zdjęcia magazynowe przed akceptacją." } },
          { heading: "Potwierdź rozmiar", paragraphs: ["Metka nie jest rzeczywistym pomiarem; przy dopasowaniu poproś o zdjęcie z miarką.", "Jedno zdjęcie powinno mieć jedną dokładną instrukcję."] },
          { heading: "Zapisz problem przed kontaktem", paragraphs: ["Wskaż zdjęcie i widoczną wadę, a następnie porównaj ze specyfikacją sprzedawcy.", "Oddziel wadę obiektywną od osobistej preferencji."] },
          { heading: "Działaj w ciągu pięciu dni", paragraphs: ["Kwalifikujące się zgłoszenie należy złożyć w ciągu pięciu dni od zakończenia QC.", "Sprawdź zdjęcia od razu po powiadomieniu."] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "Cena próbnego pakowania" }, { value: "$0.75", label: "Cena zdjęć paczki" }, { value: "90 dni", label: "Darmowe magazynowanie" }],
        sourceLabel: "Poradnik zakupowy i usługi dodatkowe Joyagoo",
        sections: [
          { heading: "Oddziel koszt produktu od kosztu paczki", paragraphs: ["Zamówienie obejmuje produkt i wysyłkę krajową; wysyłkę międzynarodową opłaca się po magazynowaniu.", "Lekki, ale duży produkt może być drogi przez wagę objętościową."] },
          { heading: "Zrozum szacunki i końcowe wymiary", paragraphs: ["Zwykła paczka zaczyna się od wyceny, a po spakowaniu liczą się rzeczywiste wymiary.", "Dostępne linie zależą od celu i ograniczeń produktu."] },
          { heading: "Użyj próbnego pakowania, gdy liczy się rozmiar", paragraphs: ["Usługa ustala wagę i wymiary przed wysyłką; opublikowana cena to $3 za paczkę.", "Pomaga przy pudełkach po butach, kurtkach i paczkach mieszanych."], callout: { title: "Kiedy pomaga", text: "Wybierz ją, jeśli opakowanie istotnie zmienia naliczaną objętość." } },
          { heading: "Wybieraj usługi celowo", paragraphs: ["Dostępne mogą być usunięcie opakowań, wzmocnienie, ubezpieczenie i zdjęcia paczki za $0.75.", "Każda usługa powinna rozwiązywać konkretny problem."] },
          { heading: "Traktuj magazynowanie jako czas planowania", paragraphs: ["Opublikowano 90 dni darmowego przechowywania produktu.", "Nie myl tego z krótszym oknem zwrotu po QC."] },
        ],
      },
      returns: {
        facts: [{ value: "5 dni", label: "Okno zgłoszenia po QC" }, { value: "120 godz.", label: "To samo okno w godzinach" }, { value: "Zasady sprzedawcy", label: "Nadal określają kwalifikację" }],
        sourceLabel: "Zasady zwrotów Joyagoo",
        sections: [
          { heading: "Czas biegnie od zakończenia QC", paragraphs: ["Opublikowane okno zaczyna się przy statusie QC zakończone i trwa pięć dni lub 120 godzin.", "Magazynowanie nie jest zegarem zwrotu."] },
          { heading: "Sprawdź kwalifikację produktu", paragraphs: ["Produkty personalizowane, otwarte, używane lub bez pełnego opakowania mogą być wykluczone.", "Brak przycisku zwrotu może oznaczać koniec terminu."] },
          { heading: "Zachowaj opakowanie i stan sprzedażowy", paragraphs: ["Sprzedawca może wymagać nowego, odsprzedawalnego stanu.", "Nie wyrzucaj metek, pudełek ani akcesoriów przed decyzją po QC."], callout: { title: "Praktyczna zasada", text: "Zachowaj całe opakowanie do ostatecznej akceptacji." } },
          { heading: "Poznaj koszt zwrotu", paragraphs: ["Zasady rozróżniają wadę jakościową od zwrotu bez wady.", "Bez wady wysyłkę zwykle pokrywa kupujący; sprawdź aktualną kwotę."] },
          { heading: "Prześlij użyteczne dowody", paragraphs: ["Nazwij wadę, wskaż zdjęcie QC i porównaj z wybranym wariantem.", "Jasny opis, opakowanie i terminowe działanie ułatwiają kontakt ze sprzedawcą."] },
        ],
      },
    },
    policies: {
      about: [{ heading: "Co publikujemy", paragraphs: ["Strony produktów prowadzą do właściwych ofert, a artykuły wyjaśniają wyszukiwanie, QC, magazyn, paczkę i terminy."] }, { heading: "Czego nie robimy", paragraphs: ["Nie gwarantujemy jakości, autentyczności, wysyłki, odprawy ani zwrotu i nie obsługujemy płatności."] }, { heading: "Relacja z Joyagoo", paragraphs: ["To niezależny serwis informacyjny, niebędący własnością ani częścią Joyagoo."] }],
      "editorial-policy": [{ heading: "Hierarchia źródeł", paragraphs: ["Dane czasowe sprawdzamy w opublikowanych poradnikach; opinie społeczności nie są polityką platformy."] }, { heading: "Daty i warunki", paragraphs: ["Daty aktualizacji i ograniczenia zapobiegają przedstawianiu okna jako gwarancji."] }, { heading: "Korekty", paragraphs: ["Po zmianie opublikowanej informacji aktualizujemy poradnik i datę."] }],
      privacy: [{ heading: "Dane obsługiwane przez stronę", paragraphs: ["Brak kont, kasy, komentarzy i plików; wyszukiwanie trafia do wskazanego katalogu."] }, { heading: "Dane techniczne", paragraphs: ["Hosting może przetwarzać standardowe dane żądania do dostarczania i ochrony strony."] }, { heading: "Strony zewnętrzne", paragraphs: ["Katalog ma własne zasady prywatności; ta strona nie otrzymuje wpisanych tam haseł ani danych płatności."] }],
      terms: [{ heading: "Cel informacyjny", paragraphs: ["Treść służy odkrywaniu i edukacji, nie jest umową, gwarancją ani opinią celną."] }, { heading: "Produkty i usługi zewnętrzne", paragraphs: ["Dostępność, cena, jakość, płatności, magazyn i wysyłka są kontrolowane zewnętrznie."] }, { heading: "Nazwy i treść", paragraphs: ["Nazwy są używane opisowo, a znaki towarowe należą do ich właścicieli."] }],
    },
  },
  es: {
    catalogue: {
      names: ["Gafas de esquí", "Gorra de diseño", "Sudaderas Off-White — 39 estilos", "Jersey Corteiz C Star — 15 estilos", "Zapatillas altas NUMERIS", "Zapatillas HOKA Speedgoat 5", "Samsung Galaxy Watch8"],
      labels: ["Accesorios", "Gorras", "Ropa", "Ropa", "Calzado", "Calzado", "Electrónica"],
      finds: "hallazgos",
    },
    homeStats: [{ value: "5 días", label: "Plazo típico de solicitud tras completar QC" }, { value: "90 días", label: "Almacenamiento gratuito publicado" }, { value: "$0.15", label: "Precio publicado por foto detallada adicional" }],
    homeStatsNote: "Estas cifras resumen información pública revisada en julio de 2026. Siguen aplicándose las condiciones del vendedor, la elegibilidad y las políticas actuales.",
    article: { home: "Inicio", guides: "Guías", researched: "Guía editorial investigada", updated: "Actualizado el 29 de julio de 2026", independent: "Independiente de Joyagoo", keyFacts: "Datos clave", inGuide: "En esta guía", sourceCheck: "Comprobación de fuentes", sourceBody: "La guía se contrastó con información pública de la plataforma. Las reglas y precios pueden cambiar; verifica los datos actuales antes de actuar.", ready: "¿LISTO PARA EXPLORAR?", ctaTitle: "Usa la hoja de productos", ctaBody: "Abre el catálogo, compara la ficha en vivo y guarda el enlace original antes de comprar.", explore: "Ver productos ↗" },
    guidesIndex: { intro: "Empieza por el proceso y profundiza en pruebas QC, planificación del paquete y devoluciones con plazo. Las normas publicadas se separan de los consejos prácticos.", returnEyebrow: "PLAZO DE DEVOLUCIÓN", returnTitle: "Devoluciones Joyagoo explicadas", returnText: "Cómo se combinan los cinco días, la elegibilidad del vendedor y el embalaje." },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2", label: "Etapas principales de pago" }, { value: "QC", label: "Revisión antes del paquete" }, { value: "90 días", label: "Almacenamiento gratuito publicado" }],
        sourceLabel: "Guía de compra de Joyagoo",
        sections: [
          { heading: "Empieza por el anuncio original", paragraphs: ["La hoja ayuda a descubrir, pero no sustituye al anuncio en vivo. Abre la página correcta, confirma la variante y guarda el enlace original.", "Revisa color, talla, cantidad, notas del vendedor y envío nacional."], callout: { title: "Antes de pagar", text: "La variante seleccionada debe coincidir con el producto que quieres comprar." } },
          { heading: "Entiende el primer pago", paragraphs: ["El primer pago cubre producto y envío dentro de China; después el agente compra al vendedor.", "El tiempo de despacho del vendedor es independiente del trabajo del agente."] },
          { heading: "Revisa las fotos QC del almacén", paragraphs: ["Compara color, forma, fabricación, logotipos, material, costuras y talla con el anuncio actual.", "Si falta un detalle, pide una foto adicional con una instrucción precisa."] },
          { heading: "Decide antes de que cierre el plazo", paragraphs: ["La política publicada describe cinco días o 120 horas tras QC, sujetos al vendedor y al producto.", "Artículos personalizados, abiertos o incompletos pueden quedar excluidos."] },
          { heading: "Crea y paga el paquete internacional", paragraphs: ["Elige los artículos almacenados, el destino, la ruta y los servicios; el envío internacional se paga aparte.", "El envío normal empieza con una estimación y el embalaje de prueba confirma medidas antes."] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120 h", label: "Plazo de devolución publicado" }, { value: "$0.15", label: "Precio de foto adicional" }, { value: "5 pasos", label: "Rutina de revisión" }],
        sourceLabel: "Guía de compra y servicios de valor añadido de Joyagoo",
        sections: [
          { heading: "Compara primero el producto completo", paragraphs: ["Compara silueta, color y proporciones con la variante pedida.", "Mantén abierto el anuncio original porque el título abreviado puede omitir detalles."] },
          { heading: "Comprueba fabricación y simetría", paragraphs: ["Revisa pares, costuras, pegado, cremalleras, estampados, herrajes y cierres desde todos los ángulos.", "Una foto frontal puede ocultar daños o una etiqueta incorrecta."], callout: { title: "No uses un solo ángulo", text: "Compara todas las fotos del almacén antes de aceptar." } },
          { heading: "Confirma las medidas", paragraphs: ["Una etiqueta de talla no es una medida real; pide una foto con regla si importa el ajuste.", "Da una sola instrucción clara por foto."] },
          { heading: "Registra el problema antes de contactar", paragraphs: ["Indica la foto y el defecto visible y compáralo con la especificación del vendedor.", "Distingue un defecto objetivo de una preferencia personal."] },
          { heading: "Actúa dentro de cinco días", paragraphs: ["Las solicitudes elegibles deben presentarse en cinco días tras completar QC.", "Revisa las fotos cuando llegue el aviso, no al preparar el paquete."] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "Precio publicado del embalaje de prueba" }, { value: "$0.75", label: "Precio publicado de fotos del paquete" }, { value: "90 días", label: "Almacenamiento gratuito publicado" }],
        sourceLabel: "Guía de compra y servicios de valor añadido de Joyagoo",
        sections: [
          { heading: "Separa producto y paquete", paragraphs: ["El pedido cubre producto y envío nacional; el internacional se elige y paga después del almacenamiento.", "Un artículo ligero pero voluminoso puede ser caro por peso volumétrico."] },
          { heading: "Entiende medidas estimadas y finales", paragraphs: ["El paquete normal comienza con una estimación y después se usan las medidas reales del embalaje.", "Las rutas dependen del destino y de las restricciones."] },
          { heading: "Usa embalaje de prueba si importan las medidas", paragraphs: ["Determina peso y dimensiones antes del envío; el precio publicado es $3 por paquete.", "Es útil para cajas de zapatos, abrigos y paquetes mixtos."], callout: { title: "Cuándo ayuda", text: "Úsalo si conservar o retirar embalaje cambia mucho el volumen cobrado." } },
          { heading: "Elige servicios con un objetivo", paragraphs: ["Puede haber retirada de cajas, refuerzo, seguro y fotos del paquete por $0.75.", "Cada servicio debe resolver un riesgo concreto."] },
          { heading: "Usa el almacenamiento para planificar", paragraphs: ["La guía publica 90 días gratuitos por producto.", "No confundas almacenamiento con el plazo de devolución, mucho más corto."] },
        ],
      },
      returns: {
        facts: [{ value: "5 días", label: "Plazo tras completar QC" }, { value: "120 h", label: "El mismo plazo en horas" }, { value: "Reglas del vendedor", label: "Siguen decidiendo elegibilidad" }],
        sourceLabel: "Política de devoluciones de Joyagoo",
        sections: [
          { heading: "El plazo empieza al completar QC", paragraphs: ["La política publicada inicia el plazo con el estado QC completado y dura cinco días o 120 horas.", "El almacenamiento no es el reloj de devolución."] },
          { heading: "Comprueba si el artículo es elegible", paragraphs: ["Productos personalizados, abiertos, usados o sin embalaje completo pueden quedar excluidos.", "Si desaparece la opción de devolución, el plazo puede haber terminado."] },
          { heading: "Conserva embalaje y estado de reventa", paragraphs: ["El vendedor puede exigir que el artículo siga nuevo y revendible.", "No retires etiquetas, cajas ni accesorios antes de decidir tras QC."], callout: { title: "Regla práctica", text: "Conserva todo el embalaje hasta aceptar definitivamente." } },
          { heading: "Entiende quién paga la devolución", paragraphs: ["La política distingue defectos de calidad de devoluciones sin defecto.", "Sin defecto, el comprador suele asumir el envío; confirma el importe actual."] },
          { heading: "Presenta pruebas útiles", paragraphs: ["Describe el problema, indica la foto QC y compárala con la variante elegida.", "Una solicitud clara, embalaje intacto y acción puntual facilitan la comunicación."] },
        ],
      },
    },
    policies: {
      about: [{ heading: "Qué publicamos", paragraphs: ["Las páginas de producto llevan a fichas coincidentes y los artículos explican búsqueda, QC, almacén, paquete y plazos."] }, { heading: "Qué no hacemos", paragraphs: ["No garantizamos calidad, autenticidad, envío, aduanas o devoluciones ni procesamos pagos."] }, { heading: "Relación con Joyagoo", paragraphs: ["Es un sitio informativo independiente, no propiedad ni parte de Joyagoo."] }],
      "editorial-policy": [{ heading: "Jerarquía de fuentes", paragraphs: ["Los datos temporales se comprueban con guías publicadas; experiencias comunitarias no se presentan como política."] }, { heading: "Fechas y condiciones", paragraphs: ["Las fechas y limitaciones evitan convertir un plazo en garantía."] }, { heading: "Correcciones", paragraphs: ["Si cambia la información pública, actualizamos la guía y su fecha."] }],
      privacy: [{ heading: "Información tratada", paragraphs: ["No hay cuentas, pagos, comentarios ni archivos; las búsquedas van al catálogo designado."] }, { heading: "Información técnica", paragraphs: ["El alojamiento puede procesar datos estándar para servir y proteger el sitio."] }, { heading: "Sitios externos", paragraphs: ["El catálogo tiene su propia privacidad; este sitio no recibe contraseñas ni datos de pago introducidos allí."] }],
      terms: [{ heading: "Finalidad informativa", paragraphs: ["El contenido sirve para descubrir y aprender; no es contrato, garantía ni consejo aduanero."] }, { heading: "Productos y servicios externos", paragraphs: ["Stock, precio, calidad, pagos, almacén y envío son controlados externamente."] }, { heading: "Nombres y contenido", paragraphs: ["Los nombres se usan de forma descriptiva y las marcas pertenecen a sus titulares."] }],
    },
  },
  it: {
    catalogue: {
      names: ["Maschera da sci", "Cappello di design", "Felpe Off-White — 39 modelli", "Maglione Corteiz C Star — 15 modelli", "Scarpe alte NUMERIS", "Scarpe trail HOKA Speedgoat 5", "Samsung Galaxy Watch8"],
      labels: ["Accessori", "Cappelli", "Abbigliamento", "Abbigliamento", "Scarpe", "Scarpe", "Elettronica"],
      finds: "risultati",
    },
    homeStats: [{ value: "5 giorni", label: "Finestra tipica dopo il completamento QC" }, { value: "90 giorni", label: "Deposito gratuito pubblicato" }, { value: "$0.15", label: "Prezzo pubblicato per foto dettagliata extra" }],
    homeStatsNote: "I dati riassumono informazioni pubbliche verificate a luglio 2026. Restano valide condizioni del venditore, idoneità del prodotto e regole attuali.",
    article: { home: "Pagina iniziale", guides: "Guide", researched: "Guida editoriale verificata", updated: "Aggiornato il 29 luglio 2026", independent: "Indipendente da Joyagoo", keyFacts: "Dati chiave", inGuide: "In questa guida", sourceCheck: "Controllo fonti", sourceBody: "La guida è stata verificata con informazioni pubbliche della piattaforma. Regole e prezzi possono cambiare; controlla i dati attuali prima di decidere.", ready: "PRONTO A ESPLORARE?", ctaTitle: "Usa il catalogo prodotti", ctaBody: "Apri il catalogo, confronta l’offerta attuale e salva il link originale prima dell’ordine.", explore: "Vedi prodotti ↗" },
    guidesIndex: { intro: "Parti dal processo, poi approfondisci prove QC, pianificazione del pacco e resi con scadenza. Regole pubblicate e consigli pratici restano distinti.", returnEyebrow: "FINESTRA DI RESO", returnTitle: "Resi Joyagoo spiegati", returnText: "Come interagiscono i cinque giorni, l’idoneità del venditore e l’imballaggio." },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2", label: "Fasi principali di pagamento" }, { value: "QC", label: "Controllo prima del pacco" }, { value: "90 giorni", label: "Deposito gratuito pubblicato" }],
        sourceLabel: "Guida all’acquisto di Joyagoo",
        sections: [
          { heading: "Inizia dall’inserzione originale", paragraphs: ["Il catalogo aiuta a scoprire, ma non sostituisce l’inserzione live. Apri la pagina corretta, conferma la variante e salva il link.", "Ricontrolla colore, taglia, quantità, note del venditore e spedizione nazionale."], callout: { title: "Prima di pagare", text: "La variante selezionata deve coincidere con il prodotto desiderato." } },
          { heading: "Comprendi il primo pagamento", paragraphs: ["Il primo pagamento copre prodotto e spedizione in Cina; poi l’agente acquista dal venditore.", "La preparazione del venditore è separata dal lavoro dell’agente."] },
          { heading: "Controlla le foto QC del magazzino", paragraphs: ["Confronta colore, forma, costruzione, loghi, materiale, cuciture e taglia con l’offerta attuale.", "Se manca un dettaglio, chiedi una foto extra con istruzione precisa."] },
          { heading: "Decidi prima della scadenza", paragraphs: ["La regola pubblicata indica cinque giorni o 120 ore dopo QC, con condizioni del venditore e del prodotto.", "Articoli personalizzati, aperti o incompleti possono essere esclusi."] },
          { heading: "Crea e paga il pacco internazionale", paragraphs: ["Seleziona articoli, destinazione, rotta e servizi; la spedizione internazionale è un pagamento separato.", "L’invio normale parte da una stima; il pre-imballaggio stabilisce prima le misure."] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120 ore", label: "Finestra di reso pubblicata" }, { value: "$0.15", label: "Prezzo foto extra" }, { value: "5 passi", label: "Routine ripetibile" }],
        sourceLabel: "Guida all’acquisto e servizi a valore aggiunto di Joyagoo",
        sections: [
          { heading: "Confronta prima il prodotto completo", paragraphs: ["Confronta sagoma, colore e proporzioni con la variante ordinata.", "Tieni aperta l’inserzione originale perché il titolo abbreviato può omettere dettagli."] },
          { heading: "Controlla lavorazione e simmetria", paragraphs: ["Esamina coppie, cuciture, incollaggio, cerniere, stampe, hardware e chiusure da ogni lato.", "Una foto frontale può nascondere danni o etichette errate."], callout: { title: "Non usare un solo angolo", text: "Confronta tutte le immagini prima di accettare." } },
          { heading: "Conferma le misure", paragraphs: ["L’etichetta non è una misura reale; chiedi una foto con righello quando conta la vestibilità.", "Dai una sola istruzione chiara per foto."] },
          { heading: "Registra il problema prima del supporto", paragraphs: ["Indica immagine e difetto visibile e confrontali con la specifica del venditore.", "Distingui un difetto oggettivo da una preferenza."] },
          { heading: "Agisci entro cinque giorni", paragraphs: ["Le richieste idonee vanno presentate entro cinque giorni dal completamento QC.", "Controlla le foto quando arriva l’avviso."] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "Prezzo pre-imballaggio pubblicato" }, { value: "$0.75", label: "Prezzo foto pacco pubblicato" }, { value: "90 giorni", label: "Deposito gratuito pubblicato" }],
        sourceLabel: "Guida all’acquisto e servizi a valore aggiunto di Joyagoo",
        sections: [
          { heading: "Separa costo prodotto e pacco", paragraphs: ["L’ordine copre prodotto e spedizione interna; l’internazionale si paga dopo il deposito.", "Un articolo leggero ma voluminoso può costare per il volume."] },
          { heading: "Comprendi stime e misure finali", paragraphs: ["Il pacco normale parte da una stima e usa poi le misure reali.", "Le rotte dipendono da destinazione e restrizioni del prodotto."] },
          { heading: "Usa il pre-imballaggio quando contano le misure", paragraphs: ["Determina peso e dimensioni prima della spedizione; il prezzo pubblicato è $3.", "È utile per scatole, cappotti e pacchi misti."], callout: { title: "Quando aiuta", text: "Usalo se l’imballaggio cambia molto il volume fatturato." } },
          { heading: "Scegli i servizi con uno scopo", paragraphs: ["Possono esserci rimozione scatole, rinforzo, assicurazione e foto pacco a $0.75.", "Ogni servizio deve risolvere un rischio concreto."] },
          { heading: "Usa il deposito per pianificare", paragraphs: ["La guida pubblica 90 giorni gratuiti per prodotto.", "Non confonderli con la finestra di reso più breve."] },
        ],
      },
      returns: {
        facts: [{ value: "5 giorni", label: "Finestra dopo QC" }, { value: "120 ore", label: "La stessa finestra in ore" }, { value: "Regole venditore", label: "Determinano ancora l’idoneità" }],
        sourceLabel: "Politica di reso di Joyagoo",
        sections: [
          { heading: "Il tempo parte dal completamento QC", paragraphs: ["La politica avvia la finestra con lo stato QC completato e dura cinque giorni o 120 ore.", "Il deposito non è il timer del reso."] },
          { heading: "Controlla l’idoneità del prodotto", paragraphs: ["Prodotti personalizzati, aperti, usati o senza confezione completa possono essere esclusi.", "Se il comando di reso scompare, il termine può essere finito."] },
          { heading: "Conserva imballaggio e stato rivendibile", paragraphs: ["Il venditore può richiedere un articolo nuovo e rivendibile.", "Non eliminare etichette, scatole o accessori prima della decisione QC."], callout: { title: "Regola pratica", text: "Conserva tutto l’imballaggio fino all’accettazione finale." } },
          { heading: "Comprendi il costo del reso", paragraphs: ["La regola distingue difetti di qualità e resi senza difetto.", "Senza difetto il compratore paga in genere la spedizione; verifica l’importo attuale."] },
          { heading: "Invia prove utilizzabili", paragraphs: ["Descrivi il problema, indica la foto QC e confronta la variante scelta.", "Richiesta chiara, confezione intatta e tempestività aiutano la comunicazione."] },
        ],
      },
    },
    policies: {
      about: [{ heading: "Cosa pubblichiamo", paragraphs: ["Le pagine prodotto portano alle offerte corrette; gli articoli spiegano ricerca, QC, deposito, pacco e scadenze."] }, { heading: "Cosa non facciamo", paragraphs: ["Non garantiamo qualità, autenticità, spedizione, dogana o reso e non gestiamo pagamenti."] }, { heading: "Rapporto con Joyagoo", paragraphs: ["È un sito informativo indipendente, non di proprietà né gestito da Joyagoo."] }],
      "editorial-policy": [{ heading: "Gerarchia delle fonti", paragraphs: ["I dati temporali sono verificati con guide pubblicate; le esperienze della comunità non diventano regole."] }, { heading: "Date e condizioni", paragraphs: ["Date e limiti evitano di presentare una finestra come garanzia."] }, { heading: "Correzioni", paragraphs: ["Se cambia l’informazione pubblica, aggiorniamo guida e data."] }],
      privacy: [{ heading: "Informazioni gestite", paragraphs: ["Nessun account, pagamento, commento o file; le ricerche vanno al catalogo designato."] }, { heading: "Informazioni tecniche", paragraphs: ["L’hosting può trattare dati standard per servire e proteggere il sito."] }, { heading: "Siti esterni", paragraphs: ["Il catalogo ha regole proprie; questo sito non riceve password o dati di pagamento inseriti lì."] }],
      terms: [{ heading: "Scopo informativo", paragraphs: ["I contenuti servono a scoprire e imparare; non sono contratto, garanzia o parere doganale."] }, { heading: "Prodotti e servizi esterni", paragraphs: ["Disponibilità, prezzo, qualità, pagamenti, deposito e spedizione sono controllati esternamente."] }, { heading: "Nomi e contenuti", paragraphs: ["I nomi sono usati in modo descrittivo e i marchi appartengono ai rispettivi titolari."] }],
    },
  },
  fr: {
    catalogue: {
      names: ["Masque de ski", "Casquette de créateur", "Sweats Off-White — 39 modèles", "Pull Corteiz C Star — 15 modèles", "Chaussures montantes NUMERIS", "Chaussures trail HOKA Speedgoat 5", "Samsung Galaxy Watch8"],
      labels: ["Accessoires", "Couvre-chefs", "Vêtements", "Vêtements", "Chaussures", "Chaussures", "Électronique"],
      finds: "trouvailles",
    },
    homeStats: [{ value: "5 jours", label: "Fenêtre typique après la fin du QC" }, { value: "90 jours", label: "Stockage gratuit publié" }, { value: "$0.15", label: "Prix publié par photo détaillée supplémentaire" }],
    homeStatsNote: "Ces chiffres résument des informations publiques vérifiées en juillet 2026. Les conditions du vendeur, l’éligibilité et les règles actuelles restent applicables.",
    article: { home: "Accueil", guides: "Guides", researched: "Guide éditorial vérifié", updated: "Mis à jour le 29 juillet 2026", independent: "Indépendant de Joyagoo", keyFacts: "Faits clés", inGuide: "Dans ce guide", sourceCheck: "Vérification des sources", sourceBody: "Ce guide a été vérifié avec les informations publiques de la plateforme. Les règles et prix peuvent changer; contrôlez les données actuelles avant d’agir.", ready: "PRÊT À PARCOURIR ?", ctaTitle: "Utilisez le tableur produits", ctaBody: "Ouvrez le catalogue, comparez l’annonce en direct et gardez le lien original avant de commander.", explore: "Voir les produits ↗" },
    guidesIndex: { intro: "Commencez par le processus, puis approfondissez les preuves QC, la préparation du colis et les retours limités dans le temps. Les règles publiées restent distinctes des conseils.", returnEyebrow: "FENÊTRE DE RETOUR", returnTitle: "Retours Joyagoo expliqués", returnText: "Comment cinq jours, éligibilité du vendeur et état de l’emballage s’articulent." },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2", label: "Étapes principales de paiement" }, { value: "QC", label: "Contrôle avant le colis" }, { value: "90 jours", label: "Stockage gratuit publié" }],
        sourceLabel: "Guide d’achat Joyagoo",
        sections: [
          { heading: "Commencez par l’annonce originale", paragraphs: ["Le tableur sert à découvrir, pas à remplacer l’annonce en direct. Ouvrez la bonne fiche, confirmez la variante et gardez le lien original.", "Revérifiez couleur, taille, quantité, notes vendeur et livraison intérieure."], callout: { title: "Avant de payer", text: "La variante choisie doit correspondre exactement au produit voulu." } },
          { heading: "Comprenez le premier paiement", paragraphs: ["Le premier paiement couvre le produit et la livraison en Chine; l’agent achète ensuite au vendeur.", "Le délai d’expédition du vendeur est distinct du travail de l’agent."] },
          { heading: "Vérifiez les photos QC de l’entrepôt", paragraphs: ["Comparez couleur, forme, fabrication, logos, matière, coutures et taille avec l’annonce actuelle.", "Si un détail manque, demandez une photo précise plutôt que de deviner."] },
          { heading: "Décidez avant la fermeture du délai", paragraphs: ["La règle publiée décrit cinq jours ou 120 heures après QC, selon vendeur et produit.", "Les articles personnalisés, ouverts ou incomplets peuvent être exclus."] },
          { heading: "Créez et payez le colis international", paragraphs: ["Choisissez les articles, la destination, la ligne et les services; le transport international se paie séparément.", "L’envoi normal commence par une estimation; le pré-emballage fixe les mesures avant paiement final."] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120 h", label: "Fenêtre de retour publiée" }, { value: "$0.15", label: "Prix d’une photo supplémentaire" }, { value: "5 étapes", label: "Routine reproductible" }],
        sourceLabel: "Guide d’achat et services à valeur ajoutée Joyagoo",
        sections: [
          { heading: "Comparez d’abord le produit complet", paragraphs: ["Comparez silhouette, couleur et proportions avec la variante commandée.", "Gardez l’annonce originale ouverte car le titre abrégé peut omettre des détails."] },
          { heading: "Contrôlez fabrication et symétrie", paragraphs: ["Examinez paires, coutures, collage, fermetures, imprimés, métal et attaches sous tous les angles.", "Une vue de face peut cacher des dommages ou une mauvaise étiquette."], callout: { title: "Ne vous fiez pas à un angle", text: "Comparez toutes les photos avant d’accepter." } },
          { heading: "Confirmez les mesures", paragraphs: ["Une étiquette de taille n’est pas une mesure réelle; demandez une photo avec règle si l’ajustement compte.", "Donnez une seule instruction précise par photo."] },
          { heading: "Notez le problème avant le support", paragraphs: ["Indiquez la photo et le défaut visible puis comparez avec la spécification du vendeur.", "Séparez défaut objectif et préférence personnelle."] },
          { heading: "Agissez dans les cinq jours", paragraphs: ["Les demandes éligibles doivent être déposées dans les cinq jours suivant QC.", "Vérifiez dès l’arrivée de la notification."] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "Prix publié du pré-emballage" }, { value: "$0.75", label: "Prix publié des photos du colis" }, { value: "90 jours", label: "Stockage gratuit publié" }],
        sourceLabel: "Guide d’achat et services à valeur ajoutée Joyagoo",
        sections: [
          { heading: "Séparez coût produit et coût colis", paragraphs: ["La commande couvre produit et transport intérieur; l’international est choisi et payé après stockage.", "Un objet léger mais volumineux peut coûter cher au volume."] },
          { heading: "Comprenez estimation et mesures finales", paragraphs: ["Le colis normal commence par une estimation puis utilise les mesures réelles après emballage.", "Les lignes dépendent de la destination et des restrictions."] },
          { heading: "Utilisez le pré-emballage si les dimensions comptent", paragraphs: ["Il établit poids et dimensions avant expédition; le prix publié est $3 par colis.", "Il aide avec boîtes à chaussures, manteaux et colis mélangés."], callout: { title: "Quand c’est utile", text: "Utilisez-le si l’emballage modifie fortement le volume facturé." } },
          { heading: "Choisissez les services avec un objectif", paragraphs: ["Retrait de boîte, renfort, assurance et photos à $0.75 peuvent être proposés.", "Chaque service doit résoudre un risque précis."] },
          { heading: "Planifiez avec le stockage", paragraphs: ["Le guide publie 90 jours gratuits par produit.", "Ne confondez pas stockage et fenêtre de retour plus courte."] },
        ],
      },
      returns: {
        facts: [{ value: "5 jours", label: "Fenêtre après le QC" }, { value: "120 h", label: "La même durée en heures" }, { value: "Règles vendeur", label: "Déterminent toujours l’éligibilité" }],
        sourceLabel: "Politique de retour Joyagoo",
        sections: [
          { heading: "Le délai commence à la fin du QC", paragraphs: ["La politique démarre avec le statut QC terminé et dure cinq jours ou 120 heures.", "Le stockage n’est pas le compteur de retour."] },
          { heading: "Vérifiez l’éligibilité de l’article", paragraphs: ["Produits personnalisés, ouverts, usagés ou sans emballage complet peuvent être exclus.", "Si l’option retour disparaît, le délai peut être dépassé."] },
          { heading: "Conservez emballage et état revendable", paragraphs: ["Le vendeur peut exiger un article neuf et revendable.", "Ne retirez pas étiquettes, boîtes ou accessoires avant la décision QC."], callout: { title: "Règle pratique", text: "Gardez tout l’emballage jusqu’à l’acceptation finale." } },
          { heading: "Comprenez le coût du retour", paragraphs: ["La règle distingue défaut de qualité et retour sans défaut.", "Sans défaut, l’acheteur paie généralement le transport; vérifiez le montant actuel."] },
          { heading: "Fournissez des preuves exploitables", paragraphs: ["Décrivez le problème, citez la photo QC et comparez la variante choisie.", "Demande claire, emballage intact et action rapide facilitent la communication."] },
        ],
      },
    },
    policies: {
      about: [{ heading: "Ce que nous publions", paragraphs: ["Les pages produits mènent aux bonnes fiches; les articles expliquent recherche, QC, stockage, colis et délais."] }, { heading: "Ce que nous ne faisons pas", paragraphs: ["Nous ne garantissons pas qualité, authenticité, livraison, douane ou retour et ne traitons aucun paiement."] }, { heading: "Relation avec Joyagoo", paragraphs: ["Ce site d’information indépendant n’appartient pas à Joyagoo et n’est pas exploité par lui."] }],
      "editorial-policy": [{ heading: "Hiérarchie des sources", paragraphs: ["Les données temporelles sont vérifiées avec les guides publiés; les expériences communautaires ne deviennent pas des règles."] }, { heading: "Dates et conditions", paragraphs: ["Dates et limites évitent de présenter une fenêtre comme garantie."] }, { heading: "Corrections", paragraphs: ["Si une information publiée change, le guide et sa date sont mis à jour."] }],
      privacy: [{ heading: "Informations traitées", paragraphs: ["Aucun compte, paiement, commentaire ou fichier; les recherches vont au catalogue désigné."] }, { heading: "Informations techniques", paragraphs: ["L’hébergeur peut traiter des données standard pour servir et protéger le site."] }, { heading: "Sites externes", paragraphs: ["Le catalogue a sa propre confidentialité; ce site ne reçoit ni mots de passe ni données de paiement saisis là-bas."] }],
      terms: [{ heading: "Finalité informative", paragraphs: ["Le contenu sert à découvrir et apprendre; ce n’est ni contrat, ni garantie, ni conseil douanier."] }, { heading: "Produits et services externes", paragraphs: ["Stock, prix, qualité, paiement, entrepôt et livraison sont contrôlés à l’extérieur."] }, { heading: "Noms et contenu", paragraphs: ["Les noms sont utilisés descriptivement et les marques appartiennent à leurs titulaires."] }],
    },
  },
  pt: {
    catalogue: {
      names: ["Óculos de esqui", "Boné de design", "Moletons Off-White — 39 estilos", "Suéter Corteiz C Star — 15 estilos", "Tênis de cano alto NUMERIS", "Tênis HOKA Speedgoat 5", "Samsung Galaxy Watch8"],
      labels: ["Acessórios", "Chapéus", "Roupas", "Roupas", "Calçados", "Calçados", "Eletrônicos"],
      finds: "achados",
    },
    homeStats: [{ value: "5 dias", label: "Janela típica após conclusão do QC" }, { value: "90 dias", label: "Armazenamento gratuito publicado" }, { value: "$0.15", label: "Preço publicado por foto detalhada extra" }],
    homeStatsNote: "Os números resumem informações públicas verificadas em julho de 2026. Condições do vendedor, elegibilidade e regras atuais continuam valendo.",
    article: { home: "Início", guides: "Guias", researched: "Guia editorial pesquisado", updated: "Atualizado em 29 de julho de 2026", independent: "Independente da Joyagoo", keyFacts: "Fatos principais", inGuide: "Neste guia", sourceCheck: "Verificação de fontes", sourceBody: "O guia foi conferido com informações públicas da plataforma. Regras e preços podem mudar; confirme os dados atuais antes de decidir.", ready: "PRONTO PARA EXPLORAR?", ctaTitle: "Use a planilha de produtos", ctaBody: "Abra o catálogo, compare o anúncio atual e guarde o link original antes do pedido.", explore: "Ver produtos ↗" },
    guidesIndex: { intro: "Comece pelo processo e aprofunde provas QC, planejamento do pacote e devoluções com prazo. Regras publicadas ficam separadas de conselhos práticos.", returnEyebrow: "JANELA DE DEVOLUÇÃO", returnTitle: "Devoluções Joyagoo explicadas", returnText: "Como cinco dias, elegibilidade do vendedor e embalagem se combinam." },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2", label: "Etapas principais de pagamento" }, { value: "QC", label: "Revisão antes do pacote" }, { value: "90 dias", label: "Armazenamento gratuito publicado" }],
        sourceLabel: "Guia de compras da Joyagoo",
        sections: [
          { heading: "Comece pelo anúncio original", paragraphs: ["A planilha ajuda a descobrir, mas não substitui o anúncio ao vivo. Abra a página certa, confirme a variante e salve o link original.", "Revise cor, tamanho, quantidade, observações do vendedor e frete doméstico."], callout: { title: "Antes de pagar", text: "A variante selecionada deve corresponder ao produto desejado." } },
          { heading: "Entenda o primeiro pagamento", paragraphs: ["O primeiro pagamento cobre produto e frete na China; depois o agente compra do vendedor.", "O tempo de despacho do vendedor é separado do trabalho do agente."] },
          { heading: "Revise as fotos QC do armazém", paragraphs: ["Compare cor, formato, construção, logotipos, material, costuras e tamanho com o anúncio atual.", "Se faltar um detalhe, peça uma foto adicional com instrução clara."] },
          { heading: "Decida antes do fim da janela", paragraphs: ["A regra publicada descreve cinco dias ou 120 horas após QC, sujeitos ao vendedor e produto.", "Itens personalizados, abertos ou incompletos podem ser excluídos."] },
          { heading: "Monte e pague o pacote internacional", paragraphs: ["Escolha itens, destino, rota e serviços; o frete internacional é pago separadamente.", "O envio normal começa com estimativa; o pré-empacotamento confirma medidas antes."] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120 h", label: "Janela de devolução publicada" }, { value: "$0.15", label: "Preço de foto adicional" }, { value: "5 passos", label: "Rotina repetível" }],
        sourceLabel: "Guia de compras e serviços adicionais da Joyagoo",
        sections: [
          { heading: "Compare primeiro o produto inteiro", paragraphs: ["Compare silhueta, cor e proporções com a variante pedida.", "Mantenha o anúncio original aberto porque o título curto pode omitir detalhes."] },
          { heading: "Confira construção e simetria", paragraphs: ["Examine pares, costuras, colagem, zíperes, estampas, ferragens e fechos em todos os ângulos.", "A vista frontal pode esconder danos ou etiqueta errada."], callout: { title: "Não use apenas um ângulo", text: "Compare todas as fotos antes de aceitar." } },
          { heading: "Confirme medidas", paragraphs: ["A etiqueta não é uma medida real; peça foto com régua quando o ajuste importar.", "Dê uma instrução precisa por foto."] },
          { heading: "Registre o problema antes do suporte", paragraphs: ["Indique foto e defeito visível e compare com a especificação do vendedor.", "Separe defeito objetivo de preferência pessoal."] },
          { heading: "Aja dentro de cinco dias", paragraphs: ["Solicitações elegíveis devem ser feitas em cinco dias após conclusão do QC.", "Revise assim que a notificação chegar."] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "Preço publicado do pré-empacotamento" }, { value: "$0.75", label: "Preço publicado das fotos do pacote" }, { value: "90 dias", label: "Armazenamento gratuito publicado" }],
        sourceLabel: "Guia de compras e serviços adicionais da Joyagoo",
        sections: [
          { heading: "Separe custo do produto e do pacote", paragraphs: ["O pedido cobre produto e frete doméstico; o internacional é escolhido e pago após o armazenamento.", "Um item leve e volumoso pode custar pelo volume."] },
          { heading: "Entenda estimativas e medidas finais", paragraphs: ["O pacote normal começa com uma estimativa e usa depois as medidas reais.", "As rotas dependem do destino e das restrições."] },
          { heading: "Use pré-empacotamento se as dimensões importarem", paragraphs: ["Ele determina peso e medidas antes do envio; o preço publicado é $3.", "Ajuda em caixas de sapato, casacos e pacotes mistos."], callout: { title: "Quando ajuda", text: "Use se a embalagem alterar muito o volume cobrado." } },
          { heading: "Escolha serviços com propósito", paragraphs: ["Pode haver retirada de caixas, reforço, seguro e fotos por $0.75.", "Cada serviço deve resolver um risco específico."] },
          { heading: "Use o armazenamento para planejar", paragraphs: ["O guia publica 90 dias grátis por produto.", "Não confunda com a janela de devolução mais curta."] },
        ],
      },
      returns: {
        facts: [{ value: "5 dias", label: "Janela após o QC" }, { value: "120 h", label: "A mesma janela em horas" }, { value: "Regras do vendedor", label: "Ainda definem elegibilidade" }],
        sourceLabel: "Política de devolução da Joyagoo",
        sections: [
          { heading: "O prazo começa na conclusão do QC", paragraphs: ["A política inicia a janela no status QC concluído e dura cinco dias ou 120 horas.", "Armazenamento não é o relógio da devolução."] },
          { heading: "Confira a elegibilidade do item", paragraphs: ["Produtos personalizados, abertos, usados ou sem embalagem completa podem ser excluídos.", "Se a opção de devolução sumir, o prazo pode ter acabado."] },
          { heading: "Preserve embalagem e condição de revenda", paragraphs: ["O vendedor pode exigir item novo e revendável.", "Não remova etiquetas, caixas ou acessórios antes da decisão QC."], callout: { title: "Regra prática", text: "Guarde toda a embalagem até a aceitação final." } },
          { heading: "Entenda o custo da devolução", paragraphs: ["A regra distingue defeito de qualidade de devolução sem defeito.", "Sem defeito, o comprador geralmente paga o frete; confira o valor atual."] },
          { heading: "Envie provas úteis", paragraphs: ["Descreva o problema, cite a foto QC e compare com a variante escolhida.", "Pedido claro, embalagem intacta e rapidez facilitam a comunicação."] },
        ],
      },
    },
    policies: {
      about: [{ heading: "O que publicamos", paragraphs: ["Páginas de produtos levam às ofertas certas; artigos explicam busca, QC, armazenamento, pacote e prazos."] }, { heading: "O que não fazemos", paragraphs: ["Não garantimos qualidade, autenticidade, envio, alfândega ou devolução e não processamos pagamentos."] }, { heading: "Relação com a Joyagoo", paragraphs: ["Este site informativo independente não pertence nem é operado pela Joyagoo."] }],
      "editorial-policy": [{ heading: "Hierarquia de fontes", paragraphs: ["Dados temporais são verificados em guias publicados; experiências da comunidade não viram regras."] }, { heading: "Datas e condições", paragraphs: ["Datas e limites evitam apresentar uma janela como garantia."] }, { heading: "Correções", paragraphs: ["Quando a informação pública muda, atualizamos guia e data."] }],
      privacy: [{ heading: "Informações tratadas", paragraphs: ["Sem contas, pagamentos, comentários ou arquivos; buscas vão ao catálogo designado."] }, { heading: "Informações técnicas", paragraphs: ["A hospedagem pode processar dados padrão para servir e proteger o site."] }, { heading: "Sites externos", paragraphs: ["O catálogo tem privacidade própria; este site não recebe senhas ou dados de pagamento inseridos lá."] }],
      terms: [{ heading: "Finalidade informativa", paragraphs: ["O conteúdo serve para descobrir e aprender; não é contrato, garantia ou orientação aduaneira."] }, { heading: "Produtos e serviços externos", paragraphs: ["Estoque, preço, qualidade, pagamentos, armazém e envio são controlados externamente."] }, { heading: "Nomes e conteúdo", paragraphs: ["Os nomes são usados de forma descritiva e as marcas pertencem aos titulares."] }],
    },
  },
  ro: {
    catalogue: {
      names: ["Ochelari de schi", "Șapcă de designer", "Hanorace Off-White — 39 modele", "Pulover Corteiz C Star — 15 modele", "Pantofi înalți NUMERIS", "Pantofi trail HOKA Speedgoat 5", "Samsung Galaxy Watch8"],
      labels: ["Accesorii", "Pălării", "Îmbrăcăminte", "Îmbrăcăminte", "Pantofi", "Pantofi", "Electronice"],
      finds: "descoperiri",
    },
    homeStats: [{ value: "5 zile", label: "Fereastra tipică după finalizarea QC" }, { value: "90 zile", label: "Depozitare gratuită publicată" }, { value: "$0.15", label: "Preț publicat pentru o fotografie detaliată suplimentară" }],
    homeStatsNote: "Cifrele rezumă informații publice verificate în iulie 2026. Se aplică în continuare condițiile vânzătorului, eligibilitatea și regulile actuale.",
    article: { home: "Acasă", guides: "Ghiduri", researched: "Ghid editorial documentat", updated: "Actualizat la 29 iulie 2026", independent: "Independent de Joyagoo", keyFacts: "Date cheie", inGuide: "În acest ghid", sourceCheck: "Verificarea surselor", sourceBody: "Ghidul a fost verificat cu informațiile publice ale platformei. Regulile și prețurile se pot schimba; confirmă datele actuale înainte de decizii.", ready: "GATA DE EXPLORARE?", ctaTitle: "Folosește tabelul de produse", ctaBody: "Deschide catalogul, compară oferta live și salvează linkul original înainte de comandă.", explore: "Vezi produsele ↗" },
    guidesIndex: { intro: "Începe cu procesul, apoi aprofundează dovezile QC, planificarea coletului și retururile cu termen. Regulile publicate sunt separate de sfaturi.", returnEyebrow: "FEREASTRA DE RETUR", returnTitle: "Retururile Joyagoo explicate", returnText: "Cum se combină cele cinci zile, eligibilitatea vânzătorului și ambalajul." },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2", label: "Etape principale de plată" }, { value: "QC", label: "Verificare înainte de colet" }, { value: "90 zile", label: "Depozitare gratuită publicată" }],
        sourceLabel: "Ghidul de cumpărare Joyagoo",
        sections: [
          { heading: "Începe cu oferta originală", paragraphs: ["Tabelul ajută la descoperire, dar nu înlocuiește oferta live. Deschide pagina corectă, confirmă varianta și salvează linkul original.", "Verifică din nou culoarea, mărimea, cantitatea, notele și transportul intern."], callout: { title: "Înainte de plată", text: "Varianta selectată trebuie să corespundă produsului dorit." } },
          { heading: "Înțelege prima plată", paragraphs: ["Prima plată acoperă produsul și transportul în China; agentul cumpără apoi de la vânzător.", "Timpul de expediere al vânzătorului este separat de activitatea agentului."] },
          { heading: "Verifică fotografiile QC din depozit", paragraphs: ["Compară culoarea, forma, construcția, siglele, materialul, cusăturile și mărimea cu oferta actuală.", "Dacă lipsește un detaliu, cere o fotografie suplimentară precisă."] },
          { heading: "Decide înainte de închiderea ferestrei", paragraphs: ["Regula publicată descrie cinci zile sau 120 de ore după QC, în funcție de vânzător și produs.", "Articolele personalizate, deschise sau incomplete pot fi excluse."] },
          { heading: "Construiește și plătește coletul internațional", paragraphs: ["Alege articolele, destinația, ruta și serviciile; transportul internațional se plătește separat.", "Trimiterea normală începe cu o estimare; preambalarea confirmă dimensiunile înainte."] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120 ore", label: "Fereastra de retur publicată" }, { value: "$0.15", label: "Preț fotografie suplimentară" }, { value: "5 pași", label: "Rutină repetabilă" }],
        sourceLabel: "Ghidul de cumpărare și serviciile suplimentare Joyagoo",
        sections: [
          { heading: "Compară mai întâi produsul complet", paragraphs: ["Compară silueta, culoarea și proporțiile cu varianta comandată.", "Păstrează oferta originală deschisă deoarece titlul scurt poate omite detalii."] },
          { heading: "Verifică execuția și simetria", paragraphs: ["Examinează perechi, cusături, lipire, fermoare, imprimeuri, feronerie și închideri din toate unghiurile.", "O imagine frontală poate ascunde deteriorări sau etichete greșite."], callout: { title: "Nu folosi un singur unghi", text: "Compară toate fotografiile înainte de acceptare." } },
          { heading: "Confirmă măsurătorile", paragraphs: ["Eticheta nu este o măsurătoare reală; cere o fotografie cu riglă când mărimea contează.", "Dă o singură instrucțiune clară pentru fiecare fotografie."] },
          { heading: "Înregistrează problema înainte de suport", paragraphs: ["Indică fotografia și defectul vizibil și compară cu specificația vânzătorului.", "Separă defectul obiectiv de preferința personală."] },
          { heading: "Acționează în cinci zile", paragraphs: ["Solicitările eligibile trebuie făcute în cinci zile după finalizarea QC.", "Verifică imediat ce sosește notificarea."] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "Preț publicat pentru preambalare" }, { value: "$0.75", label: "Preț publicat pentru fotografii colet" }, { value: "90 zile", label: "Depozitare gratuită publicată" }],
        sourceLabel: "Ghidul de cumpărare și serviciile suplimentare Joyagoo",
        sections: [
          { heading: "Separă costul produsului de costul coletului", paragraphs: ["Comanda acoperă produsul și transportul intern; cel internațional se alege și plătește după depozitare.", "Un obiect ușor dar voluminos poate costa după volum."] },
          { heading: "Înțelege estimările și dimensiunile finale", paragraphs: ["Coletul normal începe cu o estimare și folosește apoi dimensiunile reale.", "Rutele depind de destinație și restricții."] },
          { heading: "Folosește preambalarea când dimensiunile contează", paragraphs: ["Determină greutatea și dimensiunile înainte de expediere; prețul publicat este $3.", "Ajută la cutii de pantofi, paltoane și colete mixte."], callout: { title: "Când ajută", text: "Folosește serviciul dacă ambalajul schimbă mult volumul taxat." } },
          { heading: "Alege serviciile cu un scop", paragraphs: ["Pot exista îndepărtarea cutiilor, consolidare, asigurare și fotografii la $0.75.", "Fiecare serviciu trebuie să rezolve un risc clar."] },
          { heading: "Folosește depozitarea pentru planificare", paragraphs: ["Ghidul publică 90 de zile gratuite per produs.", "Nu confunda depozitarea cu fereastra de retur mai scurtă."] },
        ],
      },
      returns: {
        facts: [{ value: "5 zile", label: "Fereastra după QC" }, { value: "120 ore", label: "Aceeași fereastră în ore" }, { value: "Regulile vânzătorului", label: "Determină încă eligibilitatea" }],
        sourceLabel: "Politica de retur Joyagoo",
        sections: [
          { heading: "Cronometrul pornește la finalizarea QC", paragraphs: ["Politica pornește fereastra la starea QC finalizat și durează cinci zile sau 120 de ore.", "Depozitarea nu este cronometrul returului."] },
          { heading: "Verifică eligibilitatea articolului", paragraphs: ["Produsele personalizate, deschise, folosite sau fără ambalaj complet pot fi excluse.", "Dacă opțiunea de retur dispare, termenul poate fi depășit."] },
          { heading: "Păstrează ambalajul și starea de revânzare", paragraphs: ["Vânzătorul poate cere un articol nou și revândabil.", "Nu elimina etichete, cutii sau accesorii înainte de decizia QC."], callout: { title: "Regulă practică", text: "Păstrează întregul ambalaj până la acceptarea finală." } },
          { heading: "Înțelege costul returului", paragraphs: ["Regula separă defectele de calitate de retururile fără defect.", "Fără defect, cumpărătorul plătește de obicei transportul; verifică suma actuală."] },
          { heading: "Trimite dovezi utile", paragraphs: ["Descrie problema, indică fotografia QC și compară cu varianta aleasă.", "O cerere clară, ambalaj intact și acțiune rapidă ajută comunicarea."] },
        ],
      },
    },
    policies: {
      about: [{ heading: "Ce publicăm", paragraphs: ["Paginile de produse duc la ofertele corecte; articolele explică căutarea, QC, depozitarea, coletul și termenele."] }, { heading: "Ce nu facem", paragraphs: ["Nu garantăm calitatea, autenticitatea, livrarea, vama sau returul și nu procesăm plăți."] }, { heading: "Relația cu Joyagoo", paragraphs: ["Acest site informativ independent nu aparține și nu este operat de Joyagoo."] }],
      "editorial-policy": [{ heading: "Ierarhia surselor", paragraphs: ["Datele temporale sunt verificate în ghiduri publicate; experiențele comunității nu devin reguli."] }, { heading: "Date și condiții", paragraphs: ["Datele și limitele împiedică prezentarea unei ferestre drept garanție."] }, { heading: "Corecții", paragraphs: ["Când informația publică se schimbă, actualizăm ghidul și data."] }],
      privacy: [{ heading: "Informații gestionate", paragraphs: ["Fără conturi, plăți, comentarii sau fișiere; căutările merg la catalogul desemnat."] }, { heading: "Informații tehnice", paragraphs: ["Găzduirea poate procesa date standard pentru livrarea și protejarea site-ului."] }, { heading: "Site-uri externe", paragraphs: ["Catalogul are propria confidențialitate; acest site nu primește parole sau date de plată introduse acolo."] }],
      terms: [{ heading: "Scop informativ", paragraphs: ["Conținutul ajută la descoperire și educație; nu este contract, garanție sau opinie vamală."] }, { heading: "Produse și servicii externe", paragraphs: ["Stocul, prețul, calitatea, plățile, depozitul și livrarea sunt controlate extern."] }, { heading: "Nume și conținut", paragraphs: ["Numele sunt folosite descriptiv, iar mărcile aparțin titularilor."] }],
    },
  },
  sv: {
    catalogue: {
      names: ["Skidglasögon", "Designerkeps", "Off-White-hoodies — 39 modeller", "Corteiz C Star-tröja — 15 modeller", "NUMERIS höga skor", "HOKA Speedgoat 5 trailskor", "Samsung Galaxy Watch8"],
      labels: ["Accessoarer", "Huvudbonader", "Kläder", "Kläder", "Skor", "Skor", "Elektronik"],
      finds: "fynd",
    },
    homeStats: [{ value: "5 dagar", label: "Typiskt ansökningsfönster efter QC" }, { value: "90 dagar", label: "Publicerad kostnadsfri lagring" }, { value: "$0.15", label: "Publicerat pris per extra detaljbild" }],
    homeStatsNote: "Siffrorna sammanfattar publicerad information kontrollerad i juli 2026. Säljarvillkor, produktens behörighet och aktuella regler gäller fortfarande.",
    article: { home: "Hem", guides: "Guider", researched: "Researchbaserad redaktionell guide", updated: "Uppdaterad 29 juli 2026", independent: "Oberoende av Joyagoo", keyFacts: "Nyckelfakta", inGuide: "I den här guiden", sourceCheck: "Källkontroll", sourceBody: "Guiden har kontrollerats mot publicerad plattformsinformation. Regler och priser kan ändras; bekräfta aktuell information innan tidskritiska beslut.", ready: "REDO ATT UTFORSKA?", ctaTitle: "Använd produktkalkylbladet", ctaBody: "Öppna katalogen, jämför den aktuella annonsen och spara originallänken före beställning.", explore: "Visa produkter ↗" },
    guidesIndex: { intro: "Börja med processen och gå sedan djupare i QC-bevis, paketplanering och tidsbegränsade returer. Publicerade regler hålls skilda från praktiska råd.", returnEyebrow: "RETURFÖNSTER", returnTitle: "Joyagoo-returer förklarade", returnText: "Hur fem dagar, säljarens behörighet och förpackningens skick samverkar." },
    guides: {
      "how-to-buy": {
        facts: [{ value: "2", label: "Huvudsakliga betalningssteg" }, { value: "QC", label: "Granskning före paket" }, { value: "90 dagar", label: "Publicerad gratis lagring" }],
        sourceLabel: "Joyagoos köpguide",
        sections: [
          { heading: "Börja med originalannonsen", paragraphs: ["Kalkylbladet hjälper dig hitta produkter men ersätter inte liveannonsen. Öppna rätt sida, bekräfta variant och spara originallänken.", "Kontrollera färg, storlek, antal, säljarens noter och inrikes frakt igen."], callout: { title: "Före betalning", text: "Den valda varianten måste motsvara produkten du vill köpa." } },
          { heading: "Förstå den första betalningen", paragraphs: ["Den första betalningen täcker produkt och frakt i Kina; sedan köper agenten från säljaren.", "Säljarens leveranstid är skild från agentens arbete."] },
          { heading: "Granska lagrets QC-bilder", paragraphs: ["Jämför färg, form, konstruktion, logotyper, material, sömmar och storlek med den aktuella annonsen.", "Om en detalj saknas, be om en exakt extra bild."] },
          { heading: "Bestäm innan returfönstret stängs", paragraphs: ["Den publicerade regeln anger fem dagar eller 120 timmar efter QC, med säljar- och produktvillkor.", "Anpassade, öppnade eller ofullständiga varor kan undantas."] },
          { heading: "Bygg och betala det internationella paketet", paragraphs: ["Välj varor, destination, rutt och tjänster; internationell frakt betalas separat.", "Normal inlämning börjar med en uppskattning; provpackning fastställer mått i förväg."] },
        ],
      },
      "qc-guide": {
        facts: [{ value: "120 tim.", label: "Publicerat returfönster" }, { value: "$0.15", label: "Pris för extra bild" }, { value: "5 steg", label: "Repeterbar rutin" }],
        sourceLabel: "Joyagoos köpguide och tilläggstjänster",
        sections: [
          { heading: "Jämför hela produkten först", paragraphs: ["Jämför silhuett, färg och proportioner med den beställda varianten.", "Ha originalannonsen öppen eftersom den korta titeln kan utelämna detaljer."] },
          { heading: "Kontrollera konstruktion och symmetri", paragraphs: ["Granska par, sömmar, limning, dragkedjor, tryck, beslag och stängningar från alla vinklar.", "En frontbild kan dölja skador eller fel etikett."], callout: { title: "Använd inte bara en vinkel", text: "Jämför alla lagerbilder före godkännande." } },
          { heading: "Bekräfta mått", paragraphs: ["En storleksetikett är inte ett verkligt mått; be om linjalbild när passform är viktig.", "Ge en tydlig instruktion per bild."] },
          { heading: "Dokumentera problemet före support", paragraphs: ["Ange bild och synligt fel och jämför med säljarens specifikation.", "Skilj objektivt fel från personlig preferens."] },
          { heading: "Agera inom fem dagar", paragraphs: ["Behöriga ansökningar ska lämnas inom fem dagar efter slutförd QC.", "Granska bilderna när meddelandet kommer."] },
        ],
      },
      "shipping-guide": {
        facts: [{ value: "$3", label: "Publicerat pris för provpackning" }, { value: "$0.75", label: "Publicerat pris för paketbilder" }, { value: "90 dagar", label: "Publicerad gratis lagring" }],
        sourceLabel: "Joyagoos köpguide och tilläggstjänster",
        sections: [
          { heading: "Skilj produktkostnad från paketkostnad", paragraphs: ["Beställningen täcker produkt och inrikes frakt; internationell frakt betalas efter lagring.", "En lätt men stor vara kan debiteras efter volym."] },
          { heading: "Förstå uppskattade och slutliga mått", paragraphs: ["Ett normalt paket börjar med en uppskattning och använder verkliga mått efter packning.", "Rutter beror på destination och begränsningar."] },
          { heading: "Använd provpackning när mått är viktiga", paragraphs: ["Den fastställer vikt och mått före frakt; publicerat pris är $3.", "Det hjälper med skokartonger, rockar och blandade paket."], callout: { title: "När det hjälper", text: "Använd om förpackningen tydligt ändrar den debiterade volymen." } },
          { heading: "Välj tjänster med ett syfte", paragraphs: ["Kartongborttagning, förstärkning, försäkring och paketbilder för $0.75 kan finnas.", "Varje tjänst bör lösa en tydlig risk."] },
          { heading: "Använd lagringstiden för planering", paragraphs: ["Guiden publicerar 90 gratis dagar per produkt.", "Blanda inte ihop den med det kortare returfönstret."] },
        ],
      },
      returns: {
        facts: [{ value: "5 dagar", label: "Fönster efter QC" }, { value: "120 tim.", label: "Samma fönster i timmar" }, { value: "Säljarregler", label: "Avgör fortfarande behörighet" }],
        sourceLabel: "Joyagoos returpolicy",
        sections: [
          { heading: "Tiden börjar när QC är klar", paragraphs: ["Policyn startar fönstret vid status QC klar och det varar fem dagar eller 120 timmar.", "Lagringstiden är inte returklockan."] },
          { heading: "Kontrollera produktens behörighet", paragraphs: ["Anpassade, öppnade, använda eller ofullständigt förpackade produkter kan undantas.", "Om returvalet försvinner kan tiden ha löpt ut."] },
          { heading: "Behåll förpackning och säljbart skick", paragraphs: ["Säljaren kan kräva en ny och återförsäljningsbar vara.", "Ta inte bort etiketter, lådor eller tillbehör före QC-beslutet."], callout: { title: "Praktisk regel", text: "Behåll all förpackning till slutligt godkännande." } },
          { heading: "Förstå returkostnaden", paragraphs: ["Regeln skiljer kvalitetsfel från retur utan fel.", "Utan fel betalar köparen vanligtvis frakten; kontrollera aktuellt belopp."] },
          { heading: "Skicka användbara bevis", paragraphs: ["Beskriv problemet, ange QC-bilden och jämför med vald variant.", "Tydlig begäran, intakt förpackning och snabb handling hjälper kommunikationen."] },
        ],
      },
    },
    policies: {
      about: [{ heading: "Vad vi publicerar", paragraphs: ["Produktsidor leder till rätt annonser; artiklar förklarar sökning, QC, lagring, paket och tidsfrister."] }, { heading: "Vad vi inte gör", paragraphs: ["Vi garanterar inte kvalitet, äkthet, frakt, tull eller retur och hanterar inte betalningar."] }, { heading: "Relation till Joyagoo", paragraphs: ["Denna oberoende informationssida ägs eller drivs inte av Joyagoo."] }],
      "editorial-policy": [{ heading: "Källhierarki", paragraphs: ["Tidskänsliga data kontrolleras mot publicerade guider; community-erfarenheter blir inte regler."] }, { heading: "Datum och villkor", paragraphs: ["Datum och begränsningar hindrar att ett fönster framställs som garanti."] }, { heading: "Rättelser", paragraphs: ["När publicerad information ändras uppdaterar vi guide och datum."] }],
      privacy: [{ heading: "Information som hanteras", paragraphs: ["Inga konton, betalningar, kommentarer eller filer; sökningar går till den angivna katalogen."] }, { heading: "Teknisk information", paragraphs: ["Värdtjänsten kan behandla standarddata för att leverera och skydda sidan."] }, { heading: "Externa webbplatser", paragraphs: ["Katalogen har egen integritetspolicy; denna sida får inte lösenord eller betalningsdata som anges där."] }],
      terms: [{ heading: "Informationssyfte", paragraphs: ["Innehållet stöder upptäckt och utbildning; det är inte avtal, garanti eller tullråd."] }, { heading: "Externa produkter och tjänster", paragraphs: ["Lager, pris, kvalitet, betalning, lagerhållning och frakt styrs externt."] }, { heading: "Namn och innehåll", paragraphs: ["Namn används beskrivande och varumärken tillhör sina ägare."] }],
    },
  },
};
