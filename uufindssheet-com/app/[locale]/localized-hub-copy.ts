export type ParityLocale = "en-gb" | "de" | "pl" | "pt-br";

type EvidenceCard = {
  label: string;
  title: string;
  body: string;
  note: string;
};

type FactCard = {
  title: string;
  body: string;
};

type WorkflowCard = {
  label: string;
  title: string;
  body: string;
  link: string;
};

type ChecklistItem = {
  lead: string;
  body: string;
};

type FindsCopy = {
  eyebrow: string;
  title: [string, string];
  deck: string;
  evidenceLabel: string;
  evidenceTitle: string;
  evidenceDeck: string;
  evidenceCards: [EvidenceCard, EvidenceCard, EvidenceCard, EvidenceCard];
  checklistLabel: string;
  checklistTitle: string;
  checklist: [ChecklistItem, ChecklistItem, ChecklistItem, ChecklistItem, ChecklistItem];
  sourceLabel: string;
  sourceBody: string;
  categoryNotes: Record<string, string>;
};

type HowCopy = {
  eyebrow: string;
  title: [string, string, string];
  deck: string;
  factsLabel: string;
  facts: [FactCard, FactCard, FactCard];
  workflow: [WorkflowCard, WorkflowCard, WorkflowCard];
  matrixLabel: string;
  matrixTitle: string;
  matrixDeck: string;
  matrix: [EvidenceCard, EvidenceCard, EvidenceCard, EvidenceCard];
  checklistLabel: string;
  checklistTitle: string;
  checklist: [ChecklistItem, ChecklistItem, ChecklistItem, ChecklistItem, ChecklistItem];
  boundaryLabel: string;
  boundaryTitle: string;
  boundaryBody: string;
  boundaryLink: string;
};

