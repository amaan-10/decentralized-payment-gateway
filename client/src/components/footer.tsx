import Link from "next/link";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Logo from "@/assets/logo";

export function Footer() {
  return (
    <footer className="bg-blue-950/20 border-t border-blue-900/30 pt-16 pb-8 px-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-10 w-11">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Logo className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="font-bold text-xl">DePay</span>
            </Link>
            <p className="text-gray-400 mb-4">
              The next generation decentralized payment platform for a
              borderless financial future.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-800/50 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-800/50 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-800/50 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center hover:bg-blue-800/50 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3 text-end">
              {["Features", "Security", "Pricing", "API Docs"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-end">
            <h3 className="font-bold text-lg mb-4">Info</h3>
            <ul className="space-y-3 text-end">
              {["About", "Blog", "Vision", "Values"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {[
                "Documentation",
                "Help Center",
                "Community",
                "Tutorials",
                "Status",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          <div className="flex flex-col items-end">
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3 text-end">
              {["Privacy", "Terms", "Cookies", "Licenses"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DePay. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
