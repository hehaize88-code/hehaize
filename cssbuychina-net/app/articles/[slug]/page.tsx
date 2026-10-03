import { ArticleView, contentMetadata } from "../ArticleView";
import { articles } from "../article-data";
export function generateStaticParams() { return Object.keys(articles).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return contentMetadata((await params).slug); }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { return <ArticleView slug={(await params).slug} />; }
