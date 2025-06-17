'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// API configuration
const API_BASE_URL = 'http://139.84.174.91:4200';
const API_KEY = 'pt8B9ghR5cIsIn16';

// Types
interface Agent {
  id: string;
  name: string;
  description: string;
  image_url: string;
  tokens: number;
  status: 'building' | 'live';
  domain: string | null;
  conversation_starters: string[];
  owner_wallet: string;
}

interface AgentsResponse {
  page: string;
  limit: string;
  agents: Agent[];
}

// Categories based on domains
const categories = [
  { id: 'web3', label: 'Web3', icon: '🌐' },
  { id: 'defi', label: 'DeFi', icon: '💎' },
  { id: 'crypto', label: 'Crypto', icon: '₿' },
  { id: 'tax', label: 'Tax', icon: '📊' },
  { id: 'support', label: 'Support', icon: '🎯' },
];

export default function StorePage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAgents = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/agents?page=${page}&limit=20`, {
        headers: {
          'x-api-key': API_KEY,
          accept: '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }

      const data: AgentsResponse = await response.json();
      setAgents(data.agents);
      // Assuming 20 items per page, calculate total pages
      setTotalPages(Math.ceil(parseInt(data.limit) / 20));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-full p-6 relative">
      {/* <div
            className={cn(
              "absolute inset-0 z-0 opacity-15",
              "[background-size:20px_20px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
              "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            )}
          /> */}
      <div
        className={cn(
          'absolute opacity-10 inset-0',
          '[background-size:5px_5px]',
          '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
          'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]',
          'rounded-[32px] sm:rounded-[64px]'
        )}
      />
      {/* Header */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center">
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">Explore the SLM Store</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover a wide range of Small Language Models, carefully curated for your specific needs
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant="outline"
            className="px-4 py-2 cursor-pointer hover:bg-accent text-sm font-medium"
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </Badge>
        ))}
      </div>

      {/* Models Grid */}
      <div className="max-w-6xl mx-auto w-full">
        {error ? (
          <div className="text-center text-red-500 mb-8">{error}</div>
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <Card
                  key={agent.id}
                  className="group bg-gradient-to-tr from-neutral-100 via-neutral-100 to-neutral-200 z-20 hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] hover:border-primary/20"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        {agent.image_url ? (
                          <Image
                            src={agent.image_url}
                            alt={agent.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          '🤖'
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
                          <Badge
                            variant={agent.status === 'live' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {agent.status === 'live' ? 'Live' : 'Building'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {agent.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium">
                          {agent.owner_wallet.slice(0, 6)}...{agent.owner_wallet.slice(-4)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {agent.tokens} $AGXY
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage((p) => p - 1);
                        }
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                          setCurrentPage((p) => p + 1);
                        }
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
