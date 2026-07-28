import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/page-hero";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { categoryGuideSlugs } from "../category-guide-data";
import {
  localizedPath,
  normalizeLocale,
  type Locale,
} from "../i18n";
import { aboutPageCopy, commonPageCopy } from "../page-copy";
import { localizedMetadata } from "../seo";
import { articles, productFinds } from "../site-data";

const researchFootprintCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    reviewed: string;
    statLabels: [string, string, string, string];
    scopeTitle: string;
    scopeLinks: [string, string, string, string, string];
  }
> = {
  en: {
    eyebrow: "CURRENT RESEARCH FOOTPRINT",
    title: "A specific Lolobuy evidence set, not a swapped brand template.",
    intro:
      "This site’s present scope is source-link verification, warehouse-photo review, product-specific sizing and condition checks, packed-parcel planning and carefully bounded customer evidence. Counts below come from the pages currently published here.",
    reviewed: "Scope reviewed 28 July 2026",
    statLabels: [
      "individual product evidence pages",
      "deep category guides",
      "fact-checked long-form articles",
      "independent language paths",
    ],
    scopeTitle: "Follow the site’s distinct research clusters",
    scopeLinks: [
      "Weidian source-link verification",
      "Shoes sizing and QC evidence",
      "Warehouse-photo checklist",
      "Packed-parcel planning",
      "Early-user evidence review",
    ],
  },
  es: {
    eyebrow: "HUELLA DE INVESTIGACIÓN ACTUAL",
    title: "Pruebas específicas de Lolobuy, no una plantilla con otra marca.",
    intro:
      "El alcance actual se centra en verificar enlaces fuente, revisar fotos de almacén, comprobar talla y estado por producto, planificar el paquete y delimitar las pruebas de clientes. Los recuentos proceden de las páginas publicadas aquí.",
    reviewed: "Alcance revisado el 28 de julio de 2026",
    statLabels: [
      "páginas individuales de pruebas de producto",
      "guías de categoría detalladas",
      "artículos largos verificados",
      "rutas de idioma independientes",
    ],
    scopeTitle: "Sigue los grupos de investigación propios del sitio",
    scopeLinks: [
      "Verificación de enlaces Weidian",
      "Pruebas de talla y QC para calzado",
      "Lista de fotos de almacén",
      "Planificación del paquete preparado",
      "Análisis de pruebas de usuarios",
    ],
  },
  de: {
    eyebrow: "AKTUELLER RECHERCHEUMFANG",
    title: "Eigene Lolobuy-Belege statt einer Vorlage mit neuem Markennamen.",
    intro:
      "Der aktuelle Schwerpunkt liegt auf Quellenlinks, Lagerfotos, produktspezifischen Größen- und Zustandsprüfungen, Paketplanung und klar begrenzten Nutzerbelegen. Die Zahlen stammen aus den hier veröffentlichten Seiten.",
    reviewed: "Umfang geprüft am 28. Juli 2026",
    statLabels: [
      "einzelne Produkt-Belegseiten",
      "ausführliche Kategorien-Ratgeber",
      "faktengeprüfte Langartikel",
      "eigenständige Sprachpfade",
    ],
    scopeTitle: "Die eigenen Recherchebereiche dieser Seite",
    scopeLinks: [
      "Prüfung von Weidian-Quellenlinks",
      "Schuhgrößen- und QC-Belege",
      "Checkliste für Lagerfotos",
      "Planung des gepackten Pakets",
      "Auswertung früher Nutzerbelege",
    ],
  },
  fr: {
    eyebrow: "EMPREINTE DE RECHERCHE ACTUELLE",
    title: "Des preuves propres à Lolobuy, pas un modèle rebaptisé.",
    intro:
      "Le périmètre actuel couvre la vérification des liens sources, les photos d’entrepôt, les contrôles de taille et d’état par produit, la préparation du colis et les témoignages clients correctement délimités. Les chiffres viennent des pages publiées ici.",
    reviewed: "Périmètre vérifié le 28 juillet 2026",
    statLabels: [
      "pages individuelles de preuves produit",
      "guides catégorie approfondis",
      "articles longs vérifiés",
      "parcours linguistiques indépendants",
    ],
    scopeTitle: "Explorer les axes de recherche propres au site",
    scopeLinks: [
      "Vérification des liens sources Weidian",
      "Preuves taille et QC des chaussures",
      "Checklist des photos d’entrepôt",
      "Planification du colis préparé",
      "Analyse des premiers témoignages",
    ],
  },
  it: {
    eyebrow: "IMPRONTA DI RICERCA ATTUALE",
    title: "Prove specifiche su Lolobuy, non un modello con il marchio cambiato.",
    intro:
      "L’ambito attuale riguarda link sorgente, foto di magazzino, controlli specifici di taglia e condizioni, pianificazione del pacco e prove dei clienti con limiti chiari. I conteggi derivano dalle pagine pubblicate qui.",
    reviewed: "Ambito verificato il 28 luglio 2026",
    statLabels: [
      "pagine individuali di prove prodotto",
      "guide categoria approfondite",
      "articoli lunghi verificati",
      "percorsi linguistici indipendenti",
    ],
    scopeTitle: "Segui i filoni di ricerca propri del sito",
    scopeLinks: [
      "Verifica dei link sorgente Weidian",
      "Prove di taglia e QC per le scarpe",
      "Checklist delle foto di magazzino",
      "Pianificazione del pacco preparato",
      "Analisi delle prime prove utente",
    ],
  },
};

