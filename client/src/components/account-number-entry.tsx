"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccountNumberEntryProps {
  onSubmit: (accountNumber: string, amount: string) => void;
}

export function AccountNumberEntry({ onSubmit }: AccountNumberEntryProps) {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({ accountNumber: "", amount: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = {
      accountNumber:
        accountNumber.trim() === ""
          ? "Account number is required"
          : !/^\d{10,12}$/.test(accountNumber)
          ? "Enter a valid 10-12 digit account number"
          : "",
      amount:
        amount.trim() === ""
          ? "Amount is required"
          : !/^\d+(\.\d{1,2})?$/.test(amount)
          ? "Enter a valid amount"
          : "",
    };

    setErrors(newErrors);

    if (newErrors.accountNumber === "" && newErrors.amount === "") {
      onSubmit(accountNumber, amount);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Enter Payment Details
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountNumber" className="text-gray-300">
              Account Number
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="accountNumber"
                placeholder="Enter 10-12 digit account number"
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            {errors.accountNumber && (
              <p className="text-red-400 text-sm mt-1">
                {errors.accountNumber}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">
              Amount
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="amount"
                placeholder="Enter amount"
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {errors.amount && (
              <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Continue to Verification
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
