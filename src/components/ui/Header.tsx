'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Pill-shaped header with desktop mega menus matching the screenshots:
 * - Items: Resurse (dropdown), Prețuri, Integrări (dropdown), Despre noi, Contacte, Globe + RO
 * - Two-column dropdown cards with bold titles + muted descriptions
 * - Smooth sliding hover highlight under nav items
 * - No external libs; Tailwind-only
 */
export default function HeaderWithMegaMenu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    {
      label: 'Resurse',
      href: '#',
      dropdown: [
        [
          { title: 'Obține o demonstrație', desc: 'Explorați funcționalitatea acum.', href: '#demo' },
          { title: 'Blog', desc: 'Citiți cele mai recente articole și aflați despre noile tendințe.', href: '#blog' },
        ],
        [
          { title: 'Carieră', desc: 'Alăturați-vă echipei noastre.', href: '#career' },
        ],
      ],
    },
    { label: 'Prețuri', href: '#pricing' },
    {
      label: 'Integrări',
      href: '#',
      dropdown: [
        [
          { title: 'Instagram', desc: 'DM‑uri care convertesc, cu AI.', href: '#instagram' },
          { title: 'Telegram', desc: 'Discuții 24/7, totul AI.', href: '#telegram' },
          { title: 'ChatWidget', desc: 'Site‑ul tău, asistat de AI.', href: '#chatwidget' },
        ],
        [
          { title: 'Facebook', desc: 'Mesaje instant, ghidate de AI.', href: '#facebook' },
          { title: 'AmoCrm', desc: 'Sincronizarea datelor și lead‑urilor.', href: '#amocrm' },
          { title: '999.md', desc: 'Anunțuri și vânzări cu AI.', href: '#999' },
        ],
      ],
    },
    { label: 'Despre noi', href: '#about' },
    { label: 'Contacte', href: '#contact' },
  ];

  // Track hover state for nav and dropdown
  const hoverRefs = useRef<{nav: number|null, dropdown: number|null}>({nav: null, dropdown: null});

  function handleNavEnter(idx: number) {
    hoverRefs.current.nav = idx;
    setOpenIdx(idx);
  }
  function handleNavLeave(idx: number) {
    hoverRefs.current.nav = null;
    setTimeout(() => {
      if (hoverRefs.current.dropdown !== idx) setOpenIdx(null);
    }, 1); // minimal delay to allow dropdown enter
  }
  function handleDropdownEnter(idx: number) {
    hoverRefs.current.dropdown = idx;
    setOpenIdx(idx);
  }
  function handleDropdownLeave(idx: number) {
    hoverRefs.current.dropdown = null;
    setTimeout(() => {
      if (hoverRefs.current.nav !== idx) setOpenIdx(null);
    }, 1);
  }

  return (
    <header
      className={`fixed top-2 left-2 right-2 md:top-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'scale-95' : 'scale-100'
      }`}
    >
      <nav className="bg-white/90 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full px-4 md:px-6 py-2.5 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <a href="#home" className="text-base md:text-xl font-bold select-none">
            <span className="glow-text">AI Chat</span>
          </a>

          {/* Center nav */}
          <div className="relative hidden lg:flex items-center">
            <ul className="relative z-10 flex items-center gap-1.5 xl:gap-3">
              {nav.map((item, idx) => (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    className="group rounded-full px-3.5 py-2 text-sm font-medium text-gray-800/90 dark:text-gray-200/90 transition-[color,transform] duration-200 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                    aria-haspopup={!!item.dropdown}
                    aria-expanded={openIdx === idx}
                    onMouseEnter={() => { if (item.dropdown) handleNavEnter(idx); }}
                    onFocus={() => {}}
                    onMouseLeave={() => { if (item.dropdown) handleNavLeave(idx); else setOpenIdx(null); }}
                  >
                    {/* Per-item background pill */}
                    <span className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none" aria-hidden="true"></span>
                    <span className="inline-flex items-center gap-1 relative">
                      {item.label}
                      {item.dropdown && (
                        <svg viewBox="0 0 24 24" className={`size-4 transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`} aria-hidden>
                          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {/* Dropdown panel */}
                  {item.dropdown && (
                    <div
                      onMouseEnter={() => handleDropdownEnter(idx)}
                      onMouseLeave={() => handleDropdownLeave(idx)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${openIdx === idx ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    >
                      <div
                        className={`w-[640px] rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md shadow-xl transition-all duration-200 ${
                          openIdx === idx ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-6 p-6">
                          {item.dropdown.map((col, cIdx) => (
                            <ul key={cIdx} className="space-y-4">
                              {col.map((link) => (
                                <li key={link.title}>
                                  <a href={link.href} className="block rounded-xl p-2 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]">
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{link.title}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{link.desc}</div>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}

              {/* Globe + RO */}
              <li className="relative">
                <a
                  href="#lang"
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-gray-800/90 dark:text-gray-200/90 hover:text-black dark:hover:text-white transition-[color,transform] duration-200 hover:-translate-y-[1px]"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20Zm0 0c2.5 0 5 4.03 5 10s-2.5 10-5 10-5-4.03-5-10 2.5-10 5-10Zm-9 10h18M3.5 8h17M3.5 16h17" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                    RO
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Right side CTAs */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <button className="hidden sm:block text-gray-700/90 dark:text-gray-200/90 hover:text-black dark:hover:text-white transition-colors duration-200 text-sm">
              Sign In
            </button>
            <button className="px-3 md:px-5 py-2 bg-black text-white rounded-full text-sm font-medium transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .glow-text {
          background: radial-gradient(100% 100% at 50% 0%, #111 0%, #111 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
      `}</style>
    </header>
  );
}
