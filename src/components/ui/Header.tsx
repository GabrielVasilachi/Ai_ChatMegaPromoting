'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Improved: smooth morph between top bar and centered pill with seamless connected dropdowns.
 * - Always centered via left-1/2 + -translate-x-1/2 (no side "slide")
 * - Animates top, width, border-radius, background & blur smoothly
 * - Connected dropdowns with smooth spring animations
 * - When at page top: content is constrained (not touching screen edges)
 */

type NavigationHeaderPillStaticProps = {
  logoSrc?: string
  logoAlt?: string
  leftImageSrc?: string
  rightImageSrc?: string
}

const navItems = [
  { label: 'Resurse', href: '/resurse', dropdown: [
    {
      title: 'Obține o demonstrație',
      desc: 'Explorați funcționalitatea acum.',
      href: '/demo',
    },
    {
      title: 'Carieră',
      desc: 'Alăturați-vă echipei noastre.',
      href: '/cariera',
    },
    {
      title: 'Blog',
      desc: 'Citiți cele mai recente articole și aflați despre noile tendințe.',
      href: '/blog',
    },
  ] },
  { label: 'Prețuri', href: '/pricing' },
  { label: 'Integrări', href: '/integrari', dropdown: [
    {
      title: 'Instagram',
      desc: 'DM-uri care convertesc, cu AI.',
      href: '/integrari/instagram',
    },
    {
      title: 'Facebook',
      desc: 'Mesaje instant, ghidate de AI.',
      href: '/integrari/facebook',
    },
    {
      title: 'Telegram',
      desc: 'Discuții 24/7, totul AI.',
      href: '/integrari/telegram',
    },
    {
      title: 'AmoCrm',
      desc: 'Sincronizarea datelor și lead-urilor.',
      href: '/integrari/amocrm',
    },
    {
      title: 'ChatWidget',
      desc: 'Site-ul tău, asistat de AI.',
      href: '/integrari/chatwidget',
    },
    {
      title: '999.md',
      desc: 'Anunțuri și vânzări cu AI.',
      href: '/integrari/999md',
    },
  ] },
  { label: 'Despre noi', href: '/about' },
  { label: 'Contacte', href: '/contact' },
]


