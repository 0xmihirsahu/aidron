import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Crown, Medal, ExternalLink, Users, DollarSign, Share2 } from "lucide-react"

// Mock data for agents
const topAgents = [
  {
    id: 1,
    name: "GPT-4 Customer Support",
    creator: "OpenAI Labs",
    treasury: "125,000",
    users: "50,234",
    socials: "15,678",
    avatar: "🤖",
    rank: 1
  },
  {
    id: 2,
    name: "Legal Document Analyzer",
    creator: "LegalTech Inc",
    treasury: "98,500",
    users: "32,156",
    socials: "8,945",
    avatar: "⚖️",
    rank: 2
  },
  {
    id: 3,
    name: "Stock Market Predictor",
    creator: "FinanceAI",
    treasury: "87,200",
    users: "28,789",
    socials: "12,334",
    avatar: "📈",
    rank: 3
  }
]

const otherAgents = [
  {
    id: 4,
    name: "Social Media Manager",
    creator: "SocialBot Co",
    treasury: "76,800",
    users: "25,432",
    socials: "18,567",
    avatar: "📱",
    rank: 4
  },
  {
    id: 5,
    name: "Code Review Assistant",
    creator: "DevTools Ltd",
    treasury: "65,400",
    users: "22,156",
    socials: "6,789",
    avatar: "💻",
    rank: 5
  },
  {
    id: 6,
    name: "Medical Diagnosis Helper",
    creator: "HealthAI",
    treasury: "58,900",
    users: "19,876",
    socials: "4,523",
    avatar: "🏥",
    rank: 6
  },
  {
    id: 7,
    name: "Language Translator",
    creator: "LinguaBot",
    treasury: "52,300",
    users: "17,654",
    socials: "9,876",
    avatar: "🌍",
    rank: 7
  },
  {
    id: 8,
    name: "Recipe Generator",
    creator: "CookingAI",
    treasury: "45,600",
    users: "15,432",
    socials: "7,234",
    avatar: "👨‍🍳",
    rank: 8
  },
  {
    id: 9,
    name: "Fitness Coach",
    creator: "FitBot Pro",
    treasury: "41,200",
    users: "13,789",
    socials: "5,678",
    avatar: "💪",
    rank: 9
  },
  {
    id: 10,
    name: "Travel Planner",
    creator: "TravelAI",
    treasury: "38,700",
    users: "12,345",
    socials: "8,901",
    avatar: "✈️",
    rank: 10
  }
]

export default function LeaderboardPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <Trophy className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "h-32"
      case 2:
        return "h-24"
      case 3:
        return "h-20"
      default:
        return "h-16"
    }
  }

  return (
    <div className="flex flex-col min-h-full p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          Top performing AI agents ranked by treasury, users, and social engagement
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-center">Top 3 Agents</h2>
        <div className="flex justify-center items-end gap-8 max-w-4xl mx-auto">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="bg-card border rounded-lg p-4 mb-4 text-center min-w-[200px]">
              <div className="flex justify-center mb-2">
                {getRankIcon(2)}
              </div>
              <div className="text-2xl mb-2">{topAgents[1].avatar}</div>
              <h3 className="font-semibold text-sm mb-1">{topAgents[1].name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{topAgents[1].creator}</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Treasury
                  </span>
                  <span className="font-medium">{topAgents[1].treasury}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Users
                  </span>
                  <span className="font-medium">{topAgents[1].users}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    Socials
                  </span>
                  <span className="font-medium">{topAgents[1].socials}</span>
                </div>
              </div>
            </div>
            <div className={`bg-gradient-to-t from-gray-300 to-gray-400 ${getPodiumHeight(2)} w-24 rounded-t-lg flex items-end justify-center pb-2`}>
              <Badge variant="secondary" className="text-xs font-bold">2nd</Badge>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="bg-card border rounded-lg p-4 mb-4 text-center min-w-[200px] ring-2 ring-yellow-500/20">
              <div className="flex justify-center mb-2">
                {getRankIcon(1)}
              </div>
              <div className="text-3xl mb-2">{topAgents[0].avatar}</div>
              <h3 className="font-semibold mb-1">{topAgents[0].name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{topAgents[0].creator}</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Treasury
                  </span>
                  <span className="font-medium">{topAgents[0].treasury}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Users
                  </span>
                  <span className="font-medium">{topAgents[0].users}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    Socials
                  </span>
                  <span className="font-medium">{topAgents[0].socials}</span>
                </div>
              </div>
            </div>
            <div className={`bg-gradient-to-t from-yellow-400 to-yellow-500 ${getPodiumHeight(1)} w-24 rounded-t-lg flex items-end justify-center pb-2`}>
              <Badge className="text-xs font-bold bg-yellow-600 hover:bg-yellow-600">1st</Badge>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="bg-card border rounded-lg p-4 mb-4 text-center min-w-[200px]">
              <div className="flex justify-center mb-2">
                {getRankIcon(3)}
              </div>
              <div className="text-2xl mb-2">{topAgents[2].avatar}</div>
              <h3 className="font-semibold text-sm mb-1">{topAgents[2].name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{topAgents[2].creator}</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Treasury
                  </span>
                  <span className="font-medium">{topAgents[2].treasury}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Users
                  </span>
                  <span className="font-medium">{topAgents[2].users}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    Socials
                  </span>
                  <span className="font-medium">{topAgents[2].socials}</span>
                </div>
              </div>
            </div>
            <div className={`bg-gradient-to-t from-amber-500 to-amber-600 ${getPodiumHeight(3)} w-24 rounded-t-lg flex items-end justify-center pb-2`}>
              <Badge variant="secondary" className="text-xs font-bold bg-amber-700 hover:bg-amber-700 text-white">3rd</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining Agents Table */}
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-xl font-semibold mb-6">All Agents</h2>
        
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 py-3 px-4 bg-muted/50 rounded-t-lg text-sm font-medium text-muted-foreground">
          <div>Rank</div>
          <div>Name</div>
          <div>Treasury</div>
          <div>Users</div>
          <div>Socials</div>
          <div>Action</div>
        </div>
        
        {/* Table Rows */}
        <div className="border border-t-0 rounded-b-lg">
          {otherAgents.map((agent, index) => (
            <div key={agent.id} className="grid grid-cols-6 gap-4 py-4 px-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">#{agent.rank}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">{agent.avatar}</span>
                <div>
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="text-xs text-muted-foreground">{agent.creator}</div>
                </div>
              </div>
              <div className="flex items-center text-sm font-medium">
                ${agent.treasury}
              </div>
              <div className="flex items-center text-sm">
                {agent.users}
              </div>
              <div className="flex items-center text-sm">
                {agent.socials}
              </div>
              <div className="flex items-center">
                <Button size="sm" variant="outline" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  Try Agent
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}