"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, CreditCard, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PinEntryProps {
  accountNumber: string;
  amount: string;
  onSubmit: (pin: string) => void;
}

export function PinEntry({ accountNumber, amount, onSubmit }: PinEntryProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(0, 1);
    setPin(newPin);
    setError(null);

    // Auto-focus next input
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!pin[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullPin = pin.join("");
    if (fullPin.length !== 4) {
      setError("Please enter a 4-digit PIN");
      return;
    }

    onSubmit(fullPin);
  };

  // Mask account number for display
  const maskedAccount = accountNumber.replace(
    /^(\d{2})(\d+)(\d{2})$/,
    (_, start, middle, end) => {
      return `${start}${"*".repeat(middle.length)}${end}`;
    }
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Enter PIN</h2>

      <Card className="border-gray-700 bg-gray-800/50 mb-6">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Account</span>
              <span className="text-white font-medium flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                {maskedAccount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Amount</span>
              <span className="text-white font-medium flex items-center">
                <IndianRupee className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-xs text-center text-gray-800 dark:text-gray-100">
                  ₹
                </span>
                {Number.parseFloat(amount).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <p className="text-gray-300 text-center mb-4">
            Enter your 4-digit secure PIN to authorize this payment
          </p>

          <div className="flex justify-center gap-3">
            {pin.map((digit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold bg-gray-900 border-2 border-gray-700 focus:border-purple-500 rounded-lg text-white outline-none"
                />
              </motion.div>
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          disabled={pin.some((digit) => !digit)}
        >
          Confirm Payment
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center">
        <Lock className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-gray-500 text-sm">
          Secured with end-to-end encryption
        </span>
      </div>
    </div>
  );
}
