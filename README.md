# 3i Sales Funnel

Sales pipeline app for 3i Medical Technologies (MRI, FPD, Gamma Camera).

## Architecture

- `server/` — Express + TypeScript + MySQL (`3i_Sales_funnel`) + JWT
- `client/` — React 18 + Vite. Production build: `client/out`
- `SERVE_CLIENT=true` — one process on **port 4090** serves the UI and `/api/v1`

## Database

```bash
cd server
npm install
npm run migrate
npm run seed
```

Seed logins:

| Email | Password | Role |
|---|---|---|
| raghul.je@refex.co.in | RefexAdmin@ | Admin |
| prem.thakur@3imedical.com | Sales@3i | North sales |
| west.sales@3imedical.com | Sales@3i | West sales |

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
