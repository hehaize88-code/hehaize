import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-volumetric-weight-shipping-cost";
const entry = getSeoArticleEntry("en", slug)!;
const title = "Joyagoo Shipping Cost 2026: Weight & Rehearsal Packing";
const description =
  "Calculate Joyagoo actual and volumetric weight, compare route divisors, and decide when rehearsal packing can prevent surprise shipping costs.";

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

export default function JoyagooVolumetricWeightPage() {
  return (
    <LocalizedPage
      locale="en"
      slug={slug}
    />
  );
}
