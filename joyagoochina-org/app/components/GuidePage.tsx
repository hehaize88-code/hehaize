import type { ReactNode } from "react";
import Link from "next/link";
import { mainSite } from "../data";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type GuideSection = {
  heading: string;
  body: ReactNode;
};

type GuidePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  facts: Array<{ value: string; label: string }>;
  sections: GuideSection[];
  sourceLabel: string;
  updated?: string;
};

export default function GuidePage({
  eyebrow,
  title,
  intro,
  facts,
  sections,
  sourceLabel,
  updated = "July 29, 2026",
}: GuidePageProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: intro,
    dateModified: "2026-07-29",
    datePublished: "2026-07-29",
    author: {
      "@type": "Organization",
      name: "Joyagoo China Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: "Joyagoo China",
      url: "https://joyagoochina.org/",
    },
  };

  return (
    <main className="guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SiteHeader />

      <article>
        <header className="article-hero">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/guides/">Guides</Link>
            <span>/</span>
            <span>{eyebrow}</span>
          </nav>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="article-intro">{intro}</p>
          <div className="article-meta">
            <span>Researched editorial guide</span>
            <span>Updated {updated}</span>
            <span>Independent of Joyagoo</span>
          </div>
        </header>

        <aside className="article-facts" aria-label="Key facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </aside>

        <div className="article-layout">
          <aside className="article-index">
            <strong>In this guide</strong>
            {sections.map((section, index) => (
              <a href={`#section-${index + 1}`} key={section.heading}>
                <span>0{index + 1}</span>
                {section.heading}
              </a>
            ))}
          </aside>

          <div className="article-body">
            {sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <p className="section-count">0{index + 1}</p>
                <h2>{section.heading}</h2>
                {section.body}
              </section>
            ))}

            <aside className="source-note">
              <strong>Source check</strong>
              <p>
                This guide was reviewed against {sourceLabel}. Platform rules
                and prices can change, so verify the current information in
                your account before making a time-sensitive decision.
              </p>
            </aside>

            <div className="article-cta">
              <div>
                <p className="eyebrow">READY TO BROWSE?</p>
                <h2>Use the product spreadsheet</h2>
                <p>
                  Open the product catalogue, compare the live listing, and
                  save the original product link before ordering.
                </p>
              </div>
              <a
                className="button"
                href={`${mainSite}/AllProducts/`}
                target="_blank"
                rel="noopener"
              >
                Explore products ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
