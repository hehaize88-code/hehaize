import { EditorialPage, editorialMetadata } from "../editorial-page";

export const metadata = editorialMetadata("terms");

export default function TermsRoute() {
  return <EditorialPage kind="terms" />;
}
