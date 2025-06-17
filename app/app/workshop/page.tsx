import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowRight, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Launch Your Custom Specialized AI Agent
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Bring your AI ideas to life with our SLM builder. Build and tokenize your custom model
          effortlessly
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tell Assisterr what to build for you..."
            className="pl-12 pr-12 h-12 text-base"
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-accent">
            Chatbot For Customer Support <ArrowRight className="ml-2 h-3 w-3" />
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-accent">
            Legal Document Analyzer <ArrowRight className="ml-2 h-3 w-3" />
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-accent">
            Stock Market Predictor <ArrowRight className="ml-2 h-3 w-3" />
          </Badge>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-accent">
            Media Content Generator <ArrowRight className="ml-2 h-3 w-3" />
          </Badge>
        </div>
      </div>

      {/* Templates Section */}
      <div className="px-6 pb-16">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Kickstart Your SLM with Pre-Built Templates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* API-based Agent */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <div className="space-y-2">
                    <div className="flex justify-center space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground flex items-center justify-center text-xs">
                        1
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground flex items-center justify-center text-xs">
                        2
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground flex items-center justify-center text-xs">
                        3
                      </div>
                    </div>
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium">
                      API
                    </div>
                    <div className="border border-muted-foreground rounded px-2 py-1 text-xs">
                      * * * * * *
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                API-based Agent <ExternalLink className="h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground">Smart agent using external APIs</p>
            </div>
          </div>

          {/* Browser Agent */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <div className="space-y-2">
                    <div className="border-2 border-muted-foreground rounded-lg p-2 bg-background">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-xs">ooo</div>
                        <div className="text-xs">ooo</div>
                      </div>
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-primary-foreground rounded"></div>
                      </div>
                    </div>
                    <div className="border border-muted-foreground rounded px-2 py-1 text-xs">
                      task
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                Browser Agent <ExternalLink className="h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground">Smart agent using browser</p>
            </div>
          </div>

          {/* Social-based Agent */}
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <div className="space-y-2">
                    <div className="flex justify-center space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground"></div>
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground"></div>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground"></div>
                      <div className="w-6 h-6 bg-primary rounded-full"></div>
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground"></div>
                    </div>
                    <div className="border border-muted-foreground rounded px-2 py-1 text-xs">
                      publish
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                Social-based Agent <ExternalLink className="h-4 w-4" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Posts and interacts on social platforms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Models Section */}
      <div className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">My models</h2>
            <span className="text-sm text-muted-foreground">6/10</span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 py-3 px-4 bg-muted/50 rounded-t-lg text-sm font-medium text-muted-foreground">
            <div>Models</div>
            <div>Type</div>
            <div>Users</div>
            <div>Treasury</div>
            <div>Socials</div>
          </div>

          {/* Table Rows */}
          <div className="border border-t-0 rounded-b-lg">
            <div className="grid grid-cols-5 gap-4 py-4 px-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center">
                  1
                </div>
                <span className="text-sm">🔥</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-dashed border-muted-foreground"></div>
                <span className="text-sm">Draft</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>👥</span>
                <span>0</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>💰</span>
                <span>0 $ASRR</span>
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <span className="text-lg">⋮</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 py-4 px-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center">
                  1
                </div>
                <span className="text-sm">🔥</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-dashed border-muted-foreground"></div>
                <span className="text-sm">Draft</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>👥</span>
                <span>0</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span>💰</span>
                <span>0 $ASRR</span>
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <span className="text-lg">⋮</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
