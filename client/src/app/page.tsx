"use client";

import { MainNav } from "@/components/main-nav";
import { FloatingWalletButton } from "@/components/floating-wallet-button";
import HomePage from "@/app/home";
import "./globals.css";

export default function Page() {
  return (
    <>
      <MainNav />
      <HomePage />
      <FloatingWalletButton />
    </>
  );
}
