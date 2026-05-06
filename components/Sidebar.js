'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Phone,
  Star,
  TrendingUp,
  MessageSquare,
  LogOut,
  Zap,
  Lock,
} from 'lucide-react'
import { mockClient } from '@/lib/mockData'

const allNavItems = [
  { label: 'Overview',           href: '/dashboard',           icon: LayoutDashboard, product: null },
  { label: 'Voice Receptionist', href: '/dashboard/voice',     icon: Phone,           product: 'voice' },
  { label: 'Reviews',            href: '/dashboard/reviews',   icon: Star,            product: 'reviews' },
  { label: 'SEO',                href: '/dashboard/seo',       icon: TrendingUp,      product: 'seo' },
  { label: 'Chatbot',            href: '/dashboard/chatbot',   icon: MessageSquare,   product: 'chatbot' },
]

export default function Sidebar({ user }) {
  const pathname = usePathname()
  const active = mockClient.active_products

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen">

      {/* Logo + business name */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{mockClient.business_name}</div>
            <div className="text-xs text-gray-400">Herbert AI Portal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {allNavItems.map(({ label, href, icon: Icon, product }) => {
          const isActive =
            href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(href)
          const isLocked = product && !active.includes(product)

          if (isLocked) {
            return (
              <div
                key={href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 cursor-not-allowed select-none"
                title="Not in your current plan"
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                <Lock className="w-3 h-3 ml-auto opacity-60" />
              </div>
            )
          }

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User + sign out */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="px-3 py-2 mb-1">
          <div className="text-xs font-medium text-gray-900 truncate">{user?.name || mockClient.owner_name}</div>
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
