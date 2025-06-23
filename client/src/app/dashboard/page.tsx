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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccountData } from "@/hooks/useAccountData";
import LoaderWrapper from "@/components/loading";

interface Info {
  account: string;
  name: string;
}

type recentTransactions = {
  _id: number;
  note: string;
  amount: number;
  type: "received" | "send";
  timestamp: string;
  receiver: Info;
  sender: Info;
};

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(false);

  const {
    name,
    fullName,
    totalBalance,
    recentTransactions,
    isLoading,
    errors,
  } = useAccountData() as {
    name: string;
    fullName: string;
    totalBalance: number;
    recentTransactions: recentTransactions[];
    errors: any;
    isLoading: boolean;
  };

  function formatTimestamp(gmtString: string): string {
    const gmtDate = new Date(gmtString);

    const istDateStr = gmtDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const istDate = new Date(
      gmtDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const inputDay = new Date(
      istDate.getFullYear(),
      istDate.getMonth(),
      istDate.getDate()
    );

    const timeStr = istDate.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    if (inputDay.getTime() === today.getTime()) {
      return `Today, ${timeStr}`;
    }

    if (inputDay.getTime() === yesterday.getTime()) {
      return `Yesterday, ${timeStr}`;
    }

    return istDateStr;
  }

  return (
    <LoaderWrapper isLoading={isLoading}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {name}!</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/dashboard/transfer">
                <ArrowRight className="mr-2 h-4 w-4" />
                Send Money
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pay?scan-qr=true">
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
              {showBalance ? (
                <>
                  <span className="font-roboto">₹</span>
                  <span>
                    {Math.abs(totalBalance) % 1 === 0
                      ? Math.abs(totalBalance).toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })
                      : Math.abs(totalBalance).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </span>
                </>
              ) : (
                "••••••"
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.1% from last month
            </p>
          </CardContent>
        </Card>

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
                <Link href="/dashboard/transfer">
                  <ArrowUp className="h-5 w-5" />
                  <span>Send</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-1"
                asChild
              >
                <Link href="/dashboard/transfer?type=receive">
                  <ArrowDown className="h-5 w-5" />
                  <span>Receive</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-1"
                asChild
              >
                <Link href="/dashboard/cards">
                  <CreditCard className="h-5 w-5" />
                  <span>Cards</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex h-24 flex-col items-center justify-center gap-1"
                asChild
              >
                <Link href="/dashboard/transactions">
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
                  key={transaction._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${
                        transaction.type === "received"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "received" ? (
                        <ArrowDown className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUp className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {transaction.type === "received"
                          ? transaction.sender.name
                          : transaction.receiver.name}
                      </p>{" "}
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(transaction.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      transaction.type === "received"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "received" ? "+" : "-"}
                    <span className="font-roboto">₹</span>
                    {Math.abs(transaction.amount) % 1 === 0
                      ? Math.abs(transaction.amount).toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })
                      : Math.abs(transaction.amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/dashboard/transactions">
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
    </LoaderWrapper>
  );
}
