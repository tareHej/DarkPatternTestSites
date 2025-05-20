'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCardIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  GiftIcon,
  SparklesIcon,
  UserGroupIcon,
  PlusIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Mock order data - in a real app, this would come from your backend
const mockOrder = {
  items: [
    {
      id: 1,
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Matching Organic Cotton Pants',
      price: 49.99,
      quantity: 1,
    },
  ],
  shipping: {
    method: 'Express Shipping',
    price: 19.99,
  },
  subtotal: 79.98,
  total: 99.97,
};

const loyaltyProgram = {
  currentPoints: 250,
  pointsToNextTier: 750,
  nextTier: 'Silver',
  benefits: [
    'Free shipping on all orders',
    'Early access to sales',
    'Exclusive member discounts',
  ],
};

const referralProgram = {
  code: 'FRIEND20',
  discount: 20,
  description: 'Share with friends and both get 20% off',
};

const protectionPlans = [
  {
    id: 'basic',
    name: 'Basic Protection',
    price: 4.99,
    features: [
      '30-day extended warranty',
      'Accidental damage coverage',
      'Free returns',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Protection',
    price: 9.99,
    features: [
      '90-day extended warranty',
      'Accidental damage coverage',
      'Free returns',
      'Priority customer service',
      'Express replacement',
    ],
    popular: true,
  },
];

const giftOptions = [
  {
    id: 'standard',
    name: 'Standard Gift Wrap',
    price: 2.99,
    description: 'A simple and elegant gift wrap',
    image: '/images/gift-wrap-standard.jpg',
  },
  {
    id: 'elegant',
    name: 'Elegant Gift Wrap',
    price: 4.99,
    description: 'A sophisticated gift wrap with a bow',
    image: '/images/gift-wrap-elegant.jpg',
  },
  {
    id: 'luxury',
    name: 'Luxury Gift Wrap',
    price: 6.99,
    description: 'A luxurious gift wrap with a ribbon',
    image: '/images/gift-wrap-luxury.jpg',
  },
];

export default function PaymentStep({ onBack }: { onBack: () => void }) {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal'>('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '4242 4242 4242 4242',
    name: 'John Doe',
    expiry: '12/25',
    cvc: '123',
  });
  const [selectedProtection, setSelectedProtection] = useState<string | null>(null);
  const [showLoyaltyInfo, setShowLoyaltyInfo] = useState(false);
  const [selectedGiftWrap, setSelectedGiftWrap] = useState<string | null>(null);
  const [appliedReferral, setAppliedReferral] = useState(false);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    toast.success('Order placed successfully!');
  };

  const calculateTotal = () => {
    let total = mockOrder.total;
    
    // Add protection plan cost
    if (selectedProtection) {
      const plan = protectionPlans.find((p) => p.id === selectedProtection);
      if (plan) total += plan.price;
    }

    // Add gift wrap cost
    if (selectedGiftWrap) {
      const giftOption = giftOptions.find((g) => g.id === selectedGiftWrap);
      if (giftOption) total += giftOption.price;
    }

    // Apply referral discount if used
    if (appliedReferral) {
      total = total * (1 - referralProgram.discount / 100);
    }

    return total;
  };

  const handleApplyReferral = () => {
    setAppliedReferral(true);
    toast.success('Referral code applied! 20% discount added to your order.');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
              <div className="flex items-center text-sm text-green-600">
                <LockClosedIcon className="h-5 w-5 mr-1" />
                <span>Secure Payment</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Payment Method Selection */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`flex-1 py-3 px-4 rounded-md border ${
                      paymentMethod === 'credit'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCardIcon className="h-5 w-5 inline-block mr-2" />
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex-1 py-3 px-4 rounded-md border ${
                      paymentMethod === 'paypal'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    PayPal
                  </button>
                </div>

                {paymentMethod === 'credit' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="number"
                        id="cardNumber"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="cardName"
                        value={cardDetails.name}
                        onChange={handleCardChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          id="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cvc"
                          id="cvc"
                          value={cardDetails.cvc}
                          onChange={handleCardChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Gift Options */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Gift Options</h2>
                  <div className="flex items-center text-sm text-indigo-600">
                    <GiftIcon className="h-5 w-5 mr-1" />
                    <span>Add a Special Touch</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {giftOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.01 }}
                      className={`relative border rounded-lg p-4 cursor-pointer ${
                        selectedGiftWrap === option.id ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedGiftWrap(option.id)}
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
                          {selectedGiftWrap === option.id ? (
                            <CheckIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <PlusIcon className="h-5 w-5 text-indigo-500" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Protection Plans */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Protection Plans</h2>
                  <div className="flex items-center text-sm text-indigo-600">
                    <ShieldCheckIcon className="h-5 w-5 mr-1" />
                    <span>Peace of Mind</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {protectionPlans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.01 }}
                      className={`relative border rounded-lg p-4 cursor-pointer ${
                        selectedProtection === plan.id ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedProtection(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                          Most Popular
                        </div>
                      )}
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="protection"
                          value={plan.id}
                          checked={selectedProtection === plan.id}
                          onChange={() => setSelectedProtection(plan.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 mt-1"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                            <span className="ml-2 text-sm text-gray-500">${plan.price.toFixed(2)}</span>
                          </div>
                          <ul className="mt-2 space-y-1">
                            {plan.features.map((feature, index) => (
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

              {/* Loyalty Program */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Loyalty Program</h3>
                  <button
                    type="button"
                    onClick={() => setShowLoyaltyInfo(!showLoyaltyInfo)}
                    className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                  >
                    {showLoyaltyInfo ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-sm text-gray-600">
                      {loyaltyProgram.currentPoints} points • {loyaltyProgram.pointsToNextTier} to {loyaltyProgram.nextTier}
                    </span>
                  </div>
                  <div className="text-sm text-indigo-600">
                    Earn {Math.round(mockOrder.total)} points with this purchase
                  </div>
                </div>
                {showLoyaltyInfo && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-900 mb-2">Next Tier Benefits</h4>
                    <ul className="space-y-2">
                      {loyaltyProgram.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-indigo-700 flex items-center">
                          <SparklesIcon className="h-4 w-4 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Referral Program */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Refer a Friend</h3>
                  <div className="flex items-center text-sm text-green-600">
                    <GiftIcon className="h-5 w-5 mr-1" />
                    <span>Save 20%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{referralProgram.description}</p>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={referralProgram.code}
                    readOnly
                    className="flex-1 rounded-md border-gray-300 bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={handleApplyReferral}
                    disabled={appliedReferral}
                    className={`px-4 py-2 rounded-md ${
                      appliedReferral
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {appliedReferral ? 'Applied' : 'Apply Code'}
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {mockOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">${mockOrder.shipping.price.toFixed(2)}</span>
                  </div>
                  {selectedProtection && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Protection Plan</span>
                      <span className="text-gray-900">
                        ${protectionPlans.find((p) => p.id === selectedProtection)?.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {selectedGiftWrap && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gift Wrapping</span>
                      <span className="text-gray-900">
                        ${giftOptions.find((g) => g.id === selectedGiftWrap)?.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {appliedReferral && (
                    <div className="flex justify-between text-green-600">
                      <span>Referral Discount (20%)</span>
                      <span>-${(mockOrder.total * 0.2).toFixed(2)}</span>
                    </div>
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
                  Back to Shipping
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${mockOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">${mockOrder.shipping.price.toFixed(2)}</span>
                </div>
                {selectedProtection && (
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Protection Plan</span>
                    <span className="text-gray-900">
                      ${protectionPlans.find((p) => p.id === selectedProtection)?.price.toFixed(2)}
                    </span>
                  </div>
                )}
                {selectedGiftWrap && (
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Gift Wrapping</span>
                    <span className="text-gray-900">
                      ${giftOptions.find((g) => g.id === selectedGiftWrap)?.price.toFixed(2)}
                    </span>
                  </div>
                )}
                {appliedReferral && (
                  <div className="flex justify-between text-sm mt-2 text-green-600">
                    <span>Referral Discount (20%)</span>
                    <span>-${(mockOrder.total * 0.2).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-medium mt-4">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 