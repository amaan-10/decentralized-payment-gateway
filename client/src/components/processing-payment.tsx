"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ProcessingPayment() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-8 flex flex-col items-center">
      <div className="mb-8 relative">
        <motion.div
          className="w-32 h-32 rounded-full border-4 border-gray-700 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-purple-500 border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {progress}%
          </div>
        </motion.div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">
        Processing Payment
      </h2>
      <p className="text-gray-400 text-center max-w-xs">
        Please wait while we securely process your transaction
      </p>

      <div className="w-full mt-8">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="mt-8 space-y-2 w-full">
        {[
          { text: "Verifying credentials", done: progress >= 30 },
          { text: "Processing transaction", done: progress >= 60 },
          { text: "Confirming with recipient", done: progress >= 90 },
          { text: "Finalizing payment", done: progress >= 100 },
        ].map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            <div
              className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                step.done ? "bg-green-500" : "bg-gray-700"
              }`}
            >
              {step.done && (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              )}
            </div>
            <span
              className={`text-sm ${
                step.done ? "text-white" : "text-gray-500"
              }`}
            >
              {step.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
