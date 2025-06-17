"use client";

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

// API configuration
const API_BASE_URL = "http://139.84.174.91:4200";
const API_KEY = "pt8B9ghR5cIsIn16";

// Types
interface Agent {
  id: string;
  name: string;
  description: string;
  image_url: string;
  tokens: number;
  status: "building" | "live";
  domain: string | null;
  conversation_starters: string[];
  owner_wallet: string;
}

const Agent = () => {
  const { agentID } = useParams()
  const router = useRouter()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${API_BASE_URL}/agents/by-agent-id?agentId=${agentID}`,
          {
            headers: {
              "x-api-key": API_KEY,
              "accept": "*/*"
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch agent")
        }

        const data = await response.json()
        setAgent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (agentID) {
      fetchAgent()
    }
  }, [agentID])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !agent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-red-500">{error || "Agent not found"}</div>
        <Button onClick={() => router.back()} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full p-6">
      {/* Header */}
      <div className="mb-8">
        <Button onClick={() => router.back()} variant="ghost" className="gap-2 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Leaderboard
        </Button>
        <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
        <p className="text-muted-foreground">
          {agent.description}
        </p>
      </div>

      {/* Agent Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {/* Main Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Agent Details</h2>
              <Badge variant={agent.status === "live" ? "default" : "secondary"}>
                {agent.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Owner</span>
                <span className="font-medium">{agent.owner_wallet}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tokens</span>
                <span className="font-medium">{agent.tokens}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Domain</span>
                <span className="font-medium">{agent.domain || "N/A"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversation Starters Card */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Conversation Starters</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {agent.conversation_starters.map((starter, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                  {starter}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Agent