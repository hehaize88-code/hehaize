import type { Locale } from "./site-content";

type ProseSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type ArticlePageContent = {
  label: string;
  title: string;
  intro: string;
  updated: string;
  readTime: string;
  sourceNote: string;
  primaryKeyword: string;
  sections: ProseSection[];
  conclusionTitle: string;
  conclusion: string;
  seoTitle: string;
  seoDescription: string;
};

export type AdditionalArticleRoute =
  | "articles/how-to-buy-from-kameymall-2026"
  | "articles/kameymall-shipping-cost-guide-2026";

export const additionalArticleRoutes: AdditionalArticleRoute[] = [
  "articles/how-to-buy-from-kameymall-2026",
  "articles/kameymall-shipping-cost-guide-2026",
];

const english: Record<AdditionalArticleRoute, ArticlePageContent> = {
  "articles/how-to-buy-from-kameymall-2026": {
    label: "Fact-checked buying guide",
    title: "How to Buy Through KameyMall in 2026",
    intro: "A practical, source-based walkthrough of the agent-shopping process: finding a product, submitting an order, paying the item-stage charges, reviewing QC photos and sending a parcel internationally.",
    updated: "Updated August 3, 2026",
    readTime: "15 minute read",
    sourceNote: "Fact-check basis: KameyMall’s public Shopping Agent Service page, How to Purchase tutorial and FAQ, reviewed August 3, 2026. Published platform statements are identified as policies or targets rather than independent guarantees.",
    primaryKeyword: "how to buy from kameymall",
    sections: [
      {
        heading: "What an agent order actually changes",
        paragraphs: [
          "A shopping agent sits between an overseas shopper and a Chinese marketplace seller. Instead of asking the seller to provide international checkout, foreign payment support and worldwide delivery, the shopper submits the product to the agent. The agent places the domestic order, receives the item at a warehouse and later prepares a separate international parcel. That separation is the most important idea to understand before using KameyMall or reading any KameyMall spreadsheet.",
          "It also explains why the process has two payments and several status changes. The first stage covers the product order and Chinese domestic delivery. The second stage begins after one or more items reach the warehouse and covers the international parcel. A low product price is therefore not a delivered quote, and a product marked purchased is not yet on its way to your address. Treat every stage as a separate checkpoint with its own details to verify.",
        ],
      },
      {
        heading: "Step 1: find the product and confirm the source listing",
        paragraphs: [
          "KameyMall’s published tutorial describes two starting methods. A shopper can copy a product link from a Chinese marketplace and paste it into the search bar, or search by product name and choose from recommended results. The tutorial specifically names Taobao, Tmall and JD.com, while the broader shopping-agent page also mentions Weidian and 1688. Support for a marketplace does not mean every listing will import perfectly, so the parsed result still needs a human check.",
          "Compare the imported title, seller images, variant names, quantity rules and price with the original product you intended to buy. Mobile share links, expired listings and pages with complicated option tables can produce incomplete information. If the automatic result is wrong, do not choose the closest-looking option simply to continue. Save the source link and use the manual agent-order form described in the official process when the listing cannot be captured reliably.",
        ],
      },
      {
        heading: "Step 2: submit an order with unambiguous options",
        paragraphs: [
          "When the product data is captured, select the color, size, version and quantity before adding it to the cart or buying it. Read measurements rather than relying only on familiar size letters. A listing can show one attractive gallery image while the cheapest option belongs to a different version, bundle or material. If a product is sold in sets, confirm whether the displayed price is per unit, per minimum quantity or for the complete set.",
          "The manual order path needs even more care because the agent relies on the information supplied by the shopper. Use exact option wording from the seller page, add a concise note only when necessary and avoid contradictory instructions. For electronics, confirm model and compatibility. For apparel, include the selected measurement or size. For products with several visually similar versions, record the exact variant name and source price so the purchaser can identify the intended item.",
        ],
      },
      {
        heading: "Step 3: understand what the first payment covers",
        paragraphs: [
          "The official How to Purchase tutorial says the item-stage payment includes the product and Chinese local delivery fee. It lists multiple currencies and payment methods, while the shopping-agent overview names international cards such as Visa and Mastercard, PayPal and Alipay. The live checkout is the only reliable place to see which methods, exchange rates and charges are currently available for a particular account, country and order.",
          "Before paying, separate the seller price from domestic delivery and any payment or service line shown at checkout. Keep the CNY amount as a reference even if the interface displays another currency. This makes later comparisons easier and prevents an approximate USD figure on a spreadsheet from being mistaken for the charged total. Promotions and coupons can reduce one component without changing the cost of the international parcel that will be created later.",
        ],
      },
      {
        heading: "Step 4: follow agent purchase and seller dispatch",
        paragraphs: [
          "After payment, KameyMall says its shopping agent contacts the seller and purchases the item. A public FAQ states that sellers commonly dispatch within one to seven days and that the platform generally urges a seller by the third day. If an ordinary item has not shipped after seven days, the FAQ says a shopper can continue waiting or request a refund. Presale timing is different and may be roughly seven to thirty days according to the same page.",
          "These are published process ranges, not guaranteed delivery times. Seller stock, holidays, custom production and incorrect option information can all add delay. Check order messages because the purchaser may request clarification or report a changed price. If tracking does not update, the official FAQ recommends contacting customer service so the shipment information can be investigated. Do not count warehouse arrival from the day you submitted the product; first confirm the actual purchase and seller-dispatch statuses.",
        ],
      },
      {
        heading: "Step 5: use QC photos before the return window closes",
        paragraphs: [
          "KameyMall’s tutorial says items are inspected, photographed and stored after reaching the warehouse. QC photos are useful for checking visible facts: whether the color and quantity match, whether the selected size label is present, whether the item appears damaged and whether included accessories arrived. They do not prove authenticity, hidden construction, long-term durability or exact fit. Compare the photos with the order record rather than with a memory of the seller’s promotional image.",
          "Review the inspection promptly. The public FAQ lists several products that may not be returnable and says the final result can depend on the seller’s response. It also states that returns are not supported after an item has remained in the warehouse for more than five days. If a visible issue matters, submit a clear request while the available window is still open. State the mismatch precisely and attach the relevant listing or option evidence instead of writing only that the item looks wrong.",
        ],
      },
      {
        heading: "Step 6: manage storage and consolidation deliberately",
        paragraphs: [
          "A KameyMall FAQ published in 2024 states that an order can remain in storage for 180 days, with up to 90 days free, and lists extended storage at RMB 10 per month. Those terms can change, so the account countdown should be treated as the current source of truth. Free storage is helpful when several sellers dispatch at different speeds, but it should not encourage shoppers to ignore inspection, return deadlines or a slowly approaching storage expiry.",
          "Consolidation means selecting several stored items for one international parcel. It can avoid repeating some parcel-level costs, yet it does not automatically make every shipment cheaper. More products increase weight, volume and declared value. A single restricted item can also reduce the routes available to the whole parcel. Group items that make sense together, confirm that every item is ready and compare the combined parcel estimate with sensible alternatives before submitting it.",
        ],
      },
      {
        heading: "Step 7: build the international parcel from live data",
        paragraphs: [
          "The official parcel instructions tell shoppers to select items in the warehouse, enter delivery details and choose from the available delivery types. They also mention package removal, reinforcement and insurance as optional services. Route eligibility depends on destination and product characteristics; the tutorial explicitly warns that some items are restricted from certain delivery types. Batteries, liquids, oversized goods and other sensitive categories should never be assumed to qualify for every line.",
          "Use the warehouse weight and dimensions when comparing routes. International freight may be based on actual weight or a volumetric calculation, so a light but bulky box can cost more than its scale weight suggests. Removing retail packaging can reduce volume, while reinforcement can add protection and chargeable weight. Check the address, postal code, selected items, packaging instruction, insurance coverage, route restrictions and estimated charge before paying the second-stage shipping amount.",
        ],
      },
      {
        heading: "A realistic checklist before you submit",
        paragraphs: [
          "A reliable KameyMall workflow is less about clicking quickly and more about keeping each decision attached to evidence. Save the exact source link, confirm the imported option, keep the first-stage cost separate, follow seller dispatch, inspect QC photos promptly and use measured parcel data for the shipping decision. If a page, price or policy has changed since an article was written, the live order interface and account record take priority.",
          "Independent reviews can reveal recurring concerns, but they are not a substitute for current terms. Public feedback has included both positive reports about ordering and support and negative reports about speed, shipping cost and tracking. Those experiences are individual and often depend on destination, route, period and parcel. Use them to form questions—such as asking how a route is charged—not to promise that a future order will repeat somebody else’s result.",
        ],
        bullets: [
          "Keep the exact source URL and selected variant.",
          "Confirm item price and Chinese domestic delivery before the first payment.",
          "Watch messages and seller-dispatch status.",
          "Check QC photos immediately and act within the available return window.",
          "Use the storage countdown rather than relying on an old article.",
          "Compare eligible routes with measured weight, dimensions and packaging choices.",
        ],
      },
    ],
    conclusionTitle: "The useful way to think about KameyMall",
    conclusion: "Treat the service as a sequence of verifiable stages: source listing, agent order, seller delivery, warehouse inspection and international parcel. A spreadsheet helps you reach the right first page; careful checks at every later stage are what make the information useful.",
    seoTitle: "How to Buy From KameyMall in 2026: Full Agent Guide",
    seoDescription: "Learn how to buy through KameyMall: paste product links, pay item-stage costs, track seller dispatch, review QC photos, manage storage and submit shipping.",
  },
  "articles/kameymall-shipping-cost-guide-2026": {
    label: "Cross-border cost guide",
    title: "KameyMall Shipping Cost Guide 2026",
    intro: "A clear method for separating the CNY product price from Chinese domestic delivery, warehouse measurements, packaging, route charges and other costs that shape an international order.",
    updated: "Updated August 3, 2026",
    readTime: "14 minute read",
    sourceNote: "Fact-check basis: KameyMall’s public purchase tutorial, shopping-agent overview and FAQ, reviewed August 3, 2026. No fixed freight quote is presented because route prices depend on live parcel and destination data.",
    primaryKeyword: "kameymall shipping cost",
    sections: [
      {
        heading: "Why the product card is not a delivered-price quote",
        paragraphs: [
          "A product sheet often starts with a CNY seller price and an approximate conversion to US dollars. That is useful for comparing two listings, but it represents only the item-stage reference price. KameyMall’s published buying process separates the product order from the international parcel. The shopper first pays for the item and Chinese local delivery, then pays international freight after the item reaches the warehouse and a parcel is submitted.",
          "The distinction matters because later costs depend on information that does not exist when the product card is first viewed. The warehouse must receive and measure the item; the shopper must choose which stored products to combine, how they should be packed and which eligible route to use. Any page that presents one small converted figure as a guaranteed door-to-door total is hiding important variables rather than simplifying them.",
        ],
      },
      {
        heading: "Layer 1: seller price and currency conversion",
        paragraphs: [
          "Start a cost record with the seller’s live CNY price, selected variant and quantity. Variants can change the amount, and a promotional gallery may display a premium version while the lowest number belongs to a basic option. Reopen the listing before payment because spreadsheet prices can age, seller discounts can end and stock can move to a replacement page. Keep the CNY amount even if the checkout shows another currency.",
          "An approximate USD conversion is a comparison tool, not the platform’s settlement rate. Card networks, wallets and account balances can use different exchange rates or add payment-related charges. KameyMall publicly lists several payment methods, but availability and the final charged amount are shown by the live checkout. Record the actual first payment instead of back-calculating it from a public currency converter and expecting the two numbers to match exactly.",
        ],
      },
      {
        heading: "Layer 2: Chinese domestic delivery and order-stage charges",
        paragraphs: [
          "The official How to Purchase tutorial says the first payment includes the item and Chinese local delivery fee. Domestic delivery moves the product from the marketplace seller to the agent warehouse; it is not international shipping. Some sellers charge nothing, some charge a fixed amount and some vary the fee by region or quantity. If several products come from different sellers, each order can carry its own domestic-delivery line.",
          "Read every line at checkout rather than assuming a general statement such as free service means no transaction cost. Payment conversion, optional services or order-specific adjustments may appear separately. A coupon may reduce one line without affecting seller delivery or future freight. The clean comparison is the complete product-stage payment for the same selected variant, not only the bold seller price shown on a card.",
        ],
      },
      {
        heading: "Layer 3: warehouse weight, dimensions and chargeable weight",
        paragraphs: [
          "International routes usually need actual weight and package dimensions. Actual weight is what the parcel weighs on a scale. Volumetric weight converts the space occupied by a box into a weight-equivalent figure using a route-specific divisor. A carrier can charge the greater of the two. This is why a light puffer jacket, shoe box or large decorative object can produce a higher freight price than a compact item with the same scale weight.",
          "Early product-page weights can be estimates. The warehouse measurement is more useful, and the packed parcel measurement is the number that best reflects the submitted shipment. Compare quotes only after confirming which weight each route uses and whether the estimate will be adjusted after packing. Do not compare one route’s actual-weight price with another route’s volumetric estimate as if the assumptions were identical.",
        ],
      },
      {
        heading: "Layer 4: consolidation and the shape of the parcel",
        paragraphs: [
          "KameyMall promotes transshipment and consolidation: stored items can be combined before international delivery. Consolidation can reduce repeated parcel-level handling and can make better use of a weight band. However, it does not guarantee a lower total. Adding products can push the parcel into a new charge bracket, increase volumetric weight or create a combination that fewer routes accept.",
          "Run a simple comparison. Estimate one combined parcel and compare it with two logical groups, using the same destination and similar service level. Keep fragile goods away from heavy items when protection would require excessive packaging. Consider declared value and customs treatment as well as freight. The cheapest mathematical combination is not always the safest or most flexible parcel.",
        ],
      },
      {
        heading: "Layer 5: packaging choices and value-added services",
        paragraphs: [
          "The official parcel guide mentions package removal, reinforcement and insurance. Removing unnecessary retail packaging may reduce volume, especially for shoes or bulky presentation boxes. Reinforcement can protect fragile goods but adds material and sometimes weight. Simple packaging may be cheaper, yet KameyMall’s FAQ warns that damage caused under simple packaging is not covered by insurance and recommends stronger protection for boxes and shoes.",
          "Choose packaging according to the item rather than selecting every option or none. A soft garment may tolerate simple packaging; a rigid collectible, electronics box or delicate accessory may justify reinforcement. Ask what will be removed and what will remain. If appearance of the retail box matters, do not request its removal just to chase a smaller quote. Treat packaging as part of product condition, not only a freight calculation.",
        ],
      },
      {
        heading: "Layer 6: route eligibility, insurance, tax and customs risk",
        paragraphs: [
          "KameyMall’s instructions say some items are restricted from certain delivery types. Batteries, liquids, oversized products and other sensitive goods can reduce the available routes. Destination also matters: a line offered to one country may not exist for another, and remote-area or address-format rules can change the price. Use the live route list generated for the actual parcel instead of copying a quote from another shopper.",
          "Insurance terms, declared value, taxes and customs outcomes must be read separately from freight. Insurance can have exclusions, evidence requirements and compensation limits. Import tax and customs treatment depend on destination law, shipment contents and declarations; no spreadsheet can guarantee clearance or a tax-free result. Check the route’s current rules and keep order, QC, packing and tracking records in case a claim or enquiry becomes necessary.",
        ],
      },
      {
        heading: "How to compare shipping quotes without fooling yourself",
        paragraphs: [
          "Make every comparison use the same parcel, destination, currency and protection assumptions. Record actual weight, dimensions, chargeable weight, route name, delivery estimate, base freight, packaging choices, insurance and any visible surcharge. Divide the final freight by kilograms only after identifying whether the route charged actual or volumetric weight. A low per-kilogram figure from an unrelated haul is not evidence that your parcel will price the same way.",
          "Public customer reports about KameyMall are mixed: some shoppers have described reasonable delivery costs, while others have complained about high freight or slow handling. Those accounts are useful signals but small, time-specific samples. The strongest decision comes from the quote attached to your packed parcel and a clear understanding of its assumptions. If the amount looks wrong, ask for the measured dimensions and charging method before paying.",
        ],
        bullets: [
          "Record the selected item price in CNY and the actual first-stage payment.",
          "Add each seller’s Chinese domestic-delivery charge.",
          "Wait for warehouse weight and dimensions before treating freight as reliable.",
          "Compare combined and split parcels using the same destination and service level.",
          "Balance package removal against protection and insurance terms.",
          "Use the live eligible-route list and read customs, tax and claim conditions.",
        ],
      },
    ],
    conclusionTitle: "The number that matters is the transparent total",
    conclusion: "Use the spreadsheet price to discover and compare; use checkout and warehouse data to budget. A trustworthy cost plan keeps item price, domestic delivery, parcel measurements, packaging, international freight and risk-related charges visible instead of hiding them inside one optimistic estimate.",
    seoTitle: "KameyMall Shipping Cost Guide 2026: Fees & Freight",
    seoDescription: "Understand KameyMall shipping cost from CNY item price and domestic delivery to warehouse weight, packaging, consolidation, insurance and freight routes.",
  },
};

