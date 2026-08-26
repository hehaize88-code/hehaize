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
  | "lolobuy-alignment-symmetry-print-placement-qc"
  | "lolobuy-size-measurement-qc-photo-limits";

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
    "lolobuy-size-measurement-qc-photo-limits": {
      title: "QC de medidas LoloBuy: lo que una foto puede y no puede demostrar",
      shortTitle: "QC de medidas LoloBuy",
      description: "Define puntos, revisa regla y tensión, compara el mismo método y separa la cifra de las conclusiones sobre ajuste.",
      eyebrow: "QC de medidas y sus límites",
      intent: "Decidir si una foto con regla responde a la pregunta de talla antes de aprobar el paquete",
      standfirst: "Una regla puede parecer precisa y medir desde el punto equivocado. Define los extremos, exige que se vea la colocación completa y compara con una prenda medida igual; comodidad y ajuste siguen sin probarse.",
      focus: "evaluar medidas de almacén sin convertir una foto en garantía de ajuste",
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
    "lolobuy-size-measurement-qc-photo-limits": {
      title: "LoloBuy Größenmessungs-QC: Was ein Lagerfoto beweisen kann",
      shortTitle: "LoloBuy Größenmessungs-QC",
      description: "Endpunkte, Maßbandlage und Spannung prüfen, gleichartige Werte vergleichen und Fit-Grenzen erkennen.",
      eyebrow: "Messungs-QC und Beleggrenzen",
      intent: "Vor der Paketfreigabe beurteilen, ob ein Maßfoto die Größenfrage beantwortet",
      standfirst: "Ein sichtbares Maßband kann am falschen Punkt beginnen. Definiere beide Enden, prüfe den gesamten Verlauf und vergleiche nur dieselbe Methode; Komfort und Sitz bleiben offen.",
      focus: "Lagermessungen zu bewerten, ohne ein Foto zur Passformgarantie zu machen",
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
      standfirst: "Le QC d’un sac commence par la variante et les dimensions. Contrôlez ensuite structure, sangles, fermetures et ferrures visibles sans confondre une photo avec une preuve de capacité ou de durabilité.",
      focus: "vérifier les dimensions, la structure et les ferrures d’un sac",
    },
    "lolobuy-stitching-finish-qc-checklist": {
      title: "QC des coutures et finitions LoloBuy : checklist des photos d’entrepôt",
      shortTitle: "QC coutures et finitions LoloBuy",
      description: "Contrôlez assemblages fonctionnels, symétrie, bords, fils et finitions visibles sans qualifier chaque détail de défaut.",
      eyebrow: "QC des coutures et finitions",
      intent: "Accepter les éléments visibles, demander un contrôle ciblé ou documenter un écart important",
      standfirst: "Un fil libre n’est pas toujours un défaut et une couture nette ne prouve pas la durée. Confirmez d’abord l’article et les assemblages fonctionnels, puis examinez symétrie, bords et finition cosmétique.",
      focus: "contrôler les coutures et finitions visibles selon leur fonction et les preuves",
    },
    "lolobuy-alignment-symmetry-print-placement-qc": {
      title: "QC d’alignement LoloBuy : symétrie et placement du motif",
      shortTitle: "QC d’alignement LoloBuy",
      description: "Distinguez un écart réel de symétrie ou de placement d'un effet de perspective sur les photos d’entrepôt.",
      eyebrow: "QC de l’alignement et du placement",
      intent: "Distinguer un véritable écart d'alignement de l’angle de prise de vue avant validation",
      standfirst: "Un motif peut sembler incliné si le vêtement est plié ou si l’appareil est décentré. Utilisez les lignes propres à l’article et des repères appariés avant de décider.",
      focus: "contrôler alignement, symétrie et placement sans confondre perspective et défaut",
    },
    "lolobuy-size-measurement-qc-photo-limits": {
      title: "QC des mesures LoloBuy : ce qu’une photo peut et ne peut pas prouver",
      shortTitle: "QC des mesures LoloBuy",
      description: "Définissez les points, contrôlez règle et tension, comparez la même méthode et gardez les limites de coupe.",
      eyebrow: "QC des mesures et limites",
      intent: "Décider si une photo de mesure répond à la question de taille avant validation",
      standfirst: "Une règle visible peut commencer au mauvais point. Définissez les deux extrémités, vérifiez tout le trajet et comparez la même méthode ; confort et coupe restent inconnus.",
      focus: "évaluer une mesure d’entrepôt sans transformer la photo en garantie de coupe",
    },
  },
  it: {
    "how-to-use-lolobuy-spreadsheet": {
      title: "Come usare un foglio LoloBuy senza perdere il contesto del prodotto",
      shortTitle: "Usare bene un foglio LoloBuy",
      description: "Guida pratica a link originali, varianti e note del venditore da verificare prima dell’ordine.",
      eyebrow: "Guida alla ricerca dei prodotti",
      intent: "Trovare prodotti e capire quali controlli fare prima dell’ordine",
      standfirst: "Un foglio accorcia la ricerca, ma non sostituisce l’inserzione attuale. Conserva la fonte, definisci la variante esatta e separa ordine, controllo in magazzino e spedizione.",
      focus: "usare un foglio LoloBuy con il contesto completo del prodotto",
    },
    "lolobuy-qc-photos-guide": {
      title: "Foto QC LoloBuy: controllo in magazzino senza supposizioni",
      shortTitle: "Guida alle foto QC LoloBuy",
      description: "Controlla identità, variante, misure e condizioni visibili nelle foto QC LoloBuy, conoscendone i limiti.",
      eyebrow: "Guida al controllo in magazzino",
      intent: "Esaminare un arrivo prima di inviare il pacco",
      standfirst: "Un buon QC confronta l’ordine con ciò che è arrivato. Inizia da identità e variante, passa a misure e condizioni visibili e verifica se le foto rispondono alle domande decisive.",
      focus: "esaminare le foto QC e le prove visibili del magazzino",
    },
    "lolobuy-shipping-cost-guide": {
      title: "Costi di spedizione LoloBuy: peso, dimensioni, linee e consolidamento",
      shortTitle: "Guida alla spedizione LoloBuy",
      description: "Pianifica il pacco con peso reale e volumetrico, dimensioni, limiti, consolidamento e imballaggio.",
      eyebrow: "Guida al pacco internazionale",
      intent: "Stimare e pianificare il pacco dopo l’arrivo in magazzino",
      standfirst: "Il prezzo del prodotto non determina il trasporto internazionale. Una stima utile usa dati di magazzino, dimensioni imballate, limiti delle linee e un confronto separato delle opzioni.",
      focus: "pianificare costo e linea di un pacco internazionale",
    },
    "how-to-buy-from-lolobuy": {
      title: "Come acquistare con LoloBuy: dal link originale al magazzino",
      shortTitle: "Acquistare con LoloBuy",
      description: "Conserva il link, ordina la variante corretta e controlla l’arrivo in magazzino in modo verificabile.",
      eyebrow: "Percorso dall’ordine al magazzino",
      intent: "Trasformare un link prodotto in un ordine verificabile",
      standfirst: "L’acquisto inizia prima del pagamento. Salva l’inserzione, annota l’opzione esatta e definisci quali prove in magazzino potrebbero cambiare la decisione.",
      focus: "acquistare con LoloBuy dal link prodotto al magazzino",
    },
    "lolobuy-hoodie-size-guide": {
      title: "Guida alle taglie delle felpe LoloBuy: misura prima dell’ordine",
      shortTitle: "Taglie delle felpe LoloBuy",
      description: "Confronta misure del capo, tabella del venditore, vestibilità e controlli visibili prima della spedizione.",
      eyebrow: "Guida a taglie e QC delle felpe",
      intent: "Scegliere e verificare una taglia con le misure del capo",
      standfirst: "Non convertire automaticamente la tua taglia abituale. Confronta una felpa che veste bene con la tabella del venditore e definisci la posizione esatta del metro per ogni misura richiesta.",
      focus: "scegliere e controllare la taglia di una felpa",
    },
    "lolobuy-bag-qc-guide": {
      title: "QC delle borse LoloBuy: misure, struttura, tracolle e hardware",
      shortTitle: "Guida QC delle borse LoloBuy",
      description: "Controlla dimensioni, struttura, tracolle, chiusure, hardware e condizioni visibili prima della spedizione.",
      eyebrow: "Guida alle misure e al QC delle borse",
      intent: "Verificare dimensioni, struttura e funzioni prima dell’accettazione",
      standfirst: "Il QC di una borsa parte da variante e dimensioni. Esamina poi struttura, tracolle, chiusure e hardware visibile senza scambiare una foto per una prova di capacità o durata.",
      focus: "verificare misure, struttura e hardware di una borsa",
    },
    "lolobuy-stitching-finish-qc-checklist": {
      title: "QC di cuciture e finiture LoloBuy: checklist delle foto di magazzino",
      shortTitle: "QC cuciture e finiture LoloBuy",
      description: "Controlla giunzioni funzionali, simmetria, bordi, fili e finiture visibili senza chiamare difetto ogni dettaglio cosmetico.",
      eyebrow: "QC di cuciture e finiture",
      intent: "Accettare le prove visibili, chiedere un controllo mirato o documentare una differenza materiale",
      standfirst: "Un filo libero non indica sempre un difetto e una cucitura pulita non prova la durata. Conferma prima articolo e giunzioni funzionali, poi valuta simmetria, bordi e finitura cosmetica.",
      focus: "controllare cuciture e finiture visibili in base alla funzione e alle prove",
    },
    "lolobuy-alignment-symmetry-print-placement-qc": {
      title: "QC dell’allineamento LoloBuy: simmetria e posizione della stampa",
      shortTitle: "QC allineamento LoloBuy",
      description: "Distingui una reale differenza di simmetria o posizione dall’effetto prospettico nelle foto di magazzino.",
      eyebrow: "QC di allineamento e posizione",
      intent: "Separare una vera differenza di allineamento dall’angolo della fotocamera prima dell’approvazione",
      standfirst: "Una stampa può sembrare inclinata per una piega o una ripresa decentrata. Usa linee dell’articolo e punti corrispondenti prima di decidere.",
      focus: "controllare allineamento, simmetria e posizione della stampa senza scambiare la prospettiva per un difetto",
    },
    "lolobuy-size-measurement-qc-photo-limits": {
      title: "QC delle misure LoloBuy: cosa può e non può provare una foto",
      shortTitle: "QC misure LoloBuy",
      description: "Definisci estremi, controlla righello e tensione, confronta lo stesso metodo e separa il numero dalla vestibilità.",
      eyebrow: "QC delle misure e limiti",
      intent: "Decidere se una foto con misura risponde alla domanda di taglia prima del pacco",
      standfirst: "Un righello può sembrare preciso partendo dal punto sbagliato. Definisci gli estremi, mostra tutto il percorso e confronta lo stesso metodo; comfort e vestibilità restano incerti.",
      focus: "valutare misure di magazzino senza trasformare una foto in garanzia di vestibilità",
    },
  },
};

