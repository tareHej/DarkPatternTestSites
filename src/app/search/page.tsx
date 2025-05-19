'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, Button } from '@/components'

// Sample flight data for demonstration
const sampleFlights = [
  {
    id: 1,
    departure: 'ARN',
    arrival: 'CPH',
    departureTime: '08:00',
    arrivalTime: '09:15',
    duration: '1h 15m',
    price: 89,
    aircraft: 'Boeing 737-800',
    stops: 0,
    basePrice: 69,
    taxes: 20,
    availableSeats: 45,
  },
  {
    id: 2,
    departure: 'ARN',
    arrival: 'CPH',
    departureTime: '12:30',
    arrivalTime: '13:45',
    duration: '1h 15m',
    price: 79,
    aircraft: 'Airbus A320',
    stops: 0,
    basePrice: 59,
    taxes: 20,
    availableSeats: 12,
  },
]

export default function SearchResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedSort, setSelectedSort] = useState('price')
  const [showPriceBreakdown, setShowPriceBreakdown] = useState<number | null>(null)
  const [searchSummary, setSearchSummary] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1
  })

  useEffect(() => {
    // Get search parameters from URL
    const origin = searchParams.get('origin') || ''
    const destination = searchParams.get('destination') || ''
    const departureDate = searchParams.get('departureDate')
    const passengers = parseInt(searchParams.get('passengers') || '1')

    // Format date
    const formattedDate = departureDate 
      ? new Date(departureDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      : ''

    setSearchSummary({
      origin,
      destination,
      date: formattedDate,
      passengers
    })
  }, [searchParams])

  const handleFlightSelect = (flightId: number) => {
    // In a real app, you would store the selected flight in a global state or context
    // For now, we'll just navigate to the passenger details page
    router.push('/passenger-details')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {searchSummary.origin} → {searchSummary.destination}
        </h2>
        <p className="text-sm text-gray-600">
          {searchSummary.date} · {searchSummary.passengers} {searchSummary.passengers === 1 ? 'passenger' : 'passengers'}
        </p>
      </div>

      {/* Sorting Options */}
      <div className="mb-6">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
          Sort by
        </label>
        <select
          id="sort"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
        >
          <option value="price">Lowest price</option>
          <option value="duration">Shortest duration</option>
          <option value="departure">Earliest departure</option>
        </select>
      </div>

      {/* Flight List */}
      <div className="space-y-4">
        {sampleFlights.map((flight) => (
          <Card key={flight.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                {/* Flight Times */}
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{flight.departureTime}</p>
                    <p className="text-sm text-gray-600">{flight.departure}</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="h-0.5 bg-gray-300 relative">
                      <div className="absolute -top-3 w-full text-center">
                        <span className="text-sm text-gray-600">{flight.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{flight.arrivalTime}</p>
                    <p className="text-sm text-gray-600">{flight.arrival}</p>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="text-sm text-gray-600">
                  <p>Aircraft: {flight.aircraft}</p>
                  <p>Available seats: {flight.availableSeats}</p>
                  {flight.stops === 0 ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Direct Flight
                    </span>
                  ) : (
                    <span className="text-gray-600">{flight.stops} stop(s)</span>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">€{flight.price}</p>
                <button
                  onClick={() => setShowPriceBreakdown(showPriceBreakdown === flight.id ? null : flight.id)}
                  className="text-sm text-primary-600 hover:text-primary-700 mt-1"
                >
                  {showPriceBreakdown === flight.id ? 'Hide details' : 'Show price details'}
                </button>

                {showPriceBreakdown === flight.id && (
                  <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <div className="space-y-1">
                      <p>Base fare: €{flight.basePrice}</p>
                      <p>Taxes & fees: €{flight.taxes}</p>
                      <div className="border-t border-gray-300 mt-2 pt-2">
                        <p className="font-semibold">Total: €{flight.price}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => handleFlightSelect(flight.id)}
                  className="mt-4 w-full"
                >
                  Select Flight
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Transparent Information */}
      <div className="mt-8 bg-blue-50 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Important Information</h3>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>All prices shown include taxes and fees</li>
          <li>Free cancellation within 24 hours of booking</li>
          <li>Baggage fees will be clearly displayed before payment</li>
          <li>No hidden charges or surprise fees</li>
        </ul>
      </div>
    </div>
  )
} 