"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Calendar, Download, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock transaction data
const transactions = [
  {
    id: 1,
    description: "Coffee Shop",
    amount: -4.5,
    type: "expense",
    category: "Food & Drink",
    date: "2023-05-21",
    time: "09:15 AM",
    status: "completed",
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: 2850.0,
    type: "income",
    category: "Salary",
    date: "2023-05-20",
    time: "05:30 PM",
    status: "completed",
  },
  {
    id: 3,
    description: "Grocery Store",
    amount: -65.38,
    type: "expense",
    category: "Groceries",
    date: "2023-05-20",
    time: "02:45 PM",
    status: "completed",
  },
  {
    id: 4,
    description: "Freelance Payment",
    amount: 350.0,
    type: "income",
    category: "Freelance",
    date: "2023-05-19",
    time: "11:20 AM",
    status: "completed",
  },
  {
    id: 5,
    description: "Electric Bill",
    amount: -85.2,
    type: "expense",
    category: "Utilities",
    date: "2023-05-18",
    time: "10:15 AM",
    status: "completed",
  },
  {
    id: 6,
    description: "Online Shopping",
    amount: -129.99,
    type: "expense",
    category: "Shopping",
    date: "2023-05-17",
    time: "03:30 PM",
    status: "completed",
  },
  {
    id: 7,
    description: "Dividend Payment",
    amount: 75.5,
    type: "income",
    category: "Investment",
    date: "2023-05-16",
    time: "09:00 AM",
    status: "completed",
  },
  {
    id: 8,
    description: "Restaurant Dinner",
    amount: -89.75,
    type: "expense",
    category: "Food & Drink",
    date: "2023-05-15",
    time: "08:45 PM",
    status: "completed",
  },
  {
    id: 9,
    description: "Mobile Phone Bill",
    amount: -45.0,
    type: "expense",
    category: "Utilities",
    date: "2023-05-14",
    time: "11:30 AM",
    status: "completed",
  },
  {
    id: 10,
    description: "Client Payment",
    amount: 1200.0,
    type: "income",
    category: "Freelance",
    date: "2023-05-13",
    time: "04:15 PM",
    status: "completed",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  // Filter transactions based on search term, type, and date range
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    // Date filtering would be implemented here

    return matchesSearch && matchesType
  })

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const netBalance = totalIncome - totalExpenses

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history</p>
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
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${netBalance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all your past transactions</CardDescription>
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
                    <SelectItem value="income">Income Only</SelectItem>
                    <SelectItem value="expense">Expenses Only</SelectItem>
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
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expense">Expenses</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                            No transactions found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`rounded-full p-1.5 ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                                >
                                  {transaction.type === "income" ? (
                                    <ArrowDown className="h-3 w-3 text-green-600" />
                                  ) : (
                                    <ArrowUp className="h-3 w-3 text-red-600" />
                                  )}
                                </div>
                                {transaction.description}
                              </div>
                            </TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{transaction.date}</span>
                                <span className="text-xs text-muted-foreground">{transaction.time}</span>
                              </div>
                            </TableCell>
                            <TableCell
                              className={`text-right font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                            >
                              {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="income" className="mt-4">
                {/* Income transactions table - similar structure */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions
                        .filter((t) => t.type === "income")
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full p-1.5 bg-green-100">
                                  <ArrowDown className="h-3 w-3 text-green-600" />
                                </div>
                                {transaction.description}
                              </div>
                            </TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{transaction.date}</span>
                                <span className="text-xs text-muted-foreground">{transaction.time}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium text-green-600">
                              +${transaction.amount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="expense" className="mt-4">
                {/* Expense transactions table - similar structure */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions
                        .filter((t) => t.type === "expense")
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="rounded-full p-1.5 bg-red-100">
                                  <ArrowUp className="h-3 w-3 text-red-600" />
                                </div>
                                {transaction.description}
                              </div>
                            </TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{transaction.date}</span>
                                <span className="text-xs text-muted-foreground">{transaction.time}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium text-red-600">
                              -${Math.abs(transaction.amount).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-4">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">No pending transactions</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
