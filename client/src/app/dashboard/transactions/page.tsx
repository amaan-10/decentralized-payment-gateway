"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Download, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample transaction data
const transactions = [
  {
    id: "tx1",
    type: "receive",
    amount: "0.25 BTC",
    value: "$10,250.00",
    from: "0x1a2b...3c4d",
    to: "0x5e6f...7g8h (You)",
    date: "Jul 15, 2023, 10:45 AM",
    status: "completed",
    fee: "$2.50",
    confirmations: 56,
  },
  {
    id: "tx2",
    type: "send",
    amount: "1.5 ETH",
    value: "$3,125.00",
    from: "0x9i0j...1k2l (You)",
    to: "0x3m4n...5o6p",
    date: "Jul 14, 2023, 6:30 PM",
    status: "completed",
    fee: "$1.75",
    confirmations: 42,
  },
  {
    id: "tx3",
    type: "receive",
    amount: "500 USDT",
    value: "$500.00",
    from: "0x7q8r...9s0t",
    to: "0x1u2v...3w4x (You)",
    date: "Jul 12, 2023, 3:15 PM",
    status: "completed",
    fee: "$1.00",
    confirmations: 128,
  },
  {
    id: "tx4",
    type: "send",
    amount: "0.1 BTC",
    value: "$4,100.00",
    from: "0x5y6z...7a8b (You)",
    to: "0x9c0d...1e2f",
    date: "Jul 10, 2023, 11:20 AM",
    status: "pending",
    fee: "$2.25",
    confirmations: 2,
  },
  {
    id: "tx5",
    type: "receive",
    amount: "2.5 ETH",
    value: "$5,208.33",
    from: "0x3g4h...5i6j",
    to: "0x7k8l...9m0n (You)",
    date: "Jul 8, 2023, 9:45 AM",
    status: "completed",
    fee: "$1.50",
    confirmations: 86,
  },
  {
    id: "tx6",
    type: "send",
    amount: "750 USDT",
    value: "$750.00",
    from: "0x1o2p...3q4r (You)",
    to: "0x5s6t...7u8v",
    date: "Jul 5, 2023, 2:30 PM",
    status: "failed",
    fee: "$1.00",
    confirmations: 0,
  },
  {
    id: "tx7",
    type: "receive",
    amount: "0.05 BTC",
    value: "$2,050.00",
    from: "0x9w0x...1y2z",
    to: "0x3a4b...5c6d (You)",
    date: "Jul 3, 2023, 5:15 PM",
    status: "completed",
    fee: "$1.75",
    confirmations: 112,
  },
  {
    id: "tx8",
    type: "send",
    amount: "1.0 ETH",
    value: "$2,083.33",
    from: "0x7e8f...9g0h (You)",
    to: "0x1i2j...3k4l",
    date: "Jul 1, 2023, 10:00 AM",
    status: "completed",
    fee: "$1.25",
    confirmations: 156,
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    const matchesType = typeFilter === "all" || tx.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-gray-400">View and manage your transaction history</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-blue-800 text-blue-400 hover:bg-blue-900/20">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>A complete record of your transactions</CardDescription>
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList className="bg-blue-900/20 w-full md:w-auto">
                <TabsTrigger value="all" onClick={() => setTypeFilter("all")}>
                  All
                </TabsTrigger>
                <TabsTrigger value="sent" onClick={() => setTypeFilter("send")}>
                  Sent
                </TabsTrigger>
                <TabsTrigger value="received" onClick={() => setTypeFilter("receive")}>
                  Received
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                className="pl-10 bg-blue-900/10 border-blue-900/30 focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-blue-900/10 border-blue-900/30 focus:ring-blue-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-blue-950/90 border-blue-900/50">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border border-blue-900/30 overflow-hidden">
            <Table>
              <TableHeader className="bg-blue-900/20">
                <TableRow className="hover:bg-blue-900/30 border-blue-900/30">
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">From/To</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-blue-900/20 border-blue-900/30">
                      <TableCell>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === "receive" ? "bg-green-500/20" : "bg-red-500/20"
                          }`}
                        >
                          {tx.type === "receive" ? (
                            <ArrowDown
                              className={`h-4 w-4 ${tx.type === "receive" ? "text-green-500" : "text-red-500"}`}
                            />
                          ) : (
                            <ArrowUp
                              className={`h-4 w-4 ${tx.type === "receive" ? "text-green-500" : "text-red-500"}`}
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{tx.amount}</div>
                        <div className="text-sm text-gray-400">{tx.value}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">
                          {tx.type === "receive" ? (
                            <>
                              <div>From: {tx.from}</div>
                              <div className="text-gray-400">To: {tx.to}</div>
                            </>
                          ) : (
                            <>
                              <div>From: {tx.from}</div>
                              <div className="text-gray-400">To: {tx.to}</div>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{tx.date}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            tx.status === "completed"
                              ? "bg-green-500/20 text-green-500"
                              : tx.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-blue-950/90 border-blue-900/50">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-blue-900/30" />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>View on Explorer</DropdownMenuItem>
                            <DropdownMenuItem>Copy Transaction ID</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-blue-900/30" />
                            <DropdownMenuItem className="text-red-500">Report Issue</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-400">
              Showing {Math.min(filteredTransactions.length, (currentPage - 1) * itemsPerPage + itemsPerPage)} of{" "}
              {filteredTransactions.length} transactions
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-blue-900/30 hover:bg-blue-900/20"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-blue-900/30 hover:bg-blue-900/20"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
