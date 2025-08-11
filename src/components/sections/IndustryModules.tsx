'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { industryCards } from '@/lib/data';

export default function IndustryModules() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
            Creat pentru orice <span className="glow-text">Industrie</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industryCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`p-6 md:p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all duration-200 cursor-pointer ${
                hoveredCard === card.id ? 'transform -translate-y-1' : ''
              }`}
            >
              {/* Industry title */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  {card.title}
                </h3>
                <div className={`transform transition-transform duration-200 ${
                  hoveredCard === card.id ? 'translate-x-1' : ''
                }`}>
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-black rounded"></div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                {card.description}
              </p>
              
              {/* Benefits */}
              <ul className="space-y-2">
                {card.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start text-gray-700 text-sm md:text-base">
                    <div className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
