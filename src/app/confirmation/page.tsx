'use client'

import { Card, Button } from '@/components'
import { useRouter } from 'next/navigation'

export default function Confirmation() {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="text-center mb-8">
        <div className="rounded-full bg-green-100 h-20 w-20 flex items-center justify-center mx-auto mb-4">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Your booking reference is: <span className="font-medium">C4X123</span>
        </p>
        <p className="text-sm text-gray-600">
          A confirmation email has been sent to john.doe@example.com
        </p>
      </Card>

      {/* Flight Details */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Flight Details</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900">March 15, 2024</p>
            <div className="flex items-center space-x-4 mt-1">
              <div>
                <p className="text-2xl font-semibold text-gray-900">08:00</p>
                <p className="text-sm text-gray-600">Stockholm (ARN)</p>
              </div>
              <div className="flex-1 px-4">
                <div className="h-0.5 bg-gray-300 relative">
                  <div className="absolute -top-3 w-full text-center">
                    <span className="text-sm text-gray-600">1h 15m</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">09:15</p>
                <p className="text-sm text-gray-600">Copenhagen (CPH)</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>Flight: C4 123</p>
            <p>Passenger: Mr John Doe</p>
            <p>Seat: 12A</p>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="rounded-full bg-primary-100 h-8 w-8 flex items-center justify-center">
                <span className="text-primary-600 font-medium">1</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium text-gray-900">Online Check-in</h3>
              <p className="text-sm text-gray-600">
                Online check-in opens 24 hours before your flight. You'll receive an email reminder.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="rounded-full bg-primary-100 h-8 w-8 flex items-center justify-center">
                <span className="text-primary-600 font-medium">2</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium text-gray-900">At the Airport</h3>
              <p className="text-sm text-gray-600">
                Arrive at least 2 hours before your flight. Head to bag drop if you have checked baggage.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Important Information */}
      <div className="bg-blue-50 rounded-md p-4 mb-8">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Important Information</h3>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>Free cancellation available within 24 hours</li>
          <li>Check-in opens 24 hours before departure</li>
          <li>Arrive at the airport at least 2 hours before your flight</li>
          <li>Don't forget your valid ID or passport</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={() => {/* Add to calendar functionality */}}
          variant="secondary"
        >
          Add to Calendar
        </Button>
        <Button
          onClick={() => router.push('/')}
        >
          Book Another Flight
        </Button>
      </div>
    </div>
  )
} 