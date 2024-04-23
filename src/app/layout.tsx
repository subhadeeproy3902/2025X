import type { Metadata } from 'next'
import './globals.css'



export const metadata: Metadata = {
  title: '2025X',
  description: 'Frameworks of the future wishing you a happy new year',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
