"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingDown,
  Shield,
  Zap,
  Users,
  BarChart3,
  Target,
  Gift,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { SpendLessConnectForm } from "./spendless-connect-form";

interface SpendLessIntegrationProps {
  walletId: string;
  walletName: string;
}

export function SpendLessIntegration({
  walletId,
  walletName,
}: SpendLessIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnectFormOpen, setIsConnectFormOpen] = useState(false);
  const [spendlessDetails, setSpendlessDetails] = useState<any>(null);

  //   const handleConnect = async () => {
  //     setIsConnecting(true);
  //     // Simulate connection process
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     setIsConnected(true);
  //     setIsConnecting(false);
  //   };

  const handleConnect = (spendlessDetails: any) => {
    setSpendlessDetails(spendlessDetails);
    setIsConnected(true);
    setIsConnectFormOpen(false);
  };

  const features = [
    {
      icon: TrendingDown,
      title: "Smart Spending Insights",
      description: "AI-powered analysis of your spending patterns",
      color: "text-blue-400",
    },
    {
      icon: Target,
      title: "Budget Goals",
      description: "Set and track personalized spending targets",
      color: "text-green-400",
    },
    {
      icon: BarChart3,
      title: "Expense Categories",
      description: "Automatic categorization and detailed reports",
      color: "text-purple-400",
    },
    {
      icon: Gift,
      title: "Cashback Rewards",
      description: "Earn rewards on every purchase",
      color: "text-orange-400",
    },
  ];

  const benefits = [
    "Save up to 30% on monthly expenses",
    "Real-time spending alerts",
    "Personalized money-saving tips",
    "Exclusive merchant discounts",
  ];

  if (isConnected) {
    return (
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-800/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  SpendLess Connected
                </h3>
                <p className="text-green-400 text-sm">
                  Your account is now synced with SpendLess
                </p>
              </div>
            </div>
            <Badge className="bg-green-600/20 hover:bg-green-600/50 text-green-400 border-green-600/30">
              Active
            </Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
              <p className="text-2xl font-light text-green-400">
                <span className="font-roboto">₹</span>
                {spendlessDetails.totalEarned}
              </p>
              <p className="text-xs text-neutral-400">Money Earned till now.</p>
            </div>
            <div className="text-center p-3 bg-neutral-800/50 rounded-lg">
              <p className="text-2xl font-light text-blue-400">
                {spendlessDetails.currentPoints}
              </p>
              <p className="text-xs text-neutral-400">Current Points</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 font-normal"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="m6,9c-3.421,0-6,1.505-6,3.5v8c0,1.995,2.579,3.5,6,3.5s6-1.505,6-3.5v-8c0-1.995-2.579-3.5-6-3.5Zm4,7.5c0,.529-1.519,1.5-4,1.5s-4-.971-4-1.5v-1.348c1.046.533,2.435.848,4,.848s2.954-.315,4-.848v1.348Zm-4-5.5c2.481,0,4,.971,4,1.5s-1.519,1.5-4,1.5-4-.971-4-1.5,1.519-1.5,4-1.5Zm0,11c-2.481,0-4-.971-4-1.5v-1.348c1.046.533,2.435.848,4,.848s2.954-.315,4-.848v1.348c0,.529-1.519,1.5-4,1.5ZM24,5v14c0,2.757-2.243,5-5,5h-5c-.553,0-1-.448-1-1s.447-1,1-1h5c1.654,0,3-1.346,3-3V5c0-1.654-1.346-3-3-3h-10c-1.654,0-3,1.346-3,3v1c0,.552-.447,1-1,1s-1-.448-1-1v-1C4,2.243,6.243,0,9,0h10c2.757,0,5,2.243,5,5Zm-11,5c-.553,0-1-.448-1-1s.447-1,1-1h5v-2h-8v.5c0,.552-.447,1-1,1s-1-.448-1-1v-.5c0-1.103.897-2,2-2h8c1.103,0,2,.897,2,2v2c0,1.103-.897,2-2,2h-5Zm1,8c0-.552.447-1,1-1h4c.553,0,1,.448,1,1s-.447,1-1,1h-4c-.553,0-1-.448-1-1Zm0-4v-1c0-.552.447-1,1-1s1,.448,1,1v1c0,.552-.447,1-1,1s-1-.448-1-1Zm6,0c0,.552-.447,1-1,1s-1-.448-1-1v-1c0-.552.447-1,1-1s1,.448,1,1v1Z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-white flex items-center space-x-2">
                  <Link
                    href="https://spend-less.vercel.app"
                    target="_blank"
                    className="flex items-center hover:underline"
                  >
                    <span>SpendLess</span>
                    <ExternalLink className="ml-2 mb-1 h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription className="text-neutral-400">
                  Smart spending management & insights
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-4 bg-neutral-800/50 rounded-lg hover:bg-neutral-800/70 transition-all duration-300 hover:scale-[1.025]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className={`h-6 w-6 ${feature.color} mb-2`} />
                  <h4 className="font-medium text-white text-sm mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">What you'll get:</h4>
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center space-x-3 text-sm animate-in slide-in-from-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-neutral-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-800/30 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
              <Star className="h-4 w-4" />
              <span className="text-lg font-light">4.9</span>
            </div>
            <p className="text-xs text-neutral-400">App Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-blue-400 mb-1">
              <Users className="h-4 w-4" />
              <span className="text-lg font-light">2M+</span>
            </div>
            <p className="text-xs text-neutral-400">Users</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
              <Shield className="h-4 w-4" />
              <span className="text-lg font-light">100%</span>
            </div>
            <p className="text-xs text-neutral-400">Secure</p>
          </div>
        </div> */}

          {/* Connect Button */}
          <Button
            onClick={() => setIsConnectFormOpen(true)}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 hover:scale-[1.02]"
          >
            {isConnecting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Connect you account to SpendLess</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>

          <p className="text-xs text-neutral-400 text-center">
            Free for lifetime.
          </p>
        </CardContent>
      </Card>
      <SpendLessConnectForm
        open={isConnectFormOpen}
        onOpenChange={setIsConnectFormOpen}
        walletId={walletId}
        walletName={walletName}
        onConnect={handleConnect}
      />
    </>
  );
}
