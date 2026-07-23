import type { ParityLocale } from "./localized-hub-copy";

export type LocalizedGuideSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

type QCCopy = {
  label: string;
  title: string;
  description: string;
  updated: string;
  readTime: string;
  editorial: string;
  onThisPage: string;
  sourceLabel: string;
  sourceNote: string;
  intro: string[];
  sections: LocalizedGuideSection[];
};

export const localizedQCCopy: Record<Exclude<ParityLocale, "en-gb">, QCCopy> = {
  de: {
    label: "QC-METHODE",
    title: "Eine praktische UUFinds-QC-Checkliste, bevor du einen Produktlink speicherst",
    description: "Ein faktengeprüfter Praxisleitfaden zum Zuordnen von UUFinds-QC-Fotos und -Videos zum exakten Angebot, zum Lesen der Belege und zum Festhalten dessen, was noch geprüft werden muss.",
    updated: "23. Juli 2026",
    readTime: "11 Min. Lesezeit",
    editorial: "Evidenzbasierte Redaktion",
    onThisPage: "AUF DIESER SEITE",
    sourceLabel: "Hinweise zu Primärquellen",
    sourceNote: "Für diesen QC-Leitfaden wurden die Funktionsangaben am 23. Juli 2026 mit dem öffentlichen UUFinds-QC-Finder, der QC-Übersicht, Produktdetailseiten und der aktuellen App-Store-Auflistung von Uufinds Limited abgeglichen. Diese Quellen stützen die Suche nach QC-Fotos und -Videos, die Verarbeitung von Links chinesischer Marktplätze und Agenten sowie Aussagen zur Bildsuche. Sie versprechen weder aktuelle QC-Medien für jedes Angebot noch die Identität eines fotografierten und eines späteren Artikels.",
    intro: [
      "Der öffentliche QC-Finder von UUFinds gibt an, QC-Fotos und QC-Videos auffindbar zu machen und Bilderkennung zu unterstützen. Die QC-Übersicht beschreibt Zugriff auf QC-Fotos für Produkte chinesischer Marktplätze wie Taobao und 1688; öffentliche Produktdetailseiten zeigen Artikelinformationen zusammen mit QC-Material. Die öffentliche App-Auflistung von Uufinds Limited nennt außerdem die Umwandlung von 1688-, Taobao-, Weidian- und Einkaufsagenten-Links sowie Bildsuche. Das sind nützliche Recherchefunktionen, doch keine davon macht aus einem Fotoalbum eine Garantie.",
      "Ein QC-Finder ist am nützlichsten, wenn er dich aus den richtigen Gründen bremst. Er kann Warehouse-Fotos oder Videos zu einem Produktlink zeigen, aber nicht für dich entscheiden. Die entscheidende Frage lautet nicht nur „sieht das gut aus?“, sondern „passen die vorhandenen Belege exakt zu dem Angebot, der Variante und den Details, die ich erwäge?“",
      "Dieser unabhängige Ratgeber leitet Käufer nicht zu UUFinds weiter. Er nutzt die oben geprüften öffentlichen Informationen, um die Methode zu erklären, und hält sämtliche Einkaufs-, Produkt- und Kategoriewege bei CNBuy Sheet.",
    ],
    sections: [
      {
        heading: "Was UUFinds öffentlich bestätigt",
        paragraphs: [
          "Die offizielle Website beschreibt UUFinds durchgehend als Entdeckungs- und Informationsschicht, nicht als Verkäufer. Der QC-Finder bewirbt Fotos, Videos und Bilderkennung; die gesonderte QC-Übersicht nennt chinesische Marktplätze; Produktdetailseiten verbinden QC-Material mit Artikelinformationen. Daraus ergibt sich ein praktischer Einsatz: visuelle Belege zu einem Produkt finden und prüfen, bevor eine Einkaufsseite geöffnet wird.",
          "Die wichtige Grenze ist ebenso faktisch. Die öffentlichen UUFinds-Produktseiten erklären, dass die Plattform Produkte weder direkt noch indirekt verkauft. Ein QC-Album hilft daher beim Vergleich; Kaufbedingungen, aktuelle Varianten, Verkäuferdaten, Bestand und die endgültige Produktentscheidung gehören weiterhin zur Live-Zielseite und zum Dienst, über den die Bestellung erfolgt.",
        ],
        points: [
          "Kernergebnis: verfügbare QC-Fotos und QC-Videos",
          "Sucheingabe: Marketplace-, Produkt- oder Einkaufsagenten-Links sowie Bildsuche",
          "Rechercheumfang: Produktentdeckung und visueller Vergleich",
          "Nicht belegt: Garantie für Qualität, Bestand, Größe oder Chargenkonsistenz",
        ],
      },
      {
        heading: "Bestätige, dass du dasselbe Angebot ansiehst",
        paragraphs: [
          "Beginne mit dem Quellenlink. Ein ähnlicher Titel oder ein ähnliches Vorschaubild genügt nicht. Vergleiche Verkäufer, Artikel-ID, ausgewählte Farbe und Größe, soweit sichtbar. Verkäufer können Bilder in mehreren Angeboten wiederverwenden, und optisch ähnliche Produkte können aus unterschiedlichen Chargen stammen. Kannst du keine plausible Zuordnung herstellen, behandle das QC-Album als Referenzmaterial und nicht als Beleg für deinen exakten Artikel.",
          "Prüfe außerdem Datum und Anzahl der Beispiele. Mehrere aktuelle Bilder können zeigen, ob Details zwischen einzelnen Artikeln weitgehend stabil bleiben. Ein altes Foto kann noch nützlich sein, wiegt aber weniger als mehrere eindeutig zugeordnete Beispiele.",
        ],
        points: [
          "Exakte Zuordnung: Quellenlink oder Artikel-ID, Verkäufer und sichtbare Variante stimmen überein",
          "Wahrscheinliche Zuordnung: Artikel stimmt, aber ein wichtiges Feld fehlt",
          "Nur Referenz: Vorschaubild ist ähnlich, Verkäufer oder Artikel-ID lassen sich nicht bestätigen",
        ],
      },
      {
        heading: "Lies zuerst die Gesamtform, bevor du Details vergrößerst",
        paragraphs: [
          "Achte zuerst auf Proportion, Silhouette und Symmetrie. Bei Schuhen vergleichst du Zehenform, Absatzhöhe, Abstand der Flächen und den Übergang von Obermaterial zu Sohle. Bei Kleidung prüfst du Körperweite, Ärmellänge, Schulterform und Stofffall. Bei Taschen oder Accessoires vergleichst du Umriss, Griffposition und Lage der Beschläge.",
          "Diese Gesamtansicht ist wichtig, weil ein sauber gedrucktes Etikett eine falsche Form nicht ausgleicht. Wirkt die Grundstruktur falsch, notiere das, bevor du Zeit mit winzigen Details verbringst.",
        ],
        points: [
          "Vorder-, Rück- und Seitenansicht passen zueinander",
          "Linke und rechte Seite wirken angemessen symmetrisch",
          "Proportionen stimmen mit Produktbeschreibung und Größe überein",
          "Nichts wirkt zerdrückt, verdreht oder durch den Kamerawinkel verborgen",
        ],
      },
      {
        heading: "Konstruktion und Verarbeitung prüfen",
        paragraphs: [
          "Arbeite dich von großen zu kleinen Merkmalen vor: Nahtverläufe, Stichdichte, Druckausrichtung, Stickkanten, Reißverschlüsse, Knöpfe, Ösen und befestigte Beschläge. Suche nach sichtbaren Unstimmigkeiten, nicht nach einem Beweis vollkommener Perfektion durch eine Warehouse-Kamera. Ungleiches Licht kann Farben verändern und Perspektive Maße verzerren. Vergleiche mehrere Winkel, bevor du etwas als Fehler bezeichnest.",
          "Bei bedruckten oder gemusterten Artikeln prüfst du, ob Hauptelemente zentriert sind und wiederholte Motive an sichtbaren Nähten zusammenpassen. Bei Schuhen prüfst du Klebespuren, Panelkanten und Sohlenlage. Bei Elektronik ist reine visuelle QC begrenzt: Das Aussehen belegt weder Akkuzustand noch interne Spezifikationen oder elektrische Sicherheit.",
        ],
      },
      {
        heading: "Maße als Beleg verwenden, nicht als Dekoration",
        paragraphs: [
          "Wenn ein Lineal oder Messfoto vorhanden ist, vergleiche es mit der Größentabelle des Verkäufers und mit einem Artikel, den du bereits besitzt. Größenetiketten sind kein universelles System. Brustweite, Länge, Schulterbreite, Ärmellänge und Taillenmaß sind nützlicher als Buchstaben wie M oder L.",
          "Berücksichtige die Lage des Artikels. Gefaltete, gedehnte oder schräg fotografierte Kleidung kann eine irreführende Zahl zeigen. Fehlt ein wichtiges Maß, ist das ein Grund für Rückfragen und nicht für eine Schätzung.",
        ],
        points: [
          "Zentimeter vergleichen, nicht nur S/M/L",
          "Prüfen, wo das Lineal beginnt und ob der Stoff flach liegt",
          "Einen ähnlichen eigenen Artikel als Kontrollmaß verwenden",
          "Fehlende Maße als fehlende Belege behandeln",
        ],
      },
      {
        heading: "Video für Bewegung und Textur nutzen, wenn es vorhanden ist",
        paragraphs: [
          "Video kann Fragen beantworten, die ein Standbild offenlässt. Es kann zeigen, wie Stoff fällt, ein Reißverschluss läuft, eine Sohle nachgibt oder reflektierende und strukturierte Materialien auf Bewegung reagieren. Außerdem kann es Winkel sichtbar machen, die in einem sorgfältig gerahmten Foto fehlen. Sieh langsam zu und vergleiche dieselben Merkmale wie in der Foto-Checkliste, statt Bewegung an sich als Qualitätsbeweis zu werten.",
          "Auch Video hat Grenzen. Kompression kann feine Details verbergen, Licht die Farbe verändern, und ein kurzer Clip belegt keine langfristige Haltbarkeit. Bei Elektronik bestätigt ein Außenvideo weder interne Spezifikationen noch Akkuzustand oder elektrische Sicherheit. Nutze Video als weiteren Beleg und kehre für nicht visuell prüfbare Aussagen zur Produktbeschreibung und aktuellen Zielseite zurück.",
        ],
      },
      {
        heading: "Die Checkliste an den Produkttyp anpassen",
        paragraphs: [
          "Beginne mit Gesamtsilhouette und Proportion. Bei Schuhen vergleichst du Zehenform, Absatzhöhe, Panelabstände und den Übergang von Obermaterial zu Sohle. Bei Kleidung prüfst du Körperweite, Schulterlinie, Ärmellänge und Stofffall. Bei Taschen, Hüten und Accessoires vergleichst du Umriss, Griff- oder Riemenposition und auffällige Beschläge. Ist die Grundform falsch, sollte ein sauberes Etikett oder Nahfoto nicht davon ablenken.",
          "Bei bedruckten oder gemusterten Artikeln prüfst du Zentrierung und die Ausrichtung wiederholter Motive an offensichtlichen Nähten. Bei Schuhen prüfst du Klebespuren, Panelkanten und Sohlenlage. Bei Elektronik bleibt die visuelle QC begrenzt; das Aussehen bestätigt weder Akkuzustand noch interne Spezifikationen oder elektrische Sicherheit.",
        ],
        points: [
          "Schuhe: Zehenform, Links-rechts-Symmetrie, Panelkanten, Sohlenlage und Klebespuren",
          "Kleidung: gemessene Weite und Länge, Nahtverläufe, Druckposition, Bündchen und Stoffoberfläche",
          "Taschen und Accessoires: Umriss, Beschlagposition, Reißverschlusswege, Riemennähte und Innenansichten",
          "Elektronik: nur äußerer Zustand und enthaltenes Zubehör; der innere Zustand bleibt ungeprüft",
        ],
      },
      {
        heading: "Auf der aktuellen CNBuy-Sheet-Produktseite abschließen",
        paragraphs: [
          "Öffne nach der QC-Recherche die passende Kategorie oder das Produktziel und bestätige den aktuellen Zustand des Angebots. Preis, Verfügbarkeit, Farben, Größen und Verkäuferangaben können sich ändern. Die direkten CNBuy-Sheet-Wege dieser Website führen zu einer relevanten Kategorie, ersetzen aber nicht die abschließende Angebotsprüfung.",
          "Speichere den Link erst, wenn du erklären kannst, was die Fotos zeigen, was sie nicht zeigen und welche Details noch bestätigt werden müssen. Diese kurze Zusammenfassung ist nützlicher als ein vages grünes oder rotes Signal.",
        ],
        points: [
          "Aktuelle Produkt-ID und Verkäufer- oder Quellenlink bestätigen",
          "Angezeigten Preis, verfügbare Varianten und Größenangaben bestätigen",
          "Prüfen, ob die Live-Bilder noch den recherchierten Artikel beschreiben",
          "Für veränderliche Fakten die Live-Seite statt eines älteren QC-Albums verwenden",
        ],
      },
      {
        heading: "Ein nachvollziehbares Urteil schreiben statt nur „sieht gut aus“",
        paragraphs: [
          "Eine verlässliche Routine muss kurz genug zum Wiederholen sein. Speichere zuerst den exakten Quellen- oder Produktlink. Entscheide dann, ob du allgemein stöberst oder ein bestimmtes Angebot prüfst. Untersuche anschließend zugeordnetes QC-Material von Gesamtform bis Konstruktion und Maßen. Öffne danach die CNBuy-Sheet-Detailseite und bestätige aktuelle Fakten. Notiere zuletzt alles, was die Bilder nicht belegen: Größenunsicherheit, fehlende Winkel, Materialangaben oder wechselnde Verfügbarkeit.",
          "Zweck einer UUFinds-Spreadsheet-Suche ist nicht, die Seite mit den meisten Links zu finden. Du sollst ein Produkt erreichen, das sich identifizieren, vergleichen und prüfen lässt, ohne die Herkunft der Informationen zu verlieren. Kategoriestöbern erweitert die Auswahl, QC-Recherche reduziert Unsicherheit und die Live-Produktseite bestätigt das aktuelle Angebot. Getrennte Rollen ergeben einen klareren Einkaufsweg.",
        ],
        points: [
          "ZUORDNUNG — exakt, wahrscheinlich oder nur Referenz",
          "SICHTBARE BELEGE — Form, Konstruktion, Verarbeitung und Maße geprüft",
          "UNBEKANNT — fehlende Winkel, Materialangaben, innerer Zustand oder Größenunsicherheit",
          "LIVE-PRÜFUNG — aktuelle Produkt-ID, Preis und Varianten bei CNBuy Sheet bestätigt",
          "ENTSCHEIDUNG — behalten, Alternative vergleichen oder auf weitere Belege warten",
        ],
      },
    ],
  },
  pl: {
    label: "METODA QC",
    title: "Praktyczna lista kontrolna UUFinds QC przed zapisaniem linku produktu",
    description: "Sprawdzony pod kątem faktów przewodnik po dopasowaniu zdjęć i filmów QC z UUFinds do dokładnej oferty, odczytywaniu dowodów i zapisywaniu tego, co nadal wymaga weryfikacji.",
    updated: "23 lipca 2026",
    readTime: "11 min czytania",
    editorial: "Redakcja oparta na dowodach",
    onThisPage: "NA TEJ STRONIE",
    sourceLabel: "Uwagi o źródłach pierwotnych",
    sourceNote: "Na potrzeby tego przewodnika informacje o funkcjach sprawdzono 23 lipca 2026 na publicznej wyszukiwarce QC UUFinds, stronie przeglądania QC, stronach produktów oraz w aktualnej karcie App Store Uufinds Limited. Źródła te wspierają wyszukiwanie zdjęć i filmów QC, obsługę linków chińskich marketplace’ów i agentów oraz wyszukiwanie obrazem. Nie obiecują aktualnych materiałów QC dla każdej oferty ani identyczności sfotografowanej i późniejszej sztuki.",
    intro: [
      "Publiczna wyszukiwarka QC UUFinds deklaruje pomoc w odnajdywaniu zdjęć i filmów QC oraz obsługę rozpoznawania obrazu. Strona przeglądania QC opisuje dostęp do zdjęć produktów z chińskich marketplace’ów, takich jak Taobao i 1688, a publiczne strony szczegółów pokazują informacje o produkcie obok materiałów QC. Karta aplikacji Uufinds Limited wymienia też konwersję linków 1688, Taobao, Weidian i agentów zakupowych oraz wyszukiwanie obrazem. Są to przydatne funkcje badawcze, lecz żadna nie zamienia albumu w gwarancję.",
      "Wyszukiwarka QC jest najbardziej użyteczna, gdy spowalnia cię z właściwych powodów. Może pokazać zdjęcia lub film z magazynu powiązane z linkiem, ale nie podejmie decyzji. Dobre pytanie brzmi nie tylko „czy to wygląda dobrze?”, lecz „czy dostępne dowody pasują do dokładnej oferty, wariantu i szczegółów, które rozważam?”",
      "Ten niezależny przewodnik nie kieruje kupujących do UUFinds. Korzysta ze zweryfikowanych informacji publicznych, aby wyjaśnić metodę, a wszystkie trasy zakupowe, produktowe i kategoryjne prowadzi do CNBuy Sheet.",
    ],
    sections: [
      {
        heading: "Co UUFinds potwierdza publicznie",
        paragraphs: [
          "Oficjalna witryna konsekwentnie przedstawia UUFinds jako warstwę odkrywania i informacji, a nie sprzedawcę. Wyszukiwarka QC promuje zdjęcia, filmy i rozpoznawanie obrazu; osobna strona QC wymienia chińskie marketplace’y; strony produktów łączą materiał QC z informacjami o produkcie. Praktyczne zastosowanie jest jasne: znaleźć dowody wizualne powiązane z produktem i obejrzeć je przed otwarciem miejsca zakupu.",
          "Równie ważna jest granica. Publiczne strony produktów UUFinds stwierdzają, że platforma nie sprzedaje produktów bezpośrednio ani pośrednio. Album QC pomaga więc porównywać, ale warunki zakupu, aktualne warianty, dane sprzedawcy, stan magazynowy i ostateczna decyzja nadal należą do aktywnej strony docelowej i usługi obsługującej zamówienie.",
        ],
        points: [
          "Główny wynik: dostępne zdjęcia i filmy QC",
          "Dane wejściowe: link marketplace’u, produktu lub agenta oraz wyszukiwanie obrazem",
          "Zakres badania: odkrywanie produktów i porównanie wizualne",
          "Niepotwierdzone: gwarancja jakości, zapasu, rozmiaru lub spójności partii",
        ],
      },
      {
        heading: "Potwierdź, że oglądasz tę samą ofertę",
        paragraphs: [
          "Zacznij od linku źródłowego. Podobny tytuł lub miniatura nie wystarcza. Porównaj sprzedawcę, ID produktu, wybrany kolor i rozmiar, jeśli są widoczne. Sprzedawcy mogą powtarzać zdjęcia w wielu ofertach, a podobne produkty pochodzić z różnych partii. Jeśli nie da się ustanowić rozsądnego dopasowania, traktuj album jako materiał referencyjny, a nie dowód dotyczący dokładnego produktu.",
          "Sprawdź także datę i liczbę przykładów. Większy zestaw aktualnych zdjęć może pokazać, czy szczegóły pozostają spójne między sztukami. Jedno stare zdjęcie może pomagać, lecz ma mniejszą wagę niż kilka jasno dopasowanych przykładów.",
        ],
        points: [
          "Dopasowanie dokładne: link lub ID, sprzedawca i widoczny wariant są zgodne",
          "Dopasowanie prawdopodobne: produkt jest zgodny, ale brakuje jednego ważnego pola",
          "Tylko referencja: miniatura jest podobna, lecz sprzedawcy lub ID nie można potwierdzić",
        ],
      },
      {
        heading: "Najpierw oceń ogólny kształt, potem przybliżaj detale",
        paragraphs: [
          "Najpierw sprawdź proporcje, sylwetkę i symetrię. W obuwiu porównaj kształt noska, wysokość pięty, odstępy paneli i połączenie cholewki z podeszwą. W odzieży oceń szerokość korpusu, rękawy, ramiona i układanie tkaniny. W torbach i akcesoriach porównaj obrys, położenie uchwytów i okuć.",
          "Szeroki widok jest ważny, bo ostro wydrukowana etykieta nie naprawia złego kształtu. Jeśli struktura wygląda nieprawidłowo, zapisz to przed analizowaniem drobnych szczegółów.",
        ],
        points: [
          "Widok z przodu, tyłu i boku jest wzajemnie zgodny",
          "Lewa i prawa strona wyglądają rozsądnie symetrycznie",
          "Proporcje odpowiadają opisowi i rozmiarowi",
          "Nic nie jest zgniecione, skręcone ani ukryte kątem aparatu",
        ],
      },
      {
        heading: "Sprawdź konstrukcję i wykończenie",
        paragraphs: [
          "Przechodź od dużych cech do mniejszych: przebieg szwów, gęstość ściegów, położenie nadruku, krawędzie haftu, zamki, guziki, oczka i okucia. Szukasz widocznych niespójności, a nie dowodu doskonałości z kamery magazynowej. Nierówne światło zmienia kolor, a perspektywa może zniekształcić pomiary. Porównaj kilka kątów, zanim nazwiesz coś wadą.",
          "Przy nadrukach i wzorach sprawdź wycentrowanie oraz połączenie powtarzalnych motywów na widocznych szwach. W butach oceniaj ślady kleju, krawędzie paneli i ustawienie podeszwy. W elektronice wizualne QC ma ograniczenia: wygląd nie potwierdza baterii, specyfikacji wewnętrznej ani bezpieczeństwa elektrycznego.",
        ],
      },
      {
        heading: "Używaj pomiarów jako dowodu, nie dekoracji",
        paragraphs: [
          "Gdy widać linijkę lub zdjęcie pomiarowe, porównaj je z tabelą sprzedawcy i podobnym przedmiotem, który posiadasz. Metki odzieżowe nie są uniwersalnym systemem. Szerokość klatki, długość, ramiona, rękaw i talia są bardziej użyteczne niż litera M czy L.",
          "Uwzględnij sposób ułożenia produktu. Odzież złożona, rozciągnięta lub sfotografowana pod kątem może dać mylącą liczbę. Brak ważnego pomiaru to powód do wyjaśnienia, a nie zgadywania.",
        ],
        points: [
          "Porównuj centymetry, nie tylko etykietę S/M/L",
          "Sprawdź początek linijki i czy materiał leży płasko",
          "Użyj podobnego własnego przedmiotu jako pomiaru kontrolnego",
          "Brakujące pomiary traktuj jako brakujące dowody",
        ],
      },
      {
        heading: "Użyj filmu do oceny ruchu i tekstury, gdy jest dostępny",
        paragraphs: [
          "Film może odpowiedzieć na pytania, których nie rozstrzyga zdjęcie. Może pokazać układanie tkaniny, działanie zamka, ugięcie podeszwy albo reakcję odblaskowych i fakturowanych materiałów na ruch. Odsłania też kąty ukryte w starannie skadrowanym zdjęciu. Oglądaj powoli i porównuj te same cechy co na liście zdjęć, zamiast traktować sam ruch jako dowód jakości.",
          "Film także ma granice. Kompresja ukrywa detale, oświetlenie zmienia kolor, a krótki klip nie dowodzi trwałości. Zewnętrzny film elektroniki nie potwierdza specyfikacji, kondycji baterii ani bezpieczeństwa. Traktuj go jako kolejny dowód, a po niewidoczne fakty wróć do opisu i aktualnej strony docelowej.",
        ],
      },
      {
        heading: "Dopasuj listę kontrolną do rodzaju produktu",
        paragraphs: [
          "Zacznij od sylwetki i proporcji. W obuwiu porównaj nosek, piętę, odstępy paneli i połączenie cholewki z podeszwą. W odzieży oceń szerokość, ramiona, rękawy i układanie tkaniny. W torbach, czapkach i akcesoriach porównaj obrys, położenie uchwytów lub pasków i widocznych okuć. Gdy podstawowy kształt jest zły, czysta etykieta lub zbliżenie nie powinny odwracać uwagi.",
          "Przy nadrukach i wzorach sprawdź wycentrowanie oraz połączenie motywów na oczywistych szwach. W butach oceń klej, krawędzie paneli i podeszwę. W elektronice wizualne QC pozostaje ograniczone; wygląd nie potwierdza baterii, specyfikacji ani bezpieczeństwa.",
        ],
        points: [
          "Buty: kształt noska, symetria, krawędzie paneli, ustawienie podeszwy i ślady kleju",
          "Odzież: zmierzona szerokość i długość, szwy, położenie nadruku, mankiety i powierzchnia tkaniny",
          "Torby i akcesoria: obrys, okucia, tory zamków, szwy pasków i widok wnętrza",
          "Elektronika: tylko stan zewnętrzny i dołączone akcesoria; wnętrze pozostaje niezweryfikowane",
        ],
      },
      {
        heading: "Zakończ na aktywnej stronie produktu CNBuy Sheet",
        paragraphs: [
          "Po badaniu QC otwórz dopasowaną kategorię lub produkt i potwierdź bieżący stan oferty. Cena, dostępność, kolory, rozmiary i dane sprzedawcy mogą się zmieniać. Bezpośrednie ścieżki CNBuy Sheet na tej stronie prowadzą do odpowiedniej kategorii, ale nie zastępują końcowej kontroli oferty.",
          "Zapisz link dopiero wtedy, gdy umiesz wyjaśnić, co zdjęcia pokazały, czego nie pokazały i co nadal wymaga potwierdzenia. Takie krótkie podsumowanie jest bardziej użyteczne niż ogólna zielona lub czerwona ocena.",
        ],
        points: [
          "Potwierdź aktualne ID i link sprzedawcy lub źródła",
          "Potwierdź widoczną cenę, warianty i informacje o rozmiarach",
          "Sprawdź, czy aktualne obrazy nadal opisują badany produkt",
          "Dla zmiennych faktów używaj strony na żywo, a nie starego albumu QC",
        ],
      },
      {
        heading: "Napisz możliwy do prześledzenia werdykt zamiast „wygląda dobrze”",
        paragraphs: [
          "Dobra procedura musi być na tyle krótka, by ją powtarzać. Najpierw zapisz dokładny link źródłowy lub produktowy. Potem zdecyduj, czy przeglądasz szeroko, czy weryfikujesz konkretną ofertę. Oceń dopasowane QC od ogólnego kształtu po konstrukcję i pomiary. Otwórz szczegóły CNBuy Sheet i potwierdź bieżące fakty. Na końcu zapisz wszystko, czego obrazy nie wykazały: rozmiar, brakujące kąty, materiał lub zmieniającą się dostępność.",
          "Celem wyszukiwania UUFinds spreadsheet nie jest znalezienie strony z największą liczbą linków. Chodzi o produkt, który można zidentyfikować, porównać i zweryfikować bez utraty źródła informacji. Kategorie poszerzają wybór, QC zmniejsza niepewność, a strona na żywo potwierdza stan obecny. Rozdzielenie tych ról daje klarowniejszą drogę.",
        ],
        points: [
          "DOPASOWANIE — dokładne, prawdopodobne lub tylko referencja",
          "WIDOCZNE DOWODY — sprawdzono kształt, konstrukcję, wykończenie i wymiary",
          "NIEWIADOME — brakujące kąty, materiał, stan wewnętrzny lub rozmiar",
          "KONTROLA NA ŻYWO — aktualne ID, cena i warianty potwierdzone w CNBuy Sheet",
          "DECYZJA — zachowaj, porównaj alternatywę lub poczekaj na więcej dowodów",
        ],
      },
    ],
  },
  "pt-br": {
    label: "MÉTODO DE QC",
    title: "Um checklist prático de QC no UUFinds antes de salvar um link",
    description: "Um guia de campo verificado para relacionar fotos e vídeos de QC do UUFinds ao anúncio exato, ler as evidências e registrar o que ainda precisa ser confirmado.",
    updated: "23 de julho de 2026",
    readTime: "11 min de leitura",
    editorial: "Editorial baseado em evidências",
    onThisPage: "NESTA PÁGINA",
    sourceLabel: "Notas sobre fontes primárias",
    sourceNote: "Para este guia, as afirmações sobre funções foram conferidas em 23 de julho de 2026 no localizador público de QC do UUFinds, na página de navegação de QC, nas páginas de produtos e na listagem atual da Uufinds Limited na App Store. Essas fontes sustentam descoberta de fotos e vídeos de QC, tratamento de links de marketplaces chineses e agentes, e busca por imagem. Elas não prometem QC recente para todo anúncio nem que um item fotografado será idêntico a outro posterior.",
    intro: [
      "O localizador público de QC do UUFinds afirma ajudar usuários a encontrar fotos e vídeos de QC e oferecer reconhecimento de imagem. A página de navegação descreve acesso a fotos de produtos de marketplaces chineses como Taobao e 1688, enquanto páginas públicas de detalhes exibem informações do item ao lado do QC. A listagem da Uufinds Limited também cita conversão de links do 1688, Taobao, Weidian e agentes, além de busca por imagem. São funções úteis de pesquisa, mas nenhuma transforma um álbum em garantia.",
      "Um localizador de QC é mais útil quando faz você desacelerar pelos motivos certos. Ele pode mostrar fotos ou vídeos de armazém ligados a um produto, mas não decide por você. A pergunta útil não é apenas “parece bom?”, e sim “as evidências disponíveis correspondem ao anúncio, à variante e aos detalhes exatos que estou considerando?”",
      "Este guia independente não envia compradores ao UUFinds. Ele usa as informações públicas verificadas acima para explicar o método e mantém todas as rotas de compra, produto e categoria direcionadas ao CNBuy Sheet.",
    ],
    sections: [
      {
        heading: "O que o UUFinds confirma publicamente",
        paragraphs: [
          "O site oficial apresenta o UUFinds de modo consistente como camada de descoberta e informação, não como vendedor. O localizador promove fotos, vídeos e reconhecimento; a navegação de QC cita marketplaces chineses; e páginas de produtos mostram QC junto às informações do item. Isso sustenta um uso prático: localizar evidências visuais ligadas a um produto e inspecioná-las antes de abrir o destino de compras.",
          "O limite importante também é factual. As páginas públicas do UUFinds dizem que a plataforma não vende produtos direta nem indiretamente. Um álbum ajuda na comparação, mas condições de compra, variantes atuais, dados do vendedor, estoque e decisão final continuam pertencendo à página ativa e ao serviço usado para fazer o pedido.",
        ],
        points: [
          "Resultado principal: fotos e vídeos de QC disponíveis",
          "Entrada: links de marketplace, produto ou agente, além de busca por imagem",
          "Escopo: descoberta de produtos e comparação visual",
          "Não comprovado: garantia de qualidade, estoque, tamanho ou consistência de lote",
        ],
      },
      {
        heading: "Confirme que você está vendo o mesmo anúncio",
        paragraphs: [
          "Comece pelo link de origem. Título ou miniatura semelhante não é suficiente. Compare vendedor, identificador, cor e tamanho selecionados quando esses dados estiverem visíveis. Vendedores podem reutilizar imagens, e produtos parecidos podem vir de lotes diferentes. Se não for possível estabelecer uma relação razoável, trate o álbum como referência, e não como prova do item exato.",
          "Confira também a data e o número de exemplos. Um conjunto maior de imagens recentes pode mostrar se os detalhes permanecem consistentes entre unidades. Uma foto antiga ainda pode ajudar, mas pesa menos que vários exemplos claramente relacionados.",
        ],
        points: [
          "Relação exata: link ou ID, vendedor e variante visível coincidem",
          "Relação provável: o item coincide, mas falta um campo importante",
          "Apenas referência: a miniatura é semelhante, mas vendedor ou ID não podem ser confirmados",
        ],
      },
      {
        heading: "Leia o formato geral antes de ampliar os detalhes",
        paragraphs: [
          "Observe primeiro proporção, silhueta e simetria. Em calçados, compare bico, altura do calcanhar, espaçamento dos painéis e união entre cabedal e sola. Em roupas, confira largura, manga, ombros e caimento. Em bolsas e acessórios, compare contorno, posição das alças e ferragens.",
          "Essa visão ampla importa porque uma etiqueta nítida não corrige um formato errado. Se a estrutura geral parecer incorreta, registre isso antes de gastar tempo com detalhes pequenos.",
        ],
        points: [
          "Vistas frontal, traseira e lateral concordam entre si",
          "Lados esquerdo e direito parecem razoavelmente simétricos",
          "As proporções correspondem à descrição e ao tamanho",
          "Nada parece amassado, torcido ou escondido pelo ângulo da câmera",
        ],
      },
      {
        heading: "Inspecione construção e acabamento",
        paragraphs: [
          "Passe das características grandes às menores: trajetos de costura, densidade dos pontos, alinhamento de estampas, bordas do bordado, zíperes, botões, ilhoses e ferragens. Procure inconsistências visíveis, não uma prova de perfeição pela câmera do armazém. Luz desigual altera cores e perspectiva distorce medidas. Compare vários ângulos antes de chamar algo de defeito.",
          "Em peças estampadas, confira centralização e alinhamento de motivos repetidos nas costuras. Em calçados, examine cola, bordas de painéis e sola. Em eletrônicos, QC visual é limitado: aparência não comprova bateria, especificações internas nem segurança elétrica.",
        ],
      },
      {
        heading: "Use medidas como evidência, não decoração",
        paragraphs: [
          "Quando houver régua ou foto de medição, compare com a tabela do vendedor e com um item semelhante que você possui. Etiquetas não são um sistema universal. Largura do peito, comprimento, ombros, mangas e cintura são mais úteis que letras como M ou L.",
          "Considere como o item está colocado. Uma roupa dobrada, esticada ou fotografada em ângulo pode gerar número enganoso. Se falta uma medida importante, isso pede esclarecimento, não adivinhação.",
        ],
        points: [
          "Compare centímetros, não apenas a etiqueta S/M/L",
          "Confira onde a régua começa e se o tecido está plano",
          "Use um item semelhante seu como medida de controle",
          "Trate medidas ausentes como evidências ausentes",
        ],
      },
      {
        heading: "Use vídeo para movimento e textura, quando existir",
        paragraphs: [
          "O vídeo responde perguntas que uma imagem estática não responde. Pode mostrar como o tecido dobra, o zíper corre, a sola flexiona ou materiais refletivos e texturizados reagem ao movimento. Também revela ângulos escondidos por uma foto bem enquadrada. Assista devagar e compare as mesmas características da lista de fotos, sem tratar o movimento em si como prova de qualidade.",
          "O vídeo também tem limites. Compressão esconde detalhes, iluminação altera cor e um clipe curto não comprova durabilidade. Em eletrônicos, vídeo externo não verifica especificações internas, saúde da bateria ou segurança. Use-o como mais uma evidência e volte à descrição e à página atual para afirmações que o visual não confirma.",
        ],
      },
      {
        heading: "Ajuste o checklist ao tipo de produto",
        paragraphs: [
          "Comece por silhueta e proporção. Em calçados, compare bico, calcanhar, espaçamento dos painéis e união entre cabedal e sola. Em roupas, observe largura, ombros, mangas e caimento. Em bolsas, bonés e acessórios, compare contorno, posição de alça ou tira e ferragens visíveis. Se o formato básico estiver errado, etiqueta limpa ou close nítido não deve distrair.",
          "Em estampas e padrões, confira centralização e encontro dos motivos nas costuras. Em calçados, veja cola, bordas e alinhamento da sola. Em eletrônicos, QC visual continua limitado; aparência não confirma bateria, especificações ou segurança.",
        ],
        points: [
          "Calçados: formato do bico, simetria, bordas, alinhamento da sola e marcas de cola",
          "Roupas: largura e comprimento medidos, costuras, posição da estampa, punhos e tecido",
          "Bolsas e acessórios: contorno, ferragens, trilhos de zíper, costura das alças e interior",
          "Eletrônicos: apenas condição externa e acessórios incluídos; o interior permanece não verificado",
        ],
      },
      {
        heading: "Finalize na página ativa do produto no CNBuy Sheet",
        paragraphs: [
          "Depois da pesquisa de QC, abra a categoria ou produto correspondente e confirme o estado atual do anúncio. Preço, disponibilidade, cores, tamanhos e vendedor podem mudar. As rotas diretas do CNBuy Sheet neste site levam a uma categoria relevante, mas não substituem a verificação final.",
          "Salve o link somente depois de explicar o que as fotos mostraram, o que não mostraram e quais detalhes ainda precisam de confirmação. Esse resumo é mais útil que um rótulo vago de aprovação ou rejeição.",
        ],
        points: [
          "Confirme ID atual e link do vendedor ou fonte",
          "Confirme preço exibido, variantes e informações de tamanho",
          "Veja se as imagens ativas ainda descrevem o item pesquisado",
          "Para fatos mutáveis, use a página ativa, não um álbum antigo",
        ],
      },
      {
        heading: "Escreva um veredito rastreável em vez de apenas “parece bom”",
        paragraphs: [
          "Uma rotina confiável deve ser curta o bastante para repetir. Primeiro salve o link exato. Depois defina se está navegando amplamente ou verificando um anúncio. Inspecione o QC relacionado do formato à construção e medidas. Abra os detalhes no CNBuy Sheet e confirme fatos atuais. Por fim, registre o que as imagens não estabeleceram: tamanho, ângulos ausentes, material ou disponibilidade variável.",
          "O objetivo de buscar uma planilha UUFinds não é achar a página com mais links. É chegar a um produto identificável, comparável e verificável sem perder a origem das informações. Categorias ampliam opções, QC reduz incerteza e a página ativa confirma o que existe agora. Manter essas funções separadas cria uma rota mais clara.",
        ],
        points: [
          "RELAÇÃO — exata, provável ou apenas referência",
          "EVIDÊNCIA VISÍVEL — formato, construção, acabamento e medidas verificados",
          "DESCONHECIDO — ângulos ausentes, material, condição interna ou tamanho",
          "VERIFICAÇÃO AO VIVO — ID, preço e variantes atuais confirmados no CNBuy Sheet",
          "DECISÃO — manter, comparar alternativa ou aguardar mais evidências",
        ],
      },
    ],
  },
};
