import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerShell } from "../../components/InnerShell";
import { ProductCard } from "../../components/ProductCard";
import { isSiteLocale, localizedCategories, localeCopy, localeOptions, SiteLocale } from "../../i18n";
import { categories, products } from "../../site-data";

const sections = ["products", "categories", "how-it-works", "guides", "articles", "faq"] as const;
type Section = (typeof sections)[number];

const sectionLabels = {
  en: { products: "Product index", categories: "Category index", how: "Four-step workflow", guides: "Practical guides", articles: "Buyer research library", faq: "Clear answers" },
  "pt-br": { products: "Índice de produtos", categories: "Índice de categorias", how: "Processo em quatro etapas", guides: "Guias práticos", articles: "Biblioteca de compras", faq: "Respostas claras" },
  de: { products: "Produktindex", categories: "Kategorieindex", how: "Ablauf in vier Schritten", guides: "Praktische Ratgeber", articles: "Kaufratgeber-Bibliothek", faq: "Klare Antworten" },
  es: { products: "Índice de productos", categories: "Índice de categorías", how: "Proceso en cuatro pasos", guides: "Guías prácticas", articles: "Biblioteca de compras", faq: "Respuestas claras" },
} as const;

const sectionMeta = {
  "pt-br": {
    products: ["Produtos da planilha CSSBuy", "Explore 30 produtos com valores registrados em CNY, páginas individuais, data de verificação e links diretos para a loja principal."],
    categories: ["Categorias da planilha CSSBuy", "Encontre calçados, roupas, camisas, acessórios e eletrônicos com verificações específicas de tamanho, QC e envio."],
    "how-it-works": ["Como funciona um pedido CSSBuy", "Entenda as duas etapas de pagamento, a inspeção no armazém, a embalagem e a escolha da rota internacional."],
    guides: ["Guias CSSBuy de planilha, QC e pacote", "Leia guias práticos sobre opções, medidas, fotos de QC, devoluções, armazenamento e custo do pacote."],
    articles: ["Artigos CSSBuy sobre planilha, QC e envio", "Artigos detalhados e pesquisados sobre links de produto, escolha de categorias e planejamento do envio internacional."],
    faq: ["Perguntas frequentes sobre a planilha CSSBuy", "Respostas claras sobre pagamentos, inspeção, fotos de QC, devoluções, armazenamento, preços e envio."],
  },
  de: {
    products: ["Produkte der CSSBuy-Tabelle", "Durchsuche 30 Produkte mit erfassten CNY-Werten, eigenen Detailseiten, Prüfdaten und direkten Links zum Hauptshop."],
    categories: ["Kategorien der CSSBuy-Tabelle", "Finde Schuhe, Kleidung, Trikots, Accessoires und Elektronik mit passenden Größen-, QC- und Versandprüfungen."],
    "how-it-works": ["So funktioniert eine CSSBuy-Bestellung", "Verstehe die beiden Zahlungsstufen, die Lagerprüfung, Verpackung und Auswahl der internationalen Route."],
    guides: ["CSSBuy-Ratgeber zu Tabelle, QC und Paket", "Praktische Hinweise zu Varianten, Maßen, QC-Fotos, Rückgabe, Lagerung und Paketkosten."],
    articles: ["CSSBuy-Artikel zu Tabelle, QC und Versand", "Ausführliche, recherchierte Artikel über Produktlinks, Kategorienwahl und internationale Versandplanung."],
    faq: ["Häufige Fragen zur CSSBuy-Tabelle", "Klare Antworten zu Zahlungen, Lagerprüfung, QC-Fotos, Rückgabe, Lagerung, Preisen und Versand."],
  },
  es: {
    products: ["Productos de la hoja CSSBuy", "Explora 30 productos con valores registrados en CNY, páginas individuales, fecha de revisión y enlaces directos a la tienda principal."],
    categories: ["Categorías de la hoja CSSBuy", "Encuentra calzado, ropa, camisetas, accesorios y electrónica con controles específicos de talla, QC y envío."],
    "how-it-works": ["Cómo funciona un pedido de CSSBuy", "Entiende las dos etapas de pago, la inspección del almacén, el embalaje y la elección de la ruta internacional."],
    guides: ["Guías CSSBuy de hoja, QC y paquete", "Lee guías prácticas sobre opciones, medidas, fotos de QC, devoluciones, almacenamiento y coste del paquete."],
    articles: ["Artículos CSSBuy sobre hoja, QC y envío", "Artículos detallados e investigados sobre enlaces de producto, elección de categorías y planificación del envío internacional."],
    faq: ["Preguntas frecuentes sobre la hoja CSSBuy", "Respuestas claras sobre pagos, inspección, fotos de QC, devoluciones, almacenamiento, precios y envío."],
  },
} as const;

