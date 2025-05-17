"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CalendarIcon,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Printer,
  Search,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// License data
const licenses = [
  {
    category: "frontend",
    packages: [
      {
        name: "React",
        version: "18.2.0",
        license: "MIT",
        url: "https://github.com/facebook/react/blob/main/LICENSE",
        description: "A JavaScript library for building user interfaces",
      },
      {
        name: "Next.js",
        version: "14.0.0",
        license: "MIT",
        url: "https://github.com/vercel/next.js/blob/canary/license.md",
        description: "The React Framework for Production",
      },
      {
        name: "Tailwind CSS",
        version: "3.3.0",
        license: "MIT",
        url: "https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE",
        description: "A utility-first CSS framework",
      },
      {
        name: "shadcn/ui",
        version: "0.5.0",
        license: "MIT",
        url: "https://github.com/shadcn/ui/blob/main/LICENSE.md",
        description:
          "Beautifully designed components built with Radix UI and Tailwind CSS",
      },
      {
        name: "Radix UI",
        version: "1.0.0",
        license: "MIT",
        url: "https://github.com/radix-ui/primitives/blob/main/LICENSE",
        description:
          "Unstyled, accessible components for building high‑quality design systems",
      },
      {
        name: "Lucide React",
        version: "0.284.0",
        license: "ISC",
        url: "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
        description:
          "Beautiful & consistent icon toolkit made by the community",
      },
      {
        name: "Framer Motion",
        version: "10.16.4",
        license: "MIT",
        url: "https://github.com/framer/motion/blob/main/LICENSE.md",
        description:
          "Open source, production-ready animation and gesture library for React",
      },
      {
        name: "React Hook Form",
        version: "7.47.0",
        license: "MIT",
        url: "https://github.com/react-hook-form/react-hook-form/blob/master/LICENSE",
        description:
          "Performant, flexible and extensible forms with easy-to-use validation",
      },
      {
        name: "Zod",
        version: "3.22.4",
        license: "MIT",
        url: "https://github.com/colinhacks/zod/blob/master/LICENSE",
        description:
          "TypeScript-first schema validation with static type inference",
      },
      {
        name: "React Query",
        version: "5.0.0",
        license: "MIT",
        url: "https://github.com/tannerlinsley/react-query/blob/master/LICENSE",
        description: "Powerful asynchronous state management for React",
      },
    ],
  },
  {
    category: "crypto",
    packages: [
      {
        name: "ethers.js",
        version: "6.8.0",
        license: "MIT",
        url: "https://github.com/ethers-io/ethers.js/blob/master/LICENSE.md",
        description:
          "Complete Ethereum library and wallet implementation in JavaScript",
      },
      {
        name: "web3.js",
        version: "4.1.2",
        license: "LGPL-3.0",
        url: "https://github.com/web3/web3.js/blob/1.x/LICENSE",
        description: "Ethereum JavaScript API",
      },
      {
        name: "wagmi",
        version: "1.4.3",
        license: "MIT",
        url: "https://github.com/wagmi-dev/wagmi/blob/main/LICENSE",
        description: "React Hooks for Ethereum",
      },
      {
        name: "viem",
        version: "1.16.6",
        license: "MIT",
        url: "https://github.com/wagmi-dev/viem/blob/main/LICENSE",
        description: "TypeScript Interface for Ethereum",
      },
      {
        name: "RainbowKit",
        version: "1.1.1",
        license: "MIT",
        url: "https://github.com/rainbow-me/rainbowkit/blob/main/LICENSE",
        description: "The best way to connect a wallet",
      },
      {
        name: "BitcoinJS",
        version: "6.1.0",
        license: "MIT",
        url: "https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/LICENSE",
        description: "A javascript Bitcoin library for Node.js and browsers",
      },
      {
        name: "@solana/web3.js",
        version: "1.78.5",
        license: "MIT",
        url: "https://github.com/solana-labs/solana-web3.js/blob/master/LICENSE",
        description: "Solana JavaScript API",
      },
      {
        name: "bignumber.js",
        version: "9.1.2",
        license: "MIT",
        url: "https://github.com/MikeMcl/bignumber.js/blob/master/LICENCE",
        description:
          "A JavaScript library for arbitrary-precision decimal and non-decimal arithmetic",
      },
    ],
  },
  {
    category: "backend",
    packages: [
      {
        name: "Node.js",
        version: "20.8.0",
        license: "MIT",
        url: "https://github.com/nodejs/node/blob/master/LICENSE",
        description:
          "JavaScript runtime built on Chrome's V8 JavaScript engine",
      },
      {
        name: "Express",
        version: "4.18.2",
        license: "MIT",
        url: "https://github.com/expressjs/express/blob/master/LICENSE",
        description:
          "Fast, unopinionated, minimalist web framework for Node.js",
      },
      {
        name: "Prisma",
        version: "5.4.2",
        license: "Apache-2.0",
        url: "https://github.com/prisma/prisma/blob/main/LICENSE",
        description: "Next-generation ORM for Node.js and TypeScript",
      },
      {
        name: "PostgreSQL",
        version: "16.0",
        license: "PostgreSQL License",
        url: "https://www.postgresql.org/about/licence/",
        description:
          "The world's most advanced open source relational database",
      },
      {
        name: "Redis",
        version: "7.2.1",
        license: "BSD-3-Clause",
        url: "https://github.com/redis/redis/blob/unstable/LICENSE",
        description:
          "In-memory data structure store, used as a database, cache, and message broker",
      },
      {
        name: "jsonwebtoken",
        version: "9.0.2",
        license: "MIT",
        url: "https://github.com/auth0/node-jsonwebtoken/blob/master/LICENSE",
        description: "JSON Web Token implementation for Node.js",
      },
      {
        name: "bcrypt",
        version: "5.1.1",
        license: "MIT",
        url: "https://github.com/kelektiv/node.bcrypt.js/blob/master/LICENSE",
        description: "A library to help you hash passwords",
      },
      {
        name: "Axios",
        version: "1.5.1",
        license: "MIT",
        url: "https://github.com/axios/axios/blob/master/LICENSE",
        description: "Promise based HTTP client for the browser and Node.js",
      },
    ],
  },
  {
    category: "tools",
    packages: [
      {
        name: "TypeScript",
        version: "5.2.2",
        license: "Apache-2.0",
        url: "https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt",
        description:
          "TypeScript is a superset of JavaScript that compiles to clean JavaScript output",
      },
      {
        name: "ESLint",
        version: "8.51.0",
        license: "MIT",
        url: "https://github.com/eslint/eslint/blob/main/LICENSE",
        description: "Find and fix problems in your JavaScript code",
      },
      {
        name: "Prettier",
        version: "3.0.3",
        license: "MIT",
        url: "https://github.com/prettier/prettier/blob/main/LICENSE",
        description: "Opinionated code formatter",
      },
      {
        name: "Jest",
        version: "29.7.0",
        license: "MIT",
        url: "https://github.com/facebook/jest/blob/main/LICENSE",
        description: "Delightful JavaScript Testing",
      },
      {
        name: "Cypress",
        version: "13.3.0",
        license: "MIT",
        url: "https://github.com/cypress-io/cypress/blob/develop/LICENSE",
        description:
          "Fast, easy and reliable testing for anything that runs in a browser",
      },
      {
        name: "Webpack",
        version: "5.89.0",
        license: "MIT",
        url: "https://github.com/webpack/webpack/blob/main/LICENSE",
        description: "A bundler for javascript and friends",
      },
      {
        name: "Babel",
        version: "7.23.0",
        license: "MIT",
        url: "https://github.com/babel/babel/blob/main/LICENSE",
        description: "The compiler for next generation JavaScript",
      },
    ],
  },
  {
    category: "security",
    packages: [
      {
        name: "helmet",
        version: "7.0.0",
        license: "MIT",
        url: "https://github.com/helmetjs/helmet/blob/main/LICENSE",
        description: "Help secure Express apps with various HTTP headers",
      },
      {
        name: "cors",
        version: "2.8.5",
        license: "MIT",
        url: "https://github.com/expressjs/cors/blob/master/LICENSE",
        description: "Node.js CORS middleware",
      },
      {
        name: "rate-limiter-flexible",
        version: "3.0.0",
        license: "MIT",
        url: "https://github.com/animir/node-rate-limiter-flexible/blob/master/LICENSE",
        description: "Node.js rate limiter flexible and accurate",
      },
      {
        name: "crypto-js",
        version: "4.1.1",
        license: "MIT",
        url: "https://github.com/brix/crypto-js/blob/develop/LICENSE",
        description: "JavaScript library of crypto standards",
      },
      {
        name: "node-forge",
        version: "1.3.1",
        license: "BSD-3-Clause",
        url: "https://github.com/digitalbazaar/forge/blob/main/LICENSE",
        description:
          "JavaScript implementations of network transports, cryptography, ciphers, PKI, etc.",
      },
    ],
  },
];

