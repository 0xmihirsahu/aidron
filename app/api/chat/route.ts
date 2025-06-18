import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

// POST /api/chat
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agent_id, user_wallet, chat_history } = body;

    if (!agent_id || !user_wallet || !chat_history) {
      return NextResponse.json(
        { error: 'Agent ID, user wallet, and chat history are required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY!,
      },
      body: JSON.stringify({ agent_id, user_wallet, chat_history }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Chat API error:', data);
      return NextResponse.json(
        { error: data.error || 'Failed to process chat request' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 