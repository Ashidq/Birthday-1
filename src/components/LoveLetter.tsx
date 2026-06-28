'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiTimeBomb } from 'react-icons/gi'
import { config } from '@/data/config'

export default function LoveLetter({ onContinue }: { onContinue: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [typedLines, setTypedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const allLines = [
    config.loveLetter.opening,
    '',
    ...config.loveLetter.body,
    '',
    config.loveLetter.closing,
  ]

  const typingDone = currentLine >= allLines.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isOpen) {
          setTimeout(() => setIsOpen(true), 500)
          setTimeout(() => setShowLetter(true), 1400)
        }
      },
      { threshold: 0.4 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [isOpen])

  useEffect(() => {
    if (!showLetter) return
    if (currentLine >= allLines.length) return

    const line = allLines[currentLine]

    if (line === '') {
      setTypedLines((prev) => [...prev, ''])
      setCurrentLine((l) => l + 1)
      setCurrentChar(0)
      return
    }

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar((c) => c + 1)
      }, 35)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setTypedLines((prev) => [...prev, line])
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [showLetter, currentLine, currentChar, allLines])

  useEffect(() => {
    if (typingDone) {
      const timer = setTimeout(() => setShowSignature(true), 800)
      return () => clearTimeout(timer)
    }
  }, [typingDone])

  const showButton = typingDone

  return (
    <section
      id="letter"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f3 0%, #fdf8f3 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['💕', '🌹', '💌', '🌸'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-10 select-none"
            style={{ left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-poppins text-rose-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            💌 Love Letter
          </p>
          <h2
            className="font-playfair text-4xl md:text-5xl font-bold"
            style={{ color: '#3d2b3d' }}
          >
            A Letter For You
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-rose-200" />
            <span className="text-rose-300 text-lg">❤</span>
            <div className="h-px w-16 bg-rose-200" />
          </div>
        </motion.div>

        {/* Envelope + Letter */}
        <div className="relative flex flex-col items-center">

          {/* Envelope */}
          <AnimatePresence>
            {!showLetter && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-80 md:w-96 cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative w-full rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #fce4ec 0%, #fff3e0 100%)',
                    height: '220px',
                  }}
                >
                  <motion.div
                    animate={isOpen ? { rotateX: -170 } : { rotateX: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute top-0 left-0 right-0 origin-top"
                    style={{
                      height: '110px',
                      background: 'linear-gradient(135deg, #f48fb1 0%, #fce4ec 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      transformStyle: 'preserve-3d',
                      zIndex: 10,
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0"
                    style={{ width: 0, height: 0, borderBottom: '110px solid #f8bbd0', borderRight: '160px solid transparent' }}
                  />
                  <div
                    className="absolute bottom-0 right-0"
                    style={{ width: 0, height: 0, borderBottom: '110px solid #f8bbd0', borderLeft: '160px solid transparent' }}
                  />
                  <motion.div
                    animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-12 left-[44%] -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md z-20"
                    style={{ background: 'linear-gradient(135deg, #e11d48, #f43f5e)' }}
                  >
                    ❤️
                  </motion.div>
                  <motion.div
                    animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <p className="font-poppins text-rose-400 text-sm">Membuka surat...</p>
                  </motion.div>
                </div>
                <p className="text-center font-poppins text-rose-400 text-sm mt-4 animate-pulse">
                  Sedang membuka surat untukmu...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Letter paper */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full relative"
              >
                <div
                  className="relative rounded-2xl p-8 md:p-12 shadow-2xl"
                  style={{
                    background: '#FFFDF9',
                    backgroundImage: `repeating-linear-gradient(
                      transparent,
                      transparent 31px,
                      #fce4ec 31px,
                      #fce4ec 32px
                    )`,
                    minHeight: '500px',
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: 'linear-gradient(90deg, #f43f5e, #fb7185, #fda4af)' }}
                  />

                  {/* Stamp */}
                  <div className="absolute top-6 right-6 w-14 h-16 rounded border-2 border-rose-200 flex flex-col items-center justify-center text-center opacity-60">
                    <span className="text-xs text-rose-400 leading-tight font-poppins">💋</span>
                    <span className="text-rose-300 font-poppins" style={{ fontSize: '9px' }}>LOVE</span>
                  </div>

                  {/* Letter body */}
                  <div className="font-poppins text-gray-700 leading-8 space-y-1 pr-14">
                    {typedLines.map((line, i) => (
                      <p
                        key={i}
                        className={`
                          ${i === 0 ? 'font-semibold text-rose-500 text-lg font-playfair mb-4' : ''}
                          ${line === config.loveLetter.closing ? 'font-poppins text-rose-400 mt-2' : ''}
                        `}
                      >
                        {line || '\u00A0'}
                      </p>
                    ))}

                    {/* Typing cursor */}
                    {currentLine < allLines.length && allLines[currentLine] !== '' && (
                      <p>
                        {allLines[currentLine].slice(0, currentChar)}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-4 bg-rose-400 ml-0.5 align-middle"
                        />
                      </p>
                    )}

                    {/* Signature block — kiri, foto + nama */}
                    {showSignature && (
                      <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mt-6 flex flex-col items-start gap-0"
                      >
                        <img
                          src={config.loveLetter.image}
                          alt="signature"
                          className="h-15 w-20 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                        <p className="font-playfair italic text-rose-600 text-l -mt-1">
                          {config.loveLetter.signature}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Continue button */}
                <AnimatePresence>
                  {showButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-center mt-10"
                    >
                      <motion.button
                        onClick={onContinue}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-poppins font-medium"
                        style={{
                          background: 'linear-gradient(135deg, #4B2E1F 0%, #8B5E3C 50%, #4B2E1F 100%)',
                          boxShadow: '0 6px 24px rgba(139, 94, 60, 0.35)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Continue Our Journey <GiTimeBomb />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}