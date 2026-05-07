import { getClientRequests, getClientStats } from '@/lib/mockData'
import Link from 'next/link'
import { urgencyBadge, statusBadge, formatDate } from '@/lib/utils'

export default async function DashboardOverview() {
  const requests = await getClientRequests()
  const stats = await getClientStats(requests)
  const recent = [...requests]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4)
  const attention = requests.filter(
    r => r.status === 'pending' || r.urgency === 'emergency'
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Your AI agent activity at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Pending Approval" value={stats.pending} color="yellow" />
        <StatCard label="Approved" value={stats.approved} color="blue" />
        <StatCard label="Booked" value={stats.booked} color="green" />
        <StatCard label="Resolved This Month" value={stats.resolved} color="gray" />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Calls This Month</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.total_calls_this_month}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Avg Call Duration</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.avg_call_duration}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Emergencies</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.emergency_this_month}</p>
        </div>
      </div>

      {/* Needs attention */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Needs Attention</h2>
          <Link href="/dashboard/requests?status=pending" className="text-xs text-gray-500 hover:text-gray-900 font-medium">
            Open pending →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {attention.length === 0 && (
            <p className="px-6 py-6 text-sm text-gray-400">No urgent or pending requests.</p>
          )}
          {attention.slice(0, 3).map(req => (
            <Link
              key={req.id}
              href={`/dashboard/requests/${req.id}`}
              className="px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between"
            >
              <div className="min-w-0">
                <p className="text-sm text-gray-900 font-medium">
                  {req.tenant_name} <span className="text-xs text-gray-400">{req.id}</span>
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {req.property_address}{req.unit ? `, ${req.unit}` : ''} · {req.issue_category}
                </p>
              </div>
              <div className="flex gap-2">{urgencyBadge(req.urgency)}{statusBadge(req.status)}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent requests */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Recent Requests</h2>
          <Link href="/dashboard/requests" className="text-xs text-gray-500 hover:text-gray-900 font-medium">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recent.map(req => (
            <Link
              key={req.id}
              href={`/dashboard/requests/${req.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-gray-900">{req.tenant_name}</span>
                    <span className="text-xs text-gray-400">{req.id}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {req.property_address}{req.unit ? `, ${req.unit}` : ''} · {req.issue_category}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                {urgencyBadge(req.urgency)}
                {statusBadge(req.status)}
                <span className="text-xs text-gray-400">{formatDate(req.created_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  const colors = {
    yellow: 'bg-yellow-50 border-yellow-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    gray: 'bg-gray-50 border-gray-200',
  }
  const textColors = {
    yellow: 'text-yellow-700',
    blue: 'text-blue-700',
    green: 'text-green-700',
    gray: 'text-gray-700',
  }
  return (
    <div className={`rounded-xl border px-5 py-4 ${colors[color]}`}>
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className={`text-3xl font-semibold ${textColors[color]}`}>{value}</p>
    </div>
  )
}
