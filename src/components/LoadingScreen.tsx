'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { config } from '@/data/config'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 600)
          }, 400)
          return 100
        }
        return prev + Math.random() * 8 + 3
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #fff0f3 0%, #fdf8f3 50%, #fef3e8 100%)',
          }}
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl select-none opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  rotate: [-10, 10, -10],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Heart loader */}
            <motion.div
              className="loading-heart text-7xl"
              animate={{
                scale: [1, 1.3, 1],
                filter: [
                  'drop-shadow(0 0 0px rgba(244, 63, 94, 0))',
                  'drop-shadow(0 0 20px rgba(244, 63, 94, 0.6))',
                  'drop-shadow(0 0 0px rgba(244, 63, 94, 0))',
                ],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/images/egic-kecic.webp"
                alt="loading"
                className="w-96 h-96 object-cover"
              />
            </motion.div>

            {/* Text */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-3xl font-bold"
              style={{ color: '#3d2b3d' }}
            >
              Happy Birthday
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-poppins text-rose-400 text-lg mb-10"
            >
              {config.partnerName} ❤️
            </motion.p>

            {/* Progress bar */}
            <div
              className="w-48 h-1.5 rounded-full overflow-hidden"
              style={{ background: '#fce4ec' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #f43f5e, #fb7185, #fda4af)',
                  width: `${Math.min(progress, 100)}%`,
                  transition: 'width 0.1s ease',
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-poppins text-rose-300 text-xs mt-3"
            >
              Preparing your surprise...
            </motion.p>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 text-rose-200 text-4xl opacity-40">✨</div>
          <div className="absolute top-8 right-8 text-rose-200 text-4xl opacity-40">💕</div>
          <div className="absolute bottom-8 left-8 text-rose-200 text-4xl opacity-40">🌸</div>
          <div className="absolute bottom-8 right-8 text-rose-200 text-4xl opacity-40">💖</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
