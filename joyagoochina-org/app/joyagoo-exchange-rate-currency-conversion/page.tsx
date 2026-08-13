import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-exchange-rate-currency-conversion";
const entry = getSeoArticleEntry("en", slug)!;
const description =
  "Audit the Joyagoo exchange rate using the live payment quote, credited balance and final card statement without assuming a fixed markup.";

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Exchange Rate & Currency Conversion Guide" },
  description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`),
  ...editorialSocialMetadata({
    slug,
    title: entry.article.title,
    description,
    url: `https://joyagoochina.org/${slug}/`,
  }),
};

export default function JoyagooExchangeRatePage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
