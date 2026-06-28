'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GiTimeBomb } from 'react-icons/gi'
import { config } from '@/data/config'
import Image from 'next/image'

function TimelineItem({
  item,
  index,
}: {
  item: (typeof config.journey)[0]
  index: number
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      className={`flex items-center gap-6 md:gap-10 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-12`}
    >
      {/* Content card */}
      <div className="flex-1 max-w-sm md:max-w-md">
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-xl group"
          whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(244, 63, 94, 0.2)' }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(255, 255, 255, 0.9)' }}
        >
          {/* Image placeholder */}
          <div
            className="relative h-44 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #fff3e0 100%)' }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Text content */}
          <div className="p-6">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-poppins font-medium mb-3"
              style={{ background: '#fce4ec', color: '#e11d48' }}
            >
              {item.year}
            </div>
            <h3
              className="font-playfair text-xl font-bold mb-2"
              style={{ color: '#3d2b3d' }}
            >
              {item.title}
            </h3>
            <p className="font-poppins text-gray-500 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Gold accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, #C9A84C, #E8D5A3, #C9A84C)' }}
          />
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
            boxShadow: '0 4px 20px rgba(244, 63, 94, 0.4)',
          }}
        >
          {item.emoji}
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid #f43f5e' }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="flex-1 max-w-sm md:max-w-md hidden md:block" />
    </motion.div>
  )
}

export default function Journey() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section
      id="journey"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdf8f3 0%, #fff0f3 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-poppins text-orange-800 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            <div className="flex items-center justify-center gap-2">
              <GiTimeBomb size={30} /> Our Journey
            </div>
          </p>
          <h2
            className="font-playfair text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#4B2E1F' }}
          >
            Our Story Together
          </h2>
          <p className="font-poppins text-gray-500 text-lg max-w-md mx-auto">
            Every chapter of our story is a treasure I hold close to my heart.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-[#4B2E1F]" />
            <span className="text-rose-300 text-lg">🤎</span>
            <div className="h-px w-16 bg-[#4B2E1F]" />
          </div>
        </motion.div>

        {/* Timeline vertical line */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(180deg, transparent, #4B2E1F, #4B2E1F, transparent)' }}
          />

          {/* Timeline items */}
          {config.journey.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
