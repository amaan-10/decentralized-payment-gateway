import type { Metadata } from "next";
import CookiesPageClient from "./CookiesPageClient";

export const metadata: Metadata = {
  title: "Cookie Policy | DePay",
  description:
    "DePay Cookie Policy - How we use cookies and similar technologies on our platform.",
};

export default function CookiePage() {
  return <CookiesPageClient />;
}
