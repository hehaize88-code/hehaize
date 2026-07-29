import {
  articles,
  categories,
  faqItems,
  guides,
  products,
  workflow,
} from "./data";
import type { Locale } from "./i18n";

type LocalizedSiteData = {
  categories: { name: string; countLabel: string }[];
  productCategories: string[];
  productReviews: string[];
  workflow: { title: string; text: string }[];
  guides: { eyebrow: string; title: string; description: string; read: string }[];
  articles: { date: string; title: string; description: string; tag: string }[];
  faq: { question: string; answer: string }[];
};

const localized: Record<Exclude<Locale, "en">, LocalizedSiteData> = {
  de: {
    categories: [
      { name: "Schuhe", countLabel: "Sneaker · Slides · Laufschuhe" },
      { name: "Hoodies", countLabel: "Hoodies · Strick · Sweatshirts" },
      { name: "T-Shirts", countLabel: "Shirts · Polos · Langarmshirts" },
      { name: "Jacken", countLabel: "Mäntel · Daunenjacken · Windbreaker" },
      { name: "Kopfbedeckungen", countLabel: "Caps · Mützen · Hüte" },
      { name: "Accessoires", countLabel: "Taschen · Schmuck · Kleinteile" },
    ],
    productCategories: ["Schuhe", "Hoodies", "Jacken", "Kopfbedeckungen", "Jacken", "T-Shirts"],
    productReviews: [
      "Profil, Fersenform und Größenetikett prüfen",
      "Druckposition und Maße vergleichen",
      "Stoff, Nähte und Vorderseite prüfen",
      "Stickerei und Innenetikett prüfen",
      "Musterübergänge und Beschläge vergleichen",
      "Brustweite und Logoposition bestätigen",
    ],
    workflow: [
      { title: "Produkt auswählen", text: "Mit einem Angebot auf einem chinesischen Marktplatz beginnen und Stil, Farbe sowie Größe prüfen." },
      { title: "Suchen oder einfügen", text: "Suchbegriffe verwenden oder einen Link von Taobao, Tmall, 1688, Weidian oder Yupoo einfügen." },
      { title: "Bestellen und bezahlen", text: "Optionen auswählen, Bestellung absenden und die erste Zahlung abschließen." },
      { title: "Im Lager prüfen", text: "Das Lager erfasst den Artikel, fotografiert ihn und sucht nach sichtbaren Mängeln." },
      { title: "Versand auswählen", text: "Paket einreichen, verfügbare Routen vergleichen und den internationalen Versand bezahlen." },
      { title: "Paket verfolgen", text: "Auf den Versand warten und die Logistikmeldungen bis zur Zustellung verfolgen." },
    ],
    guides: [
      { eyebrow: "Einsteiger-Ratgeber", title: "PikoBuy nutzen: Der Bestellablauf in sechs Schritten", description: "Praktischer Ablauf von der Produktsuche über die Lagerprüfung bis zum internationalen Versand.", read: "8 Min." },
      { eyebrow: "QC-Praxisguide", title: "PikoBuy-QC-Fotos: Was vor dem Versand zu prüfen ist", description: "Checkliste nach Produktkategorie für Maße, Etiketten, Ausrichtung und sichtbare Schäden.", read: "10 Min." },
      { eyebrow: "Versand-Ratgeber", title: "PikoBuy-Versandkosten: Gewicht, Größe und Routen", description: "Die Eingaben des offiziellen Rechners verstehen, bevor internationale Routen verglichen werden.", read: "9 Min." },
    ],
    articles: [
      { date: "29. Juli 2026", title: "PikoBuy-Spreadsheet-Recherche: Vom Fund zur besseren Auswahl", description: "Eine wiederholbare Methode, um Angebote zu prüfen, ohne einen Produktlink als Qualitätsgarantie zu behandeln.", tag: "Recherche" },
      { date: "27. Juli 2026", title: "Lagerfotos vor dem Versand: Eine ruhige, nützliche Prüfroutine", description: "Wie aus wenigen Fotos klare Entscheidungen zu Größe, Zustand und Rückgabefrist werden.", tag: "QC" },
      { date: "25. Juli 2026", title: "Ein PikoBuy-Paket vor der Bestellung realistisch schätzen", description: "Warum Gewicht, Maße, Produkttyp und Routenregeln wichtiger sind als ein einzelner Werbepreis.", tag: "Versand" },
    ],
    faq: [
      { question: "Ist dies die offizielle PikoBuy-Website?", answer: "Nein. Dies ist eine unabhängige Website für Produktrecherche und Einkaufsratgeber. Sie gehört nicht PikoBuy, wird nicht von PikoBuy betrieben und ist nicht offiziell verbunden." },
      { question: "Was ist ein PikoBuy Spreadsheet?", answer: "Es ist eine nach Kategorien geordnete Sammlung von Produktfunden. Ein Eintrag ist der Startpunkt für Recherche und kein Beweis für Qualität, Verfügbarkeit oder Verkäuferleistung." },
      { question: "Was geschieht nach der Ankunft im Lager?", answer: "Laut offiziellem Einsteiger-Ratgeber erfasst das Lager den Artikel, fotografiert ihn und prüft sichtbare Mängel. Die Bilder sollten vor dem internationalen Versand geprüft werden." },
      { question: "Wie wird der internationale Versand geschätzt?", answer: "Der PikoBuy-Rechner fragt Zielland oder Region, Produkttyp, Gewicht, Länge, Breite und Höhe ab. Routen und Endpreis müssen bei der Paketeinreichung geprüft werden." },
      { question: "Kann jeder Artikel zurückgegeben werden?", answer: "Nein. Berechtigung hängt von Verkäuferregeln, Zustand, Kategorie und Frist ab. Die veröffentlichte Richtlinie nennt für geeignete Produkte ein fünftägiges Antragsfenster im Lager." },
      { question: "Garantiert ein QC-Foto die Produktqualität?", answer: "Nein. Fotos helfen bei sichtbaren Problemen, beweisen aber weder Materialzusammensetzung noch Haltbarkeit oder genaue Passform." },
    ],
  },
  fr: {
    categories: [
      { name: "Chaussures", countLabel: "Baskets · claquettes · running" },
      { name: "Sweats", countLabel: "Sweats · mailles · sweat-shirts" },
      { name: "T-shirts", countLabel: "T-shirts · polos · manches longues" },
      { name: "Vestes", countLabel: "Manteaux · doudounes · coupe-vent" },
      { name: "Couvre-chefs", countLabel: "Casquettes · bonnets · chapeaux" },
      { name: "Accessoires", countLabel: "Sacs · bijoux · petits articles" },
    ],
    productCategories: ["Chaussures", "Sweats", "Vestes", "Couvre-chefs", "Vestes", "T-shirts"],
    productReviews: [
      "Vérifier la semelle, le talon et l’étiquette de taille",
      "Comparer le placement de l’imprimé et les mesures",
      "Vérifier le tissu, les coutures et l’alignement",
      "Vérifier la broderie et l’étiquette intérieure",
      "Comparer les raccords du motif et les finitions",
      "Confirmer la largeur de poitrine et la position du logo",
    ],
    workflow: [
      { title: "Choisir un produit", text: "Partir d’une annonce chinoise et confirmer le modèle, la couleur et la taille." },
      { title: "Rechercher ou coller", text: "Utiliser des mots-clés ou coller un lien Taobao, Tmall, 1688, Weidian ou Yupoo." },
      { title: "Commander et payer", text: "Choisir les options, envoyer la commande et effectuer le premier paiement." },
      { title: "Contrôler à l’entrepôt", text: "L’entrepôt enregistre l’article, le photographie et recherche les défauts visibles." },
      { title: "Choisir l’expédition", text: "Soumettre le colis, comparer les lignes disponibles et payer l’envoi international." },
      { title: "Suivre le colis", text: "Attendre l’expédition et suivre les mises à jour logistiques jusqu’à la livraison." },
    ],
    guides: [
      { eyebrow: "Guide débutant", title: "Comment utiliser PikoBuy : les six étapes d’une commande", description: "Parcours pratique de la recherche d’une annonce au contrôle en entrepôt et à l’envoi international.", read: "8 min" },
      { eyebrow: "Guide QC", title: "Photos QC PikoBuy : que vérifier avant l’expédition", description: "Checklist par catégorie pour les mesures, étiquettes, alignements et défauts visibles.", read: "10 min" },
      { eyebrow: "Guide expédition", title: "Frais d’expédition PikoBuy : poids, volume et lignes", description: "Comprendre les champs de l’estimateur officiel avant de comparer les lignes internationales.", read: "9 min" },
    ],
    articles: [
      { date: "29 juillet 2026", title: "Recherche PikoBuy Spreadsheet : d’une trouvaille à une meilleure sélection", description: "Une méthode reproductible pour filtrer les annonces sans prendre un lien produit pour une garantie.", tag: "Recherche" },
      { date: "27 juillet 2026", title: "Photos d’entrepôt avant expédition : une méthode de contrôle utile", description: "Transformer quelques photos en décisions claires sur la taille, l’état et le délai de retour.", tag: "QC" },
      { date: "25 juillet 2026", title: "Estimer un colis PikoBuy avant de s’engager", description: "Pourquoi poids, dimensions, type de produit et règles de ligne comptent plus qu’un tarif isolé.", tag: "Expédition" },
    ],
    faq: [
      { question: "S’agit-il du site officiel PikoBuy ?", answer: "Non. Il s’agit d’un site indépendant de recherche produit et de guides d’achat. Il n’est ni détenu, ni exploité, ni officiellement affilié à PikoBuy." },
      { question: "Qu’est-ce qu’un PikoBuy Spreadsheet ?", answer: "C’est une collection de produits organisée par catégorie. Une fiche lance la recherche mais ne prouve ni la qualité, ni le stock, ni les performances du vendeur." },
      { question: "Que se passe-t-il à l’arrivée en entrepôt ?", answer: "Selon le guide officiel, l’entrepôt enregistre l’article, le photographie et cherche des défauts visibles. Examinez les images avant de créer le colis international." },
      { question: "Comment estimer l’expédition internationale ?", answer: "L’estimateur PikoBuy demande le pays ou la région, le type de produit, le poids, la longueur, la largeur et la hauteur. Vérifiez les lignes et le prix final lors de la soumission du colis." },
      { question: "Tous les articles peuvent-ils être retournés ?", answer: "Non. L’éligibilité dépend du vendeur, de l’état, de la catégorie et du délai. La politique publiée indique cinq jours en entrepôt pour demander le retour d’un produit éligible." },
      { question: "Une photo QC garantit-elle la qualité ?", answer: "Non. Elle aide à repérer des défauts visibles, mais ne prouve pas la composition, la durabilité ou la coupe exacte." },
    ],
  },
  es: {
    categories: [
      { name: "Calzado", countLabel: "Zapatillas · chanclas · running" },
      { name: "Sudaderas", countLabel: "Sudaderas · punto · jerséis" },
      { name: "Camisetas", countLabel: "Camisetas · polos · manga larga" },
      { name: "Chaquetas", countLabel: "Abrigos · plumas · cortavientos" },
      { name: "Gorras y sombreros", countLabel: "Gorras · gorros · sombreros" },
      { name: "Accesorios", countLabel: "Bolsos · joyería · artículos pequeños" },
    ],
    productCategories: ["Calzado", "Sudaderas", "Chaquetas", "Gorras y sombreros", "Chaquetas", "Camisetas"],
    productReviews: [
      "Revisa suela, forma del talón y etiqueta de talla",
      "Compara posición del estampado y medidas",
      "Revisa tejido, costuras y alineación frontal",
      "Revisa bordado y etiqueta interior",
      "Compara uniones del patrón y herrajes",
      "Confirma ancho del pecho y posición del logo",
    ],
    workflow: [
      { title: "Elige un producto", text: "Empieza en un anuncio chino y confirma modelo, color y talla." },
      { title: "Busca o pega el enlace", text: "Usa palabras clave o pega un enlace de Taobao, Tmall, 1688, Weidian o Yupoo." },
      { title: "Envía y paga", text: "Selecciona las opciones, envía el pedido y completa el primer pago." },
      { title: "Revisa en el almacén", text: "El almacén registra el artículo, lo fotografía y busca defectos visibles." },
      { title: "Elige el envío", text: "Envía el paquete, compara rutas disponibles y paga el transporte internacional." },
      { title: "Sigue el paquete", text: "Espera el despacho y sigue las actualizaciones logísticas hasta la entrega." },
    ],
    guides: [
      { eyebrow: "Guía para principiantes", title: "Cómo usar PikoBuy: el pedido en seis pasos", description: "Recorrido práctico desde la búsqueda hasta la revisión en almacén y el envío internacional.", read: "8 min" },
      { eyebrow: "Guía de QC", title: "Fotos QC de PikoBuy: qué revisar antes del envío", description: "Lista por categorías para medidas, etiquetas, alineación y daños visibles.", read: "10 min" },
      { eyebrow: "Guía de envío", title: "Coste de envío PikoBuy: peso, tamaño y rutas", description: "Comprende los datos del estimador oficial antes de comparar rutas internacionales.", read: "9 min" },
    ],
    articles: [
      { date: "29 de julio de 2026", title: "Investigación PikoBuy Spreadsheet: de un hallazgo a una mejor selección", description: "Método repetible para filtrar anuncios sin tratar un enlace como garantía de calidad.", tag: "Investigación" },
      { date: "27 de julio de 2026", title: "Fotos de almacén antes del envío: una rutina de revisión útil", description: "Convierte pocas fotos en decisiones claras sobre talla, estado y plazo de devolución.", tag: "QC" },
      { date: "25 de julio de 2026", title: "Cómo estimar un paquete PikoBuy antes de comprar", description: "Por qué peso, dimensiones, tipo de producto y reglas de ruta importan más que una tarifa aislada.", tag: "Envío" },
    ],
    faq: [
      { question: "¿Es este el sitio oficial de PikoBuy?", answer: "No. Es una web independiente de investigación de productos y guías de compra. No pertenece, no está operada ni afiliada oficialmente a PikoBuy." },
      { question: "¿Qué es un PikoBuy Spreadsheet?", answer: "Es una colección navegable de hallazgos organizada por categorías. Cada ficha inicia la investigación, pero no demuestra calidad, disponibilidad ni rendimiento del vendedor." },
      { question: "¿Qué ocurre cuando el artículo llega al almacén?", answer: "La guía oficial indica que el almacén registra el artículo, toma fotos y busca defectos visibles. Revisa las imágenes antes de crear el paquete internacional." },
      { question: "¿Cómo se calcula el envío internacional?", answer: "El estimador pide destino, tipo de producto, peso, largo, ancho y alto. Comprueba las rutas y el precio final al enviar el paquete." },
      { question: "¿Se puede devolver cualquier artículo?", answer: "No. Depende de las reglas del vendedor, estado, categoría y plazo. La política publicada indica cinco días en almacén para solicitar la devolución de productos aptos." },
      { question: "¿Una foto QC garantiza la calidad?", answer: "No. Puede mostrar problemas visibles, pero no prueba composición, durabilidad ni ajuste exacto." },
    ],
  },
  it: {
    categories: [
      { name: "Scarpe", countLabel: "Sneaker · ciabatte · running" },
      { name: "Felpe", countLabel: "Felpe · maglieria · sweatshirt" },
      { name: "T-shirt", countLabel: "T-shirt · polo · maniche lunghe" },
      { name: "Giacche", countLabel: "Cappotti · piumini · antivento" },
      { name: "Copricapi", countLabel: "Cappellini · berretti · cappelli" },
      { name: "Accessori", countLabel: "Borse · gioielli · piccoli articoli" },
    ],
    productCategories: ["Scarpe", "Felpe", "Giacche", "Copricapi", "Giacche", "T-shirt"],
    productReviews: [
      "Controlla battistrada, tallone ed etichetta taglia",
      "Confronta posizione della stampa e misure",
      "Controlla tessuto, cuciture e allineamento",
      "Controlla ricamo ed etichetta interna",
      "Confronta giunzioni del motivo e ferramenta",
      "Conferma larghezza torace e posizione del logo",
    ],
    workflow: [
      { title: "Scegli un prodotto", text: "Parti da un annuncio cinese e conferma modello, colore e taglia." },
      { title: "Cerca o incolla", text: "Usa parole chiave o incolla un link Taobao, Tmall, 1688, Weidian o Yupoo." },
      { title: "Invia e paga", text: "Seleziona le opzioni, invia l’ordine e completa il primo pagamento." },
      { title: "Controlla in magazzino", text: "Il magazzino registra l’articolo, lo fotografa e cerca difetti visibili." },
      { title: "Scegli la spedizione", text: "Invia il pacco, confronta le rotte disponibili e paga la spedizione internazionale." },
      { title: "Segui il pacco", text: "Attendi la partenza e segui gli aggiornamenti logistici fino alla consegna." },
    ],
    guides: [
      { eyebrow: "Guida per principianti", title: "Come usare PikoBuy: il processo in sei passaggi", description: "Percorso pratico dalla ricerca al controllo in magazzino e alla spedizione internazionale.", read: "8 min" },
      { eyebrow: "Guida QC", title: "Foto QC PikoBuy: cosa controllare prima della spedizione", description: "Checklist per categoria su misure, etichette, allineamento e danni visibili.", read: "10 min" },
      { eyebrow: "Guida spedizione", title: "Costo spedizione PikoBuy: peso, dimensioni e rotte", description: "Comprendi i dati del calcolatore ufficiale prima di confrontare le rotte internazionali.", read: "9 min" },
    ],
    articles: [
      { date: "29 luglio 2026", title: "Ricerca PikoBuy Spreadsheet: da un prodotto a una selezione migliore", description: "Metodo ripetibile per valutare gli annunci senza trattare un link come garanzia.", tag: "Ricerca" },
      { date: "27 luglio 2026", title: "Foto di magazzino prima della spedizione: una verifica utile", description: "Trasforma poche foto in decisioni chiare su taglia, condizione e tempi di reso.", tag: "QC" },
      { date: "25 luglio 2026", title: "Come stimare un pacco PikoBuy prima dell’acquisto", description: "Perché peso, dimensioni, tipo di prodotto e regole di rotta contano più di una tariffa isolata.", tag: "Spedizione" },
    ],
    faq: [
      { question: "Questo è il sito ufficiale PikoBuy?", answer: "No. È un sito indipendente di ricerca prodotti e guide agli acquisti. Non è di proprietà, gestito o affiliato ufficialmente a PikoBuy." },
      { question: "Cos’è un PikoBuy Spreadsheet?", answer: "È una raccolta navigabile di prodotti divisa per categorie. Una scheda avvia la ricerca ma non dimostra qualità, disponibilità o affidabilità del venditore." },
      { question: "Cosa accade quando l’articolo arriva in magazzino?", answer: "La guida ufficiale indica che il magazzino registra l’articolo, scatta foto e cerca difetti visibili. Controlla le immagini prima di creare il pacco internazionale." },
      { question: "Come viene stimata la spedizione internazionale?", answer: "Il calcolatore chiede destinazione, tipo di prodotto, peso, lunghezza, larghezza e altezza. Verifica rotte e costo finale all’invio del pacco." },
      { question: "Ogni articolo può essere restituito?", answer: "No. Dipende dalle regole del venditore, dalla condizione, categoria e tempistica. La politica pubblicata indica cinque giorni in magazzino per richiedere il reso dei prodotti idonei." },
      { question: "Una foto QC garantisce la qualità?", answer: "No. Può mostrare problemi visibili, ma non prova composizione, durata o vestibilità esatta." },
    ],
  },
  pl: {
    categories: [
      { name: "Buty", countLabel: "Sneakersy · klapki · biegowe" },
      { name: "Bluzy", countLabel: "Bluzy · dzianiny · sweatshirty" },
      { name: "T-shirty", countLabel: "Koszulki · polo · długi rękaw" },
      { name: "Kurtki", countLabel: "Płaszcze · puchówki · wiatrówki" },
      { name: "Nakrycia głowy", countLabel: "Czapki · beanie · kapelusze" },
      { name: "Akcesoria", countLabel: "Torby · biżuteria · drobiazgi" },
    ],
    productCategories: ["Buty", "Bluzy", "Kurtki", "Nakrycia głowy", "Kurtki", "T-shirty"],
    productReviews: [
      "Sprawdź bieżnik, kształt pięty i etykietę rozmiaru",
      "Porównaj położenie nadruku i wymiary",
      "Sprawdź tkaninę, szwy i wyrównanie przodu",
      "Sprawdź haft i etykietę wewnętrzną",
      "Porównaj łączenia wzoru i okucia",
      "Potwierdź szerokość klatki i położenie logo",
    ],
    workflow: [
      { title: "Wybierz produkt", text: "Zacznij od chińskiej oferty i potwierdź model, kolor oraz rozmiar." },
      { title: "Wyszukaj lub wklej", text: "Użyj słów kluczowych albo wklej link z Taobao, Tmall, 1688, Weidian lub Yupoo." },
      { title: "Zamów i zapłać", text: "Wybierz opcje, wyślij zamówienie i wykonaj pierwszą płatność." },
      { title: "Sprawdź w magazynie", text: "Magazyn rejestruje produkt, fotografuje go i szuka widocznych wad." },
      { title: "Wybierz wysyłkę", text: "Wyślij paczkę, porównaj dostępne trasy i opłać transport międzynarodowy." },
      { title: "Śledź paczkę", text: "Poczekaj na nadanie i śledź aktualizacje logistyczne do doręczenia." },
    ],
    guides: [
      { eyebrow: "Poradnik dla początkujących", title: "Jak korzystać z PikoBuy: sześć kroków zamówienia", description: "Praktyczna droga od znalezienia oferty po kontrolę magazynową i wysyłkę międzynarodową.", read: "8 min" },
      { eyebrow: "Poradnik QC", title: "Zdjęcia QC PikoBuy: co sprawdzić przed wysyłką", description: "Lista według kategorii: wymiary, etykiety, wyrównanie i widoczne uszkodzenia.", read: "10 min" },
      { eyebrow: "Poradnik wysyłki", title: "Koszt wysyłki PikoBuy: waga, rozmiar i trasy", description: "Zrozum dane oficjalnego kalkulatora przed porównaniem tras międzynarodowych.", read: "9 min" },
    ],
    articles: [
      { date: "29 lipca 2026", title: "Research PikoBuy Spreadsheet: od znaleziska do lepszej listy", description: "Powtarzalna metoda oceny ofert bez traktowania linku jako gwarancji jakości.", tag: "Research" },
      { date: "27 lipca 2026", title: "Zdjęcia magazynowe przed wysyłką: spokojna kontrola", description: "Jak zamienić kilka zdjęć w jasne decyzje o rozmiarze, stanie i terminie zwrotu.", tag: "QC" },
      { date: "25 lipca 2026", title: "Jak oszacować paczkę PikoBuy przed zakupem", description: "Dlaczego waga, wymiary, typ produktu i zasady trasy są ważniejsze niż pojedyncza stawka.", tag: "Wysyłka" },
    ],
    faq: [
      { question: "Czy to oficjalna strona PikoBuy?", answer: "Nie. To niezależna strona z researchem produktów i poradnikami zakupowymi. Nie należy do PikoBuy, nie jest przez niego prowadzona ani oficjalnie powiązana." },
      { question: "Czym jest PikoBuy Spreadsheet?", answer: "To uporządkowana według kategorii kolekcja produktów. Karta rozpoczyna research, ale nie potwierdza jakości, dostępności ani pracy sprzedawcy." },
      { question: "Co dzieje się po dotarciu produktu do magazynu?", answer: "Oficjalny poradnik mówi, że magazyn rejestruje produkt, robi zdjęcia i szuka widocznych wad. Przejrzyj zdjęcia przed utworzeniem paczki międzynarodowej." },
      { question: "Jak szacowana jest wysyłka międzynarodowa?", answer: "Kalkulator pyta o kraj lub region, typ produktu, wagę, długość, szerokość i wysokość. Trasy i końcową cenę sprawdź przy składaniu paczki." },
      { question: "Czy każdy produkt można zwrócić?", answer: "Nie. Zależy to od zasad sprzedawcy, stanu, kategorii i terminu. Opublikowana polityka wskazuje pięć dni w magazynie na wniosek dla kwalifikujących się produktów." },
      { question: "Czy zdjęcie QC gwarantuje jakość?", answer: "Nie. Pomaga zauważyć widoczne problemy, ale nie potwierdza składu, trwałości ani dokładnego dopasowania." },
    ],
  },
  pt: {
    categories: [
      { name: "Calçados", countLabel: "Tênis · chinelos · corrida" },
      { name: "Moletons", countLabel: "Moletons · tricôs · sweatshirts" },
      { name: "Camisetas", countLabel: "Camisetas · polos · manga longa" },
      { name: "Jaquetas", countLabel: "Casacos · acolchoados · corta-ventos" },
      { name: "Chapéus e bonés", countLabel: "Bonés · gorros · chapéus" },
      { name: "Acessórios", countLabel: "Bolsas · joias · pequenos itens" },
    ],
    productCategories: ["Calçados", "Moletons", "Jaquetas", "Chapéus e bonés", "Jaquetas", "Camisetas"],
    productReviews: [
      "Verifique sola, formato do calcanhar e etiqueta de tamanho",
      "Compare posição da estampa e medidas",
      "Verifique tecido, costuras e alinhamento frontal",
      "Verifique bordado e etiqueta interna",
      "Compare junções da estampa e ferragens",
      "Confirme largura do peito e posição do logotipo",
    ],
    workflow: [
      { title: "Escolha um produto", text: "Comece por um anúncio chinês e confirme modelo, cor e tamanho." },
      { title: "Pesquise ou cole", text: "Use palavras-chave ou cole um link do Taobao, Tmall, 1688, Weidian ou Yupoo." },
      { title: "Envie e pague", text: "Selecione as opções, envie o pedido e conclua o primeiro pagamento." },
      { title: "Verifique no armazém", text: "O armazém registra o item, tira fotos e procura defeitos visíveis." },
      { title: "Escolha o envio", text: "Envie o pacote, compare rotas disponíveis e pague o frete internacional." },
      { title: "Rastreie o pacote", text: "Aguarde o despacho e acompanhe as atualizações logísticas até a entrega." },
    ],
    guides: [
      { eyebrow: "Guia para iniciantes", title: "Como usar o PikoBuy: pedido em seis etapas", description: "Passo a passo da pesquisa até a inspeção no armazém e o envio internacional.", read: "8 min" },
      { eyebrow: "Guia de QC", title: "Fotos QC do PikoBuy: o que verificar antes do envio", description: "Checklist por categoria para medidas, etiquetas, alinhamento e danos visíveis.", read: "10 min" },
      { eyebrow: "Guia de envio", title: "Custo de envio PikoBuy: peso, tamanho e rotas", description: "Entenda os campos do calculador oficial antes de comparar rotas internacionais.", read: "9 min" },
    ],
    articles: [
      { date: "29 de julho de 2026", title: "Pesquisa PikoBuy Spreadsheet: de um achado a uma seleção melhor", description: "Método repetível para avaliar anúncios sem tratar um link como garantia de qualidade.", tag: "Pesquisa" },
      { date: "27 de julho de 2026", title: "Fotos de armazém antes do envio: uma revisão útil", description: "Transforme poucas fotos em decisões claras sobre tamanho, condição e prazo de devolução.", tag: "QC" },
      { date: "25 de julho de 2026", title: "Como estimar um pacote PikoBuy antes da compra", description: "Por que peso, dimensões, tipo de produto e regras de rota importam mais do que uma tarifa isolada.", tag: "Envio" },
    ],
    faq: [
      { question: "Este é o site oficial do PikoBuy?", answer: "Não. Este é um site independente de pesquisa de produtos e guias de compra. Não pertence, não é operado nem oficialmente afiliado ao PikoBuy." },
      { question: "O que é um PikoBuy Spreadsheet?", answer: "É uma coleção de produtos organizada por categoria. Uma ficha inicia a pesquisa, mas não comprova qualidade, estoque ou desempenho do vendedor." },
      { question: "O que acontece quando o item chega ao armazém?", answer: "O guia oficial informa que o armazém registra o item, tira fotos e procura defeitos visíveis. Revise as imagens antes de criar o pacote internacional." },
      { question: "Como o envio internacional é estimado?", answer: "O calculador pede destino, tipo de produto, peso, comprimento, largura e altura. Confira rotas e valor final ao enviar o pacote." },
      { question: "Todo item pode ser devolvido?", answer: "Não. Depende das regras do vendedor, condição, categoria e prazo. A política publicada indica cinco dias no armazém para solicitar a devolução de produtos elegíveis." },
      { question: "Uma foto QC garante a qualidade?", answer: "Não. Ela ajuda a identificar problemas visíveis, mas não comprova composição, durabilidade ou ajuste exato." },
    ],
  },
};

