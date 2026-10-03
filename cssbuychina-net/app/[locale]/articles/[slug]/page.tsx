import { notFound } from "next/navigation";
import { ArticleView, contentMetadata } from "../../../articles/ArticleView";
import { articles } from "../../../articles/article-data";
import { isSiteLocale } from "../../../i18n";
export function generateStaticParams() { return ["pt-br", "de", "es"].flatMap(locale => Object.keys(articles).map(slug => ({ locale, slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) { const {locale,slug} = await params; return isSiteLocale(locale) && locale !== "en" ? contentMetadata(slug, locale) : {}; }
export default async function LocalArticle({ params }: { params: Promise<{ locale: string; slug: string }> }) { const {locale,slug} = await params; if (!isSiteLocale(locale) || locale === "en") notFound(); return <ArticleView slug={slug} locale={locale} />; }