const german: Record<AdditionalArticleRoute, ArticlePageContent> = {
  "articles/how-to-buy-from-kameymall-2026": {
    label: "Faktengeprüfter Einkaufsratgeber",
    title: "So kaufst du 2026 über KameyMall",
    intro: "Ein praxisnaher Ablauf vom Produktlink über Bestellung und Zahlung bis zu QC-Fotos, Lagerung und internationalem Paket.",
    updated: "Aktualisiert am 3. August 2026",
    readTime: "15 Minuten Lesezeit",
    sourceNote: "Faktenbasis: öffentliche KameyMall-Seiten Shopping Agent Service, How to Purchase und FAQ, geprüft am 3. August 2026. Aussagen der Plattform werden als veröffentlichte Regeln oder Ziele und nicht als unabhängige Garantie bezeichnet.",
    primaryKeyword: "how to buy from kameymall",
    sections: [
      { heading: "Was eine Agentenbestellung verändert", paragraphs: ["Ein Shopping-Agent verbindet Käufer im Ausland mit einem Verkäufer auf einem chinesischen Marktplatz. Der Agent tätigt die Inlandsbestellung, nimmt den Artikel im Lager an und erstellt später ein getrenntes internationales Paket. Deshalb ist eine Produktkarte kein Angebot für die komplette Lieferung bis zur Haustür.", "Der Ablauf hat zwei Zahlungen und mehrere Statusstufen. Zuerst werden Artikel und chinesischer Inlandsversand bezahlt. Erst nach dem Lagereingang wählt der Käufer Verpackung, Paketinhalt und internationale Route. Gekauft bedeutet daher noch nicht international versendet."] },
      { heading: "Schritt 1: Produkt finden und Quelle prüfen", paragraphs: ["Laut KameyMall-Tutorial kann man einen Produktlink einfügen oder nach einem Namen suchen. Genannt werden Taobao, Tmall und JD.com; die Agentenübersicht erwähnt zusätzlich Weidian und 1688. Nicht jede komplexe oder mobile Seite wird fehlerfrei eingelesen.", "Vergleiche importierten Titel, Verkäuferbilder, Varianten, Menge und Preis mit der gewünschten Quelle. Bei einem falschen Ergebnis keine ähnlich aussehende Standardoption wählen. Speichere den Original-Link und nutze bei Bedarf das veröffentlichte manuelle Agentenformular."] },
      { heading: "Schritt 2: Eindeutige Bestelldaten senden", paragraphs: ["Wähle Farbe, Größe, Version und Stückzahl erst nach dem Abgleich. Maße sind verlässlicher als bekannte Buchstaben wie M oder L. Prüfe, ob der niedrigste Preis zu einer anderen Ausführung, einem Zubehörteil oder einer Mindestmenge gehört.", "Bei einer manuellen Bestellung muss der Einkäufer deine Angaben eindeutig verstehen. Übernimm die genaue Variantenbezeichnung, ergänze nur notwendige Hinweise und vermeide widersprüchliche Wünsche. Bei Elektronik sind Modell und Kompatibilität, bei Kleidung Maße und Größe besonders wichtig."] },
      { heading: "Schritt 3: Inhalt der ersten Zahlung verstehen", paragraphs: ["Das offizielle Tutorial ordnet der ersten Zahlung den Artikel und den chinesischen Inlandsversand zu. Die Plattform nennt mehrere Währungen und unter anderem Visa, Mastercard, PayPal und Alipay. Welche Methode, Umrechnung und Gebühr tatsächlich gilt, zeigt nur der aktuelle Checkout.", "Halte Verkäuferpreis, Inlandsversand und weitere sichtbare Positionen getrennt fest. Bewahre den CNY-Referenzwert auch bei einer Zahlung in anderer Währung auf. Ein Gutschein kann einen Posten senken, ohne die spätere internationale Fracht zu verändern."] },
      { heading: "Schritt 4: Einkauf und Verkäuferversand verfolgen", paragraphs: ["Nach der Zahlung kontaktiert der Agent laut Plattform den Verkäufer. Die öffentliche FAQ nennt für normalen Verkäuferversand häufig ein bis sieben Tage und eine Erinnerung ab dem dritten Tag. Nach mehr als sieben Tagen kann man weiter warten oder eine Erstattung anfragen; Vorbestellungen können ungefähr sieben bis dreißig Tage benötigen.", "Das sind veröffentlichte Zeitspannen, keine Garantie. Lagerbestand, Feiertage, Sonderanfertigungen oder Rückfragen können verzögern. Prüfe Nachrichten und Status. Bei fehlenden Trackingdaten empfiehlt die FAQ, den Kundenservice mit den Bestelldaten prüfen zu lassen."] },
      { heading: "Schritt 5: QC-Fotos vor Ablauf der Rückgabefrist nutzen", paragraphs: ["Nach dem Lagereingang sollen Artikel geprüft, fotografiert und eingelagert werden. QC-Fotos können Farbe, Menge, Größenetikett, sichtbare Schäden und Zubehör zeigen. Sie beweisen aber weder Authentizität noch unsichtbare Verarbeitung, Haltbarkeit oder Passform.", "Prüfe schnell. Die FAQ nennt nicht rückgabefähige Kategorien, macht die Entscheidung teilweise vom Verkäufer abhängig und sagt, dass nach mehr als fünf Tagen im Lager keine Rückgabe unterstützt wird. Beschreibe einen konkreten Fehler und füge Belege zur bestellten Option bei."] },
      { heading: "Schritt 6: Lagerzeit und Konsolidierung steuern", paragraphs: ["Eine öffentliche FAQ nennt 180 Tage Gesamtlagerzeit, davon bis zu 90 Tage kostenlos, sowie verlängerte Lagerung für 10 RMB pro Monat. Aktuell zählt jedoch der Countdown im Benutzerkonto. Kostenlose Lagerung darf nicht dazu führen, QC- oder Rückgabefristen zu übersehen.", "Bei der Konsolidierung werden mehrere eingelagerte Artikel kombiniert. Das kann wiederholte Paketkosten sparen, erhöht aber Gewicht, Volumen und Warenwert. Ein eingeschränkter Artikel kann die verfügbaren Linien für das gesamte Paket reduzieren. Vergleiche deshalb eine sinnvolle Gesamt- und Teilpaketlösung."] },
      { heading: "Schritt 7: Internationales Paket mit Live-Daten erstellen", paragraphs: ["Die Anleitung sieht vor, eingelagerte Artikel auszuwählen, Empfängerdaten einzugeben und eine verfügbare Versandart zu wählen. Verpackungsentfernung, Verstärkung und Versicherung werden als Zusatzoptionen genannt. Manche Waren sind von bestimmten Linien ausgeschlossen.", "Vergleiche Routen mit gemessenem Gewicht und Abmessungen. Ein Anbieter kann tatsächliches oder volumetrisches Gewicht berechnen. Weniger Verpackung spart eventuell Volumen, Verstärkung schützt aber und kann Gewicht hinzufügen. Kontrolliere Adresse, Artikel, Verpackung, Versicherung, Einschränkungen und Endbetrag."] },
      { heading: "Realistische Checkliste vor dem Absenden", paragraphs: ["Ein sicherer Ablauf verbindet jede Entscheidung mit einem Beleg: Quelle speichern, Variante bestätigen, erste Kosten trennen, Verkäuferversand verfolgen, QC zeitnah prüfen und erst mit Lagermessungen den internationalen Versand wählen.", "Öffentliche Bewertungen berichten sowohl von guten Bestell- und Supporterfahrungen als auch von Kritik an Tempo, Versandkosten und Tracking. Solche Einzelfälle hängen von Zeitraum, Land, Route und Paket ab. Sie helfen, Fragen zu formulieren, sind aber keine Prognose für die nächste Bestellung."], bullets: ["Quelllink und genaue Variante sichern.", "Artikelpreis und chinesischen Inlandsversand vor der ersten Zahlung prüfen.", "Nachrichten und Verkäuferstatus verfolgen.", "QC-Fotos sofort ansehen und verfügbare Rückgabefrist beachten.", "Aktuellen Lager-Countdown verwenden.", "Routen mit Gewicht, Maßen und Verpackung vergleichen."] },
    ],
    conclusionTitle: "KameyMall als prüfbaren Prozess verstehen",
    conclusion: "Denke in Stufen: Quellangebot, Agentenbestellung, Verkäuferlieferung, Lagerkontrolle und internationales Paket. Die Tabelle führt zum richtigen Startpunkt; die Prüfungen danach machen die Information belastbar.",
    seoTitle: "So kaufst du 2026 über KameyMall: Agenten-Guide",
    seoDescription: "KameyMall Schritt für Schritt: Produktlink, erste Zahlung, Verkäuferversand, QC-Fotos, Lagerzeit, Konsolidierung und internationales Paket.",
  },
  "articles/kameymall-shipping-cost-guide-2026": {
    label: "Ratgeber für grenzüberschreitende Kosten",
    title: "KameyMall Versandkosten 2026 verständlich erklärt",
    intro: "So trennst du CNY-Produktpreis, chinesischen Inlandsversand, Lagermaße, Verpackung und internationale Fracht.",
    updated: "Aktualisiert am 3. August 2026",
    readTime: "14 Minuten Lesezeit",
    sourceNote: "Faktenbasis: öffentliche KameyMall-Kaufanleitung, Agentenübersicht und FAQ, geprüft am 3. August 2026. Es wird kein fixer Frachttarif genannt, da Route, Paket und Ziel die Live-Kosten bestimmen.",
    primaryKeyword: "kameymall shipping cost",
    sections: [
      { heading: "Warum der Kartenpreis kein Lieferpreis ist", paragraphs: ["Eine Tabelle zeigt häufig den CNY-Verkäuferpreis und eine ungefähre USD-Umrechnung. Das hilft beim Vergleich, deckt aber nur die erste Preisstufe ab. Laut veröffentlichtem Ablauf werden Artikel und chinesischer Inlandsversand zuerst, internationale Fracht erst nach dem Lagereingang bezahlt.", "Spätere Kosten hängen von noch unbekannten Daten ab: tatsächlicher Artikel, Kombination mehrerer Waren, Verpackung, Lagermaße, Zielland und zugelassene Route. Eine einzelne kleine Zahl als garantierter Gesamtpreis würde diese Variablen verschweigen."] },
      { heading: "Ebene 1: Verkäuferpreis und Währungsumrechnung", paragraphs: ["Notiere Live-CNY-Preis, Variante und Menge. Optionen können unterschiedliche Beträge haben, Rabatte können enden und Angebote ersetzt werden. Öffne die Quelle vor der Zahlung erneut und bewahre den CNY-Wert auch bei anderer Abrechnungswährung auf.", "Eine USD-Umrechnung im Sheet ist keine garantierte Abrechnungsrate. Karten, Wallets und Guthaben können andere Kurse oder Zahlungspositionen verwenden. Entscheidend ist der aktuelle Checkout und die tatsächlich belastete erste Zahlung."] },
      { heading: "Ebene 2: Chinesischer Inlandsversand", paragraphs: ["Die offizielle Anleitung zählt den Artikel und die chinesische Lieferung zum ersten Zahlungsschritt. Diese Lieferung führt vom Verkäufer zum Lager und ist nicht der internationale Versand. Mehrere Verkäufer können jeweils eigene Inlandsgebühren verursachen.", "Lies alle Checkout-Positionen. Eine Aussage wie kostenloser Service bedeutet nicht automatisch, dass es keine Umrechnung, optionale Leistung oder Bestellanpassung gibt. Vergleiche die komplette erste Zahlung für dieselbe Variante."] },
      { heading: "Ebene 3: Gewicht, Maße und abrechenbares Gewicht", paragraphs: ["Internationale Linien verwenden tatsächliches Gewicht und Paketmaße. Volumetrisches Gewicht wandelt den Platzbedarf mit einem routenspezifischen Faktor in ein Rechengewicht um; berechnet werden kann der höhere Wert. Deshalb kann eine leichte, aber große Schachtel teuer sein.", "Frühe Gewichte sind oft Schätzungen. Lager- und besonders verpackte Paketmaße sind belastbarer. Prüfe, welcher Wert einer Route zugrunde liegt und ob nach dem Packen nachberechnet wird. Vergleiche keine tatsächliche und volumetrische Schätzung ohne gleiche Annahmen."] },
      { heading: "Ebene 4: Konsolidierung und Paketform", paragraphs: ["Konsolidierung fasst eingelagerte Artikel zusammen und kann wiederholte Paketkosten reduzieren. Sie garantiert aber keine Ersparnis: Mehr Inhalt kann eine neue Gewichtsstufe, mehr Volumen, höheren Warenwert oder weniger zulässige Linien bedeuten.", "Vergleiche ein Gesamtpaket mit zwei sinnvollen Gruppen bei gleichem Ziel und ähnlicher Geschwindigkeit. Trenne schwere von empfindlichen Artikeln, wenn sonst sehr viel Schutz nötig wäre. Berücksichtige neben Fracht auch Flexibilität und Risiko."] },
      { heading: "Ebene 5: Verpackung und Zusatzleistungen", paragraphs: ["Die Paketinfo nennt Verpackungsentfernung, Verstärkung und Versicherung. Entfernte Verkaufskartons können Volumen sparen; Verstärkung schützt, fügt aber Material hinzu. Die FAQ warnt, dass Schäden bei einfacher Verpackung nicht von der Versicherung abgedeckt seien.", "Wähle nach Produkt. Weiche Kleidung braucht meist weniger Schutz als Elektronik oder Sammlerstücke. Wenn der Originalkarton wichtig ist, sollte er nicht allein für eine kleinere Schätzung entfernt werden. Verpackung gehört zum Erhaltungszustand des Produkts."] },
      { heading: "Ebene 6: Route, Versicherung, Steuer und Zoll", paragraphs: ["Nicht jedes Produkt ist für jede Linie zugelassen. Batterien, Flüssigkeiten, Übergröße und andere sensible Waren können Routen einschränken. Auch Zielland und abgelegene Adresse beeinflussen Angebot und Preis. Nutze nur die Live-Liste für das konkrete Paket.", "Versicherung, deklarierter Wert, Steuer und Zoll sind von der reinen Fracht zu trennen. Policen können Ausschlüsse und Nachweispflichten haben. Zollfolgen hängen vom Zielland und Inhalt ab; ein Sheet kann weder Freigabe noch Steuerfreiheit garantieren."] },
      { heading: "Versandangebote fair vergleichen", paragraphs: ["Verwende für jeden Vergleich dasselbe Paket, Ziel, Währung und Schutzprofil. Notiere Gewicht, Maße, Rechengewicht, Route, Laufzeit, Fracht, Verpackung, Versicherung und Zuschläge. Berechne einen Kilopreis erst, wenn du die Gewichtsmethode kennst.", "Kundenberichte zu KameyMall sind gemischt: Manche nennen akzeptable Kosten, andere teure Fracht oder langsame Abläufe. Das sind zeit- und routenabhängige Stichproben. Entscheidend sind dein verpacktes Paket und die transparenten Messdaten."], bullets: ["CNY-Preis und echte erste Zahlung notieren.", "Inlandsversand je Verkäufer ergänzen.", "Für Fracht Lagergewicht und Maße abwarten.", "Gesamt- und Teilpakete mit gleichen Annahmen vergleichen.", "Verpackungsersparnis gegen Schutz abwägen.", "Live-Routen sowie Zoll- und Versicherungsbedingungen lesen."] },
    ],
    conclusionTitle: "Der transparente Gesamtbetrag zählt",
    conclusion: "Nutze den Tabellenpreis zum Finden und Vergleichen, den Checkout und die Lagerdaten zum Budgetieren. Ein seriöser Kostenplan zeigt Artikel, Inlandslieferung, Maße, Verpackung, internationale Fracht und Risiken getrennt.",
    seoTitle: "KameyMall Versandkosten 2026: Gebühren & Fracht",
    seoDescription: "KameyMall Versandkosten verstehen: CNY-Preis, chinesische Lieferung, Lagergewicht, Volumengewicht, Verpackung, Konsolidierung und internationale Route.",
  },
};

