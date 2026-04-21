import { mockRequests } from '@/lib/mockData'
import Link from 'next/link'
import { urgencyBadge, statusBadge, formatDate } from '@/lib/utils'

const STATUS_FILTERS = ['all', 'pending', 'approved', 'booked', 'resolved', 'denied']

export default function RequestsPage({ searchParams }) {
  const filter = searchParams?.status || 'all'
  const filtered = filter === 'all'
    ? mockRequests
    : mockRequests.filter(r => r.status === filter)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Maintenance Requests</h1>
        <p className="text-gray-500 text-sm mt-1">All requests captured by your AI agent.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {STATUS_FILTERS.map(s => (
          <Link
            key={s}
            href={s === 'all' ? '/dashboard/requests' : `/dashboard/requests?status=${s}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition ${
              filter === s
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
              <th className="text-left px-6 py-3 font-medium">Tenant</th>
              <th className="text-left px-6 py-3 font-medium">Property</th>
              <th className="text-left px-6 py-3 font-medium">Issue</th>
              <th className="text-left px-6 py-3 font-medium">Urgency</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-left px-6 py-3 font-medium">Received</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-12 text-sm">
                  No requests found.
                </td>
              </tr>
            )}
            {filtered.map(req => (
              <tr key={req.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{req.tenant_name}</div>
                  <div className="text-xs text-gray-400">{req.tenant_phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-700">{req.property_address}{req.unit ? `, ${req.unit}` : ''}</div>
                  <div className="text-xs text-gray-400">{req.suburb}</div>
                </td>
                <td className="px-6 py-4 text-gray-700">{req.issue_category}</td>
                <td className="px-6 py-4">{urgencyBadge(req.urgency)}</td>
                <td className="px-6 py-4">{statusBadge(req.status)}</td>
                <td className="px-6 py-4 text-gray-400 text-xs">{formatDate(req.created_at)}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/requests/${req.id}`}
                    className="text-xs font-medium text-gray-500 hover:text-gray-900"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
