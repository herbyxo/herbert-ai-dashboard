import { getOwnerAgents } from '@/lib/ownerData'
import { formatDateFull } from '@/lib/utils'
import OwnerAgentActions from '@/components/OwnerAgentActions'

const statusClass = {
  healthy: 'bg-emerald-100 text-emerald-800',
  degraded: 'bg-amber-100 text-amber-800',
  stopped: 'bg-gray-200 text-gray-600',
}

const statusLabel = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  stopped: 'Stopped',
}

export const metadata = {
  title: 'Agents — Owner',
}

function hoursSince(iso) {
  const ms = Date.now() - new Date(iso).getTime()
  return Math.max(0, Math.round(ms / (1000 * 60 * 60)))
}

export default async function OwnerAgentsPage() {
  const agents = await getOwnerAgents()
  const healthyCount = agents.filter(a => a.status === 'healthy').length
  const degradedCount = agents.filter(a => a.status === 'degraded').length
  const stoppedCount = agents.filter(a => a.status === 'stopped').length

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Deployed agents</h1>
        <p className="text-gray-500 text-sm mt-1">Inventory of voice, chat, and batch workers with health posture.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard label="Healthy" value={healthyCount} tone="green" />
        <SummaryCard label="Degraded" value={degradedCount} tone="yellow" />
        <SummaryCard label="Stopped" value={stoppedCount} tone="gray" />
      </div>

      <div className="space-y-4">
        {agents.map(agent => (
          <div
            key={agent.id}
            className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">{agent.name}</h2>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusClass[agent.status] || 'bg-gray-100 text-gray-600'}`}>
                  {statusLabel[agent.status] || agent.status}
                </span>
                <span className="text-xs text-gray-400 font-mono">{agent.id}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{agent.details}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <span>
                  <span className="text-gray-400">Kind</span> · {agent.kind}
                </span>
                <span>
                  <span className="text-gray-400">Region</span> · {agent.region}
                </span>
                <span>
                  <span className="text-gray-400">Version</span> · {agent.version}
                </span>
                <span>
                  <span className="text-gray-400">Last heartbeat</span> · {formatDateFull(agent.last_heartbeat)}
                </span>
                <span>
                  <span className="text-gray-400">Staleness</span> · {hoursSince(agent.last_heartbeat)}h
                </span>
              </div>
            </div>
            <OwnerAgentActions agentId={agent.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

function SummaryCard({ label, value, tone }) {
  const tones = {
    green: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    yellow: 'bg-amber-50 border-amber-200 text-amber-800',
    gray: 'bg-gray-50 border-gray-200 text-gray-700',
  }
  return (
    <div className={`rounded-xl border px-4 py-3 ${tones[tone] || tones.gray}`}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  )
}
