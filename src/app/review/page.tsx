'use client'

import { useState } from 'react'
import { Card, Button } from '@/components'
import { useRouter } from 'next/navigation'

// Sample booking data (in a real app, this would come from your booking context/state)
const bookingData = {
  flight: {
    departure: 'Stockholm (ARN)',
    arrival: 'Copenhagen (CPH)',
    date: 'March 15, 2024',
    time: '08:00 - 09:15',
    flightNumber: 'C4 123',
  },
  passengers: [
    {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      seatNumber: '12A',
    }
  ],
  extras: [
    {
      name: 'Checked Baggage (23kg)',
      price: 30,
    },
    {
      name: 'Meal Service',
      price: 12,
    }
  ],
  pricing: {
    baseFare: 89,
    taxes: 20,
    extras: 42,
    total: 151,
  }
}

export default function ReviewBooking() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push('/confirmation')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Review Your Booking</h1>
        <p className="mt-2 text-sm text-gray-600">
          Please review all the details of your booking before proceeding to payment.
        </p>
      </div>

      {/* Flight Details */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Flight Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">{bookingData.flight.date}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div>
                  <p className="text-2xl font-semibold text-gray-900">08:00</p>
                  <p className="text-sm text-gray-600">{bookingData.flight.departure}</p>
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
                  <p className="text-sm text-gray-600">{bookingData.flight.arrival}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Flight</p>
              <p className="text-sm font-medium text-gray-900">{bookingData.flight.flightNumber}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Passenger Details */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Passenger Details</h2>
        {bookingData.passengers.map((passenger, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {passenger.title} {passenger.firstName} {passenger.lastName}
              </p>
              <p className="text-sm text-gray-600">Seat {passenger.seatNumber}</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => router.push('/passenger-details')}
            >
              Edit
            </Button>
          </div>
        ))}
      </Card>

      {/* Selected Extras */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Selected Extras</h2>
        <div className="space-y-4">
          {bookingData.extras.map((extra, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="text-sm text-gray-900">{extra.name}</p>
              <p className="text-sm font-medium text-gray-900">€{extra.price}</p>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() => router.push('/customize')}
            className="w-full mt-4"
          >
            Modify Extras
          </Button>
        </div>
      </Card>

      {/* Price Summary */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base fare</span>
            <span className="text-gray-900">€{bookingData.pricing.baseFare}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxes and fees</span>
            <span className="text-gray-900">€{bookingData.pricing.taxes}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Selected extras</span>
            <span className="text-gray-900">€{bookingData.pricing.extras}</span>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-900">Total</span>
              <span className="text-base font-medium text-gray-900">€{bookingData.pricing.total}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Terms and Payment */}
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I accept the terms and conditions and confirm that all passenger information is correct
                </label>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            Proceed to Payment
          </Button>
        </div>
      </form>

      {/* Booking Information */}
      <div className="mt-8 bg-blue-50 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Booking Information</h3>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>Your payment will be processed securely</li>
          <li>Free cancellation within 24 hours of booking</li>
          <li>All prices are final with no hidden fees</li>
          <li>Your booking is protected by our customer guarantee</li>
        </ul>
      </div>
    </div>
  )
} 