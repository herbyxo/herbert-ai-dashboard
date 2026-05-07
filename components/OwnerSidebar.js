'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  ScrollText,
  Bot,
  LogOut,
  Building2,
  ExternalLink,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '/owner', icon: LayoutDashboard },
  { label: 'System logs', href: '/owner/logs', icon: ScrollText },
  { label: 'Agents', href: '/owner/agents', icon: Bot },
]

export default function OwnerSidebar({ user }) {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Herbert AI</div>
            <div className="text-xs text-indigo-600 font-medium">Owner console</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            href === '/owner' ? pathname === '/owner' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                active
                  ? 'bg-indigo-50 text-indigo-900'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}

        <div className="pt-3 mt-3 border-t border-gray-100">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            PM dashboard (demo)
          </Link>
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <div className="px-3 py-2 mb-1">
          <div className="text-xs font-medium text-gray-900 truncate">{user?.name || 'Owner'}</div>
          <div className="text-xs text-gray-400 truncate">{user?.email}</div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
