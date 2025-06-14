import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { 
  LayoutDashboard, 
  Zap, 
  Trophy, 
  Store, 
  FlaskConical, 
  BarChart3, 
  Coins, 
  Users,
  PanelLeftClose
} from "lucide-react"

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
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/dashboard" className="flex items-center gap-3">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/airdrop" className="flex items-center gap-3">
                    <Zap className="h-4 w-4" />
                    <span>Airdrop</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/leaderboard" className="flex items-center gap-3">
                    <Trophy className="h-4 w-4" />
                    <span>Leaderboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/slm-store" className="flex items-center gap-3">
                    <Store className="h-4 w-4" />
                    <span>SLM Store</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/ai-lab" className="flex items-center gap-3">
                    <FlaskConical className="h-4 w-4" />
                    <span>AI Lab</span>
                    <Badge variant="secondary" className="ml-auto">Beta</Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/data-market" className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4" />
                    <span>Data Market</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/tokenization-hub" className="flex items-center gap-3">
                    <Coins className="h-4 w-4" />
                    <span>Tokenization Hub</span>
                    <Badge variant="secondary" className="ml-auto">soon</Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/contribute" className="flex items-center gap-3">
                    <Users className="h-4 w-4" />
                    <span>Contribute & Earn</span>
                    <Badge variant="secondary" className="ml-auto">soon</Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
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