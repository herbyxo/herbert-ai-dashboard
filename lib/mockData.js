// Demo data — Northbridge Property Co. (fictional Adelaide property management agency).
// Powers the Herbert AI Property Manager dashboard demo. Swap to live data by
// setting CLIENT_REQUESTS_ENDPOINT / CLIENT_API_BASE_URL env vars.

export const mockClient = {
  business_name: 'Northbridge Property Co.',
  owner_name: 'Sarah Chen',
  active_products: ['requests'],
}

export const mockRequests = [
  {
    id: 'REQ-2041',
    tenant_name: 'Olivia Bennett',
    tenant_phone: '0412 887 340',
    property_address: '14 Osmond Terrace',
    unit: 'Unit 5',
    suburb: 'Norwood, SA 5067',
    issue_category: 'Plumbing',
    description: 'Hot water system has completely stopped — no hot water at any tap for two days. Cold showers only.',
    urgency: 'high',
    status: 'pending',
    call_duration: '2m 31s',
    preferred_access: 'Weekday mornings before 11am',
    created_at: '2026-06-02T07:48:00Z',
    call_summary: 'Tenant called at 7:48am reporting no hot water across the whole unit for two days. Confirmed the system makes no noise when taps are run. Requested a weekday morning appointment.',
  },
  {
    id: 'REQ-2040',
    tenant_name: 'Marcus Reid',
    tenant_phone: '0423 556 901',
    property_address: '8 Sturt Street',
    unit: null,
    suburb: 'Adelaide, SA 5000',
    issue_category: 'Structural',
    description: 'Large crack appeared in the bedroom ceiling overnight and some plaster has fallen onto the floor.',
    urgency: 'emergency',
    status: 'pending',
    call_duration: '3m 12s',
    preferred_access: 'As soon as possible — home all day',
    created_at: '2026-06-02T06:20:00Z',
    call_summary: 'Tenant reported an emergency — a significant crack in the bedroom ceiling with plaster falling overnight. AI flagged as emergency and advised the tenant to keep clear of the room until inspected.',
  },
  {
    id: 'REQ-2039',
    tenant_name: 'Priya Nair',
    tenant_phone: '0435 220 118',
    property_address: '23 Maesbury Street',
    unit: 'Unit 2',
    suburb: 'Kensington, SA 5068',
    issue_category: 'Electrical',
    description: 'The power points in the kitchen have stopped working. The rest of the house is fine.',
    urgency: 'normal',
    status: 'pending',
    call_duration: '1m 47s',
    preferred_access: 'Any time after 3pm',
    created_at: '2026-06-01T16:05:00Z',
    call_summary: 'Tenant reported dead power points in the kitchen only, no burning smell. Available after 3pm on weekdays.',
  },
  {
    id: 'REQ-2038',
    tenant_name: 'Tom Garrett',
    tenant_phone: '0466 200 344',
    property_address: '51 The Parade',
    unit: 'Unit 12',
    suburb: 'Norwood, SA 5067',
    issue_category: 'Heating / Cooling',
    description: 'Ducted heating not turning on at all heading into the cold snap. Thermostat shows no response.',
    urgency: 'high',
    status: 'approved',
    call_duration: '2m 02s',
    preferred_access: 'Weekdays, flexible',
    created_at: '2026-06-01T09:22:00Z',
    call_summary: 'Tenant reported the ducted heating is completely unresponsive at the thermostat. Approved for callout ahead of the forecast cold week.',
  },
  {
    id: 'REQ-2037',
    tenant_name: 'Hannah Foster',
    tenant_phone: '0401 765 223',
    property_address: '6 Cudmore Terrace',
    unit: null,
    suburb: 'Henley Beach, SA 5022',
    issue_category: 'Locks / Security',
    description: 'Front door deadlock is jamming — takes several minutes to lock, worried about leaving it unsecured.',
    urgency: 'high',
    status: 'approved',
    call_duration: '1m 58s',
    preferred_access: 'Mornings preferred',
    created_at: '2026-05-31T11:40:00Z',
    call_summary: 'Tenant reported the front deadlock is jamming and difficult to engage, raising a security concern. Approved for a locksmith callout.',
  },
  {
    id: 'REQ-2036',
    tenant_name: 'James Okafor',
    tenant_phone: '0423 789 012',
    property_address: '19 Devonport Terrace',
    unit: 'Unit 4',
    suburb: 'Prospect, SA 5082',
    issue_category: 'Plumbing',
    description: 'Toilet is blocked and water rises to the rim when flushed. Only one bathroom in the unit.',
    urgency: 'high',
    status: 'booked',
    call_duration: '2m 14s',
    preferred_access: 'Weekday mornings before 11am',
    created_at: '2026-05-30T08:32:00Z',
    call_summary: 'Tenant reported a blocked toilet with water rising to the rim, and it is the only bathroom. Booked a plumber for the next morning.',
    booking: {
      tradesperson: 'Dave Nguyen',
      company: 'Adelaide Rapid Plumbing',
      phone: '0411 222 333',
      scheduled_time: '2026-06-03T09:00:00Z',
      aroflo_job_id: 'JB-88241',
    },
  },
  {
    id: 'REQ-2035',
    tenant_name: 'Sofia Russo',
    tenant_phone: '0455 901 776',
    property_address: '33 Goodwood Road',
    unit: 'Unit 8',
    suburb: 'Unley, SA 5061',
    issue_category: 'Appliance',
    description: 'Oven has stopped heating. Element appears dead — no warmth at any setting.',
    urgency: 'normal',
    status: 'booked',
    call_duration: '1m 36s',
    preferred_access: 'Weekends preferred',
    created_at: '2026-05-29T15:10:00Z',
    call_summary: 'Tenant reported the oven will not heat at any setting, likely a failed element. Booked an appliance technician for Saturday.',
    booking: {
      tradesperson: 'Mark Tran',
      company: 'Fix-It Appliance Repairs',
      phone: '0422 888 777',
      scheduled_time: '2026-06-07T10:30:00Z',
      aroflo_job_id: 'JB-88255',
    },
  },
  {
    id: 'REQ-2034',
    tenant_name: 'Liam Chen',
    tenant_phone: '0401 654 321',
    property_address: '12 Watson Avenue',
    unit: null,
    suburb: 'Glenelg, SA 5045',
    issue_category: 'Appliance',
    description: 'Dishwasher leaking water underneath — small puddle on the kitchen floor after each cycle.',
    urgency: 'normal',
    status: 'denied',
    call_duration: '1m 38s',
    preferred_access: 'Weekends preferred',
    created_at: '2026-05-28T10:22:00Z',
    call_summary: 'Tenant reported a leaking dishwasher pooling water after each cycle. No visible water damage yet.',
    denial_reason: 'Dishwasher is tenant-owned (noted on the lease). Not covered under property maintenance — tenant advised to arrange their own repair.',
  },
  {
    id: 'REQ-2033',
    tenant_name: 'Emma Walsh',
    tenant_phone: '0487 333 444',
    property_address: '88 Esplanade',
    unit: 'Unit 3',
    suburb: 'Semaphore, SA 5019',
    issue_category: 'Plumbing',
    description: 'Kitchen tap dripping constantly and the cabinet underneath is getting damp.',
    urgency: 'normal',
    status: 'resolved',
    call_duration: '1m 29s',
    preferred_access: 'Mornings or afternoons',
    created_at: '2026-05-26T09:10:00Z',
    call_summary: 'Tenant reported a constantly dripping kitchen tap with damp building in the under-sink cabinet. Resolved with a washer/cartridge replacement.',
    booking: {
      tradesperson: 'Steve Hartley',
      company: 'AllHours Plumbing',
      phone: '0455 000 123',
      scheduled_time: '2026-05-28T09:00:00Z',
      aroflo_job_id: 'JB-88198',
    },
    resolved_at: '2026-05-28T10:45:00Z',
  },
  {
    id: 'REQ-2032',
    tenant_name: 'Noah Patel',
    tenant_phone: '0466 789 000',
    property_address: '7 Rose Terrace',
    unit: 'Unit 1',
    suburb: 'Wayville, SA 5034',
    issue_category: 'Pest',
    description: 'Cockroaches appearing in the kitchen at night — seen at least ten over the past week.',
    urgency: 'normal',
    status: 'resolved',
    call_duration: '1m 20s',
    preferred_access: 'Flexible',
    created_at: '2026-05-22T16:45:00Z',
    call_summary: 'Tenant reported recurring cockroach sightings in the kitchen at night, starting about a week prior. Resolved after a pest treatment.',
    booking: {
      tradesperson: 'Greg Lawson',
      company: 'ClearPest Solutions',
      phone: '0444 321 654',
      scheduled_time: '2026-05-24T10:00:00Z',
      aroflo_job_id: 'JB-88102',
    },
    resolved_at: '2026-05-24T12:30:00Z',
  },
  {
    id: 'REQ-2031',
    tenant_name: 'Aisha Rahman',
    tenant_phone: '0432 110 558',
    property_address: '40 Magill Road',
    unit: 'Unit 6',
    suburb: 'Stepney, SA 5069',
    issue_category: 'Electrical',
    description: 'Bathroom exhaust fan stopped working and the light flickers when switched on.',
    urgency: 'normal',
    status: 'resolved',
    call_duration: '1m 44s',
    preferred_access: 'Weekday afternoons',
    created_at: '2026-05-20T13:30:00Z',
    call_summary: 'Tenant reported a dead bathroom exhaust fan and a flickering light on the same switch. Resolved by an electrician.',
    booking: {
      tradesperson: 'Carl Mason',
      company: 'Eastside Electrical',
      phone: '0433 444 222',
      scheduled_time: '2026-05-22T14:00:00Z',
      aroflo_job_id: 'JB-88061',
    },
    resolved_at: '2026-05-22T15:20:00Z',
  },
  {
    id: 'REQ-2030',
    tenant_name: 'Daniel Brooks',
    tenant_phone: '0419 002 887',
    property_address: '15 Park Terrace',
    unit: null,
    suburb: 'Gilberton, SA 5081',
    issue_category: 'General',
    description: 'Side gate latch broken — gate swings open in the wind, security concern with a dog on the property.',
    urgency: 'normal',
    status: 'resolved',
    call_duration: '1m 11s',
    preferred_access: 'Anytime, dog is friendly',
    created_at: '2026-05-18T10:05:00Z',
    call_summary: 'Tenant reported a broken side gate latch leaving the gate swinging open, a concern with a dog on the property. Resolved with a new latch.',
    booking: {
      tradesperson: 'Pete Salvatore',
      company: 'Handy Property Services',
      phone: '0466 110 220',
      scheduled_time: '2026-05-20T09:30:00Z',
      aroflo_job_id: 'JB-87990',
    },
    resolved_at: '2026-05-20T10:40:00Z',
  },
]