const localizedUi = {
  "pt-br": { guide: "GUIA", read: "Ler artigo", faqStamp: "12 DÚVIDAS · AGO 2026" },
  de: { guide: "RATGEBER", read: "Artikel lesen", faqStamp: "12 FRAGEN · AUG 2026" },
  es: { guide: "GUÍA", read: "Leer artículo", faqStamp: "12 PREGUNTAS · AGO 2026" },
} as const;

const localizedArticleCards = {
  "pt-br": [
    { slug: "how-to-check-a-cssbuy-product-link", label: "GUIA DE LINKS · 12 MIN", title: "Como verificar um link da planilha CSSBuy antes de comprar", description: "Confira o destino, a opção exata, as medidas, as duas etapas de pagamento e as evidências do armazém." },
    { slug: "cssbuy-spreadsheet-categories-explained", label: "ESCOLHA DE CATEGORIA · 11 MIN", title: "Como escolher uma categoria da planilha CSSBuy", description: "Compare tamanho, QC no armazém e risco de envio para calçados, roupas, camisas, bolsas e eletrônicos." },
    { slug: "cssbuy-shipping-cost-planning", label: "CUSTO DE ENVIO · 12 MIN", title: "Como planejar o custo de envio CSSBuy", description: "Separe produto, frete nacional, embalagem, peso cobrável, rota internacional e possíveis custos no destino." },
  ],
  de: [
    { slug: "how-to-check-a-cssbuy-product-link", label: "LINK-RATGEBER · 12 MIN", title: "Einen CSSBuy-Tabellenlink vor der Bestellung prüfen", description: "Zielseite, genaue Variante, Maße, beide Zahlungsstufen und Lagerbelege systematisch prüfen." },
    { slug: "cssbuy-spreadsheet-categories-explained", label: "KATEGORIEAUSWAHL · 11 MIN", title: "Die richtige CSSBuy-Tabellenkategorie auswählen", description: "Größe, Lager-QC und Versandrisiken für Schuhe, Kleidung, Trikots, Taschen und Elektronik vergleichen." },
    { slug: "cssbuy-shipping-cost-planning", label: "VERSANDKOSTEN · 12 MIN", title: "CSSBuy-Versandkosten realistisch planen", description: "Produkt, Inlandsversand, Verpackung, Abrechnungsgewicht, internationale Route und Zielkosten trennen." },
  ],
  es: [
    { slug: "how-to-check-a-cssbuy-product-link", label: "GUÍA DE ENLACES · 12 MIN", title: "Cómo revisar un enlace de la hoja CSSBuy antes de comprar", description: "Comprueba el destino, la opción exacta, las medidas, las dos etapas de pago y las pruebas del almacén." },
    { slug: "cssbuy-spreadsheet-categories-explained", label: "ELECCIÓN DE CATEGORÍA · 11 MIN", title: "Cómo elegir una categoría de la hoja CSSBuy", description: "Compara talla, QC de almacén y riesgo de envío para calzado, ropa, camisetas, bolsos y electrónica." },
    { slug: "cssbuy-shipping-cost-planning", label: "COSTE DE ENVÍO · 12 MIN", title: "Cómo planificar el coste de envío de CSSBuy", description: "Separa producto, transporte nacional, embalaje, peso facturable, ruta internacional y costes de destino." },
  ],
} as const;

