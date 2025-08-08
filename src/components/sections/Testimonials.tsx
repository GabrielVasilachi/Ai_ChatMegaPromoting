'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Magic ✨
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamically import GSAP to avoid SSR issues
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          import('gsap/TextPlugin').then(({ TextPlugin }) => {
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
            
            // Create floating particles background
            const particles: HTMLElement[] = [];
            const particleContainer = particlesRef.current;
            
            if (particleContainer) {
              // Clear existing particles
              particleContainer.innerHTML = '';
              
              for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute w-1 h-1 bg-white/30 rounded-full';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particleContainer.appendChild(particle);
                particles.push(particle);
                
                // Animate particles with GSAP
                gsap.to(particle, {
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                  duration: Math.random() * 10 + 5,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut"
                });
                
                gsap.to(particle, {
                  opacity: Math.random() * 0.7 + 0.3,
                  duration: Math.random() * 3 + 1,
                  repeat: -1,
                  yoyo: true,
                  ease: "power2.inOut"
                });
              }
            }

            // Pulsating glow effect
            if (glowRef.current) {
              gsap.to(glowRef.current, {
                scale: 1.1,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
              });
              
              gsap.to(glowRef.current, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
              });
            }

            // Card entrance animation with GSAP
            const tl = gsap.timeline({ paused: true });
            if (cardRef.current) {
              tl.from(cardRef.current, {
                scale: 0,
                rotation: 180,
                duration: 1,
                ease: "back.out(1.7)"
              })
              .from(cardRef.current.querySelectorAll('.quote-text'), {
                opacity: 0,
                y: 50,
                stagger: 0.05,
                duration: 0.8,
                ease: "power3.out"
              }, "-=0.5")
              .from(cardRef.current.querySelectorAll('.author-info'), {
                opacity: 0,
                scale: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              }, "-=0.3");
              
              if (isInView) {
                tl.play();
              }
            }
          });
        });
      });
    }
  }, [isInView, currentIndex]);

  const nextTestimonial = () => {
    if (cardRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        // Crazy transition effect
        gsap.to(cardRef.current, {
          rotationY: 90,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            gsap.fromTo(cardRef.current, 
              { rotationY: -90 },
              { rotationY: 0, duration: 0.3, ease: "power2.out" }
            );
          }
        });
      });
    }
  };

  const prevTestimonial = () => {
    if (cardRef.current && typeof window !== 'undefined') {
      // Dynamically import GSAP
      import('gsap').then(({ gsap }) => {
        // Crazy transition effect
        gsap.to(cardRef.current, {
          rotationY: -90,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            gsap.fromTo(cardRef.current, 
              { rotationY: 90 },
              { rotationY: 0, duration: 0.3, ease: "power2.out" }
            );
          }
        });
      });
    }
  };

  return (
    <section ref={ref} className="min-h-screen bg-black py-12 md:py-20 flex items-center overflow-hidden relative">
      {/* Floating Particles Background */}
      <div 
        ref={particlesRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ perspective: '1000px' }}
      />
      
      {/* Rotating Glow Effect */}
      <div 
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          filter: 'blur(40px)'
        }}
      />
      
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            What Our <span className="glow-text">Clients</span> Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Real stories from businesses that transformed their customer service
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
          <div
            ref={cardRef}
            className="bg-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-12 border border-gray-200 mx-4 md:mx-0 relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-black rounded-full animate-pulse" />
              <div className="absolute top-8 right-8 w-4 h-4 bg-black rounded-full animate-bounce" />
              <div className="absolute bottom-8 left-8 w-6 h-6 border border-black rotate-45 animate-spin" />
            </div>
            
            {/* Quote */}
            <div className="text-center mb-6 md:mb-8 relative z-10">
              <blockquote className="quote-text text-lg sm:text-xl md:text-2xl lg:text-3xl text-black leading-relaxed mb-6 md:mb-8 px-2">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              {/* Author info */}
              <div className="author-info flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <span className="text-white font-semibold text-lg md:text-xl relative z-10">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                  {/* Pulsing ring effect */}
                  <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-black text-base md:text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    {testimonials[currentIndex].title} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics badge with glow */}
            <div className="text-center relative">
              <div className="inline-block bg-black px-4 md:px-6 py-2 md:py-3 rounded-full text-white font-bold text-sm md:text-base relative overflow-hidden">
                <span className="relative z-10">
                  {testimonials[currentIndex].metrics.label}: {testimonials[currentIndex].metrics.value}
                </span>
                {/* Sliding highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Navigation with GSAP Magic */}
          <div className="flex justify-center items-center mt-6 md:mt-8 space-x-4 px-4">
            <button
              onClick={prevTestimonial}
              className="p-2 md:p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200 border border-gray-200 group relative overflow-hidden"
              onMouseEnter={(e) => {
                if (typeof window !== 'undefined') {
                  import('gsap').then(({ gsap }) => {
                    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 });
                    gsap.to(e.currentTarget.querySelector('.nav-icon'), { rotation: -15, duration: 0.2 });
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== 'undefined') {
                  import('gsap').then(({ gsap }) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                    gsap.to(e.currentTarget.querySelector('.nav-icon'), { rotation: 0, duration: 0.2 });
                  });
                }
              }}
            >
              <div className="nav-icon w-4 h-4 md:w-6 md:h-6 bg-black rounded relative">
                <div className="absolute inset-0 bg-white/30 rounded transform scale-0 group-hover:scale-100 transition-transform duration-200" />
              </div>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 relative overflow-hidden ${
                    index === currentIndex ? 'bg-white scale-125' : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  onMouseEnter={(e) => {
                    if (index !== currentIndex && typeof window !== 'undefined') {
                      import('gsap').then(({ gsap }) => {
                        gsap.to(e.currentTarget, { scale: 1.5, duration: 0.2 });
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentIndex && typeof window !== 'undefined') {
                      import('gsap').then(({ gsap }) => {
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                      });
                    }
                  }}
                >
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 md:p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200 border border-gray-200 group relative overflow-hidden"
              onMouseEnter={(e) => {
                if (typeof window !== 'undefined') {
                  import('gsap').then(({ gsap }) => {
                    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 });
                    gsap.to(e.currentTarget.querySelector('.nav-icon'), { rotation: 15, duration: 0.2 });
                  });
                }
              }}
              onMouseLeave={(e) => {
                if (typeof window !== 'undefined') {
                  import('gsap').then(({ gsap }) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                    gsap.to(e.currentTarget.querySelector('.nav-icon'), { rotation: 0, duration: 0.2 });
                  });
                }
              }}
            >
              <div className="nav-icon w-4 h-4 md:w-6 md:h-6 bg-black rounded relative">
                <div className="absolute inset-0 bg-white/30 rounded transform scale-0 group-hover:scale-100 transition-transform duration-200" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
