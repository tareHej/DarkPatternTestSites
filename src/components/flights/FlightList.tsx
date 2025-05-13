'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ClockIcon,
  ArrowLongRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

// Mock data for demonstration
const flights = [
  {
    id: 1,
    airline: 'Skyways Airlines',
    departure: { time: '08:00', city: 'New York (JFK)' },
    arrival: { time: '11:30', city: 'Los Angeles (LAX)' },
    duration: '3h 30m',
    stops: 0,
    prices: {
      economy: 299,
      premium: 599,
      business: 1299,
      first: 2499,
    },
  },
  {
    id: 2,
    airline: 'Skyways Airlines',
    departure: { time: '10:30', city: 'New York (JFK)' },
    arrival: { time: '14:00', city: 'Los Angeles (LAX)' },
    duration: '3h 30m',
    stops: 1,
    prices: {
      economy: 249,
      premium: 549,
      business: 1199,
      first: 2299,
    },
  },
  // Add more mock flights as needed
]

interface FlightListProps {
  filters: {
    stops: string
    price: number[]
    times: string
    airlines: string[]
  }
}

export default function FlightList({ filters }: FlightListProps) {
  const [selectedClass, setSelectedClass] = useState<string>('premium')

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <h2 className="text-lg font-medium mb-4">Available Flights</h2>
        <div className="grid grid-cols-4 gap-2">
          {['economy', 'premium', 'business', 'first'].map((classType) => (
            <button
              key={classType}
              onClick={() => setSelectedClass(classType)}
              className={`
                p-3 rounded-lg text-sm font-medium
                ${
                  selectedClass === classType
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {classType.charAt(0).toUpperCase() + classType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <div className="p-6">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">
                  <div className="text-sm text-gray-600">{flight.airline}</div>
                  <div className="text-2xl font-bold">{flight.departure.time}</div>
                  <div className="text-sm text-gray-600">
                    {flight.departure.city}
                  </div>
                </div>

                <div className="col-span-2 flex justify-center">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      {flight.duration}
                    </div>
                    <div className="relative">
                      <div className="border-t-2 border-gray-300 w-20"></div>
                      <ArrowLongRightIcon className="h-4 w-4 text-gray-400 absolute -right-2 -top-2" />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                    </div>
                  </div>
                </div>

                <div className="col-span-3">
                  <div className="text-sm text-gray-600">&nbsp;</div>
                  <div className="text-2xl font-bold">{flight.arrival.time}</div>
                  <div className="text-sm text-gray-600">
                    {flight.arrival.city}
                  </div>
                </div>

                <div className="col-span-4 text-right">
                  <div className="text-sm text-gray-600">
                    {selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    ${flight.prices[selectedClass as keyof typeof flight.prices]}
                  </div>
                  <Link
                    href={`/booking/${flight.id}?class=${selectedClass}`}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 mt-2"
                  >
                    Select Flight
                  </Link>
                </div>
              </div>

              {selectedClass !== 'first' && (
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() =>
                      setSelectedClass(
                        selectedClass === 'economy'
                          ? 'premium'
                          : selectedClass === 'premium'
                          ? 'business'
                          : 'first'
                      )
                    }
                    className="inline-flex items-center text-sm text-primary hover:text-primary/90"
                  >
                    <SparklesIcon className="h-4 w-4 mr-1" />
                    Upgrade to{' '}
                    {selectedClass === 'economy'
                      ? 'Premium Economy'
                      : selectedClass === 'premium'
                      ? 'Business Class'
                      : 'First Class'}{' '}
                    for $
                    {selectedClass === 'economy'
                      ? flight.prices.premium - flight.prices.economy
                      : selectedClass === 'premium'
                      ? flight.prices.business - flight.prices.premium
                      : flight.prices.first - flight.prices.business}{' '}
                    more
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 