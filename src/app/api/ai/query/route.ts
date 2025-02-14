import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query, department } = await request.json();
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

    if (!apiKey) {
      throw new Error('API key not configured');
    }

    if (!authHeader) {
      throw new Error('No authorization token provided');
    }

    console.log('Forwarding request with headers:', {
      Authorization: authHeader,
      'X-API-Key': apiKey,
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ query, department }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Backend error:', error);
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 401 }
    );
  }
} 