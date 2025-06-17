'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy, Crown, Medal, ExternalLink, Users, DollarSign, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function LeaderboardPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/agents?page=1&limit=20`, {
        headers: {
          'x-api-key': API_KEY,
          accept: '*/*',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }

      const data: AgentsResponse = await response.json();
      // Sort agents by tokens in descending order
      const sortedAgents = data.agents.sort((a, b) => b.tokens - a.tokens);
      setAgents(sortedAgents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return 'h-40';
      case 2:
        return 'h-32';
      case 3:
        return 'h-24';
      default:
        return 'h-16';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mb-8">{error}</div>;
  }

  const topAgents = agents.slice(0, 3);

  return (
    <div className="flex flex-col min-h-full p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">Top performing AI agents ranked by tokens</p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-center">Top 3 Agents</h2>
        <div className="flex justify-center items-end gap-8 max-w-4xl mx-auto">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <Card className="mb-4 min-w-[200px] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">{getRankIcon(2)}</div>
                <div className="text-2xl mb-2">{topAgents[1]?.image_url ? '🤖' : '🤖'}</div>
                <h3 className="font-semibold text-sm mb-1">{topAgents[1]?.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {topAgents[1]?.owner_wallet.slice(0, 6)}...{topAgents[1]?.owner_wallet.slice(-4)}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Tokens
                    </span>
                    <span className="font-medium">{topAgents[1]?.tokens}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Status
                    </span>
                    <span className="font-medium">{topAgents[1]?.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div
              className={`bg-gradient-to-t from-gray-400 via-gray-300 to-gray-200 ${getPodiumHeight(2)} w-24 rounded-t-lg flex items-end justify-center pb-2 shadow-lg relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
              <Badge
                variant="secondary"
                className="text-xs font-bold bg-gray-600 hover:bg-gray-600 text-white"
              >
                2nd
              </Badge>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <Card className="mb-4 min-w-[200px] shadow-xl hover:shadow-2xl transition-shadow duration-300 ring-2 ring-yellow-500/30">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">{getRankIcon(1)}</div>
                <div className="text-3xl mb-2">{topAgents[0]?.image_url ? '🤖' : '🤖'}</div>
                <h3 className="font-semibold mb-1">{topAgents[0]?.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {topAgents[0]?.owner_wallet.slice(0, 6)}...{topAgents[0]?.owner_wallet.slice(-4)}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Tokens
                    </span>
                    <span className="font-medium">{topAgents[0]?.tokens}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Status
                    </span>
                    <span className="font-medium">{topAgents[0]?.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div
              className={`bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-300 ${getPodiumHeight(1)} w-24 rounded-t-lg flex items-end justify-center pb-2 shadow-xl relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
              <Badge className="text-xs font-bold bg-yellow-600 hover:bg-yellow-600 text-white">
                1st
              </Badge>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <Card className="mb-4 min-w-[200px] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">{getRankIcon(3)}</div>
                <div className="text-2xl mb-2">{topAgents[2]?.image_url ? '🤖' : '🤖'}</div>
                <h3 className="font-semibold text-sm mb-1">{topAgents[2]?.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {topAgents[2]?.owner_wallet.slice(0, 6)}...{topAgents[2]?.owner_wallet.slice(-4)}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Tokens
                    </span>
                    <span className="font-medium">{topAgents[2]?.tokens}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Status
                    </span>
                    <span className="font-medium">{topAgents[2]?.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div
              className={`bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 ${getPodiumHeight(3)} w-24 rounded-t-lg flex items-end justify-center pb-2 shadow-lg relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
              <Badge
                variant="secondary"
                className="text-xs font-bold bg-amber-700 hover:bg-amber-700 text-white"
              >
                3rd
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* All Agents Table */}
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-xl font-semibold mb-6">All Agents</h2>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Tokens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent, index) => (
                <TableRow key={agent.id} className={index < 3 ? 'bg-muted/50' : ''}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {index < 3 ? getRankIcon(index + 1) : null}
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🤖</span>
                      <div>
                        <div className="font-medium text-sm">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {agent.owner_wallet.slice(0, 6)}...{agent.owner_wallet.slice(-4)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{agent.tokens}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={agent.status === 'live' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{agent.domain || 'N/A'}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/app/model/${agent.id}`)}
                      className="gap-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Try Agent
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
