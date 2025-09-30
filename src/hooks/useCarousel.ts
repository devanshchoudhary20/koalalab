import { useState, useEffect, useCallback } from 'react'
import { TESTIMONIAL_CONFIG } from '@/constants/carousel'

export function useCarousel<T>(items: T[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }, [items.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }, [items.length])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, TESTIMONIAL_CONFIG.AUTO_PLAY_INTERVAL)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => {
        setIsAutoPlaying(true)
      }, TESTIMONIAL_CONFIG.RESUME_DELAY)

      return () => clearTimeout(timer)
    }
  }, [isAutoPlaying])

  return {
    currentIndex,
    isAutoPlaying,
    goToSlide,
    nextSlide,
    prevSlide,
    setIsAutoPlaying
  }
}
