'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PassengerFormProps {
  onComplete: (data: any) => void
}

export default function PassengerForm({ onComplete }: PassengerFormProps) {
  const [passengers, setPassengers] = useState([
    {
      type: 'adult',
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(passengers)
  }

  const updatePassenger = (index: number, field: string, value: string) => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    }
    setPassengers(updatedPassengers)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Passenger Details</h2>
      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              Passenger {index + 1} (Adult)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <select
                  value={passenger.title}
                  onChange={(e) =>
                    updatePassenger(index, 'title', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                >
                  <option value="">Select title</option>
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                  <option value="ms">Ms</option>
                  <option value="dr">Dr</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={passenger.firstName}
                  onChange={(e) =>
                    updatePassenger(index, 'firstName', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) =>
                    updatePassenger(index, 'lastName', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={passenger.email}
                  onChange={(e) =>
                    updatePassenger(index, 'email', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) =>
                    updatePassenger(index, 'phone', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={passenger.dob}
                  onChange={(e) => updatePassenger(index, 'dob', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nationality
                </label>
                <input
                  type="text"
                  value={passenger.nationality}
                  onChange={(e) =>
                    updatePassenger(index, 'nationality', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={passenger.passportNumber}
                  onChange={(e) =>
                    updatePassenger(index, 'passportNumber', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Passport Expiry Date
                </label>
                <input
                  type="date"
                  value={passenger.passportExpiry}
                  onChange={(e) =>
                    updatePassenger(index, 'passportExpiry', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3 px-4 text-white font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Continue to Seat Selection
          </button>
        </div>
      </form>
    </motion.div>
  )
} 