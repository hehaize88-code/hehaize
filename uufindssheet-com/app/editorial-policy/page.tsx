import { policyMetadata, TrustPage } from "../components/trust-page";

export const metadata = policyMetadata("editorial-policy");

export default function EditorialPolicyPage() {
  return <TrustPage slug="editorial-policy" />;
}