const french: Record<AdditionalArticleRoute, ArticlePageContent> = {
  "articles/how-to-buy-from-kameymall-2026": {
    label: "Guide d’achat vérifié",
    title: "Comment acheter via KameyMall en 2026",
    intro: "Un parcours pratique fondé sur les sources publiques : trouver un produit, commander, payer, contrôler les photos QC, gérer le stockage et envoyer le colis.",
    updated: "Mis à jour le 3 août 2026",
    readTime: "15 minutes de lecture",
    sourceNote: "Vérification : pages publiques Shopping Agent Service, How to Purchase et FAQ de KameyMall, consultées le 3 août 2026. Les déclarations de la plateforme sont présentées comme règles ou objectifs publiés, jamais comme garanties indépendantes.",
    primaryKeyword: "how to buy from kameymall",
    sections: [
      { heading: "Ce que change une commande par agent", paragraphs: ["Un agent d’achat relie un acheteur international à un vendeur d’une marketplace chinoise. Il passe la commande nationale, reçoit l’article dans un entrepôt puis prépare un colis international distinct. Le prix d’une fiche produit ne représente donc pas le coût livré à domicile.", "Le processus comporte deux paiements et plusieurs statuts. Le premier couvre l’article et la livraison chinoise. Le second intervient après l’arrivée en entrepôt, lorsque l’acheteur choisit les articles, l’emballage et la ligne internationale. Le statut acheté ne signifie pas encore expédié à l’étranger."] },
      { heading: "Étape 1 : trouver le produit et vérifier la source", paragraphs: ["Le tutoriel publié indique que l’on peut coller un lien ou chercher un nom de produit. Il cite Taobao, Tmall et JD.com ; la présentation du service mentionne aussi Weidian et 1688. Une page mobile, complexe ou expirée peut être mal importée.", "Comparez titre, photos vendeur, variantes, quantité et prix avec la source voulue. Si le résultat automatique est incorrect, n’acceptez pas l’option qui ressemble le plus. Conservez le lien d’origine et utilisez le formulaire manuel d’achat par agent lorsque la fiche ne peut pas être lue correctement."] },
      { heading: "Étape 2 : transmettre des options sans ambiguïté", paragraphs: ["Sélectionnez couleur, taille, version et quantité après contrôle. Lisez les mesures au lieu de vous fier seulement aux lettres S, M ou L. Le prix le plus bas peut correspondre à une autre version, un accessoire ou une quantité minimale.", "Dans une commande manuelle, reprenez le libellé exact de la variante et ajoutez uniquement une remarque utile. Pour l’électronique, confirmez modèle et compatibilité ; pour les vêtements, taille et mesures. Une consigne claire évite que l’acheteur choisisse une option visuellement proche mais différente."] },
      { heading: "Étape 3 : comprendre le premier paiement", paragraphs: ["Le guide officiel associe le premier paiement à l’article et à la livraison locale chinoise. KameyMall affiche plusieurs devises et cite notamment Visa, Mastercard, PayPal et Alipay. Seul le paiement en direct confirme les méthodes, le taux et les frais disponibles pour le compte et le pays concernés.", "Séparez prix vendeur, livraison nationale et autres lignes visibles. Gardez le montant CNY comme référence, même si vous payez dans une autre devise. Un coupon peut réduire une composante sans modifier le fret international qui sera calculé plus tard."] },
      { heading: "Étape 4 : suivre l’achat et l’envoi du vendeur", paragraphs: ["Après paiement, l’agent contacte le vendeur. Une FAQ publique indique que l’expédition vendeur prend généralement un à sept jours et qu’une relance est normalement faite au troisième jour. Après sept jours, l’acheteur peut attendre ou demander un remboursement ; une précommande peut demander environ sept à trente jours.", "Ces délais publiés ne sont pas des garanties. Stock, jours fériés, fabrication spéciale ou demande d’information peuvent ralentir l’ordre. Vérifiez les messages. Si le suivi n’évolue pas, la FAQ conseille de communiquer les données de commande au service client pour enquête."] },
      { heading: "Étape 5 : utiliser les photos QC avant la limite de retour", paragraphs: ["À l’arrivée, la plateforme dit inspecter, photographier et stocker l’article. Les photos QC servent à vérifier couleur, quantité, étiquette de taille, dommages visibles et accessoires. Elles ne prouvent ni authenticité, ni défaut caché, ni durabilité, ni coupe exacte.", "Contrôlez rapidement. La FAQ liste des catégories non retournables, précise que la réponse finale peut dépendre du vendeur et indique qu’un retour n’est plus pris en charge après plus de cinq jours en entrepôt. Décrivez précisément l’écart et joignez la preuve de l’option commandée."] },
      { heading: "Étape 6 : gérer stockage et consolidation", paragraphs: ["Une FAQ annonce 180 jours de stockage total, dont jusqu’à 90 gratuits, ainsi qu’une prolongation à 10 RMB par mois. Les conditions pouvant évoluer, le compteur du compte reste la référence actuelle. Le stockage gratuit ne doit pas faire oublier les délais QC et retour.", "La consolidation réunit plusieurs articles dans un colis. Elle peut éviter des coûts répétés, mais augmente poids, volume et valeur. Un article restreint peut réduire les lignes de tout le colis. Comparez un colis groupé avec des groupes logiques avant de décider."] },
      { heading: "Étape 7 : créer le colis avec les données réelles", paragraphs: ["Les instructions demandent de sélectionner les articles stockés, saisir la destination et choisir une ligne éligible. Retrait d’emballage, renforcement et assurance sont proposés comme options. Certains produits sont refusés par certaines lignes.", "Comparez avec le poids et les dimensions mesurés. Le transporteur peut facturer le poids réel ou volumétrique. Retirer une boîte réduit parfois le volume ; renforcer protège mais ajoute de la matière. Vérifiez adresse, contenu, emballage, assurance, restrictions et total avant le second paiement."] },
      { heading: "Checklist réaliste avant validation", paragraphs: ["Reliez chaque décision à une preuve : enregistrez la source, confirmez la variante, séparez le premier coût, suivez le vendeur, examinez le QC rapidement et utilisez les mesures de l’entrepôt pour le transport international.", "Les avis publics sont partagés : certains décrivent une bonne commande ou un support réactif, d’autres critiquent lenteur, prix d’expédition ou suivi. Ces expériences dépendent du pays, de la ligne, de la période et du colis. Elles servent à poser de meilleures questions, pas à prédire votre résultat."], bullets: ["Conserver le lien source et la variante exacte.", "Vérifier article et livraison chinoise avant le premier paiement.", "Surveiller messages et statut vendeur.", "Contrôler immédiatement les photos QC et le délai de retour.", "Suivre le compteur de stockage du compte.", "Comparer les lignes avec poids, dimensions et emballage."] },
    ],
    conclusionTitle: "Considérer KameyMall comme un processus vérifiable",
    conclusion: "Raisonnez par étapes : annonce source, commande agent, envoi vendeur, contrôle en entrepôt et colis international. La feuille ouvre la bonne porte ; les vérifications suivantes rendent la décision plus fiable.",
    seoTitle: "Comment acheter sur KameyMall en 2026 : guide complet",
    seoDescription: "Guide KameyMall : lien produit, premier paiement, envoi vendeur, photos QC, stockage, consolidation et soumission du colis international.",
  },
  "articles/kameymall-shipping-cost-guide-2026": {
    label: "Guide des coûts transfrontaliers",
    title: "Coût d’expédition KameyMall en 2026",
    intro: "Une méthode claire pour séparer prix CNY, livraison chinoise, mesures d’entrepôt, emballage et fret international.",
    updated: "Mis à jour le 3 août 2026",
    readTime: "14 minutes de lecture",
    sourceNote: "Vérification : tutoriel d’achat, présentation du service agent et FAQ publics de KameyMall, consultés le 3 août 2026. Aucun tarif fixe n’est annoncé, car le colis, la ligne et la destination déterminent le prix en direct.",
    primaryKeyword: "kameymall shipping cost",
    sections: [
      { heading: "Pourquoi la fiche produit n’est pas un prix livré", paragraphs: ["Une feuille affiche souvent le prix CNY et une conversion USD approximative. C’est utile pour comparer, mais le processus publié sépare l’achat du produit du colis international : article et livraison chinoise sont payés d’abord, fret après réception en entrepôt.", "Les coûts suivants dépendent de données encore inconnues : article reçu, combinaison de produits, emballage, mesures, pays et ligne éligible. Présenter la petite conversion initiale comme total garanti masquerait ces variables."] },
      { heading: "Niveau 1 : prix vendeur et change", paragraphs: ["Notez prix CNY en direct, variante et quantité. Les options modifient le montant, les promotions finissent et les liens peuvent être remplacés. Rouvrez la fiche avant paiement et conservez le montant CNY même avec une autre devise d’affichage.", "La conversion USD du guide n’est pas le taux de règlement. Carte, portefeuille ou solde peuvent appliquer un autre taux ou des frais. Le checkout actuel et le montant réellement débité sont les seules références pour le premier paiement."] },
      { heading: "Niveau 2 : livraison nationale chinoise", paragraphs: ["Le tutoriel inclut article et livraison locale dans la première étape. Cette livraison va du vendeur à l’entrepôt, pas à l’étranger. Plusieurs vendeurs peuvent donc créer plusieurs frais nationaux.", "Lisez chaque ligne du paiement. Un service présenté comme gratuit n’exclut pas nécessairement conversion, option ou ajustement propre à la commande. Comparez le paiement complet pour la même variante."] },
      { heading: "Niveau 3 : poids, dimensions et poids taxable", paragraphs: ["Les lignes internationales utilisent poids réel et dimensions. Le poids volumétrique transforme l’espace d’un carton en équivalent poids selon un diviseur propre à la ligne ; le transporteur peut facturer le plus élevé. Une boîte légère mais grande peut donc coûter cher.", "Les poids de la fiche sont souvent estimés. Les mesures d’entrepôt et du colis emballé sont plus solides. Demandez quelle méthode la ligne applique et si le montant sera ajusté après emballage. Comparez toujours sur les mêmes hypothèses."] },
      { heading: "Niveau 4 : consolidation et forme du colis", paragraphs: ["Réunir des articles peut réduire certains coûts répétés, mais ne garantit pas une économie. Le colis peut changer de tranche, devenir volumineux, augmenter sa valeur ou perdre des lignes à cause d’un article restreint.", "Comparez un colis unique à deux groupes cohérents, avec même destination et niveau de service. Séparez les objets lourds et fragiles quand leur association exige trop de protection. Le choix le moins cher n’est pas toujours le plus souple."] },
      { heading: "Niveau 5 : emballage et options", paragraphs: ["Les informations publiques citent retrait d’emballage, renforcement et assurance. Retirer une boîte peut diminuer le volume ; renforcer ajoute protection et parfois poids. La FAQ avertit que les dommages sous emballage simple ne sont pas couverts par l’assurance.", "Choisissez selon le produit. Un vêtement souple n’a pas les besoins d’un objet électronique ou de collection. Si l’état de la boîte compte, ne la supprimez pas uniquement pour réduire une estimation."] },
      { heading: "Niveau 6 : ligne, assurance, taxes et douane", paragraphs: ["Tous les produits ne passent pas par toutes les lignes. Batteries, liquides, surdimensionné et autres catégories sensibles réduisent les choix. Pays et zone éloignée influencent aussi offre et prix. Utilisez la liste en direct du colis réel.", "Assurance, valeur déclarée, taxe et douane sont distinctes du fret. Une assurance comporte exclusions et preuves. La douane dépend du pays, du contenu et de la déclaration ; aucune feuille ne peut garantir dédouanement ou absence de taxe."] },
      { heading: "Comparer les devis sans se tromper", paragraphs: ["Utilisez le même colis, la même destination, devise et protection. Notez poids, dimensions, poids facturable, ligne, délai, fret, emballage, assurance et supplément. Ne calculez un prix au kilo qu’après avoir identifié la méthode de poids.", "Les témoignages sur KameyMall sont mixtes : certains trouvent les coûts raisonnables, d’autres le fret élevé ou le traitement lent. Ce sont de petits échantillons liés à une période et une route. Votre colis emballé et ses mesures restent la base la plus forte."], bullets: ["Noter prix CNY et premier paiement réel.", "Ajouter la livraison chinoise de chaque vendeur.", "Attendre poids et dimensions d’entrepôt.", "Comparer colis groupé et séparé avec les mêmes hypothèses.", "Arbitrer retrait de boîte, protection et assurance.", "Lire lignes en direct, douane et conditions de réclamation."] },
    ],
    conclusionTitle: "Le total transparent est le bon chiffre",
    conclusion: "Utilisez le prix de la feuille pour découvrir et comparer, puis le checkout et l’entrepôt pour budgéter. Un calcul fiable garde visibles produit, livraison chinoise, mesures, emballage, fret et risques.",
    seoTitle: "Coût d’expédition KameyMall 2026 : frais et fret",
    seoDescription: "Comprendre le coût KameyMall : prix CNY, livraison chinoise, poids réel et volumétrique, emballage, consolidation, assurance et lignes internationales.",
  },
};

