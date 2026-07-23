"use client";

import { useEffect } from "react";
import { germanFaqExtras, polishFaqExtras, portugueseFaqExtras } from "./faq-language-extras";
import { germanExtras, polishExtras, portugueseExtras } from "./language-extras";
import { germanResearchExtras, polishResearchExtras, portugueseResearchExtras } from "./research-language-extras";

export type SiteLanguage = "en" | "de" | "pl" | "pt-br";

const german: Record<string, string> = {
  "Finds": "Funde",
  "Products": "Produkte",
  "QC Guide": "QC-Leitfaden",
  "How It Works": "So funktioniert es",
  "Articles": "Artikel",
  "SEO Buying Guide": "SEO-Kaufratgeber",
  "Language": "Sprache",
  "Independent guide": "Unabhängiger Leitfaden",
  "Updated July 2026": "Aktualisiert im Juli 2026",
  "Find it on": "Finde es auf",
  "Explore it on": "Entdecke es auf",
  "Research a product with UUFinds, check available QC material, then browse the matching category on CNBuy Sheet.": "Recherchiere ein Produkt mit UUFinds, prüfe verfügbares QC-Material und öffne anschließend die passende Kategorie bei CNBuy Sheet.",
  "Search shoes, hoodies, accessories…": "Schuhe, Hoodies oder Accessoires suchen …",
  "Search CNBuy Sheet products": "CNBuy-Sheet-Produkte durchsuchen",
  "Search finds": "Produkte suchen",
  "Browse categories": "Kategorien durchsuchen",
  "Category": "Kategorie",
  "shortcuts": "Direktlinks",
  "First buying": "Erster Kauf",
  "guide": "Ratgeber",
  "Direct CNBuy": "Direkte CNBuy",
  "Sheet links": "Sheet-Links",
  "Curated routes / 09": "Ausgewählte Wege / 09",
  "Start with a category.": "Beginne mit einer Kategorie.",
  "Each shortcut opens the matching CNBuy Sheet category—not a generic homepage.": "Jeder Direktlink öffnet die passende CNBuy-Sheet-Kategorie – nicht eine allgemeine Startseite.",
  "Shoes": "Schuhe",
  "Sneakers & footwear": "Sneaker & Schuhe",
  "Hoodies": "Hoodies",
  "Sweaters & sweatshirts": "Pullover & Sweatshirts",
  "T-Shirts": "T-Shirts",
  "Tees & tops": "Shirts & Oberteile",
  "Jackets": "Jacken",
  "Coats & outerwear": "Mäntel & Oberbekleidung",
  "Pants": "Hosen",
  "Pants & shorts": "Hosen & Shorts",
  "Headwear": "Kopfbedeckungen",
  "Caps & hats": "Caps & Hüte",
  "Accessories": "Accessoires",
  "Bags, wallets & more": "Taschen, Geldbörsen & mehr",
  "Jersey": "Trikots",
  "Teamwear finds": "Teamwear-Funde",
  "Electronics": "Elektronik",
  "Tech & gadgets": "Technik & Gadgets",
  "Product routes / 08": "Produktwege / 08",
  "Open a real product detail.": "Öffne eine echte Produktdetailseite.",
  "Each find has its own page here, followed by one direct button to the exact CNBuy Sheet product.": "Jeder Fund hat hier eine eigene Seite und einen direkten Button zum passenden CNBuy-Sheet-Produkt.",
  "View details ↗": "Details ansehen ↗",
  "QC before checkout": "QC vor dem Kauf",
  "A find is a lead.": "Ein Fund ist ein Hinweis.",
  "QC is the check.": "QC ist die Prüfung.",
  "UUFinds describes its service as a QC finder for product photos and videos. Use those materials to inspect the exact listing you are considering—then confirm the seller link, size details and current price on the destination page.": "UUFinds beschreibt seinen Dienst als QC-Suche für Produktfotos und -videos. Prüfe damit genau das Angebot, das du erwägst, und bestätige anschließend Verkäuferlink, Größenangaben und aktuellen Preis auf der Zielseite.",
  "See the three-step method": "Drei-Schritte-Methode ansehen",
  "Research route / 03 steps": "Rechercheweg / 03 Schritte",
  "From a link to a better shortlist.": "Vom Link zur besseren Auswahlliste.",
  "Keep product discovery, visual checking and destination-page verification as three separate decisions.": "Behandle Produktsuche, visuelle Prüfung und Kontrolle der Zielseite als drei getrennte Entscheidungen.",
  "RESEARCH": "RECHERCHIEREN",
  "Start with UUFinds": "Mit UUFinds beginnen",
  "Paste a supported product or agent link into UUFinds and look for available QC photos or video. Match the listing—not just a similar-looking product.": "Füge einen unterstützten Produkt- oder Agentenlink bei UUFinds ein und suche nach verfügbaren QC-Fotos oder -Videos. Gleiche das konkrete Angebot ab, nicht nur ein ähnlich aussehendes Produkt.",
  "Read the on-site research guide →": "Recherche-Ratgeber lesen →",
  "COMPARE": "VERGLEICHEN",
  "Read the evidence": "Hinweise prüfen",
  "Compare shape, material, stitching, print placement, hardware, labels and measured dimensions. Check more than one angle when it is available.": "Vergleiche Form, Material, Nähte, Druckposition, Beschläge, Etiketten und gemessene Maße. Prüfe mehrere Ansichten, wenn sie verfügbar sind.",
  "Use the full QC checklist →": "Vollständige QC-Checkliste nutzen →",
  "BROWSE": "DURCHSUCHEN",
  "Continue on CNBuy Sheet": "Bei CNBuy Sheet fortfahren",
  "Use the category shortcuts to explore related listings. Re-check the live product page because availability, price, variants and seller information can change.": "Nutze die Kategorien, um ähnliche Angebote zu entdecken. Prüfe die aktuelle Produktseite erneut, da Verfügbarkeit, Preis, Varianten und Verkäuferangaben sich ändern können.",
  "Browse all products ↗": "Alle Produkte ansehen ↗",
  "Field notes / July 2026": "Praxisnotizen / Juli 2026",
  "Useful answers, not link dumps.": "Nützliche Antworten statt Linklisten.",
  "Original guides written around real search questions: QC photos, spreadsheet links, product matching and safer comparison habits.": "Originelle Ratgeber zu echten Suchfragen: QC-Fotos, Spreadsheet-Links, Produktabgleich und bessere Vergleichsgewohnheiten.",
  "SEO BUYING GUIDE": "SEO-KAUFRATGEBER",
  "UUFinds Spreadsheet Guide 2026: from QC research to better product finds": "UUFinds-Spreadsheet-Ratgeber 2026: von der QC-Recherche zu besseren Produktfunden",
  "A complete reverse-shopping workflow for researching evidence, comparing listings and continuing to the right CNBuy Sheet product page.": "Ein vollständiger Reverse-Shopping-Ablauf zum Prüfen von Hinweisen, Vergleichen von Angeboten und Öffnen der richtigen CNBuy-Sheet-Produktseite.",
  "QC METHOD": "QC-METHODE",
  "A practical UUFinds QC checklist before you save a product link": "Eine praktische UUFinds-QC-Checkliste vor dem Speichern eines Produktlinks",
  "What to compare in photos, which details deserve a second look, and why one image should never settle the decision.": "Was auf Fotos zu vergleichen ist, welche Details einen zweiten Blick verdienen und warum ein Bild nie allein entscheiden sollte.",
  "BEGINNER GUIDE": "EINSTEIGER-RATGEBER",
  "How to use UUFinds and continue browsing on CNBuy Sheet": "UUFinds nutzen und bei CNBuy Sheet weitersuchen",
  "A clear research-to-browse workflow for links from Taobao, Weidian, 1688 and supported shopping agents.": "Ein klarer Recherche- und Suchablauf für Links von Taobao, Weidian, 1688 und unterstützten Shopping-Agenten.",
  "COMPARISON": "VERGLEICH",
  "Spreadsheet vs QC finder: two tools, two different jobs": "Spreadsheet oder QC-Finder: zwei Werkzeuge, zwei Aufgaben",
  "Why product discovery and quality research work better as separate steps—and where each tool fits.": "Warum Produktsuche und Qualitätsrecherche getrennt besser funktionieren und wo jedes Werkzeug passt.",
  "Read guide ↗": "Ratgeber lesen ↗",
  "Clear relationship": "Klare Einordnung",
  "Independent by design.": "Bewusst unabhängig.",
  "UUFinds Sheet is an editorial guide and routing site. We do not claim to be UUFinds, do not sell products and do not process orders. All outbound search, category and product routes on this site lead only to CNBuy Sheet.": "UUFinds Sheet ist ein redaktioneller Ratgeber und eine Weiterleitungsseite. Wir sind nicht UUFinds, verkaufen keine Produkte und bearbeiten keine Bestellungen. Alle externen Such-, Kategorie- und Produktlinks führen ausschließlich zu CNBuy Sheet.",
  "FAQ / Straight answers": "FAQ / Klare Antworten",
  "Before you open another tab.": "Bevor du einen weiteren Tab öffnest.",
  "Is uufindssheet.com the official UUFinds website?": "Ist uufindssheet.com die offizielle UUFinds-Website?",
  "No. This is an independent guide. The official UUFinds QC finder is hosted at uufinds.com.": "Nein. Dies ist ein unabhängiger Ratgeber. Der offizielle UUFinds-QC-Finder befindet sich auf uufinds.com.",
  "Does a QC photo guarantee product quality?": "Garantiert ein QC-Foto die Produktqualität?",
  "Why do the category links open CNBuy Sheet?": "Warum öffnen die Kategorielinks CNBuy Sheet?",
  "Can I search with a product name?": "Kann ich mit einem Produktnamen suchen?",
  "What should I re-check on the destination page?": "Was sollte ich auf der Zielseite erneut prüfen?",
  "Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. All outbound shopping links lead only to CNBuy Sheet.": "Unabhängiger Bildungsratgeber. Nicht mit UUFinds verbunden, von UUFinds empfohlen oder betrieben. Alle externen Shopping-Links führen ausschließlich zu CNBuy Sheet.",
  "Browse product finds →": "Produktfunde ansehen →",
};

