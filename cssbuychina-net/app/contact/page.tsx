import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";

export const metadata: Metadata = { title: "Contact & Report a Link", description: "Report a dead, mismatched, or outdated CSSBuy spreadsheet link and learn what details to include.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <InfoPage eyebrow="Contact" title="Report a link clearly." intro="This page lists the information needed to investigate a listing. A direct contact channel will be published here when it is available.">
    <h2>Include these details</h2><ul><li>The CSSBuy China product-page URL or visible product ID.</li><li>Whether the problem is a dead link, wrong destination, changed product, price mismatch, or image issue.</li><li>The date and approximate time you saw the problem.</li><li>A screenshot if it helps explain the mismatch—but never include account or payment information.</li></ul>
    <h2>What happens next</h2><p>The destination can be rechecked and the index entry can be corrected, relabeled, or removed. A reported listing is not automatically restored if there is no reliable destination.</p>
    <div className="contact-placeholder"><span>CONTACT CHANNEL</span><b>Not yet published</b><p>No message form is active. Please do not send personal or payment information through unofficial channels.</p></div>
  </InfoPage>;
}
