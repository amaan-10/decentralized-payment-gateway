"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddWallet: (wallet: any) => void
}

export function AddWalletModal({ open, onOpenChange, onAddWallet }: AddWalletModalProps) {
  const [walletName, setWalletName] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [initialBalance, setInitialBalance] = useState("")
  const [monthlyLimit, setMonthlyLimit] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new wallet object
    const newWallet = {
      id: Date.now(), // Generate a unique ID
      name: walletName,
      balance: Number.parseFloat(initialBalance) || 0,
      currency: currency,
      monthlyLimit: Number.parseFloat(monthlyLimit) || 1000,
      spent: 0,
      cardNumber: generateRandomCardNumber(),
      expiryDate: generateRandomExpiryDate(),
    }

    onAddWallet(newWallet)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setWalletName("")
    setCurrency("USD")
    setInitialBalance("")
    setMonthlyLimit("")
  }

  const generateRandomCardNumber = () => {
    return `•••• •••• •••• ${Math.floor(1000 + Math.random() * 9000)}`
  }

  const generateRandomExpiryDate = () => {
    const month = Math.floor(1 + Math.random() * 12)
      .toString()
      .padStart(2, "0")
    const year = (new Date().getFullYear() + 3 + Math.floor(Math.random() * 3)).toString().slice(-2)
    return `${month}/${year}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Wallet</DialogTitle>
          <DialogDescription>Create a new wallet to manage your funds.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="wallet-name">Wallet Name</Label>
              <Input
                id="wallet-name"
                placeholder="e.g. Travel Savings"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initial-balance">Initial Balance</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <Input
                  id="initial-balance"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={initialBalance}
                  onChange={(e) => setInitialBalance(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-limit">Monthly Spending Limit</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <Input
                  id="monthly-limit"
                  type="number"
                  placeholder="1000.00"
                  className="pl-8"
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Create Wallet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
