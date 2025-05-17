"use client";

import Link from "next/link";
import { ArrowLeft, Check, ChevronRight, Cookie, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function CookiesPageClient() {
  const cookiesSections = [
    { id: "overview", title: "Overview" },
    { id: "what-are-cookies", title: "What Are Cookies" },
    { id: "cookie-types", title: "Types of Cookies" },
    { id: "cookies-we-use", title: "Cookies We Use" },
    { id: "third-party", title: "Third-Party Cookies" },
    { id: "manage-preferences", title: "Managing Preferences" },
    { id: "updates", title: "Policy Updates" },
    { id: "contact", title: "Contact Us" },
  ];

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = cookiesSections.map((section) => {
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
  }, [cookiesSections]);

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
            Cookie Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            How DePay uses cookies and similar technologies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-10">
            <div className="space-y-4">
              <div className="font-semibold">Table of Contents</div>
              <ul className="space-y-1">
                {cookiesSections.map((section) => (
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
                        href="/legal/privacy"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/legal/terms"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Terms of Service
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
                <Cookie className="h-4 w-4 text-primary" />
                <AlertDescription>
                  This Cookie Policy explains how DePay uses cookies and
                  similar technologies to recognize and remember you when you
                  visit our platform.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                <p className="text-muted-foreground">
                  DePay uses cookies and similar technologies to provide,
                  protect, and improve our platform. This policy explains how
                  and why we use these technologies and the choices you have.
                </p>
                <p className="text-muted-foreground">
                  This Cookie Policy is part of our Privacy Policy. By using our
                  services, you consent to our use of cookies as described in
                  this policy.
                </p>

                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="font-medium">Key Points</div>
                      <ul className="list-inside space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">
                            We use cookies to enhance your experience and
                            provide essential features
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">
                            You can manage your cookie preferences through your
                            browser settings.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* What Are Cookies Section */}
            <section id="what-are-cookies" className="space-y-6 scroll-mt-10">
              <h2 className="text-2xl font-bold tracking-tight">
                What Are Cookies
              </h2>
              <p className="text-muted-foreground">
                Cookies are small pieces of data stored on your device when you
                visit a website. They help websites remember your preferences
                and provide a better user experience.
              </p>
            </section>

            {/* Cookie Types Section */}
            <section id="cookie-types" className="space-y-6 scroll-mt-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Types of Cookies
              </h2>
              <p className="text-muted-foreground">
                There are two main types of cookies: session cookies and
                persistent cookies. Session cookies are temporary and are
                deleted when you close your browser, while persistent cookies
                remain on your device until they expire or are deleted by you.
              </p>
            </section>

            {/* Cookies We Use Section */}
            <section id="cookies-we-use" className="space-y-6 scroll-mt-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Cookies We Use
              </h2>
              <p className="text-muted-foreground">
                We use cookies for various purposes, including but not limited
                to:
              </p>
              <ul className="list-inside space-y-2">
                <li className="text-sm">Session management</li>
                <li className="text-sm">Personalization</li>
                <li className="text-sm">Analytics</li>
              </ul>
            </section>

            {/* Third-Party Cookies Section */}
            <section id="third-party" className="space-y-6 scroll-mt-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Third-Party Cookies
              </h2>
              <p className="text-muted-foreground">
                We may also use third-party cookies to improve our platform and
                provide you with relevant advertisements.
              </p>
            </section>

            {/* Managing Preferences Section */}
            <section id="manage-preferences" className="space-y-6 scroll-mt-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Managing Preferences
              </h2>
              <p className="text-muted-foreground">
                You can manage your cookie preferences through your browser
                settings. Most browsers allow you to block cookies or delete
                them after visiting a website.
              </p>
            </section>

            {/* Policy Updates Section */}
            <section id="updates" className="space-y-6 scroll-mt-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Policy Updates
              </h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time. Any changes
                will be posted on this page, and we will notify you of any
                significant changes.
              </p>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="space-y-6 scroll-mt-10">
              <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our Cookie Policy, please
                contact us at{" "}
                <Link
                  href="mailto:support@depay.com"
                  className="text-primary hover:underline"
                >
                  support@depay.com
                </Link>
                .
              </p>
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