export const mockProperties = [
  { id: 'PR-101', address: '14 Osmond Terrace', unit: 'Unit 5', suburb: 'Norwood, SA 5067', type: 'Apartment', tenant_name: 'Olivia Bennett', open_requests: 1 },
  { id: 'PR-102', address: '8 Sturt Street', unit: null, suburb: 'Adelaide, SA 5000', type: 'Townhouse', tenant_name: 'Marcus Reid', open_requests: 1 },
  { id: 'PR-103', address: '23 Maesbury Street', unit: 'Unit 2', suburb: 'Kensington, SA 5068', type: 'Apartment', tenant_name: 'Priya Nair', open_requests: 1 },
  { id: 'PR-104', address: '51 The Parade', unit: 'Unit 12', suburb: 'Norwood, SA 5067', type: 'Apartment', tenant_name: 'Tom Garrett', open_requests: 1 },
  { id: 'PR-105', address: '6 Cudmore Terrace', unit: null, suburb: 'Henley Beach, SA 5022', type: 'House', tenant_name: 'Hannah Foster', open_requests: 1 },
  { id: 'PR-106', address: '19 Devonport Terrace', unit: 'Unit 4', suburb: 'Prospect, SA 5082', type: 'Apartment', tenant_name: 'James Okafor', open_requests: 1 },
  { id: 'PR-107', address: '33 Goodwood Road', unit: 'Unit 8', suburb: 'Unley, SA 5061', type: 'Apartment', tenant_name: 'Sofia Russo', open_requests: 1 },
  { id: 'PR-108', address: '12 Watson Avenue', unit: null, suburb: 'Glenelg, SA 5045', type: 'House', tenant_name: 'Liam Chen', open_requests: 0 },
  { id: 'PR-109', address: '88 Esplanade', unit: 'Unit 3', suburb: 'Semaphore, SA 5019', type: 'Apartment', tenant_name: 'Emma Walsh', open_requests: 0 },
  { id: 'PR-110', address: '7 Rose Terrace', unit: 'Unit 1', suburb: 'Wayville, SA 5034', type: 'Apartment', tenant_name: 'Noah Patel', open_requests: 0 },
  { id: 'PR-111', address: '40 Magill Road', unit: 'Unit 6', suburb: 'Stepney, SA 5069', type: 'Apartment', tenant_name: 'Aisha Rahman', open_requests: 0 },
  { id: 'PR-112', address: '15 Park Terrace', unit: null, suburb: 'Gilberton, SA 5081', type: 'House', tenant_name: 'Daniel Brooks', open_requests: 0 },
  { id: 'PR-113', address: '2 Wattle Street', unit: 'Unit 9', suburb: 'Fullarton, SA 5063', type: 'Apartment', tenant_name: 'Grace Lim', open_requests: 0 },
  { id: 'PR-114', address: '27 Beulah Road', unit: null, suburb: 'Norwood, SA 5067', type: 'House', tenant_name: 'Owen Fletcher', open_requests: 0 },
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

export async function getClientProperties() {
  const base = process.env.CLIENT_API_BASE_URL
  const apiKey = process.env.CLIENT_API_KEY
  const headers = apiKey ? { 'x-api-key': apiKey } : undefined

  try {
    if (base) {
      const payload = await fetchJson(`${base.replace(/\/$/, '')}/client/properties`, headers)
      if (Array.isArray(payload)) return payload
      if (Array.isArray(payload?.properties)) return payload.properties
    }
  } catch {
    // Fallback to mock data when remote source is unavailable.
  }

  return mockProperties
}
