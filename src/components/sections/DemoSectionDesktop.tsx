'use client';

import { useState, useEffect, useRef } from 'react';

export default function DemoSectionDesktop() {
  const ref = useRef(null);
  const [shake, setShake] = useState(false);

  // Intersection observer pentru animații (dacă este necesar în viitor)
  useEffect(() => {
    const section = ref.current as HTMLElement | null;
    if (!section) return;
    
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Poți adăuga animații aici dacă este necesar
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(section);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={ref} 
      className="min-h-[100vh] bg-black py-0 flex items-center justify-center overflow-hidden relative"
    >
  <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Small tag above title */}
            <div className="inline-block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-6 py-2">
                <span className="text-white/80 text-sm font-medium">Prezentare Demo</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Experimentează
              <br />
              <span className="bg-white bg-clip-text text-transparent">
                Puterea AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Descoperă cum agentul nostru AI poate transforma complet experiența clienților tăi în doar câteva minute.
            </p>

            {/* CTA Button */}
            <div>
              <button
                className="bg-black border border-white text-white font-bold py-2 px-5 rounded-full text-base transition-all duration-300 hover:bg-white hover:text-black"
                onClick={() => {
                  setShake(true);
                  setTimeout(() => setShake(false), 500);
                }}
              >
                <span className="flex items-center">
                  <span>Testează Demo-ul</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Content - Simple Red Container */}
          <div className="relative hidden lg:block">
            <div className="bg-red-500 rounded-2xl h-96 w-full max-w-md mx-auto">
              {/* Container roșu simplu cu colțuri rotunjite */}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom image */}
      <div className="absolute left-0 bottom-0 w-full z-10 pointer-events-none select-none">
        <img
          src="/DeveloperSection/DeveloperSectionBottomImage.svg"
          alt="Decorative Bottom"
          className="w-full"
          style={{ maxHeight: '220px', objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
