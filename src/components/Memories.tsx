'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BsFilm } from "react-icons/bs";
import { config } from '@/data/config'
import Image from 'next/image'

const categories = ['All', 'First Moment', 'Our Date', 'Random Memories', 'Favorite Photos']

const heights = [200, 260, 220, 240, 200, 270, 210, 250]

export default function Memories() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<null | typeof config.memories[0]>(null)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const filtered =
    activeCategory === 'All'
      ? config.memories
      : config.memories.filter((m) => m.category === activeCategory)

  return (
    <section
      id="memories"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f3 0%, #fdf8f3 100%)' }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="font-poppins text-red-700 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            <div className="flex items-center justify-center gap-2">
              <BsFilm size={30} /> Memories
            </div>
          </p>
          <h2
            className="font-playfair text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#3d2b3d' }}
          >
            Our Beautiful Memories
          </h2>
          <p className="font-poppins text-gray-500 text-lg max-w-md mx-auto">
            Every photo tells a thousand words, but none can capture how much I feel for you.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-red-700" />
            <span className="text-rose-300 text-lg">📷</span>
            <div className="h-px w-16 bg-red-700" />
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-poppins font-medium transition-all"
              style={
                activeCategory === cat
                  ? {
                      background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
                      color: 'white',
                      boxShadow: '0 4px 15px rgba(225, 29, 72, 0.3)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.8)',
                      color: '#9f4f5f',
                      border: '1px solid #fce4ec',
                    }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry gallery */}
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((memory, index) => (
              <motion.div
                key={memory.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid mb-4 group relative rounded-xl overflow-hidden cursor-pointer shadow-md"
                style={{ height: heights[index % heights.length] }}
                onClick={() => setLightbox(memory)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Placeholder bg */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, 
                      hsl(${340 + index * 15}, 70%, ${88 - index * 2}%) 0%, 
                      hsl(${30 + index * 10}, 70%, ${90 - index * 1}%) 100%)`,
                  }}
                />
                <Image
                  src={memory.image}
                  alt={memory.caption}
                  fill
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-poppins text-xs font-medium">{memory.caption}</p>
                    <p className="text-rose-300 font-poppins text-xs mt-1">{memory.category}</p>
                  </div>
                </div>

                {/* Category badge */}
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-poppins font-medium opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: 'rgba(225, 29, 72, 0.8)', color: 'white' }}
                >
                  {memory.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Add photos hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-poppins text-red-700 text-sm mt-8"
        >
          Foto kita blur ✌🏻😆✌🏻
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative w-full"
                style={{
                  paddingBottom: '66%',
                  background: 'linear-gradient(135deg, #fce4ec 0%, #fff3e0 100%)',
                }}
              >
                <Image
                  src={lightbox.image}
                  alt={lightbox.caption}
                  fill
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-30">📷</span>
                </div>
              </div>
              <div
                className="p-6"
                style={{ background: 'rgba(255, 248, 245, 0.97)' }}
              >
                <p className="font-playfair text-xl font-bold text-rose-600 mb-1">{lightbox.caption}</p>
                <p className="font-poppins text-rose-400 text-sm">{lightbox.category}</p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-600 hover:bg-white transition-colors text-lg"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
