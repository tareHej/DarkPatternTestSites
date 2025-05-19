'use client'

import { useState } from 'react'
import { Card, Button } from '@/components'
import { useRouter } from 'next/navigation'

interface PassengerForm {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  specialAssistance: boolean;
  assistanceDetails: string;
}

const initialPassenger: PassengerForm = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  specialAssistance: false,
  assistanceDetails: '',
}

export default function PassengerDetails() {
  const router = useRouter()
  const [passengers, setPassengers] = useState<PassengerForm[]>([{ ...initialPassenger }])

  const handleInputChange = (index: number, field: keyof PassengerForm, value: string | boolean) => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    }
    setPassengers(updatedPassengers)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/customize')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Passenger Details</h1>
        <p className="mt-2 text-sm text-gray-600">
          Please provide accurate information for each passenger. This helps us provide the best service and ensure a smooth journey.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <Card key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Passenger {index + 1}
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <select
                  id={`title-${index}`}
                  value={passenger.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                >
                  <option value="">Select title</option>
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                  <option value="ms">Ms</option>
                  <option value="dr">Dr</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor={`firstName-${index}`} className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id={`firstName-${index}`}
                  value={passenger.firstName}
                  onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor={`lastName-${index}`} className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor={`email-${index}`} className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id={`email-${index}`}
                  value={passenger.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor={`phone-${index}`} className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id={`phone-${index}`}
                  value={passenger.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor={`dateOfBirth-${index}`} className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id={`dateOfBirth-${index}`}
                  value={passenger.dateOfBirth}
                  onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id={`specialAssistance-${index}`}
                    checked={passenger.specialAssistance}
                    onChange={(e) => handleInputChange(index, 'specialAssistance', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor={`specialAssistance-${index}`} className="text-sm font-medium text-gray-700">
                    Special Assistance Required
                  </label>
                  <p className="text-sm text-gray-500">Check this box if you need any special assistance during your journey</p>
                </div>
              </div>

              {passenger.specialAssistance && (
                <div className="mt-4">
                  <label htmlFor={`assistanceDetails-${index}`} className="block text-sm font-medium text-gray-700">
                    Please describe the assistance you need
                  </label>
                  <textarea
                    id={`assistanceDetails-${index}`}
                    value={passenger.assistanceDetails}
                    onChange={(e) => handleInputChange(index, 'assistanceDetails', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              )}
            </div>
          </Card>
        ))}

        <div className="mt-6 flex justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button type="submit">
            Continue to Seat Selection
          </Button>
        </div>

        <div className="mt-8 bg-blue-50 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Privacy Information</h3>
          <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
            <li>Your personal information is used only for flight-related services</li>
            <li>We do not share your data with third parties for marketing purposes</li>
            <li>You can request access to or deletion of your data at any time</li>
            <li>Special assistance information is used only to provide appropriate support</li>
          </ul>
        </div>
      </form>
    </div>
  )
} 