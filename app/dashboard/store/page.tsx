import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, User } from "lucide-react"

// Mock data for SLM models
const categories = [
  { id: "web3", label: "Web3", icon: "🌐" },
  { id: "healthcare", label: "Healthcare", icon: "🏥" },
  { id: "software", label: "Software", icon: "💻" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "crypto", label: "Crypto", icon: "₿" },
  { id: "media", label: "Media", icon: "📺" },
  { id: "fun", label: "Fun", icon: "🎮" }
]

const models = [
  {
    id: 1,
    name: "Jupiter Assistant",
    description: "Jupiter Assistant is a SLM that help users develop their solutions using Jupiter, one of the largest decentralized trading platform.",
    category: "web3",
    author: "FearlessHawk29834",
    avatar: "🌊",
    authorAvatar: "👤",
    plays: "2168.1k"
  },
  {
    id: 2,
    name: "Metis Assistant",
    description: "Metis Assistant is an advanced SLM that offers expert guidance for developing solutions using Metis.",
    category: "web3",
    author: "HawkStrong49194",
    avatar: "🔱",
    authorAvatar: "👤",
    plays: "1839.6k"
  },
  {
    id: 3,
    name: "Particle Network Assistant",
    description: "Specialized assistant for Particle Network development and integration solutions.",
    category: "web3",
    author: "DevMaster2024",
    avatar: "⚛️",
    authorAvatar: "👤",
    plays: "1245.3k"
  },
  {
    id: 4,
    name: "OG Assistant",
    description: "Original gangster assistant for blockchain development and DeFi protocols.",
    category: "web3",
    author: "BlockchainPro",
    avatar: "👑",
    authorAvatar: "👤",
    plays: "987.2k"
  },
  {
    id: 5,
    name: "Medical Diagnosis Helper",
    description: "Advanced AI assistant for medical diagnosis support and healthcare guidance.",
    category: "healthcare",
    author: "HealthTech",
    avatar: "🩺",
    authorAvatar: "👤",
    plays: "2456.7k"
  },
  {
    id: 6,
    name: "Code Review Assistant",
    description: "Intelligent code review and optimization assistant for software development.",
    category: "software",
    author: "CodeMaster",
    avatar: "🔍",
    authorAvatar: "👤",
    plays: "3124.5k"
  }
]

export default function StorePage() {
  return (
    <div className="flex flex-col min-h-full p-6">
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

      {/* Web3 Section */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌐</span>
            <h2 className="text-2xl font-semibold">Web3</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Focused on developers and enthusiasts who are building Web3.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((model) => (
            <Card key={model.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                    {model.avatar}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{model.name}</CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {model.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-muted-foreground">{model.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-medium">{model.plays}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Models
          </Button>
        </div>
      </div>
    </div>
  )
}