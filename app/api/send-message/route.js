import { NextResponse } from 'next/server';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request) {
  if (!DISCORD_WEBHOOK_URL) {
    console.error('DISCORD_WEBHOOK_URL is not set');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    const { content } = await request.json();

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Discord message');
    }

    return NextResponse.json({ message: 'Discord message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending Discord message:', error);
    return NextResponse.json({ message: 'Error sending Discord message' }, { status: 500 });
  }
}