"use client";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  FileText,
  Printer,
  Shield,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function PrivacyPolicyClientPage() {
  // Table of contents sections
  const PrivacyPolicySections = [
    { id: "overview", title: "Overview" },
    { id: "information-collected", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Your Information" },
    { id: "information-sharing", title: "Information Sharing" },
    { id: "security", title: "Security" },
    { id: "your-rights", title: "Your Rights" },
    { id: "international", title: "International Transfers" },
    { id: "updates", title: "Policy Updates" },
    { id: "contact", title: "Contact Us" },
  ];

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = PrivacyPolicySections.map((section) => {
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
  }, [PrivacyPolicySections]);

  return (
    <div className="container max-w-4xl py-10 pt-32">
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
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            How DePay collects, uses, and protects your information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-10">
            <div className="space-y-4">
              <div className="font-semibold">Table of Contents</div>
              <ul className="space-y-1">
              {PrivacyPolicySections.map((section) => (
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
            
              <div className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Related Documents
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/terms"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cookies"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Cookie Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/legal/licenses"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Licenses
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="space-y-10">
            {/* Overview Section */}
            <section id="overview" className="space-y-6 scroll-mt-10">
              <Alert className="border-primary/20 bg-primary/5">
                <Shield className="h-4 w-4 text-primary" />
                <AlertDescription>
                  At DePay, we take your privacy seriously. This policy
                  describes how we collect, use, and protect your personal
                  information.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                <p className="text-muted-foreground">
                  DePay ("we", "our", or "us") is committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our
                  website, use our mobile application, or use our services.
                </p>
                <p className="text-muted-foreground">
                  Please read this privacy policy carefully. If you do not agree
                  with the terms of this privacy policy, please do not access
                  the site or use our services.
                </p>

                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="font-medium">Key Points</div>
                      <ul className="list-inside space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">
                            We collect personal and transaction data to provide
                            our services
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">
                            We use industry-standard security measures to
                            protect your information
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">
                            You have control over your data and specific privacy
                            rights
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">
                            We do not sell your personal information to third
                            parties
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Information We Collect */}
            <section
              id="information-collected"
              className="space-y-6 scroll-mt-10"
            >
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Information We Collect
                </h2>
                <p className="text-muted-foreground">
                  We collect several types of information from and about users
                  of our platform, including:
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="personal-information">
                    <AccordionTrigger>Personal Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">We may collect:</p>
                        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                          <li>
                            Contact information (name, email address, phone
                            number)
                          </li>
                          <li>
                            Identity verification information (date of birth,
                            government ID)
                          </li>
                          <li>Account credentials</li>
                          <li>
                            Financial information (bank account details,
                            cryptocurrency wallet addresses)
                          </li>
                          <li>Transaction history and patterns</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="device-information">
                    <AccordionTrigger>
                      Device & Usage Information
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">We collect:</p>
                        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                          <li>
                            Device type, operating system, and browser
                            information
                          </li>
                          <li>IP address and location data</li>
                          <li>Pages visited and features used</li>
                          <li>
                            Time spent on platform and interaction patterns
                          </li>
                          <li>Error logs and performance data</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cookies-tracking">
                    <AccordionTrigger>
                      Cookies & Tracking Technologies
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          We use cookies and similar tracking technologies to
                          track activity on our platform and hold certain
                          information. See our
                          <Link
                            href="/legal/cookies"
                            className="text-primary hover:underline"
                          >
                            {" "}
                            Cookie Policy{" "}
                          </Link>
                          for more details.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section id="how-we-use" className="space-y-6 scroll-mt-10">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  How We Use Your Information
                </h2>
                <p className="text-muted-foreground">
                  We use the information we collect about you for various
                  purposes, including:
                </p>

                <Tabs defaultValue="services" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="communication">
                      Communication
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="services" className="space-y-4 pt-4">
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>
                        Processing transactions and maintaining your account
                      </li>
                      <li>
                        Providing customer support and responding to inquiries
                      </li>
                      <li>
                        Personalizing your experience and delivering relevant
                        content
                      </li>
                      <li>Improving our platform, products, and services</li>
                      <li>Developing new features and functionality</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="security" className="space-y-4 pt-4">
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Verifying your identity and preventing fraud</li>
                      <li>Monitoring for suspicious activity</li>
                      <li>Complying with legal and regulatory requirements</li>
                      <li>Enforcing our terms of service</li>
                      <li>
                        Protecting our rights, privacy, safety, and property
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="communication" className="space-y-4 pt-4">
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>
                        Sending transaction confirmations and account updates
                      </li>
                      <li>Providing service announcements and alerts</li>
                      <li>
                        Delivering marketing communications (with consent)
                      </li>
                      <li>Responding to your comments and questions</li>
                      <li>Conducting surveys and collecting feedback</li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </section>

            {/* Information Sharing */}
            <section
              id="information-sharing"
              className="space-y-6 scroll-mt-10"
            >
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Information Sharing
                </h2>
                <p className="text-muted-foreground">
                  We may share your information with third parties in the
                  following circumstances:
                </p>

                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Purpose</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Service Providers
                        </TableCell>
                        <TableCell>
                          To help us operate our business and provide services
                          (payment processors, cloud services, etc.)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Business Partners
                        </TableCell>
                        <TableCell>
                          To offer joint products or services, or to facilitate
                          transactions
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Legal Authorities
                        </TableCell>
                        <TableCell>
                          To comply with legal obligations, court orders, or
                          legal processes
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Corporate Transactions
                        </TableCell>
                        <TableCell>
                          In connection with a merger, acquisition, or sale of
                          assets
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <p className="text-sm text-muted-foreground">
                    We do not sell your personal information to third parties
                    for their marketing purposes without your explicit consent.
                  </p>
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section id="security" className="space-y-6 scroll-mt-10">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized or
                  unlawful processing, accidental loss, destruction, or damage.
                </p>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="font-medium">
                        Our Security Measures Include:
                      </div>
                      <ul className="list-inside space-y-3">
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-sm">
                            End-to-end encryption for sensitive data
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-sm">
                            Multi-factor authentication for account access
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-sm">
                            Regular security assessments and audits
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-sm">
                            Strict access controls and authentication procedures
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-sm">
                            Continuous monitoring for suspicious activities
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-sm text-muted-foreground">
                  While we strive to use commercially acceptable means to
                  protect your personal information, no method of transmission
                  over the Internet or electronic storage is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section id="your-rights" className="space-y-6 scroll-mt-10">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Your Rights
                </h2>
                <p className="text-muted-foreground">
                  Depending on your location, you may have various rights
                  regarding your personal information:
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="access-correction">
                    <AccordionTrigger>Access and Correction</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          You have the right to access, review, and update the
                          personal information we hold about you.
                        </p>
                        <p className="text-muted-foreground">
                          You can access and update most of your information
                          directly through your account settings.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="deletion-restriction">
                    <AccordionTrigger>
                      Deletion and Restriction
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          You may request deletion of your personal information
                          unless we need to retain it for legitimate business or
                          legal purposes.
                        </p>
                        <p className="text-muted-foreground">
                          You can also request that we restrict the processing
                          of your personal information in certain circumstances.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="portability-objection">
                    <AccordionTrigger>
                      Data Portability and Objection
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          You may request a copy of your personal information in
                          a structured, commonly used, and machine-readable
                          format.
                        </p>
                        <p className="text-muted-foreground">
                          You can object to processing of your personal
                          information in certain circumstances.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="consent-withdrawal">
                    <AccordionTrigger>Consent Withdrawal</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          Where processing is based on consent, you can withdraw
                          your consent at any time.
                        </p>
                        <p className="text-muted-foreground">
                          You can opt out of marketing communications by using
                          the unsubscribe links in our emails or by updating
                          your communication preferences.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <p className="text-sm text-muted-foreground">
                  To exercise these rights, please contact us using the
                  information in the "Contact Us" section. We will respond to
                  your request within the timeframe required by applicable law.
                </p>
              </div>
            </section>

            {/* International Transfers */}
            <section id="international" className="space-y-6 scroll-mt-10">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  International Transfers
                </h2>
                <p className="text-muted-foreground">
                  We operate globally and may transfer your personal information
                  to countries with different data protection laws. We ensure
                  appropriate safeguards are in place to protect your
                  information in compliance with applicable laws.
                </p>
                <p className="text-muted-foreground">
                  These safeguards include:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>
                    Standard contractual clauses approved by relevant data
                    protection authorities
                  </li>
                  <li>Privacy Shield certification (where applicable)</li>
                  <li>Binding corporate rules for internal transfers</li>
                  <li>Consent mechanisms where appropriate</li>
                </ul>
              </div>
            </section>

            {/* Policy Updates */}
            <section id="updates" className="space-y-6 scroll-mt-10">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Policy Updates
                </h2>
                <p className="text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date.
                </p>
                <p className="text-muted-foreground">
                  For significant changes, we will provide a more prominent
                  notice, which may include email notification to the email
                  address specified in your account.
                </p>
                <p className="text-muted-foreground">
                  We encourage you to review our Privacy Policy periodically for
                  any changes. Your continued use of our services after such
                  modifications constitutes your acknowledgment of the modified
                  Privacy Policy and your agreement to abide and be bound by it.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact" className="space-y-6 scroll-mt-10">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Contact Us
                </h2>
                <p className="text-muted-foreground">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please contact us
                  at:
                </p>
                <div className="rounded-lg border p-4">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      privacy@depay.com
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> Kharadi,
                      Pune - 411014, Maharashtra, India
                    </div>
                    <div>
                      <span className="font-medium">
                        Data Protection Officer:
                      </span>{" "}
                      dpo@depay.com
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  For residents in the European Economic Area, you have the
                  right to lodge a complaint with your local data protection
                  authority if you believe our processing of your personal
                  information does not comply with applicable law.
                </p>
              </div>
            </section>

            {/* Document Footer */}
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
                    <Link href="/terms">Terms</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs" asChild>
                    <Link href="/cookies">Cookies</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs" asChild>
                    <Link href="/licenses">Licenses</Link>
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} DePay. All rights reserved.
                <br />
                <br />
                This document is subject to change. Please check back regularly
                for updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