const localizedGuideTitles = {
  "pt-br": [
    ["cssbuy-spreadsheet-guide", "Como usar uma planilha CSSBuy: do primeiro pagamento ao pacote"],
    ["read-warehouse-qc-photos", "Como analisar as fotos de QC do armazém CSSBuy"],
    ["product-price-vs-parcel-cost", "Preço do produto CSSBuy versus custo total do pacote"],
  ],
  de: [
    ["cssbuy-spreadsheet-guide", "CSSBuy-Tabelle nutzen: von der ersten Zahlung bis zum Paket"],
    ["read-warehouse-qc-photos", "CSSBuy-Lagerfotos vor dem Versand richtig prüfen"],
    ["product-price-vs-parcel-cost", "CSSBuy-Produktpreis im Vergleich zu den gesamten Paketkosten"],
  ],
  es: [
    ["cssbuy-spreadsheet-guide", "Cómo usar una hoja CSSBuy: del primer pago al paquete"],
    ["read-warehouse-qc-photos", "Cómo revisar las fotos de QC del almacén de CSSBuy"],
    ["product-price-vs-parcel-cost", "Precio del producto CSSBuy frente al coste total del paquete"],
  ],
} as const;

const localizedFaqs = {
  "pt-br": [
    ["Este é o site oficial da CSSBuy?", "Não. Este é um guia independente de planilhas e pesquisa. Ele não é operado, endossado nem afiliado à CSSBuy e não processa contas, pagamentos ou pacotes."],
    ["Quais serviços a CSSBuy descreve publicamente?", "O site público cita Buy For Me, Ship For Me, dropshipping, perguntas a vendedores e envio para Amazon FBA. Confirme as condições atuais na conta antes de usar um serviço."],
    ["Por que um pedido CSSBuy tem dois pagamentos?", "A primeira etapa cobre o produto e o envio dentro da China até o armazém. Depois do recebimento, inspeção e embalagem, o cliente escolhe a rota e paga o frete internacional."],
    ["O que a CSSBuy diz verificar no armazém?", "As páginas públicas citam uma inspeção visual de estilo, quantidade, cor, tamanho, modelo e danos. Peça outra foto ou medida quando um detalhe importante não estiver visível."],
    ["As fotos de QC garantem qualidade ou autenticidade?", "Não. Elas ajudam a confirmar condição visível e a opção recebida, mas não comprovam autenticidade, composição, construção interna, segurança elétrica, bateria ou durabilidade."],
    ["Quanto tempo a CSSBuy leva para tratar um pedido pago?", "A FAQ pública diz que normalmente o pedido é processado em até 24 horas após o pagamento. Isso não garante a chegada ao armazém, pois estoque, vendedor e frete doméstico também influenciam."],
    ["Quais condições de devolução são publicadas?", "A FAQ informa que a CSSBuy pode ajudar se o vendedor aceitar, o item estiver no armazém há menos de sete dias e o cliente pagar o frete de devolução. Regras específicas ainda podem impedir a devolução."],
    ["Por quanto tempo o produto pode ficar armazenado?", "A página inicial informa 90 dias grátis e extensão de 15 CNY por pedido ao mês. Algumas páginas distinguem 90 dias para itens comuns e 30 para sensíveis; siga o prazo exibido no pedido."],
    ["O preço da planilha inclui todo o custo?", "Não. O valor não inclui automaticamente frete doméstico, custos atuais do pagamento, serviços opcionais, embalagem, frete internacional nem possíveis impostos no destino."],
    ["Por que aparecem CNY e USD?", "CNY preserva o valor registrado do produto. USD é apenas uma estimativa arredondada para comparação, não uma cotação de checkout da CSSBuy."],
    ["A planilha pode prometer o preço do frete internacional?", "Não. A CSSBuy oferece um estimador, mas destino, rota, restrições, peso, dimensões, embalagem e regra de cobrança podem alterar o valor."],
    ["Como informar um link incorreto?", "Use a página de contato e envie o título, ID ou endereço da página, o tipo de erro e a data. Não envie senha, pagamento, documento ou dados privados da conta."],
  ],
  de: [
    ["Ist dies die offizielle CSSBuy-Website?", "Nein. Dies ist ein unabhängiger Tabellen- und Recherche-Ratgeber. Er wird nicht von CSSBuy betrieben oder unterstützt und verarbeitet keine Konten, Zahlungen oder Pakete."],
    ["Welche Dienste beschreibt CSSBuy öffentlich?", "Die öffentliche Website nennt Buy For Me, Ship For Me, Dropshipping, Verkäuferfragen und Versand an Amazon FBA. Prüfe vor der Nutzung die aktuellen Bedingungen im Konto."],
    ["Warum gibt es bei einer CSSBuy-Bestellung zwei Zahlungen?", "Die erste Stufe umfasst den Artikel und den Versand innerhalb Chinas zum Lager. Nach Eingang, Prüfung und Verpackung wählt der Kunde eine Route und bezahlt den internationalen Versand."],
    ["Was prüft CSSBuy laut eigener Website im Lager?", "Die öffentlichen Produktseiten nennen sichtbare Prüfungen von Stil, Menge, Farbe, Größe, Modell und Schäden. Fordere zusätzliche Fotos oder Maße an, wenn ein wichtiger Punkt fehlt."],
    ["Garantieren QC-Fotos Qualität oder Echtheit?", "Nein. Fotos helfen bei sichtbarem Zustand und bestellter Variante, beweisen aber weder Echtheit noch Material, Innenaufbau, elektrische Sicherheit, Batteriezustand oder Haltbarkeit."],
    ["Wie schnell bearbeitet CSSBuy eine bezahlte Bestellung?", "Laut öffentlicher FAQ wird eine Bestellung normalerweise innerhalb von 24 Stunden nach Zahlung bearbeitet. Verkäuferbestand, Rückfragen und Inlandsversand können die Lagerankunft verlängern."],
    ["Welche Rückgabebedingungen veröffentlicht CSSBuy?", "CSSBuy kann laut FAQ helfen, wenn der Verkäufer zustimmt, der Artikel weniger als sieben Tage im Lager ist und der Kunde den Rückversand bezahlt. Artikelspezifische Regeln können eine Rückgabe ausschließen."],
    ["Wie lange ist die Lagerung kostenlos?", "Die Startseite nennt 90 kostenlose Tage und eine Verlängerung für 15 CNY je Bestellung und Monat. Manche Produktseiten nennen 30 Tage für sensible Waren; maßgeblich ist die Frist im konkreten Auftrag."],
    ["Enthält der Tabellenpreis alle Kosten?", "Nein. Der Wert enthält nicht automatisch Inlandsversand, aktuelle Checkout-Kosten, Zusatzleistungen, Verpackung, internationalen Versand oder mögliche Abgaben im Zielland."],
    ["Warum werden CNY und USD angezeigt?", "CNY bleibt der erfasste Produktwert. USD ist nur ein gerundeter Vergleichswert und kein CSSBuy-Checkout-Angebot."],
    ["Kann eine Tabelle internationale Versandkosten garantieren?", "Nein. CSSBuy bietet einen Rechner, aber Ziel, Route, Beschränkungen, Gewicht, Maße, Verpackung und Abrechnungsmethode können den Betrag verändern."],
    ["Wie melde ich einen falschen Link?", "Nutze die Kontaktseite und nenne Titel, ID oder Seitenadresse, Fehlerart und Datum. Sende keine Passwörter, Zahlungsdaten, Ausweise oder privaten Kontoinformationen."],
  ],
  es: [
    ["¿Es este el sitio oficial de CSSBuy?", "No. Es una guía independiente de hojas y análisis. No está operada, respaldada ni afiliada a CSSBuy y no procesa cuentas, pagos ni paquetes."],
    ["¿Qué servicios describe públicamente CSSBuy?", "El sitio público menciona Buy For Me, Ship For Me, dropshipping, preguntas a vendedores y envíos a Amazon FBA. Comprueba las condiciones actuales en la cuenta antes de usar un servicio."],
    ["¿Por qué un pedido de CSSBuy tiene dos pagos?", "La primera etapa cubre el producto y el envío dentro de China hasta el almacén. Tras la recepción, inspección y embalaje, el cliente elige una ruta y paga el envío internacional."],
    ["¿Qué dice CSSBuy que revisa en el almacén?", "Sus páginas públicas indican una inspección visible de estilo, cantidad, color, talla, modelo y daños. Solicita otra foto o medida si falta un detalle importante."],
    ["¿Las fotos de QC garantizan calidad o autenticidad?", "No. Ayudan a confirmar la condición visible y la opción recibida, pero no prueban autenticidad, composición, construcción interna, seguridad eléctrica, batería ni durabilidad."],
    ["¿Cuánto tarda CSSBuy en gestionar un pedido pagado?", "La FAQ pública dice que normalmente tramita el pedido dentro de 24 horas tras el pago. No garantiza la llegada al almacén: el stock, el vendedor y el transporte nacional también influyen."],
    ["¿Qué condiciones de devolución publica CSSBuy?", "La FAQ dice que puede ayudar si el vendedor acepta, el artículo lleva menos de siete días en el almacén y el cliente paga el envío de devolución. Las reglas específicas todavía pueden impedirla."],
    ["¿Cuánto dura el almacenamiento gratuito?", "La portada indica 90 días gratis y una extensión de 15 CNY por pedido y mes. Algunas páginas distinguen 30 días para artículos sensibles; sigue el plazo mostrado para el pedido concreto."],
    ["¿El precio de la hoja incluye todo el coste?", "No. No incluye automáticamente transporte nacional, costes actuales de pago, servicios opcionales, embalaje, envío internacional ni posibles impuestos del destino."],
    ["¿Por qué se muestran CNY y USD?", "CNY conserva el valor registrado del producto. USD es una estimación redondeada para comparar, no una cotización de pago de CSSBuy."],
    ["¿Puede una hoja prometer el precio del envío internacional?", "No. CSSBuy ofrece un estimador, pero destino, ruta, restricciones, peso, dimensiones, embalaje y método de cobro pueden cambiar el importe."],
    ["¿Cómo informo de un enlace incorrecto?", "Usa la página de contacto e incluye título, ID o dirección, tipo de error y fecha. No envíes contraseñas, pagos, documentos ni datos privados de la cuenta."],
  ],
} as const;

