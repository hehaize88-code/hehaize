import type { Metadata } from "next";
import Link from "next/link";
import { policyPages, type PolicyPageData } from "../policy-data";
import { socialImage } from "../seo-image";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function policyMetadata(slug: PolicyPageData["slug"]): Metadata {
  const page = policyPages[slug];
  return {
    title: `${page.title} | UUFinds Sheet`,
    description: page.description,
    alternates: { canonical: `/${page.slug}/` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/${page.slug}/`,
      siteName: "UUFinds Sheet",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [socialImage.url],
    },
  };
}

export function TrustPage({ slug }: { slug: PolicyPageData["slug"] }) {
  const page = policyPages[slug];
  const pageUrl = `https://uufindssheet.com/${page.slug}/`;

  return (
    <main className="trust-page">
      <SiteHeader />
      <nav className="trust-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><strong>{page.title}</strong>
      </nav>
      <header className="trust-page-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <small>Last updated {page.updated}</small>
      </header>
      <article className="trust-page-body">
        {page.sections.map((section, index) => (
          <section key={section.heading}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
            </div>
          </section>
        ))}
        {page.contactEmail && (
          <aside className="trust-contact-card">
            <p className="eyebrow inverse">Direct contact</p>
            <a href={`mailto:${page.contactEmail}`}>{page.contactEmail}</a>
          </aside>
        )}
      </article>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            name: page.title,
            description: page.description,
            url: pageUrl,
            dateModified: "2026-07-23",
            isPartOf: { "@type": "WebSite", name: "UUFinds Sheet", url: "https://uufindssheet.com/" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://uufindssheet.com/" },
              { "@type": "ListItem", position: 2, name: page.title, item: pageUrl },
            ],
          },
        ],
      }) }} />
    </main>
  );
}
