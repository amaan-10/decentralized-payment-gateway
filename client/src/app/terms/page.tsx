import type { Metadata } from "next";
import TermsOfServicePageClient from "./TermsOfServicePageClient";

export const metadata: Metadata = {
  title: "Terms of Service | CryptoFlow",
  description:
    "CryptoFlow Terms of Service - The agreement between you and CryptoFlow when using our platform.",
};

export default function TermsOfServicePage() {
  return <TermsOfServicePageClient />;
}
