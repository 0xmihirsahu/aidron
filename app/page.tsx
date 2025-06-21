'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Entropy } from '@/components/ui/entropy';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Rocket, FlaskConical, Network, Coins, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/ui/header';
import { cn } from '@/lib/utils';
import { RoadmapAccordion } from '@/components/ui/roadmap-accordion';
import FooterSection from '@/components/ui/footer';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DisplayCards from '@/components/ui/display-cards';
import { formatAptosAddress } from '@/lib/utils';

const roadmapData = [
  {
    title: 'Foundation',
    date: 'Q2 2025',
    percent: 100,
    status: 'Completed' as const,
    icon: <Rocket className="text-blue-700" />,
    items: ['MVP Launch', '150 SLMs', 'Core Team'],
  },
  {
    title: 'Build No-Code Lab',
    date: 'Q3 2025',
    percent: 10,
    status: 'In Progress' as const,
    icon: <Network className="text-blue-700" />,
    items: ['No-Code Lab Launch', 'API & Social Agents', 'Early Feedback'],
  },
  {
    title: 'Network Growth',
    date: 'Q4 2025',
    percent: 0,
    status: 'In Progress' as const,
    icon: <Coins className="text-blue-700" />,
    items: ['Testnet Launch', '5K+ SLMs', '20K+ Users'],
  },
  {
    title: 'Dev Onboarding',
    date: 'Q1 2026',
    percent: 0,
    status: 'In Progress' as const,
    icon: <FlaskConical className="text-blue-700" />,
    items: ['Developer APIs Go Live', 'Host Hackathons & Grants', 'Developer Onboarding'],
  },
  {
    title: 'Mainnet Launch',
    date: 'Q2 2026',
    percent: 20,
    status: 'In Progress' as const,
    icon: <Users className="text-blue-700" />,
    items: ['Mainnet Launch', '30K+ SLMs', '500K+ Users'],
  },
  // {
  //   title: "Mixture of Agents",
  //   date: "Q3 2026",
  //   percent: 0,
  //   status: "Planned" as const,
  //   icon: <Users className="text-gray-500" />,
  //   items: [
  //     "Mixture of Experts",
  //     "50k SLMs"
  //   ]
  // }
];

