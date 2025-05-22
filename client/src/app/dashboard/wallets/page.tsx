"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, EyeIcon, EyeOffIcon, Plus, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddWalletModal } from "@/components/add-wallet-modal";

// Mock data for wallets
const initialWallets = [
  {
    id: 1,
    name: "Main Wallet",
    balance: 4750.85,
    currency: "USD",
    monthlyLimit: 5000,
    spent: 2450,
    cardNumber: "•••• •••• •••• 4582",
    expiryDate: "05/25",
  },
  {
    id: 2,
    name: "Savings",
    balance: 12350.42,
    currency: "USD",
    monthlyLimit: 15000,
    spent: 3200,
    cardNumber: "•••• •••• •••• 7891",
    expiryDate: "09/26",
  },
  {
    id: 3,
    name: "Investments",
    balance: 8320.15,
    currency: "USD",
    monthlyLimit: 10000,
    spent: 6500,
    cardNumber: "•••• •••• •••• 3214",
    expiryDate: "11/24",
  },
];

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [wallets, setWallets] = useState(initialWallets);
  const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  const handleAddWallet = (newWallet: any) => {
    setWallets([...wallets, newWallet]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Wallets</h1>
          <p className="text-muted-foreground">Manage your wallets and cards</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddWalletModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Wallet
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {showBalance ? `$${totalBalance.toFixed(2)}` : "••••••"}
          </div>
          <p className="text-xs text-muted-foreground">Across all wallets</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="wallets">
        <TabsList className="mb-4">
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="wallets" className="space-y-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    {wallet.name}
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/wallet/${wallet.id}`}>
                      Manage
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>
                  Balance:{" "}
                  {showBalance ? `$${wallet.balance.toFixed(2)}` : "••••••"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Monthly Spending Limit</span>
                      <span>${wallet.monthlyLimit.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Spent</span>
                      <span>${wallet.spent.toFixed(2)}</span>
                    </div>
                    <Progress
                      value={(wallet.spent / wallet.monthlyLimit) * 100}
                      className="h-2 mt-2"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span>Card Number</span>
                      <span>{wallet.cardNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Expiry Date</span>
                      <span>{wallet.expiryDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/40 flex justify-between">
                <Button variant="ghost" size="sm">
                  Top Up
                </Button>
                <Button variant="ghost" size="sm">
                  Transfer
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card
            className="flex items-center justify-center h-48 border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setIsAddWalletModalOpen(true)}
          >
            <CardContent className="flex flex-col items-center p-6">
              <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Add New Wallet</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {wallets.map((wallet) => (
              <Card key={wallet.id} className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 opacity-90"></div>
                <CardContent className="relative p-6">
                  <div className="flex flex-col h-48 justify-between text-white">
                    <div className="flex justify-between items-start">
                      <Wallet className="h-8 w-8" />
                      <span className="text-sm font-light">PayWallet</span>
                    </div>

                    <div className="space-y-4">
                      <div className="text-xl font-mono">
                        {wallet.cardNumber}
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <div className="text-xs opacity-80">CARD HOLDER</div>
                          <div>Alex Johnson</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-80">EXPIRES</div>
                          <div>{wallet.expiryDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card
              className="flex items-center justify-center h-48 border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setIsAddWalletModalOpen(true)}
            >
              <CardContent className="flex flex-col items-center p-6">
                <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Add New Card</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AddWalletModal
        open={isAddWalletModalOpen}
        onOpenChange={setIsAddWalletModalOpen}
        onAddWallet={handleAddWallet}
      />
    </div>
  );
}
