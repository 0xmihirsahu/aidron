import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

// GET /api/agents?agentId=...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');

    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }

    const res = await fetch(`${API_BASE_URL}/agents/by-agent-id?agentId=${agentId}`, {
      headers: { 'x-api-key': API_KEY!, accept: '*/*' },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch agent');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 });
  }
}
