import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Finance through{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Blockchain Technology
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
              DePay was founded with a simple mission: to make decentralized
              financial services accessible to everyone.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            {/* Background image */}
            <Image
              src="/about-image.png"
              alt="About DePay"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
            />
            {/* Optional gradient overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/40 z-0" /> */}

            {/* Content over the image */}
            <div className="relative z-10 p-8 md:p-16 text-white w-[75%]">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Vision
              </h2>
              <p className="text-gray-200 mb-6">
                Founded in 2025, DePay emerged from a collective realization:
                traditional financial systems were leaving too many impressions
                behind. Created a platform that would democratize access to
                financial services.
              </p>
              <p className="text-gray-200 mb-6">
                We envision a world where financial transactions are seamless,
                secure, and accessible to anyone with an internet
                connection—regardless of their location, background, or economic
                status. Our platform is built on the principles of transparency,
                security, and user empowerment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Join Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-black to-blue-950/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Our Core Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What We Stand For
            </h2>
            <p className="text-gray-400">
              Our values guide everything we do, from product development to
              customer support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Security First",
                description:
                  "We prioritize the security of our users' assets and data above all else, implementing the highest standards of protection.",
                icon: Shield,
              },
              {
                title: "Global Accessibility",
                description:
                  "We're committed to breaking down barriers to financial services, making them available to everyone regardless of location.",
                icon: Globe,
              },
              {
                title: "Community Driven",
                description:
                  "Our platform evolves based on user feedback and community needs, ensuring it serves real-world purposes.",
                icon: Users,
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="bg-blue-950/10 border-blue-900/50 backdrop-blur-sm hover:bg-blue-900/20 transition-colors"
              >
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br border border-blue-800/50 shadow-lg">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
                      <value.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Meet Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Innovators Behind DePay
            </h2>
            <p className="text-gray-400">
              Our diverse team of experts brings together decades of experience
              in blockchain, finance, and technology.
            </p>
          </div>

          <div
            //   className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            className="flex items-center justify-center"
          >
            {[
              {
                name: "Amaan Shaikh",
                role: "Founder",
                image: "/amaan-shaikh.png",
                bio: "AI&DS Student, Software and FinTech enthusiastic.",
                link: "https://amaans-portfolio.vercel.app/",
              },
              //   {
              //     name: "Marcus Johnson",
              //     role: "CTO",
              //     image: "/images/team/marcus-johnson.png",
              //     bio: "Blockchain pioneer with 10+ years in distributed systems.",
              //   },
              //   {
              //     name: "Aisha Patel",
              //     role: "Head of Product",
              //     image: "/images/team/aisha-patel.png",
              //     bio: "UX specialist focused on creating accessible financial tools.",
              //   },
              //   {
              //     name: "David Rodriguez",
              //     role: "Chief Security Officer",
              //     image: "/images/team/david-rodriguez.png",
              //     bio: "Cybersecurity expert with background in banking security.",
              //   },
              //   {
              //     name: "Lei Zhang",
              //     role: "Lead Blockchain Developer",
              //     image: "/images/team/lei-zhang.png",
              //     bio: "Smart contract expert and open-source contributor.",
              //   },
              //   {
              //     name: "Olivia Thompson",
              //     role: "Head of Partnerships",
              //     image: "/images/team/olivia-thompson.png",
              //     bio: "Strategic alliance builder with global financial networks.",
              //   },
              //   {
              //     name: "Jamal Washington",
              //     role: "Head of Design",
              //     image: "/images/team/jamal-washington.png",
              //     bio: "Award-winning designer specializing in fintech UX/UI.",
              //   },
              //   {
              //     name: "Elena Kowalski",
              //     role: "Chief Compliance Officer",
              //     image: "/images/team/elena-kowalski.png",
              //     bio: "Regulatory expert with experience across global markets.",
              //   },
            ].map((member, index) => (
              <Link
                href={member.link}
                target="_blank"
                key={index}
                className="group"
              >
                <div className="rounded-xl overflow-hidden border border-blue-900/50 bg-blue-950/10 transition-transform group-hover:scale-[1.02] group-hover:shadow-xl">
                  <div className="relative h-[240px] overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-sm text-gray-300">{member.bio}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section
        id="roadmap"
        className="py-20 bg-gradient-to-b from-black to-blue-950/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Product Roadmap
            </h2>
            <p className="text-gray-400">
              See what we&apos;ve accomplished and what exciting features are
              coming next.
            </p>
          </div>

          <Tabs defaultValue="Q1" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 bg-blue-950/20 border border-blue-900/50 rounded-lg p-1">
              <TabsTrigger
                value="Q1"
                className="rounded-md data-[state=active]:bg-blue-900/40"
              >
                Q1 2025
              </TabsTrigger>
              <TabsTrigger
                value="Q2"
                className="rounded-md data-[state=active]:bg-blue-900/40"
              >
                Q2 2025
              </TabsTrigger>
              <TabsTrigger
                value="Q3"
                className="rounded-md data-[state=active]:bg-blue-900/40"
              >
                Q3 2025+
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Q1" className="mt-8">
              <div className="relative border-l-2 border-blue-900/50 pl-8 pb-8">
                <div className="space-y-12">
                  {[
                    {
                      quarter: "Q1 2023",
                      title: "Platform Launch",
                      description:
                        "Initial release of DePay with basic wallet and transaction capabilities.",
                      status: "Completed",
                    },
                    {
                      quarter: "Q2 2023",
                      title: "Mobile App Release",
                      description:
                        "Launch of iOS and Android applications with core functionality.",
                      status: "Completed",
                    },
                    {
                      quarter: "Q3 2023",
                      title: "Smart Contract Integration",
                      description:
                        "Added support for executing and managing smart contracts directly from the platform.",
                      status: "Completed",
                    },
                    {
                      quarter: "Q4 2023",
                      title: "Multi-Chain Support",
                      description:
                        "Expanded to support Ethereum, Binance Smart Chain, Solana, and Polygon networks.",
                      status: "Current",
                    },
                  ].map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full border-2 border-blue-500 bg-black"></div>
                      <h3 className="text-xl font-bold mb-2">
                        {/* {milestone.quarter}:  */}
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400 mb-3">
                        {milestone.description}
                      </p>
                      <Badge
                        className={`
                        ${
                          milestone.status === "Completed"
                            ? "bg-green-900/30 text-green-400"
                            : ""
                        } 
                        ${
                          milestone.status === "Current"
                            ? "bg-blue-900/30 text-blue-400"
                            : ""
                        } 
                        ${
                          milestone.status === "Upcoming"
                            ? "bg-gray-900/30 text-gray-400"
                            : ""
                        }
                      `}
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Q2" className="mt-8">
              <div className="relative border-l-2 border-blue-900/50 pl-8 pb-8">
                <div className="space-y-12">
                  {[
                    {
                      quarter: "Q1 2024",
                      title: "DeFi Integration Suite",
                      description:
                        "Native integration with leading DeFi protocols for lending, staking, and yield farming.",
                      status: "Upcoming",
                    },
                    {
                      quarter: "Q2 2024",
                      title: "Advanced Security Features",
                      description:
                        "Implementation of hardware key support and enhanced fraud detection systems.",
                      status: "Upcoming",
                    },
                    {
                      quarter: "Q3 2024",
                      title: "Enterprise Solutions",
                      description:
                        "Launch of B2B services tailored for businesses and institutions.",
                      status: "Upcoming",
                    },
                    {
                      quarter: "Q4 2024",
                      title: "Global Expansion",
                      description:
                        "Compliance framework and infrastructure for expanded global operations.",
                      status: "Upcoming",
                    },
                  ].map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full border-2 border-blue-500 bg-black"></div>
                      <h3 className="text-xl font-bold mb-2">
                        {/* {milestone.quarter}:  */}
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400 mb-3">
                        {milestone.description}
                      </p>
                      <Badge
                        className={`
                        ${
                          milestone.status === "Completed"
                            ? "bg-green-900/30 text-green-400"
                            : ""
                        } 
                        ${
                          milestone.status === "Current"
                            ? "bg-blue-900/30 text-blue-400"
                            : ""
                        } 
                        ${
                          milestone.status === "Upcoming"
                            ? "bg-gray-900/30 text-gray-400"
                            : ""
                        }
                      `}
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Q3" className="mt-8">
              <div className="relative border-l-2 border-blue-900/50 pl-8 pb-8">
                <div className="space-y-12">
                  {[
                    {
                      quarter: "Q1-Q2 2025",
                      title: "Decentralized Identity",
                      description:
                        "Implementation of self-sovereign identity solutions for enhanced privacy and security.",
                      status: "Planned",
                    },
                    {
                      quarter: "Q3-Q4 2025",
                      title: "Institutional Trading Platform",
                      description:
                        "Launch of advanced trading tools and liquidity solutions for institutional clients.",
                      status: "Planned",
                    },
                    {
                      quarter: "2026+",
                      title: "DAO Governance",
                      description:
                        "Transition to decentralized governance model with community-driven development.",
                      status: "Vision",
                    },
                  ].map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full border-2 border-blue-500 bg-black"></div>
                      <h3 className="text-xl font-bold mb-2">
                        {milestone.quarter}:{milestone.title}
                      </h3>
                      <p className="text-gray-400 mb-3">
                        {milestone.description}
                      </p>
                      <Badge className="bg-purple-900/30 text-purple-400">
                        {milestone.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Investors Section */}
      {/* <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Our Backers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Backed by the Best
            </h2>
            <p className="text-gray-400">
              We&apos;re proud to be supported by leading investors who share
              our vision for the future of finance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Investor 1", image: "/images/investors/investor1.png" },
              { name: "Investor 2", image: "/images/investors/investor2.png" },
              { name: "Investor 3", image: "/images/investors/investor3.png" },
              { name: "Investor 4", image: "/images/investors/investor4.png" },
              { name: "Investor 5", image: "/images/investors/investor5.png" },
              { name: "Investor 6", image: "/images/investors/investor6.png" },
              { name: "Investor 7", image: "/images/investors/investor7.png" },
              { name: "Investor 8", image: "/images/investors/investor8.png" },
            ].map((investor, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-blue-950/10 rounded-xl border border-blue-900/30"
              >
                <Image
                  src={investor.image || "/placeholder.svg"}
                  alt={investor.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

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
                Join Us in Reshaping Finance
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Whether you&apos;re a user, developer, or investor, become part
                of our journey to create a more accessible financial future.
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
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
