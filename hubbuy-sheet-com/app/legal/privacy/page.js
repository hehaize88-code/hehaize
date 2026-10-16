import PageHero from "@/components/PageHero";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Hubbuy Sheet.",
  path: "/legal/privacy/",
});

export default function PrivacyPage() {
  return <><PageHero eyebrow="Legal" title="Privacy policy" intro="A plain-language summary of how this informational website handles basic visitor data." crumbs={["Legal", "Privacy"]} /><section className="section legal-page"><article className="wrap legal-copy"><p className="legal-date">Effective: 16 October 2026</p><h2>Information you provide</h2><p>Hubbuy Sheet does not offer user accounts, checkout or payment processing. Text searches are sent to this website and forwarded to the CNBuy Sheet catalog. Image search compares your selected image on your device; the selected image is not uploaded by this website.</p><h2>Technical information</h2><p>The hosting provider may process standard request information such as IP address, browser type, device information, requested page and timestamps for security, reliability and aggregate traffic measurement. We do not use this website to collect payment-card or identity documents.</p><h2>External links</h2><p>Registration and purchase buttons open Hubbuy. Product images are loaded from the source catalog. External sites apply their own privacy policies after you follow a link or load their resources.</p><h2>Cookies</h2><p>This site loads Google Analytics for traffic measurement. The hosting provider may also use technical storage for security and reliability.</p><h2>Changes</h2><p>We may update this policy if the website adds new functionality. The effective date above will change when a material revision is published.</p></article></section></>;
}
