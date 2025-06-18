'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Entropy } from '@/components/ui/entropy';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/ui/header';
import { cn } from '@/lib/utils';
import { Timeline } from '@/components/ui/timeline';
import FooterSection from '@/components/ui/footer';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Home() {
  const data = [
    {
      title: 'Q3 2025',
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
        </div>
      ),
    },
    {
      title: 'Q4 2025',
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            I usually run out of copy, but when I see content this big, I try to integrate lorem
            ipsum.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some
            more example of beautiful designs I built.
          </p>
        </div>
      ),
    },
    {
      title: 'Q1 2026',
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Deployed 5 new components on Aceternity today
          </p>
        </div>
      ),
    },
  ];
  const { connected, account } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const createUserIfNeeded = async () => {
      if (connected && account?.address) {
        try {
          await fetch('/api/users/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress: account.address }),
          });
        } catch {
          // Ignore error if user already exists (400)
        }
        router.push('/app');
      }
    };
    createUserIfNeeded();
  }, [connected, router, account]);

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
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {' '}
                Specialized AI Agents{' '}
              </span>
              in Minutes
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Bring your AI ideas to life with our SLM builder. Build and tokenize your custom model
              effortlessly. Create agents that understand your specific domain and deliver
              exceptional results.
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
          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-white font-semibold">Create Your SLM</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Build custom AI models tailored to your specific domain or use case, with no coding
                required.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-white font-semibold">Own Your Model</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Maintain full ownership and control of your AI models. Deploy them anywhere and
                monetize as you see fit.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-white font-semibold">Monetize</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Turn your domain expertise into revenue by selling access to your specialized AI
                models.
              </p>
            </div>
          </div>
          <div className="p-4 sm:p-8 rounded-xl">
            <Entropy size={300} className="sm:size-[400px]" />
          </div>
          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-white font-semibold">
                No Technical Expertise
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Our intuitive platform handles the complex technical details, letting you focus on
                your domain knowledge.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-white font-semibold">Rapid Development</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Go from concept to deployment in minutes with our streamlined SLM building process.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl text-white font-semibold">Full Support</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get comprehensive support throughout your AI journey, from model creation to
                deployment.
              </p>
            </div>
          </div>
        </div>

        <div className="w-screen pt-2 pb-8 sm:pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/0 z-10" />
          <div className="relative z-20">
            <div className="px-4 sm:pl-24 z-50 m-8 sm:m-24 max-w-4xl">
              <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Bridging AI and Human Economy with{' '}
                <span className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 bg-clip-text text-transparent">
                  $XY
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
                Where artificial intelligence meets human potential. Create, collaborate, and
                capitalize on the future of work.
              </p>
            </div>
            <Image
              src="/latest-adam-hands.svg"
              alt="AI and Human Collaboration"
              width={2400}
              height={1000}
              className="w-full z-50"
              priority
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
        <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <Timeline data={data} />
        </div>
      </div>
      <FooterSection />
    </>
  );
}
