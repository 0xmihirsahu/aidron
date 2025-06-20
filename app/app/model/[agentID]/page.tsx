'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, MessageCircle, Share2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

const AgentPage = () => {
  const { agentID } = useParams();
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/agents?agentId=${agentID}`);

        if (!response.ok) {
          throw new Error('Failed to fetch agent');
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        // The API returns the agent directly
        setAgent(data);
      } catch (err) {
        console.error('Error fetching agent:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (agentID) {
      fetchAgent();
    }
  }, [agentID]);

  const startChat = (initialMessage?: string) => {
    if (initialMessage) {
      router.push(`/app/model/${agentID}/chat?message=${encodeURIComponent(initialMessage)}`);
    } else {
      router.push(`/app/model/${agentID}/chat`);
    }
  };

  // Share handler
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-red-500">{error || 'Agent not found'}</div>
        <Button onClick={() => router.back()} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-full p-4 max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="w-full mb-4 flex items-center justify-between">
        <Button onClick={() => router.back()} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleShare} variant="outline" size="icon" className="ml-auto">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Agent Logo */}
      <div className="mb-6">
        {agent.image_url && !isPlaceholderUrl(agent.image_url) ? (
          <Image
            src={agent.image_url}
            width={96}
            height={96}
            alt={agent.name}
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">{getRandomBotEmoji()}</span>
          </div>
        )}
      </div>

      {/* Agent Name and Description */}
      <h1 className="text-4xl font-bold mb-4 text-center">{agent.name || 'Unnamed Agent'}</h1>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground">by</span>
        <span className="font-medium">
          {agent.owner_wallet
            ? `${agent.owner_wallet.slice(0, 6)}...${agent.owner_wallet.slice(-4)}`
            : 'Unknown Owner'}
        </span>
      </div>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl">
        {agent.description || 'No description available'}
      </p>

      {/* Stats */}
      <div className="flex gap-4 mb-8">
        <Badge variant="secondary" className="px-4 py-2">
          Public
        </Badge>
        <Badge variant="secondary" className="px-4 py-2">
          {`${(agent.tokens || 0).toLocaleString()} queries`}
        </Badge>
        <Badge variant={agent.status === 'live' ? 'default' : 'secondary'} className="px-4 py-2">
          {agent.status || 'unknown'}
        </Badge>
      </div>

      <Badge variant="outline" className="mb-8">
        Web3
      </Badge>

      {/* Conversation Starters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
        {(agent.conversation_starters || []).map((starter, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => startChat(starter)}
          >
            <CardContent className="flex items-start gap-3 p-3">
              <div className="rounded-full bg-black p-2">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-base">{starter}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Input */}
      <div className="w-full mt-auto flex gap-2">
        <Input
          type="text"
          placeholder={`Message ${agent.name}...`}
          className="flex-1"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              startChat(inputMessage);
            }
          }}
        />
        <Button onClick={() => startChat(inputMessage)} disabled={!inputMessage.trim()}>
          Start Chat
        </Button>
      </div>
    </div>
  );
};

export default AgentPage;
