import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";
import { editorialSocialMetadata } from "../editorialAssets";
import { languages } from "../i18n";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { languageAlternates } from "../seoAlternates";

const slug = "joyagoo-shipping-coupon-promo-discount-guide";
const entry = getSeoArticleEntry("en", slug)!;

export const metadata: Metadata = {
  title: { absolute: "Joyagoo Shipping Coupon Guide 2026: Promo & Discount Rules" },
  description: entry.article.description,
  keywords: entry.keywords,
  alternates: languageAlternates(`/${slug}/`, languages.filter(language => getSeoArticleEntry(language.code, slug)).map(language => language.code)),
  ...editorialSocialMetadata({ slug, title: entry.article.title, description: entry.article.description, url: `https://joyagoochina.org/${slug}/` }),
};

export default function JoyagooShippingCouponGuidePage() {
  return <LocalizedPage locale="en" slug={slug} />;
}
