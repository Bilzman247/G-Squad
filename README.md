# G-Squad

G-Squad is a Next.js-based Deriv auto trading bot project.

This repository is designed to run as a Next.js application and includes the core Deriv OAuth, account, and WebSocket modules needed for trading automation.

## Project purpose

- Deriv auto trading bot platform
- OAuth login and account access for Deriv
- Real-time WebSocket market data and trading actions
- Browser-based client flow for automated trading logic
- Hidden strategy execution layer with a minimal operator dashboard

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

## Bot dashboard behavior

The dashboard intentionally exposes only a limited operator interface:

- stake amount
- risk management level
- start / stop controls
- fixed symbol: Volatility 100 (1s) Index
- fixed contract direction: Rise / Fall

All strategy logic is intentionally hidden from the UI and kept in the backend server logic.

## Server-side bot architecture

The project now includes a server-side runtime for the bot and initial OAuth handoff routes:

- `/api/auth/start` — creates the Deriv auth request information
- `/api/auth/callback` — handles the OAuth redirect and token exchange
- `/api/bot/start` — starts the runtime with the current bot config
- `/api/bot/stop` — stops the runtime
- `/api/bot/status` — returns the current bot status

This is a hybrid server-side design, which is more suitable than pure client code for a real Deriv auto trading bot.

## Repository structure

```text
.
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── callback/route.ts
│   │   │   └── start/route.ts
│   │   └── bot/
│   │       ├── start/route.ts
│   │       ├── status/route.ts
│   │       └── stop/route.ts
│   ├── components/
│   │   └── Dashboard.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── bot-state.ts
│   └── deriv.ts
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
- The strategy layer is intentionally hidden from the UI and should remain in server-side code.
- The current bot runtime is structured for safe server-side control, while the UI only exposes minimal operator inputs.

## Deriv bot integration

The repo is set up to support a Deriv auto trading bot architecture that includes:

- OAuth PKCE login
- token exchange and refresh
- account discovery
- WebSocket OTP generation
- authenticated market socket connections
- protected trading automation logic behind the backend runtime
