import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { getArticleContext } from "../../article-context-links";
import ArticleCard from "../../components/article-card";
import JsonLd from "../../components/json-ld";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import {
  localizedPath,
  normalizeLocale,
  type Locale,
} from "../../i18n";
import { getLocalizedArticles } from "../../localized-data";
import { articleUiCopy, commonPageCopy } from "../../page-copy";
import {
  absoluteLocalizedUrl,
  localizedMetadata,
  siteUrl,
} from "../../seo";
import { articles } from "../../site-data";
import { getArticleMedia } from "../../article-media";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

const articleSearchTitles: Record<Locale, Record<string, string>> = {
  en: {
    "lolobuy-spreadsheet-guide":
      "Lolobuy Spreadsheet Guide 2026: Find & Verify Products",
    "how-to-read-qc-photos":
      "How to Read Lolobuy QC Photos: Warehouse Checklist",
    "plan-china-shopping-haul":
      "Lolobuy Shipping Guide: Storage, Consolidation & Weight",
    "lolobuy-review-early-user-experience":
      "Lolobuy Review 2026: Early User Evidence Examined",
    "lolobuy-weidian-link-guide":
      "Lolobuy Weidian Link Guide 2026: Order & QC Steps",
  },
  es: {
    "lolobuy-spreadsheet-guide":
      "Guía Lolobuy Spreadsheet 2026: buscar y verificar",
    "how-to-read-qc-photos":
      "Fotos QC Lolobuy: checklist de almacén",
    "plan-china-shopping-haul":
      "Envío Lolobuy: almacén, paquetes y peso",
    "lolobuy-review-early-user-experience":
      "Reseña Lolobuy 2026: pruebas de usuarios",
    "lolobuy-weidian-link-guide":
      "Enlaces Weidian con Lolobuy: pedido y QC",
  },
  de: {
    "lolobuy-spreadsheet-guide":
      "Lolobuy Spreadsheet 2026: Produkte prüfen",
    "how-to-read-qc-photos":
      "Lolobuy QC-Fotos: Lager-Checkliste",
    "plan-china-shopping-haul":
      "Lolobuy Versand: Lagerung, Paket und Gewicht",
    "lolobuy-review-early-user-experience":
      "Lolobuy Erfahrungen 2026: Nutzerbelege",
    "lolobuy-weidian-link-guide":
      "Lolobuy Weidian-Link: Bestellung und QC",
  },
  fr: {
    "lolobuy-spreadsheet-guide":
      "Guide Spreadsheet Lolobuy 2026 : vérifier les produits",
    "how-to-read-qc-photos":
      "Photos QC Lolobuy : checklist d’entrepôt",
    "plan-china-shopping-haul":
      "Expédition Lolobuy : stockage, colis et poids",
    "lolobuy-review-early-user-experience":
      "Avis Lolobuy 2026 : preuves d’utilisateurs",
    "lolobuy-weidian-link-guide":
      "Lien Weidian Lolobuy : commande et QC",
  },
  it: {
    "lolobuy-spreadsheet-guide":
      "Guida Spreadsheet Lolobuy 2026: verifica prodotti",
    "how-to-read-qc-photos":
      "Foto QC Lolobuy: checklist di magazzino",
    "plan-china-shopping-haul":
      "Spedizione Lolobuy: deposito, pacco e peso",
    "lolobuy-review-early-user-experience":
      "Recensione Lolobuy 2026: prove degli utenti",
    "lolobuy-weidian-link-guide":
      "Link Weidian Lolobuy: ordine e QC",
  },
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(query.lang);
  const article = getLocalizedArticles(locale).find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  const searchTitle =
    articleSearchTitles[locale][article.slug] ?? article.title;
  const media = getArticleMedia(article.slug);
  const imageUrl = `${siteUrl}${media.src}`;

  const metadata = localizedMetadata({
    locale,
    path: `/articles/${article.slug}`,
    title: searchTitle,
    description: article.description,
  });

  return {
    ...metadata,
    title: { absolute: searchTitle },
    openGraph: {
      ...metadata.openGraph,
      title: article.title,
      description: article.description,
      url: localizedPath(`/articles/${article.slug}`, locale),
      type: "article",
      publishedTime: article.published,
      modifiedTime: article.updated,
      images: [
        {
          url: imageUrl,
          width: media.width,
          height: media.height,
          alt: article.title,
        },
      ],
    },
    twitter: {
      ...metadata.twitter,
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(query.lang);
  const localizedArticles = getLocalizedArticles(locale);
  const article = localizedArticles.find((item) => item.slug === slug);
  const common = commonPageCopy[locale];
  const ui = articleUiCopy[locale];
  const context = getArticleContext(slug, locale);

  if (!article) {
    notFound();
  }

  const related = localizedArticles.filter((item) => item.slug !== article.slug).slice(0, 2);
  const media = getArticleMedia(article.slug);
  const articleUrl = absoluteLocalizedUrl(
    `/articles/${article.slug}`,
    locale,
  );
  const imageUrl = `${siteUrl}${media.src}`;

  return (
    <main>
      <SiteHeader locale={locale} />
      <article className="longform">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <span>
            <Link href={localizedPath("/", locale)}>{common.home}</Link>
            <b aria-hidden="true">/</b>
          </span>
          <span>
            <Link href={localizedPath("/articles", locale)}>{common.articles}</Link>
            <b aria-hidden="true">/</b>
          </span>
          <span>{article.shortTitle}</span>
        </nav>
        <header className="article-header">
          <p className="eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div>
            <time dateTime={article.updated}>{common.updated} {article.updated}</time>
            <span>{article.readingTime}</span>
            <span>{common.independentGuide}</span>
          </div>
          <p className="article-fact-check">{article.factCheckLine}</p>
        </header>

        <figure className="article-hero-media">
          <Image
            src={media.src}
            alt={`${article.shortTitle} — editorial evidence diagram`}
            width={media.width}
            height={media.height}
            sizes="(max-width: 780px) 94vw, 86vw"
            priority
            unoptimized
          />
          <figcaption>{article.visual.caption}</figcaption>
        </figure>

        <div className="article-body">
          <aside>
            <p>{ui.inGuide}</p>
            <ol>
              {article.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#section-${index + 1}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
            <span>
              {ui.changingTerms}
            </span>
          </aside>
          <div className="article-prose">
            <div className="article-intro">
              {article.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <figure className="article-visual">
              <figcaption>
                <span>{article.visual.eyebrow}</span>
                <h2>{article.visual.title}</h2>
                <p>{article.visual.caption}</p>
              </figcaption>
              <div>
                {article.visual.items.map((item, index) => (
                  <article key={item.label}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    <h3>{item.label}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </figure>
            {article.sections.map((section, index) => (
              <Fragment key={section.heading}>
                <section id={`section-${index + 1}`}>
                  <p className="section-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
                {index === 1 ? (
                  <section
                    className="article-context-links"
                    aria-labelledby="related-decision-paths"
                  >
                    <p className="section-number">{context.eyebrow}</p>
                    <h2 id="related-decision-paths">{context.title}</h2>
                    <p>{context.intro}</p>
                    <nav aria-label={context.ariaLabel}>
                      {context.links.map((link) => (
                        <Link
                          href={localizedPath(link.path, locale)}
                          key={link.path}
                        >
                          {link.label} <span aria-hidden="true">→</span>
                        </Link>
                      ))}
                    </nav>
                  </section>
                ) : null}
              </Fragment>
            ))}
            <section className="article-sources" aria-labelledby="research-sources">
              <p className="section-number">{common.sourceLabel.toUpperCase()}</p>
              <h2 id="research-sources">{common.researchBasis}</h2>
              <p>{ui.sourceIntro}</p>
              <ul>
                {article.sources.map((source) => (
                  <li key={source.label}>
                    <strong>{source.label}</strong>
                    <span>{source.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>

      <section className="related-articles">
        <div className="section-heading-row">
          <h2>{common.continueReading}</h2>
          <Link
            className="text-link"
            href={localizedPath("/articles", locale)}
          >
            {common.allArticles} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="article-card-grid article-card-grid-two">
          {related.map((item) => (
            <ArticleCard article={item} locale={locale} key={item.slug} />
          ))}
        </div>
      </section>
      <SiteFooter locale={locale} />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            inLanguage: locale,
            description: article.description,
            image: {
              "@type": "ImageObject",
              url: imageUrl,
              width: media.width,
              height: media.height,
              caption: article.visual.caption,
            },
            datePublished: article.published,
            dateModified: article.updated,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": articleUrl,
            },
            author: {
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: "Lolobuy Sheet Editorial",
              url: `${siteUrl}/about`,
            },
            publisher: {
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: "Lolobuy Sheet",
              url: `${siteUrl}/`,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/social/lolobuy-publisher-logo.png`,
                width: 512,
                height: 512,
              },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: common.home,
                item: absoluteLocalizedUrl("/", locale),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: common.articles,
                item: absoluteLocalizedUrl("/articles", locale),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.shortTitle,
                item: articleUrl,
              },
            ],
          },
        ]}
      />
    </main>
  );
}
