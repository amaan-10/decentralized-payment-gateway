"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Logo from "@/assets/logo";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
  bgColor?: string;
  fgColor?: string;
}

export default function QRCodeGenerator({
  value,
  size = 192,
  level = "L",
  includeMargin = true,
  bgColor = "#ffffff",
  fgColor = "#000000",
}: QRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={qrRef}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <QRCodeSVG
        value={value}
        size={size}
        level={level}
        includeMargin={includeMargin}
        bgColor={bgColor}
        fgColor={fgColor}
      />
      <div
        className="absolute flex items-center justify-center rounded-full bg-black shadow-xl"
        style={{
          width: size * 0.25,
          height: size * 0.25,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Logo className="w-7 h-7 text-white" />
      </div>
    </div>
  );
}
