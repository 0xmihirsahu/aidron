import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

// GET /api/agents?agentId=...
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const agentId = searchParams.get('agentId');

    // If agentId is provided, fetch specific agent
    if (agentId) {
      const response = await fetch(
        `${API_BASE_URL}/agents/by-agent-id?agentId=${agentId}`,
        {
          headers: {
            'x-api-key': API_KEY || '',
            accept: '*/*',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Otherwise, fetch paginated list of agents
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';

    const response = await fetch(
      `${API_BASE_URL}/agents?page=${page}&limit=${limit}`,
      {
        headers: {
          'x-api-key': API_KEY || '',
          accept: '*/*',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

export async function GETAll() {
  try {
    const response = await fetch(`${API_BASE_URL}/agents`, {
      headers: {
        'x-api-key': API_KEY || '',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