// Version history data
const versionHistory = [
  {
    version: "1.2",
    date: "May 10, 2025",
    changes: "Added new libraries for Solana integration",
  },
  {
    version: "1.1",
    date: "March 15, 2025",
    changes: "Updated all package versions and added security libraries",
  },
  {
    version: "1.0",
    date: "January 5, 2025",
    changes: "Initial licenses documentation",
  },
];

export default function LicensesPageClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter packages based on search term and active tab
  const filteredPackages = licenses.flatMap((category) =>
    category.packages.filter(
      (pkg) =>
        (activeTab === "all" || category.category === activeTab) &&
        (pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.license.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  // Get unique license types for filtering
  const licenseTypes = [
    ...new Set(
      licenses.flatMap((category) =>
        category.packages.map((pkg) => pkg.license)
      )
    ),
  ].sort();

  // Table of contents sections
  const tocSections = [
    { id: "introduction", title: "Introduction" },
    { id: "license-types", title: "License Types" },
    { id: "third-party", title: "Third-Party Software" },
    { id: "version-history", title: "Version History" },
        { id: "contact", title: "Contact Information" },
  ];

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = tocSections.map((section) => {
        const element = document.getElementById(section.id);
        if (!element) return { id: section.id, top: 0 };
        return {
          id: section.id,
          top: element.getBoundingClientRect().top,
        };
      });

      // Find the first section that's above the middle of the viewport
      const currentSection = sectionElements
        .filter((section) => section.top <= 300)
        .slice(-1)[0];

      if (currentSection) {
        setActiveSection(currentSection.id);
      } else if (sectionElements.length > 0) {
        setActiveSection(sectionElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tocSections]);

  return (
    <div className="container max-w-4xl py-10 scroll-pt-32 pt-32">
      <div className="mb-8 flex flex-col space-y-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Legal</Badge>
            <span className="text-sm text-muted-foreground">
              Last updated: May 16, 2025
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Open Source Licenses
          </h1>
          <p className="text-lg text-muted-foreground">
            Information about the open source software used in DePay and their
            respective licenses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <aside className="lg:col-span-1">
          <nav className="sticky top-10">
            <h2 className="font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-1">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`flex items-center py-1 text-sm hover:text-primary transition-colors ${
                      activeSection === section.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(section.id)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <ChevronRight
                      className={`h-3 w-3 mr-1 transition-transform ${
                        activeSection === section.id ? "rotate-90" : ""
                      }`}
                    />
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Document
              </Button>
            </div>
          </nav>
        </aside>

        <main className="lg:col-span-3">
          <section id="introduction" className="scroll-mt-10 mb-10">
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                DePay is built using various open source software
                components, each with its own license. This page provides
                information about the third-party open source software packages
                used in DePay, along with their respective licenses.
              </p>
              <p className="text-muted-foreground mb-4">
                We are grateful to the developers who have contributed to these
                projects and made their work available under open source
                licenses. This document serves as an acknowledgment of their
                contributions and fulfills our obligation to share the license
                terms of the software we use.
              </p>
            </div>
          </section>

          <section id="license-types" className="scroll-mt-10 mb-10">
            <h2 className="text-xl font-semibold mb-4">License Types</h2>
            <div className="space-y-4">
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  The following license types are used by the third-party
                  software included in DePay:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {licenseTypes.map((license) => (
                    <div key={license} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{license}</h4>
                      <p className="text-sm text-muted-foreground">
                        {license === "MIT" &&
                          "A permissive license that allows for reuse with few restrictions."}
                        {license === "Apache-2.0" &&
                          "A permissive license that also provides an express grant of patent rights."}
                        {license === "BSD-3-Clause" &&
                          "A permissive license with requirements to include the copyright notice."}
                        {license === "LGPL-3.0" &&
                          "A copyleft license that allows linking with non-free programs."}
                        {license === "PostgreSQL License" &&
                          "A liberal open source license similar to the MIT license."}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  For the full text of each license, please follow the links
                  provided in the third-party software section below.
                </p>
              </div>
            </div>
          </section>

          <section id="third-party" className="scroll-mt-10 mb-10">
            <h2 className="text-xl font-semibold mb-4">Third-Party Software</h2>
            <div className="space-y-4">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search packages..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full sm:w-auto"
                  >
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      {licenses.map((category) => (
                        <TabsTrigger
                          key={category.category}
                          value={category.category}
                          className="capitalize"
                        >
                          {category.category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                {filteredPackages.length > 0 ? (
                  <div className="border rounded-lg divide-y">
                    {filteredPackages.map((pkg, index) => (
                      <div
                        key={`${pkg.name}-${index}`}
                        className="p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{pkg.name}</h4>
                              <span className="text-xs text-muted-foreground">
                                v{pkg.version}
                              </span>
                              <Badge variant="outline" className="ml-2">
                                {pkg.license}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {pkg.description}
                            </p>
                          </div>
                          <a
                            href={pkg.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline mt-2 sm:mt-0"
                          >
                            View License
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <p className="text-muted-foreground">
                      No packages found matching your search criteria.
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-2"
                      onClick={() => {
                        setSearchTerm("");
                        setActiveTab("all");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}

                <p className="text-sm text-muted-foreground mt-4">
                  This list may not be exhaustive. DePay may include other
                  open source software components not listed here. If you
                  believe a component is missing or incorrectly attributed,
                  please contact us.
                </p>
              </div>
            </div>
          </section>

          <section id="version-history" className="scroll-mt-10 mb-10">
            <h2 className="text-xl font-semibold mb-4">Version History</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Changes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {versionHistory.map((version) => (
                  <TableRow key={version.version}>
                    <TableCell className="font-medium">
                      {version.version}
                    </TableCell>
                    <TableCell>{version.date}</TableCell>
                    <TableCell>{version.changes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section id="contact" className="scroll-mt-10 mt-10">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this policy, please contact us:
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href={`mailto:legal@depay.com`}
                    className="text-muted-foreground hover:underline"
                  >
                    legal@depay.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a
                    href={`tel:+91 9876543210`}
                    className="text-muted-foreground hover:underline"
                  >
                    +91 9876543210
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    Kharadi, Pune - 411014, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-6 border-t pt-6">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="#" onClick={() => window.print()}>
                    Print
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-xs" asChild>
                  <Link href="/privacy">Privacy</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-xs" asChild>
                  <Link href="/terms">Terms</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-xs" asChild>
                  <Link href="/cookies">Cookies</Link>
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} DePay. All rights reserved.
              <br/>
              <br/>
              This document is subject to change. Please check back regularly
              for updates.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
