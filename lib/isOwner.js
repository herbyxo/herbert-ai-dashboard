/**
 * Comma-separated list in env OWNER_EMAILS (lowercase match).
 */
function parseOwnerSet() {
  const raw = process.env.OWNER_EMAILS || ''
  return new Set(
    raw
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean)
  )
}

export function isOwnerEmail(email) {
  if (!email || typeof email !== 'string') return false
  return parseOwnerSet().has(email.trim().toLowerCase())
}
