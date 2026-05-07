const DEFAULT_TIMEOUT_MS = 10000

export async function postJson(url, body, headers = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: 'no-store',
    })

    let payload = null
    try {
      payload = await res.json()
    } catch {
      payload = null
    }

    if (!res.ok) {
      const message = payload?.error || payload?.message || `HTTP ${res.status}`
      throw new Error(message)
    }

    return payload
  } finally {
    clearTimeout(timer)
  }
}

