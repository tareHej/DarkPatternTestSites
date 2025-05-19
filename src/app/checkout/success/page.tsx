'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CheckoutSuccess() {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
      <div className="mb-8">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Thank You for Your Order!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your order has been successfully placed. You will receive a confirmation email shortly.
      </p>
      <div className="space-y-4">
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
        <div>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  )
} 