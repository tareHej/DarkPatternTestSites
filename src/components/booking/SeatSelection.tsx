'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface SeatSelectionProps {
  selectedClass: string
  onComplete: (data: any) => void
  onBack: () => void
}

// Mock seat data
const generateSeats = (selectedClass: string) => {
  const rows = selectedClass === 'first' ? 2 : selectedClass === 'business' ? 4 : 8
  const seatsPerRow = selectedClass === 'first' ? 4 : selectedClass === 'business' ? 6 : 8
  const seatPrice = selectedClass === 'first' ? 100 : selectedClass === 'business' ? 50 : 25

  const seats = []
  for (let row = 1; row <= rows; row++) {
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const seatLetter = String.fromCharCode(65 + seat)
      seats.push({
        id: `${row}${seatLetter}`,
        row,
        seat: seatLetter,
        price: seatPrice,
        occupied: Math.random() > 0.7,
      })
    }
  }
  return seats
}

export default function SeatSelection({
  selectedClass,
  onComplete,
  onBack,
}: SeatSelectionProps) {
  const [seats] = useState(generateSeats(selectedClass))
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const getSeatStatus = (seat: any) => {
    if (seat.occupied) return 'occupied'
    if (selectedSeats.includes(seat.id)) return 'selected'
    return 'available'
  }

  const handleSubmit = () => {
    onComplete(
      selectedSeats.map((seatId) => {
        const seat = seats.find((s) => s.id === seatId)
        return {
          seatId,
          price: seat?.price,
        }
      })
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>
      <div className="mb-8">
        <div className="flex items-center space-x-8 mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-md border-2 border-gray-300 mr-2"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-md bg-primary mr-2"></div>
            <span className="text-sm text-gray-600">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-md bg-gray-200 mr-2"></div>
            <span className="text-sm text-gray-600">Occupied</span>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="grid grid-cols-8 gap-4 p-4 justify-items-center">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => !seat.occupied && toggleSeat(seat.id)}
                  disabled={seat.occupied}
                  className={`
                    w-12 h-12 rounded-md flex items-center justify-center font-medium
                    ${
                      getSeatStatus(seat) === 'occupied'
                        ? 'bg-gray-200 cursor-not-allowed'
                        : getSeatStatus(seat) === 'selected'
                        ? 'bg-primary text-white'
                        : 'border-2 border-gray-300 hover:border-primary'
                    }
                  `}
                >
                  {seat.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedSeats.length === 0}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </motion.div>
  )
} 