const extraFaq: Record<
  Exclude<Locale, "en">,
  { question: string; answer: string }[]
> = {
  de: [
    {
      question: "Welche chinesischen Marktplätze können mit PikoBuy genutzt werden?",
      answer:
        "Der veröffentlichte Einsteiger-Ratgeber nennt Taobao, Tmall, 1688, Weidian und Yupoo. Nutzer können per Suchbegriff suchen oder einen Produktlink einfügen und danach Farbe, Größe und Menge wählen.",
    },
    {
      question: "Warum gibt es zwei getrennte Zahlungen?",
      answer:
        "Die erste Zahlung erfolgt mit der Produktbestellung. Der internationale Versand wird später gewählt und bezahlt, nachdem der Artikel im Lager angekommen und ein Paket mit aktuellem Gewicht, Maßen und Routen erstellt wurde.",
    },
    {
      question: "Kann ich zusätzliche Lagerfotos anfordern?",
      answer:
        "Laut PikoBuy-Versandrichtlinie können zusätzliche Detailfotos gekauft werden. Die öffentliche Seite nennt keine dauerhafte Fotoanzahl und keinen festen Foto- oder Videopreis; prüfe deshalb die aktuelle Serviceansicht.",
    },
    {
      question: "Wie lange kann ich eine zulässige Rückgabe beantragen?",
      answer:
        "Die Rückgabeseite beschreibt fünf Tage nach dem Status „Warehoused“, dort definiert als 120 Stunden ab der nächsten Stunde nach dem Statuswechsel. Verkäufer, Zustand und Kategorie bleiben entscheidend.",
    },
    {
      question: "Was kann eine Rückgabe ohne Grund kosten?",
      answer:
        "Die veröffentlichte Seite nennt derzeit Rückversand zum Verkäufer, dessen ursprüngliche Versandkosten und 5 RMB Servicegebühr. Prüfe die aktuelle Bestellung, da Regeln und Gebühren sich ändern können.",
    },
    {
      question: "Wann sollten Trackingdaten erscheinen?",
      answer:
        "Der PikoBuy-Ratgeber sagt, dass Logistikinformationen innerhalb von drei Tagen nach dem Versand verfügbar sein sollten. Zwischen Übergabe, Export, Zoll und lokaler Zustellung können trotzdem stille Phasen entstehen.",
    },
  ],
  fr: [
    {
      question: "Quelles plateformes chinoises sont compatibles avec PikoBuy ?",
      answer:
        "Le guide débutant publié cite Taobao, Tmall, 1688, Weidian et Yupoo. Il indique qu’un utilisateur peut rechercher par mot-clé ou coller un lien, puis choisir précisément couleur, taille et quantité.",
    },
    {
      question: "Pourquoi y a-t-il deux paiements séparés ?",
      answer:
        "Le premier paiement accompagne la commande du produit. L’expédition internationale est choisie et payée plus tard, après l’arrivée en entrepôt et la création d’un colis avec poids, dimensions et routes actuels.",
    },
    {
      question: "Puis-je demander des photos d’entrepôt supplémentaires ?",
      answer:
        "La politique d’expédition PikoBuy indique que des photos détaillées supplémentaires peuvent être achetées. Elle ne publie ni nombre permanent de photos, ni tarif fixe photo ou vidéo ; vérifiez l’écran de service actuel.",
    },
    {
      question: "Combien de temps ai-je pour demander un retour éligible ?",
      answer:
        "La page Retours décrit cinq jours après le statut « Warehoused », soit 120 heures à compter de l’heure suivant le changement de statut. Le vendeur, l’état et la catégorie restent déterminants.",
    },
    {
      question: "Combien peut coûter un retour sans motif ?",
      answer:
        "La page publiée indique actuellement l’envoi vers le vendeur, les frais d’envoi initiaux du vendeur et 5 RMB de frais de service. Vérifiez la commande active car règles et frais peuvent changer.",
    },
    {
      question: "Quand le suivi doit-il apparaître ?",
      answer:
        "Le guide PikoBuy indique que les informations logistiques devraient être disponibles dans les trois jours suivant l’expédition. Des périodes sans scan peuvent subsister entre transporteur, export, douane et livraison locale.",
    },
  ],
  es: [
    {
      question: "¿Qué mercados chinos se pueden usar con PikoBuy?",
      answer:
        "La guía publicada menciona Taobao, Tmall, 1688, Weidian y Yupoo. Indica que se puede buscar por palabra clave o pegar un enlace y después elegir con precisión color, talla y cantidad.",
    },
    {
      question: "¿Por qué hay dos pagos separados?",
      answer:
        "El primer pago se realiza al enviar el pedido del producto. El envío internacional se elige y paga después, cuando el artículo llega al almacén y se crea un paquete con peso, medidas y rutas actuales.",
    },
    {
      question: "¿Puedo solicitar fotos adicionales del almacén?",
      answer:
        "La política de envío de PikoBuy dice que se pueden comprar fotos detalladas adicionales. No publica un número permanente ni un precio fijo de foto o vídeo; revisa la pantalla del servicio actual.",
    },
    {
      question: "¿Cuánto tiempo tengo para pedir una devolución elegible?",
      answer:
        "La página de devoluciones describe cinco días tras el estado «Warehoused», definidos como 120 horas desde la hora siguiente al cambio de estado. También dependen del vendedor, condición y categoría.",
    },
    {
      question: "¿Qué puede costar una devolución sin motivo?",
      answer:
        "La página publicada enumera actualmente el envío al vendedor, el envío original del vendedor y una tarifa de servicio de 5 RMB. Comprueba el pedido activo porque las reglas y tarifas pueden cambiar.",
    },
    {
      question: "¿Cuándo debería aparecer el seguimiento?",
      answer:
        "La guía de PikoBuy dice que la información logística debería estar disponible dentro de los tres días posteriores al envío. Puede haber pausas entre transportista, exportación, aduanas y entrega local.",
    },
  ],
  it: [
    {
      question: "Quali marketplace cinesi si possono usare con PikoBuy?",
      answer:
        "La guida pubblicata cita Taobao, Tmall, 1688, Weidian e Yupoo. Spiega che si può cercare per parola chiave o incollare un link, quindi scegliere con precisione colore, taglia e quantità.",
    },
    {
      question: "Perché ci sono due pagamenti separati?",
      answer:
        "Il primo pagamento viene effettuato con l’ordine del prodotto. La spedizione internazionale viene scelta e pagata dopo l’arrivo in magazzino e la creazione del pacco con peso, misure e rotte attuali.",
    },
    {
      question: "Posso richiedere altre foto del magazzino?",
      answer:
        "La politica di spedizione PikoBuy dice che è possibile acquistare foto dettagliate aggiuntive. Non pubblica un numero permanente né un prezzo fisso per foto o video; controlla il servizio attuale.",
    },
    {
      question: "Quanto tempo ho per chiedere un reso idoneo?",
      answer:
        "La pagina dei resi descrive cinque giorni dopo lo stato «Warehoused», definiti come 120 ore dall’ora successiva al cambio di stato. Valgono anche regole del venditore, condizione e categoria.",
    },
    {
      question: "Quanto può costare un reso senza motivo?",
      answer:
        "La pagina pubblicata elenca attualmente spedizione al venditore, spedizione originale del venditore e 5 RMB di servizio. Verifica l’ordine attivo perché regole e costi possono cambiare.",
    },
    {
      question: "Quando dovrebbe comparire il tracking?",
      answer:
        "La guida PikoBuy dice che le informazioni logistiche dovrebbero apparire entro tre giorni dalla spedizione. Possono comunque esserci pause tra vettore, esportazione, dogana e consegna locale.",
    },
  ],
  pl: [
    {
      question: "Z jakich chińskich platform można korzystać przez PikoBuy?",
      answer:
        "Opublikowany poradnik wymienia Taobao, Tmall, 1688, Weidian i Yupoo. Użytkownik może wyszukać produkt lub wkleić link, a następnie wybrać dokładny kolor, rozmiar i ilość.",
    },
    {
      question: "Dlaczego są dwie oddzielne płatności?",
      answer:
        "Pierwsza płatność dotyczy zamówienia produktu. Wysyłkę międzynarodową wybiera się i opłaca później, po przyjęciu towaru do magazynu i utworzeniu paczki z aktualną wagą, wymiarami i trasami.",
    },
    {
      question: "Czy mogę zamówić dodatkowe zdjęcia magazynowe?",
      answer:
        "Polityka wysyłki PikoBuy mówi, że można kupić dodatkowe zdjęcia szczegółowe. Nie podaje stałej liczby ani ceny zdjęcia lub filmu; należy sprawdzić aktualny ekran usługi.",
    },
    {
      question: "Ile mam czasu na zgłoszenie kwalifikującego się zwrotu?",
      answer:
        "Strona zwrotów opisuje pięć dni od statusu „Warehoused”, czyli 120 godzin od następnej godziny po zmianie statusu. Znaczenie mają też sprzedawca, stan i kategoria.",
    },
    {
      question: "Ile może kosztować zwrot bez podania przyczyny?",
      answer:
        "Opublikowana strona wymienia obecnie przesyłkę do sprzedawcy, pierwotny koszt wysyłki sprzedawcy i 5 RMB opłaty serwisowej. Sprawdź bieżące zamówienie, bo zasady mogą się zmieniać.",
    },
    {
      question: "Kiedy powinny pojawić się dane śledzenia?",
      answer:
        "Poradnik PikoBuy mówi, że informacje logistyczne powinny być dostępne w ciągu trzech dni od wysyłki. Między przewoźnikiem, eksportem, odprawą i dostawą mogą wystąpić przerwy.",
    },
  ],
  pt: [
    {
      question: "Quais marketplaces chineses podem ser usados com o PikoBuy?",
      answer:
        "O guia publicado cita Taobao, Tmall, 1688, Weidian e Yupoo. Ele diz que o usuário pode pesquisar por palavra-chave ou colar um link e depois escolher exatamente cor, tamanho e quantidade.",
    },
    {
      question: "Por que existem dois pagamentos separados?",
      answer:
        "O primeiro pagamento é feito ao enviar o pedido do produto. O envio internacional é escolhido e pago depois, quando o item chega ao armazém e um pacote é criado com peso, dimensões e rotas atuais.",
    },
    {
      question: "Posso solicitar fotos adicionais do armazém?",
      answer:
        "A política de envio do PikoBuy diz que fotos detalhadas adicionais podem ser compradas. Ela não publica quantidade permanente nem preço fixo de foto ou vídeo; confira o serviço atual.",
    },
    {
      question: "Quanto tempo tenho para solicitar uma devolução elegível?",
      answer:
        "A página de devoluções descreve cinco dias após o status «Warehoused», definidos como 120 horas a partir da hora seguinte à mudança. Vendedor, condição e categoria também se aplicam.",
    },
    {
      question: "Quanto pode custar uma devolução sem motivo?",
      answer:
        "A página publicada lista atualmente envio ao vendedor, envio original do vendedor e taxa de serviço de 5 RMB. Verifique o pedido ativo porque regras e valores podem mudar.",
    },
    {
      question: "Quando o rastreamento deve aparecer?",
      answer:
        "O guia PikoBuy diz que as informações logísticas devem estar disponíveis em até três dias após o envio. Ainda pode haver pausas entre transportadora, exportação, alfândega e entrega local.",
    },
  ],
};

export function getSiteData(locale: Locale): LocalizedSiteData {
  if (locale !== "en") {
    return {
      ...localized[locale],
      faq: [...localized[locale].faq, ...extraFaq[locale]],
    };
  }

  return {
    categories: categories.map(({ name, countLabel }) => ({ name, countLabel })),
    productCategories: products.map((product) => product.category),
    productReviews: products.map((product) => product.review),
    workflow: workflow.map(({ title, text }) => ({ title, text })),
    guides: guides.map(({ eyebrow, title, description, read }) => ({
      eyebrow,
      title,
      description,
      read,
    })),
    articles: articles.map(({ date, title, description, tag }) => ({
      date,
      title,
      description,
      tag,
    })),
    faq: faqItems,
  };
}
