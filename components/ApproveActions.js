'use client'
import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ApproveActions({ requestId }) {
  const router = useRouter()
  const [state, setState] = useState('idle') // idle | approving | denying | done
  const [result, setResult] = useState(null)
  const [denyReason, setDenyReason] = useState('')
  const [showDenyForm, setShowDenyForm] = useState(false)
  const [error, setError] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  async function handleApprove() {
    setState('approving')
    setError('')
    try {
      const res = await fetch(`/api/requests/${requestId}/decision`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(payload?.error || 'Failed to approve request.')
      setResponseMessage(payload?.message || '')
      setResult('approved')
      setState('done')
      router.refresh()
    } catch (e) {
      setError(e?.message || 'Failed to approve request.')
      setState('idle')
    }
  }

  async function handleDeny(e) {
    e.preventDefault()
    setState('denying')
    setError('')
    try {
      const res = await fetch(`/api/requests/${requestId}/decision`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'deny', reason: denyReason }),
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(payload?.error || 'Failed to deny request.')
      setResponseMessage(payload?.message || '')
      setResult('denied')
      setState('done')
      router.refresh()
    } catch (e) {
      setError(e?.message || 'Failed to deny request.')
      setState('idle')
    }
  }

  if (state === 'done') {
    return (
      <div className={`rounded-xl border p-6 flex items-center gap-3 ${
        result === 'approved'
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}>
        {result === 'approved'
          ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
          : <XCircle className="w-5 h-5 text-red-500 shrink-0" />
        }
        <div>
          <p className={`font-medium text-sm ${result === 'approved' ? 'text-green-800' : 'text-red-700'}`}>
            {result === 'approved'
              ? 'Request approved — booking agent notified.'
              : 'Request denied — tenant will be notified.'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {result === 'approved'
              ? (responseMessage || 'The AI booking agent will now contact available tradespeople.')
              : denyReason || 'No reason provided.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Action Required</h2>
      {error && (
        <p className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      {!showDenyForm ? (
        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            disabled={state !== 'idle'}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60"
          >
            <CheckCircle className="w-4 h-4" />
            {state === 'approving' ? 'Approving...' : 'Approve'}
          </button>
          <button
            onClick={() => setShowDenyForm(true)}
            disabled={state !== 'idle'}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:border-red-300 hover:text-red-600 transition disabled:opacity-60"
          >
            <XCircle className="w-4 h-4" />
            Deny
          </button>
        </div>
      ) : (
        <form onSubmit={handleDeny} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for denial <span className="text-gray-400 font-normal">(sent to tenant)</span>
            </label>
            <textarea
              value={denyReason}
              onChange={e => setDenyReason(e.target.value)}
              rows={3}
              required
              placeholder="e.g. The appliance is tenant-supplied and not covered under property maintenance."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={state !== 'idle'}
              className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition disabled:opacity-60"
            >
              {state === 'denying' ? 'Denying...' : 'Confirm Denial'}
            </button>
            <button
              type="button"
              onClick={() => setShowDenyForm(false)}
              className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
