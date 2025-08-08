'use client';

// ...existing code (file was empty)...
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  // Lightweight safety: only run anim setup in browser
  useEffect(() => {
    if (typeof window === 'undefined') return;
    (async () => {
      try {
        const { gsap } = await import('gsap');
        // simple fade-in fallback animation
        if (ref.current) {
          gsap.from(ref.current.querySelectorAll('[data-fade]'), {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
          });
        }
      } catch (e) {
        // fail silently
      }
    })();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center bg-white overflow-hidden px-6">
      <div className="max-w-5xl w-full text-center space-y-8">
        <motion.h1
          data-fade
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black"
        >
          Conversații <span className="glow-text">AI</span> care scalează afacerea ta
        </motion.h1>
        <motion.p
          data-fade
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Automatizează suportul, crește conversiile și oferă răspunsuri instant—24/7.
        </motion.p>
        <div data-fade className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-full bg-black text-white font-semibold text-sm md:text-base hover:scale-[1.03] active:scale-100 transition-transform">
            Începe Gratuit
          </button>
          <button className="px-8 py-4 rounded-full border border-black text-black font-semibold text-sm md:text-base hover:bg-black hover:text-white transition-colors">
            Vezi Demo
          </button>
        </div>
      </div>
      <style jsx>{`
        .glow-text { background: linear-gradient(90deg,#000,#555); -webkit-background-clip:text; color:transparent; }
      `}</style>
    </section>
  );
}
