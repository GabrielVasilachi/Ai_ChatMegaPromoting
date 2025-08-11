'use client';

import { useState, useEffect } from 'react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real stories from businesses that transformed their customer service
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-lg p-12 mb-8">
          <div className="text-center">
            {/* Quote */}
            <blockquote className="text-2xl text-black leading-relaxed mb-8">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {testimonials[currentIndex].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <div className="font-bold text-black text-lg">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentIndex].title} at {testimonials[currentIndex].company}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-6">
              <div className="inline-block bg-black px-6 py-3 rounded-full text-white font-bold">
                {testimonials[currentIndex].metrics.label}: {testimonials[currentIndex].metrics.value}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 bg-black rounded"></div>
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 bg-black rounded"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
