import { mockRequests } from '@/lib/mockData'
import { urgencyBadge, formatDateFull } from '@/lib/utils'
import Link from 'next/link'
import { Phone } from 'lucide-react'

export default function CallLogPage() {
  const calls = [...mockRequests].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Call Log</h1>
        <p className="text-gray-500 text-sm mt-1">Every call your AI agent has handled.</p>
      </div>

      <div className="space-y-3">
        {calls.map(req => (
          <Link
            key={req.id}
            href={`/dashboard/requests/${req.id}`}
            className="bg-white rounded-xl border border-gray-200 px-6 py-4 flex items-start gap-4 hover:shadow-sm transition block"
          >
            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{req.tenant_name}</span>
                  <span className="text-xs text-gray-400">{req.tenant_phone}</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{formatDateFull(req.created_at)}</span>
              </div>
              <p className="text-sm text-gray-600 truncate mb-2">{req.call_summary}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>Duration: {req.call_duration}</span>
                <span>·</span>
                <span>{req.property_address}{req.unit ? `, ${req.unit}` : ''}</span>
                <span>·</span>
                <span>{req.issue_category}</span>
                <span>·</span>
                {urgencyBadge(req.urgency)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
