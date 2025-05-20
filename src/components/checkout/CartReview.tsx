'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, TruckIcon, StarIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline';

// Mock data - in a real app, this would come from your backend
const mockCartItems = [
  {
    id: 1,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const mockRecommendations = [
  {
    id: 2,
    name: 'Matching Organic Cotton Pants',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    reason: 'Completes your outfit',
    savings: 10,
  },
  {
    id: 3,
    name: 'Sustainable Denim Jacket',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    reason: 'Popular with this item',
    savings: 15,
  },
];

const mockOutfitBundles = [
  {
    id: 'bundle1',
    name: 'Complete Casual Look',
    items: [
      {
        id: 4,
        name: 'Organic Cotton T-Shirt',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 5,
        name: 'Matching Organic Cotton Pants',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 6,
        name: 'Sustainable Denim Jacket',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
    totalPrice: 159.97,
    bundlePrice: 129.99,
    savings: 29.98,
  },
];

const mockPopularItems = [
  {
    id: 7,
    name: 'Eco-Friendly Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    reason: 'Trending this week',
  },
  {
    id: 8,
    name: 'Recycled Accessories Set',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    reason: 'Popular with your style',
  },
];

const FREE_SHIPPING_THRESHOLD = 100;

export default function CartReview({ onNext }: { onNext: () => void }) {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const total = subtotal + shippingCost;

  const addToCart = (item: typeof mockRecommendations[0]) => {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  };

  const addBundleToCart = (bundle: typeof mockOutfitBundles[0]) => {
    setCartItems([...bundle.items.map(item => ({ ...item, quantity: 1 }))]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Cart Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Cart</h2>
          
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Free Shipping Progress */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <TruckIcon className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">
                  {subtotal >= FREE_SHIPPING_THRESHOLD
                    ? 'You qualify for free shipping!'
                    : `Add $${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping`}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ${subtotal.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Outfit Bundles */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Complete Your Look</h3>
            <span className="text-sm text-indigo-600">Save up to 20%</span>
          </div>
          <div className="space-y-6">
            {mockOutfitBundles.map((bundle) => (
              <motion.div
                key={bundle.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">{bundle.name}</h4>
                  <div className="flex items-center text-sm text-green-600">
                    <SparklesIcon className="h-5 w-5 mr-1" />
                    <span>Save ${bundle.savings.toFixed(2)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {bundle.items.map((item) => (
                    <div key={item.id} className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="line-through">${bundle.totalPrice.toFixed(2)}</span>
                    <span className="ml-2 text-green-600 font-medium">${bundle.bundlePrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => addBundleToCart(bundle)}
                    className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                  >
                    Add Bundle to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recommended for You</h3>
            <span className="text-sm text-gray-500">Based on your style</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockRecommendations.map((item) => (
              <motion.div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.reason}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                    {item.savings && (
                      <span className="ml-2 text-sm text-green-600">Save ${item.savings}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Items */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Trending Now</h3>
            <div className="flex items-center text-sm text-orange-500">
              <FireIcon className="h-5 w-5 mr-1" />
              <span>Hot Items</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockPopularItems.map((item) => (
              <motion.div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.reason}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="text-lg font-medium text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onNext}
            className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue to Shipping
          </button>

          {/* Trust Indicators */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center text-sm text-gray-500">
              <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span>4.8/5 Customer Rating</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ShoppingBagIcon className="h-5 w-5 text-green-500 mr-2" />
              <span>Free Returns Within 30 Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 