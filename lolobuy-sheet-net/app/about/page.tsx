import { EditorialPage, editorialMetadata } from "../editorial-page";

export const metadata = editorialMetadata("about");

export default function AboutPage() {
  return <EditorialPage kind="about" />;
}
