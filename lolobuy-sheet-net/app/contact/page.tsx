import { EditorialPage, editorialMetadata } from "../editorial-page";

export const metadata = editorialMetadata("contact");

export default function ContactPage() {
  return <EditorialPage kind="contact" />;
}