const polish: Record<string, string> = {
  "Finds": "Znaleziska",
  "Products": "Produkty",
  "QC Guide": "Poradnik QC",
  "How It Works": "Jak to działa",
  "Articles": "Artykuły",
  "SEO Buying Guide": "Poradnik zakupowy SEO",
  "Language": "Język",
  "Independent guide": "Niezależny przewodnik",
  "Updated July 2026": "Aktualizacja: lipiec 2026",
  "Find it on": "Znajdź w",
  "Explore it on": "Odkryj w",
  "Research a product with UUFinds, check available QC material, then browse the matching category on CNBuy Sheet.": "Sprawdź produkt w UUFinds, przejrzyj dostępne materiały QC, a następnie otwórz odpowiednią kategorię w CNBuy Sheet.",
  "Search shoes, hoodies, accessories…": "Szukaj butów, bluz lub akcesoriów…",
  "Search CNBuy Sheet products": "Szukaj produktów CNBuy Sheet",
  "Search finds": "Szukaj produktów",
  "Browse categories": "Przeglądaj kategorie",
  "Category": "Kategorie",
  "shortcuts": "na skróty",
  "First buying": "Pierwszy zakup",
  "guide": "poradnik",
  "Direct CNBuy": "Bezpośrednie linki",
  "Sheet links": "CNBuy Sheet",
  "Curated routes / 09": "Wybrane trasy / 09",
  "Start with a category.": "Zacznij od kategorii.",
  "Each shortcut opens the matching CNBuy Sheet category—not a generic homepage.": "Każdy skrót otwiera odpowiednią kategorię CNBuy Sheet, a nie ogólną stronę główną.",
  "Shoes": "Buty",
  "Sneakers & footwear": "Sneakersy i obuwie",
  "Hoodies": "Bluzy",
  "Sweaters & sweatshirts": "Swetry i bluzy",
  "Jackets": "Kurtki",
  "Coats & outerwear": "Płaszcze i odzież wierzchnia",
  "Pants": "Spodnie",
  "Pants & shorts": "Spodnie i szorty",
  "Headwear": "Nakrycia głowy",
  "Caps & hats": "Czapki i kapelusze",
  "Accessories": "Akcesoria",
  "Bags, wallets & more": "Torby, portfele i więcej",
  "Jersey": "Koszulki sportowe",
  "Teamwear finds": "Odzież drużynowa",
  "Electronics": "Elektronika",
  "Tech & gadgets": "Technologia i gadżety",
  "Product routes / 08": "Trasy produktów / 08",
  "Open a real product detail.": "Otwórz prawdziwą stronę produktu.",
  "Each find has its own page here, followed by one direct button to the exact CNBuy Sheet product.": "Każdy produkt ma tutaj własną stronę i bezpośredni przycisk do dokładnej oferty w CNBuy Sheet.",
  "View details ↗": "Zobacz szczegóły ↗",
  "QC before checkout": "QC przed zakupem",
  "A find is a lead.": "Znalezisko to wskazówka.",
  "QC is the check.": "QC to weryfikacja.",
  "UUFinds describes its service as a QC finder for product photos and videos. Use those materials to inspect the exact listing you are considering—then confirm the seller link, size details and current price on the destination page.": "UUFinds opisuje swoją usługę jako wyszukiwarkę zdjęć i filmów QC. Wykorzystaj te materiały do sprawdzenia konkretnej oferty, a następnie potwierdź link sprzedawcy, rozmiar i aktualną cenę na stronie docelowej.",
  "See the three-step method": "Zobacz metodę trzech kroków",
  "Research route / 03 steps": "Ścieżka sprawdzania / 03 kroki",
  "From a link to a better shortlist.": "Od linku do lepszej listy.",
  "Keep product discovery, visual checking and destination-page verification as three separate decisions.": "Traktuj wyszukiwanie produktu, kontrolę wizualną i sprawdzenie strony docelowej jako trzy osobne decyzje.",
  "RESEARCH": "SPRAWDŹ",
  "Start with UUFinds": "Zacznij od UUFinds",
  "Paste a supported product or agent link into UUFinds and look for available QC photos or video. Match the listing—not just a similar-looking product.": "Wklej obsługiwany link do produktu lub agenta w UUFinds i sprawdź dostępne zdjęcia lub filmy QC. Dopasuj konkretną ofertę, a nie tylko podobnie wyglądający produkt.",
  "Read the on-site research guide →": "Przeczytaj poradnik wyszukiwania →",
  "COMPARE": "PORÓWNAJ",
  "Read the evidence": "Przeanalizuj materiały",
  "Compare shape, material, stitching, print placement, hardware, labels and measured dimensions. Check more than one angle when it is available.": "Porównaj kształt, materiał, szwy, umiejscowienie nadruku, okucia, metki i zmierzone wymiary. Jeśli to możliwe, sprawdź więcej niż jedno ujęcie.",
  "Use the full QC checklist →": "Użyj pełnej listy kontrolnej QC →",
  "BROWSE": "PRZEGLĄDAJ",
  "Continue on CNBuy Sheet": "Kontynuuj w CNBuy Sheet",
  "Use the category shortcuts to explore related listings. Re-check the live product page because availability, price, variants and seller information can change.": "Skorzystaj ze skrótów kategorii, aby zobaczyć podobne oferty. Ponownie sprawdź aktualną stronę produktu, ponieważ dostępność, cena, warianty i dane sprzedawcy mogą się zmieniać.",
  "Browse all products ↗": "Przeglądaj wszystkie produkty ↗",
  "Field notes / July 2026": "Notatki / lipiec 2026",
  "Useful answers, not link dumps.": "Przydatne odpowiedzi, nie zbiór linków.",
  "Original guides written around real search questions: QC photos, spreadsheet links, product matching and safer comparison habits.": "Oryginalne poradniki oparte na prawdziwych pytaniach: zdjęcia QC, linki z arkuszy, dopasowanie produktów i bezpieczniejsze porównywanie.",
  "SEO BUYING GUIDE": "PORADNIK ZAKUPOWY SEO",
  "UUFinds Spreadsheet Guide 2026: from QC research to better product finds": "Przewodnik UUFinds Spreadsheet 2026: od kontroli QC do lepszych produktów",
  "A complete reverse-shopping workflow for researching evidence, comparing listings and continuing to the right CNBuy Sheet product page.": "Pełny proces reverse shoppingu: analiza materiałów, porównywanie ofert i przejście do właściwej strony produktu CNBuy Sheet.",
  "QC METHOD": "METODA QC",
  "A practical UUFinds QC checklist before you save a product link": "Praktyczna lista kontrolna UUFinds QC przed zapisaniem linku do produktu",
  "What to compare in photos, which details deserve a second look, and why one image should never settle the decision.": "Co porównywać na zdjęciach, które szczegóły sprawdzić ponownie i dlaczego jedno zdjęcie nie powinno przesądzać o decyzji.",
  "BEGINNER GUIDE": "PORADNIK DLA POCZĄTKUJĄCYCH",
  "How to use UUFinds and continue browsing on CNBuy Sheet": "Jak korzystać z UUFinds i kontynuować przeglądanie w CNBuy Sheet",
  "A clear research-to-browse workflow for links from Taobao, Weidian, 1688 and supported shopping agents.": "Przejrzysty proces od wyszukiwania do przeglądania dla linków z Taobao, Weidian, 1688 i obsługiwanych agentów zakupowych.",
  "COMPARISON": "PORÓWNANIE",
  "Spreadsheet vs QC finder: two tools, two different jobs": "Arkusz czy wyszukiwarka QC: dwa narzędzia, dwa zadania",
  "Why product discovery and quality research work better as separate steps—and where each tool fits.": "Dlaczego wyszukiwanie produktów i kontrola jakości działają lepiej jako osobne kroki oraz kiedy użyć każdego narzędzia.",
  "Read guide ↗": "Czytaj poradnik ↗",
  "Clear relationship": "Jasne zasady",
  "Independent by design.": "Celowo niezależny.",
  "UUFinds Sheet is an editorial guide and routing site. We do not claim to be UUFinds, do not sell products and do not process orders. All outbound search, category and product routes on this site lead only to CNBuy Sheet.": "UUFinds Sheet to niezależny przewodnik i strona kierująca do ofert. Nie jesteśmy UUFinds, nie sprzedajemy produktów i nie obsługujemy zamówień. Wszystkie zewnętrzne linki wyszukiwania, kategorii i produktów prowadzą wyłącznie do CNBuy Sheet.",
  "FAQ / Straight answers": "FAQ / Konkretne odpowiedzi",
  "Before you open another tab.": "Zanim otworzysz kolejną kartę.",
  "Is uufindssheet.com the official UUFinds website?": "Czy uufindssheet.com jest oficjalną stroną UUFinds?",
  "No. This is an independent guide. The official UUFinds QC finder is hosted at uufinds.com.": "Nie. To niezależny przewodnik. Oficjalna wyszukiwarka UUFinds QC znajduje się na uufinds.com.",
  "Does a QC photo guarantee product quality?": "Czy zdjęcie QC gwarantuje jakość produktu?",
  "Why do the category links open CNBuy Sheet?": "Dlaczego linki kategorii otwierają CNBuy Sheet?",
  "Can I search with a product name?": "Czy mogę wyszukiwać po nazwie produktu?",
  "What should I re-check on the destination page?": "Co należy ponownie sprawdzić na stronie docelowej?",
  "Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. All outbound shopping links lead only to CNBuy Sheet.": "Niezależny przewodnik edukacyjny. Nie jest powiązany, wspierany ani prowadzony przez UUFinds. Wszystkie zewnętrzne linki zakupowe prowadzą wyłącznie do CNBuy Sheet.",
  "Browse product finds →": "Przeglądaj produkty →",
};

