'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import LoveLetter from '@/components/LoveLetter'
import Journey from '@/components/Journey'
import Memories from '@/components/Memories'
import Reasons from '@/components/Reasons'
import VideoMessage from '@/components/VideoMessage'
import Playlist from '@/components/Playlist'
import GiftBox from '@/components/GiftBox'
import { config } from '@/data/config'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [musicStarted, setMusicStarted] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create background audio element
    const audio = new Audio(config.backgroundMusic)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const startMusic = useCallback(() => {
    if (audioRef.current && !musicStarted) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked, that's okay
      })
      setMusicStarted(true)
      setIsMusicPlaying(true)
    }
  }, [musicStarted])

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsMusicPlaying(true)
    }
  }, [isMusicPlaying])

  const handleStart = useCallback(() => {
    startMusic()
    // Smooth scroll to letter section
    setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [startMusic])

  const handleContinueToJourney = useCallback(() => {
    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navigation
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={toggleMusic}
            musicStarted={musicStarted}
          />

          <main>
            <Hero onStart={handleStart} />
            <LoveLetter onContinue={handleContinueToJourney} />
            <Journey />
            <Memories />
            <Reasons />
            <VideoMessage />
            <Playlist />
            <GiftBox onReplay={handleReplay} />
          </main>
        </>
      )}
    </>
  )
}
