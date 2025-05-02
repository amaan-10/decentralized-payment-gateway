"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Trophy,
  Star,
  Clock,
  TrendingUp,
  Gift,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample rewards data
const challenges = [
  {
    id: "challenge1",
    title: "First-Time Trader",
    description: "Complete your first trade on our platform",
    reward: "50 CryptoPoints",
    progress: 100,
    completed: true,
    icon: TrendingUp,
  },
  {
    id: "challenge2",
    title: "Wallet Diversifier",
    description: "Connect at least 3 different wallets to your account",
    reward: "100 CryptoPoints",
    progress: 66,
    completed: false,
    icon: Trophy,
  },
  {
    id: "challenge3",
    title: "Transaction Master",
    description: "Complete 10 transactions in a single month",
    reward: "200 CryptoPoints",
    progress: 40,
    completed: false,
    icon: Star,
  },
  {
    id: "challenge4",
    title: "Savings Champion",
    description: "Save $1,000 worth of crypto in your savings wallet",
    reward: "150 CryptoPoints",
    progress: 75,
    completed: false,
    icon: Trophy,
  },
];

const streaks = [
  {
    id: "streak1",
    title: "Daily Login",
    description: "Log in to the platform every day",
    currentStreak: 5,
    longestStreak: 12,
    reward: "10 CryptoPoints per day",
    nextMilestone: 7,
    icon: Clock,
  },
  {
    id: "streak2",
    title: "Weekly Trader",
    description: "Complete at least one trade every week",
    currentStreak: 3,
    longestStreak: 8,
    reward: "50 CryptoPoints per week",
    nextMilestone: 4,
    icon: TrendingUp,
  },
];

const leaderboard = [
  {
    rank: 1,
    user: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      handle: "@alexthompson",
    },
    points: 12450,
    change: "up",
  },
  {
    rank: 2,
    user: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      handle: "@sarahchen",
    },
    points: 10820,
    change: "up",
  },
  {
    rank: 3,
    user: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      handle: "@mrodriguez",
    },
    points: 9675,
    change: "down",
  },
  {
    rank: 4,
    user: {
      name: "Jessica Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      handle: "@jessicakim",
    },
    points: 8540,
    change: "same",
  },
  {
    rank: 5,
    user: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      handle: "@davidwilson",
    },
    points: 7320,
    change: "up",
  },
  {
    rank: 15,
    user: {
      name: "John Doe (You)",
      avatar: "/placeholder.svg?height=40&width=40",
      handle: "@johndoe",
    },
    points: 3250,
    change: "up",
    isCurrentUser: true,
  },
];

const rewards = [
  {
    id: "reward1",
    title: "Premium Membership",
    description: "Get 1 month of premium membership for free",
    cost: "1,000 CryptoPoints",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "reward2",
    title: "Transaction Fee Discount",
    description: "50% off on transaction fees for 1 week",
    cost: "500 CryptoPoints",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "reward3",
    title: "Limited Edition NFT",
    description: "Exclusive NFT only available to reward members",
    cost: "2,500 CryptoPoints",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "reward4",
    title: "$10 in Bitcoin",
    description: "Get $10 worth of Bitcoin added to your wallet",
    cost: "1,500 CryptoPoints",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function RewardsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("challenges");
  const userPoints = 750;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Rewards & Challenges</h1>
          <p className="text-gray-400">Complete challenges and earn rewards</p>
        </div>
        <div className="flex items-center gap-3 bg-blue-900/20 px-4 py-2 rounded-lg">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-bold">{userPoints} CryptoPoints</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs
        defaultValue="challenges"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="bg-blue-900/20 w-full grid grid-cols-4">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Redeem</TabsTrigger>
        </TabsList>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className={`bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors ${
                  challenge.completed ? "border-green-500/50" : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          challenge.completed
                            ? "bg-green-500/20"
                            : "bg-blue-900/30"
                        }`}
                      >
                        <challenge.icon
                          className={`h-5 w-5 ${
                            challenge.completed
                              ? "text-green-500"
                              : "text-blue-400"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {challenge.title}
                          {challenge.completed && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </CardTitle>
                        <CardDescription>
                          {challenge.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        challenge.completed
                          ? "bg-green-500/20 text-green-500"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {challenge.reward}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress
                      value={challenge.progress}
                      className={`h-2 ${
                        challenge.completed ? "bg-green-500" : "bg-blue-500"
                      }`}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      challenge.completed
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    }`}
                    disabled={challenge.completed}
                  >
                    {challenge.completed ? "Completed" : "View Details"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Streaks Tab */}
        <TabsContent value="streaks" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {streaks.map((streak) => (
              <Card
                key={streak.id}
                className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                        <streak.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {streak.title}
                        </CardTitle>
                        <CardDescription>{streak.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      {streak.reward}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm text-gray-400">
                          Current Streak
                        </div>
                        <div className="text-2xl font-bold">
                          {streak.currentStreak} days
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">
                          Longest Streak
                        </div>
                        <div className="text-2xl font-bold">
                          {streak.longestStreak} days
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Next milestone: {streak.nextMilestone} days
                        </span>
                        <span>
                          {Math.round(
                            (streak.currentStreak / streak.nextMilestone) * 100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (streak.currentStreak / streak.nextMilestone) * 100
                        }
                        className="h-2 bg-blue-950"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Continue Streak
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="mt-6">
          <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>
                See how you rank against other users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.isCurrentUser
                        ? "bg-blue-900/30 border border-blue-500/50"
                        : "bg-blue-900/10 hover:bg-blue-900/20"
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          entry.rank <= 3
                            ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black"
                            : "bg-blue-900/30 text-white"
                        }`}
                      >
                        {entry.rank}
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-blue-900/50">
                        <AvatarImage
                          src={entry.user.avatar || "/placeholder.svg"}
                          alt={entry.user.name}
                        />
                        <AvatarFallback>
                          {entry.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{entry.user.name}</div>
                        <div className="text-sm text-gray-400">
                          {entry.user.handle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold">
                          {entry.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">points</div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          entry.change === "up"
                            ? "bg-green-500/20 text-green-500"
                            : entry.change === "down"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {entry.change === "up" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                        ) : entry.change === "down" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="M8 12h8" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-blue-800 text-blue-400 hover:bg-blue-900/20"
              >
                View Full Leaderboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="mt-6">
          <div className="mb-6">
            <Card className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Your Balance</h3>
                      <p className="text-2xl font-bold">
                        {userPoints} CryptoPoints
                      </p>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Gift className="mr-2 h-4 w-4" />
                    Earn More Points
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <Card
                key={reward.id}
                className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors"
              >
                <CardHeader className="pb-2 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-900/20 flex items-center justify-center overflow-hidden">
                    <Image
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.title}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className="bg-blue-500/20 text-blue-400 mx-auto">
                    {reward.cost}
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={
                      Number.parseInt(reward.cost.replace(/[^0-9]/g, "")) >
                      userPoints
                    }
                  >
                    {Number.parseInt(reward.cost.replace(/[^0-9]/g, "")) >
                    userPoints
                      ? "Not Enough Points"
                      : "Redeem Reward"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
