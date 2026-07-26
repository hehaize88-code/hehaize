import type { Locale } from "./i18n";
import {
  articles,
  categories,
  faqs,
  productFinds,
  type Article,
  type ProductFind,
} from "./site-data";

type ProductText = {
  name: string;
  category: string;
  description: string;
};

const productText: Record<Exclude<Locale, "en">, ProductText[]> = {
  es: [
    { name: "Gafas de esquí", category: "Gafas", description: "Entrada visual para unas gafas de esquí. Confirma lente, montura, piezas incluidas y disponibilidad en la ficha actual antes de pedir." },
    { name: "Sombrero Gucci", category: "Sombreros", description: "Entrada visual para un sombrero con etiqueta Gucci. Confirma opción, medidas, construcción y datos actuales sin depender solo de la imagen." },
    { name: "Sudaderas con capucha Off-White", category: "Sudaderas", description: "Entrada visual para sudaderas con etiqueta Off-White. Revisa diseño, medidas, posición del estampado y variante actual." },
    { name: "Zapatillas de caña alta Numeris", category: "Calzado", description: "Entrada visual para zapatillas altas Numeris. Confirma talla y color y usa medidas y fotos QC para revisar el par recibido." },
    { name: "HOKA Speedgoat 5", category: "Calzado", description: "Entrada visual para calzado con etiqueta HOKA Speedgoat 5. Confirma opción, talla y detalles actuales y compara ambos zapatos durante el QC." },
    { name: "Mochila Nike Elite", category: "Bolsos", description: "Entrada visual para una mochila con etiqueta Nike Elite. Confirma dimensiones, compartimentos, correas, cierres y color actual." },
    { name: "Chaqueta acolchada Balenciaga", category: "Abrigos", description: "Entrada visual para una chaqueta acolchada con etiqueta Balenciaga. Compara medidas, cierres, paneles y distribución del relleno." },
    { name: "Chaqueta de invierno con capucha", category: "Abrigos", description: "Entrada visual para una chaqueta de invierno con capucha. Revisa talla, color, medidas, capucha, cierres, bolsillos y construcción visible." },
  ],
  de: [
    { name: "Skibrille", category: "Brillen", description: "Visueller Verzeichniseintrag für eine Skibrille. Linse, Rahmen, Lieferumfang und Verfügbarkeit im aktuellen Angebot prüfen." },
    { name: "Gucci-Kappe", category: "Kopfbedeckung", description: "Visueller Eintrag für eine Gucci-gekennzeichnete Kappe. Option, Maße, Verarbeitung und aktuelle Angebotsdaten prüfen." },
    { name: "Off-White-Hoodies", category: "Hoodies", description: "Visueller Eintrag für Off-White-gekennzeichnete Hoodies. Design, Maße, Druckposition und aktuelle Variante prüfen." },
    { name: "Numeris High-Top-Schuhe", category: "Schuhe", description: "Visueller Eintrag für Numeris-High-Top-Schuhe. Größe und Farbe bestätigen und das eingegangene Paar anhand von Maßen und QC-Fotos prüfen." },
    { name: "HOKA Speedgoat 5", category: "Schuhe", description: "Visueller Eintrag für einen HOKA-Speedgoat-5-gekennzeichneten Schuh. Option, Größe und Angebot prüfen und beide Schuhe beim QC vergleichen." },
    { name: "Nike Elite-Rucksack", category: "Taschen", description: "Visueller Eintrag für einen Nike-Elite-gekennzeichneten Rucksack. Maße, Fächer, Gurte, Verschlüsse und Farbe prüfen." },
    { name: "Balenciaga-Steppjacke", category: "Jacken", description: "Visueller Eintrag für eine Balenciaga-gekennzeichnete Steppjacke. Maße, Verschlüsse, Paneele und Füllverteilung vergleichen." },
    { name: "Winterjacke mit Kapuze", category: "Jacken", description: "Visueller Eintrag für eine Winterjacke mit Kapuze. Größe, Farbe, Maße, Kapuze, Verschlüsse, Taschen und Verarbeitung prüfen." },
  ],
  fr: [
    { name: "Masque de ski", category: "Lunettes", description: "Entrée visuelle pour des lunettes de ski. Confirmez écran, monture, pièces incluses et disponibilité sur la fiche actuelle." },
    { name: "Chapeau Gucci", category: "Couvre-chefs", description: "Entrée visuelle pour un chapeau étiqueté Gucci. Vérifiez option, mesures, construction et données actuelles sans vous fier uniquement à l'image." },
    { name: "Sweats à capuche Off-White", category: "Sweats", description: "Entrée visuelle pour des sweats étiquetés Off-White. Vérifiez motif, mesures, placement de l'impression et variante actuelle." },
    { name: "Chaussures montantes Numeris", category: "Chaussures", description: "Entrée visuelle pour des chaussures montantes Numeris. Confirmez taille et couleur puis contrôlez la paire reçue avec mesures et photos QC." },
    { name: "HOKA Speedgoat 5", category: "Chaussures", description: "Entrée visuelle pour une chaussure étiquetée HOKA Speedgoat 5. Confirmez option, taille et fiche puis comparez les deux chaussures au QC." },
    { name: "Sac à dos Nike Elite", category: "Sacs", description: "Entrée visuelle pour un sac à dos étiqueté Nike Elite. Confirmez dimensions, compartiments, sangles, fermetures et couleur." },
    { name: "Doudoune Balenciaga", category: "Vestes", description: "Entrée visuelle pour une doudoune étiquetée Balenciaga. Comparez mesures, fermetures, panneaux et répartition du rembourrage." },
    { name: "Veste d’hiver à capuche", category: "Vestes", description: "Entrée visuelle pour une veste d'hiver à capuche. Vérifiez taille, couleur, mesures, capuche, fermetures, poches et construction." },
  ],
  it: [
    { name: "Maschera da sci", category: "Occhiali", description: "Voce visiva per occhiali da sci. Conferma lente, montatura, pezzi inclusi e disponibilità nella scheda attuale." },
    { name: "Cappello Gucci", category: "Copricapi", description: "Voce visiva per un cappello con etichetta Gucci. Verifica opzione, misure, costruzione e dati attuali senza basarti solo sull'immagine." },
    { name: "Felpe con cappuccio Off-White", category: "Felpe", description: "Voce visiva per felpe con etichetta Off-White. Controlla design, misure, posizione della stampa e variante attuale." },
    { name: "Scarpe alte Numeris", category: "Scarpe", description: "Voce visiva per scarpe alte Numeris. Conferma taglia e colore e usa misure e foto QC per controllare la coppia ricevuta." },
    { name: "HOKA Speedgoat 5", category: "Scarpe", description: "Voce visiva per una scarpa con etichetta HOKA Speedgoat 5. Conferma opzione, taglia e scheda e confronta entrambe le scarpe nel QC." },
    { name: "Zaino Nike Elite", category: "Borse", description: "Voce visiva per uno zaino con etichetta Nike Elite. Conferma dimensioni, scomparti, cinturini, chiusure e colore." },
    { name: "Piumino Balenciaga", category: "Giacche", description: "Voce visiva per un piumino con etichetta Balenciaga. Confronta misure, chiusure, pannelli e distribuzione dell'imbottitura." },
    { name: "Giacca invernale con cappuccio", category: "Giacche", description: "Voce visiva per una giacca invernale con cappuccio. Verifica taglia, colore, misure, cappuccio, chiusure, tasche e costruzione." },
  ],
};

export function getLocalizedProducts(locale: Locale): ProductFind[] {
  if (locale === "en") {
    return productFinds;
  }

  return productFinds.map((product, index) => ({
    ...product,
    ...productText[locale][index],
  }));
}

const categoryText: Record<
  Exclude<Locale, "en">,
  { name: string; description: string }[]
> = {
  es: [
    { name: "Calzado", description: "Explora zapatillas, modelos casuales, sandalias y más; confirma siempre la ficha actual." },
    { name: "Sudaderas y jerséis", description: "Compara sudaderas, prendas de cuello redondo y punto prestando atención a tejido, talla y medidas." },
    { name: "Chaquetas", description: "Busca capas ligeras o de invierno teniendo en cuenta material, construcción y volumen embalado." },
    { name: "Pantalones y shorts", description: "Compara pantalones casuales, cargo y cortos mediante medidas de la prenda, no solo la talla." },
    { name: "Sombreros", description: "Explora gorras y otros modelos comprobando forma, ajuste, bordado y contorno." },
    { name: "Accesorios", description: "Explora carteras, joyería, gafas y accesorios pequeños revisando materiales y dimensiones." },
    { name: "Camisetas", description: "Revisa camisetas por posición del estampado, cuello, peso del tejido y tabla de medidas." },
    { name: "Todos los productos", description: "Busca en el directorio completo cuando una categoría sea demasiado limitada." },
  ],
  de: [
    { name: "Schuhe", description: "Lauf-, Freizeit- und weitere Schuhe ansehen und das aktuelle Angebot vor der Bestellung prüfen." },
    { name: "Hoodies & Pullover", description: "Hoodies, Sweatshirts und Strickwaren mit Blick auf Stoff, Größe und Maße vergleichen." },
    { name: "Jacken", description: "Leichte Lagen und Winterjacken unter Berücksichtigung von Material, Verarbeitung und Packvolumen finden." },
    { name: "Hosen & Shorts", description: "Freizeithosen, Cargos und Shorts anhand von Kleidungsmaßen statt nur der Größe vergleichen." },
    { name: "Kopfbedeckung", description: "Kappen und weitere Modelle nach Form, Verstellung, Stickerei und Umfang durchsuchen." },
    { name: "Accessoires", description: "Geldbörsen, Schmuck, Brillen und kleine Accessoires mit Material- und Maßprüfung ansehen." },
    { name: "T-Shirts", description: "T-Shirts nach Druckposition, Kragen, Stoffgewicht und Maßtabelle prüfen." },
    { name: "Alle Produkte", description: "Das vollständige Verzeichnis durchsuchen, wenn eine Kategorie zu eng ist." },
  ],
  fr: [
    { name: "Chaussures", description: "Parcourez chaussures de course, modèles décontractés et autres, puis vérifiez la fiche actuelle." },
    { name: "Sweats et pulls", description: "Comparez sweats, cols ronds et mailles en tenant compte du tissu, de la taille et des mesures." },
    { name: "Vestes", description: "Trouvez couches légères et vêtements d'hiver en considérant matière, construction et volume emballé." },
    { name: "Pantalons et shorts", description: "Comparez pantalons, cargos et shorts avec les mesures du vêtement plutôt que l'étiquette." },
    { name: "Couvre-chefs", description: "Parcourez casquettes et autres modèles en vérifiant forme, réglage, broderie et tour de tête." },
    { name: "Accessoires", description: "Explorez portefeuilles, bijoux, lunettes et petits accessoires en vérifiant matières et dimensions." },
    { name: "T-shirts", description: "Examinez placement du motif, col, poids du tissu et tableau de mesures." },
    { name: "Tous les produits", description: "Recherchez dans le catalogue complet lorsqu'une catégorie est trop étroite." },
  ],
  it: [
    { name: "Scarpe", description: "Esplora scarpe da corsa, modelli casual e altro, poi verifica la scheda attuale." },
    { name: "Felpe e maglioni", description: "Confronta felpe, girocollo e maglieria tenendo presenti tessuto, taglia e misure." },
    { name: "Giacche", description: "Trova strati leggeri e capispalla pesanti considerando materiale, costruzione e volume imballato." },
    { name: "Pantaloni e shorts", description: "Confronta pantaloni casual, cargo e corti usando le misure del capo, non solo la taglia." },
    { name: "Copricapi", description: "Esplora cappelli e altri modelli controllando forma, regolazione, ricamo e circonferenza." },
    { name: "Accessori", description: "Esplora portafogli, gioielli, occhiali e piccoli accessori verificando materiali e dimensioni." },
    { name: "T-shirt", description: "Controlla posizione della stampa, collo, peso del tessuto e tabella misure." },
    { name: "Tutti i prodotti", description: "Cerca nel catalogo completo quando una categoria è troppo limitata." },
  ],
};

export function getLocalizedCategories(locale: Locale) {
  if (locale === "en") {
    return categories;
  }

  return categories.map((category, index) => ({
    ...category,
    ...categoryText[locale][index],
  }));
}

type FaqText = {
  question: string;
  basis: string;
  answer: string;
};

