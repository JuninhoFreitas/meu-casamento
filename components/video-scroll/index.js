import { useScroll } from 'hooks/use-scroll'
import { clamp } from 'lib/maths'
import { useEffect, useRef, useState } from 'react'
import s from './video-scroll.module.scss'

export function VideoScroll() {
  const videoRef = useRef(null)
  const isSeekingRef = useRef(false)
  const rafIdRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useScroll(({ scroll, limit }) => {
    if (!isReady || !limit) return

    const video = videoRef.current
    if (!video || isSeekingRef.current) return

    // Calculate progress from 0 to 1
    const progress = clamp(0, scroll / limit, 1)

    // Calculate video time based on progress
    const duration = video.duration
    if (duration && isFinite(duration)) {
      const targetTime = progress * duration
      
      // Use requestAnimationFrame for smoother updates
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        // Only update if the difference is significant to avoid jitter
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          video.currentTime = targetTime
        }
      })
    }
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Prevent video from playing automatically
    video.pause()

    // Handle video seeking to prevent conflicts
    const handleSeeking = () => {
      isSeekingRef.current = true
    }

    const handleSeeked = () => {
      isSeekingRef.current = false
    }

    // Ensure video is ready
    const handleLoadedMetadata = () => {
      video.currentTime = 0
      setIsReady(true)
    }

    const handleCanPlay = () => {
      setIsReady(true)
    }

    // Check if video is already loaded
    if (video.readyState >= 2) {
      setIsReady(true)
    }

    video.addEventListener('seeking', handleSeeking)
    video.addEventListener('seeked', handleSeeked)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      video.removeEventListener('seeking', handleSeeking)
      video.removeEventListener('seeked', handleSeeked)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  return (
    <div className={s.videoContainer}>
      <video
        ref={videoRef}
        className={s.video}
        src="/video.mov"
        playsInline
        muted
        preload="auto"
      />
    </div>
  )
}