export const hubParityCopy: Record<ParityLocale, { finds: FindsCopy; how: HowCopy }> = {
  "en-gb": {
    finds: {
      eyebrow: "Finds / UUFinds research + 09 direct routes",
      title: ["Discover broadly.", "Match precisely."],
      deck: "UUFinds publicly describes both QC discovery and personalised pages that combine items, purchasing-agent routes and social content. Use discovery to create a shortlist—then keep the exact source link so a popular image or shared page is never mistaken for proof of one specific listing.",
      evidenceLabel: "What the official pages establish",
      evidenceTitle: "A find is a starting point.",
      evidenceDeck: "The official public descriptions support product discovery, link handling, QC media and shareable item pages. They do not establish that every shared item has recent QC material or unchanged seller data.",
      evidenceCards: [
        { label: "SHARED ITEM PAGE", title: "Useful for collecting leads", body: "UUFinds describes personalised pages that integrate items, purchasing agents and social content and can be shared through one link.", note: "Save the original item or seller link before researching quality." },
        { label: "QC FINDER", title: "Useful after discovery", body: "The official QC finder describes photos, videos and image recognition. Availability depends on what material exists for the product or link.", note: "A visually similar result is not automatically the same seller, variant or batch." },
        { label: "CATEGORY ROUTE", title: "Useful when you only know the type", body: "Begin with Shoes, Hoodies, T-Shirts, Jackets, Pants, Headwear, Accessories, Jerseys or Electronics when no exact link exists yet.", note: "Shortlist two or three candidates before comparing evidence." },
        { label: "EXACT PRODUCT", title: "Useful for the final match", body: "Open an individual CNBuy Sheet detail page and compare its product ID, images, price and variants with the item you researched.", note: "Use the live page for current facts that a shared find cannot preserve." },
      ],
      checklistLabel: "A practical discovery routine",
      checklistTitle: "Turn browsing into a traceable shortlist.",
      checklist: [
        { lead: "Name the intent:", body: "inspiration, category comparison, or verification of one exact link." },
        { lead: "Keep the source:", body: "preserve the full item URL and visible seller or item identifier." },
        { lead: "Narrow the field:", body: "compare category, model, material, price band and visible variants." },
        { lead: "Research evidence:", body: "check whether matched QC photos or video exist and how recent they are." },
        { lead: "Finish live:", body: "confirm today’s information on the exact CNBuy Sheet product page." },
      ],
      sourceLabel: "Source boundary / Reviewed July 23, 2026",
      sourceBody: "Function claims on this page were checked against UUFinds’ public QC finder, QC browsing page, personalised display page, product disclaimer and app information. Category and shopping buttons remain exclusive to CNBuy Sheet.",
      categoryNotes: {
        Shoes: "Sneakers & footwear", Hoodies: "Sweaters & sweatshirts", "T-Shirts": "Tees & tops", Jackets: "Coats & outerwear",
        Pants: "Pants & shorts", Headwear: "Caps & hats", Accessories: "Bags, wallets & more", Jersey: "Teamwear finds", Electronics: "Tech & gadgets",
      },
    },
    how: {
      eyebrow: "How it works / Fact-checked July 23, 2026",
      title: ["Match the link.", "Read the evidence.", "Verify what changed."],
      deck: "UUFinds publicly describes a QC finder for photos and videos, image recognition, and link handling for Taobao, Weidian, 1688 and shopping agents. Those tools can support research, but the exact live listing still decides the current price, variants and availability.",
      factsLabel: "Verified UUFinds functions",
      facts: [
        { title: "QC media", body: "UUFinds says its QC finder can surface available product photos and videos." },
        { title: "Supported inputs", body: "Its public app information names 1688, Taobao, Weidian and shopping-agent link conversion." },
        { title: "Platform boundary", body: "UUFinds states that it does not sell products directly or indirectly." },
      ],
      workflow: [
        { label: "MATCH", title: "Preserve the exact source", body: "Keep the full marketplace or agent link. Compare the item ID, seller and visible variant before treating an album as a match. Image recognition may find a visually similar item, but similarity alone does not prove it is the same listing or batch.", link: "Build a category shortlist" },
        { label: "INSPECT", title: "Read every available angle", body: "Start with silhouette and proportion, then inspect construction, finish and measurements. Note the QC date and whether more than one example exists. Record missing angles as unknowns instead of turning them into assumptions.", link: "Use the full QC checklist" },
        { label: "CONFIRM", title: "Check today’s listing facts", body: "Open the exact CNBuy Sheet product page and re-check the identifier, current price, variants, size information and availability. An older QC set can inform the decision, but it cannot confirm what the seller offers today.", link: "Open product details" },
      ],
      matrixLabel: "Tool versus conclusion",
      matrixTitle: "Know what each signal can prove.",
      matrixDeck: "This distinction prevents a useful research tool from being mistaken for a product guarantee.",
      matrix: [
        { label: "QC PHOTOS", title: "Useful for visible condition", body: "They can show shape, stitching, print placement, hardware and measurements on the photographed item.", note: "They cannot guarantee another unit or later batch." },
        { label: "QC VIDEO", title: "Useful for movement", body: "Video can reveal fabric drape, zipper movement, sole flex and angles that a still image may hide.", note: "It cannot establish durability or internal electronic condition." },
        { label: "IMAGE RECOGNITION", title: "Useful for finding candidates", body: "A similar image can help locate related listings when the original link is missing or incomplete.", note: "It cannot replace the seller and item-ID match." },
        { label: "LIVE PRODUCT PAGE", title: "Useful for current facts", body: "The destination page is where price, available options, seller details and stock must be checked again.", note: "It still does not promise that every received item will match an older sample." },
      ],
      checklistLabel: "Five-line decision record",
      checklistTitle: "Write this down before you continue.",
      checklist: [
        { lead: "Match:", body: "exact, probable, or visual reference only." },
        { lead: "Evidence:", body: "which photos, video, angles and measurements were available." },
        { lead: "Unknowns:", body: "missing views, material claims, sizing or internal condition." },
        { lead: "Live check:", body: "current ID, price, variants and availability on CNBuy Sheet." },
        { lead: "Decision:", body: "keep, compare with another listing, or pause for more evidence." },
      ],
      boundaryLabel: "Research boundary",
      boundaryTitle: "Discovery expands options. QC reduces uncertainty. The live listing confirms current facts.",
      boundaryBody: "Official claims reviewed: UUFinds QC finder, QC browsing copy, product-detail disclaimer, account pages and public app information. No UUFinds outbound link is included on this site.",
      boundaryLink: "Read the complete buying guide",
    },
  },
  de: {
    finds: {
      eyebrow: "Funde / UUFinds-Recherche + 09 direkte Wege",
      title: ["Breit entdecken.", "Präzise zuordnen."],
      deck: "UUFinds beschreibt öffentlich sowohl die QC-Suche als auch personalisierte Seiten, die Artikel, Einkaufsagenten-Routen und soziale Inhalte verbinden. Nutze die Entdeckung für eine Vorauswahl und bewahre danach den exakten Quellenlink auf, damit ein beliebtes Bild oder eine geteilte Seite niemals als Beleg für ein bestimmtes Angebot missverstanden wird.",
      evidenceLabel: "Was die offiziellen Seiten belegen",
      evidenceTitle: "Ein Fund ist der Ausgangspunkt.",
      evidenceDeck: "Die öffentlichen Beschreibungen belegen Produktsuche, Linkverarbeitung, QC-Medien und teilbare Artikelseiten. Sie belegen nicht, dass jeder geteilte Artikel aktuelles QC-Material besitzt oder die Verkäuferdaten unverändert sind.",
      evidenceCards: [
        { label: "GETEILTE ARTIKELSEITE", title: "Nützlich zum Sammeln von Kandidaten", body: "UUFinds beschreibt personalisierte Seiten, die Artikel, Einkaufsagenten und soziale Inhalte bündeln und über einen Link geteilt werden können.", note: "Speichere vor der Qualitätsprüfung den ursprünglichen Artikel- oder Verkäuferlink." },
        { label: "QC-FINDER", title: "Nützlich nach der Entdeckung", body: "Der offizielle QC-Finder beschreibt Fotos, Videos und Bilderkennung. Die Verfügbarkeit hängt davon ab, welches Material für den Artikel oder Link existiert.", note: "Ein optisch ähnliches Ergebnis ist nicht automatisch derselbe Verkäufer, dieselbe Variante oder Charge." },
        { label: "KATEGORIEWEG", title: "Nützlich, wenn nur der Produkttyp bekannt ist", body: "Beginne mit Schuhen, Hoodies, T-Shirts, Jacken, Hosen, Kopfbedeckungen, Accessoires, Trikots oder Elektronik, wenn noch kein exakter Link vorhanden ist.", note: "Wähle zwei oder drei Kandidaten aus, bevor du die Belege vergleichst." },
        { label: "EXAKTES PRODUKT", title: "Nützlich für die endgültige Zuordnung", body: "Öffne eine einzelne CNBuy-Sheet-Detailseite und vergleiche Produkt-ID, Bilder, Preis und Varianten mit dem recherchierten Artikel.", note: "Nutze die Live-Seite für aktuelle Fakten, die eine geteilte Fundseite nicht bewahren kann." },
      ],
      checklistLabel: "Eine praktische Entdeckungsroutine",
      checklistTitle: "Mache aus dem Stöbern eine nachvollziehbare Vorauswahl.",
      checklist: [
        { lead: "Ziel benennen:", body: "Inspiration, Kategorievergleich oder Prüfung eines exakten Links." },
        { lead: "Quelle bewahren:", body: "vollständige Artikel-URL und sichtbare Verkäufer- oder Artikel-ID speichern." },
        { lead: "Auswahl eingrenzen:", body: "Kategorie, Modell, Material, Preisbereich und sichtbare Varianten vergleichen." },
        { lead: "Belege recherchieren:", body: "prüfen, ob passende QC-Fotos oder Videos vorhanden und wie aktuell sie sind." },
        { lead: "Live abschließen:", body: "heutige Angaben auf der exakten CNBuy-Sheet-Produktseite bestätigen." },
      ],
      sourceLabel: "Quellengrenze / Geprüft am 23. Juli 2026",
      sourceBody: "Die Funktionsangaben dieser Seite wurden mit dem öffentlichen UUFinds-QC-Finder, der QC-Übersicht, der personalisierten Anzeigeseite, dem Produkthinweis und den App-Informationen abgeglichen. Kategorie- und Einkaufsbuttons führen ausschließlich zu CNBuy Sheet.",
      categoryNotes: {
        Shoes: "Sneaker & Schuhe", Hoodies: "Pullover & Sweatshirts", "T-Shirts": "Shirts & Oberteile", Jackets: "Mäntel & Oberbekleidung",
        Pants: "Hosen & Shorts", Headwear: "Kappen & Hüte", Accessories: "Taschen, Geldbörsen & mehr", Jersey: "Trikots & Teamwear", Electronics: "Technik & Geräte",
      },
    },
    how: {
      eyebrow: "So funktioniert es / Fakten geprüft am 23. Juli 2026",
      title: ["Link zuordnen.", "Belege lesen.", "Änderungen prüfen."],
      deck: "UUFinds beschreibt öffentlich einen QC-Finder für Fotos und Videos, Bilderkennung sowie die Verarbeitung von Taobao-, Weidian-, 1688- und Einkaufsagenten-Links. Diese Werkzeuge unterstützen die Recherche; den aktuellen Preis, die Varianten und die Verfügbarkeit bestimmt jedoch weiterhin das exakte Live-Angebot.",
      factsLabel: "Bestätigte UUFinds-Funktionen",
      facts: [
        { title: "QC-Medien", body: "UUFinds gibt an, dass der QC-Finder verfügbare Produktfotos und -videos anzeigen kann." },
        { title: "Unterstützte Eingaben", body: "Die öffentlichen App-Informationen nennen 1688, Taobao, Weidian und die Umwandlung von Einkaufsagenten-Links." },
        { title: "Plattformgrenze", body: "UUFinds erklärt, Produkte weder direkt noch indirekt zu verkaufen." },
      ],
      workflow: [
        { label: "ZUORDNEN", title: "Die exakte Quelle bewahren", body: "Bewahre den vollständigen Marketplace- oder Agentenlink auf. Vergleiche Artikel-ID, Verkäufer und sichtbare Variante, bevor du ein Album als Treffer wertest. Bilderkennung kann einen ähnlichen Artikel finden, doch Ähnlichkeit allein beweist weder dasselbe Angebot noch dieselbe Charge.", link: "Kategorie-Vorauswahl erstellen" },
        { label: "PRÜFEN", title: "Jeden verfügbaren Blickwinkel lesen", body: "Beginne mit Silhouette und Proportion, dann prüfe Konstruktion, Verarbeitung und Maße. Notiere das QC-Datum und ob mehrere Beispiele existieren. Fehlende Ansichten bleiben unbekannt und werden nicht durch Annahmen ersetzt.", link: "Vollständige QC-Checkliste nutzen" },
        { label: "BESTÄTIGEN", title: "Heutige Angebotsdaten prüfen", body: "Öffne die exakte CNBuy-Sheet-Produktseite und prüfe Kennung, aktuellen Preis, Varianten, Größenangaben und Verfügbarkeit erneut. Ein älteres QC-Set kann informieren, aber nicht bestätigen, was der Verkäufer heute anbietet.", link: "Produktdetails öffnen" },
      ],
      matrixLabel: "Werkzeug und Schlussfolgerung",
      matrixTitle: "Erkenne, was jedes Signal belegen kann.",
      matrixDeck: "Diese Trennung verhindert, dass ein nützliches Recherchewerkzeug mit einer Produktgarantie verwechselt wird.",
      matrix: [
        { label: "QC-FOTOS", title: "Nützlich für den sichtbaren Zustand", body: "Sie können Form, Nähte, Druckposition, Beschläge und Maße des fotografierten Artikels zeigen.", note: "Sie garantieren keine andere Einheit oder spätere Charge." },
        { label: "QC-VIDEO", title: "Nützlich für Bewegung", body: "Video kann Stofffall, Reißverschlussbewegung, Sohlenflex und in Fotos verborgene Winkel zeigen.", note: "Es belegt weder Haltbarkeit noch den inneren Zustand von Elektronik." },
        { label: "BILDERKENNUNG", title: "Nützlich zum Finden von Kandidaten", body: "Ein ähnliches Bild kann verwandte Angebote auffinden, wenn der ursprüngliche Link fehlt oder unvollständig ist.", note: "Es ersetzt nicht den Abgleich von Verkäufer und Artikel-ID." },
        { label: "LIVE-PRODUKTSEITE", title: "Nützlich für aktuelle Fakten", body: "Auf der Zielseite müssen Preis, verfügbare Optionen, Verkäuferangaben und Bestand erneut geprüft werden.", note: "Auch sie verspricht nicht, dass jeder erhaltene Artikel einem älteren Muster entspricht." },
      ],
      checklistLabel: "Entscheidung in fünf Zeilen",
      checklistTitle: "Notiere dies, bevor du fortfährst.",
      checklist: [
        { lead: "Zuordnung:", body: "exakt, wahrscheinlich oder nur visuelle Referenz." },
        { lead: "Belege:", body: "welche Fotos, Videos, Winkel und Maße verfügbar waren." },
        { lead: "Unbekannt:", body: "fehlende Ansichten, Materialangaben, Größe oder innerer Zustand." },
        { lead: "Live-Prüfung:", body: "aktuelle ID, Preis, Varianten und Verfügbarkeit bei CNBuy Sheet." },
        { lead: "Entscheidung:", body: "behalten, anderes Angebot vergleichen oder auf weitere Belege warten." },
      ],
      boundaryLabel: "Recherchegrenze",
      boundaryTitle: "Entdeckung erweitert die Auswahl. QC reduziert Unsicherheit. Das Live-Angebot bestätigt aktuelle Fakten.",
      boundaryBody: "Geprüfte offizielle Angaben: UUFinds-QC-Finder, QC-Übersicht, Produkthinweis, Kontoseiten und öffentliche App-Informationen. Diese Website enthält keinen ausgehenden UUFinds-Link.",
      boundaryLink: "Vollständigen Einkaufsratgeber lesen",
    },
  },
  pl: {
    finds: {
      eyebrow: "Znaleziska / wyszukiwanie UUFinds + 09 bezpośrednich ścieżek",
      title: ["Odkrywaj szeroko.", "Dopasowuj precyzyjnie."],
      deck: "UUFinds publicznie opisuje zarówno wyszukiwanie materiałów QC, jak i spersonalizowane strony łączące produkty, ścieżki agentów zakupowych i treści społecznościowe. Użyj odkrywania do utworzenia krótkiej listy, a następnie zachowaj dokładny link źródłowy, aby popularnego zdjęcia lub udostępnionej strony nie pomylić z dowodem dotyczącym konkretnej oferty.",
      evidenceLabel: "Co potwierdzają oficjalne strony",
      evidenceTitle: "Znalezisko jest punktem wyjścia.",
      evidenceDeck: "Oficjalne opisy potwierdzają odkrywanie produktów, obsługę linków, materiały QC i udostępniane strony produktów. Nie potwierdzają, że każdy udostępniony produkt ma aktualne materiały QC ani że dane sprzedawcy pozostały bez zmian.",
      evidenceCards: [
        { label: "UDOSTĘPNIONA STRONA PRODUKTU", title: "Przydatna do zbierania propozycji", body: "UUFinds opisuje spersonalizowane strony integrujące produkty, agentów zakupowych i treści społecznościowe, które można udostępnić jednym linkiem.", note: "Przed oceną jakości zapisz oryginalny link produktu lub sprzedawcy." },
        { label: "WYSZUKIWARKA QC", title: "Przydatna po znalezieniu produktu", body: "Oficjalna wyszukiwarka QC opisuje zdjęcia, filmy i rozpoznawanie obrazu. Dostępność zależy od materiałów istniejących dla danego produktu lub linku.", note: "Wizualnie podobny wynik nie oznacza automatycznie tego samego sprzedawcy, wariantu ani partii." },
        { label: "ŚCIEŻKA KATEGORII", title: "Przydatna, gdy znasz tylko rodzaj", body: "Jeśli nie masz jeszcze dokładnego linku, zacznij od butów, bluz, T-shirtów, kurtek, spodni, nakryć głowy, akcesoriów, koszulek sportowych lub elektroniki.", note: "Wybierz dwóch lub trzech kandydatów przed porównaniem dowodów." },
        { label: "DOKŁADNY PRODUKT", title: "Przydatny do końcowego dopasowania", body: "Otwórz indywidualną stronę szczegółów CNBuy Sheet i porównaj ID produktu, zdjęcia, cenę oraz warianty z badanym przedmiotem.", note: "Aktualne fakty sprawdzaj na stronie na żywo, ponieważ udostępnione znalezisko ich nie zachowuje." },
      ],
      checklistLabel: "Praktyczna procedura odkrywania",
      checklistTitle: "Zmień przeglądanie w możliwą do prześledzenia krótką listę.",
      checklist: [
        { lead: "Określ zamiar:", body: "inspiracja, porównanie kategorii lub weryfikacja jednego dokładnego linku." },
        { lead: "Zachowaj źródło:", body: "pełny adres produktu oraz widoczny identyfikator sprzedawcy lub produktu." },
        { lead: "Zawęź wybór:", body: "porównaj kategorię, model, materiał, przedział cenowy i widoczne warianty." },
        { lead: "Sprawdź dowody:", body: "ustal, czy istnieją dopasowane zdjęcia lub filmy QC i jak są aktualne." },
        { lead: "Zakończ na żywo:", body: "potwierdź dzisiejsze dane na dokładnej stronie produktu CNBuy Sheet." },
      ],
      sourceLabel: "Granica źródeł / Sprawdzono 23 lipca 2026",
      sourceBody: "Informacje o funkcjach na tej stronie sprawdzono na publicznej wyszukiwarce QC UUFinds, stronie przeglądania QC, spersonalizowanej stronie prezentacji, zastrzeżeniu produktu i w informacjach o aplikacji. Przyciski kategorii i zakupów prowadzą wyłącznie do CNBuy Sheet.",
      categoryNotes: {
        Shoes: "Sneakersy i obuwie", Hoodies: "Swetry i bluzy", "T-Shirts": "T-shirty i topy", Jackets: "Płaszcze i odzież wierzchnia",
        Pants: "Spodnie i szorty", Headwear: "Czapki i kapelusze", Accessories: "Torby, portfele i więcej", Jersey: "Koszulki i odzież drużynowa", Electronics: "Technika i gadżety",
      },
    },
    how: {
      eyebrow: "Jak to działa / Fakty sprawdzone 23 lipca 2026",
      title: ["Dopasuj link.", "Przeczytaj dowody.", "Sprawdź, co się zmieniło."],
      deck: "UUFinds publicznie opisuje wyszukiwarkę QC zdjęć i filmów, rozpoznawanie obrazu oraz obsługę linków Taobao, Weidian, 1688 i agentów zakupowych. Narzędzia te wspierają badanie produktu, ale o aktualnej cenie, wariantach i dostępności nadal decyduje dokładna oferta na żywo.",
      factsLabel: "Zweryfikowane funkcje UUFinds",
      facts: [
        { title: "Materiały QC", body: "UUFinds podaje, że wyszukiwarka QC może wyświetlać dostępne zdjęcia i filmy produktów." },
        { title: "Obsługiwane dane", body: "Publiczne informacje o aplikacji wymieniają 1688, Taobao, Weidian oraz konwersję linków agentów zakupowych." },
        { title: "Granica platformy", body: "UUFinds informuje, że nie sprzedaje produktów bezpośrednio ani pośrednio." },
      ],
      workflow: [
        { label: "DOPASUJ", title: "Zachowaj dokładne źródło", body: "Zachowaj pełny link z marketplace’u lub agenta. Porównaj ID produktu, sprzedawcę i widoczny wariant, zanim uznasz album za dopasowany. Rozpoznawanie obrazu może znaleźć podobny przedmiot, lecz samo podobieństwo nie dowodzi tej samej oferty ani partii.", link: "Utwórz krótką listę kategorii" },
        { label: "SPRAWDŹ", title: "Przejrzyj każdy dostępny kąt", body: "Zacznij od sylwetki i proporcji, a potem oceń konstrukcję, wykończenie i wymiary. Zapisz datę QC oraz liczbę przykładów. Brakujące ujęcia oznacz jako niewiadome, zamiast zastępować je założeniami.", link: "Użyj pełnej listy kontrolnej QC" },
        { label: "POTWIERDŹ", title: "Sprawdź dzisiejsze dane oferty", body: "Otwórz dokładną stronę produktu CNBuy Sheet i ponownie sprawdź identyfikator, aktualną cenę, warianty, informacje o rozmiarach oraz dostępność. Starszy zestaw QC pomaga w ocenie, ale nie potwierdza dzisiejszej oferty sprzedawcy.", link: "Otwórz szczegóły produktu" },
      ],
      matrixLabel: "Narzędzie a wniosek",
      matrixTitle: "Wiedz, co może potwierdzić każdy sygnał.",
      matrixDeck: "To rozróżnienie zapobiega myleniu przydatnego narzędzia badawczego z gwarancją produktu.",
      matrix: [
        { label: "ZDJĘCIA QC", title: "Przydatne do oceny widocznego stanu", body: "Mogą pokazać kształt, szwy, położenie nadruku, okucia i wymiary sfotografowanego produktu.", note: "Nie gwarantują innej sztuki ani późniejszej partii." },
        { label: "FILM QC", title: "Przydatny do oceny ruchu", body: "Film może ujawnić układanie się tkaniny, pracę zamka, ugięcie podeszwy i kąty ukryte na zdjęciach.", note: "Nie potwierdza trwałości ani wewnętrznego stanu elektroniki." },
        { label: "ROZPOZNAWANIE OBRAZU", title: "Przydatne do znajdowania kandydatów", body: "Podobny obraz może pomóc znaleźć powiązane oferty, gdy oryginalny link jest niepełny lub go brakuje.", note: "Nie zastępuje dopasowania sprzedawcy i ID produktu." },
        { label: "STRONA PRODUKTU NA ŻYWO", title: "Przydatna do aktualnych faktów", body: "Na stronie docelowej trzeba ponownie sprawdzić cenę, dostępne opcje, dane sprzedawcy i stan magazynowy.", note: "Nadal nie gwarantuje, że każda otrzymana sztuka odpowiada starszej próbce." },
      ],
      checklistLabel: "Pięciowierszowy zapis decyzji",
      checklistTitle: "Zapisz to przed przejściem dalej.",
      checklist: [
        { lead: "Dopasowanie:", body: "dokładne, prawdopodobne lub tylko referencja wizualna." },
        { lead: "Dowody:", body: "które zdjęcia, filmy, kąty i pomiary były dostępne." },
        { lead: "Niewiadome:", body: "brakujące widoki, deklaracje materiału, rozmiar lub stan wewnętrzny." },
        { lead: "Kontrola na żywo:", body: "aktualne ID, cena, warianty i dostępność w CNBuy Sheet." },
        { lead: "Decyzja:", body: "zachowaj, porównaj inną ofertę lub poczekaj na więcej dowodów." },
      ],
      boundaryLabel: "Granica badania",
      boundaryTitle: "Odkrywanie poszerza wybór. QC zmniejsza niepewność. Oferta na żywo potwierdza aktualne fakty.",
      boundaryBody: "Sprawdzone oficjalne informacje: wyszukiwarka QC UUFinds, strona przeglądania QC, zastrzeżenie produktu, strony konta i publiczne informacje o aplikacji. Ta witryna nie zawiera wychodzących linków do UUFinds.",
      boundaryLink: "Przeczytaj pełny przewodnik zakupowy",
    },
  },
  "pt-br": {
    finds: {
      eyebrow: "Achados / pesquisa no UUFinds + 09 rotas diretas",
      title: ["Descubra amplamente.", "Relacione com precisão."],
      deck: "O UUFinds descreve publicamente tanto a descoberta de materiais de QC quanto páginas personalizadas que combinam itens, rotas de agentes de compras e conteúdo social. Use a descoberta para criar uma lista curta e preserve o link exato da fonte, para que uma imagem popular ou página compartilhada nunca seja confundida com prova de um anúncio específico.",
      evidenceLabel: "O que as páginas oficiais comprovam",
      evidenceTitle: "Um achado é o ponto de partida.",
      evidenceDeck: "As descrições públicas oficiais sustentam descoberta de produtos, tratamento de links, materiais de QC e páginas compartilháveis de itens. Elas não comprovam que todo item compartilhado tenha QC recente ou dados de vendedor inalterados.",
      evidenceCards: [
        { label: "PÁGINA COMPARTILHADA", title: "Útil para reunir possibilidades", body: "O UUFinds descreve páginas personalizadas que integram itens, agentes de compras e conteúdo social e podem ser compartilhadas por um único link.", note: "Salve o link original do item ou vendedor antes de pesquisar a qualidade." },
        { label: "LOCALIZADOR DE QC", title: "Útil depois da descoberta", body: "O localizador oficial de QC descreve fotos, vídeos e reconhecimento de imagem. A disponibilidade depende do material existente para o produto ou link.", note: "Um resultado visualmente parecido não é automaticamente o mesmo vendedor, variante ou lote." },
        { label: "ROTA DE CATEGORIA", title: "Útil quando você conhece apenas o tipo", body: "Comece por tênis, moletons, camisetas, jaquetas, calças, bonés, acessórios, camisas esportivas ou eletrônicos quando ainda não houver um link exato.", note: "Selecione dois ou três candidatos antes de comparar as evidências." },
        { label: "PRODUTO EXATO", title: "Útil para a relação final", body: "Abra uma página individual de detalhes no CNBuy Sheet e compare ID, imagens, preço e variantes com o item pesquisado.", note: "Use a página ativa para fatos atuais que um achado compartilhado não consegue preservar." },
      ],
      checklistLabel: "Uma rotina prática de descoberta",
      checklistTitle: "Transforme a navegação em uma lista curta rastreável.",
      checklist: [
        { lead: "Defina a intenção:", body: "inspiração, comparação de categoria ou verificação de um link exato." },
        { lead: "Preserve a fonte:", body: "guarde a URL completa e o identificador visível do vendedor ou item." },
        { lead: "Reduza o campo:", body: "compare categoria, modelo, material, faixa de preço e variantes visíveis." },
        { lead: "Pesquise as evidências:", body: "confira se existem fotos ou vídeos de QC relacionados e de quando são." },
        { lead: "Finalize ao vivo:", body: "confirme os dados de hoje na página exata do produto no CNBuy Sheet." },
      ],
      sourceLabel: "Limite das fontes / Revisado em 23 de julho de 2026",
      sourceBody: "As afirmações sobre funções desta página foram conferidas no localizador público de QC do UUFinds, na página de navegação de QC, na página de apresentação personalizada, no aviso de produto e nas informações do aplicativo. Os botões de categoria e compra continuam exclusivos do CNBuy Sheet.",
      categoryNotes: {
        Shoes: "Tênis e calçados", Hoodies: "Suéteres e moletons", "T-Shirts": "Camisetas e tops", Jackets: "Casacos e agasalhos",
        Pants: "Calças e shorts", Headwear: "Bonés e chapéus", Accessories: "Bolsas, carteiras e mais", Jersey: "Camisas e roupas de time", Electronics: "Tecnologia e acessórios",
      },
    },
    how: {
      eyebrow: "Como funciona / Fatos verificados em 23 de julho de 2026",
      title: ["Relacione o link.", "Leia as evidências.", "Confirme o que mudou."],
      deck: "O UUFinds descreve publicamente um localizador de QC para fotos e vídeos, reconhecimento de imagem e tratamento de links do Taobao, Weidian, 1688 e agentes de compras. Essas ferramentas ajudam na pesquisa, mas o anúncio exato e ativo ainda determina preço atual, variantes e disponibilidade.",
      factsLabel: "Funções verificadas do UUFinds",
      facts: [
        { title: "Materiais de QC", body: "O UUFinds afirma que seu localizador pode exibir fotos e vídeos disponíveis de produtos." },
        { title: "Entradas compatíveis", body: "As informações públicas do aplicativo citam 1688, Taobao, Weidian e conversão de links de agentes de compras." },
        { title: "Limite da plataforma", body: "O UUFinds declara que não vende produtos direta nem indiretamente." },
      ],
      workflow: [
        { label: "RELACIONE", title: "Preserve a fonte exata", body: "Guarde o link completo do marketplace ou agente. Compare ID do item, vendedor e variante visível antes de tratar um álbum como correspondente. O reconhecimento pode encontrar algo parecido, mas semelhança por si só não comprova o mesmo anúncio ou lote.", link: "Monte uma lista curta por categoria" },
        { label: "INSPECIONE", title: "Leia todos os ângulos disponíveis", body: "Comece por silhueta e proporção; depois analise construção, acabamento e medidas. Registre a data do QC e se existe mais de um exemplo. Marque ângulos ausentes como desconhecidos, sem transformá-los em suposições.", link: "Use o checklist completo de QC" },
        { label: "CONFIRME", title: "Confira os dados atuais do anúncio", body: "Abra a página exata do produto no CNBuy Sheet e verifique novamente identificador, preço atual, variantes, tamanhos e disponibilidade. Um conjunto antigo de QC ajuda na decisão, mas não confirma o que o vendedor oferece hoje.", link: "Abra os detalhes do produto" },
      ],
      matrixLabel: "Ferramenta versus conclusão",
      matrixTitle: "Saiba o que cada sinal pode comprovar.",
      matrixDeck: "Essa distinção evita que uma ferramenta útil de pesquisa seja confundida com garantia do produto.",
      matrix: [
        { label: "FOTOS DE QC", title: "Úteis para a condição visível", body: "Podem mostrar formato, costuras, posição da estampa, ferragens e medidas do item fotografado.", note: "Não garantem outra unidade nem um lote posterior." },
        { label: "VÍDEO DE QC", title: "Útil para movimento", body: "O vídeo pode revelar caimento do tecido, movimento do zíper, flexão da sola e ângulos escondidos em fotos.", note: "Não comprova durabilidade nem condição interna de eletrônicos." },
        { label: "RECONHECIMENTO DE IMAGEM", title: "Útil para encontrar candidatos", body: "Uma imagem semelhante pode localizar anúncios relacionados quando o link original está ausente ou incompleto.", note: "Não substitui a relação entre vendedor e ID do item." },
        { label: "PÁGINA ATIVA DO PRODUTO", title: "Útil para fatos atuais", body: "É na página de destino que preço, opções, dados do vendedor e estoque precisam ser conferidos novamente.", note: "Ainda assim, ela não promete que toda unidade recebida corresponderá a uma amostra antiga." },
      ],
      checklistLabel: "Registro da decisão em cinco linhas",
      checklistTitle: "Anote isto antes de continuar.",
      checklist: [
        { lead: "Relação:", body: "exata, provável ou apenas referência visual." },
        { lead: "Evidências:", body: "quais fotos, vídeos, ângulos e medidas estavam disponíveis." },
        { lead: "Desconhecidos:", body: "vistas ausentes, alegações de material, tamanho ou condição interna." },
        { lead: "Verificação ao vivo:", body: "ID, preço, variantes e disponibilidade atuais no CNBuy Sheet." },
        { lead: "Decisão:", body: "manter, comparar outro anúncio ou aguardar mais evidências." },
      ],
      boundaryLabel: "Limite da pesquisa",
      boundaryTitle: "A descoberta amplia as opções. O QC reduz a incerteza. O anúncio ativo confirma os fatos atuais.",
      boundaryBody: "Afirmações oficiais revisadas: localizador de QC do UUFinds, página de navegação de QC, aviso de produto, páginas de conta e informações públicas do aplicativo. Este site não inclui nenhum link de saída para o UUFinds.",
      boundaryLink: "Leia o guia de compras completo",
    },
  },
};
