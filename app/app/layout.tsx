'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Store, FlaskConical, BarChart3, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSidebar, SidebarProvider } from '@/components/ui/sidebar';
import Image from 'next/image';
import { WalletSelector } from '@/components/wallet-selector';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useEffect, useState } from 'react';

function SidebarNavContent() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const router = useRouter();
  const [tokens, setTokens] = useState<number | null>(null);
  const API_BASE_URL = 'http://139.84.174.91:4200';
  const API_KEY = 'pt8B9ghR5cIsIn16';
  const { account, connected } = useWallet();

  useEffect(() => {
    const fetchTokens = async () => {
      if (connected && account?.address) {
        try {
          const res = await fetch(
            `${API_BASE_URL}/users?walletAddress=${account?.address?.toString()}`,
            {
              headers: { 'x-api-key': API_KEY },
            }
          );
          if (res.ok) {
            const data = await res.json();
            setTokens(data.tokens);
          } else {
            setTokens(null);
          }
        } catch {
          setTokens(null);
        }
      } else {
        setTokens(null);
      }
    };
    fetchTokens();
  }, [connected, account]);

  const isActive = (path: string) => {
    if (path === '/app') {
      return pathname === '/app';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lgtext-primary-foreground">
            <Image src="/symbol-black.svg" alt="agenxy logo" width={32} height={32} />
          </div>
          {open && (
            <Image
              onClick={() => router.push('/')}
              src="/agenxy-name-black.svg"
              alt="agenxy logo"
              className="cursor-pointer"
              width={100}
              height={100}
            />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/app/store')}>
              <Link href="/app/store" className="flex items-center gap-3">
                <Store className="h-4 w-4" />
                <span>SLM Store</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/app/leaderboard')}>
              <Link href="/app/leaderboard" className="flex items-center gap-3">
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/app/workshop')}>
              <Link href="/app/workshop" className="flex items-center gap-3">
                <FlaskConical className="h-4 w-4" />
                <span>AI Workshop</span>
                <Badge variant="secondary" className="ml-auto">
                  Private Alpha
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/app/data-market')}>
              <Link href={pathname} className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4" />
                <span>Data Market</span>
                <Badge variant="secondary" className="ml-auto">
                  Soon
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/app/contribute')}>
              <Link href={pathname} className="flex items-center gap-3">
                <Users className="h-4 w-4" />
                <span>Contribute & Earn</span>
                <Badge variant="secondary" className="ml-auto">
                  Soon
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {connected && tokens !== null && (
          <div className="flex items-center justify-center px-4 py-2 text-xs text-muted-foreground">
            <span className="font-semibold text-primary">{`${tokens} $AGXY`}</span>
          </div>
        )}
        <WalletSelector />
      </SidebarFooter>
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarNavContent />
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
