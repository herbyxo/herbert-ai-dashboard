import { mockReviewStats, mockReviews } from '@/lib/mockData'
import { Star } from 'lucide-react'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`w-3.5 h-3.5 ${n <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const s = mockReviewStats

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
        <p className="text-gray-500 text-sm mt-1">Your Google review performance at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-3xl font-semibold text-gray-900 mb-1">{s.current_rating}</p>
          <StarRating rating={Math.round(s.current_rating)} />
          <p className="text-xs text-gray-500 mt-2">Current rating</p>
          <p className="text-xs text-green-600 font-medium mt-1">
            ↑ {(s.current_rating - s.rating_last_month).toFixed(1)} vs last month
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-3xl font-semibold text-gray-900 mb-0.5">{s.total_reviews}</p>
          <p className="text-xs text-gray-500 mt-2">Total reviews</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
          <p className="text-3xl font-semibold text-gray-900 mb-0.5">+{s.new_this_month}</p>
          <p className="text-xs text-gray-500 mt-2">New this month</p>
          <p className="text-xs text-green-600 font-medium mt-1">
            ↑ {s.new_this_month - s.new_last_month} vs last month
          </p>
        </div>
      </div>

      {/* Recent reviews */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm">Recent reviews</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {mockReviews.map(review => (
            <div key={review.id} className="px-6 py-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-gray-600">{review.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{review.author}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{formatDate(review.date)}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed pl-11">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
