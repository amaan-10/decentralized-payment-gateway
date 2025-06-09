"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CreditCard, DollarSign } from "lucide-react";
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
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [name, setName] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_DEPAY_API_URL;

  const verifyAccount = async () => {
    setErrors({ ...errors, accountNumber: "" });

    if (!/^\d{10,12}$/.test(accountNumber)) {
      setErrors({
        ...errors,
        accountNumber: "Enter a valid 10-12 digit account number",
      });
      return;
    }

    setLoading(true);
    // setIsVerified(true);

    try {
      // const res = await fetch(
      //   `/api/accounts/verify?accountNumber=${accountNumber}`
      // );
      const res = await fetch(
        `http://localhost:5000/api/accounts/verify?accountNumber=${accountNumber}`
        // `${API_URL}/api/accounts/verify?accountNumber=${accountNumber}`
      );
      const data = await res.json();

      setName(data.name);

      if (data.exists) {
        setIsVerified(true);
      } else {
        setErrors({ ...errors, accountNumber: "Account not found" });
      }
    } catch (err) {
      setErrors({ ...errors, accountNumber: "Error verifying account" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountError =
      amount.trim() === ""
        ? "Amount is required"
        : !/^\d+(\.\d{1,2})?$/.test(amount)
        ? "Enter a valid amount"
        : "";

    setErrors({ accountNumber: "", amount: amountError });

    if (!amountError) {
      onSubmit(accountNumber, amount);
    }
  };

  return (
    <div>
      {!isVerified ? (
        <h2 className="text-xl font-semibold text-white mb-6">
          Enter Account Number or Payment ID
        </h2>
      ) : (
        <h2 className="text-xl font-semibold text-white mb-6">
          Enter Amount to Pay
        </h2>
      )}

      <div className="space-y-4">
        {/* Account Number Field */}

        {!isVerified ? (
          <>
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
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                    setIsVerified(false);
                  }}
                />
              </div>
              {errors.accountNumber && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.accountNumber}
                </p>
              )}
            </div>
            <Button
              onClick={verifyAccount}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Account"}
            </Button>
          </>
        ) : (
          <>
            {/* Payment UI shown after account verification */}
            <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow text-white">
              <div className="flex flex-col justify-center items-center">
                <p className="mb-2">
                  <strong>Paying to {name}</strong>{" "}
                </p>
                <p className="mb-2">
                  Account no. <strong>{accountNumber}</strong>
                </p>
              </div>

              <div className="flex gap-1 items-center justify-center">
                <span className="text-xl py-5 font-bold text-center min-h-[3rem] text-gray-800 dark:text-gray-100">
                  ₹
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  className="inline-flex min-w-4 w-10 bg-transparent border-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 text-4xl font-bold min-h-[3rem] text-gray-800 dark:text-gray-100"
                  placeholder="0"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.style.width = `${Math.min(
                      target.value.length || 1,
                      7
                    )}ch`;
                  }}
                  value={amount ? Number(amount).toLocaleString("en-IN") : ""}
                  onChange={(e) => {
                    let input = e.target.value.replace(/,/g, "");
                    let numericValue = parseInt(input || "0");

                    if (isNaN(numericValue)) return;

                    if (numericValue > 500000) {
                      setAmountError("Amount cannot exceed ₹5,00,000");
                    } else {
                      setAmountError("");
                      setAmount(numericValue.toString());
                    }
                  }}
                />
              </div>
              {amountError && (
                <p className="text-red-400 text-md mt-1 text-center font-sans">
                  {amountError}
                </p>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (
                      amount === "" ||
                      amount === "0" ||
                      parseInt(amount) > 500000
                    ) {
                      setAmountError("Amount cannot be less than ₹1");
                      return;
                    }
                    onSubmit(accountNumber, amount);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-3"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
