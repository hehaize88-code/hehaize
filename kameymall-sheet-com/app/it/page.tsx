import SitePage from "../site-shell";
import { buildMetadata } from "../site-route";
export const metadata = buildMetadata("it", "home");
export default function Page() { return <SitePage locale="it" route="home" />; }
