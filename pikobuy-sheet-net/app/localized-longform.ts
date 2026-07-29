import type { Locale } from "./i18n";

export type LongformContent = {
  title: string;
  deck: string;
  fact?: string;
  date?: string;
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
};

const section = (title: string, text: string) => ({
  title,
  paragraphs: [text],
});

const localized: Record<
  Exclude<Locale, "en">,
  Record<string, LongformContent>
> = {
  de: {
    "how-to-use-pikobuy": {
      title: "PikoBuy nutzen: Der Bestellablauf in sechs Schritten",
      deck: "Der veröffentlichte Einsteiger-Ratgeber beschreibt sechs Phasen. Diese Übersicht macht daraus eine praktische Checkliste für Auswahl, Lagerprüfung und Versand.",
      fact: "Grundlage: offizielle Seiten von PikoBuy zu Einstieg, Unternehmen und Versandkosten; geprüft am 29.07.2026.",
      sections: [
        section("1. Mit einem prüfbaren Angebot beginnen", "Öffne die ursprüngliche Produktseite und prüfe Verkäufer, Varianten, Preis und Bilder. Ein funktionierender Link ist nur der Anfang und keine Qualitätsgarantie."),
        section("2. Per Suchbegriff oder Originallink suchen", "Nutze klare Suchbegriffe oder füge den Link von Taobao, Tmall, 1688, Weidian oder Yupoo ein. Kontrolliere, ob das erkannte Produkt wirklich übereinstimmt."),
        section("3. Die erste Zahlung verstehen", "Die erste Zahlung betrifft Produkt und angezeigte Inlandsbestandteile. Internationaler Versand wird später mit den tatsächlichen Paketdaten berechnet."),
        section("4. Das Lager als Entscheidungspunkt nutzen", "Vergleiche eingegangenen Artikel, Optionen, Maße und Fotos. Stelle gezielte Fotofragen und reagiere früh, wenn ein Rückgabegrund sichtbar ist."),
        section("5. Versand mit vollständigen Paketdaten vergleichen", "Vergleiche Routen erst mit Ziel, Produkttyp, Gewicht und Abmessungen. Beachte Beschränkungen und behandle Schätzungen nicht als festen Endpreis."),
        section("6. Ruhige Tracking-Phasen richtig einordnen", "Internationale Sendungen können zwischen Scans längere Pausen haben. Nutze die offizielle Sendungsnummer und prüfe den Verlauf, bevor du aus einer kurzen Pause ein Problem ableitest."),
      ],
    },
    "pikobuy-qc-checklist": {
      title: "PikoBuy-QC-Fotos: Was vor dem Versand zu prüfen ist",
      deck: "Eine strukturierte Fotoprüfung trennt sichtbare Belege von Vermutungen und hilft, wichtige Fehler vor kleinen Details zu erkennen.",
      fact: "QC-Fotos zeigen nur den sichtbaren Zustand aus bestimmten Winkeln; Material, Komfort und Haltbarkeit bleiben unbewiesen.",
      sections: [
        section("Zuerst Identität, nicht Kleinigkeiten", "Bestätige Produkt, Farbe, Größe, Menge und Variante. Ein falscher Grundartikel ist wichtiger als ein kleiner Faden oder eine Verpackungsfalte."),
        section("Schuhe: Form, Paarvergleich und Etiketten", "Vergleiche beide Schuhe bei Zehenform, Ferse, Sohle, Nähten und Größenetikett. Fordere ein Maß an, wenn die Größentabelle unklar ist."),
        section("Kleidung: Maße sind wichtiger als Buchstaben", "Vergleiche Brustweite, Länge, Schulter und Ärmel mit einem passenden Kleidungsstück. Prüfe danach Druck, Stickerei, Taschen, Reißverschluss und Flecken."),
        section("Taschen und Accessoires: Beschläge, Symmetrie und Finish", "Prüfe Form, Griffe, Riemen, Kantenfarbe, Verschluss und Innenraum. Bei Hüten zählen Kronenform, Stickerei und Innenetikett."),
        section("Grenzen der Fotoprüfung kennen", "Fotos können sichtbare Mängel zeigen, aber weder Fasergehalt, Geruch, Wasserdichtigkeit, Komfort noch langfristige Nutzung zuverlässig beweisen."),
      ],
    },
    "pikobuy-shipping-cost": {
      title: "PikoBuy-Versandkosten: Gewicht, Größe und Routen",
      deck: "Internationaler Versand ist eine Paketberechnung. Erfasse die richtigen Daten, bevor du Routen oder gelieferte Gesamtkosten vergleichst.",
      fact: "Der offizielle Rechner fragt Ziel, Produkttyp, Gewicht, Länge, Breite und Höhe ab.",
      sections: [
        section("Warum Gewicht allein nicht reicht", "Ein leichtes, aber großes Paket kann nach Volumen berechnet werden. Nutze verpackte Maße, sobald das Lager sie bereitstellt."),
        section("Der Produkttyp verändert verfügbare Routen", "Batterien, Flüssigkeiten, Kosmetik und andere sensible Kategorien können Routen einschränken. Eine Kleidungsquote lässt sich nicht einfach übertragen."),
        section("Ziel und Route sind getrennte Entscheidungen", "Das Zielland bestimmt wohin, die Route bestimmt wie. Vergleiche Laufzeit, Abrechnung, Einschränkungen und Tracking, nicht nur den kleinsten Preis."),
        section("In drei Stufen schätzen", "Beginne mit Produktannahmen, ersetze sie im Lager durch gemessene Daten und triff die Entscheidung mit dem aktuellen Paketangebot."),
        section("Verpackung sollte ein konkretes Problem lösen", "Kartonentfernung kann Volumen senken; Verstärkung erhöht Schutz, aber auch Maße. Wähle nach Produktrisiko und berechne anschließend neu."),
      ],
    },
    "pikobuy-spreadsheet-product-research": {
      title: "PikoBuy-Spreadsheet-Recherche: Vom Fund zur besseren Auswahl",
      deck: "Ein Spreadsheet beschleunigt die Entdeckung. Eine feste Prüfroutine macht die Auswahl nachvollziehbarer und sicherer.",
      date: "29. Juli 2026",
      sections: [
        section("Ein Fund ist ein Hinweis, keine Empfehlung", "Öffne die aktuelle Produktseite und prüfe Verkäufer, Optionen, Preis, Bilder und Kennung. Die Live-Seite hat Vorrang vor einer älteren Karte."),
        section("Eine Auswahlliste mit Gründen bauen", "Notiere für jeden Kandidaten, warum er bleibt. Entferne tote Links, unklare Varianten und Angebote ohne ausreichende Prüfmöglichkeit."),
        section("Sichtbare Belege von Annahmen trennen", "Angebotsbilder zeigen Design; Lagerfotos zeigen den eingegangenen Artikel. Beide belegen nur, was aus den vorhandenen Winkeln sichtbar ist."),
        section("QC vor der Ankunft planen", "Speichere Zielmaße und wichtige Details schon vor dem Kauf. Spätere Zusatzfotos können dann eine konkrete Wissenslücke schließen."),
        section("Versand im Vergleich behalten", "Gewicht, Maße, Kategorie und Ziel beeinflussen die Gesamtkosten. Markiere sperrige Verpackung, schwere Kleidung und sensible Produkttypen früh."),
        section("Ein besseres Spreadsheet ist transparent", "Ein guter Index zeigt Ziel, Prüfdatum und offene Fragen. Er hilft, schwache Optionen auszusortieren, statt jeden Fund gut aussehen zu lassen."),
      ],
    },
    "warehouse-photos-before-shipping": {
      title: "Lagerfotos vor dem Versand: Eine ruhige, nützliche Prüfroutine",
      deck: "Lagerfotos sind zeitkritische Belege. Eine feste Reihenfolge verhindert, dass wichtige Fehler hinter kleinen Details verschwinden.",
      date: "27. Juli 2026",
      sections: [
        section("Originalbestellung neben den Fotos öffnen", "Bestätige zuerst Verkäufer, Farbe, Größe, Menge und bezahlte Variante. Vergleiche danach Quellbilder und gespeicherte Maße."),
        section("Von Gesamtansichten zu Details gehen", "Prüfe zuerst Form, Symmetrie und Schäden, dann Etiketten, Druck, Stickerei, Beschläge und Maße. Mehrere Winkel reduzieren Fehlinterpretationen."),
        section("Eine genaue Zusatzfoto-Anfrage schreiben", "Nenne Stelle, Winkel und gewünschte Evidenz, etwa Sohlenlänge am Lineal oder beide Fersen gemeinsam. Bitte nicht nur allgemein um mehr Fotos."),
        section("Schaden von Präsentation unterscheiden", "Falten und leichte Formverluste können von Verpackung kommen. Flecken, Schnitte, fehlende Teile, Sohlenablösung und falsche Varianten sind wichtiger."),
        section("Entscheiden, solange Rückgabe möglich ist", "Die veröffentlichte Richtlinie nennt Bedingungen und ein fünftägiges Lagerfenster für geeignete Rückgaben. Prüfe Live-Regeln sofort bei klaren Problemen."),
        section("Nur bestätigen, was Fotos stützen", "Ein sauberer Fotosatz ist kein Labor- oder Tragetest. Genehmige nur, wenn die sichtbaren Belege deinen vorher festgelegten Maßstab erfüllen."),
      ],
    },
    "estimate-pikobuy-parcel-cost": {
      title: "Ein PikoBuy-Paket vor der Bestellung realistisch schätzen",
      deck: "Eine nützliche Schätzung nennt ihre Annahmen und trennt Produkt-, Verpackungs- und Routenkosten.",
      date: "25. Juli 2026",
      sections: [
        section("Mit den Feldern des offiziellen Rechners beginnen", "Sammle Ziel, Produkttyp, Gewicht sowie Länge, Breite und Höhe. Vor Lagerankunft sind Verkäuferangaben nur frühe Annahmen."),
        section("Produktgewicht und Paketgröße trennen", "Produktgewicht beschreibt den Artikel, Versandmaße das verpackte Paket. Kartons, Schutz und Leerraum erzeugen die Differenz."),
        section("Verpackungsvarianten modellieren", "Vergleiche sinnvollen Schutz mit entfernbarer Verpackung. Entferne Schutz nicht bei druckempfindlichen Artikeln nur für eine kleinere Zahl."),
        section("Prüfen, ob ein Artikel die Route bestimmt", "Batterien, Flüssigkeiten oder andere Einschränkungen können die ganze Mischsendung beeinflussen. Vergleiche gegebenenfalls geteilte Pakete inklusive Zusatzkosten."),
        section("Budget in Ebenen aufteilen", "Trenne Artikelpreis, Inlandsversand, optionale Leistungen, Rückgabe und internationalen Versand. Ein eigener Puffer ist keine offizielle PikoBuy-Gebühr."),
        section("Das Live-Paketangebot als Entscheidung nutzen", "Die Vorabschätzung filtert schlechte Kombinationen. Die endgültige Routenauswahl erfolgt mit aktuellen, gemessenen Paketdaten."),
      ],
    },
  },
  fr: {
    "how-to-use-pikobuy": {
      title: "Comment utiliser PikoBuy : les six étapes d’une commande",
      deck: "Le guide débutant publié présente six phases. Cette checklist les transforme en décisions pratiques, de l’annonce au colis international.",
      fact: "Sources : guide débutant, page À propos et estimateur officiels PikoBuy, vérifiés le 29/07/2026.",
      sections: [
        section("1. Commencer par une annonce vérifiable", "Ouvrez la source et vérifiez vendeur, variantes, prix et images. Un lien actif lance la recherche mais ne garantit pas la qualité."),
        section("2. Rechercher ou coller le lien d’origine", "Utilisez des mots-clés précis ou un lien Taobao, Tmall, 1688, Weidian ou Yupoo, puis contrôlez le produit reconnu."),
        section("3. Comprendre le premier paiement", "Le premier paiement couvre le produit et les éléments domestiques affichés. L’expédition internationale est calculée plus tard avec les données du colis."),
        section("4. Faire de l’entrepôt un point de décision", "Comparez article, options, mesures et photos. Demandez une vue précise si une preuve manque et agissez vite en cas de retour possible."),
        section("5. Comparer l’envoi avec toutes les données", "Comparez les lignes avec destination, type de produit, poids et dimensions. Une estimation n’est pas un prix final permanent."),
        section("6. Suivre sans surinterpréter les pauses", "Les colis internationaux peuvent rester entre deux scans. Suivez le numéro officiel et examinez l’historique avant de conclure à un problème."),
      ],
    },
    "pikobuy-qc-checklist": {
      title: "Photos QC PikoBuy : que vérifier avant l’expédition",
      deck: "Une vérification structurée sépare les preuves visibles des suppositions et traite les erreurs majeures avant les détails.",
      fact: "Les photos QC montrent un état visible sous certains angles ; elles ne prouvent ni matière, ni confort, ni durabilité.",
      sections: [
        section("Commencer par l’identité de l’article", "Confirmez produit, couleur, taille, quantité et variante. Une mauvaise référence est plus importante qu’un petit fil."),
        section("Chaussures : structure, paire et étiquettes", "Comparez les deux chaussures : forme, talon, semelle, coutures et taille. Demandez une mesure si le tableau est flou."),
        section("Vêtements : les mesures avant la lettre", "Comparez poitrine, longueur, épaules et manches avec un vêtement adapté, puis examinez imprimé, broderie, poches et taches."),
        section("Sacs et accessoires : finitions et symétrie", "Vérifiez forme, poignées, sangles, peinture de tranche, fermeture et intérieur. Pour un chapeau, contrôlez forme, broderie et étiquette."),
        section("Connaître les limites des photos", "Une photo ne prouve pas fibre, odeur, imperméabilité, électronique, confort ou résistance à long terme."),
      ],
    },
    "pikobuy-shipping-cost": {
      title: "Frais d’expédition PikoBuy : poids, volume et lignes",
      deck: "L’expédition internationale se calcule au niveau du colis. Rassemblez les bonnes données avant de comparer.",
      fact: "L’estimateur officiel demande destination, type de produit, poids, longueur, largeur et hauteur.",
      sections: [
        section("Pourquoi le poids ne suffit pas", "Un colis léger mais volumineux peut être facturé au volume. Utilisez les dimensions emballées fournies par l’entrepôt."),
        section("Le type de produit change les lignes", "Batteries, liquides, cosmétiques et autres catégories sensibles peuvent limiter le choix. Un tarif pour vêtements ne s’applique pas automatiquement."),
        section("Destination et ligne sont deux choix", "La destination indique où ; la ligne indique comment. Comparez délai, calcul, restrictions et suivi, pas seulement le prix."),
        section("Estimer en trois étapes", "Commencez par des hypothèses, remplacez-les par les mesures d’entrepôt puis choisissez avec le devis actif du colis."),
        section("L’emballage doit résoudre un risque", "Retirer une boîte réduit parfois le volume ; renforcer protège mais ajoute matière. Choisissez selon le produit puis recalculez."),
      ],
    },
    "pikobuy-spreadsheet-product-research": {
      title: "Recherche PikoBuy Spreadsheet : d’une trouvaille à une meilleure sélection",
      deck: "Le tableau accélère la découverte ; une routine de recherche rend la comparaison plus claire et plus sûre.",
      date: "29 juillet 2026",
      sections: [
        section("Une trouvaille est une piste, pas une recommandation", "Ouvrez la fiche active et contrôlez vendeur, options, prix, images et identifiant. La page en direct prime sur une ancienne carte."),
        section("Créer une sélection avec des raisons", "Notez pourquoi chaque candidat reste. Éliminez les sources mortes, variantes ambiguës et annonces impossibles à contrôler."),
        section("Séparer preuve visible et hypothèse", "Les images d’annonce montrent le design ; les photos d’entrepôt montrent l’article reçu. Elles restent limitées aux angles disponibles."),
        section("Préparer le QC avant l’arrivée", "Enregistrez mesures cibles et détails importants avant l’achat afin que toute demande de photo réponde à une question précise."),
        section("Garder l’expédition dans la comparaison", "Poids, dimensions, catégorie et destination influencent le coût livré. Signalez tôt les boîtes, articles lourds et catégories sensibles."),
        section("Un meilleur tableau est transparent", "Un bon index indique la destination du lien, la date de contrôle et ce qui reste à vérifier. Il aide surtout à rejeter les options faibles."),
      ],
    },
    "warehouse-photos-before-shipping": {
      title: "Photos d’entrepôt avant expédition : une méthode de contrôle utile",
      deck: "Ces photos sont des preuves sensibles au temps. Un ordre constant évite de manquer un problème important.",
      date: "27 juillet 2026",
      sections: [
        section("Ouvrir la commande d’origine à côté des photos", "Confirmez vendeur, couleur, taille, quantité et variante payée avant de comparer images source et mesures."),
        section("Passer des vues larges aux détails", "Examinez d’abord forme, symétrie et dégâts, puis étiquettes, imprimés, broderies, quincaillerie et mesures."),
        section("Rédiger une demande de photo précise", "Indiquez la zone, l’angle et la preuve attendue, par exemple la longueur de semelle contre une règle."),
        section("Distinguer dommage et présentation", "Plis et déformations légères peuvent venir du colis. Taches, coupures, pièces manquantes et mauvaise variante exigent plus d’attention."),
        section("Décider pendant que le retour reste possible", "La politique publiée décrit des conditions et cinq jours en entrepôt pour les retours éligibles. Vérifiez immédiatement les contrôles actifs."),
        section("N’approuver que ce que les photos montrent", "Une série propre n’est ni un laboratoire ni un essai porté. Approuvez seulement si les preuves visibles répondent à votre seuil."),
      ],
    },
    "estimate-pikobuy-parcel-cost": {
      title: "Estimer un colis PikoBuy avant de s’engager",
      deck: "Une estimation utile affiche ses hypothèses et sépare produit, emballage et route.",
      date: "25 juillet 2026",
      sections: [
        section("Commencer par les champs officiels", "Rassemblez destination, type, poids, longueur, largeur et hauteur. Avant l’entrepôt, les données vendeur restent des hypothèses."),
        section("Séparer poids du produit et taille emballée", "Le poids produit décrit l’article ; les mesures d’expédition décrivent la boîte avec protection et espace vide."),
        section("Modéliser les choix d’emballage", "Comparez protection conservée et emballage non essentiel retiré, sans compresser un article fragile pour réduire un chiffre."),
        section("Vérifier si un article contrôle la route", "Une batterie, un liquide ou un produit restreint peut limiter tout le colis. Comparez un envoi séparé avec tous ses frais."),
        section("Construire le budget par couches", "Séparez produit, transport domestique, services, retour et envoi international. Votre marge d’incertitude n’est pas un frais officiel."),
        section("Décider avec le devis actif", "L’estimation préachat filtre les mauvaises combinaisons ; la décision finale utilise les données mesurées et les lignes actuelles."),
      ],
    },
  },
  es: {
    "how-to-use-pikobuy": {
      title: "Cómo usar PikoBuy: el pedido en seis pasos",
      deck: "La guía oficial divide el pedido en seis fases. Esta lista las convierte en decisiones prácticas desde el anuncio hasta el paquete.",
      fact: "Base: guía para principiantes, página Acerca de y estimador oficiales de PikoBuy, revisados el 29/07/2026.",
      sections: [
        section("1. Empieza con un anuncio que puedas evaluar", "Abre la fuente y confirma vendedor, variantes, precio e imágenes. Un enlace activo inicia la investigación, pero no garantiza calidad."),
        section("2. Busca o pega el enlace original", "Usa palabras claras o pega un enlace de Taobao, Tmall, 1688, Weidian o Yupoo y comprueba el producto detectado."),
        section("3. Entiende el primer pago", "El primer pago cubre producto y conceptos nacionales mostrados. El envío internacional se calcula después con los datos reales del paquete."),
        section("4. Usa el almacén como punto de decisión", "Compara artículo, opciones, medidas y fotos. Pide una imagen concreta si falta evidencia y actúa pronto ante una posible devolución."),
        section("5. Compara el envío con datos completos", "Compara rutas con destino, tipo de producto, peso y dimensiones. Una estimación no es un precio final permanente."),
        section("6. Sigue el paquete sin alarmarte por cada pausa", "Los envíos internacionales pueden pasar tiempo entre escaneos. Revisa el número oficial y el historial antes de asumir un problema."),
      ],
    },
    "pikobuy-qc-checklist": {
      title: "Fotos QC de PikoBuy: qué revisar antes del envío",
      deck: "Una revisión estructurada separa la evidencia visible de las suposiciones y prioriza los errores importantes.",
      fact: "Las fotos QC muestran el estado visible desde ciertos ángulos; no prueban material, comodidad ni durabilidad.",
      sections: [
        section("Empieza por la identidad, no por detalles pequeños", "Confirma producto, color, talla, cantidad y variante. Un artículo equivocado importa más que un hilo suelto."),
        section("Calzado: estructura, pareja y etiquetas", "Compara ambos zapatos en puntera, talón, suela, costuras y talla. Pide una medida si la tabla no es clara."),
        section("Ropa: las medidas superan a las letras", "Compara pecho, largo, hombros y mangas con una prenda que te quede bien; después revisa estampado, bordado y manchas."),
        section("Bolsos y accesorios: herrajes y simetría", "Revisa forma, asas, correa, cantos, cierre e interior. En gorras, comprueba forma, bordado y etiqueta."),
        section("Conoce los límites de una foto", "Las imágenes no prueban fibras, olor, impermeabilidad, funcionamiento, comodidad ni resistencia a largo plazo."),
      ],
    },
    "pikobuy-shipping-cost": {
      title: "Coste de envío PikoBuy: peso, tamaño y rutas",
      deck: "El transporte internacional se calcula por paquete. Reúne los datos correctos antes de comparar.",
      fact: "El estimador oficial pide destino, tipo de producto, peso, largo, ancho y alto.",
      sections: [
        section("Por qué el peso no basta", "Un paquete ligero pero voluminoso puede facturarse por volumen. Usa las medidas embaladas del almacén cuando estén disponibles."),
        section("El tipo de producto cambia las rutas", "Baterías, líquidos, cosméticos y otras categorías sensibles pueden limitar opciones. Una tarifa de ropa no se aplica automáticamente."),
        section("Destino y ruta son decisiones distintas", "El destino indica dónde; la ruta, cómo. Compara plazo, cálculo, restricciones y seguimiento, no solo precio."),
        section("Usa una estimación en tres fases", "Empieza con supuestos, sustitúyelos por medidas del almacén y decide con la cotización activa del paquete."),
        section("El embalaje debe resolver un riesgo", "Quitar una caja puede reducir volumen; reforzar protege pero añade medidas. Elige según el artículo y vuelve a calcular."),
      ],
    },
    "pikobuy-spreadsheet-product-research": {
      title: "Investigación PikoBuy Spreadsheet: de un hallazgo a una mejor selección",
      deck: "La hoja acelera el descubrimiento; una rutina hace la comparación más clara y segura.",
      date: "29 de julio de 2026",
      sections: [
        section("Un hallazgo es una pista, no una recomendación", "Abre la ficha activa y comprueba vendedor, opciones, precio, imágenes e identificador. La página actual manda sobre una tarjeta antigua."),
        section("Crea una selección con motivos", "Anota por qué sobrevive cada candidato. Elimina fuentes caídas, variantes ambiguas y anuncios sin evidencia básica."),
        section("Separa evidencia visible de suposiciones", "Las imágenes del anuncio muestran diseño; las del almacén, el artículo recibido. Ambas están limitadas por ángulos y luz."),
        section("Planifica el QC antes de la llegada", "Guarda medidas objetivo y detalles importantes antes de comprar para que las fotos adicionales respondan a una pregunta concreta."),
        section("Incluye el envío en la comparación", "Peso, dimensiones, categoría y destino afectan el coste. Marca pronto cajas, ropa pesada y productos sensibles."),
        section("Una mejor hoja es transparente", "Un buen índice indica destino, fecha de revisión y puntos pendientes. Su objetivo es descartar opciones débiles."),
      ],
    },
    "warehouse-photos-before-shipping": {
      title: "Fotos de almacén antes del envío: una rutina de revisión útil",
      deck: "Las fotos son evidencia sensible al tiempo. Un orden fijo evita que un problema grande quede oculto.",
      date: "27 de julio de 2026",
      sections: [
        section("Abre el pedido original junto a las fotos", "Confirma vendedor, color, talla, cantidad y variante pagada antes de comparar imágenes y medidas."),
        section("Pasa de vistas generales a detalles", "Revisa forma, simetría y daños; después etiquetas, estampados, bordados, herrajes y medidas."),
        section("Escribe una solicitud de foto precisa", "Indica zona, ángulo y prueba necesaria, como longitud de suela junto a una regla. Evita pedir solo más fotos."),
        section("Distingue daño de presentación", "Arrugas y leves deformaciones pueden ser del embalaje. Manchas, cortes, piezas ausentes y variantes erróneas requieren atención."),
        section("Decide mientras la devolución siga disponible", "La política publicada describe condiciones y cinco días en almacén para artículos aptos. Revisa los controles activos de inmediato."),
        section("Aprueba solo lo que muestran las fotos", "Un conjunto limpio no es una prueba de laboratorio. Aprueba cuando la evidencia visible cumple tu criterio definido."),
      ],
    },
    "estimate-pikobuy-parcel-cost": {
      title: "Cómo estimar un paquete PikoBuy antes de comprar",
      deck: "Una estimación útil muestra sus supuestos y separa producto, embalaje y ruta.",
      date: "25 de julio de 2026",
      sections: [
        section("Empieza por los campos oficiales", "Reúne destino, tipo, peso, largo, ancho y alto. Antes del almacén, los datos del vendedor son solo estimaciones."),
        section("Separa peso del producto y tamaño embalado", "El peso describe el artículo; las medidas de envío incluyen caja, protección y espacio vacío."),
        section("Modela las opciones de embalaje", "Compara protección conservada y embalaje prescindible retirado sin comprimir un artículo vulnerable solo por reducir volumen."),
        section("Comprueba si un artículo controla la ruta", "Una batería, líquido o producto restringido puede limitar todo el paquete. Compara envíos separados incluyendo todos los cargos."),
        section("Divide el presupuesto en capas", "Separa producto, envío nacional, servicios, devolución y transporte internacional. Tu margen no es una tarifa oficial."),
        section("Decide con la cotización activa", "La estimación previa filtra malas combinaciones; la decisión final usa medidas reales y rutas actuales."),
      ],
    },
  },
  it: {
    "how-to-use-pikobuy": {
      title: "Come usare PikoBuy: il processo in sei passaggi",
      deck: "La guida ufficiale divide l’ordine in sei fasi. Questa checklist le trasforma in decisioni pratiche fino alla spedizione.",
      fact: "Fonti: guida per principianti, pagina informativa e calcolatore ufficiali PikoBuy, verificati il 29/07/2026.",
      sections: [
        section("1. Inizia da un annuncio valutabile", "Apri la fonte e conferma venditore, varianti, prezzo e immagini. Un link attivo avvia la ricerca ma non garantisce qualità."),
        section("2. Cerca o incolla il link originale", "Usa parole chiare o incolla un link Taobao, Tmall, 1688, Weidian o Yupoo e verifica il prodotto riconosciuto."),
        section("3. Comprendi il primo pagamento", "Il primo pagamento copre prodotto e costi nazionali mostrati. La spedizione internazionale viene calcolata dopo con i dati del pacco."),
        section("4. Usa il magazzino come punto decisionale", "Confronta articolo, opzioni, misure e foto. Chiedi un’immagine precisa se manca una prova e agisci presto per un eventuale reso."),
        section("5. Confronta l’invio con dati completi", "Confronta rotte usando destinazione, tipo, peso e dimensioni. Una stima non è un prezzo finale permanente."),
        section("6. Segui senza allarmarti per ogni pausa", "Le spedizioni internazionali possono restare tra due scansioni. Controlla numero ufficiale e cronologia prima di presumere un problema."),
      ],
    },
    "pikobuy-qc-checklist": {
      title: "Foto QC PikoBuy: cosa controllare prima della spedizione",
      deck: "Una verifica strutturata separa prove visibili e supposizioni, dando priorità agli errori importanti.",
      fact: "Le foto QC mostrano condizioni visibili da alcuni angoli; non provano materiale, comfort o durata.",
      sections: [
        section("Inizia dall’identità, non dai dettagli minimi", "Conferma prodotto, colore, taglia, quantità e variante. Un articolo errato conta più di un filo allentato."),
        section("Scarpe: struttura, coppia ed etichette", "Confronta entrambe le scarpe per punta, tallone, suola, cuciture e taglia. Chiedi una misura se la tabella è poco chiara."),
        section("Abbigliamento: le misure battono le lettere", "Confronta torace, lunghezza, spalle e maniche con un capo adatto, poi controlla stampa, ricamo e macchie."),
        section("Borse e accessori: ferramenta e simmetria", "Controlla forma, manici, tracolla, bordi, chiusura e interno. Per i cappelli verifica forma, ricamo ed etichetta."),
        section("Conosci i limiti delle foto", "Le immagini non provano fibre, odore, impermeabilità, funzionamento, comfort o resistenza nel tempo."),
      ],
    },
    "pikobuy-shipping-cost": {
      title: "Costo spedizione PikoBuy: peso, dimensioni e rotte",
      deck: "La spedizione internazionale è un calcolo del pacco. Raccogli i dati corretti prima di confrontare.",
      fact: "Il calcolatore ufficiale chiede destinazione, tipo di prodotto, peso, lunghezza, larghezza e altezza.",
      sections: [
        section("Perché il peso non basta", "Un pacco leggero ma voluminoso può essere fatturato sul volume. Usa le misure imballate del magazzino."),
        section("Il tipo di prodotto cambia le rotte", "Batterie, liquidi, cosmetici e categorie sensibili possono limitare le opzioni. Una tariffa per abbigliamento non vale automaticamente."),
        section("Destinazione e rotta sono scelte diverse", "La destinazione dice dove, la rotta come. Confronta tempi, calcolo, restrizioni e tracking, non solo prezzo."),
        section("Stima in tre fasi", "Inizia con ipotesi, sostituiscile con misure del magazzino e decidi con il preventivo attivo."),
        section("L’imballaggio deve risolvere un rischio", "Togliere una scatola riduce talvolta il volume; rinforzare protegge ma aggiunge misure. Scegli in base all’articolo."),
      ],
    },
    "pikobuy-spreadsheet-product-research": {
      title: "Ricerca PikoBuy Spreadsheet: da un prodotto a una selezione migliore",
      deck: "Il foglio accelera la scoperta; una routine rende il confronto più chiaro e sicuro.",
      date: "29 luglio 2026",
      sections: [
        section("Un prodotto è una pista, non una raccomandazione", "Apri la pagina attiva e verifica venditore, opzioni, prezzo, immagini e identificativo. La pagina corrente prevale sulla scheda vecchia."),
        section("Crea una selezione con motivazioni", "Annota perché ogni candidato rimane. Elimina fonti inattive, varianti ambigue e annunci senza prove minime."),
        section("Separa prove visibili e supposizioni", "Le immagini dell’annuncio mostrano il design; quelle del magazzino l’articolo ricevuto. Entrambe dipendono da angoli e luce."),
        section("Pianifica il QC prima dell’arrivo", "Salva misure obiettivo e dettagli importanti prima dell’acquisto, così ogni foto aggiuntiva risponde a una domanda."),
        section("Mantieni la spedizione nel confronto", "Peso, dimensioni, categoria e destinazione influenzano il costo. Segnala presto scatole, capi pesanti e prodotti sensibili."),
        section("Un foglio migliore è trasparente", "Un buon indice indica destinazione, data di verifica e controlli mancanti. Serve soprattutto a scartare opzioni deboli."),
      ],
    },
    "warehouse-photos-before-shipping": {
      title: "Foto di magazzino prima della spedizione: una verifica utile",
      deck: "Le foto sono prove sensibili al tempo. Un ordine fisso evita che un problema grande venga ignorato.",
      date: "27 luglio 2026",
      sections: [
        section("Apri l’ordine originale accanto alle foto", "Conferma venditore, colore, taglia, quantità e variante pagata prima di confrontare immagini e misure."),
        section("Passa dalle viste generali ai dettagli", "Controlla forma, simmetria e danni; poi etichette, stampe, ricami, ferramenta e misure."),
        section("Scrivi una richiesta fotografica precisa", "Indica zona, angolo e prova necessaria, come la lunghezza della suola accanto a un righello."),
        section("Distingui danno e presentazione", "Pieghe e lievi deformazioni possono dipendere dall’imballaggio. Macchie, tagli, parti mancanti e varianti errate contano di più."),
        section("Decidi mentre il reso è ancora possibile", "La politica pubblicata descrive condizioni e cinque giorni in magazzino per prodotti idonei. Controlla subito le opzioni attive."),
        section("Approva solo ciò che le foto supportano", "Un set pulito non è un test di laboratorio. Approva quando le prove visibili soddisfano il tuo criterio."),
      ],
    },
    "estimate-pikobuy-parcel-cost": {
      title: "Come stimare un pacco PikoBuy prima dell’acquisto",
      deck: "Una stima utile mostra le ipotesi e separa prodotto, imballaggio e rotta.",
      date: "25 luglio 2026",
      sections: [
        section("Inizia dai campi ufficiali", "Raccogli destinazione, tipo, peso, lunghezza, larghezza e altezza. Prima del magazzino i dati del venditore sono stime."),
        section("Separa peso del prodotto e dimensione imballata", "Il peso descrive l’articolo; le misure di spedizione includono scatola, protezione e spazio vuoto."),
        section("Modella le scelte di imballaggio", "Confronta protezione mantenuta e imballaggio non essenziale rimosso, senza comprimere un articolo vulnerabile."),
        section("Controlla se un articolo determina la rotta", "Una batteria, liquido o prodotto limitato può condizionare tutto il pacco. Confronta spedizioni separate includendo ogni costo."),
        section("Dividi il budget in livelli", "Separa prodotto, spedizione nazionale, servizi, reso e spedizione internazionale. Il tuo margine non è una tariffa ufficiale."),
        section("Decidi con il preventivo attivo", "La stima iniziale filtra combinazioni inadatte; la decisione finale usa misure reali e rotte correnti."),
      ],
    },
  },
  pl: {
    "how-to-use-pikobuy": {
      title: "Jak korzystać z PikoBuy: sześć kroków zamówienia",
      deck: "Oficjalny poradnik dzieli zamówienie na sześć etapów. Ta checklista zamienia je w praktyczne decyzje aż do wysyłki.",
      fact: "Podstawa: oficjalny poradnik, informacje i kalkulator PikoBuy; sprawdzono 29.07.2026.",
      sections: [
        section("1. Zacznij od oferty, którą można ocenić", "Otwórz źródło i potwierdź sprzedawcę, warianty, cenę oraz zdjęcia. Aktywny link rozpoczyna research, ale nie gwarantuje jakości."),
        section("2. Wyszukaj lub wklej oryginalny link", "Użyj jasnych słów albo linku z Taobao, Tmall, 1688, Weidian lub Yupoo i sprawdź rozpoznany produkt."),
        section("3. Zrozum pierwszą płatność", "Pierwsza płatność obejmuje produkt i pokazane koszty krajowe. Wysyłka międzynarodowa jest liczona później z danych paczki."),
        section("4. Traktuj magazyn jako punkt decyzji", "Porównaj produkt, opcje, wymiary i zdjęcia. Poproś o konkretną fotografię, gdy brakuje dowodu, i szybko sprawdź zwrot."),
        section("5. Porównaj wysyłkę z pełnymi danymi", "Porównuj trasy według celu, typu produktu, wagi i wymiarów. Szacunek nie jest stałą ceną końcową."),
        section("6. Śledź bez paniki przy każdej przerwie", "Przesyłki międzynarodowe mogą długo czekać między skanami. Sprawdź oficjalny numer i historię przed uznaniem problemu."),
      ],
    },
    "pikobuy-qc-checklist": {
      title: "Zdjęcia QC PikoBuy: co sprawdzić przed wysyłką",
      deck: "Uporządkowana kontrola oddziela widoczne dowody od założeń i najpierw wychwytuje poważne błędy.",
      fact: "Zdjęcia QC pokazują widoczny stan z wybranych kątów; nie potwierdzają materiału, wygody ani trwałości.",
      sections: [
        section("Zacznij od tożsamości produktu", "Potwierdź produkt, kolor, rozmiar, liczbę i wariant. Zły artykuł jest ważniejszy niż mała luźna nitka."),
        section("Buty: konstrukcja, para i etykiety", "Porównaj oba buty: nosek, piętę, podeszwę, szwy i rozmiar. Poproś o pomiar, gdy tabela jest niejasna."),
        section("Odzież: wymiary ważniejsze niż litery", "Porównaj klatkę, długość, ramiona i rękawy z pasującą odzieżą, potem sprawdź nadruk, haft i plamy."),
        section("Torby i akcesoria: okucia oraz symetria", "Sprawdź kształt, uchwyty, pasek, krawędzie, zapięcie i wnętrze. Przy czapkach oceń formę, haft i etykietę."),
        section("Znaj granice zdjęć", "Fotografie nie potwierdzają włókien, zapachu, wodoodporności, działania elektroniki, wygody ani trwałości."),
      ],
    },
    "pikobuy-shipping-cost": {
      title: "Koszt wysyłki PikoBuy: waga, rozmiar i trasy",
      deck: "Wysyłka międzynarodowa jest liczona dla paczki. Zbierz właściwe dane przed porównaniem.",
      fact: "Oficjalny kalkulator pyta o cel, typ produktu, wagę, długość, szerokość i wysokość.",
      sections: [
        section("Dlaczego sama waga nie wystarcza", "Lekka, lecz duża paczka może być rozliczana objętościowo. Użyj wymiarów zapakowanej przesyłki z magazynu."),
        section("Typ produktu zmienia dostępne trasy", "Baterie, płyny, kosmetyki i wrażliwe kategorie ograniczają opcje. Stawka dla odzieży nie przenosi się automatycznie."),
        section("Cel i trasa to osobne decyzje", "Cel mówi dokąd, trasa jak. Porównaj czas, sposób rozliczenia, ograniczenia i śledzenie, a nie tylko cenę."),
        section("Szacuj w trzech etapach", "Zacznij od założeń, zastąp je pomiarami magazynu i wybierz według aktualnej wyceny paczki."),
        section("Opakowanie powinno rozwiązywać ryzyko", "Usunięcie pudełka może zmniejszyć objętość; wzmocnienie chroni, ale zwiększa wymiary. Wybierz według produktu."),
      ],
    },
    "pikobuy-spreadsheet-product-research": {
      title: "Research PikoBuy Spreadsheet: od znaleziska do lepszej listy",
      deck: "Arkusz przyspiesza odkrywanie; rutyna sprawia, że porównanie jest jasne i bezpieczniejsze.",
      date: "29 lipca 2026",
      sections: [
        section("Znalezisko to trop, nie rekomendacja", "Otwórz aktywną stronę i sprawdź sprzedawcę, opcje, cenę, zdjęcia oraz identyfikator. Bieżąca oferta ma pierwszeństwo."),
        section("Buduj listę z powodami", "Zapisz, dlaczego każdy kandydat zostaje. Usuń martwe źródła, niejasne warianty i oferty bez podstawowych dowodów."),
        section("Oddziel widoczne dowody od założeń", "Zdjęcia oferty pokazują projekt, a magazynowe otrzymany produkt. Oba rodzaje są ograniczone przez kąty i światło."),
        section("Zaplanuj QC przed przybyciem", "Zapisz docelowe wymiary i ważne detale przed zakupem, aby dodatkowe zdjęcie odpowiadało na konkretne pytanie."),
        section("Uwzględnij wysyłkę w porównaniu", "Waga, wymiary, kategoria i cel wpływają na koszt. Wcześnie oznacz pudełka, ciężkie ubrania i wrażliwe produkty."),
        section("Lepszy arkusz jest przejrzysty", "Dobry indeks pokazuje cel linku, datę kontroli i rzeczy do sprawdzenia. Pomaga odrzucać słabe opcje."),
      ],
    },
    "warehouse-photos-before-shipping": {
      title: "Zdjęcia magazynowe przed wysyłką: spokojna kontrola",
      deck: "Zdjęcia są dowodem zależnym od czasu. Stała kolejność pomaga nie przeoczyć poważnego problemu.",
      date: "27 lipca 2026",
      sections: [
        section("Otwórz oryginalne zamówienie obok zdjęć", "Potwierdź sprzedawcę, kolor, rozmiar, ilość i opłacony wariant przed porównaniem obrazów oraz wymiarów."),
        section("Przechodź od szerokich ujęć do detali", "Najpierw oceń kształt, symetrię i uszkodzenia, potem etykiety, nadruki, haft, okucia i pomiary."),
        section("Napisz precyzyjną prośbę o zdjęcie", "Wskaż miejsce, kąt i potrzebny dowód, na przykład długość podeszwy przy linijce."),
        section("Odróżnij uszkodzenie od prezentacji", "Zagniecenia mogą wynikać z pakowania. Plamy, przecięcia, brakujące części i zły wariant wymagają większej uwagi."),
        section("Decyduj, gdy zwrot jest jeszcze możliwy", "Opublikowana polityka opisuje warunki i pięć dni w magazynie dla kwalifikujących się produktów. Sprawdź aktywne opcje od razu."),
        section("Akceptuj tylko to, co wspierają zdjęcia", "Czysty zestaw nie jest testem laboratoryjnym. Zatwierdź, gdy widoczne dowody spełniają ustalone kryterium."),
      ],
    },
    "estimate-pikobuy-parcel-cost": {
      title: "Jak oszacować paczkę PikoBuy przed zakupem",
      deck: "Użyteczny szacunek pokazuje założenia i oddziela produkt, opakowanie oraz trasę.",
      date: "25 lipca 2026",
      sections: [
        section("Zacznij od oficjalnych pól", "Zbierz cel, typ, wagę, długość, szerokość i wysokość. Przed magazynem dane sprzedawcy są tylko szacunkiem."),
        section("Oddziel wagę produktu od rozmiaru paczki", "Waga opisuje produkt, a wymiary wysyłki obejmują karton, ochronę i pustą przestrzeń."),
        section("Modeluj wybory opakowania", "Porównaj zachowaną ochronę z usunięciem zbędnych opakowań, ale nie ściskaj wrażliwego produktu dla mniejszej liczby."),
        section("Sprawdź, czy jeden produkt kontroluje trasę", "Bateria, płyn lub ograniczony artykuł może wpłynąć na całą paczkę. Porównaj podział z wszystkimi kosztami."),
        section("Podziel budżet na warstwy", "Oddziel produkt, wysyłkę krajową, usługi, zwrot i transport międzynarodowy. Twój bufor nie jest opłatą oficjalną."),
        section("Decyduj według aktywnej wyceny", "Wstępny szacunek filtruje złe kombinacje; decyzja końcowa używa prawdziwych wymiarów i aktualnych tras."),
      ],
    },
  },
  pt: {
    "how-to-use-pikobuy": {
      title: "Como usar o PikoBuy: pedido em seis etapas",
      deck: "O guia oficial divide o pedido em seis fases. Esta checklist as transforma em decisões práticas até o envio.",
      fact: "Base: guia para iniciantes, página Sobre e calculador oficiais do PikoBuy, revisados em 29/07/2026.",
      sections: [
        section("1. Comece por um anúncio que possa avaliar", "Abra a fonte e confirme vendedor, variações, preço e imagens. Um link ativo inicia a pesquisa, mas não garante qualidade."),
        section("2. Pesquise ou cole o link original", "Use palavras claras ou cole um link do Taobao, Tmall, 1688, Weidian ou Yupoo e confira o produto reconhecido."),
        section("3. Entenda o primeiro pagamento", "O primeiro pagamento cobre o produto e itens domésticos exibidos. O frete internacional é calculado depois com os dados do pacote."),
        section("4. Use o armazém como ponto de decisão", "Compare item, opções, medidas e fotos. Peça uma imagem específica se faltar evidência e aja cedo em um possível retorno."),
        section("5. Compare o envio com dados completos", "Compare rotas usando destino, tipo, peso e dimensões. Uma estimativa não é um preço final permanente."),
        section("6. Rastreie sem reagir a toda pausa", "Envios internacionais podem ficar entre leituras. Confira o número oficial e o histórico antes de presumir um problema."),
      ],
    },
    "pikobuy-qc-checklist": {
      title: "Fotos QC do PikoBuy: o que verificar antes do envio",
      deck: "Uma revisão estruturada separa evidências visíveis de suposições e prioriza erros importantes.",
      fact: "Fotos QC mostram condições visíveis de alguns ângulos; não comprovam material, conforto ou durabilidade.",
      sections: [
        section("Comece pela identidade, não pelos detalhes mínimos", "Confirme produto, cor, tamanho, quantidade e variação. Um item errado importa mais do que uma linha solta."),
        section("Calçados: estrutura, par e etiquetas", "Compare ambos os calçados em bico, calcanhar, sola, costuras e tamanho. Peça medida se a tabela estiver confusa."),
        section("Roupas: medidas valem mais que letras", "Compare peito, comprimento, ombros e mangas com uma peça adequada; depois confira estampa, bordado e manchas."),
        section("Bolsas e acessórios: ferragens e simetria", "Verifique forma, alças, bordas, fechamento e interior. Em bonés, confira formato, bordado e etiqueta."),
        section("Conheça os limites das fotos", "Imagens não comprovam fibras, odor, impermeabilidade, funcionamento, conforto ou resistência de longo prazo."),
      ],
    },
    "pikobuy-shipping-cost": {
      title: "Custo de envio PikoBuy: peso, tamanho e rotas",
      deck: "O frete internacional é calculado pelo pacote. Reúna os dados certos antes de comparar.",
      fact: "O calculador oficial pede destino, tipo de produto, peso, comprimento, largura e altura.",
      sections: [
        section("Por que o peso não basta", "Um pacote leve mas volumoso pode ser cobrado pelo volume. Use as medidas embaladas do armazém quando disponíveis."),
        section("O tipo de produto muda as rotas", "Baterias, líquidos, cosméticos e categorias sensíveis podem limitar opções. Uma tarifa de roupa não se aplica automaticamente."),
        section("Destino e rota são decisões diferentes", "O destino diz onde; a rota, como. Compare prazo, cálculo, restrições e rastreio, não apenas o preço."),
        section("Estime em três etapas", "Comece com suposições, substitua por medidas do armazém e decida com a cotação ativa do pacote."),
        section("A embalagem deve resolver um risco", "Remover caixa pode reduzir volume; reforçar protege mas adiciona medidas. Escolha conforme o item e recalcule."),
      ],
    },
    "pikobuy-spreadsheet-product-research": {
      title: "Pesquisa PikoBuy Spreadsheet: de um achado a uma seleção melhor",
      deck: "A planilha acelera a descoberta; uma rotina torna a comparação mais clara e segura.",
      date: "29 de julho de 2026",
      sections: [
        section("Um achado é uma pista, não uma recomendação", "Abra a página ativa e confira vendedor, opções, preço, imagens e identificador. A página atual prevalece sobre um cartão antigo."),
        section("Monte uma seleção com motivos", "Anote por que cada candidato permanece. Remova fontes inativas, variações ambíguas e anúncios sem evidência básica."),
        section("Separe evidência visível de suposição", "Imagens do anúncio mostram o design; fotos do armazém, o item recebido. Ambas dependem de ângulos e luz."),
        section("Planeje o QC antes da chegada", "Salve medidas-alvo e detalhes importantes antes da compra, para que fotos extras respondam a uma pergunta específica."),
        section("Mantenha o envio na comparação", "Peso, dimensões, categoria e destino afetam o custo. Marque cedo caixas, roupas pesadas e produtos sensíveis."),
        section("Uma planilha melhor é transparente", "Um bom índice mostra destino, data de revisão e pontos pendentes. Ele ajuda principalmente a descartar opções fracas."),
      ],
    },
    "warehouse-photos-before-shipping": {
      title: "Fotos de armazém antes do envio: uma revisão útil",
      deck: "As fotos são evidências sensíveis ao tempo. Uma ordem fixa evita que um problema grande passe despercebido.",
      date: "27 de julho de 2026",
      sections: [
        section("Abra o pedido original ao lado das fotos", "Confirme vendedor, cor, tamanho, quantidade e variação paga antes de comparar imagens e medidas."),
        section("Vá de vistas gerais aos detalhes", "Confira forma, simetria e danos; depois etiquetas, estampas, bordados, ferragens e medidas."),
        section("Escreva um pedido de foto preciso", "Informe local, ângulo e evidência necessária, como o comprimento da sola junto a uma régua."),
        section("Diferencie dano de apresentação", "Rugas e pequenas deformações podem vir da embalagem. Manchas, cortes, peças ausentes e variação errada exigem atenção."),
        section("Decida enquanto o retorno ainda é possível", "A política publicada descreve condições e cinco dias no armazém para produtos elegíveis. Confira as opções ativas rapidamente."),
        section("Aprove apenas o que as fotos sustentam", "Um conjunto limpo não é teste de laboratório. Aprove quando a evidência visível cumprir seu critério definido."),
      ],
    },
    "estimate-pikobuy-parcel-cost": {
      title: "Como estimar um pacote PikoBuy antes da compra",
      deck: "Uma estimativa útil mostra suposições e separa produto, embalagem e rota.",
      date: "25 de julho de 2026",
      sections: [
        section("Comece pelos campos oficiais", "Reúna destino, tipo, peso, comprimento, largura e altura. Antes do armazém, dados do vendedor são apenas estimativas."),
        section("Separe peso do produto e tamanho embalado", "O peso descreve o item; as medidas de envio incluem caixa, proteção e espaço vazio."),
        section("Modele escolhas de embalagem", "Compare proteção mantida e embalagem dispensável removida, sem comprimir um item vulnerável apenas para reduzir volume."),
        section("Confira se um item controla a rota", "Uma bateria, líquido ou produto restrito pode limitar todo o pacote. Compare envios separados incluindo todos os custos."),
        section("Divida o orçamento em camadas", "Separe produto, frete doméstico, serviços, retorno e envio internacional. Sua margem não é uma tarifa oficial."),
        section("Decida com a cotação ativa", "A estimativa inicial filtra combinações ruins; a decisão final usa medidas reais e rotas atuais."),
      ],
    },
  },
};

export function getLocalizedLongform(
  locale: Locale,
  slug: string,
  fallback: LongformContent,
): LongformContent {
  if (locale === "en") return fallback;
  return localized[locale][slug] ?? fallback;
}
