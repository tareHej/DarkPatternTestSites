'use client'

import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

const airlines = [
  { id: 'skyways', name: 'Skyways Airlines' },
  { id: 'partner1', name: 'Partner Airline 1' },
  { id: 'partner2', name: 'Partner Airline 2' },
]

const stops = [
  { value: 'any', label: 'Any' },
  { value: 'nonstop', label: 'Non-stop only' },
  { value: '1stop', label: '1 stop max' },
]

const times = [
  { value: 'any', label: 'Any time' },
  { value: 'morning', label: 'Morning departure' },
  { value: 'afternoon', label: 'Afternoon departure' },
  { value: 'evening', label: 'Evening departure' },
]

interface FiltersProps {
  filters: {
    stops: string;
    price: number[];
    times: string;
    airlines: string[];
  };
  onChange: (filters: any) => void;
}

export default function FlightFilters({ filters, onChange }: FiltersProps) {
  return (
    <div className="space-y-6">
      <Disclosure as="div" className="border rounded-lg p-4" defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between items-center">
              <span className="text-lg font-medium">Stops</span>
              <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 space-y-2">
              {stops.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`stops-${option.value}`}
                    name="stops"
                    value={option.value}
                    checked={filters.stops === option.value}
                    onChange={(e) =>
                      onChange({ ...filters, stops: e.target.value })
                    }
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`stops-${option.value}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="border rounded-lg p-4" defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between items-center">
              <span className="text-lg font-medium">Price Range</span>
              <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">$0</span>
                  <span className="text-sm text-gray-600">$2000+</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={filters.price[1]}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      price: [0, parseInt(e.target.value)],
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-600">
                  Max price: ${filters.price[1]}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="border rounded-lg p-4" defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between items-center">
              <span className="text-lg font-medium">Departure Time</span>
              <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 space-y-2">
              {times.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`time-${option.value}`}
                    name="time"
                    value={option.value}
                    checked={filters.times === option.value}
                    onChange={(e) =>
                      onChange({ ...filters, times: e.target.value })
                    }
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`time-${option.value}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="border rounded-lg p-4" defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between items-center">
              <span className="text-lg font-medium">Airlines</span>
              <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 space-y-2">
              {airlines.map((airline) => (
                <div key={airline.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`airline-${airline.id}`}
                    value={airline.id}
                    checked={filters.airlines.includes(airline.id)}
                    onChange={(e) => {
                      const newAirlines = e.target.checked
                        ? [...filters.airlines, airline.id]
                        : filters.airlines.filter((id) => id !== airline.id)
                      onChange({ ...filters, airlines: newAirlines })
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`airline-${airline.id}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {airline.name}
                  </label>
                </div>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
} 