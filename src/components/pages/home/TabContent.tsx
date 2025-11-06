'use client'

import React, { useMemo, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import { Button } from '@/components/shared/ui'
import { TAB_DATA } from '@/data/featureTabs'

const SplitTitle = ({ title }: { title: string }) => {
  const [first, rest] = useMemo(() => {
    const parts = title.split(" ");
    return [parts[0], parts.slice(1).join(" ")];
  }, [title]);
  
  return (
    <h1 className="text-3xl sm:text-[40px] lg:text-[56px] font-extrabold leading-tight mb-6">
      <span className="text-[#4EF0D2]">{first} </span>
      <span className="text-[#2D3748]">{rest}</span>
    </h1>
  );
};

interface TabContentProps {
  active: number
  onEmblaApi?: (api: EmblaCarouselType | null) => void
}

export default function TabContent({ active, onEmblaApi }: TabContentProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    loop: false,
    duration: 20,
    startIndex: active,
    dragFree: false,
    watchDrag: true,
    align: 'start'
  })
  const containerRef = useRef<HTMLElement | null>(null)
  const lastScrollY = useRef<number>(0)

  useEffect(() => {
    if (onEmblaApi) {
      onEmblaApi(emblaApi || null)
    }
  }, [emblaApi, onEmblaApi])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current || !emblaApi) return

    const scrollingDown = e.deltaY > 0
    const scrollingUp = e.deltaY < 0

    // Check if Embla can scroll in the requested direction
    const canScrollPrev = emblaApi.canScrollPrev()
    const canScrollNext = emblaApi.canScrollNext()

    // On first tab and scrolling up - allow window scroll
    if (!canScrollPrev && scrollingUp) {
      e.stopPropagation()
      // Let window handle the scroll naturally
      return
    }

    // On last tab and scrolling down - allow window scroll
    if (!canScrollNext && scrollingDown) {
      e.stopPropagation()
      // Let window handle the scroll naturally
      return
    }

    // Otherwise, let Embla handle the scroll
  }, [emblaApi])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !emblaApi) return

    const touch = e.touches[0]
    if (touch) {
      lastScrollY.current = touch.clientY
    }
  }, [emblaApi])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !emblaApi) return

    const touch = e.touches[0]
    if (!touch) return

    const currentY = touch.clientY
    const deltaY = currentY - lastScrollY.current
    const scrollingDown = deltaY < 0
    const scrollingUp = deltaY > 0

    // Check if Embla can scroll in the requested direction
    const canScrollPrev = emblaApi.canScrollPrev()
    const canScrollNext = emblaApi.canScrollNext()

    // On first tab and scrolling up - allow window scroll
    if (!canScrollPrev && scrollingUp) {
      e.stopPropagation()
      return
    }

    // On last tab and scrolling down - allow window scroll
    if (!canScrollNext && scrollingDown) {
      e.stopPropagation()
      return
    }

    lastScrollY.current = currentY
  }, [emblaApi])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleWheel, handleTouchStart, handleTouchMove])

  return (
    <main 
      className="relative min-h-screen sm:pt-0 overflow-hidden" 
      style={{ height: '100vh' }} 
      ref={(node) => {
        emblaRef(node)
        containerRef.current = node
      }}
    >
      <div className="flex flex-col" style={{ height: '100%' }}>
        {TAB_DATA.map((t, i) => (
          <section
            id={t.id}
            key={t.id}
            className="min-h-screen flex-shrink-0 flex items-start w-full"
            style={{ height: '100vh' }}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24 w-full transition-all duration-700 ease-in-out">
              <div className="flex flex-col lg:hidden gap-8">
                <div className="text-center">
                  <SplitTitle title={t.title} />
                  <p className="text-[16px] sm:text-[24px] text-[#4A5568] leading-relaxed mb-8">{t.description}</p>
                </div>

                <div className="relative flex justify-center">
                  <Image
                    src={t.image}
                    alt={`${t.label} illustration`}
                    width={210}
                    height={200}
                    className="rounded-xl select-none pointer-events-none"
                    priority={i === 0}
                  />
                </div>

                <div className="flex flex-col gap-4 justify-center mb-8">
                  <Button variant="primary" className="w-max-content mx-auto sm:w-full min-w-[188px]">
                    {t.cta1}
                  </Button>
                  <Link href="/" className="w-max-content mx-auto sm:w-full min-w-[188px]">
                    <Button variant="outline" className="w-full">
                      {t.cta2}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="text-left">
                  <SplitTitle title={t.title} />
                  <p className="text-xl text-[#4A5568] leading-relaxed mb-8">{t.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-start">
                    <Button variant="primary">
                      {t.cta1}
                    </Button>
                    <Link href="/">
                      <Button variant="outline">
                        {t.cta2}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative flex justify-center">
                  <Image
                    src={t.image}
                    alt={`${t.label} illustration`}
                    width={620}
                    height={615}
                    className="rounded-xl select-none pointer-events-none"
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
