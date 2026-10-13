# G-Squad

G-Squad is a Next.js-based Deriv auto trading bot project.

This repository is designed to run as a Next.js application and includes the core Deriv OAuth, account, and WebSocket modules needed for trading automation.

## Project purpose

- Deriv auto trading bot platform
- OAuth login and account access for Deriv
- Real-time WebSocket market data and trading actions
- Browser-based client flow for automated trading logic

## Required stack

This project must be built and run with Next.js.

- Node.js 18 or newer
- npm or pnpm
- Next.js app router setup

## Prerequisites

Before starting development, make sure you have:

1. Node.js installed
2. Dependencies installed with `npm install` or `pnpm install`
3. A valid `.env.local` or environment file with the Deriv configuration

## Environment setup

Create a `.env.local` file in the project root:

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

## Run the app locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Repository structure

```text
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
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
├── .env
├── .env.example
├── .env.production
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── README.md
├── tsconfig.json
└── app/
```

## Notes for developers

- This project is intended for a Next.js runtime.
- The app is built around Deriv OAuth and trading automation flows.
- The trading logic and WebSocket flows should be executed in client-safe code paths within the Next.js app.
- Use the provided `core` modules as the underlying integration layer for Deriv authentication and market connection.

## Deriv bot integration

The repo is set up to support a Deriv auto trading bot architecture that includes:

- OAuth PKCE login
- token exchange and refresh
- account discovery
- WebSocket OTP generation
- authenticated market socket connections
- trading automation logic built on top of the Deriv API
