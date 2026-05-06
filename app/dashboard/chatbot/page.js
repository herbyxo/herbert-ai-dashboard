import { mockChatbotStats, mockChatConversations } from '@/lib/mockData'
import { MessageSquare, Users, Zap } from 'lucide-react'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  })
}

function outcomeBadge(outcome) {
  const map = {
    lead:     'bg-purple-50 text-purple-700 border-purple-200',
    answered: 'bg-blue-50 text-blue-700 border-blue-200',
  }
  const labels = {
    lead: 'Lead captured', answered: 'Answered',
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

export default function ChatbotPage() {
  const s = mockChatbotStats
  const convTrend = trend(s.conversations_this_month, s.conversations_last_month)
  const leadTrend = trend(s.leads_captured, s.leads_last_month)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Chatbot</h1>
        <p className="text-gray-500 text-sm mt-1">Website chat conversations and leads captured this month.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center mb-3">
            <MessageSquare className="w-4 h-4 text-gray-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-0.5">{s.conversations_this_month}</p>
          <p className="text-xs text-gray-500">Conversations this month</p>
          <p className={`text-xs mt-1 font-medium ${convTrend.up ? 'text-green-600' : 'text-red-500'}`}>
            {convTrend.up ? '↑' : '↓'} {Math.abs(convTrend.pct)}% vs last month
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center mb-3">
            <Users className="w-4 h-4 text-gray-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-0.5">{s.leads_captured}</p>
          <p className="text-xs text-gray-500">Leads captured</p>
          <p className={`text-xs mt-1 font-medium ${leadTrend.up ? 'text-green-600' : 'text-red-500'}`}>
            {leadTrend.up ? '↑' : '↓'} {Math.abs(leadTrend.pct)}% vs last month
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-gray-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-0.5">{s.avg_response_time}</p>
          <p className="text-xs text-gray-500">Avg response time</p>
        </div>
      </div>

      {/* Conversation log */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Recent conversations</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {mockChatConversations.map(chat => (
            <div key={chat.id} className="px-6 py-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-0.5 italic">&ldquo;{chat.first_message}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {outcomeBadge(chat.outcome)}
                  <span className="text-xs text-gray-400">{formatDate(chat.date)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{chat.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
