'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';


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

  return (
    <section id="industry-modules-section" className="min-h-[120vh] pt-1 pb-[320px] md:pt-2 md:pb-[360px] flex items-center overflow-hidden relative">
      {/* Vertical dashed line on the left (full height, centered, semi-transparent) */}
      <div className="hidden md:block absolute z-20 w-full h-full pointer-events-none" style={{top:0, left:0, height:'100%'}}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative h-full" style={{height:'100%'}}>
          <div className="flex justify-center items-start w-full h-full" style={{position:'relative', height:'100%'}}>
            <div style={{
              position: 'absolute',
              left: '-30px',
              top: 0,
              height: '100%',
              borderLeft: '3px dashed #b3b3b3',
              opacity: 0.6,
              zIndex: 20,
              minHeight: '100%',
            }} />
          </div>
        </div>
      </div>
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
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start justify-center mt-8">
          {/* Left menu as containers */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col gap-4">
            {menuItems.map((item: any, idx: number) => (
              <div key={item.id}>
                <div className="relative">
                  <button
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-6 py-5 rounded-xl transition-all duration-200 font-semibold text-lg md:text-xl shadow-sm ${selectedIndex === idx ? 'text-red-800' : 'text-black hover:text-blue-800'}`}
                    style={{ outline: 'none', cursor: 'pointer', border: 'none', boxShadow: 'none' }}
                  >
                    {item.title}
                  </button>
                  {/* Progress bar replaces the yellow divider bar, appears under title or subtitle as before */}
                  {selectedIndex === idx ? (
                    <>
                      <div className="px-6 text-gray-700 text-base" style={{paddingTop: 0, paddingBottom: 0, marginTop: '-1rem'}}>
                        {item.subtitle}
                      </div>
                      <div className="w-full h-[2px] bg-yellow-300 mb-2 mt-6 relative overflow-hidden">
                        <div
                          className="h-full bg-red-300 transition-all duration-100"
                          style={{
                            width: `${progress}%`,
                            transition: 'width 0.1s linear',
                          }}
                        ></div>
                      </div>
                    </>
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
              </div>
            ))}
          </div>
          {/* Right card (fixed, no animation) */}
          <div className="w-full md:w-1/2 lg:w-3/5 flex justify-center my-auto py-8">
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
              <span
                className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold select-none"
                style={{textShadow:'none', fontSize: 'clamp(1.3rem, 8vw, 3.5rem)'}}>
                Incearca acum
              </span>
              <button
                className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border-2 border-black bg-white text-black font-semibold text-sm md:text-base transition-colors duration-200 hover:bg-black hover:text-white mr-8"
                style={{minWidth:'90px', boxShadow:'none'}}>
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
