import { notFound } from "next/navigation";
import { ArticleView, contentMetadata } from "../../../articles/ArticleView";
import { guides } from "../../../guides/guide-data";
import { isSiteLocale } from "../../../i18n";
export function generateStaticParams() { return ["pt-br", "de", "es"].flatMap(locale => Object.keys(guides).map(slug => ({ locale, slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) { const {locale,slug} = await params; return isSiteLocale(locale) && locale !== "en" ? contentMetadata(slug, locale, "guides") : {}; }
export default async function LocalGuide({ params }: { params: Promise<{ locale: string; slug: string }> }) { const {locale,slug} = await params; if (!isSiteLocale(locale) || locale === "en") notFound(); return <ArticleView slug={slug} locale={locale} kind="guides" />; }
