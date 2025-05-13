'use client'

import { useState } from 'react'
import Link from 'next/link'

const steps = ['Shipping', 'Payment', 'Review']

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState('')
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  })

  // Mock data
  const cartItems = [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      quantity: 1,
      size: 'M',
      color: 'Navy Blue'
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping in this example
  const total = subtotal + shipping

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Checkout progress */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}
              `}>
                {index + 1}
              </div>
              <span className="ml-2 font-medium">{step}</span>
              {index < steps.length - 1 && (
                <div className="w-16 h-1 mx-4 bg-gray-200">
                  <div className={`h-full ${index < currentStep ? 'bg-primary' : ''}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main checkout form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="your@email.com"
                  />
                </div>

                <h2 className="text-xl font-semibold pt-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        className="h-4 w-4 text-primary"
                        defaultChecked
                      />
                      <label className="ml-3 font-medium">Credit Card</label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Order Review</h2>
                
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-gray-600">
                    {shippingInfo.firstName} {shippingInfo.lastName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.postalCode}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Contact</h3>
                  <p className="text-gray-600">{email}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between py-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {currentStep === steps.length - 1 ? (
              <button 
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => alert('Order placed! (This is a demo)')}
              >
                Place Order
              </button>
            ) : (
              <button 
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
                onClick={handleContinue}
              >
                Continue
              </button>
            )}

            {/* Trust badges and guarantees */}
            <div className="mt-6 pt-6 border-t space-y-4">
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <div>
                  <p className="font-medium">Secure Checkout</p>
                  <p className="text-sm text-gray-600">Your data is protected</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <div>
                  <p className="font-medium">Fast Shipping</p>
                  <p className="text-sm text-gray-600">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>↩️</span>
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 