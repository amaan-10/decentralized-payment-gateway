"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, CreditCard, IndianRupee, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Cookies from "js-cookie";
import { BASE_URL } from "@/lib/url";

interface PinEntryProps {
  accountNumber: string;
  amount: string;
  name: string;
  onSubmit: (pin: string) => void;
}

export function PinEntry({
  accountNumber,
  name,
  amount,
  onSubmit,
}: PinEntryProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [shake, setShake] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullPin = pin.join("");
    if (fullPin.length !== 4) {
      setError("Please enter a 4-digit PIN");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify-pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
        body: JSON.stringify({
          pin: fullPin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "PIN verification failed");
        setShake(true); // Trigger shake animation
        setTimeout(() => setShake(false), 500); // Reset shake state
        return;
      }

      // If successful, call parent callback
      onSubmit(fullPin);
    } catch (err) {
      alert("Network error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Enter PIN</h2>

      <Card className="border-gray-700 bg-gray-800/50 mb-6">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <p className="mb-2 text-center flex gap-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4 text-green-700" />{" "}
                {name.toUpperCase()}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Account Number</span>
              <span className="text-white font-medium flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                {accountNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Amount</span>
              <span className="text-white font-medium flex items-center">
                <IndianRupee className="h-4 w-4 mr-[5px] mb-[2px] text-gray-500" />
                {Number(amount).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
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
                animate={{
                  opacity: 1,
                  y: 0,
                  x: shake ? [0, -5, 5, -5, 5, 0] : 0,
                }}
                transition={{ duration: 0.4 }}
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
                  className={`w-12 h-14 text-center text-xl font-bold bg-gray-900 border-2 ${
                    error ? "border-red-500" : "border-gray-700"
                  } focus:border-purple-500 rounded-lg text-white outline-none`}
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
