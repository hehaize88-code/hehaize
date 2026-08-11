import type { Locale } from "./i18n";
import type { SeoArticleCopy } from "./seoArticles";

type SeoArticle = SeoArticleCopy["article"];

const en: SeoArticle = {
  eyebrow: "JOYAGOO DOMESTIC SHIPPING GUIDE",
  title: "Joyagoo Domestic Shipping: From Chinese Seller to Warehouse",
  description: "Separate Chinese domestic delivery from international freight, record seller-to-warehouse charges, compare same-seller and multi-seller orders, and troubleshoot an inbound parcel with evidence.",
  facts: [
    { value: "1st stage", label: "Domestic shipping belongs to the product-order payment" },
    { value: "Same seller", label: "One submitted checkout can carry one domestic delivery charge" },
    { value: "Not export", label: "Seller Sent is movement inside China, not international shipping" },
  ],
  sections: [
    {
      heading: "Draw the boundary before you compare a price",
      paragraphs: [
        "Joyagoo domestic shipping is the delivery from a Chinese marketplace seller to the agent warehouse. It belongs to the product-order stage, before warehouse inspection, consolidation and international freight. Joyagoo’s current Shopping Guidance tells buyers to pay for the item and Chinese local shipping together, then shows a separate parcel process after the product reaches storage. This boundary matters because a low seller price, a paid product order and an internationally delivered total are three different numbers.",
        "Use three cost columns from the beginning. Column one is merchandise: seller price multiplied by quantity. Column two is inbound cost: each seller’s domestic delivery plus any confirmed adjustment attached to that purchase. Column three begins only after storage: packaging choices, international route, insurance if selected, and destination charges. Do not place the domestic fee into the international column simply because both contain the word shipping. They pay different carriers for different journeys.",
        "This article focuses on the inbound column. It does not publish a universal fee because the seller, listing, quantity, region and checkout can change it. The live product order is the evidence for your order. An old screenshot showing free domestic delivery does not bind a seller today, and a product card that omits the line does not prove the line will be zero after the exact variant and quantity are selected.",
      ],
    },
    {
      heading: "Read the domestic fee at the product checkout",
      paragraphs: [
        "Before payment, save the source listing, seller name, selected variant, quantity, item subtotal and Chinese local shipping. If Joyagoo asks for a later seller adjustment, compare it with that record. A heavier bundle, remote delivery term or changed seller price can produce a legitimate difference, but the reason should be named. Treat an unexplained request as a question to resolve, not as a generic service fee and not as proof of wrongdoing.",
        "Joyagoo’s current help page says that multiple items from the same seller, purchased together and submitted in one checkout, receive one domestic shipping charge for the whole order. It also says an additional delivery amount may be requested if total weight exceeds the seller package limit. The useful unit is therefore the seller order, not every product row. Two colors from one shop in one submitted order may share the line; the same products submitted as separate orders should not be assumed to merge later.",
        "Do not force same-seller grouping when it creates the wrong purchase. Confirm that the shop identity really matches, that every variant is ready, and that the listing permits the combined quantity. A presale item can hold up other items, and a wholesale listing may have its own quantity or freight rule. The goal is not to make the domestic line look small; it is to create an accurate order that the seller can dispatch and the warehouse can match.",
      ],
    },
    {
      heading: "Build a seller-by-seller inbound worksheet",
      paragraphs: [
        "Give each seller one row with five fields: merchandise subtotal, displayed domestic fee, later confirmed adjustment, domestic tracking numbers and warehouse outcome. This makes a multi-seller cart readable. If four products come from three shops, there may be three seller deliveries even when Joyagoo receives everything at one warehouse. Consolidation happens later; it does not retroactively combine the sellers’ Chinese shipments or erase what was paid to move them.",
        "Consider a purely hypothetical order. Seller A supplies two shirts for CNY 90 each and shows CNY 10 domestic delivery. Seller B supplies shoes for CNY 260 with CNY 12 delivery. Seller C supplies an accessory for CNY 45 with zero shown at checkout. The inbound product-stage total is 180 + 10 + 260 + 12 + 45 = CNY 507. This is a calculation example, not a Joyagoo quote and not evidence that those rates are typical.",
        "Now compare an alternative in which Seller A’s shirts are split into two checkouts and each displays CNY 10 delivery. The merchandise is unchanged, but that seller’s visible inbound cost becomes CNY 20. The difference is only CNY 10 in this example, yet the worksheet shows exactly why. Apply the method to the live checkout rather than copying the numbers. Record discounts separately so a coupon does not hide whether the underlying delivery line changed.",
      ],
    },
    {
      heading: "Follow the seller-to-warehouse status chain",
      paragraphs: [
        "Joyagoo’s published flow identifies several distinct milestones. Order Processing means the purchasing side is accepting and placing the order. Purchased means the seller order has been completed by the agent, but the seller may not have dispatched. Seller Sent means the seller has handed the item into Chinese domestic logistics. Stock Arrived means the warehouse has received it; QC Completed and Stored follow warehouse work. Read these as handoffs, not as interchangeable versions of shipped.",
        "The official processing-time page publishes general examples for purchasing, seller dispatch, domestic delivery and inspection, while also saying actual seller delivery varies. Those figures are operational references, not a guarantee for every listing. Presales, customized products, stock questions, weekends, holidays and remote origins can change the timeline. A more reliable follow-up uses the actual seller tracking and latest event instead of declaring a delay only because another buyer’s order moved faster.",
        "If an order remains Purchased, first check whether the seller has dispatched and whether a tracking number exists. Joyagoo’s Shopping Guidance explicitly notes that the platform cannot control seller shipping speed, but the buyer can contact the purchasing agent to urge the seller. Ask for a concrete milestone: seller confirmation, expected handover, replacement choice or cancellation availability. A precise question produces a more useful answer than asking where the international parcel is before the item has even reached the warehouse.",
      ],
    },
    {
      heading: "Handle changes before and after seller dispatch differently",
      paragraphs: [
        "A product correction is cheapest before the seller sends the parcel. Joyagoo’s current modification guidance says the agent can negotiate a requested change when the seller has not delivered the item. Once the seller has dispatched, the platform says it cannot negotiate that modification at the same stage. The buyer may need to wait for warehouse arrival, request a return and submit a new order, with return shipping for the previous item borne by the buyer under that published scenario.",
        "Therefore, review color, size, model and quantity while the order is Processing or Purchased. If a message reports changed stock or price, answer before dispatch. Do not send contradictory instructions through several channels. One dated request tied to the order number is easier to relay to the seller. If the seller has already sent the item, stop describing the request as a simple edit; estimate the return cost, seller eligibility and lost time before deciding whether correction is still worthwhile.",
        "Cancellation also requires stage awareness. A request is not completed merely because it was submitted. Preserve the agent response and watch whether domestic tracking appears. If the seller sends during negotiation, the physical parcel still needs to be received and matched. Do not place a duplicate order until the first order’s cancellation or return path is clear, unless you intentionally accept the risk of receiving two items and paying two inbound journeys.",
      ],
    },
    {
      heading: "Troubleshoot delivered tracking without guessing",
      paragraphs: [
        "A Chinese carrier showing delivered does not automatically mean the item is already visible as Stored. Joyagoo publishes a separate Received stage: the parcel has arrived, then staff weigh and inspect it before it becomes Stored and appears on the Warehouse page. Matching a seller parcel, opening it, checking the order and uploading QC evidence take place after the carrier’s handoff. Keep carrier delivery and warehouse completion as separate timestamps.",
        "If tracking says delivered but the account has not changed, collect the Joyagoo order number, seller name, domestic carrier, full tracking number, delivery timestamp, quantity and any split-parcel information. Check whether one seller issued more than one number. Then ask support to match that inbound shipment. Do not say only that the warehouse lost the item; a delivered scan can still point to reception, a neighboring facility, a batch waiting for matching or a split order.",
        "If no domestic tracking movement exists, the evidence points earlier. Confirm whether a label was merely created, whether the carrier collected it and whether the seller supplied a replacement number. If the order status says Received but Warehouse remains empty, the official help explanation says inspection and storage confirmation still follow. Escalate only the missing handoff you can identify, and retain the response beside the worksheet for the later QC and cost record.",
      ],
    },
    {
      heading: "Close the inbound stage before building the international parcel",
      paragraphs: [
        "Domestic shipping is complete only when the correct items are received and the warehouse evidence is usable—not simply when every seller has generated a number. Compare QC with the paid variants, resolve missing quantities and decide any return before consolidation. A seller delivery charge moves the item to the warehouse; it does not guarantee product condition, make the seller return free or pay any part of the international route.",
        "Before parcel submission, reconcile the worksheet. Merchandise plus confirmed domestic delivery should match the product-stage payments. Every retained item should have a warehouse record and a keep decision. Any returned item should have its deduction and refund path recorded separately. Only then start a new parcel budget using stored weight, dimensions, packaging and currently available routes. This separation makes the eventual landed-cost total auditable instead of one unexplained amount.",
        "Use the final checklist for each seller order: exact link and variant saved; domestic fee captured at checkout; same-seller grouping verified; adjustments named; dispatch and tracking recorded; split pieces counted; warehouse receipt matched; QC reviewed; return question closed; product-stage total reconciled. When those boxes are complete, the inbound stage has done its job. The next shipping decision can be made from warehouse facts rather than seller-page assumptions.",
      ],
    },
  ],
};

