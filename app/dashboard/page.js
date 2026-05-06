import { mockClient, mockVoiceStats, mockReviewStats, mockChatbotStats, mockCalls } from '@/lib/mockData'
import Link from 'next/link'
import { Phone, Star, MessageSquare, TrendingUp, ArrowUpRight, ArrowRight } from 'lucide-react'

function trend(current, previous) {
  if (!previous) return null
  const diff = current - previous
  const pct = Math.round((diff / previous) * 100)
  return { diff, pct, up: diff >= 0 }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function outcomeBadge(outcome) {
  const map = {
    booked:    'bg-green-50 text-green-700 border-green-200',
    message:   'bg-yellow-50 text-yellow-700 border-yellow-200',
    emergency: 'bg-red-50 text-red-700 border-red-200',
    answered:  'bg-blue-50 text-blue-700 border-blue-200',
    lead:      'bg-purple-50 text-purple-700 border-purple-200',
  }
  const labels = {
    booked: 'Booked', message: 'Message', emergency: 'Emergency', answered: 'Answered', lead: 'Lead captured',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${map[outcome] ?? 'bg-gray-50 text-gray-500 border-gray-200'}`}>
      {labels[outcome] ?? outcome}
    </span>
  )
}

export default function DashboardOverview() {
  const active = mockClient.active_products
  const voiceTrend = trend(mockVoiceStats.calls_this_month, mockVoiceStats.calls_last_month)
  const recentCalls = mockCalls.slice(0, 4)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {mockClient.business_name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s how your Herbert AI products are performing this month.</p>
      </div>

      {/* Product stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {/* Voice */}
        {active.includes('voice') ? (
          <Link href="/dashboard/voice" className="bg-white rounded-xl border border-gray-200 px-5 py-4 hover:shadow-sm transition group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-gray-600" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-0.5">{mockVoiceStats.calls_this_month}</p>
            <p className="text-xs text-gray-500">Calls handled</p>
            {voiceTrend && (
              <p className={`text-xs mt-1 font-medium ${voiceTrend.up ? 'text-green-600' : 'text-red-500'}`}>
                {voiceTrend.up ? '↑' : '↓'} {Math.abs(voiceTrend.pct)}% vs last month
              </p>
            )}
          </Link>
        ) : (
          <LockedCard label="Voice Receptionist" icon={<Phone className="w-4 h-4 text-gray-400" />} />
        )}

        {/* Reviews */}
        {active.includes('reviews') ? (
          <Link href="/dashboard/reviews" className="bg-white rounded-xl border border-gray-200 px-5 py-4 hover:shadow-sm transition group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-gray-600" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-0.5">{mockReviewStats.current_rating}</p>
            <p className="text-xs text-gray-500">Google rating · {mockReviewStats.total_reviews} reviews</p>
            <p className="text-xs mt-1 font-medium text-green-600">+{mockReviewStats.new_this_month} new this month</p>
          </Link>
        ) : (
          <LockedCard label="Reviews" icon={<Star className="w-4 h-4 text-gray-400" />} />
        )}

        {/* SEO */}
        {active.includes('seo') ? (
          <Link href="/dashboard/seo" className="bg-white rounded-xl border border-gray-200 px-5 py-4 hover:shadow-sm transition group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-0.5">—</p>
            <p className="text-xs text-gray-500">Organic visits</p>
          </Link>
        ) : (
          <LockedCard label="SEO" icon={<TrendingUp className="w-4 h-4 text-gray-400" />} />
        )}

        {/* Chatbot */}
        {active.includes('chatbot') ? (
          <Link href="/dashboard/chatbot" className="bg-white rounded-xl border border-gray-200 px-5 py-4 hover:shadow-sm transition group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-gray-600" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-0.5">{mockChatbotStats.leads_captured}</p>
            <p className="text-xs text-gray-500">Chatbot leads captured</p>
            <p className="text-xs mt-1 font-medium text-green-600">{mockChatbotStats.conversations_this_month} conversations</p>
          </Link>
        ) : (
          <LockedCard label="Chatbot" icon={<MessageSquare className="w-4 h-4 text-gray-400" />} />
        )}

      </div>

      {/* Recent calls */}
      {active.includes('voice') && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Recent calls</h2>
            <Link href="/dashboard/voice" className="text-xs text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentCalls.map(call => (
              <div key={call.id} className="flex items-center justify-between px-6 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-gray-900">{call.caller_name}</span>
                    <span className="text-xs text-gray-400">{call.phone}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate max-w-sm">{call.job_type} · {call.duration}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {outcomeBadge(call.outcome)}
                  <span className="text-xs text-gray-400">{formatDate(call.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function LockedCard({ label, icon }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 px-5 py-4 opacity-60 cursor-not-allowed select-none">
      <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-lg font-semibold text-gray-400 mb-0.5">—</p>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-xs text-gray-400 mt-1">Not in plan</p>
    </div>
  )
}
