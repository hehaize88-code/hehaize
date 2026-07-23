import { policyMetadata, TrustPage } from "../components/trust-page";

export const metadata = policyMetadata("contact");

export default function ContactPage() {
  return <TrustPage slug="contact" />;
}
