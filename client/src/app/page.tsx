"use client";

import { FloatingWalletButton } from "@/components/floating-wallet-button";
import HomePage from "@/app/home";
import "./globals.css";

export default function Page() {
  return (
    <>
      <HomePage />
      <FloatingWalletButton />
    </>
  );
}
