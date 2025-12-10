import { BASE_API_URL } from '@/lib/variables';

import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const res = await fetch(`${BASE_API_URL}/readings/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Reading not found' }));
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error('Error fetching reading:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