const faqText: Record<Exclude<Locale, "en">, FaqText[]> = {
  es: [
    { question: "¿Qué es un spreadsheet de Lolobuy?", basis: "DIRECTORIO INDEPENDIENTE", answer: "Es un directorio independiente que agrupa enlaces, categorías y orientación práctica. Sirve para descubrir productos, no sustituye la ficha actual ni demuestra stock, fiabilidad del vendedor o aprobación QC." },
    { question: "¿Lolobuy Sheet es una web oficial de Lolobuy?", basis: "DIRECTORIO INDEPENDIENTE", answer: "No. Es un sitio independiente y no pertenece ni está respaldado por LoloBuy. Los datos de servicio se revisaron con información pública, pero la cuenta actual controla cada pedido." },
    { question: "¿Este sitio vende, almacena o envía productos?", basis: "DIRECTORIO INDEPENDIENTE", answer: "No. Organiza productos y explica el proceso; no cobra, compra, inspecciona ni envía. Los pedidos, fotos, devoluciones, cotizaciones y seguimiento pertenecen al servicio que gestiona la transacción." },
    { question: "¿Qué afirma oficialmente LoloBuy sobre su servicio de compra?", basis: "CONFIRMADO EN LA WEB OFICIAL", answer: "La página pública dice que ayuda a comprar en canales chinos online y offline y que se puede empezar pegando un enlace. Esto no garantiza que cada producto o vendedor sea aceptado." },
    { question: "¿Cómo empieza un pedido LoloBuy con un enlace?", basis: "CONFIRMADO EN LA WEB OFICIAL", answer: "La página oficial indica que se pega el enlace del producto. Antes de pagar, confirma opción, talla, color, cantidad, precio y entrega nacional en la ficha y en el pedido generado." },
    { question: "¿Qué enlaces de producto se pueden enviar?", basis: "AFIRMACIÓN OFICIAL CON LÍMITE", answer: "La web usa una descripción amplia de canales chinos, pero no publica una lista completa de marketplaces o categorías garantizadas. Comprueba que el pedido reconoce el enlace y cualquier restricción antes de pagar." },
    { question: "¿Se verifican manualmente todos los enlaces cada día?", basis: "POLÍTICA DEL DIRECTORIO", answer: "No hacemos esa afirmación. Una ficha puede cambiar, agotarse o desaparecer sin aviso; abre la página actual y revisa variante, precio y disponibilidad antes de pedir." },
    { question: "¿Qué ocurre cuando el vendedor envía el artículo al almacén?", basis: "CONFIRMADO EN LA WEB OFICIAL", answer: "LoloBuy declara que el almacén realiza control de calidad, toma fotografías y ofrece 90 días de almacenamiento gratuito. No publica allí la lista completa de inspección, cantidad de fotos o solución para cada defecto." },
    { question: "¿Qué significa QC en un pedido LoloBuy?", basis: "PROCESO DE ALMACÉN EXPLICADO", answer: "QC significa control de calidad. Las fotos permiten comparar el artículo recibido con el pedido: tipo, color, talla, cantidad, daños y detalles visibles. No prueban composición, duración o autenticidad." },
    { question: "¿Cuántas fotos QC gratuitas ofrece LoloBuy?", basis: "NO PUBLICADO EN LA WEB OFICIAL", answer: "La web confirma fotografías, pero no una cantidad universal gratuita. Revisa el conjunto real de imágenes del pedido y solicita un ángulo o medida concreta si la cuenta ofrece esa opción." },
    { question: "¿LoloBuy ofrece fotos extra o vídeo de almacén?", basis: "NO PUBLICADO EN LA WEB OFICIAL", answer: "La página pública revisada no fija ese servicio, cantidad o precio. Comprueba las opciones actuales de la cuenta o pregunta a soporte antes de depender de una foto o vídeo adicional." },
    { question: "¿Cuánto dura el almacenamiento gratuito de LoloBuy?", basis: "CONFIRMADO EN LA WEB OFICIAL", answer: "La web anuncia 90 días gratuitos. No explica públicamente todos los detalles del inicio del plazo o de lo que ocurre después; registra la fecha de llegada de cada artículo y actúa con margen." },
    { question: "¿Se pueden combinar varios pedidos en un paquete?", basis: "NO PUBLICADO EN LA WEB OFICIAL", answer: "La página pública confirma almacenamiento, pero no una política completa de consolidación. Comprueba en el flujo actual si los artículos son compatibles y si restricciones, tamaño o protección exigen dividirlos." },
    { question: "¿Cuánto cuesta el envío internacional de LoloBuy?", basis: "SIN PRECIO FIJO PUBLICADO", answer: "No existe un precio único público para todos los pedidos. El coste depende de destino, peso y dimensiones preparados, ruta elegible, restricciones y cargos actuales. Decide con la cotización del paquete real." },
    { question: "¿LoloBuy garantiza plazos, transportistas o seguimiento?", basis: "NO PUBLICADO EN LA WEB OFICIAL", answer: "La página pública no ofrece una tabla permanente completa ni garantías universales. Compara solo las rutas disponibles para tu paquete y distingue una estimación de una garantía." },
    { question: "¿LoloBuy publica una comisión fija o recargo de cambio?", basis: "NO PUBLICADO EN LA WEB OFICIAL", answer: "La página revisada no muestra un porcentaje universal. Separa precio del vendedor, entrega nacional, servicios opcionales, pago, cambio de divisa y transporte internacional en el desglose actual." },
    { question: "¿Por qué cambia el precio al abrir un enlace del spreadsheet?", basis: "COMPROBACIÓN PRÁCTICA", answer: "El vendedor controla la ficha. El precio inicial puede corresponder a otra variante, accesorio o depósito, y también puede cambiar el stock. Selecciona la opción exacta y compara el pedido antes de pagar." },
    { question: "¿Cuáles son las reglas de devolución o cambio tras el QC?", basis: "NO PUBLICADO EN LA WEB OFICIAL", answer: "La página pública no detalla una política completa, plazo o tarifas. Revisa las fotos rápido, conserva la opción pedida y usa la acción disponible en ese pedido antes del envío internacional." },
    { question: "¿Los cupones y descuentos de envío son permanentes?", basis: "SIN OFERTA PERMANENTE PUBLICADA", answer: "No hay un valor universal permanente publicado. Una promoción puede depender de cuenta, ruta, destino, gasto y fecha; solo considérala válida cuando el checkout la acepte y muestre el total reducido." },
    { question: "¿Qué significa W2C en un spreadsheet de Lolobuy?", basis: "TÉRMINO DEL DIRECTORIO", answer: "W2C suele significar “where to cop”, el enlace para localizar un producto. No prueba que la ficha esté vigente o sea adecuada; verifica opción, precio y restricciones y guarda el enlace con el pedido." },
    { question: "¿Qué debo revisar en las fotos QC del almacén?", basis: "LISTA QC PRÁCTICA", answer: "Confirma primero producto, color, talla y cantidad; después daños, piezas faltantes y variante; por último forma, costuras, estampado y medidas. Compara con la ficha guardada, no con la memoria." },
    { question: "¿Un spreadsheet o foto QC garantiza autenticidad o legalidad de importación?", basis: "LÍMITE IMPORTANTE", answer: "No. Una imagen solo ayuda a comparar aspectos visibles. No demuestra autenticidad, composición, certificación o legalidad en cada país; confirma restricciones de ruta y obligaciones aduaneras aplicables." },
  ],
  de: [
    { question: "Was ist ein Lolobuy Spreadsheet?", basis: "UNABHÄNGIGES VERZEICHNIS", answer: "Es ist ein unabhängiges Verzeichnis für Produktlinks, Kategorien und praktische Hinweise. Es hilft bei der Suche, ersetzt aber weder das Live-Angebot noch beweist es Bestand, Verkäuferzuverlässigkeit oder bestandene QC-Prüfung." },
    { question: "Ist Lolobuy Sheet eine offizielle Lolobuy-Website?", basis: "UNABHÄNGIGES VERZEICHNIS", answer: "Nein. Die Seite ist unabhängig und gehört nicht zu LoloBuy. Öffentliche Leistungsangaben wurden geprüft, für den Auftrag gilt jedoch das aktuelle Konto." },
    { question: "Verkauft, lagert oder versendet diese Seite Produkte?", basis: "UNABHÄNGIGES VERZEICHNIS", answer: "Nein. Sie ordnet Produkte und erklärt Abläufe, nimmt aber kein Geld an, kauft nicht ein, prüft nicht und versendet nicht. Auftrag, Fotos, Rückgabe, Angebot und Tracking gehören zum ausführenden Dienst." },
    { question: "Was sagt LoloBuy offiziell über seinen Einkaufsservice?", basis: "AUF OFFIZIELLER WEBSITE BESTÄTIGT", answer: "Die öffentliche Seite beschreibt Hilfe bei Käufen über chinesische Online- und Offline-Kanäle und den Start per Produktlink. Damit ist nicht jeder Artikel oder Verkäufer garantiert." },
    { question: "Wie beginnt eine LoloBuy-Bestellung per Link?", basis: "AUF OFFIZIELLER WEBSITE BESTÄTIGT", answer: "Laut Website wird der Produktlink eingefügt. Vor der Zahlung Option, Größe, Farbe, Menge, Preis und Inlandsversand im Angebot und im erzeugten Auftrag vergleichen." },
    { question: "Welche Produktlinks können eingereicht werden?", basis: "OFFIZIELLE AUSSAGE MIT GRENZE", answer: "Die Seite spricht allgemein von chinesischen Kanälen, veröffentlicht aber keine vollständige garantierte Marktplatz- oder Kategorienliste. Erkennung und Einschränkungen vor der Zahlung prüfen." },
    { question: "Werden alle Links täglich manuell geprüft?", basis: "VERZEICHNISRICHTLINIE", answer: "Nein, das behaupten wir nicht. Angebote können sich ändern, ausverkauft sein oder verschwinden. Variante, Preis und Bestand unmittelbar vor der Bestellung prüfen." },
    { question: "Was geschieht nach dem Versand zum LoloBuy-Lager?", basis: "AUF OFFIZIELLER WEBSITE BESTÄTIGT", answer: "LoloBuy nennt Qualitätsprüfung, Fotos und 90 Tage kostenlose Lagerung. Eine vollständige Prüfliste, Fotozahl oder Lösung für jeden Mangel wird dort nicht veröffentlicht." },
    { question: "Was bedeutet QC bei einer LoloBuy-Bestellung?", basis: "LAGERPROZESS ERKLÄRT", answer: "QC bedeutet Qualitätskontrolle. Fotos helfen beim Abgleich von Artikel, Farbe, Größe, Menge, Schäden und sichtbaren Details. Material, Haltbarkeit oder Echtheit beweisen sie nicht." },
    { question: "Wie viele kostenlose QC-Fotos gibt es?", basis: "NICHT AUF DER OFFIZIELLEN WEBSITE VERÖFFENTLICHT", answer: "Fotos werden bestätigt, eine allgemeine kostenlose Anzahl jedoch nicht. Das tatsächliche Bildset prüfen und bei verfügbarer Option gezielt einen Blickwinkel oder ein Maß anfragen." },
    { question: "Bietet LoloBuy Zusatzfotos oder Lagervideos?", basis: "NICHT AUF DER OFFIZIELLEN WEBSITE VERÖFFENTLICHT", answer: "Die geprüfte öffentliche Seite nennt keinen dauerhaften Dienst, Umfang oder Preis. Aktuelle Kontooptionen oder Support vorab prüfen." },
    { question: "Wie lange ist die Lagerung kostenlos?", basis: "AUF OFFIZIELLER WEBSITE BESTÄTIGT", answer: "Die Website wirbt mit 90 kostenlosen Tagen. Details zum Fristbeginn und danach sind öffentlich nicht vollständig erklärt; Ankunftsdatum je Artikel notieren und früh handeln." },
    { question: "Können mehrere Bestellungen gebündelt werden?", basis: "NICHT AUF DER OFFIZIELLEN WEBSITE VERÖFFENTLICHT", answer: "Die öffentliche Seite bestätigt Lagerung, aber keine vollständige Bündelungsrichtlinie. Im aktuellen Paketablauf Kompatibilität, Größe, Schutz und Einschränkungen prüfen." },
    { question: "Was kostet internationaler LoloBuy-Versand?", basis: "KEIN FESTPREIS VERÖFFENTLICHT", answer: "Es gibt keinen öffentlichen Einheitspreis. Ziel, Packgewicht, Maße, zulässige Route, Einschränkungen und aktuelle Gebühren bestimmen den Betrag. Das reale Paketangebot ist maßgeblich." },
    { question: "Garantiert LoloBuy Laufzeit, Frachtführer oder Tracking?", basis: "NICHT AUF DER OFFIZIELLEN WEBSITE VERÖFFENTLICHT", answer: "Die öffentliche Seite bietet keine dauerhafte vollständige Tabelle oder allgemeine Garantie. Nur aktuell angebotene Routen vergleichen und Schätzung von Garantie unterscheiden." },
    { question: "Veröffentlicht LoloBuy eine feste Servicegebühr oder Wechselkursmarge?", basis: "NICHT AUF DER OFFIZIELLEN WEBSITE VERÖFFENTLICHT", answer: "Ein allgemeiner Prozentsatz ist dort nicht genannt. Verkäuferpreis, China-Versand, Zusatzleistungen, Zahlung, Umrechnung und internationalen Versand im aktuellen Kostenblatt trennen." },
    { question: "Warum ändert sich der Preis eines Spreadsheet-Links?", basis: "PRAKTISCHE ANGEBOTSPRÜFUNG", answer: "Der Verkäufer kontrolliert das Angebot. Der Startpreis kann zu einer anderen Variante, einem Zubehör oder einer Anzahlung gehören; auch Bestand kann sich ändern. Exakte Option auswählen und Auftrag vor Zahlung vergleichen." },
    { question: "Welche Rückgabe- oder Umtauschregeln gelten nach QC?", basis: "NICHT AUF DER OFFIZIELLEN WEBSITE VERÖFFENTLICHT", answer: "Eine vollständige Richtlinie, Frist und Gebührentabelle steht nicht auf der öffentlichen Seite. Fotos zügig prüfen, Bestellnachweis sichern und die aktuelle Auftragsfunktion vor Auslandsversand nutzen." },
    { question: "Sind Gutscheine und Versandrabatte dauerhaft?", basis: "KEIN DAUERHAFTES ANGEBOT VERÖFFENTLICHT", answer: "Ein allgemeiner dauerhafter Wert ist nicht veröffentlicht. Aktion erst als gültig behandeln, wenn der aktuelle Checkout sie annimmt und den reduzierten Gesamtbetrag zeigt." },
    { question: "Was bedeutet W2C in einem Lolobuy Spreadsheet?", basis: "BEGRIFF DES VERZEICHNISSES", answer: "W2C bedeutet meist „where to cop“, also der Link zum Produkt. Er beweist weder Aktualität noch Eignung. Option, Preis, Einschränkungen prüfen und den Link beim Auftrag speichern." },
    { question: "Was sollte ich in Lager-QC-Fotos prüfen?", basis: "PRAKTISCHE QC-CHECKLISTE", answer: "Zuerst Artikel, Farbe, Größe und Menge; dann Schäden, fehlende Teile und falsche Variante; zuletzt Form, Nähte, Druck und Maße. Mit dem gespeicherten Angebot statt aus Erinnerung vergleichen." },
    { question: "Garantiert ein Spreadsheet oder QC-Foto Echtheit oder legale Einfuhr?", basis: "WICHTIGE GRENZE", answer: "Nein. Bilder helfen nur beim sichtbaren Vergleich. Sie beweisen weder Echtheit, Zusammensetzung, Zertifizierung noch Einfuhrrecht; Routenbeschränkungen und Zollpflichten selbst prüfen." },
  ],
  fr: [
    { question: "Qu'est-ce qu'un spreadsheet Lolobuy ?", basis: "CATALOGUE INDÉPENDANT", answer: "C'est un catalogue indépendant de liens, catégories et conseils pratiques. Il aide à découvrir sans remplacer la fiche actuelle ni prouver stock, fiabilité vendeur ou validation QC." },
    { question: "Lolobuy Sheet est-il un site officiel Lolobuy ?", basis: "CATALOGUE INDÉPENDANT", answer: "Non. Le site est indépendant et n'appartient pas à LoloBuy. Les informations de service reposent sur des sources publiques, mais le compte actuel contrôle chaque commande." },
    { question: "Ce site vend-il, stocke-t-il ou expédie-t-il des produits ?", basis: "CATALOGUE INDÉPENDANT", answer: "Non. Il organise des produits et explique le parcours ; il n'encaisse pas, n'achète pas, n'inspecte pas et n'expédie pas. Commande, photos, retour, devis et suivi relèvent du service qui traite la transaction." },
    { question: "Que dit officiellement LoloBuy sur son service d'achat ?", basis: "CONFIRMÉ SUR LE SITE OFFICIEL", answer: "La page publique indique une assistance pour les achats via des canaux chinois en ligne et hors ligne, avec un démarrage par lien produit. Cela ne garantit pas chaque article ou vendeur." },
    { question: "Comment une commande LoloBuy commence-t-elle avec un lien ?", basis: "CONFIRMÉ SUR LE SITE OFFICIEL", answer: "Le site indique de coller le lien produit. Avant paiement, comparez option, taille, couleur, quantité, prix et livraison locale entre la fiche et la commande générée." },
    { question: "Quels liens produit peuvent être soumis ?", basis: "AFFIRMATION OFFICIELLE AVEC LIMITE", answer: "Le site parle largement de canaux chinois, sans publier de liste complète de marketplaces ou catégories garanties. Vérifiez la lecture du lien et les restrictions avant de payer." },
    { question: "Tous les liens sont-ils vérifiés manuellement chaque jour ?", basis: "RÈGLE DU CATALOGUE", answer: "Non, nous ne faisons pas cette promesse. Une fiche peut changer, être épuisée ou disparaître ; vérifiez variante, prix et disponibilité juste avant de commander." },
    { question: "Que se passe-t-il après l'envoi au dépôt LoloBuy ?", basis: "CONFIRMÉ SUR LE SITE OFFICIEL", answer: "LoloBuy annonce contrôle qualité, photos et 90 jours de stockage gratuit. La liste d'inspection, le nombre de photos et le recours pour chaque défaut ne sont pas détaillés publiquement." },
    { question: "Que signifie QC dans une commande LoloBuy ?", basis: "PROCESSUS D'ENTREPÔT EXPLIQUÉ", answer: "QC signifie contrôle qualité. Les photos servent à comparer article, couleur, taille, quantité, dommages et détails visibles. Elles ne prouvent ni composition, ni durabilité, ni authenticité." },
    { question: "Combien de photos QC gratuites LoloBuy fournit-il ?", basis: "NON PUBLIÉ SUR LE SITE OFFICIEL", answer: "Les photos sont confirmées, pas un nombre universel gratuit. Examinez le lot réel et demandez un angle ou une mesure précise si le compte propose cette option." },
    { question: "LoloBuy propose-t-il des photos supplémentaires ou une vidéo ?", basis: "NON PUBLIÉ SUR LE SITE OFFICIEL", answer: "La page publique vérifiée ne fixe ni service permanent, ni quantité, ni tarif. Contrôlez les options actuelles du compte ou demandez au support." },
    { question: "Combien de temps le stockage LoloBuy est-il gratuit ?", basis: "CONFIRMÉ SUR LE SITE OFFICIEL", answer: "Le site annonce 90 jours gratuits. Le début exact et les suites ne sont pas entièrement détaillés publiquement ; notez la date d'arrivée de chaque article et gardez une marge." },
    { question: "Plusieurs commandes peuvent-elles être regroupées ?", basis: "NON PUBLIÉ SUR LE SITE OFFICIEL", answer: "La page confirme le stockage, mais pas une politique complète de consolidation. Vérifiez dans le flux actuel compatibilité, taille, protection et restrictions." },
    { question: "Combien coûte l'expédition internationale LoloBuy ?", basis: "AUCUN PRIX FIXE PUBLIÉ", answer: "Il n'existe pas de prix public unique. Destination, poids et dimensions emballés, route admissible, restrictions et frais actuels déterminent le coût. Le devis du colis réel fait foi." },
    { question: "LoloBuy garantit-il délais, transporteurs ou suivi ?", basis: "NON PUBLIÉ SUR LE SITE OFFICIEL", answer: "La page publique ne donne pas de tableau permanent complet ni de garantie générale. Comparez les routes réellement proposées et distinguez estimation et garantie." },
    { question: "LoloBuy publie-t-il des frais fixes ou une marge de change ?", basis: "NON PUBLIÉ SUR LE SITE OFFICIEL", answer: "Aucun pourcentage universel n'est indiqué. Séparez prix vendeur, livraison chinoise, services, paiement, conversion et fret international dans le détail actuel." },
    { question: "Pourquoi le prix change-t-il après l'ouverture d'un lien ?", basis: "VÉRIFICATION PRATIQUE", answer: "Le vendeur contrôle la fiche. Le prix d'appel peut viser une autre variante, un accessoire ou un acompte et le stock peut changer. Sélectionnez l'option exacte et comparez avant paiement." },
    { question: "Quelles règles de retour ou d'échange après QC ?", basis: "NON PUBLIÉ SUR LE SITE OFFICIEL", answer: "La page publique ne détaille ni politique complète, ni délai, ni frais. Examinez rapidement les photos, conservez la variante commandée et utilisez l'action disponible avant l'expédition." },
    { question: "Coupons et remises d'expédition sont-ils permanents ?", basis: "AUCUNE OFFRE PERMANENTE PUBLIÉE", answer: "Aucune valeur universelle permanente n'est publiée. Une promotion n'est valable que lorsque le checkout actuel l'accepte et affiche le total réduit." },
    { question: "Que signifie W2C dans un spreadsheet Lolobuy ?", basis: "TERME DU CATALOGUE", answer: "W2C signifie généralement « where to cop », le lien vers le produit. Il ne prouve ni actualité ni admissibilité ; vérifiez option, prix, restrictions et conservez le lien avec la commande." },
    { question: "Que vérifier dans les photos QC de l'entrepôt ?", basis: "LISTE QC PRATIQUE", answer: "D'abord article, couleur, taille et quantité ; ensuite dommages, pièces manquantes et variante ; enfin forme, coutures, motif et mesures. Comparez à la fiche sauvegardée." },
    { question: "Un spreadsheet ou une photo QC garantit-il authenticité ou légalité ?", basis: "LIMITE IMPORTANTE", answer: "Non. Une image sert uniquement à comparer le visible. Elle ne prouve ni authenticité, composition, certification ou légalité d'importation ; vérifiez restrictions et obligations douanières." },
  ],
  it: [
    { question: "Cos'è uno spreadsheet Lolobuy?", basis: "CATALOGO INDIPENDENTE", answer: "È un catalogo indipendente di link, categorie e consigli pratici. Aiuta a scoprire prodotti ma non sostituisce la scheda attuale né prova disponibilità, affidabilità del venditore o QC superato." },
    { question: "Lolobuy Sheet è un sito ufficiale Lolobuy?", basis: "CATALOGO INDIPENDENTE", answer: "No. Il sito è indipendente e non appartiene a LoloBuy. I dati di servizio derivano da fonti pubbliche, ma l'account attuale controlla ogni ordine." },
    { question: "Questo sito vende, conserva o spedisce prodotti?", basis: "CATALOGO INDIPENDENTE", answer: "No. Organizza prodotti e spiega il percorso; non incassa, acquista, ispeziona o spedisce. Ordini, foto, resi, preventivi e tracking appartengono al servizio che gestisce la transazione." },
    { question: "Cosa dichiara ufficialmente LoloBuy sul servizio d'acquisto?", basis: "CONFERMATO SUL SITO UFFICIALE", answer: "La pagina pubblica dice di assistere acquisti da canali cinesi online e offline e di iniziare tramite link prodotto. Non garantisce ogni articolo o venditore." },
    { question: "Come inizia un ordine LoloBuy con un link?", basis: "CONFERMATO SUL SITO UFFICIALE", answer: "Il sito indica di incollare il link prodotto. Prima del pagamento confronta opzione, taglia, colore, quantità, prezzo e consegna nazionale tra scheda e ordine generato." },
    { question: "Quali link prodotto si possono inviare?", basis: "AFFERMAZIONE UFFICIALE CON LIMITE", answer: "Il sito parla in modo ampio di canali cinesi ma non pubblica una lista completa garantita di marketplace o categorie. Verifica riconoscimento e restrizioni prima di pagare." },
    { question: "Tutti i link sono verificati manualmente ogni giorno?", basis: "POLITICA DEL CATALOGO", answer: "No, non facciamo questa promessa. Una scheda può cambiare, esaurirsi o scomparire; controlla variante, prezzo e disponibilità subito prima dell'ordine." },
    { question: "Cosa succede dopo l'invio al magazzino LoloBuy?", basis: "CONFERMATO SUL SITO UFFICIALE", answer: "LoloBuy dichiara controllo qualità, foto e 90 giorni di deposito gratuito. Non pubblica lì lista completa, numero di foto o rimedio per ogni difetto." },
    { question: "Cosa significa QC in un ordine LoloBuy?", basis: "PROCESSO DI MAGAZZINO SPIEGATO", answer: "QC significa controllo qualità. Le foto aiutano a confrontare articolo, colore, taglia, quantità, danni e dettagli visibili. Non provano composizione, durata o autenticità." },
    { question: "Quante foto QC gratuite offre LoloBuy?", basis: "NON PUBBLICATO SUL SITO UFFICIALE", answer: "Le foto sono confermate, non un numero universale gratuito. Controlla il set reale e richiedi un angolo o una misura specifica se l'account lo consente." },
    { question: "LoloBuy offre foto extra o video di magazzino?", basis: "NON PUBBLICATO SUL SITO UFFICIALE", answer: "La pagina pubblica verificata non fissa servizio, quantità o prezzo permanente. Controlla le opzioni attuali o chiedi al supporto." },
    { question: "Quanto dura il deposito gratuito LoloBuy?", basis: "CONFERMATO SUL SITO UFFICIALE", answer: "Il sito pubblicizza 90 giorni gratuiti. Inizio e conseguenze non sono spiegati completamente; registra la data d'arrivo di ogni articolo e agisci con anticipo." },
    { question: "Si possono unire più ordini in un pacco?", basis: "NON PUBBLICATO SUL SITO UFFICIALE", answer: "La pagina conferma il deposito ma non una politica completa di consolidamento. Verifica nel flusso attuale compatibilità, dimensioni, protezione e restrizioni." },
    { question: "Quanto costa la spedizione internazionale LoloBuy?", basis: "NESSUN PREZZO FISSO PUBBLICATO", answer: "Non esiste un prezzo pubblico unico. Destinazione, peso e dimensioni imballati, rotta idonea, restrizioni e addebiti attuali determinano il costo. Vale il preventivo del pacco reale." },
    { question: "LoloBuy garantisce tempi, vettori o tracking?", basis: "NON PUBBLICATO SUL SITO UFFICIALE", answer: "La pagina pubblica non offre una tabella permanente completa o garanzie universali. Confronta solo le rotte effettivamente disponibili e distingui stima da garanzia." },
    { question: "LoloBuy pubblica una commissione fissa o margine di cambio?", basis: "NON PUBBLICATO SUL SITO UFFICIALE", answer: "Non è indicata una percentuale universale. Separa prezzo venditore, consegna in Cina, servizi, pagamento, cambio e spedizione internazionale nel riepilogo attuale." },
    { question: "Perché il prezzo cambia dopo aver aperto un link?", basis: "CONTROLLO PRATICO", answer: "Il venditore controlla la scheda. Il prezzo iniziale può riferirsi a un'altra variante, accessorio o deposito e lo stock può cambiare. Seleziona l'opzione esatta e confronta prima di pagare." },
    { question: "Quali regole di reso o cambio valgono dopo il QC?", basis: "NON PUBBLICATO SUL SITO UFFICIALE", answer: "La pagina pubblica non dettaglia politica completa, scadenza o tariffe. Controlla presto le foto, conserva la variante ordinata e usa l'azione disponibile prima della spedizione." },
    { question: "Coupon e sconti di spedizione sono permanenti?", basis: "NESSUNA OFFERTA PERMANENTE PUBBLICATA", answer: "Non è pubblicato un valore universale permanente. Considera valida una promozione solo quando il checkout attuale la accetta e mostra il totale ridotto." },
    { question: "Cosa significa W2C in uno spreadsheet Lolobuy?", basis: "TERMINE DEL CATALOGO", answer: "W2C significa di solito “where to cop”, il link per trovare il prodotto. Non prova attualità o idoneità; verifica opzione, prezzo, restrizioni e conserva il link nell'ordine." },
    { question: "Cosa devo controllare nelle foto QC del magazzino?", basis: "LISTA QC PRATICA", answer: "Prima articolo, colore, taglia e quantità; poi danni, pezzi mancanti e variante; infine forma, cuciture, stampa e misure. Confronta con la scheda salvata." },
    { question: "Uno spreadsheet o una foto QC garantisce autenticità o legalità?", basis: "LIMITE IMPORTANTE", answer: "No. Un'immagine aiuta solo nel confronto visibile. Non prova autenticità, composizione, certificazione o legalità d'importazione; verifica restrizioni e obblighi doganali." },
  ],
};

