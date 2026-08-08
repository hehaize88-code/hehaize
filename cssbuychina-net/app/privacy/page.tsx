import type { Metadata } from "next";
import { InfoPage } from "../components/InfoPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy information for the CSSBuy China independent product-discovery index.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <InfoPage eyebrow="Policy" title="Privacy policy." intro="This public directory is designed to work without account creation, checkout, or personal-profile collection.">
    <p><b>Last updated:</b> August 8, 2026</p>
    <h2>Information you provide</h2><p>If you contact the site, the message and contact details you choose to provide may be used to answer the request or investigate a reported link. Do not send passwords, payment details, identification documents, or other sensitive information.</p>
    <h2>Technical information</h2><p>Basic hosting, security, and aggregate traffic data may be processed to operate the site, prevent abuse, and understand page performance. The public browsing experience does not require a CSSBuy China user account.</p>
    <h2>External destinations</h2><p>Product and category links open another website. That destination controls its own privacy practices, cookies, accounts, and transactions. Review its current policy before submitting personal information.</p>
    <h2>Updates</h2><p>This policy may change when the final hosting, analytics, or contact setup is selected. The visible update date will change when material revisions are made.</p>
  </InfoPage>;
}
