import SitePage from "../site-shell";
import { buildMetadata } from "../site-route";
export const metadata = buildMetadata("de", "home");
export default function Page() { return <SitePage locale="de" route="home" />; }
