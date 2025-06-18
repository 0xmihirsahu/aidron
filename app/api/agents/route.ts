import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL?.replace(/\/$/, ''); // Remove trailing slash if present
const API_KEY = process.env.API_KEY;

// GET /api/agents?agentId=...
export async function GET(request: NextRequest) {
  try {
    if (!API_BASE_URL || !API_KEY) {
      console.error('Missing API configuration:', {
        API_BASE_URL: !!API_BASE_URL,
        API_KEY: !!API_KEY,
      });
      return NextResponse.json({ error: 'API configuration is missing' }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const agentId = searchParams.get('agentId');

    // If agentId is provided, fetch specific agent
    if (agentId) {
      console.log('Fetching agent by ID:', agentId);
      const url = new URL('/agents/by-agent-id', API_BASE_URL);
      url.searchParams.set('agentId', agentId);
      console.log('Request URL:', url.toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'x-api-key': API_KEY,
          accept: '*/*',
        },
        cache: 'no-store',
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        return NextResponse.json(
          { error: errorData.error || `Failed to fetch agent: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Otherwise, fetch paginated list of agents
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';

    const url = new URL('/agents', API_BASE_URL);
    url.searchParams.set('page', page);
    url.searchParams.set('limit', limit);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        accept: '*/*',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Agents list fetch error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return NextResponse.json(
        { error: errorData.error || `Failed to fetch agents: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validate response format
    if (!data.agents || !Array.isArray(data.agents)) {
      return NextResponse.json({ error: 'Invalid response format from API' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'fetch failed') {
      return NextResponse.json(
        { error: 'Failed to connect to API server. Please try again later.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
