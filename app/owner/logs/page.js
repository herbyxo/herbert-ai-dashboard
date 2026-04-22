import { mockSystemLog } from '@/lib/ownerData'

const levelClass = {
  info: 'text-slate-600',
  warn: 'text-amber-700',
  error: 'text-red-600',
}

export const metadata = {
  title: 'System logs — Owner',
}

export default function OwnerLogsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">System logs</h1>
        <p className="text-gray-500 text-sm mt-1">Tail-style view. Hook this to your log backend when ready.</p>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden text-sm font-mono">
        <div className="px-4 py-2 border-b border-gray-800 text-gray-500 text-xs">mock log stream · latest first</div>
        <div className="max-h-[min(70vh,720px)] overflow-y-auto p-2 space-y-0.5">
          {mockSystemLog.map((line, i) => (
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
