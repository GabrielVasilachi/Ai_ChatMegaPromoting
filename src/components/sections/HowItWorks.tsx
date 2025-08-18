'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howItWorksSteps } from '@/lib/data';

export default function HowItWorks() {
  // Track which card is hovered (desktop)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Track hover for mobile carousel
  const [mobileHovered, setMobileHovered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  // Combined ref callback for section
  const setSectionRefs = useCallback((el: HTMLElement | null) => {
    ref.current = el;
    sectionRef.current = el;
  }, []);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Hide vertical SVG line when screen width is 1690px or less
  const [hideSvgLine, setHideSvgLine] = useState(false);
  useEffect(() => {
    const checkScreenWidth = () => {
      const shouldHide = window.innerWidth <= 1690;
      setHideSvgLine(shouldHide);
    };
    
    // Check on mount
    checkScreenWidth();
    
    // Check on resize
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  // ===== Mobile swipe carousel logic (Apple-like cards with peeking) =====
  const totalSteps = howItWorksSteps.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = useState(0);
  const [gap, setGap] = useState(12); // px gap between cards
  const [peek, setPeek] = useState(24); // px visible peek on left/right
  const x = useMotionValue(0); // translateX of the track

  // Resize observer to recompute sizes responsively
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const vw = entry.contentRect.width;
        // Card width is viewport minus both peeks
        const nextCardW = Math.max(260, vw - 2 * peek);
        setCardW(nextCardW);
        setGap(Math.max(10, Math.min(16, Math.round(vw * 0.03))));
        // Snap x to the active index each time dimensions change
        const targetX = -activeIndex * (nextCardW + Math.max(10, Math.min(16, Math.round(vw * 0.03))));
        animate(x, targetX, { type: 'spring', stiffness: 380, damping: 42 });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeIndex, peek, x]);

  // Animate to index
  const snapTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(totalSteps - 1, index));
    setActiveIndex(clamped);
    const targetX = -clamped * (cardW + gap);
    animate(x, targetX, { type: 'spring', stiffness: 380, damping: 42 });
  }, [cardW, gap, totalSteps, x]);

  // Drag handlers
  const onDragEnd = (_: any, info: { offset: { x: number }, velocity: { x: number } }) => {
    const { offset, velocity } = info;
    const delta = offset.x; // positive when dragging right
    const v = velocity.x;
    const threshold = Math.max(40, cardW * 0.2); // 20% of card width

    let next = activeIndex;
    if (delta < -threshold || v < -400) next = activeIndex + 1;
    else if (delta > threshold || v > 400) next = activeIndex - 1;
    snapTo(next);
  };

  // Wheel-to-swipe for touchpads (optional, mobile only)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Only act on horizontal intent and only on small screens
      if (window.innerWidth >= 1280) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (e.deltaX > 10) snapTo(activeIndex + 1);
      else if (e.deltaX < -10) snapTo(activeIndex - 1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel as any);
  }, [activeIndex, snapTo]);

  // Animate background color to creme as user scrolls through the section
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const industrySection = document.getElementById('industry-modules-section');
    if (sectionRef.current) {
      const dummy = { progress: 0 } as any;
      gsap.to(dummy, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          end: 'bottom+=320% bottom',
          scrub: true,
          onUpdate: () => {
            const creme = [255, 247, 230];
            const white = [255, 255, 255];
            const p = dummy.progress as number;
            const r = Math.round(white[0] + (creme[0] - white[0]) * p);
            const g = Math.round(white[1] + (creme[1] - white[1]) * p);
            const b = Math.round(white[2] + (creme[2] - white[2]) * p);
            const color = `rgb(${r},${g},${b})`;
            if (sectionRef.current) sectionRef.current.style.backgroundColor = color;
            if (industrySection) industrySection.style.backgroundColor = color;
          }
        },
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Ref pentru SVG path
  const svgLineRef = useRef<SVGPathElement | null>(null);
  useEffect(() => {
    if (!svgLineRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const path = svgLineRef.current;
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });
    const triggerTarget = sectionRef.current;
    if (!triggerTarget) return;
    const st = ScrollTrigger.create({
      trigger: triggerTarget,
      start: 'top 70%',
      end: 'bottom 80%',
      scrub: true,
      onUpdate: self => {
        const progress = self.progress; // 0..1
        gsap.set(path, { strokeDashoffset: pathLength * (1 - progress) });
      },
      invalidateOnRefresh: true,
    });
    return () => { st.kill(); };
  }, []);

  return (
    <section
      ref={setSectionRefs}
      className="min-h-[60vh] bg-white py-6 md:py-10 flex items-center justify-center overflow-hidden relative"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Full-width background image at the very top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '300px',
        backgroundImage: "url('/AnimeStyleImages/ImageTopTrees.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* SVG vertical dashed line */}
      <svg
        className="hidden md:block absolute z-20 pointer-events-none"
        style={{ top: 0, left: 0, width: '100%', height: '100%', display: hideSvgLine ? 'none' : undefined }}
        width="100%"
        height="100%"
        viewBox="0 0 1000 1200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path ref={svgLineRef} d="M120 0 V1200" stroke="#b3b3b3" strokeWidth="3" opacity="0.6" />
      </svg>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top image container (content only, no image) */}
        <div className="flex justify-center items-center mb-[60px] md:mb-[200px] relative" style={{ minHeight: '300px' }}>
          <div className="w-full flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center"
              style={{ zIndex: 2, maxWidth: '100%', pointerEvents: 'auto', height: '100%', transform: 'translateY(40px)' }}
            >
              <p
                className="text-white font-semibold drop-shadow-lg text-base sm:text-lg md:text-2xl lg:text-3xl text-center mx-auto mb-2 max-w-3xl"
              >
                Activează-ți agentul AI în doar trei pași simpli
              </p>
              <h2
                className="font-extrabold text-white mb-1 md:mb-4 drop-shadow-lg text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center mx-auto max-w-4xl"
                style={{lineHeight: 1.08, marginBottom: '2.2rem'}}
              >
                Cum lucrează agentul <span style={{ color: '#fff' }}>AI</span>
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Desktop: grid with spacing */}
        <div className="relative">
          <div className="hidden xl:flex justify-between w-full">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={
                  `howitworks-card text-center px-12 py-16 rounded-3xl transition-colors duration-300 mx-3 relative overflow-hidden ` +
                  (index === 0 || index === 1 || index === 2 ? 'bg-blue-50/80 border border-blue-100 shadow-md' : '') +
                  (hoveredIndex === index ? ' shadow-2xl' : '') +
                  ' group'
                }
                style={{
                  ...(index === 0 ? { backgroundImage: "url('/HowItWorksSectin/1stImageHowItWorks.png')" } :
                     index === 1 ? { backgroundImage: "url('/HowItWorksSectin/2ndImageHowItWorks.png')" } :
                     index === 2 ? { backgroundImage: "url('/HowItWorksSectin/3rdImageHowItWorks.png')" } : {}),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                  zIndex: 0,
                  minHeight: '370px',
                  minWidth: '380px',
                  cursor: hoveredIndex === index ? 'pointer' : 'default',
                }}
                onMouseEnter={e => {
                  const btn = e.currentTarget.querySelector('.howitworks-action-btn') as HTMLElement | null;
                  if (btn) {
                    btn.style.background = '#111';
                    btn.style.color = '#fff';
                    btn.style.borderColor = '#111';
                  }
                  setHoveredIndex(index);
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget.querySelector('.howitworks-action-btn') as HTMLElement | null;
                  if (btn) {
                    btn.style.background = '#fff';
                    btn.style.color = '#111';
                    btn.style.borderColor = '#111';
                  }
                  setHoveredIndex(null);
                }}
              >
                {/* Step number - large background for all containers */}
                <div aria-hidden className="absolute select-none pointer-events-none" style={{ left: 'calc(18% - 2.5rem)', bottom: '-6.5rem', fontSize: '17rem', fontWeight: 900, color: 'rgba(255,255,255,0.38)', lineHeight: 1, zIndex: 1, textShadow: '0 4px 32px rgba(0,0,0,0.18)' }}>
                  {step.id}
                </div>
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-black mb-1 md:mb-2 text-left" style={{ marginTop: '-1.2rem', marginLeft: '-0.7rem', lineHeight: 1.15 }}>{step.title}</h3>
                  <p className="text-black text-base md:text-lg leading-relaxed text-left" style={{ marginTop: '2.5rem', marginLeft: '-0.7rem' }}>{step.description}</p>
                </div>
                {/* Button */}
                <button
                  className="howitworks-action-btn"
                  style={{
                    position: 'absolute',
                    right: 18,
                    bottom: 18,
                    padding: '0.38rem 0.85rem', borderRadius: '1.5rem', border: '2px solid #111', background: '#fff', color: '#111', fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.18s', zIndex: 10, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                    ...(typeof window !== 'undefined' && window.innerWidth >= 640 ? { fontSize: '0.98rem', padding: '0.5rem 1.1rem' } : {})
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#111'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = '#111'; }}
                >
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>

          {/* ===== Mobile: Apple-like swipe carousel with peeking & fades ===== */}
          <div className="xl:hidden relative w-full">
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-[5]" style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0))'
            }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-[5]" style={{
              background: 'linear-gradient(to left, rgba(255,255,255,0.95), rgba(255,255,255,0))'
            }} />

            <div ref={viewportRef} className="relative w-full px-6" style={{ overflow: 'hidden' }}>
              <motion.div
                ref={trackRef}
                className="flex items-stretch will-change-transform select-none"
                drag="x"
                style={{ x, touchAction: 'pan-y' }}
                dragConstraints={{ left: -((totalSteps - 1) * (cardW + gap)), right: 0 }}
                dragElastic={0.04}
                onDragEnd={onDragEnd}
              >
                {howItWorksSteps.map((step, i) => {
                  const bg = i === 0
                    ? "url('/HowItWorksSectin/1stImageHowItWorks.png')"
                    : i === 1
                    ? "url('/HowItWorksSectin/2ndImageHowItWorks.png')"
                    : i === 2
                    ? "url('/HowItWorksSectin/3rdImageHowItWorks.png')"
                    : undefined;

                  // Visual emphasis: center card is strongest; neighbors are slightly dimmed
                  const isCenter = i === activeIndex;
                  const isNeighbor = Math.abs(i - activeIndex) === 1;

                  // Setează minHeight mai mare pe mobil
                  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 990 : false;
                  return (
                    <motion.div
                      key={step.id}
                      className={
                        'relative rounded-3xl border border-blue-100 shadow-md overflow-hidden bg-blue-50/80'
                      }
                      style={{
                        width: cardW,
                        minWidth: cardW,
                        maxWidth: cardW,
                        minHeight: isMobile ? 380 : 370,
                        marginRight: i === totalSteps - 1 ? 0 : gap,
                        backgroundImage: bg,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        filter: isCenter ? 'none' : 'saturate(0.88) brightness(0.96)',
                        opacity: isCenter ? 1 : isNeighbor ? 0.82 : 0.65,
                        transform: isCenter ? 'scale(1)' : 'scale(0.96)',
                        transition: 'transform 220ms ease, opacity 220ms ease, filter 220ms ease'
                      }}
                      onPointerDown={() => setMobileHovered(true)}
                      onPointerUp={() => setMobileHovered(false)}
                      onPointerCancel={() => setMobileHovered(false)}
                      onClick={() => snapTo(i)}
                    >
                      {/* Large step number */}
                      <div aria-hidden className="absolute select-none pointer-events-none" style={{ left: 'calc(18% - 2.5rem)', bottom: '-6.5rem', fontSize: '17rem', fontWeight: 900, color: 'rgba(255,255,255,0.38)', lineHeight: 1, zIndex: 1, textShadow: '0 4px 32px rgba(0,0,0,0.18)' }}>
                        {step.id}
                      </div>

                      {/* Optional hover overlay on touch */}
                      {mobileHovered && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(120,120,120,0.14)', zIndex: 2, pointerEvents: 'none' }} />
                      )}

                      {/* Content */}
                      <div style={{ position: 'relative', zIndex: 3 }} className="px-6 py-10">
                        <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-extrabold text-black text-left leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-black text-base sm:text-lg leading-relaxed text-left mt-6">
                          {step.description}
                        </p>
                      </div>

                      {/* Action button */}
                      <button
                        className="howitworks-action-btn"
                        style={{
                          position: 'absolute',
                          right: 18,
                          bottom: 18,
                          padding: '0.38rem 0.85rem',
                          borderRadius: '1.5rem',
                          border: '2px solid #111',
                          background: '#fff',
                          color: '#111',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          transition: 'all 0.18s',
                          zIndex: 10,
                          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#111'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = '#111'; }}
                      >
                        Learn More
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Dots & arrows */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <button aria-label="Previous step" onClick={() => snapTo(activeIndex - 1)} className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-black/90 shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                {howItWorksSteps.map((_, i) => (
                  <button key={i} onClick={() => snapTo(i)} aria-label={`Go to card ${i + 1}`} className={`w-2.5 h-2.5 rounded-full transition-opacity ${i === activeIndex ? 'opacity-100' : 'opacity-40'} bg-black`} />
                ))}
              </div>
              <button aria-label="Next step" onClick={() => snapTo(activeIndex + 1)} className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-black/90 shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
