"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  EyeIcon,
  EyeOffIcon,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccountData } from "@/hooks/useAccountData";

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

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);

  const {
    name,
    fullName,
    totalBalance,
    accountNumber,
    email,
    recentTransactions,
    errors,
  } = useAccountData() as {
    name: string;
    fullName: string;
    totalBalance: number;
    accountNumber: string;
    email: string;
    recentTransactions: recentTransactions[];
    errors: any;
  };

  const maskedAccountNumber =
    accountNumber.slice(0, -4).replace(/\d/g, "*") + accountNumber.slice(-4);

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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Wallets</h1>
          <p className="text-muted-foreground">
            Manage your wallet and balance
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">
            Available Balance
          </CardTitle>
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
          <div className="text-3xl font-bold">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Card Details</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCardDetails(!showCardDetails)}
          >
            {showCardDetails ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Card Number</p>
              <p className="font-mono">
                {showCardDetails
                  ? accountNumber.replace(/(.{4})/g, "$1 ").trim()
                  : maskedAccountNumber.replace(/(.{4})/g, "$1 ").trim()}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Card Holder</p>
              <p>{fullName.toLocaleUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p>{email}</p>
            </div>
            <div>
              {/* <p className="text-gray-400 text-sm mb-1">CVV</p>
              <p className="font-mono">
                {showCardDetails ?  : ****}
              </p> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Recent Transactions
              </h1>
              <p className="text-muted-foreground text-sm">
                Your recent payment activity
              </p>
            </div>

            <Button variant="outline" className="w-auto">
              <Link
                href="/dashboard/transactions"
                className="text-xs w-auto flex gap-1"
              >
                View all
                <ArrowRight className="ml-2 h-2 w-2" />
              </Link>
            </Button>
          </div>
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
      </Card>
    </div>
  );
}
