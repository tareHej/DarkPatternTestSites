'use client'

import { motion } from 'framer-motion'
import {
  SparklesIcon,
  UserGroupIcon,
  ClockIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Premium Comfort',
    description: 'Extra legroom, wider seats, and premium dining options for a luxurious journey.',
    icon: SparklesIcon,
  },
  {
    name: 'Priority Benefits',
    description: 'Fast-track security, priority boarding, and dedicated check-in counters.',
    icon: UserGroupIcon,
  },
  {
    name: 'Flexible Travel',
    description: 'Free date changes and cancellations on premium bookings.',
    icon: ClockIcon,
  },
  {
    name: 'Global Lounge Access',
    description: 'Access to premium lounges worldwide with complimentary refreshments.',
    icon: GlobeAltIcon,
  },
]

export default function PremiumFeatures() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Premium Travel Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Enjoy exclusive benefits and superior service with our premium travel options
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-primary"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 