import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { MAIN_SITE, SITE_URL } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

const REPOSITORY_ISSUES = "https://github.com/hehaize88-code/hehaize/issues/new";

export const metadata = createPageMetadata({
  title: "Contact Hubbuy Sheet Editorial",
  description: "Report a factual error, broken product link or source update to Hubbuy Sheet Editorial, and find the correct destination for order support.",
  path: "/contact/",
});

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Hubbuy Sheet Editorial",
    url: `${SITE_URL}/contact/`,
    description: "Editorial corrections, source suggestions and support-routing information for Hubbuy Sheet.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero eyebrow="Contact & corrections" title="Send evidence, not order details." intro="Use this page to report a factual error, broken destination or outdated source. Hubbuy Sheet cannot access Hubbuy or CNBuy Sheet customer accounts." crumbs={["Contact"]} />
      <section className="section contact-page">
        <div className="wrap contact-grid">
          <article className="contact-primary">
            <span className="eyebrow">Editorial corrections</span>
            <h2>Tell us exactly what needs another look.</h2>
            <p>The most useful correction includes the page URL, the sentence or product card in question, a current public source and the date you checked it. The website repository is public, so never include private order or identity information.</p>
            <a className="button-dark" href={REPOSITORY_ISSUES} target="_blank" rel="noopener">Open a correction request <ArrowIcon /></a>
            <div className="contact-checklist">
              <div><CheckIcon /><span>Page URL and exact statement</span></div>
              <div><CheckIcon /><span>Official or live source URL</span></div>
              <div><CheckIcon /><span>Date the source was checked</span></div>
              <div><CheckIcon /><span>No order numbers or personal data</span></div>
            </div>
          </article>

          <aside className="contact-routes">
            <article><span>Hubbuy support</span><h3>Orders, warehouse status and parcels</h3><p>Hubbuy Sheet cannot view or change a Hubbuy order. Use the current support and account channels published by Hubbuy itself.</p><a href="https://hubbuy.com/" target="_blank" rel="noopener">Open official Hubbuy website <ArrowIcon /></a></article>
            <article><span>CNBuy Sheet destination</span><h3>Catalog and destination-page questions</h3><p>Our product cards, search forms and category-page catalog buttons open CNBuy Sheet. Its live page controls the current listing and any transaction made after leaving this website.</p><a href={MAIN_SITE} target="_blank" rel="noopener">Open CNBuy Sheet <ArrowIcon /></a></article>
            <article><span>Relationship</span><h3>Why these links point to CNBuy Sheet</h3><p>Hubbuy Sheet has a commercial interest in sending readers to CNBuy Sheet. Read the full disclosure and editorial boundary before using the catalog.</p><Link href="/about/#cnbuy-relationship">Read the relationship disclosure <ArrowIcon /></Link></article>
          </aside>
        </div>
        <div className="wrap contact-privacy"><strong>No contact form or customer database.</strong><p>This static page does not collect a message, upload or account credential. A correction request opens GitHub, whose own privacy terms apply.</p></div>
      </section>
    </>
  );
}
