import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ethical Clothing Store',
  description: 'A clothing store with an ethical checkout process',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // For now, cartItemCount is hardcoded to 0. In a real app, this would come from context or state.
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header cartItemCount={0} />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  )
} 