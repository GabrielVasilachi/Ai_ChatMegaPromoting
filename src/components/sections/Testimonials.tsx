'use client';

import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="py-20 bg-black relative">
      {/* Vertical dashed line on the right, matching the section above, straight down as SVG */}
      <svg
        className="hidden md:block absolute z-20 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        width="100%"
        height="100%"
        viewBox="0 0 1000 1200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M120 0 V300 Q120 320 100 320 H-300 Q-320 320 -320 340 V390"
          transform="translate(820,0)"
          stroke="#b3b3b3"
          strokeWidth="3"
          opacity="0.6"
        />
      </svg>

      <svg
        className="hidden md:block absolute left-1/2 z-0 pointer-events-none"
        style={{ top: '30%', transform: 'translate(-50%, 0)' }}
        width="800"
        height="400"
        viewBox="0 0 800 400"
        fill="none"
      >
        <path
          d="M400 105 C360 70, 350 40, 380 30 C395 25, 400 40, 400 50 C400 40, 405 25, 420 30 C450 40, 440 70, 400 105"
          stroke="#b3b3b3"
          strokeWidth="4"
          fill="none"
          opacity="0.9"
        />
        <line
          x1="400"
          y1="105"
          x2="400"
          y2="155"
          stroke="#b3b3b3"
          strokeWidth="4"
          opacity="0.9"
        />
        {/* Punct central de distribuție */}
        <circle
          cx="400"
          cy="155"
          r="6"
          fill="#b3b3b3"
          opacity="0.9"
        />
        {/* Stânga: linie directă spre centrul primului container */}
        <line
          x1="400"
          y1="155"
          x2="150"
          y2="155"
          stroke="#b3b3b3"
          strokeWidth="4"
          opacity="0.9"
        />
        <line
          x1="150"
          y1="155"
          x2="150"
          y2="320"
          stroke="#b3b3b3"
          strokeWidth="4"
          opacity="0.9"
        />
        <circle
          cx="150"
          cy="320"
          r="4"
          fill="#b3b3b3"
          opacity="0.9"
        />
        {/* Centru: linie directă în jos spre centrul celui de-al doilea container */}
        <line
          x1="400"
          y1="155"
          x2="400"
          y2="320"
          stroke="#b3b3b3"
          strokeWidth="4"
          opacity="0.9"
        />
        <circle
          cx="400"
          cy="320"
          r="4"
          fill="#b3b3b3"
          opacity="0.9"
        />
        {/* Dreapta: linie directă spre centrul celui de-al treilea container */}
        <line
          x1="400"
          y1="155"
          x2="650"
          y2="155"
          stroke="#b3b3b3"
          strokeWidth="4"
          opacity="0.9"
        />
        <line
          x1="650"
          y1="155"
          x2="650"
          y2="320"
          stroke="#b3b3b3"
          strokeWidth="4"
          opacity="0.9"
        />
        <circle
          cx="650"
          cy="320"
          r="4"
          fill="#b3b3b3"
          opacity="0.9"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real stories from businesses that transformed their customer service with our AI solutions
          </p>
        </div>

        {/* Testimonials Grid - 3 columns, 2 rows */}
        <div className="grid grid-cols-3 gap-8 mt-[490px] md:mt-[450px]">
          {/* Row 1 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <blockquote className="text-lg text-gray-800 leading-relaxed mb-6">
              "The AI chatbot has revolutionized our customer support. Response times dropped by 85% and customer satisfaction increased dramatically."
            </blockquote>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">Sarah Johnson</div>
                <div className="text-gray-600 text-sm">Customer Success Director</div>
                <div className="text-gray-500 text-sm">TechFlow Solutions</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">
                Response Time: -85%
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <blockquote className="text-lg text-gray-800 leading-relaxed mb-6">
              "Our team now focuses on complex issues while AI handles routine queries. It's like having 24/7 support without the overhead costs."
            </blockquote>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">Michael Chen</div>
                <div className="text-gray-600 text-sm">Operations Manager</div>
                <div className="text-gray-500 text-sm">Digital Dynamics</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">
                Cost Savings: 60%
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <blockquote className="text-lg text-gray-800 leading-relaxed mb-6">
              "The implementation was seamless and the results were immediate. Our customers love the instant, accurate responses they receive."
            </blockquote>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">Emma Rodriguez</div>
                <div className="text-gray-600 text-sm">Head of Customer Experience</div>
                <div className="text-gray-500 text-sm">InnovateCorp</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">
                CSAT Score: +40%
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <blockquote className="text-lg text-gray-800 leading-relaxed mb-6">
              "We've seen a 300% increase in lead conversion since implementing the AI chat. It's incredible how it nurtures prospects automatically."
            </blockquote>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">David Thompson</div>
                <div className="text-gray-600 text-sm">Sales Director</div>
                <div className="text-gray-500 text-sm">GrowthTech Inc</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">
                Lead Conversion: +300%
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <blockquote className="text-lg text-gray-800 leading-relaxed mb-6">
              "The AI understands context perfectly and provides personalized responses. Our customers often don't realize they're chatting with AI."
            </blockquote>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">Lisa Park</div>
                <div className="text-gray-600 text-sm">Product Manager</div>
                <div className="text-gray-500 text-sm">NextGen Systems</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">
                Resolution Rate: 92%
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <blockquote className="text-lg text-gray-800 leading-relaxed mb-6">
              "ROI was positive within the first month. The AI handles 80% of our inquiries, freeing up our team for strategic initiatives."
            </blockquote>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">Robert Kim</div>
                <div className="text-gray-600 text-sm">Chief Technology Officer</div>
                <div className="text-gray-500 text-sm">ScaleUp Ventures</div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">
                ROI: +250%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
