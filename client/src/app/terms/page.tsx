import type { Metadata } from "next";
import TermsOfServicePageClient from "./TermsOfServicePageClient";

export const metadata: Metadata = {
  title: "Terms of Service | DePay",
  description:
    "DePay Terms of Service - The agreement between you and DePay when using our platform.",
};

export default function TermsOfServicePage() {
  return <TermsOfServicePageClient />;
}