const spanish: Record<AdditionalArticleRoute, ArticlePageContent> = {
  "articles/how-to-buy-from-kameymall-2026": {
    label: "Guía de compra verificada",
    title: "Cómo comprar mediante KameyMall en 2026",
    intro: "Un recorrido práctico y documentado: encontrar un producto, enviar el pedido, pagar, revisar fotos QC, gestionar el almacén y preparar el paquete internacional.",
    updated: "Actualizado el 3 de agosto de 2026",
    readTime: "15 minutos de lectura",
    sourceNote: "Base de verificación: páginas públicas Shopping Agent Service, How to Purchase y FAQ de KameyMall, revisadas el 3 de agosto de 2026. Las afirmaciones de la plataforma se presentan como políticas u objetivos publicados, no como garantías independientes.",
    primaryKeyword: "how to buy from kameymall",
    sections: [
      { heading: "Qué cambia al comprar con un agente", paragraphs: ["Un agente conecta al comprador internacional con un vendedor de una plataforma china. Realiza la compra nacional, recibe el artículo en un almacén y después crea un paquete internacional separado. Por eso el precio de una ficha no es el coste entregado en tu domicilio.", "El proceso tiene dos pagos y varios estados. Primero se pagan producto y entrega nacional china. Tras la llegada al almacén se eligen artículos, embalaje y ruta internacional. Un pedido marcado como comprado aún no está viajando a tu país."] },
      { heading: "Paso 1: encontrar el producto y confirmar la fuente", paragraphs: ["El tutorial publicado permite pegar un enlace o buscar por nombre. Cita Taobao, Tmall y JD.com, mientras la presentación del agente también menciona Weidian y 1688. Las páginas móviles, complejas o caducadas no siempre se importan bien.", "Compara título, imágenes, variantes, cantidad y precio con la fuente que querías. Si el resultado automático es incorrecto, no elijas la opción más parecida para avanzar. Guarda el enlace original y usa el formulario manual indicado por la plataforma."] },
      { heading: "Paso 2: enviar opciones sin ambigüedad", paragraphs: ["Selecciona color, talla, versión y cantidad después de comprobarlos. Lee las medidas, no solo letras conocidas. El importe más bajo puede corresponder a otra versión, un accesorio o una cantidad mínima.", "En un pedido manual copia el nombre exacto de la variante y añade solo una observación necesaria. Para electrónica confirma modelo y compatibilidad; para ropa, talla y medidas. Una instrucción precisa evita que el comprador seleccione una opción visualmente similar pero distinta."] },
      { heading: "Paso 3: entender el primer pago", paragraphs: ["La guía oficial vincula el primer pago al artículo y al envío local chino. KameyMall muestra varias monedas y menciona Visa, Mastercard, PayPal y Alipay, entre otros métodos. Solo el checkout en vivo confirma disponibilidad, cambio y cargos para una cuenta y país.", "Separa precio del vendedor, entrega nacional y otras líneas visibles. Conserva el CNY como referencia aunque pagues en otra moneda. Un cupón puede reducir una parte sin cambiar el transporte internacional que se calculará después."] },
      { heading: "Paso 4: seguir la compra y el envío del vendedor", paragraphs: ["Después del pago el agente contacta al vendedor. Una FAQ pública dice que el vendedor suele enviar en uno a siete días y que normalmente se le recuerda al tercer día. Tras siete días se puede seguir esperando o pedir reembolso; una preventa puede tardar aproximadamente de siete a treinta días.", "Son rangos publicados, no garantías. Stock, festivos, fabricación o dudas sobre la opción pueden retrasar el pedido. Revisa mensajes y estados. Si el seguimiento no avanza, la FAQ recomienda facilitar los datos a atención al cliente para investigarlo."] },
      { heading: "Paso 5: usar las fotos QC antes del límite de devolución", paragraphs: ["Al llegar, KameyMall dice inspeccionar, fotografiar y almacenar el producto. Las fotos QC permiten revisar color, cantidad, etiqueta de talla, daños visibles y accesorios. No demuestran autenticidad, defectos internos, durabilidad o ajuste exacto.", "Revísalas pronto. La FAQ enumera productos no retornables, indica que la decisión puede depender del vendedor y dice que no se admite devolución después de más de cinco días en almacén. Describe el problema exacto y adjunta la prueba de la variante pedida."] },
      { heading: "Paso 6: controlar almacenamiento y consolidación", paragraphs: ["Una FAQ señala 180 días de almacenamiento total, hasta 90 gratuitos, y una ampliación de 10 RMB al mes. Como las condiciones cambian, el contador de la cuenta es la referencia actual. El tiempo gratuito no debe ocultar los plazos de QC y devolución.", "Consolidar reúne varios productos. Puede evitar costes repetidos, pero aumenta peso, volumen y valor. Un artículo restringido puede reducir las líneas de todo el paquete. Compara un envío conjunto con grupos lógicos antes de decidir."] },
      { heading: "Paso 7: crear el paquete con datos reales", paragraphs: ["Las instrucciones piden seleccionar artículos almacenados, introducir destino y escoger una ruta disponible. Retirada de embalaje, refuerzo y seguro aparecen como servicios opcionales. Algunos productos no pueden usar determinadas líneas.", "Compara con peso y dimensiones medidos. La ruta puede facturar peso real o volumétrico. Quitar cajas reduce volumen; reforzar protege pero añade material. Confirma dirección, contenido, embalaje, seguro, restricciones y total antes del segundo pago."] },
      { heading: "Lista realista antes de confirmar", paragraphs: ["Vincula cada decisión a una prueba: conserva la fuente, confirma la variante, separa el coste inicial, sigue al vendedor, revisa QC pronto y usa las medidas de almacén para el envío internacional.", "Las opiniones públicas son mixtas: hay relatos positivos sobre compra y soporte y quejas sobre lentitud, coste o seguimiento. Dependen del país, línea, momento y paquete. Sirven para formular preguntas, no para prometer el resultado de otro pedido."], bullets: ["Guardar enlace fuente y variante exacta.", "Comprobar producto y entrega china antes del primer pago.", "Vigilar mensajes y estado del vendedor.", "Revisar QC enseguida y actuar dentro del plazo disponible.", "Usar el contador de almacén actual.", "Comparar rutas con peso, dimensiones y embalaje."] },
    ],
    conclusionTitle: "Entender KameyMall como un proceso verificable",
    conclusion: "Piensa en etapas: ficha fuente, pedido del agente, envío del vendedor, control de almacén y paquete internacional. La hoja te lleva al punto correcto; las comprobaciones posteriores dan valor real a la información.",
    seoTitle: "Cómo comprar en KameyMall en 2026: guía completa",
    seoDescription: "Aprende a comprar con KameyMall: enlace, primer pago, envío del vendedor, fotos QC, almacenamiento, consolidación y paquete internacional.",
  },
  "articles/kameymall-shipping-cost-guide-2026": {
    label: "Guía de costes transfronterizos",
    title: "Coste de envío de KameyMall en 2026",
    intro: "Cómo separar el precio CNY del producto, la entrega china, las medidas de almacén, el embalaje y el transporte internacional.",
    updated: "Actualizado el 3 de agosto de 2026",
    readTime: "14 minutos de lectura",
    sourceNote: "Base de verificación: tutorial de compra, presentación del agente y FAQ públicos de KameyMall, revisados el 3 de agosto de 2026. No se ofrece una tarifa fija porque el paquete, la ruta y el destino determinan el precio en vivo.",
    primaryKeyword: "kameymall shipping cost",
    sections: [
      { heading: "Por qué la ficha no muestra el precio entregado", paragraphs: ["Una hoja suele mostrar precio CNY y conversión USD aproximada. Ayuda a comparar, pero el proceso publicado separa el pedido del paquete: artículo y envío local chino se pagan primero; el transporte internacional, después de la llegada al almacén.", "Los costes posteriores dependen del producto recibido, combinación, embalaje, medidas, país y ruta elegible. Presentar la pequeña cifra inicial como total garantizado ocultaría esas variables."] },
      { heading: "Capa 1: precio del vendedor y cambio", paragraphs: ["Anota precio CNY en vivo, variante y cantidad. Las opciones cambian el importe, las promociones terminan y los enlaces se sustituyen. Reabre la fuente antes de pagar y conserva el CNY aunque el checkout muestre otra moneda.", "La conversión USD de la hoja no es el tipo de liquidación. Tarjeta, monedero o saldo pueden aplicar otro cambio o cargos. La referencia es el checkout actual y el primer pago realmente cobrado."] },
      { heading: "Capa 2: envío nacional chino", paragraphs: ["El tutorial incluye producto y entrega local en la primera etapa. Esa entrega va del vendedor al almacén, no al extranjero. Varios vendedores pueden generar varios cargos nacionales.", "Lee cada línea. Que un servicio se anuncie gratis no elimina necesariamente conversión, opción o ajuste del pedido. Compara el pago inicial completo para la misma variante."] },
      { heading: "Capa 3: peso, dimensiones y peso facturable", paragraphs: ["Las rutas internacionales usan peso real y medidas. El peso volumétrico convierte el espacio de la caja en peso mediante un divisor de la ruta, y puede cobrarse el mayor. Una caja ligera pero grande puede resultar cara.", "Los pesos tempranos suelen ser estimaciones. Las medidas de almacén y del paquete embalado son más fiables. Comprueba el método de cada línea y si habrá ajuste tras embalar. Compara siempre con supuestos iguales."] },
      { heading: "Capa 4: consolidación y forma del paquete", paragraphs: ["Unir artículos puede reducir costes repetidos, pero no garantiza ahorro. El paquete puede subir de tramo, ganar volumen y valor o perder rutas por un producto restringido.", "Compara un paquete conjunto con dos grupos coherentes usando el mismo destino y nivel de servicio. Separa objetos pesados y frágiles si su combinación exige demasiado refuerzo. La opción más barata no siempre es la más segura."] },
      { heading: "Capa 5: embalaje y servicios", paragraphs: ["La información pública menciona retirada de cajas, refuerzo y seguro. Quitar embalaje reduce volumen; reforzar protege y puede añadir peso. La FAQ advierte que el daño bajo embalaje simple no está cubierto por el seguro.", "Elige según el producto. La ropa blanda y un objeto electrónico no requieren lo mismo. Si importa la caja original, no la elimines solo para reducir una estimación. El embalaje también forma parte del estado del producto."] },
      { heading: "Capa 6: ruta, seguro, impuestos y aduanas", paragraphs: ["No todos los productos usan todas las líneas. Baterías, líquidos, gran tamaño y otras categorías reducen opciones. País y zona remota también influyen. Usa la lista en vivo del paquete real.", "Seguro, valor declarado, impuestos y aduanas son distintos del flete. Las pólizas tienen exclusiones y pruebas. El resultado aduanero depende del destino y contenido; ninguna hoja puede garantizar despacho o ausencia de impuestos."] },
      { heading: "Comparar presupuestos correctamente", paragraphs: ["Usa el mismo paquete, destino, moneda y protección. Anota peso, medidas, peso facturable, línea, plazo, flete, embalaje, seguro y recargos. No calcules precio por kilo hasta conocer el método de peso.", "Los comentarios sobre KameyMall son mixtos: algunos consideran razonables los costes y otros critican flete alto o lentitud. Son muestras pequeñas ligadas a una fecha y ruta. Tu paquete embalado y sus medidas son la base más fuerte."], bullets: ["Anotar CNY y primer pago real.", "Añadir entrega china de cada vendedor.", "Esperar peso y dimensiones de almacén.", "Comparar paquete unido y dividido con iguales supuestos.", "Equilibrar retirada, protección y seguro.", "Leer rutas en vivo, aduanas y condiciones de reclamación."] },
    ],
    conclusionTitle: "Importa el total transparente",
    conclusion: "Usa el precio de la hoja para descubrir y comparar, y checkout y almacén para presupuestar. Un cálculo fiable mantiene visibles producto, entrega china, medidas, embalaje, flete y riesgo.",
    seoTitle: "Coste de envío KameyMall 2026: tarifas y flete",
    seoDescription: "Entiende el coste de KameyMall: precio CNY, envío chino, peso real y volumétrico, embalaje, consolidación, seguro y rutas internacionales.",
  },
};

