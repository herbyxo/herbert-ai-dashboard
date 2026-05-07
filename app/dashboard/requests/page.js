import { getClientRequests } from '@/lib/mockData'
import Link from 'next/link'
import { urgencyBadge, statusBadge, formatDate } from '@/lib/utils'

const STATUS_FILTERS = ['all', 'pending', 'approved', 'booked', 'resolved', 'denied']

export default async function RequestsPage({ searchParams }) {
  const requests = await getClientRequests()
  const filter = searchParams?.status || 'all'
  const q = (searchParams?.q || '').trim().toLowerCase()
  const filtered = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter)
  const searched = q
    ? filtered.filter(r =>
        [r.tenant_name, r.property_address, r.suburb, r.issue_category, r.id]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
    : filtered
  const pendingCount = requests.filter(r => r.status === 'pending').length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Maintenance Requests</h1>
        <p className="text-gray-500 text-sm mt-1">
          All requests captured by your AI agent. {pendingCount} pending approval.
        </p>
      </div>

      <div className="mb-4">
        <form className="max-w-md">
          <input
            type="text"
            name="q"
            defaultValue={searchParams?.q || ''}
            placeholder="Search by tenant, property, issue, request ID..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          {filter !== 'all' && <input type="hidden" name="status" value={filter} />}
        </form>
        {!process.env.CLIENT_REQUESTS_ENDPOINT && !process.env.CLIENT_API_BASE_URL && (
          <p className="text-xs text-amber-700 mt-2">
            Running in mock data mode. Set CLIENT API env vars to use live client data.
          </p>
        )}
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
            {searched.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-12 text-sm">
                  No requests found for this filter.
                </td>
              </tr>
            )}
            {searched.map(req => (
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
