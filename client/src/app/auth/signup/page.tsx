"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Github, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
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

        <Card className="bg-blue-950/10 border-blue-900/50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-950/20 border border-blue-900/50 rounded-lg p-1">
                <TabsTrigger
                  value="email"
                  className="rounded-md data-[state=active]:bg-blue-900/40"
                >
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="wallet"
                  className="rounded-md data-[state=active]:bg-blue-900/40"
                >
                  Wallet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        className="bg-blue-950/20 border-blue-900/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        className="bg-blue-950/20 border-blue-900/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-blue-950/20 border-blue-900/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="bg-blue-950/20 border-blue-900/50 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400">
                      Password must be at least 8 characters with 1 uppercase, 1
                      lowercase, and 1 number
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-400 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-400 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-blue-900/50"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-black px-2 text-gray-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="border-blue-900/50 hover:bg-blue-900/20"
                    >
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-900/50 hover:bg-blue-900/20"
                    >
                      <Mail className="mr-2 h-4 w-4" /> Google
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="wallet">
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-900/50 p-6 text-center bg-blue-950/20">
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center">
                        <ArrowRight className="h-8 w-8 text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Connect Your Wallet
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Create an account by connecting your crypto wallet
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Connect Wallet
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-400">
                    <p>
                      By connecting your wallet, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-blue-400 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-400 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-400 hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
