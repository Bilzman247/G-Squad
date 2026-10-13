import { NextResponse } from 'next/server';
import { getBotRuntimeState } from '@/lib/bot-state';

export async function GET() {
  return NextResponse.json({ ok: true, state: getBotRuntimeState() });
}
