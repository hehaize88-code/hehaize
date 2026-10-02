import SitePage from "../site-shell";
import { buildMetadata } from "../site-route";
export const metadata = buildMetadata("es", "home");
export default function Page() { return <SitePage locale="es" route="home" />; }
