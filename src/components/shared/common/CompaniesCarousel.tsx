import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface Company {
  name: string
  src: string
}

interface CompaniesCarouselProps {
  companies?: Company[]
  containerClassName?: string
}

const CompaniesCarousel: React.FC<CompaniesCarouselProps> = ({
  companies = [
    { name: 'Bankless Venture', src: '/images/Bankless venture.webp' },
    { name: 'Primus', src: '/images/primus.webp' },
    { name: 'Stakestone', src: '/images/stakestone.webp' },
    { name: 'Lista', src: '/images/lista.webp' },
    { name: 'Draper Dragon', src: '/images/Draper dragon.webp' },
    { name: 'Bedrock', src: '/images/Bedrock.webp' },
    { name: 'Hypersphere', src: '/images/hypersphere.webp' },
    { name: 'Levitate', src: '/images/levitate.webp' },
    { name: 'Stakeease', src: '/images/stakeease.webp' },
    { name: 'Mishti', src: '/images/mishti.webp' },
  ],
  containerClassName = "py-8 sm:py-16"
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      // Prevent default vertical scrolling
      e.preventDefault()
      
      // Convert vertical scroll to horizontal scroll
      scrollContainer.scrollLeft += e.deltaY
    }

    // Add event listener
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })

    // Cleanup
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className={containerClassName}>
      <div className="relative w-full overflow-hidden">
        {/* Desktop View with Horizontal Scroll */}
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
      </div>
    </div>
  )
}

export default CompaniesCarousel
