'use client'

import React, { useMemo, useEffect, useState, useRef } from 'react'
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
  onActiveChange?: (index: number) => void
}

export default function TabContent({ active, onEmblaApi, onActiveChange }: TabContentProps) {
  const [isMobile, setIsMobile] = useState(false)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    loop: false,
    duration: 20,
    startIndex: active,
    dragFree: false,
    watchDrag: true,
    align: 'start',
    skipSnaps: false
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (onEmblaApi) {
      // Only pass Embla API on desktop
      onEmblaApi(!isMobile ? (emblaApi || null) : null)
    }
  }, [emblaApi, onEmblaApi, isMobile])

  const isProgrammaticScroll = useRef(false)
  
  useEffect(() => {
    // On mobile, scroll to section when active changes (only if programmatic)
    if (isMobile) {
      const section = sectionRefs.current[active]
      if (section) {
        isProgrammaticScroll.current = true
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => {
          isProgrammaticScroll.current = false
        }, 1000)
      }
    }
  }, [active, isMobile])

  // Intersection Observer for mobile scroll detection
  useEffect(() => {
    if (!isMobile || !onActiveChange) return

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.3
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Don't update if we're programmatically scrolling
      if (isProgrammaticScroll.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const index = TAB_DATA.findIndex(t => t.id === sectionId)
          if (index !== -1 && index !== active) {
            onActiveChange(index)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Wait for refs to be populated
    const timeoutId = setTimeout(() => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.observe(section)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [isMobile, onActiveChange, active])

  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main 
      className="relative min-h-screen sm:pt-0 overflow-y-auto lg:overflow-hidden" 
      style={{ height: isMobile ? 'auto' : '100vh', minHeight: '100vh' }}
      ref={(el) => {
        mainRef.current = el
        if (!isMobile && typeof emblaRef === 'function') {
          emblaRef(el)
        }
      }}
    >
      <div className="flex flex-col" style={{ height: isMobile ? 'auto' : '100%', minHeight: '100vh' }}>
        {TAB_DATA.map((t, i) => (
          <section
            id={t.id}
            key={t.id}
            ref={(el) => {
              sectionRefs.current[i] = el
            }}
            className="min-h-screen flex-shrink-0 flex items-start w-full"
            style={{ minHeight: '100vh', height: isMobile ? 'auto' : '100vh' }}
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
