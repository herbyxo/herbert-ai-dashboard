import { checkRateLimit } from '@/lib/rateLimit'
import { NextResponse } from 'next/server'

// Rate-limit guard for credential sign-in attempts.
// NextAuth's own /api/auth/callback/credentials route calls this first via a fetch.
// For a simpler setup we apply rate limiting inside the Credentials authorize() callback
// using the client IP forwarded by Next.js headers.

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const { allowed, retryAfterMs } = checkRateLimit(ip)

  if (!allowed) {
    const retryAfterSec = Math.ceil(retryAfterMs / 1000)
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfterSec) },
      }
    )
  }

  return NextResponse.json({ ok: true })
}
