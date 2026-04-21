import { mockRequests, mockStats } from '@/lib/mockData'
import Link from 'next/link'
import { urgencyBadge, statusBadge, formatDate } from '@/lib/utils'

export default function DashboardOverview() {
  const recent = mockRequests.slice(0, 4)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Your AI agent activity at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Pending Approval" value={mockStats.pending} color="yellow" />
        <StatCard label="Approved" value={mockStats.approved} color="blue" />
        <StatCard label="Booked" value={mockStats.booked} color="green" />
        <StatCard label="Resolved This Month" value={mockStats.resolved} color="gray" />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Calls This Month</p>
          <p className="text-2xl font-semibold text-gray-900">{mockStats.total_calls_this_month}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Avg Call Duration</p>
          <p className="text-2xl font-semibold text-gray-900">{mockStats.avg_call_duration}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Emergencies</p>
          <p className="text-2xl font-semibold text-gray-900">{mockStats.emergency_this_month}</p>
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
