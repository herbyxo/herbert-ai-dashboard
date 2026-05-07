export const mockRequests = [
  {
    id: 'REQ-001',
    tenant_name: 'Sarah Mitchell',
    tenant_phone: '0412 345 678',
    property_address: '14 Banksia Street',
    unit: 'Unit 3',
    suburb: 'Fitzroy, VIC 3065',
    issue_category: 'Plumbing',
    description: 'Toilet is blocked and won\'t flush. Water is rising to the rim. Has been like this since this morning.',
    urgency: 'high',
    status: 'pending',
    call_duration: '2m 14s',
    preferred_access: 'Weekday mornings before 11am',
    created_at: '2026-04-20T08:32:00Z',
    call_summary: 'Tenant called at 8:32am reporting a blocked toilet in the main bathroom. She confirmed no flooding but the water level is very high. Requested a morning appointment on a weekday.',
  },
  {
    id: 'REQ-002',
    tenant_name: 'James Okafor',
    tenant_phone: '0423 789 012',
    property_address: '7 Acacia Avenue',
    unit: null,
    suburb: 'Brunswick, VIC 3056',
    issue_category: 'Electrical',
    description: 'Power point in the kitchen has stopped working. Nothing plugged in works. The rest of the house is fine.',
    urgency: 'normal',
    status: 'approved',
    call_duration: '1m 52s',
    preferred_access: 'Any time after 3pm',
    created_at: '2026-04-19T14:15:00Z',
    call_summary: 'Tenant reported a dead power point in the kitchen. Confirmed no burning smell or other electrical issues. Available after 3pm on any day.',
    booking: {
      tradesperson: 'Dave Nguyen',
      company: 'Reliable Electrical',
      phone: '0411 222 333',
      scheduled_time: '2026-04-22T15:00:00Z',
      aroflo_job_id: 'JB-88241',
    },
  },
  {
    id: 'REQ-003',
    tenant_name: 'Priya Sharma',
    tenant_phone: '0435 111 999',
    property_address: '22 Grevillea Court',
    unit: 'Unit 1',
    suburb: 'Northcote, VIC 3070',
    issue_category: 'Structural',
    description: 'Large crack appeared in the ceiling of the bedroom overnight. Some plaster has fallen onto the bed.',
    urgency: 'emergency',
    status: 'approved',
    call_duration: '3m 05s',
    preferred_access: 'As soon as possible',
    created_at: '2026-04-20T07:01:00Z',
    call_summary: 'Tenant reported an emergency — a significant crack in the bedroom ceiling with plaster falling. Agent flagged as emergency and notified manager immediately. Tenant was advised to avoid the room.',
    booking: {
      tradesperson: 'Mark Tran',
      company: 'Metro Building Services',
      phone: '0422 888 777',
      scheduled_time: '2026-04-20T11:00:00Z',
      aroflo_job_id: 'JB-88255',
    },
  },
  {
    id: 'REQ-004',
    tenant_name: 'Liam Chen',
    tenant_phone: '0401 654 321',
    property_address: '3 Waratah Lane',
    unit: 'Unit 7',
    suburb: 'Collingwood, VIC 3066',
    issue_category: 'Appliance',
    description: 'The dishwasher is leaking water underneath. Small puddle forming on the kitchen floor after each cycle.',
    urgency: 'normal',
    status: 'denied',
    call_duration: '1m 38s',
    preferred_access: 'Weekends preferred',
    created_at: '2026-04-18T10:22:00Z',
    call_summary: 'Tenant reported a leaking dishwasher. Water pools under the unit after each use. No water damage visible yet. Prefers weekend access.',
    denial_reason: 'Appliance is tenant-supplied. Not covered under property maintenance.',
  },
  {
    id: 'REQ-005',
    tenant_name: 'Emma Walsh',
    tenant_phone: '0487 333 444',
    property_address: '88 Eucalyptus Drive',
    unit: null,
    suburb: 'Preston, VIC 3072',
    issue_category: 'Plumbing',
    description: 'Hot water system not producing hot water. Cold showers for two days now.',
    urgency: 'high',
    status: 'booked',
    call_duration: '2m 44s',
    preferred_access: 'Mornings or afternoons, not between 12-2pm',
    created_at: '2026-04-17T09:10:00Z',
    call_summary: 'Tenant has had no hot water for two days. System appears to have failed completely — no warm water at any tap. Mornings or afternoons preferred for access.',
    booking: {
      tradesperson: 'Steve Hartley',
      company: 'AllHours Plumbing',
      phone: '0455 000 123',
      scheduled_time: '2026-04-21T09:00:00Z',
      aroflo_job_id: 'JB-88198',
    },
  },
  {
    id: 'REQ-006',
    tenant_name: 'Noah Patel',
    tenant_phone: '0466 789 000',
    property_address: '55 Wattle Street',
    unit: 'Unit 2',
    suburb: 'Richmond, VIC 3121',
    issue_category: 'Pest',
    description: 'Cockroaches appearing in the kitchen at night. Seen at least 10 in the last week.',
    urgency: 'normal',
    status: 'resolved',
    call_duration: '1m 20s',
    preferred_access: 'Flexible',
    created_at: '2026-04-14T16:45:00Z',
    call_summary: 'Tenant reported recurring cockroach sightings in the kitchen, primarily at night. Issue started about a week ago. Flexible on access times.',
    booking: {
      tradesperson: 'Greg Lawson',
      company: 'ClearPest Solutions',
      phone: '0444 321 654',
      scheduled_time: '2026-04-16T10:00:00Z',
      aroflo_job_id: 'JB-88102',
    },
    resolved_at: '2026-04-16T12:30:00Z',
  },
]

