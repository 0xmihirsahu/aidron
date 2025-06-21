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
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { getRandomBotEmoji, isPlaceholderUrl } from '@/lib/utils';

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
  total: string;
  agents: Agent[];
}

interface CountResponse {
  count?: string | number;
  total?: string | number;
  [key: string]: unknown; // Allow any other properties
}

// Categories based on domains
const categories = [
  { id: 'web3', label: 'Web3', icon: '🌐' },
  { id: 'defi', label: 'DeFi', icon: '💎' },
  { id: 'crypto', label: 'Crypto', icon: '₿' },
  { id: 'tax', label: 'Tax', icon: '📊' },
  { id: 'support', label: 'Support', icon: '🎯' },
];

const AGENTS_PER_PAGE = 20;

export default function StorePage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchAgentsCount = async () => {
    try {
      const response = await fetch('/api/agents/count');
      
      if (!response.ok) {
        throw new Error('Failed to fetch agents count');
      }

      const data: CountResponse = await response.json();
      
      // Handle different possible response formats
      let count = 0;
      if (typeof data.count === 'string') {
        count = parseInt(data.count);
      } else if (typeof data.count === 'number') {
        count = data.count;
      } else if (typeof data.total === 'string') {
        count = parseInt(data.total);
      } else if (typeof data.total === 'number') {
        count = data.total;
      } else if (typeof data === 'number') {
        count = data;
      } else if (typeof data === 'string') {
        count = parseInt(data);
      }
      
      if (isNaN(count) || count < 0) {
        console.error('Invalid count value:', count);
        return; // Don't set invalid values
      }
      
      setTotalCount(count);
      const pages = Math.ceil(count / AGENTS_PER_PAGE);
      setTotalPages(pages);
    } catch (err) {
      console.error('Error fetching agents count:', err);
      // If count fetch fails, we'll still try to fetch agents and calculate pages from the response
    }
  };

  const fetchAgents = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const url = `/api/agents?page=${page}&limit=${AGENTS_PER_PAGE}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }

      const data: AgentsResponse = await response.json();
      setAgents(data.agents);
      
      // Only use the total from the agents response if we don't have a valid count from the count API
      // Since the external API doesn't return total, we'll rely on the count API
      if ((totalCount === 0 || isNaN(totalCount)) && data.total) {
        const total = parseInt(data.total);
        if (!isNaN(total) && total > 0) {
          setTotalCount(total);
          const pages = Math.ceil(total / AGENTS_PER_PAGE);
          setTotalPages(pages);
        }
      }
      
      // If we still don't have a valid count, try to fetch it again
      if (totalCount === 0 || isNaN(totalCount)) {
        await fetchAgentsCount();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    // First fetch the count, then fetch agents
    const initializeData = async () => {
      await fetchAgentsCount();
      await fetchAgents(currentPage);
    };
    
    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Fetch agents whenever currentPage changes (including page 1)
    fetchAgents(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((p) => p - 1);
            }
          }}
          className={cn(
            currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-accent',
            'transition-colors'
          )}
        />
      </PaginationItem>
    );

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page with ellipsis
    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink
            onClick={() => {
              setCurrentPage(1);
            }}
            isActive={currentPage === 1}
            className="cursor-pointer hover:bg-accent transition-colors"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      if (i === 1 && startPage > 1) continue; // Skip if already added
      
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => {
              setCurrentPage(i);
            }}
            isActive={currentPage === i}
            className="cursor-pointer hover:bg-accent transition-colors"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page with ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => {
              setCurrentPage(totalPages);
            }}
            isActive={currentPage === totalPages}
            className="cursor-pointer hover:bg-accent transition-colors"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage((p) => p + 1);
            }
          }}
          className={cn(
            currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-accent',
            'transition-colors'
          )}
        />
      </PaginationItem>
    );

    return items;
  };

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
                  onClick={() => router.push(`/app/model/${agent.id}`)}
                  className="group bg-gradient-to-tr from-neutral-100 via-neutral-100 to-neutral-200 z-20 hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] hover:border-primary/20"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        {agent.image_url && !isPlaceholderUrl(agent.image_url) ? (
                          <Image
                            src={agent.image_url}
                            alt={agent.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          getRandomBotEmoji()
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
            <div className="mt-12 relative z-10">
              {/* Show pagination when we have agents and more than 1 page, or when we have a valid total count */}
              {(totalPages > 1 || (totalCount > 0 && agents.length > 0)) && (
                <>
                  <div className="text-center mb-4 text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages} • {totalCount} total agents
                  </div>
                  <Pagination>
                    <PaginationContent>
                      {getPaginationItems()}
                    </PaginationContent>
                  </Pagination>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
