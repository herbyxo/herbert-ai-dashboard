import { NextResponse } from 'next/server'
import { postJson } from '@/lib/http'

function targetUrl(id) {
  if (process.env.REQUEST_DECISION_ENDPOINT) return process.env.REQUEST_DECISION_ENDPOINT
  if (process.env.CLIENT_API_BASE_URL) {
    return `${process.env.CLIENT_API_BASE_URL.replace(/\/$/, '')}/client/requests/${id}/decision`
  }
  return null
}

export async function POST(request, { params }) {
  const { id } = await params
  const body = await request.json().catch(() => null)
  const action = body?.action
  const reason = body?.reason || ''

  if (!id || !action || !['approve', 'deny'].includes(action)) {
    return NextResponse.json({ error: 'Invalid decision payload.' }, { status: 400 })
  }

  const endpoint = targetUrl(id)
  if (!endpoint) {
    return NextResponse.json(
      {
        ok: true,
        mode: 'mock',
        message: 'Decision accepted in mock mode (no REQUEST_DECISION_ENDPOINT configured).',
      },
      { status: 200 }
    )
  }

  try {
    const headers = process.env.CLIENT_API_KEY ? { 'x-api-key': process.env.CLIENT_API_KEY } : {}
    const payload = await postJson(endpoint, { request_id: id, action, reason }, headers)
    return NextResponse.json({
      ok: true,
      mode: 'live',
      message: payload?.message || 'Decision forwarded to workflow.',
      result: payload,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || 'Failed to submit decision.' },
      { status: 502 }
    )
  }
}

