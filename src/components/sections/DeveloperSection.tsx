'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { codeExamples } from '@/lib/data';

export default function DeveloperSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'curl' | 'javascript'>('curl');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="min-h-screen bg-black py-12 md:py-20 flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            <span className="glow-text">Developer</span> Friendly
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Integrate Otonom AI into your existing systems with our powerful APIs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tab buttons */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="bg-white/10 rounded-lg p-1 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('curl')}
                className={`px-4 md:px-6 py-2 rounded-md transition-colors duration-200 text-sm md:text-base ${
                  activeTab === 'curl'
                    ? 'bg-white text-gray-900'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setActiveTab('javascript')}
                className={`px-4 md:px-6 py-2 rounded-md transition-colors duration-200 text-sm md:text-base ${
                  activeTab === 'javascript'
                    ? 'bg-white text-gray-900'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                JavaScript SDK
              </button>
            </div>
          </div>

          {/* Code block */}
          <div className="relative bg-gray-900 rounded-xl md:rounded-2xl border border-white/20 overflow-hidden mx-4 md:mx-0">
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-white/10">
              <div className="flex space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-xs md:text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 md:p-6 text-gray-300 overflow-x-auto text-xs sm:text-sm md:text-base">
              <code>{codeExamples[activeTab]}</code>
            </pre>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 px-4 md:px-0">
            {[
              'RESTful API',
              'Webhook Support',
              'SDKs Available'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="text-center p-4 md:p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <div className="text-base md:text-lg font-semibold text-white mb-2">
                  {feature}
                </div>
                <div className="text-sm md:text-base text-gray-400">
                  Easy integration with your existing infrastructure
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8 md:mt-12 px-4 md:px-0">
            <button className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-transform duration-200 text-base md:text-lg">
              Read Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
