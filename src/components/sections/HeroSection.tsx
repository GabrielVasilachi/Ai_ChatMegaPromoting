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

  // Data for each right container with full conversation flows
  const rightBoxData = [
    {
      name: 'Alex M.',
      conversations: [
        { sender: 'Alex', message: 'Bună, aș vrea mai multe detalii despre produse.' },
        { sender: 'Bot', message: 'Desigur, Alex! Despre ce tip de produse doriți mai multe informații? Avem telefoane, laptopuri și accesorii.' },
        { sender: 'Alex', message: 'Mă interesează în special telefoanele.' },
        { sender: 'Bot', message: 'Perfect, telefoanele noastre sunt modele Apple, inclusiv cele mai recente versiuni de iPhone. Doriți să știți prețurile, specificațiile sau disponibilitatea în stoc?' },
        { sender: 'Alex', message: 'În primul rând, prețurile.' },
        { sender: 'Bot', message: 'Prețurile pentru iPhone variază între 12.000 și 25.000 MDL, în funcție de model și capacitatea de stocare. Vreți să vă dau exemple concrete pentru modelele cele mai populare?' },
        { sender: 'Alex', message: 'Da, te rog.' },
        { sender: 'Bot', message: 'De exemplu, iPhone 15 are un preț de la 19.500 MDL pentru varianta de 128 GB. Modelul Pro Max pornește de la 24.500 MDL.' },
        { sender: 'Alex', message: 'Și ce garanție oferă produsele?' },
        { sender: 'Bot', message: 'Toate produsele vin cu garanție oficială de 12 luni. În plus, oferim opțiunea de extindere a garanției până la 24 de luni.' },
        { sender: 'Alex', message: 'Foarte bine, și în cât timp ajunge comanda?' },
        { sender: 'Bot', message: 'Dacă produsul este pe stoc, livrarea în Chișinău se face în aceeași zi, iar în restul țării între 1–2 zile lucrătoare.' },
        { sender: 'Alex', message: 'Mulțumesc mult pentru informații!' },
        { sender: 'Bot', message: 'Cu mare drag, Alex! Dacă doriți, vă pot ajuta să plasați comanda chiar acum.' }
      ]
    },
    {
      name: 'Cristina G.',
      conversations: [
        { sender: 'Cristina', message: 'Bună, aș vrea să știu dacă oferiți servicii de întreținere auto.' },
        { sender: 'Bot', message: 'Bună, Cristina! Da, oferim servicii complete de întreținere auto: schimb de ulei, verificări tehnice și reparații mecanice.' },
        { sender: 'Cristina', message: 'Interesant. Ce tipuri de verificări tehnice faceți?' },
        { sender: 'Bot', message: 'Facem verificări pentru sistemul de frânare, suspensie, baterie, filtre, lichide și anvelope. În plus, oferim diagnosticare computerizată completă.' },
        { sender: 'Cristina', message: 'Și cât durează o verificare standard?' },
        { sender: 'Bot', message: 'O verificare completă durează aproximativ 60–90 de minute, în funcție de starea mașinii.' },
        { sender: 'Cristina', message: 'Dacă este nevoie de reparații, cum procedați?' },
        { sender: 'Bot', message: 'După diagnosticare, vă trimitem un raport detaliat cu recomandările și costurile estimate. Reparațiile se fac doar după ce primim acordul dumneavoastră.' },
        { sender: 'Cristina', message: 'Foarte clar, mulțumesc pentru detalii!' },
        { sender: 'Bot', message: 'Cu plăcere, Cristina! Doriți să vă ofer și informații despre pachetele noastre de întreținere periodică?' }
      ]
    },
    {
      name: 'Diana R.',
      conversations: [
        { sender: 'Diana', message: 'Salut! Caut servicii de web design pentru compania mea.' },
        { sender: 'Bot', message: 'Bună ziua, Diana! Excelent, oferim servicii complete de web design și dezvoltare. Ce tip de site doriți să creați?' },
        { sender: 'Diana', message: 'Am nevoie de un site e-commerce pentru produsele noastre.' },
        { sender: 'Bot', message: 'Perfect! Pentru e-commerce oferim platforme moderne cu plăți online, gestiune stoc și panou admin. Câte produse aveți aproximativ?' },
        { sender: 'Diana', message: 'Около 200 de produse în mai multe categorii.' },
        { sender: 'Bot', message: 'Foarte bine! Pentru 200 de produse recomandăm o platformă robustă cu filtrare avansată și optimizare SEO. Doriți și integrare cu sistemele existente?' },
        { sender: 'Diana', message: 'Da, și cu sistem de facturare și contabilitate.' },
        { sender: 'Bot', message: 'Excelent! Putem integra cu sisteme populare de facturare. În cât timp doriți să fie gata proiectul?' }
      ]
    },
    {
      name: 'Bogdan L.',
      conversations: [
        { sender: 'Bogdan', message: 'Bună! Mă interesează cursurile voastre de programare.' },
        { sender: 'Bot', message: 'Salut, Bogdan! Avem cursuri pentru toate nivelurile: începători, intermediari și avansați. Ce limbaj de programare vă interesează?' },
        { sender: 'Bogdan', message: 'JavaScript și React pentru frontend development.' },
        { sender: 'Bot', message: 'Excelentă alegere! Cursul nostru de JavaScript + React durează 4 luni și include proiecte practice. Aveți experiență anterioară în programare?' },
        { sender: 'Bogdan', message: 'Am ceva experiență cu HTML și CSS basic.' },
        { sender: 'Bot', message: 'Perfect! Cu baza de HTML/CSS puteți începe direct cu modulul de JavaScript fundamentals. Oferim și sesiuni de mentorat individual.' },
        { sender: 'Bogdan', message: 'Sună foarte bine! Care este prețul pentru întregul curs?' },
        { sender: 'Bot', message: 'Cursul complet costă 8.500 MDL, dar puteți plăti în rate lunare de 2.200 MDL. Prima lecție este gratuită!' }
      ]
    }
  ];
  const [selectedBox, setSelectedBox] = useState(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState([0, 0, 0, 0]) // Index pentru fiecare container separat
  const [displayedMessages, setDisplayedMessages] = useState<{sender: string, message: string}[][]>([[], [], [], []]) // Mesajele afișate pentru fiecare container
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

  // Inițializează primul mesaj pentru fiecare container când se încarcă componenta
  useEffect(() => {
    // Inițializează primul mesaj pentru fiecare container
    rightBoxData.forEach((boxData, idx) => {
      if (boxData.conversations.length > 0 && boxData.conversations[0].sender !== 'Bot') {
        setDisplayedMessages(prev => {
          const newMessages = [...prev];
          newMessages[idx] = [boxData.conversations[0]];
          return newMessages;
        });
        setCurrentMessageIndex(prev => {
          const newIndices = [...prev];
          newIndices[idx] = 1; // Următorul mesaj va fi de la bot
          return newIndices;
        });
      }
    });
  }, []);

  // --- viewport detection to conditionally render desktop vs mobile chat ---
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile('matches' in e ? e.matches : (e as MediaQueryList).matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler as (ev: MediaQueryListEvent) => any); else mq.addListener(handler as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler as (ev: MediaQueryListEvent) => any); else mq.removeListener(handler as any);
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
  // Keep track of which bot/container is the current target for the next send action
  const lastTargetBotRef = useRef<number>(0);
  // Guard to avoid retyping the same message before it is sent
  const awaitingSendRef = useRef(false);
  const awaitingBoxRef = useRef<number | null>(null);

  // Store sent messages per bot
  const [sentMessages, setSentMessages] = useState<string[][]>([[], [], [], []]);
  // For simulating typing per bot
  const [inputValues, setInputValues] = useState<string[]>(['', '', '', '']);
  // Track pending user message additions to prevent duplicates
  const [pendingUserMessages, setPendingUserMessages] = useState<boolean[]>([false, false, false, false]);

  // --- MouseResponses logic (now after all state/refs are declared) ---
  // Bubble texts for different areas
  const mouseResponsesLeft = [
    'Raspund la Mesaje\nPentru mesajele Necitite...',
    'Citesc Conversatii\nPentru mesajele Necitite...',
    'Analizez Raspunsurile\nPentru mesajele Necitite...',
    'Verific Starea Clientului\nPentru mesajele Necitite...'
  ];
  const mouseResponseInput = 'Scriu Mesaj Clientului';
  const mouseResponseSend = 'Trimit mesajul';
  const [mouseResponseIdx, setMouseResponseIdx] = useState(0);
  const [isOverLeftContainer, setIsOverLeftContainer] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);
  const [isOverSend, setIsOverSend] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Flag pentru a preveni scrierea multiplă
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
          zIndex: 9000,
          pointerEvents: 'none',
          minWidth: 60,
          maxWidth: 220,
          transition: 'none',
        }}
        className="bg-white rounded-xl rounded-l-md shadow px-3 py-2 text-sm text-gray-800 border border-gray-200"
      >
        {text.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
          {line}
          {idx !== text.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Functie: fake mouse typing - răspunde la ultimul mesaj al utilizatorului cu următorul mesaj bot
  function fakeMouseType(selectedBoxIdx: number, callback?: () => void) {
    // Dacă deja a fost scris și se așteaptă trimiterea, nu mai rescrie
    if (awaitingSendRef.current && awaitingBoxRef.current === selectedBoxIdx) {
      if (callback) callback();
      return;
    }
    // Ensure we are operating on the currently selected box
    if (selectedBox !== selectedBoxIdx) {
      setSelectedBox(selectedBoxIdx);
    }
    lastTargetBotRef.current = selectedBoxIdx;
    
    // Găsește următorul mesaj bot care să răspundă la ultimul mesaj al utilizatorului
    const conversations = rightBoxData[selectedBoxIdx]?.conversations;
    if (!conversations || currentMessageIndex[selectedBoxIdx] >= conversations.length) {
      if (callback) callback();
      return;
    }
    
    const nextMessage = conversations[currentMessageIndex[selectedBoxIdx]];
    if (nextMessage.sender !== 'Bot') {
      if (callback) callback();
      return;
    }
    
    const message = nextMessage.message;
    // Instantly fill input value with bot response
    setInputValues(vals => {
      const newVals = [...vals];
      newVals[selectedBoxIdx] = message;
      return newVals;
    });
    // Set awaiting-send lock
    awaitingSendRef.current = true;
    awaitingBoxRef.current = selectedBoxIdx;
    if (callback) callback();
  }

  // Auto-start typing when fake mouse hovers over input and it's Bot's turn (top-level effect)
  useEffect(() => {
    if (!showFakeMouse) return;
    if (!isOverInput) return;
    if (isTyping) return;
    // Nu reporni typing dacă așteptăm trimiterea pentru acest box
    if (awaitingSendRef.current && awaitingBoxRef.current === selectedBox) return;
    
    const conversations = rightBoxData[selectedBox]?.conversations;
    const idx = currentMessageIndex[selectedBox];
    
    // Verifică dacă următorul mesaj este de la bot și poate fi folosit ca răspuns
    if (conversations && idx < conversations.length && conversations[idx].sender === 'Bot') {
      const t = setTimeout(() => fakeMouseType(selectedBox), 250);
      return () => clearTimeout(t);
    }
  }, [isOverInput, isTyping, selectedBox, currentMessageIndex, showFakeMouse, awaitingSendRef.current]);

  // Random movement for fake mouse, always active when showFakeMouse is true
  useEffect(() => {
    if (!showFakeMouse) return;
    let timeout: NodeJS.Timeout;
    let running = true;
    // Secvența fixă: indexii botilor și acțiuni speciale
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
              lastTargetBotRef.current = boxIdx;
              step++;
              timeout = setTimeout(nextStep, 900);
            }, 180);
          }, 500);
        } else {
          step++;
          timeout = setTimeout(nextStep, 500);
        }
        return;
      }
      if (action === 'input') {
        // Move to input - folosește bot-ul din secvența anterioară
        const prevAction = sequence[step - 1];
        const currentBotIndex = typeof prevAction === 'number' ? prevAction : selectedBox;
        const input = inputRef.current;
        if (input) {
          const rect = input.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          console.log('🎯 Moving mouse to input at coordinates:', { x, y });
          setMousePos({ x, y });
          setTimeout(() => {
            setIsClicking(true);
            setTimeout(() => {
              setIsClicking(false);
              console.log('🖱️ Mouse clicked on input, starting typing sequence...');
              setTimeout(() => {
                console.log('🚀 Starting typing sequence for bot:', currentBotIndex);
                lastTargetBotRef.current = currentBotIndex;
                // Dacă deja a fost scris și așteaptă send, sari direct la 'send'
                if (awaitingSendRef.current && awaitingBoxRef.current === currentBotIndex) {
                  console.log('⏭️ Already awaiting send, skipping typing for bot:', currentBotIndex);
                  step++;
                  if (step >= sequence.length) step = 0;
                  timeout = setTimeout(nextStep, 400);
                } else {
                  fakeMouseType(currentBotIndex, () => {
                    console.log('✅ Typing sequence completed for bot (ready to send):', currentBotIndex);
                    step++; // advance to 'send'
                    if (step >= sequence.length) step = 0;
                    timeout = setTimeout(nextStep, 600); // Short delay before send
                  });
                }
              }, 500); // Delay scurt după click
            }, 250); // Click duration pe input
          }, 1000); // Delay mai mare pentru a ajunge la input
        } else {
          step++;
          timeout = setTimeout(nextStep, 500);
        }
        return;
      }
      if (action === 'send') {
        // Explicit send step: move to button, hover, click, and add bot message
        const boxIdx = lastTargetBotRef.current;
        if (selectedBox !== boxIdx) setSelectedBox(boxIdx);
        const btn = sendBtnRef.current;
        if (btn) {
          const rect = btn.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          setMousePos({ x, y });
          setTimeout(() => {
            setIsClicking(true);
            setTimeout(() => {
              setIsClicking(false);
              // Simulează click real pe butonul Trimite
              btn.click();
              // Clear awaiting-send imediat după trimitere
              awaitingSendRef.current = false;
              awaitingBoxRef.current = null;
              // Continue sequence - logica de adăugare a mesajului utilizatorului este doar în butonul Trimite
              step++;
              if (step >= sequence.length) step = 0;
              timeout = setTimeout(nextStep, 2000);
            }, 200); // Click duration
          }, 900); // Hover + travel duration
        } else {
          step++;
          if (step >= sequence.length) step = 0;
          timeout = setTimeout(nextStep, 500);
        }
        return;
      }
    }
    nextStep();
    return () => {
      running = false;
      clearTimeout(timeout);
    };
  }, [showFakeMouse]);

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

  // Helper to render the responsive chat container for desktop or mobile
  const renderChat = (variant: 'desktop' | 'mobile') => {
    const wrapperSizing = variant === 'desktop'
      ? 'w-[min(90vw,700px)] h-[clamp(320px,40vw,420px)]'
      : 'w-full h-[min(72vw,380px)]';
    return (
      <div
        className={`${wrapperSizing} bg-white rounded-2xl border border-gray-400 shadow-lg flex items-center justify-center ml-auto relative ${isInsideBigContainer ? 'cursor-none' : ''}`}
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
        <div className="w-[calc(100%-2px)] h-[calc(100%-37px)] bg-white rounded-2xl border border-gray-300 absolute left-0 top-[35px] flex flex-row items-stretch justify-between overflow-hidden">
          {/* Left small container */}
          <div
            className={`w-[28%] h-full bg-white rounded-l-2xl rounded-tr-none rounded-br-none border border-gray-200 flex flex-col items-stretch justify-start ml-0 relative ${isInsideBigContainer ? 'cursor-none' : ''}`}
            onMouseEnter={e => { handleBigContainerEnter(); setIsOverLeftContainer(true); }}
            onMouseLeave={e => { handleBigContainerLeave(); setIsOverLeftContainer(false); }}
            onMouseMove={handleBigContainerMove}
          >
            <div className="absolute top-3 left-3 flex gap-1"></div>
            {/* Four stacked containers, responsive heights */}
            <div className="flex flex-col w-full h-full">
              <div
                className={`flex-1 min-h-0 w-full border border-gray-200 flex items-center ${selectedBox === 0 ? 'bg-gray-100' : 'bg-white'} transition ${isInsideBigContainer ? 'cursor-none' : ''}`}
                onClick={() => setSelectedBox(0)}
                style={{cursor: isInsideBigContainer ? 'none' : 'pointer'}}
                ref={rightBoxRefs[0]}
              >
                <span
                  className="bg-gray-200 aspect-square w-5 h-5 rounded-full inline-block mr-2 ml-2 shrink-0"
                  style={{ display: 'inline-block' }}
                ></span>
                <span className="text-[13px] md:text-[15px] text-gray-700 font-medium">Alex M.</span>
              </div>
              <div
                className={`flex-1 min-h-0 w-full border border-gray-200 flex items-center ${selectedBox === 1 ? 'bg-gray-100' : 'bg-white'} transition ${isInsideBigContainer ? 'cursor-none' : ''}`}
                onClick={() => setSelectedBox(1)}
                style={{cursor: isInsideBigContainer ? 'none' : 'pointer'}}
                ref={rightBoxRefs[1]}
              >
                <span
                  className="bg-gray-200 aspect-square w-5 h-5 rounded-full inline-block mr-2 ml-2 shrink-0"
                  style={{ display: 'inline-block' }}
                ></span>
                <span className="text-[13px] md:text-[15px] text-gray-700 font-medium">Cristina G.</span>
              </div>
              <div
                className={`flex-1 min-h-0 w-full border border-gray-200 flex items-center ${selectedBox === 2 ? 'bg-gray-100' : 'bg-white'} transition ${isInsideBigContainer ? 'cursor-none' : ''}`}
                onClick={() => setSelectedBox(2)}
                style={{cursor: isInsideBigContainer ? 'none' : 'pointer'}}
                ref={rightBoxRefs[2]}
              >
                <span
                  className="bg-gray-200 aspect-square w-5 h-5 rounded-full inline-block mr-2 ml-2 shrink-0"
                  style={{ display: 'inline-block' }}
                ></span>
                <span className="text-[13px] md:text-[15px] text-gray-700 font-medium">Diana R.</span>
              </div>
              <div
                className={`flex-1 min-h-0 w-full border border-gray-200 flex items-center ${selectedBox === 3 ? 'bg-gray-100' : 'bg-white'} transition ${isInsideBigContainer ? 'cursor-none' : ''}`}
                onClick={() => setSelectedBox(3)}
                style={{cursor: isInsideBigContainer ? 'none' : 'pointer'}}
                ref={rightBoxRefs[3]}
              >
                <span
                  className="bg-gray-200 aspect-square w-5 h-5 rounded-full inline-block mr-2 ml-2 shrink-0"
                  style={{ display: 'inline-block' }}
                ></span>
                <span className="text-[13px] md:text-[15px] text-gray-700 font-medium">Bogdan L.</span>
              </div>
            </div>
          </div>
          {/* Right main container */}
          <div
            className={`flex-1 h-full bg-white rounded-r-2xl rounded-tl-none rounded-bl-none border border-gray-200 flex flex-col mr-0 relative overflow-hidden ${isInsideBigContainer ? 'cursor-none' : ''}`}
            onMouseEnter={handleBigContainerEnter}
            onMouseLeave={handleBigContainerLeave}
            onMouseMove={handleBigContainerMove}
          >
            {/* Name at top left - FIXED */}
            <div className="absolute top-3 left-3 text-[15px] md:text-lg font-bold text-gray-700 select-none z-10 bg-white px-2">
              {rightBoxData[selectedBox].name}
            </div>
            
            {/* Scrollable content area */}
            <div 
              ref={chatAreaRefs[selectedBox]}
              style={{
                flex: 1,
                overflowY: 'auto',
                paddingTop: '50px',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingBottom: '80px',
              }}
              className="flex flex-col gap-3"
            >
              {/* Conversația dinamică */}
              {displayedMessages[selectedBox].map((msg, idx) => (
                <div key={idx} className={`text-[12px] md:text-sm rounded px-3 py-2 w-fit break-words max-w-full ${
                  msg.sender === 'Bot' 
                    ? 'bg-blue-100 text-blue-900 self-start' // Bot pe stânga, albastru
                    : 'bg-gray-100 text-gray-600 self-end'    // Utilizator pe dreapta, gri
                }`}>
                  <strong>{msg.sender}:</strong> {msg.message}
                </div>
              ))}
              
              {/* Chat messages (mesajele trimise manual) */}
              {sentMessages[selectedBox] && sentMessages[selectedBox].map((msg, idx) => (
                <div key={idx} className="bg-blue-100 text-blue-900 px-3 py-2 rounded-lg w-fit self-end text-[12px] md:text-sm shadow-sm break-words max-w-full">{msg}</div>
              ))}
            </div>
            {/* Input container mic jos */}
            <div 
              style={{
                position: 'absolute', 
                left: 0, 
                bottom: 0, 
                width: '100%', 
                background: 'rgba(255,255,255,0.95)', 
                borderTop: '1px solid #e5e7eb', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                justifyContent: variant === 'mobile' ? 'center' : 'flex-start',
                padding: variant === 'mobile' ? '0.6rem 0' : '0.75rem',
              }}
              className={isInsideBigContainer ? 'cursor-none' : ''}
            >
              <div className={variant === 'mobile' ? 'w-full max-w-[460px] px-3 flex items-center gap-2' : 'w-full flex items-center gap-2'}>
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
                    minWidth: 0,
                    border: '1px solid #d1d5db', 
                    borderRadius: 8, 
                    padding: '0.5rem 0.75rem', 
                    fontSize: 14, 
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
                    padding: '0.5rem 0.8rem', 
                    fontWeight: 500, 
                    fontSize: 14
                  }}
                  className={isInsideBigContainer ? 'cursor-none' : ''}
                  onClick={() => {
                    const val = inputValues[selectedBox];
                    if (val.trim()) {
                      // Verifică dacă mesajul este răspunsul botului la următoarea întrebare
                      const conversations = rightBoxData[selectedBox]?.conversations;
                      const currentIdx = currentMessageIndex[selectedBox];
                      
                      if (conversations && currentIdx < conversations.length && 
                          conversations[currentIdx]?.sender === 'Bot' &&
                          conversations[currentIdx]?.message === val) {
                        // Adaugă mesajul ca răspuns de la bot în displayedMessages
                        setDisplayedMessages(prev => {
                          const newMessages = [...prev];
                          newMessages[selectedBox] = [...newMessages[selectedBox], conversations[currentIdx]];
                          return newMessages;
                        });
                        
                        // Capturează următorul index înainte de increment
                        const nextIdx = currentIdx + 1;
                        setCurrentMessageIndex(prev => {
                          const newIndices = [...prev];
                          newIndices[selectedBox] = nextIdx;
                          return newIndices;
                        });
                        
                        // După 3 secunde, adaugă următorul mesaj al utilizatorului (dacă există și nu e deja în proces)
                        if (!pendingUserMessages[selectedBox]) {
                          setPendingUserMessages(prev => {
                            const newPending = [...prev];
                            newPending[selectedBox] = true;
                            return newPending;
                          });
                          
                          setTimeout(() => {
                            if (conversations && nextIdx < conversations.length && conversations[nextIdx]?.sender !== 'Bot') {
                              const nextUserMsg = conversations[nextIdx];
                              
                              // Double check pentru a evita duplicarea
                              setDisplayedMessages(prevMessages => {
                                const currentMessages = prevMessages[selectedBox];
                                const lastMsg = currentMessages[currentMessages.length - 1];
                                
                                if (!lastMsg || lastMsg.message !== nextUserMsg.message || lastMsg.sender !== nextUserMsg.sender) {
                                  const newMessages = [...prevMessages];
                                  newMessages[selectedBox] = [...currentMessages, nextUserMsg];
                                  return newMessages;
                                }
                                return prevMessages;
                              });
                              
                              setCurrentMessageIndex(prev => {
                                const newIndices = [...prev];
                                newIndices[selectedBox] = nextIdx + 1;
                                return newIndices;
                              });
                            }
                            
                            // Reset pending flag
                            setPendingUserMessages(prev => {
                              const newPending = [...prev];
                              newPending[selectedBox] = false;
                              return newPending;
                            });
                          }, 3000);
                        }
                      } else {
                        // Adaugă ca mesaj manual de la utilizator
                        setSentMessages(msgs => {
                          const newMsgs = msgs.map(arr => [...arr]);
                          newMsgs[selectedBox].push(val);
                          return newMsgs;
                        });
                      }
                      
                      // Clear input
                      setInputValues(vals => {
                        const newVals = [...vals];
                        newVals[selectedBox] = '';
                        return newVals;
                      });
                      
                      // Auto-scroll
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
    );
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
              zIndex: 9000,
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
            zIndex: 9000,
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
              Interes AI pentru companii
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

            {/* Mobile-only: chat container under subtitle */}
            {isMobile && (
              <div className="mt-6 md:hidden">
                {renderChat('mobile')}
              </div>
            )}

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

          {/* Right side container (desktop/tablet). Not rendered on mobile to avoid duplicate refs. */}
          {!isMobile && (
            <div className="hidden md:flex md:col-span-6 lg:col-span-7 items-center justify-end">
              {renderChat('desktop')}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
