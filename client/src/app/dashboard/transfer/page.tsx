"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Copy, Send, IndianRupee } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCodeGenerator from "@/components/qr-code-generator";

// Mock data for contacts and wallets
const contacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const wallets = [
  { id: 1, name: "Main Wallet", balance: 4750.85, currency: "USD" },
  { id: 2, name: "Savings", balance: 12350.42, currency: "USD" },
  { id: 3, name: "Investments", balance: 8320.15, currency: "USD" },
];

export default function TransferPage() {
  const searchParams = useSearchParams();
  const defaultTab =
    searchParams.get("type") === "receive" ? "receive" : "send";
  const [amount, setAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [paymentLink, setPaymentLink] = useState(
    "https://paywallet.com/pay/alex123"
  );
  const router = useRouter();

  const handleSend = () => {
    // Handle send money logic
    alert("Payment sent successfully!");
    setAmount("");
    setNote("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
    alert("Payment link copied to clipboard!");
  };

  const handleSendMoneyClick = () => {
    router.push("/pay");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Send & Receive</h1>
        <p className="text-muted-foreground">
          Transfer money to friends and family
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="send" className="flex items-center gap-2">
            <ArrowUp className="h-4 w-4" />
            Send
          </TabsTrigger>
          <TabsTrigger value="receive" className="flex items-center gap-2">
            <ArrowDown className="h-4 w-4" />
            Receive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
              <CardDescription>Send money to anyone, anywhere</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-8">
                {/* Dark Mode Minimalist Send Money Logo */}
                <div className="flex justify-center">
                  <div
                    onClick={handleSendMoneyClick}
                    className="group cursor-pointer relative"
                  >
                    {/* Outer glow effect - enhanced for dark mode */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110"></div>

                    {/* Main container - dark mode styling */}
                    <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-3xl p-12 shadow-2xl hover:shadow-slate-900/50 transition-all duration-500 group-hover:border-slate-600/80 group-hover:bg-slate-900/90">
                      {/* Floating elements - adjusted for dark mode */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-slate-600 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="absolute bottom-6 left-6 w-1 h-1 bg-slate-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>

                      {/* Icon container */}
                      <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                          {/* Icon background - dark mode gradient */}
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center group-hover:from-slate-700 group-hover:to-slate-600 transition-all duration-300 shadow-lg">
                            <Send className="w-7 h-7 text-slate-300 group-hover:text-slate-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                          </div>

                          {/* Subtle pulse ring - enhanced for dark mode */}
                          <div className="absolute inset-0 rounded-2xl border border-slate-600/50 opacity-0 group-hover:opacity-100 animate-ping"></div>
                        </div>

                        {/* Text */}
                        <div className="text-center space-y-2">
                          <h3 className="text-xl font-medium text-slate-100 tracking-tight">
                            Send Money
                          </h3>
                          <p className="text-sm text-slate-400 font-light">
                            Tap to transfer
                          </p>
                        </div>
                      </div>

                      {/* Bottom accent line - glowing effect for dark mode */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm shadow-slate-500/50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Recent Recipients</h2>

            <div className="grid grid-cols-4 gap-3">
              {contacts.map((contact, index) => (
                <button
                  key={contact.id}
                  onClick={handleSendMoneyClick}
                  className="group flex flex-col items-center space-y-3 p-4 rounded-2xl hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl flex items-center justify-center group-hover:from-slate-700 group-hover:to-slate-600 transition-all duration-300 shadow-lg">
                      <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-slate-300 font-medium tracking-wide transition-colors duration-300">
                    {contact.name.split(" ")[0]}
                  </span>
                </button>
              ))}

              <button
                onClick={handleSendMoneyClick}
                className="group flex flex-col items-center space-y-3 p-4 rounded-2xl hover:bg-slate-800/50 transition-all duration-300"
              >
                <div className="w-12 h-12 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center group-hover:border-slate-500 transition-colors duration-300">
                  <div className="w-4 h-4 border border-slate-500 rounded-full flex items-center justify-center group-hover:border-slate-400 transition-colors duration-300">
                    <div className="w-2 h-px bg-slate-500 group-hover:bg-slate-400 transition-colors duration-300"></div>
                    <div className="w-px h-2 bg-slate-500 group-hover:bg-slate-400 absolute transition-colors duration-300"></div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 group-hover:text-slate-400 font-medium tracking-wide transition-colors duration-300">
                  Add
                </span>
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="receive">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Receive Money</CardTitle>
                <CardDescription>Share your payment details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="mb-6 w-48 h-48">
                  <QRCodeGenerator value={paymentLink} />
                </div>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Scan this QR code to send money to your wallet
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Link</CardTitle>
                <CardDescription>
                  Share this link to receive payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input value={paymentLink} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receive-amount">
                    Request Amount (Optional)
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground font-roboto">
                        ₹
                      </span>
                    </div>
                    <Input
                      id="receive-amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receive-wallet">Receive To</Label>
                  <Select>
                    <SelectTrigger id="receive-wallet">
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {wallets.map((wallet) => (
                        <SelectItem
                          key={wallet.id}
                          value={wallet.id.toString()}
                        >
                          {wallet.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receive-note">Note (Optional)</Label>
                  <Input id="receive-note" placeholder="What's this for?" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Payment Link</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