type L = Exclude<Locale, "en">;
function make(
  eyebrow: string,
  title: string,
  description: string,
  facts: Array<{ value: string; label: string }>,
  headings: string[],
  paragraphs: string[][],
): SeoArticle {
  return { eyebrow, title, description, facts, sections: headings.map((heading, index) => ({ heading, paragraphs: paragraphs[index] })) };
}

const zh = make("JOYAGOO 中国境内运输指南", "Joyagoo中国境内运费：从卖家到仓库", "区分中国境内配送与国际运费，记录卖家到仓库费用，比较同店和多店订单，并用证据排查入库异常。",
  [{ value: "第一阶段", label: "境内运费属于商品订单付款" }, { value: "同一卖家", label: "一次合并结账可对应一笔境内配送费" }, { value: "尚未出境", label: "卖家发货只是中国境内运输" }],
  ["比较价格前先划清费用边界", "在商品结账页读取境内运费", "建立按卖家划分的入库成本表", "跟踪卖家到仓库的状态链", "卖家发货前后采用不同修改方式", "用证据排查已签收但未入库", "国际包裹前先关闭入库阶段"],
  [
    ["Joyagoo中国境内运费是中国卖家把商品送到代理仓库的费用，属于商品订单阶段，早于质检、合箱和国际运输。当前购买指南把商品与中国境内运费放在第一次付款，商品入库后才进入另一套包裹流程。", "从一开始分三栏记录：商品价格、卖家到仓库费用、入库后的国际包裹费用。不要因为两者都叫shipping就混在一起，它们支付给不同运输环节。", "本文不公布统一费率，因为卖家、商品、数量、地区和实时结账都会改变金额。旧截图的包邮不能约束今天的卖家，当前订单页面才是证据。"],
    ["付款前保存原链接、卖家、规格、数量、商品小计和境内配送。若后来要求补差价，应当与这份记录比较，并要求说明是重量、地区、卖家改价还是其他明确原因。", "当前帮助页说明，同一卖家的多件商品在同一次订单结账提交时，整单收取一次境内运费；若总重量超过包裹限制，采购团队可能通知补交配送费。计费单元是卖家订单，不是每一行商品。", "不要为了少一笔运费而把不合适的商品强行合并。先确认店铺相同、规格可售、数量规则正确；预售商品或批发规则可能拖住整单。"],
    ["每个卖家一行，记录商品小计、显示的境内费、已确认补差、境内单号和入库结果。四件商品来自三家店，就可能有三段卖家配送，即使最终都到同一个仓库。", "假设卖家A两件衬衫各90元、境内10元，卖家B鞋260元、配送12元，卖家C配件45元且结账显示0元，商品阶段为180+10+260+12+45=507元。这只是计算示例，不是Joyagoo报价。", "如果卖家A拆成两个结账且各显示10元，商品不变但该卖家入库费用变成20元。把优惠另列，避免优惠把真实配送变化隐藏。"],
    ["公开流程区分Order Processing、Purchased、Seller Sent、Stock Arrived、QC Completed和Stored。Purchased表示代理已完成购买，不等于卖家发货；Seller Sent才开始中国境内物流。", "官方处理时间页给出采购、卖家发货、境内配送和质检的参考，同时明确实际时间随卖家变化。预售、定制、库存、节假日和偏远始发地都会改变进度，因此不能把示例写成保证。", "订单停在Purchased时，先确认卖家是否交运和是否有单号。可联系采购员催促，但应询问具体节点：卖家是否确认、何时交运、是否需要替代或仍能取消。"],
    ["商品纠正最好在卖家发货前完成。当前修改说明表示，卖家尚未发货时代理可以协商修改；卖家已发货后，通常需要等到仓库、申请退货并重新下单，之前商品的退货运费由买家承担。", "因此在Processing或Purchased阶段检查颜色、尺码、型号和数量。用一个带订单号的清晰请求，不要在多个渠道发出互相冲突的说明。", "取消请求提交不等于取消完成。保留代理回复并观察是否出现境内单号；在第一单路径明确前不要盲目重复购买，否则可能收到两件并承担两段入库费用。"],
    ["中国快递显示签收，不代表商品已经Stored。Joyagoo另有Received阶段：仓库收件后还要匹配、称重、检查并确认入库，之后才在Warehouse显示。", "若签收后账户未变化，收集订单号、卖家、快递公司、完整单号、签收时间、数量和拆包信息，再请支持匹配入库件。不能仅凭延迟就断言丢失。", "若单号没有移动，先核实是否仅创建面单、快递是否揽收、卖家是否更换单号；若Received但Warehouse空白，则缺少的是检查和入库确认。只升级可以证明的缺失交接。"],
    ["境内阶段完成的标准是正确商品已经收到且仓库证据可用，而不只是卖家产生单号。对照QC、处理缺件并在合箱前关闭退货问题。境内费不保证商品质量，也不支付国际线路。", "提交包裹前对账：商品加已确认境内费应与第一次付款一致；保留商品有入库记录，退货商品单独记录扣款和退款。然后才用重量、尺寸、包装和实时线路建立新预算。", "最终逐单检查：链接规格、结账运费、同店合并、补差原因、发货单号、拆包数量、入库匹配、QC、退货决定和商品阶段总额。完成后，国际运输才能基于仓库事实。"],
  ]);