type LocaleText = {
  checkedDate: string;
  imageAlt: string;
  imageCaption: string;
  takeaways: string[];
  sourceNote: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const localeText: Record<LocalizedLocale, LocaleText> = {
  es: {
    checkedDate: "28 de julio de 2026",
    imageAlt: "Diagrama de comprobación para una decisión de compra con LoloBuy",
    imageCaption: "Separa descubrimiento, anuncio en vivo, pedido, evidencia de almacén y planificación del paquete.",
    takeaways: [
      "Conserva el enlace original, la fecha y la variante exacta.",
      "Compara datos actuales; precios, opciones y servicios pueden cambiar.",
      "Usa las fotos para comprobar detalles visibles, no autenticidad ni durabilidad.",
      "Toma la decisión final con el pedido guardado y los datos reales del almacén.",
    ],
    sourceNote: "Base factual: la página pública de LoloBuy describe pedidos mediante un enlace de producto, inspección y fotos de almacén, 90 días de almacenamiento gratuito, consolidación y envío global. No establece una tarifa universal, un número fijo de fotos ni un resultado garantizado; comprueba siempre la interfaz actual.",
    sections: [
      { heading: "Qué decisión resuelve esta guía", paragraphs: ["El objetivo es {focus}. Una ficha de directorio orienta la búsqueda, pero la decisión depende del anuncio vigente, de la opción seleccionada y de las condiciones que aparezcan en el pedido.", "Empieza escribiendo el resultado que necesitas y las dos o tres comprobaciones que podrían cambiarlo. Así evitas confundir una imagen atractiva con evidencia suficiente."] },
      { heading: "Conserva la fuente y la variante", paragraphs: ["Guarda la dirección original, vendedor visible, color, talla, modelo, cantidad, precio y fecha. Copia los códigos de opción literalmente y conserva una captura si una tabla o nota afecta a la compra.", "Una página puede cambiar o agrupar artículos distintos. El registro permite comparar lo recibido con lo pedido, no con un recuerdo o una foto social."] },
      { heading: "Comprueba solo lo que las imágenes pueden mostrar", paragraphs: ["Revisa primero identidad y cantidad, después variante, etiqueta, medidas definidas y daños visibles. Pide un ángulo adicional solo cuando responda a una pregunta concreta.", "Las fotos no demuestran composición, ajuste real, construcción oculta, autenticidad ni duración. Si uno de esos puntos es imprescindible, utiliza una fuente y una prueba adecuadas."] },
      { heading: "Separa hechos actuales y estimaciones", paragraphs: ["Trata precio, inventario, plazos, servicios y rutas como información dinámica. Una cifra antigua o un ejemplo de otro pedido no sustituye los valores que muestra tu cuenta.", "Distingue coste del artículo, entrega nacional y envío internacional. Etiqueta cualquier cálculo como estimación e indica las medidas y supuestos utilizados."] },
      { heading: "Decide en el momento correcto", paragraphs: ["Resuelve dudas del vendedor antes de pagar y problemas visibles mientras siga abierta la opción correspondiente. No esperes a crear el paquete para revisar una variante equivocada.", "LoloBuy indicaba 90 días de almacenamiento gratuito en la fecha comprobada, pero la ventana del vendedor puede ser mucho más corta. Revisa contadores y condiciones actuales."] },
      { heading: "Flujo repetible", paragraphs: ["Busca, abre el anuncio, guarda la variante, realiza un pedido inequívoco y compara las fotos de almacén con ese registro. Acepta el artículo solo cuando la evidencia necesaria sea suficiente.", "Después planifica el paquete con peso, dimensiones y rutas disponibles. Vuelve a abrir los términos actuales antes de pagar: esa última comprobación convierte la guía en una decisión documentada."] },
    ],
  },
  de: {
    checkedDate: "28. Juli 2026",
    imageAlt: "Prüfablauf für eine LoloBuy-Kaufentscheidung",
    imageCaption: "Trenne Suche, Live-Angebot, Bestellung, Lagernachweis und Paketplanung.",
    takeaways: ["Sichere Quelllink, Datum und genaue Variante.", "Prüfe Live-Daten, da Preise, Optionen und Dienste veränderlich sind.", "Nutze Fotos für sichtbare Merkmale, nicht als Echtheits- oder Haltbarkeitsbeleg.", "Entscheide anhand des gespeicherten Auftrags und realistischer Lagerdaten."],
    sourceNote: "Faktenbasis: Die öffentliche LoloBuy-Seite beschreibt Bestellungen per Produktlink, Lagerprüfung und Fotos, 90 Tage kostenlose Lagerung, Konsolidierung und weltweiten Versand. Sie nennt keine universelle Gebühr, feste Fotozahl oder Erfolgsgarantie; maßgeblich ist die aktuelle Oberfläche.",
    sections: [
      { heading: "Welche Entscheidung dieser Ratgeber unterstützt", paragraphs: ["Ziel ist, {focus}. Ein Verzeichnis erleichtert die Suche; entschieden wird anhand des aktuellen Angebots, der gewählten Option und der Angaben im Auftrag.", "Formuliere zuerst das gewünschte Ergebnis und die wenigen Prüfungen, die deine Entscheidung ändern würden. So wird ein Produktbild nicht mit ausreichendem Nachweis verwechselt."] },
      { heading: "Quelle und Variante sichern", paragraphs: ["Speichere Originaladresse, sichtbaren Verkäufer, Farbe, Größe, Modell, Menge, Preis und Datum. Optionscodes sollten wortgetreu übernommen und wichtige Tabellen oder Hinweise als Screenshot gesichert werden.", "Angebote können geändert werden oder unterschiedliche Artikel bündeln. Der Datensatz ermöglicht den Vergleich mit der Bestellung statt mit Erinnerung oder Social-Media-Bildern."] },
      { heading: "Nur sichtbare Merkmale aus Fotos ableiten", paragraphs: ["Prüfe zuerst Identität und Menge, dann Variante, Etikett, klar definierte Maße und sichtbare Schäden. Zusätzliche Ansichten sind sinnvoll, wenn sie eine konkrete Frage beantworten.", "Fotos beweisen weder Material, tatsächliche Passform, verborgene Konstruktion, Echtheit noch Haltbarkeit. Dafür sind geeignete Quellen und Nachweise erforderlich."] },
      { heading: "Live-Fakten und Schätzungen trennen", paragraphs: ["Preis, Bestand, Fristen, Dienste und Versandrouten sind veränderliche Live-Informationen. Alte Zahlen und fremde Bestellungen ersetzen nicht die Werte im eigenen Konto.", "Trenne Warenpreis, chinesischen Inlandsversand und internationalen Versand. Kennzeichne Berechnungen als Beispiel und nenne Maße sowie Annahmen."] },
      { heading: "Zum richtigen Zeitpunkt entscheiden", paragraphs: ["Klär Verkäuferfragen vor der Zahlung und sichtbare Probleme, solange die passende Option offen ist. Eine falsche Variante sollte nicht erst beim Paketbau auffallen.", "Zum Prüfdatum nannte LoloBuy 90 Tage kostenlose Lagerung; Verkäuferfristen können deutlich kürzer sein. Prüfe aktuelle Zähler und Bedingungen."] },
      { heading: "Wiederholbarer Ablauf", paragraphs: ["Suchen, Live-Angebot öffnen, Variante dokumentieren, eindeutig bestellen und Lagerfotos mit dem Datensatz vergleichen. Akzeptiere erst, wenn die entscheidenden sichtbaren Fragen beantwortet sind.", "Plane danach das Paket mit Gewicht, Maßen und verfügbaren Routen. Prüfe vor der Zahlung erneut die aktuellen Bedingungen."] },
    ],
  },
  fr: {
    checkedDate: "28 juillet 2026",
    imageAlt: "Parcours de vérification d’une décision d’achat avec LoloBuy",
    imageCaption: "Séparez recherche, annonce en ligne, commande, éléments d’entrepôt et préparation du colis.",
    takeaways: ["Conservez le lien source, la date et la variante exacte.", "Vérifiez les données en direct : prix, options et services peuvent changer.", "Utilisez les photos pour le visible, pas pour prouver authenticité ou durabilité.", "Décidez avec la commande enregistrée et les données réelles de l’entrepôt."],
    sourceNote: "Base factuelle : la page publique LoloBuy décrit la commande par lien produit, le contrôle et les photos en entrepôt, 90 jours de stockage gratuit, la consolidation et l’expédition mondiale. Elle ne fixe ni tarif universel, ni nombre de photos, ni résultat garanti ; vérifiez l’interface actuelle.",
    sections: [
      { heading: "La décision traitée par ce guide", paragraphs: ["L’objectif est de {focus}. Un répertoire facilite la découverte, mais la décision dépend de l’annonce actuelle, de l’option choisie et des informations affichées dans la commande.", "Écrivez le résultat recherché et les quelques contrôles capables de le modifier. Une image séduisante ne devient ainsi pas une preuve suffisante."] },
      { heading: "Conserver la source et la variante", paragraphs: ["Enregistrez l’adresse d’origine, le vendeur visible, la couleur, la taille, le modèle, la quantité, le prix et la date. Copiez les codes exactement et gardez une capture des tableaux ou notes utiles.", "Une annonce peut changer ou réunir plusieurs articles. Ce relevé permet de comparer l’arrivée à la commande, plutôt qu’à un souvenir ou une photo sociale."] },
      { heading: "Limiter les conclusions aux éléments visibles", paragraphs: ["Contrôlez d’abord identité et quantité, puis variante, étiquette, mesures définies et défauts visibles. Une vue supplémentaire doit répondre à une question précise.", "Les photos ne prouvent ni matière, ni taille portée, ni construction cachée, ni authenticité, ni durée. Utilisez une source et une preuve adaptées si ces points sont essentiels."] },
      { heading: "Séparer données actuelles et estimations", paragraphs: ["Prix, stock, délais, services et lignes sont des informations dynamiques. Un ancien chiffre ou la commande d’un tiers ne remplace pas les valeurs de votre compte.", "Distinguez prix de l’article, livraison intérieure et transport international. Identifiez tout calcul comme une estimation et indiquez mesures et hypothèses."] },
      { heading: "Décider au bon moment", paragraphs: ["Résolvez les questions vendeur avant paiement et les problèmes visibles pendant que l’action correspondante reste disponible. N’attendez pas la création du colis pour vérifier la variante.", "LoloBuy annonçait 90 jours de stockage gratuit à la date contrôlée, mais le délai vendeur peut être plus court. Vérifiez compteurs et conditions."] },
      { heading: "Processus reproductible", paragraphs: ["Recherchez, ouvrez l’annonce, enregistrez la variante, passez une commande claire et comparez les photos d’entrepôt à ce relevé. N’acceptez qu’avec les éléments nécessaires.", "Préparez ensuite le colis avec poids, dimensions et lignes disponibles. Relisez les conditions actuelles avant paiement."] },
    ],
  },
  it: {
    checkedDate: "28 luglio 2026",
    imageAlt: "Percorso di verifica per una decisione di acquisto con LoloBuy",
    imageCaption: "Separa ricerca, inserzione attuale, ordine, prove del magazzino e pianificazione del pacco.",
    takeaways: ["Conserva link originale, data e variante esatta.", "Controlla i dati attuali: prezzi, opzioni e servizi possono cambiare.", "Usa le foto per dettagli visibili, non per autenticità o durata.", "Decidi con l’ordine salvato e i dati reali del magazzino."],
    sourceNote: "Base fattuale: la pagina pubblica LoloBuy descrive ordini tramite link prodotto, controllo e foto in magazzino, 90 giorni di deposito gratuito, consolidamento e spedizione globale. Non stabilisce una tariffa universale, un numero fisso di foto o un risultato garantito; verifica l’interfaccia attuale.",
    sections: [
      { heading: "La decisione affrontata dalla guida", paragraphs: ["L’obiettivo è {focus}. Una directory facilita la ricerca, ma la decisione dipende dall’inserzione attuale, dall’opzione selezionata e dai dati presenti nell’ordine.", "Definisci il risultato desiderato e i pochi controlli capaci di cambiarlo. In questo modo un’immagine attraente non diventa una prova sufficiente."] },
      { heading: "Conservare fonte e variante", paragraphs: ["Salva indirizzo originale, venditore visibile, colore, taglia, modello, quantità, prezzo e data. Copia i codici esattamente e conserva schermate di tabelle o note importanti.", "Un’inserzione può cambiare o raggruppare articoli diversi. Il registro permette di confrontare l’arrivo con l’ordine, non con un ricordo o una foto social."] },
      { heading: "Limitare le conclusioni a ciò che è visibile", paragraphs: ["Controlla prima identità e quantità, poi variante, etichetta, misure definite e danni visibili. Una vista aggiuntiva serve solo se risponde a una domanda precisa.", "Le foto non provano materiale, vestibilità reale, costruzione nascosta, autenticità o durata. Se un punto è indispensabile, usa fonti e prove adatte."] },
      { heading: "Separare dati attuali e stime", paragraphs: ["Prezzo, disponibilità, scadenze, servizi e linee sono informazioni dinamiche. Un vecchio numero o l’ordine di un’altra persona non sostituisce i valori del tuo account.", "Distingui prezzo dell’articolo, consegna nazionale e trasporto internazionale. Indica ogni calcolo come stima e specifica misure e ipotesi."] },
      { heading: "Decidere nel momento giusto", paragraphs: ["Risolvi i dubbi del venditore prima del pagamento e i problemi visibili mentre l’azione è disponibile. Non attendere la creazione del pacco per controllare la variante.", "Alla data verificata LoloBuy indicava 90 giorni di deposito gratuito, ma i termini del venditore possono essere più brevi. Controlla contatori e condizioni attuali."] },
      { heading: "Procedura ripetibile", paragraphs: ["Cerca, apri l’inserzione, salva la variante, effettua un ordine chiaro e confronta le foto di magazzino con quel registro. Accetta solo con prove sufficienti.", "Pianifica quindi il pacco con peso, dimensioni e linee disponibili. Ricontrolla le condizioni attuali prima di pagare."] },
    ],
  },
};

export const articleUi: Record<Locale, Record<string, string>> = {
  en: {},
  es: { Home: "Inicio", Guides: "Guías", "Written by": "Escrito por", "Fact-checked against public LoloBuy information": "Verificado con información pública de LoloBuy", "Last reviewed": "Última revisión", Checked: "Revisado", Length: "Longitud", words: "palabras", "Reading time": "Tiempo de lectura", minutes: "minutos", "Main query": "Consulta principal", "IN THIS GUIDE": "EN ESTA GUÍA", "SEARCH INTENT": "INTENCIÓN DE BÚSQUEDA", "Reader summary": "Resumen", "Four points to keep": "Cuatro puntos clave", "FACT-CHECK NOTE": "NOTA DE VERIFICACIÓN", "Related buying guides": "Guías relacionadas", "Continue with the next decision": "Continúa con la siguiente decisión", "Continue your research": "Continúa tu investigación", "Read another guide": "Leer otra guía" },
  de: { Home: "Start", Guides: "Ratgeber", "Written by": "Verfasst von", "Fact-checked against public LoloBuy information": "Mit öffentlichen LoloBuy-Angaben geprüft", "Last reviewed": "Zuletzt geprüft", Checked: "Geprüft", Length: "Länge", words: "Wörter", "Reading time": "Lesezeit", minutes: "Minuten", "Main query": "Hauptsuchanfrage", "IN THIS GUIDE": "IN DIESEM RATGEBER", "SEARCH INTENT": "SUCHINTENTION", "Reader summary": "Kurzfassung", "Four points to keep": "Vier wichtige Punkte", "FACT-CHECK NOTE": "FAKTENCHECK", "Related buying guides": "Verwandte Ratgeber", "Continue with the next decision": "Mit der nächsten Entscheidung fortfahren", "Continue your research": "Recherche fortsetzen", "Read another guide": "Weiteren Ratgeber lesen" },
  fr: { Home: "Accueil", Guides: "Guides", "Written by": "Rédigé par", "Fact-checked against public LoloBuy information": "Vérifié avec les informations publiques de LoloBuy", "Last reviewed": "Dernière révision", Checked: "Vérifié", Length: "Longueur", words: "mots", "Reading time": "Temps de lecture", minutes: "minutes", "Main query": "Requête principale", "IN THIS GUIDE": "DANS CE GUIDE", "SEARCH INTENT": "INTENTION DE RECHERCHE", "Reader summary": "Résumé", "Four points to keep": "Quatre points à retenir", "FACT-CHECK NOTE": "NOTE DE VÉRIFICATION", "Related buying guides": "Guides associés", "Continue with the next decision": "Passez à la décision suivante", "Continue your research": "Poursuivez vos recherches", "Read another guide": "Lire un autre guide" },
  it: { Home: "Home", Guides: "Guide", "Written by": "Scritto da", "Fact-checked against public LoloBuy information": "Verificato con informazioni pubbliche di LoloBuy", "Last reviewed": "Ultima revisione", Checked: "Verificato", Length: "Lunghezza", words: "parole", "Reading time": "Tempo di lettura", minutes: "minuti", "Main query": "Ricerca principale", "IN THIS GUIDE": "IN QUESTA GUIDA", "SEARCH INTENT": "INTENTO DI RICERCA", "Reader summary": "Riepilogo", "Four points to keep": "Quattro punti chiave", "FACT-CHECK NOTE": "NOTA DI VERIFICA", "Related buying guides": "Guide correlate", "Continue with the next decision": "Continua con la decisione successiva", "Continue your research": "Continua la ricerca", "Read another guide": "Leggi un’altra guida" },
};

const articleUiExtra: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    "Editorial policy": "Política editorial",
    "Sources & research method": "Fuentes y método de investigación",
    Corrections: "Correcciones",
    "Worked example": "Ejemplo práctico",
    "Product discovery": "Descubrimiento de productos",
    "Browse by product category": "Explorar por categoría",
    "Open categories": "Abrir categorías",
    "Read guide": "Leer guía",
    "Open a matched product, then verify the live details": "Abre un producto vinculado y comprueba los datos actuales",
    "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.": "La disponibilidad, las opciones, los precios y las notas del vendedor pueden cambiar. Usa el catálogo para encontrar el artículo y decide con la página actual y el pedido guardado.",
    "Browse main-site products": "Ver productos del catálogo principal",
  },
  de: {
    "Editorial policy": "Redaktionsrichtlinie",
    "Sources & research method": "Quellen und Recherchemethodik",
    Corrections: "Korrekturen",
    "Worked example": "Rechenbeispiel",
    "Product discovery": "Produktsuche",
    "Browse by product category": "Nach Produktkategorie stöbern",
    "Open categories": "Kategorien öffnen",
    "Read guide": "Ratgeber lesen",
    "Open a matched product, then verify the live details": "Passenden Artikel öffnen und Live-Daten prüfen",
    "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.": "Verfügbarkeit, Optionen, Preise und Verkäuferhinweise können sich ändern. Nutze den Katalog zur Suche und entscheide mit der aktuellen Seite und dem gespeicherten Auftrag.",
    "Browse main-site products": "Produkte im Hauptkatalog ansehen",
  },
  fr: {
    "Editorial policy": "Politique éditoriale",
    "Sources & research method": "Sources et méthode de recherche",
    Corrections: "Corrections",
    "Worked example": "Exemple calculé",
    "Product discovery": "Recherche de produits",
    "Browse by product category": "Parcourir par catégorie",
    "Open categories": "Ouvrir les catégories",
    "Read guide": "Lire le guide",
    "Open a matched product, then verify the live details": "Ouvrez un produit associé puis vérifiez les données actuelles",
    "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.": "Disponibilité, options, prix et notes vendeur peuvent changer. Utilisez le catalogue pour trouver l’article, puis décidez avec la page actuelle et la commande enregistrée.",
    "Browse main-site products": "Voir les produits du catalogue principal",
  },
  it: {
    "Editorial policy": "Politica editoriale",
    "Sources & research method": "Fonti e metodo di ricerca",
    Corrections: "Correzioni",
    "Worked example": "Esempio pratico",
    "Product discovery": "Ricerca dei prodotti",
    "Browse by product category": "Esplora per categoria",
    "Open categories": "Apri le categorie",
    "Read guide": "Leggi la guida",
    "Open a matched product, then verify the live details": "Apri un prodotto abbinato e verifica i dati attuali",
    "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.": "Disponibilità, opzioni, prezzi e note del venditore possono cambiare. Usa il catalogo per trovare l’articolo e decidi con la pagina attuale e l’ordine salvato.",
    "Browse main-site products": "Vedi i prodotti del catalogo principale",
  },
};

export function articleText(locale: Locale, key: string) {
  return articleUiExtra[locale][key] ?? articleUi[locale][key] ?? key;
}

export function getLocalizedArticle(article: ArticleRecord, locale: Locale): ArticleRecord {
  if (locale === "en") return article;

  const topic = topics[locale][article.slug as ArticleSlug];
  if (!topic) return article;
  const shared = localeText[locale];
  const insertFocus = (value: string) => value.replace("{focus}", topic.focus);

  return {
    ...article,
    title: topic.title,
    seoTitle: `${topic.shortTitle} | 2026`,
    shortTitle: topic.shortTitle,
    description: topic.description,
    eyebrow: topic.eyebrow,
    primaryKeyword: topic.shortTitle,
    intent: topic.intent,
    checkedDate: shared.checkedDate,
    imageAlt: shared.imageAlt,
    imageCaption: shared.imageCaption,
    standfirst: topic.standfirst,
    takeaways: shared.takeaways.map(insertFocus),
    sourceNote: shared.sourceNote,
    sections: shared.sections.map((section) => ({
      heading: section.heading,
      paragraphs: section.paragraphs.map(insertFocus),
    })),
  };
}