export function generateStaticParams() {
  return localeOptions.filter((option) => option.code !== "en").flatMap((option) => sections.map((section) => ({ locale: option.code, section })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string }> }): Promise<Metadata> {
  const { locale, section } = await params;
  if (!isSiteLocale(locale) || locale === "en" || !sections.includes(section as Section)) return {};
  const sectionKey = section as Section;
  const [title, description] = sectionMeta[locale][sectionKey];
  const url = `https://cssbuychina.net/${locale}/${section}`;
  const openGraphLocales = { "pt-br": "pt_BR", de: "de_DE", es: "es_ES" } as const;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { en: `/${section}`, "pt-BR": `/pt-br/${section}`, "de-DE": `/de/${section}`, es: `/es/${section}`, "x-default": `/${section}` },
    },
    openGraph: { type: "website", locale: openGraphLocales[locale], url, siteName: "CSSBuy China", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

function Categories({ locale }: { locale: SiteLocale }) {
  const copy = localeCopy[locale];
  const categoryCopy = localizedCategories[locale];
  return <><section className="inner-hero categories-hero"><p className="eyebrow"><span /> {sectionLabels[locale].categories}</p><h1>{copy.categories.title}</h1><p>{copy.categories.description}</p></section><section className="section categories-page"><div className="category-grid">{categories.map((category, index) => <a className={`category-card tone-${(index % 4) + 1}`} href={category.storeUrl} rel="nofollow" key={category.slug} data-track-event="category_outbound_click" data-item-category={category.slug} data-click-area="localized-category-card"><span className="category-number">0{index + 1}</span><span className="category-symbol" aria-hidden="true">{category.symbol}</span><span className="category-text"><b>{categoryCopy[category.slug].name}</b><small>{categoryCopy[category.slug].searchLabel}</small></span><span aria-hidden="true">↗</span></a>)}</div></section></>;
}

function Products({ locale }: { locale: SiteLocale }) {
  const copy = localeCopy[locale];
  return <><section className="inner-hero products-hero"><p className="eyebrow"><span /> {sectionLabels[locale].products}</p><h1>{copy.finds.title}</h1><p>{copy.hero.lede}</p></section><section className="section"><div className="product-grid">{products.map((product) => <ProductCard product={product} locale={locale} key={product.id} />)}</div></section></>;
}

function HowItWorks({ locale }: { locale: SiteLocale }) {
  const copy = localeCopy[locale];
  return <><section className="inner-hero how-hero"><p className="eyebrow"><span /> {sectionLabels[locale].how}</p><h1>{copy.workflow.title}</h1><p>{copy.workflow.description}</p></section><section className="workflow-section standalone-workflow"><div className="workflow-intro"><p className="eyebrow"><span /> {copy.workflow.eyebrow}</p><h2>{copy.workflow.title}</h2><p>{copy.workflow.description}</p><a href="/guides/cssbuy-spreadsheet-guide">{copy.workflow.read} ↗</a></div><ol className="workflow-list">{copy.workflow.steps.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><p>{description}</p></div></li>)}</ol></section></>;
}

