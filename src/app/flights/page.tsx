'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import FlightList from '@/components/flights/FlightList'
import FlightFilters from '@/components/flights/FlightFilters'

export default function FlightsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    stops: 'any',
    price: [0, 2000],
    times: 'any',
    airlines: []
  })

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <aside className="hidden lg:block lg:col-span-3">
            <FlightFilters 
              filters={selectedFilters} 
              onChange={setSelectedFilters} 
            />
          </aside>
          <div className="lg:col-span-9">
            <FlightList filters={selectedFilters} />
          </div>
        </div>
      </main>
    </div>
  )
} 