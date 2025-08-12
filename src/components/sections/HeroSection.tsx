'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

/**
 * Minimal Hero: only left-aligned badge, title, and subtitle.
 * - No CTAs, no right-side content, no extra elements
 * - Subtle background grid + soft spotlight that follows cursor
 */
export default function HeroSectionLeftClean() {
  // Track if the text is fully typed
  const [isTextFullyTyped, setIsTextFullyTyped] = useState(false);
  const ref = useRef<HTMLElement>(null)

  // Data for each right container
  const rightBoxData = [
    {
      name: 'Bot Alice',
      text1: 'Hello',
      response1: 'Hi! How can I help you today?',
      text2: 'Info',
      response2: 'I am your virtual assistant.'
    },
    {
      name: 'Bot Bob',
      text1: 'Whats up',
      response1: 'All good! Need support?',
      text2: 'Help',
      response2: 'I can answer your questions.'
    },
    {
      name: 'Bot Carol',
      text1: 'How are you?',
      response1: 'I am always online!',
      text2: 'Status',
      response2: 'Ready to assist.'
    },
    {
      name: 'Bot Dave',
      text1: 'Goodbye!',
      response1: 'See you soon!',
      text2: 'Feedback',
      response2: 'Let us know how we did.'
    },
  ];
  const [selectedBox, setSelectedBox] = useState(0)
  const [showFakeMouse, setShowFakeMouse] = useState(true)
  const [hideOnScroll, setHideOnScroll] = useState(false);
  // Ascunde mouse-ul fake și bubble-ul la scroll, reapare după 400ms fără scroll
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function onScroll() {
      setHideOnScroll(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setHideOnScroll(false), 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, []);
  const [showRealMouseImage, setShowRealMouseImage] = useState(false)
  const [realMousePos, setRealMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 400, y: 180 })
  const [isClicking, setIsClicking] = useState(false)
  const fakeMouseRef = useRef<HTMLDivElement>(null)
  const rightBoxRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
  const inputRef = useRef<HTMLInputElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const chatAreaRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  // Store sent messages per bot
  const [sentMessages, setSentMessages] = useState<string[][]>([[], [], [], []]);
  // For simulating typing per bot
  const [inputValues, setInputValues] = useState<string[]>(['', '', '', '']);
  const randomMessages = [
    'Bună, am o întrebare!',
    'Cum pot obține suport?',
    'Care este programul?',
    'Mulțumesc pentru ajutor!',
    'Salut, am nevoie de informații.'
  ];

  // --- MouseResponses logic (now after all state/refs are declared) ---
  // Bubble texts for different areas
  const mouseResponsesLeft = [
    'Raspund la Mesaje...',
    'Citesc Conversatii...',
    'Analizez Raspunsurile...',
    'Verific Starea Clientului...'
  ];
  const mouseResponseInput = 'Scriu Mesaj Clientului';
  const mouseResponseSend = 'Trimit mesajul';
  const [mouseResponseIdx, setMouseResponseIdx] = useState(0);
  const [isOverLeftContainer, setIsOverLeftContainer] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);
  const [isOverSend, setIsOverSend] = useState(false);
  // Bubble text changes random la fiecare 5 secunde doar pentru left container
  useEffect(() => {
    if (!showFakeMouse) return;
    if (!isOverLeftContainer) return;
    const interval = setInterval(() => {
      setMouseResponseIdx(() => Math.floor(Math.random() * mouseResponsesLeft.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [showFakeMouse, isOverLeftContainer, mouseResponsesLeft.length]);

  // Când mouse-ul fake intră peste left container, alege random un mesaj
  useEffect(() => {
    if (isOverLeftContainer) {
      setMouseResponseIdx(Math.floor(Math.random() * mouseResponsesLeft.length));
    }
  }, [isOverLeftContainer, mouseResponsesLeft.length]);

  // Detect if fake mouse is over input, send button, or left container
  useEffect(() => {
    if (!showFakeMouse) return;
    let overInput = false;
    let overSend = false;
    let overLeft = false;
    // Check input
    const input = inputRef.current;
    if (input) {
      const rect = input.getBoundingClientRect();
      overInput = mousePos.x >= rect.left && mousePos.x <= rect.right && mousePos.y >= rect.top && mousePos.y <= rect.bottom;
    }
    // Check send button
    const btn = sendBtnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      overSend = mousePos.x >= rect.left && mousePos.x <= rect.right && mousePos.y >= rect.top && mousePos.y <= rect.bottom;
    }
    // Check left container (first left box container)
    const leftBox = rightBoxRefs[0].current?.parentElement?.parentElement; // .flex-col.w-full.h-[300px] -> .relative (left container)
    if (leftBox) {
      const rect = leftBox.getBoundingClientRect();
      overLeft = mousePos.x >= rect.left && mousePos.x <= rect.right && mousePos.y >= rect.top && mousePos.y <= rect.bottom;
    }
    if (overInput !== isOverInput) setIsOverInput(overInput);
    if (overSend !== isOverSend) setIsOverSend(overSend);
    if (overLeft !== isOverLeftContainer) setIsOverLeftContainer(overLeft);
  }, [mousePos.x, mousePos.y, showFakeMouse]);

  // Smoothly interpolate bubble position to follow mousePos
  const [bubblePos, setBubblePos] = useState<{x:number,y:number}>({x: mousePos.x, y: mousePos.y});
  useEffect(() => {
    let animationFrame: number;
    function animate() {
      setBubblePos(prev => {
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        return {
          x: lerp(prev.x, mousePos.x, 0.18),
          y: lerp(prev.y, mousePos.y, 0.18),
        };
      });
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos.x, mousePos.y]);

  const MouseResponses = ({ text }: { text: string }) => {
    if (!text) return null;
    return (
      <div
        style={{
          position: 'fixed',
          left: bubblePos.x + 18,
          top: bubblePos.y - 30,
          zIndex: 10000,
          pointerEvents: 'none',
          minWidth: 60,
          maxWidth: 220,
          transition: 'none',
        }}
        className="bg-white rounded-xl rounded-l-md shadow px-3 py-2 text-sm text-gray-800 border border-gray-200"
      >
        {text}
      </div>
    );
  };

  // Functie separata pentru fake mouse typing & send
  function fakeMouseTypeAndSend(selectedBoxIdx: number, callback?: () => void) {
    const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    console.log('Starting to type message:', message, 'for bot index:', selectedBoxIdx);
    let i = 0;
    
    function typeChar() {
      setInputValues(vals => {
        const newVals = [...vals];
        newVals[selectedBoxIdx] = message.slice(0, i + 1);
        console.log('Typing char:', message[i], 'current text:', newVals[selectedBoxIdx]);
        return newVals;
      });
      i++;
      if (i < message.length) {
        setTimeout(typeChar, 60 + Math.random() * 40);
      } else {
        console.log('Finished typing, moving to send button');
        // După ce textul a fost scris complet, mută mouse-ul la butonul Trimite
        setTimeout(() => {
          const btn = sendBtnRef.current;
          if (btn) {
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            setMousePos({ x, y });
            
            // Stă 2 secunde pe butonul Trimite înainte de a face click
            setTimeout(() => {
              setIsClicking(true);
              setTimeout(() => {
                setIsClicking(false);
                // Trimite mesajul
                setSentMessages((msgs) => {
                  const newMsgs = msgs.map(arr => [...arr]);
                  newMsgs[selectedBoxIdx].push(message);
                  return newMsgs;
                });
                setInputValues(vals => {
                  const newVals = [...vals];
                  newVals[selectedBoxIdx] = '';
                  return newVals;
                });
                // Auto-scroll to bottom
                setTimeout(() => {
                  const chatArea = chatAreaRefs[selectedBoxIdx].current;
                  if (chatArea) {
                    chatArea.scrollTop = chatArea.scrollHeight;
                  }
                }, 50);
                // Apelează callback-ul dacă există
                if (callback) callback();
              }, 180);
            }, 2000); // 2 secunde pe buton înainte de click
          }
        }, 500);
      }
    }
    typeChar();
  }

  // Helper: detectează dacă mouse-ul fake este peste input
  // function isMouseOverInput() {
  //   const input = inputRef.current;
  //   if (!input) return false;
  //   const rect = input.getBoundingClientRect();
  //   return (
  //     mousePos.x >= rect.left && mousePos.x <= rect.right &&
  //     mousePos.y >= rect.top && mousePos.y <= rect.bottom
  //   );
  // }


  // Random movement for fake mouse, always active when showFakeMouse is true
  useEffect(() => {
    if (!showFakeMouse) return;
    let timeout: NodeJS.Timeout;
    let running = true;
    // Secvența fixă: indexii botilor și acțiuni speciale
    // 0: Alice, 2: Carol, 1: Bob, 'input', 'send', 3: Dave, 'input', 'send', 1: Bob, 0: Alice, 'input', 'send', 3: Dave, 2: Carol, 'input', 'send'
    const sequence = [0, 2, 1, 'input', 'send', 3, 'input', 'send', 1, 0, 'input', 'send', 3, 2, 'input', 'send'];
    let step = 0;

    function nextStep() {
      if (!running) return;
      const action = sequence[step];
      if (typeof action === 'number') {
        // Select bot
        const boxIdx = action;
        const btn = rightBoxRefs[boxIdx].current;
        if (btn) {
          const rect = btn.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          setMousePos({ x, y });
          setTimeout(() => {
            setIsClicking(true);
            setTimeout(() => {
              setIsClicking(false);
              setSelectedBox(boxIdx);
              step++;
              timeout = setTimeout(nextStep, 900);
            }, 180);
          }, 500);
        } else {
          step++;
          timeout = setTimeout(nextStep, 500);
        }
      } else if (action === 'input') {
        // Move to input - folosește bot-ul din secvența anterioară
        const prevAction = sequence[step - 1];
        const currentBotIndex = typeof prevAction === 'number' ? prevAction : selectedBox;
        const input = inputRef.current;
        if (input) {
          const rect = input.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          setMousePos({ x, y });
          setTimeout(() => {
            setIsClicking(true);
            setTimeout(() => {
              setIsClicking(false);
              // Apelează fakeMouseTypeAndSend cu bot-ul corect
              setTimeout(() => {
                fakeMouseTypeAndSend(currentBotIndex, () => {
                  step++;
                  if (step >= sequence.length) step = 0;
                  timeout = setTimeout(nextStep, 1500);
                });
              }, 300);
            }, 180);
          }, 500);
        } else {
          step++;
          timeout = setTimeout(nextStep, 500);
        }
      } else if (action === 'send') {
        // Skip - acum se face totul în 'input'
        step++;
        if (step >= sequence.length) step = 0;
        timeout = setTimeout(nextStep, 500);
      }
    }
    nextStep();
    return () => {
      running = false;
      clearTimeout(timeout);
    };
  }, [showFakeMouse]);

  // Dezactivat: Monitorizarea hover peste input - acum totul se face prin secvență
  // useEffect(() => {
  //   if (!showFakeMouse) return;
  //   if (typeof window === 'undefined') return;
  //   // Helper: detectează dacă mouse-ul fake este peste input
  //   function isMouseOverInput() {
  //     const input = inputRef.current;
  //     if (!input) return false;
  //     const rect = input.getBoundingClientRect();
  //     return (
  //       mousePos.x >= rect.left && mousePos.x <= rect.right &&
  //       mousePos.y >= rect.top && mousePos.y <= rect.bottom
  //     );
  //   }
  //   if (isMouseOverInput() && inputValues[selectedBox] === '') {
  //     const timer = setTimeout(() => {
  //       fakeMouseTypeAndSend(selectedBox);
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showFakeMouse, mousePos.x, mousePos.y, selectedBox, inputValues]);

  // Remove per-element mouse enter/leave logic, only use the big container logic

  // Show only the image mouse and hide everything else when hovering big container (including all nested elements)
  const [isInsideBigContainer, setIsInsideBigContainer] = useState(false);
  const handleBigContainerEnter = () => {
    setIsInsideBigContainer(true);
    setShowRealMouseImage(true);
    setShowFakeMouse(false);
  };
  const handleBigContainerLeave = () => {
    setIsInsideBigContainer(false);
    setShowRealMouseImage(false);
    setShowFakeMouse(true);
  };
  const handleBigContainerMove = (e: React.MouseEvent<any>) => {
    setRealMousePos({ x: e.clientX, y: e.clientY });
  };



  return (
    <section
      ref={ref}
      className="relative min-h-[78vh] flex items-center overflow-hidden px-6 md:px-10 py-20 md:py-28"
    >
      {/* Fake mouse image absolutely positioned at section level */}
      {showFakeMouse && !isInsideBigContainer && !hideOnScroll && (
        <>
          <img
            src="/HeroSection/MouseForRightContainer.png"
            alt="Mouse"
            style={{
              position: 'fixed',
              left: mousePos.x - 30,
              top: mousePos.y - 0,
              width: 22,
              height: 22,
              pointerEvents: 'none',
              zIndex: 9999,
              transition: 'left 0.5s cubic-bezier(0.4,0,0.2,1), top 0.5s cubic-bezier(0.4,0,0.2,1)',
              filter: isClicking ? 'brightness(0.8)' : 'none',
            }}
          />
          {/* Bubble for fake mouse, context-aware */}
          <MouseResponses 
            text={isOverSend ? mouseResponseSend : isOverInput ? mouseResponseInput : isOverLeftContainer ? mouseResponsesLeft[mouseResponseIdx] : ''}
          />
        </>
      )}
      {/* Real mouse image when hovering right container */}
      {showRealMouseImage && (
        <img
          src="/HeroSection/MouseForRightContainer.png"
          alt="Mouse"
          style={{
            position: 'fixed',
            left: realMousePos.x - 11,
            top: realMousePos.y - 11,
            width: 22,
            height: 22,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}
      {/* Background Video (section only) */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          className="w-full h-full object-cover"
          src={"/HeroSection/BackgroundVideoHeroSection.mp4"}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* White overlay */}
        <div className="absolute inset-0 w-full h-full bg-white/50 pointer-events-none" />
        {/* Bottom SVG background image */}
        <img
          src="/HeroSection/BottomBackgroundImageHeroSection.svg"
          alt="Bottom background"
          className="absolute left-0 bottom-0 w-full pointer-events-none select-none drop-shadow-4xl"
          style={{ zIndex: 1 }}
          draggable="false"
        />
      </div>
      {/* CONTENT (left only) */}
      <div className="relative mx-auto w-full max-w-7xl z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10">
          <div className="md:col-span-6 lg:col-span-5 xl:col-span-5">
            {/* Small container above title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 border border-black/10 bg-white/70 px-3 py-1.5 backdrop-blur-md shadow-sm rounded-md"
            >
              <span className="text-[11px] font-medium tracking-wide text-gray-700">Noutate</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <span className="text-[11px] text-gray-600">Agent virtual 24/7 pentru companii</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-left text-5xl sm:text-6xl md:text-7xl leading-[1.06] font-extrabold tracking-tight text-gray-900"
            >
              Otonom AI pentru companii
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-xl text-left text-base md:text-lg text-gray-600"
            >
              Un agent virtual care răspunde instant pe web, WhatsApp, Facebook și email. Reduce costurile de suport și crește conversiile — păstrând vocea brandului tău.
            </motion.p>

            {/* Tiny extras to fill a bit of space (left only) */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs text-gray-700">Fără cod</span>
              <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs text-gray-700">Multichannel</span>
              <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs text-gray-700">GDPR‑ready</span>
            </div>
            {/* Auth buttons */}
            <div className="mt-5 flex gap-3">
              <button
                className="px-5 py-2 rounded-full border border-black text-black font-semibold bg-white hover:bg-black hover:text-white"
                type="button"
              >
                Sign In
              </button>
              <button
                className="px-5 py-2 rounded-full border border-black bg-black text-white font-semibold hover:bg-white hover:text-black"
                type="button"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Right side container */}
          <div className="hidden md:flex md:col-span-6 lg:col-span-7 items-center justify-end">
            <div
              className={`w-[700px] h-[400px] bg-white rounded-2xl border border-gray-400 shadow-lg flex items-center justify-center ml-auto translate-x-[100px] relative ${isInsideBigContainer ? 'cursor-none' : ''}`}
              onMouseEnter={handleBigContainerEnter}
              onMouseLeave={handleBigContainerLeave}
              onMouseMove={handleBigContainerMove}
            >
              {/* MacBook-style window controls */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 border border-red-300 shadow-sm"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-300 shadow-sm"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 border border-green-300 shadow-sm"></span>
              </div>
              {/* Nested container */}
              <div className="w-[698px] h-[363px] bg-white rounded-2xl border border-gray-300 absolute left-0 top-[35px] flex flex-row items-center justify-between overflow-hidden">
                {/* Left small container */}
                <div
                  className={`w-[200px] h-[363px] bg-white rounded-l-2xl rounded-tr-none rounded-br-none border border-gray-200 flex flex-col items-stretch justify-center ml-0 relative ${isInsideBigContainer ? 'cursor-none' : ''}`}
                  onMouseEnter={e => { handleBigContainerEnter(); setIsOverLeftContainer(true); }}
                  onMouseLeave={e => { handleBigContainerLeave(); setIsOverLeftContainer(false); }}
                  onMouseMove={handleBigContainerMove}
                >
                  <div className="absolute top-3 left-3 flex gap-1"></div>
                  {/* Four stacked containers */}
                  <div className="flex flex-col w-full h-[300px] absolute left-0 top-0">
                    <div
                      className={`w-full h-[70px] border border-gray-200 flex items-center ${selectedBox === 0 ? 'bg-gray-100' : 'bg-white'} transition ${isInsideBigContainer ? 'cursor-none' : ''}`}
                      onClick={() => setSelectedBox(0)}
                      style={{cursor: isInsideBigContainer ? 'none' : 'pointer'}}
                      ref={rightBoxRefs[0]}
                    >
                      <span style={{width:32, height:32, borderRadius:'50%', background:'#e5e7eb', display:'inline-block', marginLeft:12, marginRight:16}}></span>
                      <span style={{fontSize:15, color:'#374151', fontWeight:500}}>Bot Alice</span>
                    </div>
                    <div
                      className={`w-full h-[70px] border border-gray-200 flex items-center ${selectedBox === 1 ? 'bg-gray-100' : 'bg-white'} transition ${isInsideBigContainer ? 'cursor-none' : ''}`}
                      onClick={() => setSelectedBox(1)}
                      style={{cursor: isInsideBigContainer ? 'none' : 'pointer'}}
                      ref={rightBoxRefs[1]}
                    >
                      <span style={{width:32, height:32, borderRadius:'50%', background:'#e5e7eb', display:'inline-block', marginLeft:12, marginRight:16}}></span>
                      <span style={{fontSize:15, color:'#374151', fontWeight:500}}>Bot Bob</span>
                    </div>
                    <div
                      className={`w-full h-[70px] border border-gray-200 flex items-center ${selectedBox === 2 ? 'bg-gray-100' : 'bg-white'} transition ${isInsideBigContainer ? 'cursor-none' : ''}`}
                      onClick={() => setSelectedBox(2)}
                      style={{cursor: isInsideBigContainer ? 'none' : 'pointer'}}
                      ref={rightBoxRefs[2]}
                    >
                      <span style={{width:32, height:32, borderRadius:'50%', background:'#e5e7eb', display:'inline-block', marginLeft:12, marginRight:16}}></span>
                      <span style={{fontSize:15, color:'#374151', fontWeight:500}}>Bot Carol</span>
                    </div>
                    <div
                      className={`w-full h-[70px] border border-gray-200 flex items-center ${selectedBox === 3 ? 'bg-gray-100' : 'bg-white'} transition ${isInsideBigContainer ? 'cursor-none' : ''}`}
                      onClick={() => setSelectedBox(3)}
                      style={{cursor: isInsideBigContainer ? 'none' : 'pointer'}}
                      ref={rightBoxRefs[3]}
                    >
                      <span style={{width:32, height:32, borderRadius:'50%', background:'#e5e7eb', display:'inline-block', marginLeft:12, marginRight:16}}></span>
                      <span style={{fontSize:15, color:'#374151', fontWeight:500}}>Bot Dave</span>
                    </div>
                  </div>
                </div>
                {/* Right main container */}
                <div
                  className={`w-[500px] h-[363px] bg-white rounded-r-2xl rounded-tl-none rounded-bl-none border border-gray-200 flex flex-col mr-0 relative overflow-hidden ${isInsideBigContainer ? 'cursor-none' : ''}`}
                  onMouseEnter={handleBigContainerEnter}
                  onMouseLeave={handleBigContainerLeave}
                  onMouseMove={handleBigContainerMove}
                >
                  {/* Name at top left - FIXED */}
                  <div className="absolute top-3 left-3 text-lg font-bold text-gray-700 select-none z-10 bg-white px-2">
                    {rightBoxData[selectedBox].name}
                  </div>
                  
                  {/* Scrollable content area */}
                  <div 
                    ref={chatAreaRefs[selectedBox]}
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      paddingTop: '50px', // Space for fixed name
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                      paddingBottom: '80px', // Space for input area
                    }}
                    className="flex flex-col gap-4"
                  >
                    {/* Static content */}
                    <div>
                      <div className="text-base font-semibold text-gray-800 mb-1">{rightBoxData[selectedBox].text1}</div>
                      <div className="text-gray-600 text-sm bg-gray-100 rounded px-3 py-2 w-fit">{rightBoxData[selectedBox].response1}</div>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-800 mb-1">{rightBoxData[selectedBox].text2}</div>
                      <div className="text-gray-600 text-sm bg-gray-100 rounded px-3 py-2 w-fit">{rightBoxData[selectedBox].response2}</div>
                    </div>
                    
                    {/* Chat messages */}
                    {sentMessages[selectedBox] && sentMessages[selectedBox].map((msg, idx) => (
                      <div key={idx} className="bg-blue-100 text-blue-900 px-3 py-2 rounded-lg w-fit self-end text-sm shadow-sm">{msg}</div>
                    ))}
                  </div>
                  {/* Input container mic jos */}
                  <div 
                    style={{
                      position: 'absolute', 
                      left: 0, 
                      bottom: 0, 
                      width: '100%', 
                      padding: '1rem', 
                      background: 'rgba(255,255,255,0.95)', 
                      borderTop: '1px solid #e5e7eb', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem'
                    }}
                    className={isInsideBigContainer ? 'cursor-none' : ''}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Scrie un mesaj..."
                      value={inputValues[selectedBox]}
                      onChange={e => {
                        const val = e.target.value;
                        setInputValues(vals => {
                          const newVals = [...vals];
                          newVals[selectedBox] = val;
                          return newVals;
                        });
                      }}
                      style={{
                        flex: 1, 
                        border: '1px solid #d1d5db', 
                        borderRadius: 8, 
                        padding: '0.5rem 0.75rem', 
                        fontSize: 15, 
                        outline: 'none'
                      }} 
                      className={isInsideBigContainer ? 'cursor-none' : ''}
                      onMouseEnter={() => setIsOverInput(true)}
                      onMouseLeave={() => setIsOverInput(false)}
                    />
                    <button
                      ref={sendBtnRef}
                      style={{
                        background: '#2563eb', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: 8, 
                        padding: '0.5rem 1rem', 
                        fontWeight: 500, 
                        fontSize: 15
                      }}
                      className={isInsideBigContainer ? 'cursor-none' : ''}
                      onClick={() => {
                        const val = inputValues[selectedBox];
                        if (val.trim()) {
                          setSentMessages(msgs => {
                            const newMsgs = msgs.map(arr => [...arr]);
                            newMsgs[selectedBox].push(val);
                            return newMsgs;
                          });
                          setInputValues(vals => {
                            const newVals = [...vals];
                            newVals[selectedBox] = '';
                            return newVals;
                          });
                          // Auto-scroll to bottom after message is added
                          setTimeout(() => {
                            const chatArea = chatAreaRefs[selectedBox].current;
                            if (chatArea) {
                              chatArea.scrollTop = chatArea.scrollHeight;
                            }
                          }, 50);
                        }
                      }}
                      onMouseEnter={() => setIsOverSend(true)}
                      onMouseLeave={() => setIsOverSend(false)}
                    >
                      Trimite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
