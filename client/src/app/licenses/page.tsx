import type { Metadata } from "next";
import LicensesPageClient from "./LicensesPageClient";

export const metadata: Metadata = {
  title: "Open Source Licenses | DePay",
  description:
    "Information about the open source software used in DePay and their respective licenses.",
};

export default function LicensesPage() {
  return <LicensesPageClient />;
}
