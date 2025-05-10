"use client"

import { useState } from "react"
import { Check, HelpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const plans = [
    {
      name: "Basic",
      description: "Essential features for individuals and small projects",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { name: "Up to 5 transactions per day", included: true },
        { name: "Connect up to 2 wallets", included: true },
        { name: "Basic analytics", included: true },
        { name: "Community support", included: true },
        { name: "Smart contract automation", included: false },
        { name: "Multi-signature security", included: false },
        { name: "Priority support", included: false },
        { name: "Custom integrations", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "Advanced features for growing businesses and power users",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        { name: "Unlimited transactions", included: true },
        { name: "Connect up to 10 wallets", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Smart contract automation", included: true },
        { name: "Multi-signature security", included: true },
        { name: "Custom branding", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations and institutions",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        { name: "Unlimited transactions", included: true },
        { name: "Unlimited wallets", included: true },
        { name: "Enterprise analytics", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Advanced smart contracts", included: true },
        { name: "Multi-signature security", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

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
              Pricing Plans
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Pricing
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
              Choose the perfect plan for your needs. All plans include core platform features with no hidden fees.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-2 ${billingCycle === "monthly" ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <Switch
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
            />
            <span className={`ml-2 ${billingCycle === "annual" ? "text-white" : "text-gray-400"}`}>
              Annual <Badge className="ml-1 bg-green-900/30 text-green-400">Save 20%</Badge>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-blue-950/10 border-blue-900/50 backdrop-blur-sm transition-all duration-300 hover:translate-y-[-8px] ${
                  plan.popular ? "border-blue-500/50 shadow-lg shadow-blue-500/10" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    <span className="text-gray-400">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-500 mr-2 shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-200" : "text-gray-500"}>
                          {feature.name}
                          {feature.name.includes("Smart contract") && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-4 h-4 inline ml-1 text-gray-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-[200px] text-xs">
                                    Automate financial agreements with programmable smart contracts that execute when
                                    predefined conditions are met.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-blue-900/50 hover:bg-blue-900/70"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-black to-blue-950/30 -mx-10 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our pricing plans and features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I switch between plans?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, changes will take effect at the start of your next billing cycle.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "Yes, we offer a 14-day free trial on our Pro plan with no credit card required. You can experience all the premium features before making a decision.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and of course, a wide range of cryptocurrencies including Bitcoin, Ethereum, and many others.",
              },
              {
                question: "Are there any hidden fees?",
                answer:
                  "No, the price you see is the price you pay. There are no setup fees, hidden charges, or additional costs. Network transaction fees are separate and determined by the blockchain networks.",
              },
              {
                question: "Do you offer custom enterprise solutions?",
                answer:
                  "Yes, our Enterprise plan can be customized to meet your specific needs. Contact our sales team for a personalized quote and to discuss your requirements.",
              },
              {
                question: "What happens if I exceed my plan limits?",
                answer:
                  "If you approach your plan limits, we'll notify you so you can upgrade if needed. We don't automatically charge you for overages without your consent.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-blue-950/10 border border-blue-900/50 rounded-lg p-6 hover:bg-blue-900/20 transition-colors"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-800/50">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
            </div>

            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Our team is here to help you find the perfect plan for your needs. Contact us for a personalized
                consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Contact Sales
                </Button>
                <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-900/20">
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
