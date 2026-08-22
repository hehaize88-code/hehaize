import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-return-window-warehouse-storage";
const entry = getSeoArticleEntry("en", slug)!;
const title = "Joyagoo Returns: 5-Day QC & 90-Day Storage";
const description =
  "Understand Joyagoo's five-day QC return window, 90-day item storage and 30-day parcel storage timeline before deadlines expire.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  ...editorialSocialMetadata({
    slug,
    title,
    description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function JoyagooReturnWindowPage() {
  return (
    <LocalizedPage
      locale="en"
      slug={slug}
    />
  );
}
