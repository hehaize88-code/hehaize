import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getGuide, guides } from "../article-data";
import { SiteHeader } from "../../components/site-header";
import { localizedAlternates } from "../../seo-alternates";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | UUFinds Sheet`,
    description: guide.description,
    alternates: localizedAlternates(`/guides/${guide.slug}/`),
    openGraph: { title: guide.title, description: guide.description, type: "article", url: `/guides/${guide.slug}/` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const wordCount = [
    ...guide.intro,
    ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.points ?? [])]),
  ].join(" ").trim().split(/\s+/).length;

  return (
    <main className="guide-page">
      <SiteHeader routePath={`/guides/${guide.slug}/`} />
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
          <div className="guide-body">
            {guide.intro.map((paragraph) => <p className="lead" key={paragraph}>{paragraph}</p>)}
            {guide.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <p className="section-number">{String(index + 1).padStart(2, "0")}</p>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </section>
            ))}
            <div className="source-note">
              <p className="eyebrow">Primary source notes</p>
              <p>{guide.sourceNote ?? "Function descriptions were checked against publicly available UUFinds information and the live CNBuy Sheet category structure on July 22, 2026. External product information can change."}</p>
              <div><a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">Browse CNBuy Sheet products ↗</a></div>
            </div>
          </div>
        </div>
      </article>

      <footer>
        <div className="footer-brand">
          <Image
            className="footer-logo"
            src="/uufinds-logo.png"
            alt="UUFinds"
            width={1144}
            height={284}
            unoptimized
          />
        </div>
        <p>Independent educational guide. All outbound shopping links lead only to CNBuy Sheet.</p>
        <Link href="/#finds">Browse category routes →</Link>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        dateModified: guide.modifiedISO ?? "2026-07-22",
        datePublished: "2026-07-22",
        author: { "@type": "Organization", name: "UUFinds Sheet Editorial" },
        publisher: { "@type": "Organization", name: "UUFinds Sheet" },
        wordCount,
        inLanguage: "en",
        mainEntityOfPage: `https://uufindssheet.com/guides/${guide.slug}/`,
      }) }} />
    </main>
  );
}
