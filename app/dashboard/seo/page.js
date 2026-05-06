import { Lock } from 'lucide-react'

export default function SEOPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">SEO</h1>
        <p className="text-gray-500 text-sm mt-1">Organic search performance and lead tracking.</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-16 text-center">
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">SEO not in your current plan</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
          Add SEO to your Herbert AI plan to track organic traffic, keyword rankings, and leads from Google search.
        </p>
        <a
          href="mailto:will@herbert-aisolutions.com"
          className="inline-block bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition"
        >
          Contact Will to add SEO
        </a>
      </div>
    </div>
  )
}
