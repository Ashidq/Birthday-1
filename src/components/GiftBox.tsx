'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGift } from "react-icons/fa6";
import { useInView } from 'react-intersection-observer'
import { config } from '@/data/config'

interface Confetti {
  id: number
  x: number
  color: string
  size: number
  delay: number
  duration: number
  rotate: number
}

const confettiColors = ['#f43f5e', '#C9A84C', '#E8D5A3', '#fda4af', '#fff', '#ff6b9d', '#ffd700']

export default function GiftBox({
  onReplay,
}: {
  onReplay: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const handleOpen = () => {
    if (isOpen) return

    setIsOpen(true)
    setTimeout(() => setShowMessage(true), 1200)

    // Generate confetti
    const pieces: Confetti[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: Math.random() * 10 + 6,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 2,
      rotate: Math.random() * 360,
    }))
    setConfetti(pieces)
    setTimeout(() => setConfetti([]), 5000)
  }

  const handleReplay = () => {
    setIsOpen(false)
    setShowMessage(false)
    setConfetti([])
    setTimeout(() => onReplay(), 300)
  }

  return (
    <section
      id="gift"
      ref={ref}
      className="section-padding relative overflow-hidden min-h-screen flex items-center"
      style={{ background: 'linear-gradient(135deg, #2d1a1a 0%, #1a0a14 50%, #3d2b1a 100%)' }}
    >
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute rounded-sm"
              style={{
                left: `${piece.x}%`,
                top: '-20px',
                width: piece.size,
                height: piece.size * 0.6,
                background: piece.color,
                rotate: piece.rotate,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [piece.rotate, piece.rotate + 360 * 3],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'linear',
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: Math.random() > 0.5 ? '#C9A84C' : '#fda4af',
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 4,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto w-full relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="font-poppins text-rose-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            <div className="flex items-center justify-center gap-2">
            <FaGift size={30} /> A SPESIAL GIFT
            </div>
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-5">
            One Last Surprise
          </h2>
          <p className="font-poppins text-rose-300 text-lg">
            {isOpen ? 'You are my greatest gift ❤️' : 'Click the gift box to reveal...'}
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-16 bg-rose-800" />
            <span className="text-rose-500 text-lg">🔑</span>
            <div className="h-px w-16 bg-rose-800" />
          </div>
        </motion.div>

        {/* Gift box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
          className="flex flex-col items-center"
        >
          {/* Box */}
          <motion.div
            className="relative cursor-pointer"
            onClick={handleOpen}
            whileHover={!isOpen ? { scale: 1.05 } : {}}
            whileTap={!isOpen ? { scale: 0.97 } : {}}
          >
            {/* Lid */}
            <motion.div
              animate={isOpen ? { y: -80, rotate: -10, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-10"
            >
              <div
                className="w-44 h-12 rounded-t-lg mx-auto relative"
                style={{ background: 'linear-gradient(135deg, #e11d48, #f43f5e)' }}
              >
                {/* Lid ribbon */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8"
                  style={{ background: 'rgba(255,255,255,0.3)' }}
                />
                {/* Bow */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-end gap-1">
                  <div className="w-8 h-8 rounded-full border-4 border-white opacity-90 -rotate-12" />
                  <div className="w-8 h-8 rounded-full border-4 border-white opacity-90 rotate-12" />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" />
                </div>
              </div>
            </motion.div>

            {/* Box body */}
            <div
              className="w-52 h-44 rounded-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #be123c, #e11d48)',
                marginTop: '-2px',
              }}
            >
              {/* Ribbon vertical */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              />
              {/* Ribbon horizontal */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-8"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              />

              {/* Opening animation content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-4xl">🟡</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shadow */}
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-56 h-4 rounded-full opacity-30 blur-sm"
              style={{ background: '#e11d48' }}
            />
          </motion.div>

          {/* Click hint */}
          {!isOpen && (
            <motion.p
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 font-poppins text-rose-400 text-sm"
            >
              ↑ Click the gift box ↑
            </motion.p>
          )}

          {/* Message after open */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
                className="mt-12 max-w-lg mx-auto"
              >
                {/* 3 gift cards dalam satu baris */}
                <div className="grid grid-cols-3 gap-4 mt-12">
                  {config.gifts.map((gift, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className="rounded-2xl p-5 text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        className="text-4xl mb-3"
                      >
                        {gift.emoji}
                      </motion.div>
                      <p className="font-playfair text-white font-bold text-base mb-2">
                        {gift.label}
                      </p>
                      <p className="font-poppins text-rose-300 text-xs leading-relaxed">
                        {gift.message}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Pesan utama di bawah */}
                <div
                  className="rounded-3xl p-8 text-center mt-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <p className="font-playfair text-2xl md:text-3xl font-bold text-white leading-relaxed mb-4">
                    {config.giftMessage}
                  </p>
                  <p className="font-poppins text-rose-400 text-sm">
                    — With all my love, {config.myName}
                  </p>
                </div>


                {/* Replay button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <motion.button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-poppins font-medium text-white transition-all"
                    style={{
                      background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.3), rgba(244, 63, 94, 0.2))',
                      border: '1px solid rgba(244, 63, 94, 0.4)',
                    }}
                    whileHover={{
                      background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.5), rgba(244, 63, 94, 0.3))',
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    🔄 Replay Our Story
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-20 pb-4"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-full bg-rose-900" />
            <span className="text-rose-600 text-sm">❤</span>
            <div className="h-px w-full bg-rose-900" />
          </div>
          <p className="font-poppins text-rose-600 text-sm">
            Made with ❤️ by {config.myName}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