const localizedData: Record<Exclude<L, "zh">, SeoArticle> = {
  de: make("JOYAGOO INLANDSVERSAND", "Joyagoo-Inlandsversand: vom chinesischen Verkäufer zum Lager", "Chinesische Inlandslieferung von internationaler Fracht trennen, Verkäuferkosten erfassen und fehlende Lagereingänge mit Belegen klären.",
    [{ value: "Stufe 1", label: "Inlandsversand gehört zur Produktzahlung" }, { value: "Ein Verkäufer", label: "Eine gemeinsame Kasse kann eine Liefergebühr tragen" }, { value: "Noch kein Export", label: "Seller Sent ist Transport innerhalb Chinas" }],
    ["Vor dem Preisvergleich die Grenze ziehen", "Die Gebühr an der Produktkasse lesen", "Eine Tabelle je Verkäufer führen", "Die Statuskette zum Lager verfolgen", "Änderungen vor und nach Versand unterscheiden", "Zugestellt ohne Lagerstatus prüfen", "Die Inlandstufe vor dem Auslandspaket schließen"],
    [
      ["Joyagoo-Inlandsversand bringt Ware vom chinesischen Verkäufer zum Agentenlager und gehört zur Produktstufe vor QC, Konsolidierung und internationaler Fracht. Der aktuelle Leitfaden trennt die erste Zahlung klar vom späteren Paket.", "Führe drei Spalten: Warenwert, bestätigte Verkäufer-Lager-Kosten und erst nach Einlagerung Paketkosten. Beide Transportarten bedienen verschiedene Strecken.", "Es gibt keinen universellen Tarif. Verkäufer, Menge, Region und Live-Kasse entscheiden; alte Screenshots sind kein Beleg für den aktuellen Auftrag."],
      ["Speichere Link, Verkäufer, Variante, Menge, Zwischensumme und Inlandslieferung. Eine spätere Anpassung muss mit diesem Datensatz verglichen und begründet werden.", "Laut aktueller Hilfe trägt eine gemeinsam eingereichte Bestellung mehrerer Artikel desselben Verkäufers eine Inlandsliefergebühr. Überschreitet das Gewicht ein Paketlimit, kann eine Nachzahlung folgen.", "Gruppiere nicht blind. Shop, Bestand, Varianten und Mengenregeln müssen passen; Vorverkauf oder Großhandelsregeln können alles verzögern."],
      ["Eine Zeile je Verkäufer enthält Warenwert, Gebühr, Anpassung, Tracking und Lagerergebnis. Drei Shops bedeuten mögliche drei Inlandssendungen, auch wenn später ein Paket entsteht.", "Reines Beispiel: zwei Shirts à 90 CNY plus 10, Schuhe 260 plus 12 und Zubehör 45 plus 0 ergeben 507 CNY. Das ist kein Joyagoo-Angebot.", "Zwei getrennte Kassen beim Shirt-Verkäufer könnten im Beispiel zweimal 10 CNY zeigen. Rabatte separat erfassen, damit die Lieferlinie sichtbar bleibt."],
      ["Order Processing, Purchased, Seller Sent, Stock Arrived, QC Completed und Stored sind Übergaben. Purchased ist Kauf, nicht Versand; Seller Sent startet erst die Inlandlogistik.", "Veröffentlichte Bearbeitungszeiten sind Referenzen und variieren ausdrücklich nach Verkäufer. Vorverkauf, Feiertag und Bestand verhindern eine Garantie.", "Bei Purchased konkret nach Verkäuferbestätigung, Übergabe, Ersatz oder Storno fragen. Internationales Tracking ist vor dem Lager die falsche Frage."],
      ["Vor Verkäuferversand ist eine Korrektur einfacher. Nach aktueller Hilfe wird vorher verhandelt; nach Versand kann Rückgabe nach Lagereingang und Neubestellung nötig sein, mit Rücksendekosten für den Käufer.", "Prüfe Farbe, Größe, Modell und Menge früh und sende eine eindeutige datierte Anweisung mit Auftragsnummer.", "Ein Stornoantrag ist noch kein Abschluss. Tracking beobachten und keine Doppelbestellung auslösen, bevor der erste Weg klar ist."],
      ["Zugestellt ist nicht automatisch Stored. Received steht vor Zuordnung, Wiegen, Prüfung und Lagerbestätigung.", "Sammle Auftrag, Verkäufer, Träger, vollständige Nummer, Zeit, Menge und Teilpakete und bitte um konkrete Zuordnung statt Verlust zu behaupten.", "Ohne Bewegung prüfe Etiketterstellung und Übergabe. Bei Received ohne Warehouse fehlt die Lagerarbeit; eskaliere genau diese Übergabe."],
      ["Die Inlandstufe endet mit richtigem Wareneingang und brauchbarem QC, nicht mit einer bloßen Nummer. Rückfragen vor Konsolidierung schließen.", "Stimme Warenwert und bestätigte Inlandskosten mit der Produktzahlung ab; Rückgaben separat führen. Erst danach beginnt das Paketbudget mit Maßen und Routen.", "Checkliste: Link, Variante, Gebühr, Gruppierung, Anpassung, Tracking, Teile, Eingang, QC, Rückgabe und Produktgesamtbetrag."],
    ]),
  pl: make("TRANSPORT KRAJOWY JOYAGOO", "Transport krajowy Joyagoo: od chińskiego sprzedawcy do magazynu", "Oddziel dostawę w Chinach od frachtu międzynarodowego, zapisuj koszty sprzedawcy i wyjaśniaj brak przyjęcia dowodami.",
    [{ value: "Etap 1", label: "Dostawa krajowa należy do płatności za produkt" }, { value: "Ten sam sklep", label: "Wspólny checkout może mieć jedną opłatę" }, { value: "Bez eksportu", label: "Seller Sent to ruch w Chinach" }],
    ["Najpierw wyznacz granicę kosztów", "Odczytaj opłatę przy zakupie", "Prowadź arkusz według sprzedawcy", "Śledź statusy do magazynu", "Rozdziel zmiany przed i po wysyłce", "Wyjaśnij doręczenie bez magazynu", "Zamknij etap krajowy przed paczką"],
    [
      ["Transport krajowy Joyagoo prowadzi od chińskiego sprzedawcy do magazynu i należy do pierwszego etapu przed QC i frachtem międzynarodowym.", "Prowadź trzy kolumny: produkt, dostawa sprzedawca–magazyn oraz późniejsze koszty paczki. To dwie różne trasy.", "Nie ma stałej stawki; liczy się bieżący sprzedawca, ilość, region i checkout."],
      ["Zapisz link, sklep, wariant, ilość, sumę i dostawę. Każdą korektę porównaj z tym dowodem.", "Aktualna pomoc mówi o jednej opłacie dla wielu rzeczy od tego samego sprzedawcy złożonych razem; przekroczenie limitu wagi może wymagać dopłaty.", "Najpierw potwierdź ten sam sklep, dostępność i reguły ilości. Przedsprzedaż może opóźnić wspólne zamówienie."],
      ["Jeden wiersz sprzedawcy obejmuje towar, opłatę, dopłatę, numery i przyjęcie. Trzy sklepy to potencjalnie trzy przesyłki krajowe.", "Hipotetycznie: 2×90+10, 260+12 i 45+0 daje 507 CNY. To przykład, nie cena Joyagoo.", "Rozdzielenie pierwszego sklepu na dwa checkouty mogłoby podwoić jego linię 10 CNY. Rabaty zapisuj osobno."],
      ["Processing, Purchased, Seller Sent, Stock Arrived, QC Completed i Stored to różne przekazania. Purchased nie oznacza wysłane.", "Opublikowane czasy są przykładami i zależą od sprzedawcy; zapasy, święta i preorder zmieniają wynik.", "Przy Purchased pytaj o potwierdzenie, przekazanie, zamiennik lub anulowanie, nie o śledzenie zagraniczne."],
      ["Zmiana jest prostsza przed wysłaniem. Po wysłaniu może wymagać przyjęcia, zwrotu i nowego zakupu, a kupujący ponosi krajową przesyłkę zwrotną w opisanym scenariuszu.", "Sprawdź model, kolor, rozmiar i ilość wcześnie i wyślij jedną jednoznaczną instrukcję.", "Wniosek o anulowanie nie kończy sprawy. Nie duplikuj zakupu, dopóki pierwsza ścieżka nie jest jasna."],
      ["Doręczone nie oznacza Stored. Received poprzedza dopasowanie, ważenie, QC i potwierdzenie magazynu.", "Zbierz numer zamówienia, sklep, przewoźnika, tracking, czas, ilość i części paczki, a następnie poproś o dopasowanie.", "Brak ruchu oznacza sprawdzenie etykiety i odbioru; Received bez Warehouse wskazuje na oczekującą pracę magazynu."],
      ["Etap kończy się prawidłowym przyjęciem i użytecznym QC, nie samym numerem. Zwroty zamknij przed konsolidacją.", "Uzgodnij produkt i krajowe koszty z pierwszą płatnością; zwroty zapisuj osobno. Potem twórz budżet paczki.", "Lista: link, wariant, opłata, grupowanie, korekta, tracking, części, przyjęcie, QC, zwrot i suma."],
    ]),
  es: make("ENVÍO NACIONAL JOYAGOO", "Envío nacional de Joyagoo: del vendedor chino al almacén", "Separa la entrega dentro de China del flete internacional, registra costes por vendedor y resuelve entradas con pruebas.",
    [{ value: "Etapa 1", label: "La entrega nacional pertenece al pago del producto" }, { value: "Mismo vendedor", label: "Un checkout conjunto puede tener un cargo" }, { value: "Sin exportar", label: "Seller Sent sigue dentro de China" }],
    ["Marcar el límite antes de comparar", "Leer el cargo en el checkout", "Crear una tabla por vendedor", "Seguir la cadena hasta almacén", "Distinguir cambios antes y después", "Resolver entregado sin almacén", "Cerrar la entrada antes del paquete"],
    [
      ["El envío nacional lleva el producto del vendedor chino al almacén y forma parte del primer pago, antes de QC y flete internacional.", "Usa tres columnas: mercancía, entrega vendedor–almacén y costes del paquete después de almacenado. Son trayectos distintos.", "No existe tarifa universal; mandan vendedor, cantidad, región y checkout actual."],
      ["Guarda enlace, tienda, variante, cantidad, subtotal y entrega. Compara cualquier ajuste posterior con esa evidencia.", "La ayuda actual indica un cargo para varios artículos del mismo vendedor enviados en un checkout; superar el límite de peso puede generar un suplemento.", "Confirma tienda, stock y reglas de cantidad antes de agrupar. Una preventa puede retrasar todo."],
      ["Una fila por vendedor registra mercancía, cargo, ajuste, seguimientos y almacén. Tres tiendas pueden generar tres entregas nacionales.", "Ejemplo hipotético: 2×90+10, 260+12 y 45+0 suman CNY 507. No es una cotización Joyagoo.", "Dividir la primera tienda en dos checkouts podría duplicar su línea de CNY 10. Registra descuentos aparte."],
      ["Processing, Purchased, Seller Sent, Stock Arrived, QC Completed y Stored son hitos. Purchased no significa que el vendedor haya enviado.", "Los tiempos publicados son referencias y varían por vendedor; stock, fiestas y preventa impiden promesas.", "En Purchased pregunta por confirmación, entrega al transportista, sustitución o cancelación."],
      ["Cambiar es más fácil antes del envío. Después puede requerir esperar al almacén, devolver y volver a pedir, asumiendo el comprador el retorno nacional en el caso publicado.", "Revisa color, talla, modelo y cantidad pronto y envía una instrucción clara con número.", "Solicitar cancelación no la completa. No dupliques hasta aclarar el primer pedido."],
      ["Entregado no es Stored. Received precede al emparejado, peso, inspección y alta en Warehouse.", "Reúne pedido, vendedor, transportista, número, hora, cantidad y paquetes divididos para pedir el emparejado.", "Sin movimiento comprueba etiqueta y recogida; Received sin Warehouse apunta al trabajo pendiente de almacén."],
      ["La entrada termina con el producto correcto y QC útil, no con un número. Cierra devoluciones antes de consolidar.", "Concilia producto y entrega nacional con el primer pago; registra devoluciones aparte. Después inicia el presupuesto internacional.", "Lista: enlace, variante, cargo, agrupación, ajuste, seguimiento, piezas, entrada, QC, devolución y total."],
    ]),
  it: make("SPEDIZIONE NAZIONALE JOYAGOO", "Spedizione nazionale Joyagoo: dal venditore cinese al magazzino", "Separa la consegna in Cina dal trasporto internazionale, registra i costi per venditore e risolvi gli ingressi con prove.",
    [{ value: "Fase 1", label: "La consegna nazionale appartiene al pagamento prodotto" }, { value: "Stesso venditore", label: "Un checkout comune può avere una tariffa" }, { value: "Non esportato", label: "Seller Sent resta in Cina" }],
    ["Tracciare il confine dei costi", "Leggere la tariffa al checkout", "Creare una tabella per venditore", "Seguire gli stati fino al magazzino", "Distinguere modifiche prima e dopo", "Risolvere consegnato senza deposito", "Chiudere la fase prima del pacco"],
    [
      ["La spedizione nazionale porta il prodotto dal venditore cinese al magazzino e appartiene al primo pagamento, prima di QC e trasporto internazionale.", "Usa tre colonne: merce, consegna venditore–magazzino e costi pacco dopo il deposito. Sono viaggi diversi.", "Non esiste una tariffa unica; contano venditore, quantità, regione e checkout live."],
      ["Salva link, negozio, variante, quantità, subtotale e consegna. Confronta ogni correzione con questi dati.", "La guida attuale dice che più articoli dello stesso venditore inviati insieme hanno una tariffa nazionale; oltre il limite di peso può servire un supplemento.", "Verifica negozio, stock e regole prima di raggruppare. Un preorder può fermare il resto."],
      ["Una riga per venditore contiene merce, tariffa, aggiustamento, tracking e risultato magazzino. Tre negozi possono creare tre invii nazionali.", "Esempio ipotetico: 2×90+10, 260+12 e 45+0 = CNY 507. Non è un preventivo Joyagoo.", "Dividere il primo venditore in due checkout potrebbe raddoppiare la sua linea da CNY 10. Tieni separati gli sconti."],
      ["Processing, Purchased, Seller Sent, Stock Arrived, QC Completed e Stored sono passaggi diversi. Purchased non è spedizione.", "I tempi pubblicati sono riferimenti variabili per venditore; stock, feste e preorder escludono garanzie.", "In Purchased chiedi conferma, consegna, sostituzione o cancellazione, non tracking estero."],
      ["Modificare è più semplice prima dell’invio. Dopo può richiedere ricezione, reso e nuovo ordine, con costo di ritorno nazionale a carico dell’utente nel caso pubblicato.", "Controlla modello, colore, taglia e quantità presto e invia una sola istruzione datata.", "La richiesta di annullamento non è conclusione. Evita il duplicato finché il primo percorso non è chiaro."],
      ["Consegnato non significa Stored. Received precede abbinamento, peso, controllo e conferma.", "Raccogli ordine, venditore, corriere, tracking, ora, quantità e colli divisi e chiedi l’abbinamento.", "Senza movimento verifica etichetta e ritiro; Received senza Warehouse indica lavoro di magazzino pendente."],
      ["La fase termina con prodotto corretto e QC utile, non con un numero. Chiudi i resi prima del consolidamento.", "Riconcilia merce e trasporto nazionale col primo pagamento; registra i resi a parte. Poi crea il budget del pacco.", "Lista: link, variante, tariffa, gruppo, rettifica, tracking, pezzi, ingresso, QC, reso e totale."],
    ]),
  fr: make("LIVRAISON INTÉRIEURE JOYAGOO", "Livraison intérieure Joyagoo : du vendeur chinois à l’entrepôt", "Séparez la livraison chinoise du fret international, notez les coûts par vendeur et résolvez les réceptions avec des preuves.",
    [{ value: "Étape 1", label: "La livraison intérieure appartient au paiement produit" }, { value: "Même vendeur", label: "Une caisse groupée peut porter un seul coût" }, { value: "Pas exporté", label: "Seller Sent reste en Chine" }],
    ["Tracer la frontière des coûts", "Lire le coût à la caisse produit", "Créer une feuille par vendeur", "Suivre les statuts vers l’entrepôt", "Distinguer les changements avant et après", "Résoudre livré sans stock", "Clore l’entrée avant le colis"],
    [
      ["La livraison intérieure mène du vendeur chinois à l’entrepôt et appartient au premier paiement, avant QC et fret international.", "Utilisez trois colonnes : marchandises, vendeur–entrepôt et colis après stockage. Ce sont des trajets distincts.", "Aucun tarif universel : vendeur, quantité, région et caisse active font foi."],
      ["Gardez lien, boutique, variante, quantité, sous-total et livraison. Comparez toute correction à ce dossier.", "L’aide actuelle indique un seul coût pour plusieurs articles du même vendeur soumis ensemble ; dépasser une limite de poids peut entraîner un supplément.", "Confirmez boutique, stock et règles avant de grouper. Une précommande peut retenir le reste."],
      ["Une ligne par vendeur contient marchandises, livraison, ajustement, suivis et résultat d’entrepôt. Trois boutiques peuvent donner trois envois chinois.", "Exemple hypothétique : 2×90+10, 260+12 et 45+0 donnent CNY 507. Ce n’est pas un devis Joyagoo.", "Deux caisses chez le premier vendeur pourraient doubler sa ligne de CNY 10. Gardez les remises à part."],
      ["Processing, Purchased, Seller Sent, Stock Arrived, QC Completed et Stored sont des transferts. Purchased n’est pas expédié.", "Les délais publiés sont des références variables selon le vendeur ; stock, fêtes et précommande empêchent toute promesse.", "À Purchased, demandez confirmation, remise au transporteur, remplacement ou annulation."],
      ["Modifier est plus simple avant l’envoi. Après, il peut falloir attendre l’entrepôt, retourner et recommander, avec le retour intérieur à la charge de l’utilisateur dans le cas publié.", "Vérifiez modèle, couleur, taille et quantité tôt, puis envoyez une instruction unique et datée.", "Une demande d’annulation n’est pas terminée. Évitez le doublon tant que la première voie reste ouverte."],
      ["Livré ne signifie pas Stored. Received précède association, pesée, contrôle et confirmation dans Warehouse.", "Rassemblez commande, vendeur, transporteur, suivi, heure, quantité et colis séparés pour demander l’association.", "Sans mouvement, vérifiez étiquette et collecte ; Received sans Warehouse signale le travail d’entrepôt restant."],
      ["L’entrée finit avec le bon produit et un QC exploitable, pas avec un numéro. Fermez les retours avant consolidation.", "Rapprochez marchandises et livraison chinoise du premier paiement ; notez les retours séparément. Puis ouvrez le budget international.", "Liste : lien, variante, coût, groupe, ajustement, suivi, pièces, réception, QC, retour et total."],
    ]),
  pt: make("ENVIO NACIONAL JOYAGOO", "Envio nacional Joyagoo: do vendedor chinês ao armazém", "Separe a entrega na China do frete internacional, registre custos por vendedor e resolva entradas com evidências.",
    [{ value: "Etapa 1", label: "A entrega nacional pertence ao pagamento do produto" }, { value: "Mesmo vendedor", label: "Um checkout conjunto pode ter uma taxa" }, { value: "Sem exportação", label: "Seller Sent ainda está na China" }],
    ["Definir a fronteira dos custos", "Ler a taxa no checkout", "Criar planilha por vendedor", "Seguir os estados ao armazém", "Separar alterações antes e depois", "Resolver entregue sem estoque", "Fechar a entrada antes do pacote"],
    [
      ["O envio nacional leva o produto do vendedor chinês ao armazém e faz parte do primeiro pagamento, antes de QC e frete internacional.", "Use três colunas: mercadoria, vendedor–armazém e pacote após armazenagem. São trajetos diferentes.", "Não há tarifa universal; vendedor, quantidade, região e checkout ao vivo decidem."],
      ["Salve link, loja, variante, quantidade, subtotal e entrega. Compare qualquer ajuste com esse registro.", "A ajuda atual diz que vários itens do mesmo vendedor enviados juntos têm uma taxa nacional; exceder o limite de peso pode exigir complemento.", "Confirme loja, estoque e regras antes de agrupar. Pré-venda pode atrasar tudo."],
      ["Uma linha por vendedor registra mercadoria, taxa, ajuste, rastreios e armazém. Três lojas podem gerar três envios nacionais.", "Exemplo hipotético: 2×90+10, 260+12 e 45+0 totalizam CNY 507. Não é cotação Joyagoo.", "Dividir o primeiro vendedor em dois checkouts poderia duplicar sua linha de CNY 10. Registre descontos à parte."],
      ["Processing, Purchased, Seller Sent, Stock Arrived, QC Completed e Stored são marcos. Purchased não é envio.", "Os prazos publicados são referências variáveis por vendedor; estoque, feriados e pré-venda impedem promessas.", "Em Purchased, pergunte por confirmação, coleta, substituição ou cancelamento."],
      ["Alterar é mais fácil antes do envio. Depois pode exigir armazém, devolução e nova compra, com retorno nacional pago pelo usuário no caso publicado.", "Revise modelo, cor, tamanho e quantidade cedo e envie uma instrução clara.", "Pedir cancelamento não o conclui. Evite duplicar até esclarecer o primeiro pedido."],
      ["Entregue não significa Stored. Received vem antes de associação, peso, inspeção e confirmação.", "Reúna pedido, vendedor, transportadora, rastreio, hora, quantidade e pacotes divididos para pedir associação.", "Sem movimento verifique etiqueta e coleta; Received sem Warehouse indica trabalho pendente."],
      ["A entrada termina com o produto correto e QC útil, não com um número. Feche devoluções antes da consolidação.", "Reconcilie mercadoria e frete nacional com o primeiro pagamento; registre devoluções à parte. Depois monte o orçamento internacional.", "Lista: link, variante, taxa, grupo, ajuste, rastreio, peças, entrada, QC, devolução e total."],
    ]),
  ro: make("TRANSPORT INTERN JOYAGOO", "Transport intern Joyagoo: de la vânzătorul chinez la depozit", "Separă livrarea din China de transportul internațional, înregistrează costurile per vânzător și clarifică recepția cu dovezi.",
    [{ value: "Etapa 1", label: "Livrarea internă aparține plății produsului" }, { value: "Același vânzător", label: "Un checkout comun poate avea o taxă" }, { value: "Fără export", label: "Seller Sent rămâne în China" }],
    ["Stabilește limita costurilor", "Citește taxa la checkout", "Creează tabel per vânzător", "Urmărește stările până la depozit", "Separă modificările înainte și după", "Rezolvă livrat fără stocare", "Închide etapa înainte de colet"],
    [
      ["Transportul intern mută produsul de la vânzător la depozit și ține de prima plată, înainte de QC și transport internațional.", "Folosește trei coloane: marfă, vânzător–depozit și colet după stocare. Sunt trasee diferite.", "Nu există tarif universal; contează vânzătorul, cantitatea, regiunea și checkout-ul actual."],
      ["Păstrează linkul, magazinul, varianta, cantitatea, subtotalul și livrarea. Compară orice ajustare cu această dovadă.", "Ajutorul actual spune că articolele aceluiași vânzător trimise împreună au o taxă; depășirea limitei de greutate poate cere supliment.", "Confirmă magazinul, stocul și regulile înainte de grupare. Precomanda poate întârzia totul."],
      ["Un rând per vânzător conține marfă, taxă, ajustare, urmăriri și depozit. Trei magazine pot produce trei livrări interne.", "Exemplu ipotetic: 2×90+10, 260+12 și 45+0 fac CNY 507. Nu este ofertă Joyagoo.", "Două checkout-uri la primul vânzător ar putea dubla linia de CNY 10. Reducerile rămân separate."],
      ["Processing, Purchased, Seller Sent, Stock Arrived, QC Completed și Stored sunt predări diferite. Purchased nu înseamnă expediat.", "Timpii publicați sunt orientativi și variază după vânzător; stocul, sărbătorile și precomanda exclud promisiuni.", "La Purchased întreabă despre confirmare, predare, înlocuire sau anulare."],
      ["Modificarea e mai ușoară înainte de expediere. După poate necesita recepție, retur și comandă nouă, cu retur intern plătit de utilizator în cazul publicat.", "Verifică modelul, culoarea, mărimea și cantitatea devreme și trimite o instrucțiune clară.", "Cererea de anulare nu este finală. Evită dublarea până când primul traseu e clar."],
      ["Livrat nu înseamnă Stored. Received precede asocierea, cântărirea, QC și confirmarea.", "Adună comanda, vânzătorul, transportatorul, urmărirea, ora, cantitatea și coletele separate pentru asociere.", "Fără mișcare verifică eticheta și preluarea; Received fără Warehouse arată lucru restant."],
      ["Etapa se încheie cu produsul corect și QC util, nu cu un număr. Închide retururile înainte de consolidare.", "Reconciliază marfa și transportul intern cu prima plată; ține retururile separat. Apoi bugetează coletul.", "Listă: link, variantă, taxă, grupare, ajustare, urmărire, piese, recepție, QC, retur și total."],
    ]),
  sv: make("JOYAGOO INRIKESFRAKT", "Joyagoo inrikesfrakt: från kinesisk säljare till lager", "Skilj leverans i Kina från internationell frakt, registrera kostnad per säljare och utred inleverans med bevis.",
    [{ value: "Steg 1", label: "Inrikesfrakt hör till produktbetalningen" }, { value: "Samma säljare", label: "En gemensam kassa kan ha en avgift" }, { value: "Ingen export", label: "Seller Sent är fortfarande i Kina" }],
    ["Dra kostnadsgränsen först", "Läs avgiften i produktkassan", "Skapa en rad per säljare", "Följ statuskedjan till lagret", "Skilj ändringar före och efter", "Utred levererat utan lagerpost", "Stäng inrikessteget före paketet"],
    [
      ["Joyagoo inrikesfrakt går från kinesisk säljare till lagret och hör till första betalningen före QC och internationell frakt.", "Använd tre kolumner: vara, säljare–lager och paket efter lagring. Det är olika resor.", "Ingen enhetlig taxa finns; säljare, antal, region och aktuell kassa avgör."],
      ["Spara länk, butik, variant, antal, delsumma och leverans. Jämför varje justering med detta.", "Aktuell hjälp säger att flera varor från samma säljare som skickas tillsammans har en avgift; över viktgräns kan tillägg krävas.", "Bekräfta butik, lager och mängdregler före gruppering. Förbeställning kan fördröja allt."],
      ["En rad per säljare innehåller vara, avgift, justering, spårning och lagerresultat. Tre butiker kan ge tre inrikespaket.", "Hypotetiskt: 2×90+10, 260+12 och 45+0 blir CNY 507. Det är inget Joyagoo-pris.", "Två kassor hos första säljaren kan dubbla dess CNY 10-rad. Håll rabatter separat."],
      ["Processing, Purchased, Seller Sent, Stock Arrived, QC Completed och Stored är olika överlämningar. Purchased är inte skickat.", "Publicerade tider är exempel som varierar per säljare; lager, helger och förbeställning hindrar löften.", "Vid Purchased fråga om bekräftelse, överlämning, ersättning eller avbokning."],
      ["Ändring är enklare före utskick. Efteråt kan mottagning, retur och ny order krävas, med inrikes retur betald av användaren i publicerat fall.", "Kontrollera modell, färg, storlek och antal tidigt och skicka en tydlig instruktion.", "Avbokningsbegäran är inte avslut. Undvik dubblett tills första vägen är klar."],
      ["Levererat är inte Stored. Received kommer före matchning, vägning, QC och bekräftelse.", "Samla order, säljare, transportör, spårning, tid, antal och delpaket för matchning.", "Utan rörelse kontrollera etikett och hämtning; Received utan Warehouse visar väntande lagerarbete."],
      ["Steget slutar med rätt vara och användbart QC, inte ett nummer. Stäng returer före konsolidering.", "Stäm av vara och inrikeskostnad med första betalningen; håll returer separat. Budgetera sedan paketet.", "Lista: länk, variant, avgift, grupp, justering, spårning, delar, mottagning, QC, retur och total."],
    ]),
};

