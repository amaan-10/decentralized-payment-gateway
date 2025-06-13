"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

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
    <div ref={qrRef} className="flex items-center justify-center">
      <QRCodeSVG
        value={value}
        size={size}
        level={level}
        includeMargin={includeMargin}
        bgColor={bgColor}
        fgColor={fgColor}
      />
    </div>
  );
}
