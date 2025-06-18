import { forwardRef } from "react";
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

const QRCodeGenerator = forwardRef<SVGSVGElement, QRCodeGeneratorProps>(
  (
    {
      value,
      size = 192,
      level,
      includeMargin = true,
      bgColor = "#ffffff",
      fgColor = "#000000",
    },
    ref
  ) => {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <QRCodeSVG
          ref={ref}
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
);

QRCodeGenerator.displayName = "QRCodeGenerator";

export default QRCodeGenerator;
