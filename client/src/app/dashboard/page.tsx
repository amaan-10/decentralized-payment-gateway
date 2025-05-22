"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CreditCard,
  DollarSign,
  EyeIcon,
  EyeOffIcon,
  QrCode,
  Wallet,
} from "lucide-react";

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

// Mock data for the dashboard
const wallets = [
  { id: 1, name: "Main Wallet", balance: 4750.85, currency: "USD" },
  { id: 2, name: "Savings", balance: 12350.42, currency: "USD" },
  { id: 3, name: "Investments", balance: 8320.15, currency: "USD" },
];

const recentTransactions = [
  {
    id: 1,
    description: "Coffee Shop",
    amount: -4.5,
    type: "expense",
    date: "Today, 9:15 AM",
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 2850.0,
    type: "income",
    date: "Yesterday, 5:30 PM",
  },
  {
    id: 3,
    description: "Grocery Store",
    amount: -65.38,
    type: "expense",
    date: "Yesterday, 2:45 PM",
  },
  {
    id: 4,
    description: "Freelance Payment",
    amount: 350.0,
    type: "income",
    date: "May 20, 2023",
  },
  {
    id: 5,
    description: "Electric Bill",
    amount: -85.2,
    type: "expense",
    date: "May 19, 2023",
  },
];

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true);
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Alex!</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/transfer">
              <ArrowRight className="mr-2 h-4 w-4" />
              Send Money
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/scan-qr">
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR
            </Link>
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
          <p className="text-xs text-muted-foreground">+5.1% from last month</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wallets.map((wallet) => (
          <Card key={wallet.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {wallet.name}
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `$${wallet.balance.toFixed(2)}` : "••••••"}
              </div>
              <div className="mt-4 h-1">
                <Progress value={45} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex h-24 flex-col items-center justify-center gap-1"
              asChild
            >
              <Link href="/transfer">
                <ArrowUp className="h-5 w-5" />
                <span>Send</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex h-24 flex-col items-center justify-center gap-1"
              asChild
            >
              <Link href="/transfer?type=receive">
                <ArrowDown className="h-5 w-5" />
                <span>Receive</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex h-24 flex-col items-center justify-center gap-1"
              asChild
            >
              <Link href="/cards">
                <CreditCard className="h-5 w-5" />
                <span>Cards</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex h-24 flex-col items-center justify-center gap-1"
              asChild
            >
              <Link href="/transactions">
                <DollarSign className="h-5 w-5" />
                <span>Transactions</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your recent payment activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.slice(0, 4).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      transaction.type === "income"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowDown className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-sm font-medium ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/transactions">
                View all transactions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Spending Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="week">
            <TabsList className="mb-4">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <TabsContent value="week" className="space-y-4">
              <div className="h-[200px] w-full bg-muted/40 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Weekly spending chart would appear here
                </p>
              </div>
            </TabsContent>
            <TabsContent value="month" className="space-y-4">
              <div className="h-[200px] w-full bg-muted/40 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Monthly spending chart would appear here
                </p>
              </div>
            </TabsContent>
            <TabsContent value="year" className="space-y-4">
              <div className="h-[200px] w-full bg-muted/40 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Yearly spending chart would appear here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
