'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaMusic } from "react-icons/fa";
import { config } from '@/data/config'
import Image from 'next/image'

export default function Playlist() {
  const [currentSong, setCurrentSong] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const handlePlay = (index: number) => {
    if (currentSong === index) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    } else {
      setCurrentSong(index)
      setIsPlaying(true)
      if (audioRef.current) {
        audioRef.current.src = config.playlist[index].url
        audioRef.current.play().catch(() => {})
      }
    }
  }

  const barCount = 5

  return (
    <section
      id="playlist"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0a0a 0%, #2d1a1a 100%)' }}
    >
      {/* Musical notes decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['♪', '♫', '♬', '♩', '♭'].map((note, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl select-none"
            style={{
              left: `${10 + i * 18}%`,
              top: `${10 + (i % 3) * 25}%`,
              color: 'rgba(244, 63, 94, 0.1)',
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
          >
            {note}
          </motion.div>
        ))}
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-poppins text-rose-400 text-sm font-medium tracking-[0.3em] uppercase mb-3">
            <div className="flex items-center justify-center gap-2">
              <FaMusic size={30}/> Our Playlist
            </div>
          </p>
          <h2
            className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Our Songs ❤️
          </h2>
          <p className="font-poppins text-rose-300 text-lg max-w-md mx-auto">
            Every song reminds me of you. Every melody tells our story.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-rose-800" />
            <span className="text-rose-500 text-lg">🎶</span>
            <div className="h-px w-16 bg-rose-800" />
          </div>
        </motion.div>

        {/* Spotify-like player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: 'rgba(40, 20, 20, 0.9)', border: '1px solid rgba(244, 63, 94, 0.2)' }}
        >
          {/* Mini now-playing bar */}
          <div
            className="p-5 border-b"
            style={{ borderColor: 'rgba(244, 63, 94, 0.15)' }}
          >
            <div className="flex items-center gap-4">
              {/* Album art */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden relative"
                style={{ background: 'linear-gradient(135deg, #e11d48, #f43f5e)' }}
              >
                {currentSong !== null ? (
                  <>
                    <Image
                      src={config.playlist[currentSong].cover}
                      alt="cover"
                      fill
                      className="object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </>
                ) : (
                  <span className="text-2xl">🎵</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-poppins text-white font-medium text-sm truncate">
                  {currentSong !== null ? config.playlist[currentSong].title : 'Our Songs'}
                </p>
                <p className="font-poppins text-rose-400 text-xs truncate">
                  {currentSong !== null ? config.playlist[currentSong].artist : 'Select a song to play'}
                </p>
              </div>

              {/* Visual bars */}
              <div className="flex items-end gap-0.5 h-6">
                {Array.from({ length: barCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full"
                    style={{ background: '#f43f5e' }}
                    animate={
                      isPlaying
                        ? { height: ['4px', `${8 + Math.random() * 14}px`, '4px'] }
                        : { height: '4px' }
                    }
                    transition={{
                      duration: 0.3 + Math.random() * 0.3,
                      repeat: isPlaying ? Infinity : 0,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Song list */}
          <div className="p-4 space-y-2">
            {config.playlist.map((song, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl group cursor-pointer transition-all"
                style={{
                  background:
                    currentSong === index
                      ? 'rgba(244, 63, 94, 0.15)'
                      : 'transparent',
                  border: currentSong === index
                    ? '1px solid rgba(244, 63, 94, 0.3)'
                    : '1px solid transparent',
                }}
                onClick={() => handlePlay(index)}
                whileHover={{ background: 'rgba(244, 63, 94, 0.08)' }}
              >
                {/* Track number / play button */}
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {currentSong === index && isPlaying ? (
                      <motion.div
                        key="playing"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-end gap-0.5 h-5"
                      >
                        {[1, 2, 3].map((b) => (
                          <motion.div
                            key={b}
                            className="w-1 rounded-full bg-rose-400"
                            animate={{ height: ['4px', '14px', '4px'] }}
                            transition={{ duration: 0.4, repeat: Infinity, delay: b * 0.1 }}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="font-poppins text-xs font-medium"
                        style={{ color: currentSong === index ? '#f43f5e' : 'rgba(255,255,255,0.4)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Album cover */}
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden relative"
                  style={{ background: `hsl(${340 + index * 20}, 60%, ${25 + index * 5}%)` }}
                >
                  <Image
                    src={song.cover}
                    alt={song.title}
                    fill
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>

                {/* Title & artist */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-poppins text-sm font-medium truncate"
                    style={{ color: currentSong === index ? '#f43f5e' : 'white' }}
                  >
                    {song.title}
                  </p>
                  <p className="font-poppins text-xs text-rose-500 truncate">{song.artist}</p>
                </div>

                {/* Duration */}
                <p className="font-poppins text-xs text-rose-500 flex-shrink-0">{song.duration}</p>

                {/* Play button on hover */}
                <motion.button
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: '#f43f5e' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); handlePlay(index) }}
                >
                  {currentSong === index && isPlaying ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div
            className="px-6 py-4 border-t"
            style={{ borderColor: 'rgba(244, 63, 94, 0.15)' }}
          >
            <p className="font-poppins text-rose-600 text-2xl text-center">
              +
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
