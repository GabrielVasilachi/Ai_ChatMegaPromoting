'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ROICalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [monthlyChats, setMonthlyChats] = useState(500);
  const [hoursSaved, setHoursSaved] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);

  // Calculate savings based on input
  useEffect(() => {
    const averageTimePerChat = 3; // minutes
    const hoursPerMonth = (monthlyChats * averageTimePerChat) / 60;
    const hourlyRate = 25; // average hourly rate for customer service
    
    setHoursSaved(Math.round(hoursPerMonth));
    setMoneySaved(Math.round(hoursPerMonth * hourlyRate));
  }, [monthlyChats]);

  return (
    <section ref={ref} className="min-h-screen bg-black py-12 md:py-20 flex items-center overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Calculate Your <span className="glow-text text-white">ROI</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            See how much time and money you can save with AI Chat
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20"
        >
          {/* Input */}
          <div className="mb-6 md:mb-8">
            <label className="block text-white text-base md:text-lg font-semibold mb-3 md:mb-4">
              Monthly chat volume
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={monthlyChats}
              onChange={(e) => setMonthlyChats(Number(e.target.value))}
              className="w-full h-2 md:h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-gray-400 text-xs md:text-sm mt-2">
              <span>100</span>
              <span className="text-white font-bold text-sm md:text-base">{monthlyChats.toLocaleString()} chats/month</span>
              <span>10,000</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              key={hoursSaved}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl"
            >
              <div className="text-2xl md:text-4xl font-bold text-white mb-2">
                {hoursSaved.toLocaleString()}
              </div>
              <div className="text-gray-300 text-sm md:text-lg">
                Hours Saved Monthly
              </div>
            </motion.div>

            <motion.div
              key={moneySaved}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl"
            >
              <div className="text-2xl md:text-4xl font-bold text-white mb-2">
                ${moneySaved.toLocaleString()}
              </div>
              <div className="text-gray-300 text-sm md:text-lg">
                Cost Savings Monthly
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center mt-6 md:mt-8">
            <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-transform duration-200 text-sm md:text-base">
              Start Saving Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
