import { NextRequest, NextResponse } from 'next/server';
import {
  buildDerivAuthUrl,
  consumeAuthState,
  exchangeCodeForTokens,
  generateRandomBase64url,
  getAuthStatus,
  saveAuthState,
} from '@/lib/deriv';

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_DERIV_APP_ID;
  const redirectUri = process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI ?? 'http://localhost:3000/api/auth/callback';

  if (!clientId) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_DERIV_APP_ID env var' }, { status: 500 });
  }

  const state = generateRandomBase64url();
  const codeVerifier = generateRandomBase64url();
  await saveAuthState(state, codeVerifier);

  const authUrl = buildDerivAuthUrl({
    state,
    codeVerifier,
    redirectUri,
    clientId,
    scopes: process.env.NEXT_PUBLIC_DERIV_OAUTH_SCOPES,
  });

  return NextResponse.json({ authUrl, status: await getAuthStatus() });
}

export async function POST(req: NextRequest) {
  const { code, redirectUri, clientId } = await req.json();

  if (!code || !clientId || !redirectUri) {
    return NextResponse.json({ error: 'Missing code or redirectUri or clientId' }, { status: 400 });
  }

  const state = generateRandomBase64url();
  const codeVerifier = generateRandomBase64url();
  await saveAuthState(state, codeVerifier);

  const result = await exchangeCodeForTokens({
    code,
    redirectUri,
    clientId,
    codeVerifier,
  });

  return NextResponse.json({ ok: true, token: result });
}
