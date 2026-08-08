import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";

export const metadata: Metadata = { title: "Terms & Disclaimer", description: "Terms, independence, price, quality, and external-link disclaimers for CSSBuy China.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <InfoPage eyebrow="Policy" title="Terms and disclaimer." intro="Use this index as a research starting point, not as a product, seller, delivery, or authenticity guarantee.">
    <p><b>Last updated:</b> August 8, 2026</p>
    <h2>Independent information service</h2><p>CSSBuy China is an independent product-discovery guide and is not operated by or affiliated with CSSBuy. The site does not sell, inspect, store, ship, or authenticate goods.</p>
    <h2>Prices and availability</h2><p>Recorded CNY values and approximate conversions reflect the information visible when reviewed. Sellers, exchange rates, service costs, stock, shipping routes, and policies may change without notice. Confirm the current total before paying.</p>
    <h2>No quality or authenticity guarantee</h2><p>A link check confirms only that a destination was reachable at that time. It does not verify seller reliability, materials, fit, safety, compliance, authenticity, or suitability for import into a destination.</p>
    <h2>External links and transactions</h2><p>When you leave this site, your use of the destination is governed by that website's current terms and policies. Any purchase, payment, return, warehouse service, shipment, or dispute occurs outside CSSBuy China.</p>
    <h2>Responsible use</h2><p>Users are responsible for checking applicable laws, customs rules, carrier restrictions, intellectual-property concerns, and product-safety requirements. Do not use the index to obtain prohibited goods.</p>
  </InfoPage>;
}
