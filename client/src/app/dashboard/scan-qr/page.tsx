"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, QrCode } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScanQRPage() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up scanner on component unmount
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanner = async () => {
    if (!scannerContainerRef.current) return;

    try {
      setScanning(true);
      setScanResult(null);

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // Success callback
          console.log(`QR Code detected: ${decodedText}`);
          setScanResult(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Error callback
          console.log(errorMessage);
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        console.log("Scanner stopped");
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setScanning(false);
  };

  const resetScanner = () => {
    setScanResult(null);
  };

  const handlePayment = () => {
    // Process payment logic would go here
    alert(`Payment of $${amount} processed successfully!`);
    setScanResult(null);
    setAmount("");
    setNote("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">QR Code Scanner</h1>
        <p className="text-muted-foreground">Scan QR codes to make payments</p>
      </div>

      <Tabs defaultValue="scan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Scan QR
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
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
              {scanResult ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="font-medium">QR Code Detected</p>
                    <p className="text-sm text-muted-foreground break-all">
                      {scanResult}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scan-amount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-muted-foreground">$</span>
                      </div>
                      <Input
                        id="scan-amount"
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scan-note">Note (Optional)</Label>
                    <Input
                      id="scan-note"
                      placeholder="What's this for?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div
                    id="qr-reader"
                    ref={scannerContainerRef}
                    className="w-full max-w-sm h-64 bg-muted/40 rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    {!scanning && (
                      <div className="text-center p-4">
                        <QrCode className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Click "Start Scanning" to begin
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 w-full flex justify-center">
                    {!scanning ? (
                      <Button onClick={startScanner}>Start Scanning</Button>
                    ) : (
                      <Button variant="destructive" onClick={stopScanner}>
                        Stop Scanning
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {scanResult ? (
                <>
                  <Button variant="outline" onClick={resetScanner}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Scan Again
                  </Button>
                  <Button onClick={handlePayment}>Process Payment</Button>
                </>
              ) : null}
            </CardFooter>
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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-id">Payment ID or Link</Label>
                <Input id="payment-id" placeholder="Enter payment ID or link" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manual-amount">Amount</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">$</span>
                  </div>
                  <Input
                    id="manual-amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manual-note">Note (Optional)</Label>
                <Input id="manual-note" placeholder="What's this for?" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Process Payment</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