export function getLocalizedFaqs(locale: Locale) {
  if (locale === "en") {
    return faqs;
  }

  return faqs.map((faq, index) => ({
    ...faq,
    ...faqText[locale][index],
  }));
}

type ArticleMetaText = {
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  readingTime: string;
  factCheckLine: string;
};

const articleMetaText: Record<
  Exclude<Locale, "en">,
  ArticleMetaText[]
> = {
  es: [
    { title: "Guía del spreadsheet Lolobuy 2026: cómo usar un directorio sin saltarse la verificación", shortTitle: "Cómo usar con cuidado un spreadsheet Lolobuy", description: "Guía práctica para descubrir productos, comprobar fichas, leer el QC y evitar decisiones apresuradas.", eyebrow: "BASES DEL SPREADSHEET", readingTime: "13 min de lectura", factCheckLine: "Verificado con la web pública de LoloBuy y la guía comunitaria disponible el 26 de julio de 2026." },
    { title: "Cómo leer fotos QC de almacén: lista práctica para ropa, calzado y bolsos", shortTitle: "Cómo leer las fotos QC del almacén", description: "Una lista repetible para revisar identidad, medidas, simetría, daños visibles y límites de las fotos.", eyebrow: "GUÍA QC", readingTime: "12 min de lectura", factCheckLine: "Verificado con la descripción pública de inspección y fotografías de LoloBuy el 26 de julio de 2026." },
    { title: "Cómo planificar un haul de China: almacenamiento, consolidación, peso y rutas", shortTitle: "Planificar almacenamiento, paquete y envío", description: "Guía para estimar costes, entender peso real y volumétrico y elegir una ruta con los datos finales.", eyebrow: "PLANIFICACIÓN DEL PAQUETE", readingTime: "12 min de lectura", factCheckLine: "Verificado con la información pública de almacenamiento y el flujo de pedido disponible el 26 de julio de 2026." },
    { title: "Reseña de LoloBuy 2026: qué demuestra realmente una experiencia temprana", shortTitle: "Una reseña temprana de LoloBuy, examinada", description: "Análisis prudente de una experiencia inicial, separando pruebas de compra y almacén de lo que aún no se ha probado.", eyebrow: "ANÁLISIS DE EXPERIENCIA", readingTime: "11 min de lectura", factCheckLine: "La experiencia se evaluó como un caso individual y preliminar; no como una puntuación universal." },
  ],
  de: [
    { title: "Lolobuy Spreadsheet Ratgeber 2026: Produktverzeichnisse mit Prüfung nutzen", shortTitle: "Ein Lolobuy Spreadsheet sorgfältig verwenden", description: "Praktischer Ratgeber zu Produktsuche, Live-Angebot, QC und überlegten Kaufentscheidungen.", eyebrow: "SPREADSHEET-GRUNDLAGEN", readingTime: "13 Min. Lesezeit", factCheckLine: "Abgeglichen mit LoloBuy-Website und öffentlichem Community-Leitfaden am 26. Juli 2026." },
    { title: "Lager-QC-Fotos lesen: Checkliste für Kleidung, Schuhe und Taschen", shortTitle: "Lager-QC-Fotos richtig lesen", description: "Wiederholbare Checkliste für Identität, Maße, Symmetrie, sichtbare Schäden und Bildgrenzen.", eyebrow: "QC-PRAXIS", readingTime: "12 Min. Lesezeit", factCheckLine: "Mit LoloBuys öffentlicher Beschreibung von Prüfung und Fotos am 26. Juli 2026 abgeglichen." },
    { title: "China-Haul planen: Lagerung, Bündelung, Gewicht und Routen", shortTitle: "Lagerung, Paket und Versand planen", description: "Ratgeber zu Kostenschätzung, Ist- und Volumengewicht und Routenwahl anhand finaler Paketdaten.", eyebrow: "PAKETPLANUNG", readingTime: "12 Min. Lesezeit", factCheckLine: "Mit öffentlichen Lager- und Ablaufangaben vom 26. Juli 2026 abgeglichen." },
    { title: "LoloBuy-Erfahrungsbericht 2026: Was ein früher Nutzerbericht wirklich zeigt", shortTitle: "Ein früher LoloBuy-Bericht, geprüft", description: "Vorsichtige Analyse eines frühen Berichts, getrennt nach belegtem Einkauf, Lagerphase und noch offenen Fragen.", eyebrow: "ERFAHRUNGSANALYSE", readingTime: "11 Min. Lesezeit", factCheckLine: "Der Bericht wird als einzelner, vorläufiger Fall und nicht als allgemeine Bewertung behandelt." },
  ],
  fr: [
    { title: "Guide du spreadsheet Lolobuy 2026 : utiliser un catalogue sans négliger les vérifications", shortTitle: "Bien utiliser un spreadsheet Lolobuy", description: "Guide pratique pour découvrir, vérifier les fiches, lire le QC et éviter les décisions précipitées.", eyebrow: "BASES DU SPREADSHEET", readingTime: "13 min de lecture", factCheckLine: "Vérifié avec le site public LoloBuy et le guide communautaire disponible le 26 juillet 2026." },
    { title: "Lire les photos QC d'entrepôt : liste pratique pour vêtements, chaussures et sacs", shortTitle: "Bien lire les photos QC d'entrepôt", description: "Une liste reproductible pour contrôler identité, mesures, symétrie, dommages visibles et limites des photos.", eyebrow: "GUIDE QC", readingTime: "12 min de lecture", factCheckLine: "Vérifié avec la description publique de l'inspection et des photos LoloBuy le 26 juillet 2026." },
    { title: "Planifier un haul depuis la Chine : stockage, consolidation, poids et routes", shortTitle: "Planifier stockage, colis et expédition", description: "Guide pour estimer le coût, comprendre poids réel et volumétrique et choisir avec les données finales.", eyebrow: "PLANIFICATION DU COLIS", readingTime: "12 min de lecture", factCheckLine: "Vérifié avec les informations publiques de stockage et de parcours disponibles le 26 juillet 2026." },
    { title: "Avis LoloBuy 2026 : ce qu'une première expérience démontre réellement", shortTitle: "Un premier avis LoloBuy examiné", description: "Analyse prudente d'une première expérience, séparant les preuves d'achat et d'entrepôt des questions non testées.", eyebrow: "ANALYSE D'EXPÉRIENCE", readingTime: "11 min de lecture", factCheckLine: "Le témoignage est traité comme un cas individuel préliminaire, pas comme une note universelle." },
  ],
  it: [
    { title: "Guida allo spreadsheet Lolobuy 2026: usare un catalogo senza saltare le verifiche", shortTitle: "Usare con attenzione uno spreadsheet Lolobuy", description: "Guida pratica per scoprire prodotti, controllare schede, leggere il QC ed evitare decisioni affrettate.", eyebrow: "BASI DELLO SPREADSHEET", readingTime: "13 min di lettura", factCheckLine: "Verificato con il sito pubblico LoloBuy e la guida community disponibile il 26 luglio 2026." },
    { title: "Come leggere le foto QC di magazzino: lista per abbigliamento, scarpe e borse", shortTitle: "Leggere le foto QC del magazzino", description: "Una lista ripetibile per identità, misure, simmetria, danni visibili e limiti delle immagini.", eyebrow: "GUIDA QC", readingTime: "12 min di lettura", factCheckLine: "Verificato con la descrizione pubblica LoloBuy di ispezione e foto il 26 luglio 2026." },
    { title: "Pianificare un haul dalla Cina: deposito, consolidamento, peso e rotte", shortTitle: "Pianificare deposito, pacco e spedizione", description: "Guida per stimare costi, capire peso reale e volumetrico e scegliere con i dati finali.", eyebrow: "PIANIFICAZIONE DEL PACCO", readingTime: "12 min di lettura", factCheckLine: "Verificato con le informazioni pubbliche su deposito e flusso disponibili il 26 luglio 2026." },
    { title: "Recensione LoloBuy 2026: cosa dimostra davvero una prima esperienza", shortTitle: "Una prima recensione LoloBuy esaminata", description: "Analisi prudente di una prima esperienza, separando prove di acquisto e magazzino dalle domande non testate.", eyebrow: "ANALISI DELL'ESPERIENZA", readingTime: "11 min di lettura", factCheckLine: "Il resoconto è trattato come caso individuale preliminare, non come valutazione universale." },
  ],
};

