import { buildMetadata, renderSiteRoute, slugToRoute } from "../../site-route";
type Props = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Props) { const { slug } = await params; return buildMetadata("pl", slugToRoute(slug)); }
export default async function Page({ params }: Props) { const { slug } = await params; return renderSiteRoute("pl", slug); }
