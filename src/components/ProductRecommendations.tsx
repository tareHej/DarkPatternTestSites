'use client'

import ProductCard from './ProductCard'

interface RecommendationsProps {
  title: string
  subtitle?: string
  products: Array<{
    id: number
    name: string
    price: number
    image: string
    category: string
    isNewArrival?: boolean
    isBestSeller?: boolean
    sustainabilityScore?: number
  }>
}

export default function ProductRecommendations({ title, subtitle, products }: RecommendationsProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-gray-600">{subtitle}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
} 