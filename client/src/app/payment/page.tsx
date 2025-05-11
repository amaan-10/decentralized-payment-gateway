"use client";
import { PaymentFlow } from "@/components/payment-flow";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="payment-ui-theme">
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center mt-12 p-10">
        <div className="w-full max-w-xl">
          <PaymentFlow />
        </div>
      </main>
    </ThemeProvider>
  );
}
