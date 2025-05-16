"use client"

import Link from "next/link"
import { ArrowLeft, Check, FileText, Scale } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TermsOfServicePageClient() {
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
            <span className="text-sm text-muted-foreground">Last updated: May 16, 2024</span>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            The agreement between you and DePay when using our platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-20">
            <div className="space-y-4">
              <div className="font-medium">On this page</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#agreement" className="text-muted-foreground hover:text-primary">
                    Agreement Overview
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground hover:text-primary">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#user-obligations" className="text-muted-foreground hover:text-primary">
                    User Obligations
                  </a>
                </li>
                <li>
                  <a href="#prohibited" className="text-muted-foreground hover:text-primary">
                    Prohibited Activities
                  </a>
                </li>
                <li>
                  <a href="#intellectual" className="text-muted-foreground hover:text-primary">
                    Intellectual Property
                  </a>
                </li>
                <li>
                  <a href="#disclaimers" className="text-muted-foreground hover:text-primary">
                    Disclaimers
                  </a>
                </li>
                <li>
                  <a href="#limitation" className="text-muted-foreground hover:text-primary">
                    Limitation of Liability
                  </a>
                </li>
                <li>
                  <a href="#termination" className="text-muted-foreground hover:text-primary">
                    Termination
                  </a>
                </li>
                <li>
                  <a href="#governing" className="text-muted-foreground hover:text-primary">
                    Governing Law
                  </a>
                </li>
                <li>
                  <a href="#changes" className="text-muted-foreground hover:text-primary">
                    Changes to Terms
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-primary">
                    Contact Us
                  </a>
                </li>
              </ul>
              <div className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Related Documents</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                        Cookie Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/licenses" className="text-muted-foreground hover:text-primary">
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
            {/* Agreement Section */}
            <section id="agreement" className="space-y-6 scroll-mt-32">
              <Alert className="border-primary/20 bg-primary/5">
                <Scale className="h-4 w-4 text-primary" />
                <AlertDescription>
                  Please read these Terms of Service carefully before using DePay. By accessing or using our
                  services, you agree to be bound by these terms.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Agreement Overview</h2>
                <p className="text-muted-foreground">
                  These Terms of Service ("Terms") govern your access to and use of the DePay website, mobile
                  application, and related services (collectively, the "Service"). By accessing or using the Service,
                  you agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-muted-foreground">
                  If you are using the Service on behalf of an organization, you represent and warrant that you have the
                  authority to bind that organization to these Terms. In that case, "you" and "your" will refer to that
                  organization.
                </p>

                <Card className="border-primary/20">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="font-medium">Key Points</div>
                      <ul className="list-inside space-y-2">
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">You must be at least 18 years old to use our services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">Accurate identity verification is required for compliance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">You are responsible for maintaining account security</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm">Cryptocurrency investments carry inherent risks</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Services Section */}
            <section id="services" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Services</h2>
                <p className="text-muted-foreground">
                  DePay provides a platform for users to securely manage, trade, and store cryptocurrency assets.
                  Our services include:
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="wallet-services">
                    <AccordionTrigger>Wallet Services</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          DePay provides digital wallet services that allow you to:
                        </p>
                        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                          <li>Store various cryptocurrencies securely</li>
                          <li>Connect external wallets to track your assets</li>
                          <li>Manage private keys (where applicable)</li>
                          <li>View transaction history and wallet balances</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="transaction-services">
                    <AccordionTrigger>Transaction Services</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">Our transaction services include:</p>
                        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                          <li>Sending and receiving cryptocurrencies</li>
                          <li>Converting between different cryptocurrencies</li>
                          <li>Processing payments and transfers</li>
                          <li>Transaction history and reporting</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="market-data">
                    <AccordionTrigger>Market Data and Analytics</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">We provide:</p>
                        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                          <li>Real-time market data and pricing information</li>
                          <li>Portfolio tracking and performance analytics</li>
                          <li>Market trends and insights</li>
                          <li>Personalized investment recommendations</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="api-access">
                    <AccordionTrigger>API Access</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">Our API services enable:</p>
                        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
                          <li>Integration with third-party applications</li>
                          <li>Automated trading strategies</li>
                          <li>Custom reporting and analytics</li>
                          <li>Webhook notifications for account events</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>

            {/* User Obligations */}
            <section id="user-obligations" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">User Obligations</h2>
                <p className="text-muted-foreground">By using DePay, you agree to:</p>

                <div className="space-y-4">
                  <ul className="list-disc space-y-3 pl-6 text-muted-foreground">
                    <li>
                      <span className="font-medium">Provide Accurate Information:</span> Supply truthful and accurate
                      information during registration and keep your account information updated.
                    </li>
                    <li>
                      <span className="font-medium">Maintain Account Security:</span> Safeguard your account
                      credentials, enable appropriate security features, and not share your account with others.
                    </li>
                    <li>
                      <span className="font-medium">Comply with Laws:</span> Follow all applicable laws and regulations,
                      including those related to cryptocurrencies, taxes, and financial transactions.
                    </li>
                    <li>
                      <span className="font-medium">Accept Transaction Responsibility:</span> Verify all transaction
                      details before confirming, as cryptocurrency transactions are typically irreversible.
                    </li>
                    <li>
                      <span className="font-medium">Payment Obligations:</span> Pay all applicable fees associated with
                      your use of DePay services as outlined in our Fee Schedule.
                    </li>
                    <li>
                      <span className="font-medium">Update Software:</span> Maintain updated versions of the DePay
                      application and associated software.
                    </li>
                    <li>
                      <span className="font-medium">Report Issues:</span> Promptly report any security concerns,
                      unauthorized transactions, or technical issues to our support team.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section id="prohibited" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Prohibited Activities</h2>
                <p className="text-muted-foreground">
                  You may not engage in any of the following prohibited activities:
                </p>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Prohibited Activities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Legal Compliance</TableCell>
                      <TableCell>
                        Using our services for any illegal purposes, money laundering, terrorist financing, or other
                        criminal activities
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Platform Integrity</TableCell>
                      <TableCell>
                        Attempting to hack, disrupt, or gain unauthorized access to our systems or other user accounts
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Content Restrictions</TableCell>
                      <TableCell>
                        Uploading or sharing content that is illegal, harmful, threatening, abusive, or otherwise
                        objectionable
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">System Interference</TableCell>
                      <TableCell>Using methods to stress-test, flood, or otherwise overload our systems</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Market Manipulation</TableCell>
                      <TableCell>
                        Engaging in market manipulation, price pumping, or other deceptive trading practices
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Intellectual Property</TableCell>
                      <TableCell>
                        Infringing on intellectual property rights or copying, modifying, or distributing our content
                        without permission
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm text-muted-foreground">
                  Violation of these prohibitions may result in suspension or termination of your account, legal action,
                  and/or reporting to appropriate authorities.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  DePay and its original content, features, and functionality are owned by DePay and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property
                  laws.
                </p>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our trademarks and trade dress may not be used in connection with any product or service without the
                    prior written consent of DePay.
                  </p>

                  <p className="text-muted-foreground">
                    The software powering our Service is licensed, not sold, to you. This license grants you the right
                    to use the Service for personal or business purposes, subject to these Terms.
                  </p>

                  <p className="text-muted-foreground">
                    Some components of our Service may utilize open-source software. The applicable open-source licenses
                    are available in our Licenses section.
                  </p>

                  <div className="rounded-lg border p-4">
                    <div className="space-y-3">
                      <p className="font-medium">License Grant:</p>
                      <p className="text-sm text-muted-foreground">
                        Subject to these Terms, DePay grants you a limited, non-exclusive, non-transferable,
                        revocable license to access and use the Service for your personal or internal business purposes.
                        This license does not include the right to:
                      </p>
                      <ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
                        <li>Modify or copy our materials</li>
                        <li>Use the material for any commercial purpose or public display</li>
                        <li>
                          Attempt to decompile or reverse engineer any software contained on DePay's platform
                        </li>
                        <li>Remove any copyright or other proprietary notations</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Disclaimers */}
            <section id="disclaimers" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Disclaimers</h2>
                <p className="text-muted-foreground uppercase font-medium">
                  Please read this section carefully as it limits our liability
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="service-disclaimer">
                    <AccordionTrigger>Service Disclaimers</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. DePay expressly disclaims
                          all warranties of any kind, whether express or implied, including but not limited to the
                          implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                        </p>
                        <p className="text-muted-foreground">
                          We do not guarantee that the Service will meet your requirements, be available on an
                          uninterrupted, timely, secure, or error-free basis, or that the results that may be obtained
                          from the use of the Service will be accurate or reliable.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="investment-risk">
                    <AccordionTrigger>Investment Risk Disclaimer</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          Cryptocurrency investments involve significant risk. The cryptocurrency market is highly
                          volatile, and the value of cryptocurrencies can fluctuate dramatically in a short period.
                        </p>
                        <p className="text-muted-foreground">
                          DePay is not a financial advisor, broker, or tax advisor. Any information provided on our
                          platform should not be considered financial, investment, or tax advice. Always conduct your
                          own research and consult with qualified professionals before making investment decisions.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="third-party">
                    <AccordionTrigger>Third-Party Services</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          Our Service may contain links to third-party websites, services, or resources that are not
                          owned or controlled by DePay.
                        </p>
                        <p className="text-muted-foreground">
                          We have no control over, and assume no responsibility for, the content, privacy policies, or
                          practices of any third-party websites or services. You acknowledge and agree that DePay
                          shall not be responsible or liable, directly or indirectly, for any damage or loss caused or
                          alleged to be caused by or in connection with the use of or reliance on any such content,
                          goods, or services available on or through any such websites or services.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="limitation" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Limitation of Liability</h2>
                <div className="rounded-lg border border-destructive/10 bg-destructive/5 p-4">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL DEPAY, ITS AFFILIATES, OR THEIR
                      RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR SERVICE PROVIDERS BE LIABLE FOR ANY
                      INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION,
                      LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                    </p>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li>Your access to or use of or inability to access or use the Service;</li>
                      <li>Any conduct or content of any third party on the Service;</li>
                      <li>Any content obtained from the Service; and</li>
                      <li>
                        Unauthorized access, use, or alteration of your transmissions or content, whether based on
                        warranty, contract, tort (including negligence), or any other legal theory, whether or not we
                        have been informed of the possibility of such damage.
                      </li>
                    </ul>
                    <p className="text-muted-foreground">
                      In jurisdictions where the exclusion or limitation of liability for consequential or incidental
                      damages is not allowed, our liability shall be limited to the maximum extent permitted by law.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section id="termination" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice
                  or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-muted-foreground">
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
                  account, you may simply discontinue using the Service or contact us to request account deletion.
                </p>
                <p className="text-muted-foreground">
                  The following provisions will survive termination: Intellectual Property, Disclaimers, Limitation of
                  Liability, Indemnification, Governing Law, and Dispute Resolution.
                </p>
                <p className="text-muted-foreground">
                  After account termination or deactivation, we may retain your information as necessary to comply with
                  our legal obligations, resolve disputes, enforce our agreements, and as permitted by applicable laws.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section id="governing" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed and construed in accordance with the laws of the State of California,
                  United States, without regard to its conflict of law provisions.
                </p>
                <p className="text-muted-foreground">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                  rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the
                  remaining provisions of these Terms will remain in effect.
                </p>
                <p className="text-muted-foreground">
                  Any disputes arising out of or related to these Terms or the Service shall be finally settled by
                  binding arbitration administered by the American Arbitration Association under its Commercial
                  Arbitration Rules.
                </p>
                <p className="text-muted-foreground">
                  Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court
                  of competent jurisdiction to prevent actual or threatened infringement, misappropriation, or violation
                  of a party's copyrights, trademarks, trade secrets, patents, or other intellectual property rights.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section id="changes" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will
                  provide notice of changes by posting the updated terms on this page with a new "Last Updated" date.
                </p>
                <p className="text-muted-foreground">
                  For material changes, we will make reasonable efforts to notify you, such as through a prominent
                  notice on our website or by sending you an email. Your continued use of the Service after any such
                  changes constitutes your acceptance of the new Terms.
                </p>
                <p className="text-muted-foreground">
                  If you do not agree to the new terms, you are no longer authorized to use the Service and must cease
                  using the platform immediately.
                </p>
                <p className="text-muted-foreground">
                  It is your responsibility to review these Terms periodically for changes. We recommend that you check
                  this page occasionally for any changes.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact" className="space-y-6 scroll-mt-32">
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="rounded-lg border p-4">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">Email:</span> legal@depay.com
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> Kharadi, Pune - 411014, Maharashtra, India
                    </div>
                    <div>
                      <span className="font-medium">Legal Department:</span> legal@depay.com
                    </div>
                  </div>
                </div>
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
                    <Link href="/privacy">Privacy</Link>
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
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
