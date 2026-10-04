import type { ArticleRecord } from "./article-data";
import type { LocalizedLocale } from "./i18n";
import type { Locale } from "./translations";
import de from "./article-translations/de.json";
import es from "./article-translations/es.json";
import fr from "./article-translations/fr.json";
import it from "./article-translations/it.json";

export const articleUi: Record<Locale, Record<string, string>> = {
  en: {},
  es: { Home: "Inicio", Guides: "Guías", "Written by": "Escrito por", "Fact-checked against public LoloBuy information": "Verificado con información pública de LoloBuy", "Last reviewed": "Última revisión", Checked: "Revisado", Length: "Longitud", words: "palabras", "Reading time": "Tiempo de lectura", minutes: "minutos", "Main query": "Consulta principal", "IN THIS GUIDE": "EN ESTA GUÍA", "SEARCH INTENT": "INTENCIÓN DE BÚSQUEDA", "Reader summary": "Resumen", "Four points to keep": "Cuatro puntos clave", "FACT-CHECK NOTE": "NOTA DE VERIFICACIÓN", "Related buying guides": "Guías relacionadas", "Continue with the next decision": "Continúa con la siguiente decisión", "Continue your research": "Continúa tu investigación", "Read another guide": "Leer otra guía" },
  de: { Home: "Start", Guides: "Ratgeber", "Written by": "Verfasst von", "Fact-checked against public LoloBuy information": "Mit öffentlichen LoloBuy-Angaben geprüft", "Last reviewed": "Zuletzt geprüft", Checked: "Geprüft", Length: "Länge", words: "Wörter", "Reading time": "Lesezeit", minutes: "Minuten", "Main query": "Hauptsuchanfrage", "IN THIS GUIDE": "IN DIESEM RATGEBER", "SEARCH INTENT": "SUCHINTENTION", "Reader summary": "Kurzfassung", "Four points to keep": "Vier wichtige Punkte", "FACT-CHECK NOTE": "FAKTENCHECK", "Related buying guides": "Verwandte Ratgeber", "Continue with the next decision": "Mit der nächsten Entscheidung fortfahren", "Continue your research": "Recherche fortsetzen", "Read another guide": "Weiteren Ratgeber lesen" },
  fr: { Home: "Accueil", Guides: "Guides", "Written by": "Rédigé par", "Fact-checked against public LoloBuy information": "Vérifié avec les informations publiques de LoloBuy", "Last reviewed": "Dernière révision", Checked: "Vérifié", Length: "Longueur", words: "mots", "Reading time": "Temps de lecture", minutes: "minutes", "Main query": "Requête principale", "IN THIS GUIDE": "DANS CE GUIDE", "SEARCH INTENT": "INTENTION DE RECHERCHE", "Reader summary": "Résumé", "Four points to keep": "Quatre points à retenir", "FACT-CHECK NOTE": "NOTE DE VÉRIFICATION", "Related buying guides": "Guides associés", "Continue with the next decision": "Passez à la décision suivante", "Continue your research": "Poursuivez vos recherches", "Read another guide": "Lire un autre guide" },
  it: { Home: "Home", Guides: "Guide", "Written by": "Scritto da", "Fact-checked against public LoloBuy information": "Verificato con informazioni pubbliche di LoloBuy", "Last reviewed": "Ultima revisione", Checked: "Verificato", Length: "Lunghezza", words: "parole", "Reading time": "Tempo di lettura", minutes: "minuti", "Main query": "Ricerca principale", "IN THIS GUIDE": "IN QUESTA GUIDA", "SEARCH INTENT": "INTENTO DI RICERCA", "Reader summary": "Riepilogo", "Four points to keep": "Quattro punti chiave", "FACT-CHECK NOTE": "NOTA DI VERIFICA", "Related buying guides": "Guide correlate", "Continue with the next decision": "Continua con la decisione successiva", "Continue your research": "Continua la ricerca", "Read another guide": "Leggi un’altra guida" },
};

