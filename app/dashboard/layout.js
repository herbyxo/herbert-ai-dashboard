import Sidebar from '@/components/Sidebar'
import { auth } from '@/auth'

// The Northbridge demo is public on purpose (decided 2 Jun 2026) so cold
// prospects can click straight in. A signed-in user still shows in the
// sidebar; with no session the sidebar falls back to the mock manager.
// /owner stays gated in its own layout.
export default async function DashboardLayout({ children }) {
  const session = await auth()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={session?.user} />
      <main className="flex-1 min-w-0 p-8">
        {children}
      </main>
    </div>
  )
}
