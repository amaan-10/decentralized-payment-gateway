"use client";

import { useState, useMemo } from "react";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  Filter,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccountData } from "@/hooks/useAccountData";

// const transactions = [
//   {
//     id: 1,
//     description: "Coffee Shop",
//     amount: -4.5,
//     type: "send",
//     category: "Food & Drink",
//     date: "2024-12-21",
//     time: "09:15 AM",
//     status: "completed",
//   },
//   {
//     id: 2,
//     description: "Salary Deposit",
//     amount: 2850.0,
//     type: "received",
//     category: "Salary",
//     date: "2024-12-20",
//     time: "05:30 PM",
//     status: "completed",
//   },
//   {
//     id: 3,
//     description: "Grocery Store",
//     amount: -65.38,
//     type: "send",
//     category: "Groceries",
//     date: "2024-12-20",
//     time: "02:45 PM",
//     status: "completed",
//   },
//   {
//     id: 4,
//     description: "Freelance Payment",
//     amount: 350.0,
//     type: "received",
//     category: "Freelance",
//     date: "2024-12-19",
//     time: "11:20 AM",
//     status: "completed",
//   },
//   {
//     id: 5,
//     description: "Electric Bill",
//     amount: -85.2,
//     type: "send",
//     category: "Utilities",
//     date: "2024-11-18",
//     time: "10:15 AM",
//     status: "completed",
//   },
//   {
//     id: 6,
//     description: "Online Shopping",
//     amount: -129.99,
//     type: "send",
//     category: "Shopping",
//     date: "2024-11-17",
//     time: "03:30 PM",
//     status: "completed",
//   },
//   {
//     id: 7,
//     description: "Dividend Payment",
//     amount: 75.5,
//     type: "received",
//     category: "Investment",
//     date: "2024-11-16",
//     time: "09:00 AM",
//     status: "completed",
//   },
//   {
//     id: 8,
//     description: "Restaurant Dinner",
//     amount: -89.75,
//     type: "send",
//     category: "Food & Drink",
//     date: "2024-10-15",
//     time: "08:45 PM",
//     status: "completed",
//   },
//   {
//     id: 9,
//     description: "Mobile Phone Bill",
//     amount: -45.0,
//     type: "send",
//     category: "Utilities",
//     date: "2024-10-14",
//     time: "11:30 AM",
//     status: "completed",
//   },
//   {
//     id: 10,
//     description: "Client Payment",
//     amount: 1200.0,
//     type: "received",
//     category: "Freelance",
//     date: "2024-10-13",
//     time: "04:15 PM",
//     status: "completed",
//   },
// ];

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

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const { name, fullName, totalBalance, recentTransactions, errors } =
    useAccountData() as {
      name: string;
      fullName: string;
      totalBalance: number;
      recentTransactions: recentTransactions[];
      errors: any;
    };

  const transactions = recentTransactions;

  console.log(transactions);

  const filteredTransactions = transactions.filter((transaction) => {
    const name =
      transaction.type === "send"
        ? transaction.receiver.name
        : transaction.sender.name;

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || transaction.type === filterType;

    // Date filtering implementation
    const transactionDate = new Date(transaction.timestamp);
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    let matchesDate = true;

    switch (dateRange) {
      case "today":
        matchesDate = transactionDate >= startOfToday;
        break;
      case "week":
        matchesDate = transactionDate >= startOfWeek;
        break;
      case "month":
        matchesDate = transactionDate >= startOfMonth;
        break;
      case "year":
        matchesDate = transactionDate >= startOfYear;
        break;
      case "all":
      default:
        matchesDate = true;
        break;
    }

    return matchesSearch && matchesType && matchesDate;
  });

  // Calculate totals
  const totalReceived = transactions
    .filter((t) => t.type === "received")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSend = transactions
    .filter((t) => t.type === "send")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netBalance = totalReceived - totalSend;

  const formatAmount = (amount: number) => {
    return Math.abs(amount) % 1 === 0
      ? Math.abs(amount).toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })
      : Math.abs(amount).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  const TransactionsList = ({
    transactionsList,
  }: {
    transactionsList: typeof transactions;
  }) => {
    // Group the passed transactions by month and year
    const groupedTransactions = useMemo(() => {
      const groups: { [key: string]: typeof transactions } = {};

      transactionsList.forEach((transaction) => {
        const date = new Date(transaction.timestamp);
        const monthYear = date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });

        if (!groups[monthYear]) {
          groups[monthYear] = [];
        }
        groups[monthYear].push(transaction);
      });

      // Sort groups by date (most recent first)
      const sortedGroups = Object.keys(groups)
        .sort((a, b) => {
          const dateA = new Date(a + " 1");
          const dateB = new Date(b + " 1");
          return dateB.getTime() - dateA.getTime();
        })
        .reduce((acc, key) => {
          acc[key] = groups[key].sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          return acc;
        }, {} as { [key: string]: typeof transactions });

      return sortedGroups;
    }, [transactionsList]);

    return (
      <div className="space-y-6">
        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No transactions found
          </div>
        ) : (
          Object.entries(groupedTransactions).map(
            ([monthYear, monthTransactions]) => (
              <div key={monthYear} className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  {monthYear}
                </h3>
                <div className="space-y-2">
                  {monthTransactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
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
                          <p className="font-medium">
                            {transaction.type === "send"
                              ? transaction.receiver.name
                              : transaction.sender.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>
                              {new Date(
                                transaction.timestamp
                              ).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span>•</span>
                            <span>
                              {new Date(
                                transaction.timestamp
                              ).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "received"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "received" ? "+" : "-"}{" "}
                          <span className="font-roboto">₹</span>
                          {formatAmount(transaction.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.category || ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage your transaction history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <span className="font-roboto">₹</span>
              {formatAmount(totalReceived)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Send</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              <span className="font-roboto">₹</span>
              {formatAmount(totalSend)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                netBalance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="font-roboto">₹</span>
              {formatAmount(netBalance)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View all your past transactions grouped by month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="received">Received Only</SelectItem>
                    <SelectItem value="send">Send Only</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="received">Received</TabsTrigger>
                <TabsTrigger value="send">Send</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <TransactionsList transactionsList={filteredTransactions} />
              </TabsContent>

              <TabsContent value="received" className="mt-4">
                <TransactionsList
                  transactionsList={filteredTransactions.filter(
                    (t) => t.type === "received"
                  )}
                />
              </TabsContent>

              <TabsContent value="send" className="mt-4">
                <TransactionsList
                  transactionsList={filteredTransactions.filter(
                    (t) => t.type === "send"
                  )}
                />
              </TabsContent>

              <TabsContent value="pending" className="mt-4">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">
                    No pending transactions
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
