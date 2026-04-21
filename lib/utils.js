export function urgencyBadge(urgency) {
  const map = {
    emergency: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    normal: 'bg-gray-100 text-gray-600',
  }
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full capitalize ${map[urgency] || map.normal}`}>
      {urgency}
    </span>
  )
}

export function statusBadge(status) {
  const map = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-blue-100 text-blue-700',
    denied: 'bg-red-100 text-red-700',
    booking_in_progress: 'bg-purple-100 text-purple-700',
    booked: 'bg-green-100 text-green-700',
    resolved: 'bg-gray-100 text-gray-500',
  }
  const labels = {
    pending: 'Pending',
    approved: 'Approved',
    denied: 'Denied',
    booking_in_progress: 'Booking...',
    booked: 'Booked',
    resolved: 'Resolved',
  }
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${map[status] || map.pending}`}>
      {labels[status] || status}
    </span>
  )
}

export function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export function formatDateFull(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
