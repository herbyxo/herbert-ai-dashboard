import { getClientRequests } from '@/lib/mockData'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { urgencyBadge, statusBadge, formatDateFull } from '@/lib/utils'
import ApproveActions from '@/components/ApproveActions'

export default async function RequestDetail({ params }) {
  const requests = await getClientRequests()
  const req = requests.find(r => r.id === params.id)
  if (!req) notFound()

  return (
    <div className="max-w-3xl">

      {/* Back */}
      <Link href="/dashboard/requests" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 mb-6 transition">
        ← Back to Requests
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-semibold text-gray-900">{req.tenant_name}</h1>
            <span className="text-sm text-gray-400">{req.id}</span>
          </div>
          <p className="text-gray-500 text-sm">
            {req.property_address}{req.unit ? `, ${req.unit}` : ''} · {req.suburb}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {urgencyBadge(req.urgency)}
          {statusBadge(req.status)}
        </div>
      </div>

      {/* Call Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">AI Call Summary</h2>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">{req.call_summary}</p>
        <div className="flex gap-6 text-xs text-gray-400">
          <span>Called: {formatDateFull(req.created_at)}</span>
          <span>Duration: {req.call_duration}</span>
          <span>Phone: {req.tenant_phone}</span>
        </div>
      </div>

      {/* Issue Detail */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Issue Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Category</p>
            <p className="text-gray-900 font-medium">{req.issue_category}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Urgency</p>
            <p className="text-gray-900 font-medium capitalize">{req.urgency}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400 text-xs mb-0.5">Tenant Description</p>
            <p className="text-gray-700">{req.description}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400 text-xs mb-0.5">Preferred Access</p>
            <p className="text-gray-700">{req.preferred_access}</p>
          </div>
        </div>
      </div>

      {/* Booking info (if exists) */}
      {req.booking && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Booking</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Tradesperson</p>
              <p className="text-gray-900 font-medium">{req.booking.tradesperson}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Company</p>
              <p className="text-gray-900 font-medium">{req.booking.company}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Scheduled Time</p>
              <p className="text-gray-900 font-medium">{formatDateFull(req.booking.scheduled_time)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-0.5">AroFlo Job ID</p>
              <p className="text-gray-900 font-medium font-mono">{req.booking.aroflo_job_id}</p>
            </div>
          </div>
        </div>
      )}

      {/* Denial reason */}
      {req.denial_reason && (
        <div className="bg-red-50 rounded-xl border border-red-200 p-6 mb-4">
          <h2 className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">Denial Reason</h2>
          <p className="text-red-700 text-sm">{req.denial_reason}</p>
        </div>
      )}

      {/* Approve / Deny actions — only show if pending */}
      {req.status === 'pending' && <ApproveActions requestId={req.id} />}

    </div>
  )
}
