// Mock data for Herbert AI client portal
// Replace with real API calls once clients are live

export const mockClient = {
  business_name: "Sparky's Electrical",
  owner_name: 'Mike Sparks',
  suburb: 'Adelaide, SA',
  active_products: ['voice', 'reviews', 'chatbot'], // 'seo' not active yet
}

// ─── Voice Receptionist ───────────────────────────────────────────────────────

export const mockVoiceStats = {
  calls_this_month: 24,
  calls_last_month: 17,
  bookings_created: 11,
  bookings_last_month: 7,
  avg_call_duration: '1m 52s',
  emergencies_this_month: 1,
  estimated_revenue_captured: 4400, // bookings × ~$400 avg callout
}

export const mockCalls = [
  {
    id: 'CALL-001',
    caller_name: 'James Nguyen',
    phone: '0412 345 678',
    date: '2026-05-06T14:32:00Z',
    duration: '2m 14s',
    outcome: 'booked',
    job_type: 'Switchboard fault',
    summary: 'Customer reported a switchboard fault causing intermittent power loss in the kitchen. Agent collected full address, confirmed urgency, and booked for next business day.',
  },
  {
    id: 'CALL-002',
    caller_name: 'Sarah Mitchell',
    phone: '0423 789 012',
    date: '2026-05-05T09:14:00Z',
    duration: '1m 38s',
    outcome: 'booked',
    job_type: 'Safety switch install',
    summary: 'Requested a safety switch installation for a new laundry circuit. Agent confirmed address and property type, booked a quote inspection for Wednesday morning.',
  },
  {
    id: 'CALL-003',
    caller_name: 'Unknown caller',
    phone: '0455 111 222',
    date: '2026-05-05T07:02:00Z',
    duration: '0m 48s',
    outcome: 'message',
    job_type: 'General enquiry',
    summary: 'Caller asked about pricing for a full house rewire. Agent captured contact details and passed message to owner to follow up during business hours.',
  },
  {
    id: 'CALL-004',
    caller_name: 'Priya Sharma',
    phone: '0401 654 321',
    date: '2026-05-04T18:55:00Z',
    duration: '3m 05s',
    outcome: 'emergency',
    job_type: 'Sparking power point',
    summary: 'Customer reported sparks from a power point and slight burning smell. Agent flagged as emergency and rang owner mobile directly. Job attended same evening.',
  },
  {
    id: 'CALL-005',
    caller_name: 'Liam Chen',
    phone: '0487 333 444',
    date: '2026-05-03T11:30:00Z',
    duration: '1m 22s',
    outcome: 'booked',
    job_type: 'Downlight replacement',
    summary: 'Requested replacement of 6 downlights throughout the living area. Agent confirmed address and booked a quote for Friday afternoon.',
  },
  {
    id: 'CALL-006',
    caller_name: 'Emma Walsh',
    phone: '0466 789 000',
    date: '2026-05-02T15:40:00Z',
    duration: '2m 01s',
    outcome: 'booked',
    job_type: 'Outdoor power point',
    summary: 'Customer wants a weatherproof outdoor power point installed near the garage for a new EV charger. Agent captured details and booked for next week.',
  },
  {
    id: 'CALL-007',
    caller_name: 'Noah Patel',
    phone: '0444 321 654',
    date: '2026-05-01T08:20:00Z',
    duration: '1m 10s',
    outcome: 'message',
    job_type: 'Certificate of compliance',
    summary: 'Caller enquired about obtaining an electrical compliance certificate for a property sale. Agent took contact details for owner to call back.',
  },
]

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const mockReviewStats = {
  current_rating: 4.8,
  total_reviews: 23,
  new_this_month: 3,
  new_last_month: 1,
  rating_last_month: 4.7,
}

export const mockReviews = [
  {
    id: 'REV-001',
    author: 'James N.',
    rating: 5,
    date: '2026-05-05T10:00:00Z',
    text: 'Called after hours and got through straight away. The AI receptionist was surprisingly natural — had all my details sorted and Mike was on the job the next morning. Brilliant service.',
  },
  {
    id: 'REV-002',
    author: 'Sarah M.',
    rating: 5,
    date: '2026-05-04T14:30:00Z',
    text: 'Really impressed. Mike turned up exactly when they said he would, fixed the safety switch quickly, and didn\'t leave a mess. Will use again for sure.',
  },
  {
    id: 'REV-003',
    author: 'T. Williams',
    rating: 4,
    date: '2026-05-01T09:15:00Z',
    text: 'Good work overall. Took a little longer than quoted but Mike was upfront about it. Price was fair. Happy to recommend.',
  },
  {
    id: 'REV-004',
    author: 'Priya S.',
    rating: 5,
    date: '2026-04-29T11:00:00Z',
    text: 'Had a sparking power point — called and Mike arrived within 2 hours. Sorted it fast and explained what caused it. Couldn\'t ask for better.',
  },
  {
    id: 'REV-005',
    author: 'Daniel R.',
    rating: 5,
    date: '2026-04-22T16:45:00Z',
    text: 'Very professional, knew exactly what needed doing. Price was competitive and quality of work was top notch. Highly recommend.',
  },
]

// ─── Chatbot ──────────────────────────────────────────────────────────────────

export const mockChatbotStats = {
  conversations_this_month: 41,
  conversations_last_month: 29,
  leads_captured: 8,
  leads_last_month: 5,
  avg_response_time: '< 3s',
}

export const mockChatConversations = [
  {
    id: 'CHAT-001',
    visitor: 'Website visitor',
    date: '2026-05-06T13:20:00Z',
    outcome: 'lead',
    first_message: 'Do you do EV charger installs?',
    summary: 'Visitor asked about EV charger installation. Chatbot confirmed service availability, captured name, phone, and suburb. Lead passed to owner.',
  },
  {
    id: 'CHAT-002',
    visitor: 'Website visitor',
    date: '2026-05-05T17:45:00Z',
    outcome: 'answered',
    first_message: 'What areas do you cover?',
    summary: 'Visitor asked about service areas. Chatbot confirmed coverage across Adelaide metro and listed key suburbs. No contact details captured.',
  },
  {
    id: 'CHAT-003',
    visitor: 'Website visitor',
    date: '2026-05-04T10:10:00Z',
    outcome: 'lead',
    first_message: 'How much does a switchboard upgrade cost?',
    summary: 'Visitor enquired about switchboard upgrade pricing. Chatbot explained it depends on board size and captured contact details for a free quote.',
  },
  {
    id: 'CHAT-004',
    visitor: 'Website visitor',
    date: '2026-05-03T14:55:00Z',
    outcome: 'answered',
    first_message: 'Are you available on weekends?',
    summary: 'Visitor asked about weekend availability. Chatbot confirmed weekend bookings are available for non-emergency work with prior notice.',
  },
  {
    id: 'CHAT-005',
    visitor: 'Website visitor',
    date: '2026-05-02T09:30:00Z',
    outcome: 'lead',
    first_message: 'I need a safety switch installed urgently',
    summary: 'Visitor reported urgent safety switch need. Chatbot captured full contact details and flagged as priority lead for owner follow-up.',
  },
]

// ─── SEO (inactive — shown as locked) ────────────────────────────────────────

export const mockSEOStats = {
  organic_visits_this_month: null,
  leads_from_seo: null,
  top_keyword: null,
  active: false,
}
