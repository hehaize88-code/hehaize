import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/Icons";

export const metadata = {
  title: "About This Independent Hubbuy Sheet",
  description: "Learn how Hubbuy Sheet reviews product links, reference prices and shopping-agent guides while remaining independent from Hubbuy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Hubbuy Sheet" title="A decision guide, not another endless list." intro="We organize a smaller set of product links and explain the checks that matter between discovery, warehouse arrival and parcel submission." crumbs={["About"]} />
      <section className="section about-page"><div className="wrap about-grid">
        <div className="about-copy"><span className="eyebrow">Our purpose</span><h2>Help shoppers remove uncertainty one step at a time.</h2><p>Traditional spreadsheets are quick to publish but difficult to use on a phone, easy to duplicate and often unclear about the source of a price. Hubbuy Sheet presents recent links in a cleaner format, sends searches to a live catalog and separates product discovery from QC and shipping guidance.</p><p>We are not an official Hubbuy website and do not operate a shopping-agent service. We do not take orders, process payments, inspect goods, store parcels or provide international delivery. Those limits are stated clearly because they affect how readers should use the information.</p><Link href="/products" className="button-dark">Review recent finds <ArrowIcon /></Link></div>
        <div className="principles"><article><CheckIcon /><div><h3>Distinct destinations</h3><p>Every featured product card is checked to open its own detail page rather than a repeated generic destination.</p></div></article><article><CheckIcon /><div><h3>Reference, not promise</h3><p>Prices are time-stamped references. Live stock, variants and costs must be confirmed on the linked page.</p></div></article><article><CheckIcon /><div><h3>Useful limitations</h3><p>We avoid unsupported claims about seller quality, authenticity, shipping speed or guaranteed customs outcomes.</p></div></article><article><CheckIcon /><div><h3>Compact on mobile</h3><p>Categories, products and guides use responsive grids instead of swipe-only carousels.</p></div></article></div>
      </div></section>
    </>
  );
}
