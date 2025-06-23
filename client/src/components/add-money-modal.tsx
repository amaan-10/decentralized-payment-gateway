"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Building2,
  Smartphone,
  Wallet,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  Plus,
} from "lucide-react";

interface AddMoneyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletName: string;
  currentBalance: number;
}

const fundingSources = [
  {
    id: "card",
    name: "Debit/Credit Card",
    icon: CreditCard,
    description: "Instant transfer",
    fee: "Free",
    time: "Instant",
    color: "from-blue-500 to-blue-600",
    popular: true,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building2,
    description: "ACH transfer",
    fee: "Free",
    time: "1-3 days",
    color: "from-emerald-500 to-emerald-600",
    popular: false,
  },
  {
    id: "mobile",
    name: "Mobile Payment",
    icon: Smartphone,
    description: "PhonePe, Google Pay",
    fee: "Free",
    time: "Instant",
    color: "from-purple-500 to-purple-600",
    popular: true,
  },
];

const quickAmounts = [50, 100, 250, 500, 1000];

export function AddMoneyModal({
  open,
  onOpenChange,
  walletName,
  currentBalance,
}: AddMoneyModalProps) {
  const [selectedSource, setSelectedSource] = useState("card");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1); // 1: Select source, 2: Enter amount, 3: Confirm
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedSourceData = fundingSources.find(
    (source) => source.id === selectedSource
  );

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onOpenChange(false);
    setStep(1);
    setAmount("");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <span>Add Money</span>
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Add funds to your wallet account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    i <= step
                      ? "bg-white text-black"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {i < step ? <CheckCircle className="h-4 w-4" /> : i}
                </div>
                {i < 3 && (
                  <div
                    className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                      i < step ? "bg-white" : "bg-neutral-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Funding Source */}
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <h3 className="text-lg font-medium">Choose funding source</h3>
              <div className="space-y-3">
                {fundingSources.map((source) => {
                  const Icon = source.icon;
                  return (
                    <Card
                      key={source.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-[1.025] ${
                        selectedSource === source.id
                          ? "bg-neutral-800 border-white"
                          : "bg-neutral-800/50 border-neutral-700 hover:border-neutral-600"
                      }`}
                      onClick={() => setSelectedSource(source.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-r ${source.color} flex items-center justify-center`}
                            >
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium">{source.name}</p>
                                {source.popular && (
                                  <Badge className="bg-green-600/20 hover:bg-green-600/50 text-green-400 border-green-600/30 text-xs">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-neutral-400">
                                {source.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-neutral-300">{source.fee}</p>
                            <p className="text-neutral-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {source.time}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Enter Amount */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">
                  How much would you like to add?
                </h3>
                <p className="text-neutral-400 text-sm">
                  Current balance: <span className="font-roboto">₹</span>
                  {Math.abs(currentBalance) % 1 === 0
                    ? Math.abs(currentBalance).toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })
                    : Math.abs(currentBalance).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-neutral-400 font-roboto">
                    ₹
                  </span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="pl-8 text-2xl h-16 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 text-center"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {quickAmounts.map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      onClick={() => handleAmountSelect(value)}
                      className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all duration-300 hover:scale-[1.03]"
                    >
                      <span className="font-roboto">₹</span>
                      {value}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedSourceData && (
                <Card className="bg-neutral-800/50 border-neutral-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <selectedSourceData.icon className="h-5 w-5 text-neutral-400" />
                        <span className="text-sm">
                          {selectedSourceData.name}
                        </span>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-neutral-300">
                          Fee: {selectedSourceData.fee}
                        </p>
                        <p className="text-neutral-400">
                          {selectedSourceData.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">
                  Confirm your transaction
                </h3>
                <div className="text-3xl font-light text-green-400 mb-2">
                  +<span className="font-roboto">₹</span>
                  {Math.abs(Number(amount)) % 1 === 0
                    ? Math.abs(Number(amount)).toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })
                    : Math.abs(Number(amount)).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </div>
                <p className="text-neutral-400 text-sm">
                  New balance: <span className="font-roboto">₹</span>
                  {Math.abs(currentBalance + Number(amount)) % 1 === 0
                    ? Math.abs(currentBalance + Number(amount)).toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 0,
                        }
                      )
                    : Math.abs(currentBalance + Number(amount)).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                </p>
              </div>

              <Card className="bg-neutral-800/50 border-neutral-700">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Amount</span>
                    <span>
                      <span className="font-roboto">₹</span>
                      {Math.abs(Number(amount)) % 1 === 0
                        ? Math.abs(Number(amount)).toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                          })
                        : Math.abs(Number(amount)).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Fee</span>
                    <span className="text-green-400">
                      {selectedSourceData?.fee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Processing time</span>
                    <span>{selectedSourceData?.time}</span>
                  </div>
                  <hr className="border-neutral-700" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      <span className="font-roboto">₹</span>
                      {Math.abs(Number(amount)) % 1 === 0
                        ? Math.abs(Number(amount)).toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                          })
                        : Math.abs(Number(amount)).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center space-x-2 text-sm text-neutral-400">
                <Shield className="h-4 w-4" />
                <span>
                  Your transaction is secured with bank-level encryption
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                disabled={isProcessing}
              >
                Back
              </Button>
            )}
            <Button
              onClick={step === 3 ? handleConfirm : handleNext}
              disabled={
                (step === 2 && (!amount || Number(amount) <= 0)) || isProcessing
              }
              className="flex-1 bg-white text-black hover:bg-neutral-100 transition-all duration-300 hover:scale-105"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : step === 3 ? (
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Confirm & Add Money</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
