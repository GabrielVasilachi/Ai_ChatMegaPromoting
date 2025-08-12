'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howItWorksSteps } from '@/lib/data';
// import { SVGAnimationWrapper } from '@/hooks/useExistingSVGAnimation';
// import { SimpleSVGAnimationWrapper } from '@/hooks/useSimpleSVGAnimation';
// (importurile gsap si ScrollTrigger sunt deja sus)

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

  // Hide vertical SVG line when it overlaps any element in the section
  const [hideSvgLine, setHideSvgLine] = useState(false);
  useEffect(() => {
    const checkOverlap = () => {
      const section = sectionRef.current;
      if (!section) return;
      const secRect = section.getBoundingClientRect();
      // SVG path X corresponds to 120 in a 1000-wide viewBox => 12% of width
      const x = secRect.left + secRect.width * 0.12;
      // Consider a 4px strip around the line for visibility
      const stripLeft = x - 2;
      const stripRight = x + 2;
      let overlap = false;
      const all = Array.from(section.querySelectorAll('*')) as HTMLElement[];
      for (const el of all) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'svg' || tag === 'path') continue; // ignore the line itself
        const rect = el.getBoundingClientRect();
        if (stripLeft < rect.right && stripRight > rect.left && secRect.top < rect.bottom && secRect.bottom > rect.top) {
          overlap = true;
          break;
        }
      }
      setHideSvgLine(prev => {
        if (prev !== overlap) {
          if (overlap) {
            console.log('howitworks-svg-line-hidden');
          } else {
            console.log('howitworks-svg-line-visible');
          }
        }
        return overlap;
      });
    };
    const onScroll = () => requestAnimationFrame(checkOverlap);
    const onResize = () => requestAnimationFrame(checkOverlap);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // initial
    setTimeout(checkOverlap, 0);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Carousel state for mobile
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = howItWorksSteps.length;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Animate background color to creme as user scrolls through the section
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Find the section below by id or class (add id to IndustryModules section)
    const industrySection = document.getElementById('industry-modules-section');
    if (sectionRef.current) {
      const dummy = { progress: 0 };
      gsap.to(dummy, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          end: 'bottom+=320% bottom', // even slower transition, fully creme far after HowItWorks ends
          scrub: true,
          onUpdate: self => {
            // Interpolate color between white and creme
            const creme = [255, 247, 230];
            const white = [255, 255, 255];
            const p = dummy.progress;
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
      end: 'bottom 80%', // linia se completeaza cand sectiunea ajunge la 85% din viewport
      scrub: true,
      onUpdate: self => {
        const progress = self.progress; // 0..1
        gsap.set(path, {
          strokeDashoffset: pathLength * (1 - progress)
        });
      },
      invalidateOnRefresh: true,
    });
    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={setSectionRefs} className="min-h-[60vh] bg-white py-6 md:py-10 flex items-center overflow-hidden relative">
      {/* SVG vertical dashed line, matching IndustryModules, straight down, same width and position */}
      <svg
        className="hidden md:block absolute z-20 pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: hideSvgLine ? 'none' : undefined,
        }}
        width="100%"
        height="100%"
        viewBox="0 0 1000 1200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={svgLineRef}
          d="M120 0 V1200"
          stroke="#b3b3b3"
          strokeWidth="3"
          opacity="0.6"
        />
      </svg>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top image container */}
          <div
            className="flex justify-center items-center mb-[60px] md:mb-[200px] relative"
            style={{ minHeight: '300px' }}
          >
          <div className="w-full flex justify-center relative">
            <img 
              src="/AnimeStyleImages/ImageTopTrees.png" 
              alt="Decorative Anime Trees" 
              className="w-full h-auto object-contain mx-auto"
              style={{maxWidth: '1200px', maxHeight: '300px', objectFit: 'cover', objectPosition: 'top center'}}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-0 w-full flex flex-col items-start"
              style={{ zIndex: 2, maxWidth: '100%', pointerEvents: 'auto', height: '100%' }}
            >
              <h2
                className="font-extrabold text-white mb-1 md:mb-4 drop-shadow-lg text-2xl sm:text-3xl md:text-6xl lg:text-7xl text-left sm:text-left mobile-center-title"
                style={{
                  paddingLeft: '2.2rem',
                  paddingTop: '1.5rem',
                  lineHeight: 1.08,
                  maxWidth: '90%',
                  fontSize: 'clamp(1.2rem, 5vw, 2.2rem)',
                  position: 'relative',
                  // On desktop, force slightly smaller font
                  ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? { fontSize: '3.7rem', textAlign: 'left', paddingLeft: '2.2rem' } : {}),
                  // On mobile, center and make a bit larger
                  ...(typeof window !== 'undefined' && window.innerWidth < 768 ? { textAlign: 'center', paddingLeft: 0, width: '100%', fontSize: '2.3rem' } : {}),
                }}
              >
                Cum lucrează agentul <span style={{ color: '#fff' }}>AI</span>
              </h2>
              <p
                className="text-white font-semibold drop-shadow-lg text-base sm:text-lg md:text-2xl lg:text-3xl text-left sm:text-left mobile-center-title"
                style={{
                  marginTop: '0.7rem',
                  paddingLeft: '2.2rem',
                  maxWidth: '90%',
                  fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)',
                  position: 'relative',
                  marginBottom: 0,
                  // On desktop, force slightly smaller font
                  ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? { fontSize: '1.3rem', textAlign: 'left', paddingLeft: '2.2rem' } : {}),
                  // On mobile, center and make a bit larger
                  ...(typeof window !== 'undefined' && window.innerWidth < 768 ? { textAlign: 'center', paddingLeft: 0, width: '100%', fontSize: '1.4rem' } : {}),
                }}
              >
                Activează-ți agentul AI în doar trei pași simpli
              </p>
            </motion.div>
          </div>
        </div>
        {/* Subtitle moved into image container above */}

        {/* Desktop: grid with spacing, Mobile: carousel with arrows */}
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
                  ...(index === 0 ? {
                    backgroundImage: "url('/HowItWorksSectin/1stImageHowItWorks.png')",
                  } : index === 1 ? {
                    backgroundImage: "url('/HowItWorksSectin/2ndImageHowItWorks.png')",
                  } : index === 2 ? {
                    backgroundImage: "url('/HowItWorksSectin/3rdImageHowItWorks.png')",
                  } : {}),
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
                  const btn = e.currentTarget.querySelector('.howitworks-action-btn');
                  if (btn && btn instanceof HTMLElement) {
                    btn.style.background = '#111';
                    btn.style.color = '#fff';
                    btn.style.borderColor = '#111';
                  }
                  setHoveredIndex(index);
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget.querySelector('.howitworks-action-btn');
                  if (btn && btn instanceof HTMLElement) {
                    btn.style.background = '#fff';
                    btn.style.color = '#111';
                    btn.style.borderColor = '#111';
                  }
                  setHoveredIndex(null);
                }}
              >
                {/* Step number - large background for all containers */}
                <div
                  aria-hidden
                  className="absolute select-none pointer-events-none"
                  style={{
                    left: index === 0 ? 'calc(18% - 2.5rem)' : index === 1 ? 'calc(18% - 2.5rem)' : 'calc(18% - 2.5rem)',
                    bottom: '-6.5rem',
                    fontSize: '17rem',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.38)',
                    lineHeight: 1,
                    zIndex: 1,
                    textShadow: '0 4px 32px rgba(0,0,0,0.18)'
                  }}
                >
                  {step.id}
                </div>
                {/* Content */}
                <div style={{position:'relative', zIndex:3}}>
        <h3 
          className="text-2xl md:text-4xl font-bold text-black mb-1 md:mb-2 text-left"
          style={{marginTop: '-1.2rem', marginLeft: '-0.7rem', lineHeight: 1.15}}
        >
          {step.title}
        </h3>
        <p 
          className="text-black text-base md:text-lg leading-relaxed text-left"
          style={{marginTop: '1.5rem', marginLeft: '-0.7rem'}}
        >
          {step.description}
        </p>
                </div>
                {/* Button at bottom right of the container */}
                <button
                  className="howitworks-action-btn"
                  style={{
                    position: 'absolute',
                    right: 18,
                    bottom: 18,
                    padding: '0.5rem 1.1rem',
                    borderRadius: '1.5rem',
                    border: '2px solid #111',
                    background: '#fff',
                    color: '#111',
                    fontWeight: 600,
                    fontSize: '0.98rem',
                    transition: 'all 0.18s',
                    zIndex: 10,
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#111';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = '#111';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = '#111';
                    e.currentTarget.style.borderColor = '#111';
                  }}
                >
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
          {/* Mobile carousel */}
          <div className="xl:hidden flex flex-col items-center justify-center px-0 relative" style={{overflow: 'visible'}}>
            <motion.div
              key={howItWorksSteps[activeStep].id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7 }}
              className={
                `howitworks-card text-center px-12 py-16 rounded-3xl transition-colors duration-300 mx-3 relative overflow-hidden ` +
                'bg-blue-50/80 border border-blue-100 shadow-md'
              }
              style={{
                width: '100%',
                minWidth: 0,
                maxWidth: 520,
                minHeight: 370,
                maxHeight: 600,
                boxSizing: 'border-box',
                paddingLeft: 5,
                paddingRight: 5,
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundImage:
                  activeStep === 0
                    ? "url('/HowItWorksSectin/1stImageHowItWorks.png')"
                    : activeStep === 1
                    ? "url('/HowItWorksSectin/2ndImageHowItWorks.png')"
                    : activeStep === 2
                    ? "url('/HowItWorksSectin/3rdImageHowItWorks.png')"
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                zIndex: 0,
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget.querySelector('.howitworks-action-btn');
                if (btn && btn instanceof HTMLElement) {
                  btn.style.background = '#111';
                  btn.style.color = '#fff';
                  btn.style.borderColor = '#111';
                }
                setMobileHovered(true);
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget.querySelector('.howitworks-action-btn');
                if (btn && btn instanceof HTMLElement) {
                  btn.style.background = '#fff';
                  btn.style.color = '#111';
                  btn.style.borderColor = '#111';
                }
                setMobileHovered(false);
              }}
            >
              {/* Overlay for hover effect (mobile) */}
              {mobileHovered && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(120,120,120,0.18)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }} />
              )}
              {/* Large step number in background for mobile, same as desktop */}
              <div
                aria-hidden
                className="absolute select-none pointer-events-none"
                style={{
                  left: 'calc(18% - 2.5rem)',
                  bottom: '-6.5rem',
                  fontSize: '17rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1,
                  zIndex: 1,
                  textShadow: '0 4px 32px rgba(0,0,0,0.18)'
                }}
              >
                {howItWorksSteps[activeStep].id}
              </div>
              <div style={{position:'relative', zIndex:3}}>
                <div style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0 10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <h3 
                    className="text-[2rem] sm:text-[2.5rem] font-extrabold text-black mb-1 md:mb-2 text-left"
                    style={{
                      marginTop: 0,
                      marginLeft: 0,
                      lineHeight: 1.12,
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {howItWorksSteps[activeStep].title}
                  </h3>
                  <p 
                    className="text-black text-base md:text-lg leading-relaxed text-left"
                    style={{
                      marginTop: '0.6rem',
                      marginLeft: 0,
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                      maxWidth: '100%',
                      overflow: 'hidden',
                    }}>
                    {howItWorksSteps[activeStep].description}
                  </p>
                </div>
              </div>
              {/* Button at bottom right of the mobile card - outside text but inside container */}
              <button
                className="howitworks-action-btn"
                style={{
                  position: 'absolute',
                  right: 18,
                  bottom: 18,
                  padding: '0.5rem 1.1rem',
                  borderRadius: '1.5rem',
                  border: '2px solid #111',
                  background: '#fff',
                  color: '#111',
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  transition: 'all 0.18s',
                  zIndex: 10,
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#111';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#111';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#111';
                  e.currentTarget.style.borderColor = '#111';
                }}
              >
                Learn More
              </button>
            </motion.div>
            <div className="flex items-center justify-center w-full mt-4 gap-4">
              <button
                aria-label="Previous step"
                onClick={() => setActiveStep((prev) => (prev - 1 + totalSteps) % totalSteps)}
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display:'block'}}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                aria-label="Next step"
                onClick={() => setActiveStep((prev) => (prev + 1) % totalSteps)}
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display:'block'}}>
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
