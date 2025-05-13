import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'C3 Store - Premium Clothing',
  description: 'Your premium clothing destination',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">About Us</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Our Story</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Sustainability</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Careers</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Service</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Contact Us</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Shipping Info</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Returns</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">FAQ</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Instagram</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Twitter</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">Facebook</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">Subscribe to get special offers, free giveaways, and updates.</p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 