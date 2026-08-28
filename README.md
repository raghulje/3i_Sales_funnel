# 3i Sales Funnel

Sales pipeline app for 3i Medical Technologies (MRI, FPD, Gamma Camera).

## Architecture

- `server/` — Express + TypeScript + MySQL (`3i_Sales_funnel`) + JWT
- `client/` — React 18 + Vite. Production build: `client/out`
- `SERVE_CLIENT=true` — one process on **port 4090** serves the UI and `/api/v1`

## Environment

Copy the example env files, then fill in local values. Do not commit `.env`.

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

- `server/.env.example` — database, JWT, port, and optional SMTP
- `client/.env.example` — Vite API port / URL (needed only for `npm run dev`)

## Database

```bash
cd server
npm install
npm run migrate
npm run seed
```

## Run

```bash
cd client
npm install
npm run build

cd ../server
npm start
```

Open **http://127.0.0.1:4090/** and sign in.

## Local Vite (optional)

Terminal 1: `cd server && npm run dev`  
Terminal 2: `cd client && npm run dev`  

Vite: http://127.0.0.1:5173/ (proxies `/api` to 4090).
