"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronDown,
  Info,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  LogIn,
  Menu,
  Settings,
  TagIcon,
  Wallet,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "@/assets/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { BASE_URL } from "@/lib/url";

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Validate token from cookies
  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      setIsLoggedIn(false);
      setCheckingAuth(false);
      return;
    }

    fetch(`${BASE_URL}/api/auth/validate-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        Cookies.remove("authToken");
        setIsLoggedIn(false);
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    toast({
      description: "You have been logged out.",
      variant: "destructive",
      duration: 2000,
    });
  };

  const isActive = (path: string) => pathname === path;

  if (
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/privacy") ||
    pathname?.startsWith("/terms") ||
    pathname?.startsWith("/cookies") ||
    pathname?.startsWith("/licenses")
  ) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50 border-b border-blue-900/20 px-10 pt-4 pb-2">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-11">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Logo className="w-8 h-8 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl">DePay</span>
          </Link>

          <div className="flex gap-10">
            <nav className="hidden md:flex items-center gap-8">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex items-center gap-1 hover:text-white hover:font-semibold transition-colors ${
                    isActive("/features")
                      ? "text-blue-500 font-semibold"
                      : "text-gray-300"
                  }`}
                >
                  Features <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem asChild>
                    <Link href="/features/#security" className="cursor-pointer">
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Security</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/features/#speed" className="cursor-pointer">
                      <Zap className="mr-2 h-4 w-4" />
                      <span>Speed</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/features/#smart-contracts"
                      className="cursor-pointer"
                    >
                      <TagIcon className="mr-2 h-4 w-4" />
                      <span>Smart Contracts</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/pricing"
                className={`hover:text-white hover:font-semibold transition-colors ${
                  isActive("/pricing")
                    ? "text-blue-500 font-semibold"
                    : "text-gray-300"
                }`}
              >
                Pricing
              </Link>

              <Link
                href="/about"
                className={`hover:text-white hover:font-semibold transition-colors ${
                  isActive("/about")
                    ? "text-blue-500 font-semibold"
                    : "text-gray-300"
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`hover:text-white hover:font-semibold transition-colors ${
                  isActive("/contact")
                    ? "text-blue-500 font-semibold"
                    : "text-gray-300"
                }`}
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                {isLoggedIn ? (
                  <>
                    {/* <ThemeToggle /> */}
                    <Link
                      href="/dashboard"
                      className="p-2 rounded-full bg-blue-900/20 hover:bg-blue-900/40 transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/settings"
                      className="p-2 rounded-full bg-blue-900/20 hover:bg-blue-900/40 transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="hidden sm:block">
                {isLoggedIn ? (
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open mobile menu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[400px] bg-black border-l border-blue-900/30"
        >
          <div className="flex justify-between items-center mb-6">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Logo className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="font-bold text-xl">DePay</span>
            </Link>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close mobile menu</span>
            </Button> */}
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="/features"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <TagIcon className="h-5 w-5" />
              <span>Features</span>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <TagIcon className="h-5 w-5" />
              <span>Pricing</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LifeBuoy className="h-5 w-5" />
              <span>Contact</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-900/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>

            <div className="border-t border-blue-900/30 pt-4 mt-4">
              <div className="flex flex-col space-y-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-800 text-gray-300 hover:bg-blue-900/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/auth/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/auth/signup">
                    <Wallet className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
