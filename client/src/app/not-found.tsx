"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo";

export default function NotFoundPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-14 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>
      </div>

      <div className="w-full max-w-md z-10 mt-10 text-center">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Logo className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="font-bold text-2xl">DePay</span>
          </Link>
        </div>

        <div
          className="relative mb-8"
          style={{
            transform: `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            404
          </div>
          <div className="absolute inset-0 text-9xl font-bold text-blue-500/10 blur-xl">
            404
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-blue-800 text-blue-400 hover:bg-blue-900/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500/10 rounded-full"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
