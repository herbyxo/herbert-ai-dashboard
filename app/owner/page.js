import { getOwnerSummary, getOwnerAgents } from '@/lib/ownerData'
import Link from 'next/link'

export default async function OwnerOverviewPage() {
  const summary = await getOwnerSummary()
  const agents = await getOwnerAgents()
  const unhealthy = agents.filter(a => a.status !== 'healthy').length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Owner overview</h1>
        <p className="text-gray-500 text-sm mt-1">Deployed agents, platform health, and operating posture.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label="Agents online" value={`${summary.agents_online} / ${summary.agents_total}`} />
        <Stat label="24h request volume" value={String(summary.requests_last_24h)} />
        <Stat label="24h error rate" value={summary.error_rate_24h} />
        <Stat label="Last incident" value={summary.last_incident || '—'} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-indigo-900">Access control</h2>
          <p className="text-sm text-indigo-800 mt-1">
            Owner access is controlled by <code className="text-xs bg-indigo-100 px-1 rounded">OWNER_EMAILS</code>.
            This keeps operational controls limited to allowlisted accounts.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900">Operational snapshot</h2>
          <p className="text-sm text-gray-600 mt-1">
            {unhealthy} agent{unhealthy === 1 ? '' : 's'} need attention across voice/chat/batch surfaces.
          </p>
          <Link href="/owner/agents" className="inline-block mt-2 text-sm text-indigo-600 hover:text-indigo-800">
            Review agent status →
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-gray-900">Integration endpoints</h2>
        <p className="text-sm text-gray-600 mt-1">
          Connect live telemetry with <code className="text-xs bg-gray-100 px-1 rounded">OWNER_API_BASE_URL</code> or
          explicit endpoint vars (<code className="text-xs bg-gray-100 px-1 rounded">OWNER_SUMMARY_ENDPOINT</code>,
          <code className="text-xs bg-gray-100 px-1 rounded"> OWNER_AGENTS_ENDPOINT</code>,
          <code className="text-xs bg-gray-100 px-1 rounded"> OWNER_LOGS_ENDPOINT</code>).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/owner/logs"
          className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-sm transition"
        >
          <h3 className="font-semibold text-gray-900">System logs</h3>
          <p className="text-sm text-gray-500 mt-1">Recent platform and agent log lines. Replace the mock feed with Loki, Datadog, or CloudWatch later.</p>
        </Link>
        <Link
          href="/owner/agents"
          className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-indigo-200 hover:shadow-sm transition"
        >
          <h3 className="font-semibold text-gray-900">Agents</h3>
          <p className="text-sm text-gray-500 mt-1">Status, version, and region for each deployment you track.</p>
        </Link>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  )
}
