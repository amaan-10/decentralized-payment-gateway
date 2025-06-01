import Image from "next/image";
import {
  Shield,
  Zap,
  FileCode,
  Wallet,
  Globe,
  Lock,
  RefreshCw,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-20 mx-10">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Platform Features
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Future of Finance
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
              Discover how DePay is revolutionizing payments with military-grade
              security, lightning-fast transactions, and powerful smart contract
              capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-7 items-center">
            <div className="relative">
              <div className="relative z-10">
                <div className="relative w-full">
                  <Image
                    src="/features-img2.png"
                    alt="Platform Features"
                    width={550}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Enterprise-Grade Security
                  </h3>
                </div>
                <p className="text-gray-400 pl-14">
                  Military-grade security architecture with AES-256 encryption,
                  hardware-secured multi-signature wallets, biometric
                  verification, and SOC 2 certified security audits to provide
                  uncompromising protection for your assets.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Lightning-Fast Transactions
                  </h3>
                </div>
                <p className="text-gray-400 pl-14">
                  Experience sub-second settlement times with our proprietary
                  transaction routing algorithm, zero-knowledge rollups, and
                  optimized Layer 2 scaling solutions that process up to 100,000
                  transactions per second.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <FileCode className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Smart Contract Integration
                  </h3>
                </div>
                <p className="text-gray-400 pl-14">
                  Automate complex financial agreements with our audited smart
                  contract templates, customizable logic builders, and
                  cross-chain interoperability that ensures flawless execution
                  across multiple blockchains.
                </p>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Explore All Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-blue-950/30 -mx-10">
        <div className="container mx-auto px-14">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Payment Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform offers a complete suite of tools designed to make
              crypto payments accessible, secure, and efficient for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Payment Security",
                description:
                  "Multi-factor authentication, biometric verification, and real-time fraud detection systems to secure every transaction.",
                icon: Lock,
                gradient: "from-blue-600 to-blue-400",
              },
              {
                title: "Global Transactions",
                description:
                  "Send and receive payments anywhere in the world without currency conversion fees or international transfer delays.",
                icon: Globe,
                gradient: "from-purple-600 to-purple-400",
              },
              {
                title: "Multi-Currency Support",
                description:
                  "Support for over 50 cryptocurrencies and tokens, with real-time exchange rates and minimal conversion fees.",
                icon: Coins,
                gradient: "from-pink-600 to-pink-400",
              },
              {
                title: "Recurring Payments",
                description:
                  "Set up automatic payments for subscriptions, salaries, or regular transfers with customizable schedules.",
                icon: RefreshCw,
                gradient: "from-green-600 to-green-400",
              },
              {
                title: "Business Solutions",
                description:
                  "Specialized tools for merchants including payment buttons, invoicing, and e-commerce integrations.",
                icon: Wallet,
                gradient: "from-yellow-600 to-yellow-400",
              },
              {
                title: "Developer API",
                description:
                  "Comprehensive API documentation and SDKs to integrate DePay payments into your applications.",
                icon: FileCode,
                gradient: "from-red-600 to-red-400",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors group"
              >
                <CardHeader>
                  <div className="mb-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border border-blue-800/50 shadow-lg">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${feature.gradient}`}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Security Section */}
      <section id="security" className="pt-28 py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="relative z-10">
                <div className="relative w-full h-[400px]">
                  <Image
                    src="/security-shield.png"
                    alt="Advanced Security Features"
                    width={550}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-3xl blur-xl"></div>
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/40 px-3 py-1 text-sm">
                Advanced Security
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Bank-Grade Security with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Blockchain Innovation
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Our multi-layered security approach combines traditional
                security best practices with cutting-edge blockchain technology
                to create an impenetrable defense system for your assets.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Cold Storage Vaults
                    </h3>
                    <p className="text-gray-400">
                      98% of all assets are stored in air-gapped cold storage
                      with geographic distribution and military-grade physical
                      security.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Advanced Fraud Detection
                    </h3>
                    <p className="text-gray-400">
                      AI-powered anomaly detection system monitors transactions
                      24/7 with behavioral analysis and machine learning to
                      prevent unauthorized access.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-900/30 flex items-center justify-center shrink-0">
                    <FileCode className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Audited Smart Contracts
                    </h3>
                    <p className="text-gray-400">
                      All smart contracts undergo rigorous third-party security
                      audits and formal verification to eliminate
                      vulnerabilities before deployment.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-700">
                View Security Whitepaper
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speed & Performance Section */}
      <section
        id="speed"
        className="pt-28 py-20 bg-gradient-to-b from-black to-purple-950/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-900/30 text-purple-400 hover:bg-purple-900/40 px-3 py-1 text-sm mb-4">
              Speed & Performance
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unmatched Transaction Speed
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our proprietary technology stack delivers industry-leading
              performance that makes traditional payment systems obsolete.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-purple-950/10 border-purple-900/50 backdrop-blur-sm hover:bg-purple-900/20 transition-colors group">
              <CardHeader>
                <div className="mb-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border border-purple-800/50 shadow-lg">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-400">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <CardTitle className="group-hover:text-purple-400 transition-colors">
                  100,000 TPS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Our Layer 2 scaling solution processes up to 100,000
                  transactions per second, far exceeding traditional payment
                  networks like Visa (24,000 TPS).
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-purple-950/10 border-purple-900/50 backdrop-blur-sm hover:bg-purple-900/20 transition-colors group">
              <CardHeader>
                <div className="mb-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border border-purple-800/50 shadow-lg">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                </div>
                <CardTitle className="group-hover:text-blue-400 transition-colors">
                  Sub-Second Finality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Transactions are confirmed and settled in less than 1 second,
                  providing instant payment confirmation for both merchants and
                  customers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-purple-950/10 border-purple-900/50 backdrop-blur-sm hover:bg-purple-900/20 transition-colors group">
              <CardHeader>
                <div className="mb-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border border-purple-800/50 shadow-lg">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-cyan-600 to-cyan-400">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                </div>
                <CardTitle className="group-hover:text-cyan-400 transition-colors">
                  Global Edge Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Our distributed edge network spans 200+ locations worldwide,
                  ensuring low-latency transactions regardless of geographic
                  location.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-800/50 p-8">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-10"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-10"></div>
            </div>

            <div className="relative z-10 grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  0.3s
                </div>
                <p className="text-gray-400">Average Transaction Time</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  99.99%
                </div>
                <p className="text-gray-400">Network Uptime</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  200+
                </div>
                <p className="text-gray-400">Global Edge Locations</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  0.001%
                </div>
                <p className="text-gray-400">Transaction Failure Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Contracts Section */}
      <section id="smart-contracts" className="pt-28 py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm">
                Smart Contracts
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Automate Your Financial Agreements with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Smart Contracts
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Our advanced smart contract platform enables secure, automated
                execution of complex financial agreements across multiple
                blockchains with unparalleled reliability and flexibility.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Trustless Transactions
                    </h3>
                    <p className="text-gray-400">
                      Eliminate intermediaries with cryptographically secured,
                      tamper-proof contracts that execute exactly as programmed,
                      reducing counterparty risk.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center shrink-0">
                    <FileCode className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Programmable Money
                    </h3>
                    <p className="text-gray-400">
                      Create sophisticated financial instruments with our visual
                      contract builder that requires no coding knowledge while
                      supporting advanced conditional logic.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-900/30 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Instant Execution
                    </h3>
                    <p className="text-gray-400">
                      Contracts execute in milliseconds when conditions are met,
                      with atomic transaction guarantees and rollback protection
                      for maximum reliability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-blue-950/20 border border-blue-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    100+
                  </div>
                  <p className="text-gray-400">Pre-built Contract Templates</p>
                </div>
                <div className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    12
                  </div>
                  <p className="text-gray-400">Supported Blockchains</p>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Explore Smart Contract Templates
              </Button>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="relative w-full h-[400px]">
                  <Image
                    src="/features-img1.png"
                    alt="Smart Contracts"
                    width={550}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-950/30 to-black -mx-10">
        <div className="container mx-auto px-14">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-800/50">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
            </div>

            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Payment Experience?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Join thousands of users who have already embraced the future of
                decentralized payments with DePay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Get Started Now
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
    </div>
  );
}
