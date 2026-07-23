export type LocalizedRouteLocale = "en-gb" | "de" | "pl" | "pt-br";

type GuideCopy = {
  title: string;
  description: string;
  sectionTitle: string;
  paragraphs: [string, string];
};

type RouteCopy = {
  categories: Record<string, string>;
  inspections: Record<string, string>;
  guides: Record<string, GuideCopy>;
};

export const localizedRouteCopy: Record<Exclude<LocalizedRouteLocale, "en-gb">, RouteCopy> = {
  de: {
    categories: {
      Shoes: "Schuhe",
      Hoodies: "Hoodies",
      "T-Shirts": "T-Shirts",
      Jackets: "Jacken",
      Pants: "Hosen",
      Headwear: "Kopfbedeckungen",
      Accessories: "Accessoires",
      Electronics: "Elektronik",
    },
    inspections: {
      "hoka-speedgoat-5-trail-running-shoes":
        "Form des Obermaterials, Sohlenprofil, Fersenkonstruktion, Seitenflächen und sichtbare Nähte",
      "maison-margiela-hoodie":
        "Stoffstruktur, Kapuzenform, Position des Drucks, Bündchen, Saum und Ausrichtung der Nähte",
      "louis-vuitton-tee":
        "Kragenform, Position des Motivs, Stoffoberfläche, Ärmellänge und Saumnaht",
      "celine-coat":
        "Gesamtsilhouette, Verschlüsse, Futter, Taschen, Bündchen und Verarbeitung der Nähte",
      "hello-kitty-plush-pants":
        "Flor des Materials, Klarheit des Motivs, Bund, Beinproportionen und Verarbeitung der Innennaht",
      "era-hats":
        "Form der Krone, Stickerei, Rundung des Schirms, Innenband und Verstellmechanismus",
      "nike-elite-backpack":
        "Reißverschlüsse, Nähte der Träger, Taschenaufteilung, Ausrichtung der Flächen und Innenraum",
      "samsung-galaxy-watch8":
        "Display, Gehäuse, Tasten, Bandanschluss, Ladezubehör und Inhalt der Verpackung",
    },
    guides: {
      "uufinds-spreadsheet-shopping-guide-2026": {
        title: "UUFinds-Spreadsheet-Ratgeber 2026: von der QC-Recherche zu besseren Produktfunden",
        description:
          "Ein praktischer, evidenzbasierter Weg von der UUFinds-QC-Recherche über Kategorien bis zur exakten Produktseite bei CNBuy Sheet.",
        sectionTitle: "Recherche und Prüfung sauber trennen",
        paragraphs: [
          "Entscheide zuerst, ob du nur eine Produktart suchst oder bereits einen konkreten Link hast. Bei einer allgemeinen Suche ist eine Kategorie der richtige Ausgangspunkt. Bei einer bestimmten Quelle solltest du URL, Artikelnummer, Verkäufer und Variante beibehalten, damit vorhandenes QC-Material tatsächlich dem vorgesehenen Angebot zugeordnet werden kann.",
          "Ein Spreadsheet hilft beim Entdecken und Sortieren, ist aber kein Qualitätsnachweis. Öffne deshalb jede interessante Detailseite, vergleiche aktuelle Angaben und nutze Bilder oder Videos nur als Beleg für den jeweils gezeigten Artikel. Preis, Bestand, Varianten und Verkäuferinformationen müssen am Ende auf der aktuellen Zielseite geprüft werden.",
        ],
      },
      "uufinds-qc-checklist": {
        title: "Praktische UUFinds-QC-Checkliste vor dem Speichern eines Produktlinks",
        description:
          "Ein praxisnaher Leitfaden zum Zuordnen von UUFinds-QC-Fotos und -Videos, zum Lesen sichtbarer Hinweise und zum Festhalten offener Fragen.",
        sectionTitle: "QC-Material richtig zuordnen",
        paragraphs: [
          "Beginne immer mit dem ursprünglichen Produktlink. Ein ähnlicher Titel oder dasselbe Katalogbild reicht nicht aus. Vergleiche Verkäufer, Artikelnummer, Farbe und ausgewählte Variante, bevor du ein Fotoalbum als Beleg für genau dieses Angebot behandelst.",
          "Prüfe danach Form, Proportionen, Nähte, Druckposition, Beschläge und sichtbare Maße aus mehreren Blickwinkeln. Fehlende Ansichten sind kein Grund zu raten: Notiere sie als offene Punkte. Ein QC-Foto dokumentiert einen Artikel oder eine Charge, aber keine garantierte Eigenschaft jeder späteren Bestellung.",
        ],
      },
      "how-to-use-uufinds": {
        title: "UUFinds verwenden und anschließend bei CNBuy Sheet weitersuchen",
        description:
          "Ein klarer Ablauf vom Quellenlink über verfügbare QC-Aufnahmen bis zur passenden Kategorie oder Produktseite bei CNBuy Sheet.",
        sectionTitle: "Vom Link zur aktuellen Produktseite",
        paragraphs: [
          "Füge nach Möglichkeit den vollständigen Taobao-, Weidian-, 1688- oder Agentenlink ein. Prüfe, ob das gefundene Material wirklich zur Quelle gehört, und vergleiche anschließend die sichtbaren Details. Eine reine Bildähnlichkeit ist nur ein Hinweis und ersetzt keinen Abgleich der Artikelangaben.",
          "Öffne danach die entsprechende Kategorie oder die konkrete Produktseite bei CNBuy Sheet. Kontrolliere dort den aktuellen Preis, Varianten, Größen, Verkäuferlink und die Beschreibung. Wenn die Live-Seite nicht mehr zum recherchierten Material passt, gilt die Zuordnung als unterbrochen und sollte neu geprüft werden.",
        ],
      },
      "spreadsheet-vs-qc-finder": {
        title: "Spreadsheet oder QC-Finder: zwei Werkzeuge für unterschiedliche Aufgaben",
        description:
          "Ein direkter Vergleich zwischen Produktentdeckung und QC-Recherche – und warum beide Schritte getrennt bleiben sollten.",
        sectionTitle: "Entdecken, prüfen, aktuell bestätigen",
        paragraphs: [
          "Ein Web-Spreadsheet beantwortet vor allem die Frage, welche Produkte und Kategorien du durchsuchen kannst. Ein QC-Finder beantwortet eine engere Frage: Welches sichtbare Material ist zu einem bestimmten Link verfügbar? Der erste Schritt schafft Auswahl, der zweite reduziert Unsicherheit bei einer konkreten Option.",
          "Keines der beiden Werkzeuge ersetzt die aktuelle Produktseite. Nutze Kategorien für eine überschaubare Vorauswahl, ordne QC-Fotos oder -Videos dem exakten Angebot zu und bestätige zum Schluss Preis, Bestand, Größen und Varianten auf der Live-Seite bei CNBuy Sheet.",
        ],
      },
    },
  },
  pl: {
    categories: {
      Shoes: "Buty",
      Hoodies: "Bluzy",
      "T-Shirts": "T-shirty",
      Jackets: "Kurtki",
      Pants: "Spodnie",
      Headwear: "Nakrycia głowy",
      Accessories: "Akcesoria",
      Electronics: "Elektronika",
    },
    inspections: {
      "hoka-speedgoat-5-trail-running-shoes":
        "kształt cholewki, wzór podeszwy, konstrukcja pięty, panele boczne i widoczne szwy",
      "maison-margiela-hoodie":
        "faktura materiału, kształt kaptura, położenie nadruku, mankiety, dół i ułożenie szwów",
      "louis-vuitton-tee":
        "kształt kołnierza, położenie grafiki, powierzchnia materiału, długość rękawów i szew dolny",
      "celine-coat":
        "ogólna sylwetka, zapięcia, podszewka, kieszenie, mankiety i wykończenie szwów",
      "hello-kitty-plush-pants":
        "runo materiału, wyrazistość nadruku, pas, proporcje nogawek i wykończenie szwu wewnętrznego",
      "era-hats":
        "kształt korony, haft, wygięcie daszka, taśma wewnętrzna i mechanizm regulacji",
      "nike-elite-backpack":
        "tory zamków, szwy pasków, układ kieszeni, ułożenie paneli i przestrzeń wewnętrzna",
      "samsung-galaxy-watch8":
        "ekran, koperta, przyciski, mocowanie paska, akcesoria do ładowania i zawartość opakowania",
    },
    guides: {
      "uufinds-spreadsheet-shopping-guide-2026": {
        title: "Przewodnik UUFinds Spreadsheet 2026: od kontroli QC do lepszych znalezisk",
        description:
          "Praktyczna, oparta na dowodach droga od wyszukiwania QC w UUFinds do kategorii i dokładnych stron produktów CNBuy Sheet.",
        sectionTitle: "Oddziel wyszukiwanie od weryfikacji",
        paragraphs: [
          "Najpierw ustal, czy szukasz jedynie rodzaju produktu, czy masz już konkretny link. Przy ogólnym wyszukiwaniu zacznij od kategorii. Przy określonej ofercie zachowaj pełny adres, identyfikator produktu, sprzedawcę i wariant, aby materiały QC można było powiązać z właściwym źródłem.",
          "Spreadsheet pomaga odkrywać i porządkować oferty, ale nie jest certyfikatem jakości. Otwórz każdą interesującą stronę szczegółową, porównaj aktualne dane i traktuj zdjęcia lub filmy wyłącznie jako zapis pokazanego egzemplarza. Cenę, dostępność i warianty potwierdź na bieżącej stronie docelowej.",
        ],
      },
      "uufinds-qc-checklist": {
        title: "Praktyczna lista kontrolna UUFinds QC przed zapisaniem linku produktu",
        description:
          "Przewodnik po dopasowaniu zdjęć i filmów QC z UUFinds, odczytywaniu widocznych informacji i zapisywaniu brakujących danych.",
        sectionTitle: "Prawidłowo dopasuj materiały QC",
        paragraphs: [
          "Zawsze zaczynaj od pierwotnego linku produktu. Podobny tytuł lub to samo zdjęcie katalogowe nie wystarcza. Porównaj sprzedawcę, identyfikator, kolor i wybrany wariant, zanim uznasz album za materiał dotyczący dokładnie tej oferty.",
          "Następnie sprawdź kształt, proporcje, szwy, położenie nadruków, okucia i widoczne wymiary z kilku stron. Brakującego ujęcia nie zastępuj domysłem — zapisz je jako niewiadomą. Zdjęcie QC dokumentuje konkretny egzemplarz lub partię, a nie gwarantuje cech późniejszego produktu.",
        ],
      },
      "how-to-use-uufinds": {
        title: "Jak korzystać z UUFinds i kontynuować wyszukiwanie w CNBuy Sheet",
        description:
          "Czytelny proces od linku źródłowego przez dostępne materiały QC do właściwej kategorii lub strony produktu CNBuy Sheet.",
        sectionTitle: "Od źródła do aktualnej oferty",
        paragraphs: [
          "Wklej pełny link z Taobao, Weidian, 1688 albo agenta, jeśli jest dostępny. Sprawdź, czy znalezione materiały rzeczywiście odnoszą się do tego źródła, a później porównaj widoczne szczegóły. Samo podobieństwo obrazu jest wskazówką, nie potwierdzeniem identycznej oferty.",
          "Następnie otwórz odpowiednią kategorię lub dokładną stronę produktu w CNBuy Sheet. Potwierdź aktualną cenę, warianty, rozmiary, link sprzedawcy i opis. Jeśli bieżąca oferta nie odpowiada materiałom z researchu, dopasowanie należy uznać za przerwane i sprawdzić ponownie.",
        ],
      },
      "spreadsheet-vs-qc-finder": {
        title: "Spreadsheet a wyszukiwarka QC: dwa narzędzia, dwa różne zadania",
        description:
          "Proste porównanie stron do odkrywania produktów i narzędzi do kontroli QC — oraz znaczenie tej różnicy.",
        sectionTitle: "Odkrywaj, sprawdzaj i potwierdzaj na żywo",
        paragraphs: [
          "Webowy spreadsheet odpowiada głównie na pytanie, jakie produkty i kategorie można przeglądać. Wyszukiwarka QC odpowiada na węższe pytanie: jakie materiały wizualne są dostępne dla konkretnego linku? Pierwsze narzędzie buduje listę opcji, drugie zmniejsza niepewność wokół wybranej oferty.",
          "Żadne z nich nie zastępuje aktualnej strony produktu. Użyj kategorii do stworzenia krótkiej listy, dopasuj materiały QC do dokładnego źródła, a na końcu potwierdź cenę, dostępność, rozmiary i warianty na bieżącej stronie CNBuy Sheet.",
        ],
      },
    },
  },
  "pt-br": {
    categories: {
      Shoes: "Tênis",
      Hoodies: "Moletons",
      "T-Shirts": "Camisetas",
      Jackets: "Jaquetas",
      Pants: "Calças",
      Headwear: "Bonés",
      Accessories: "Acessórios",
      Electronics: "Eletrônicos",
    },
    inspections: {
      "hoka-speedgoat-5-trail-running-shoes":
        "formato do cabedal, desenho do solado, construção do calcanhar, painéis laterais e costuras visíveis",
      "maison-margiela-hoodie":
        "textura do tecido, formato do capuz, posição da estampa, punhos, barra e alinhamento das costuras",
      "louis-vuitton-tee":
        "formato da gola, posição da arte, superfície do tecido, comprimento das mangas e costura da barra",
      "celine-coat":
        "silhueta geral, ferragens de fechamento, forro, bolsos, punhos e acabamento das costuras",
      "hello-kitty-plush-pants":
        "textura felpuda, nitidez da estampa, cós, proporções das pernas e acabamento da costura interna",
      "era-hats":
        "formato da copa, bordado, curvatura da aba, faixa interna e mecanismo de ajuste",
      "nike-elite-backpack":
        "trilhos dos zíperes, costuras das alças, distribuição dos bolsos, alinhamento dos painéis e espaço interno",
      "samsung-galaxy-watch8":
        "tela, caixa, botões, encaixe da pulseira, acessórios de carregamento e conteúdo da embalagem",
    },
    guides: {
      "uufinds-spreadsheet-shopping-guide-2026": {
        title: "Guia UUFinds Spreadsheet 2026: da pesquisa de QC a achados melhores",
        description:
          "Um caminho prático e baseado em evidências, da pesquisa de QC no UUFinds às categorias e páginas exatas de produtos no CNBuy Sheet.",
        sectionTitle: "Separe descoberta e verificação",
        paragraphs: [
          "Primeiro, defina se você procura apenas um tipo de produto ou se já possui um link específico. Para uma busca ampla, comece pela categoria. Para um anúncio definido, preserve a URL completa, o identificador do item, o vendedor e a variante para que qualquer material de QC seja ligado à fonte correta.",
          "Uma planilha ajuda a descobrir e organizar anúncios, mas não funciona como certificado de qualidade. Abra cada página de detalhe relevante, compare as informações atuais e trate fotos ou vídeos apenas como registro do item mostrado. Preço, estoque, opções e dados do vendedor devem ser confirmados na página ativa.",
        ],
      },
      "uufinds-qc-checklist": {
        title: "Checklist prático de QC no UUFinds antes de salvar um link",
        description:
          "Um guia de campo para relacionar fotos e vídeos de QC do UUFinds ao anúncio exato, ler as evidências visíveis e registrar o que ainda falta verificar.",
        sectionTitle: "Relacione o material de QC ao anúncio correto",
        paragraphs: [
          "Comece sempre pelo link original do produto. Um título parecido ou a mesma foto de catálogo não é suficiente. Compare vendedor, identificador, cor e variante selecionada antes de considerar um álbum como evidência daquele anúncio específico.",
          "Depois, observe formato, proporções, costuras, posição de estampas, ferragens e medidas visíveis em mais de um ângulo. Não preencha imagens ausentes com suposições: anote o que não foi mostrado. Uma foto de QC registra um item ou lote, mas não garante as características de uma unidade futura.",
        ],
      },
      "how-to-use-uufinds": {
        title: "Como usar o UUFinds e continuar a busca no CNBuy Sheet",
        description:
          "Um fluxo claro, do link de origem e materiais de QC disponíveis até a categoria ou página correta do produto no CNBuy Sheet.",
        sectionTitle: "Do link de origem ao anúncio atual",
        paragraphs: [
          "Cole o link completo do Taobao, Weidian, 1688 ou de um agente sempre que possível. Verifique se o material encontrado realmente corresponde àquela fonte e só então compare os detalhes visíveis. Semelhança de imagem é uma pista, não a confirmação de que vendedor e variante são os mesmos.",
          "Em seguida, abra a categoria correspondente ou a página exata do produto no CNBuy Sheet. Confirme preço atual, opções, tamanhos, link do vendedor e descrição. Se o anúncio ativo não corresponder mais ao material pesquisado, a relação foi quebrada e precisa ser refeita.",
        ],
      },
      "spreadsheet-vs-qc-finder": {
        title: "Planilha ou localizador de QC: duas ferramentas, duas funções",
        description:
          "Uma comparação direta entre páginas de descoberta de produtos e ferramentas de pesquisa de QC — e por que essa diferença importa.",
        sectionTitle: "Descubra, verifique e confirme ao vivo",
        paragraphs: [
          "Uma planilha na web responde principalmente quais produtos e categorias podem ser explorados. Um localizador de QC responde a uma pergunta mais específica: quais evidências visuais estão disponíveis para determinado link? A primeira ferramenta amplia as opções; a segunda reduz a incerteza sobre uma opção concreta.",
          "Nenhuma delas substitui a página atual do produto. Use categorias para montar uma lista curta, relacione fotos ou vídeos de QC à fonte exata e, por fim, confirme preço, disponibilidade, tamanhos e variantes no anúncio ativo do CNBuy Sheet.",
        ],
      },
    },
  },
};