function Guides({ locale }: { locale: SiteLocale }) {
  const copy = localeCopy[locale];
  const guides = localizedGuideTitles[locale as keyof typeof localizedGuideTitles];
  return <><section className="inner-hero guides-hero"><p className="eyebrow"><span /> {sectionLabels[locale].guides}</p><h1>{copy.reading.title}</h1><p>{copy.reading.description}</p></section><section className="guides-index"><div className="editorial-grid">{guides.map(([slug, title], index) => <a className={`editorial-card editorial-${["blue", "acid", "orange"][index]}`} href={`/guides/${slug}`} key={slug}><div className="editorial-number">0{index + 1}</div><span>{localizedUi[locale as Exclude<SiteLocale, "en">].guide}</span><h2>{title}</h2><b>{copy.reading.read} ↗</b></a>)}</div></section></>;
}

function Articles({ locale }: { locale: SiteLocale }) {
  const copy = localeCopy[locale];
  const cards = localizedArticleCards[locale as Exclude<SiteLocale, "en">];
  return <><section className="inner-hero articles-hero"><p className="eyebrow"><span /> {sectionLabels[locale].articles}</p><h1>{copy.nav.articles}</h1><p>{copy.reading.description}</p></section><section className="guides-index"><div className="editorial-grid">{cards.map((article, index) => <a className={`editorial-card editorial-${["blue", "acid", "orange"][index]}`} href={`/articles/${article.slug}`} key={article.slug}><div className="editorial-number">0{index + 1}</div><span>{article.label}</span><h2>{article.title}</h2><p>{article.description}</p><b>{localizedUi[locale as Exclude<SiteLocale, "en">].read} ↗</b></a>)}</div></section></>;
}

