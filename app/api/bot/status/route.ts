import { NextResponse } from 'next/server';
import { stopBotRuntime } from '@/lib/bot-state';

export async function POST() {
  const state = stopBotRuntime();
  return NextResponse.json({ ok: true, state, message: 'Bot stopped' });
}
