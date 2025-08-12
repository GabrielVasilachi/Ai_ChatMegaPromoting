'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { pricingPlansMonthly, pricingPlansYearly } from '@/lib/data';


export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isYearly, setIsYearly] = useState(false);
  
  const currentPlans = isYearly ? pricingPlansYearly : pricingPlansMonthly;

  return (
    <section ref={ref} className="min-h-screen bg-white py-12 md:py-20 flex items-center overflow-hidden">
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
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 mb-8">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
          
          {/* Monthly/Yearly Toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 relative">
              <span className={`text-lg font-medium ${!isYearly ? 'text-black' : 'text-gray-500'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-14 h-7 bg-gray-300 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                style={{ backgroundColor: isYearly ? '#000' : '#d1d5db' }}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                    isYearly ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-lg font-medium ${isYearly ? 'text-black' : 'text-gray-500'}`}>Yearly</span>
              <span className={`absolute left-1/2 -bottom-7 -translate-x-[35%] ${isYearly ? '' : 'hidden'}`}>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  -20%
                </span>
              </span>
            </div>
          </div>
        </motion.div>


        {/* Mobile/Tablet: grid layout to prevent overlap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 2xl:hidden max-w-[2000px] mx-auto">
          {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col w-full md:w-[90%] mx-auto relative p-8 md:p-12 rounded-3xl bg-white border-2 ${
                plan.isPopular
                  ? 'border-black shadow-lg scale-105 z-10'
                  : 'border-gray-200'
              }`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                  <div className="bg-black px-4 md:px-6 py-1 md:py-2 rounded-full text-white text-sm font-semibold">
                    Recommended
                  </div>
                </div>
              )}

              {/* Badge for discounts removed as requested */}

              <div className="relative z-10 flex flex-col flex-1">
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
                  {plan.originalPrice && (
                    <div className="flex items-center mb-2">
                      <span className="text-lg text-gray-500 line-through mr-2">
                        {plan.originalPrice}
                      </span>
                      {plan.badge && (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                  )}
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
                  {plan.subText && (
                    <p className="text-gray-500 text-sm mt-1">{plan.subText}</p>
                  )}
                </div>
                
                {/* Features */}
                <ul className="space-y-2 md:space-y-2.5 mb-6 md:mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-1.5">
                      <span className="text-black font-bold text-base select-none leading-[1.1] flex items-center">+</span>
                      <span className="text-gray-700 text-[11px] md:text-xs leading-relaxed flex items-center">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <button
                  className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-full font-semibold text-sm md:text-base mt-auto ${
                    plan.isPopular
                      ? 'bg-black text-white border border-black hover:bg-white hover:text-black'
                      : 'border border-black bg-white text-black hover:bg-black hover:text-white'
                  }`}
                  style={{ borderRadius: '9999px' }}
                >
                  {plan.ctaText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: flex with space-evenly, smaller width, no overlap */}
        <div className="hidden 2xl:flex justify-center items-stretch w-full max-w-[2000px] mx-auto px-4 gap-[20px]">
          {currentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col max-w-[420px] w-full min-w-0 flex-shrink-0 relative p-8 md:p-12 rounded-3xl bg-white border-2 ${
                plan.isPopular
                  ? 'border-black shadow-lg scale-105 z-10'
                  : 'border-gray-200'
              } ${index === 0 ? 'ml-[5px]' : ''} ${index === currentPlans.length - 1 ? 'mr-[5px]' : ''}`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                  <div className="bg-black px-4 md:px-6 py-1 md:py-2 rounded-full text-white text-sm font-semibold">
                    Recommended
                  </div>
                </div>
              )}

              {/* Badge for discounts removed as requested */}

              <div className="relative z-10 flex flex-col flex-1">
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
                  {plan.originalPrice && (
                    <div className="flex items-center mb-2">
                      <span className="text-lg text-gray-500 line-through mr-2">
                        {plan.originalPrice}
                      </span>
                      {plan.badge && (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                  )}
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
                  {plan.subText && (
                    <p className="text-gray-500 text-sm mt-1">{plan.subText}</p>
                  )}
                </div>
                
                {/* Features */}
                <ul className="space-y-2 md:space-y-2.5 mb-6 md:mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-1.5">
                      <span className="text-black font-bold text-base select-none leading-[1.1] flex items-center">+</span>
                      <span className="text-gray-700 text-[11px] md:text-xs leading-relaxed flex items-center">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <button
                  className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-full font-semibold text-sm md:text-base mt-auto ${
                    plan.isPopular
                      ? 'bg-black text-white border border-black hover:bg-white hover:text-black'
                      : 'border border-black bg-white text-black hover:bg-black hover:text-white'
                  }`}
                  style={{ borderRadius: '9999px' }}
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
        </motion.div>
      </div>
    </section>
  );
}