export default function Home() {
  const { connected, account } = useWallet();

  useEffect(() => {
    const createUserIfNeeded = async () => {
      if (connected && account?.address) {
        try {
          await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress: formatAptosAddress(account.address) }),
          });
        } catch {
          // Ignore error if user already exists (400)
        }
        // router.push('/app');
      }
    };
    createUserIfNeeded();
  }, [connected, account]);

  return (
    <>
      <Header />
      <div className="relative min-h-screen">
        <div
          className={cn(
            'absolute inset-0 -z-10 opacity-20',
            '[background-size:60px_60px]',
            '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
            'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
          )}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

        <div className="container relative mx-auto px-4 py-12 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-8 sm:mb-12">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2">
              <Sparkles className="h-3 w-3 mr-2" />
              Launch Your Custom Specialized AI Agent
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
              Build & Deploy
              <span className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 bg-clip-text text-transparent">
                {' '}
                No-Code AI Agents{' '}
              </span>
              on Aptos
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Build 15× Cheaper with Small Language Models. Lightweight, Affordable AI tailored for
              every use case. Deploy domain-specific agents that deliver exceptional results—in just
              minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
              <Link href="/app" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 px-6 sm:px-8">
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              {/* <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 px-6 sm:px-8">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button> */}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col sm:flex-row font-inter mx-auto w-[95%] sm:w-6/8 bg-neutral-900 justify-between my-8 sm:my-12 py-6 sm:py-8 px-4 sm:px-16 rounded-[32px] sm:rounded-[55px] items-center gap-4 sm:gap-6 relative">
          <div
            className={cn(
              'absolute opacity-15 inset-0',
              '[background-size:20px_20px]',
              '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
              'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]',
              'rounded-[32px] sm:rounded-[64px]'
            )}
          />
          <div className="flex-1 space-y-4 py-2 px-1 sm:px-2 sm:py-4 sm:space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl text-white font-semibold">Create Your SLM</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Deploy Small Language Models for specific tasks — at 1/15 times of the cost of
                traditional LLMs.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl text-white font-semibold">No Coding Required </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Build and launch AI agents without any experience in coding or machine learning.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl text-white font-semibold">Own Your Model</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Maintain full ownership and control of your AI models. Deploy them anywhere and
                monetize as you see fit.
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-8 rounded-xl">
            <Entropy size={300} className="sm:size-[400px]" />
          </div>
          <div className="flex-1 space-y-4 py-2 px-2 sm:px-2 sm:py-4 sm:space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl text-white font-semibold">
                Decentralized Agent Marketplace
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Discover and monetize AI agents. Earn and own your revenue on the Aptos blockchain.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl text-white font-semibold">Rapid Development</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Go from concept to deployment in minutes with our streamlined SLM building process.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl text-white font-semibold">Full Support</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get comprehensive support throughout your AI journey, from model creation to
                deployment.
              </p>
            </div>
          </div>
        </div>

        <div className="w-screen pt-2 font-inter pb-8 sm:pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/0 z-10" />
          <div className="relative z-20">
            <div className="px-4 sm:pl-24 z-50 m-8 sm:m-24 max-w-4xl">
              <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Bridging AI and Human Economy with{' '}
                <span className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 bg-clip-text text-transparent">
                  $AGXY
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
                The native currency of decentralized AI on Aptos — create, collaborate, and
                capitalize on your agents.
              </p>
            </div>
            <Image
              src="/agenxy-cover-dark-blue.svg"
              alt="AI and Human Collaboration"
              width={2400}
              height={1000}
              className="w-full z-50"
              priority
            />
          </div>
        </div>

        {/* Featured Agents Section */}
        <div className="mb-24 mt-16 sm:mt-24 sm:mb-32 font-inter sm:p-16 p-2">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
            <DisplayCards
              cards={[
                {
                  icon: (
                    <Avatar>
                      <AvatarImage src="/agenxy-logo-black.svg" alt="Agent 1" />
                      <AvatarFallback>A1</AvatarFallback>
                    </Avatar>
                  ),
                  title: 'DocuBot',
                  description: 'Automates document analysis.',
                  date: 'Live',
                  iconClassName: 'bg-black',
                  titleClassName: 'text-black',
                },
              ]}
            />
            <DisplayCards
              cards={[
                {
                  icon: (
                    <Avatar>
                      <AvatarImage src="/agenxy-logo-white.svg" alt="Agent 2" />
                      <AvatarFallback>A2</AvatarFallback>
                    </Avatar>
                  ),
                  title: 'TradeGenie',
                  description: 'Crypto trading signals insights.',
                  date: 'Live',
                  iconClassName: 'bg-white',
                  titleClassName: 'text-black',
                },
              ]}
            />
            <DisplayCards
              cards={[
                {
                  icon: (
                    <Avatar>
                      <AvatarImage src="/agenxy-name-black.svg" alt="Agent 3" />
                      <AvatarFallback>A3</AvatarFallback>
                    </Avatar>
                  ),
                  title: 'SupportX',
                  description: '24/7 customer support.',
                  date: 'Beta',
                  iconClassName: 'bg-white',
                  titleClassName: 'text-black',
                },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row font-mono mx-auto w-[85%] sm:w-6/8 bg-gradient-to-tr from-neutral-900 via-blue-950 to-neutral-900 justify-around my-8 sm:my-12 py-24 sm:py-20 px-4 sm:px-16 rounded-[28px] sm:rounded-[50px] items-center gap-6 sm:gap-6 relative transition-colors duration-500 hover:from-blue-900 hover:via-neutral-900 hover:to-blue-950 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%),_0_2px_0_rgb(0_0_0_/_30%),_0_3px_0_rgb(0_0_0_/_20%)]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] dark:bg-black/80 mix-blend-overlay"></div>
          <div
            className={cn(
              'absolute inset-0 z-0 opacity-8',
              '[background-size:60px_85px]',
              '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
              'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
            )}
          />

          <div
            className={cn(
              'absolute opacity-5 inset-0',
              '[background-size:5px_5px]',
              '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
              'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]',
              'rounded-[32px] sm:rounded-[64px]'
            )}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-100">
              124+
            </h1>
            <h4 className="text-2xl sm:text-3xl text-neutral-300">SLMs is live</h4>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-100">
              476+
            </h1>
            <h4 className="text-2xl sm:text-3xl text-neutral-300">Users</h4>
          </div>
        </div>

        {/* Roadmap */}
        <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8 font-inter">
          <RoadmapAccordion data={roadmapData} />
        </div>
      </div>
      <FooterSection />
    </>
  );
}
