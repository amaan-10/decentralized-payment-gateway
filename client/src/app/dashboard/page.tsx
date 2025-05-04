"use client";

import {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Wallet,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

// Sample data for charts
const balanceData = [
  { date: "Jan", BTC: 0.5, ETH: 2.3, USDT: 1000 },
  { date: "Feb", BTC: 0.8, ETH: 3.1, USDT: 1200 },
  { date: "Mar", BTC: 1.2, ETH: 2.8, USDT: 1500 },
  { date: "Apr", BTC: 1.5, ETH: 3.5, USDT: 1800 },
  { date: "May", BTC: 1.3, ETH: 4.2, USDT: 2000 },
  { date: "Jun", BTC: 1.8, ETH: 5.0, USDT: 2200 },
  { date: "Jul", BTC: 2.1, ETH: 4.8, USDT: 2500 },
];

const transactionData = [
  { date: "Mon", value: 1200 },
  { date: "Tue", value: 900 },
  { date: "Wed", value: 1500 },
  { date: "Thu", value: 1800 },
  { date: "Fri", value: 1200 },
  { date: "Sat", value: 600 },
  { date: "Sun", value: 400 },
];

const recentTransactions = [
  {
    id: "tx1",
    type: "receive",
    amount: "0.25 BTC",
    value: "$10,250.00",
    from: "0x1a2b...3c4d",
    date: "Today, 10:45 AM",
    status: "completed",
  },
  {
    id: "tx2",
    type: "send",
    amount: "1.5 ETH",
    value: "$3,125.00",
    to: "0x5e6f...7g8h",
    date: "Yesterday, 6:30 PM",
    status: "completed",
  },
  {
    id: "tx3",
    type: "receive",
    amount: "500 USDT",
    value: "$500.00",
    from: "0x9i0j...1k2l",
    date: "Jul 12, 2023, 3:15 PM",
    status: "completed",
  },
  {
    id: "tx4",
    type: "send",
    amount: "0.1 BTC",
    value: "$4,100.00",
    to: "0x3m4n...5o6p",
    date: "Jul 10, 2023, 11:20 AM",
    status: "pending",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Welcome back, John Doe</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-blue-800 text-blue-400 hover:bg-blue-900/20"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Add Wallet
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <DollarSign className="mr-2 h-4 w-4" />
            Send / Receive
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,875.35</div>
            <div className="flex items-center text-sm text-green-500 mt-1">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>12.5%</span>
              <span className="text-gray-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Active Wallets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="flex items-center text-sm text-green-500 mt-1">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>2</span>
              <span className="text-gray-400 ml-1">new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-sm text-green-500 mt-1">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>24.3%</span>
              <span className="text-gray-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Rewards Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125.40</div>
            <div className="flex items-center text-sm text-red-500 mt-1">
              <ArrowDown className="h-4 w-4 mr-1" />
              <span>5.2%</span>
              <span className="text-gray-400 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Chart */}
        <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Portfolio Overview</CardTitle>
              <Tabs defaultValue="1m">
                <TabsList className="bg-blue-900/20">
                  <TabsTrigger value="1w">1W</TabsTrigger>
                  <TabsTrigger value="1m">1M</TabsTrigger>
                  <TabsTrigger value="3m">3M</TabsTrigger>
                  <TabsTrigger value="1y">1Y</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              Your asset allocation and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={balanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7931A" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorETH" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#627EEA" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#627EEA" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUSDT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#26A17B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#26A17B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      borderColor: "#1E40AF",
                    }}
                    itemStyle={{ color: "#F3F4F6" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="BTC"
                    stroke="#F7931A"
                    fillOpacity={1}
                    fill="url(#colorBTC)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="ETH"
                    stroke="#627EEA"
                    fillOpacity={1}
                    fill="url(#colorETH)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="USDT"
                    stroke="#26A17B"
                    fillOpacity={1}
                    fill="url(#colorUSDT)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F7931A]"></div>
                <div className="text-sm">
                  <div className="font-medium">Bitcoin</div>
                  <div className="text-gray-400">$16,450.00</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#627EEA]"></div>
                <div className="text-sm">
                  <div className="font-medium">Ethereum</div>
                  <div className="text-gray-400">$6,250.35</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#26A17B]"></div>
                <div className="text-sm">
                  <div className="font-medium">USDT</div>
                  <div className="text-gray-400">$2,175.00</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Distribution */}
        <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Wallet Distribution</CardTitle>
            <CardDescription>Allocation across your wallets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Main Wallet</span>
                  </div>
                  <span className="text-sm font-medium">$12,450.00</span>
                </div>
                <Progress value={50} className="h-2 bg-blue-950" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium">Savings Wallet</span>
                  </div>
                  <span className="text-sm font-medium">$8,250.35</span>
                </div>
                <Progress value={33} className="h-2 bg-blue-950" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    <span className="text-sm font-medium">Trading Wallet</span>
                  </div>
                  <span className="text-sm font-medium">$3,175.00</span>
                </div>
                <Progress value={13} className="h-2 bg-blue-950" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Hardware Wallet</span>
                  </div>
                  <span className="text-sm font-medium">$1,000.00</span>
                </div>
                <Progress value={4} className="h-2 bg-blue-950" />
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full border-blue-800 text-blue-400 hover:bg-blue-900/20"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Manage Wallets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-900/10 hover:bg-blue-900/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "receive"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      }`}
                    >
                      {transaction.type === "receive" ? (
                        <ArrowDown
                          className={`h-5 w-5 ${
                            transaction.type === "receive"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        />
                      ) : (
                        <ArrowUp
                          className={`h-5 w-5 ${
                            transaction.type === "receive"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.type === "receive" ? "Received" : "Sent"}{" "}
                        {transaction.amount}
                      </div>
                      <div className="text-sm text-gray-400">
                        {transaction.type === "receive"
                          ? `From: ${transaction.from}`
                          : `To: ${transaction.to}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{transaction.value}</div>
                    <div className="text-sm text-gray-400">
                      {transaction.date}
                    </div>
                  </div>
                  <Badge
                    className={`ml-2 ${
                      transaction.status === "completed"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Activity */}
        <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Transaction Activity</CardTitle>
            <CardDescription>Weekly overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={transactionData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      borderColor: "#1E40AF",
                    }}
                    itemStyle={{ color: "#F3F4F6" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#3B82F6", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#3B82F6", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total Volume</span>
                <span className="font-medium">$7,600.00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Highest Day</span>
                <span className="font-medium">Thursday ($1,800.00)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Average</span>
                <span className="font-medium">$1,085.71 / day</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
