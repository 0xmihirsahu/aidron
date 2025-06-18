'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, Plus, Send, User, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

// Types
interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

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

const TypingIndicator = () => (
  <div className="flex space-x-2 p-3 bg-muted/50 rounded-lg items-center max-w-[80%]">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-current rounded-full animate-[bounce_1.4s_infinite_.2s]"></div>
      <div className="w-2 h-2 bg-current rounded-full animate-[bounce_1.4s_infinite_.4s]"></div>
      <div className="w-2 h-2 bg-current rounded-full animate-[bounce_1.4s_infinite]"></div>
    </div>
  </div>
);

const MessageCopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
      onClick={copyToClipboard}
    >
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3 text-muted-foreground" />
      )}
    </Button>
  );
};

const ChatPage = () => {
  const { agentID } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { account } = useWallet();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchAgentAndInitialize = async () => {
      try {
        const response = await fetch(`/api/agents?agentId=${agentID}`);

        if (!response.ok) {
          throw new Error('Failed to fetch agent');
        }

        const data = await response.json();
        setAgent(data);
      } catch (err) {
        console.error('Error fetching agent:', err);
      }
    };

    if (agentID) {
      fetchAgentAndInitialize();
    }
  }, [agentID]);

  // Separate useEffect for handling initial message
  useEffect(() => {
    const initialMessage = searchParams.get('message');
    if (initialMessage && agent && messages.length === 0) {
      console.log('Sending initial message:', decodeURIComponent(initialMessage));
      sendMessage(decodeURIComponent(initialMessage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent, searchParams, messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !agent || !account?.address) return;

    try {
      setIsSending(true);
      console.log('Sending message:', content);

      // Add user message to chat
      const userMessage: Message = { role: 'user', content };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInputMessage('');

      // Add temporary assistant message with streaming state
      const tempAssistantMessage: Message = {
        role: 'assistant',
        content: '',
        isStreaming: true,
      };
      setMessages([...newMessages, tempAssistantMessage]);

      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: agent.id,
          user_wallet: account.address.toString(),
          chat_history: newMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Chat API error:', errorData);
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      console.log('Received response:', data.response);

      // Simulate streaming for demo (in production, use actual streaming endpoint)
      const words = data.response.split(' ');
      let streamedContent = '';

      for (let i = 0; i < words.length; i++) {
        streamedContent += (i > 0 ? ' ' : '') + words[i];
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: streamedContent,
            isStreaming: i < words.length - 1,
          };
          return updated;
        });
        // Add a small delay between words
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    } catch (err) {
      console.error('Error sending message:', err);
      // Remove the temporary message on error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsSending(false);
    }
  };

  if (!agent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            {agent?.image_url ? (
              <Image
                src={agent.image_url}
                alt={agent.name}
                width={36}
                height={36}
                className="rounded-full ring-2 ring-muted"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center ring-2 ring-muted">
                <span className="text-lg font-semibold text-muted-foreground">
                  {agent?.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-base font-medium leading-none">{agent?.name}</h1>
              <p className="text-xs text-muted-foreground mt-1">
                {`${agent?.owner_wallet.slice(0, 6)}...${agent?.owner_wallet.slice(-4)}`}
              </p>
            </div>
          </div>
        </div>
        <Badge variant={agent?.status === 'live' ? 'default' : 'secondary'}>{agent?.status}</Badge>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start justify-${
              message.role === 'user' ? 'end' : 'start'
            } gap-2 max-w-4xl mx-auto w-full`}
          >
            {message.isStreaming ? (
              <TypingIndicator />
            ) : (
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  {message.role === 'user' ? (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  ) : agent?.image_url ? (
                    <Image
                      src={agent.image_url}
                      alt={agent.name}
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-muted"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ring-2 ring-muted">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {agent?.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`rounded-2xl px-4 py-2.5 relative group ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted/50'
                  }`}
                >
                  {message.role === 'assistant' && <MessageCopyButton content={message.content} />}
                  <ReactMarkdown
                    components={{
                      strong: (props) => <span className="font-bold text-foreground" {...props} />,
                      ul: (props) => <ul className="list-disc space-y-1 ml-4" {...props} />,
                      ol: (props) => <ol className="list-decimal space-y-1 ml-4" {...props} />,
                      li: (props) => <li className="leading-relaxed" {...props} />,
                      p: (props) => (
                        <p
                          className="whitespace-pre-wrap leading-relaxed mb-4 last:mb-0"
                          {...props}
                        />
                      ),
                      a: (props) => (
                        <a
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      ),
                      code: (props) => (
                        <code className="bg-muted/50 rounded px-1 py-0.5" {...props} />
                      ),
                      pre: (props) => (
                        <pre className="bg-muted/50 rounded p-2 overflow-x-auto my-2" {...props} />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Button variant="outline" size="icon" className="shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            placeholder={`Message ${agent?.name}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputMessage);
              }
            }}
            disabled={isSending}
            className="min-h-10"
          />
          <Button
            onClick={() => sendMessage(inputMessage)}
            disabled={isSending || !inputMessage.trim()}
            size="icon"
            className="shrink-0"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
