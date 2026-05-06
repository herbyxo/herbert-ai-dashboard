import { mockVoiceStats, mockCalls } from '@/lib/mockData'
import { Phone, Calendar, Clock, AlertTriangle } from 'lucide-react'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  })
}

function outcomeBadge(outcome) {
  const map = {
    booked:    'bg-green-50 text-green-700 border-green-200',
    message:   'bg-yellow-50 text-yellow-700 border-yellow-200',
    emergency: 'bg-red-50 text-red-700 border-red-200',
  }
  const labels = {
    booked: 'Booked', message: 'Message taken', emergency: 'Emergency',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${map[outcome] ?? 'bg-gray-50 text-gray-500 border-gray-200'}`}>
      {labels[outcome] ?? outcome}
    </span>
  )
}

function trend(current, previous) {
  const diff = current - previous
  const pct = Math.round((diff / previous) * 100)
  return { diff, pct, up: diff >= 0 }
}

export default function VoicePage() {
  const s = mockVoiceStats
  const callTrend = trend(s.calls_this_month, s.calls_last_month)
  const bookingTrend = trend(s.bookings_created, s.bookings_last_month)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Voice Receptionist</h1>
        <p className="text-gray-500 text-sm mt-1">Every call your AI agent has handled this month.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <StatCard
          icon={<Phone className="w-4 h-4 text-gray-600" />}
          label="Calls this month"
          value={s.calls_this_month}
          trend={callTrend}
        />
        <StatCard
          icon={<Calendar className="w-4 h-4 text-gray-600" />}
          label="Bookings created"
          value={s.bookings_created}
          trend={bookingTrend}
        />
        <StatCard
          icon={<Clock className="w-4 h-4 text-gray-600" />}
          label="Avg call duration"
          value={s.avg_call_duration}
        />
        <StatCard
          icon={<AlertTriangle className="w-4 h-4 text-gray-600" />}
          label="Emergencies"
          value={s.emergencies_this_month}
          note={s.emergencies_this_month > 0 ? 'Owner notified directly' : 'None this month'}
        />
      </div>

      {/* Revenue estimate */}
      <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-green-800">Estimated revenue captured</p>
          <p className="text-xs text-green-600 mt-0.5">
            {s.bookings_created} bookings × ~$400 avg callout — jobs your agent caught that could have been missed
          </p>
        </div>
        <p className="text-3xl font-semibold text-green-800">${s.estimated_revenue_captured.toLocaleString()}</p>
      </div>

      {/* Call log */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Call log</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {mockCalls.map(call => (
            <div key={call.id} className="px-6 py-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-gray-900">{call.caller_name}</span>
                    <span className="text-xs text-gray-400">{call.phone}</span>
                  </div>
                  <span className="text-xs text-gray-500">{call.job_type} · {call.duration}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {outcomeBadge(call.outcome)}
                  <span className="text-xs text-gray-400">{formatDate(call.date)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{call.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, trend, note }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
      <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-2xl font-semibold text-gray-900 mb-0.5">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
      {trend && (
        <p className={`text-xs mt-1 font-medium ${trend.up ? 'text-green-600' : 'text-red-500'}`}>
          {trend.up ? '↑' : '↓'} {Math.abs(trend.pct)}% vs last month
        </p>
      )}
      {note && !trend && (
        <p className="text-xs mt-1 text-gray-400">{note}</p>
      )}
    </div>
  )
}
