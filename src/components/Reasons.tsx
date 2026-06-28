'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { config } from '@/data/config'

function ReasonCard({ reason, index }: { reason: typeof config.reasons[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: Math.random() > 0.5 ? 2 : -2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, type: 'spring' }}
      className="card-flip h-48 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`card-flip-inner w-full h-full ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="card-face rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-md"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #fff5f7 0%, #fff0f3 100%)',
            border: '1px solid #fce4ec',
          }}
        >
          <motion.div
            animate={!isFlipped ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl mb-3"
          >
            ❤️
          </motion.div>
          <p
            className="font-playfair font-bold text-xl"
            style={{ color: '#e11d48' }}
          >
            Reason {String(reason.id).padStart(2, '0')}
          </p>
          <p className="font-poppins text-rose-300 text-xs mt-2">
            Tap to reveal 👆🏻
          </p>
        </div>

        {/* Back */}
        <div
          className="card-face rounded-2xl flex items-center justify-center p-6 text-center shadow-md"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fb7185 100%)',
          }}
        >
          <div>
            <p className="font-poppins text-white text-sm leading-relaxed font-medium">
              {reason.back}
            </p>
            <p className="text-rose-200 text-xs mt-3 font-poppins">Tap to flip back</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Reasons() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section
      id="reasons"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf8f3 0%, #fff0f3 100%)' }}
    >
      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none">
        {['❤️', '💕', '💖', '💗'].map((h, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-5 select-none"
            style={{ left: `${15 + i * 22}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5 + i, repeat: Infinity }}
          >
            {h}
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-poppins text-rose-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            ❤️ Why I Love You
          </p>
          <h2
            className="font-playfair text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#3d2b3d' }}
          >
            {config.reasons.length} Reasons I Love You
          </h2>
          <p className="font-poppins text-gray-500 text-lg max-w-sm mx-auto">
            Tap each card to discover why you mean the world to me.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-rose-200" />
            <span className="text-rose-300 text-lg">💕</span>
            <div className="h-px w-16 bg-rose-200" />
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {config.reasons.map((reason, index) => (
            <ReasonCard key={reason.id} reason={reason} index={index} />
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-poppins text-rose-400 text-sm mt-10 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          &ldquo;And these are just {config.reasons.length} of the infinite reasons...&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
