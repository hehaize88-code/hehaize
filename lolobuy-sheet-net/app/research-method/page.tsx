import { EditorialPage, editorialMetadata } from "../editorial-page";

export const metadata = editorialMetadata("research-method");

export default function ResearchMethodPage() {
  return <EditorialPage kind="research-method" />;
}
