# G-Squad

G-Squad is a Next.js application that includes Deriv OAuth authentication and WebSocket trading integration.

## Required stack

This project must be built and run with Next.js.

- Node.js 18 or newer
- npm or pnpm
- Next.js app structure

## Prerequisites

Before starting development, make sure you have:

1. Node.js installed
2. Dependencies installed with `npm install` or `pnpm install`
3. A valid `.env.local` or environment file with the Deriv settings configured

## Environment setup

Create a `.env.local` file in the project root with the following values:

```env
NEXT_PUBLIC_DERIV_APP_ID=33E1sj7WNaMsjg5MAxPyS
NEXT_PUBLIC_DERIV_REDIRECT_URI=https://g-squad.buzz
NEXT_PUBLIC_DERIV_APP_NAME=G-squad
NEXT_PUBLIC_DERIV_SHOW_APP_NAME=true
NEXT_PUBLIC_DERIV_REFERRAL_LINK=https://t.deriv.link?t=AJAQ5SJZLES4
NEXT_PUBLIC_DERIV_OAUTH_SCOPES=trade,account_manage
NEXT_PUBLIC_DERIV_ENV=production
```

## Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

## Run the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Project structure

```text
.
├── .env
├── .env.example
├── .env.production
├── README.md
├── core/
│   ├── package.json
│   └── src/
│       ├── auth/
│       │   ├── accounts.ts
│       │   ├── crypto.ts
│       │   ├── oauth.ts
│       │   └── storage.ts
│       ├── config/
│       │   └── urls.ts
│       ├── react/
│       │   └── useDerivWS.ts
│       └── ws/
│           └── deriv-ws.ts
└── public/ (if present in the app)
```

## Notes for developers

- This app is intended for a Next.js runtime environment.
- The Deriv authentication flow relies on browser storage and redirect-based OAuth.
- The WebSocket connection layer is designed for the browser/client side and should be used within a client component or a client-safe hook.
- If you are creating a new page or component, use a Next.js page, route, or client component structure consistent with the app.

## Deriv integration

The repository contains the core Deriv helper modules needed for:

- OAuth PKCE login
- token exchange and refresh
- account fetching
- WebSocket OTP generation
- real-time Deriv WebSocket connection management

These files are meant to be used inside the Next.js app architecture.
