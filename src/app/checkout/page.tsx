'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartReview from '@/components/checkout/CartReview';
import ShippingInfo from '@/components/checkout/ShippingInfo';
import PaymentStep from '@/components/checkout/PaymentStep';

const steps = [
  { id: 'cart', name: 'Cart Review' },
  { id: 'shipping', name: 'Shipping' },
  { id: 'payment', name: 'Payment' },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState('cart');

  const renderStep = () => {
    switch (currentStep) {
      case 'cart':
        return <CartReview onNext={() => setCurrentStep('shipping')} />;
      case 'shipping':
        return <ShippingInfo onNext={() => setCurrentStep('payment')} onBack={() => setCurrentStep('cart')} />;
      case 'payment':
        return <PaymentStep onBack={() => setCurrentStep('shipping')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-8">
          <ol className="flex items-center justify-center">
            {steps.map((step, index) => (
              <li key={step.id} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      steps.findIndex(s => s.id === currentStep) >= index
                        ? 'bg-indigo-600'
                        : 'bg-gray-200'
                    }`}
                  >
                    <span className="text-white">{index + 1}</span>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900">{step.name}</span>
                </div>
                {index !== steps.length - 1 && (
                  <div className="absolute top-4 left-8 -ml-px h-0.5 w-full bg-gray-200">
                    <div
                      className="h-0.5 bg-indigo-600"
                      style={{
                        width: steps.findIndex(s => s.id === currentStep) > index ? '100%' : '0%',
                      }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 