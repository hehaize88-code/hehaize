import type { Locale, RouteKey } from "./site-content";
import type { CategoryKey } from "./site-products";

export type CategoryEditorial = {
  seoTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  detailTitle: string;
  paragraphs: string[];
  checks: string[];
  relatedTitle: string;
  related: Array<{ label: string; route: RouteKey }>;
};

export const priorityCategoryEditorial: Record<
  Locale,
  Partial<Record<CategoryKey, CategoryEditorial>>
> = {
  en: {
    shoes: {
      seoTitle: "KameyMall Shoes Spreadsheet 2026: 3 Curated Finds",
      metaDescription: "Compare three curated KameyMall shoe finds with CNY prices, exact product pages and practical size, variant and warehouse QC checks.",
      heading: "KameyMall Shoes Spreadsheet: 3 Curated Finds",
      intro: "Compare the New Balance 1906R, HOKA Speedgoat 5 and Adidas Futurecraft 4D entries already listed in this independent KameyMall spreadsheet. Each card keeps its own reference, dated CNY price and exact detail page.",
      detailTitle: "How to compare these KameyMall shoe finds",
      paragraphs: [
        "Begin with the exact option rather than the gallery image. A shoe listing can combine several colors, versions or size systems, and the lowest displayed amount may belong to a different choice. Open the detail page, follow the exact listing, then match the option wording and current CNY amount before submitting an order.",
        "When the pair reaches a warehouse, use the photos to confirm the visible model, color, size label, left-and-right pair, sole and obvious exterior damage. Photos cannot prove fit, hidden construction, comfort or authenticity. Treat an unclear size tag or missing angle as a question to resolve before parcel submission, not as proof that everything is correct.",
      ],
      checks: [
        "Match the selected color, version and quantity with the live listing.",
        "Use the seller’s measurements and visible size system instead of assuming your usual size.",
        "Compare both shoes, the size labels, heel, sole and major visible panels in QC photos.",
        "Recheck the current item price, Chinese domestic delivery and later parcel costs.",
      ],
      relatedTitle: "Continue the shoe-checking workflow",
      related: [
        { label: "Browse all 30 finds", route: "finds" },
        { label: "Read the QC photo guide", route: "articles/how-to-read-kameymall-qc-photos" },
      ],
    },
    sweatshirts: {
      seoTitle: "KameyMall Hoodie & Sweatshirt Finds: 3 Listings",
      metaDescription: "Browse three KameyMall hoodie and sweatshirt finds, compare current listing details and use practical size, variant and QC checks before shipping.",
      heading: "KameyMall Hoodie and Sweatshirt Finds",
      intro: "This focused KameyMall spreadsheet category currently contains three distinct entries: Canada Goose Sweatshirt, Nike Sweater and Off-White Hoodies with 39 listed styles. Use the cards as a shortlist, then verify the exact live option.",
      detailTitle: "Compare the garment, not only the product name",
      paragraphs: [
        "Sweatshirt listings often group hoodies, pullovers, zip styles, colors and different graphics under one page. A broad title such as “39 styles” is a warning to slow down: record the precise option, seller image and size selection instead of assuming every variation shares the same material, cut or price.",
        "Warehouse photos can help confirm visible color, front and back design, size label, quantity and obvious marks. They do not show fabric feel, warmth, shrinkage or exact fit. Compare any measured width or length with the same measurement method used by the seller, and raise a specific question when the visible label or design does not match the submitted option.",
      ],
      checks: [
        "Save the exact style, color and size option before payment.",
        "Compare garment measurements rather than relying only on S, M, L or XL.",
        "Check front, back, cuffs, collar or hood, print placement and visible labels in QC photos.",
        "Keep the item price separate from domestic delivery, packaging and international freight.",
      ],
      relatedTitle: "Continue the clothing-checking workflow",
      related: [
        { label: "Browse all 30 finds", route: "finds" },
        { label: "Read the QC photo guide", route: "articles/how-to-read-kameymall-qc-photos" },
      ],
    },
    jersey: {
      seoTitle: "KameyMall Jersey Spreadsheet 2026: 3 Curated Finds",
      metaDescription: "Compare three KameyMall jersey finds with exact listing pages, CNY reference prices and practical checks for style, size, badges and warehouse QC.",
      heading: "KameyMall Jersey Spreadsheet: 3 Curated Finds",
      intro: "Compare the 2024 Premier League, Germany World Cup and Premier League player-version entries already indexed here. Two listings advertise many styles, so the selected team, player, version and size matter more than the broad card title.",
      detailTitle: "How to verify a multi-style jersey listing",
      paragraphs: [
        "A jersey page can combine clubs, national teams, player names, seasons and fan or player versions. Do not order from the headline alone. Capture the exact option text and image, then confirm whether names, numbers, patches or other customization are included in that option or require a separate selection.",
        "Use warehouse photos to compare the visible team design, color, size label, front and back, name or number placement and any clearly included badges. Lighting and folds can change how colors and alignment look, while photos cannot prove fabric performance or fit. Ask for a useful angle when a decision-critical detail is hidden.",
      ],
      checks: [
        "Record the exact club or national team, season, player and version.",
        "Confirm whether names, numbers and patches are included or optional.",
        "Compare the visible size label and measurements with the selected option.",
        "Inspect front, back, crest, sponsor, numbering and obvious marks before shipping.",
      ],
      relatedTitle: "Continue the jersey-checking workflow",
      related: [
        { label: "Browse all 30 finds", route: "finds" },
        { label: "Read the QC photo guide", route: "articles/how-to-read-kameymall-qc-photos" },
      ],
    },
  },
  de: {
    shoes: {
      seoTitle: "KameyMall-Schuhtabelle 2026: 3 kuratierte Funde",
      metaDescription: "Vergleiche drei KameyMall-Schuhfunde mit CNY-Preisen, exakten Produktseiten sowie Prüfungen für Größe, Variante und Lager-QC.",
      heading: "KameyMall-Schuhtabelle: 3 kuratierte Funde",
      intro: "Vergleiche die Einträge New Balance 1906R, HOKA Speedgoat 5 und Adidas Futurecraft 4D in dieser unabhängigen KameyMall-Tabelle. Jede Karte behält Referenz, datierten CNY-Preis und eigene Detailseite.",
      detailTitle: "So vergleichst du diese KameyMall-Schuhe",
      paragraphs: [
        "Beginne mit der exakten Option statt mit dem Galeriebild. Ein Angebot kann mehrere Farben, Versionen oder Größensysteme bündeln; der niedrigste Betrag kann zu einer anderen Auswahl gehören. Öffne die Detailseite und gleiche Optionsname sowie aktuellen CNY-Betrag vor der Bestellung ab.",
        "Im Lager helfen Fotos bei Modell, Farbe, Größenetikett, linkem und rechtem Schuh, Sohle und sichtbaren Schäden. Sie beweisen weder Passform noch verborgene Verarbeitung, Komfort oder Echtheit. Ein unklares Etikett oder fehlender Winkel ist eine offene Frage, keine Bestätigung.",
      ],
      checks: ["Farbe, Version und Menge mit dem Live-Angebot abgleichen.", "Verkäufermaße und sichtbares Größensystem verwenden.", "Beide Schuhe, Etiketten, Ferse, Sohle und sichtbare Flächen im QC prüfen.", "Artikelpreis, Inlandsversand und spätere Paketkosten erneut prüfen."],
      relatedTitle: "Schuhprüfung fortsetzen",
      related: [{ label: "Alle 30 Funde ansehen", route: "finds" }, { label: "QC-Fotoratgeber lesen", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    sweatshirts: {
      seoTitle: "KameyMall Hoodies & Sweatshirts: 3 Angebote",
      metaDescription: "Drei KameyMall-Hoodie- und Sweatshirt-Funde mit praktischen Prüfungen für Größe, Variante und QC vor dem Versand.",
      heading: "KameyMall-Hoodie- und Sweatshirt-Funde",
      intro: "Diese Kategorie enthält drei unterschiedliche Einträge: Canada Goose Sweatshirt, Nike Sweater und Off-White Hoodies mit 39 angegebenen Styles. Nutze sie als Vorauswahl und prüfe danach die genaue Live-Option.",
      detailTitle: "Vergleiche das Kleidungsstück, nicht nur den Namen",
      paragraphs: [
        "Sweatshirt-Angebote bündeln häufig Hoodies, Pullover, Reißverschlussmodelle, Farben und Grafiken. Ein Titel wie „39 Styles“ bedeutet: exakte Option, Verkäuferbild und Größe festhalten; Material, Schnitt und Preis sind nicht automatisch bei jeder Variante gleich.",
        "Lagerfotos können Farbe, Vorder- und Rückseite, Größenetikett, Menge und sichtbare Flecken bestätigen. Stoffgefühl, Wärme, Einlaufen und genaue Passform bleiben offen. Vergleiche Maße mit derselben Messmethode und melde konkret, wenn Etikett oder Design abweichen.",
      ],
      checks: ["Exakten Style, Farbe und Größe vor Zahlung speichern.", "Kleidungsmaße statt nur S, M, L oder XL vergleichen.", "Vorderseite, Rückseite, Bündchen, Kragen oder Kapuze und sichtbare Etiketten prüfen.", "Artikelpreis von Inlandsversand, Verpackung und internationaler Fracht trennen."],
      relatedTitle: "Kleidungsprüfung fortsetzen",
      related: [{ label: "Alle 30 Funde ansehen", route: "finds" }, { label: "QC-Fotoratgeber lesen", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    jersey: {
      seoTitle: "KameyMall-Trikottabelle 2026: 3 kuratierte Funde",
      metaDescription: "Drei KameyMall-Trikotfunde mit exakten Seiten, CNY-Referenzpreisen und Prüfungen für Style, Größe, Abzeichen und QC.",
      heading: "KameyMall-Trikottabelle: 3 kuratierte Funde",
      intro: "Vergleiche die Einträge 2024 Premier League, Germany World Cup und Premier League Player-Version. Zwei Angebote nennen viele Styles; Team, Spieler, Version und Größe sind deshalb wichtiger als der breite Kartentitel.",
      detailTitle: "Ein Multi-Style-Trikot richtig prüfen",
      paragraphs: [
        "Ein Trikotangebot kann Vereine, Nationalteams, Spielernamen, Saisons sowie Fan- und Spielerversionen bündeln. Bestelle nicht nur nach Überschrift. Sichere Optionsname und Bild und prüfe, ob Namen, Nummern und Patches enthalten oder separat zu wählen sind.",
        "Vergleiche auf Lagerfotos Teamdesign, Farbe, Größenetikett, Vorder- und Rückseite, Name, Nummer und sichtbare Abzeichen. Licht und Falten verändern den Eindruck; Materialleistung und Passform bleiben unbelegt. Frage nach, wenn ein entscheidendes Detail verdeckt ist.",
      ],
      checks: ["Verein oder Nationalteam, Saison, Spieler und Version notieren.", "Prüfen, ob Namen, Nummern und Patches enthalten sind.", "Größenetikett und Maße mit der Option vergleichen.", "Vorderseite, Rückseite, Wappen, Sponsor, Nummerierung und sichtbare Flecken prüfen."],
      relatedTitle: "Trikotprüfung fortsetzen",
      related: [{ label: "Alle 30 Funde ansehen", route: "finds" }, { label: "QC-Fotoratgeber lesen", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
  },
  fr: {
    shoes: {
      seoTitle: "Tableur chaussures KameyMall 2026 : 3 sélections",
      metaDescription: "Comparez trois chaussures KameyMall avec prix CNY, fiches exactes et contrôles pratiques de taille, variante et QC en entrepôt.",
      heading: "Tableur chaussures KameyMall : 3 sélections",
      intro: "Comparez les fiches New Balance 1906R, HOKA Speedgoat 5 et Adidas Futurecraft 4D de ce tableur KameyMall indépendant. Chaque carte conserve sa référence, son prix CNY daté et sa page détaillée.",
      detailTitle: "Comment comparer ces chaussures KameyMall",
      paragraphs: ["Commencez par l’option exacte, pas par la photo de galerie. Une fiche peut réunir plusieurs couleurs, versions ou systèmes de tailles, et le montant le plus bas peut viser un autre choix. Ouvrez la page détaillée et vérifiez option et CNY actuels.", "À l’entrepôt, contrôlez modèle visible, couleur, étiquette de taille, paire gauche-droite, semelle et dommages extérieurs. Les photos ne prouvent ni coupe, ni construction cachée, ni confort, ni authenticité. Une étiquette illisible reste une question."],
      checks: ["Faire correspondre couleur, version et quantité avec la fiche active.", "Utiliser les mesures du vendeur et le système de taille visible.", "Comparer les deux chaussures, étiquettes, talon, semelle et panneaux visibles.", "Revérifier article, livraison chinoise et coûts ultérieurs du colis."],
      relatedTitle: "Poursuivre le contrôle des chaussures",
      related: [{ label: "Voir les 30 trouvailles", route: "finds" }, { label: "Lire le guide des photos QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    sweatshirts: {
      seoTitle: "Sweats et hoodies KameyMall : 3 trouvailles",
      metaDescription: "Parcourez trois sweats KameyMall et vérifiez taille, variante, détails de la fiche et QC visible avant l’expédition.",
      heading: "Trouvailles hoodies et sweats KameyMall",
      intro: "Cette catégorie contient Canada Goose Sweatshirt, Nike Sweater et Off-White Hoodies avec 39 styles annoncés. Utilisez ces fiches comme présélection puis confirmez l’option active exacte.",
      detailTitle: "Comparer le vêtement, pas seulement son nom",
      paragraphs: ["Une fiche peut réunir hoodies, pulls, zips, couleurs et graphismes. Un titre comme « 39 styles » impose d’enregistrer l’option, l’image vendeur et la taille exactes ; matière, coupe et prix ne sont pas forcément identiques.", "Les photos d’entrepôt aident à vérifier couleur, devant, dos, étiquette, quantité et marques visibles. Elles ne montrent pas toucher, chaleur, rétrécissement ou coupe réelle. Comparez les mesures avec la même méthode et signalez précisément tout écart."],
      checks: ["Enregistrer style, couleur et taille exacts avant paiement.", "Comparer les mesures plutôt que seulement S, M, L ou XL.", "Contrôler devant, dos, poignets, col ou capuche, impression et étiquettes.", "Séparer prix article, livraison chinoise, emballage et fret international."],
      relatedTitle: "Poursuivre le contrôle des vêtements",
      related: [{ label: "Voir les 30 trouvailles", route: "finds" }, { label: "Lire le guide des photos QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    jersey: {
      seoTitle: "Tableur maillots KameyMall 2026 : 3 sélections",
      metaDescription: "Comparez trois maillots KameyMall avec fiches exactes, prix CNY et contrôles du style, de la taille, des badges et du QC.",
      heading: "Tableur maillots KameyMall : 3 sélections",
      intro: "Comparez les entrées 2024 Premier League, Germany World Cup et Premier League player-version. Deux fiches annoncent de nombreux styles : équipe, joueur, version et taille priment sur le titre général.",
      detailTitle: "Vérifier une fiche de maillots multi-styles",
      paragraphs: ["Une page peut regrouper clubs, sélections, joueurs, saisons et versions supporter ou joueur. Conservez le texte et l’image de l’option exacte, puis vérifiez si noms, numéros et écussons sont inclus ou séparés.", "Sur les photos d’entrepôt, comparez équipe, couleur, taille, devant, dos, nom, numéro et badges visibles. Lumière et plis modifient l’apparence ; performance du tissu et coupe ne sont pas prouvées. Demandez un angle utile si un détail est caché."],
      checks: ["Noter club ou sélection, saison, joueur et version.", "Confirmer si noms, numéros et badges sont inclus.", "Comparer étiquette et mesures avec l’option choisie.", "Inspecter devant, dos, écusson, sponsor, numérotation et marques visibles."],
      relatedTitle: "Poursuivre le contrôle des maillots",
      related: [{ label: "Voir les 30 trouvailles", route: "finds" }, { label: "Lire le guide des photos QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
  },
  es: {
    shoes: {
      seoTitle: "Hoja de calzado KameyMall 2026: 3 hallazgos",
      metaDescription: "Compara tres hallazgos de calzado KameyMall con precios CNY, fichas exactas y controles de talla, variante y QC de almacén.",
      heading: "Hoja de calzado KameyMall: 3 hallazgos",
      intro: "Compara New Balance 1906R, HOKA Speedgoat 5 y Adidas Futurecraft 4D en esta hoja KameyMall independiente. Cada tarjeta conserva referencia, precio CNY fechado y página propia.",
      detailTitle: "Cómo comparar este calzado KameyMall",
      paragraphs: ["Empieza por la opción exacta, no por la imagen de galería. Un listado puede reunir colores, versiones o sistemas de talla, y el importe menor puede corresponder a otra elección. Abre el detalle y confirma opción y CNY actuales.", "En almacén, comprueba modelo visible, color, etiqueta, par izquierdo y derecho, suela y daños externos. Las fotos no prueban ajuste, construcción oculta, comodidad ni autenticidad. Una etiqueta borrosa sigue siendo una pregunta."],
      checks: ["Hacer coincidir color, versión y cantidad con el listado en vivo.", "Usar medidas del vendedor y el sistema de talla visible.", "Comparar ambos zapatos, etiquetas, talón, suela y paneles visibles.", "Revisar precio, entrega china y costes posteriores del paquete."],
      relatedTitle: "Continúa la revisión del calzado",
      related: [{ label: "Ver los 30 hallazgos", route: "finds" }, { label: "Leer la guía de fotos QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    sweatshirts: {
      seoTitle: "Sudaderas y hoodies KameyMall: 3 hallazgos",
      metaDescription: "Explora tres sudaderas KameyMall y comprueba talla, variante, detalles del listado y QC visible antes del envío.",
      heading: "Hallazgos de hoodies y sudaderas KameyMall",
      intro: "Esta categoría contiene Canada Goose Sweatshirt, Nike Sweater y Off-White Hoodies con 39 estilos indicados. Úsalos como lista inicial y confirma después la opción exacta.",
      detailTitle: "Compara la prenda, no solo el nombre",
      paragraphs: ["Los listados pueden agrupar hoodies, jerséis, cremalleras, colores y gráficos. Un título como «39 estilos» exige guardar opción, imagen y talla exactas; material, corte y precio no tienen por qué ser iguales.", "Las fotos de almacén ayudan con color, frontal, espalda, etiqueta, cantidad y marcas visibles. No muestran tacto, abrigo, encogimiento ni ajuste real. Compara medidas con el mismo método y señala de forma concreta cualquier diferencia."],
      checks: ["Guardar estilo, color y talla exactos antes de pagar.", "Comparar medidas en vez de confiar solo en S, M, L o XL.", "Revisar frontal, espalda, puños, cuello o capucha, gráfico y etiquetas.", "Separar precio, entrega china, embalaje y transporte internacional."],
      relatedTitle: "Continúa la revisión de la ropa",
      related: [{ label: "Ver los 30 hallazgos", route: "finds" }, { label: "Leer la guía de fotos QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    jersey: {
      seoTitle: "Hoja de camisetas KameyMall 2026: 3 hallazgos",
      metaDescription: "Compara tres camisetas deportivas KameyMall con fichas exactas, CNY y controles de estilo, talla, parches y QC.",
      heading: "Hoja de camisetas deportivas KameyMall: 3 hallazgos",
      intro: "Compara 2024 Premier League, Germany World Cup y Premier League player-version. Dos listados anuncian muchos estilos: equipo, jugador, versión y talla importan más que el título general.",
      detailTitle: "Cómo verificar un listado con muchos estilos",
      paragraphs: ["Una página puede reunir clubes, selecciones, jugadores, temporadas y versiones aficionado o jugador. Guarda el texto e imagen de la opción exacta y confirma si nombres, números y parches están incluidos o son opciones separadas.", "En el QC, compara diseño, color, talla, frontal, espalda, nombre, número y distintivos visibles. La luz y los pliegues cambian el aspecto; el tejido y el ajuste no quedan probados. Pide un ángulo útil si falta un detalle decisivo."],
      checks: ["Anotar club o selección, temporada, jugador y versión.", "Confirmar si nombres, números y parches están incluidos.", "Comparar etiqueta y medidas con la opción elegida.", "Inspeccionar frontal, espalda, escudo, patrocinador, numeración y marcas."],
      relatedTitle: "Continúa la revisión de camisetas",
      related: [{ label: "Ver los 30 hallazgos", route: "finds" }, { label: "Leer la guía de fotos QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
  },
  it: {
    shoes: {
      seoTitle: "Foglio scarpe KameyMall 2026: 3 prodotti selezionati",
      metaDescription: "Confronta tre scarpe KameyMall con prezzi CNY, pagine esatte e controlli pratici di taglia, variante e QC in magazzino.",
      heading: "Foglio scarpe KameyMall: 3 prodotti selezionati",
      intro: "Confronta New Balance 1906R, HOKA Speedgoat 5 e Adidas Futurecraft 4D in questo foglio KameyMall indipendente. Ogni scheda conserva riferimento, prezzo CNY datato e pagina dettagliata.",
      detailTitle: "Come confrontare queste scarpe KameyMall",
      paragraphs: ["Parti dall’opzione esatta, non dalla galleria. Un’inserzione può unire colori, versioni o sistemi di taglia e il prezzo più basso può riferirsi a un’altra scelta. Apri i dettagli e conferma opzione e CNY attuali.", "In magazzino controlla modello visibile, colore, etichetta, scarpa destra e sinistra, suola e danni esterni. Le foto non provano calzata, costruzione nascosta, comfort o autenticità. Un’etichetta illeggibile resta una domanda."],
      checks: ["Abbina colore, versione e quantità all’inserzione live.", "Usa misure del venditore e sistema taglie visibile.", "Confronta entrambe le scarpe, etichette, tallone, suola e pannelli.", "Ricontrolla prezzo, consegna cinese e costi successivi del pacco."],
      relatedTitle: "Continua il controllo delle scarpe",
      related: [{ label: "Vedi tutti i 30 prodotti", route: "finds" }, { label: "Leggi la guida alle foto QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    sweatshirts: {
      seoTitle: "Felpe e hoodie KameyMall: 3 prodotti",
      metaDescription: "Sfoglia tre felpe KameyMall e controlla taglia, variante, dettagli dell’inserzione e QC visibile prima della spedizione.",
      heading: "Prodotti hoodie e felpe KameyMall",
      intro: "La categoria contiene Canada Goose Sweatshirt, Nike Sweater e Off-White Hoodies con 39 stili indicati. Usali come shortlist e verifica poi l’opzione live esatta.",
      detailTitle: "Confronta il capo, non solo il nome",
      paragraphs: ["Le inserzioni possono unire hoodie, pullover, zip, colori e grafiche. Un titolo come “39 stili” richiede di salvare opzione, immagine e taglia esatte; materiale, taglio e prezzo possono cambiare.", "Le foto di magazzino aiutano con colore, fronte, retro, etichetta, quantità e segni visibili. Non mostrano tatto, calore, restringimento o vestibilità. Confronta misure con lo stesso metodo e segnala ogni differenza precisa."],
      checks: ["Salva stile, colore e taglia esatti prima del pagamento.", "Confronta le misure invece di affidarti solo a S, M, L o XL.", "Controlla fronte, retro, polsini, collo o cappuccio, grafica ed etichette.", "Separa prezzo, consegna cinese, imballaggio e trasporto internazionale."],
      relatedTitle: "Continua il controllo dell’abbigliamento",
      related: [{ label: "Vedi tutti i 30 prodotti", route: "finds" }, { label: "Leggi la guida alle foto QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    jersey: {
      seoTitle: "Foglio maglie KameyMall 2026: 3 prodotti selezionati",
      metaDescription: "Confronta tre maglie KameyMall con pagine esatte, prezzi CNY e controlli di stile, taglia, patch e QC.",
      heading: "Foglio maglie sportive KameyMall: 3 prodotti",
      intro: "Confronta 2024 Premier League, Germany World Cup e Premier League player-version. Due inserzioni riportano molti stili: squadra, giocatore, versione e taglia contano più del titolo generale.",
      detailTitle: "Come verificare un’inserzione multi-stile",
      paragraphs: ["Una pagina può unire club, nazionali, giocatori, stagioni e versioni tifoso o player. Salva testo e immagine dell’opzione esatta e verifica se nomi, numeri e patch sono inclusi o separati.", "Nelle foto QC confronta squadra, colore, taglia, fronte, retro, nome, numero e distintivi visibili. Luce e pieghe cambiano l’aspetto; tessuto e vestibilità non sono provati. Chiedi un’angolazione utile se manca un dettaglio decisivo."],
      checks: ["Registra club o nazionale, stagione, giocatore e versione.", "Conferma se nomi, numeri e patch sono inclusi.", "Confronta etichetta e misure con l’opzione scelta.", "Controlla fronte, retro, stemma, sponsor, numerazione e segni visibili."],
      relatedTitle: "Continua il controllo delle maglie",
      related: [{ label: "Vedi tutti i 30 prodotti", route: "finds" }, { label: "Leggi la guida alle foto QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
  },
  pl: {
    shoes: {
      seoTitle: "Arkusz butów KameyMall 2026: 3 wybrane produkty",
      metaDescription: "Porównaj trzy buty KameyMall z cenami CNY, dokładnymi stronami oraz kontrolą rozmiaru, wariantu i QC w magazynie.",
      heading: "Arkusz butów KameyMall: 3 wybrane produkty",
      intro: "Porównaj New Balance 1906R, HOKA Speedgoat 5 i Adidas Futurecraft 4D w tym niezależnym arkuszu KameyMall. Każda karta zachowuje numer, datowaną cenę CNY i stronę szczegółów.",
      detailTitle: "Jak porównać te buty KameyMall",
      paragraphs: ["Zacznij od dokładnego wariantu, nie od galerii. Oferta może łączyć kolory, wersje lub systemy rozmiarów, a najniższa kwota może dotyczyć innego wyboru. Otwórz szczegóły i potwierdź opcję oraz aktualne CNY.", "W magazynie sprawdź model, kolor, etykietę, lewy i prawy but, podeszwę oraz widoczne uszkodzenia. Zdjęcia nie potwierdzają dopasowania, ukrytej budowy, wygody ani autentyczności. Nieczytelna etykieta pozostaje pytaniem."],
      checks: ["Dopasuj kolor, wersję i ilość do aktywnej oferty.", "Użyj wymiarów sprzedawcy i widocznego systemu rozmiarów.", "Porównaj oba buty, etykiety, piętę, podeszwę i widoczne panele.", "Sprawdź ponownie cenę, dostawę w Chinach i późniejsze koszty paczki."],
      relatedTitle: "Kontynuuj kontrolę butów",
      related: [{ label: "Zobacz 30 produktów", route: "finds" }, { label: "Przeczytaj poradnik zdjęć QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    sweatshirts: {
      seoTitle: "Bluzy i hoodie KameyMall: 3 produkty",
      metaDescription: "Przeglądaj trzy bluzy KameyMall i sprawdź rozmiar, wariant, szczegóły oferty oraz widoczne QC przed wysyłką.",
      heading: "Wybrane hoodie i bluzy KameyMall",
      intro: "Kategoria obejmuje Canada Goose Sweatshirt, Nike Sweater i Off-White Hoodies z 39 podanymi stylami. Traktuj je jako shortlistę i potwierdź dokładny wariant na żywo.",
      detailTitle: "Porównuj ubranie, nie tylko nazwę",
      paragraphs: ["Oferta może łączyć hoodie, pulowery, zamki, kolory i grafiki. Tytuł „39 stylów” oznacza, że trzeba zapisać dokładną opcję, zdjęcie i rozmiar; materiał, krój i cena mogą się różnić.", "Zdjęcia magazynowe pomagają sprawdzić kolor, przód, tył, metkę, ilość i widoczne ślady. Nie pokazują dotyku, ciepła, kurczenia ani dopasowania. Porównaj wymiary tą samą metodą i opisz dokładnie różnicę."],
      checks: ["Zapisz dokładny styl, kolor i rozmiar przed płatnością.", "Porównaj wymiary zamiast polegać tylko na S, M, L lub XL.", "Sprawdź przód, tył, mankiety, kołnierz lub kaptur, grafikę i metki.", "Oddziel cenę od dostawy krajowej, pakowania i frachtu międzynarodowego."],
      relatedTitle: "Kontynuuj kontrolę odzieży",
      related: [{ label: "Zobacz 30 produktów", route: "finds" }, { label: "Przeczytaj poradnik zdjęć QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
    jersey: {
      seoTitle: "Arkusz koszulek KameyMall 2026: 3 produkty",
      metaDescription: "Porównaj trzy koszulki sportowe KameyMall z dokładnymi stronami, cenami CNY i kontrolą stylu, rozmiaru, naszywek i QC.",
      heading: "Arkusz koszulek sportowych KameyMall: 3 produkty",
      intro: "Porównaj 2024 Premier League, Germany World Cup i Premier League player-version. Dwie oferty mają wiele stylów, więc drużyna, zawodnik, wersja i rozmiar są ważniejsze niż ogólny tytuł.",
      detailTitle: "Jak sprawdzić ofertę z wieloma stylami",
      paragraphs: ["Jedna strona może łączyć kluby, reprezentacje, graczy, sezony oraz wersje kibicowskie i zawodnicze. Zapisz tekst i zdjęcie dokładnej opcji oraz sprawdź, czy nazwiska, numery i naszywki są w zestawie.", "Na zdjęciach QC porównaj drużynę, kolor, rozmiar, przód, tył, nazwisko, numer i widoczne oznaczenia. Światło i zagięcia zmieniają wygląd; materiał i dopasowanie nie są potwierdzone. Poproś o ujęcie brakującego detalu."],
      checks: ["Zapisz klub lub reprezentację, sezon, zawodnika i wersję.", "Potwierdź, czy nazwiska, numery i naszywki są wliczone.", "Porównaj metkę i wymiary z wybraną opcją.", "Sprawdź przód, tył, herb, sponsora, numerację i widoczne ślady."],
      relatedTitle: "Kontynuuj kontrolę koszulek",
      related: [{ label: "Zobacz 30 produktów", route: "finds" }, { label: "Przeczytaj poradnik zdjęć QC", route: "articles/how-to-read-kameymall-qc-photos" }],
    },
  },
};
