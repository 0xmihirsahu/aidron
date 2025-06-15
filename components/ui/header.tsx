'use client'

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

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
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
          <NavigationMenuItem >
              <NavigationMenuLink href="/dashboard/workshop"   className={navigationMenuTriggerStyle() }>
                AI Workshop
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/dashboard/leaderboard" className={navigationMenuTriggerStyle()}>
                Leaderboard
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/dashboard/store" className={navigationMenuTriggerStyle()}>
                SLM Store
              </NavigationMenuLink>
            </NavigationMenuItem>
            
          </NavigationMenuList>
        </NavigationMenu>

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