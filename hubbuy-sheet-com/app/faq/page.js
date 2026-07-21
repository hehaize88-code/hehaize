import PageHero from "@/components/PageHero";
import SearchBox from "@/components/SearchBox";
import { ArrowIcon } from "@/components/Icons";
import { faqGroups, faqs, SITE_URL } from "@/data/site";
import { createPageMetadata } from "@/data/seo";
import { createBreadcrumbSchema } from "@/data/structured-data";

export const metadata = createPageMetadata({
  title: "Hubbuy FAQ 2026: Orders, QC, Storage & Shipping",
  description: "Fact-checked Hubbuy FAQ covering product orders, China shipping, free QC images, 300-day storage, consolidation, parcel fees, returns and support.",
  path: "/faq/",
});

const verifiedFacts = [
  ["QC", "Free inspection images"],
  ["STORAGE", "300 days advertised"],
  ["PARCEL", "Order consolidation"],
  ["PAYMENT", "International fee later"],
];

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
    url: `${SITE_URL}/faq/`,
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Hubbuy FAQ", path: "/faq/" },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero eyebrow="Hubbuy FAQ · reviewed July 2026" title="Practical answers for ordering, QC, storage and shipping." intro="Facts below were checked against Hubbuy's current public homepage. Where the public site does not state one universal number, the answer points you back to the live order or parcel page." crumbs={["FAQ"]} />
      <section className="section faq-page">
        <div className="wrap">
          <div className="faq-evidence-heading">
            <div><span className="eyebrow">Publicly stated by Hubbuy</span><h2>Four facts worth knowing first</h2></div>
            <p>Source review: official public homepage, 20 July 2026.</p>
          </div>
          <div className="faq-fact-grid">
            {verifiedFacts.map(([label, fact], index) => <div key={label}><span>0{index + 1} · {label}</span><strong>{fact}</strong></div>)}
          </div>
          <div className="faq-page-grid">
            <div className="faq-group-list">
              {faqGroups.map((group, groupIndex) => (
                <section className="faq-group" key={group.title}>
                  <div className="faq-group-heading"><span>{group.label}</span><h2>{group.title}</h2></div>
                  <div className="faq-page-list">
                    {group.items.map((faq, index) => <details key={faq.q} open={groupIndex === 0 && index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}
                  </div>
                </section>
              ))}
            </div>
            <aside className="faq-sidebar">
              <div className="faq-source-card"><span className="eyebrow eyebrow-light">Research source</span><h2>Checked against Hubbuy itself.</h2><p>Service claims on this page come from Hubbuy's public homepage. Transaction-specific prices, routes and policies should be rechecked in the live interface.</p><a href="https://hubbuy.com/" target="_blank" rel="noopener">Open official Hubbuy site <ArrowIcon /></a></div>
              <div className="faq-side"><span className="eyebrow">Find something specific</span><h2>Search the live catalog</h2><p>Your keyword opens the current CNBuy Sheet results, including individual product links and current reference prices.</p><SearchBox compact /></div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