const portuguese: Record<string, string> = {
  "Finds": "Achados",
  "Products": "Produtos",
  "QC Guide": "Guia de QC",
  "How It Works": "Como funciona",
  "Articles": "Artigos",
  "SEO Buying Guide": "Guia de compra SEO",
  "Language": "Idioma",
  "Independent guide": "Guia independente",
  "Updated July 2026": "Atualizado em julho de 2026",
  "Find it on": "Encontre no",
  "Explore it on": "Explore no",
  "Research a product with UUFinds, check available QC material, then browse the matching category on CNBuy Sheet.": "Pesquise um produto no UUFinds, confira os materiais de QC disponíveis e depois abra a categoria correspondente no CNBuy Sheet.",
  "Search shoes, hoodies, accessories…": "Buscar tênis, moletons ou acessórios…",
  "Search CNBuy Sheet products": "Buscar produtos no CNBuy Sheet",
  "Search finds": "Buscar produtos",
  "Browse categories": "Explorar categorias",
  "Category": "Atalhos",
  "shortcuts": "por categoria",
  "First buying": "Primeira compra",
  "guide": "guia",
  "Direct CNBuy": "Links diretos",
  "Sheet links": "do CNBuy Sheet",
  "Curated routes / 09": "Rotas selecionadas / 09",
  "Start with a category.": "Comece por uma categoria.",
  "Each shortcut opens the matching CNBuy Sheet category—not a generic homepage.": "Cada atalho abre a categoria correspondente no CNBuy Sheet, e não uma página inicial genérica.",
  "Shoes": "Tênis",
  "Sneakers & footwear": "Tênis e calçados",
  "Hoodies": "Moletons",
  "Sweaters & sweatshirts": "Suéteres e moletons",
  "T-Shirts": "Camisetas",
  "Tees & tops": "Camisetas e blusas",
  "Jackets": "Jaquetas",
  "Coats & outerwear": "Casacos e roupas externas",
  "Pants": "Calças",
  "Pants & shorts": "Calças e shorts",
  "Headwear": "Bonés",
  "Caps & hats": "Bonés e chapéus",
  "Accessories": "Acessórios",
  "Bags, wallets & more": "Bolsas, carteiras e mais",
  "Jersey": "Camisas esportivas",
  "Teamwear finds": "Produtos de times",
  "Electronics": "Eletrônicos",
  "Tech & gadgets": "Tecnologia e gadgets",
  "Product routes / 08": "Rotas de produtos / 08",
  "Open a real product detail.": "Abra uma página real de produto.",
  "Each find has its own page here, followed by one direct button to the exact CNBuy Sheet product.": "Cada produto tem uma página própria aqui e um botão direto para a oferta exata no CNBuy Sheet.",
  "View details ↗": "Ver detalhes ↗",
  "QC before checkout": "QC antes da compra",
  "A find is a lead.": "Um achado é uma pista.",
  "QC is the check.": "QC é a verificação.",
  "UUFinds describes its service as a QC finder for product photos and videos. Use those materials to inspect the exact listing you are considering—then confirm the seller link, size details and current price on the destination page.": "O UUFinds descreve seu serviço como um localizador de fotos e vídeos de QC. Use esses materiais para analisar o anúncio exato e depois confirme o link do vendedor, os tamanhos e o preço atual na página de destino.",
  "See the three-step method": "Veja o método em três etapas",
  "Research route / 03 steps": "Rota de pesquisa / 03 etapas",
  "From a link to a better shortlist.": "De um link a uma lista melhor.",
  "Keep product discovery, visual checking and destination-page verification as three separate decisions.": "Trate a descoberta do produto, a análise visual e a verificação da página de destino como três decisões separadas.",
  "RESEARCH": "PESQUISAR",
  "Start with UUFinds": "Comece pelo UUFinds",
  "Paste a supported product or agent link into UUFinds and look for available QC photos or video. Match the listing—not just a similar-looking product.": "Cole no UUFinds um link de produto ou agente compatível e procure fotos ou vídeos de QC disponíveis. Compare o anúncio exato, não apenas um produto parecido.",
  "Read the on-site research guide →": "Ler o guia de pesquisa →",
  "COMPARE": "COMPARAR",
  "Read the evidence": "Analise as evidências",
  "Compare shape, material, stitching, print placement, hardware, labels and measured dimensions. Check more than one angle when it is available.": "Compare formato, material, costura, posição da estampa, ferragens, etiquetas e medidas. Verifique mais de um ângulo quando estiver disponível.",
  "Use the full QC checklist →": "Usar a lista completa de QC →",
  "BROWSE": "EXPLORAR",
  "Continue on CNBuy Sheet": "Continue no CNBuy Sheet",
  "Use the category shortcuts to explore related listings. Re-check the live product page because availability, price, variants and seller information can change.": "Use os atalhos de categoria para explorar anúncios relacionados. Confira novamente a página atual do produto, pois disponibilidade, preço, variações e informações do vendedor podem mudar.",
  "Browse all products ↗": "Explorar todos os produtos ↗",
  "Field notes / July 2026": "Notas práticas / julho de 2026",
  "Useful answers, not link dumps.": "Respostas úteis, não uma lista de links.",
  "Original guides written around real search questions: QC photos, spreadsheet links, product matching and safer comparison habits.": "Guias originais baseados em dúvidas reais: fotos de QC, links de planilhas, correspondência de produtos e hábitos de comparação mais seguros.",
  "SEO BUYING GUIDE": "GUIA DE COMPRA SEO",
  "UUFinds Spreadsheet Guide 2026: from QC research to better product finds": "Guia da planilha UUFinds 2026: da pesquisa de QC a produtos melhores",
  "A complete reverse-shopping workflow for researching evidence, comparing listings and continuing to the right CNBuy Sheet product page.": "Um processo completo de compra reversa para analisar evidências, comparar anúncios e abrir a página correta do produto no CNBuy Sheet.",
  "QC METHOD": "MÉTODO DE QC",
  "A practical UUFinds QC checklist before you save a product link": "Uma lista prática de QC do UUFinds antes de salvar um link de produto",
  "What to compare in photos, which details deserve a second look, and why one image should never settle the decision.": "O que comparar nas fotos, quais detalhes merecem uma segunda análise e por que uma única imagem nunca deve decidir a compra.",
  "BEGINNER GUIDE": "GUIA PARA INICIANTES",
  "How to use UUFinds and continue browsing on CNBuy Sheet": "Como usar o UUFinds e continuar explorando no CNBuy Sheet",
  "A clear research-to-browse workflow for links from Taobao, Weidian, 1688 and supported shopping agents.": "Um processo claro de pesquisa e navegação para links do Taobao, Weidian, 1688 e agentes de compras compatíveis.",
  "COMPARISON": "COMPARAÇÃO",
  "Spreadsheet vs QC finder: two tools, two different jobs": "Planilha ou localizador de QC: duas ferramentas, duas funções",
  "Why product discovery and quality research work better as separate steps—and where each tool fits.": "Por que a descoberta de produtos e a análise de qualidade funcionam melhor como etapas separadas e onde cada ferramenta se encaixa.",
  "Read guide ↗": "Ler guia ↗",
  "Clear relationship": "Relação transparente",
  "Independent by design.": "Independente por princípio.",
  "UUFinds Sheet is an editorial guide and routing site. We do not claim to be UUFinds, do not sell products and do not process orders. All outbound search, category and product routes on this site lead only to CNBuy Sheet.": "O UUFinds Sheet é um guia editorial e um site de direcionamento. Não afirmamos ser o UUFinds, não vendemos produtos e não processamos pedidos. Todos os links externos de busca, categoria e produto levam somente ao CNBuy Sheet.",
  "FAQ / Straight answers": "FAQ / Respostas diretas",
  "Before you open another tab.": "Antes de abrir outra aba.",
  "Is uufindssheet.com the official UUFinds website?": "O uufindssheet.com é o site oficial do UUFinds?",
  "No. This is an independent guide. The official UUFinds QC finder is hosted at uufinds.com.": "Não. Este é um guia independente. O localizador oficial de QC do UUFinds está em uufinds.com.",
  "Does a QC photo guarantee product quality?": "Uma foto de QC garante a qualidade do produto?",
  "Why do the category links open CNBuy Sheet?": "Por que os links de categoria abrem o CNBuy Sheet?",
  "Can I search with a product name?": "Posso pesquisar pelo nome do produto?",
  "What should I re-check on the destination page?": "O que devo conferir novamente na página de destino?",
  "Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. All outbound shopping links lead only to CNBuy Sheet.": "Guia educacional independente. Não é afiliado, apoiado nem operado pelo UUFinds. Todos os links externos de compra levam somente ao CNBuy Sheet.",
  "Browse product finds →": "Explorar produtos →",
};

