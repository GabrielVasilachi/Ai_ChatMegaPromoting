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
  { label: 'Resurse', dropdown: [
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Studii de caz',
      href: '/case-studies',
    },
    {
      title: 'Ghiduri',
      href: '/gids',
    },
    {
      title: 'Documentație',
      href: '/documentation',
    },
    {
      title: 'FAQ',
      href: '/faq',
    },
    {
      title: 'Calculator ROI',
      href: '/roi-calculator',
    },
  ] },
  { label: 'Integrări', dropdown: [
    {
      title: 'ChatWidget',
      href: '/integrari/chatwidget',
    },
    {
      title: 'Facebook',
      href: '/integrari/facebook',
    },
    {
      title: 'Telegram',
      href: '/integrari/telegram',
    },
    {
      title: 'AmoCrm',
      href: '/integrari/amocrm',
    },
    {
      title: 'ChatWidget',
      href: '/integrari/chatwidget',
    },
    {
      title: '999.md',
      href: '/integrari/999md',
    },
  ] },
  { label: 'Companie', dropdown: [
    {
      title: 'Despre Noi',
      href: '/about'
    },
    {
      title: 'Cariera',
      href: '/cariera'
    },
    {
      title: 'Parteneri',
      href: '/parteneri'
    },
    {
      title: 'TrustCenter',
      href: '/trustcenter'
    },
    {
      title: 'Contact',
      href: '/contact'
    } ] },
    { label: 'Prețuri', href: '/pricing' },
  ]
  

export default function NavigationHeaderPillStatic({
  logoSrc,
  logoAlt = 'Otonom AI',
  leftImageSrc,
  rightImageSrc,
}: NavigationHeaderPillStaticProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [expandedMobileSection, setExpandedMobileSection] = React.useState<string | null>(null)
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null)
  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset expanded section when menu closes
      setExpandedMobileSection(null)
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

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
      {/* Inner shell that morphs - ascuns complet cand popup-ul mobil este deschis */}
      {!isMobileMenuOpen && (
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
              {/* Center nav (desktop only) */}
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
                              className="fixed left-[calc(50%-430px)] top-[48px] w-[860px] min-h-[340px] bg-[#fff] text-black py-6 px-8 flex flex-col gap-3 pointer-events-auto rounded-xl border border-black border-t-0 overflow-y-auto"
                                style={{ zIndex: 999 }}
                            >
                              <motion.div
                                className="flex flex-col w-full items-start gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                style={{ minHeight: '340px', display: 'flex', justifyContent: 'space-between' }}
                              >
                                {item.dropdown.map((drop, index) => (
                                  <motion.div
                                    key={drop.title}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.04, duration: 0.28 }}
                                    className="w-full"
                                  >
                                    <Link
                                      href={drop.href}
                                      className="block py-3 px-3 rounded-lg transition-all duration-200 hover:scale-[1.02] group hover:bg-[#f7f7f7] focus:bg-[#f7f7f7] hover:text-black focus:text-black text-left w-full"
                                      tabIndex={0}
                                    >
                                      <div className="font-semibold text-black text-[16px] leading-tight mb-1 transition-colors text-left">
                                        {drop.title}
                                      </div>
                                      {'desc' in drop && (
                                        <div className="text-gray-600 text-[14px] leading-snug transition-colors text-left">
                                          {(drop as any).desc}
                                        </div>
                                      )}
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
              {/* Mobile burger button */}
              <button
                type="button"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-auto lg:hidden relative w-9 h-9 inline-flex items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:border-white/40"
              >
                <span className="sr-only">Open menu</span>
                <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></span>
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}></span>
                </div>
              </button>
              {/* Right controls (desktop only) */}
              <div className="ml-auto hidden lg:flex items-center gap-2">
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
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md pointer-events-auto flex items-start justify-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Expanded Navigation Container */}
          <div
            className="bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden rounded-t-full"
            style={{
              width: isScrolled ? 'min(1120px, 92vw)' : 'min(1280px, 96vw)',
              borderRadius: '16px',
              background: isScrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.90)',
              position: 'absolute',
              top: isScrolled ? 16 : 0,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Mobile Menu Header - Same as original navbar */}
              <motion.div 
                className="px-4 sm:px-5 md:px-6"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <div className="h-14 md:h-[60px] flex items-center gap-3 text-white/90 relative">
                  {/* Logo */}
                  <div className="shrink-0">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-baseline font-bold tracking-tight text-white text-lg relative" aria-label="Home">
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
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    aria-label="Close mobile menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="ml-auto w-9 h-9 inline-flex items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:border-white/40"
                  >
                    <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                      <span className="block h-0.5 w-5 bg-current transition-all duration-300 rotate-45 translate-y-0"></span>
                      <span className="block h-0.5 w-5 bg-current transition-all duration-300 opacity-0"></span>
                      <span className="block h-0.5 w-5 bg-current transition-all duration-300 -rotate-45 translate-y-0"></span>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Mobile Menu Content */}
              <motion.div 
                className="border-t border-white/10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <nav className="px-6 py-4 space-y-1 max-h-[60vh] overflow-y-auto">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.dropdown ? (
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => setExpandedMobileSection(
                              expandedMobileSection === item.label ? null : item.label
                            )}
                            className="w-full flex items-center justify-between px-3 py-2.5 text-left text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <span>{item.label}</span>
                            <motion.svg 
                              className="w-4 h-4 text-white/70"
                              viewBox="0 0 20 20" 
                              fill="none"
                              animate={{ 
                                rotate: expandedMobileSection === item.label ? 180 : 0 
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <path 
                                d="M6 8l4 4 4-4" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                              />
                            </motion.svg>
                          </button>
                          <AnimatePresence>
                            {expandedMobileSection === item.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 space-y-1 pt-1">
                                  {item.dropdown.map((drop, index) => (
                                    <motion.div
                                      key={drop.title}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05, duration: 0.2 }}
                                    >
                                      <Link
                                        href={drop.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                      >
                                        <div className="font-medium">{drop.title}</div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-2.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="border-t border-white/10 px-6 py-4 space-y-3">
                  <div className="flex items-center justify-center space-x-3">
                    <Link
                      href="https://aichat.md/en/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-2.5 px-4 text-center text-sm font-semibold border border-white/30 rounded-xl text-white hover:bg-white/10 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="https://aichat.md/en/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-2.5 px-4 text-center text-sm font-semibold bg-white text-black rounded-xl hover:bg-white/90 transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
    </header>
  )
}
