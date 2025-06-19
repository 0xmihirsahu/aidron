import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL?.replace(/\/$/, ''); // Remove trailing slash if present
const API_KEY = process.env.API_KEY;

// POST /api/chat
export async function POST(request: Request) {
  try {
    if (!API_BASE_URL || !API_KEY) {
      return NextResponse.json({ error: 'API configuration is missing' }, { status: 500 });
    }

    const body = await request.json();
    const { agent_id, user_wallet, chat_history } = body;

    if (!agent_id || !user_wallet || !chat_history) {
      return NextResponse.json(
        { error: 'Agent ID, user wallet, and chat history are required' },
        { status: 400 }
      );
    }

    const url = new URL('/chat', API_BASE_URL);
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        accept: '*/*',
      },
      body: JSON.stringify({ agent_id, user_wallet, chat_history }),
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: data.error || 'Failed to process chat request',
          details: data.details || null,
          status: res.status,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to process chat request',
        details: error instanceof Error ? error.stack : null,
      },
      { status: 500 }
    );
  }
}
