import type React from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Sora, Space_Grotesk } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "700"],
});

export const metadata = {
  title: "DePay - Fast. Secure. Borderless Payments.",
  description:
    "Experience the future of financial transactions with our decentralized platform. No intermediaries, no borders, just seamless transfers.",
  keywords:
    "crypto, blockchain, payments, decentralized, finance, defi, wallet",
  // authors: [{ name: "DePay Team" }],
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: "https://depay.com",
  //   title: "DePay - Fast. Secure. Borderless Payments.",
  //   description:
  //     "Experience the future of financial transactions with our decentralized platform.",
  //   siteName: "DePay",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "DePay - Fast. Secure. Borderless Payments.",
  //   description:
  //     "Experience the future of financial transactions with our decentralized platform.",
  //   creator: "@DePay",
  // },
  // manifest: "/manifest.json",
  // generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${spaceGrotesk.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen bg-black text-white antialiased font-sora">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MainNav />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
