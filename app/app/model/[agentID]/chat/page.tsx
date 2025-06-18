'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, Plus, Send, User } from 'lucide-react';
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
  <div className="flex space-x-2 p-4 bg-muted rounded-lg items-center max-w-[80%]">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-current rounded-full animate-[bounce_1.4s_infinite_.2s]"></div>
      <div className="w-2 h-2 bg-current rounded-full animate-[bounce_1.4s_infinite_.4s]"></div>
      <div className="w-2 h-2 bg-current rounded-full animate-[bounce_1.4s_infinite]"></div>
    </div>
  </div>
);

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
          throw new Error("Failed to fetch agent");
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
      const userMessage: Message = { role: "user", content };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInputMessage("");

      // Add temporary assistant message with streaming state
      const tempAssistantMessage: Message = { 
        role: "assistant", 
        content: "", 
        isStreaming: true 
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
          chat_history: newMessages
        })
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
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: streamedContent,
            isStreaming: i < words.length - 1
          };
          return updated;
        });
        // Add a small delay between words
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    } catch (err) {
      console.error('Error sending message:', err);
      // Remove the temporary message on error
      setMessages(prev => prev.slice(0, -1));
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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            {agent.image_url ? (
              <Image
                src={agent.image_url}
                alt={agent.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xl font-semibold text-muted-foreground">
                  {agent.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-lg font-semibold">{agent.name}</h1>
              <p className="text-sm text-muted-foreground">
                {`${agent.owner_wallet.slice(0, 6)}...${agent.owner_wallet.slice(-4)}`}
              </p>
            </div>
          </div>
        </div>
        <Badge variant={agent.status === 'live' ? 'default' : 'secondary'}>{agent.status}</Badge>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.isStreaming ? (
              <TypingIndicator />
            ) : (
              <div
                className={`flex items-start gap-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {message.role === 'user' ? (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                  ) : agent.image_url ? (
                    <Image
                      src={agent.image_url}
                      alt={agent.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-lg font-semibold text-muted-foreground">
                        {agent.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`rounded-lg p-4 ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}
                >
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
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            placeholder={`Message ${agent.name}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputMessage);
              }
            }}
            disabled={isSending}
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
