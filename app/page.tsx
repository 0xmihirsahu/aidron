import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Entropy } from "@/components/ui/entropy";
import { ArrowRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/ui/header";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
    <Header />
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="container relative mx-auto px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto mb-12">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Sparkles className="h-3 w-3 mr-2" />
            Launch Your Custom Specialized AI Agent
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Build & Deploy
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Specialized AI Agents </span>
            in Minutes
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Bring your AI ideas to life with our SLM builder. Build and tokenize your custom model effortlessly. 
            Create agents that understand your specific domain and deliver exceptional results.
          </p>
          <Image src="/image.png" alt="Hero" width={1500} height={1000} />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 px-8">
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2 px-8">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="flex font-inter font-stretch-expanded bg-neutral-900 justify-between my-48 p-8 px-12 rounded-4xl items-center gap-8">
        <div
        className={cn(
          "absolute opacity-10 inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
        <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl text-white font-semibold">Create Your SLM</h3>
              <p className="text-muted-foreground">Build custom AI models tailored to your specific domain or use case, with no coding required.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl text-white font-semibold">Own Your Model</h3>
              <p className="text-muted-foreground">Maintain full ownership and control of your AI models. Deploy them anywhere and monetize as you see fit.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl text-white font-semibold">Monetize</h3>
              <p className="text-muted-foreground">Turn your domain expertise into revenue by selling access to your specialized AI models.</p>
            </div>
          </div>
          <div className="p-8 rounded-xl">
            <Entropy size={400}/>
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl text-white font-semibold">No Technical Expertise</h3>
              <p className="text-muted-foreground">Our intuitive platform handles the complex technical details, letting you focus on your domain knowledge.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl text-white font-semibold">Rapid Development</h3>
              <p className="text-muted-foreground">Go from concept to deployment in minutes with our streamlined SLM building process.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl text-white font-semibold">Full Support</h3>
              <p className="text-muted-foreground">Get comprehensive support throughout your AI journey, from model creation to deployment.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}