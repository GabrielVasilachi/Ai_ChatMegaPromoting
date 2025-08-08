'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { pricingPlans } from '@/lib/data';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="min-h-screen bg-gray-50 py-12 md:py-20 flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 md:mb-6">
            Simple, <span className="glow-text">Transparent</span> Pricing
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border-2 ${
                plan.isPopular
                  ? 'border-black shadow-lg'
                  : 'border-gray-200'
              }`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black px-4 md:px-6 py-1 md:py-2 rounded-full text-white text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="relative z-10">
                {/* Plan name */}
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                  {plan.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                  {plan.description}
                </p>
                
                {/* Price */}
                <div className="mb-6 md:mb-8">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
                      {plan.price}
                    </span>
                    {plan.period !== 'pricing' && (
                      <span className="text-gray-600 ml-2 text-sm md:text-base">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-black rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <button
                  className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base ${
                    plan.isPopular
                      ? 'bg-black text-white hover:scale-105'
                      : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 md:mt-16 px-4"
        >
          <p className="text-gray-600 text-sm md:text-base">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
