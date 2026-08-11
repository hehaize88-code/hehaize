import type { ProductCollection } from "./data";
import type { Locale } from "./i18n";

type ProductPageCopy = {
  directory: string;
  referencePrice: string;
  sourcePrice: string;
  productId: string;
  checked: string;
  overviewTitle: string;
  overviewBody: string;
  qcTitle: string;
  qcIntro: string;
  qcItems: string[];
  shippingTitle: string;
  shippingBody: string;
  relatedTitle: string;
  openListing: string;
  backToSpreadsheet: string;
  priceNotice: string;
};

export const collectionNames: Record<
  Locale,
  Record<ProductCollection, string>
> = {
  en: {
    Footwear: "Footwear",
    Clothing: "Clothing",
    "Bags & Accessories": "Bags & Accessories",
    "Watches & Tech": "Watches & Tech",
  },
  zh: {
    Footwear: "鞋类",
    Clothing: "服装",
    "Bags & Accessories": "箱包与配饰",
    "Watches & Tech": "腕表与科技",
  },
  de: {
    Footwear: "Schuhe",
    Clothing: "Bekleidung",
    "Bags & Accessories": "Taschen & Accessoires",
    "Watches & Tech": "Uhren & Technik",
  },
  pl: {
    Footwear: "Obuwie",
    Clothing: "Odzież",
    "Bags & Accessories": "Torby i akcesoria",
    "Watches & Tech": "Zegarki i technologia",
  },
  es: {
    Footwear: "Calzado",
    Clothing: "Ropa",
    "Bags & Accessories": "Bolsos y accesorios",
    "Watches & Tech": "Relojes y tecnología",
  },
  it: {
    Footwear: "Calzature",
    Clothing: "Abbigliamento",
    "Bags & Accessories": "Borse e accessori",
    "Watches & Tech": "Orologi e tecnologia",
  },
  fr: {
    Footwear: "Chaussures",
    Clothing: "Vêtements",
    "Bags & Accessories": "Sacs et accessoires",
    "Watches & Tech": "Montres et technologie",
  },
  pt: {
    Footwear: "Calçado",
    Clothing: "Vestuário",
    "Bags & Accessories": "Malas e acessórios",
    "Watches & Tech": "Relógios e tecnologia",
  },
  ro: {
    Footwear: "Încălțăminte",
    Clothing: "Îmbrăcăminte",
    "Bags & Accessories": "Genți și accesorii",
    "Watches & Tech": "Ceasuri și tehnologie",
  },
  sv: {
    Footwear: "Skor",
    Clothing: "Kläder",
    "Bags & Accessories": "Väskor och accessoarer",
    "Watches & Tech": "Klockor och teknik",
  },
};

