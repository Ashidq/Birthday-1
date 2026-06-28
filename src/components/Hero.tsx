'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '@/data/config'

interface FloatingHeart {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  emoji: string
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export default function Hero({ onStart }: { onStart: () => void }) {
  const [displayText, setDisplayText] = useState('')
  const [showSubtext, setShowSubtext] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [stars, setStars] = useState<Star[]>([])

  const fullText = `Happy Birthday, ${config.partnerName} ❤️`

  useEffect(() => {
    // Generate floating hearts
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '🌸', '✨']
    const newHearts: FloatingHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 14,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }))
    setHearts(newHearts)

    // Generate background stars
    const newStars: Star[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
    }))
    setStars(newStars)

    // Typing animation
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowSubtext(true), 300)
        setTimeout(() => setShowButton(true), 900)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [fullText])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fff0f3 0%, #fdf8f3 40%, #fef3e8 70%, #fff0f3 100%)',
      }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              background: Math.random() > 0.5 ? '#C9A84C' : '#fda4af',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Large soft background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #fda4af 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fb7185 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute select-none"
            style={{
              left: `${heart.x}%`,
              fontSize: heart.size,
              bottom: -50,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, Math.random() > 0.5 ? 15 : -15],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Small decorative text */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-poppins text-rose-400 text-sm font-medium tracking-[0.3em] uppercase mb-6"
        >
          ✨ A Special Surprise ✨
        </motion.p>

        {/* Main heading with typing */}
        <div className="mb-6">
          <h1
            className="font-playfair font-bold text-5xl md:text-7xl leading-tight text-shadow-romantic"
            style={{ color: '#3d2b3d' }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block ml-1 w-1 h-14 md:h-18 bg-rose-400 align-middle"
              style={{ display: displayText.length < fullText.length ? 'inline-block' : 'none' }}
            />
          </h1>
        </div>

        {/* Subtext */}
        <AnimatePresence>
          {showSubtext && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-poppins text-rose-400 text-xl md:text-2xl font-light mb-12 italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;Today is a special day because you were born&rdquo;
            </motion.p>
          )}
        </AnimatePresence>

        {/* Divider */}
        {showSubtext && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-rose-300" />
            <span className="text-2xl">💕</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-rose-300" />
          </motion.div>
        )}

        {/* CTA Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            >
              <motion.button
                onClick={onStart}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-poppins font-medium text-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fb7185 100%)',
                  boxShadow: '0 8px 30px rgba(225, 29, 72, 0.35)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(225, 29, 72, 0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                />
                <span>Start Our Story</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💌
                </motion.span>
              </motion.button>

              <p className="mt-5 text-rose-300 text-sm font-poppins font-light">
                Klik untuk memulai perjalanan kita ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom scroll indicator */}
      {showButton && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-rose-300 flex items-start justify-center pt-2">
            <motion.div
              className="w-1 h-2 rounded-full bg-rose-400"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
