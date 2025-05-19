'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components'

// Sample seat map data
const seatMap = {
  rows: [
    ['A1', 'B1', 'C1', null, 'D1', 'E1', 'F1'],
    ['A2', 'B2', 'C2', null, 'D2', 'E2', 'F2'],
    ['A3', 'B3', 'C3', null, 'D3', 'E3', 'F3'],
  ],
  occupied: ['A1', 'B2', 'E1'],
  prices: {
    standard: 0,
    extra_legroom: 15,
    front: 10,
  }
}

// Sample extras
const extras = [
  {
    id: 'baggage',
    name: 'Checked Baggage',
    description: 'Add a 23kg checked bag',
    price: 30,
    included: '8kg carry-on included in base fare'
  },
  {
    id: 'meal',
    name: 'Meal Service',
    description: 'Choose from our menu of fresh meals',
    price: 12,
    included: 'Complimentary water and snack included in base fare'
  },
  {
    id: 'insurance',
    name: 'Travel Insurance',
    description: 'Comprehensive travel insurance',
    price: 20,
    included: 'Basic flight protection included in base fare'
  }
]

export default function CustomizeFlight() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const router = useRouter()

  const getSeatPrice = (seat: string) => {
    if (seat.startsWith('A') || seat.startsWith('F')) return seatMap.prices.extra_legroom
    if (seat.endsWith('1')) return seatMap.prices.front
    return seatMap.prices.standard
  }

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    )
  }

  const calculateTotal = () => {
    const seatPrice = selectedSeat ? getSeatPrice(selectedSeat) : 0
    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = extras.find(e => e.id === extraId)
      return sum + (extra?.price || 0)
    }, 0)
    return seatPrice + extrasTotal
  }

  const handleContinue = () => {
    // In a real app, you would store the selected seat and extras in a global state or context
    router.push('/review')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Customize Your Flight</h1>

      {/* Flight Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Stockholm (ARN) → Copenhagen (CPH)</h2>
        <p className="text-sm text-gray-600">March 15, 2024 · 08:00 - 09:15</p>
      </div>

      {/* Seat Selection */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Your Seat</h2>
        
        <div className="mb-4">
          <div className="flex space-x-4 text-sm mb-2">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-white border border-gray-300 rounded mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-primary-100 border border-primary-500 rounded mr-2"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-block">
            {seatMap.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex space-x-2 mb-2">
                {row.map((seat, seatIndex) => (
                  seat ? (
                    <button
                      key={seatIndex}
                      disabled={seatMap.occupied.includes(seat)}
                      onClick={() => setSelectedSeat(selectedSeat === seat ? null : seat)}
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
                        ${seatMap.occupied.includes(seat)
                          ? 'bg-gray-200 cursor-not-allowed'
                          : selectedSeat === seat
                          ? 'bg-primary-100 border-2 border-primary-500 text-primary-700'
                          : 'bg-white border border-gray-300 hover:border-primary-500'
                        }
                      `}
                    >
                      {seat}
                    </button>
                  ) : (
                    <div key={seatIndex} className="w-10 h-10"></div>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>Seat pricing:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Standard seats: Included in fare</li>
            <li>Extra legroom seats (A, F): €{seatMap.prices.extra_legroom}</li>
            <li>Front row seats (row 1): €{seatMap.prices.front}</li>
          </ul>
        </div>
      </div>

      {/* Extras Selection */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Optional Extras</h2>
        
        <div className="space-y-4">
          {extras.map(extra => (
            <div key={extra.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={extra.id}
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={extra.id} className="ml-3 block text-sm font-medium text-gray-700">
                    {extra.name}
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">{extra.description}</p>
                <p className="mt-1 text-xs text-green-600">{extra.included}</p>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">€{extra.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h2>
        
        <div className="space-y-2">
          {selectedSeat && (
            <div className="flex justify-between text-sm">
              <span>Selected seat ({selectedSeat})</span>
              <span>€{getSeatPrice(selectedSeat)}</span>
            </div>
          )}
          {selectedExtras.map(extraId => {
            const extra = extras.find(e => e.id === extraId)
            return extra && (
              <div key={extraId} className="flex justify-between text-sm">
                <span>{extra.name}</span>
                <span>€{extra.price}</span>
              </div>
            )
          })}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total additions</span>
              <span>€{calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  )
} 