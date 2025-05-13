'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNewArrival?: boolean
  isBestSeller?: boolean
  sustainabilityScore?: number
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isNewArrival,
  isBestSeller,
  sustainabilityScore
}: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <div className="group relative">
      <Link href={`/product/${id}`}>
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative">
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className={`
              h-full w-full object-cover object-center group-hover:opacity-75 transition-all duration-300
              ${imageLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}
            `}
            onLoadingComplete={() => setImageLoading(false)}
          />
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {isNewArrival && (
            <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs rounded">
              New Arrival
            </span>
          )}
          {isBestSeller && (
            <span className="absolute top-2 right-2 bg-warning text-white px-2 py-1 text-xs rounded">
              Best Seller
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{category}</p>
          <div className="flex justify-between items-center">
            <p className="text-base font-medium text-gray-900">${price.toFixed(2)}</p>
            {sustainabilityScore && (
              <div className="flex items-center">
                <span className="text-xs text-green-600">Eco Score: {sustainabilityScore}/10</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Link>
      <button 
        className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
        onClick={() => alert('Added to cart (This is a demo)')}
      >
        Add to Cart
      </button>
    </div>
  )
} 