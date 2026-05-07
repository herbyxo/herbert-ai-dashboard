import { NextResponse } from 'next/server'
import { postJson } from '@/lib/http'

function targetUrl(id) {
  if (process.env.OWNER_AGENT_ACTION_ENDPOINT) return process.env.OWNER_AGENT_ACTION_ENDPOINT
  if (process.env.OWNER_API_BASE_URL) {
    return `${process.env.OWNER_API_BASE_URL.replace(/\/$/, '')}/owner/agents/${id}/action`
  }
  return null
}

export async function POST(request, { params }) {
  const { id } = await params
  const body = await request.json().catch(() => null)
  const action = body?.action
  const scaleTo = body?.scale_to

  if (!id || !action || !['restart', 'scale'].includes(action)) {
    return NextResponse.json({ error: 'Invalid agent action payload.' }, { status: 400 })
  }

  if (action === 'scale' && (!Number.isInteger(scaleTo) || scaleTo < 1 || scaleTo > 20)) {
    return NextResponse.json({ error: 'scale_to must be an integer between 1 and 20.' }, { status: 400 })
  }

  const endpoint = targetUrl(id)
  if (!endpoint) {
    return NextResponse.json(
      {
        ok: true,
        mode: 'mock',
        message: 'Action accepted in mock mode (no OWNER_AGENT_ACTION_ENDPOINT configured).',
      },
      { status: 200 }
    )
  }

  try {
    const headers = process.env.OWNER_API_KEY ? { 'x-api-key': process.env.OWNER_API_KEY } : {}
    const payload = await postJson(endpoint, { agent_id: id, action, scale_to: scaleTo }, headers)
    return NextResponse.json({
      ok: true,
      mode: 'live',
      message: payload?.message || 'Agent action forwarded to orchestrator.',
      result: payload,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || 'Failed to run agent action.' },
      { status: 502 }
    )
  }
}

