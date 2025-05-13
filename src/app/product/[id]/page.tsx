'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProductRecommendations from '@/components/ProductRecommendations'

// Mock data for demonstration
const product = {
  id: 1,
  name: 'Premium Cotton T-Shirt',
  price: 29.99,
  images: [
    '/images/tshirt.jpg',
    '/images/tshirt-2.jpg',
    '/images/tshirt-3.jpg',
    '/images/tshirt-4.jpg'
  ],
  category: 'Men',
  description: 'Our premium cotton t-shirt is made from 100% organic cotton, providing exceptional comfort and durability. Perfect for everyday wear, this versatile piece features a classic fit and superior quality construction.',
  features: [
    'Made from 100% organic cotton',
    'Ethically manufactured',
    'Durable construction',
    'Pre-shrunk fabric',
    'Available in multiple colors'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['White', 'Black', 'Navy', 'Gray'],
  sustainabilityScore: 9,
  sustainabilityDetails: [
    'Organic materials',
    'Fair trade certified',
    'Low water usage',
    'Recyclable packaging'
  ]
}

const similarProducts = [
  {
    id: 2,
    name: 'Classic Denim Jeans',
    price: 79.99,
    image: '/images/jeans.jpg',
    category: 'Men',
    isBestSeller: true,
    sustainabilityScore: 8
  },
  // Add more similar products
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-6">
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            {product.sustainabilityScore && (
              <div className="ml-4 flex items-center bg-green-50 px-3 py-1 rounded-full">
                <span className="text-green-600 font-medium">Eco Score: {product.sustainabilityScore}/10</span>
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-8">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-md border flex items-center justify-center ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-md border flex items-center justify-center ${
                    selectedColor === color
                      ? 'border-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => alert('Added to cart (This is a demo)')}
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors mb-6"
          >
            Add to Cart
          </button>

          {/* Features */}
          <div className="border-t pt-8">
            <h3 className="font-medium mb-4">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Sustainability */}
          <div className="border-t pt-8 mt-8">
            <h3 className="font-medium mb-4">Sustainability</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {product.sustainabilityDetails.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <ProductRecommendations
          title="You Might Also Like"
          subtitle="Similar products you might be interested in"
          products={similarProducts}
        />
      </div>
    </div>
  )
} 