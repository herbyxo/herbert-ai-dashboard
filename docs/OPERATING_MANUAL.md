# Herbert AI Dashboard Operating Manual

This is the source of truth for how the current dashboard works and how to operate it for real clients.

## 1) System map (what talks to what)

- **Dashboard app (Next.js)**: manager + owner UI, auth, internal API routes.
- **Internal API routes**:
  - `POST /api/requests/:id/decision`
  - `POST /api/owner/agents/:id/action`
- **External automation layer (n8n / orchestrator)**: receives decisions/actions, executes workflows.
- **Voice layer (Vapi)**: call handling + tool invocations.

Current pattern:
1. User clicks action in dashboard.
2. Dashboard API route forwards payload to env-configured webhook.
3. n8n/orchestrator handles business logic and downstream integrations.

## 2) Environments and key variables

Required auth/access vars:
- `DEMO_EMAIL`
- `DEMO_PASSWORD`
- `OWNER_EMAILS`
- `AUTH_SECRET`

Client dashboard data/action vars:
- `CLIENT_API_BASE_URL`
- `CLIENT_REQUESTS_ENDPOINT`
- `CLIENT_STATS_ENDPOINT`
- `REQUEST_DECISION_ENDPOINT`
- `CLIENT_API_KEY`

Owner dashboard data/action vars:
- `OWNER_API_BASE_URL`
- `OWNER_SUMMARY_ENDPOINT`
- `OWNER_AGENTS_ENDPOINT`
- `OWNER_LOGS_ENDPOINT`
- `OWNER_AGENT_ACTION_ENDPOINT`
- `OWNER_API_KEY`

Rule:
- If endpoint vars are missing, UI/API falls back to mock behavior where supported.

## 3) Multi-client strategy (important)

You have two choices:

1. **Per-client webhooks**
   - Different endpoint URL per client.
   - Higher isolation, higher ops overhead.

2. **Shared multi-tenant webhooks (recommended)**
   - Same endpoint for all clients.
   - Route internally using `client_id` or org context.
   - Easier to scale and maintain one dashboard deployment.

Recommended now:
- Keep one dashboard deployment.
- Use shared endpoints.
- Route by `client_id` inside n8n.

## 4) Data contracts (payloads)

### Request decision payload
Forwarded by dashboard:

```json
{
  "request_id": "REQ-001",
  "action": "approve",
  "reason": "optional for deny"
}
```

### Agent action payload
Forwarded by dashboard:

```json
{
  "agent_id": "agt-vic-pm-1",
  "action": "restart"
}
```

Scale action:

```json
{
  "agent_id": "agt-vic-pm-1",
  "action": "scale",
  "scale_to": 2
}
```

## 5) Client onboarding checklist

For each new client:
- [ ] Create client record (`client_id`, name, timezone, contacts)
- [ ] Configure n8n routing for that client
- [ ] Configure Vapi agent/profile and link to `client_id`
- [ ] Validate request decision workflow end-to-end
- [ ] Validate owner agent action workflow end-to-end
- [ ] Confirm owner access emails in `OWNER_EMAILS` (or move to DB roles later)
- [ ] Run smoke tests: login, requests, calls, owner logs, owner agents

## 6) Daily operating checklist

- [ ] Check owner `/owner` summary for anomalies
- [ ] Check `/owner/logs` for errors/warns in past 24h
- [ ] Check degraded/stopped agents in `/owner/agents`
- [ ] Verify pending maintenance requests are being processed
- [ ] Confirm webhook success rates in n8n dashboard

## 7) Weekly business review checklist

Track per client:
- Total calls handled
- Pending vs approved vs denied
- Median response time to tenant requests
- Booking conversion rate
- Incident count (errors/timeouts)
- Uptime by agent type (voice/chat/batch)

Recommended:
- Export these metrics from n8n and add a weekly summary doc.

## 8) Runbook: common issues

### A) Approve/Deny button works in UI but nothing happens downstream
- Check `REQUEST_DECISION_ENDPOINT` exists in Vercel.
- Check n8n endpoint auth (`x-api-key`) matches `CLIENT_API_KEY`.
- Check n8n execution logs for payload parse errors.

### B) Restart/Scale actions fail
- Check `OWNER_AGENT_ACTION_ENDPOINT`.
- Check `OWNER_API_KEY`.
- Verify orchestrator accepts `agent_id`, `action`, `scale_to`.

### C) Owner cannot access `/owner`
- Confirm signed-in email is in `OWNER_EMAILS`.
- Re-deploy after env changes.

### D) Google sign-in error
- If using Google OAuth, verify `GOOGLE_CLIENT_ID/SECRET` + callback URI.
- If not using Google yet, use credentials login.

## 9) Security minimums for production

- Require API key on all external webhooks.
- Rotate API keys quarterly.
- Avoid exposing keys in client-side code.
- Add request signature verification in n8n for critical actions.
- Move from env-based demo login to real user/role storage before scaling.

## 10) Roadmap (next practical upgrades)

1. Add org/client model in DB (replace env-only owner gating).
2. Include `client_id` in all action payloads.
3. Add audit table for every manual action (who, what, when, result).
4. Add real metrics panels (SLA, conversion, error rates) from live sources.
5. Add integration tests for decision/action flows.

## 11) Single-command deploy routine

From `herbert-ai-dashboard`:

```bash
npm run lint && npm run build && vercel --prod
```

Then verify:
- `/login`
- `/dashboard/requests`
- `/owner`
- one approve/deny action
- one restart/scale action