const articleUiExtra: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    "Independent guide; sources and limits below": "Guía independiente; fuentes y límites a continuación",
    "Editorial policy": "Política editorial",
    "Sources & research method": "Fuentes y método de investigación",
    Corrections: "Correcciones",
    "Worked example": "Ejemplo práctico",
    "Product discovery": "Descubrimiento de productos",
    "Browse by product category": "Explorar por categoría",
    "Open categories": "Abrir categorías",
    "Read guide": "Leer guía",
    "Open a matched product, then verify the live details": "Abre un producto vinculado y comprueba los datos actuales",
    "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.": "La disponibilidad, las opciones, los precios y las notas del vendedor pueden cambiar. Usa el catálogo para encontrar el artículo y decide con la página actual y el pedido guardado.",
    "Browse main-site products": "Ver productos del catálogo principal",
  },
  de: {
    "Independent guide; sources and limits below": "Unabhängiger Ratgeber; Quellen und Grenzen siehe unten",
    "Editorial policy": "Redaktionsrichtlinie",
    "Sources & research method": "Quellen und Recherchemethodik",
    Corrections: "Korrekturen",
    "Worked example": "Rechenbeispiel",
    "Product discovery": "Produktsuche",
    "Browse by product category": "Nach Produktkategorie stöbern",
    "Open categories": "Kategorien öffnen",
    "Read guide": "Ratgeber lesen",
    "Open a matched product, then verify the live details": "Passenden Artikel öffnen und Live-Daten prüfen",
    "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.": "Verfügbarkeit, Optionen, Preise und Verkäuferhinweise können sich ändern. Nutze den Katalog zur Suche und entscheide mit der aktuellen Seite und dem gespeicherten Auftrag.",
    "Browse main-site products": "Produkte im Hauptkatalog ansehen",
  },
  fr: {
    "Independent guide; sources and limits below": "Guide indépendant ; sources et limites ci-dessous",
    "Editorial policy": "Politique éditoriale",
    "Sources & research method": "Sources et méthode de recherche",
    Corrections: "Corrections",
    "Worked example": "Exemple calculé",
    "Product discovery": "Recherche de produits",
    "Browse by product category": "Parcourir par catégorie",
    "Open categories": "Ouvrir les catégories",
    "Read guide": "Lire le guide",
    "Open a matched product, then verify the live details": "Ouvrez un produit associé puis vérifiez les données actuelles",
    "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.": "Disponibilité, options, prix et notes vendeur peuvent changer. Utilisez le catalogue pour trouver l’article, puis décidez avec la page actuelle et la commande enregistrée.",
    "Browse main-site products": "Voir les produits du catalogue principal",
  },
  it: {
    "Independent guide; sources and limits below": "Guida indipendente; fonti e limiti di seguito",
    "Editorial policy": "Politica editoriale",
    "Sources & research method": "Fonti e metodo di ricerca",
    Corrections: "Correzioni",
    "Worked example": "Esempio pratico",
    "Product discovery": "Ricerca dei prodotti",
    "Browse by product category": "Esplora per categoria",
    "Open categories": "Apri le categorie",
    "Read guide": "Leggi la guida",
    "Open a matched product, then verify the live details": "Apri un prodotto abbinato e verifica i dati attuali",
    "Product availability, options, prices and seller notes can change. Use the catalog to find an item, then make the purchase decision from the current page and your saved order record.": "Disponibilità, opzioni, prezzi e note del venditore possono cambiare. Usa il catalogo per trovare l’articolo e decidi con la pagina attuale e l’ordine salvato.",
    "Browse main-site products": "Vedi i prodotti del catalogo principale",
  },
};

export function articleText(locale: Locale, key: string) {
  return articleUiExtra[locale][key] ?? articleUi[locale][key] ?? key;
}


const fullArticles: Record<LocalizedLocale, Record<string, Partial<ArticleRecord>>> = { de, es, fr, it };

export function getLocalizedArticle(article: ArticleRecord, locale: Locale): ArticleRecord {
  if (locale === "en") return article;
  const copy = fullArticles[locale][article.slug];
  if (!copy) throw new Error(`Missing ${locale} translation for ${article.slug}`);
  return { ...article, ...copy, modifiedDate: "2026-10-04" };
}
