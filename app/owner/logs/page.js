import { getOwnerLogs } from '@/lib/ownerData'
import Link from 'next/link'

const levelClass = {
  info: 'text-slate-600',
  warn: 'text-amber-700',
  error: 'text-red-600',
}

export const metadata = {
  title: 'System logs — Owner',
}

const LEVELS = ['all', 'error', 'warn', 'info']

export default async function OwnerLogsPage({ searchParams }) {
  const allLogs = await getOwnerLogs()
  const level = searchParams?.level || 'all'
  const source = (searchParams?.source || '').trim().toLowerCase()
  const filtered = allLogs.filter(line => {
    if (level !== 'all' && line.level !== level) return false
    if (source && !String(line.source || '').toLowerCase().includes(source)) return false
    return true
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">System logs</h1>
        <p className="text-gray-500 text-sm mt-1">Tail-style view with level/source filtering.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-wrap items-center gap-2">
        {LEVELS.map(item => (
          <Link
            key={item}
            href={item === 'all' ? '/owner/logs' : `/owner/logs?level=${item}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
              level === item
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            {item}
          </Link>
        ))}
        <form className="ml-auto">
          {level !== 'all' && <input type="hidden" name="level" value={level} />}
          <input
            name="source"
            defaultValue={searchParams?.source || ''}
            placeholder="Filter by source..."
            className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden text-sm font-mono">
        <div className="px-4 py-2 border-b border-gray-800 text-gray-500 text-xs">mock log stream · latest first</div>
        <div className="max-h-[min(70vh,720px)] overflow-y-auto p-2 space-y-0.5">
          {filtered.length === 0 && (
            <div className="px-2 py-6 text-center text-gray-500 text-xs">No logs for this filter.</div>
          )}
          {filtered.map((line, i) => (
            <div
              key={`${line.ts}-${i}`}
              className="px-2 py-1 rounded hover:bg-gray-800/50 flex flex-wrap gap-x-3 gap-y-0.5 text-left"
            >
              <span className="text-gray-500 shrink-0">{line.ts}</span>
              <span className={`shrink-0 font-semibold w-12 ${levelClass[line.level] || 'text-gray-400'}`}>
                {line.level}
              </span>
              <span className="text-cyan-600 shrink-0">{line.source}</span>
              <span className="text-gray-200 min-w-0 break-all">{line.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
