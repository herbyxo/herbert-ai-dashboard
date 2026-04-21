import './globals.css'

export const metadata = {
  title: 'Herbert AI Dashboard',
  description: 'Property Manager Dashboard — Herbert AI',
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
