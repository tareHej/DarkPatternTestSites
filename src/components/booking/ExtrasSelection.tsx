'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SparklesIcon,
  TruckIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

interface ExtrasSelectionProps {
  selectedClass: string
  onComplete: (data: any) => void
  onBack: () => void
}

const extras = [
  {
    id: 'lounge',
    name: 'Airport Lounge Access',
    description: 'Relax before your flight with premium lounge access',
    icon: SparklesIcon,
    price: 50,
    availableFor: ['business', 'first'],
    included: ['first'],
  },
  {
    id: 'baggage',
    name: 'Extra Baggage',
    description: 'Add an extra 23kg checked bag',
    icon: TruckIcon,
    price: 60,
    availableFor: ['economy', 'premium', 'business', 'first'],
    included: ['business', 'first'],
  },
  {
    id: 'insurance',
    name: 'Travel Insurance',
    description: 'Comprehensive travel insurance coverage',
    icon: ShieldCheckIcon,
    price: 45,
    availableFor: ['economy', 'premium', 'business', 'first'],
    included: [],
  },
  {
    id: 'fasttrack',
    name: 'Fast Track Security',
    description: 'Skip the regular security queues',
    icon: GlobeAltIcon,
    price: 30,
    availableFor: ['economy', 'premium', 'business', 'first'],
    included: ['business', 'first'],
  },
]

export default function ExtrasSelection({
  selectedClass,
  onComplete,
  onBack,
}: ExtrasSelectionProps) {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])

  const toggleExtra = (extraId: string) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter((id) => id !== extraId))
    } else {
      setSelectedExtras([...selectedExtras, extraId])
    }
  }

  const handleSubmit = () => {
    const selectedItems = extras
      .filter(
        (extra) =>
          selectedExtras.includes(extra.id) ||
          extra.included.includes(selectedClass)
      )
      .map((extra) => ({
        id: extra.id,
        name: extra.name,
        price: extra.included.includes(selectedClass) ? 0 : extra.price,
      }))
    onComplete(selectedItems)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Enhance Your Journey</h2>
      <p className="text-gray-600 mb-8">
        Select additional services to make your flight more comfortable
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {extras.map((extra) => {
          const isAvailable = extra.availableFor.includes(selectedClass)
          const isIncluded = extra.included.includes(selectedClass)

          if (!isAvailable) return null

          return (
            <div
              key={extra.id}
              className={`
                relative rounded-lg border p-6 cursor-pointer
                ${
                  isIncluded
                    ? 'bg-primary/5 border-primary'
                    : selectedExtras.includes(extra.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary'
                }
              `}
              onClick={() => !isIncluded && toggleExtra(extra.id)}
            >
              <div className="flex items-start">
                <div
                  className={`
                    p-2 rounded-lg
                    ${isIncluded ? 'bg-primary/10' : 'bg-gray-100'}
                  `}
                >
                  <extra.icon
                    className={`
                      h-6 w-6
                      ${isIncluded ? 'text-primary' : 'text-gray-600'}
                    `}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {extra.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {extra.description}
                  </p>
                  {isIncluded ? (
                    <span className="mt-2 inline-block text-sm text-primary font-medium">
                      Included with {selectedClass} class
                    </span>
                  ) : (
                    <p className="mt-2 text-lg font-medium text-gray-900">
                      ${extra.price}
                    </p>
                  )}
                </div>
                {!isIncluded && (
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(extra.id)}
                      onChange={() => toggleExtra(extra.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
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
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Continue to Payment
        </button>
      </div>
    </motion.div>
  )
} 