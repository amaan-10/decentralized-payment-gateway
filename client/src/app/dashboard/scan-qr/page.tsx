"use client";

import { Camera, Edit3, QrCode } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import LoaderWrapper from "@/components/loading";
import { useState } from "react";

export default function ScanQRPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">QR Code Scanner</h1>
          <p className="text-muted-foreground">
            Scan QR codes to make payments
          </p>
        </div>

        <Tabs defaultValue="scan" className="space-y-4">
          <TabsList>
            <TabsTrigger value="scan" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Scan QR
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Enter Manually
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan">
            <Card>
              <CardHeader>
                <CardTitle>Scan QR Code</CardTitle>
                <CardDescription>
                  Point your camera at a QR code to scan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* QR Scan Button */}
                  <div className="flex justify-center">
                    <div
                      onClick={() => router.push("/pay?scan-qr=true")}
                      className="group cursor-pointer relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/30 to-teal-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110"></div>

                      <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-3xl p-12 shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 group-hover:border-emerald-600/50 group-hover:bg-slate-900/90">
                        <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-500/60 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
                        <div className="absolute bottom-6 left-6 w-1 h-1 bg-teal-400/50 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>

                        <div className="absolute top-6 left-6 w-3 h-3 border-l-2 border-t-2 border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors duration-300"></div>
                        <div className="absolute bottom-6 right-6 w-3 h-3 border-r-2 border-b-2 border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors duration-300"></div>

                        <div className="flex flex-col items-center space-y-5">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-900/50 to-teal-800/50 rounded-2xl flex items-center justify-center group-hover:from-emerald-800/60 group-hover:to-teal-700/60 transition-all duration-300 shadow-lg border border-emerald-700/30 group-hover:border-emerald-600/50">
                              <div className="relative">
                                <div>
                                  <QrCode className="text-emerald-300 group-hover:text-emerald-200 rounded-[1px] transition-colors duration-300" />
                                </div>
                              </div>
                            </div>

                            <div className="absolute inset-0 rounded-2xl border border-emerald-600/30 opacity-0 group-hover:opacity-100 animate-ping"></div>
                            <div
                              className="absolute inset-0 rounded-2xl border border-emerald-500/20 opacity-0 group-hover:opacity-100 animate-ping"
                              style={{ animationDelay: "0.5s" }}
                            ></div>
                          </div>

                          <div className="text-center space-y-1">
                            <h3 className="text-xl font-medium text-slate-100 tracking-tight">
                              Scan QR Code
                            </h3>
                            <p className="text-sm text-slate-400 font-light">
                              Tap to scan
                            </p>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm shadow-emerald-400/50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Enter Payment Details</CardTitle>
                <CardDescription>
                  Manually enter payment information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex justify-center">
                    {/* Manual Payment Details Button */}
                    <div
                      onClick={() => router.push("/pay?manual=true")}
                      className="group cursor-pointer relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-700/30 to-purple-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110"></div>

                      <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-3xl p-12 shadow-2xl hover:shadow-violet-900/20 transition-all duration-500 group-hover:border-violet-600/50 group-hover:bg-slate-900/90">
                        <div className="absolute top-4 right-4 w-2 h-2 bg-violet-500/60 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
                        <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/50 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300 animate-pulse"></div>

                        <div className="absolute top-6 left-6 w-4 h-px bg-violet-500/30 group-hover:bg-violet-400/60 transition-colors duration-300"></div>
                        <div className="absolute top-8 left-6 w-3 h-px bg-violet-500/20 group-hover:bg-violet-400/40 transition-colors duration-300"></div>
                        <div className="absolute bottom-8 right-6 w-4 h-px bg-violet-500/30 group-hover:bg-violet-400/60 transition-colors duration-300"></div>
                        <div className="absolute bottom-6 right-6 w-2 h-px bg-violet-500/20 group-hover:bg-violet-400/40 transition-colors duration-300"></div>

                        <div className="flex flex-col items-center space-y-5">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-violet-900/50 to-purple-800/50 rounded-2xl flex items-center justify-center group-hover:from-violet-800/60 group-hover:to-purple-700/60 transition-all duration-300 shadow-lg border border-violet-700/30 group-hover:border-violet-600/50">
                              <div className="relative">
                                <Edit3 className="w-6 h-6 text-violet-300 group-hover:text-violet-200 transition-all duration-300 transform group-hover:rotate-3" />
                                <div className="absolute -bottom-1 -right-1 flex space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-0.5 h-0.5 bg-violet-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-0.5 h-0.5 bg-violet-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-0.5 h-0.5 bg-violet-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            <div className="absolute inset-0 rounded-2xl border border-violet-600/30 opacity-0 group-hover:opacity-100 animate-ping"></div>
                            <div
                              className="absolute inset-0 rounded-2xl border border-violet-500/20 opacity-0 group-hover:opacity-100 animate-ping"
                              style={{ animationDelay: "0.3s" }}
                            ></div>
                          </div>

                          <div className="text-center space-y-1">
                            <h3 className="text-xl font-medium text-slate-100 tracking-tight">
                              Manual Details
                            </h3>
                            <p className="text-sm text-slate-400 font-light">
                              Enter payment info
                            </p>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm shadow-violet-400/50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LoaderWrapper>
  );
}
