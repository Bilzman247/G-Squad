import { randomBytes, createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export type DerivRisk = 'low' | 'medium' | 'high';
export type DerivContract = 'rise' | 'fall';

export type StoredDerivAuth = {
  state: string;
  codeVerifier: string;
  createdAt: number;
};

export type DerivTokenData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number;
  refresh_token?: string;
  scope?: string;
};

const STATE_FILE = path.join(process.cwd(), '.data', 'deriv-auth-state.json');
const TOKEN_FILE = path.join(process.cwd(), '.data', 'deriv-tokens.json');

function ensureDataDir(): Promise<void> {
  return fs.mkdir(path.dirname(STATE_FILE), { recursive: true });
}

function base64UrlEncode(value: Buffer): string {
  return value
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function generateRandomBase64url(byteLength = 32): string {
  return base64UrlEncode(randomBytes(byteLength));
}

export function sha256Base64url(input: string): string {
  return base64UrlEncode(createHash('sha256').update(input).digest());
}

export async function saveAuthState(state: string, codeVerifier: string): Promise<void> {
  await ensureDataDir();
  const entry: StoredDerivAuth = { state, codeVerifier, createdAt: Date.now() };
  const current = await readJsonFile<Record<string, StoredDerivAuth>>(STATE_FILE, {});
  current[state] = entry;
  await fs.writeFile(STATE_FILE, JSON.stringify(current, null, 2), 'utf8');
}

export async function consumeAuthState(state: string): Promise<string | null> {
  const current = await readJsonFile<Record<string, StoredDerivAuth>>(STATE_FILE, {});
  const entry = current[state];
  if (!entry) return null;
  delete current[state];
  await fs.writeFile(STATE_FILE, JSON.stringify(current, null, 2), 'utf8');
  return entry.codeVerifier;
}

export async function saveTokenData(tokenData: DerivTokenData): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TOKEN_FILE, JSON.stringify(tokenData, null, 2), 'utf8');
}

export async function readStoredTokenData(): Promise<DerivTokenData | null> {
  try {
    const raw = await fs.readFile(TOKEN_FILE, 'utf8');
    return JSON.parse(raw) as DerivTokenData;
  } catch {
    return null;
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getDerivBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_DERIV_ENV ?? 'production';
  return env === 'preview'
    ? 'https://staging-auth.deriv.com/oauth2'
    : 'https://auth.deriv.com/oauth2';
}

export function buildDerivAuthUrl({
  state,
  codeVerifier,
  redirectUri,
  clientId,
  scopes,
}: {
  state: string;
  codeVerifier: string;
  redirectUri: string;
  clientId: string;
  scopes?: string;
}): string {
  const encodedScope = (scopes ?? process.env.NEXT_PUBLIC_DERIV_OAUTH_SCOPES ?? 'trade account_manage')
    .trim();
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: encodedScope,
    code_challenge: sha256Base64url(codeVerifier),
    code_challenge_method: 'S256',
  });
  return `${getDerivBaseUrl()}/auth?${params.toString()}`;
}

export async function exchangeCodeForTokens({
  code,
  redirectUri,
  clientId,
  codeVerifier,
}: {
  code: string;
  redirectUri: string;
  clientId: string;
  codeVerifier: string;
}): Promise<DerivTokenData> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch(`${getDerivBaseUrl()}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Deriv token exchange failed: ${response.status} ${text}`);
  }

  const tokenData = (await response.json()) as DerivTokenData;
  const normalized: DerivTokenData = {
    access_token: tokenData.access_token,
    token_type: tokenData.token_type,
    expires_in: tokenData.expires_in,
    expires_at: tokenData.expires_at ?? Math.floor(Date.now() / 1000) + tokenData.expires_in,
    refresh_token: tokenData.refresh_token,
    scope: tokenData.scope,
  };

  await saveTokenData(normalized);
  return normalized;
}

export async function getAuthStatus(): Promise<{ connected: boolean; tokenPresent: boolean }> {
  const token = await readStoredTokenData();
  return {
    connected: Boolean(token?.access_token),
    tokenPresent: Boolean(token?.access_token),
  };
}

export async function clearStoredTokens(): Promise<void> {
  try {
    await fs.unlink(TOKEN_FILE);
  } catch {
    // no-op
  }
}

export async function getDerivAccountInfo(): Promise<{ data?: Array<{ account_id: string; account_type: string }> }> {
  const token = await readStoredTokenData();
  if (!token?.access_token) {
    return { data: [] };
  }

  const response = await fetch('https://api.derivws.com/trading/v1/options/accounts', {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      'Deriv-App-ID': process.env.NEXT_PUBLIC_DERIV_APP_ID ?? '',
    },
  });

  if (!response.ok) {
    return { data: [] };
  }

  return (await response.json()) as { data?: Array<{ account_id: string; account_type: string }> };
}
