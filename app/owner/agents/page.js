import { mockDeployedAgents } from '@/lib/ownerData'
import { formatDateFull } from '@/lib/utils'

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

export default function OwnerAgentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Deployed agents</h1>
        <p className="text-gray-500 text-sm mt-1">Inventory of voice, chat, and batch workers. Actions below are UI placeholders for your API.</p>
      </div>

      <div className="space-y-4">
        {mockDeployedAgents.map(agent => (
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
              </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                disabled
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed"
                title="Connect to your orchestration API to enable"
              >
                Restart
              </button>
              <button
                type="button"
                disabled
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed"
                title="Connect to your orchestration API to enable"
              >
                Scale
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
