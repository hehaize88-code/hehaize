import SitePage from "../site-shell";
import { buildMetadata } from "../site-route";
export const metadata = buildMetadata("pl", "home");
export default function Page() { return <SitePage locale="pl" route="home" />; }
