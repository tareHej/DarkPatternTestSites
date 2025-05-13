'use client'

import { motion } from 'framer-motion'

interface BookingSummaryProps {
  flightId: string
  selectedClass: string
  bookingData: {
    passengers: any[]
    seats: any[]
    extras: any[]
  }
}

// Mock flight data
const flight = {
  airline: 'Skyways Airlines',
  departure: { time: '08:00', city: 'New York (JFK)' },
  arrival: { time: '11:30', city: 'Los Angeles (LAX)' },
  prices: {
    economy: 299,
    premium: 599,
    business: 1299,
    first: 2499,
  },
}

export default function BookingSummary({
  flightId,
  selectedClass,
  bookingData,
}: BookingSummaryProps) {
  const basePrice = flight.prices[selectedClass as keyof typeof flight.prices]
  const seatsCost = bookingData.seats.reduce(
    (total, seat) => total + (seat.price || 0),
    0
  )
  const extrasCost = bookingData.extras.reduce(
    (total, extra) => total + (extra.price || 0),
    0
  )
  const totalCost = basePrice + seatsCost + extrasCost

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <h2 className="text-xl font-bold mb-6">Booking Summary</h2>

      <div className="space-y-6">
        {/* Flight Details */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Flight</h3>
          <div className="text-sm">
            <div className="font-medium">{flight.airline}</div>
            <div className="mt-1">
              {flight.departure.city} → {flight.arrival.city}
            </div>
            <div className="text-gray-500">
              {flight.departure.time} - {flight.arrival.time}
            </div>
          </div>
        </div>

        {/* Class Details */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Class</h3>
          <div className="text-sm font-medium">
            {selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}
          </div>
          <div className="text-sm text-gray-500">${basePrice}</div>
        </div>

        {/* Passengers */}
        {bookingData.passengers.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Passengers</h3>
            {bookingData.passengers.map((passenger, index) => (
              <div key={index} className="text-sm">
                {passenger.firstName} {passenger.lastName}
              </div>
            ))}
          </div>
        )}

        {/* Selected Seats */}
        {bookingData.seats.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Selected Seats
            </h3>
            <div className="text-sm space-y-1">
              {bookingData.seats.map((seat, index) => (
                <div key={index} className="flex justify-between">
                  <span>Seat {seat.seatId}</span>
                  <span>${seat.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Extras */}
        {bookingData.extras.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Selected Extras
            </h3>
            <div className="text-sm space-y-1">
              {bookingData.extras.map((extra, index) => (
                <div key={index} className="flex justify-between">
                  <span>{extra.name}</span>
                  <span>
                    {extra.price === 0 ? 'Included' : `$${extra.price}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium">Total</span>
            <span className="text-2xl font-bold text-primary">
              ${totalCost.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            All prices include taxes and fees
          </p>
        </div>
      </div>
    </motion.div>
  )
} 