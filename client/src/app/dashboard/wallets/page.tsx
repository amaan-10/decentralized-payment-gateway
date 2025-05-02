"use client";

import { useState } from "react";
import {
  Plus,
  QrCode,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Trash,
  Edit,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Sample wallets data
const wallets = [
  {
    id: "wallet1",
    name: "Main Wallet",
    type: "Hot Wallet",
    address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    balance: [
      { currency: "BTC", amount: "0.45", value: "$18,450.00" },
      { currency: "ETH", amount: "3.2", value: "$6,666.67" },
      { currency: "USDT", amount: "1,500.00", value: "$1,500.00" },
    ],
    totalValue: "$26,616.67",
    lastActivity: "2 hours ago",
  },
  {
    id: "wallet2",
    name: "Savings Wallet",
    type: "Cold Wallet",
    address: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a",
    balance: [
      { currency: "BTC", amount: "0.25", value: "$10,250.00" },
      { currency: "ETH", amount: "1.5", value: "$3,125.00" },
    ],
    totalValue: "$13,375.00",
    lastActivity: "5 days ago",
  },
  {
    id: "wallet3",
    name: "Trading Wallet",
    type: "Hot Wallet",
    address: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
    balance: [
      { currency: "ETH", amount: "2.0", value: "$4,166.67" },
      { currency: "USDT", amount: "2,500.00", value: "$2,500.00" },
    ],
    totalValue: "$6,666.67",
    lastActivity: "1 day ago",
  },
  {
    id: "wallet4",
    name: "Hardware Wallet",
    type: "Cold Wallet",
    address: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
    balance: [{ currency: "BTC", amount: "0.1", value: "$4,100.00" }],
    totalValue: "$4,100.00",
    lastActivity: "2 weeks ago",
  },
];

export default function WalletsPage() {
  const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Filter wallets based on active tab
  const filteredWallets =
    activeTab === "all"
      ? wallets
      : wallets.filter((wallet) =>
          wallet.type.toLowerCase().includes(activeTab.toLowerCase())
        );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Wallets</h1>
          <p className="text-gray-400">Manage your crypto wallets</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isQRScannerOpen} onOpenChange={setIsQRScannerOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-blue-800 text-blue-400 hover:bg-blue-900/20"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Scan QR
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-blue-950/90 border-blue-900/50">
              <DialogHeader>
                <DialogTitle>Scan QR Code</DialogTitle>
                <DialogDescription>
                  Scan a QR code to connect a wallet or make a payment.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center p-6">
                <div className="relative w-64 h-64 bg-black/50 rounded-lg mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-lg animate-pulse"></div>
                  <QrCode className="h-16 w-16 text-gray-600" />
                </div>
                <p className="text-center text-gray-400">
                  Position the QR code within the frame to scan
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsQRScannerOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddWalletOpen} onOpenChange={setIsAddWalletOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Wallet
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-blue-950/90 border-blue-900/50">
              <DialogHeader>
                <DialogTitle>Add New Wallet</DialogTitle>
                <DialogDescription>
                  Connect an existing wallet or create a new one.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="wallet-name">Wallet Name</Label>
                  <Input
                    id="wallet-name"
                    placeholder="e.g., My Trading Wallet"
                    className="bg-blue-900/20 border-blue-900/30"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wallet-type">Wallet Type</Label>
                  <Tabs defaultValue="hot" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-blue-900/20">
                      <TabsTrigger value="hot">Hot Wallet</TabsTrigger>
                      <TabsTrigger value="cold">Cold Wallet</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wallet-address">Wallet Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="wallet-address"
                      placeholder="Enter wallet address"
                      className="bg-blue-900/20 border-blue-900/30"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-blue-900/30"
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddWalletOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddWalletOpen(false)}>
                  Add Wallet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Wallet Overview */}
      <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Wallet Overview</CardTitle>
              <CardDescription>
                Manage and monitor your connected wallets
              </CardDescription>
            </div>
            <Tabs
              defaultValue="all"
              className="w-full md:w-auto"
              onValueChange={setActiveTab}
            >
              <TabsList className="bg-blue-900/20 w-full md:w-auto">
                <TabsTrigger value="all">All Wallets</TabsTrigger>
                <TabsTrigger value="hot">Hot Wallets</TabsTrigger>
                <TabsTrigger value="cold">Cold Wallets</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWallets.map((wallet) => (
              <Card
                key={wallet.id}
                className="bg-blue-900/10 border-blue-900/30 hover:bg-blue-900/20 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{wallet.name}</CardTitle>
                      <CardDescription>
                        <Badge
                          className={`mt-1 ${
                            wallet.type === "Hot Wallet"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {wallet.type}
                        </Badge>
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-blue-950/90 border-blue-900/50"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-blue-900/30" />
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          <span>Refresh Balance</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Wallet</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>View on Explorer</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-blue-900/30" />
                        <DropdownMenuItem className="text-red-500">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Remove Wallet</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs text-gray-400">Address:</div>
                    <div className="text-xs truncate flex-1">
                      {wallet.address.substring(0, 10)}...
                      {wallet.address.substring(wallet.address.length - 6)}
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-3 mt-4">
                    {wallet.balance.map((coin, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center">
                              {coin.currency === "BTC" && (
                                <svg
                                  className="h-4 w-4 text-orange-500"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M23.638 14.904c-1.602 6.425-8.113 10.342-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.4s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
                                </svg>
                              )}
                              {coin.currency === "ETH" && (
                                <svg
                                  className="h-4 w-4 text-blue-500"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                                </svg>
                              )}
                              {coin.currency === "USDT" && (
                                <svg
                                  className="h-4 w-4 text-green-500"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm0 22.5c-5.785 0-10.5-4.715-10.5-10.5S6.215 1.5 12 1.5 22.5 6.215 22.5 12 17.785 22.5 12 22.5zm0-17.25c-3.728 0-6.75 1.125-6.75 2.526v4.135c0 1.4 3.022 2.525 6.75 2.525s6.75-1.125 6.75-2.525V7.776c0-1.4-3.022-2.526-6.75-2.526zm0 10.5c-3.728 0-6.75-1.125-6.75-2.526V15.9c0 1.4 3.022 2.525 6.75 2.525s6.75-1.125 6.75-2.525v-2.675c0 1.4-3.022 2.525-6.75 2.525zm0-9c3.728 0 6.75 1.125 6.75 2.526 0 1.4-3.022 2.524-6.75 2.524S5.25 10.675 5.25 9.276C5.25 7.875 8.272 6.75 12 6.75z" />
                                </svg>
                              )}
                            </div>
                            <span>
                              {coin.amount} {coin.currency}
                            </span>
                          </div>
                          <span>{coin.value}</span>
                        </div>
                        <Progress
                          value={
                            (Number.parseFloat(
                              coin.value.replace("$", "").replace(",", "")
                            ) /
                              Number.parseFloat(
                                wallet.totalValue
                                  .replace("$", "")
                                  .replace(",", "")
                              )) *
                            100
                          }
                          className={`h-1 bg-blue-950 ${
                            coin.currency === "BTC"
                              ? "indicator-orange-500"
                              : coin.currency === "ETH"
                              ? "indicator-blue-500"
                              : "indicator-green-500"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-blue-900/30 pt-4">
                  <div className="text-sm">
                    <span className="text-gray-400">Total:</span>{" "}
                    <span className="font-bold">{wallet.totalValue}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Last activity: {wallet.lastActivity}
                  </div>
                </CardFooter>
              </Card>
            ))}

            {/* Add Wallet Card */}
            <Card
              className="bg-blue-900/10 border-blue-900/30 border-dashed hover:bg-blue-900/20 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[250px]"
              onClick={() => setIsAddWalletOpen(true)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Add New Wallet</h3>
                <p className="text-gray-400 text-center text-sm">
                  Connect an existing wallet or create a new one
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
