import './globals.css'

export const metadata = {
  title: 'Northbridge Property Co. — Maintenance Portal',
  description: 'AI-powered tenant maintenance intake and approvals. Powered by Herbert AI.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
