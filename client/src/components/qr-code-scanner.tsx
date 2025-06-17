"use client";

import { useState, useEffect, useRef } from "react";
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import { Result } from "@zxing/library";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  QrCode,
  RefreshCw,
  Upload,
  ArrowRight,
  Wallet,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BASE_URL } from "@/lib/url";

interface QrCodeScannerProps {
  onScan: (data: string, note: string) => void;
}

export function QrCodeScanner({ onScan }: QrCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAmountPrompt, setShowAmountPrompt] = useState(false);
  const [scannedAccount, setScannedAccount] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [note, setNote] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ accountNumber?: string }>({});
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAccountFound, setIsAccountFound] = useState(false);
  const [isAccountNotFound, setIsAccountNotFound] = useState(false);
  const [uiLocked, setUiLocked] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [note]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setHasCameraPermission(true);
      return true;
    } catch (err) {
      setHasCameraPermission(false);
      return false;
    }
  };

  const startScanner = async () => {
    setError(null);

    const hasPermission = await checkCameraPermission();
    if (!hasPermission) {
      setError(
        "Camera access is required to scan QR codes. Please enable camera permissions."
      );
      return;
    }

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
      setError("Camera access failed. Please check your permissions.");
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

  const handleScan = async (text: string) => {
    stopScanner();

    setUiLocked(true);
    setIsVerifying(true);
    setIsAccountFound(false);
    setIsAccountNotFound(false);
    setErrors({});
    setLoading(true);

    const [accountNumber, parsedAmount] = text.split("|");

    if (!accountNumber) {
      setErrors({ accountNumber: "Invalid QR code format" });
      setLoading(false);
      setIsVerifying(false);
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/accounts/verify?accountNumber=${accountNumber}`
      );

      if (!res.ok) throw new Error("Failed to verify account");

      const data = await res.json();

      setTimeout(() => {
        setIsVerifying(false);

        if (!data?.exists) {
          setErrors({ accountNumber: "Account not found" });
          setIsAccountNotFound(true);
          setShowAmountPrompt(false);
          setUiLocked(false);
        } else {
          setName(`${data.first_name} ${data.last_name}`);
          setFullName(data.full_name);
          setScannedAccount(accountNumber);
          setAmount(parsedAmount || "");
          setIsAccountFound(true);

          setTimeout(() => {
            setIsAccountFound(false);
            setUiLocked(false);

            if (text.includes("|")) {
              onScan(text, note);
            } else {
              setScannedAccount(text);
              setShowAmountPrompt(true);
            }
          }, 1500);
        }
      }, 1500);
    } catch (err) {
      console.error("Verification error:", err);
      setErrors({ accountNumber: "Error verifying account" });
      setIsVerifying(false);

      setIsAccountNotFound(true);
      setShowAmountPrompt(false);
    }
  };

  const handleAmountSubmit = () => {
    if (scannedAccount && amount) {
      onScan(`${scannedAccount}|${amount}`, note);
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

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Scan QR Code</h2>

      <AnimatePresence>
        {uiLocked && isVerifying && (
          <motion.div
            key="verifying"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2 text-blue-400 mt-10"
          >
            <motion.div
              className="w-6 h-6 rounded-full border-2 border-blue-400 border-t-transparent animate-spin"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p>Verifying account number...</p>
          </motion.div>
        )}

        {uiLocked && isAccountFound && (
          <motion.div
            key="found"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-green-400 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Wallet className="h-6 w-6 mx-auto mb-2" />
            </motion.div>
            Account found
          </motion.div>
        )}

        {uiLocked && isAccountNotFound && (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
              transition={{
                scale: { delay: 0.2, type: "spring", stiffness: 200 },
                rotate: { delay: 0.4, duration: 0.5 },
              }}
            >
              <XCircle className="h-6 w-6 mx-auto mb-2" />
            </motion.div>
            Account not found
          </motion.div>
        )}
      </AnimatePresence>

      {!uiLocked && (
        <>
          {showAmountPrompt ? (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow text-white">
              <div className="flex flex-col justify-center items-center">
                <p className="mb-1">
                  <strong>Paying {name}</strong>{" "}
                </p>
                <p className="mb-2 flex gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-green-700" />{" "}
                  {fullName.toUpperCase()}
                </p>
                <p className="mb-2 text-gray-400 text-sm">
                  Account no. {scannedAccount}
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

              <div className="flex flex-col justify-center items-center">
                <textarea
                  ref={textareaRef}
                  name="note"
                  placeholder="Add note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={1}
                  className="my-2 resize-none overflow-hidden bg-gray-800/50 border border-gray-700 focus:border-purple-500 text-white text-xs text-center px-3 py-2 rounded-md"
                  style={{
                    width: `${Math.min(Math.max(note.length, 3) + 3, 40)}ch`,
                    maxWidth: "300px",
                    minWidth: "100px",
                  }}
                />
              </div>

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
                        animate={{
                          opacity: [0.2, 1, 0.2],
                          scale: [0.85, 1, 0.85],
                        }}
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
                      {hasCameraPermission === false && (
                        <p className="text-sm text-gray-400 mb-3">
                          Please check your browser settings to enable camera
                          access.
                        </p>
                      )}
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

                  <div className="flex flex-col sm:flex-row gap-3 w-[85%]">
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
                  </div>
                </div>
              )}
            </Card>
          )}
        </>
      )}

      <div className="mt-4 text-center text-gray-500 text-sm">
        <p>We only request camera access or image upload to scan the QR code</p>
      </div>
    </div>
  );
}
