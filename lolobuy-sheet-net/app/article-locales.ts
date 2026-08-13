import type { ArticleRecord } from "./article-data";
import type { LocalizedLocale } from "./i18n";
import type { Locale } from "./translations";

type ArticleSlug =
  | "how-to-use-lolobuy-spreadsheet"
  | "lolobuy-qc-photos-guide"
  | "lolobuy-shipping-cost-guide"
  | "how-to-buy-from-lolobuy"
  | "lolobuy-hoodie-size-guide"
  | "lolobuy-bag-qc-guide"
  | "lolobuy-stitching-finish-qc-checklist"
  | "lolobuy-alignment-symmetry-print-placement-qc";

type TopicCopy = {
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  intent: string;
  standfirst: string;
  focus: string;
};

const topics: Record<LocalizedLocale, Record<ArticleSlug, TopicCopy>> = {
  es: {
    "how-to-use-lolobuy-spreadsheet": {
      title: "Cómo usar una hoja LoloBuy sin perder el contexto original del producto",
      shortTitle: "Cómo usar una hoja LoloBuy",
      description: "Guía práctica para usar enlaces, variantes y notas de vendedor de una hoja LoloBuy antes de comprar.",
      eyebrow: "Guía de descubrimiento de productos",
      intent: "Encontrar productos y saber qué comprobar antes del pedido",
      standfirst: "Una hoja acorta la búsqueda, pero no sustituye el anuncio. Conserva el enlace, define la variante exacta y trata el pedido, el control del almacén y el envío como decisiones separadas.",
      focus: "usar una hoja LoloBuy con el contexto completo del producto",
    },
    "lolobuy-qc-photos-guide": {
      title: "Fotos QC de LoloBuy: guía de inspección de almacén sin suposiciones",
      shortTitle: "Guía de fotos QC de LoloBuy",
      description: "Cómo revisar identidad, variante, medidas y estado visible en las fotos QC de LoloBuy, con límites claros.",
      eyebrow: "Guía de inspección de almacén",
      intent: "Revisar una llegada al almacén antes de enviar el paquete",
      standfirst: "Un buen QC compara lo pedido con lo recibido. Empieza por identidad y variante, continúa con medidas y estado visible y decide si las fotos responden a las preguntas que realmente cambiarían tu decisión.",
      focus: "revisar las fotos QC y la evidencia visible del almacén",
    },
    "lolobuy-shipping-cost-guide": {
      title: "Coste de envío LoloBuy: peso, tamaño, rutas y consolidación",
      shortTitle: "Guía de envío LoloBuy",
      description: "Planifica el envío LoloBuy con peso real y volumétrico, dimensiones, rutas, consolidación y embalaje.",
      eyebrow: "Guía de paquetes internacionales",
      intent: "Estimar y planificar el paquete después de la llegada al almacén",
      standfirst: "El precio del producto no permite conocer el porte internacional. La estimación útil empieza con datos reales del almacén, dimensiones embaladas, restricciones de ruta y una comparación separada de cada opción.",
      focus: "planificar el coste y la ruta del envío internacional",
    },
    "how-to-buy-from-lolobuy": {
      title: "Cómo comprar con LoloBuy: del enlace original al almacén",
      shortTitle: "Cómo comprar con LoloBuy",
      description: "Proceso práctico para conservar el enlace, pedir la variante correcta y revisar la llegada al almacén con LoloBuy.",
      eyebrow: "Proceso del pedido al almacén",
      intent: "Pasar de un enlace de producto a un pedido verificable",
      standfirst: "La compra empieza antes del pago. Guarda el anuncio, escribe la opción exacta y decide qué evidencia necesitarás en el almacén para que cada traspaso mantenga el producto inequívoco.",
      focus: "comprar con LoloBuy desde el enlace hasta el almacén",
    },
    "lolobuy-hoodie-size-guide": {
      title: "Guía de tallas de sudaderas LoloBuy: mide antes de pedir",
      shortTitle: "Tallas de sudaderas LoloBuy",
      description: "Compara medidas de una sudadera, tabla del vendedor, ajuste y controles visibles de almacén antes del envío.",
      eyebrow: "Guía de tallas y QC de sudaderas",
      intent: "Elegir una talla mediante medidas de la prenda y verificarla",
      standfirst: "No conviertas una talla habitual de forma automática. Compara una prenda que te quede bien con la tabla del vendedor y define la posición exacta de cualquier medida solicitada al almacén.",
      focus: "elegir y comprobar la talla de una sudadera",
    },
    "lolobuy-bag-qc-guide": {
      title: "QC de bolsos LoloBuy: estructura, correas, herrajes y medidas",
      shortTitle: "Guía QC de bolsos LoloBuy",
      description: "Revisa tamaño, estructura, correas, cierres, herrajes y estado visible de un bolso antes de enviarlo.",
      eyebrow: "Guía de medidas y QC de bolsos",
      intent: "Verificar dimensiones, estructura y funciones antes de aceptar el artículo",
      standfirst: "El QC de un bolso empieza por la variante y las dimensiones. Después revisa estructura, correas, cierres y herrajes visibles, sin confundir una fotografía con una prueba de capacidad o durabilidad.",
      focus: "comprobar medidas, estructura y herrajes de un bolso",
    },
    "lolobuy-stitching-finish-qc-checklist": {
      title: "QC de costuras y acabados LoloBuy: checklist de fotos de almacén",
      shortTitle: "QC de costuras y acabados LoloBuy",
      description: "Revisa uniones funcionales, simetría, bordes, hilos y acabados visibles sin convertir cada marca cosmética en un defecto.",
      eyebrow: "QC de costuras y acabados",
      intent: "Decidir si la evidencia visible se acepta, requiere una comprobación o documenta una diferencia material",
      standfirst: "Un hilo suelto no siempre significa fallo y una costura limpia no demuestra duración. Confirma primero el artículo, revisa las uniones funcionales y después valora simetría, bordes y acabado cosmético.",
      focus: "revisar costuras y acabados visibles por función y evidencia",
    },
    "lolobuy-alignment-symmetry-print-placement-qc": {
      title: "QC de alineación LoloBuy: simetría y posición del estampado",
      shortTitle: "QC de alineación LoloBuy",
      description: "Distingue una diferencia real de simetría o posición del efecto de perspectiva en las fotos de almacén.",
      eyebrow: "QC de alineación y posición",
      intent: "Separar una diferencia real de alineación del ángulo de cámara antes de aprobar el QC",
      standfirst: "Un estampado puede parecer inclinado porque la prenda está doblada o la cámara no está centrada. Usa líneas propias del artículo y puntos equivalentes antes de decidir.",
      focus: "comprobar alineación, simetría y posición del estampado sin confundir perspectiva con un defecto",
    },
  },
  de: {
    "how-to-use-lolobuy-spreadsheet": {
      title: "So nutzt du ein LoloBuy Spreadsheet, ohne den Produktkontext zu verlieren",
      shortTitle: "LoloBuy Spreadsheet richtig nutzen",
      description: "Praktischer Ratgeber zu Quelllinks, Varianten und Verkäuferhinweisen vor einer Bestellung.",
      eyebrow: "Ratgeber zur Produktsuche",
      intent: "Produkte finden und die nötigen Prüfungen vor der Bestellung verstehen",
      standfirst: "Ein Spreadsheet verkürzt die Suche, ersetzt aber nicht das Live-Angebot. Sichere die Quelle, definiere die genaue Variante und behandle Bestellung, Lagerprüfung und Versand als getrennte Entscheidungen.",
      focus: "ein LoloBuy Spreadsheet mit vollständigem Produktkontext zu nutzen",
    },
    "lolobuy-qc-photos-guide": {
      title: "LoloBuy QC-Fotos: Lagerprüfung ohne Rätselraten",
      shortTitle: "LoloBuy QC-Foto-Ratgeber",
      description: "Identität, Variante, Maße und sichtbaren Zustand in LoloBuy QC-Fotos strukturiert prüfen.",
      eyebrow: "Ratgeber zur Lagerprüfung",
      intent: "Einen Lagereingang vor der Paketfreigabe prüfen",
      standfirst: "Gute QC vergleicht die Bestellung mit dem Wareneingang. Prüfe zuerst Identität und Variante, dann Maße und sichtbaren Zustand und schließlich, ob die Bilder deine entscheidenden Fragen beantworten.",
      focus: "QC-Fotos und sichtbare Lagerinformationen zu prüfen",
    },
    "lolobuy-shipping-cost-guide": {
      title: "LoloBuy Versandkosten: Gewicht, Paketgröße, Routen und Konsolidierung",
      shortTitle: "LoloBuy Versandkosten-Ratgeber",
      description: "Versand mit Real- und Volumengewicht, Paketmaßen, Routenlimits, Konsolidierung und Verpackung planen.",
      eyebrow: "Ratgeber für internationale Pakete",
      intent: "Ein Paket nach dem Lagereingang realistisch planen",
      standfirst: "Vom Produktpreis lässt sich der internationale Versand nicht zuverlässig ableiten. Nutze Lagerdaten, verpackte Maße, Routenlimits und einen getrennten Vergleich der verfügbaren Optionen.",
      focus: "Kosten und Route eines internationalen Pakets zu planen",
    },
    "how-to-buy-from-lolobuy": {
      title: "So kaufst du mit LoloBuy: vom Quelllink bis zum Lager",
      shortTitle: "Mit LoloBuy einkaufen",
      description: "Quelllink sichern, genaue Variante bestellen und den Lagereingang nachvollziehbar prüfen.",
      eyebrow: "Ablauf von Bestellung bis Lager",
      intent: "Aus einem Produktlink eine überprüfbare Bestellung machen",
      standfirst: "Der Kauf beginnt vor der Zahlung. Sichere das Angebot, notiere die genaue Option und lege fest, welche Lagerinformationen deine Entscheidung ändern würden.",
      focus: "mit LoloBuy vom Produktlink bis zum Lager zu bestellen",
    },
    "lolobuy-hoodie-size-guide": {
      title: "LoloBuy Hoodie-Größenratgeber: vor der Bestellung messen",
      shortTitle: "LoloBuy Hoodie-Größen",
      description: "Kleidungsmaße, Verkäufertabelle, Passform und sichtbare Lagerkontrollen für Hoodies vergleichen.",
      eyebrow: "Ratgeber zu Hoodie-Größe und QC",
      intent: "Eine Größe anhand von Kleidungsmaßen wählen und prüfen",
      standfirst: "Übertrage deine übliche Größe nicht automatisch. Vergleiche einen passenden Hoodie mit der Verkäufertabelle und definiere für Lagermaße die genaue Position des Maßbands.",
      focus: "die Größe eines Hoodies zu wählen und zu kontrollieren",
    },
    "lolobuy-bag-qc-guide": {
      title: "LoloBuy Taschen-QC: Maße, Form, Riemen und Beschläge",
      shortTitle: "LoloBuy Taschen-QC-Ratgeber",
      description: "Größe, Form, Riemen, Verschlüsse, Beschläge und sichtbaren Zustand einer Tasche vor dem Versand prüfen.",
      eyebrow: "Ratgeber zu Taschenmaßen und QC",
      intent: "Maße, Form und nutzbare Funktionen vor der Annahme prüfen",
      standfirst: "Taschen-QC beginnt mit Variante und Abmessungen. Prüfe danach Form, Riemen, Verschlüsse und sichtbare Beschläge, ohne Fotos mit einem Beleg für Kapazität oder Haltbarkeit zu verwechseln.",
      focus: "Maße, Form und Beschläge einer Tasche zu prüfen",
    },
    "lolobuy-stitching-finish-qc-checklist": {
      title: "LoloBuy Naht- und Finish-QC: Checkliste für Lagerfotos",
      shortTitle: "LoloBuy Naht- und Finish-QC",
      description: "Funktionale Nähte, Symmetrie, Kanten, Fadenenden und sichtbares Finish prüfen, ohne jedes Detail zum Defekt zu erklären.",
      eyebrow: "Naht- und Finish-QC",
      intent: "Sichtbare Belege akzeptieren, gezielt nachfragen oder eine wesentliche Abweichung dokumentieren",
      standfirst: "Ein Fadenende ist nicht automatisch ein Fehler und eine saubere Naht kein Haltbarkeitsbeweis. Erst Artikel und funktionale Verbindungen bestätigen, dann Symmetrie, Kanten und kosmetisches Finish bewerten.",
      focus: "sichtbare Nähte und Oberflächen nach Funktion und Belegen zu prüfen",
    },
    "lolobuy-alignment-symmetry-print-placement-qc": {
      title: "LoloBuy Ausrichtungs-QC: Symmetrie und Druckposition prüfen",
      shortTitle: "LoloBuy Ausrichtungs-QC",
      description: "Echte Symmetrie- oder Platzierungsabweichungen von Perspektive in Lagerfotos unterscheiden.",
      eyebrow: "Ausrichtungs- und Platzierungs-QC",
      intent: "Vor der QC-Freigabe eine echte Abweichung vom Kamerawinkel trennen",
      standfirst: "Ein Druck kann durch Falten oder einen schrägen Kamerawinkel verschoben wirken. Nutze produktbezogene Referenzlinien und gleiche Merkmale für die Entscheidung.",
      focus: "Ausrichtung, Symmetrie und Druckposition ohne falsche Schlüsse aus der Perspektive zu prüfen",
    },
  },
  fr: {
    "how-to-use-lolobuy-spreadsheet": {
      title: "Comment utiliser un tableur LoloBuy sans perdre le contexte du produit",
      shortTitle: "Bien utiliser un tableur LoloBuy",
      description: "Guide pratique sur les liens source, variantes et notes vendeur à vérifier avant commande.",
      eyebrow: "Guide de recherche de produits",
      intent: "Trouver des produits et comprendre les contrôles avant commande",
      standfirst: "Un tableur raccourcit la recherche, mais ne remplace pas l’annonce en ligne. Conservez la source, définissez la variante exacte et séparez commande, contrôle en entrepôt et expédition.",
      focus: "utiliser un tableur LoloBuy avec tout le contexte du produit",
    },
    "lolobuy-qc-photos-guide": {
      title: "Photos QC LoloBuy : contrôler l’arrivée en entrepôt sans supposer",
      shortTitle: "Guide des photos QC LoloBuy",
      description: "Vérifiez identité, variante, mesures et état visible dans les photos QC LoloBuy, avec leurs limites.",
      eyebrow: "Guide de contrôle en entrepôt",
      intent: "Contrôler une arrivée avant la soumission du colis",
      standfirst: "Un bon QC compare la commande à l’article reçu. Commencez par l’identité et la variante, poursuivez avec les mesures et l’état visible, puis vérifiez si les photos répondent aux questions décisives.",
      focus: "examiner les photos QC et les éléments visibles en entrepôt",
    },
    "lolobuy-shipping-cost-guide": {
      title: "Coût de livraison LoloBuy : poids, dimensions, lignes et consolidation",
      shortTitle: "Guide de livraison LoloBuy",
      description: "Planifiez le colis avec poids réel et volumétrique, dimensions, restrictions, consolidation et emballage.",
      eyebrow: "Guide du colis international",
      intent: "Estimer et préparer le colis après son arrivée en entrepôt",
      standfirst: "Le prix du produit ne permet pas de connaître le fret international. Une estimation utile repose sur les données d’entrepôt, les dimensions emballées, les limites de ligne et une comparaison séparée des options.",
      focus: "préparer le coût et la ligne d’un colis international",
    },
    "how-to-buy-from-lolobuy": {
      title: "Comment acheter avec LoloBuy : du lien source à l’entrepôt",
      shortTitle: "Acheter avec LoloBuy",
      description: "Conservez le lien, commandez la bonne variante et contrôlez l’arrivée en entrepôt de façon traçable.",
      eyebrow: "Parcours de la commande à l’entrepôt",
      intent: "Transformer un lien produit en commande vérifiable",
      standfirst: "L’achat commence avant le paiement. Enregistrez l’annonce, notez l’option exacte et définissez les éléments d’entrepôt nécessaires pour garder une demande sans ambiguïté.",
      focus: "acheter avec LoloBuy du lien produit jusqu’à l’entrepôt",
    },
    "lolobuy-hoodie-size-guide": {
      title: "Guide des tailles de hoodie LoloBuy : mesurer avant de commander",
      shortTitle: "Tailles de hoodie LoloBuy",
      description: "Comparez mesures du vêtement, tableau vendeur, aisance et contrôles visibles avant expédition.",
      eyebrow: "Guide taille et QC des hoodies",
      intent: "Choisir puis vérifier une taille avec les mesures du vêtement",
      standfirst: "Ne convertissez pas automatiquement votre taille habituelle. Comparez un hoodie qui vous va au tableau vendeur et définissez précisément la position du ruban pour toute mesure d’entrepôt.",
      focus: "choisir et vérifier la taille d’un hoodie",
    },
    "lolobuy-bag-qc-guide": {
      title: "QC des sacs LoloBuy : dimensions, structure, sangles et ferrures",
      shortTitle: "Guide QC des sacs LoloBuy",
      description: "Contrôlez taille, structure, sangles, fermetures, ferrures et état visible d’un sac avant expédition.",
      eyebrow: "Guide des mesures et du QC des sacs",
      intent: "Vérifier dimensions, structure et fonctions avant acceptation",
      standfirst: "Le QC d’un sac com