function Faq({ locale }: { locale: SiteLocale }) {
  const copy = localeCopy[locale];
  const questions = localizedFaqs[locale as keyof typeof localizedFaqs];
  const englishLabel = locale === "pt-br" ? "FAQ completa em inglês" : locale === "de" ? "Vollständige englische FAQ" : "FAQ completa en inglés";
  return <><section className="inner-hero faq-hero"><p className="eyebrow"><span /> {sectionLabels[locale].faq}</p><h1>{copy.faq.title}</h1><p>{copy.reading.description}</p></section><section className="faq-page-layout"><aside><span>{localizedUi[locale as Exclude<SiteLocale, "en">].faqStamp}</span><h2>{copy.faq.title}</h2><a href="/faq">{englishLabel} ↗</a></aside><div className="faq-page-list">{questions.map(([question, answer], index) => <details open={index === 0} key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</div></section></>;
}

export default async function LocaleSectionPage({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale, section } = await params;
  if (!isSiteLocale(locale) || locale === "en" || !sections.includes(section as Section)) notFound();
  const sectionKey = section as Section;
  return <InnerShell locale={locale}>{sectionKey === "products" ? <Products locale={locale} /> : sectionKey === "categories" ? <Categories locale={locale} /> : sectionKey === "how-it-works" ? <HowItWorks locale={locale} /> : sectionKey === "guides" ? <Guides locale={locale} /> : sectionKey === "articles" ? <Articles locale={locale} /> : <Faq locale={locale} />}</InnerShell>;
}
