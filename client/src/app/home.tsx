"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Wallet,
  LayoutDashboard,
  Settings,
  Bitcoin,
  EclipseIcon as Ethereum,
  BitcoinIcon as Litecoin,
  Zap,
  Lock,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between gap-px">
            <div className="space-y-8">
              <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm">
                Next Generation Payments
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Fast. Secure. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Borderless <br /> Payments.
                </span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-lg">
                Experience the future of financial transactions with our
                decentralized platform. No intermediaries, no borders, just
                seamless transfers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-800 text-gray-300 hover:bg-blue-900/20"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 wallet-animation">
                <div className="relative w-full h-[400px]">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Crypto Wallet Illustration"
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            </div>
          </div>

          <div className="flex justify-center mt-20">
            <Link
              href="#how-it-works"
              className="flex flex-col items-center text-gray-400 hover:text-white transition-colors animate-bounce"
            >
              <span className="text-sm mb-2">Discover More</span>
              <ChevronDown className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-24 bg-gradient-to-b from-black to-blue-950/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform simplifies crypto payments with a seamless three-step
              process that anyone can follow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Connect Your Wallet",
                description:
                  "Link your existing crypto wallet or create a new one through our secure platform.",
                icon: Wallet,
                gradient: "from-blue-600 to-blue-400",
              },
              {
                title: "Select Currency",
                description:
                  "Choose from dozens of supported cryptocurrencies for your transaction.",
                icon: Bitcoin,
                gradient: "from-purple-600 to-purple-400",
              },
              {
                title: "Send Payment",
                description:
                  "Transfer funds instantly to any wallet address worldwide with minimal fees.",
                icon: Zap,
                gradient: "from-pink-600 to-pink-400",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors group"
              >
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border border-blue-800/50 shadow-lg">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${item.gradient}`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Coins Section */}
      <section id="coins" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Wide Compatibility
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Supported Coins
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform supports a wide range of cryptocurrencies to ensure
              maximum flexibility for your payments.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Bitcoin", icon: Bitcoin, color: "bg-orange-500" },
              { name: "Ethereum", icon: Ethereum, color: "bg-blue-500" },
              { name: "Litecoin", icon: Litecoin, color: "bg-gray-500" },
              { name: "Ripple", icon: Zap, color: "bg-blue-400" },
              { name: "Cardano", icon: Zap, color: "bg-blue-600" },
              { name: "Solana", icon: Zap, color: "bg-purple-500" },
              { name: "Polkadot", icon: Zap, color: "bg-pink-500" },
              { name: "Avalanche", icon: Zap, color: "bg-red-500" },
              { name: "Chainlink", icon: Zap, color: "bg-blue-300" },
              { name: "Stellar", icon: Zap, color: "bg-yellow-500" },
              { name: "Tether", icon: Zap, color: "bg-green-500" },
              { name: "USD Coin", icon: Zap, color: "bg-blue-500" },
            ].map((coin, index) => (
              <div
                key={index}
                className="bg-blue-950/10 border border-blue-900/30 rounded-xl p-4 flex flex-col items-center hover:bg-blue-900/20 transition-all hover:scale-105"
              >
                <div
                  className={`w-12 h-12 ${coin.color} rounded-full flex items-center justify-center mb-3`}
                >
                  <coin.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium">{coin.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-b from-black to-blue-950/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefits of Decentralization
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover why decentralized payments are revolutionizing the way we
              transfer value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Enhanced Security",
                description:
                  "Blockchain technology ensures your transactions are secure and immutable.",
                icon: Lock,
              },
              {
                title: "Lower Fees",
                description:
                  "Eliminate intermediaries and reduce transaction costs significantly.",
                icon: Wallet,
              },
              {
                title: "Global Access",
                description:
                  "Send and receive payments anywhere in the world without restrictions.",
                icon: Globe,
              },
              {
                title: "Full Control",
                description:
                  "Maintain complete ownership of your funds with non-custodial solutions.",
                icon: Settings,
              },
              {
                title: "Instant Transfers",
                description:
                  "Experience near-instantaneous settlement times for your transactions.",
                icon: Zap,
              },
              {
                title: "Transparent System",
                description:
                  "All transactions are verifiable on public blockchains for complete transparency.",
                icon: LayoutDashboard,
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors"
              >
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              User Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              User Testimonials
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from our users about how our platform has transformed their
              payment experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                role: "Freelance Developer",
                image: "/placeholder.svg?height=80&width=80",
                quote:
                  "As a freelancer working with international clients, RaqamiX has eliminated payment delays and reduced my transaction fees by over 80%.",
              },
              {
                name: "Sarah Chen",
                role: "E-commerce Business Owner",
                image: "/placeholder.svg?height=80&width=80",
                quote:
                  "Integrating RaqamiX into my online store has opened up a global customer base that was previously inaccessible due to payment limitations.",
              },
              {
                name: "Michael Rodriguez",
                role: "Digital Nomad",
                image: "/placeholder.svg?height=80&width=80",
                quote:
                  "I travel constantly and RaqamiX has been a game-changer. I can receive payments and manage my finances from anywhere without worrying about currency conversion.",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-b from-blue-900/20 to-purple-900/20 border-blue-900/50 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-1 text-yellow-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-blue-500"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-950/30 to-black">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-800/50">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
            </div>

            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience the Future of Payments?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Join thousands of users who have already transformed their
                payment experience with our decentralized platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-900/20"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        .wallet-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