function toSeconds(duration) {
  const match = /^(\d+)m\s+(\d+)s$/.exec(duration || '')
  if (!match) return 0
  return Number(match[1]) * 60 + Number(match[2])
}

function toDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`
}

export function deriveClientStats(requests) {
  const data = requests || mockRequests
  const grouped = data.reduce(
    (acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1
      if (req.urgency === 'emergency') acc.emergency += 1
      acc.totalDuration += toSeconds(req.call_duration)
      return acc
    },
    { pending: 0, approved: 0, booked: 0, resolved: 0, denied: 0, emergency: 0, totalDuration: 0 }
  )

  const avgSecs = data.length > 0 ? Math.round(grouped.totalDuration / data.length) : 0
  return {
    pending: grouped.pending,
    approved: grouped.approved,
    booked: grouped.booked,
    resolved: grouped.resolved,
    denied: grouped.denied,
    total_calls_this_month: data.length,
    avg_call_duration: toDuration(avgSecs),
    emergency_this_month: grouped.emergency,
  }
}

async function fetchJson(url, headers) {
  const res = await fetch(url, { headers, next: { revalidate: 30 } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getClientRequests() {
  const direct = process.env.CLIENT_REQUESTS_ENDPOINT
  const base = process.env.CLIENT_API_BASE_URL
  const apiKey = process.env.CLIENT_API_KEY
  const headers = apiKey ? { 'x-api-key': apiKey } : undefined

  try {
    if (direct) {
      const payload = await fetchJson(direct, headers)
      if (Array.isArray(payload)) return payload
      if (Array.isArray(payload?.requests)) return payload.requests
    }
    if (base) {
      const payload = await fetchJson(`${base.replace(/\/$/, '')}/client/requests`, headers)
      if (Array.isArray(payload)) return payload
      if (Array.isArray(payload?.requests)) return payload.requests
    }
  } catch {
    // Fallback to mock data when remote source is unavailable.
  }

  return mockRequests
}

export async function getClientStats(requests) {
  const direct = process.env.CLIENT_STATS_ENDPOINT
  const base = process.env.CLIENT_API_BASE_URL
  const apiKey = process.env.CLIENT_API_KEY
  const headers = apiKey ? { 'x-api-key': apiKey } : undefined

  try {
    if (direct) {
      const payload = await fetchJson(direct, headers)
      return payload?.stats || payload
    }
    if (base) {
      const payload = await fetchJson(`${base.replace(/\/$/, '')}/client/stats`, headers)
      return payload?.stats || payload
    }
  } catch {
    // Fallback to locally derived stats.
  }

  return deriveClientStats(requests)
}
