/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentMethodSelection } from "./payment-method-selection";
import { AccountNumberEntry } from "./account-number-entry";
import { QrCodeScanner } from "./qr-code-scanner";
import { PinEntry } from "./pin-entry";
import { ProcessingPayment } from "./processing-payment";
import { PaymentResult } from "./payment-result";
import Cookies from "js-cookie";
import { BASE_URL } from "@/lib/url";
import { useSearchParams } from "next/navigation";

type PaymentMethod = "account" | "qrcode" | null;
type PaymentStatus = "idle" | "processing" | "success" | "failed";

export function PaymentFlow() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [txnID, setTxnID] = useState<string | null>(null);
  const [txnTime, setTxnTime] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const acc = searchParams.get("acc");
    const amt = searchParams.get("amt");
    const note = searchParams.get("note");
    const scanqr = searchParams.get("scan-qr");
    const manual = searchParams.get("manual");

    if (scanqr) {
      setPaymentMethod("qrcode");
      setStep(2);
      return;
    }

    if (manual) {
      setPaymentMethod("account");
      setStep(2);
      return;
    }

    if (acc && amt) {
      setAccountNumber(acc);
      setAmount(amt);
      if (note) setNote(note);
      setPaymentMethod("account");
      setStep(3);
    }
  }, [searchParams]);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setStep(2);
  };

  const handleDetailsSubmit = (
    accNumber: string,
    name: string,
    amt: string,
    note: string
  ) => {
    setAccountNumber(accNumber);
    setName(name);
    setAmount(amt);
    setNote(note);
    setStep(3);
  };

  const handleQrCodeScanned = (
    acc: string,
    name: string,
    amt: string,
    note: string
  ) => {
    setAccountNumber(acc);
    setName(name);
    setAmount(amt);
    setNote(note);
    setStep(3);
  };

  const handlePinSubmit = async (enteredPin: string) => {
    setPin(enteredPin);
    setStep(4);
    setPaymentStatus("processing");

    try {
      const res = await fetch(`${BASE_URL}/api/blockchain/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
        body: JSON.stringify({
          receiver_account: accountNumber,
          amount: Number(amount),
          note: note,
          pin: enteredPin.toString(),
        }),
      });

      const data = await res.json();
      setTxnID(data.txn_id);
      setTxnTime(data.time);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (res.ok) {
        setPaymentStatus("success");
        setStep(5);
        const callback = new URLSearchParams(window.location.search).get(
          "callback"
        );

        const returnURL = `${callback}?amount=${amount}&notes=${note}&name=${name}&accountNumber=${accountNumber}`;
        window.location.href = returnURL;
        return;
      } else {
        setPaymentStatus("failed");
        setStep(5);
      }
    } catch (err) {
      alert("Network error. Please try again.");
      setPaymentStatus("failed");
      setStep(5);
      console.error(err);
    }
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
                name={name}
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
                transactionId={txnID ?? ""}
                time={txnTime ? new Date(txnTime) : new Date()}
                onReset={resetPayment}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
