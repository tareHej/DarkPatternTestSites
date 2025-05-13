'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const cabinClasses = [
  { id: 'economy', name: 'Economy', description: 'Best value for money' },
  { id: 'premium', name: 'Premium Economy', description: 'Extra comfort, reasonable price' },
  { id: 'business', name: 'Business Class', description: 'Premium service and comfort' },
  { id: 'first', name: 'First Class', description: 'Ultimate luxury experience' },
]

export default function HeroSection() {
  const [departureDate, setDepartureDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [selectedCabin, setSelectedCabin] = useState('premium')
  const [passengers, setPassengers] = useState(1)

  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary">
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Elevate Your Journey
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-200">
            Experience premium travel with exclusive benefits and world-class service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 max-w-4xl bg-white rounded-lg shadow-xl p-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="departure" className="block text-sm font-medium text-gray-700">
                From
              </label>
              <input
                type="text"
                name="departure"
                id="departure"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Departure city"
              />
            </div>

            <div>
              <label htmlFor="arrival" className="block text-sm font-medium text-gray-700">
                To
              </label>
              <input
                type="text"
                name="arrival"
                id="arrival"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Arrival city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departure Date
              </label>
              <div className="mt-1 relative">
                <DatePicker
                  selected={departureDate}
                  onChange={setDepartureDate}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholderText="Select date"
                  minDate={new Date()}
                />
                <CalendarIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Return Date
              </label>
              <div className="mt-1 relative">
                <DatePicker
                  selected={returnDate}
                  onChange={setReturnDate}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholderText="Select date"
                  minDate={departureDate || new Date()}
                />
                <CalendarIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cabin Class
              </label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                {cabinClasses.map((cabin) => (
                  <div
                    key={cabin.id}
                    className={`
                      relative rounded-lg border p-4 cursor-pointer
                      ${selectedCabin === cabin.id ? 'border-primary bg-primary/5' : 'border-gray-300'}
                    `}
                    onClick={() => setSelectedCabin(cabin.id)}
                  >
                    <p className="text-sm font-medium text-gray-900">{cabin.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{cabin.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Passengers
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="rounded-md border border-gray-300 p-2"
                >
                  -
                </button>
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-lg font-medium">{passengers}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(9, passengers + 1))}
                  className="rounded-md border border-gray-300 p-2"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              className="w-full rounded-md bg-primary py-3 px-4 text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Search Flights
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 