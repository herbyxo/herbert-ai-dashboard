export const mockClient = {
  business_name: 'Master Freeze Refrigeration',
  owner_name: 'Guy Herbert',
  active_products: ['voice', 'reviews'],
}

export const mockReviewStats = {
  current_rating: 4.8,
  rating_last_month: 4.6,
  total_reviews: 41,
  new_this_month: 9,
  new_last_month: 6,
}

export const mockReviews = [
  {
    id: 'RV-001',
    author: 'Daniel Carter',
    rating: 5,
    date: '2026-04-22T10:15:00Z',
    text: 'Incredibly fast response. Called after hours and the AI booked a tech out the next morning. Fridge was fixed before lunch. Highly recommend.',
  },
  {
    id: 'RV-002',
    author: 'Tina Morales',
    rating: 5,
    date: '2026-04-18T14:30:00Z',
    text: 'Really impressed — the phone system is so easy to use. Got a confirmation SMS within minutes and the tech showed up exactly on time.',
  },
  {
    id: 'RV-003',
    author: 'James Whitfield',
    rating: 4,
    date: '2026-04-15T09:45:00Z',
    text: 'Good service overall. The booking process was seamless. Would have given 5 stars but had to wait an extra day due to parts availability.',
  },
  {
    id: 'RV-004',
    author: 'Sandra Obi',
    rating: 5,
    date: '2026-04-10T16:00:00Z',
    text: 'Our commercial fridge broke down on a Friday afternoon — called and had someone here Saturday morning. Lifesavers.',
  },
  {
    id: 'RV-005',
    author: 'Chris Nguyen',
    rating: 5,
    date: '2026-04-05T11:20:00Z',
    text: 'Smooth from start to finish. The AI receptionist was surprisingly helpful and got all the details right. Tech was professional and efficient.',
  },
]

export const mockVoiceStats = {
  calls_this_month: 24,
  calls_last_month: 18,
  bookings_created: 19,
  bookings_last_month: 14,
  avg_call_duration: '2m 08s',
  emergencies_this_month: 2,
  estimated_revenue_captured: 7600,
}

export const mockCalls = [
  {
    id: 'CL-001',
    caller_name: 'Raj Patel',
    phone: '0412 555 890',
    job_type: 'Refrigeration repair',
    duration: '2m 34s',
    outcome: 'booked',
    date: '2026-04-22T08:15:00Z',
    summary: 'Caller reported commercial fridge not cooling. AI qualified the issue, confirmed availability, and booked a same-day callout.',
  },
  {
    id: 'CL-002',
    caller_name: 'Unknown',
    phone: '0455 321 100',
    job_type: 'Freezer fault',
    duration: '1m 12s',
    outcome: 'message',
    date: '2026-04-21T23:40:00Z',
    summary: 'After-hours call. Caller left a message about a freezer making loud noises. Scheduled follow-up for the next morning.',
  },
  {
    id: 'CL-003',
    caller_name: 'Lucy Brennan',
    phone: '0431 099 876',
    job_type: 'Walk-in coolroom',
    duration: '3m 05s',
    outcome: 'emergency',
    date: '2026-04-20T07:05:00Z',
    summary: 'Walk-in coolroom at a bakery failed overnight. AI flagged as emergency, notified owner directly, and advised caller on interim steps.',
  },
  {
    id: 'CL-004',
    caller_name: 'Tom Garrett',
    phone: '0466 200 344',
    job_type: 'AC service',
    duration: '1m 48s',
    outcome: 'booked',
    date: '2026-04-19T13:22:00Z',
    summary: 'Caller requested a routine AC service. AI confirmed location and booked for the following week.',
  },
  {
    id: 'CL-005',
    caller_name: 'Maria Esposito',
    phone: '0487 111 765',
    job_type: 'Fridge ice maker',
    duration: '2m 20s',
    outcome: 'booked',
    date: '2026-04-18T10:55:00Z',
    summary: 'Ice maker on commercial fridge stopped producing. AI booked a diagnostic visit for the next available morning slot.',
  },
]

export const mockChatbotStats = {
  conversations_this_month: 38,
  conversations_last_month: 27,
  leads_captured: 11,
  leads_last_month: 7,
  avg_response_time: '< 2s',
}

export const mockChatConversations = [
  {
    id: 'CC-001',
    first_message: 'Hi, how much does a fridge repair cost?',
    outcome: 'lead',
    date: '2026-04-22T11:30:00Z',
    summary: 'Visitor asked about pricing for a residential fridge repair. Bot explained the callout fee and quoted a typical range. Visitor provided name and phone number for a callback.',
  },
  {
    id: 'CC-002',
    first_message: 'Do you service commercial cool rooms?',
    outcome: 'lead',
    date: '2026-04-21T15:45:00Z',
    summary: 'Visitor enquired about commercial coolroom servicing. Bot confirmed capability, collected business name and contact details, flagged as qualified lead.',
  },
  {
    id: 'CC-003',
    first_message: 'What areas do you cover?',
    outcome: 'answered',
    date: '2026-04-20T09:10:00Z',
    summary: 'Visitor asked about service areas. Bot provided coverage details for Greater Adelaide. No follow-up needed.',
  },
  {
    id: 'CC-004',
    first_message: 'My freezer is making a loud noise, is that bad?',
    outcome: 'answered',
    date: '2026-04-19T17:20:00Z',
    summary: 'Bot provided general troubleshooting info and recommended booking a diagnostic. Visitor said they would call in the morning.',
  },
  {
    id: 'CC-005',
    first_message: 'Can I get a same-day booking?',
    outcome: 'lead',
    date: '2026-04-18T08:40:00Z',
    summary: 'Visitor asked about same-day availability. Bot explained the process and collected contact details for the owner to confirm.',
  },
]

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