export default function NavigationHeaderPillStatic({
  logoSrc,
  logoAlt = 'Otonom AI',
  leftImageSrc,
  rightImageSrc,
}: NavigationHeaderPillStaticProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null)
  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Smooth timing
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

  // Layout values for both states
  const top = isScrolled ? 16 : 0 // px
  const width = isScrolled ? 'min(1120px, 92vw)' : 'min(1280px, 96vw)'
  const radius = isScrolled ? 9999 : 14
  const bg = isScrolled ? 'rgba(0,0,0,0.72)' : 'rgba(0,0,0,0.82)'
  const border = '1px solid rgba(255,255,255,0.12)'
  const blur = isScrolled ? '12px' : '10px'
  const shadow = isScrolled
    ? '0 8px 28px -14px rgba(0,0,0,0.45)'
    : '0 10px 32px -18px rgba(0,0,0,0.35)'

  // Dropdown handlers with improved timing to prevent flickering
  const handleDropdown = (label: string | null) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setOpenDropdown(label)
  }
  const handleDropdownDelayedClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 350) // Increased delay for better UX
  }

  return (
    <header role="banner" className="fixed z-[9999] top-[2px] left-1/2 -translate-x-1/2 w-full pointer-events-none">
      {/* Inner shell that morphs */}
      <div
        className={
          'pointer-events-auto ' +
          (!isScrolled ? 'rounded-full' : '')
        }
        style={{
          position: 'absolute',
          top,
          left: '50%',
          transform: 'translateX(-50%)',
          width,
          borderRadius: isScrolled ? radius : 9999,
          background: bg,
          border,
          backdropFilter: `blur(${blur})`,
          WebkitBackdropFilter: `blur(${blur})`,
          boxShadow: shadow,
          transitionProperty:
            'top, width, border-radius, background-color, backdrop-filter, -webkit-backdrop-filter, box-shadow',
          transitionDuration: '420ms',
          transitionTimingFunction: ease,
        }}
      >
        <div className="px-4 sm:px-5 md:px-6">
          <nav className="h-14 md:h-[60px] flex items-center gap-3 text-white/90 relative">
            {/* Left decorative image (optional) */}
            {leftImageSrc && (
              <div className="hidden sm:block shrink-0 pl-1">
                <Image src={leftImageSrc} alt="" width={28} height={28} className="rounded" />
              </div>
            )}

            {/* Logo */}
            <div className="shrink-0">
              {logoSrc ? (
                <Link href="/" aria-label="Home" className="inline-flex items-center gap-2">
                  <Image src={logoSrc} alt={logoAlt} width={96} height={24} className="h-5 w-auto" />
                </Link>
              ) : (
                <Link href="/" className="inline-flex items-baseline font-bold tracking-tight text-white text-lg relative" aria-label="Home">
                  <span>Otonom</span>
                  <span
                    style={{
                      fontSize: '0.65em',
                      position: 'relative',
                      top: '-0.7em',
                      left: '0.1em',
                      fontWeight: 700,
                      letterSpacing: '0.01em',
                      opacity: 0.85
                    }}
                    className="text-xs text-white/80 select-none"
                  >AI</span>
                </Link>
              )}
            </div>

            {/* Center nav (static labels) */}
            <ul className="hidden lg:flex items-center gap-1.5 mx-auto relative z-10">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        type="button"
                        className={
                          'inline-flex items-center h-9 px-3 select-none transition-all duration-300 ease-out ' +
                          (openDropdown === item.label
                            ? 'bg-white text-black rounded-t-xl rounded-b-none border-x border-t border-black border-b-0 border-opacity-100'
                            : 'text-white hover:text-white border-x border-t border-black border-b-0 border-opacity-0 rounded-t-xl rounded-b-none')
                        }
                        tabIndex={0}
                        aria-expanded={openDropdown === item.label}
                        aria-haspopup="true"
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      >
                        {item.label}
                        <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="none">
                          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ 
                              type: 'spring', 
                              stiffness: 260, 
                              damping: 26, 
                              mass: 0.8,
                              duration: 0.4
                            }}
                            className="absolute left-0 top-full min-w-[360px] bg-[#fff] text-black py-5 px-6 flex flex-col gap-2 pointer-events-auto rounded-b-xl rounded-tr-xl rounded-tl-none border border-black border-t-0"
                            style={{ 
                              zIndex: 50
                            }}
                            // onMouseLeave removed; handled by <li> instead
                          >
                            <motion.div 
                              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                            >
                              {item.dropdown.map((drop, index) => (
                                <motion.div
                                  key={drop.title}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                                >
                                  <Link
                                    href={drop.href}
                                    className={
                                      'block py-2 px-2 rounded-lg transition-all duration-200 hover:scale-[1.02] group ' +
                                      'hover:bg-[#fff] focus:bg-[#fff] ' +
                                      'hover:text-black focus:text-black'
                                    }
                                    tabIndex={0}
                                  >
                                    <div className="font-semibold text-black text-[15px] leading-tight mb-1 group-hover:text-black group-focus:text-black transition-colors">
                                      {drop.title}
                                    </div>
                                    <div className="text-gray-600 text-[14px] leading-snug group-hover:text-gray-800 group-focus:text-gray-800 transition-colors">
                                      {drop.desc}
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                }
                // ...existing code for nav items without dropdown...
                return (
                  <li key={item.label} className="relative">
                    <Link
                      href={item.href}
                      className="inline-flex items-center h-9 px-3 transition-all duration-300 ease-out text-white/85 hover:text-white hover:bg-white/10 rounded-full"
                      tabIndex={0}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Right controls */}
            <div className="ml-auto flex items-center gap-2">
              <Link
                href="#lang"
                className="inline-flex items-center h-9 px-3 rounded-full text-white/85 hover:text-white hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" aria-hidden>
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20Zm0 0c2.5 0 5 4.03 5 10s-2.5 10-5 10-5-4.03-5-10 2.5-10 5-10Zm-9 10h18M3.5 8h17M3.5 16h17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                RO
              </Link>
              <Link
                href="https://aichat.md/en/register"
                className="min-w-[90px] h-9 inline-flex items-center justify-center rounded-[16px] px-4 font-semibold bg-white text-black border border-black"
              >
                Sign In
              </Link>
              <Link
                href="https://aichat.md/en/login"
                className="min-w-[90px] h-9 inline-flex items-center justify-center rounded-[16px] px-4 font-semibold bg-black text-white border border-black"
              >
                Get Started
              </Link>

              {rightImageSrc && (
                <div className="hidden sm:block shrink-0 pr-1">
                  <Image src={rightImageSrc} alt="" width={28} height={28} className="rounded" />
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
