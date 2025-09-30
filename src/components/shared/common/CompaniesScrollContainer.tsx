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

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div 
      ref={scrollRef}
      className="flex space-x-8 overflow-x-auto scrollbar-hide px-6 pb-4"
    >
      {companies.map((company) => (
        <div 
          key={company.name}
          className="inline-flex w-48 h-16 relative flex-shrink-0"
        >
          <Image
            src={company.src}
            alt={company.name}
            fill
            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            sizes="192px"
          />
        </div>
      ))}
    </div>
  )
}
