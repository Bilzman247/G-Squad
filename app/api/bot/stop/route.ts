import { NextRequest, NextResponse } from 'next/server';
import { getBotRuntimeState, startBotRuntime } from '@/lib/bot-state';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const stake = Number(body.stake ?? 1);
  const risk = body.risk ?? 'medium';
  const contract = body.contract ?? 'rise';

  const state = startBotRuntime({
    stake,
    risk,
    contract,
  });

  return NextResponse.json({ ok: true, state, message: 'Bot started' });
}

export async function GET() {
  return NextResponse.json({ ok: true, state: getBotRuntimeState() });
}
