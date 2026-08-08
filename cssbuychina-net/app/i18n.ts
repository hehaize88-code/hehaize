export const siteLocales = ["en", "pt-br", "de", "es"] as const;

export type SiteLocale = (typeof siteLocales)[number];

export const localeOptions: Array<{ code: SiteLocale; short: string; label: string; hrefLang: string }> = [
  { code: "en", short: "EN", label: "English", hrefLang: "en" },
  { code: "pt-br", short: "PT-BR", label: "Português (Brasil)", hrefLang: "pt-BR" },
  { code: "de", short: "DE", label: "Deutsch", hrefLang: "de-DE" },
  { code: "es", short: "ES", label: "Español", hrefLang: "es" },
];

export function isSiteLocale(value: string): value is SiteLocale {
  return siteLocales.includes(value as SiteLocale);
}

export function localePrefix(locale: SiteLocale) {
  return locale === "en" ? "" : `/${locale}`;
}

export const localeCopy = {
  en: {
    brandTagline: "Independent CSSBuy guide",
    nav: { all: "All finds", categories: "Categories", how: "How it works", guides: "Guides", articles: "SEO Articles", faq: "FAQ", browse: "Browse finds" },
    hero: {
      eyebrow: "Fact-checked CSSBuy find edit · 2026",
      title: "A clearer way to use a",
      emphasis: "CSSBuy spreadsheet.",
      lede: "Browse by category, compare recorded CNY values, and check each product before ordering. CSSBuy's public process separates the product and China delivery payment from international parcel shipping after warehouse inspection.",
      placeholder: "Search shoes, hoodies, jerseys…",
      search: "Search",
      popular: "Popular:",
      terms: ["running shoes", "hoodies", "football jerseys", "jackets"],
      stats: ["focused edits", "sample finds", "links checked"],
    },
    trust: ["CSSBuy process independently researched", "Two payment stages explained", "Warehouse QC before parcel", "No invented ratings or reviews"],
    categories: { eyebrow: "Browse by department", title: "Eight product departments. Specific checks for each.", description: "Shoes, clothing, jerseys, bags, and electronics need different sizing, QC, packing, and route checks.", seo: "Read the category guides:" },
    finds: { eyebrow: "Recently checked", title: "The current shortlist.", viewAll: "View all finds", all: "All finds", checked: "Route checked", open: "Open product", source: "Recorded" },
    workflow: {
      eyebrow: "CSSBuy order workflow", title: "Find it. Check it. Then decide.", description: "CSSBuy publicly describes a two-stage order: pay for the item and delivery within China first, then inspect it in the warehouse before choosing and paying for international shipping.", read: "Read the complete guide",
      steps: [["Find", "Search by product name, exact URL, or a focused category."], ["First payment", "Confirm the variation, product price, and seller-to-warehouse delivery."], ["Warehouse check", "Review the visible style, quantity, color, size, model, damage, and any requested measurements."], ["Parcel", "Choose packaging and a current eligible route, then pay international shipping."]],
    },
    reading: { eyebrow: "Official facts, practical decisions", title: "The useful reading list.", description: "Research-led guidance on CSSBuy's two payments, warehouse checks, return conditions, storage deadlines, and parcel planning—without fixed-fee promises or invented reviews.", read: "Read guide" },
    faq: { eyebrow: "Quick answers", title: "Good questions, straight answers.", seeAll: "See all questions" },
    footer: { copy: "An independent CSSBuy spreadsheet index built from current product checks and publicly available service information. Always confirm the live order and route terms before paying.", copyright: "© 2026 CSSBuy China · Independent research guide" },
  },
  "pt-br": {
    brandTagline: "Guia CSSBuy independente",
    nav: { all: "Todos os achados", categories: "Categorias", how: "Como funciona", guides: "Guias", articles: "Artigos SEO", faq: "Dúvidas", browse: "Ver achados" },
    hero: {
      eyebrow: "Seleção CSSBuy verificada · 2026",
      title: "Uma forma mais clara de usar a",
      emphasis: "planilha CSSBuy.",
      lede: "Explore por categoria, compare os valores registrados em CNY e confira cada produto. O processo público da CSSBuy separa o pagamento do item e do frete na China do envio internacional após a inspeção no armazém.",
      placeholder: "Pesquisar tênis, moletons, camisas…",
      search: "Pesquisar",
      popular: "Popular:",
      terms: ["tênis de corrida", "moletons", "camisas de futebol", "jaquetas"],
      stats: ["seleções", "produtos em destaque", "links verificados"],
    },
    trust: ["Processo CSSBuy pesquisado de forma independente", "Duas etapas de pagamento", "QC no armazém antes do pacote", "Sem notas ou relatos inventados"],
    categories: { eyebrow: "Explore por departamento", title: "Oito departamentos. Verificações próprias para cada um.", description: "Calçados, roupas, camisas, bolsas e eletrônicos exigem cuidados diferentes com tamanho, QC, embalagem e rota.", seo: "Leia os guias de categoria:" },
    finds: { eyebrow: "Verificados recentemente", title: "A seleção atual.", viewAll: "Ver todos", all: "Todos", checked: "Rota verificada", open: "Abrir produto", source: "Registrado" },
    workflow: {
      eyebrow: "Fluxo de pedido CSSBuy", title: "Encontre. Confira. Depois decida.", description: "A CSSBuy descreve duas etapas: primeiro o item e o envio dentro da China; depois da inspeção no armazém, a embalagem, a rota e o frete internacional.", read: "Ler o guia completo",
      steps: [["Encontre", "Pesquise por nome, URL exato ou categoria."], ["Primeiro pagamento", "Confirme a variação, o preço e o frete até o armazém."], ["Verificação no armazém", "Confira estilo, quantidade, cor, tamanho, modelo, danos e medidas pedidas."], ["Pacote", "Escolha a embalagem e uma rota disponível e pague o frete internacional."]],
    },
    reading: { eyebrow: "Fatos oficiais, decisões práticas", title: "Guias realmente úteis.", description: "Pesquisa sobre pagamentos, QC, devoluções, armazenamento e pacotes da CSSBuy, sem taxas fixas ou relatos inventados.", read: "Ler guia" },
    faq: { eyebrow: "Respostas rápidas", title: "Boas perguntas, respostas diretas.", seeAll: "Ver todas as perguntas" },
    footer: { copy: "Um índice CSSBuy independente, baseado em verificações atuais e informações públicas do serviço. Confirme sempre as condições ao pagar.", copyright: "© 2026 CSSBuy China · Guia de pesquisa independente" },
  },
  de: {
    brandTagline: "Unabhängiger CSSBuy-Ratgeber",
    nav: { all: "Alle Funde", categories: "Kategorien", how: "So funktioniert es", guides: "Ratgeber", articles: "SEO-Artikel", faq: "FAQ", browse: "Funde ansehen" },
    hero: {
      eyebrow: "Geprüfte CSSBuy-Auswahl · 2026",
      title: "Der klarere Weg durch die",
      emphasis: "CSSBuy-Tabelle.",
      lede: "Nach Kategorie stöbern, erfasste CNY-Werte vergleichen und jedes Produkt prüfen. CSSBuy trennt öffentlich den Kauf samt Versand in China von der internationalen Paketzahlung nach der Lagerprüfung.",
      placeholder: "Schuhe, Hoodies, Trikots suchen…",
      search: "Suchen",
      popular: "Beliebt:",
      terms: ["Laufschuhe", "Hoodies", "Fußballtrikots", "Jacken"],
      stats: ["Auswahlen", "Produktfunde", "geprüfte Links"],
    },
    trust: ["CSSBuy-Ablauf unabhängig recherchiert", "Zwei Zahlungsstufen erklärt", "Lager-QC vor dem Paket", "Keine erfundenen Bewertungen"],
    categories: { eyebrow: "Nach Abteilung stöbern", title: "Acht Abteilungen. Passende Prüfungen für jede.", description: "Schuhe, Kleidung, Trikots, Taschen und Elektronik brauchen unterschiedliche Größen-, QC-, Verpackungs- und Routenprüfungen.", seo: "Kategorieratgeber lesen:" },
    finds: { eyebrow: "Kürzlich geprüft", title: "Die aktuelle Auswahl.", viewAll: "Alle ansehen", all: "Alle", checked: "Route geprüft", open: "Produkt öffnen", source: "Erfasst" },
    workflow: {
      eyebrow: "CSSBuy-Bestellablauf", title: "Finden. Prüfen. Dann entscheiden.", description: "CSSBuy beschreibt zwei Stufen: zuerst Artikel und Versand innerhalb Chinas, danach Lagerprüfung, Verpackung, Routenauswahl und internationale Zahlung.", read: "Vollständigen Ratgeber lesen",
      steps: [["Finden", "Nach Name, genauer URL oder Kategorie suchen."], ["Erste Zahlung", "Variante, Artikelpreis und Versand zum Lager bestätigen."], ["Lagerprüfung", "Stil, Menge, Farbe, Größe, Modell, Schäden und gewünschte Maße prüfen."], ["Paket", "Verpackung und verfügbare Route wählen und internationalen Versand zahlen."]],
    },
    reading: { eyebrow: "Offizielle Fakten, praktische Entscheidungen", title: "Die nützliche Leseliste.", description: "Recherchierte Hinweise zu Zahlungen, Lager-QC, Rückgabe, Lagerfristen und Paketplanung bei CSSBuy—ohne erfundene Gebühren oder Berichte.", read: "Ratgeber lesen" },
    faq: { eyebrow: "Schnelle Antworten", title: "Gute Fragen, klare Antworten.", seeAll: "Alle Fragen ansehen" },
    footer: { copy: "Ein unabhängiger CSSBuy-Index auf Basis aktueller Produktprüfungen und öffentlicher Serviceangaben. Bedingungen vor jeder Zahlung bestätigen.", copyright: "© 2026 CSSBuy China · Unabhängiger Recherche-Ratgeber" },
  },
  es: {
    brandTagline: "Guía CSSBuy independiente",
    nav: { all: "Todos los hallazgos", categories: "Categorías", how: "Cómo funciona", guides: "Guías", articles: "Artículos SEO", faq: "Preguntas", browse: "Ver hallazgos" },
    hero: {
      eyebrow: "Selección CSSBuy verificada · 2026",
      title: "Una forma más clara de usar la",
      emphasis: "hoja de CSSBuy.",
      lede: "Explora por categoría, compara valores registrados en CNY y revisa cada producto. El proceso público de CSSBuy separa el pago del artículo y envío en China del paquete internacional tras la inspección del almacén.",
      placeholder: "Buscar zapatillas, sudaderas, camisetas…",
      search: "Buscar",
      popular: "Popular:",
      terms: ["zapatillas deportivas", "sudaderas", "camisetas de fútbol", "chaquetas"],
      stats: ["selecciones", "productos destacados", "enlaces revisados"],
    },
    trust: ["Proceso CSSBuy investigado de forma independiente", "Dos etapas de pago", "QC de almacén antes del paquete", "Sin notas ni reseñas inventadas"],
    categories: { eyebrow: "Explorar por departamento", title: "Ocho departamentos. Controles propios para cada uno.", description: "Calzado, ropa, camisetas, bolsos y electrónica requieren controles distintos de talla, QC, embalaje y ruta.", seo: "Leer las guías de categoría:" },
    finds: { eyebrow: "Revisados recientemente", title: "La selección actual.", viewAll: "Ver todos", all: "Todos", checked: "Ruta revisada", open: "Abrir producto", source: "Registrado" },
    workflow: {
      eyebrow: "Flujo de pedido CSSBuy", title: "Encuentra. Revisa. Luego decide.", description: "CSSBuy describe dos etapas: primero el artículo y el envío dentro de China; después de la inspección, el embalaje, la ruta y el pago internacional.", read: "Leer la guía completa",
      steps: [["Encuentra", "Busca por nombre, URL exacta o categoría."], ["Primer pago", "Confirma variante, precio y envío hasta el almacén."], ["Control de almacén", "Revisa estilo, cantidad, color, talla, modelo, daños y medidas solicitadas."], ["Paquete", "Elige embalaje y una ruta disponible y paga el envío internacional."]],
    },
    reading: { eyebrow: "Hechos oficiales, decisiones prácticas", title: "La lista de lectura útil.", description: "Guías investigadas sobre pagos, QC, devoluciones, almacenamiento y paquetes de CSSBuy, sin tarifas fijas ni historias inventadas.", read: "Leer guía" },
    faq: { eyebrow: "Respuestas rápidas", title: "Buenas preguntas, respuestas claras.", seeAll: "Ver todas las preguntas" },
    footer: { copy: "Un índice CSSBuy independiente basado en revisiones actuales e información pública del servicio. Confirma siempre las condiciones antes de pagar.", copyright: "© 2026 CSSBuy China · Guía de investigación independiente" },
  },
} as const;
