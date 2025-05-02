"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Smartphone,
  Ratio,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`verification-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`verification-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying2FA(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Ratio className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="font-bold text-2xl">RaqamiX</span>
          </Link>
        </div>

        {!isVerifying2FA ? (
          <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Access your account to manage your crypto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-900/20">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoComplete="email"
                          required
                          className="pl-10 bg-blue-900/10 border-blue-900/30 focus-visible:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          required
                          className="pl-10 pr-10 bg-blue-900/10 border-blue-900/30 focus-visible:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="wallet">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-blue-900/30 p-6 bg-blue-900/10 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center mb-4">
                        <Wallet className="h-8 w-8 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        Connect Your Wallet
                      </h3>
                      <p className="text-gray-400 text-center text-sm mb-4">
                        Sign in securely using your crypto wallet
                      </p>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Connect Wallet
                      </Button>
                    </div>
                    <div className="text-center text-sm text-gray-400">
                      <p>
                        We support MetaMask, WalletConnect, Coinbase Wallet and
                        more
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-900/30"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-blue-950/10 px-2 text-gray-400">or</span>
                </div>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Two-Factor Authentication
              </CardTitle>
              <CardDescription className="text-center">
                Enter the 6-digit code from your authenticator app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex items-center justify-center mb-4">
                  <Smartphone className="h-12 w-12 text-blue-400" />
                </div>
                <div className="flex justify-center gap-2">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`verification-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleVerificationChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg bg-blue-900/10 border-blue-900/30 focus-visible:ring-blue-500"
                    />
                  ))}
                </div>
                <div className="text-center text-sm text-gray-400">
                  <p>
                    Didn&apos;t receive a code?{" "}
                    <button
                      type="button"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Resend
                    </button>
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Verify
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-blue-900/30 text-gray-400 hover:bg-blue-900/20"
                  onClick={() => setIsVerifying2FA(false)}
                >
                  Back to Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
