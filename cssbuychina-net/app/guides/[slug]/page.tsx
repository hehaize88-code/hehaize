import { ArticleView, contentMetadata } from "../../articles/ArticleView";
import { guides } from "../guide-data";
export function generateStaticParams() { return Object.keys(guides).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return contentMetadata((await params).slug, "en", "guides"); }
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) { return <ArticleView slug={(await params).slug} kind="guides" />; }
