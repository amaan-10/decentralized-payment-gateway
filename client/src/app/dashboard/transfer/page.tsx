"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowDown, ArrowUp, Copy, User } from "lucide-react";

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

  const handleSend = () => {
    // Handle send money logic
    console.log("Sending", { amount, selectedWallet, recipient, note });
    alert("Payment sent successfully!");
    setAmount("");
    setNote("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
    alert("Payment link copied to clipboard!");
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
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">$</span>
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet">From Wallet</Label>
                <Select
                  value={selectedWallet}
                  onValueChange={setSelectedWallet}
                >
                  <SelectTrigger id="wallet">
                    <SelectValue placeholder="Select wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id.toString()}>
                        {wallet.name} (${wallet.balance.toFixed(2)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem
                        key={contact.id}
                        value={contact.id.toString()}
                      >
                        {contact.name} ({contact.email})
                      </SelectItem>
                    ))}
                    <SelectItem value="new">Add New Recipient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input
                  id="note"
                  placeholder="What's this for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSend} className="w-full">
                Send Money
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Recent Recipients</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contacts.map((contact) => (
                <Button
                  key={contact.id}
                  variant="outline"
                  className="flex flex-col items-center justify-center h-24 gap-2"
                  onClick={() => setRecipient(contact.id.toString())}
                >
                  <div className="rounded-full bg-muted p-2">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{contact.name}</span>
                </Button>
              ))}
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-24 gap-2"
              >
                <div className="rounded-full bg-muted p-2">
                  <User className="h-5 w-5" />
                </div>
                <span className="text-sm">Add New</span>
              </Button>
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
                      <span className="text-muted-foreground">$</span>
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
