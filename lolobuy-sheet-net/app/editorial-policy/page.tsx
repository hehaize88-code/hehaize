import { EditorialPage, editorialMetadata } from "../editorial-page";

export const metadata = editorialMetadata("editorial-policy");

export default function EditorialPolicyPage() {
  return <EditorialPage kind="editorial-policy" />;
}