type LocalizedArticleBody = {
  visual: {
    eyebrow: string;
    title: string;
    caption: string;
    items: [string, string][];
  };
  sources: [string, string][];
  intro: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
};

const articleBodyText: Record<
  Exclude<Locale, "en">,
  LocalizedArticleBody[]
> = {
  es: [
    {
      visual: {
        eyebrow: "REGLA DE LAS CUATRO FUENTES",
        title: "Una decisión, cuatro fuentes distintas.",
        caption:
          "El directorio inicia la búsqueda; la ficha actual, las pruebas QC y el paquete preparado controlan etapas diferentes.",
        items: [
          ["Directorio", "Encuentra una idea y compara categorías."],
          ["Ficha actual", "Confirma vendedor, opción, precio y descripción."],
          ["QC de almacén", "Revisa el artículo físico recibido."],
          ["Paquete preparado", "Elige envío por peso, dimensiones y elegibilidad actuales."],
        ],
      },
      sources: [
        ["Web pública de LoloBuy", "Declaraciones públicas sobre compra, inspección, fotos y 90 días de almacenamiento."],
        ["Guía comunitaria de pedidos LoloBuy", "Resumen público de las etapas del pedido en la comunidad identificada de la plataforma."],
      ],
      intro: [
        "Un spreadsheet útil reduce el tiempo entre una idea vaga y una ficha que puede evaluarse. Las categorías y la búsqueda ayudan a descubrir, pero no sustituyen la comprobación de vendedor, precio, opciones y restricciones.",
        "Esta guía separa lo que puede aportar un directorio de lo que debe confirmarse en la ficha, las fotos QC o el paquete final.",
      ],
      sections: [
        { heading: "Empieza por la intención, no por un feed infinito", paragraphs: ["Define categoría, uso, material, medidas, colores aceptables y presupuesto antes de abrir muchos enlaces. Conserva dos o tres candidatos para comparar en lugar de decidir por la primera imagen."], bullets: ["Define tipo y uso.", "Anota medidas necesarias.", "Separa precio del producto y coste total.", "Compara varios candidatos."] },
        { heading: "Trata cada entrada como una pista", paragraphs: ["El vendedor controla fotos, stock, variantes, precio y descripción. Abre la ficha actual, selecciona la opción correcta y compara las medidas con una prenda propia antes de valorar el producto."] },
        { heading: "Distingue lo que LoloBuy confirma públicamente", paragraphs: ["La página pública describe compra por enlace, inspección y fotos al llegar al almacén y 90 días de almacenamiento gratuito. No publica una tarifa permanente, un plazo garantizado ni una cantidad universal de fotos; esos datos se revisan en la cuenta actual."] },
        { heading: "Convierte el enlace en una nota de pedido", paragraphs: ["Guarda URL, fecha, color, talla, cantidad, texto original de la opción, tabla de medidas y precio visible. Una nota precisa reduce errores cuando la traducción o las imágenes de variantes son ambiguas."], bullets: ["URL y fecha", "Opción exacta", "Medidas clave", "Precio y entrega nacional", "Detalle no negociable"] },
        { heading: "Desconfía de afirmaciones sin pruebas", paragraphs: ["“Verificado”, “más barato” o “actualizado a diario” necesitan evidencia. Una presencia en el directorio no demuestra fiabilidad, autenticidad o coste final, y una experiencia positiva no representa a toda la plataforma."] },
        { heading: "Separa fotos del vendedor y fotos QC", paragraphs: ["Las fotos del vendedor presentan la oferta; las fotos QC documentan el artículo recibido. Confirma primero identidad y variante, después construcción y daños, y pide una toma específica solo si cambia la decisión."] },
        { heading: "Calcula un precio de decisión", paragraphs: ["El coste incluye producto, entrega china, posibles servicios, envío internacional, embalaje e impuestos. Usa una estimación conservadora para planificar y la cotización del paquete preparado para decidir."], bullets: ["Comprueba entrega nacional.", "Estima peso y volumen.", "Reserva margen para embalaje.", "Revisa el total final."] },
        { heading: "Conserva un registro breve", paragraphs: ["Guarda enlace, opción, tabla, precio y fecha. Los marcadores ayudan a navegar, pero no garantizan que una ficha siga disponible; repite la revisión antes de pedir."] },
        { heading: "La regla práctica", paragraphs: ["Usa el spreadsheet para descubrir, la ficha actual para confirmar, las fotos QC para inspeccionar y el paquete final para elegir envío. Mantener esas etapas separadas evita promesas falsas."] },
      ],
    },
    {
      visual: {
        eyebrow: "ORDEN DE REVISIÓN QC",
        title: "Revisa las pruebas en el orden correcto.",
        caption:
          "Una secuencia tranquila evita que un detalle menor oculte una talla equivocada, una pieza ausente o un problema estructural.",
        items: [
          ["Identidad", "Producto, color, talla, cantidad y piezas."],
          ["Estructura", "Forma, simetría, alineación y daños."],
          ["Medidas", "Dimensiones críticas comparadas con una referencia."],
          ["Acción", "Aceptar, pedir una comprobación concreta o usar el recurso actual."],
        ],
      },
      sources: [
        ["Web pública de LoloBuy", "Confirma inspección de calidad y fotografías tras la llegada al almacén."],
        ["Informe independiente temprano", "Un caso preliminar sobre fotos QC, diferencia de talla y respuesta de soporte; no es una puntuación representativa."],
      ],
      intro: [
        "Las fotos QC son más útiles con una lista. Una impresión general puede ocultar problemas; ampliar cada píxel puede crear falsas alarmas por luz, compresión o perspectiva.",
        "El objetivo no es demostrar perfección, sino decidir con información si aceptar, cambiar o devolver dentro del proceso disponible.",
      ],
      sections: [
        { heading: "Empieza por la identidad del pedido", paragraphs: ["Confirma producto, color, modelo, talla, cantidad y piezas incluidas antes de mirar costuras. El embalaje solo debe esperarse si formaba parte de la oferta."], bullets: ["Producto y color correctos", "Talla o variante correcta", "Cantidad y piezas correctas", "Sin daños evidentes"] },
        { heading: "Mantén claro el límite de los datos públicos", paragraphs: ["LoloBuy confirma inspección y fotos, pero no publica una cantidad universal gratuita ni un precio permanente para tomas o vídeos extra. Usa las imágenes reales del pedido y las opciones actuales."] },
        { heading: "Revisa forma y simetría antes de detalles pequeños", paragraphs: ["Compara hombros, mangas y cuello en ropa; ambos zapatos y suelas en calzado; silueta, asas y cierres en bolsos. Usa varios ángulos porque la perspectiva puede exagerar diferencias."] },
        { heading: "Ten en cuenta luz, compresión y distancia", paragraphs: ["La iluminación puede alterar negros y blancos, el gran angular deforma bordes y la compresión destruye texturas. Compara el mismo rasgo en varias imágenes y utiliza reglas o etiquetas como referencias."] },
        { heading: "Usa medidas para responder dudas de ajuste", paragraphs: ["Compara la colocación de la regla con la tabla del vendedor y una prenda propia. Acepta pequeñas diferencias manuales, pero solicita la medida exacta que decide el ajuste si falta."] },
        { heading: "Pide una respuesta, no solo más fotos", paragraphs: ["Indica característica, ángulo y referencia: longitud de plantilla, vista equivalente del par, ancho de pecho o primer plano del daño. Prioriza pruebas que puedan cambiar la decisión."], bullets: ["Nombra el detalle.", "Indica ángulo o comparación.", "Describe la diferencia.", "Pide evidencia útil para decidir."] },
        { heading: "Lista para ropa", paragraphs: ["Revisa cuello, cremallera, botones, estampado, bolsillos, costuras, manchas y agujeros. En pantalones mira cintura, tiro, forma de pierna y bajo."] },
        { heading: "Lista para calzado, bolsos y accesorios", paragraphs: ["En zapatos compara el par, suelas, pegamento y paneles. En bolsos revisa forma, esquinas, asas, correas, zip, forro y herrajes; usa medidas para accesorios pequeños."] },
        { heading: "Entiende lo que las fotos no demuestran", paragraphs: ["No prueban duración, composición exacta, comodidad, funcionamiento electrónico o autenticidad, ni muestran todas las partes internas. El color también depende de luz y pantalla."] },
        { heading: "Guarda las pruebas antes de mover el paquete", paragraphs: ["Conserva referencia, captura de la ficha, opción y fotos importantes. Anota fecha, imagen y solución pedida, pero no dejes que la documentación te haga perder una fecha límite."] },
        { heading: "Decide con calma: aceptar o actuar", paragraphs: ["Clasifica lo encontrado como variación normal, defecto cosmético aceptable o diferencia material. Después revisa plazo y recurso actual y comunica foto, ubicación y resultado deseado."] },
      ],
    },
    {
      visual: {
        eyebrow: "CAPAS DEL COSTE FINAL",
        title: "El precio del producto es solo la primera línea.",
        caption:
          "Separa estimaciones y cargos confirmados. La elección internacional solo es real cuando existe un paquete preparado.",
        items: [
          ["Producto", "Variante elegida al precio actual."],
          ["Coste en China", "Entrega nacional y cargos claramente mostrados."],
          ["Paquete", "Embalaje, peso, dimensiones y reglas de ruta."],
          ["Destino", "Transporte internacional e impuestos o aduanas aplicables."],
        ],
      },
      sources: [
        ["Web pública de LoloBuy", "Declaraciones públicas de 90 días de almacenamiento y servicios de almacén."],
        ["Guía comunitaria de pedidos", "Describe consolidación, selección de ruta, pago internacional y seguimiento."],
      ],
      intro: [
        "Un haul no es más barato solo por viajar junto. Consolidar puede reducir cajas repetidas, pero volumen, restricciones y calendario siguen importando.",
        "Los 90 días anunciados son una ventana de planificación, no una razón para esperar al último día. Confirma siempre el plazo de cada artículo.",
      ],
      sections: [
        { heading: "Empieza por lo que LoloBuy publica", paragraphs: ["Las fuentes públicas respaldan compra asistida, inspección, fotos, 90 días de almacenamiento y un flujo posterior de consolidación, ruta y seguimiento. No crean una tarifa permanente para tu paquete."] },
        { heading: "Diseña el paquete primero en papel", paragraphs: ["Lista peso, dimensiones, material y cuidado de cada artículo. Detecta mezclas problemáticas, como prendas voluminosas con calzado pesado o accesorios frágiles, y decide qué puede esperar."] },
        { heading: "Mantén las estimaciones en rangos", paragraphs: ["El peso del vendedor no es el peso embalado. Usa un rango bajo y alto y añade margen para despacho, entrega nacional, entrada, QC, embalaje, exportación y aduanas."], bullets: ["Peso estimado bajo y alto", "Embalaje probable", "Compatibilidad o restricción", "Fecha personal de envío"] },
        { heading: "Entiende peso real y volumétrico", paragraphs: ["El real procede de la báscula; el volumétrico convierte dimensiones con una fórmula de la ruta. Puede cobrarse el mayor. Quitar cajas reduce volumen, pero también protección."], bullets: ["Lo denso suele pagar peso real.", "Lo ligero y voluminoso puede pagar volumen.", "El embalaje cambia ambos.", "Los datos del almacén son mejores que una suposición."] },
        { heading: "Usa el almacenamiento como margen", paragraphs: ["Permite esperar llegadas y resolver diferencias antes del envío. Registra la fecha de cada artículo y fija un límite personal anterior al máximo de la plataforma."] },
        { heading: "Consolida pensando en compatibilidad", paragraphs: ["Artículos con baterías, líquidos, imanes, alimentos, marcas u otras restricciones pueden limitar rutas. Los objetos pesados pueden aplastar textiles; lo frágil puede necesitar refuerzo o paquete separado."] },
        { heading: "Compara consolidar y dividir con honestidad", paragraphs: ["Una caja puede ahorrar cargos base, pero también activar peso volumétrico, umbrales de tamaño o incompatibilidades. Compara una cotización consolidada con dos cotizaciones reales, no con una alternativa imaginada."] },
        { heading: "Compara rutas más allá del precio", paragraphs: ["Revisa regla de peso, plazo estimado, seguimiento, compensación, restricciones y trato en destino. Los impuestos y las reglas de importación dependen del país y no son una promesa del directorio."] },
        { heading: "Lee el seguimiento como una secuencia", paragraphs: ["El tracking muestra escaneos, no movimiento continuo. Conserva número, ruta y fecha; un periodo sin actualización no prueba pérdida, pero una excepción debe revisarse con la parte adecuada."] },
        { heading: "Ensaya la presentación final", paragraphs: ["Antes de pagar revisa contenido, dirección, ruta, declaración, protección, embalaje y peso facturable. Si el total supera la estimación, busca la causa antes de cambiar de ruta o dividir."] },
        { heading: "Un ritmo de planificación útil", paragraphs: ["Compra pensando en coste total, inspecciona cada llegada, resuelve pronto, combina artículos compatibles, compara rutas elegibles y revisa el paquete final."] },
      ],
    },
    {
      visual: {
        eyebrow: "ESCALA DE PRUEBAS",
        title: "Una reseña útil muestra el origen de cada afirmación.",
        caption:
          "Las declaraciones de la plataforma explican el servicio previsto; un informe documenta un caso; la cuenta actual controla precios y plazos.",
        items: [
          ["Servicio publicado", "Compra por enlace, inspección, fotos y 90 días."],
          ["Caso observado", "Un comprador informó de una diferencia de talla detectada y una devolución gestionada."],
          ["Aún desconocido", "Coste final, resultado del paquete y consistencia entre pedidos."],
          ["Tu verificación", "Comprueba cotización, pruebas y recurso actual antes de pagar."],
        ],
      },
      sources: [
        ["Web pública de LoloBuy", "Fuente primaria para compra, inspección, fotografía y almacenamiento."],
        ["Informe preliminar independiente", "Relato en primera persona sobre calzado, bolsos, QC, soporte y una diferencia de talla."],
        ["Guía comunitaria de pedidos", "Descripción pública usada para comparar el caso con el flujo anunciado."],
      ],
      intro: [
        "Los servicios jóvenes acumulan promoción antes que suficientes pedidos independientes completos. LoloBuy está en esa etapa: el modelo público es reconocible, pero la base de reseñas comprobables sigue siendo pequeña.",
        "Este análisis estudia un informe preliminar y separa lo que realmente probó de las etapas aún sin completar. Esa trazabilidad es más útil que una puntuación.",
      ],
      sections: [
        { heading: "Por qué importa la palabra «preliminar»", paragraphs: ["El propio autor presentó su opinión antes de completar el ciclo internacional. Por tanto, el caso informa sobre compra, almacén y soporte, no sobre coste final, tránsito, aduanas o entrega."] },
        { heading: "Qué probó realmente el comprador", paragraphs: ["El informe describió compras de calzado y bolsos, navegación, fotos QC, soporte y una devolución por tallas distintas. Es evidencia concreta de un caso, no una muestra amplia."] },
        { heading: "El incidente de dos tallas es el detalle más útil", paragraphs: ["Detectar dos tallas diferentes demuestra por qué el QC debe empezar por identidad y variante. La devolución gestionada es una señal positiva para ese caso, no una garantía de todos los vendedores o plazos."] },
        { heading: "Qué pueden y no pueden decir unas fotos «sólidas»", paragraphs: ["La valoración sugiere que el comprador pudo tomar decisiones con las imágenes, pero no define número, ángulos o consistencia. Las fotos no prueban autenticidad, duración o composición."] },
        { heading: "Los comentarios sobre interfaz e historial son útiles, pero personales", paragraphs: ["Una interfaz comprensible y el historial de navegación reducen fricción para ese usuario. Otras personas, dispositivos o idiomas pueden vivir una experiencia distinta."] },
        { heading: "Soporte rápido en un caso es una señal, no una promesa", paragraphs: ["La respuesta descrita es positiva, pero una sola conversación no establece tiempos de servicio generales ni resultados para casos complejos."] },
        { heading: "El enlace de referencia debe permanecer visible", paragraphs: ["Si el autor recibe un beneficio por referidos, el incentivo debe considerarse al valorar el tono. No invalida hechos documentados, pero exige separar observación de recomendación."] },
        { heading: "Las mayores incógnitas empiezan al enviar el paquete", paragraphs: ["Sin paquete entregado no se pueden juzgar coste total, peso facturable, rutas, embalaje, seguimiento, aduanas o consistencia. Comparaciones como «más barato» o «más rápido» siguen sin probarse."] },
        { heading: "Cómo hacer un primer pedido con pocas suposiciones", paragraphs: ["Elige una opción clara y medible, guarda la ficha y variante, evalúa el QC antes de ampliar el pedido y espera los datos preparados antes de juzgar el transporte."], bullets: ["Producto con opciones claras", "Ficha y variante guardadas", "QC antes de más pedidos", "Datos del paquete antes del coste", "Resultado entregado documentado"] },
        { heading: "Un veredicto prudente", paragraphs: ["El informe es una señal temprana positiva para compra y almacén: detectó una diferencia y describe fotos y soporte útiles. No basta para una puntuación global; falta el ciclo internacional completo y una muestra mayor."] },
      ],
    },
  ],
  de: [
    {
      visual: { eyebrow: "VIER-QUELLEN-REGEL", title: "Eine Entscheidung, vier verschiedene Quellen.", caption: "Das Verzeichnis startet die Suche; Live-Angebot, QC-Nachweis und Packdaten übernehmen später.", items: [["Verzeichnis", "Produktidee finden und Kategorien vergleichen."], ["Live-Angebot", "Verkäufer, Option, Preis und Beschreibung bestätigen."], ["Lager-QC", "Den tatsächlich eingegangenen Artikel prüfen."], ["Gepacktes Paket", "Versand nach Gewicht, Maßen und Zulässigkeit wählen."]] },
      sources: [["Öffentliche LoloBuy-Website", "Öffentliche Angaben zu Einkauf, Prüfung, Fotos und 90 Tagen Lagerung."], ["LoloBuy Community-Bestellleitfaden", "Öffentlicher Überblick über die Bestellphasen."]],
      intro: ["Ein gutes Spreadsheet verkürzt den Weg von einer Idee zu einem prüfbaren Angebot. Es ersetzt nicht die Kontrolle von Verkäufer, Preis, Optionen und Einschränkungen.", "Dieser Ratgeber trennt Verzeichnis, Live-Angebot, QC-Fotos und endgültige Paketentscheidung."],
      sections: [
        { heading: "Mit Absicht statt Endlos-Feed beginnen", paragraphs: ["Kategorie, Zweck, Material, Maße, Farben und Budget vor der Suche festlegen. Zwei oder drei Kandidaten vergleichen statt die erste Abbildung zu wählen."], bullets: ["Artikeltyp und Zweck", "Wichtige Maße", "Artikel- und Gesamtkosten trennen", "Mehrere Kandidaten"] },
        { heading: "Jeden Eintrag als Hinweis behandeln", paragraphs: ["Der Verkäufer steuert Bilder, Bestand, Varianten, Preis und Text. Aktuelles Angebot öffnen, exakte Option wählen und Maße mit einem passenden eigenen Artikel vergleichen."] },
        { heading: "Öffentlich bestätigte LoloBuy-Schritte erkennen", paragraphs: ["Öffentlich beschrieben sind Bestellung per Link, Prüfung und Fotos nach Lagereingang sowie 90 Tage kostenlose Lagerung. Festpreise, Garantielaufzeiten und allgemeine Fotozahlen müssen im Live-Konto geprüft werden."] },
        { heading: "Aus dem Link eine Bestellnotiz machen", paragraphs: ["URL, Datum, Farbe, Größe, Menge, Originaltext der Option, Maßtabelle und Preis speichern. So bleiben mehrdeutige Übersetzungen und Varianten nachvollziehbar."], bullets: ["URL und Datum", "Exakte Option", "Schlüsselmaße", "Preis und China-Versand", "Unverzichtbares Merkmal"] },
        { heading: "Beleglose Spreadsheet-Aussagen hinterfragen", paragraphs: ["„Verifiziert“, „am günstigsten“ oder „täglich aktualisiert“ brauchen Nachweise. Ein Verzeichniseintrag beweist weder Zuverlässigkeit, Echtheit noch Endkosten."] },
        { heading: "Verkäuferbilder von Lager-QC trennen", paragraphs: ["Verkäuferbilder zeigen das Versprechen; QC-Fotos den eingegangenen Artikel. Erst Identität und Variante, dann Verarbeitung und Schäden prüfen."] },
        { heading: "Einen Entscheidungspreis kalkulieren", paragraphs: ["Produkt, China-Versand, Leistungen, internationaler Transport, Verpackung und Steuern getrennt planen. Die endgültige Entscheidung basiert auf dem gepackten Paket."], bullets: ["China-Versand prüfen", "Gewicht und Volumen schätzen", "Verpackungspuffer", "Endangebot prüfen"] },
        { heading: "Kurzen Prüfvermerk behalten", paragraphs: ["Link, Option, Maßtabelle, Preis und Datum speichern. Lesezeichen garantieren keine Verfügbarkeit; vor der Bestellung erneut prüfen."] },
        { heading: "Die praktische Regel", paragraphs: ["Spreadsheet zum Entdecken, Live-Angebot zum Bestätigen, QC-Fotos zum Prüfen und Paketangebot zum Versenden nutzen."] },
      ],
    },
    {
      visual: { eyebrow: "QC-REIHENFOLGE", title: "Nachweise in der richtigen Reihenfolge prüfen.", caption: "Eine ruhige Reihenfolge verhindert, dass Kleinigkeiten eine falsche Größe, fehlende Teile oder Strukturprobleme überdecken.", items: [["Identität", "Artikel, Farbe, Größe, Menge und Teile."], ["Struktur", "Form, Symmetrie, Ausrichtung und Schäden."], ["Maße", "Passformrelevante Werte mit Referenz."], ["Aktion", "Annehmen, gezielt prüfen lassen oder aktuellen Weg nutzen."]] },
      sources: [["Öffentliche LoloBuy-Website", "Bestätigt Qualitätsprüfung und Fotografie nach Lagereingang."], ["Früher unabhängiger Nutzerbericht", "Ein vorläufiger Fall zu QC, Größenabweichung und Support; keine repräsentative Bewertung."]],
      intro: ["QC-Fotos funktionieren am besten mit Checkliste. Gesamteindruck kann Probleme verbergen, Pixel-Zoom kann durch Licht oder Perspektive Fehlalarm auslösen.", "Ziel ist eine fundierte Annahme-, Umtausch- oder Rückgabeentscheidung, nicht der Beweis perfekter Ware."],
      sections: [
        { heading: "Mit der Auftragsidentität beginnen", paragraphs: ["Artikel, Farbe, Modell, Größe, Menge und enthaltene Teile zuerst bestätigen. Verpackung nur erwarten, wenn sie Bestandteil des Angebots war."], bullets: ["Artikel und Farbe", "Größe oder Variante", "Menge und Teile", "Keine sichtbaren Schäden"] },
        { heading: "Grenze öffentlicher Angaben klar halten", paragraphs: ["LoloBuy bestätigt Prüfung und Fotos, aber keine allgemeine kostenlose Bildzahl oder dauerhafte Zusatzpreise. Tatsächliche Bilder und Kontooptionen verwenden."] },
        { heading: "Form und Symmetrie vor Kleinigkeiten lesen", paragraphs: ["Bei Kleidung Schultern und Ärmel, bei Schuhen Paar und Sohlen, bei Taschen Silhouette und Griffe vergleichen. Perspektive durch mehrere Blickwinkel ausgleichen."] },
        { heading: "Licht, Kompression und Abstand berücksichtigen", paragraphs: ["Beleuchtung verschiebt Farben, Weitwinkel verzerrt Kanten und Kompression zerstört Textur. Dasselbe Merkmal in mehreren Bildern und mit festen Referenzen prüfen."] },
        { heading: "Passformfragen mit Maßen beantworten", paragraphs: ["Linealposition mit Maßtabelle und eigenem Artikel vergleichen. Kleine manuelle Abweichungen zulassen, fehlendes entscheidendes Maß gezielt anfragen."] },
        { heading: "Eine Antwort statt einfach mehr Fotos verlangen", paragraphs: ["Merkmal, Winkel und Referenz nennen: Innenlänge, Paaransicht, Brustweite oder Schadensdetail. Nur Nachweise priorisieren, die die Entscheidung ändern."], bullets: ["Merkmal nennen", "Winkel angeben", "Abweichung beschreiben", "Entscheidungsrelevanten Nachweis wählen"] },
        { heading: "Kleidungs-Checkliste", paragraphs: ["Ausschnitt, Verschluss, Knöpfe, Druck, Taschen, Nähte, Flecken und Löcher prüfen; bei Hosen Bund, Leibhöhe, Beinform und Saum."] },
        { heading: "Schuhe, Taschen und Zubehör", paragraphs: ["Bei Schuhen Paar, Sohlen, Kleber und Paneele vergleichen. Bei Taschen Form, Ecken, Griffe, Gurte, Reißverschluss, Futter und Beschläge ansehen."] },
        { heading: "Wissen, was Fotos nicht belegen", paragraphs: ["Bilder beweisen weder Haltbarkeit, Zusammensetzung, Komfort, Elektronikfunktion noch Echtheit und zeigen nicht alle inneren Teile."] },
        { heading: "Nachweise vor dem Weiterversand sichern", paragraphs: ["Referenz, Angebot, Option und wichtige Bilder speichern. Datum, Bild und gewünschte Lösung notieren, ohne Fristen zu verpassen."] },
        { heading: "Ruhige Annahme- oder Handlungsentscheidung", paragraphs: ["Befund als normale Variation, akzeptablen Schönheitsfehler oder wesentliche Abweichung einordnen; dann aktuelle Frist und Abhilfe prüfen."] },
      ],
    },
    {
      visual: { eyebrow: "GESAMTKOSTEN-STAPEL", title: "Der Produktpreis ist nur die erste Zeile.", caption: "Schätzungen und bestätigte Gebühren trennen. Sinnvoll wird die internationale Wahl erst mit Packdaten.", items: [["Produkt", "Gewählte Variante zum aktuellen Preis."], ["China-Kosten", "Inlandsversand und klar ausgewiesene Gebühren."], ["Paket", "Verpackung, Gewicht, Maße und Routenregeln."], ["Ziel", "Internationaler Transport plus Steuern und Zoll."]] },
      sources: [["Öffentliche LoloBuy-Website", "90 Tage kostenlose Lagerung und Lagerleistungen."], ["Community-Bestellleitfaden", "Bündelung, Routenwahl, internationale Zahlung und Tracking."]],
      intro: ["Mehrere Artikel zusammen sind nicht automatisch günstiger. Bündelung kann Grundgebühren sparen, doch Volumen, Einschränkungen und Zeit bleiben wichtig.", "Die beworbenen 90 Tage sind ein Planungsfenster, kein Anlass, bis zum letzten Tag zu warten."],
      sections: [
        { heading: "Mit veröffentlichten LoloBuy-Angaben starten", paragraphs: ["Öffentliche Quellen stützen Einkaufshilfe, Prüfung, Fotos, 90 Tage Lagerung und spätere Bündelung. Sie liefern keine dauerhafte Paketpreisliste."] },
        { heading: "Paket zuerst auf Papier bauen", paragraphs: ["Gewicht, Maße, Material und Schutzbedarf je Artikel notieren. Problematische Mischungen und eine persönliche Versandentscheidung vorab erkennen."] },
        { heading: "Schätzungen als Spannen führen", paragraphs: ["Verkäufergewicht ist nicht Packgewicht. Niedrig- und Hochwert plus Zeitpuffer für Versand, Eingang, QC, Packen, Export und Zoll verwenden."], bullets: ["Gewichtsspanne", "Wahrscheinliche Verpackung", "Kompatibilität", "Eigener Versandtermin"] },
        { heading: "Ist- und Volumengewicht verstehen", paragraphs: ["Istgewicht kommt von der Waage, Volumengewicht aus Außenmaßen und Routenformel. Berechnet werden kann der höhere Wert; weniger Verpackung kann Schutz kosten."], bullets: ["Dicht: oft Istgewicht", "Leicht und groß: oft Volumen", "Verpackung ändert beides", "Lagerdaten schlagen Schätzung"] },
        { heading: "Lagerung als Puffer nutzen", paragraphs: ["Ankünfte können warten und QC-Probleme geklärt werden. Datum je Artikel notieren und eine frühere persönliche Frist setzen."] },
        { heading: "Mit Kompatibilität konsolidieren", paragraphs: ["Batterien, Flüssigkeiten, Magnete und andere Kategorien können Routen einschränken. Schweres kann Textilien drücken; Zerbrechliches braucht Schutz oder Trennung."] },
        { heading: "Bündeln und Teilen ehrlich vergleichen", paragraphs: ["Eine Box kann Grundgebühren sparen, aber Volumengewicht oder Größenlimits auslösen. Ein bestätigtes Bündelangebot mit zwei bestätigten Teilangeboten vergleichen."] },
        { heading: "Routen nicht nur nach Preis vergleichen", paragraphs: ["Gewichtsregel, Laufzeit, Tracking, Entschädigung, Einschränkungen und Zielland prüfen. Steuern und Einfuhrrecht sind keine Verzeichnisgarantie."] },
        { heading: "Tracking als Scanfolge lesen", paragraphs: ["Tracking zeigt Ereignisse, nicht dauernde Bewegung. Nummer, Route und Datum speichern; längere Ruhe anhand aktueller Routenhife oder Ausnahme prüfen."] },
        { heading: "Endeinreichung durchspielen", paragraphs: ["Inhalt, Adresse, Route, Deklaration, Schutz, Verpackung und Abrechnungsgewicht vor Zahlung prüfen. Große Abweichungen zuerst erklären."] },
        { heading: "Ein nützlicher Planungsrhythmus", paragraphs: ["Gesamtkosten mitdenken, Ankünfte prüfen, Probleme früh lösen, kompatibel bündeln, zulässige Routen vergleichen und Endpaket prüfen."] },
      ],
    },
    {
      visual: { eyebrow: "BELEGLEITER", title: "Ein nützlicher Bericht zeigt die Quelle jeder Aussage.", caption: "Plattformaussagen beschreiben den Sollprozess, ein Bericht einen Fall, das Konto aktuelle Preise und Fristen.", items: [["Veröffentlichter Service", "Linkkauf, Prüfung, Fotos und 90 Tage."], ["Beobachteter Fall", "Größenabweichung entdeckt und Rückgabe bearbeitet."], ["Noch offen", "Endkosten, Paketergebnis und Wiederholbarkeit."], ["Eigene Prüfung", "Angebot, Belege und Abhilfe vor Zahlung prüfen."]] },
      sources: [["Öffentliche LoloBuy-Website", "Primärquelle zu Einkauf, Prüfung, Fotos und Lagerung."], ["Vorläufiger unabhängiger Bericht", "Erfahrung mit Schuhen, Taschen, QC, Support und Größenabweichung."], ["Community-Bestellleitfaden", "Öffentliche Prozessbeschreibung zum Vergleich."]],
      intro: ["Junge Dienste sammeln Werbung früher als vollständige unabhängige Bestellnachweise. Bei LoloBuy ist das Modell sichtbar, die überprüfbare Berichtsbasis aber noch klein.", "Diese Analyse trennt getestete Einkauf- und Lagerphasen von noch nicht abgeschlossenen Versandphasen."],
      sections: [
        { heading: "Warum „vorläufig“ wichtig ist", paragraphs: ["Der Autor berichtete vor Abschluss des internationalen Zyklus. Der Fall sagt etwas über Einkauf, Lager und Support, nicht über Endkosten, Zoll oder Zustellung."] },
        { heading: "Was der Käufer tatsächlich testete", paragraphs: ["Beschrieben wurden Schuhe, Taschen, Navigation, QC-Fotos, Support und Rückgabe wegen zweier Größen. Konkreter Fall, keine breite Stichprobe."] },
        { heading: "Der Zwei-Größen-Fall ist das nützlichste Detail", paragraphs: ["Er zeigt, warum QC mit Identität und Variante beginnt. Die bearbeitete Rückgabe ist positiv für diesen Fall, keine allgemeine Garantie."] },
        { heading: "Was „solide QC-Fotos“ sagen können", paragraphs: ["Die Bilder waren für die Entscheidung offenbar brauchbar, ohne Umfang oder Konsistenz zu belegen. Echtheit, Haltbarkeit und Material bleiben offen."] },
        { heading: "Oberfläche und Verlauf sind nützlich, aber persönlich", paragraphs: ["Verständliche Bedienung und Verlauf halfen diesem Nutzer. Andere Geräte, Sprachen oder Erwartungen können abweichen."] },
        { heading: "Schneller Support in einem Fall ist kein Serviceversprechen", paragraphs: ["Die Antwort ist ein positives Signal, reicht aber nicht für allgemeine Reaktionszeiten oder komplexe Fälle."] },
        { heading: "Ein Empfehlungslink muss sichtbar bleiben", paragraphs: ["Ein möglicher Vorteil beeinflusst die Tonbewertung. Dokumentierte Fakten bleiben nutzbar, Beobachtung und Empfehlung müssen getrennt werden."] },
        { heading: "Die größten Fragen beginnen beim Paketversand", paragraphs: ["Ohne zugestelltes Paket bleiben Gesamtkosten, Routen, Verpackung, Tracking, Zoll und Beständigkeit unbewertet."] },
        { heading: "Einen ersten Auftrag mit wenigen Annahmen durchführen", paragraphs: ["Klare, messbare Option wählen, Angebot sichern, QC vor weiteren Bestellungen bewerten und Packdaten vor der Versandbewertung abwarten."], bullets: ["Klare Optionen", "Angebot und Variante sichern", "QC zuerst", "Packdaten abwarten", "Zustellergebnis dokumentieren"] },
        { heading: "Ein vorsichtiges Urteil", paragraphs: ["Der Bericht ist ein frühes positives Signal für Einkauf und Lager, aber keine Gesamtbewertung. Internationaler Zyklus und größere Stichprobe fehlen."] },
      ],
    },
  ],
  fr: [
    {
      visual: { eyebrow: "RÈGLE DES QUATRE SOURCES", title: "Une décision, quatre sources différentes.", caption: "Le catalogue lance la recherche ; la fiche actuelle, le QC et le colis emballé prennent le relais.", items: [["Catalogue", "Trouver une idée et comparer les catégories."], ["Fiche actuelle", "Confirmer vendeur, option, prix et description."], ["QC d'entrepôt", "Inspecter l'article réellement reçu."], ["Colis emballé", "Choisir selon poids, dimensions et admissibilité."]] },
      sources: [["Site public LoloBuy", "Déclarations sur achat, inspection, photos et 90 jours de stockage."], ["Guide communautaire LoloBuy", "Aperçu public des étapes de commande."]],
      intro: ["Un spreadsheet utile réduit le trajet entre une idée et une fiche évaluable. Il ne remplace pas la vérification du vendeur, du prix, des options et des restrictions.", "Ce guide sépare catalogue, fiche actuelle, preuves QC et décision finale d'expédition."],
      sections: [
        { heading: "Commencer par l'intention, pas par un flux infini", paragraphs: ["Définissez catégorie, usage, matière, mesures, couleurs et budget avant d'ouvrir de nombreux liens. Comparez deux ou trois candidats."], bullets: ["Type et usage", "Mesures nécessaires", "Prix article et coût total séparés", "Plusieurs candidats"] },
        { heading: "Traiter chaque entrée comme une piste", paragraphs: ["Le vendeur contrôle images, stock, variantes, prix et texte. Ouvrez la fiche actuelle, sélectionnez l'option exacte et comparez les mesures."] },
        { heading: "Connaître les étapes confirmées par LoloBuy", paragraphs: ["La page publique décrit commande par lien, inspection, photos et 90 jours de stockage. Tarifs permanents, délais garantis et nombre universel de photos restent à vérifier dans le compte."] },
        { heading: "Transformer le lien en note de commande", paragraphs: ["Conservez URL, date, couleur, taille, quantité, texte original de l'option, tableau et prix. Une note précise réduit l'ambiguïté."], bullets: ["URL et date", "Option exacte", "Mesures clés", "Prix et livraison chinoise", "Détail indispensable"] },
        { heading: "Se méfier des affirmations sans preuve", paragraphs: ["« Vérifié », « moins cher » ou « mis à jour chaque jour » exigent des preuves. Une présence au catalogue ne prouve ni fiabilité, ni authenticité, ni coût final."] },
        { heading: "Séparer photos vendeur et photos QC", paragraphs: ["Les premières présentent l'offre ; les secondes documentent l'article reçu. Vérifiez identité et variante avant construction et dommages."] },
        { heading: "Calculer un prix de décision", paragraphs: ["Additionnez produit, livraison chinoise, services, transport international, emballage et taxes. Estimez pour planifier, utilisez le colis réel pour décider."], bullets: ["Livraison chinoise", "Poids et volume", "Marge d'emballage", "Devis final"] },
        { heading: "Garder une trace courte", paragraphs: ["Conservez lien, option, tableau, prix et date. Un favori ne garantit pas la disponibilité ; revérifiez avant commande."] },
        { heading: "La règle pratique", paragraphs: ["Catalogue pour découvrir, fiche pour confirmer, QC pour inspecter et devis final pour expédier."] },
      ],
    },
    {
      visual: { eyebrow: "ORDRE DU QC", title: "Examiner les preuves dans le bon ordre.", caption: "Une séquence calme empêche un détail mineur de masquer mauvaise taille, pièce absente ou problème structurel.", items: [["Identité", "Article, couleur, taille, quantité et pièces."], ["Structure", "Forme, symétrie, alignement et dommages."], ["Mesures", "Dimensions critiques comparées à une référence."], ["Action", "Accepter, demander un contrôle ciblé ou utiliser le recours actuel."]] },
      sources: [["Site public LoloBuy", "Confirme contrôle qualité et photographies après réception."], ["Premier témoignage indépendant", "Cas préliminaire sur QC, écart de taille et support ; pas une note représentative."]],
      intro: ["Les photos QC sont plus utiles avec une liste. Une impression générale cache des problèmes ; zoomer chaque pixel crée parfois de fausses alertes.", "Le but est de décider en connaissance de cause, pas de prouver la perfection."],
      sections: [
        { heading: "Commencer par l'identité de la commande", paragraphs: ["Confirmez article, couleur, modèle, taille, quantité et pièces avant les coutures. N'attendez l'emballage que s'il faisait partie de l'offre."], bullets: ["Article et couleur", "Taille ou variante", "Quantité et pièces", "Aucun dommage évident"] },
        { heading: "Garder claire la limite des faits publics", paragraphs: ["LoloBuy confirme inspection et photos, mais pas un nombre universel gratuit ni un tarif permanent pour des images supplémentaires. Utilisez les éléments réels du compte."] },
        { heading: "Lire forme et symétrie avant les petits détails", paragraphs: ["Comparez épaules et manches, paire de chaussures et semelles, silhouette et poignées. Plusieurs angles réduisent l'effet de perspective."] },
        { heading: "Tenir compte de la lumière et de la compression", paragraphs: ["Éclairage, grand-angle et compression modifient couleur, bords et texture. Comparez plusieurs cadres avec règle ou étiquette comme référence."] },
        { heading: "Utiliser les mesures pour la coupe", paragraphs: ["Comparez la règle au tableau vendeur et à un article adapté. Acceptez de faibles écarts manuels, demandez la mesure décisive manquante."] },
        { heading: "Demander une réponse, pas seulement plus de photos", paragraphs: ["Nommez détail, angle et référence : semelle intérieure, vue de la paire, largeur poitrine ou dommage. Privilégiez les preuves qui changent la décision."], bullets: ["Nommer le détail", "Indiquer l'angle", "Décrire l'écart", "Choisir une preuve décisive"] },
        { heading: "Liste vêtements", paragraphs: ["Contrôlez col, zip, boutons, motif, poches, coutures, taches et trous ; pour un pantalon, taille, fourche, jambe et ourlet."] },
        { heading: "Chaussures, sacs et accessoires", paragraphs: ["Pour les chaussures comparez paire, semelles, colle et panneaux. Pour les sacs vérifiez forme, coins, poignées, sangles, zip, doublure et métal."] },
        { heading: "Savoir ce que les photos ne prouvent pas", paragraphs: ["Elles ne prouvent ni durabilité, composition, confort, électronique ou authenticité et ne montrent pas toutes les parties internes."] },
        { heading: "Sauvegarder les preuves avant l'expédition", paragraphs: ["Conservez référence, fiche, option et images importantes. Notez date, photo et solution demandée sans dépasser le délai."] },
        { heading: "Décider calmement d'accepter ou d'agir", paragraphs: ["Classez variation normale, défaut cosmétique acceptable ou écart important, puis vérifiez délai et recours actuels."] },
      ],
    },
    {
      visual: { eyebrow: "PILE DU COÛT FINAL", title: "Le prix produit n'est que la première ligne.", caption: "Séparez estimations et frais confirmés. Le choix international devient réel avec les données du colis.", items: [["Produit", "Variante choisie au prix actuel."], ["Coût en Chine", "Livraison locale et frais affichés."], ["Colis", "Emballage, poids, dimensions et règles."], ["Destination", "Fret international, taxes et douane."]] },
      sources: [["Site public LoloBuy", "90 jours de stockage gratuit et services d'entrepôt."], ["Guide communautaire", "Consolidation, route, paiement international et suivi."]],
      intro: ["Regrouper plusieurs articles ne garantit pas un coût inférieur. La consolidation peut économiser des frais de base, mais volume, restrictions et calendrier comptent.", "Les 90 jours annoncés sont une marge de planification, pas une invitation à attendre le dernier jour."],
      sections: [
        { heading: "Partir de ce que LoloBuy publie", paragraphs: ["Les sources publiques soutiennent achat assisté, inspection, photos, stockage et consolidation ultérieure. Elles ne créent pas de tarif permanent pour votre colis."] },
        { heading: "Construire d'abord le colis sur papier", paragraphs: ["Listez poids, dimensions, matière et protection. Repérez les mélanges difficiles et décidez ce qui peut attendre."] },
        { heading: "Garder les estimations en fourchettes", paragraphs: ["Le poids vendeur n'est pas le poids emballé. Utilisez valeurs basse et haute plus une marge pour chaque étape logistique."], bullets: ["Fourchette de poids", "Emballage probable", "Compatibilité", "Date personnelle d'envoi"] },
        { heading: "Comprendre poids réel et volumétrique", paragraphs: ["Le réel vient de la balance ; le volumétrique des dimensions et d'une formule de route. Le plus élevé peut être facturé ; retirer une boîte réduit parfois la protection."], bullets: ["Dense : souvent poids réel", "Léger et grand : volume", "L'emballage change les deux", "Les données d'entrepôt priment"] },
        { heading: "Utiliser le stockage comme marge", paragraphs: ["Il permet d'attendre les arrivées et de résoudre le QC. Notez la date de chaque article et fixez une échéance antérieure."] },
        { heading: "Consolider selon la compatibilité", paragraphs: ["Batteries, liquides, aimants et autres catégories peuvent limiter les routes. Les objets lourds écrasent les textiles ; le fragile exige protection ou séparation."] },
        { heading: "Comparer honnêtement consolidation et séparation", paragraphs: ["Une boîte économise parfois les frais de base mais peut déclencher volume ou limites. Comparez un devis regroupé à deux devis réels."] },
        { heading: "Comparer les routes au-delà du prix", paragraphs: ["Vérifiez règle de poids, délai, suivi, indemnisation, restrictions et destination. Taxes et importation relèvent du pays."] },
        { heading: "Lire le suivi comme une suite de scans", paragraphs: ["Le suivi montre des événements, pas le mouvement continu. Gardez numéro, route et date et traitez les exceptions avec la partie compétente."] },
        { heading: "Répéter la soumission finale", paragraphs: ["Avant paiement, contrôlez contenu, adresse, route, déclaration, protection, emballage et poids facturable. Expliquez tout écart important."] },
        { heading: "Un rythme de planification utile", paragraphs: ["Penser au coût total, inspecter, résoudre tôt, regrouper ce qui est compatible, comparer les routes et relire le colis final."] },
      ],
    },
    {
      visual: { eyebrow: "ÉCHELLE DES PREUVES", title: "Un avis utile montre la source de chaque affirmation.", caption: "La plateforme décrit le service prévu, un témoignage documente un cas et le compte actuel contrôle prix et délais.", items: [["Service publié", "Achat par lien, inspection, photos et 90 jours."], ["Cas observé", "Écart de taille détecté et retour traité."], ["Encore inconnu", "Coût final, résultat du colis et régularité."], ["Votre contrôle", "Vérifier devis, preuves et recours avant paiement."]] },
      sources: [["Site public LoloBuy", "Source primaire pour achat, inspection, photos et stockage."], ["Témoignage préliminaire indépendant", "Chaussures, sacs, QC, support et écart de taille."], ["Guide communautaire", "Processus public utilisé pour comparer le cas."]],
      intro: ["Les jeunes services accumulent la promotion avant les commandes indépendantes complètes. LoloBuy présente un modèle clair, mais peu de témoignages vérifiables.", "Cette analyse distingue les étapes réellement testées de celles qui restent inachevées."],
      sections: [
        { heading: "Pourquoi le mot « préliminaire » compte", paragraphs: ["L'auteur écrivait avant la fin du cycle international. Le cas informe sur achat, entrepôt et support, pas sur coût final, douane ou livraison."] },
        { heading: "Ce que l'acheteur a réellement testé", paragraphs: ["Le récit couvre chaussures, sacs, navigation, QC, support et retour lié à deux tailles. C'est un cas concret, pas un large échantillon."] },
        { heading: "L'incident des deux tailles est le détail le plus utile", paragraphs: ["Il montre pourquoi le QC commence par identité et variante. Le retour traité est positif pour ce cas, sans garantir tous les vendeurs."] },
        { heading: "Ce que des photos « solides » peuvent dire", paragraphs: ["Les images ont apparemment permis une décision sans prouver leur nombre ou constance. Authenticité, durée et matière restent inconnues."] },
        { heading: "Interface et historique : utiles mais personnels", paragraphs: ["Une interface claire et l'historique ont aidé cet utilisateur. Appareils, langues et attentes peuvent produire une autre expérience."] },
        { heading: "Un support réactif dans un cas n'est pas une promesse", paragraphs: ["La réponse est un signal positif, insuffisant pour établir des délais généraux ou des résultats complexes."] },
        { heading: "Le lien de parrainage doit rester visible", paragraphs: ["Un avantage potentiel influence l'évaluation du ton. Les faits documentés restent utiles si observation et recommandation sont séparées."] },
        { heading: "Les plus grandes questions commencent à l'envoi", paragraphs: ["Sans colis livré, coût, routes, emballage, suivi, douane et régularité ne peuvent être jugés."] },
        { heading: "Faire une première commande avec peu d'hypothèses", paragraphs: ["Choisissez une option claire, sauvegardez la fiche, évaluez le QC avant d'ajouter et attendez les données emballées avant de juger le fret."], bullets: ["Options claires", "Fiche et variante sauvegardées", "QC d'abord", "Données du colis", "Résultat livré documenté"] },
        { heading: "Un verdict prudent", paragraphs: ["Le récit est un signal précoce positif pour achat et entrepôt, pas une note globale. Le cycle international et un échantillon plus large manquent."] },
      ],
    },
  ],
  it: [
    {
      visual: { eyebrow: "REGOLA DELLE QUATTRO FONTI", title: "Una decisione, quattro fonti diverse.", caption: "Il catalogo avvia la ricerca; scheda attuale, QC e pacco preparato controllano le fasi successive.", items: [["Catalogo", "Trova un'idea e confronta categorie."], ["Scheda attuale", "Conferma venditore, opzione, prezzo e descrizione."], ["QC di magazzino", "Controlla l'articolo realmente arrivato."], ["Pacco preparato", "Scegli in base a peso, dimensioni e idoneità."]] },
      sources: [["Sito pubblico LoloBuy", "Dichiarazioni su acquisto, ispezione, foto e 90 giorni di deposito."], ["Guida community LoloBuy", "Panoramica pubblica delle fasi dell'ordine."]],
      intro: ["Uno spreadsheet utile accorcia il percorso da un'idea a una scheda valutabile. Non sostituisce controllo di venditore, prezzo, opzioni e restrizioni.", "Questa guida separa catalogo, scheda attuale, prove QC e decisione finale sul pacco."],
      sections: [
        { heading: "Parti dall'intento, non da un feed infinito", paragraphs: ["Definisci categoria, uso, materiale, misure, colori e budget prima di aprire molti link. Confronta due o tre candidati."], bullets: ["Tipo e uso", "Misure necessarie", "Prezzo articolo e costo totale separati", "Più candidati"] },
        { heading: "Tratta ogni voce come una pista", paragraphs: ["Il venditore controlla immagini, stock, varianti, prezzo e testo. Apri la scheda attuale, scegli l'opzione esatta e confronta le misure."] },
        { heading: "Conosci ciò che LoloBuy conferma pubblicamente", paragraphs: ["La pagina descrive ordine tramite link, ispezione, foto e 90 giorni di deposito. Tariffe permanenti, tempi garantiti e quantità universali vanno verificati nell'account."] },
        { heading: "Trasforma il link in una nota d'ordine", paragraphs: ["Salva URL, data, colore, taglia, quantità, testo originale, tabella e prezzo. Una nota precisa riduce ambiguità."], bullets: ["URL e data", "Opzione esatta", "Misure chiave", "Prezzo e consegna cinese", "Dettaglio indispensabile"] },
        { heading: "Diffida delle affermazioni senza prove", paragraphs: ["“Verificato”, “più economico” o “aggiornato ogni giorno” richiedono prove. La presenza nel catalogo non dimostra affidabilità, autenticità o costo finale."] },
        { heading: "Separa foto venditore e foto QC", paragraphs: ["Le prime presentano l'offerta; le seconde documentano l'articolo ricevuto. Controlla identità e variante prima di costruzione e danni."] },
        { heading: "Calcola un prezzo decisionale", paragraphs: ["Considera prodotto, consegna cinese, servizi, trasporto internazionale, imballaggio e tasse. Stima per pianificare, usa il pacco reale per decidere."], bullets: ["Consegna cinese", "Peso e volume", "Margine imballaggio", "Preventivo finale"] },
        { heading: "Conserva un registro breve", paragraphs: ["Salva link, opzione, tabella, prezzo e data. Un preferito non garantisce disponibilità; ricontrolla prima dell'ordine."] },
        { heading: "La regola pratica", paragraphs: ["Catalogo per scoprire, scheda per confermare, QC per ispezionare e preventivo finale per spedire."] },
      ],
    },
    {
      visual: { eyebrow: "ORDINE DEL QC", title: "Esamina le prove nell'ordine giusto.", caption: "Una sequenza calma evita che un dettaglio minore nasconda taglia errata, pezzo mancante o problema strutturale.", items: [["Identità", "Articolo, colore, taglia, quantità e pezzi."], ["Struttura", "Forma, simmetria, allineamento e danni."], ["Misure", "Dimensioni critiche confrontate con un riferimento."], ["Azione", "Accetta, chiedi un controllo mirato o usa il rimedio attuale."]] },
      sources: [["Sito pubblico LoloBuy", "Conferma controllo qualità e foto dopo l'arrivo."], ["Prima esperienza indipendente", "Caso preliminare su QC, differenza di taglia e supporto; non un punteggio rappresentativo."]],
      intro: ["Le foto QC funzionano meglio con una lista. L'impressione generale nasconde problemi; lo zoom estremo crea falsi allarmi.", "Lo scopo è decidere con informazioni, non provare la perfezione."],
      sections: [
        { heading: "Inizia dall'identità dell'ordine", paragraphs: ["Conferma articolo, colore, modello, taglia, quantità e pezzi prima delle cuciture. Aspettati l'imballaggio solo se incluso nell'offerta."], bullets: ["Articolo e colore", "Taglia o variante", "Quantità e pezzi", "Nessun danno evidente"] },
        { heading: "Mantieni chiaro il limite dei fatti pubblici", paragraphs: ["LoloBuy conferma ispezione e foto, ma non una quantità universale gratuita o prezzi permanenti per extra. Usa immagini e opzioni reali dell'account."] },
        { heading: "Leggi forma e simmetria prima dei dettagli", paragraphs: ["Confronta spalle e maniche, coppia e suole, forma e manici. Più angoli riducono l'effetto della prospettiva."] },
        { heading: "Considera luce, compressione e distanza", paragraphs: ["Illuminazione, grandangolo e compressione cambiano colore, bordi e texture. Confronta più fotogrammi con righello o etichetta."] },
        { heading: "Usa le misure per la vestibilità", paragraphs: ["Confronta il righello con tabella venditore e un capo adatto. Accetta piccoli scarti manuali, chiedi la misura decisiva mancante."] },
        { heading: "Chiedi una risposta, non solo più foto", paragraphs: ["Indica dettaglio, angolo e riferimento: soletta, vista coppia, larghezza torace o danno. Dai priorità alle prove che cambiano la decisione."], bullets: ["Nomina il dettaglio", "Indica l'angolo", "Descrivi la differenza", "Scegli una prova decisiva"] },
        { heading: "Lista per abbigliamento", paragraphs: ["Controlla collo, zip, bottoni, stampa, tasche, cuciture, macchie e fori; nei pantaloni vita, cavallo, gamba e orlo."] },
        { heading: "Scarpe, borse e accessori", paragraphs: ["Per le scarpe confronta coppia, suole, colla e pannelli. Per le borse forma, angoli, manici, cinturini, zip, fodera e metallo."] },
        { heading: "Conosci ciò che le foto non provano", paragraphs: ["Non provano durata, composizione, comfort, elettronica o autenticità e non mostrano tutte le parti interne."] },
        { heading: "Salva le prove prima della spedizione", paragraphs: ["Conserva riferimento, scheda, opzione e immagini importanti. Annota data, foto e soluzione senza perdere la scadenza."] },
        { heading: "Decidi con calma se accettare o agire", paragraphs: ["Classifica variazione normale, difetto estetico accettabile o differenza sostanziale, poi verifica scadenza e rimedio attuali."] },
      ],
    },
    {
      visual: { eyebrow: "STRATI DEL COSTO FINALE", title: "Il prezzo prodotto è solo la prima riga.", caption: "Separa stime e costi confermati. La scelta internazionale diventa reale con i dati del pacco.", items: [["Prodotto", "Variante scelta al prezzo attuale."], ["Costo in Cina", "Consegna nazionale e addebiti mostrati."], ["Pacco", "Imballaggio, peso, dimensioni e regole."], ["Destinazione", "Trasporto internazionale, tasse e dogana."]] },
      sources: [["Sito pubblico LoloBuy", "90 giorni di deposito gratuito e servizi di magazzino."], ["Guida community", "Consolidamento, rotta, pagamento internazionale e tracking."]],
      intro: ["Raggruppare più articoli non garantisce un costo minore. Il consolidamento può ridurre spese base, ma volume, restrizioni e tempi contano.", "I 90 giorni pubblicizzati sono una finestra di pianificazione, non un invito ad aspettare l'ultimo giorno."],
      sections: [
        { heading: "Parti da ciò che LoloBuy pubblica", paragraphs: ["Le fonti pubbliche supportano acquisto assistito, ispezione, foto, deposito e successivo consolidamento. Non creano un listino permanente per il tuo pacco."] },
        { heading: "Costruisci prima il pacco su carta", paragraphs: ["Elenca peso, dimensioni, materiale e protezione. Individua combinazioni difficili e decidi cosa può aspettare."] },
        { heading: "Mantieni le stime in intervalli", paragraphs: ["Il peso del venditore non è quello imballato. Usa valore basso e alto più margine per ogni fase logistica."], bullets: ["Intervallo di peso", "Imballaggio probabile", "Compatibilità", "Data personale di spedizione"] },
        { heading: "Comprendi peso reale e volumetrico", paragraphs: ["Il reale viene dalla bilancia; il volumetrico da dimensioni e formula della rotta. Può essere addebitato il maggiore; togliere scatole riduce anche protezione."], bullets: ["Denso: spesso peso reale", "Leggero e grande: volume", "Imballaggio cambia entrambi", "Dati di magazzino migliori"] },
        { heading: "Usa il deposito come margine", paragraphs: ["Permette di attendere arrivi e risolvere il QC. Registra la data di ogni articolo e fissa una scadenza precedente."] },
        { heading: "Consolida in base alla compatibilità", paragraphs: ["Batterie, liquidi, magneti e altre categorie possono limitare rotte. Gli oggetti pesanti schiacciano tessili; i fragili richiedono protezione o separazione."] },
        { heading: "Confronta onestamente consolidamento e divisione", paragraphs: ["Una scatola può risparmiare costi base ma attivare volume o limiti. Confronta un preventivo unito con due preventivi reali."] },
        { heading: "Confronta le rotte oltre il prezzo", paragraphs: ["Verifica regola di peso, tempi, tracking, compensazione, restrizioni e destinazione. Tasse e importazione dipendono dal paese."] },
        { heading: "Leggi il tracking come sequenza di scansioni", paragraphs: ["Il tracking mostra eventi, non movimento continuo. Conserva numero, rotta e data e gestisci le eccezioni con la parte corretta."] },
        { heading: "Ripassa l'invio finale", paragraphs: ["Prima di pagare controlla contenuto, indirizzo, rotta, dichiarazione, protezione, imballaggio e peso fatturabile. Spiega gli scarti importanti."] },
        { heading: "Un ritmo utile di pianificazione", paragraphs: ["Pensa al costo totale, ispeziona, risolvi presto, raggruppa ciò che è compatibile, confronta rotte e rileggi il pacco finale."] },
      ],
    },
    {
      visual: { eyebrow: "SCALA DELLE PROVE", title: "Una recensione utile mostra la fonte di ogni affermazione.", caption: "La piattaforma descrive il servizio previsto, un resoconto documenta un caso e l'account controlla prezzi e scadenze.", items: [["Servizio pubblicato", "Acquisto tramite link, ispezione, foto e 90 giorni."], ["Caso osservato", "Differenza di taglia individuata e reso gestito."], ["Ancora ignoto", "Costo finale, risultato del pacco e coerenza."], ["Tua verifica", "Controlla preventivo, prove e rimedio prima di pagare."]] },
      sources: [["Sito pubblico LoloBuy", "Fonte primaria per acquisto, ispezione, foto e deposito."], ["Resoconto preliminare indipendente", "Scarpe, borse, QC, supporto e differenza di taglia."], ["Guida community", "Processo pubblico usato per confrontare il caso."]],
      intro: ["I servizi giovani raccolgono promozione prima di ordini indipendenti completi. LoloBuy mostra un modello chiaro, ma pochi resoconti verificabili.", "Questa analisi separa le fasi realmente testate da quelle ancora incomplete."],
      sections: [
        { heading: "Perché la parola «preliminare» conta", paragraphs: ["L'autore scriveva prima della fine del ciclo internazionale. Il caso informa su acquisto, magazzino e supporto, non su costo finale, dogana o consegna."] },
        { heading: "Cosa ha realmente testato l'acquirente", paragraphs: ["Il resoconto copre scarpe, borse, navigazione, QC, supporto e reso per due taglie. È un caso concreto, non un campione ampio."] },
        { heading: "L'incidente delle due taglie è il dettaglio più utile", paragraphs: ["Mostra perché il QC parte da identità e variante. Il reso gestito è positivo per quel caso, non una garanzia generale."] },
        { heading: "Cosa possono dire foto QC «solide»", paragraphs: ["Le immagini sembrano aver consentito una decisione senza provarne numero o coerenza. Autenticità, durata e materiale restano ignoti."] },
        { heading: "Interfaccia e cronologia sono utili, ma personali", paragraphs: ["Interfaccia chiara e cronologia hanno aiutato quell'utente. Dispositivi, lingue e aspettative possono produrre esperienze diverse."] },
        { heading: "Supporto rapido in un caso non è una promessa", paragraphs: ["La risposta è un segnale positivo, insufficiente per stabilire tempi generali o risultati complessi."] },
        { heading: "Il link referral deve restare visibile", paragraphs: ["Un possibile vantaggio influenza il tono. I fatti documentati restano utili se osservazione e raccomandazione sono separate."] },
        { heading: "Le domande maggiori iniziano con la spedizione", paragraphs: ["Senza pacco consegnato non si giudicano costo, rotte, imballaggio, tracking, dogana o coerenza."] },
        { heading: "Esegui un primo ordine con poche ipotesi", paragraphs: ["Scegli un'opzione chiara, salva la scheda, valuta il QC prima di aggiungere e attendi i dati imballati prima di giudicare il trasporto."], bullets: ["Opzioni chiare", "Scheda e variante salvate", "QC prima", "Dati del pacco", "Risultato consegnato documentato"] },
        { heading: "Un verdetto prudente", paragraphs: ["Il resoconto è un segnale iniziale positivo per acquisto e magazzino, non una valutazione globale. Mancano ciclo internazionale e campione maggiore."] },
      ],
    },
  ],
};

export function getLocalizedArticles(locale: Locale): Article[] {
  if (locale === "en") {
    return articles;
  }

  return articles.map((article, index) => {
    const body = articleBodyText[locale][index];

    return {
      ...article,
      ...articleMetaText[locale][index],
      intro: body.intro,
      visual: {
        eyebrow: body.visual.eyebrow,
        title: body.visual.title,
        caption: body.visual.caption,
        items: body.visual.items.map(([label, text]) => ({ label, text })),
      },
      sources: body.sources.map(([label, note]) => ({ label, note })),
      sections: body.sections,
    };
  });
}
