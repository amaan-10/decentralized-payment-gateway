import Link from "next/link";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Logo from "@/assets/logo";

export function Footer() {
  return (
    <footer className="bg-blue-950/20 border-t border-blue-900/30 pt-16 pb-8 px-6 sm:px-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-11">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Logo className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="font-bold text-xl">DePay</span>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              The next generation decentralized payment platform for a
              borderless financial future.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {(
                [
                  ["Twitter", Twitter],
                  ["Facebook", Facebook],
                  ["Instagram", Instagram],
                  ["GitHub", Github],
                ] as const
              ).map(([label, Icon]) => (
                <Link
                  key={label as string}
                  href={`https://${label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-800/50 transition-colors"
                >
                  <span className="sr-only">{label}</span>
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col md:items-end text-left md:text-end">
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Security", "Pricing", "API Docs"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div className="flex flex-col md:items-end text-left md:text-end">
            <h3 className="font-bold text-lg mb-4">Info</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Vision", "Values"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col md:items-end text-left md:text-end">
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Cookies", "Licenses"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="border-t border-blue-900/30 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DePay. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            {["Privacy Policy", "Terms of Service", "Cookies Settings"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
