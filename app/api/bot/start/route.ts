import { NextRequest, NextResponse } from 'next/server';
import {
  consumeAuthState,
  exchangeCodeForTokens,
  getDerivBaseUrl,
} from '@/lib/deriv';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const clientId = process.env.NEXT_PUBLIC_DERIV_APP_ID;
  const redirectUri = process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI ?? 'http://localhost:3000/api/auth/callback';

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code || !state || !clientId) {
    return NextResponse.json({ error: 'Missing OAuth callback values' }, { status: 400 });
  }

  const codeVerifier = await consumeAuthState(state);
  if (!codeVerifier) {
    return NextResponse.json({ error: 'Invalid or expired OAuth state' }, { status: 400 });
  }

  try {
    const token = await exchangeCodeForTokens({
      code,
      redirectUri,
      clientId,
      codeVerifier,
    });

    const redirectUrl = new URL('/', req.url);
    redirectUrl.searchParams.set('auth', 'success');
    return NextResponse.redirect(redirectUrl.toString());
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown auth error' },
      { status: 500 }
    );
  }
}
