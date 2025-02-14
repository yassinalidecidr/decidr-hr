import { NextResponse } from 'next/server';
import type { RegisterCredentials } from '@/types/user';

export async function POST(request: Request) {
  try {
    const credentials: RegisterCredentials = await request.json();

    // TODO: Add your registration logic here
    // This is a placeholder response
    const user = {
      id: '1',
      email: credentials.email,
      name: credentials.name,
      createdAt: new Date(),
    };

    return NextResponse.json(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 400 }
    );
  }
} 