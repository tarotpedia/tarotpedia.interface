import { NextResponse } from 'next/server';
import { BASE_API_URL } from '@/utils/variables';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${BASE_API_URL}/predict/numerology-interpretations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
