'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from 'next/navigation'

// Sample destinations for demonstration
const destinations = [
  { code: 'ARN', name: 'Stockholm Arlanda' },
  { code: 'CPH', name: 'Copenhagen Airport' },
  { code: 'OSL', name: 'Oslo Airport' },
  { code: 'HEL', name: 'Helsinki Airport' },
]

export default function Home() {
  const [departureDate, setDepartureDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [passengers, setPassengers] = useState(1)
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!origin || !destination || !departureDate) {
      alert('Please fill in all required fields')
      return
    }

    // If roundtrip, validate return date
    if (tripType === 'roundtrip' && !returnDate) {
      alert('Please select a return date')
      return
    }

    // Navigate to search results with query parameters
    const searchParams = new URLSearchParams({
      origin,
      destination,
      departureDate: departureDate.toISOString(),
      passengers: passengers.toString(),
      tripType
    })

    if (returnDate) {
      searchParams.append('returnDate', returnDate.toISOString())
    }

    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find your flight</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Type Selection */}
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="roundtrip"
                checked={tripType === 'roundtrip'}
                onChange={(e) => setTripType('roundtrip')}
                className="h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Round Trip</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="oneway"
                checked={tripType === 'oneway'}
                onChange={(e) => setTripType('oneway')}
                className="h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-gray-700">One Way</span>
            </label>
          </div>

          {/* Origin and Destination */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                From
              </label>
              <select
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select departure airport</option>
                {destinations.map((dest) => (
                  <option key={dest.code} value={dest.code}>
                    {dest.name} ({dest.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                To
              </label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select arrival airport</option>
                {destinations.map((dest) => (
                  <option key={dest.code} value={dest.code}>
                    {dest.name} ({dest.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departure Date
              </label>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                minDate={new Date()}
                placeholderText="Select departure date"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            {tripType === 'roundtrip' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Return Date
                </label>
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  minDate={departureDate || new Date()}
                  placeholderText="Select return date"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            )}
          </div>

          {/* Passengers */}
          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
              Passengers
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="passengers"
                id="passengers"
                min="1"
                max="9"
                value={passengers}
                onChange={(e) => setPassengers(Math.min(9, Math.max(1, parseInt(e.target.value) || 1)))}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Maximum 9 passengers per booking</p>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Search Flights
            </button>
          </div>
        </form>

        {/* Transparent Information */}
        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Important Information</h3>
          <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
            <li>All prices shown include taxes and fees</li>
            <li>Free cancellation within 24 hours of booking</li>
            <li>Baggage fees will be clearly displayed before payment</li>
            <li>No hidden charges or surprise fees</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 