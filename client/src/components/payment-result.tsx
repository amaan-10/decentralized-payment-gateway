"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";

interface PaymentResultProps {
  status: "processing" | "success" | "failed";
  amount: string;
  accountNumber: string;
  transactionId: string;
  time: Date;
  onReset: () => void;
}

export function PaymentResult({
  status,
  amount,
  accountNumber,
  transactionId,
  time,
  onReset,
}: PaymentResultProps) {
  // Launch confetti on successful payment
  useEffect(() => {
    if (status === "success") {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [status]);

  // // Format transaction ID
  // const transactionId =
  //   "TXN" + Math.random().toString(36).substring(2, 10).toUpperCase();

  // Format date
  const date = time.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="py-4">
      <div className="flex flex-col items-center mb-6">
        {status === "success" ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            <div className="w-24 h-24 rounded-full bg-green-900/30 flex items-center justify-center mb-4">
              <CheckCircle className="h-14 w-14 text-green-500" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            <div className="w-24 h-24 rounded-full bg-red-900/30 flex items-center justify-center mb-4">
              <XCircle className="h-14 w-14 text-red-500" />
            </div>
          </motion.div>
        )}

        <h2 className="text-2xl font-bold text-white mb-2">
          {status === "success" ? "Payment Successful" : "Payment Failed"}
        </h2>

        <p className="text-gray-400 text-center max-w-xs mb-6">
          {status === "success"
            ? "Your payment has been processed successfully."
            : "We couldn't process your payment. Please try again."}
        </p>

        {status === "success" && (
          <motion.div
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-2xl py-5 font-bold text-center min-h-[3rem] text-gray-800 dark:text-gray-100">
              ₹
            </span>
            {Number(amount).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </motion.div>
        )}
      </div>

      {status === "success" && (
        <Card className="border-gray-700 bg-gray-800/50 mb-6">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Transaction ID</span>
                <span className="text-white font-medium">{transactionId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Date & Time</span>
                <span className="text-white font-medium">{date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Account</span>
                <span className="text-white font-medium">
                  {accountNumber.replace(
                    /^(\d{2})(\d+)(\d{2})$/,
                    (_, start, middle, end) => {
                      return `${start}${"*".repeat(middle.length)}${end}`;
                    }
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {status === "success" ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Receipt
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={onReset}
            >
              New Payment
            </Button>
          </>
        ) : (
          <>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center gap-2"
              onClick={onReset}
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-700"
              onClick={onReset}
            >
              Change Payment Method
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
