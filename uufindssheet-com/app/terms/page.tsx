import { policyMetadata, TrustPage } from "../components/trust-page";

export const metadata = policyMetadata("terms");

export default function TermsPage() {
  return <TrustPage slug="terms" />;
}
