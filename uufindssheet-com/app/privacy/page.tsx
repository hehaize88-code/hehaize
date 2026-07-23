import { policyMetadata, TrustPage } from "../components/trust-page";

export const metadata = policyMetadata("privacy");

export default function PrivacyPage() {
  return <TrustPage slug="privacy" />;
}
