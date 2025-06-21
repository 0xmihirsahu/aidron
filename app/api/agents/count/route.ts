import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL?.replace(/\/$/, ''); // Remove trailing slash if present
const API_KEY = process.env.API_KEY;

// GET /api/agents/count
export async function GET() {
  try {
    if (!API_BASE_URL || !API_KEY) {
      console.error('Missing API configuration:', {
        API_BASE_URL: !!API_BASE_URL,
        API_KEY: !!API_KEY,
      });
      return NextResponse.json({ error: 'API configuration is missing' }, { status: 500 });
    }

    const url = new URL('/agents/count', API_BASE_URL);

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
      console.error('Agents count fetch error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return NextResponse.json(
        { error: errorData.error || `Failed to fetch agents count: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
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