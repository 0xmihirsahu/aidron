'use client'

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { 
  LayoutDashboard, 
  Trophy, 
  Store, 
  FlaskConical, 
  BarChart3, 
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function SidebarNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(path)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/dashboard')}>
          <Link href="/dashboard" className="flex items-center gap-3">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/dashboard/leaderboard')}>
          <Link href="/dashboard/leaderboard" className="flex items-center gap-3">
            <Trophy className="h-4 w-4" />
            <span>Leaderboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/dashboard/store')}>
          <Link href="/dashboard/store" className="flex items-center gap-3">
            <Store className="h-4 w-4" />
            <span>SLM Store</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/dashboard/lab')}>
          <Link href="/dashboard/lab" className="flex items-center gap-3">
            <FlaskConical className="h-4 w-4" />
            <span>AI Lab</span>
            <Badge variant="secondary" className="ml-auto">Beta</Badge>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/dashboard/data-market')}>
          <Link href="/dashboard/data-market" className="flex items-center gap-3">
            <BarChart3 className="h-4 w-4" />
            <span>Data Market</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive('/dashboard/contribute')}>
          <Link href="/dashboard/contribute" className="flex items-center gap-3">
            <Users className="h-4 w-4" />
            <span>Contribute & Earn</span>
            <Badge variant="secondary" className="ml-auto">soon</Badge>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">A</span>
              </div>
              <span className="text-lg font-semibold">ASSISTERR</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-2">
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}