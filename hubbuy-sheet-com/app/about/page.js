import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { MAIN_SITE, SITE_URL } from "@/data/site";

export const metadata = {
  title: "About This Independent Hubbuy Sheet",
  description: "See who publishes Hubbuy Sheet, how platform claims and product links are checked, and how this website is commercially connected to CNBuy Sheet.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Hubbuy Sheet",
    url: `${SITE_URL}/about/`,
    mainEntity: {
      "@type": "Organization",
      name: "Hubbuy Sheet Editorial",
      url: `${SITE_URL}/about/`,
      description: "The publishing identity responsible for Hubbuy Sheet research, product-link checks and corrections.",
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero eyebrow="About Hubbuy Sheet" title="A decision guide, not another endless list." intro="We organize a smaller set of product links and explain the checks that matter between discovery, warehouse arrival and parcel submission." crumbs={["About"]} />
      <section className="section about-page"><div className="wrap about-grid">
        <div className="about-copy"><span className="eyebrow">Our purpose</span><h2>Help shoppers remove uncertainty one decision at a time.</h2><p>Traditional spreadsheets are quick to publish but difficult to use on a phone, easy to duplicate and often unclear about the source of a price. Hubbuy Sheet presents recent links in a cleaner format and separates product discovery from warehouse QC and parcel guidance.</p><p>Hubbuy Sheet Editorial is the publishing identity responsible for this website. It describes a documented review process; it does not pretend that an unnamed writer personally completed every transaction discussed. Platform facts are tied to public sources, while practical checklists are clearly presented as independent editorial guidance.</p><p>We are independent from Hubbuy and are not its official website. We do not take Hubbuy orders, process payments, inspect goods, store parcels or provide international delivery.</p><div className="about-actions"><Link href="/products" className="button-dark">Review recent finds <ArrowIcon /></Link><Link href="/contact" className="button-outline">Send a correction <ArrowIcon /></Link></div></div>
        <div className="principles"><article><CheckIcon /><div><h3>Distinct destinations</h3><p>Every featured product card is checked to open its own detail page rather than a repeated generic destination.</p></div></article><article><CheckIcon /><div><h3>Reference, not promise</h3><p>Prices are time-stamped references. Live stock, variants and costs must be confirmed on the linked page.</p></div></article><article><CheckIcon /><div><h3>Useful limitations</h3><p>We avoid unsupported claims about seller quality, authenticity, shipping speed or guaranteed customs outcomes.</p></div></article><article><CheckIcon /><div><h3>Compact on mobile</h3><p>Categories, products and guides use responsive grids instead of swipe-only carousels.</p></div></article></div>
      </div></section>

      <section className="section editorial-method-section">
        <div className="wrap">
          <div className="section-heading editorial-method-heading"><span className="eyebrow">Editorial method</span><h2>How a page moves from source to publication.</h2><p>Last methodology review: 20 July 2026.</p></div>
          <div className="method-grid">
            <article><span>01</span><h3>Check platform statements</h3><p>Claims about Hubbuy’s public workflow are checked against Hubbuy’s own public pages. A claim that cannot be verified is qualified or left out.</p></article>
            <article><span>02</span><h3>Check catalog destinations</h3><p>Product cards are compared with the linked CNBuy Sheet page for destination, displayed name, image and reference price at the stated review time.</p></article>
            <article><span>03</span><h3>Separate fact from advice</h3><p>Official statements, catalog observations and our practical recommendations are labelled differently. Temporary fees, routes and promotions are not written as permanent facts.</p></article>
            <article><span>04</span><h3>Record and correct</h3><p>Long-form articles display a published date and a Last fact-checked date. Material corrections should update the page, its structured data and its review date together.</p></article>
          </div>
        </div>
      </section>

      <section className="section relationship-section" id="cnbuy-relationship">
        <div className="wrap relationship-panel">
          <div><span className="eyebrow eyebrow-light">Commercial relationship</span><h2>CNBuy Sheet is the catalog destination used by this website.</h2></div>
          <div><p>Product cards, category links, search forms and “Live catalog” buttons on Hubbuy Sheet lead to <a href={MAIN_SITE} target="_blank" rel="noopener">CNBuy Sheet at cnbuycha.com</a>. This website is designed to support and send traffic to that catalog, so it has a commercial interest in the destination and should not be read as a neutral comparison of every shopping service.</p><p>This relationship is separate from Hubbuy. Hubbuy Sheet is not affiliated with Hubbuy and does not speak for it. Hubbuy’s official pages remain the source for current Hubbuy service claims; the linked product or transaction page remains the source for current catalog information.</p><Link href="/contact">Questions or corrections <ArrowIcon /></Link></div>
        </div>
      </section>
    </>
  );
}
