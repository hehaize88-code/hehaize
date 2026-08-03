import SitePage from "../site-page";
import { buildMetadata } from "../site-route";
export const metadata = buildMetadata("fr", "home");
export default function Page() { return <SitePage locale="fr" route="home" />; }
