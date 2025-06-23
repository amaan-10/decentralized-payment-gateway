"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  Bell,
  History,
  Home,
  LogOut,
  Menu,
  QrCode,
  Settings,
  User,
  Wallet,
  X,
} from "lucide-react";
import Logo from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "My Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Send & Receive",
    href: "/dashboard/transfer",
    icon: ArrowLeftRight,
  },
  {
    title: "Scan QR",
    href: "/dashboard/scan-qr",
    icon: QrCode,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: History,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background px-12">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-none">
            <div className="flex h-full flex-col">
              <div className="flex items-center border-b px-2 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Logo className="h-6 w-6" />
                  <span>DePay</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="grid gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "transparent"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t p-4">
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <Logo className="h-7 w-7" />
          <span className="hidden md:inline-block font-bold text-xl">
            DePay
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block pl-4">
          <nav className="grid gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6 mr-8">{children}</main>
      </div>
    </div>
  );
}
