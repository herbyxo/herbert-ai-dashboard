# Herbert AI Dashboard

Two authenticated surfaces in one app:
- ` /dashboard` for property managers (client side)
- ` /owner` for operator/owner controls

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000/login`.

## Auth

- Credentials login reads `DEMO_EMAIL` + `DEMO_PASSWORD`
- Owner area allowlist reads `OWNER_EMAILS` (comma-separated)

## Live integrations (n8n / orchestrator)

All data sources support fallback to mock mode when env vars are missing.

Client dashboard envs:
- `CLIENT_API_BASE_URL` (optional base, e.g. `https://your-n8n-host/webhook`)
- `CLIENT_REQUESTS_ENDPOINT` (optional full URL override)
- `CLIENT_STATS_ENDPOINT` (optional full URL override)
- `REQUEST_DECISION_ENDPOINT` (approve/deny action webhook)
- `CLIENT_API_KEY` (sent as `x-api-key`)

Owner dashboard envs:
- `OWNER_API_BASE_URL` (optional base URL)
- `OWNER_SUMMARY_ENDPOINT`
- `OWNER_AGENTS_ENDPOINT`
- `OWNER_LOGS_ENDPOINT`
- `OWNER_AGENT_ACTION_ENDPOINT` (restart/scale action webhook)
- `OWNER_API_KEY` (sent as `x-api-key`)

## Action APIs in this app

These are internal API routes used by the UI:
- `POST /api/requests/:id/decision` with `{ action: "approve" | "deny", reason?: string }`
- `POST /api/owner/agents/:id/action` with `{ action: "restart" | "scale", scale_to?: number }`

If corresponding endpoint env vars are not set, these routes return mock success responses so the UI remains usable.

## Production deploy

```bash
npm run lint
npm run build
vercel --prod
```

## Operations documentation

- See `docs/OPERATING_MANUAL.md` for architecture, onboarding, runbooks, and business tracking checklists.
