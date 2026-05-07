/**
 * Replace with real orchestrator / log drain when you wire production.
 */

export const ownerSummary = {
  agents_online: 3,
  agents_total: 4,
  error_rate_24h: '0.2%',
  requests_last_24h: 412,
  last_incident: null,
}

export const mockDeployedAgents = [
  {
    id: 'agt-vic-pm-1',
    name: 'Property Manager VIC (prod)',
    kind: 'voice + booking',
    region: 'ap-southeast-2',
    status: 'healthy',
    version: '1.4.2',
    last_heartbeat: '2026-04-22T10:18:00Z',
    details: 'Primary tenant line + Aroflo handoff',
  },
  {
    id: 'agt-sandbox-dev',
    name: 'Sandbox — staging',
    kind: 'voice',
    region: 'ap-southeast-2',
    status: 'healthy',
    version: '1.4.1-rc2',
    last_heartbeat: '2026-04-22T10:12:00Z',
    details: 'Used for customer demos and regression',
  },
  {
    id: 'agt-web-widget-global',
    name: 'Website chat widget (shared)',
    kind: 'chat',
    region: 'us-east-1',
    status: 'degraded',
    version: '1.2.0',
    last_heartbeat: '2026-04-22T08:40:00Z',
    details: 'Elevated latency; queue depth ~ 2.1k (mock)',
  },
  {
    id: 'agt-campaign-mailer',
    name: 'Outreach / campaign email worker',
    kind: 'batch',
    region: 'ap-southeast-2',
    status: 'stopped',
    version: '0.9.3',
    last_heartbeat: '2026-04-20T19:00:00Z',
    details: 'Manually disabled after campaign send',
  },
]

export const mockSystemLog = [
  { ts: '2026-04-22T10:19:12Z', level: 'info', source: 'agt-vic-pm-1', message: 'Call completed, transcript stored (req=REQ-001)' },
  { ts: '2026-04-22T10:16:40Z', level: 'info', source: 'router', message: 'Routed to booking pipeline — latency 120ms' },
  { ts: '2026-04-22T10:10:22Z', level: 'warn', source: 'agt-web-widget-global', message: 'Upstream model timeout, retry 1/3' },
  { ts: '2026-04-22T10:01:00Z', level: 'error', source: 'agt-sandbox-dev', message: 'CRM webhook 502 — circuit open 30s' },
  { ts: '2026-04-22T09:45:00Z', level: 'info', source: 'platform', message: 'Deploy hook acknowledged build #482' },
  { ts: '2026-04-22T09:12:00Z', level: 'info', source: 'agt-vic-pm-1', message: 'Session started, tenant ANI 0412***678' },
  { ts: '2026-04-22T08:30:00Z', level: 'info', source: 'auth', message: 'Owner session — dashboard access' },
]

async function fetchJson(url, headers) {
  const res = await fetch(url, { headers, next: { revalidate: 20 } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function ownerHeaders() {
  return process.env.OWNER_API_KEY ? { 'x-api-key': process.env.OWNER_API_KEY } : undefined
}

function ownerBase(path) {
  const base = process.env.OWNER_API_BASE_URL
  if (!base) return null
  return `${base.replace(/\/$/, '')}${path}`
}

export async function getOwnerSummary() {
  const headers = ownerHeaders()
  try {
    if (process.env.OWNER_SUMMARY_ENDPOINT) {
      const payload = await fetchJson(process.env.OWNER_SUMMARY_ENDPOINT, headers)
      return payload?.summary || payload
    }
    const url = ownerBase('/owner/summary')
    if (url) {
      const payload = await fetchJson(url, headers)
      return payload?.summary || payload
    }
  } catch {
    // Fallback to mock summary.
  }
  return ownerSummary
}

export async function getOwnerAgents() {
  const headers = ownerHeaders()
  try {
    if (process.env.OWNER_AGENTS_ENDPOINT) {
      const payload = await fetchJson(process.env.OWNER_AGENTS_ENDPOINT, headers)
      return payload?.agents || payload
    }
    const url = ownerBase('/owner/agents')
    if (url) {
      const payload = await fetchJson(url, headers)
      return payload?.agents || payload
    }
  } catch {
    // Fallback to mock agents.
  }
  return mockDeployedAgents
}

export async function getOwnerLogs() {
  const headers = ownerHeaders()
  try {
    if (process.env.OWNER_LOGS_ENDPOINT) {
      const payload = await fetchJson(process.env.OWNER_LOGS_ENDPOINT, headers)
      return payload?.logs || payload
    }
    const url = ownerBase('/owner/logs')
    if (url) {
      const payload = await fetchJson(url, headers)
      return payload?.logs || payload
    }
  } catch {
    // Fallback to mock logs.
  }
  return mockSystemLog
}
