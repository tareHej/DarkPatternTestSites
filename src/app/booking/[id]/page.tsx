'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import PassengerForm from '@/components/booking/PassengerForm'
import SeatSelection from '@/components/booking/SeatSelection'
import ExtrasSelection from '@/components/booking/ExtrasSelection'
import BookingSummary from '@/components/booking/BookingSummary'

const steps = [
  { id: 'passengers', name: 'Passenger Details' },
  { id: 'seats', name: 'Seat Selection' },
  { id: 'extras', name: 'Travel Extras' },
  { id: 'payment', name: 'Payment' },
]

export default function BookingPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const selectedClass = searchParams.get('class') || 'economy'
  const [currentStep, setCurrentStep] = useState('passengers')
  const [bookingData, setBookingData] = useState({
    passengers: [],
    seats: [],
    extras: [],
  })

  const updateBookingData = (key: string, value: any) => {
    setBookingData((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
    }
  }

  const prevStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center mb-12">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={`relative ${
                  stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`
                      relative flex h-8 w-8 items-center justify-center rounded-full
                      ${
                        step.id === currentStep
                          ? 'bg-primary text-white'
                          : steps.findIndex((s) => s.id === currentStep) >
                            steps.findIndex((s) => s.id === step.id)
                          ? 'bg-primary/20 text-primary'
                          : 'bg-gray-100 text-gray-500'
                      }
                    `}
                  >
                    <span className="text-sm font-medium">
                      {stepIdx + 1}
                    </span>
                  </div>
                  {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-4 w-full h-0.5 bg-gray-200" />
                  )}
                </div>
                <span className="absolute -bottom-6 w-max text-sm font-medium text-gray-500">
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 'passengers' && (
              <PassengerForm
                onComplete={(data) => {
                  updateBookingData('passengers', data)
                  nextStep()
                }}
              />
            )}
            {currentStep === 'seats' && (
              <SeatSelection
                selectedClass={selectedClass}
                onComplete={(data) => {
                  updateBookingData('seats', data)
                  nextStep()
                }}
                onBack={prevStep}
              />
            )}
            {currentStep === 'extras' && (
              <ExtrasSelection
                selectedClass={selectedClass}
                onComplete={(data) => {
                  updateBookingData('extras', data)
                  nextStep()
                }}
                onBack={prevStep}
              />
            )}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                {/* Payment form will go here */}
                <button
                  onClick={prevStep}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <BookingSummary
              flightId={params.id}
              selectedClass={selectedClass}
              bookingData={bookingData}
            />
          </div>
        </div>
      </main>
    </div>
  )
} 