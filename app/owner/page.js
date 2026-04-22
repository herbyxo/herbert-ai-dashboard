import { ownerSummary } from '@/lib/ownerData'
import Link from 'next/link'

export default function OwnerOverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Owner overview</h1>
        <p className="text-gray-500 text-sm mt-1">Deployed agents and platform health (mock data until you wire your telemetry).</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label="Agents online" value={`${ownerSummary.agents_online} / ${ownerSummary.agents_total}`} />
        <Stat label="24h request volume" value={String(ownerSummary.requests_last_24h)} />
        <Stat label="24h error rate" value={ownerSummary.error_rate_24h} />
        <Stat label="Last incident" value={ownerSummary.last_incident || '—'} />
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-indigo-900">Access control</h2>
        <p className="text-sm text-indigo-800 mt-1">
          This area is limited to email addresses in the <code className="text-xs bg-indigo-100 px-1 rounded">OWNER_EMAILS</code> environment
          variable. Add your Google account email (comma-separated for multiple) and sign in with Google, or with credentials that use that
          same email if you extend auth.
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
