/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentMethodSelection } from "./payment-method-selection";
import { AccountNumberEntry } from "./account-number-entry";
import { QrCodeScanner } from "./qr-code-scanner";
import { PinEntry } from "./pin-entry";
import { ProcessingPayment } from "./processing-payment";
import { PaymentResult } from "./payment-result";

type PaymentMethod = "account" | "qrcode" | null;
type PaymentStatus = "idle" | "processing" | "success" | "failed";

export function PaymentFlow() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setStep(2);
  };

  const handleDetailsSubmit = (accNumber: string, amt: string) => {
    setAccountNumber(accNumber);
    setAmount(amt);
    setStep(3);
  };

  const handleQrCodeScanned = (data: string) => {
    // In a real app, parse the QR code data to extract account and amount
    const [accNumber, amt] = data.split("|");
    setAccountNumber(accNumber || "QR-1234567890");
    setAmount(amt || "150.00");
    setStep(3);
  };

  const handlePinSubmit = async (enteredPin: string) => {
    setPin(enteredPin);
    setStep(4);
    setPaymentStatus("processing");

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Randomly succeed or fail for demo purposes
    const isSuccess = Math.random() > 0.3;
    setPaymentStatus(isSuccess ? "success" : "failed");
    setStep(5);
  };

  const resetPayment = () => {
    setStep(1);
    setPaymentMethod(null);
    setAccountNumber("");
    setAmount("");
    setPin("");
    setPaymentStatus("idle");
  };

  return (
    <div className="glass rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            DePay
          </h1>
          {step > 1 && step < 5 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentMethodSelection onSelect={handlePaymentMethodSelect} />
            </motion.div>
          )}

          {step === 2 && paymentMethod === "account" && (
            <motion.div
              key="step2-account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AccountNumberEntry onSubmit={handleDetailsSubmit} />
            </motion.div>
          )}

          {step === 2 && paymentMethod === "qrcode" && (
            <motion.div
              key="step2-qrcode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QrCodeScanner onScan={handleQrCodeScanned} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PinEntry
                accountNumber={accountNumber}
                amount={amount}
                onSubmit={handlePinSubmit}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProcessingPayment />
            </motion.div>
          )}

          {step === 5 && paymentStatus !== "idle" && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentResult
                status={paymentStatus as "processing" | "success" | "failed"}
                amount={amount}
                accountNumber={accountNumber}
                onReset={resetPayment}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
