import type { Locale } from "./i18n";
import type { Article } from "./site-data";

type LocalizedShoeArticle = Pick<
  Article,
  | "title"
  | "shortTitle"
  | "description"
  | "eyebrow"
  | "readingTime"
  | "factCheckLine"
  | "visual"
  | "sources"
  | "intro"
  | "sections"
>;

export const shoeArticleLocales: Record<
  Exclude<Locale, "en">,
  LocalizedShoeArticle
> = {
  es: {
    title: "Guía de tallas de calzado LoloBuy: mide antes de pedir y revisa el QC",
    shortTitle: "Guía de tallas y medidas de calzado LoloBuy",
    description: "Elige talla con medidas del pie y la plantilla y comprueba etiqueta, par y estado visible en las fotos QC de almacén.",
    eyebrow: "TALLA DE CALZADO Y QC",
    readingTime: "13 min de lectura",
    factCheckLine: "Verificado el 10 de agosto de 2026 con las declaraciones públicas actuales de pedido y almacén de LoloBuy; el método de talla es análisis editorial independiente.",
    visual: {
      eyebrow: "REGISTRO DE TRES MEDIDAS",
      title: "Compara la misma clase de medida antes de elegir talla.",
      caption: "Registra pie, plantilla de referencia y método del vendedor. El almacén verifica el artículo recibido, no promete ajuste.",
      items: [
        { label: "Pie", text: "Mide ambos pies de pie y conserva el resultado mayor." },
        { label: "Referencia", text: "Mide la plantilla extraíble de un calzado que ya te queda bien." },
        { label: "Anuncio", text: "Guarda tabla, unidades y nombre exacto de la medida." },
        { label: "Almacén", text: "Comprueba etiqueta, par y la medida que podría cambiar la decisión." },
      ],
    },
    sources: [
      { label: "Sitio público de LoloBuy — comprobado el 10 de agosto de 2026", note: "Fuente primaria solo para pedido mediante enlace, inspección y fotografías, 90 días de almacenamiento y consolidación. No publica una conversión universal de tallas." },
      { label: "Marco de medición de Lolobuy Sheet", note: "La comparación de pie, plantilla, tabla y artículo de almacén es análisis editorial independiente; los números de ejemplo no recomiendan vendedor ni modelo." },
    ],
    intro: [
      "No existe una respuesta universal a «qué talla LoloBuy debo comprar». Mide el pie más largo, compáralo con una plantilla extraíble cómoda y lee la tabla según la medida que realmente nombra. Guarda esa prueba con color y talla antes de enviar el enlace.",
      "LoloBuy describe públicamente el pedido mediante enlace y la posterior inspección y fotografía en almacén. Ese punto de control ayuda, pero una imagen no garantiza comodidad, forma interior, material, duración o autenticidad.",
    ],
    sections: [
      { heading: "Empieza por el pie más largo, no por una etiqueta habitual", paragraphs: ["Mide sobre suelo duro, de pie y con los calcetines previstos. Talón contra una pared, marca el dedo más largo y repite en ambos pies sin redondear hacia abajo.", "Guarda la medida bruta. No añadas una holgura universal: depende de forma, uso, calcetín y de cómo defina el vendedor su tabla."], bullets: ["Superficie dura y postura normal", "Calcetines previstos", "Ambos pies en milímetros o centímetros", "Conservar la medida mayor"] },
      { heading: "Usa una plantilla cómoda como segunda referencia", paragraphs: ["Extrae una plantilla de un calzado de uso y puntera parecidos, colócala plana y mide del talón al punto más largo. Anota si ese par queda ajustado, cómodo o holgado.", "No fuerces una plantilla pegada. Una zapatilla, un zapato estrecho y una bota acolchada pueden sentirse distintos aun con longitudes similares; es una referencia, no una garantía."] },
      { heading: "Identifica qué mide la tabla del vendedor", paragraphs: ["La tabla puede indicar pie, interior, plantilla, suela exterior o solo una talla. No son equivalentes. Compara pie con pie y plantilla con una plantilla medida del mismo modo.", "Guarda unidades, diagrama y fecha. Si solo hay etiquetas EU, US, UK o del vendedor, pide una medida clara si el flujo lo permite o acepta una incertidumbre mayor."] },
      { heading: "Haz una comparación transparente", paragraphs: ["Ejemplo: pie mayor de 26,1 cm y plantilla cómoda de 27,0 cm. Si una tabla claramente titulada «longitud de plantilla» ofrece 26,7 y 27,1 cm, la segunda se parece más a la referencia; no demuestra el mismo ajuste.", "Si 27,1 cm describe la suela exterior, la comparación no sirve. Busca pie o plantilla, pide aclaración o reconoce que el anuncio no permite decidir con confianza.", "No inventes tolerancias universales. Conserva cualquier rango publicado por ese vendedor y define qué diferencia cambiaría tu decisión."] },
      { heading: "Guarda la opción exacta antes de pegar el enlace", paragraphs: ["Antes de iniciar el pedido, conserva URL, fecha, color, etiqueta de talla, cantidad, código de variante y tabla. Compara después la opción generada en el flujo actual de LoloBuy.", "Una misma página puede agrupar modelos o accesorios. Confirma que precio y opción pertenecen al par deseado y separa coste del producto, entrega doméstica y futuro paquete internacional."], bullets: ["URL y fecha", "Color, talla, cantidad y código", "Tabla con definición y unidades", "Medidas de pie y plantilla", "Umbral que haría cuestionar el par"] },
      { heading: "Revisa el QC del calzado en un orden fijo", paragraphs: ["Confirma dos zapatos que formen par, modelo, color, etiquetas y piezas incluidas. Después mira laterales, talones, punteras, suelas, alineación y daños visibles en las vistas disponibles.", "No empieces por una costura mínima si la talla sigue sin verificar. Luz, ángulo y embalaje pueden alterar color o forma; describe solo lo visible.", "La web pública no establece un número universal de fotos gratis ni una tarifa de imagen, vídeo o medida. Comprueba las opciones actuales del pedido."] },
      { heading: "Pide una medida solo si puede cambiar la decisión", paragraphs: ["Una medida de plantilla ayuda si es extraíble y se ve todo el recorrido de la regla. Pide la línea más larga del talón a la punta y la unidad; compárala con la referencia medida igual.", "El personal de almacén no puede probar el calzado. La longitud no demuestra anchura, arco, sujeción, amortiguación o comodidad."] },
      { heading: "Decide aprobar, preguntar o actuar antes del paquete", paragraphs: ["Aprueba cuando identidad, etiqueta, cantidad y detalles decisivos coinciden. Pregunta si una etiqueta, ángulo o medida resolverá la duda. Ante una diferencia documentada, guarda las pruebas y usa sin demora la acción que muestre el pedido.", "Esta guía no promete devolución, cambio, reembolso, plazo o tarifa. Los 90 días anunciados de almacenamiento no equivalen a una ventana de devolución del vendedor.", "Al preparar el paquete, valora protección y volumen de la caja. LoloBuy describe consolidación, pero peso, dimensiones, ruta y precio son datos actuales del paquete."] },
      { heading: "Conserva un registro reutilizable", paragraphs: ["Guarda en privado pie mayor, plantilla de referencia, definición de tabla, opción, etiqueta de almacén, medida adicional y decisión fechada; nunca credenciales, pago o dirección completa.", "Separar el origen de cada número no elimina todo riesgo de ajuste, pero convierte la elección en una decisión revisable y no en una adivinanza basada en una talla familiar."] },
    ],
  },
  de: {
    title: "LoloBuy Schuhgrößen-Ratgeber: Vor der Bestellung messen und im Lager prüfen",
    shortTitle: "LoloBuy Schuhgrößen- und Messratgeber",
    description: "Schuhgröße mit Fuß- und Einlegesohlenmaßen wählen und Etikett, Paar sowie sichtbaren Zustand auf Lager-QC-Fotos prüfen.",
    eyebrow: "SCHUHGRÖSSE UND LAGER-QC",
    readingTime: "13 Min. Lesezeit",
    factCheckLine: "Am 10. August 2026 anhand der aktuellen öffentlichen LoloBuy-Angaben zu Bestellung und Lager geprüft; die Größenmethode ist unabhängige redaktionelle Analyse.",
    visual: {
      eyebrow: "DREI-MESSWERTE-AKTE",
      title: "Vor der Größenwahl nur Gleiches mit Gleichem vergleichen.",
      caption: "Fuß, passende Referenzsohle und Verkäufer-Methode erfassen. Das Lager prüft den Artikel, verspricht aber keine Passform.",
      items: [
        { label: "Fuß", text: "Beide Füße im Stehen messen und den längeren Wert behalten." },
        { label: "Referenz", text: "Eine herausnehmbare Sohle aus einem gut passenden Schuh messen." },
        { label: "Angebot", text: "Tabelle, Einheit und genaue Messbezeichnung sichern." },
        { label: "Lager", text: "Etikett, Paar und entscheidungsrelevante Messung bestätigen." },
      ],
    },
    sources: [
      { label: "Öffentliche LoloBuy-Website — geprüft am 10. August 2026", note: "Primärquelle nur für Linkbestellung, Prüfung und Fotos, 90 Tage Lagerung sowie Konsolidierung. Keine universelle Schuhgrößenumrechnung." },
      { label: "Messrahmen von Lolobuy Sheet", note: "Der Vergleich von Fuß, Referenzsohle, Angebot und Lagerartikel ist unabhängige Analyse; Beispielwerte empfehlen weder Verkäufer noch Modell." },
    ],
    intro: [
      "Auf die Frage nach der richtigen LoloBuy-Schuhgröße gibt es keine universelle Tabelle. Den längeren Fuß messen, mit einer passenden herausnehmbaren Einlegesohle vergleichen und die Verkäufer-Tabelle nach der tatsächlich genannten Messart lesen.",
      "LoloBuy beschreibt öffentlich eine Bestellung per Produktlink und spätere Qualitätsprüfung mit Fotos im Lager. Dieser Kontrollpunkt hilft, garantiert aber weder Komfort noch Innenform, Material, Haltbarkeit oder Echtheit.",
    ],
    sections: [
      { heading: "Mit dem längeren Fuß statt der üblichen Größenangabe beginnen", paragraphs: ["Auf hartem Boden im Stehen und mit den vorgesehenen Socken messen. Ferse leicht an die Wand, längsten Zeh markieren, beide Füße erfassen und nicht abrunden.", "Zuerst den Rohwert sichern. Ein universeller Zuschlag wäre unbegründet, weil Form, Nutzung, Socken und Messdefinition variieren."], bullets: ["Harter, ebener Boden", "Vorgesehene Socken", "Beide Füße messen", "Längeren Wert nicht abrunden"] },
      { heading: "Eine passende Einlegesohle als zweite Referenz nutzen", paragraphs: ["Aus einem Schuh ähnlicher Nutzung und Zehenform die herausnehmbare Sohle flach vom hintersten Fersen- bis zum längsten Zehenpunkt messen. Passform als eng, bequem oder weit notieren.", "Eine geklebte Sohle nicht herausreißen. Ähnliche Längen fühlen sich in Lauf-, Anzug- und gepolsterten Schuhen unterschiedlich an; die Referenz ist kein Versprechen."] },
      { heading: "Klären, was die Verkäufer-Tabelle misst", paragraphs: ["Fuß-, Innen-, Einlegesohlen- und Außensohlenlänge sind nicht austauschbar. Fuß mit Fuß und Sohle nur mit gleich gemessener Referenzsohle vergleichen.", "Einheit, Grafik und Datum sichern. Ohne definierte Messung erhöhen reine EU-, US-, UK- oder Verkäuferlabels die Unsicherheit."] },
      { heading: "Transparent vergleichen statt universell umrechnen", paragraphs: ["Beispiel: längerer Fuß 26,1 cm, bequeme Referenzsohle 27,0 cm. Nennt eine Tabelle ausdrücklich Einlegesohlenlänge 26,7 und 27,1 cm, liegt der zweite Wert näher an der Referenz, garantiert aber nicht dieselbe Passform.", "Beschreibt 27,1 cm die Außensohle, ist der Vergleich ungültig. Eine Fuß- oder Sohlenangabe suchen, nachfragen oder die Unsicherheit akzeptieren.", "Keine allgemeine Fertigungstoleranz behaupten. Verkäuferbereich sichern und vorher festlegen, welche Abweichung die Entscheidung ändern würde."] },
      { heading: "Exakte Option vor dem Einfügen des Links sichern", paragraphs: ["URL, Datum, Farbe, Größenlabel, Menge, Variantencode und Tabelle speichern. Danach die im aktuellen LoloBuy-Ablauf erzeugte Bestellung mit dieser Akte vergleichen.", "Eine Seite kann mehrere Modelle oder Zubehör bündeln. Preis und Option dem gewünschten Paar zuordnen und Produkt-, China- und spätere internationale Kosten trennen."], bullets: ["URL und Prüftag", "Farbe, Größe, Menge, Code", "Tabelle mit Definition", "Fuß- und Sohlenwert", "Entscheidungsschwelle"] },
      { heading: "Lager-QC in einer festen Schuh-Reihenfolge prüfen", paragraphs: ["Zuerst zwei zusammengehörige Schuhe, Modell, Farbe, Labels und Teile bestätigen. Dann Seiten, Fersen, Zehenboxen, Sohlen, Ausrichtung und sichtbare Schäden prüfen.", "Nicht mit kleinen Nähten beginnen, solange die Größe unklar ist. Licht, Winkel und Verpackung können Farbe oder Form verzerren; nur Sichtbares beschreiben.", "Die öffentliche Seite nennt keine universelle Zahl kostenloser Fotos oder allgemeine Bild-, Video- oder Messpreise. Aktuelle Bestelloptionen prüfen."] },
      { heading: "Nur eine entscheidungsrelevante Messung anfordern", paragraphs: ["Eine Einlegesohlenmessung hilft nur bei herausnehmbarer Sohle und vollständig sichtbarer Linealführung. Längste Ferse-Zehen-Linie und Einheit verlangen und gleichartig vergleichen.", "Lagerpersonal kann keinen Tragetest machen. Die Länge beweist weder Weite, Gewölbelage, Fersenhalt, Dämpfung noch Komfort."] },
      { heading: "Vor dem Paket annehmen, fragen oder handeln", paragraphs: ["Annehmen, wenn Identität, Labels, Menge und entscheidende Details passen. Gezielt fragen, wenn ein Label, Winkel oder Maß die Unsicherheit löst. Bei dokumentierter Abweichung Belege sichern und die aktuell angezeigte Bestellaktion nutzen.", "Dieser Ratgeber verspricht weder Rückgabe noch Umtausch, Erstattung, Frist oder Gebühr. 90 Tage beworbene Lagerung sind kein Verkäufer-Rückgaberecht.", "Bei der Paketplanung Schuhkarton, Schutz und Volumen abwägen. Konsolidierung wird beschrieben; Gewicht, Maße, Route und Preis bleiben Live-Paketdaten."] },
      { heading: "Eine wiederverwendbare Größenakte führen", paragraphs: ["Längeren Fuß, Referenzsohle, Tabellendefinition, Option, Lagerlabel, Zusatzmaß und datierte Entscheidung privat notieren; keine Zugangsdaten, Zahlung oder vollständige Adresse.", "Getrennte Quellen beseitigen nicht jedes Passformrisiko, machen die Wahl aber nachvollziehbar statt zu einer Vermutung anhand eines vertrauten Labels."] },
    ],
  },
  fr: {
    title: "Guide des tailles de chaussures LoloBuy : mesurer avant commande et vérifier le QC",
    shortTitle: "Guide tailles et mesures des chaussures LoloBuy",
    description: "Choisissez la taille avec le pied et une semelle de référence, puis vérifiez étiquette, paire et état visible sur les photos QC.",
    eyebrow: "TAILLE CHAUSSURES ET QC",
    readingTime: "13 min de lecture",
    factCheckLine: "Vérifié le 10 août 2026 avec les déclarations publiques actuelles de LoloBuy sur commande et entrepôt ; la méthode de taille est une analyse éditoriale indépendante.",
    visual: {
      eyebrow: "DOSSIER DE TROIS MESURES",
      title: "Comparer la même mesure avant de choisir une taille.",
      caption: "Consigner pied, semelle de référence et méthode vendeur. L'entrepôt vérifie l'article reçu sans promettre l'ajustement.",
      items: [
        { label: "Pied", text: "Mesurer les deux pieds debout et garder le plus long." },
        { label: "Référence", text: "Mesurer la semelle amovible d'une chaussure confortable." },
        { label: "Annonce", text: "Sauvegarder tableau, unité et nom exact de la mesure." },
        { label: "Entrepôt", text: "Confirmer étiquette, paire et mesure décisive." },
      ],
    },
    sources: [
      { label: "Site public LoloBuy — vérifié le 10 août 2026", note: "Source primaire uniquement pour commande par lien, inspection et photos, 90 jours de stockage et consolidation. Aucune conversion universelle de pointure." },
      { label: "Cadre de mesure Lolobuy Sheet", note: "Comparer pied, semelle, tableau et article d'entrepôt relève de l'analyse éditoriale indépendante ; les chiffres d'exemple ne recommandent ni vendeur ni modèle." },
    ],
    intro: [
      "Il n'existe pas de conversion universelle pour répondre à « quelle taille LoloBuy choisir ». Mesurez le pied le plus long, comparez-le à une semelle amovible confortable et lisez le tableau selon la mesure qu'il nomme vraiment.",
      "LoloBuy décrit publiquement la commande par lien puis l'inspection et les photos en entrepôt. Ce contrôle aide, mais une image ne garantit ni confort, forme interne, matière, durée ni authenticité.",
    ],
    sections: [
      { heading: "Commencer par le pied le plus long, pas la pointure habituelle", paragraphs: ["Sur sol dur, debout et avec les chaussettes prévues, placez le talon contre un mur, marquez l'orteil le plus avancé et mesurez les deux pieds sans arrondir vers le bas.", "Gardez d'abord la longueur brute. N'ajoutez pas une marge universelle : forme, usage, chaussette et définition du vendeur changent le besoin."], bullets: ["Sol dur et plat", "Chaussettes prévues", "Deux pieds mesurés", "Valeur la plus longue conservée"] },
      { heading: "Utiliser une semelle confortable comme deuxième repère", paragraphs: ["Choisissez une chaussure d'usage et de forme proches, posez sa semelle amovible à plat et mesurez du talon au point le plus long. Notez si elle est serrée, confortable ou ample.", "Ne forcez pas une semelle collée. Course, ville étroite et montante rembourrée peuvent différer malgré une longueur similaire : le repère n'est pas une garantie."] },
      { heading: "Identifier ce que mesure le tableau vendeur", paragraphs: ["Longueur du pied, intérieure, de semelle et de semelle extérieure ne sont pas interchangeables. Comparez pied avec pied, semelle avec une référence mesurée de la même façon.", "Conservez unité, schéma et date. De simples labels EU, US, UK ou vendeur sans définition augmentent l'incertitude."] },
      { heading: "Faire une comparaison transparente", paragraphs: ["Exemple : pied long de 26,1 cm et semelle confortable de 27,0 cm. Si un tableau intitulé longueur de semelle propose 26,7 et 27,1 cm, le second se rapproche du repère sans garantir la même sensation.", "Si 27,1 cm désigne la semelle extérieure, la comparaison est invalide. Cherchez une mesure du pied ou intérieure, demandez une précision ou acceptez l'incertitude.", "N'inventez pas de tolérance générale. Sauvegardez la plage publiée par ce vendeur et définissez l'écart qui changerait votre décision."] },
      { heading: "Sauvegarder l'option exacte avant de coller le lien", paragraphs: ["Conservez URL, date, couleur, pointure vendeur, quantité, code variante et tableau, puis comparez la commande générée dans le parcours LoloBuy actuel.", "Une page peut regrouper chaussures, coloris, niveaux ou accessoires. Associez prix et option à la paire visée et séparez produit, livraison chinoise et futur colis international."], bullets: ["URL et date", "Couleur, taille, quantité et code", "Tableau et définition", "Pied et semelle de référence", "Seuil de décision"] },
      { heading: "Examiner le QC dans un ordre propre aux chaussures", paragraphs: ["Confirmez deux chaussures formant paire, modèle, couleur, étiquettes et éléments. Puis examinez côtés, talons, pointes, semelles, alignement et dommages visibles.", "Ne commencez pas par une couture minuscule si la taille reste incertaine. Lumière, angle et emballage peuvent modifier couleur ou forme ; décrivez seulement le visible.", "Le site public n'établit ni nombre universel de photos gratuites ni tarif général d'image, vidéo ou mesure. Vérifiez l'option affichée sur la commande."] },
      { heading: "Demander une mesure seulement si elle change la décision", paragraphs: ["Une semelle amovible aide si toute la règle et son départ sont visibles. Demandez la ligne talon-pointe la plus longue et l'unité, puis comparez avec la référence mesurée pareillement.", "L'entrepôt ne peut pas faire d'essayage. La longueur ne prouve ni largeur, voûte, maintien du talon, amorti ni confort."] },
      { heading: "Accepter, questionner ou agir avant le colis", paragraphs: ["Acceptez si identité, étiquettes, quantité et détails décisifs correspondent. Posez une question ciblée si une étiquette, un angle ou une mesure résout le doute. En cas d'écart documenté, gardez les preuves et utilisez l'action actuellement proposée.", "Ce guide ne promet ni retour, échange, remboursement, délai ou frais. Les 90 jours de stockage annoncés ne sont pas un délai de retour vendeur.", "Pour le colis, arbitrez boîte, protection et volume. LoloBuy décrit la consolidation, mais poids, dimensions, admissibilité et prix restent des données en direct."] },
      { heading: "Conserver un dossier de décision réutilisable", paragraphs: ["Notez en privé pied long, semelle, définition du tableau, option, étiquette entrepôt, mesure supplémentaire et décision datée ; jamais identifiants, paiement ou adresse complète.", "Séparer la source de chaque nombre ne supprime pas tout risque, mais transforme la pointure en décision vérifiable plutôt qu'en supposition fondée sur une étiquette familière."] },
    ],
  },
  it: {
    title: "Guida alle taglie delle scarpe LoloBuy: misura prima dell'ordine e controlla il QC",
    shortTitle: "Guida a taglie e misure delle scarpe LoloBuy",
    description: "Scegli la taglia con piede e soletta di riferimento, poi controlla etichetta, paio e condizioni visibili nelle foto QC.",
    eyebrow: "TAGLIA SCARPE E QC",
    readingTime: "13 min di lettura",
    factCheckLine: "Verificato il 10 agosto 2026 con le dichiarazioni pubbliche attuali di LoloBuy su ordine e magazzino; il metodo taglie è analisi editoriale indipendente.",
    visual: {
      eyebrow: "REGISTRO DI TRE MISURE",
      title: "Confronta misure dello stesso tipo prima di scegliere.",
      caption: "Registra piede, soletta di riferimento e metodo del venditore. Il magazzino verifica l'articolo, non promette la vestibilità.",
      items: [
        { label: "Piede", text: "Misura entrambi i piedi in piedi e conserva il più lungo." },
        { label: "Riferimento", text: "Misura la soletta estraibile di una scarpa già comoda." },
        { label: "Inserzione", text: "Salva tabella, unità e nome esatto della misura." },
        { label: "Magazzino", text: "Conferma etichetta, paio e misura che cambia la decisione." },
      ],
    },
    sources: [
      { label: "Sito pubblico LoloBuy — controllato il 10 agosto 2026", note: "Fonte primaria solo per ordine con link, ispezione e foto, 90 giorni di deposito e consolidamento. Non offre una conversione universale delle taglie." },
      { label: "Schema di misura Lolobuy Sheet", note: "Il confronto tra piede, soletta, tabella e articolo in magazzino è analisi indipendente; i numeri d'esempio non consigliano venditore o modello." },
    ],
    intro: [
      "Non esiste una tabella universale per rispondere a «quale taglia LoloBuy compro». Misura il piede più lungo, confrontalo con una soletta estraibile comoda e leggi la tabella secondo la misura realmente indicata.",
      "LoloBuy descrive pubblicamente l'ordine tramite link e la successiva ispezione con foto in magazzino. È un controllo utile, ma le immagini non garantiscono comfort, forma interna, materiale, durata o autenticità.",
    ],
    sections: [
      { heading: "Parti dal piede più lungo, non dalla solita etichetta", paragraphs: ["Misura su pavimento duro, in piedi e con le calze previste. Tallone contro una parete, segna il dito più lungo, ripeti per entrambi i piedi e non arrotondare in difetto.", "Salva prima la misura grezza. Non aggiungere un margine universale: forma, uso, calze e definizione del venditore cambiano la scelta."], bullets: ["Superficie dura e piana", "Calze previste", "Entrambi i piedi", "Misura maggiore non arrotondata"] },
      { heading: "Usa una soletta comoda come secondo riferimento", paragraphs: ["Scegli una scarpa con uso e punta simili, posa piatta la soletta estraibile e misura dal tallone al punto più lungo. Annota se calza stretta, comoda o larga.", "Non forzare una soletta incollata. Scarpe da corsa, eleganti strette e alte imbottite possono risultare diverse con lunghezze simili; è un riferimento, non una garanzia."] },
      { heading: "Identifica cosa misura la tabella del venditore", paragraphs: ["Piede, lunghezza interna, soletta e suola esterna non sono intercambiabili. Confronta piede con piede e soletta con un riferimento misurato nello stesso modo.", "Salva unità, diagramma e data. Sole etichette EU, US, UK o del venditore senza definizione aumentano l'incertezza."] },
      { heading: "Confronta in modo trasparente", paragraphs: ["Esempio: piede più lungo 26,1 cm e soletta comoda 27,0 cm. Se una tabella indicata come lunghezza soletta propone 26,7 e 27,1 cm, la seconda è più vicina al riferimento ma non garantisce la stessa calzata.", "Se 27,1 cm è la suola esterna, il confronto non vale. Cerca piede o soletta, chiedi chiarimento oppure riconosci l'incertezza.", "Non inventare tolleranze universali. Salva l'intervallo pubblicato dal venditore e definisci quale differenza cambierebbe la decisione."] },
      { heading: "Salva l'opzione esatta prima di incollare il link", paragraphs: ["Conserva URL, data, colore, taglia, quantità, codice variante e tabella, quindi confronta l'ordine generato nel flusso LoloBuy attuale.", "Una pagina può raggruppare modelli o accessori. Verifica che prezzo e variante appartengano al paio desiderato e separa prodotto, consegna interna e futuro pacco internazionale."], bullets: ["URL e data", "Colore, taglia, quantità e codice", "Tabella e definizione", "Piede e soletta", "Soglia decisionale"] },
      { heading: "Controlla il QC in un ordine specifico per scarpe", paragraphs: ["Conferma due scarpe abbinate, modello, colore, etichette e parti incluse. Poi esamina lati, talloni, punte, suole, allineamento e danni visibili.", "Non partire da cuciture minime se la taglia non è chiara. Luce, angolo e imballo possono alterare colore o forma; descrivi solo ciò che si vede.", "Il sito pubblico non stabilisce un numero universale di foto gratuite o prezzi generali per immagini, video o misure. Controlla le opzioni dell'ordine."] },
      { heading: "Chiedi una misura solo se cambia la decisione", paragraphs: ["Una soletta aiuta solo se estraibile e se righello, punto iniziale e linea più lunga sono visibili. Chiedi tallone-punta e unità, poi confronta nello stesso modo.", "Il magazzino non può provare la scarpa. La lunghezza non dimostra larghezza, arco, tenuta del tallone, ammortizzazione o comfort."] },
      { heading: "Approva, chiedi o agisci prima del pacco", paragraphs: ["Approva quando identità, etichette, quantità e dettagli decisivi coincidono. Fai una domanda mirata se un'etichetta, angolo o misura risolve il dubbio. Per una differenza documentata salva le prove e usa l'azione disponibile nell'ordine.", "Questa guida non promette reso, cambio, rimborso, scadenza o costo. I 90 giorni di deposito pubblicizzati non sono una finestra universale di reso del venditore.", "Nel pacco valuta scatola, protezione e volume. LoloBuy descrive il consolidamento, ma peso, dimensioni, rotta e prezzo restano dati correnti."] },
      { heading: "Mantieni un registro decisionale riutilizzabile", paragraphs: ["Conserva in privato piede lungo, soletta, definizione tabella, variante, etichetta magazzino, misura extra e decisione con data; mai credenziali, pagamento o indirizzo completo.", "Separare la fonte di ogni numero non elimina ogni rischio, ma rende la scelta verificabile anziché una supposizione basata su un'etichetta familiare."] },
    ],
  },
};
