'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TruckIcon, ClockIcon, ShieldCheckIcon, GiftIcon, SparklesIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 9.99,
    estimatedDays: '3-5',
    description: 'Regular shipping with tracking',
    features: ['Tracking included', 'Insurance up to $100', 'Signature confirmation available'],
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 19.99,
    estimatedDays: '1-2',
    description: 'Priority shipping with tracking',
    features: ['Priority handling', 'Insurance up to $500', 'Signature confirmation included', 'Free returns'],
    popular: true,
  },
];

const giftOptions = [
  {
    id: 'gift-wrap',
    name: 'Gift Wrapping',
    price: 4.99,
    description: 'Elegant gift wrapping with a personalized note',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'gift-box',
    name: 'Premium Gift Box',
    price: 9.99,
    description: 'Luxury gift box with tissue paper and ribbon',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const lastChanceItems = [
  {
    id: 9,
    name: 'Sustainable Gift Card',
    price: 25,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Perfect for future purchases',
  },
  {
    id: 10,
    name: 'Eco-Friendly Gift Tags',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Add a personal touch to your gifts',
  },
];

export default function ShippingInfo({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  });

  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0].id);
  const [selectedGiftOption, setSelectedGiftOption] = useState<string | null>(null);
  const [showGiftOptions, setShowGiftOptions] = useState(false);
  const [addedItems, setAddedItems] = useState<typeof lastChanceItems[0][]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addLastChanceItem = (item: typeof lastChanceItems[0]) => {
    setAddedItems([...addedItems, item]);
    toast.success(`${item.name} added to your order!`);
  };

  const removeLastChanceItem = (itemId: number) => {
    setAddedItems(addedItems.filter(item => item.id !== itemId));
    toast.success('Item removed from your order');
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Add shipping cost
    const shippingMethod = shippingMethods.find(m => m.id === selectedShipping);
    if (shippingMethod) total += shippingMethod.price;

    // Add gift option cost
    if (selectedGiftOption) {
      const giftOption = giftOptions.find(g => g.id === selectedGiftOption);
      if (giftOption) total += giftOption.price;
    }

    // Add last chance items
    total += addedItems.reduce((sum, item) => sum + item.price, 0);

    return total;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Shipping Method</h2>
            <div className="flex items-center text-sm text-indigo-600">
              <ShieldCheckIcon className="h-5 w-5 mr-1" />
              <span>Secure Shipping</span>
            </div>
          </div>
          <div className="space-y-4">
            {shippingMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.01 }}
                className={`relative border rounded-lg p-4 cursor-pointer ${
                  selectedShipping === method.id ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300'
                }`}
                onClick={() => setSelectedShipping(method.id)}
              >
                {method.popular && (
                  <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shipping"
                    value={method.id}
                    checked={selectedShipping === method.id}
                    onChange={() => setSelectedShipping(method.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{method.name}</span>
                      <span className="ml-2 text-sm text-gray-500">${method.price.toFixed(2)}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>Estimated delivery: {method.estimatedDays} business days</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{method.description}</p>
                    <ul className="mt-2 space-y-1">
                      {method.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-500 flex items-center">
                          <SparklesIcon className="h-4 w-4 mr-1 text-indigo-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gift Options */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Gift Options</h2>
            <button
              type="button"
              onClick={() => setShowGiftOptions(!showGiftOptions)}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              {showGiftOptions ? 'Hide Options' : 'Add Gift Options'}
            </button>
          </div>
          {showGiftOptions && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {giftOptions.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative border rounded-lg p-4 cursor-pointer ${
                    selectedGiftOption === option.id ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedGiftOption(option.id)}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{option.name}</h3>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium mr-2">${option.price.toFixed(2)}</span>
                      {selectedGiftOption === option.id ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <PlusIcon className="h-5 w-5 text-indigo-500" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Last Chance Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Last Chance Add-ons</h3>
            <div className="flex items-center text-sm text-orange-500">
              <GiftIcon className="h-5 w-5 mr-1" />
              <span>Perfect for Gifts</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lastChanceItems.map((item) => (
              <motion.div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (addedItems.some(addedItem => addedItem.id === item.id)) {
                        removeLastChanceItem(item.id);
                      } else {
                        addLastChanceItem(item);
                      }
                    }}
                    className={`text-sm font-medium ${
                      addedItems.some(addedItem => addedItem.id === item.id)
                        ? 'text-red-600 hover:text-red-500'
                        : 'text-indigo-600 hover:text-indigo-500'
                    }`}
                  >
                    {addedItems.some(addedItem => addedItem.id === item.id) ? 'Remove' : 'Add to Order'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">
                ${shippingMethods.find(m => m.id === selectedShipping)?.price.toFixed(2)}
              </span>
            </div>
            {selectedGiftOption && (
              <div className="flex justify-between">
                <span className="text-gray-600">Gift Wrapping</span>
                <span className="text-gray-900">
                  ${giftOptions.find(g => g.id === selectedGiftOption)?.price.toFixed(2)}
                </span>
              </div>
            )}
            {addedItems.length > 0 && (
              <>
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Added Items</h3>
                  {addedItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="text-gray-900">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="text-lg font-medium text-gray-900">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
} 