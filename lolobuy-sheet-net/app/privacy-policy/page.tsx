import { EditorialPage, editorialMetadata } from "../editorial-page";

export const metadata = editorialMetadata("privacy-policy");

export default function PrivacyPolicyRoute() {
  return <EditorialPage kind="privacy-policy" />;
}
