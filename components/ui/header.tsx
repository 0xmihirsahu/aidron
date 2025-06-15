'use client'

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import Link from "next/link"

export function Header() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-[2400px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg">
            <Image src="/agenxy-logo-white.svg" alt="agenxy logo" width={28} height={28} />
          </div>
          <Image 
            onClick={() => router.push('/')} 
            src="/agenxy-name-black.svg" 
            alt="agenxy logo" 
            className="cursor-pointer hover:opacity-80 transition-opacity" 
            width={100} 
            height={100} 
          />
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6">
            <li>
              <Link 
                href="/dashboard/workshop" 
                className="group relative px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                AI Workshop
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/leaderboard"
                className="group relative px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                Leaderboard
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/store"
                className="group relative px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                SLM Store
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Connect Wallet Button */}
        <div className="flex items-center">
          <Button variant="default">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  )
} 