export const productPageCopy: Record<Locale, ProductPageCopy> = {
  en: {
    directory: "Joyagoo product directory",
    referencePrice: "USD reference",
    sourcePrice: "Source price",
    productId: "Product ID",
    checked: "Listing checked",
    overviewTitle: "What this product page confirms",
    overviewBody:
      "The name, product ID, source price and image on this page were matched to the linked product listing on the checked date. Open the source product page before paying because stock, variants, seller notes and price can change.",
    qcTitle: "QC checks to make before accepting",
    qcIntro:
      "Use warehouse photos as evidence, not as a guarantee. Compare the exact paid variant and request one precise additional view when a decision-critical detail is missing.",
    qcItems: [
      "Confirm colour, model, size or specification against the paid order.",
      "Inspect shape, symmetry, stitching, edges, hardware and visible finish.",
      "Ask for a ruler-based measurement when fit or dimensions matter.",
      "Check expected packaging, labels, accessories and included parts.",
    ],
    shippingTitle: "Plan the parcel around the actual item",
    shippingBody:
      "International cost depends on packed weight, dimensions, destination, product restrictions and the available route. Retail packaging may protect the item but increase volumetric weight, so decide after QC and before parcel submission.",
    relatedTitle: "Related checked products",
    openListing: "Open matching product listing ↗",
    backToSpreadsheet: "Back to the spreadsheet",
    priceNotice:
      "The USD figure is a reference conversion, not a checkout quote. The live source price and payment screen are final.",
  },
  zh: {
    directory: "Joyagoo 商品目录",
    referencePrice: "美元参考价",
    sourcePrice: "来源价格",
    productId: "商品ID",
    checked: "商品核查日期",
    overviewTitle: "本商品页已核对的内容",
    overviewBody:
      "本页商品名、商品ID、来源价格和图片已在标注日期与对应的商品页面逐项核对。付款前仍应打开来源商品页面，因为库存、规格、卖家说明和价格可能变化。",
    qcTitle: "确认收货前的质检重点",
    qcIntro:
      "仓库照片是核对证据，不是质量保证。请对照已付款规格；如果影响决定的细节看不清，只提出一个明确的补拍要求。",
    qcItems: [
      "把颜色、型号、尺码或规格与已付款订单逐项核对。",
      "检查外形、对称性、走线、边缘、五金和可见做工。",
      "涉及合身或尺寸时，要求提供带尺子的实测照片。",
      "确认应有包装、标签、配件和随附部件是否齐全。",
    ],
    shippingTitle: "按商品实际情况规划包裹",
    shippingBody:
      "国际运费取决于打包后的重量和尺寸、目的地、商品限制及实时可选线路。零售包装可能保护商品，也可能增加体积重，应在质检后、提交包裹前决定。",
    relatedTitle: "相关已核查商品",
    openListing: "打开对应主站商品页 ↗",
    backToSpreadsheet: "返回选品表",
    priceNotice: "美元金额仅供参考，不是结账报价；以实时来源价格和付款页面为准。",
  },
  de: {
    directory: "Joyagoo-Produktverzeichnis",
    referencePrice: "USD-Referenz",
    sourcePrice: "Ausgangspreis",
    productId: "Produkt-ID",
    checked: "Angebot geprüft",
    overviewTitle: "Was diese Produktseite bestätigt",
    overviewBody:
      "Name, Produkt-ID, Ausgangspreis und Bild wurden am Prüftag mit dem verlinkten Produktangebot abgeglichen. Vor der Zahlung die Quellseite öffnen, da Bestand, Varianten, Verkäuferhinweise und Preis wechseln können.",
    qcTitle: "QC-Prüfungen vor der Annahme",
    qcIntro:
      "Lagerfotos sind Belege, keine Garantie. Vergleiche die bezahlte Variante und fordere bei einem entscheidenden fehlenden Detail eine gezielte Zusatzansicht an.",
    qcItems: [
      "Farbe, Modell, Größe oder Spezifikation mit der bezahlten Bestellung abgleichen.",
      "Form, Symmetrie, Nähte, Kanten, Beschläge und sichtbare Verarbeitung prüfen.",
      "Bei Passform oder Maßen ein Foto mit Lineal anfordern.",
      "Erwartete Verpackung, Etiketten, Zubehör und Teile kontrollieren.",
    ],
    shippingTitle: "Das Paket nach dem tatsächlichen Artikel planen",
    shippingBody:
      "Internationale Kosten hängen von Packgewicht, Maßen, Ziel, Beschränkungen und Route ab. Verkaufsverpackung kann schützen, aber das Volumengewicht erhöhen; entscheide nach QC und vor Paketeinreichung.",
    relatedTitle: "Ähnliche geprüfte Produkte",
    openListing: "Passendes Produktangebot öffnen ↗",
    backToSpreadsheet: "Zurück zur Tabelle",
    priceNotice:
      "Der USD-Wert ist nur eine Referenz, kein Kassenpreis. Maßgeblich sind Live-Preis und Zahlungsseite.",
  },
  pl: {
    directory: "Katalog produktów Joyagoo",
    referencePrice: "Cena orientacyjna USD",
    sourcePrice: "Cena źródłowa",
    productId: "ID produktu",
    checked: "Oferta sprawdzona",
    overviewTitle: "Co potwierdza ta strona produktu",
    overviewBody:
      "Nazwa, ID, cena źródłowa i zdjęcie zostały porównane z podaną ofertą produktu w dniu kontroli. Przed płatnością otwórz stronę źródłową, ponieważ zapasy, warianty, uwagi i cena mogą się zmienić.",
    qcTitle: "Kontrole QC przed akceptacją",
    qcIntro:
      "Zdjęcia magazynowe są dowodem, a nie gwarancją. Porównaj opłacony wariant i poproś o jedno dokładne ujęcie, jeśli brakuje ważnego szczegółu.",
    qcItems: [
      "Porównaj kolor, model, rozmiar lub specyfikację z opłaconym zamówieniem.",
      "Sprawdź kształt, symetrię, szwy, krawędzie, okucia i wykończenie.",
      "Gdy liczą się wymiary, poproś o zdjęcie z linijką.",
      "Sprawdź opakowanie, metki, akcesoria i dołączone części.",
    ],
    shippingTitle: "Planuj paczkę według rzeczywistego produktu",
    shippingBody:
      "Koszt zależy od masy i wymiarów paczki, celu, ograniczeń i dostępnej linii. Opakowanie może chronić produkt, ale zwiększyć wagę objętościową; zdecyduj po QC.",
    relatedTitle: "Powiązane sprawdzone produkty",
    openListing: "Otwórz pasującą ofertę ↗",
    backToSpreadsheet: "Wróć do arkusza",
    priceNotice:
      "Kwota USD jest orientacyjna, nie stanowi ceny przy kasie. Obowiązuje aktualna cena źródłowa.",
  },
  es: {
    directory: "Directorio de productos Joyagoo",
    referencePrice: "Referencia en USD",
    sourcePrice: "Precio de origen",
    productId: "ID del producto",
    checked: "Oferta comprobada",
    overviewTitle: "Qué confirma esta página",
    overviewBody:
      "Nombre, ID, precio de origen e imagen se contrastaron con la ficha de producto enlazada en la fecha indicada. Abre la página de origen antes de pagar porque existencias, variantes, notas y precio pueden cambiar.",
    qcTitle: "Controles QC antes de aceptar",
    qcIntro:
      "Las fotos del almacén aportan pruebas, no una garantía. Compara la variante pagada y pide una vista concreta si falta un detalle decisivo.",
    qcItems: [
      "Confirma color, modelo, talla o especificación con el pedido pagado.",
      "Revisa forma, simetría, costuras, bordes, herrajes y acabado visible.",
      "Pide una foto con regla cuando importen ajuste o medidas.",
      "Comprueba embalaje, etiquetas, accesorios y piezas incluidas.",
    ],
    shippingTitle: "Planifica el paquete según el artículo real",
    shippingBody:
      "El coste internacional depende del peso y tamaño embalados, destino, restricciones y ruta disponible. El embalaje comercial protege, pero puede aumentar el peso volumétrico.",
    relatedTitle: "Productos relacionados comprobados",
    openListing: "Abrir la oferta correspondiente ↗",
    backToSpreadsheet: "Volver a la hoja",
    priceNotice:
      "El importe en USD es orientativo, no una cotización de pago. Valen el precio y la pantalla actuales.",
  },
  it: {
    directory: "Catalogo prodotti Joyagoo",
    referencePrice: "Riferimento USD",
    sourcePrice: "Prezzo di origine",
    productId: "ID prodotto",
    checked: "Inserzione verificata",
    overviewTitle: "Cosa conferma questa pagina",
    overviewBody:
      "Nome, ID, prezzo e immagine sono stati confrontati con l’inserzione prodotto collegata alla data indicata. Prima del pagamento apri la pagina di origine, perché disponibilità, varianti, note e prezzo possono cambiare.",
    qcTitle: "Controlli QC prima dell’accettazione",
    qcIntro:
      "Le foto di magazzino sono prove, non garanzie. Confronta la variante pagata e chiedi una vista precisa quando manca un dettaglio decisivo.",
    qcItems: [
      "Conferma colore, modello, taglia o specifica con l’ordine pagato.",
      "Controlla forma, simmetria, cuciture, bordi, metallo e finitura.",
      "Chiedi una foto con righello quando contano vestibilità o misure.",
      "Verifica confezione, etichette, accessori e parti incluse.",
    ],
    shippingTitle: "Pianifica il pacco sul prodotto reale",
    shippingBody:
      "Il costo internazionale dipende da peso e misure imballati, destinazione, restrizioni e rotta. La confezione può proteggere ma aumentare il peso volumetrico.",
    relatedTitle: "Prodotti verificati correlati",
    openListing: "Apri l’inserzione corrispondente ↗",
    backToSpreadsheet: "Torna al foglio",
    priceNotice:
      "Il valore USD è indicativo, non un preventivo di pagamento. Fanno fede prezzo live e schermata di pagamento.",
  },
  fr: {
    directory: "Répertoire de produits Joyagoo",
    referencePrice: "Référence en USD",
    sourcePrice: "Prix source",
    productId: "ID produit",
    checked: "Annonce vérifiée",
    overviewTitle: "Ce que confirme cette page",
    overviewBody:
      "Le nom, l’ID, le prix source et l’image ont été comparés à la fiche produit liée à la date indiquée. Ouvrez la page source avant paiement, car stock, variantes, notes et prix peuvent changer.",
    qcTitle: "Contrôles QC avant acceptation",
    qcIntro:
      "Les photos d’entrepôt sont des preuves, pas une garantie. Comparez la variante payée et demandez une vue précise lorsqu’un détail décisif manque.",
    qcItems: [
      "Confirmez couleur, modèle, taille ou spécification avec la commande payée.",
      "Contrôlez forme, symétrie, coutures, bords, métal et finition visible.",
      "Demandez une photo avec règle si ajustement ou dimensions comptent.",
      "Vérifiez emballage, étiquettes, accessoires et pièces incluses.",
    ],
    shippingTitle: "Planifier le colis selon l’article réel",
    shippingBody:
      "Le coût dépend du poids et des dimensions emballés, de la destination, des restrictions et de la ligne. L’emballage protège mais peut augmenter le poids volumétrique.",
    relatedTitle: "Produits vérifiés associés",
    openListing: "Ouvrir l’annonce correspondante ↗",
    backToSpreadsheet: "Retour au tableur",
    priceNotice:
      "Le montant USD est indicatif, sans valeur de devis. Le prix actuel et l’écran de paiement prévalent.",
  },
  pt: {
    directory: "Diretório de produtos Joyagoo",
    referencePrice: "Referência em USD",
    sourcePrice: "Preço de origem",
    productId: "ID do produto",
    checked: "Oferta verificada",
    overviewTitle: "O que esta página confirma",
    overviewBody:
      "Nome, ID, preço e imagem foram comparados com a oferta de produto na data indicada. Abra a página de origem antes de pagar, pois stock, variantes, notas e preço podem mudar.",
    qcTitle: "Controlos QC antes de aceitar",
    qcIntro:
      "As fotos do armazém são provas, não garantia. Compare a variante paga e peça uma vista objetiva quando faltar um detalhe decisivo.",
    qcItems: [
      "Confirme cor, modelo, tamanho ou especificação com o pedido pago.",
      "Verifique forma, simetria, costuras, bordas, ferragens e acabamento.",
      "Peça fotografia com régua quando ajuste ou medidas forem importantes.",
      "Confira embalagem, etiquetas, acessórios e peças incluídas.",
    ],
    shippingTitle: "Planear o pacote pelo artigo real",
    shippingBody:
      "O custo depende do peso e dimensões embalados, destino, restrições e rota. A embalagem protege, mas pode aumentar o peso volumétrico.",
    relatedTitle: "Produtos verificados relacionados",
    openListing: "Abrir oferta correspondente ↗",
    backToSpreadsheet: "Voltar à planilha",
    priceNotice:
      "O valor em USD é apenas referência. O preço atual e o ecrã de pagamento são finais.",
  },
  ro: {
    directory: "Catalog de produse Joyagoo",
    referencePrice: "Referință USD",
    sourcePrice: "Preț sursă",
    productId: "ID produs",
    checked: "Ofertă verificată",
    overviewTitle: "Ce confirmă această pagină",
    overviewBody:
      "Numele, ID-ul, prețul și imaginea au fost comparate cu pagina produsului la data indicată. Deschide pagina sursă înainte de plată deoarece stocul, variantele, notele și prețul se pot schimba.",
    qcTitle: "Verificări QC înainte de acceptare",
    qcIntro:
      "Fotografiile din depozit sunt dovezi, nu garanții. Compară varianta plătită și cere o imagine precisă dacă lipsește un detaliu important.",
    qcItems: [
      "Confirmă culoarea, modelul, mărimea sau specificația cu comanda plătită.",
      "Verifică forma, simetria, cusăturile, marginile, feroneria și finisajul.",
      "Cere o fotografie cu riglă când contează potrivirea sau dimensiunile.",
      "Controlează ambalajul, etichetele, accesoriile și piesele incluse.",
    ],
    shippingTitle: "Planifică coletul după produsul real",
    shippingBody:
      "Costul depinde de greutatea și dimensiunile ambalate, destinație, restricții și rută. Ambalajul protejează, dar poate crește greutatea volumetrică.",
    relatedTitle: "Produse verificate asociate",
    openListing: "Deschide oferta corespunzătoare ↗",
    backToSpreadsheet: "Înapoi la tabel",
    priceNotice:
      "Valoarea USD este orientativă, nu ofertă de plată. Prețul live și pagina de plată sunt decisive.",
  },
  sv: {
    directory: "Joyagoo produktkatalog",
    referencePrice: "USD-referens",
    sourcePrice: "Källpris",
    productId: "Produkt-ID",
    checked: "Annons kontrollerad",
    overviewTitle: "Vad den här sidan bekräftar",
    overviewBody:
      "Namn, ID, källpris och bild jämfördes med den länkade produktsidan på angivet datum. Öppna källsidan före betalning eftersom lager, varianter, anteckningar och pris kan ändras.",
    qcTitle: "QC-kontroller före godkännande",
    qcIntro:
      "Lagerbilder är bevis, inte garanti. Jämför den betalda varianten och be om en exakt bild om en avgörande detalj saknas.",
    qcItems: [
      "Bekräfta färg, modell, storlek eller specifikation mot den betalda ordern.",
      "Kontrollera form, symmetri, sömmar, kanter, beslag och synlig finish.",
      "Be om ett foto med linjal när passform eller mått spelar roll.",
      "Kontrollera förpackning, etiketter, tillbehör och medföljande delar.",
    ],
    shippingTitle: "Planera paketet efter den verkliga varan",
    shippingBody:
      "Kostnaden beror på packad vikt och storlek, destination, begränsningar och rutt. Butiksförpackning kan skydda men öka volymvikten.",
    relatedTitle: "Relaterade kontrollerade produkter",
    openListing: "Öppna motsvarande produktannons ↗",
    backToSpreadsheet: "Tillbaka till kalkylbladet",
    priceNotice:
      "USD-beloppet är en referens, inte ett betalningspris. Aktuellt pris och betalningssida gäller.",
  },
};
