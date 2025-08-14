'use client';

import { useRef, useState, useEffect } from 'react';

export default function DemoSectionMobile() {
  const ref = useRef(null);
  const mobilePhoneAnchorRef = useRef<HTMLDivElement | null>(null);
  const [shake, setShake] = useState(false);
  const [mobilePhoneTop, setMobilePhoneTop] = useState<number | null>(null);

  // Animation state for overlays
  const [showBlack, setShowBlack] = useState(true);
  const [blackIn, setBlackIn] = useState(false);
  const [whiteUp, setWhiteUp] = useState(false);

  // Intersection observer to trigger animation
  useEffect(() => {
    const section = ref.current as HTMLElement | null;
    if (!section) return;
    let timeout1: NodeJS.Timeout;
    
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBlackIn(true);
          timeout1 = setTimeout(() => {
            setShowBlack(false);
            setWhiteUp(true);
          }, 3000);
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(section);
    
    return () => {
      observer.disconnect();
      clearTimeout(timeout1);
    };
  }, []);

  // Compute top position for the mobile iPhone container
  useEffect(() => {
    const computeTop = () => {
      const sectionEl = ref.current as HTMLElement | null;
      const anchorEl = mobilePhoneAnchorRef.current as HTMLElement | null;
      if (!sectionEl || !anchorEl) return;
      
      const top = anchorEl.offsetTop + 24; // 24px spacing
      setMobilePhoneTop(top);
    };
    
    computeTop();
    window.addEventListener('resize', computeTop);
    window.addEventListener('orientationchange', computeTop);
    
    return () => {
      window.removeEventListener('resize', computeTop);
      window.removeEventListener('orientationchange', computeTop);
    };
  }, []);

  return (
    <section 
      ref={ref} 
      className="min-h-[150vh] bg-black py-0 flex items-center justify-center overflow-hidden relative"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 -mt-[30rem]">
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

            {/* Mobile anchor */}
            <div ref={mobilePhoneAnchorRef} className="h-0" />
            
            {/* Mobile phone preview */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center" 
              style={{ width: '120vw', marginLeft: 'auto', top: mobilePhoneTop !== null ? `${mobilePhoneTop}px` : 'calc(100% + 700px)' }}
            >
              <img
                src="/DeveloperSection/IphoneImage.png"
                alt="Demo Developer Section"
                className="w-full h-auto block rounded-2xl mx-auto"
                style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)', overflow: 'hidden' }}
              />
              
              {/* Black overlay */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '64%',
                  height: '13%',
                  background: '#000',
                  borderRadius: '1.1rem',
                  pointerEvents: 'auto',
                  display: showBlack ? 'flex' : 'none',
                  flexDirection: 'column',
                  padding: 'clamp(12px, 4vw, 18px)',
                  top: blackIn ? '18%' : '-20%',
                  opacity: blackIn ? 1 : 0,
                  transition: 'top 0.7s cubic-bezier(.4,1.2,.4,1), opacity 0.5s',
                  zIndex: 2,
                }}
              />
              
              {/* White overlay with form */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: whiteUp ? '18%' : '35%',
                  width: '64%',
                  height: '76%',
                  background: '#FFFFFF',
                  borderRadius: 'clamp(14px, 4.5vw, 18px)',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 'clamp(12px, 4vw, 18px)',
                  transition: 'top 0.7s cubic-bezier(.4,1.2,.4,1)',
                  zIndex: 1,
                }}
              >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(8px, 3vw, 12px)' }}>
                  <div style={{ color: '#1C1C1E', fontWeight: 600, fontSize: 'clamp(16px, 5vw, 20px)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                    Conectare Demo AI
                  </div>
                  <div style={{ color: '#8E8E93', fontSize: 'clamp(11px, 3.5vw, 14px)', marginTop: 'clamp(4px, 1.5vw, 8px)' }}>Completează datele pentru test</div>
                </div>

                {/* Form fields */}
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 4vw, 16px)', marginTop: 'clamp(4px, 2vw, 10px)', alignItems: 'center', justifyContent: 'center' }}
                  className={shake ? 'shake-anim' : ''}
                >
                  {/* Shake animation styles */}
                  <style>{`
                    .shake-anim {
                      animation: shake 1s cubic-bezier(.36,.07,.19,.97) both;
                    }
                    @keyframes shake {
                      10%, 90% { transform: translateX(-1px); }
                      20%, 80% { transform: translateX(2px); }
                      30%, 50%, 70% { transform: translateX(-4px); }
                      40%, 60% { transform: translateX(4px); }
                    }
                  `}</style>
                  
                  {/* Phone field */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F2F2F7', borderRadius: 'clamp(12px, 4vw, 16px)', padding: 'clamp(10px, 3.5vw, 14px) clamp(12px, 4.5vw, 18px)', boxShadow: '0 1px 0 rgba(0,0,0,0.04)', justifyContent: 'center', width: '100%' }}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto', width: 'clamp(16px, 6vw, 20px)', height: 'clamp(16px, 6vw, 20px)' }}>
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.85 21 3 13.15 3 3c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#8E8E93"/>
                    </svg>
                    <input
                      type="tel"
                      placeholder="+373 XXX XXX XX"
                      className="flex-1 bg-transparent outline-none placeholder-gray-500"
                      style={{ color: '#1C1C1E', fontSize: 'clamp(14px, 4.5vw, 18px)' }}
                    />
                  </label>

                  {/* Company field */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F2F2F7', borderRadius: 'clamp(12px, 4vw, 16px)', padding: 'clamp(10px, 3.5vw, 14px) clamp(12px, 4.5vw, 18px)', boxShadow: '0 1px 0 rgba(0,0,0,0.04)', justifyContent: 'center', width: '100%' }}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: '0 0 auto', width: 'clamp(16px, 6vw, 20px)', height: 'clamp(16px, 6vw, 20px)' }}>
                      <path d="M4 21h16v-2H4v2zm2-4h12V5a1 1 0 00-1-1H7a1 1 0 00-1 1v12zm2-8h2V7H8v2zm0 4h2v-2H8v2zm4-4h2V7h-2v2zm0 4h2v-2h-2v2z" fill="#8E8E93"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Numele companiei"
                      className="flex-1 bg-transparent outline-none placeholder-gray-500"
                      style={{ color: '#1C1C1E', fontSize: 'clamp(14px, 4.5vw, 18px)' }}
                    />
                  </label>
                </div>

                {/* Call button */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'clamp(40px, 10vw, 56px) 0 clamp(14px, 5vw, 18px) 0' }}>
                  <div
                    style={{ width: 'clamp(56px, 16vw, 80px)', height: 'clamp(56px, 16vw, 80px)', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#15803d')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#22c55e')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(24px, 8vw, 32px)', height: 'clamp(24px, 8vw, 32px)' }}>
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.85 21 3 13.15 3 3c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#fff"/>
                    </svg>
                  </div>
                </div>
                
                {/* Spacer */}
                <div style={{ flex: 1 }} />
              </div>
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
