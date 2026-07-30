import type { Metadata } from "next";
import { LocalizedPage } from "../components/LocalizedExperience";

export const metadata: Metadata = {
  title: "How to Buy with Joyagoo: Step-by-Step Guide",
  description:
    "Learn the Joyagoo buying flow from product selection and domestic ordering to QC photos, warehouse storage and international parcel submission.",
  alternates: { canonical: "/how-to-buy/" },
};

export default function HowToBuyPage() {
  return <LocalizedPage locale="en" slug="how-to-buy" />;
}
