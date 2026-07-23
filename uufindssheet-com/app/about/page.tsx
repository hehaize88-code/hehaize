import { policyMetadata, TrustPage } from "../components/trust-page";

export const metadata = policyMetadata("about");

export default function AboutPage() {
  return <TrustPage slug="about" />;
}
