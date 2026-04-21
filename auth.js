import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { checkRateLimit, resetRateLimit } from '@/lib/rateLimit'
import { headers } from 'next/headers'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const headersList = await headers()
        const ip =
          headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          headersList.get('x-real-ip') ||
          'unknown'

        const { allowed } = checkRateLimit(ip)
        if (!allowed) {
          throw new Error('Too many login attempts. Try again later.')
        }

        // TODO: replace with real DB lookup
        const validEmail = process.env.DEMO_EMAIL || 'manager@demo.com'
        const validPassword = process.env.DEMO_PASSWORD || 'demo1234'

        if (
          credentials?.email === validEmail &&
          credentials?.password === validPassword
        ) {
          resetRateLimit(ip)
          return { id: '1', name: 'Property Manager', email: validEmail }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
})
