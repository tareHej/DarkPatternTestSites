'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import ProductRecommendations from '@/components/ProductRecommendations'

// Mock data for demonstration
const products = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    image: '/images/tshirt.jpg',
    category: 'Men',
    isNewArrival: true,
    sustainabilityScore: 9
  },
  {
    id: 2,
    name: 'Classic Denim Jeans',
    price: 79.99,
    image: '/images/jeans.jpg',
    category: 'Women',
    isBestSeller: true,
    sustainabilityScore: 8
  },
  // Add more products as needed
]

const filters = {
  size: ['XS', 'S', 'M', 'L', 'XL'],
  color: ['Black', 'White', 'Blue', 'Red', 'Green'],
  price: ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'],
  sustainability: ['7+ Score', '8+ Score', '9+ Score']
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState('featured')

  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {Object.entries(filters).map(([filterName, options]) => (
              <div key={filterName}>
                <h3 className="text-lg font-medium mb-3 capitalize">{filterName}</h3>
                <div className="space-y-2">
                  {options.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary rounded border-gray-300"
                        onChange={(e) => {
                          setActiveFilters((prev) => ({
                            ...prev,
                            [filterName]: e.target.checked
                              ? [...(prev[filterName] || []), option]
                              : (prev[filterName] || []).filter((item) => item !== option)
                          }))
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {/* Sort Options */}
          <div className="flex justify-end mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="sustainability">Sustainability Score</option>
            </select>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* You Might Also Like */}
          <div className="mt-16">
            <ProductRecommendations
              title="You Might Also Like"
              subtitle="Based on your browsing history"
              products={products.slice(0, 4)}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 