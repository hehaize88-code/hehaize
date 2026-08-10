import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuide, guides } from "../article-data";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { localizedAlternates } from "../../seo-alternates";
import { socialImage } from "../../seo-image";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const canonical = `/guides/${guide.slug}/`;
  return {
    title: `${guide.seoTitle ?? guide.title} | UUFinds Sheet`,
    description: guide.description,
    alternates: guide.englishOnly ? { canonical } : localizedAlternates(canonical),
    robots: { index: true, follow: true },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: canonical,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [socialImage.url],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const wordCount = [
    ...guide.intro,
    ...guide.sections.flatMap((section) => [
      ...section.paragraphs,
      ...(section.points ?? []),
      ...(section.table
        ? [section.table.caption, ...section.table.headers, ...section.table.rows.flat()]
        : []),
    ]),
  ].join(" ").trim().split(/\s+/).length;

  return (
    <main className="guide-page">
      <SiteHeader routePath={`/guides/${guide.slug}/`} englishOnly={guide.englishOnly} />
      <div className="guide-subnav"><Link className="back-link" href="/articles/">← All guides</Link></div>

      <article>
        <div className="guide-hero">
          <p className="eyebrow">{guide.label} / INDEPENDENT GUIDE</p>
          <h1>{guide.title}</h1>
          <p className="guide-deck">{guide.description}</p>
          <div className="guide-byline"><span>Updated {guide.updated}</span><span>{guide.readTime}</span><span>Evidence-led editorial</span></div>
        </div>

        <div className="guide-layout">
          <aside>
            <p>ON THIS PAGE</p>
            {guide.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>{String(index + 1).padStart(2, "0")} — {section.heading.replace(/^\d+\.\s*/, "")}</a>)}
          </aside>
          <div className="guide-body" data-visible-word-count={wordCount}>
            {guide.intro.map((paragraph) => <p className="lead" key={paragraph}>{paragraph}</p>)}
            {guide.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <p className="section-number">{String(index + 1).padStart(2, "0")}</p>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                {section.table && (
                  <div className="guide-table-wrap">
                    <table>
                      <caption>{section.table.caption}</caption>
                      <thead><tr>{section.table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join("|")}>{row.map((cell, cellIndex) => <td data-label={section.table?.headers[cellIndex]} key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
            {guide.relatedLinks && (
              <section className="related-reading" aria-labelledby="related-reading-heading">
                <p className="section-number">NEXT</p>
                <h2 id="related-reading-heading">Continue the research</h2>
                <div className="related-reading-grid">
                  {guide.relatedLinks.map((item) => (
                    <Link href={item.href} key={item.href}>
                      <strong>{item.label} →</strong>
                      <span>{item.description}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            {guide.evidence && (
              <section className="evidence-ledger" aria-labelledby="evidence-ledger-heading">
                <p className="section-number">SOURCES</p>
                <h2 id="evidence-ledger-heading">Evidence and source ledger</h2>
                <p>Official platform statements, carrier methods and editorial examples are kept separate so that a documented feature is not mistaken for an independent guarantee.</p>
                <div className="evidence-ledger-grid">
                  {guide.evidence.map((item) => (
                    <article key={`${item.type}-${item.source}`}>
                      <p className="eyebrow">{item.type}</p>
                      <h3>{item.source}</h3>
                      <small>Checked {item.checked}</small>
                      <p><strong>Supports:</strong> {item.supports}</p>
                      <p><strong>Boundary:</strong> {item.boundary}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
            <div className="source-note">
              <p className="eyebrow">Primary source notes</p>
              <p>{guide.sourceNote ?? "Function descriptions were checked against publicly available UUFinds information and the live main-site category structure on July 22, 2026. External product information can change."}</p>
              <div><a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">Browse main-site products ↗</a></div>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: guide.title,
            description: guide.description,
            image: `https://uufindssheet.com${socialImage.url}`,
            dateModified: guide.modifiedISO ?? "2026-07-22",
            datePublished: guide.publishedISO ?? "2026-07-22",
            author: { "@type": "Organization", name: "UUFinds Sheet Editorial" },
            publisher: { "@type": "Organization", name: "UUFinds Sheet" },
            wordCount,
            inLanguage: "en",
            mainEntityOfPage: `https://uufindssheet.com/guides/${guide.slug}/`,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://uufindssheet.com/" },
              { "@type": "ListItem", position: 2, name: "Articles", item: "https://uufindssheet.com/articles/" },
              { "@type": "ListItem", position: 3, name: guide.title, item: `https://uufindssheet.com/guides/${guide.slug}/` },
            ],
          },
        ],
      }) }} />
    </main>
  );
}
