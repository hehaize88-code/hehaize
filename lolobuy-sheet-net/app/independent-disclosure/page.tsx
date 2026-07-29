import { EditorialPage, editorialMetadata } from "../editorial-page";

export const metadata = editorialMetadata("independent-disclosure");

export default function IndependentDisclosureRoute() {
  return <EditorialPage kind="independent-disclosure" />;
}