const researchScopePaths = [
  "/articles/lolobuy-weidian-link-guide",
  "/categories/shoes",
  "/guides/qc",
  "/articles/plan-china-shopping-haul",
  "/articles/lolobuy-review-early-user-experience",
] as const;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = aboutPageCopy[locale];
  return localizedMetadata({
    locale,
    path: "/about",
    title: copy.title,
    description: copy.intro,
  });
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = aboutPageCopy[locale];
  const common = commonPageCopy[locale];
  const research = researchFootprintCopy[locale];
  const researchStats = [
    productFinds.length,
    categoryGuideSlugs.length,
    articles.length,
    5,
  ];

  return (
    <main>
      <SiteHeader locale={locale} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        crumbs={[
          { label: common.home, href: localizedPath("/", locale) },
          { label: copy.crumb },
        ]}
      />
      <section className="about-grid">
        {copy.cards.map((card, index) => (
          <article key={card[0]}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{card[0]}</h2>
            <p>{card[1]}</p>
          </article>
        ))}
      </section>
      <section className="editorial-principles">
        <div>
          <p className="eyebrow">{copy.principlesEyebrow}</p>
          <h2>{copy.principlesTitle}</h2>
        </div>
        <ul>
          {copy.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </section>
      <section
        className="research-footprint"
        aria-labelledby="research-footprint-title"
        id="research-footprint"
      >
        <header>
          <p className="eyebrow">{research.eyebrow}</p>
          <h2 id="research-footprint-title">{research.title}</h2>
          <p>{research.intro}</p>
          <small>{research.reviewed}</small>
        </header>
        <dl>
          {researchStats.map((value, index) => (
            <div key={research.statLabels[index]}>
              <dt>{value}</dt>
              <dd>{research.statLabels[index]}</dd>
            </div>
          ))}
        </dl>
        <nav aria-label={research.scopeTitle}>
          <h3>{research.scopeTitle}</h3>
          {researchScopePaths.map((path, index) => (
            <Link href={localizedPath(path, locale)} key={path}>
              {research.scopeLinks[index]} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
      </section>
      <section className="inline-cta">
        <div>
          <p className="eyebrow">{copy.ctaEyebrow}</p>
          <h2>{copy.ctaTitle}</h2>
        </div>
        <Link
          className="button button-primary"
          href={localizedPath("/how-it-works", locale)}
        >
          {copy.cta}
        </Link>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
