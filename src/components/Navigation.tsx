'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'letter', label: 'Letter', emoji: '💌' },
  { id: 'journey', label: 'Journey', emoji: '🕰️' },
  { id: 'memories', label: 'Memories', emoji: '📸' },
  { id: 'reasons', label: 'Reasons', emoji: '❤️' },
  { id: 'video', label: 'Video', emoji: '🎥' },
  { id: 'playlist', label: 'Playlist', emoji: '🎵' },
  { id: 'gift', label: 'Gift', emoji: '🎁' },
]

export default function Navigation({
  isMusicPlaying,
  onToggleMusic,
  musicStarted,
}: {
  isMusicPlaying: boolean
  onToggleMusic: () => void
  musicStarted: boolean
}) {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 hidden md:block"
      >
        <div
          className="mx-auto max-w-5xl mt-4 px-6 py-3 rounded-2xl flex items-center justify-between"
          style={{
            background: isScrolled
              ? 'rgba(253, 248, 243, 0.92)'
              : 'rgba(253, 248, 243, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(244, 194, 204, 0.4)',
            boxShadow: isScrolled ? '0 4px 30px rgba(244, 63, 94, 0.1)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg"
            >
              ❤️
            </motion.span>
            <span
              className="font-playfair font-bold text-sm"
              style={{ color: '#3d2b3d' }}
            >
              Our Story
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-poppins font-medium transition-all"
                style={{
                  background:
                    activeSection === item.id
                      ? 'linear-gradient(135deg, #f43f5e, #fb7185)'
                      : 'transparent',
                  color: activeSection === item.id ? 'white' : '#9f4f5f',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Music toggle */}
          {musicStarted && (
            <button
              onClick={onToggleMusic}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-poppins transition-all"
              style={{
                background: isMusicPlaying ? 'rgba(244, 63, 94, 0.1)' : 'transparent',
                color: '#9f4f5f',
                border: '1px solid rgba(244, 194, 204, 0.4)',
              }}
            >
              <motion.span
                animate={isMusicPlaying ? { rotate: [0, 360] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                🎵
              </motion.span>
              <span>{isMusicPlaying ? 'On' : 'Off'}</span>
            </button>
          )}
        </div>
      </motion.nav>

      {/* Mobile: music button + hamburger */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 md:hidden">
        {musicStarted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onToggleMusic}
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: 'rgba(253, 248, 243, 0.95)',
              border: '1px solid rgba(244, 194, 204, 0.6)',
            }}
          >
            <motion.span
              animate={isMusicPlaying ? { rotate: [0, 360] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="text-sm"
            >
              🎵
            </motion.span>
          </motion.button>
        )}

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: 'rgba(253, 248, 243, 0.95)',
            border: '1px solid rgba(244, 194, 204, 0.6)',
          }}
        >
          <span className="text-lg">{isMobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-64 z-40 flex flex-col pt-20 pb-8 px-6"
            style={{
              background: 'rgba(253, 248, 243, 0.97)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(244, 194, 204, 0.4)',
            }}
          >
            <p
              className="font-playfair font-bold text-xl mb-6"
              style={{ color: '#3d2b3d' }}
            >
              Our Story ❤️
            </p>

            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                  style={{
                    background:
                      activeSection === item.id
                        ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(251, 113, 133, 0.05))'
                        : 'transparent',
                    border: activeSection === item.id
                      ? '1px solid rgba(244, 63, 94, 0.2)'
                      : '1px solid transparent',
                  }}
                >
                  <span>{item.emoji}</span>
                  <span
                    className="font-poppins text-sm font-medium"
                    style={{ color: activeSection === item.id ? '#e11d48' : '#6b3d4d' }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-rose-100">
              <p className="font-poppins text-rose-300 text-xs text-center">Made with ❤️</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
