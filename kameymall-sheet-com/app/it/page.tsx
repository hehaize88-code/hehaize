import SitePage from "../site-page";
import { buildMetadata } from "../site-route";
export const metadata = buildMetadata("it", "home");
export default function Page() { return <SitePage locale="it" route="home" />; }
