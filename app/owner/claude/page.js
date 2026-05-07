import {
  claudeSummary,
  projects,
  mcpServers,
  plugins,
  hooks,
  skillSources,
} from '@/lib/claudeData'

export const metadata = { title: 'Claude — Owner' }

// ── helpers ─────────────────────────────────────────────────────────────────

function Pill({ ok, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
        ok ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
      }`}
    >
      <span>{ok ? '✓' : '–'}</span>
      {label}
    </span>
  )
}

function StatusDot({ active }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 ${
        active ? 'bg-emerald-500' : 'bg-gray-300'
      }`}
    />
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  )
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function ClaudePage() {
  const wiredCount = projects.filter(p => p.claudeMd && p.memoryWired).length

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Claude</h1>
        <p className="text-gray-500 text-sm mt-1">
          AI dev setup health — tools, memory, project wiring, and skills.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Claude Code" value={`v${claudeSummary.version}`} />
        <StatCard
          label="Auto memory"
          value={claudeSummary.autoMemory ? 'Active' : 'Off'}
          ok={claudeSummary.autoMemory}
        />
        <StatCard
          label="Context Mode"
          value={claudeSummary.contextMode ? 'Active' : 'Off'}
          ok={claudeSummary.contextMode}
        />
        <StatCard
          label="Projects wired"
          value={`${wiredCount} / ${projects.length}`}
          ok={wiredCount === projects.length}
        />
      </div>

      {/* Projects */}
      <div className="mb-10">
        <SectionHeader
          title="Projects"
          subtitle="CLAUDE.md presence, skill load, and memory wiring per project."
        />
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Project</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">CLAUDE.md</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Skill</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Memory</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Last session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map(p => (
                <tr key={p.name} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-900">{p.name}</div>
                    {p.skill && (
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{p.skill}</div>
                    )}
                  </td>
                  <td className="px-5 py-3.5"><Pill ok={p.claudeMd} label={p.claudeMd ? 'Yes' : 'No'} /></td>
                  <td className="px-5 py-3.5"><Pill ok={p.skillWired} label={p.skillWired ? 'Wired' : 'No'} /></td>
                  <td className="px-5 py-3.5"><Pill ok={p.memoryWired} label={p.memoryWired ? 'Wired' : 'No'} /></td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {p.lastSession ?? (
                      <span className="text-gray-300 italic">pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two-col: MCPs + Plugins */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* MCPs */}
        <div>
          <SectionHeader title="MCP servers" subtitle={`${mcpServers.length} configured globally`} />
          <div className="space-y-2">
            {mcpServers.map(m => (
              <div key={m.name} className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-start gap-3">
                <StatusDot active={m.status === 'active'} />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900">{m.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{m.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plugins + Hooks */}
        <div className="space-y-6">
          <div>
            <SectionHeader title="Plugins" subtitle="Installed via Claude Code marketplace" />
            <div className="space-y-2">
              {plugins.map(p => (
                <div key={p.name} className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-start gap-3">
                  <StatusDot active={p.status === 'active'} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{p.description}</div>
                    <div className="text-xs text-gray-300 font-mono mt-1">{p.source}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Hooks" subtitle="Automated triggers around sessions" />
            <div className="space-y-2">
              {hooks.map(h => (
                <div key={h.event} className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-start gap-3">
                  <StatusDot active={h.status === 'active'} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{h.event}</span>
                      <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                        {h.command}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{h.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <SectionHeader
          title="Skills"
          subtitle={`${skillSources.reduce((a, s) => a + s.count, 0)} total across ${skillSources.length} sources`}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {skillSources.map(s => (
            <div key={s.source} className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-900">{s.source}</div>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {s.count}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.examples.map(e => (
                  <span key={e} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

function StatCard({ label, value, ok }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${ok === false ? 'text-red-600' : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  )
}
