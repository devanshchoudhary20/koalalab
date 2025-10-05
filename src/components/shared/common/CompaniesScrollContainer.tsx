'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface Company {
  name: string
  src: string
}

interface CompaniesScrollContainerProps {
  companies: Company[]
}

export default function CompaniesScrollContainer({ companies }: CompaniesScrollContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      scrollContainer.scrollLeft += e.deltaY
    }

    // Auto-scroll functionality
    const autoScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const interval = setInterval(autoScroll, 30)

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
      clearInterval(interval)
    }
  }, [])

  return (
    <div 
      ref={scrollRef}
      className="flex space-x-6 overflow-x-auto scrollbar-hide px-6 pb-4"
    >
      {companies.map((company) => (
        <div 
          key={company.name}
          className="inline-flex w-56 h-20 relative flex-shrink-0"
        >
          <Image
            src={company.src}
            alt={company.name}
            fill
            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            sizes="224px"
          />
        </div>
      ))}
    </div>
  )
}
