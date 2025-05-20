'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to C2 Store
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover our collection of sustainable and ethical fashion
          </p>
          <Link
            href="/checkout"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
