import { NextResponse } from 'next/server';
import { validateEnv } from '@/lib/env';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;

export async function POST(request: Request) {
  try {
    validateEnv();
    const { query } = await request.json();

    if (!ACCESS_KEY) {
      return NextResponse.json(
        { error: 'Access key not configured' },
        { status: 500 }
      );
    }

    console.log('Making auth query request to:', `${API_BASE_URL}/ai/auth-query`);
    console.log('Headers:', { 'X-API-Key': ACCESS_KEY });
    console.log('Body:', { query });

    const response = await fetch(`${API_BASE_URL}/ai/auth-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ACCESS_KEY,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      });
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
} 