"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingWalletButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Button
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
      )}
      size="lg"
    >
      <Wallet className="mr-2 h-5 w-5" />
      Connect Wallet
    </Button>
  )
}
