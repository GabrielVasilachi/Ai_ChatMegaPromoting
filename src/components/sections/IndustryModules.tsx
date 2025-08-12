'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
      }, 140); // slower interval
    }, 1800); // delay before progress starts (increased)
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
    // Listen for HowItWorks line visibility via console.log
    const origLog = window.console.log;
    function customLog(...args: any[]) {
      if (args[0] === 'howitworks-svg-line-hidden') {
        setHideSvgLine(true);
      } else if (args[0] === 'howitworks-svg-line-visible') {
        setHideSvgLine(false);
      }
      origLog.apply(window.console, args);
    }
    window.console.log = customLog;
    return () => {
      window.console.log = origLog;
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
                className="mb-3 md:mb-10 md:mr-8 font-bold text-left md:mt-10"
                style={{minWidth:'max-content', color:'#111', display:'inline-block'}}
              >
                Otonom pentru orice
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
        </div>
        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center -mt-16">
          {/* Left menu as containers */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-0 md:ml-8">
            {menuItems.map((item: any, idx: number) => (
              <div
                key={item.id}
                className="bg-transparent rounded-xl cursor-pointer select-none"
                onClick={() => setSelectedIndex(idx)}
                tabIndex={0}
                role="button"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedIndex(idx); }}
                style={{ position: 'relative' }}
              >
                <div className={`relative w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-base md:text-lg shadow-sm ${selectedIndex === idx ? 'text-red-800' : 'text-black hover:text-blue-800'}`}
                  style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                >
                  {item.title}
                </div>
                {selectedIndex === idx ? (
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '72px' }}>
                    <div className="px-6 text-gray-700 text-base" style={{paddingTop: '0.25rem', paddingBottom: 0, marginTop: '0.25rem', lineHeight: '1.2'}}>
                      {item.subtitle}
                    </div>
                    <div style={{ flex: 1 }} />
                    <div className="w-full h-[2px] bg-yellow-300 relative overflow-hidden" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, margin: 0 }}>
                      <div
                        className="h-full bg-red-300 transition-all duration-100"
                        style={{
                          width: `${progress}%`,
                          transition: 'width 0.1s linear',
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[2px] bg-yellow-300 mt-3 relative overflow-hidden">
                    <div
                      className="h-full bg-yellow-300 transition-all duration-100"
                      style={{
                        width: selectedIndex > idx ? '100%' : '0%',
                        transition: 'none',
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Right card (fixed, no animation) */}
          <div className="w-full md:w-1/2 lg:w-3/5 flex justify-center my-auto pt-0 pb-0 -mt-2 md:pl-52">
            {selectedIndex === 0 ? (
              <div className="p-0 bg-transparent rounded-2xl max-w-xl w-full flex items-center justify-center min-h-[320px] aspect-auto md:aspect-square">
                <img 
                  src="/IndustryModulesImages/1stImage.png" 
                  alt="Industry Module 1"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            ) : selectedIndex === 1 ? (
              <div className="p-0 bg-transparent rounded-2xl max-w-xl w-full flex items-center justify-center min-h-[320px] aspect-auto md:aspect-square">
                <img 
                  src="/IndustryModulesImages/2ndImage.png" 
                  alt="Industry Module 2"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            ) : selectedIndex === 2 ? (
              <div className="p-0 bg-transparent rounded-2xl max-w-xl w-full flex items-center justify-center min-h-[320px] aspect-auto md:aspect-square">
                <img 
                  src="/IndustryModulesImages/3rdImage.png" 
                  alt="Industry Module 3"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            ) : selectedIndex === 3 ? (
              <div className="p-0 bg-transparent rounded-2xl max-w-xl w-full flex items-center justify-center min-h-[320px] aspect-auto md:aspect-square">
                <img 
                  src="/IndustryModulesImages/4thImage.png" 
                  alt="Industry Module 4"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            ) : selectedIndex === 4 ? (
              <div className="p-0 bg-transparent rounded-2xl max-w-xl w-full flex items-center justify-center min-h-[320px] aspect-auto md:aspect-square">
                <img 
                  src="/IndustryModulesImages/5thImage.png" 
                  alt="Industry Module 5"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            ) : (
              <div className="p-8 bg-transparent rounded-2xl max-w-xl w-full aspect-auto md:aspect-square flex items-center justify-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-black">{menuItems[selectedIndex].title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-base md:text-lg">
                    {menuItems[selectedIndex].subtitle}
                  </p>
                </div>
              </div>
            )}
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
    <div className="w-full flex justify-center items-end" style={{position:'absolute', left:0, bottom:0, zIndex:1, marginBottom:'0px'}}>
      <div 
        className="relative w-full flex justify-center items-end"
        style={{
          maxWidth: '1200px', 
          width: '100%',
          marginLeft: '16px',
          marginRight: '16px',
        }}
      >
        <img
          src="/AnimeStyleImages/GroundImage.png"
          alt="Decorative Anime Ground"
          className="w-full h-auto object-contain mx-auto"
          style={{
            maxWidth: '1200px',
            maxHeight: '300px',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />
        {/* Overlayed text and button, custom layout */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto" style={{zIndex:2}}>
          <div className="flex flex-col items-start w-full" style={{paddingLeft:'1.5rem', paddingTop:'3.5rem', position:'relative'}}>
            {/* Responsive: Remove margin on md and up */}
            <style>{`
              @media (min-width: 768px) {
                #industry-modules-section .bottom-img-container,
                #industry-modules-section .bottom-img-container img {
                  margin-left: 0 !important;
                  margin-right: 0 !important;
                }
              }
            `}</style>
            <div className="flex flex-row items-center w-full justify-between">
              <div className="flex flex-col md:flex-row items-center w-full justify-between">
                <span
                  className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold select-none whitespace-nowrap"
                  style={{textShadow:'none', fontSize: 'clamp(1.3rem, 8vw, 3.5rem)'}}>
                  Incearca acum
                </span>
                <button
                  className="mt-6 md:mt-0 ml-0 md:ml-3 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border-2 border-black bg-white text-black font-semibold text-xs md:text-base transition-colors duration-200 hover:bg-black hover:text-white mr-2 md:mr-8 whitespace-nowrap"
                  style={{minWidth:'64px', maxWidth:'120px', boxShadow:'none', fontSize:'0.95rem', lineHeight:'1.1'}}>
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
