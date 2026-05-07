'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OwnerAgentActions({ agentId }) {
  const router = useRouter()
  const [busy, setBusy] = useState('')
  const [scaleTo, setScaleTo] = useState(1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function runAction(action) {
    setBusy(action)
    setError('')
    setMessage('')
    try {
      const body = action === 'scale' ? { action, scale_to: scaleTo } : { action }
      const res = await fetch(`/api/owner/agents/${agentId}/action`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(payload?.error || `Failed to ${action} agent.`)
      setMessage(payload?.message || `Action ${action} submitted.`)
      router.refresh()
    } catch (e) {
      setError(e?.message || `Failed to ${action} agent.`)
    } finally {
      setBusy('')
    }
  }

  return (
    <div className="flex flex-col items-end gap-2 shrink-0">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => runAction('restart')}
          disabled={!!busy}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          {busy === 'restart' ? 'Restarting...' : 'Restart'}
        </button>
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={1}
            max={20}
            value={scaleTo}
            onChange={e => setScaleTo(Number(e.target.value || 1))}
            className="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-lg"
          />
          <button
            type="button"
            onClick={() => runAction('scale')}
            disabled={!!busy}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            {busy === 'scale' ? 'Scaling...' : 'Scale'}
          </button>
        </div>
      </div>
      {message && <p className="text-xs text-emerald-700">{message}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

