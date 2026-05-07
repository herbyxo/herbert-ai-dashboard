/**
 * Claude Dev Setup — health monitor data.
 *
 * Static for now. Future: update_memory.py pushes a JSON blob to Supabase
 * after each session → replace with a Supabase fetch here.
 */

export const claudeSummary = {
  version: '2.1.129',
  autoMemory: true,
  contextMode: true,
  mcpCount: 7,
  projectsWired: 9,   // CLAUDE.md exists
  projectsTotal: 9,
  lastMemoryRun: null, // will populate once first Stop hook fires
}

export const projects = [
  {
    name: 'Herbert AI',
    dir: 'C:/Files/Herbert AI/',
    claudeMd: true,
    skillWired: true,
    memoryWired: true,
    skill: '/herbertai',
    lastSession: null,
  },
  {
    name: 'Orbit',
    dir: 'C:/Files/Apps/Orbit/',
    claudeMd: true,
    skillWired: false,
    memoryWired: true,
    skill: '/orbit',
    lastSession: null,
  },
  {
    name: 'Clutch',
    dir: 'C:/Files/Apps/clutch/',
    claudeMd: true,
    skillWired: false,
    memoryWired: true,
    skill: '/clutch',
    lastSession: null,
  },
  {
    name: 'ADSA',
    dir: 'C:/Files/University Work/Algorithm & Data Structure Analysis/',
    claudeMd: true,
    skillWired: true,
    memoryWired: true,
    skill: '/adsa',
    lastSession: null,
  },
  {
    name: 'Cloud Platforms',
    dir: 'C:/Files/University Work/Cloud Platforms/',
    claudeMd: true,
    skillWired: true,
    memoryWired: true,
    skill: '/cloud-platforms',
    lastSession: null,
  },
  {
    name: 'System Architecture',
    dir: 'C:/Files/University Work/System Architecture/',
    claudeMd: true,
    skillWired: true,
    memoryWired: true,
    skill: '/system-architecture',
    lastSession: null,
  },
  {
    name: 'SPI',
    dir: 'C:/Files/University Work/Software Process Improvement/',
    claudeMd: true,
    skillWired: true,
    memoryWired: true,
    skill: '/software-process-improvement',
    lastSession: null,
  },
  {
    name: 'Claude Setup',
    dir: 'C:/Files/Claude/',
    claudeMd: true,
    skillWired: false,
    memoryWired: true,
    skill: null,
    lastSession: '2026-05-07',
  },
  {
    name: 'YouTube Automation',
    dir: 'C:/Files/YouTube Automation/',
    claudeMd: false,
    skillWired: true,
    memoryWired: false,
    skill: '/youtube-automation',
    lastSession: null,
  },
]

export const mcpServers = [
  { name: 'GitHub', status: 'active', description: 'Repo access, PR management, issues' },
  { name: 'Context7', status: 'active', description: 'Up-to-date library docs for any package' },
  { name: 'Supabase', status: 'active', description: 'Database + auth queries directly in session' },
  { name: 'Vercel', status: 'active', description: 'Deploy management, env vars, domains' },
  { name: 'Playwright', status: 'active', description: 'Browser automation and scraping' },
  { name: 'Notion', status: 'active', description: 'Notion workspace read/write' },
  { name: 'Memory', status: 'active', description: 'Knowledge graph at C:/Files/Claude/memory/knowledge_graph.json' },
]

export const plugins = [
  {
    name: 'context-mode',
    status: 'active',
    description: 'Auto-compresses context window. 12 hooks. Keeps sessions lean.',
    source: 'github:mksglu/context-mode',
  },
  {
    name: 'toprank',
    status: 'active',
    description: 'Google Search Console, Google Ads, Meta Ads analysis + SEO audits.',
    source: 'github:nowork-studio/toprank',
  },
  {
    name: 'claude-ads',
    status: 'active',
    description: '250+ checks across Google, Meta, YouTube, LinkedIn, TikTok, Microsoft, Apple Ads.',
    source: 'github:AgriciDaniel/claude-ads',
  },
]

export const hooks = [
  {
    event: 'Stop',
    command: 'update_memory.py',
    status: 'active',
    description: 'Reads session transcript → detects project → calls Haiku → writes bullet summary to project memory file.',
  },
  {
    event: 'SessionStart',
    command: 'context-mode-cache-heal.mjs',
    status: 'active',
    description: 'Reestablishes context-mode compression state at the start of each session.',
  },
]

export const skillSources = [
  {
    source: 'anthropic-skills (plugin)',
    count: 25,
    examples: ['herbertai', 'orbit', 'adsa', 'cloud-platforms', 'n8n', 'vapi', 'git', 'deep-research', 'pdf', 'xlsx', 'docx'],
  },
  {
    source: 'toprank (plugin)',
    count: 17,
    examples: ['google-ads', 'meta-ads', 'seo-analysis', 'keyword-research', 'content-writer'],
  },
  {
    source: 'claude-ads (plugin)',
    count: 20,
    examples: ['ads-google', 'ads-meta', 'ads-audit', 'ads-budget', 'ads-creative'],
  },
  {
    source: 'claude-skills (local repo)',
    count: 15,
    examples: ['create-skill', 'plan', 'battle-station', 'clutch', 'solo-builder-playbook', 'statusline'],
  },
]