const italian: Record<AdditionalArticleRoute, ArticlePageContent> = {
  "articles/how-to-buy-from-kameymall-2026": {
    label: "Guida all’acquisto verificata",
    title: "Come acquistare tramite KameyMall nel 2026",
    intro: "Un percorso pratico basato su fonti pubbliche: trovare il prodotto, inviare l’ordine, pagare, controllare le foto QC, gestire il deposito e spedire il pacco.",
    updated: "Aggiornato il 3 agosto 2026",
    readTime: "15 minuti di lettura",
    sourceNote: "Base della verifica: pagine pubbliche Shopping Agent Service, How to Purchase e FAQ di KameyMall, consultate il 3 agosto 2026. Le dichiarazioni della piattaforma sono indicate come regole o obiettivi pubblicati, non come garanzie indipendenti.",
    primaryKeyword: "how to buy from kameymall",
    sections: [
      { heading: "Cosa cambia con un ordine tramite agente", paragraphs: ["Un agente collega l’acquirente internazionale a un venditore su un marketplace cinese. Effettua l’ordine nazionale, riceve l’articolo in magazzino e prepara in seguito un pacco internazionale separato. Il prezzo della scheda non è quindi il costo consegnato a casa.", "Il processo comprende due pagamenti e più stati. Prima si pagano prodotto e consegna nazionale cinese. Dopo l’arrivo in magazzino si scelgono articoli, imballaggio e linea internazionale. Acquistato non significa ancora spedito all’estero."] },
      { heading: "Passo 1: trovare il prodotto e verificare la fonte", paragraphs: ["Il tutorial pubblicato permette di incollare un link o cercare per nome. Cita Taobao, Tmall e JD.com; la panoramica del servizio menziona anche Weidian e 1688. Pagine mobili, complesse o scadute possono essere importate male.", "Confronta titolo, immagini del venditore, varianti, quantità e prezzo con la fonte desiderata. Se il risultato automatico è errato, non scegliere l’opzione più simile. Conserva il link originale e usa il modulo manuale previsto dal flusso ufficiale."] },
      { heading: "Passo 2: inviare opzioni precise", paragraphs: ["Seleziona colore, taglia, versione e quantità solo dopo il controllo. Leggi le misure e non affidarti alle sole lettere. Il prezzo più basso può riferirsi a un’altra versione, a un accessorio o a una quantità minima.", "Nel modulo manuale usa il nome esatto della variante e una nota solo se necessaria. Per l’elettronica conferma modello e compatibilità; per l’abbigliamento taglia e misure. Istruzioni chiare evitano una scelta visivamente simile ma diversa."] },
      { heading: "Passo 3: capire il primo pagamento", paragraphs: ["La guida ufficiale associa il primo pagamento al prodotto e alla consegna locale cinese. KameyMall mostra più valute e cita Visa, Mastercard, PayPal e Alipay. Il checkout live conferma metodi, cambio e costi disponibili per account e paese.", "Separa prezzo del venditore, spedizione nazionale e altre voci. Mantieni il valore CNY come riferimento anche pagando in un’altra valuta. Un coupon può ridurre una parte senza cambiare il trasporto internazionale calcolato in seguito."] },
      { heading: "Passo 4: seguire acquisto e spedizione del venditore", paragraphs: ["Dopo il pagamento l’agente contatta il venditore. Una FAQ pubblica indica normalmente da uno a sette giorni e un sollecito al terzo giorno. Dopo sette giorni si può attendere o chiedere rimborso; un preordine può richiedere circa sette-trenta giorni.", "Sono intervalli pubblicati, non garanzie. Stock, festività, produzione o dubbi sulla variante possono rallentare. Controlla messaggi e stato. Se il tracking non avanza, la FAQ consiglia di far verificare i dati al servizio clienti."] },
      { heading: "Passo 5: usare le foto QC entro il limite di reso", paragraphs: ["All’arrivo, KameyMall dichiara di ispezionare, fotografare e conservare l’articolo. Le foto QC aiutano a verificare colore, quantità, etichetta taglia, danni visibili e accessori. Non provano autenticità, difetti nascosti, durata o vestibilità.", "Controlla subito. La FAQ elenca categorie non restituibili, fa dipendere alcuni esiti dal venditore e dice che il reso non è supportato dopo più di cinque giorni in magazzino. Descrivi il problema preciso e allega la prova dell’opzione ordinata."] },
      { heading: "Passo 6: gestire deposito e consolidamento", paragraphs: ["Una FAQ indica 180 giorni totali, fino a 90 gratuiti, e deposito esteso a 10 RMB al mese. Poiché le condizioni cambiano, il conto alla rovescia nell’account è la fonte attuale. Il periodo gratuito non deve far perdere le scadenze QC e reso.", "Il consolidamento unisce più articoli. Può evitare costi ripetuti, ma aumenta peso, volume e valore. Un prodotto limitato può ridurre le linee per tutto il pacco. Confronta una spedizione unica con gruppi logici."] },
      { heading: "Passo 7: creare il pacco con dati reali", paragraphs: ["Le istruzioni chiedono di selezionare gli articoli in deposito, inserire la destinazione e scegliere una linea disponibile. Rimozione imballo, rinforzo e assicurazione sono opzioni. Alcuni prodotti non possono usare determinate linee.", "Confronta peso e misure rilevati. La linea può fatturare peso reale o volumetrico. Rimuovere scatole riduce il volume; rinforzare protegge ma aggiunge materiale. Verifica indirizzo, contenuto, imballo, assicurazione, restrizioni e totale."] },
      { heading: "Checklist realistica prima dell’invio", paragraphs: ["Collega ogni decisione a una prova: salva la fonte, conferma la variante, separa il primo costo, segui il venditore, controlla subito il QC e usa i dati di magazzino per la spedizione internazionale.", "Le recensioni pubbliche sono miste: alcune descrivono ordini e assistenza positivi, altre lentezza, costo o tracking problematico. Dipendono da paese, linea, periodo e pacco. Servono a formulare domande, non a garantire lo stesso risultato."], bullets: ["Salvare link fonte e variante esatta.", "Controllare prodotto e consegna cinese prima del primo pagamento.", "Seguire messaggi e stato del venditore.", "Esaminare subito il QC e la finestra di reso.", "Usare il conto alla rovescia del deposito.", "Confrontare linee con peso, misure e imballaggio."] },
    ],
    conclusionTitle: "Vedere KameyMall come processo verificabile",
    conclusion: "Pensa per fasi: inserzione fonte, ordine dell’agente, consegna del venditore, controllo in magazzino e pacco internazionale. Il foglio porta al punto di partenza; i controlli successivi rendono l’informazione utile.",
    seoTitle: "Come acquistare su KameyMall nel 2026: guida agente",
    seoDescription: "Guida KameyMall: link prodotto, primo pagamento, spedizione venditore, foto QC, deposito, consolidamento e pacco internazionale.",
  },
  "articles/kameymall-shipping-cost-guide-2026": {
    label: "Guida ai costi internazionali",
    title: "Costo di spedizione KameyMall 2026",
    intro: "Come separare prezzo CNY, consegna cinese, misure di magazzino, imballaggio e trasporto internazionale.",
    updated: "Aggiornato il 3 agosto 2026",
    readTime: "14 minuti di lettura",
    sourceNote: "Base della verifica: tutorial d’acquisto, panoramica del servizio agente e FAQ pubblici di KameyMall, consultati il 3 agosto 2026. Non viene indicata una tariffa fissa perché pacco, linea e destinazione determinano il prezzo live.",
    primaryKeyword: "kameymall shipping cost",
    sections: [
      { heading: "Perché la scheda non è un prezzo consegnato", paragraphs: ["Un foglio mostra spesso prezzo CNY e conversione USD indicativa. Aiuta a confrontare, ma il processo pubblicato separa acquisto e pacco: prodotto e consegna cinese si pagano prima, il trasporto internazionale dopo l’arrivo in magazzino.", "I costi successivi dipendono da articolo ricevuto, combinazione, imballaggio, misure, paese e linea idonea. Presentare la prima cifra come totale garantito nasconderebbe queste variabili."] },
      { heading: "Livello 1: prezzo venditore e cambio", paragraphs: ["Annota prezzo CNY live, variante e quantità. Le opzioni modificano il prezzo, le promozioni finiscono e i link cambiano. Riapri la fonte prima del pagamento e conserva il CNY anche se il checkout mostra un’altra valuta.", "La conversione USD del foglio non è il tasso di regolamento. Carta, wallet o saldo possono applicare cambio e costi diversi. Contano il checkout corrente e il primo importo realmente addebitato."] },
      { heading: "Livello 2: spedizione nazionale cinese", paragraphs: ["Il tutorial include prodotto e consegna locale nella prima fase. Questa va dal venditore al magazzino, non all’estero. Più venditori possono creare più costi nazionali.", "Leggi ogni voce. Un servizio pubblicizzato come gratuito non elimina necessariamente cambio, opzioni o rettifiche d’ordine. Confronta il pagamento iniziale completo per la stessa variante."] },
      { heading: "Livello 3: peso, dimensioni e peso fatturabile", paragraphs: ["Le linee internazionali usano peso reale e misure. Il peso volumetrico converte lo spazio della scatola in un peso equivalente con un divisore di linea; può essere addebitato il maggiore. Una scatola leggera ma grande può costare molto.", "I pesi iniziali sono spesso stime. Le misure di magazzino e del pacco imballato sono più affidabili. Verifica il metodo della linea e gli eventuali conguagli. Confronta solo preventivi con le stesse ipotesi."] },
      { heading: "Livello 4: consolidamento e forma del pacco", paragraphs: ["Unire articoli può ridurre costi ripetuti, ma non garantisce risparmio. Il pacco può cambiare fascia, aumentare volume e valore o perdere linee per un prodotto limitato.", "Confronta un pacco unico con due gruppi coerenti, stesso paese e servizio simile. Separa oggetti pesanti e fragili quando richiederebbero troppo rinforzo. La soluzione più economica non è sempre la più sicura."] },
      { heading: "Livello 5: imballaggio e servizi", paragraphs: ["Le informazioni pubbliche citano rimozione imballo, rinforzo e assicurazione. Togliere una scatola riduce volume; rinforzare protegge e può aggiungere peso. La FAQ avverte che i danni con imballaggio semplice non sono coperti dall’assicurazione.", "Scegli in base al prodotto. Un indumento morbido e un dispositivo elettronico hanno esigenze diverse. Se la scatola originale conta, non rimuoverla solo per abbassare una stima."] },
      { heading: "Livello 6: linea, assicurazione, tasse e dogana", paragraphs: ["Non tutti i prodotti usano tutte le linee. Batterie, liquidi, grandi dimensioni e altre categorie riducono le opzioni. Anche paese e zona remota influiscono. Usa l’elenco live del pacco reale.", "Assicurazione, valore dichiarato, tasse e dogana sono distinti dal nolo. Le polizze hanno esclusioni e prove. La dogana dipende da destinazione e contenuto; nessun foglio garantisce sdoganamento o assenza di imposte."] },
      { heading: "Confrontare i preventivi correttamente", paragraphs: ["Usa stesso pacco, destinazione, valuta e protezione. Registra peso, misure, peso fatturabile, linea, tempo, nolo, imballaggio, assicurazione e supplementi. Calcola il prezzo al chilo solo dopo aver identificato il metodo.", "Le esperienze pubbliche su KameyMall sono miste: alcuni trovano costi ragionevoli, altri nolo elevato o lentezza. Sono campioni piccoli legati a periodo e linea. Il pacco imballato e le sue misure restano la base più forte."], bullets: ["Annotare CNY e primo pagamento reale.", "Aggiungere la consegna cinese di ogni venditore.", "Attendere peso e dimensioni di magazzino.", "Confrontare pacco unico e diviso con le stesse ipotesi.", "Bilanciare rimozione, protezione e assicurazione.", "Leggere linee live, dogana e condizioni di reclamo."] },
    ],
    conclusionTitle: "Conta il totale trasparente",
    conclusion: "Usa il prezzo del foglio per scoprire e confrontare, checkout e magazzino per il budget. Un calcolo affidabile tiene visibili prodotto, consegna cinese, misure, imballo, nolo e rischio.",
    seoTitle: "Costo spedizione KameyMall 2026: tariffe e nolo",
    seoDescription: "Capire i costi KameyMall: prezzo CNY, consegna cinese, peso reale e volumetrico, imballo, consolidamento, assicurazione e linee.",
  },
};

