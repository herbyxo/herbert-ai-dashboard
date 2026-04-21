// In-memory rate limiter for the login endpoint.
// In production, replace with Redis (e.g. Upstash) so it works across serverless instances.

const attempts = new Map()

const MAX_ATTEMPTS = 10
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export function checkRateLimit(ip) {
  const now = Date.now()
  const record = attempts.get(ip)

  if (!record || now - record.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now })
    return { allowed: true }
  }

  if (record.count >= MAX_ATTEMPTS) {
    const retryAfterMs = WINDOW_MS - (now - record.windowStart)
    return { allowed: false, retryAfterMs }
  }

  record.count += 1
  return { allowed: true }
}

export function resetRateLimit(ip) {
  attempts.delete(ip)
}
