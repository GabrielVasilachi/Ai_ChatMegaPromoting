'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { howItWorksSteps } from '@/lib/data';

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            How It <span className="glow-text">Works</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Get your AI receptionist up and running in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center px-4"
            >
              {/* Step number */}
              <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center text-white text-lg md:text-2xl font-bold mb-4 md:mb-6 mx-auto">
                {step.id}
              </div>
              
              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