const polish: Record<AdditionalArticleRoute, ArticlePageContent> = {
  "articles/how-to-buy-from-kameymall-2026": {
    label: "Zweryfikowany poradnik zakupowy",
    title: "Jak kupować przez KameyMall w 2026 roku",
    intro: "Praktyczny proces oparty na źródłach: znalezienie produktu, złożenie zamówienia, płatność, zdjęcia QC, magazyn i paczka międzynarodowa.",
    updated: "Aktualizacja: 3 sierpnia 2026",
    readTime: "15 minut czytania",
    sourceNote: "Podstawa weryfikacji: publiczne strony KameyMall Shopping Agent Service, How to Purchase i FAQ, sprawdzone 3 sierpnia 2026. Informacje platformy są opisane jako opublikowane zasady lub cele, a nie niezależne gwarancje.",
    primaryKeyword: "how to buy from kameymall",
    sections: [
      { heading: "Co zmienia zamówienie przez agenta", paragraphs: ["Agent zakupowy łączy kupującego za granicą ze sprzedawcą na chińskiej platformie. Składa zamówienie krajowe, odbiera towar w magazynie i później przygotowuje oddzielną paczkę międzynarodową. Cena na karcie nie jest więc kosztem dostawy do domu.", "Proces ma dwie płatności i kilka statusów. Najpierw płacisz za produkt i chińską dostawę krajową. Po przyjęciu w magazynie wybierasz towary, opakowanie i linię międzynarodową. Status zakupiono nie oznacza jeszcze wysłano za granicę."] },
      { heading: "Krok 1: znajdź produkt i sprawdź źródło", paragraphs: ["Opublikowany poradnik pozwala wkleić link lub szukać po nazwie. Wymienia Taobao, Tmall i JD.com, a strona usługi także Weidian i 1688. Strony mobilne, złożone lub wygasłe mogą zostać źle odczytane.", "Porównaj tytuł, zdjęcia, warianty, liczbę i cenę ze źródłem. Jeśli import jest błędny, nie wybieraj podobnej opcji tylko po to, by przejść dalej. Zachowaj oryginalny link i użyj ręcznego formularza agenta."] },
      { heading: "Krok 2: podaj jednoznaczne warianty", paragraphs: ["Wybierz kolor, rozmiar, wersję i ilość po sprawdzeniu. Czytaj wymiary, nie tylko litery. Najniższa cena może dotyczyć innej wersji, akcesorium albo minimalnej liczby sztuk.", "W ręcznym zamówieniu wpisz dokładną nazwę wariantu i tylko potrzebną uwagę. Dla elektroniki potwierdź model i zgodność, dla odzieży rozmiar i wymiary. Precyzja ogranicza ryzyko zakupu podobnej, ale innej opcji."] },
      { heading: "Krok 3: zrozum pierwszą płatność", paragraphs: ["Oficjalny poradnik łączy pierwszą płatność z produktem i chińską dostawą lokalną. KameyMall pokazuje wiele walut i wymienia między innymi Visa, Mastercard, PayPal i Alipay. Tylko bieżący checkout potwierdza metody, kurs i opłaty dla danego konta i kraju.", "Oddziel cenę sprzedawcy, dostawę krajową i inne widoczne pozycje. Zachowaj CNY jako punkt odniesienia nawet przy płatności w innej walucie. Kupon może zmniejszyć jedną część, ale nie późniejszy transport międzynarodowy."] },
      { heading: "Krok 4: śledź zakup i wysyłkę sprzedawcy", paragraphs: ["Po płatności agent kontaktuje się ze sprzedawcą. Publiczne FAQ podaje zwykle od jednego do siedmiu dni i przypomnienie trzeciego dnia. Po siedmiu dniach można czekać lub poprosić o zwrot; przedsprzedaż może trwać około siedmiu–trzydziestu dni.", "To opublikowane zakresy, nie gwarancje. Magazyn sprzedawcy, święta, produkcja lub pytania o wariant mogą opóźnić proces. Sprawdzaj wiadomości i status. Przy braku śledzenia FAQ zaleca kontakt z obsługą."] },
      { heading: "Krok 5: sprawdź QC przed końcem zwrotu", paragraphs: ["Po przyjęciu KameyMall deklaruje kontrolę, zdjęcia i magazynowanie. Zdjęcia QC pomagają ocenić kolor, ilość, metkę rozmiaru, widoczne uszkodzenia i akcesoria. Nie potwierdzają autentyczności, ukrytych wad, trwałości ani dopasowania.", "Działaj szybko. FAQ wymienia kategorie bez zwrotu, uzależnia część decyzji od sprzedawcy i mówi, że po ponad pięciu dniach w magazynie zwrot nie jest obsługiwany. Opisz konkretną niezgodność i dołącz dowód zamówionego wariantu."] },
      { heading: "Krok 6: kontroluj magazyn i konsolidację", paragraphs: ["FAQ podaje 180 dni łącznego magazynowania, do 90 dni bezpłatnie i przedłużenie za 10 RMB miesięcznie. Warunki mogą się zmienić, więc bieżący licznik konta jest ważniejszy. Bezpłatny okres nie usuwa terminów QC i zwrotu.", "Konsolidacja łączy produkty w paczkę. Może ograniczyć powtarzane koszty, ale zwiększa wagę, objętość i wartość. Jeden ograniczony produkt może zmniejszyć wybór linii dla całości. Porównaj paczkę wspólną z logicznym podziałem."] },
      { heading: "Krok 7: utwórz paczkę z realnych danych", paragraphs: ["Instrukcja każe wybrać towary w magazynie, podać adres i wybrać dostępną linię. Usunięcie opakowania, wzmocnienie i ubezpieczenie są opcjami. Niektóre towary nie mogą korzystać z każdej linii.", "Porównuj zmierzoną wagę i wymiary. Linia może liczyć wagę rzeczywistą lub objętościową. Usunięcie pudełka zmniejsza objętość; wzmocnienie chroni, ale dodaje materiał. Sprawdź adres, zawartość, ochronę, ograniczenia i sumę."] },
      { heading: "Realna lista przed zatwierdzeniem", paragraphs: ["Połącz każdą decyzję z dowodem: zapisz źródło, potwierdź wariant, oddziel pierwszy koszt, śledź sprzedawcę, szybko oceń QC i użyj danych magazynowych do wysyłki.", "Publiczne opinie są mieszane: są pozytywne doświadczenia z zakupem i obsługą oraz skargi na szybkość, koszt lub tracking. Zależą od kraju, linii, czasu i paczki. Pomagają zadawać pytania, ale nie przewidują wyniku."], bullets: ["Zachowaj link źródłowy i wariant.", "Sprawdź produkt i dostawę krajową przed pierwszą płatnością.", "Śledź wiadomości i status sprzedawcy.", "Oceń QC od razu i pilnuj terminu zwrotu.", "Używaj aktualnego licznika magazynu.", "Porównuj linie według wagi, wymiarów i opakowania."] },
    ],
    conclusionTitle: "Traktuj KameyMall jako proces do sprawdzania",
    conclusion: "Myśl etapami: oferta źródłowa, zamówienie agenta, wysyłka sprzedawcy, kontrola magazynowa i paczka międzynarodowa. Arkusz prowadzi do początku, a późniejsze kontrole nadają informacji wartość.",
    seoTitle: "Jak kupować przez KameyMall w 2026: pełny poradnik",
    seoDescription: "KameyMall krok po kroku: link produktu, pierwsza płatność, wysyłka sprzedawcy, zdjęcia QC, magazyn, konsolidacja i paczka.",
  },
  "articles/kameymall-shipping-cost-guide-2026": {
    label: "Poradnik kosztów międzynarodowych",
    title: "Koszt wysyłki KameyMall w 2026 roku",
    intro: "Jak oddzielić cenę CNY, chińską dostawę, pomiary magazynowe, opakowanie i transport międzynarodowy.",
    updated: "Aktualizacja: 3 sierpnia 2026",
    readTime: "14 minut czytania",
    sourceNote: "Podstawa weryfikacji: publiczny tutorial zakupu, opis usługi agenta i FAQ KameyMall, sprawdzone 3 sierpnia 2026. Nie podajemy stałej stawki, bo cenę określają paczka, linia i miejsce docelowe.",
    primaryKeyword: "kameymall shipping cost",
    sections: [
      { heading: "Dlaczego karta produktu nie pokazuje ceny z dostawą", paragraphs: ["Arkusz zwykle pokazuje cenę CNY i orientacyjne USD. To pomaga porównywać, ale opublikowany proces rozdziela zakup i paczkę: produkt oraz chińska dostawa są płacone najpierw, transport międzynarodowy po przyjęciu w magazynie.", "Późniejsze koszty zależą od otrzymanego towaru, połączenia produktów, opakowania, wymiarów, kraju i dostępnej linii. Mała pierwsza liczba nie może być gwarantowaną sumą."] },
      { heading: "Warstwa 1: cena sprzedawcy i waluta", paragraphs: ["Zapisz cenę CNY na żywo, wariant i ilość. Opcje zmieniają kwotę, promocje wygasają, a linki bywają zastępowane. Otwórz źródło przed płatnością i zachowaj CNY mimo innej waluty checkoutu.", "Przeliczenie USD w arkuszu nie jest kursem rozliczenia. Karta, portfel lub saldo mogą użyć innego kursu i opłat. Liczy się bieżący checkout oraz faktycznie pobrana pierwsza płatność."] },
      { heading: "Warstwa 2: chińska dostawa krajowa", paragraphs: ["Tutorial włącza produkt i dostawę lokalną do pierwszego etapu. To transport od sprzedawcy do magazynu, nie za granicę. Wielu sprzedawców może oznaczać wiele krajowych opłat.", "Czytaj każdą pozycję. Reklama darmowej usługi nie wyklucza przeliczenia, opcji ani korekty zamówienia. Porównuj pełną pierwszą płatność dla tego samego wariantu."] },
      { heading: "Warstwa 3: waga, wymiary i waga rozliczeniowa", paragraphs: ["Linie używają wagi rzeczywistej i wymiarów. Waga objętościowa zamienia przestrzeń pudełka na wagę według dzielnika linii; przewoźnik może naliczyć wyższą wartość. Lekka, ale duża paczka bywa droga.", "Wczesne wagi są często szacunkowe. Pomiary magazynu i spakowanej paczki są lepsze. Sprawdź metodę linii i ewentualne rozliczenie po pakowaniu. Porównuj wyłącznie te same założenia."] },
      { heading: "Warstwa 4: konsolidacja i kształt paczki", paragraphs: ["Połączenie produktów może ograniczyć powtarzane koszty, ale nie gwarantuje oszczędności. Paczka może wejść w nowy próg, zwiększyć objętość i wartość albo utracić linie przez jeden ograniczony towar.", "Porównaj jedną paczkę z dwoma sensownymi grupami przy tym samym celu i poziomie usługi. Oddziel ciężkie od delikatnych, jeśli wymagałyby zbyt dużej ochrony. Najtańszy wariant nie zawsze jest najbezpieczniejszy."] },
      { heading: "Warstwa 5: pakowanie i usługi", paragraphs: ["Publiczne informacje wymieniają usunięcie opakowania, wzmocnienie i ubezpieczenie. Usunięcie pudełka zmniejsza objętość; wzmocnienie chroni i może dodać wagę. FAQ ostrzega, że szkody przy prostym pakowaniu nie są objęte ubezpieczeniem.", "Wybieraj według produktu. Miękka odzież i elektronika mają inne potrzeby. Jeśli oryginalne pudełko jest ważne, nie usuwaj go tylko dla niższej wyceny."] },
      { heading: "Warstwa 6: linia, ubezpieczenie, podatki i cło", paragraphs: ["Nie każdy towar korzysta z każdej linii. Baterie, płyny, duże rozmiary i inne kategorie zmniejszają wybór. Kraj i obszar zdalny także wpływają na cenę. Używaj listy live dla realnej paczki.", "Ubezpieczenie, wartość deklarowana, podatek i cło są oddzielne od frachtu. Polisy mają wyłączenia i wymagania dowodowe. Wynik celny zależy od kraju i zawartości; arkusz nie gwarantuje odprawy ani braku podatku."] },
      { heading: "Jak uczciwie porównywać wyceny", paragraphs: ["Używaj tej samej paczki, adresu, waluty i ochrony. Zapisz wagę, wymiary, wagę rozliczeniową, linię, czas, fracht, opakowanie, ubezpieczenie i dopłaty. Cenę za kilogram licz dopiero po ustaleniu metody.", "Opinie o KameyMall są mieszane: część osób opisuje rozsądny koszt, inne drogi fracht lub wolną obsługę. To małe próbki zależne od czasu i linii. Najmocniejszą podstawą są pomiary spakowanej paczki."], bullets: ["Zapisz CNY i realną pierwszą płatność.", "Dodaj chińską dostawę każdego sprzedawcy.", "Poczekaj na wagę i wymiary magazynowe.", "Porównaj paczkę wspólną i podzieloną na tych samych zasadach.", "Wyważ usunięcie opakowania, ochronę i ubezpieczenie.", "Czytaj linie live, cło i zasady roszczeń."] },
    ],
    conclusionTitle: "Liczy się przejrzysta suma",
    conclusion: "Ceny z arkusza używaj do odkrywania i porównania, a checkoutu i magazynu do budżetu. Rzetelny plan pokazuje oddzielnie produkt, dostawę krajową, pomiary, pakowanie, fracht i ryzyko.",
    seoTitle: "Koszt wysyłki KameyMall 2026: opłaty i fracht",
    seoDescription: "Koszty KameyMall: cena CNY, dostawa chińska, waga realna i objętościowa, pakowanie, konsolidacja, ubezpieczenie i linie.",
  },
};

export const additionalArticles: Record<Locale, Record<AdditionalArticleRoute, ArticlePageContent>> = {
  en: english,
  de: german,
  fr: french,
  es: spanish,
  it: italian,
  pl: polish,
};

function articleStructure(pages: Record<AdditionalArticleRoute, ArticlePageContent>) {
  return additionalArticleRoutes.map((route) => ({
    route,
    sections: pages[route].sections.map((section) => ({
      paragraphs: section.paragraphs.length,
      bullets: section.bullets?.length ?? 0,
    })),
  }));
}

const englishArticleStructure = JSON.stringify(articleStructure(additionalArticles.en));
for (const [locale, pages] of Object.entries(additionalArticles)) {
  if (JSON.stringify(articleStructure(pages)) !== englishArticleStructure) {
    throw new Error(`Incomplete ${locale} article translation: visible content structure must match English`);
  }
}