const dictionaries: Record<Exclude<SiteLanguage, "en">, Record<string, string>> = {
  de: { ...german, ...germanExtras, ...germanResearchExtras, ...germanFaqExtras },
  pl: { ...polish, ...polishExtras, ...polishResearchExtras, ...polishFaqExtras },
  "pt-br": { ...portuguese, ...portugueseExtras, ...portugueseResearchExtras, ...portugueseFaqExtras },
};

const originalText = new WeakMap<Node, string>();
const lastRenderedText = new WeakMap<Node, string>();
const originalAttributes = new WeakMap<Element, Record<string, string>>();

function translatePage(language: SiteLanguage) {
  const dictionary = language === "en" ? {} : dictionaries[language];
  const root = document.body;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest(".site-header") || ["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  let node: Node | null;
  while ((node = walker.nextNode())) {
    const currentText = node.textContent || "";
    const previousRenderedText = lastRenderedText.get(node);
    if (!originalText.has(node) || (previousRenderedText !== undefined && currentText !== previousRenderedText)) {
      originalText.set(node, currentText);
    }
    const source = originalText.get(node) || "";
    const trimmed = source.trim();
    const translated = dictionary[trimmed] || trimmed;
    const nextText = `${source.match(/^\s*/)?.[0] || ""}${translated}${source.match(/\s*$/)?.[0] || ""}`;
    if (node.textContent !== nextText) node.textContent = nextText;
    lastRenderedText.set(node, nextText);
  }

  root.querySelectorAll("[placeholder], [aria-label]").forEach((element) => {
    if (element.closest(".site-header")) return;
    if (!originalAttributes.has(element)) {
      originalAttributes.set(element, {
        placeholder: element.getAttribute("placeholder") || "",
        ariaLabel: element.getAttribute("aria-label") || "",
      });
    }
    const source = originalAttributes.get(element)!;
    if (source.placeholder) element.setAttribute("placeholder", dictionary[source.placeholder] || source.placeholder);
    if (source.ariaLabel) element.setAttribute("aria-label", dictionary[source.ariaLabel] || source.ariaLabel);
  });

  document.documentElement.lang = language === "pt-br" ? "pt-BR" : language;
  document.body.dataset.language = language;
}

export function LanguageTranslator() {
  useEffect(() => {
    let currentLanguage = (window.localStorage.getItem("uufinds-language") || "en") as SiteLanguage;
    let translationQueued = false;

    const queueTranslation = () => {
      if (translationQueued) return;
      translationQueued = true;
      window.requestAnimationFrame(() => {
        translationQueued = false;
        translatePage(currentLanguage);
      });
    };

    translatePage(currentLanguage);

    const handleLanguageChange = (event: Event) => {
      currentLanguage = (event as CustomEvent<SiteLanguage>).detail;
      queueTranslation();
    };

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) =>
        mutation.type === "characterData" ||
        (mutation.type === "childList" && mutation.addedNodes.length > 0)
      )) {
        queueTranslation();
      }
    });

    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    window.addEventListener("uufinds-language-change", handleLanguageChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("uufinds-language-change", handleLanguageChange);
    };
  }, []);

  return null;
}
