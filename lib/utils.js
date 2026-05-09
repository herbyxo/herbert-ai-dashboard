export function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export function formatDateFull(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const URGENCY_STYLES = {
  emergency: 'bg-red-100 text-red-700',
  high:      'bg-orange-100 text-orange-700',
  normal:    'bg-gray-100 text-gray-600',
}

export function urgencyBadge(urgency) {
  const cls = URGENCY_STYLES[urgency] ?? 'bg-gray-100 text-gray-600'
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${cls}`}>{urgency}</span>
}

const STATUS_STYLES = {
  pending:  'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  booked:   'bg-green-100 text-green-700',
  resolved: 'bg-green-100 text-green-700',
  denied:   'bg-red-100 text-red-700',
}

export function statusBadge(status) {
  const cls = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600'
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${cls}`}>{status}</span>
}
