# G-Squad Deriv OAuth & WebSocket Setup

This repo now contains the Deriv OAuth and WebSocket integration directly at the project root, without the `deriv-backup` folder prefix.

## Environment

- App ID: `33E1sj7WNaMsjg5MAxPyS`
- Redirect URI: `https://g-squad.buzz`
- OAuth scopes: `trade,account_manage`
- Environment: `production`

## Core auth modules

- `core/src/auth/oauth.ts`
- `core/src/auth/accounts.ts`
- `core/src/auth/storage.ts`
- `core/src/auth/crypto.ts`
- `core/src/config/urls.ts`
- `core/src/react/useDerivWS.ts`
- `core/src/ws/deriv-ws.ts`

## Quick usage

```ts
import { initiateLogin } from './core/src/auth/oauth';

await initiateLogin({
  clientId: process.env.NEXT_PUBLIC_DERIV_APP_ID!,
  redirectUri: process.env.NEXT_PUBLIC_DERIV_REDIRECT_URI!,
  scopes: 'trade account_manage',
});
```
