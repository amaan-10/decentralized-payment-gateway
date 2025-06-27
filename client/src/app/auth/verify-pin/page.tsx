"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, ShieldCheck } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BASE_URL } from "@/lib/url";

export default function VerifyPinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
    useRef<HTMLInputElement>(null!),
  ];

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(null);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (newPin.every((digit) => digit !== "")) {
      verifyPin(newPin.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && pin[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const verifyPin = async (pinCode: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/verify-pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ pin: pinCode }),
      });

      const result = await response.json();

      if (response.ok) {
        document.cookie = "pinVerified=true; path=/; max-age=3600";
        router.replace(redirectTo);
      } else {
        setError(result.message || "Invalid PIN");
        setShake(true);
        if (navigator.vibrate) navigator.vibrate(300);

        setTimeout(() => {
          setShake(false);
          setPin(["", "", "", ""]);
          inputRefs[0].current?.focus();
        }, 500);

        setPin(["", "", "", ""]);
        inputRefs[0].current?.focus();
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

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

        <Card className="bg-blue-950/10 border-blue-900/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Enter Your PIN</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              Verify to access your account
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-72">
                      Your 4-digit PIN is required to verify your identity for
                      secure access.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <motion.div
              className="flex justify-center space-x-4 my-6"
              animate={shake ? { x: [-10, 10, -8, 8, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    ref={inputRefs[index]}
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={pin[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-16 text-center text-2xl font-medium bg-background border-2 rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus-visible:outline-none"
                    autoComplete="off"
                  />
                </motion.div>
              ))}
            </motion.div>

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
              onClick={() => {
                setPin(["", "", "", ""]);
                setError(null);
                inputRefs[0].current?.focus();
              }}
            >
              Reset
            </Button>
            <Button onClick={() => verifyPin(pin.join(""))}>Submit</Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            <ShieldCheck className="inline-block mr-1 h-4 w-4" />
            Your PIN is securely validated and never shared
          </p>
        </div>
      </motion.div>
    </div>
  );
}
