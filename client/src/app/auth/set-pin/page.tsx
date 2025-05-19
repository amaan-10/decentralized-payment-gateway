"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Info,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SetPinPage() {
  // States for PIN entry
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);
  const [step, setStep] = useState<"create" | "confirm" | "success">("create");
  const [error, setError] = useState<string | null>(null);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [pinRequiredForTransactions, setPinRequiredForTransactions] =
    useState(true);
  const [pinRequiredForLogin, setPinRequiredForLogin] = useState(true);

  // Refs for input fields
  const createPinRefs: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
  ];
  const confirmPinRefs: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
  ];
  const API_URL = process.env.NEXT_PUBLIC_DEPAY_API_URL;

  // Check if biometric authentication is available
  useEffect(() => {
    const checkBiometricAvailability = async () => {
      try {
        // This is a simplified check - in a real app, you'd use the Web Authentication API
        if (window.PublicKeyCredential) {
          setBiometricAvailable(true);
        }
      } catch (error) {
        console.error("Error checking biometric availability:", error);
      }
    };

    checkBiometricAvailability();
  }, []);

  // Handle PIN input change
  const handlePinChange = (
    index: number,
    value: string,
    isConfirm: boolean
  ) => {
    setError(null);

    // Only allow digits
    if (value !== "" && !/^\d$/.test(value)) {
      return;
    }

    const currentPin = isConfirm ? [...confirmPin] : [...pin];
    currentPin[index] = value;

    if (isConfirm) {
      setConfirmPin(currentPin);
    } else {
      setPin(currentPin);
    }

    // Auto-focus next input if value is entered
    if (value !== "") {
      const refs = isConfirm ? confirmPinRefs : createPinRefs;
      if (index < 3) {
        refs[index + 1].current?.focus();
      } else {
        // Last digit entered, check if complete
        const fullPin = currentPin.join("");
        if (fullPin.length === 4) {
          if (!isConfirm) {
            // Move to confirm step
            setTimeout(() => {
              setStep("confirm");
              setTimeout(() => {
                confirmPinRefs[0].current?.focus();
              }, 100);
            }, 300);
          } else {
            // Verify PIN match
            setTimeout(() => {
              if (pin.join("") === currentPin.join("")) {
                const sendPinToBackend = async () => {
                  try {
                    const response = await fetch(
                      // "http://localhost:5000/api/auth/set-pin",
                      `${API_URL}/api/auth/set-pin`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                        body: JSON.stringify({ pin: pin.join("") }),
                      }
                    );

                    const result = await response.json();
                    if (response.ok) {
                      setStep("success");
                    } else {
                      setError(result.message || "Failed to save PIN.");
                      handleReset();
                    }
                  } catch (err) {
                    console.error("Failed to send PIN to backend:", err);
                    setError("Network error. Please try again.");
                    handleReset();
                  }
                };

                sendPinToBackend();
              } else {
                setError("PINs don't match. Please try again.");
                setConfirmPin(["", "", "", ""]);
                confirmPinRefs[0].current?.focus();
              }
            }, 300);
          }
        }
      }
    }
  };

  // Handle keydown for navigation between inputs
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    isConfirm: boolean
  ) => {
    const refs = isConfirm ? confirmPinRefs : createPinRefs;

    if (e.key === "Backspace") {
      const currentPin = isConfirm ? [...confirmPin] : [...pin];

      // If current input is empty and not the first one, move to previous input
      if (currentPin[index] === "" && index > 0) {
        refs[index - 1].current?.focus();
      } else {
        // Clear current input
        currentPin[index] = "";
        if (isConfirm) {
          setConfirmPin(currentPin);
        } else {
          setPin(currentPin);
        }
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      refs[index + 1].current?.focus();
    }
  };

  // Reset the process
  const handleReset = () => {
    setPin(["", "", "", ""]);
    setConfirmPin(["", "", "", ""]);
    setStep("create");
    setError(null);
    setTimeout(() => {
      createPinRefs[0].current?.focus();
    }, 100);
  };

  // Focus first input on mount
  useEffect(() => {
    if (step === "create") {
      createPinRefs[0].current?.focus();
    }
  }, []);

  // Render PIN input blocks
  const renderPinInputBlocks = (
    currentPin: string[],
    setCurrentPin: React.Dispatch<React.SetStateAction<string[]>>,
    refs: React.RefObject<HTMLInputElement>[],
    isConfirm: boolean
  ) => {
    return (
      <div className="flex justify-center space-x-4 my-6">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{
              scale: 1,
              opacity: 1,
              borderColor: currentPin[index]
                ? "var(--primary)"
                : "var(--border)",
            }}
            className="relative"
            transition={{ duration: 0.2 }}
          >
            <input
              ref={refs[index]}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={currentPin[index]}
              onChange={(e) =>
                handlePinChange(index, e.target.value, isConfirm)
              }
              onKeyDown={(e) => handleKeyDown(index, e, isConfirm)}
              className="w-14 h-16 text-center text-2xl font-medium bg-background border-2 rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus-visible:outline-none"
              autoComplete="off"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Logo className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl">DePay</span>
          </Link>
        </div>

        <div className="bg-blue-950/10 border-blue-900/50">
          <AnimatePresence mode="wait">
            {step === "create" || step === "confirm" ? (
              <motion.div
                key="pin-setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-blue-950/10 border-blue-900/50">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-center">
                      {step === "create"
                        ? "Create Your PIN"
                        : "Confirm Your PIN"}
                    </CardTitle>
                    <CardDescription className="flex items-center justify-center gap-2">
                      {step === "create"
                        ? "Enter a 4-digit PIN you'll remember"
                        : "Enter the same PIN again to confirm"}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-72">
                              Set a 4-digit PIN to quickly and securely verify
                              your identity for login, transactions, and other
                              sensitive actions.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {step === "create"
                      ? renderPinInputBlocks(pin, setPin, createPinRefs, false)
                      : renderPinInputBlocks(
                          confirmPin,
                          setConfirmPin,
                          confirmPinRefs,
                          true
                        )}

                    {error && (
                      <Alert variant="destructive" className="mb-4 bg-black/25">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="font-bold">Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-blue-900/50 hover:bg-blue-900/5"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>

                    {step === "confirm" && (
                      <Button
                        variant="outline"
                        className="border-blue-900/50 hover:bg-blue-900/20"
                        onClick={() => {
                          setStep("create");
                          setConfirmPin(["", "", "", ""]);
                        }}
                      >
                        Back
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-blue-950/10 border-blue-900/50">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <CardTitle>PIN Successfully Set</CardTitle>
                    <CardDescription>
                      Your 4-digit PIN has been created and is now active
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert className="bg-blue-500/10 border-blue-500/30">
                      <Info className="h-4 w-4 text-blue-500" />
                      <AlertDescription className="text-foreground">
                        You'll need this PIN to confirm sensitive actions and
                        transactions
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">PIN Settings</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pin-transactions">
                            Require PIN for Transactions
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Require PIN verification for all transactions
                          </p>
                        </div>
                        <Switch
                          id="pin-transactions"
                          checked={pinRequiredForTransactions}
                          onCheckedChange={setPinRequiredForTransactions}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pin-login">
                            Require PIN for Login
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Require PIN verification when logging in
                          </p>
                        </div>
                        <Switch
                          id="pin-login"
                          checked={pinRequiredForLogin}
                          onCheckedChange={setPinRequiredForLogin}
                        />
                      </div>

                      {biometricAvailable && (
                        <div>
                          <Separator />
                          <br />

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <Label htmlFor="biometric">
                                  Enable Biometric Authentication
                                </Label>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-80">
                                        Use your device's biometric
                                        authentication (fingerprint, face
                                        recognition) instead of entering your
                                        PIN. This provides a faster and more
                                        secure way to verify your identity.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Use fingerprint or face recognition instead of
                                PIN
                              </p>
                            </div>
                            <Switch
                              id="biometric"
                              checked={biometricEnabled}
                              onCheckedChange={setBiometricEnabled}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-blue-900/50 hover:bg-blue-900/20"
                      onClick={handleReset}
                    >
                      Change PIN
                    </Button>
                    <Button onClick={() => (window.location.href = "/")}>
                      Done
                    </Button>
                  </CardFooter>
                </Card>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    <ShieldCheck className="inline-block mr-1 h-4 w-4" />
                    Your PIN is stored securely and never shared with anyone
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
