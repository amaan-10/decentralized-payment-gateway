"use client";

import { motion } from "framer-motion";
import { CreditCard, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentMethodSelectionProps {
  onSelect: (method: "account" | "qrcode") => void;
}

export function PaymentMethodSelection({
  onSelect,
}: PaymentMethodSelectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Select Payment Method
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Card
            className="border-purple-800/30 bg-gray-900/60 hover:bg-gray-800/60 cursor-pointer transition-colors"
            onClick={() => onSelect("account")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Account Number
              </h3>
              <p className="text-gray-400 text-sm">
                Enter recipient&apos;s account number manually
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Card
            className="border-pink-800/30 bg-gray-900/60 hover:bg-gray-800/60 cursor-pointer transition-colors"
            onClick={() => onSelect("qrcode")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-900/30 flex items-center justify-center mb-4">
                <QrCode className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Scan QR Code
              </h3>
              <p className="text-gray-400 text-sm">
                Scan recipient&apos;s QR code with your camera
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Secure, fast payments powered by DePay</p>
      </div>
    </div>
  );
}
