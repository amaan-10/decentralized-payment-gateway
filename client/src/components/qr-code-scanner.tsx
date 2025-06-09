"use client";

import { useState, useEffect, useRef } from "react";
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import { Result } from "@zxing/library";
import { motion } from "framer-motion";
import { Camera, QrCode, RefreshCw, Upload, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QrCodeScannerProps {
  onScan: (data: string) => void;
}

export function QrCodeScanner({ onScan }: QrCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAmountPrompt, setShowAmountPrompt] = useState(false);
  const [scannedAccount, setScannedAccount] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);

  const startScanner = async () => {
    setError(null);
    setIsScanning(true);

    try {
      codeReaderRef.current = new BrowserQRCodeReader();
      const devices = await BrowserQRCodeReader.listVideoInputDevices();
      const deviceId =
        devices.find((d) => d.label.toLowerCase().includes("back"))?.deviceId ||
        devices[0]?.deviceId;

      if (!deviceId) throw new Error("No camera found");

      scannerControlsRef.current =
        await codeReaderRef.current.decodeFromVideoDevice(
          deviceId,
          videoRef.current!,
          (result) => {
            if (result) handleScan(result.getText());
          }
        );
    } catch (err) {
      console.error(err);
      setError("Camera access failed.");
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerControlsRef.current) {
      scannerControlsRef.current.stop();
      scannerControlsRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScan = (text: string) => {
    stopScanner();
    if (text.includes("|")) {
      onScan(text);
    } else {
      setScannedAccount(text);
      setShowAmountPrompt(true);
    }
  };

  const handleAmountSubmit = () => {
    if (scannedAccount && amount) {
      onScan(`${scannedAccount}|${amount}`);
      setShowAmountPrompt(false);
      setScannedAccount(null);
      setAmount("");
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageElement = document.createElement("img");
      imageElement.src = URL.createObjectURL(file);
      await imageElement.decode();

      const result: Result = await new BrowserQRCodeReader().decodeFromImageUrl(
        imageElement.src
      );
      handleScan(result.getText());
    } catch (err) {
      console.error(err);
      setError("QR scan from image failed.");
    }
  };

  const handleDemoQr = () => {
    const mockQrData = "1234567890|150.00";
    handleScan(mockQrData);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Scan QR Code</h2>

      {showAmountPrompt ? (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow text-white">
          <div className="flex flex-col justify-center items-center">
            <p className="mb-2">
              <strong>Paying to (name) {}</strong>
            </p>
            <p className="mb-2">
              Account no. <strong>{scannedAccount}</strong>
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
                handleAmountSubmit();
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-3"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden border-gray-700 bg-gray-800/50">
          {isScanning ? (
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-purple-500 relative">
                  <motion.div
                    className="absolute inset-0 border-2 border-purple-400"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.85, 1, 0.85] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />

                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400" />
                </div>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-900/80 border-gray-700 text-white"
                  onClick={stopScanner}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                <QrCode className="h-8 w-8 text-gray-400" />
              </div>

              {error ? (
                <div className="text-center mb-4">
                  <p className="text-red-400 mb-2">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startScanner}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              ) : (
                <p className="text-gray-400 text-center mb-4">
                  Position the QR code within the frame to scan
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
                  onClick={startScanner}
                >
                  <Camera className="h-4 w-4" />
                  Start Camera
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                  asChild
                >
                  <label className="cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <span>Upload QR</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700"
                  onClick={handleDemoQr}
                >
                  Use Demo QR
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      <div className="mt-4 text-center text-gray-500 text-sm">
        <p>We only request camera access or image upload to scan the QR code</p>
      </div>
    </div>
  );
}
