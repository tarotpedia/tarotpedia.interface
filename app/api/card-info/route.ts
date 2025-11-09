import { BASE_API_URL } from '@/lib/variables';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cardNumber = searchParams.get('card_number');

    const res = await fetch(`${BASE_API_URL}/tarot-cards/get-card-info?card_number=${cardNumber}`, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
