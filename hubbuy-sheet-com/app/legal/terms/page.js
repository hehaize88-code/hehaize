import PageHero from "@/components/PageHero";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({
  title: "Terms and Disclaimer",
  description: "Terms, independence statement and product information disclaimer for Hubbuy Sheet.",
  path: "/legal/terms/",
});

export default function TermsPage() {
  return <><PageHero eyebrow="Legal" title="Terms and disclaimer" intro="The conditions for using Hubbuy Sheet as an independent informational guide." crumbs={["Legal", "Terms"]} /><section className="section legal-page"><article className="wrap legal-copy"><p className="legal-date">Effective: 20 July 2026</p><h2>Informational purpose</h2><p>Hubbuy Sheet provides product-discovery links and general educational guidance. It does not sell goods, process payments, act as a purchasing agent, inspect products, operate a warehouse or arrange delivery.</p><h2>Independent status</h2><p>Hubbuy Sheet is not an official Hubbuy website and is not authorized to make promises on behalf of Hubbuy, marketplace sellers, CNBuy Sheet, carriers or customs authorities. Names are used descriptively so readers can understand the workflow being discussed.</p><h2>Product information</h2><p>Product names, images and prices are references drawn from linked catalog pages at the time of review. They can change without notice and do not constitute an authenticity claim, endorsement or guarantee of stock, condition, fit, seller performance or delivered quality.</p><h2>External transactions</h2><p>Any account creation, order or payment occurs on an external website under that website’s terms. Verify the seller, variant, total cost, restrictions and destination rules before proceeding. You are responsible for complying with applicable laws and platform policies.</p><h2>No shipping guarantee</h2><p>Shipping estimates, routes and customs outcomes can change. General explanations on this site are not a guarantee of price, delivery time, customs clearance, tax treatment or compensation.</p><h2>Acceptable use</h2><p>Do not misuse the website, attempt unauthorized access, interfere with availability or treat informational material as professional legal, tax or customs advice.</p></article></section></>;
}
