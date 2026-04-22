import Link from 'next/link'

export const metadata = {
  title: 'Access denied — Herbert AI',
}

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <h1 className="text-xl font-semibold text-gray-900">Access denied</h1>
        <p className="text-gray-500 text-sm mt-2">
          Your account is not in the owner allowlist. The property manager demo is still available.
        </p>
        <div className="mt-6 space-y-3">
          <Link
            href="/dashboard"
            className="block w-full py-2.5 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800"
          >
            Open property manager dashboard
          </Link>
          <Link href="/login" className="block text-sm text-indigo-600 hover:text-indigo-800">
            Sign in with a different account
          </Link>
        </div>
      </div>
    </div>
  )
}
