'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Zap, PlugZap, UserCog, PiggyBank } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
// import { SVGAnimationWrapper } from '@/hooks/useExistingSVGAnimation';
// import { SimpleSVGAnimationWrapper } from '@/hooks/useSimpleSVGAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export default function IndustryModules() {
  // Animated title logic
  const rotatingIndustries = [
    'companie',
    'restaurant',
    'magazin',
    'hotel',
    'salon',
    'clinică',
    'agenție',
    'școală',
    'universitate',
    'service',
  ];
  const [industryIndex, setIndustryIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndustryIndex((prev) => (prev + 1) % rotatingIndustries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  // Local menu and card data
  const menuItems = [
    {
      id: 1,
      title: 'Răspuns instant la mesaje',
      subtitle: 'Gestionează automat solicitările clienților, 24/7, pe orice platformă.'
    },
    {
      id: 2,
      title: 'Automatizare conversațională completă',
      subtitle: 'De la întrebări frecvente până la procesarea comenzilor, fără intervenție umană.'
    },
    {
      id: 3,
      title: 'Integrare cu platformele tale preferate',
      subtitle: 'Funcționează perfect cu WhatsApp, Facebook Messenger, Instagram, e-mail și multe altele.'
    },
    {
      id: 4,
      title: 'Asistență personalizată pentru fiecare client',
      subtitle: 'Răspunsuri adaptate în funcție de context, limbă și nevoi.'
    },
    {
      id: 5,
      title: 'Reducerea costurilor operaționale',
      subtitle: 'Optimizează timpul echipei și elimină nevoia unui operator permanent.'
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100
  const progressRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Progress bar and auto-advance logic
  useEffect(() => {
    // Clear any previous timer
    if (timerRef.current) clearInterval(timerRef.current);
    progressRef.current = 0;
    setProgress(0);
    // Add a delay before starting the progress bar
    const startDelay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        progressRef.current += 1; // slower fill
        setProgress(progressRef.current);
        if (progressRef.current >= 100) {
          progressRef.current = 0;
          setProgress(0);
          setSelectedIndex((prev) => (prev + 1) % menuItems.length);
        }
      }, 50); // slower interval
    }, 50); // delay before progress starts (increased)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(startDelay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, menuItems.length]);

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
    const triggerTarget = document.getElementById('industry-modules-section');
    if (!triggerTarget) return;
    const st = ScrollTrigger.create({
      trigger: triggerTarget,
      start: 'top 80%', // linia incepe cand sectiunea a intrat 20% in viewport
      end: 'bottom 75%', // ramane la fel, se termina la 45% din viewport
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

  const [hideSvgLine, setHideSvgLine] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
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

  return (
    <section id="industry-modules-section" ref={sectionRef} className="min-h-[120vh] pt-1 pb-[320px] md:pt-2 md:pb-[360px] flex items-center overflow-hidden relative">
      {/* Custom SVG line: starts at left, goes 20px down, curves left, then right, then down */}
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
          d="M120 0
            V20
            C120 35 135 50 150 50
            H910
            Q940 50 940 80
            V1200"
          stroke="#b3b3b3"
          strokeWidth="3"
          opacity="0.6"
        />
      </svg>
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Animated title */}
        <div className="text-center md:text-left mb-16 md:mb-24 mt-8 md:mt-36">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 md:mb-6">
            <span
              className="flex flex-col md:flex-row items-center md:items-center md:justify-start justify-center w-full"
              style={{lineHeight:'1.2'}}>
              <span
                className="mb-3 md:mb-10 md:mr-8 font-bold text-left md:mt-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{minWidth:'max-content', color:'#111', display:'inline-block', lineHeight: 1.1}}
              >
                Bravin pentru orice
              </span>
              <span
                className="md:mt-10 md:mb-10"
                style={{position:'relative', display:'inline-flex', alignItems:'center', minWidth:'max-content', verticalAlign:'middle'}}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rotatingIndustries[industryIndex]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{
                      position:'relative',
                      background:'#ffe066',
                      borderRadius:'0.5em',
                      padding:'0.18em 1.1em',
                      color:'#111',
                      fontWeight:700,
                      fontSize:'1em',
                      boxShadow:'0 2px 8px 0 rgba(0,0,0,0.06)',
                      display:'inline-flex',
                      alignItems:'center',
                      verticalAlign:'middle',
                    }}
                  >
                    {rotatingIndustries[industryIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 mt-2 md:mt-4 font-medium">
            Soluții AI conversaționale adaptate fiecărei industrii — automatizează, personalizează și scalează interacțiunea cu clienții tăi, indiferent de domeniu.
          </p>
        </div>
        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center -mt-16">
          {/* Left menu as containers */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-3 md:ml-8">
            {menuItems.map((item: any, idx: number) => {
              const active = selectedIndex === idx;
              const baseClasses = `group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer select-none ${active ? 'border-transparent' : 'border-black/10 hover:border-black/20'}`;
              return (
                <div
                  key={item.id}
                  className={baseClasses}
                  onClick={() => setSelectedIndex(idx)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedIndex(idx); }}
                >
                  {/* gradient ring when active */}
                  {active && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl p-[1.5px] bg-gradient-to-br from-fuchsia-500/50 via-amber-400/50 to-sky-500/50">
                      <div className="h-full w-full rounded-2xl bg-white" />
                    </div>
                  )}
                  <div className={`relative z-[1] flex items-start gap-3 px-4 py-4 ${active ? '' : 'bg-white'}`}>
                    {/* Icon */}
                    <div className={`shrink-0 grid place-items-center h-10 w-10 rounded-xl ${active ? 'bg-gradient-to-br from-fuchsia-500/15 via-amber-400/15 to-sky-500/15' : 'bg-black/5'}`}>
                      {idx === 0 && <MessageSquare className={`h-5 w-5 ${active ? 'text-fuchsia-600' : 'text-black/70'}`} />}
                      {idx === 1 && <Zap className={`h-5 w-5 ${active ? 'text-amber-600' : 'text-black/70'}`} />}
                      {idx === 2 && <PlugZap className={`h-5 w-5 ${active ? 'text-sky-600' : 'text-black/70'}`} />}
                      {idx === 3 && <UserCog className={`h-5 w-5 ${active ? 'text-violet-600' : 'text-black/70'}`} />}
                      {idx === 4 && <PiggyBank className={`h-5 w-5 ${active ? 'text-emerald-600' : 'text-black/70'}`} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-base md:text-lg font-semibold ${active ? 'text-black' : 'text-gray-900 group-hover:text-black'}`}>{item.title}</div>
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.p
                            key="sub"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-sm md:text-base text-gray-600 mt-1 pr-2"
                          >
                            {item.subtitle}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {/* progress bar (sleek, non-rainbow) */}
                      <div className="mt-3 h-2 w-full rounded-full bg-gradient-to-b from-black/5 to-black/10 border border-black/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full relative transition-[width] duration-150 ease-linear ${active ? 'bg-gradient-to-r from-violet-300 via-pink-200 via-yellow-200 via-cyan-200 to-blue-300' : 'bg-black/20'}`}
                          style={{ width: active ? `${progress}%` : selectedIndex > idx ? '100%' : '0%' }}
                        >
                          {active && (
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Right card (fixed, no animation) */}
          <div className="w-full md:w-1/2 lg:w-3/5 flex justify-center my-auto pt-0 pb-0 -mt-2 md:pl-52">
            <div className="relative max-w-xl w-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-500/25 via-amber-400/25 to-sky-500/25 blur-2xl opacity-50" />
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-fuchsia-500/50 via-amber-400/50 to-sky-500/50 shadow-xl">
                <div className="rounded-3xl bg-white/90 backdrop-blur-md p-2 sm:p-3">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={selectedIndex}
                      initial={{ opacity: 0, scale: 0.98, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="rounded-2xl overflow-hidden min-h-[320px] aspect-auto md:aspect-square"
                    >
                      <img
                        src={
                          selectedIndex === 0 ? '/IndustryModulesImages/1stImage.png' :
                          selectedIndex === 1 ? '/IndustryModulesImages/2ndImage.png' :
                          selectedIndex === 2 ? '/IndustryModulesImages/3rdImage.png' :
                          selectedIndex === 3 ? '/IndustryModulesImages/4thImage.png' :
                          '/IndustryModulesImages/5thImage.png'
                        }
                        alt={`Industry Module ${selectedIndex + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    {/* Bottom decorative image, larger and centered, not overlapping content */}
    {/* Gradient overlay at the bottom of the section, above the image */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '150px',
        zIndex: 2,
        pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
      }}
    />
    {/* Full-width background image at the bottom */}
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100vw',
      height: '300px',
      backgroundImage: "url('/AnimeStyleImages/GroundImage.png')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      zIndex: 1,
      pointerEvents: 'none',
    }} />
    
    {/* Overlayed text and button, positioned over the full-width image */}
    <div className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-auto flex items-center justify-center" style={{zIndex:2}}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
  <div className="flex flex-col md:flex-row items-center w-full justify-center gap-6 md:gap-24">
          <span
            className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold select-none whitespace-nowrap"
            style={{textShadow:'2px 2px 4px rgba(0,0,0,0.5)', fontSize: 'clamp(1.3rem, 8vw, 3.5rem)'}}>
            Incearca acum
          </span>
              <button
                className="ml-0 px-3 py-1.5 md:px-12 md:py-2 rounded-full border-2 border-black bg-white text-black font-semibold text-xs md:text-4xl transition-colors duration-200 hover:bg-black hover:text-white whitespace-nowrap md:h-12 md:min-w-[340px] md:max-w-[480px] w-full flex justify-center items-center"
            style={{
              minWidth: '64px',
              maxWidth: '120px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              fontSize: '0.95rem',
              lineHeight: '1.1',
              marginTop: 0,
              // Forțează lățimea pe desktop
              ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? { minWidth: 260, maxWidth: 340 } : {})
            }}>
            Get started
          </button>
        </div>
      </div>
    </div>

  </section>
  );
}