export const domesticShippingArticles: Record<Locale, SeoArticle> = { en, zh, ...localizedData };

export const domesticShippingSourceBodies: Record<Locale, string> = {
  en: "Fact-checked on 11 August 2026 against current Joyagoo Shopping Guidance, domestic-fee guidance for same-seller orders, shopping-order processing information, order-status explanations, modification guidance and received-versus-stored help. Seller timing and checkout charges remain variable.",
  zh: "事实核查于2026年8月11日，依据Joyagoo当前购买指南、同店境内运费、订单处理、状态、修改及Received与Stored说明；卖家时效和结账费用仍以实时订单为准。",
  de: "Am 11. August 2026 anhand aktueller Joyagoo-Hinweise zu Einkauf, Inlandsgebühr, Bearbeitung, Status, Änderung sowie Received und Stored geprüft; Verkäuferzeit und Kasse bleiben variabel.",
  pl: "Sprawdzono 11 sierpnia 2026 z aktualnymi poradami Joyagoo o zakupie, opłacie krajowej, obsłudze, statusach, zmianach i Received/Stored; czas i checkout pozostają zmienne.",
  es: "Verificado el 11 de agosto de 2026 con las guías actuales de compra, tarifa nacional, proceso, estados, cambios y Received/Stored de Joyagoo; tiempos y checkout siguen variables.",
  it: "Verificato l’11 agosto 2026 sulle guide Joyagoo attuali per acquisto, tariffa nazionale, processo, stati, modifiche e Received/Stored; tempi e checkout restano variabili.",
  fr: "Vérifié le 11 août 2026 avec les pages Joyagoo actuelles sur achat, livraison intérieure, traitement, statuts, modifications et Received/Stored ; délais et caisse restent variables.",
  pt: "Verificado em 11 de agosto de 2026 nas orientações Joyagoo sobre compra, taxa nacional, processo, estados, alterações e Received/Stored; prazos e checkout variam.",
  ro: "Verificat la 11 august 2026 cu ghidurile Joyagoo despre cumpărare, taxă internă, procesare, stări, modificări și Received/Stored; timpii și checkout-ul variază.",
  sv: "Kontrollerad 11 augusti 2026 mot aktuell Joyagoo-hjälp om köp, inrikesavgift, behandling, status, ändringar och Received/Stored; tider och kassa varierar.",
};
