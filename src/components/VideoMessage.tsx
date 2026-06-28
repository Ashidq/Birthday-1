'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PiFilmReelFill } from "react-icons/pi";
import { config } from '@/data/config'

export default function VideoMessage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section
      id="video"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff0f3 0%, #3d2b3d 100%)' }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-poppins text-rose-700 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            <div className="flex items-center justify-center gap-2">
              <PiFilmReelFill size={30} /> Video Message
            </div>
          </p>
          <h2
            className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            A Special Message
          </h2>
          <p className="font-poppins text-rose-400  text-lg max-w-md mx-auto">
            A special message from me to you ❤️
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-rose-700" />
            <span className="text-rose-400 text-lg">🎬</span>
            <div className="h-px w-16 bg-rose-700" />
          </div>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
          style={{ aspectRatio: '16/9', border: '2px solid rgba(244, 63, 94, 0.3)' }}
          onClick={togglePlay}
        >
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={config.videoThumbnail}
            onEnded={() => setIsPlaying(false)}
            onError={() => {}}
          >
            <source src={config.videoUrl} type="video/mp4" />
          </video>

          {/* Play/Pause overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(244, 63, 94, 0.9)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.div>
          </div>

          {/* Rose gold corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-rose-400 rounded-tl-lg opacity-60" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-rose-400 rounded-tr-lg opacity-60" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-rose-400 rounded-bl-lg opacity-60" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-rose-400 rounded-br-lg opacity-60" />
        </motion.div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p
            className="font-playfair text-xl italic text-white"
          >
            &ldquo;Words can only say so much, but my heart says everything.&rdquo;
          </p>
          <p className="font-poppins text-rose-400 text-sm mt-2">— {config.myName}</p>
        </motion.div>
      </div>
    </section>
  )
}
