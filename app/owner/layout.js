import OwnerSidebar from '@/components/OwnerSidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { isOwnerEmail } from '@/lib/isOwner'

export default async function OwnerLayout({ children }) {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/login?callbackUrl=' + encodeURIComponent('/owner'))
  }

  if (!isOwnerEmail(session.user.email)) {
    redirect('/access-denied')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar user={session.user} />
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  )
}
