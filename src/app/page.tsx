import Image from 'next/image'
import Link from 'next/link'
import ProductRecommendations from '@/components/ProductRecommendations'

// Mock data for demonstration
const featuredProducts = [
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
  {
    id: 3,
    name: 'Canvas Sneakers',
    price: 59.99,
    image: '/images/sneakers.jpg',
    category: 'Accessories',
    sustainabilityScore: 7
  },
  {
    id: 4,
    name: 'Wool Blend Sweater',
    price: 89.99,
    image: '/images/sweater.jpg',
    category: 'Women',
    isNewArrival: true,
    sustainabilityScore: 8
  }
]

const categories = [
  {
    name: 'Women',
    image: '/images/category-women.jpg',
    href: '/category/women',
    description: 'Discover the latest trends in women\'s fashion'
  },
  {
    name: 'Men',
    image: '/images/category-men.jpg',
    href: '/category/men',
    description: 'Elevate your style with our men\'s collection'
  },
  {
    name: 'Accessories',
    image: '/images/category-accessories.jpg',
    href: '/category/accessories',
    description: 'Complete your look with premium accessories'
  }
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero.jpg"
            alt="Hero image"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">New Season Arrivals</h1>
            <p className="text-xl mb-8">
              Discover our latest collection of premium sustainable clothing
            </p>
            <Link
              href="/new-arrivals"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative h-96 overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/90">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductRecommendations
        title="Featured Products"
        subtitle="Handpicked selections from our latest collection"
        products={featuredProducts}
      />

      {/* Sustainability Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Sustainable Fashion</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're committed to sustainable and ethical fashion. Our products are made
                with eco-friendly materials and fair labor practices. Each product comes
                with a sustainability score to help you make informed choices.
              </p>
              <Link
                href="/sustainability"
                className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Learn More
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/sustainability.jpg"
                alt="Sustainable fashion"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, style tips, and updates on new arrivals.
            Be the first to know about our sustainable collections.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900"
            />
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
} 