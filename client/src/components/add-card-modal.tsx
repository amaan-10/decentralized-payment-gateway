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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddCardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCard: (card: any) => void
}

export function AddCardModal({ open, onOpenChange, onAddCard }: AddCardModalProps) {
  const [cardType, setCardType] = useState<"physical" | "virtual">("physical")
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardNetwork, setCardNetwork] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new card object
    const newCard = {
      id: Date.now(), // Generate a unique ID
      name: cardName,
      number: cardNumber,
      expiryDate: `${expiryMonth}/${expiryYear.slice(-2)}`,
      type: cardNetwork,
      color: getRandomCardColor(),
      balance: 0,
      isActive: true,
      isVirtual: cardType === "virtual",
      isFreezed: false,
    }

    onAddCard(newCard)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setCardType("physical")
    setCardName("")
    setCardNumber("")
    setExpiryMonth("")
    setExpiryYear("")
    setCvv("")
    setCardNetwork("")
  }

  const getRandomCardColor = () => {
    const colors = [
      "from-slate-700 to-slate-900",
      "from-indigo-700 to-indigo-900",
      "from-emerald-700 to-emerald-900",
      "from-violet-700 to-violet-900",
      "from-rose-700 to-rose-900",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Format with spaces every 4 digits
    let formatted = ""
    for (let i = 0; i < digits.length; i += 4) {
      formatted += digits.slice(i, i + 4) + " "
    }

    return formatted.trim()
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
          <DialogDescription>Enter your card details to add a new payment method.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-type">Card Type</Label>
              <RadioGroup
                id="card-type"
                value={cardType}
                onValueChange={(value: "physical" | "virtual") => setCardType(value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="physical" id="physical" />
                  <Label htmlFor="physical">Physical Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="virtual" id="virtual" />
                  <Label htmlFor="virtual">Virtual Card</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-name">Card Name</Label>
              <Input
                id="card-name"
                placeholder="e.g. Shopping Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-network">Card Network</Label>
              <Select value={cardNetwork} onValueChange={setCardNetwork} required>
                <SelectTrigger id="card-network">
                  <SelectValue placeholder="Select card network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visa">Visa</SelectItem>
                  <SelectItem value="Mastercard">Mastercard</SelectItem>
                  <SelectItem value="American Express">American Express</SelectItem>
                  <SelectItem value="Discover">Discover</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19} // 16 digits + 3 spaces
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <div className="flex gap-2">
                  <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
                    <SelectTrigger id="expiry-month" className="w-full">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0")
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <Select value={expiryYear} onValueChange={setExpiryYear} required>
                    <SelectTrigger id="expiry-year" className="w-full">
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = (new Date().getFullYear() + i).toString()
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Add Card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
