'use client';

import { testimonials } from '@/lib/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Testimonials() {
  // No state needed for heart/branch visibility
  // Ref pentru SVG path
  const svgLineRef = useRef<SVGPathElement | null>(null);
  const [svgLineDisplay, setSvgLineDisplay] = useState<'block' | 'none'>('block');

  // State separat pentru vizibilitatea SVG-urilor pe ecrane mici
  const [showHeartAndBranches, setShowHeartAndBranches] = useState<boolean>(true);

  // Hide SVG line when screen width is 1690px or less
  useEffect(() => {
    const checkScreenWidth = () => {
      const shouldHide = window.innerWidth <= 1690;
      setSvgLineDisplay(shouldHide ? 'none' : 'block');
    };
    
    // Check on mount
    checkScreenWidth();
    
    // Check on resize
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  // Ref-uri pentru inima si cele 3 linii ramificate
  const heartRef = useRef<SVGPathElement | null>(null);
  const branchLeftRef = useRef<SVGLineElement | null>(null);
  const branchCenterRef = useRef<SVGLineElement | null>(null);
  const branchRightRef = useRef<SVGLineElement | null>(null);
  // New: trigger at the first testimonials grid (so heart starts when reaching first container)
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Add state for mobile carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Functie separata pentru a controla vizibilitatea SVG-urilor pe ecrane mai mici de 990px
  useEffect(() => {
    function handleSvgVisibility() {
      const shouldShow = window.innerWidth >= 990;
      setShowHeartAndBranches(shouldShow);
    }
    handleSvgVisibility();
    window.addEventListener('resize', handleSvgVisibility);
    return () => window.removeEventListener('resize', handleSvgVisibility);
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 990);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Heart and branch lines: invisible by default, animate in on scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    const sectionEl = document.querySelector('section.py-20.bg-black');

    // Vertical right path animation (kept as-is)
    if (svgLineRef.current && sectionEl) {
      const path = svgLineRef.current;
      const pathLength = path.getTotalLength();

      // Ensure the path is visible initially
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0.6,
        visibility: 'visible',
      });

      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 60%',
        end: 'center 60%',
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          const delayedProgress = Math.max(0, (progress - 0.1) / 0.9);
          gsap.set(path, {
            strokeDashoffset: pathLength * (1 - delayedProgress),
          });
        },
        invalidateOnRefresh: true,
      });
      triggers.push(st);
    }

    // Heart and branches: start when the first grid (first container area) is reached
    const triggerEl = gridRef.current || sectionEl;

    const heartAndBranches = [
      { ref: heartRef, type: 'path' as const },
      { ref: branchCenterRef, type: 'line' as const },
      { ref: branchLeftRef, type: 'line' as const },
      { ref: branchRightRef, type: 'line' as const },
      // Animate vertical lines as well:
      // Center vertical (400,155 to 400,320)
      { selector: 'line[x1="400"][y1="155"][x2="400"][y2="320"]', type: 'line' as const },
      // Left vertical (150,155 to 150,320)
      { selector: 'line[x1="150"][y1="155"][x2="150"][y2="320"]', type: 'line' as const },
      // Right vertical (650,155 to 650,320)
      { selector: 'line[x1="650"][y1="155"][x2="650"][y2="320"]', type: 'line' as const },
    ];

    if (triggerEl) {
      heartAndBranches.forEach((item, index) => {
        let el: SVGPathElement | SVGLineElement | null = null;
        if ('ref' in item && item.ref) {
          el = item.ref.current;
        } else if ('selector' in item) {
          // Find the SVG element by selector (escape / for querySelector)
          const svg = document.querySelector('svg.absolute.left-1\\/2') as SVGSVGElement | null;
          if (svg) {
            el = svg.querySelector(item.selector) as SVGLineElement | null;
          }
        }
        if (!el) return;

        // Determine length of element
        let elementLength = 0;
        if (item.type === 'path') {
          elementLength = (el as SVGPathElement).getTotalLength();
        } else {
          const x1 = parseFloat(el.getAttribute('x1') || '0');
          const y1 = parseFloat(el.getAttribute('y1') || '0');
          const x2 = parseFloat(el.getAttribute('x2') || '0');
          const y2 = parseFloat(el.getAttribute('y2') || '0');
          elementLength = Math.hypot(x2 - x1, y2 - y1);
        }

        gsap.set(el, {
          strokeDasharray: elementLength,
          strokeDashoffset: elementLength,
          opacity: 0.9,
        });

        const stagger = index * 0.12;
        const st = ScrollTrigger.create({
          trigger: triggerEl,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1.5,
          onUpdate: (self) => {
            const p = self.progress;
            const easedStart = Math.max(0, (p - stagger) / (1 - stagger));
            gsap.set(el!, { strokeDashoffset: elementLength * (1 - easedStart) });
          },
          invalidateOnRefresh: true,
        });
        triggers.push(st);
      });
    }

    return () => {
      // Cleanup all triggers
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // =========================
  // Mobile carousel (Apple-style) — infinite with neighbors peeking
  // =========================
  const n = testimonials.length;
  const looped = useMemo(() => {
    if (!n) return [] as Array<typeof testimonials[number] & { __realIndex: number; __key: string }>;
    const leftClone = { ...testimonials[n - 1], __realIndex: n - 1, __key: 'clone-left' };
    const rightClone = { ...testimonials[0], __realIndex: 0, __key: 'clone-right' };
    return [
      leftClone,
      ...testimonials.map((t, i) => ({ ...(t as any), __realIndex: i, __key: `real-${i}` })),
      rightClone,
    ];
  }, [n]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentLoopIndex, setCurrentLoopIndex] = useState(1); // 1 == primul real

  // Helper: center scroll to a given loop index with improved smooth scrolling
  const scrollToLoopIndex = (idx: number, behavior: ScrollBehavior = 'smooth') => {
    const container = containerRef.current;
    const el = itemRefs.current[idx];
    if (!container || !el) return;
    
    const containerCenter = container.clientWidth / 2;
    const targetLeft = el.offsetLeft - (containerCenter - el.clientWidth / 2);
    
    // For auto behavior (jump), disable scroll-snap temporarily for smoother transition
    if (behavior === 'auto') {
      container.style.scrollSnapType = 'none';
      container.scrollTo({ left: targetLeft, behavior: 'auto' });
      // Re-enable scroll-snap after a short delay
      setTimeout(() => {
        container.style.scrollSnapType = 'x mandatory';
      }, 50);
    } else {
      container.scrollTo({ left: targetLeft, behavior });
    }
  };

  // On mount / when becomes mobile: position to first real item
  useEffect(() => {
    if (!isMobile) return;
    const i = 1; // first real item
    // small timeout so layout settles
    const id = setTimeout(() => scrollToLoopIndex(i, 'auto'), 0);
    setCurrentLoopIndex(i);
    setActiveIndex(0);
    return () => clearTimeout(id);
  }, [isMobile]);

  // Track centered item using IntersectionObserver for snap-center with improved precision
  useEffect(() => {
    if (!isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const updateActiveByScroll = () => {
      // Find the item most centered in the viewport
      let minDiff = Infinity;
      let bestIdx = 1;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.left + rect.width / 2;
        const diff = Math.abs(containerCenter - elCenter);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = i;
        }
      });
      setCurrentLoopIndex(bestIdx);
    };

    // IntersectionObserver for best browser support
    const obs = new window.IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let bestIdx = 1;
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index || '0');
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        });
        setCurrentLoopIndex(bestIdx);
      },
      {
        root: container,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
        rootMargin: '-20% 0px',
      }
    );

    itemRefs.current.forEach((el, i) => {
      if (el) {
        (el as any).dataset.index = String(i);
        obs.observe(el);
      }
    });

    // Fallback: update on scroll (for mobile browsers where observer is unreliable)
    container.addEventListener('scroll', updateActiveByScroll, { passive: true });

    return () => {
      obs.disconnect();
      container.removeEventListener('scroll', updateActiveByScroll);
    };
  }, [isMobile, looped.length]);

  // Handle edges for infinite illusion + compute active real index
  useEffect(() => {
    if (!isMobile) return;
    const total = n;
    if (!total) return;

    let scrollTimeout: NodeJS.Timeout | null = null;
    const container = containerRef.current;

    // Helper: debounce scroll end
    const onScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (currentLoopIndex === 0) {
          scrollToLoopIndex(total, 'auto');
        } else if (currentLoopIndex === total + 1) {
          scrollToLoopIndex(1, 'auto');
        }
      }, 60); // Wait for scroll to finish
    };

    if (container) {
      container.addEventListener('scroll', onScroll, { passive: true });
    }

    // Active real index (wrap)
    const real = ((currentLoopIndex - 1 + total) % total + total) % total;
    setActiveIndex(real);

    return () => {
      if (container) container.removeEventListener('scroll', onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentLoopIndex, isMobile, n]);

  const goNext = () => scrollToLoopIndex(currentLoopIndex + 1, 'smooth');
  const goPrev = () => scrollToLoopIndex(currentLoopIndex - 1, 'smooth');
  const gotoReal = (realIndex: number) => {
    setCurrentLoopIndex(realIndex + 1);
    scrollToLoopIndex(realIndex + 1, 'smooth');
  };

  const pillFor = (realIndex: number) => {
    switch (realIndex) {
      case 0: return 'Response Time: -85%';
      case 1: return 'Cost Savings: 60%';
      case 2: return 'CSAT Score: +40%';
      case 3: return 'Lead Conversion: +300%';
      case 4: return 'Resolution Rate: 92%';
      case 5: return 'ROI: +250%';
      default: return '';
    }
  };

  return (
    <section className="py-20 bg-black relative">
      {/* Heart + branches and the right vertical line are preserved exactly */}
      {showHeartAndBranches && (
        <svg
          className="hidden md:block absolute z-20 pointer-events-none"
          style={{ top: 0, left: 0, width: '100%', height: '100%', display: svgLineDisplay }}
          width="100%"
          height="100%"
          viewBox="0 0 1000 1200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            ref={svgLineRef}
            d="M120 0 V300 Q120 320 100 320 H-300 Q-320 320 -320 340 V390"
            transform="translate(820,0)"
            stroke="#b3b3b3"
            strokeWidth="3"
            opacity="0.6"
          />
        </svg>
      )}

      {showHeartAndBranches && (
        <svg
          className="hidden md:block absolute left-1/2 z-0 pointer-events-none"
          style={{ top: '30%', transform: 'translate(-50%, 0)' }}
          width="800"
          height="400"
          viewBox="0 0 800 400"
          fill="none"
        >
          <path
            ref={heartRef}
            d="M400 105 C360 70, 350 40, 380 30 C395 25, 400 40, 400 50 C400 40, 405 25, 420 30 C450 40, 440 70, 400 105"
            stroke="#b3b3b3"
            strokeWidth="4"
            fill="none"
          />
          <line ref={branchCenterRef} x1="400" y1="105" x2="400" y2="155" stroke="#b3b3b3" strokeWidth="4" />
          <circle cx="400" cy="155" r="6" fill="#b3b3b3" opacity="0.9" />
          <line ref={branchLeftRef} x1="400" y1="155" x2="150" y2="155" stroke="#b3b3b3" strokeWidth="4" />
          <line x1="150" y1="155" x2="150" y2="320" stroke="#b3b3b3" strokeWidth="4" opacity="0.9" />
          <circle cx="150" cy="320" r="4" fill="#b3b3b3" opacity="0.9" />
          <line x1="400" y1="155" x2="400" y2="320" stroke="#b3b3b3" strokeWidth="4" opacity="0.9" />
          <circle cx="400" cy="320" r="4" fill="#b3b3b3" opacity="0.9" />
          <line ref={branchRightRef} x1="400" y1="155" x2="650" y2="155" stroke="#b3b3b3" strokeWidth="4" />
          <line x1="650" y1="155" x2="650" y2="320" stroke="#b3b3b3" strokeWidth="4" opacity="0.9" />
          <circle cx="650" cy="320" r="4" fill="#b3b3b3" opacity="0.9" />
        </svg>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 mt-10 md:mt-16">What Our Clients Say</h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Real stories from businesses that transformed their customer service with our AI solutions
          </p>
        </div>

        {/* MOBILE: Apple-style infinite carousel with neighbors peeking */}
        {isMobile ? (
          <div className="relative w-full">
            {/* Edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-20 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-20 bg-gradient-to-l from-black to-transparent" />

            <div
              ref={containerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 no-scrollbar"
              style={{ scrollPadding: '0 24px' }}
            >
              {looped.map((t, i) => (
                <div
                  key={`${t.__key}-${i}`}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="snap-center shrink-0 w-[85%] max-w-[420px]"
                >
                  <div className="bg-white rounded-xl p-5 shadow-lg transition-shadow duration-300 flex flex-col h-[370px] relative">
                    <blockquote className="text-base text-gray-800 leading-relaxed mb-4">{t.quote}</blockquote>
                    {/* Bottom row: left = persoana, right = procente */}
                    <div className="absolute left-0 bottom-0 w-full flex flex-col gap-2 px-2 pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-base">{t.name?.[0] ?? '•'}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-sm w-full truncate">{t.name}</div>
                          <div className="text-gray-600 text-xs w-full truncate">{t.title}</div>
                          <div className="text-gray-500 text-xs w-full truncate">{t.company}</div>
                        </div>
                      </div>
                      <div className="w-full flex">
                        <div className="bg-black px-3 py-1.5 rounded-full text-white text-xs font-semibold whitespace-nowrap mx-auto">
                          {pillFor((t as any).__realIndex)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center w-full mt-4 gap-4">
              <button
                aria-label="Previous testimonial"
                onClick={goPrev}
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #111',
                  color: '#111',
                  fontSize: 24,
                  lineHeight: 1,
                  minWidth: 44,
                  minHeight: 44,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                  transition: 'background 0.18s, color 0.18s, border 0.18s',
                  cursor: 'pointer',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                aria-label="Next testimonial"
                onClick={goNext}
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #111',
                  color: '#111',
                  fontSize: 24,
                  lineHeight: 1,
                  minWidth: 44,
                  minHeight: 44,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                  transition: 'background 0.18s, color 0.18s, border 0.18s',
                  cursor: 'pointer',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="mt-3 flex items-center justify-center gap-2">
              {testimonials.map((_, i) => {
                // Calculate real index from currentLoopIndex (1..n), wrap around
                const real = ((currentLoopIndex - 1 + n) % n + n) % n;
                return (
                  <button
                    key={`dot-${i}`}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => gotoReal(i)}
                    className={`h-2 w-2 rounded-full transition-all ${real === i ? 'bg-white w-5' : 'bg-white/40'}`}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          // DESKTOP: păstrat neschimbat (grid 3x2)
          <div ref={gridRef} className="grid grid-cols-3 gap-8 mt-[490px] md:mt-[450px]">
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
                <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">Response Time: -85%</div>
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
                <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">Cost Savings: 60%</div>
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
                <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">CSAT Score: +40%</div>
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
                <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">Lead Conversion: +300%</div>
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
                <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">Resolution Rate: 92%</div>
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
                <div className="inline-block bg-black px-4 py-2 rounded-full text-white text-sm font-semibold">ROI: +250%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optional: hide native scrollbars on supported browsers without affecting layout */}
      <style jsx global>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
