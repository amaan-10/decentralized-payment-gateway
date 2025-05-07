/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Clock,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  MessageCircle,
  Calendar,
  CheckCircle,
  AlertCircle,
  Linkedin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    company: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("contact");
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: string; message: string; time: string }[]
  >([]);
  const [chatInput, setChatInput] = useState("");

  // Simulate chat bot initial message
  useEffect(() => {
    if (showChatWidget && chatMessages.length === 0) {
      setTimeout(() => {
        setChatMessages([
          {
            sender: "bot",
            message: "👋 Hello! How can I help you today with DePay?",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 1000);
    }
  }, [showChatWidget, chatMessages.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormStatus("submitting");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        company: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch {
      setFormStatus("error");
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = {
      sender: "user",
      message: chatInput,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! Our team will get back to you shortly.",
        "I understand your question about DePay. Let me find the best answer for you.",
        "That's a great question about our platform. Our typical transaction fees range from 0.1% to 0.5% depending on your plan.",
        "You can find more details about that in our documentation section.",
        "Would you like me to connect you with a human agent for more specific assistance?",
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          message: randomResponse,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/20 to-black text-white pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden mx-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20 animate-pulse-5s"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20 animate-pulse-5s"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              We&apos;re Here to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
                Help You
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
              Have questions or need assistance? Our team is ready to provide
              the support you need.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="py-10 mx-10">
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue="contact"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger
                value="contact"
                className="data-[state=active]:bg-blue-600"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-blue-600"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Call
              </TabsTrigger>
              <TabsTrigger
                value="visit"
                className="data-[state=active]:bg-blue-600"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Visit Us
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Contact Us
                    </h2>
                    <p className="text-gray-400">
                      Fill out the form and a member of our team will get back
                      to you within 24 hours.
                    </p>
                  </div>

                  <AnimatePresence>
                    {formStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert className="bg-green-900/20 border-green-500/50 text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <AlertTitle>Success!</AlertTitle>
                          <AlertDescription>
                            Your message has been sent successfully. We&apos;ll
                            get back to you soon.
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}

                    {formStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert className="bg-red-900/20 border-red-500/50 text-red-400">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error!</AlertTitle>
                          <AlertDescription>
                            There was a problem sending your message. Please try
                            again.
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className={`bg-blue-950/10 border-blue-900/50 focus:border-blue-500 transition-colors ${
                            formErrors.name ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`bg-blue-950/10 border-blue-900/50 focus:border-blue-500 transition-colors ${
                            formErrors.email ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+1 (123) 456-7890"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-blue-950/10 border-blue-900/50 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={handleChange}
                          className="bg-blue-950/10 border-blue-900/50 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger className="bg-blue-950/10 border-blue-900/50 focus:border-blue-500 transition-colors">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">
                            Billing Question
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership Opportunity
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        className={`min-h-[150px] bg-blue-950/10 border-blue-900/50 focus:border-blue-500 transition-colors ${
                          formErrors.message ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="bg-blue-950/10 border-blue-900/50 shadow-lg mb-8 overflow-hidden backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                          Contact Information
                        </span>
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                            <Mail className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">Email Us</p>
                            <a
                              href="mailto:amaanshaikh.gg@gmail.com"
                              className="text-blue-400 hover:underline"
                            >
                              amaanshaikh.gg@gmail.com
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                            <Phone className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">Call Us</p>
                            <a
                              href="tel:+918888888888"
                              className="text-blue-400 hover:underline"
                            >
                              +91 888 888 8888
                            </a>
                            <p className="text-sm text-gray-400 mt-1">
                              Mon-Fri, 9am-6pm IST
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                            <MapPin className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">Visit Us</p>
                            <p className="text-gray-400">
                              Kharadi
                              <br />
                              Pune, Maharashtra 411014
                              <br />
                              India
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                            <Clock className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">Business Hours</p>
                            <p className="text-gray-400">
                              Monday - Friday: 9:00 AM - 6:00 PM IST
                              <br />
                              Saturday: 10:00 AM - 2:00 PM IST
                              <br />
                              Sunday: Closed
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-blue-900/30">
                        <p className="font-medium mb-3">Connect With Us</p>
                        <div className="flex gap-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://twitter.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-900/50 transition-colors hover:scale-110 transform duration-200"
                                >
                                  <Twitter className="h-5 w-5" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Twitter</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://facebook.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-900/50 transition-colors hover:scale-110 transform duration-200"
                                >
                                  <Facebook className="h-5 w-5" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Facebook</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://instagram.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-900/50 transition-colors hover:scale-110 transform duration-200"
                                >
                                  <Instagram className="h-5 w-5" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Instagram</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://linkedin.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-900/50 transition-colors hover:scale-110 transform duration-200"
                                >
                                  <Linkedin className="h-5 w-5" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>LinkedIn</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href="https://amaans-portfolio.vercel.app/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-900/50 transition-colors hover:scale-110 transform duration-200"
                                >
                                  <Globe className="h-5 w-5" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Website</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="rounded-xl overflow-hidden border border-blue-900/50 h-[350px] bg-blue-950/10 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30259.774120523496!2d73.9253952510469!3d18.55275806871925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3c3288ba495%3A0x38e833613a63004a!2sKharadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1746619582820!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-blue-900/80 backdrop-blur-sm p-2 rounded-lg text-sm border border-blue-500/30">
                      <p className="font-medium">DePay Headquarters</p>
                      <p className="text-xs text-blue-200">
                        Kharadi, Pune, India
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <div className="max-w-2xl mx-auto">
                <Card className="bg-blue-950/10 border-blue-900/50 shadow-lg overflow-hidden backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Schedule a Call</h3>
                    <p className="text-gray-400 mb-6">
                      Book a 30-minute call with one of our specialists to
                      discuss your needs.
                    </p>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Select Department</Label>
                        <Select>
                          <SelectTrigger className="bg-blue-950/10 border-blue-900/50">
                            <SelectValue placeholder="Choose department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Sales Team</SelectItem>
                            <SelectItem value="support">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="partnership">
                              Partnership Team
                            </SelectItem>
                            <SelectItem value="billing">
                              Billing Department
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Select Date</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                            <Button
                              key={day}
                              variant="outline"
                              className="bg-blue-950/10 border-blue-900/50 hover:bg-blue-900/30"
                            >
                              <div className="text-center">
                                <div className="text-xs text-gray-400">
                                  {day}
                                </div>
                                <div>
                                  {new Date(
                                    Date.now() + i * 86400000
                                  ).getDate()}
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Select Time (IST)</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            "10:00 AM",
                            "11:30 AM",
                            "1:00 PM",
                            "2:30 PM",
                            "4:00 PM",
                            "5:30 PM",
                          ].map((time) => (
                            <Button
                              key={time}
                              variant="outline"
                              className="bg-blue-950/10 border-blue-900/50 hover:bg-blue-900/30"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="schedule-name"
                          placeholder="John Doe"
                          className="bg-blue-950/10 border-blue-900/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="schedule-email"
                          type="email"
                          placeholder="john@example.com"
                          className="bg-blue-950/10 border-blue-900/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="topic">Brief Description</Label>
                        <Textarea
                          id="topic"
                          placeholder="What would you like to discuss?"
                          className="bg-blue-950/10 border-blue-900/50"
                        />
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Schedule Call <Calendar className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="visit" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-blue-950/10 border-blue-900/50 shadow-lg overflow-hidden backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">
                        Visit Our Office
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-blue-400">
                            Pune Headquarters
                          </h4>
                          <p className="text-gray-400">
                            Kharadi
                            <br />
                            Pune, Maharashtra 411014
                            <br />
                            India
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-blue-400">
                            Getting Here
                          </h4>
                          <ul className="text-gray-400 space-y-2 mt-2">
                            <li className="flex items-start gap-2">
                              <span className="bg-blue-900/30 p-1 rounded-full mt-0.5">
                                <MapPin className="h-3 w-3 text-blue-400" />
                              </span>
                              <span>
                                23 minutes from Pune International Airport (PNQ)
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="bg-blue-900/30 p-1 rounded-full mt-0.5">
                                <MapPin className="h-3 w-3 text-blue-400" />
                              </span>
                              <span>5 minutes from Eon IT Park</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="bg-blue-900/30 p-1 rounded-full mt-0.5">
                                <MapPin className="h-3 w-3 text-blue-400" />
                              </span>
                              <span>
                                3 minutes from World Trade Center, Pune
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="bg-blue-900/30 p-1 rounded-full mt-0.5">
                                <MapPin className="h-3 w-3 text-blue-400" />
                              </span>
                              <span>Ample parking available on premises</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-blue-400">
                            Office Hours
                          </h4>
                          <p className="text-gray-400">
                            Monday - Friday: 9:00 AM - 6:00 PM IST
                            <br />
                            Saturday: 10:00 AM - 2:00 PM IST
                            <br />
                            Sunday: Closed
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-blue-400">
                            Visitor Information
                          </h4>
                          <p className="text-gray-400">
                            Please bring a valid ID for security check-in.
                            <br />
                            Appointments are recommended but not required.
                          </p>
                        </div>
                      </div>

                      <Button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Get Directions <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden border border-blue-900/50 h-[350px] bg-blue-950/10">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30259.774120523496!2d73.9253952510469!3d18.55275806871925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3c3288ba495%3A0x38e833613a63004a!2sKharadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1746619582820!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <Card className="bg-blue-950/10 border-blue-900/50 shadow-lg overflow-hidden backdrop-blur-sm">
                      <CardContent className="p-6">
                        <h4 className="font-medium text-blue-400 mb-2">
                          Virtual Tour
                        </h4>
                        <p className="text-gray-400 mb-4">
                          Can&apos;t visit in person? Take a virtual tour of our
                          office.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full border-blue-500/50 hover:bg-blue-900/30"
                        >
                          Start Virtual Tour <Globe className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-900/30 text-blue-400 hover:bg-blue-900/40 px-3 py-1 text-sm mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Find answers to the most common questions about our platform and
              services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How secure is the DePay platform?",
                  answer:
                    "DePay employs military-grade encryption, multi-signature authentication, and regular security audits to ensure the highest level of protection for your assets. We also offer optional hardware security key integration and customizable security settings.",
                },
                {
                  question: "What cryptocurrencies are supported?",
                  answer:
                    "We support a wide range of cryptocurrencies including Bitcoin, Ethereum, Solana, Polygon, Binance Smart Chain, and many more. Our platform is continuously expanding to include new tokens and chains based on user demand and thorough security assessments.",
                },
                {
                  question: "How do I get started with DePay?",
                  answer:
                    "Getting started is easy. Simply create an account, complete the verification process, and connect your existing wallet or create a new one through our platform. Once set up, you can immediately begin making transactions, exploring the dashboard features, and customizing your experience.",
                },
                {
                  question: "What are the transaction fees?",
                  answer:
                    "Our fee structure is transparent and competitive. Basic transactions start at 0.1%, with reduced rates for higher volume users and premium plan subscribers. Network fees are displayed before confirmation, and we offer fee optimization suggestions to help you save on costs.",
                },
                {
                  question: "Is customer support available 24/7?",
                  answer:
                    "We offer 24/7 support for urgent security concerns. Regular support inquiries are handled Monday through Friday, 9am-6pm IST with typical response times under 4 hours. Premium users receive priority support with dedicated account managers.",
                },
                {
                  question: "Can I use DePay for business purposes?",
                  answer:
                    "Absolutely. We offer specialized business accounts with features tailored for enterprise needs, including multi-user access, role-based permissions, enhanced reporting, and custom integration options. Contact our sales team for a personalized business solution.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-blue-950/10 border border-blue-900/50 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-blue-900/20 data-[state=open]:bg-blue-900/20 transition-colors">
                    <span className="text-left font-medium">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-10">
              <p className="text-gray-400 mb-4">
                Still have questions? We&apos;re here to help.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!showChatWidget ? (
          <Button
            onClick={() => setShowChatWidget(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg flex items-center justify-center"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-80 h-96 bg-blue-950/95 backdrop-blur-md rounded-2xl border border-blue-900/50 shadow-xl flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-blue-800 to-purple-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <h3 className="font-medium">Live Support</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowChatWidget(false)}
                className="h-6 w-6 rounded-full hover:bg-blue-700/50"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-900/40 border border-blue-800/50"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleChatSubmit}
              className="p-3 border-t border-blue-800/50 bg-blue-900/30"
            >
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-blue-950/50 border-blue-800/50"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
